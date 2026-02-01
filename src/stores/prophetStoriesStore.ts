// Prophet Stories Store
// Zustand store for tracking progress in Prophet Stories

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ProphetStoriesProgress,
  ProphetStoryProgress,
  StoryReadingStatus,
  StoryAudioSettings,
  PlaybackSpeed,
} from '../types/prophetStories';
import { TOTAL_PROPHETS } from '../data/arabic/prophets';

interface ProphetStoriesState {
  progress: ProphetStoriesProgress;

  // Progress Actions
  startStory: (prophetId: string) => void;
  completeStory: (prophetId: string) => void;
  markSubStoryCompleted: (prophetId: string, subStoryId: string) => void;
  updateReadingPosition: (prophetId: string, subStoryId: string, blockIndex: number) => void;
  updateReadingTime: (minutes: number) => void;

  // Audio Settings Actions
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;
  toggleAutoPlay: () => void;
  toggleHighlightCurrentBlock: () => void;

  // Getters
  getStoryProgress: (prophetId: string) => ProphetStoryProgress;
  isStoryCompleted: (prophetId: string) => boolean;
  isSubStoryCompleted: (prophetId: string, subStoryId: string) => boolean;
  getStoryCompletionPercent: (prophetId: string, totalSubStories: number) => number;
  getOverallCompletionPercent: () => number;
  getTotalStoriesCompleted: () => number;
  getStoriesInProgress: () => string[];

  // Reset
  resetProgress: () => void;
}

const initialAudioSettings: StoryAudioSettings = {
  playbackSpeed: 1,
  autoPlay: false,
  highlightCurrentBlock: true,
};

const initialProgress: ProphetStoriesProgress = {
  storiesProgress: {},
  totalStoriesCompleted: 0,
  lastReadProphetId: undefined,
  lastReadDate: undefined,
  totalReadingTime: 0,
  audioSettings: initialAudioSettings,
};

export const useProphetStoriesStore = create<ProphetStoriesState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      // Progress Actions
      startStory: (prophetId: string) =>
        set((state) => {
          const existingProgress = state.progress.storiesProgress[prophetId];
          if (existingProgress && existingProgress.status !== 'not_started') {
            // Just update last read info
            return {
              progress: {
                ...state.progress,
                lastReadProphetId: prophetId,
                lastReadDate: new Date().toISOString(),
                storiesProgress: {
                  ...state.progress.storiesProgress,
                  [prophetId]: {
                    ...existingProgress,
                    lastReadAt: new Date().toISOString(),
                  },
                },
              },
            };
          }

          return {
            progress: {
              ...state.progress,
              lastReadProphetId: prophetId,
              lastReadDate: new Date().toISOString(),
              storiesProgress: {
                ...state.progress.storiesProgress,
                [prophetId]: {
                  prophetId,
                  status: 'in_progress' as StoryReadingStatus,
                  subStoriesCompleted: [],
                  lastReadAt: new Date().toISOString(),
                },
              },
            },
          };
        }),

      completeStory: (prophetId: string) =>
        set((state) => {
          const storyProgress = state.progress.storiesProgress[prophetId];
          if (!storyProgress) return state;

          const wasAlreadyCompleted = storyProgress.status === 'completed';
          const newTotalCompleted = wasAlreadyCompleted
            ? state.progress.totalStoriesCompleted
            : state.progress.totalStoriesCompleted + 1;

          return {
            progress: {
              ...state.progress,
              totalStoriesCompleted: newTotalCompleted,
              storiesProgress: {
                ...state.progress.storiesProgress,
                [prophetId]: {
                  ...storyProgress,
                  status: 'completed' as StoryReadingStatus,
                  completedAt: new Date().toISOString(),
                  lastReadAt: new Date().toISOString(),
                },
              },
            },
          };
        }),

      markSubStoryCompleted: (prophetId: string, subStoryId: string) =>
        set((state) => {
          const storyProgress = state.progress.storiesProgress[prophetId] || {
            prophetId,
            status: 'in_progress' as StoryReadingStatus,
            subStoriesCompleted: [],
            lastReadAt: new Date().toISOString(),
          };

          if (storyProgress.subStoriesCompleted.includes(subStoryId)) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              lastReadProphetId: prophetId,
              lastReadDate: new Date().toISOString(),
              storiesProgress: {
                ...state.progress.storiesProgress,
                [prophetId]: {
                  ...storyProgress,
                  subStoriesCompleted: [...storyProgress.subStoriesCompleted, subStoryId],
                  lastReadAt: new Date().toISOString(),
                },
              },
            },
          };
        }),

      updateReadingPosition: (prophetId: string, subStoryId: string, blockIndex: number) =>
        set((state) => {
          const storyProgress = state.progress.storiesProgress[prophetId] || {
            prophetId,
            status: 'in_progress' as StoryReadingStatus,
            subStoriesCompleted: [],
            lastReadAt: new Date().toISOString(),
          };

          return {
            progress: {
              ...state.progress,
              lastReadProphetId: prophetId,
              lastReadDate: new Date().toISOString(),
              storiesProgress: {
                ...state.progress.storiesProgress,
                [prophetId]: {
                  ...storyProgress,
                  currentSubStoryId: subStoryId,
                  currentBlockIndex: blockIndex,
                  lastReadAt: new Date().toISOString(),
                },
              },
            },
          };
        }),

      updateReadingTime: (minutes: number) =>
        set((state) => ({
          progress: {
            ...state.progress,
            totalReadingTime: state.progress.totalReadingTime + minutes,
          },
        })),

      // Audio Settings Actions
      setPlaybackSpeed: (speed: PlaybackSpeed) =>
        set((state) => ({
          progress: {
            ...state.progress,
            audioSettings: {
              ...state.progress.audioSettings,
              playbackSpeed: speed,
            },
          },
        })),

      toggleAutoPlay: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            audioSettings: {
              ...state.progress.audioSettings,
              autoPlay: !state.progress.audioSettings.autoPlay,
            },
          },
        })),

      toggleHighlightCurrentBlock: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            audioSettings: {
              ...state.progress.audioSettings,
              highlightCurrentBlock: !state.progress.audioSettings.highlightCurrentBlock,
            },
          },
        })),

      // Getters
      getStoryProgress: (prophetId: string) => {
        const storyProgress = get().progress.storiesProgress[prophetId];
        return (
          storyProgress || {
            prophetId,
            status: 'not_started' as StoryReadingStatus,
            subStoriesCompleted: [],
          }
        );
      },

      isStoryCompleted: (prophetId: string) => {
        const storyProgress = get().progress.storiesProgress[prophetId];
        return storyProgress?.status === 'completed';
      },

      isSubStoryCompleted: (prophetId: string, subStoryId: string) => {
        const storyProgress = get().progress.storiesProgress[prophetId];
        return storyProgress?.subStoriesCompleted.includes(subStoryId) || false;
      },

      getStoryCompletionPercent: (prophetId: string, totalSubStories: number) => {
        const storyProgress = get().progress.storiesProgress[prophetId];
        if (!storyProgress || totalSubStories === 0) return 0;
        if (storyProgress.status === 'completed') return 100;

        return Math.round((storyProgress.subStoriesCompleted.length / totalSubStories) * 100);
      },

      getOverallCompletionPercent: () => {
        const { totalStoriesCompleted } = get().progress;
        return Math.round((totalStoriesCompleted / TOTAL_PROPHETS) * 100);
      },

      getTotalStoriesCompleted: () => {
        return get().progress.totalStoriesCompleted;
      },

      getStoriesInProgress: () => {
        const { storiesProgress } = get().progress;
        return Object.values(storiesProgress)
          .filter((sp) => sp.status === 'in_progress')
          .map((sp) => sp.prophetId);
      },

      // Reset
      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'prophet-stories-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
