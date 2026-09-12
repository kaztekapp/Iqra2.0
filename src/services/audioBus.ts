import { AppState } from 'react-native';
import { setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';

/**
 * One place that knows what is making sound.
 *
 * The app has three audio producers — arabicTTS (all Arabic speech),
 * quranAudioService (reciter MP3s) and storyAudioService (English narration).
 * Each already guards itself correctly (own generation counter, own player,
 * pause before release), but none of them knew the others existed, so a
 * recitation and a tapped word played over each other and there was no way to
 * ask the app to just be quiet.
 *
 * Producers register a stopper here rather than importing one another, which
 * keeps the services free of a dependency cycle. Registration is by channel:
 *
 *   `speech`   — short utterances the user triggered by tapping something.
 *   `longform` — recitation and story playback, which is allowed to continue
 *                across navigation because the lock-screen controls make that
 *                a deliberate feature.
 *
 * The rule: starting anything stops everything else. That is the behaviour a
 * listener expects, and it is the only one that cannot produce two voices.
 */

type Stopper = () => void | Promise<void>;
type Channel = 'speech' | 'longform';

interface ProducerExtras {
  /** True while this producer is playing, or paused and waiting to resume. */
  isBusy?: () => boolean;
  /** Hand back whatever iOS audio session this producer configured. */
  release?: () => void | Promise<void>;
}

const producers = new Map<string, { channel: Channel; stop: Stopper } & ProducerExtras>();

export function registerAudioProducer(id: string, channel: Channel, stop: Stopper, extras: ProducerExtras = {}) {
  producers.set(id, { channel, stop, ...extras });
}

/** Is anything at all making sound, or paused mid-sound? */
export function isAnyAudioBusy(): boolean {
  for (const entry of producers.values()) {
    try {
      if (entry.isBusy?.()) return true;
    } catch {
      /* a producer that cannot answer is treated as quiet */
    }
  }
  return false;
}

/**
 * The audio-session mode, owned here so no producer can take it away from
 * another.
 *
 * expo-audio's `setAudioModeAsync` looks like it takes a partial mode, but the
 * native record fills every field it is not given with the DEFAULT - and the
 * defaults are `shouldPlayInBackground: false` and `mixWithOthers`. So the
 * Arabic voice's innocent `{ playsInSilentMode: true }`, run once before its
 * first line, silently switched background playback off for the whole app in
 * the middle of a story: the next time the phone locked, expo-audio paused
 * every player (that is what it does on entering the background with the flag
 * off), and the now-mixable session lost its lock-screen controls. Every mode
 * change now goes through here, in full, and never steps down while a
 * long-form producer holds the session.
 */
type SessionLevel = 'off' | 'speech' | 'longform';

const SESSION_MODES = {
  // Recitation and stories: primary session, keeps playing with the screen off.
  longform: { playsInSilentMode: true, shouldPlayInBackground: true, interruptionMode: 'doNotMix' as const },
  // A tapped word: audible over the silent switch, mixes with whatever plays.
  speech: { playsInSilentMode: true, shouldPlayInBackground: false, interruptionMode: 'mixWithOthers' as const },
};

let sessionLevel: SessionLevel = 'off';
// Mode changes are serialised: two producers starting together must not race
// the native session between two categories.
let sessionWork: Promise<void> = Promise.resolve();

function queueSessionWork(fn: () => Promise<void>): Promise<void> {
  sessionWork = sessionWork.then(fn, fn).catch(() => {});
  return sessionWork;
}

/**
 * Bring the session up to at least `wanted`. Resolves once the mode is in
 * place (plus the moment iOS needs before the first clip). A `speech` request
 * while a `longform` session is held is a no-op: the word plays through the
 * story's session rather than downgrading it.
 */
export function ensureAudioSession(wanted: 'speech' | 'longform'): Promise<void> {
  if (sessionLevel === wanted || sessionLevel === 'longform') return sessionWork;
  sessionLevel = wanted;
  return queueSessionWork(async () => {
    await setAudioModeAsync(SESSION_MODES[wanted]);
    await new Promise((r) => setTimeout(r, 50));
  });
}

/** Give the session back to iOS. Only `releaseAudioSessionIfIdle` calls this. */
function resetAudioSession(): Promise<void> {
  if (sessionLevel === 'off') return sessionWork;
  sessionLevel = 'off';
  return queueSessionWork(async () => {
    await setAudioModeAsync(SESSION_MODES.speech);
    // Our players keep the session alive on purpose, so the one moment
    // nothing is playing anywhere is when it is turned off.
    await setIsAudioActiveAsync(false);
  });
}

/**
 * Hand the iOS audio session back - but only when no producer needs it.
 *
 * Both long-form players put the session into `doNotMix` with background
 * playback and, until this existed, each released it on its own when IT was
 * idle. That is how a story died the moment the phone locked: the Quran
 * player, idle, saw the app go to the background and released the session
 * out from under the narration that was playing through the other service.
 * One decision, made here, with every producer consulted.
 */
export function releaseAudioSessionIfIdle(): void {
  if (isAnyAudioBusy()) return;
  for (const entry of producers.values()) {
    try {
      const result = entry.release?.();
      if (result && typeof (result as Promise<void>).catch === 'function') {
        (result as Promise<void>).catch(() => {});
      }
    } catch {
      /* the next producer still gets to release */
    }
  }
  void resetAudioSession();
}

AppState.addEventListener('change', (next) => {
  if (next === 'background') releaseAudioSessionIfIdle();
});

function runStop(id: string, entry: { stop: Stopper }) {
  try {
    const result = entry.stop();
    // Producers stop synchronously; a rejected promise here must not take the
    // caller down mid-playback.
    if (result && typeof (result as Promise<void>).catch === 'function') {
      (result as Promise<void>).catch(() => {});
    }
  } catch {
    // A producer that fails to stop must not prevent the others from stopping.
  }
}

/** Called by a producer as it starts. Silences every other producer. */
export function claimAudio(id: string) {
  for (const [key, entry] of producers) {
    if (key !== id) runStop(key, entry);
  }
}

/** Stop tapped-word speech, leaving recitation and stories playing. */
export function stopAllSpeech() {
  for (const [key, entry] of producers) {
    if (entry.channel === 'speech') runStop(key, entry);
  }
}

/** Stop absolutely everything. */
export function stopAllAudio() {
  for (const [key, entry] of producers) runStop(key, entry);
}
