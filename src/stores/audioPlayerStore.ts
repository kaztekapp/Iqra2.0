import { create } from 'zustand';

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
