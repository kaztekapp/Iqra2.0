import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExerciseType, UserArabicProgress, ArabicLevel } from '../types/arabic';

interface ProgressState {
  progress: UserArabicProgress;
  showVowels: boolean; // Default true for beginners

  // Settings
  setShowVowels: (show: boolean) => void;

  // XP & Streaks
  addXp: (amount: number) => void;
  updateStreak: () => void;

  // Alphabet progress
  markLetterLearned: (letterId: string) => void;
  markLetterPracticed: (letterId: string) => void;
  markLetterMastered: (letterId: string) => void;
  isLetterLearned: (letterId: string) => boolean;

  // Vocabulary progress
  startTheme: (themeId: string) => void;
  completeTheme: (themeId: string) => void;
  markWordLearned: (wordId: string) => void;
  markWordMastered: (wordId: string) => void;
  isWordLearned: (wordId: string) => boolean;

  // Grammar progress
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;

  // Verb progress
  markVerbLearned: (verbId: string) => void;
  markVerbMastered: (verbId: string) => void;
  incrementTenseReview: (tense: 'past' | 'present' | 'future') => void;

  // Reading progress
  startReading: (textId: string) => void;
  completeReading: (textId: string) => void;

  // Exercise results
  recordExerciseResult: (exerciseType: ExerciseType, isCorrect: boolean) => void;

  // Getters
  getAlphabetCompletionPercent: () => number;
  getVocabularyCompletionPercent: () => number;
  getGrammarCompletionPercent: () => number;
  getOverallLevel: () => ArabicLevel;
  getAccuracy: () => number;

  // Reset
  resetProgress: () => void;
}

const initialProgress: UserArabicProgress = {
  id: '',
  userId: '',
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: '',

  alphabetProgress: {
    lettersLearned: [],
    writingPracticed: [],
    masteredLetters: [],
  },

  vocabularyProgress: {
    themesStarted: [],
    themesCompleted: [],
    wordsLearned: [],
    wordsMastered: [],
  },

  grammarProgress: {
    lessonsStarted: [],
    lessonsCompleted: [],
  },

  verbProgress: {
    verbsLearned: [],
    verbsMastered: [],
    tensesReviewed: {
      past: 0,
      present: 0,
      future: 0,
    },
  },

  readingProgress: {
    textsStarted: [],
    textsCompleted: [],
  },

  exerciseResults: {
    totalCompleted: 0,
    totalCorrect: 0,
    byType: {
      multiple_choice: { completed: 0, correct: 0 },
      fill_blank: { completed: 0, correct: 0 },
      matching: { completed: 0, correct: 0 },
      writing: { completed: 0, correct: 0 },
      listening: { completed: 0, correct: 0 },
      reading: { completed: 0, correct: 0 },
      letter_recognition: { completed: 0, correct: 0 },
      vowel_placement: { completed: 0, correct: 0 },
    },
  },
};

const TOTAL_LETTERS = 28;
const TOTAL_THEMES = 6;
const TOTAL_GRAMMAR_LESSONS = 10;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      showVowels: true, // Always show vowels by default for beginners

      setShowVowels: (show) => set({ showVowels: show }),

      addXp: (amount) => set((state) => ({
        progress: {
          ...state.progress,
          totalXp: state.progress.totalXp + amount,
        },
      })),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.progress.lastStudyDate;

        if (lastDate === today) {
          return state;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = 1;
        if (lastDate === yesterdayStr) {
          newStreak = state.progress.currentStreak + 1;
        }

        return {
          progress: {
            ...state.progress,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.progress.longestStreak),
            lastStudyDate: today,
          },
        };
      }),

      markLetterLearned: (letterId) => set((state) => {
        if (state.progress.alphabetProgress.lettersLearned.includes(letterId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            alphabetProgress: {
              ...state.progress.alphabetProgress,
              lettersLearned: [...state.progress.alphabetProgress.lettersLearned, letterId],
            },
          },
        };
      }),

      markLetterPracticed: (letterId) => set((state) => {
        if (state.progress.alphabetProgress.writingPracticed.includes(letterId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            alphabetProgress: {
              ...state.progress.alphabetProgress,
              writingPracticed: [...state.progress.alphabetProgress.writingPracticed, letterId],
            },
          },
        };
      }),

      markLetterMastered: (letterId) => set((state) => {
        if (state.progress.alphabetProgress.masteredLetters.includes(letterId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            alphabetProgress: {
              ...state.progress.alphabetProgress,
              masteredLetters: [...state.progress.alphabetProgress.masteredLetters, letterId],
            },
          },
        };
      }),

      isLetterLearned: (letterId) => {
        return get().progress.alphabetProgress.lettersLearned.includes(letterId);
      },

      startTheme: (themeId) => set((state) => {
        if (state.progress.vocabularyProgress.themesStarted.includes(themeId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            vocabularyProgress: {
              ...state.progress.vocabularyProgress,
              themesStarted: [...state.progress.vocabularyProgress.themesStarted, themeId],
            },
          },
        };
      }),

      completeTheme: (themeId) => set((state) => {
        if (state.progress.vocabularyProgress.themesCompleted.includes(themeId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            vocabularyProgress: {
              ...state.progress.vocabularyProgress,
              themesCompleted: [...state.progress.vocabularyProgress.themesCompleted, themeId],
            },
          },
        };
      }),

      markWordLearned: (wordId) => set((state) => {
        if (state.progress.vocabularyProgress.wordsLearned.includes(wordId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            vocabularyProgress: {
              ...state.progress.vocabularyProgress,
              wordsLearned: [...state.progress.vocabularyProgress.wordsLearned, wordId],
            },
          },
        };
      }),

      markWordMastered: (wordId) => set((state) => {
        if (state.progress.vocabularyProgress.wordsMastered.includes(wordId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            vocabularyProgress: {
              ...state.progress.vocabularyProgress,
              wordsMastered: [...state.progress.vocabularyProgress.wordsMastered, wordId],
            },
          },
        };
      }),

      isWordLearned: (wordId) => {
        return get().progress.vocabularyProgress.wordsLearned.includes(wordId);
      },

      startLesson: (lessonId) => set((state) => {
        if (state.progress.grammarProgress.lessonsStarted.includes(lessonId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            grammarProgress: {
              ...state.progress.grammarProgress,
              lessonsStarted: [...state.progress.grammarProgress.lessonsStarted, lessonId],
            },
          },
        };
      }),

      completeLesson: (lessonId) => set((state) => {
        if (state.progress.grammarProgress.lessonsCompleted.includes(lessonId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            grammarProgress: {
              ...state.progress.grammarProgress,
              lessonsCompleted: [...state.progress.grammarProgress.lessonsCompleted, lessonId],
            },
          },
        };
      }),

      markVerbLearned: (verbId) => set((state) => {
        if (state.progress.verbProgress.verbsLearned.includes(verbId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            verbProgress: {
              ...state.progress.verbProgress,
              verbsLearned: [...state.progress.verbProgress.verbsLearned, verbId],
            },
          },
        };
      }),

      markVerbMastered: (verbId) => set((state) => {
        if (state.progress.verbProgress.verbsMastered.includes(verbId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            verbProgress: {
              ...state.progress.verbProgress,
              verbsMastered: [...state.progress.verbProgress.verbsMastered, verbId],
            },
          },
        };
      }),

      incrementTenseReview: (tense) => set((state) => ({
        progress: {
          ...state.progress,
          verbProgress: {
            ...state.progress.verbProgress,
            tensesReviewed: {
              ...state.progress.verbProgress.tensesReviewed,
              [tense]: state.progress.verbProgress.tensesReviewed[tense] + 1,
            },
          },
        },
      })),

      startReading: (textId) => set((state) => {
        if (state.progress.readingProgress.textsStarted.includes(textId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            readingProgress: {
              ...state.progress.readingProgress,
              textsStarted: [...state.progress.readingProgress.textsStarted, textId],
            },
          },
        };
      }),

      completeReading: (textId) => set((state) => {
        if (state.progress.readingProgress.textsCompleted.includes(textId)) {
          return state;
        }
        return {
          progress: {
            ...state.progress,
            readingProgress: {
              ...state.progress.readingProgress,
              textsCompleted: [...state.progress.readingProgress.textsCompleted, textId],
            },
          },
        };
      }),

      recordExerciseResult: (exerciseType, isCorrect) => set((state) => ({
        progress: {
          ...state.progress,
          exerciseResults: {
            totalCompleted: state.progress.exerciseResults.totalCompleted + 1,
            totalCorrect: state.progress.exerciseResults.totalCorrect + (isCorrect ? 1 : 0),
            byType: {
              ...state.progress.exerciseResults.byType,
              [exerciseType]: {
                completed: state.progress.exerciseResults.byType[exerciseType].completed + 1,
                correct: state.progress.exerciseResults.byType[exerciseType].correct + (isCorrect ? 1 : 0),
              },
            },
          },
        },
      })),

      getAlphabetCompletionPercent: () => {
        const state = get();
        return Math.round((state.progress.alphabetProgress.lettersLearned.length / TOTAL_LETTERS) * 100);
      },

      getVocabularyCompletionPercent: () => {
        const state = get();
        return Math.round((state.progress.vocabularyProgress.themesCompleted.length / TOTAL_THEMES) * 100);
      },

      getGrammarCompletionPercent: () => {
        const state = get();
        return Math.round((state.progress.grammarProgress.lessonsCompleted.length / TOTAL_GRAMMAR_LESSONS) * 100);
      },

      getOverallLevel: (): ArabicLevel => {
        const state = get();
        const alphabetPercent = state.progress.alphabetProgress.lettersLearned.length / TOTAL_LETTERS;
        const vocabPercent = state.progress.vocabularyProgress.themesCompleted.length / TOTAL_THEMES;
        const grammarPercent = state.progress.grammarProgress.lessonsCompleted.length / TOTAL_GRAMMAR_LESSONS;

        const average = (alphabetPercent + vocabPercent + grammarPercent) / 3;

        if (average >= 0.7) return 'advanced';
        if (average >= 0.3) return 'intermediate';
        return 'beginner';
      },

      getAccuracy: () => {
        const state = get();
        const { totalCompleted, totalCorrect } = state.progress.exerciseResults;
        if (totalCompleted === 0) return 0;
        return Math.round((totalCorrect / totalCompleted) * 100);
      },

      resetProgress: () => set({ progress: initialProgress, showVowels: true }),
    }),
    {
      name: 'arabic-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
