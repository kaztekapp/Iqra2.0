/**
 * Listening to a story — the engine.
 *
 * This used to live inside the story screen's hook, which meant the reading
 * ended the moment the screen did: press back and the voice stopped. Now the
 * queue, the loop and the transport live here, at module level, and the
 * screen only attaches to them. Leaving the screen leaves the reading
 * running; a small "now reading" bar elsewhere in the app pauses it, stops
 * it, or brings the story back. Coming back to the story finds the reading
 * exactly where it is.
 *
 * The story is flattened once into a queue of sentence-sized utterances,
 * each remembering which block it came from. Playback is a single async loop
 * over that queue, and the loop is owned by a "run" number: starting playback
 * increments it, and any older loop that wakes up to find the number changed
 * returns without speaking or advancing.
 *
 * That is the whole defence against hearing something twice. Every control —
 * play, pause, skip, speed, changing chapter, another story — either lets the
 * current loop continue or supersedes it; nothing ever leaves two loops
 * running, and a superseded loop cannot advance the index it no longer owns.
 */
import { AppState } from 'react-native';
import { after, sleep } from './speech/audioClock';
import { create } from 'zustand';
import { useSettingsStore } from '../stores/settingsStore';
import {
  storyAudioService,
  estimateSeconds,
  NarrationLang,
  NarrationEngine,
  VoiceGender,
} from './storyAudioService';
import { buildUtterances, type NarratableBlock, type Utterance, type UtteranceLang } from './narrationPlan';
import { releaseAudioSessionIfIdle } from './audioBus';
import { onWifi, roomToKeep } from '../lib/offlineRoom';
import { useNarrationResumeStore } from '../stores/narrationResumeStore';
import {
  speakArabic,
  stopArabic,
  prewarmArabicVoice,
  isArabicSpeaking,
  setArabicNowPlaying,
  prepareArabic,
  discardPreparedArabic,
  setArabicVoiceGender,
  forgiveArabicEdge,
  hasArabicClip,
  saveArabicClip,
} from './speech/arabicTTS';

export { buildUtterances };
export type { NarratableBlock, Utterance, UtteranceLang };

export type NarrationStatus = 'idle' | 'loading' | 'playing' | 'paused';

/**
 * How fast the reading goes.
 *
 * There used to be four multipliers. A multiplier is a setting for a podcast;
 * this is a story with the Quran in it, and nobody wants an ayah at 1.5. Two
 * paces: the one the story is written for, and one for following along.
 */
export type NarrationPace = 'normal' | 'slow';

/**
 * The pace applies to the ARABIC voice only - a quoted ayah, a dua, the words
 * of a hadith. The story around it is prose in a language the reader speaks,
 * and slowing that down helps nobody; the Arabic is the part someone wants to
 * follow word by word, or recite along with. The number is a prosody rate for
 * the Arabic engine (see edgeRate in arabicTTS), not a stretched clip.
 */
export const ARABIC_PACE_RATE: Record<NarrationPace, number> = { normal: 1, slow: 0.6 };

/** Minutes, or off. Listening at night is the reason this exists. */
export type SleepOption = 'off' | 5 | 15 | 30 | 45;

/** The shape both prophet-story and Quran-story blocks already have. */
/** What the lock screen and the "now reading" bar name. */
export interface NarrationNowPlaying {
  title: string;
  artist?: string;
}

/** One attached reading: which story, in which language, and its queue. */
export interface NarrationSession extends NarrationNowPlaying {
  /** Same key, same reading: attaching again changes nothing. */
  key: string;
  /** Where to go to see the story being read. */
  route: string;
  /** The chapter, for a story that has several; the screen restores it. */
  chapterId?: string;
  lang: NarrationLang;
  utterances: Utterance[];
  blockCount: number;
}

interface NarrationState {
  status: NarrationStatus;
  index: number;
  pace: NarrationPace;
  sleep: SleepOption;
  engine: NarrationEngine | null;
  session: NarrationSession | null;
}

export const useNarrationStore = create<NarrationState>(() => ({
  status: 'idle',
  index: 0,
  pace: 'normal',
  sleep: 'off',
  engine: null,
  session: null,
}));

const get = useNarrationStore.getState;
const set = useNarrationStore.setState;

/** Breath between sentences, and a longer settling pause between blocks. */
const GAP_SENTENCE = 260;
const GAP_BLOCK = 620;

// ---- Building the queue --------------------------------------------------


/** Seconds of listening left from an index, at a pace. */
export function secondsFrom(utterances: Utterance[], from: number, pace: NarrationPace): number {
  let sum = 0;
  for (let i = Math.max(0, from); i < utterances.length; i++) {
    const u = utterances[i];
    sum += estimateSeconds(u.text, u.lang === 'ar' ? ARABIC_PACE_RATE[pace] : 1);
  }
  return sum;
}

// ---- The loop ------------------------------------------------------------

let run = 0;
let pausedByStop = false;

/**
 * One quoted line of the Quran, through the Arabic voice the learner chose.
 *
 * `speakArabic` resolves whether the line finished or was cut off, so the
 * finish is taken from its own callback: a line that was stopped — by a
 * pause, a skip, or another producer claiming the audio — must not advance
 * the queue, exactly as a stopped story sentence does not.
 */
async function speakQuranLine(text: string, speed: number): Promise<'done' | 'stopped'> {
  let finished = false;
  await speakArabic(text, {
    speed,
    onDone: () => { finished = true; },
    // No Arabic voice at all, online or on the phone: the meaning that
    // follows still gets read rather than the story falling silent here.
    onError: () => { finished = true; },
  });
  return finished ? 'done' : 'stopped';
}

function silence() {
  stopArabic();
  discardPreparedArabic();
  storyAudioService.discardPrepared();
}

/** Owns `run`; exits the moment it stops being current. */
async function loop(from: number): Promise<void> {
  const mine = ++run;
  pausedByStop = false;
  const session = get().session;
  if (!session) return;
  const { utterances, lang } = session;

  set({ status: 'loading' });
  await storyAudioService.prime(lang);
  if (mine !== run) return;
  if (utterances.some((u) => u.lang === 'ar')) prewarmArabicVoice();
  set({ status: 'playing' });

  for (let i = from; i < utterances.length; i++) {
    if (mine !== run) return;
    set({ index: i });
    // Remembered on the phone, so the reading survives the app being closed.
    useNarrationResumeStore.getState().savePosition(session.key, i);

    const utterance = utterances[i];
    // Fetch the next line while this one plays, so the gap between them is
    // a file swap and not a network round trip.
    const upcoming = utterances[i + 1];
    if (upcoming) {
      if (upcoming.lang === 'ar') prepareArabic(upcoming.text, ARABIC_PACE_RATE[get().pace]);
      else storyAudioService.prepare(upcoming.text, lang);
    }
    const result =
      utterance.lang === 'ar'
        ? await speakQuranLine(utterance.text, ARABIC_PACE_RATE[get().pace])
        : await storyAudioService.speak(utterance.text, 1, lang);
    set({ engine: storyAudioService.getEngine() });

    if (mine !== run) return;
    if (result === 'error') {
      set({ status: 'idle' });
      return;
    }
    if (result !== 'done') {
      // Cut off by someone else — a tapped word on another screen, a
      // recitation started — while this loop is still the current one. It
      // does not advance; it waits as paused, so a tap on play carries on
      // from this line instead of the reading looking alive but silent.
      pausedByStop = true;
      set({ status: 'paused' });
      return;
    }

    const next = utterances[i + 1];
    const gap = next && next.blockIndex !== utterance.blockIndex ? GAP_BLOCK : GAP_SENTENCE;
    // Not setTimeout: Android pauses JS timers in the background (see audioClock).
    await sleep(gap);
    if (mine !== run) return;
  }

  if (mine !== run) return;
  // Heard to the end: the next listen starts from the beginning.
  useNarrationResumeStore.getState().clearPosition(session.key);
  set({ status: 'idle', index: 0 });
  releaseAudioSessionIfIdle();
}

// ---- Transport -----------------------------------------------------------

export function isNarrationActive(): boolean {
  return get().status !== 'idle';
}

export function narrationSession(): NarrationSession | null {
  return get().session;
}

/**
 * Attach a reading. The same key is the same reading and nothing changes —
 * the screen came back, or re-rendered. A different key replaces the queue:
 * anything still speaking is stale.
 */
export function attachNarration(session: NarrationSession): void {
  const current = get().session;
  if (current?.key === session.key) {
    if (current.title !== session.title || current.artist !== session.artist) {
      set({ session: { ...current, title: session.title, artist: session.artist } });
      publishNowPlaying(session);
    }
    return;
  }
  run++;
  pausedByStop = false;
  storyAudioService.resetSession();
  silence();
  void storyAudioService.stop();
  // A reading left part-way, even in an earlier launch, picks up there.
  const saved = useNarrationResumeStore.getState().positions[session.key]?.index ?? 0;
  set({ session, status: 'idle', index: saved < session.utterances.length ? saved : 0 });
  publishNowPlaying(session);
}

/**
 * Lock-screen controls, the same ones the Quran player puts up.
 *
 * The title is the story, not the sentence: a listener glancing at a locked
 * phone wants to know what is being read, and a line of narration changing
 * four times a minute is noise. The transport works the story rather than
 * the clip - pausing from the lock screen pauses the reading, and playing
 * resumes it - so the two never disagree about whether a story is running.
 */
function publishNowPlaying(session: NarrationSession | null): void {
  if (!session?.title) {
    storyAudioService.setTransportListener(null);
    storyAudioService.setNowPlaying(null);
    setArabicNowPlaying(null);
    return;
  }
  const meta = { title: session.title, artist: session.artist, albumTitle: session.artist };
  storyAudioService.setNowPlaying(meta);
  setArabicNowPlaying(meta);
  storyAudioService.setTransportListener((next) => {
    if (get().status !== 'idle') set({ status: next });
  });
}

export function startNarration(fromIndex = 0): void {
  const session = get().session;
  if (!session) return;
  // A rest taken during the last reading - a tunnel, a dropped signal - must
  // not decide that this one is read by the phone.
  forgiveArabicEdge();
  const from = Math.max(0, Math.min(fromIndex, Math.max(0, session.utterances.length - 1)));
  void loop(from);
  void saveAhead(session, from);
}

/**
 * On Wi-Fi, keep the rest of this reading on the phone while it plays, so a
 * story begun at home finishes on the train. Quietly: the lines are queued
 * behind the ones being heard, a line that will not save is skipped, and it
 * stops when the reading ends or changes, or the phone runs short of space.
 */
let savingAhead: NarrationSession | null = null;
async function saveAhead(session: NarrationSession, from: number): Promise<void> {
  if (savingAhead === session || !(await onWifi())) return;
  savingAhead = session;
  try {
    const { utterances, lang } = session;
    // The next line is already being fetched for playback.
    for (let i = from + 2; i < utterances.length; i++) {
      if (get().session !== session || get().status === 'idle' || !roomToKeep()) return;
      const u = utterances[i];
      try {
        if (u.lang === 'ar') await saveArabicClip(u.text, ARABIC_PACE_RATE[get().pace]);
        else await storyAudioService.saveClip(u.text, lang);
      } catch {
        // Skipped: playback fetches it when its turn comes.
      }
    }
  } finally {
    if (savingAhead === session) savingAhead = null;
  }
}

export async function stopNarration(): Promise<void> {
  run++;
  pausedByStop = false;
  storyAudioService.resetSession();
  silence();
  await storyAudioService.stop();
  set({ status: 'idle', index: 0 });
  releaseAudioSessionIfIdle();
}

/**
 * Pause without killing the loop where the platform supports it: the
 * pending utterance promise simply stays pending, so resuming picks the
 * sentence up mid-word. Where it does not, the loop ends and resuming
 * restarts that one sentence.
 */
export async function pauseNarration(): Promise<void> {
  const { session, index } = get();
  // The Arabic voice has no pause; the line is cut and restarted on resume.
  if (session?.utterances[index]?.lang === 'ar') {
    pausedByStop = true;
    set({ status: 'paused' });
    stopArabic();
    return;
  }
  const reallyPaused = await storyAudioService.pause();
  pausedByStop = !reallyPaused;
  set({ status: 'paused' });
}

export async function resumeNarration(): Promise<void> {
  if (pausedByStop) {
    pausedByStop = false;
    void loop(get().index);
    return;
  }
  set({ status: 'playing' });
  await storyAudioService.resume();
}

export function toggleNarration(): void {
  const { status, index } = get();
  if (status === 'playing') void pauseNarration();
  else if (status === 'paused') void resumeNarration();
  else startNarration(index);
}

/** Jump whole blocks — a paragraph is the unit a listener thinks in. */
export function skipNarrationBlocks(delta: number): void {
  const { session, index } = get();
  const utterances = session?.utterances ?? [];
  if (!utterances.length) return;
  const here = utterances[index]?.blockIndex ?? 0;
  const target = here + delta;
  let candidate = utterances.findIndex((u) => u.blockIndex === target);
  if (candidate === -1) candidate = delta < 0 ? 0 : utterances.length - 1;
  void loop(candidate);
}

export function seekNarrationToBlock(blockIndex: number): void {
  const utterances = get().session?.utterances ?? [];
  const candidate = utterances.findIndex((u) => u.blockIndex === blockIndex);
  if (candidate >= 0) void loop(candidate);
}

export function seekNarrationToFraction(fraction: number): void {
  const utterances = get().session?.utterances ?? [];
  if (!utterances.length) return;
  const target = Math.round(fraction * (utterances.length - 1));
  void loop(Math.max(0, Math.min(target, utterances.length - 1)));
}

export function setNarrationPace(next: NarrationPace): void {
  // The engine fixes rate when an utterance starts, so this lands on the
  // next sentence. Restarting the current one to apply it sooner would mean
  // saying it twice, which is never worth it.
  set({ pace: next });
}

export function toggleNarrationPace(): void {
  setNarrationPace(get().pace === 'normal' ? 'slow' : 'normal');
}

// Sleep timer. It pauses rather than stops, so the story is exactly where it
// was left when the listener comes back to it.
// It runs on the audio clock: a plain timer never fired in the background on
// Android, where a sleep timer is mostly used.
let cancelSleep: (() => void) | null = null;
export function setNarrationSleep(option: SleepOption): void {
  cancelSleep?.();
  cancelSleep = null;
  set({ sleep: option });
  if (option === 'off') return;
  cancelSleep = after(option * 60 * 1000, () => {
    cancelSleep = null;
    void pauseNarration();
    set({ sleep: 'off' });
  });
}

export function setNarrationVoice(next: VoiceGender): void {
  const settings = useSettingsStore.getState();
  if (next === settings.narrationVoice) return;
  settings.setNarrationVoice(next);
  storyAudioService.setGender(next);
  setArabicVoiceGender(next);
  // Take effect on the sentence being read, not the one after it. Deferring
  // it is what made the switch feel broken: tap male, and a long sentence
  // keeps you listening to the old voice for another twenty seconds, which
  // reads as nothing having happened.
  //
  // Re-reading the line from its start is the only honest way to change
  // voice mid-sentence, and it is exactly the teardown a skip already
  // performs, so it is no more dangerous than the back button.
  //
  // Asking for male also sends the session back to the top of the engine
  // ladder, since the fetched neural voice is the only one that has a male
  // option. If it cannot be reached, the reading stays female rather than
  // dropping to the phone's own male voice.
  const { status, index } = get();
  if (status === 'playing' || status === 'loading') void loop(index);
}

/**
 * Keep this reading on the phone.
 *
 * Walks the same lines the reader would hear, in the same voices, and asks
 * each engine to store its clip. Afterwards the whole thing plays with no
 * signal. Lines already stored cost nothing, so this is also how a part-saved
 * reading is finished.
 */
export async function saveNarrationOffline(
  onProgress?: (done: number, total: number) => void,
): Promise<{ total: number; failed: number }> {
  const session = get().session;
  const utterances = session?.utterances ?? [];
  const lang = session?.lang ?? 'en';
  const total = utterances.length;
  let failed = 0;
  for (let i = 0; i < total; i++) {
    const u = utterances[i];
    try {
      if (u.lang === 'ar') await saveArabicClip(u.text, ARABIC_PACE_RATE[get().pace]);
      else await storyAudioService.saveClip(u.text, lang);
    } catch {
      // One line that will not save should not stop the rest - the reader
      // gets that one from the network - but the count is returned so the
      // screen can say the save is incomplete instead of claiming success.
      failed += 1;
    }
    onProgress?.(i + 1, total);
  }
  return { total, failed };
}

/** How much of this reading is already on the phone, at the current pace. */
export function narrationOfflineCount(): number {
  const { session, pace } = get();
  const utterances = session?.utterances ?? [];
  const lang = session?.lang ?? 'en';
  return utterances.reduce((n, u) => {
    const stored = u.lang === 'ar' ? hasArabicClip(u.text, ARABIC_PACE_RATE[pace]) : storyAudioService.hasClip(u.text, lang);
    return n + (stored ? 1 : 0);
  }, 0);
}

// ---- Module wiring -------------------------------------------------------

// The voice follows the setting wherever it is changed.
{
  const apply = (voice: VoiceGender) => {
    storyAudioService.setGender(voice);
    setArabicVoiceGender(voice);
  };
  apply(useSettingsStore.getState().narrationVoice);
  useSettingsStore.subscribe((s, prev) => {
    if (s.narrationVoice !== prev.narrationVoice) apply(s.narrationVoice);
  });
}

// The service is asked "are you busy?" when the app goes to the background,
// and a story that is playing or paused must answer yes even in the silent
// quarter-second between two sentences. Releasing the session is decided on
// the audio bus, with every producer consulted - not here.
useNarrationStore.subscribe((s, prev) => {
  if (s.status !== prev.status) storyAudioService.setNarrating(s.status !== 'idle');
});

// Coming back to the foreground, an utterance that lost its audio while the
// app was suspended is cleared rather than waited on.
AppState.addEventListener('change', (next) => {
  if (next !== 'active') return;
  if (get().status !== 'playing' && isArabicSpeaking()) stopArabic();
});
