/**
 * Checks every recorded clip before it can reach the CDN, and levels it.
 *
 * The first recording (2026-10-31) went up unchecked as 48 kbps MP3: noise
 * from the low bitrate, words cut at the end (Azure stops on the last sound,
 * and the app's player ends a clip 0.1 s early), and faults nobody heard. Now
 * each clip comes from Azure uncompressed, with silence asked for at both ends,
 * and is measured with ffmpeg:
 * - silence before and after the voice (an end with no silence was cut);
 * - how long the voice speaks against how much text it read (much shorter
 *   means dropped words, much longer means something went wrong);
 * - no long silence inside a line;
 * - no clipping, and the hiss level in the silence;
 * then it is levelled to one loudness and encoded once, to 192 kbps MP3.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** One loudness for every clip, so no verse is louder than the next (EBU R128). */
export const TARGET_LUFS = -18;
/** The silence asked of Azure around each clip (mstts:silence, exact). */
export const LEAD_MS = 150;
export const TAIL_MS = 450;

export interface ClipCheck {
  ok: boolean;
  problems: string[];
  duration: number;
  lead: number;
  tail: number;
  /** Seconds of voice per letter read: the length check. */
  perLetter: number;
  loudness: number;
  peak: number;
  /** Loudest level in the closing silence, dBFS (-inf for digital silence). */
  noise: number;
  gaps: number[];
}

function ffmpeg(args: string[]): string {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', ...args], { encoding: 'utf8' });
  return `${r.stdout ?? ''}${r.stderr ?? ''}`;
}

/** Measure a WAV clip. `letters` is how many letters the voice read. */
export function measure(wav: string, letters: number): ClipCheck {
  const duration = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav], { encoding: 'utf8' }).trim()
  );
  const log = ffmpeg(['-i', wav, '-af', 'silencedetect=noise=-50dB:d=0.04,ebur128=peak=true', '-f', 'null', '-']);
  const silences: [number, number][] = [];
  let open: number | null = null;
  for (const line of log.split('\n')) {
    const s = line.match(/silence_start: (-?[\d.]+)/);
    if (s) open = Math.max(0, Number(s[1]));
    const e = line.match(/silence_end: ([\d.]+)/);
    if (e && open !== null) {
      silences.push([open, Number(e[1])]);
      open = null;
    }
  }
  if (open !== null) silences.push([open, duration]);
  const loudness = Number(log.match(/I:\s+(-?[\d.]+) LUFS/g)?.pop()?.match(/-?[\d.]+/)?.[0] ?? NaN);
  const peak = Number(log.match(/Peak:\s+(-?[\d.]+|-inf) dBFS/g)?.pop()?.match(/-?[\d.]+|-inf/)?.[0] ?? NaN);
  const near = 0.02;
  const first = silences[0];
  const last = silences[silences.length - 1];
  const lead = first && first[0] <= near ? first[1] : 0;
  const tail = last && last[1] >= duration - near ? duration - last[0] : 0;
  const gaps = silences.filter(([a, b]) => a > near && b < duration - near).map(([a, b]) => b - a);
  // Only the last quarter-second: earlier, the fade of the final sound is still there.
  const tailStart = Math.max(0, duration - Math.min(0.25, tail * 0.5));
  const tailLog = ffmpeg(['-ss', String(tailStart), '-i', wav, '-af', 'astats=metadata=0', '-f', 'null', '-']);
  const noiseText = tailLog.match(/Peak level dB:\s*(-?[\d.]+|-inf)/)?.[1] ?? '-inf';
  const noise = noiseText === '-inf' ? -Infinity : Number(noiseText);
  const speech = Math.max(0, duration - lead - tail);
  const perLetter = letters ? speech / letters : 0;

  const problems: string[] = [];
  if (lead < (LEAD_MS / 1000) * 0.5) problems.push(`no silence before the voice (${lead.toFixed(2)} s)`);
  if (tail < (TAIL_MS / 1000) * 0.5) problems.push(`cut at the end: ${tail.toFixed(2)} s of silence after the voice`);
  if (letters >= 4 && perLetter < 0.06) problems.push(`too short for its text (${perLetter.toFixed(3)} s a letter): words may be missing`);
  if (letters >= 4 && perLetter > 0.4) problems.push(`too long for its text (${perLetter.toFixed(3)} s a letter)`);
  for (const g of gaps) if (g > 1.3) problems.push(`a ${g.toFixed(1)} s silence inside the line`);
  if (peak > -0.3) problems.push(`clipping (peak ${peak.toFixed(1)} dBFS)`);
  if (noise > -55) problems.push(`hiss in the silence (${noise.toFixed(1)} dBFS)`);
  if (!Number.isFinite(loudness)) problems.push('no loudness measured: the clip may be empty');
  return { ok: problems.length === 0, problems, duration, lead, tail, perLetter, loudness, peak, noise, gaps };
}

/**
 * Check a clip as Azure sent it (WAV bytes) and make the file that is
 * published: levelled to TARGET_LUFS without clipping, 48 kHz mono, 192 kbps MP3.
 */
export function finish(wavBytes: Buffer, letters: number): { mp3: Buffer; check: ClipCheck } {
  const dir = mkdtempSync(join(tmpdir(), 'iqra-qc-'));
  try {
    const wav = join(dir, 'in.wav');
    writeFileSync(wav, wavBytes);
    const check = measure(wav, letters);
    let gain = Number.isFinite(check.loudness) ? TARGET_LUFS - check.loudness : 0;
    // Never louder than -1.5 dBFS at the peak.
    if (Number.isFinite(check.peak)) gain = Math.min(gain, -1.5 - check.peak);
    const out = join(dir, 'out.mp3');
    ffmpeg(['-i', wav, '-af', `volume=${gain.toFixed(2)}dB`, '-ar', '48000', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '192k', out]);
    return { mp3: readFileSync(out), check };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
