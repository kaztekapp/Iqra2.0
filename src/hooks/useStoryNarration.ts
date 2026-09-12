/**
 * Listening to a story.
 *
 * The story is flattened once into a queue of sentence-sized utterances, each
 * remembering which block it came from. Playback is a single async loop over
 * that queue, and the loop is owned by a "run" number: starting playback
 * increments it, and any older loop that wakes up to find the number changed
 * returns without speaking or advancing.
 *
 * That is the whole defence against hearing something twice. Every control —
 * play, pause, skip, speed, changing chapter, leaving the screen — either
 * lets the current loop continue or supersedes it; nothing ever leaves two
 * loops running, and a superseded loop cannot advance the index it no longer
 * owns.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useLocalizedContent } from './useLocalizedContent';
import { useSettingsStore } from '../stores/settingsStore';
import {
  storyAudioService,
  estimateSeconds,
  NarrationLang,
  NarrationEngine,
  VoiceGender,
} from '../services/storyAudioService';
import { prepareForSpeech, splitSentences, speechKey, splitQuranRuns } from '../services/narrationText';
import {
  speakArabic,
  stopArabic,
  prewarmArabicVoice,
  isArabicSpeaking,
  setArabicNowPlaying,
} from '../services/speech/arabicTTS';

export type NarrationStatus = 'idle' | 'loading' | 'playing' | 'paused';
export type NarrationSpeed = 0.75 | 1 | 1.25 | 1.5;
/** Minutes, or off. Listening at night is the reason this exists. */
export type SleepOption = 'off' | 5 | 15 | 30 | 45;

/** The shape both prophet-story and Quran-story blocks already have. */
export interface NarratableBlock {
  id: string;
  type: 'narrative' | 'quran_source' | 'hadith_source';
  content: string;
  contentFr?: string;
  source?: {
    type: 'quran' | 'hadith';
    translation: string;
    translationFr?: string;
  } | null;
}

/**
 * A line of the Quran quoted inside the prose is its own utterance, spoken by
 * the app's Arabic voice — the English and French voices cannot read it.
 */
type UtteranceLang = NarrationLang | 'ar';

interface Utterance {
  text: string;
  lang: UtteranceLang;
  blockId: string;
  blockIndex: number;
  seconds: number;
}

/** Breath between sentences, and a longer settling pause between blocks. */
const GAP_SENTENCE = 260;
const GAP_BLOCK = 620;

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

/** What the lock screen names while this story is being read. */
export interface NarrationNowPlaying {
  title: string;
  artist?: string;
}

export function useStoryNarration(blocks: NarratableBlock[], nowPlaying?: NarrationNowPlaying) {
  // Narration follows the same language setting the text on screen does, so
  // the voice never reads English while the reader shows French.
  const { lc, language } = useLocalizedContent();
  const lang: NarrationLang = language === 'fr' ? 'fr' : 'en';

  const voice = useSettingsStore((s) => s.narrationVoice);
  const storeVoice = useSettingsStore((s) => s.setNarrationVoice);

  const [status, setStatus] = useState<NarrationStatus>('idle');
  const [index, setIndex] = useState(0);
  const [speed, setSpeedState] = useState<NarrationSpeed>(1);
  const [sleep, setSleep] = useState<SleepOption>('off');
  const [engine, setEngine] = useState<NarrationEngine | null>(null);

  const runRef = useRef(0);
  const indexRef = useRef(0);
  const statusRef = useRef<NarrationStatus>('idle');
  const speedRef = useRef<NarrationSpeed>(1);
  const pausedByStopRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    storyAudioService.setGender(voice);
  }, [voice]);

  /**
   * Flatten the story.
   *
   * A Quran block is read by its caption alone. The caption is the verse put
   * into the story's own words, and reading the ayah and then its meaning
   * after it turns the listening into a recitation drill — lead, Arabic,
   * translation, lead, Arabic, translation — which is not what a story
   * sounds like. The verse is on screen to be read. Where a story sets its
   * ayahs a second time as ﴿Arabic﴾ runs in its prose, that prose is what
   * carries them to the ear, woven into the telling rather than announced.
   *
   * A hadith block keeps its translation, because there the caption only
   * frames the report ("the Prophet spoke of Musa and the Angel of Death")
   * and the report itself is what carries the story.
   *
   * A caption that merely restates the line before it is dropped rather than
   * said twice.
   */
  const utterances = useMemo<Utterance[]>(() => {
    const out: Utterance[] = [];
    let lastKey = '';

    const push = (raw: string, blockId: string, blockIndex: number) => {
      // A conversation in the story quotes the Quran line by line: the
      // Arabic first, then its meaning. "Musa said," is read by the story's
      // voice, the Arabic by the Arabic voice, and the meaning by the story's
      // voice again — the same cadence a teacher uses.
      for (const segment of splitQuranRuns(raw)) {
        if (segment.kind === 'quran') {
          const key = speechKey(segment.text);
          if (!key || key === lastKey) continue;
          lastKey = key;
          out.push({ text: segment.text, lang: 'ar', blockId, blockIndex, seconds: 0 });
          continue;
        }
        const prepared = prepareForSpeech(segment.text, lang);
        for (const sentence of splitSentences(prepared)) {
          const key = speechKey(sentence);
          if (!key || key === lastKey) continue;
          lastKey = key;
          out.push({ text: sentence, lang, blockId, blockIndex, seconds: 0 });
        }
      }
    };

    blocks.forEach((block, blockIndex) => {
      const caption = lc(block.content, block.contentFr);
      if (block.type === 'narrative') {
        push(caption, block.id, blockIndex);
        return;
      }
      push(caption, block.id, blockIndex);

      const translation = block.source ? lc(block.source.translation, block.source.translationFr) : '';
      if (!translation) return;

      // Read a verse only when there is no caption to carry the block, so
      // that a block without one is never passed over in silence.
      const readsTranslation = block.source?.type === 'hadith' || !caption.trim();
      if (readsTranslation) push(translation, block.id, blockIndex);
    });

    return out;
  }, [blocks, lang, lc]);

  const totalSeconds = useMemo(
    () => utterances.reduce((sum, u) => sum + estimateSeconds(u.text, speed), 0),
    [utterances, speed]
  );

  const remainingSeconds = useMemo(() => {
    let sum = 0;
    for (let i = index; i < utterances.length; i++) sum += estimateSeconds(utterances[i].text, speed);
    return sum;
  }, [utterances, index, speed]);

  const current = utterances[index];
  const currentBlockId = current?.blockId ?? null;
  const currentBlockIndex = current?.blockIndex ?? 0;

  /** The loop. Owns `run`; exits the moment it stops being current. */
  const run = useCallback(
    async (from: number) => {
      const mine = ++runRef.current;
      pausedByStopRef.current = false;

      setStatus('loading');
      await storyAudioService.prime(lang);
      if (mine !== runRef.current) return;
      if (utterances.some((u) => u.lang === 'ar')) prewarmArabicVoice();
      setStatus('playing');

      for (let i = from; i < utterances.length; i++) {
        if (mine !== runRef.current) return;

        setIndex(i);
        indexRef.current = i;

        const utterance = utterances[i];
        const result =
          utterance.lang === 'ar'
            ? await speakQuranLine(utterance.text, speedRef.current)
            : await storyAudioService.speak(utterance.text, speedRef.current, lang);
        setEngine(storyAudioService.getEngine());

        if (mine !== runRef.current) return;
        if (result === 'error') {
          setStatus('idle');
          return;
        }
        if (result !== 'done') return; // stopped by someone else — do not advance

        const next = utterances[i + 1];
        const gap = next && next.blockIndex !== utterance.blockIndex ? GAP_BLOCK : GAP_SENTENCE;
        await new Promise((r) => setTimeout(r, gap));
        if (mine !== runRef.current) return;
      }

      if (mine !== runRef.current) return;
      setStatus('idle');
      setIndex(0);
      indexRef.current = 0;
    },
    [utterances, lang]
  );

  const start = useCallback(
    (fromIndex = 0) => {
      void run(Math.max(0, Math.min(fromIndex, Math.max(0, utterances.length - 1))));
    },
    [run, utterances.length]
  );

  const stop = useCallback(async () => {
    runRef.current++;
    pausedByStopRef.current = false;
    storyAudioService.resetSession();
    stopArabic();
    await storyAudioService.stop();
    setStatus('idle');
    setIndex(0);
    indexRef.current = 0;
  }, []);

  /**
   * Pause without killing the loop where the platform supports it: the
   * pending utterance promise simply stays pending, so resuming picks the
   * sentence up mid-word. Where it does not, the loop ends and resuming
   * restarts that one sentence.
   */
  const pause = useCallback(async () => {
    // The Arabic voice has no pause; the line is cut and restarted on resume.
    if (utterances[indexRef.current]?.lang === 'ar') {
      stopArabic();
      pausedByStopRef.current = true;
      setStatus('paused');
      return;
    }
    const reallyPaused = await storyAudioService.pause();
    pausedByStopRef.current = !reallyPaused;
    setStatus('paused');
  }, [utterances]);

  // Sleep timer. It pauses rather than stops, so the story is exactly where
  // it was left when the listener comes back to it.
  useEffect(() => {
    if (sleep === 'off') return;
    const handle = setTimeout(() => {
      void pause();
      setSleep('off');
    }, sleep * 60 * 1000);
    return () => clearTimeout(handle);
  }, [sleep, pause]);

  const resume = useCallback(async () => {
    if (pausedByStopRef.current) {
      pausedByStopRef.current = false;
      void run(indexRef.current);
      return;
    }
    setStatus('playing');
    await storyAudioService.resume();
  }, [run]);

  const toggle = useCallback(() => {
    if (status === 'playing') void pause();
    else if (status === 'paused') void resume();
    else start(indexRef.current);
  }, [status, pause, resume, start]);

  /** Jump whole blocks — a paragraph is the unit a listener thinks in. */
  const skipBlocks = useCallback(
    (delta: number) => {
      if (!utterances.length) return;
      const here = utterances[indexRef.current]?.blockIndex ?? 0;
      const target = here + delta;
      let candidate = utterances.findIndex((u) => u.blockIndex === target);
      if (candidate === -1) candidate = delta < 0 ? 0 : utterances.length - 1;
      void run(candidate);
    },
    [utterances, run]
  );

  const seekToBlock = useCallback(
    (blockIndex: number) => {
      const candidate = utterances.findIndex((u) => u.blockIndex === blockIndex);
      if (candidate >= 0) void run(candidate);
    },
    [utterances, run]
  );

  const seekToFraction = useCallback(
    (fraction: number) => {
      if (!utterances.length) return;
      const target = Math.round(fraction * (utterances.length - 1));
      void run(Math.max(0, Math.min(target, utterances.length - 1)));
    },
    [utterances, run]
  );

  const setVoice = useCallback(
    (next: VoiceGender) => {
      if (next === voice) return;
      storeVoice(next);
      storyAudioService.setGender(next);

      // Take effect on the sentence being read, not the one after it.
      // Deferring it is what made the switch feel broken: tap male, and a
      // long sentence keeps you listening to the old voice for another
      // twenty seconds, which reads as nothing having happened.
      //
      // Re-reading the line from its start is the only honest way to change
      // voice mid-sentence, and it is exactly the teardown a skip already
      // performs, so it is no more dangerous than the back button.
      //
      // Asking for male also sends the session back to the top of the engine
      // ladder, since the fetched neural voice is the only one that has a
      // male option. If it cannot be reached, the reading stays female
      // rather than dropping to the phone's own male voice.
      if (status === 'playing' || status === 'loading') void run(indexRef.current);
    },
    [voice, storeVoice, status, run]
  );

  const setSpeed = useCallback((next: NarrationSpeed) => {
    // The engine fixes rate when an utterance starts, so this lands on the
    // next sentence. Restarting the current one to apply it sooner would mean
    // saying it twice, which is never worth it.
    setSpeedState(next);
    speedRef.current = next;
  }, []);

  /**
   * Lock-screen controls, the same ones the Quran player puts up.
   *
   * The title is the story, not the sentence: a listener glancing at a locked
   * phone wants to know what is being read, and a line of narration changing
   * four times a minute is noise. The transport works the story rather than
   * the clip - pausing from the lock screen pauses the reading, and playing
   * resumes it - so the two never disagree about whether a story is running.
   */
  const title = nowPlaying?.title;
  const artist = nowPlaying?.artist;
  useEffect(() => {
    if (!title) return;
    const meta = { title, artist, albumTitle: artist };
    storyAudioService.setNowPlaying(meta);
    setArabicNowPlaying(meta);
    storyAudioService.setTransportListener((next) => {
      setStatus((current) => (current === 'idle' ? current : next));
    });
    return () => {
      storyAudioService.setTransportListener(null);
      storyAudioService.setNowPlaying(null);
      setArabicNowPlaying(null);
    };
  }, [title, artist]);

  // Leaving the screen must not leave a voice talking, or the audio session
  // held open behind it.
  useEffect(() => {
    return () => {
      runRef.current++;
      stopArabic();
      void storyAudioService.stop().then(() => storyAudioService.releaseSession());
    };
  }, []);

  /**
   * The app going to the background.
   *
   * Someone listening with the screen off is the point of background audio,
   * so a story that is playing - or paused, waiting to be resumed - is left
   * alone. An idle one has no business holding the session: the screen is
   * simply the last one open, and iOS will keep the whole app alive around a
   * silent session for as long as it is held, which is what left the app
   * wedged on return. Coming back to the foreground, an utterance that lost
   * its audio while the app was suspended is cleared rather than waited on.
   */
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (next === 'active') {
        if (statusRef.current !== 'playing' && isArabicSpeaking()) stopArabic();
        return;
      }
      if (next !== 'background') return;
      if (statusRef.current !== 'idle') return;
      runRef.current++;
      stopArabic();
      void storyAudioService.stop().then(() => storyAudioService.releaseSession());
    });
    return () => sub.remove();
  }, []);

  // Changing chapter replaces the queue; anything still speaking is stale.
  useEffect(() => {
    runRef.current++;
    storyAudioService.resetSession();
    stopArabic();
    void storyAudioService.stop();
    setStatus('idle');
    setIndex(0);
    indexRef.current = 0;
  }, [utterances]);

  return {
    status,
    isActive: status !== 'idle',
    isPlaying: status === 'playing',
    speed,
    index,
    total: utterances.length,
    currentBlockId,
    currentBlockIndex,
    blockCount: blocks.length,
    progress: utterances.length ? index / utterances.length : 0,
    remainingSeconds,
    elapsedSeconds: Math.max(0, totalSeconds - remainingSeconds),
    totalSeconds,
    sleep,
    setSleep,
    voice,
    setVoice,
    // True once the device's own voice is doing the reading, which on iOS
    // means quality depends on what the owner has downloaded.
    usingDeviceVoice: engine === 'device',
    // False when a male voice was asked for but the reading is female,
    // because only the fetched neural voice has a male option.
    voiceApplies: voice === 'female' || engine === null || engine === 'edge',
    start,
    stop,
    toggle,
    pause,
    resume,
    skipBlocks,
    seekToBlock,
    seekToFraction,
    setSpeed,
  };
}

export default useStoryNarration;
