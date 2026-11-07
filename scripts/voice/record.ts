/**
 * Pre-records every spoken line of the stories and duas, one clip per line,
 * and uploads them to the voice CDN (Cloudflare R2), so the app plays files
 * instead of calling the voice service each time someone listens.
 *
 *   npx tsx scripts/voice/record.ts --dry-run        what is missing, and its size
 *   npx tsx scripts/voice/record.ts                  record and upload what is missing
 *   npx tsx scripts/voice/record.ts --find "آيَاتِنَا"  lines containing words, with their clip paths
 *   npx tsx scripts/voice/record.ts --try "آيَاتِنَا"   say a spelling with Hamed and play it here
 *   npx tsx scripts/voice/record.ts --surahs 78-114 --out DIR   a pilot: record those surahs' ayahs
 *                                    into DIR with a report, upload nothing
 *   npx tsx scripts/voice/record.ts --upload-from DIR   upload a pilot once heard (passing clips only)
 *   --all records clips already on the CDN again (a new recording replaces them).
 *
 * Every clip is checked (qc.ts): silence at both ends, its length against its
 * text, no gaps, no clipping or hiss; then levelled and encoded once at
 * 192 kbps. A clip that fails is made again once; one that still fails is
 * reported and not published.
 *
 * The plan comes from the app's own code (narrationPlan + voicePlan), so a
 * clip's name is exactly the one the app asks for. A line is only recorded
 * when its clip is not on the CDN yet: changing a line's text, adding a
 * pronunciation fix (src/services/speech/pronunciations.ts) or bumping a
 * revision (voiceRevisions.ts) gives just those lines new names, and only
 * they are recorded again.
 *
 * Credentials (git-ignored):
 *   credentials/r2.json  {"accountId","accessKeyId","secretAccessKey","bucket"}
 *   Azure Speech key: AZURE_SPEECH_KEY, or read with the az CLI from the
 *   iqra-speech-rec resource (S0, billed per character).
 */
import { createHash, createHmac } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { finish, LEAD_MS, TAIL_MS, type ClipCheck } from './qc';
import { buildUtterances, type NarratableBlock } from '../../src/services/narrationPlan';
import {
  ARABIC_VOICE,
  NARRATION_RATE,
  chunkLine,
  clipPath,
  edgeRate,
  spokenArabic,
  asRecitation,
  RECITE,
  spokenNarration,
  buildSsml,
  voiceFor,
  plainSpoken,
} from '../../src/services/speech/voicePlan';
import { getProphetsWithStories, getProphetStory } from '../../src/data/arabic/prophets';
import { getQuranStories } from '../../src/data/arabic/quranStories';
import { DUAS } from '../../src/data/arabic/duas/duas';
import en from '../../src/i18n/locales/en';
import fr from '../../src/i18n/locales/fr';

type Item = { path: string; text: string; voice: string; rate: string; locale: string; surah?: number };

const ROOT = join(__dirname, '..', '..');
const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const value = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

// ---------------------------------------------------------------------------
// The plan: every (text, voice, rate) the app can ask for in stories and duas.
// ---------------------------------------------------------------------------

/** Both Arabic voices, each recorded at its own normal and slow rates (edgeRate). */
const ARABIC_VOICES = [voiceFor('ar', 'male'), voiceFor('ar', 'female')];

function duaBlocks(d: (typeof DUAS)[number], lang: 'en' | 'fr'): NarratableBlock[] {
  // Mirrors app/quran/duas/[duaId].tsx, with its section labels.
  const t = lang === 'fr' ? fr : en;
  const df = (t as any).duasFeature;
  const blocks: NarratableBlock[] = [
    { id: `${d.id}-dua`, type: 'narrative', content: `﴿${d.arabicText}﴾ ${d.translation}`, contentFr: `﴿${d.arabicText}﴾ ${d.translationFr ?? d.translation}` },
  ];
  if (d.occasion) blocks.push({ id: `${d.id}-occasion`, type: 'narrative', content: `${df.whenToRecite}. ${d.occasion}`, contentFr: `${df.whenToRecite}. ${d.occasionFr ?? d.occasion}` });
  if (d.virtues) blocks.push({ id: `${d.id}-virtues`, type: 'narrative', content: `${df.virtuesRewards}. ${d.virtues}`, contentFr: `${df.virtuesRewards}. ${d.virtuesFr ?? d.virtues}` });
  if (d.story) blocks.push({ id: `${d.id}-story`, type: 'narrative', content: `${df.backgroundStory}. ${d.story}`, contentFr: `${df.backgroundStory}. ${d.storyFr ?? d.story}` });
  return blocks;
}

/** Data the learning screens speak from: everything but the Quran text, stories and duas. */
const LEARNING_SKIP = [/\/quran\/surahs\//, /\/prophets\//, /\/quranStories\//, /\/duas\//, /\/legal\//, /\/community\//];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : [];
  });
}

/**
 * Every Arabic string literal in the learning data. A string counts when most
 * of its letters are Arabic, so an English sentence quoting one Arabic word
 * is left out; lines a screen builds itself are recorded by the tts function
 * the first time anyone hears them.
 */
export function learningArabic(): string[] {
  const out = new Set<string>();
  const literal = /(['"`])((?:\\.|(?!\1).)*?)\1/g;
  for (const file of walk(join(ROOT, 'src', 'data'))) {
    if (LEARNING_SKIP.some((re) => re.test(file))) continue;
    for (const m of readFileSync(file, 'utf8').matchAll(literal)) {
      const s = m[2].replace(/\\n/g, ' ').trim();
      const arabic = (s.match(/[\u0621-\u064A]/g) ?? []).length;
      const latin = (s.match(/[A-Za-z]/g) ?? []).length;
      if (arabic >= 1 && arabic >= latin * 2) out.add(s);
    }
  }
  return [...out];
}

/** Every ayah of the Quran as the app holds it (textUthmani). */
export function quranAyahs(): string[] {
  const out: string[] = [];
  for (const file of walk(join(ROOT, 'src', 'data', 'arabic', 'quran', 'surahs'))) {
    for (const m of readFileSync(file, 'utf8').matchAll(/"?textUthmani"?:\s*(['"`])((?:\\.|(?!\1).)*)\1/g)) out.push(m[2]);
  }
  return out;
}

/** Every ayah with its surah number (the file name starts with it). */
function quranAyahEntries(): { surah: number; text: string }[] {
  const out: { surah: number; text: string }[] = [];
  for (const file of walk(join(ROOT, 'src', 'data', 'arabic', 'quran', 'surahs'))) {
    const surah = Number(file.split('/').pop()!.slice(0, 3));
    for (const m of readFileSync(file, 'utf8').matchAll(/"?textUthmani"?:\s*(['"`])((?:\\.|(?!\1).)*)\1/g)) out.push({ surah, text: m[2] });
  }
  return out;
}

export function buildPlan(): Item[] {
  const items = new Map<string, Item>();
  const addArabic = (line: string) => {
    for (const chunk of chunkLine(line)) {
      const text = spokenArabic(chunk);
      if (!text.trim()) continue;
      // The Quran is recited by Hamed alone; other Arabic follows the
      // narrator's gender, so it is recorded in both voices.
      for (const voice of chunk.startsWith(RECITE) ? [voiceFor('ar', 'male')] : ARABIC_VOICES) {
        for (const rate of [edgeRate(1, voice), edgeRate(0.6, voice)]) {
          const path = clipPath(text, voice, rate);
          items.set(path, { path, text, voice, rate, locale: 'ar-SA' });
        }
      }
    }
  };
  const addNarration = (text: string, lang: 'en' | 'fr') => {
    // Surah names marked for the Arabic voice, exactly as the app sends them.
    const body = spokenNarration(text.trim(), lang);
    if (!body) return;
    for (const gender of ['female', 'male'] as const) {
      const voice = voiceFor(lang, gender);
      const path = clipPath(body, voice, NARRATION_RATE);
      items.set(path, { path, text: body, voice, rate: NARRATION_RATE, locale: lang === 'fr' ? 'fr-FR' : 'en-US' });
    }
  };

  const storySets: NarratableBlock[][] = [];
  for (const id of getProphetsWithStories()) {
    for (const sub of getProphetStory(id)?.subStories ?? []) storySets.push(sub.content as NarratableBlock[]);
  }
  for (const s of getQuranStories()) storySets.push(s.content as NarratableBlock[]);

  for (const lang of ['en', 'fr'] as const) {
    const lc = (a: string, b?: string) => (lang === 'fr' ? b ?? a : a);
    const sets = [...storySets, ...DUAS.map((d) => duaBlocks(d, lang))];
    for (const blocks of sets) {
      for (const u of buildUtterances(blocks, lang, lc)) {
        if (u.lang === 'ar') addArabic(u.text);
        else addNarration(u.text, u.lang);
      }
    }
  }
  // The dua's own Arabic player reads the whole dua text.
  for (const d of DUAS) addArabic(d.arabicText);
  // The learning screens (alphabet, vocabulary, verbs, grammar, numbers,
  // prayer, tajweed, quizzes, reading, calendar) speak fields of the data
  // as they are, so every Arabic string in it is recorded.
  for (const line of learningArabic()) addArabic(line);
  // Learn Mode's learning voice reads each ayah whole (synthesizeAyahToFile:
  // no chunking), in Hamed's voice, at the normal pace only.
  for (const { surah, text: ayah } of quranAyahEntries()) {
    const text = spokenArabic(asRecitation(ayah));
    if (!text.trim()) continue;
    for (const voice of [voiceFor('ar', 'male')]) {
      const rate = edgeRate(1, voice);
      const path = clipPath(text, voice, rate);
      items.set(path, { path, text, voice, rate, locale: 'ar-SA', surah });
    }
  }
  return [...items.values()];
}

// ---------------------------------------------------------------------------
// Azure Speech (S0) and Cloudflare R2 (S3 API).
// ---------------------------------------------------------------------------

function azureKey(): string {
  if (process.env.AZURE_SPEECH_KEY) return process.env.AZURE_SPEECH_KEY;
  return execFileSync('az', ['cognitiveservices', 'account', 'keys', 'list', '-n', 'iqra-speech-rec', '-g', 'iqra', '--query', 'key1', '-o', 'tsv'], { encoding: 'utf8' }).trim();
}

/**
 * The request the app makes, plus exact silence before the first word and
 * after the last: Azure otherwise ends on the last sound, and a player that
 * stops a clip a moment early cut it (qc.ts).
 */
function recordingSsml(item: Pick<Item, 'text' | 'voice' | 'rate' | 'locale'>): string {
  const ssml = buildSsml(item.text, item.voice, item.rate, item.locale);
  const opens = [...ssml.matchAll(/<voice name='[^']*'>/g)];
  const first = opens[0];
  const last = opens[opens.length - 1];
  const tail = `<mstts:silence type='Tailing-exact' value='${TAIL_MS}ms'/>`;
  const lead = `<mstts:silence type='Leading-exact' value='${LEAD_MS}ms'/>`;
  // Between two voices buildSsml already sets zero silence (Tailing on the
  // first, Leading on the last), so these never meet a tag of the same kind.
  let out = ssml.slice(0, last.index! + last[0].length) + tail + ssml.slice(last.index! + last[0].length);
  out = out.slice(0, first.index! + first[0].length) + lead + out.slice(first.index! + first[0].length);
  return out;
}

/** How many letters a line reads, for the length check. */
const lettersOf = (text: string) => (plainSpoken(text).match(/[\u0621-\u064Aa-zA-Z\u00C0-\u017F]/g) ?? []).length;

async function synthesize(key: string, item: Pick<Item, 'text' | 'voice' | 'rate' | 'locale'>): Promise<Buffer> {
  // Same voice request as supabase/functions/tts, so a recorded clip sounds
  // like a live one; uncompressed, so it is encoded once, after levelling.
  const ssml = recordingSsml(item);
  for (let attempt = 1; ; attempt++) {
    const res = await fetch('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'riff-48khz-16bit-mono-pcm',
        'User-Agent': 'iqra-voice-recorder',
      },
      body: ssml,
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length) return buf;
    }
    if (attempt >= 6 || (res.status !== 429 && res.status < 500 && res.ok === false)) {
      throw new Error(`azure ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

type R2 = { accountId: string; accessKeyId: string; secretAccessKey: string; bucket: string };

export function r2Config(): R2 {
  return JSON.parse(readFileSync(join(ROOT, 'credentials', 'r2.json'), 'utf8'));
}

const sha256 = (d: string | Buffer) => createHash('sha256').update(d).digest('hex');
const hmac = (k: Buffer | string, d: string) => createHmac('sha256', k).update(d).digest();

/** Minimal AWS SigV4 for R2 (region "auto", service "s3"). */
export async function r2(cfg: R2, method: 'GET' | 'PUT', key: string, query = '', body?: Buffer, extra: Record<string, string> = {}) {
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const path = `/${cfg.bucket}/${key.split('/').map(encodeURIComponent).join('/')}`.replace(/\/$/, key ? '' : '/');
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const day = amzDate.slice(0, 8);
  const payloadHash = sha256(body ?? '');
  const headers: Record<string, string> = { host, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amzDate, ...extra };
  const signed = Object.keys(headers).map((h) => h.toLowerCase()).sort();
  const canonical = [
    method,
    path,
    query,
    ...signed.map((h) => `${h}:${headers[Object.keys(headers).find((k) => k.toLowerCase() === h)!].trim()}`),
    '',
    signed.join(';'),
    payloadHash,
  ].join('\n');
  const scope = `${day}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256(canonical)].join('\n');
  const kSigning = hmac(hmac(hmac(hmac(`AWS4${cfg.secretAccessKey}`, day), 'auto'), 's3'), 'aws4_request');
  const signature = createHmac('sha256', kSigning).update(toSign).digest('hex');
  headers.authorization = `AWS4-HMAC-SHA256 Credential=${cfg.accessKeyId}/${scope}, SignedHeaders=${signed.join(';')}, Signature=${signature}`;
  return fetch(`https://${host}${path}${query ? `?${query}` : ''}`, { method, headers, body });
}

async function listExisting(cfg: R2): Promise<Set<string>> {
  const keys = new Set<string>();
  let token: string | undefined;
  do {
    const params = [`list-type=2`, `max-keys=1000`, `prefix=v1%2F`];
    if (token) params.push(`continuation-token=${encodeURIComponent(token)}`);
    const res = await r2(cfg, 'GET', '', params.sort().join('&'));
    const xml = await res.text();
    if (!res.ok) throw new Error(`r2 list ${res.status}: ${xml.slice(0, 200)}`);
    for (const m of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) keys.add(m[1]);
    token = /<IsTruncated>true<\/IsTruncated>/.test(xml) ? xml.match(/<NextContinuationToken>([^<]+)</)?.[1] : undefined;
  } while (token);
  return keys;
}

// ---------------------------------------------------------------------------

async function main() {
  if (value('--try')) {
    const text = spokenArabic(value('--try')!);
    const voice = value('--voice') === 'female' ? voiceFor('ar', 'female') : ARABIC_VOICE;
    const rate = value('--rate') ?? edgeRate(1, voice);
    const audio = await synthesize(azureKey(), { text, voice, rate, locale: 'ar-SA' });
    const file = join(mkdtempSync(join(tmpdir(), 'iqra-try-')), 'try.mp3');
    writeFileSync(file, audio);
    console.log(`spoken as: ${text}  (${rate})`);
    execFileSync('afplay', [file]);
    return;
  }

  const plan = buildPlan();
  if (value('--find')) {
    const words = value('--find')!.split(/\s+/).map((w) => spokenArabic(w));
    for (const it of plan) if (words.every((w) => it.text.includes(w))) console.log(`${it.voice} ${it.rate}\n  ${it.text}\n  ${it.path}`);
    return;
  }

  const chars = (items: Item[]) => items.reduce((n, it) => n + it.text.length, 0);
  const byVoice = (items: Item[]) =>
    Object.entries(items.reduce<Record<string, number>>((m, it) => ((m[it.voice] = (m[it.voice] ?? 0) + 1), m), {}))
      .map(([v, n]) => `${v} ${n}`)
      .join(', ');
  console.log(`plan: ${plan.length} clips, ${chars(plan)} characters (${byVoice(plan)})`);

  const cfg = r2Config();

  // Upload a pilot that was recorded with --out, once it has been heard.
  if (value('--upload-from')) {
    const dir = value('--upload-from')!;
    const report: Record<string, { ok: boolean }> = JSON.parse(readFileSync(join(dir, 'report.json'), 'utf8'));
    const paths = Object.entries(report).filter(([, r]) => r.ok || flag('--include-flagged')).map(([path]) => path);
    let up = 0;
    for (const path of paths) {
      const res = await r2(cfg, 'PUT', path, '', readFileSync(join(dir, path)), {
        'content-type': 'audio/mpeg',
        'cache-control': 'public, max-age=31536000, immutable',
      });
      if (!res.ok) throw new Error(`r2 put ${res.status}: ${(await res.text()).slice(0, 200)}`);
      if (++up % 100 === 0) console.log(`${up}/${paths.length} uploaded`);
    }
    console.log(`uploaded ${up} of ${Object.keys(report).length} (${Object.keys(report).length - paths.length} flagged left out)`);
    return;
  }

  // --surahs 78-114: only the ayahs of those surahs (a pilot).
  let wanted = plan;
  if (value('--surahs')) {
    const [a, b] = value('--surahs')!.split('-').map(Number);
    wanted = plan.filter((it) => it.surah !== undefined && it.surah >= a && it.surah <= (b ?? a));
  }
  const existing = await listExisting(cfg);
  const missing = flag('--all') ? wanted : wanted.filter((it) => !existing.has(it.path));
  const limit = Number(value('--limit') ?? Infinity);
  const todo = missing.slice(0, limit);
  console.log(`on the CDN: ${existing.size}; to record: ${missing.length} (${chars(missing)} characters, about $${((chars(missing) / 1e6) * 16).toFixed(2)})`);
  if (flag('--dry-run') || !todo.length) return;

  // --out DIR: record and check into a folder, upload nothing (a pilot to hear first).
  const outDir = value('--out');
  const key = azureKey();
  const report: Record<string, ClipCheck & { text: string; attempts: number }> = {};
  let done = 0;
  let flagged = 0;
  let failed = 0;
  const started = Date.now();
  const queue = [...todo];
  const worker = async () => {
    for (let it = queue.shift(); it; it = queue.shift()) {
      try {
        const letters = lettersOf(it.text);
        let best = finish(await synthesize(key, it), letters);
        let attempts = 1;
        // A clip that fails a check is made once more; the better one is kept.
        if (!best.check.ok) {
          const again = finish(await synthesize(key, it), letters);
          attempts = 2;
          if (again.check.problems.length < best.check.problems.length) best = again;
        }
        report[it.path] = { ...best.check, text: plainSpoken(it.text), attempts };
        if (!best.check.ok) {
          flagged++;
          console.error(`FLAGGED ${it.path}: ${best.check.problems.join('; ')}`);
        }
        if (outDir) {
          const file = join(outDir, it.path);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, best.mp3);
        } else if (best.check.ok) {
          // A flagged clip is not published: the app reads that line live until it is fixed.
          const res = await r2(cfg, 'PUT', it.path, '', best.mp3, {
            'content-type': 'audio/mpeg',
            'cache-control': 'public, max-age=31536000, immutable',
          });
          if (!res.ok) throw new Error(`r2 put ${res.status}: ${(await res.text()).slice(0, 200)}`);
        }
        done++;
      } catch (e) {
        failed++;
        console.error(`FAILED ${it.path}: ${(e as Error).message}`);
      }
      if ((done + failed) % 100 === 0) {
        const rate = (done + failed) / ((Date.now() - started) / 1000);
        console.log(`${done + failed}/${todo.length} (${flagged} flagged, ${failed} failed) — ${Math.round((todo.length - done - failed) / rate / 60)} min left`);
      }
    }
  };
  await Promise.all(Array.from({ length: Number(value('--parallel') ?? 6) }, worker));
  const reportFile = join(outDir ?? mkdtempSync(join(tmpdir(), 'iqra-voice-')), 'report.json');
  writeFileSync(reportFile, JSON.stringify(report, null, 1));
  console.log(`recorded ${done} (${flagged} flagged${outDir ? '' : ', not uploaded'}), failed ${failed}, in ${Math.round((Date.now() - started) / 60000)} min; report: ${reportFile}`);
  if (failed) process.exitCode = 1;
}

// Importable (for audits of the plan) without recording anything.
if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
