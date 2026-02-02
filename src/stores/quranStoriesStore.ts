import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuranStoryProgress } from '../types/quranStories';

interface QuranStoriesState {
  // Progress tracking
  storyProgress: Record<string, QuranStoryProgress>;

  // Actions
  updateProgress: (storyId: string, update: Partial<QuranStoryProgress>) => void;
  markStoryComplete: (storyId: string) => void;
  getStoryProgress: (storyId: string) => QuranStoryProgress;
  isStoryCompleted: (storyId: string) => boolean;
  getTotalStoriesCompleted: () => number;
  resetProgress: () => void;
}

const DEFAULT_PROGRESS: QuranStoryProgress = {
  storyId: '',
  percentComplete: 0,
  lastReadBlockId: null,
  isCompleted: false,
  lastReadAt: null,
};

export const useQuranStoriesStore = create<QuranStoriesState>()(
  persist(
    (set, get) => ({
      storyProgress: {},

      updateProgress: (storyId: string, update: Partial<QuranStoryProgress>) => {
        set((state) => {
          const currentProgress = state.storyProgress[storyId] || { ...DEFAULT_PROGRESS, storyId };

          return {
            storyProgress: {
              ...state.storyProgress,
              [storyId]: {
                ...currentProgress,
                storyId,
                ...update,
              },
            },
          };
        });
      },

      markStoryComplete: (storyId: string) => {
        set((state) => ({
          storyProgress: {
            ...state.storyProgress,
            [storyId]: {
              storyId,
              percentComplete: 100,
              lastReadBlockId: null,
              isCompleted: true,
              lastReadAt: new Date(),
            },
          },
        }));
      },

      getStoryProgress: (storyId: string) => {
        const progress = get().storyProgress[storyId];
        return progress || { ...DEFAULT_PROGRESS, storyId };
      },

      isStoryCompleted: (storyId: string) => {
        return get().storyProgress[storyId]?.isCompleted || false;
      },

      getTotalStoriesCompleted: () => {
        const progress = get().storyProgress;
        return Object.values(progress).filter((p) => p.isCompleted).length;
      },

      resetProgress: () => {
        set({ storyProgress: {} });
      },
    }),
    {
      name: 'quran-stories-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
