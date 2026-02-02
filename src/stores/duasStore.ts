// Duas Store
// Zustand store for tracking favorites and memorized duas

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DuasProgress } from '../types/duas';
import { TOTAL_DUAS } from '../types/duas';

interface DuasState {
  progress: DuasProgress;

  // Favorites Actions
  toggleFavorite: (duaId: string) => void;
  isFavorite: (duaId: string) => boolean;
  getFavorites: () => string[];

  // Memorized Actions
  toggleMemorized: (duaId: string) => void;
  isMemorized: (duaId: string) => boolean;
  getMemorized: () => string[];

  // View Tracking
  setLastViewed: (duaId: string) => void;

  // Stats
  getMemorizedCount: () => number;
  getFavoritesCount: () => number;
  getMemorizedPercent: () => number;

  // Reset
  resetProgress: () => void;
}

const initialProgress: DuasProgress = {
  favorites: [],
  memorized: [],
  lastViewedDuaId: undefined,
  lastViewedDate: undefined,
};

export const useDuasStore = create<DuasState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      // Favorites Actions
      toggleFavorite: (duaId: string) =>
        set((state) => {
          const isFav = state.progress.favorites.includes(duaId);
          return {
            progress: {
              ...state.progress,
              favorites: isFav
                ? state.progress.favorites.filter((id) => id !== duaId)
                : [...state.progress.favorites, duaId],
            },
          };
        }),

      isFavorite: (duaId: string) => {
        return get().progress.favorites.includes(duaId);
      },

      getFavorites: () => {
        return get().progress.favorites;
      },

      // Memorized Actions
      toggleMemorized: (duaId: string) =>
        set((state) => {
          const isMemorized = state.progress.memorized.includes(duaId);
          return {
            progress: {
              ...state.progress,
              memorized: isMemorized
                ? state.progress.memorized.filter((id) => id !== duaId)
                : [...state.progress.memorized, duaId],
            },
          };
        }),

      isMemorized: (duaId: string) => {
        return get().progress.memorized.includes(duaId);
      },

      getMemorized: () => {
        return get().progress.memorized;
      },

      // View Tracking
      setLastViewed: (duaId: string) =>
        set((state) => ({
          progress: {
            ...state.progress,
            lastViewedDuaId: duaId,
            lastViewedDate: new Date().toISOString(),
          },
        })),

      // Stats
      getMemorizedCount: () => {
        return get().progress.memorized.length;
      },

      getFavoritesCount: () => {
        return get().progress.favorites.length;
      },

      getMemorizedPercent: () => {
        return Math.round((get().progress.memorized.length / TOTAL_DUAS) * 100);
      },

      // Reset
      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'duas-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
