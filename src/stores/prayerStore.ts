// Prayer Store
// Zustand store for tracking prayer lesson progress

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrayerProgress, TOTAL_PRAYER_LESSONS } from '../types/prayer';

interface PrayerState {
  progress: PrayerProgress;

  // Lesson Actions
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  isStarted: (lessonId: string) => boolean;

  // View Tracking
  setLastViewed: (lessonId: string) => void;

  // Stats
  getCompletedCount: () => number;
  getProgressPercent: () => number;

  // Reset
  resetProgress: () => void;
}

const initialProgress: PrayerProgress = {
  lessonsCompleted: [],
  lessonsStarted: [],
  lastViewedLessonId: undefined,
  lastViewedDate: undefined,
};

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      startLesson: (lessonId: string) =>
        set((state) => {
          if (state.progress.lessonsStarted.includes(lessonId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              lessonsStarted: [...state.progress.lessonsStarted, lessonId],
            },
          };
        }),

      completeLesson: (lessonId: string) =>
        set((state) => {
          if (state.progress.lessonsCompleted.includes(lessonId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              lessonsCompleted: [...state.progress.lessonsCompleted, lessonId],
              lessonsStarted: state.progress.lessonsStarted.includes(lessonId)
                ? state.progress.lessonsStarted
                : [...state.progress.lessonsStarted, lessonId],
            },
          };
        }),

      isCompleted: (lessonId: string) => {
        return get().progress.lessonsCompleted.includes(lessonId);
      },

      isStarted: (lessonId: string) => {
        return get().progress.lessonsStarted.includes(lessonId);
      },

      setLastViewed: (lessonId: string) =>
        set((state) => ({
          progress: {
            ...state.progress,
            lastViewedLessonId: lessonId,
            lastViewedDate: new Date().toISOString(),
          },
        })),

      getCompletedCount: () => {
        return get().progress.lessonsCompleted.length;
      },

      getProgressPercent: () => {
        return Math.round(
          (get().progress.lessonsCompleted.length / TOTAL_PRAYER_LESSONS) * 100
        );
      },

      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'prayer-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
