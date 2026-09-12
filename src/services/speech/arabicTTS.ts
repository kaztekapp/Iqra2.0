// Arabic text-to-speech for the memorization feature.
//
// Uses Google Translate TTS (tl=ar) played through expo-audio. Each chunk is
// DOWNLOADED to a local file then played (iOS AVPlayer fails to stream Google's
// endpoint directly). Playback is line-by-line: each verse is spoken in order and
// the caller is notified (onLineStart) so the UI can highlight the active line.
//
// Concurrency: every playArabicLines() call claims a new "generation"; any older
// in-flight call notices its generation is stale and bails, and stopArabic() bumps
// the generation to cancel whatever is running — preventing overlapping audio when
// verses/play are tapped rapidly.

import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioMetadata } from 'expo-audio';
import * as Speech from 'expo-speech';
import { registerAudioProducer, claimAudio } from '../audioBus';
import type { AudioPlayer } from 'expo-audio';
import { File, Paths } from 'expo-file-system';

let generation = 0;
let currentPlayer: AudioPlayer | null = null;
let interruptCurrent: (() => void) | null = null;
let audioInitialized = false;

const MAX_CHUNK_LEN = 180;

export interface ArabicPlayOptions {
  /** Playback rate. 1.0 = natural. Lower = slower (pitch-corrected). */
  speed?: number;
  /** Line index to start from (default 0) — used to resume or tap-to-start. */
  startIndex?: number;
  /** Called with the index (into `lines`) of the line about to be spoken. */
  onLineStart?: (index: number) => void;
  /** Called once all lines finished (not called if stopped early). */
  onDone?: () => void;
  onError?: (error?: any) => void;
}

async function ensureAudioInit() {
  if (audioInitialized) return;
  audioInitialized = true;
  try {
    await setAudioModeAsync({ playsInSilentMode: true });
  } catch {}
}

function chunkLine(text: string, maxLen = MAX_CHUNK_LEN): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return [trimmed];

  const chunks: string[] = [];
  let remaining = trimmed;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    // Each chunk is a separate clip, so the seam between them is audible. Break
    // on a sentence or clause mark where possible — including the Arabic full
    // stop, comma, semicolon and question mark — then on a space.
    let splitAt = -1;
    for (const mark of ['۔ ', '. ', '؟ ', '? ', '! ', '؛ ', '; ', '، ', ', ']) {
      const at = remaining.lastIndexOf(mark, maxLen);
      if (at > splitAt) splitAt = at + mark.length - 1;
    }
    if (splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(' ', maxLen);
    if (splitAt <= 0) {
      // No break point at all before the limit: run on to the next space rather
      // than cutting a word in half, which Google reads as gibberish.
      const next = remaining.indexOf(' ', maxLen);
      splitAt = next === -1 ? remaining.length : next;
    }
    chunks.push(remaining.substring(0, splitAt).trim());
    remaining = remaining.substring(splitAt).trim();
  }
  return chunks;
}

function deleteQuietly(uri: string) {
  try {
    new File(uri).delete();
  } catch {}
}

function teardownCurrent() {
  const stop = interruptCurrent;
  interruptCurrent = null;
  if (stop) {
    stop();
  } else if (currentPlayer) {
    try {
      currentPlayer.pause();
    } catch {}
    try {
      currentPlayer.remove();
    } catch {}
    currentPlayer = null;
  }
}

/**
 * Map a requested speed onto what Google actually supports.
 *
 * The endpoint does not take a continuous rate: measured against
 * translate_tts with a fixed Arabic phrase, every value from 0.5 to 1 returns
 * byte-identical audio, 0.2-0.3 returns a distinct clip ~19% longer, and 0.1
 * and below ~36% longer. So there are three tempos, not a dial. Passing 0.7
 * through unchanged would silently produce normal-speed audio while the UI
 * claimed it was slow.
 */
function googleTtsSpeed(speed: number): number {
  if (speed >= 0.9) return 1;      // normal
  if (speed >= 0.45) return 0.24;  // slow
  return 0.1;                      // slowest, for picking a word apart
}

/**
 * Fetch one chunk as an mp3.
 *
 * `speed` goes into the request, not into playback. Google re-synthesises at
 * the requested tempo with the articulation a learner needs; time-stretching
 * the finished mp3 afterwards smears it and is why slow Arabic sounded bad.
 */
async function fetchChunkToFile(text: string, speed = 1): Promise<string> {
  const ttsSpeed = googleTtsSpeed(speed);
  const url =
    `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&ttsspeed=${ttsSpeed}&q=` +
    encodeURIComponent(text);

  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`tts_http_${resp.status}`);

  const blob = await resp.blob();
  const base64: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1] || '');
    reader.onerror = () => reject(new Error('tts_read_failed'));
    reader.readAsDataURL(blob);
  });
  if (!base64) throw new Error('tts_empty');

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const file = new File(
    Paths.cache,
    `ar-tts-${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`
  );
  file.write(bytes);
  return file.uri;
}

/** Nothing has started playing by now: the clip is not going to. */
const CLIP_START_BUDGET_MS = 8000;
/** Slack on top of a clip's own length before it is treated as wedged. */
const CLIP_END_SLACK_MS = 5000;

/**
 * What the lock screen should keep showing while Arabic lines are read.
 *
 * A quoted ayah is played through a player of its own, and only one player
 * owns the lock screen at a time - so without re-claiming it here the
 * controls would disappear every time the story reached a verse and come
 * back when it returned to the narrator. The story sets this; the line
 * borrows it.
 */
let lockScreen: AudioMetadata | null = null;

export function setArabicNowPlaying(meta: AudioMetadata | null): void {
  lockScreen = meta;
}

function playFile(uri: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let player: AudioPlayer;
    try {
      // Keep the session alive across the line (expo-audio 57 would otherwise
      // deactivate it when this clip ends, mid-story, with the screen locked).
      player = createAudioPlayer(uri, { keepAudioSessionActive: true });
    } catch (e) {
      deleteQuietly(uri);
      reject(e);
      return;
    }

    player.shouldCorrectPitch = true;
    // Deliberately no setPlaybackRate: the clip was already rendered at the
    // requested tempo. Resampling it here is what made the voice warble.
    currentPlayer = player;

    if (lockScreen) {
      try {
        // Play/pause only, to match the story's own controls.
        player.setActiveForLockScreen(true, lockScreen, {
          showSeekForward: false,
          showSeekBackward: false,
        });
      } catch {
        // Not available everywhere; the line still plays.
      }
    }

    let settled = false;
    /**
     * Status updates are the only thing that ends a clip, and they stop
     * arriving whenever the system takes the audio away - the app put in the
     * background and suspended, a call, another app claiming the session.
     * Without a backstop the promise never settles: this player, its
     * listener and its file are never released, `currentPlayer` stays set so
     * the engine reports itself as speaking for ever, and the story's queue
     * waits on a line that will never finish. Only force-quitting clears it.
     */
    let watchdog: ReturnType<typeof setTimeout> | null = null;
    const arm = (ms: number) => {
      if (watchdog) clearTimeout(watchdog);
      watchdog = setTimeout(finish, ms);
    };

    const finish = () => {
      if (settled) return;
      settled = true;
      if (watchdog) clearTimeout(watchdog);
      try {
        subscription.remove();
      } catch {}
      try {
        player.pause();
      } catch {}
      try {
        player.remove();
      } catch {}
      if (currentPlayer === player) currentPlayer = null;
      if (interruptCurrent === finish) interruptCurrent = null;
      deleteQuietly(uri);
      resolve();
    };

    interruptCurrent = finish;

    let started = false;
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (settled) return;
      if (!started && (status.playing || status.currentTime > 0)) {
        started = true;
      }
      // `duration` is 0 until the clip loads, so the end is only knowable
      // once it is. Re-arming on each tick means a clip that keeps reporting
      // is never cut short, and one that goes quiet is released.
      if (started && typeof status.duration === 'number' && status.duration > 0) {
        const left = Math.max(0, status.duration - status.currentTime) * 1000;
        arm(left + CLIP_END_SLACK_MS);
      }
      if (
        status.didJustFinish ||
        (status.playing === false &&
          status.currentTime > 0 &&
          status.duration > 0 &&
          status.currentTime >= status.duration - 0.15)
      ) {
        finish();
      }
    });

    arm(CLIP_START_BUDGET_MS);

    try {
      player.play();
    } catch (e) {
      finish();
    }
  });
}

/**
 * Speak an array of lines in order. Empty lines (stanza breaks) are skipped but
 * their index is preserved, so `onLineStart` indices map 1:1 onto `lines`.
 */
export async function playArabicLines(
  lines: string[],
  options: ArabicPlayOptions = {}
): Promise<void> {
  // Silence the other producers FIRST, then take our generation. Claiming after
  // the increment let a stop triggered by the claim bump the counter past the
  // value we had just captured, and the utterance cancelled itself.
  claimAudio(AUDIO_ID);
  const myGen = ++generation;
  teardownCurrent();
  await ensureAudioInit();

  const speed = options.speed ?? 1.0;
  const startIndex = Math.max(0, options.startIndex ?? 0);

  try {
    for (let i = startIndex; i < lines.length; i++) {
      if (myGen !== generation) return;
      const line = lines[i].trim();
      if (!line) continue; // stanza break — no audio, no highlight

      options.onLineStart?.(i);

      // The learner asked for the phone's own voice: no fetch at all.
      if (preference.source === 'device') {
        await speakOnDevice(line, speed, myGen, () => generation);
        if (myGen !== generation) return;
        continue;
      }

      const chunks = chunkLine(line);
      for (const chunk of chunks) {
        if (myGen !== generation) return;
        let uri: string;
        try {
          uri = await fetchChunkToFile(chunk, speed);
        } catch {
          // The fetched voice is unreachable. Speak this line on device rather
          // than failing the whole utterance into silence.
          await speakOnDevice(line, speed, myGen, () => generation);
          break;
        }
        if (myGen !== generation) {
          deleteQuietly(uri);
          return;
        }
        await playFile(uri);
        if (myGen !== generation) return;
      }
    }
    if (myGen === generation) options.onDone?.();
  } catch (e: any) {
    if (myGen === generation) options.onError?.(e);
  }
}

/**
 * Best on-device Arabic voice, resolved once and cached.
 *
 * Google TTS needs the network. Without a fallback the app was simply silent
 * offline, which for a learning app is a failure rather than a degradation.
 * expo-speech works offline, but with no `voice` it takes the system default —
 * the compact cut, which is the flat clipped one. Both platforms ship a much
 * better Arabic voice that costs nothing to ask for.
 *
 * `preferGender` exists because the on-device Arabic voices are named rather
 * than tagged, and the app already lets the learner pick; the name lists are
 * the ones audioService had worked out.
 */
const FEMALE = ['laila', 'maryam', 'amira', 'hoda', 'salma', 'zeina', 'lana', 'sara', 'fatima', 'samira', 'female'];
const MALE = ['maged', 'majed', 'tarik', 'omar', 'khaled', 'ahmed', 'hassan', 'male'];

let voicePromise: Promise<string | undefined> | null = null;
let preferredGender: 'female' | 'male' = 'female';

export type ArabicVoiceSource = 'online' | 'device';

export interface ArabicVoicePreference {
  /** 'online' fetches the voice and falls back to the device; 'device' never fetches. */
  source: ArabicVoiceSource;
  /** A specific installed voice, or null for the best one the phone has. */
  voiceId: string | null;
}

/** One of the phone's installed Arabic voices, as the picker shows it. */
export interface ArabicDeviceVoice {
  identifier: string;
  name: string;
  language: string;
  quality: 'enhanced' | 'default' | 'compact';
  gender?: 'female' | 'male';
}

let preference: ArabicVoicePreference = { source: 'online', voiceId: null };

/** The learner's choice, persisted in settings and handed here by the hook. */
export function setArabicVoicePreference(next: ArabicVoicePreference) {
  if (next.source !== preference.source || next.voiceId !== preference.voiceId) {
    preference = { ...next };
    voicePromise = null; // re-resolve on next use
  }
}

export function getArabicVoicePreference(): ArabicVoicePreference {
  return preference;
}

export function setArabicVoiceGender(gender: 'female' | 'male') {
  if (gender !== preferredGender) {
    preferredGender = gender;
    voicePromise = null; // re-resolve on next use
  }
}

const named = (v: Speech.Voice) => `${v.identifier || ''} ${v.name || ''}`.toLowerCase();

const qualityOf = (v: Speech.Voice): ArabicDeviceVoice['quality'] => {
  const id = named(v);
  if (String(v.quality || '').toLowerCase().includes('enhanced') || id.includes('premium') || id.includes('enhanced')) return 'enhanced';
  if (id.includes('compact')) return 'compact';
  return 'default';
};

const genderOf = (v: Speech.Voice): ArabicDeviceVoice['gender'] => {
  const id = named(v);
  if (FEMALE.some((w) => id.includes(w))) return 'female';
  if (MALE.some((w) => id.includes(w))) return 'male';
  return undefined;
};

/** Quality first, then the preferred gender; compact cuts last. */
const score = (v: Speech.Voice) => {
  const id = named(v);
  let n = 0;
  if (String(v.quality || '').toLowerCase().includes('enhanced')) n += 100;
  if (id.includes('premium')) n += 60;
  if (id.includes('enhanced')) n += 50;
  if (id.includes('-network')) n += 45;
  if (id.includes('super-compact')) n -= 80;
  else if (id.includes('compact')) n -= 40;
  const wanted = preferredGender === 'male' ? MALE : FEMALE;
  if (wanted.some((w) => id.includes(w))) n += 25;
  return n;
};

async function arabicVoices(): Promise<Speech.Voice[]> {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    return voices
      .filter((v) => (v.language || '').startsWith('ar') || (v.language || '').includes('Arab'))
      .sort((a, b) => score(b) - score(a));
  } catch {
    return [];
  }
}

/** Every Arabic voice installed on the phone, best first, for the picker. */
export async function listArabicDeviceVoices(): Promise<ArabicDeviceVoice[]> {
  return (await arabicVoices()).map((v) => ({
    identifier: v.identifier,
    name: v.name || v.identifier,
    language: v.language || 'ar',
    quality: qualityOf(v),
    gender: genderOf(v),
  }));
}

async function bestArabicVoice(): Promise<string | undefined> {
  if (voicePromise) return voicePromise;
  voicePromise = (async () => {
    const voices = await arabicVoices();
    if (voices.length === 0) return undefined;
    // A voice the learner picked wins, as long as it is still installed.
    if (preference.voiceId && voices.some((v) => v.identifier === preference.voiceId)) return preference.voiceId;
    return voices[0]?.identifier;
  })();
  return voicePromise;
}

/**
 * Speak one line on the device and resolve when it has finished.
 *
 * Used both when the learner has chosen the device voice and when the fetched
 * voice cannot be reached. It has to be awaited: the old fallback returned as
 * soon as speech started, so the loop moved to the next line and cut the
 * previous one off after a word. A watchdog scaled to the text keeps a voice
 * that never reports completion from hanging the utterance.
 */
function speakOnDevice(text: string, speed: number, myGen: number, gen: () => number): Promise<void> {
  return new Promise<void>((resolve) => {
    let settled = false;
    let watchdog: ReturnType<typeof setTimeout> | null = null;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (watchdog) clearTimeout(watchdog);
      resolve();
    };
    void (async () => {
      const voice = await bestArabicVoice();
      if (myGen !== gen()) return finish();
      try { Speech.stop(); } catch {}
      try {
        Speech.speak(text, {
          language: 'ar',
          voice,
          // Slightly under normal: Arabic on-device voices run fast for a learner.
          rate: Math.max(0.1, Math.min(1, speed * 0.9)),
          pitch: 1.0,
          onDone: finish,
          onStopped: finish,
          onError: finish,
        });
      } catch {
        return finish();
      }
      // Generous: about 8 characters a second at normal speed, plus slack.
      const budget = (text.length / 8) * 1000 * (1 / Math.max(0.3, speed)) + 4000;
      watchdog = setTimeout(finish, budget);
    })();
  });
}

/** Warms the voice list so the first offline tap does not wait on it. */
export function prewarmArabicVoice() {
  void bestArabicVoice();
}

const AUDIO_ID = 'arabicTTS';
registerAudioProducer(AUDIO_ID, 'speech', () => stopArabic());

export function stopArabic(): void {
  try { Speech.stop(); } catch {}
  generation++;
  teardownCurrent();
}


/**
 * Speak one piece of Arabic. The single-utterance door onto the same engine
 * that `playArabicLines` uses — there is no second implementation behind it.
 */
export async function speakArabic(
  text: string,
  options: Omit<ArabicPlayOptions, 'onLineStart' | 'startIndex'> = {}
): Promise<void> {
  return playArabicLines([text], options);
}

/** True while an utterance is in flight. */
export function isArabicSpeaking(): boolean {
  return currentPlayer !== null;
}
