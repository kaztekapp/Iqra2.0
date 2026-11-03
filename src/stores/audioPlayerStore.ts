import { create } from 'zustand';
import { quranAudioService } from '../services/quranAudioService';
import { getSurahByNumber } from '../data/arabic/quran/surahs';

export interface CurrentlyPlaying {
  surahId: string;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  ayahNumber: number;
  totalAyahs: number;
  reciterName: string;
  reciterNameArabic: string;
  isPlayingAll: boolean;
  source?: 'surah' | 'learn';
}

interface AudioPlayerState {
  currentlyPlaying: CurrentlyPlaying | null;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  progress: number; // 0-1 for progress bar

  // Actions
  setCurrentlyPlaying: (info: CurrentlyPlaying | null) => void;
  updatePlaybackState: (state: { isPlaying?: boolean; isPaused?: boolean; isLoading?: boolean }) => void;
  setProgress: (progress: number) => void;
  clearPlayer: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>()((set) => ({
  currentlyPlaying: null,
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  progress: 0,

  setCurrentlyPlaying: (info) => set({ currentlyPlaying: info }),
  updatePlaybackState: (state) => set((prev) => ({
    isPlaying: state.isPlaying !== undefined ? state.isPlaying : prev.isPlaying,
    isPaused: state.isPaused !== undefined ? state.isPaused : prev.isPaused,
    isLoading: state.isLoading !== undefined ? state.isLoading : prev.isLoading,
  })),
  setProgress: (progress) => set({ progress }),
  clearPlayer: () =>
    set({
      currentlyPlaying: null,
      isPlaying: false,
      isPaused: false,
      isLoading: false,
      progress: 0,
    }),
}));

/**
 * Shared continuous playback — plays ayah by ayah, auto-advances surahs.
 * Can be called from any component or callback (no React context needed).
 */
export function startContinuousPlay(surahNumber: number, ayahNumber: number, totalAyahs: number) {
  const store = useAudioPlayerStore.getState();
  if (!store.currentlyPlaying) return;

  // Update current ayah in store
  useAudioPlayerStore.setState({
    currentlyPlaying: { ...store.currentlyPlaying, ayahNumber },
    isLoading: true,
    isPlaying: false,
    isPaused: false,
  });

  quranAudioService.playAyah(surahNumber, ayahNumber, {
    onStateChange: (state) => {
      if (state === 'playing') useAudioPlayerStore.setState({ isPlaying: true, isLoading: false, isPaused: false });
      else if (state === 'paused') useAudioPlayerStore.setState({ isPaused: true, isLoading: false, isPlaying: false });
    },
    onComplete: () => {
      if (ayahNumber < totalAyahs) {
        // Next ayah in same surah
        startContinuousPlay(surahNumber, ayahNumber + 1, totalAyahs);
      } else {
        // Advance to next surah
        advanceToNextSurah();
      }
    },
    onError: () => {
      useAudioPlayerStore.getState().clearPlayer();
    },
  }).catch(() => {
    // Safety net — prevent unhandled promise rejection from crashing the app
    useAudioPlayerStore.getState().clearPlayer();
  });
}

/**
 * Advance to the next surah and continue playing.
 */
export function advanceToNextSurah() {
  const store = useAudioPlayerStore.getState();
  if (!store.currentlyPlaying) {
    store.clearPlayer();
    return;
  }

  const { surahNumber, reciterName, reciterNameArabic } = store.currentlyPlaying;

  if (surahNumber >= 114) {
    store.clearPlayer();
    return;
  }

  const nextSurah = getSurahByNumber(surahNumber + 1);
  if (!nextSurah) {
    store.clearPlayer();
    return;
  }

  useAudioPlayerStore.setState({
    currentlyPlaying: {
      surahId: nextSurah.id,
      surahNumber: nextSurah.surahNumber,
      surahNameArabic: nextSurah.nameArabic,
      surahNameEnglish: nextSurah.nameEnglish,
      ayahNumber: 1,
      totalAyahs: nextSurah.ayahCount,
      reciterName,
      reciterNameArabic,
      isPlayingAll: true,
    },
  });

  startContinuousPlay(nextSurah.surahNumber, 1, nextSurah.ayahCount);
}
