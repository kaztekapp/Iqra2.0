/**
 * A screen's handle on the story reading.
 *
 * The reading itself lives in `services/storyNarration` and outlives the
 * screen: pressing back leaves the voice going, and the "now reading" bar
 * elsewhere in the app pauses, stops or returns to it. This hook builds the
 * queue for the blocks on screen, attaches it (a no-op when it is the same
 * reading the engine already holds, which is what makes coming back
 * seamless), and exposes the engine's state and controls under the names
 * the screens have always used.
 */
import { useEffect, useMemo } from 'react';
import { usePathname } from 'expo-router';
import { useLocalizedContent } from './useLocalizedContent';
import { useSettingsStore } from '../stores/settingsStore';
import { NarrationLang } from '../services/storyAudioService';
import {
  useNarrationStore,
  buildUtterances,
  secondsFrom,
  attachNarration,
  startNarration,
  stopNarration,
  pauseNarration,
  resumeNarration,
  toggleNarration,
  skipNarrationBlocks,
  seekNarrationToBlock,
  seekNarrationToFraction,
  setNarrationPace,
  toggleNarrationPace,
  setNarrationSleep,
  setNarrationVoice,
  saveNarrationOffline,
  narrationOfflineCount,
} from '../services/storyNarration';

import type { NarratableBlock, NarrationNowPlaying } from '../services/storyNarration';

export type {
  NarrationStatus,
  NarrationPace,
  SleepOption,
  NarratableBlock,
  NarrationNowPlaying,
} from '../services/storyNarration';

export interface NarrationOptions {
  /** The chapter these blocks belong to, so the screen can reopen on it. */
  chapterId?: string;
}

export function useStoryNarration(blocks: NarratableBlock[], nowPlaying?: NarrationNowPlaying, options?: NarrationOptions) {
  // Narration follows the same language setting the text on screen does, so
  // the voice never reads English while the reader shows French.
  const { lc, language } = useLocalizedContent();
  const lang: NarrationLang = language === 'fr' ? 'fr' : 'en';
  const route = usePathname();
  const voice = useSettingsStore((s) => s.narrationVoice);

  const utterances = useMemo(() => buildUtterances(blocks, lang, lc), [blocks, lang, lc]);

  // Same story, same chapter, same language: the same reading. The ids at
  // both ends and the count tell chapters of one story apart.
  const key = `${route}|${lang}|${blocks.length}|${blocks[0]?.id ?? ''}|${blocks[blocks.length - 1]?.id ?? ''}`;
  const title = nowPlaying?.title ?? '';
  const artist = nowPlaying?.artist;
  const chapterId = options?.chapterId;

  useEffect(() => {
    if (!blocks.length) return;
    attachNarration({ key, route, chapterId, title, artist, lang, utterances, blockCount: blocks.length });
  }, [key, route, chapterId, title, artist, lang, utterances, blocks.length]);

  const session = useNarrationStore((s) => s.session);
  const mine = session?.key === key;
  const status = useNarrationStore((s) => (mine ? s.status : 'idle'));
  const index = useNarrationStore((s) => (mine ? s.index : 0));
  const pace = useNarrationStore((s) => s.pace);
  const sleep = useNarrationStore((s) => s.sleep);
  const engine = useNarrationStore((s) => s.engine);

  const totalSeconds = useMemo(() => secondsFrom(utterances, 0, pace), [utterances, pace]);
  const remainingSeconds = useMemo(() => secondsFrom(utterances, index, pace), [utterances, index, pace]);

  const current = utterances[index];

  return {
    status,
    isActive: status !== 'idle',
    isPlaying: status === 'playing',
    pace,
    index,
    total: utterances.length,
    currentBlockId: current?.blockId ?? null,
    currentBlockIndex: current?.blockIndex ?? 0,
    blockCount: blocks.length,
    progress: utterances.length ? index / utterances.length : 0,
    remainingSeconds,
    elapsedSeconds: Math.max(0, totalSeconds - remainingSeconds),
    totalSeconds,
    sleep,
    setSleep: setNarrationSleep,
    voice,
    setVoice: setNarrationVoice,
    // True once the device's own voice is doing the reading, which on iOS
    // means quality depends on what the owner has downloaded.
    usingDeviceVoice: engine === 'device',
    // False when a male voice was asked for but the reading is female,
    // because only the fetched neural voice has a male option.
    voiceApplies: voice === 'female' || engine === null || engine === 'edge',
    start: startNarration,
    stop: stopNarration,
    toggle: toggleNarration,
    pause: pauseNarration,
    resume: resumeNarration,
    skipBlocks: skipNarrationBlocks,
    seekToBlock: seekNarrationToBlock,
    seekToFraction: seekNarrationToFraction,
    setPace: setNarrationPace,
    togglePace: toggleNarrationPace,
    saveOffline: saveNarrationOffline,
    offlineCount: narrationOfflineCount,
    utteranceCount: utterances.length,
  };
}

export default useStoryNarration;
