import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  QuranProgress,
  SurahProgress,
  TajweedProgress,
  MemorizationProgressData,
  QuranSettings,
  ReviewItem,
  ReviewRating,
  TajweedRuleId,
  LearningStatus,
} from '../types/quran';
import { SURAHS, getAyahsBySurahId } from '../data/arabic/quran';
import { DEFAULT_RECITER_ID } from '../data/arabic/quran/reciters';

interface QuranState {
  progress: QuranProgress;

  // Surah Progress Actions
  startSurah: (surahId: string) => void;
  completeSurah: (surahId: string) => void;
  markAyahLearned: (surahId: string, ayahId: string) => void;
  markAyahMemorized: (surahId: string, ayahId: string) => void;
  bookmarkAyah: (surahId: string, ayahId: string) => void;
  unbookmarkAyah: (surahId: string, ayahId: string) => void;
  updateSurahTime: (surahId: string, minutes: number) => void;

  // Tajweed Progress Actions
  markTajweedRuleLearned: (ruleId: TajweedRuleId) => void;
  markTajweedRuleMastered: (ruleId: TajweedRuleId) => void;
  incrementTajweedPractice: (ruleId: TajweedRuleId) => void;
  updateTajweedAccuracy: (ruleId: TajweedRuleId, accuracy: number) => void;

  // Memorization Actions
  scheduleReview: (ayahId: string, surahId: string) => void;
  updateReviewItem: (ayahId: string, rating: ReviewRating) => void;
  getDueReviews: () => ReviewItem[];
  updateMemorizationStreak: () => void;

  // Settings Actions
  setReciter: (reciterId: string) => void;
  setPlaybackSpeed: (speed: 0.75 | 1 | 1.25 | 1.5 | 1.75) => void;
  setRepeatCount: (count: 1 | 3 | 5 | 10 | 0) => void;
  toggleTransliteration: () => void;
  toggleTranslation: () => void;
  toggleTajweedColors: () => void;
  toggleAutoAdvance: () => void;
  toggleWordByWordMode: () => void;

  // Getters
  getSurahProgress: (surahId: string) => SurahProgress;
  getSurahCompletionPercent: (surahId: string) => number;
  getOverallCompletionPercent: () => number;
  getTotalAyahsLearned: () => number;
  getTotalAyahsMemorized: () => number;
  getTotalSurahsCompleted: () => number;
  isSurahCompleted: (surahId: string) => boolean;
  isAyahLearned: (surahId: string, ayahId: string) => boolean;
  isAyahMemorized: (surahId: string, ayahId: string) => boolean;
  isTajweedRuleLearned: (ruleId: TajweedRuleId) => boolean;
  isTajweedRuleMastered: (ruleId: TajweedRuleId) => boolean;

  // Reset
  resetProgress: () => void;
}

const initialTajweedProgress: TajweedProgress = {
  rulesLearned: [],
  rulesMastered: [],
  practiceCount: {} as Record<TajweedRuleId, number>,
  accuracy: {} as Record<TajweedRuleId, number>,
};

const initialMemorizationProgress: MemorizationProgressData = {
  totalAyahsMemorized: 0,
  totalSurahsMemorized: 0,
  currentStreak: 0,
  longestStreak: 0,
  reviewSchedule: [],
  lastReviewDate: undefined,
};

const initialSettings: QuranSettings = {
  reciterId: DEFAULT_RECITER_ID,
  playbackSpeed: 1,
  repeatCount: 1,
  showTransliteration: true,
  showTranslation: true,
  showTajweedColors: true,
  autoAdvance: false,
  wordByWordMode: true,
};

const initialProgress: QuranProgress = {
  surahProgress: {},
  tajweedProgress: initialTajweedProgress,
  memorizationProgress: initialMemorizationProgress,
  settings: initialSettings,
  lastStudyDate: undefined,
  totalStudyTime: 0,
};

// SM-2 Algorithm helper for spaced repetition
const calculateNextReview = (item: ReviewItem, rating: ReviewRating): ReviewItem => {
  let { easeFactor, interval, repetitions } = item;

  if (rating < 3) {
    // Failed review - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Successful review
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor (minimum 1.3)
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
  );

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    ...item,
    easeFactor,
    interval,
    repetitions,
    lastRating: rating,
    lastReviewedAt: new Date().toISOString(),
    nextReviewDate: nextReviewDate.toISOString(),
  };
};

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      // Surah Progress Actions
      startSurah: (surahId: string) =>
        set((state) => {
          const existingProgress = state.progress.surahProgress[surahId];
          if (existingProgress && existingProgress.status !== 'not_started') {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  surahId,
                  status: 'in_progress' as LearningStatus,
                  ayahsLearned: [],
                  ayahsMemorized: [],
                  completionPercent: 0,
                  lastStudiedAt: new Date().toISOString(),
                  timeSpent: 0,
                  bookmarkedAyahs: [],
                },
              },
              lastStudyDate: new Date().toISOString(),
            },
          };
        }),

      completeSurah: (surahId: string) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId];
          if (!surahProgress) return state;

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  status: 'completed' as LearningStatus,
                  completionPercent: 100,
                  lastStudiedAt: new Date().toISOString(),
                },
              },
            },
          };
        }),

      markAyahLearned: (surahId: string, ayahId: string) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId] || {
            surahId,
            status: 'in_progress' as LearningStatus,
            ayahsLearned: [],
            ayahsMemorized: [],
            completionPercent: 0,
            lastStudiedAt: new Date().toISOString(),
            timeSpent: 0,
            bookmarkedAyahs: [],
          };

          if (surahProgress.ayahsLearned.includes(ayahId)) {
            return state;
          }

          const ayahs = getAyahsBySurahId(surahId);
          const newAyahsLearned = [...surahProgress.ayahsLearned, ayahId];
          const completionPercent = Math.round((newAyahsLearned.length / ayahs.length) * 100);

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  ayahsLearned: newAyahsLearned,
                  completionPercent,
                  lastStudiedAt: new Date().toISOString(),
                  status: completionPercent === 100 ? 'completed' : 'in_progress',
                },
              },
              lastStudyDate: new Date().toISOString(),
            },
          };
        }),

      markAyahMemorized: (surahId: string, ayahId: string) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId];
          if (!surahProgress || surahProgress.ayahsMemorized.includes(ayahId)) {
            return state;
          }

          const newAyahsMemorized = [...surahProgress.ayahsMemorized, ayahId];

          // Also mark as learned if not already
          const newAyahsLearned = surahProgress.ayahsLearned.includes(ayahId)
            ? surahProgress.ayahsLearned
            : [...surahProgress.ayahsLearned, ayahId];

          const ayahs = getAyahsBySurahId(surahId);
          const completionPercent = Math.round((newAyahsLearned.length / ayahs.length) * 100);

          // Update memorization progress
          const totalMemorized = Object.values(state.progress.surahProgress).reduce(
            (total, sp) => total + sp.ayahsMemorized.length,
            0
          ) + 1;

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  ayahsLearned: newAyahsLearned,
                  ayahsMemorized: newAyahsMemorized,
                  completionPercent,
                  lastStudiedAt: new Date().toISOString(),
                },
              },
              memorizationProgress: {
                ...state.progress.memorizationProgress,
                totalAyahsMemorized: totalMemorized,
              },
              lastStudyDate: new Date().toISOString(),
            },
          };
        }),

      bookmarkAyah: (surahId: string, ayahId: string) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId];
          if (!surahProgress || surahProgress.bookmarkedAyahs.includes(ayahId)) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  bookmarkedAyahs: [...surahProgress.bookmarkedAyahs, ayahId],
                },
              },
            },
          };
        }),

      unbookmarkAyah: (surahId: string, ayahId: string) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId];
          if (!surahProgress) return state;

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  bookmarkedAyahs: surahProgress.bookmarkedAyahs.filter((id) => id !== ayahId),
                },
              },
            },
          };
        }),

      updateSurahTime: (surahId: string, minutes: number) =>
        set((state) => {
          const surahProgress = state.progress.surahProgress[surahId];
          if (!surahProgress) return state;

          return {
            progress: {
              ...state.progress,
              surahProgress: {
                ...state.progress.surahProgress,
                [surahId]: {
                  ...surahProgress,
                  timeSpent: surahProgress.timeSpent + minutes,
                },
              },
              totalStudyTime: state.progress.totalStudyTime + minutes,
            },
          };
        }),

      // Tajweed Progress Actions
      markTajweedRuleLearned: (ruleId: TajweedRuleId) =>
        set((state) => {
          if (state.progress.tajweedProgress.rulesLearned.includes(ruleId)) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              tajweedProgress: {
                ...state.progress.tajweedProgress,
                rulesLearned: [...state.progress.tajweedProgress.rulesLearned, ruleId],
              },
            },
          };
        }),

      markTajweedRuleMastered: (ruleId: TajweedRuleId) =>
        set((state) => {
          if (state.progress.tajweedProgress.rulesMastered.includes(ruleId)) {
            return state;
          }

          const newRulesLearned = state.progress.tajweedProgress.rulesLearned.includes(ruleId)
            ? state.progress.tajweedProgress.rulesLearned
            : [...state.progress.tajweedProgress.rulesLearned, ruleId];

          return {
            progress: {
              ...state.progress,
              tajweedProgress: {
                ...state.progress.tajweedProgress,
                rulesLearned: newRulesLearned,
                rulesMastered: [...state.progress.tajweedProgress.rulesMastered, ruleId],
              },
            },
          };
        }),

      incrementTajweedPractice: (ruleId: TajweedRuleId) =>
        set((state) => {
          const currentCount = state.progress.tajweedProgress.practiceCount[ruleId] || 0;

          return {
            progress: {
              ...state.progress,
              tajweedProgress: {
                ...state.progress.tajweedProgress,
                practiceCount: {
                  ...state.progress.tajweedProgress.practiceCount,
                  [ruleId]: currentCount + 1,
                },
              },
            },
          };
        }),

      updateTajweedAccuracy: (ruleId: TajweedRuleId, accuracy: number) =>
        set((state) => ({
          progress: {
            ...state.progress,
            tajweedProgress: {
              ...state.progress.tajweedProgress,
              accuracy: {
                ...state.progress.tajweedProgress.accuracy,
                [ruleId]: accuracy,
              },
            },
          },
        })),

      // Memorization Actions
      scheduleReview: (ayahId: string, surahId: string) =>
        set((state) => {
          const existingItem = state.progress.memorizationProgress.reviewSchedule.find(
            (item) => item.ayahId === ayahId
          );

          if (existingItem) return state;

          const newItem: ReviewItem = {
            ayahId,
            surahId,
            nextReviewDate: new Date().toISOString(),
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
          };

          return {
            progress: {
              ...state.progress,
              memorizationProgress: {
                ...state.progress.memorizationProgress,
                reviewSchedule: [...state.progress.memorizationProgress.reviewSchedule, newItem],
              },
            },
          };
        }),

      updateReviewItem: (ayahId: string, rating: ReviewRating) =>
        set((state) => {
          const reviewSchedule = state.progress.memorizationProgress.reviewSchedule;
          const itemIndex = reviewSchedule.findIndex((item) => item.ayahId === ayahId);

          if (itemIndex === -1) return state;

          const updatedItem = calculateNextReview(reviewSchedule[itemIndex], rating);
          const newSchedule = [...reviewSchedule];
          newSchedule[itemIndex] = updatedItem;

          return {
            progress: {
              ...state.progress,
              memorizationProgress: {
                ...state.progress.memorizationProgress,
                reviewSchedule: newSchedule,
                lastReviewDate: new Date().toISOString(),
              },
            },
          };
        }),

      getDueReviews: () => {
        const { reviewSchedule } = get().progress.memorizationProgress;
        const now = new Date();

        return reviewSchedule.filter((item) => {
          const reviewDate = new Date(item.nextReviewDate);
          return reviewDate <= now;
        });
      },

      updateMemorizationStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastReview = state.progress.memorizationProgress.lastReviewDate;

          if (!lastReview) {
            return {
              progress: {
                ...state.progress,
                memorizationProgress: {
                  ...state.progress.memorizationProgress,
                  currentStreak: 1,
                  longestStreak: Math.max(1, state.progress.memorizationProgress.longestStreak),
                  lastReviewDate: new Date().toISOString(),
                },
              },
            };
          }

          const lastReviewDate = new Date(lastReview).toDateString();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          let newStreak = state.progress.memorizationProgress.currentStreak;

          if (lastReviewDate === today) {
            // Already reviewed today
            return state;
          } else if (lastReviewDate === yesterday.toDateString()) {
            // Consecutive day
            newStreak += 1;
          } else {
            // Streak broken
            newStreak = 1;
          }

          return {
            progress: {
              ...state.progress,
              memorizationProgress: {
                ...state.progress.memorizationProgress,
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, state.progress.memorizationProgress.longestStreak),
                lastReviewDate: new Date().toISOString(),
              },
            },
          };
        }),

      // Settings Actions
      setReciter: (reciterId: string) =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: { ...state.progress.settings, reciterId },
          },
        })),

      setPlaybackSpeed: (speed: 0.75 | 1 | 1.25 | 1.5 | 1.75) =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: { ...state.progress.settings, playbackSpeed: speed },
          },
        })),

      setRepeatCount: (count: 1 | 3 | 5 | 10 | 0) =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: { ...state.progress.settings, repeatCount: count },
          },
        })),

      toggleTransliteration: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              showTransliteration: !state.progress.settings.showTransliteration,
            },
          },
        })),

      toggleTranslation: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              showTranslation: !state.progress.settings.showTranslation,
            },
          },
        })),

      toggleTajweedColors: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              showTajweedColors: !state.progress.settings.showTajweedColors,
            },
          },
        })),

      toggleAutoAdvance: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              autoAdvance: !state.progress.settings.autoAdvance,
            },
          },
        })),

      toggleWordByWordMode: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              wordByWordMode: !state.progress.settings.wordByWordMode,
            },
          },
        })),

      // Getters
      getSurahProgress: (surahId: string) => {
        const surahProgress = get().progress.surahProgress[surahId];
        return (
          surahProgress || {
            surahId,
            status: 'not_started' as LearningStatus,
            ayahsLearned: [],
            ayahsMemorized: [],
            completionPercent: 0,
            timeSpent: 0,
            bookmarkedAyahs: [],
          }
        );
      },

      getSurahCompletionPercent: (surahId: string) => {
        const surahProgress = get().progress.surahProgress[surahId];
        return surahProgress?.completionPercent || 0;
      },

      getOverallCompletionPercent: () => {
        const { surahProgress } = get().progress;
        const totalSurahs = SURAHS.length;

        if (totalSurahs === 0) return 0;

        const totalCompletion = Object.values(surahProgress).reduce(
          (total, sp) => total + sp.completionPercent,
          0
        );

        return Math.round(totalCompletion / totalSurahs);
      },

      getTotalAyahsLearned: () => {
        const { surahProgress } = get().progress;
        return Object.values(surahProgress).reduce(
          (total, sp) => total + sp.ayahsLearned.length,
          0
        );
      },

      getTotalAyahsMemorized: () => {
        const { surahProgress } = get().progress;
        return Object.values(surahProgress).reduce(
          (total, sp) => total + sp.ayahsMemorized.length,
          0
        );
      },

      getTotalSurahsCompleted: () => {
        const { surahProgress } = get().progress;
        return Object.values(surahProgress).filter((sp) => sp.status === 'completed').length;
      },

      isSurahCompleted: (surahId: string) => {
        const surahProgress = get().progress.surahProgress[surahId];
        return surahProgress?.status === 'completed';
      },

      isAyahLearned: (surahId: string, ayahId: string) => {
        const surahProgress = get().progress.surahProgress[surahId];
        return surahProgress?.ayahsLearned.includes(ayahId) || false;
      },

      isAyahMemorized: (surahId: string, ayahId: string) => {
        const surahProgress = get().progress.surahProgress[surahId];
        return surahProgress?.ayahsMemorized.includes(ayahId) || false;
      },

      isTajweedRuleLearned: (ruleId: TajweedRuleId) => {
        return get().progress.tajweedProgress.rulesLearned.includes(ruleId);
      },

      isTajweedRuleMastered: (ruleId: TajweedRuleId) => {
        return get().progress.tajweedProgress.rulesMastered.includes(ruleId);
      },

      // Reset
      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'quran-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
