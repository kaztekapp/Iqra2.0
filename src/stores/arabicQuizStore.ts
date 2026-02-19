import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizQuestion, DetailedExplanation } from '../lib/arabicQuizApi';
import { DEFAULT_QUIZ_CONFIG } from '../types/arabicQuiz';

// Increment this to force clearing old quiz questions when vocabulary changes
const QUIZ_DATA_VERSION = 11;

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
}

interface ArabicQuizState {
  // Data version for cache invalidation
  dataVersion: number;
  // Current quiz questions (persisted until passed)
  currentQuestions: QuizQuestion[];
  // Current answers for this attempt
  currentAnswers: QuizAnswer[];
  // Number of attempts on current quiz
  attempts: number;
  // Best score on current quiz
  bestScore: number;
  // Has the user passed the current quiz?
  hasPassed: boolean;

  // Session state (not persisted)
  currentIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;

  // Stats (persisted)
  totalQuizzesPassed: number;
  totalCorrectAnswers: number;
  totalWordsLearned: string[];
  bestStreak: number;

  // Actions
  setQuestions: (questions: QuizQuestion[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startAttempt: () => void;
  submitAnswer: (selectedIndex: number, timeSpent: number) => void;
  nextQuestion: () => void;
  recordAttempt: () => { passed: boolean; xpEarned: number };
  clearQuiz: () => void;
  hasActiveQuiz: () => boolean;
  resetSession: () => void;
}

export const useArabicQuizStore = create<ArabicQuizState>()(
  persist(
    (set, get) => ({
      // Data version
      dataVersion: QUIZ_DATA_VERSION,
      // Persisted quiz state
      currentQuestions: [],
      currentAnswers: [],
      attempts: 0,
      bestScore: 0,
      hasPassed: false,

      // Session state
      currentIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      isPlaying: false,
      isLoading: false,
      error: null,

      // Stats
      totalQuizzesPassed: 0,
      totalCorrectAnswers: 0,
      totalWordsLearned: [],
      bestStreak: 0,

      setQuestions: (questions) => {
        set({
          currentQuestions: questions,
          currentAnswers: [],
          attempts: 0,
          bestScore: 0,
          hasPassed: false,
          currentIndex: 0,
          score: 0,
          streak: 0,
          maxStreak: 0,
          isPlaying: false,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      startAttempt: () => {
        set({
          currentAnswers: [],
          currentIndex: 0,
          score: 0,
          streak: 0,
          maxStreak: 0,
          isPlaying: true,
          error: null,
        });
      },

      submitAnswer: (selectedIndex, timeSpent) => {
        const state = get();
        const currentQuestion = state.currentQuestions[state.currentIndex];
        if (!currentQuestion) return;

        const isCorrect = selectedIndex === currentQuestion.correctIndex;
        const newStreak = isCorrect ? state.streak + 1 : 0;
        const pointsEarned = isCorrect ? DEFAULT_QUIZ_CONFIG.xpPerCorrect : 0;

        const answer: QuizAnswer = {
          questionId: currentQuestion.id,
          selectedIndex,
          isCorrect,
          timeSpent,
          pointsEarned,
        };

        set({
          currentAnswers: [...state.currentAnswers, answer],
          score: state.score + pointsEarned,
          streak: newStreak,
          maxStreak: Math.max(state.maxStreak, newStreak),
        });
      },

      nextQuestion: () => {
        const state = get();
        set({
          currentIndex: state.currentIndex + 1,
        });
      },

      recordAttempt: () => {
        const state = get();
        const correctCount = state.currentAnswers.filter((a) => a.isCorrect).length;
        const totalCount = state.currentQuestions.length;
        const accuracy = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
        const passed = accuracy >= DEFAULT_QUIZ_CONFIG.passingScore;

        // Calculate XP
        const baseXP = correctCount * DEFAULT_QUIZ_CONFIG.xpPerCorrect;
        const streakBonus = state.maxStreak >= 3 ? (state.maxStreak - 2) * DEFAULT_QUIZ_CONFIG.streakBonus : 0;
        const xpEarned = passed ? baseXP + streakBonus : 0;

        // Get words learned (English words from correct answers)
        const wordsLearned = state.currentAnswers
          .filter((a) => a.isCorrect)
          .map((a) => {
            const q = state.currentQuestions.find((q) => q.id === a.questionId);
            return q?.word.english || '';
          })
          .filter(Boolean);

        const newTotalWordsLearned = passed
          ? [...new Set([...state.totalWordsLearned, ...wordsLearned])]
          : state.totalWordsLearned;

        set({
          attempts: state.attempts + 1,
          bestScore: Math.max(state.bestScore, Math.round(accuracy)),
          hasPassed: passed,
          isPlaying: false,
          // Clear questions if passed so new ones are fetched next time
          currentQuestions: passed ? [] : state.currentQuestions,
          // Update stats only if passed
          totalQuizzesPassed: passed ? state.totalQuizzesPassed + 1 : state.totalQuizzesPassed,
          totalCorrectAnswers: state.totalCorrectAnswers + correctCount,
          totalWordsLearned: newTotalWordsLearned,
          bestStreak: Math.max(state.bestStreak, state.maxStreak),
        });

        return { passed, xpEarned };
      },

      clearQuiz: () => {
        set({
          currentQuestions: [],
          currentAnswers: [],
          attempts: 0,
          bestScore: 0,
          hasPassed: false,
          currentIndex: 0,
          score: 0,
          streak: 0,
          maxStreak: 0,
          isPlaying: false,
          isLoading: false,
          error: null,
        });
      },

      hasActiveQuiz: () => {
        const state = get();
        return state.currentQuestions.length > 0 && !state.hasPassed;
      },

      resetSession: () => {
        set({
          currentAnswers: [],
          currentIndex: 0,
          score: 0,
          streak: 0,
          maxStreak: 0,
          isPlaying: false,
          error: null,
        });
      },
    }),
    {
      name: 'arabic-quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        dataVersion: state.dataVersion,
        currentQuestions: state.currentQuestions,
        attempts: state.attempts,
        bestScore: state.bestScore,
        hasPassed: state.hasPassed,
        totalQuizzesPassed: state.totalQuizzesPassed,
        totalCorrectAnswers: state.totalCorrectAnswers,
        totalWordsLearned: state.totalWordsLearned,
        bestStreak: state.bestStreak,
      }),
      onRehydrateStorage: () => (state) => {
        // Clear old quiz questions if version changed
        if (state && state.dataVersion !== QUIZ_DATA_VERSION) {
          __DEV__ && console.log('Quiz data version changed, clearing old questions...');
          state.currentQuestions = [];
          state.currentAnswers = [];
          state.attempts = 0;
          state.bestScore = 0;
          state.hasPassed = false;
          state.dataVersion = QUIZ_DATA_VERSION;
        }
      },
    }
  )
);
