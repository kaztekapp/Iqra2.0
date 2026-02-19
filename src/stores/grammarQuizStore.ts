import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GrammarQuizQuestion,
  GrammarQuizConfig,
  DEFAULT_GRAMMAR_QUIZ_CONFIG,
} from '../types/grammarQuiz';
import { GRAMMAR_QUIZ_VERSION } from '../lib/grammarQuizApi';

export interface GrammarQuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
}

interface GrammarQuizState {
  // Data version for cache invalidation
  dataVersion: number;
  // Current quiz questions (persisted until passed)
  currentQuestions: GrammarQuizQuestion[];
  // Current answers for this attempt
  currentAnswers: GrammarQuizAnswer[];
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
  totalQuestionsAttempted: number;
  bestStreak: number;
  categoriesCompleted: string[];

  // Actions
  setQuestions: (questions: GrammarQuizQuestion[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startAttempt: () => void;
  submitAnswer: (selectedAnswer: string, timeSpent: number) => void;
  nextQuestion: () => void;
  recordAttempt: () => { passed: boolean; xpEarned: number };
  clearQuiz: () => void;
  hasActiveQuiz: () => boolean;
  resetSession: () => void;
}

export const useGrammarQuizStore = create<GrammarQuizState>()(
  persist(
    (set, get) => ({
      // Data version
      dataVersion: GRAMMAR_QUIZ_VERSION,
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
      totalQuestionsAttempted: 0,
      bestStreak: 0,
      categoriesCompleted: [],

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

      submitAnswer: (selectedAnswer, timeSpent) => {
        const state = get();
        const currentQuestion = state.currentQuestions[state.currentIndex];
        if (!currentQuestion) return;

        let isCorrect = false;
        if (currentQuestion.type === 'multiple_choice') {
          const correctOption = currentQuestion.options?.find((opt) => opt.isCorrect);
          isCorrect = selectedAnswer === correctOption?.id;
        } else if (currentQuestion.type === 'fill_blank') {
          const correctAnswer = currentQuestion.correctAnswer;
          const normalizedInput = selectedAnswer.trim();
          if (Array.isArray(correctAnswer)) {
            isCorrect = correctAnswer.some(
              (ans) => normalizedInput === ans.trim() || normalizedInput.toLowerCase() === ans.trim().toLowerCase()
            );
          } else {
            isCorrect = normalizedInput === correctAnswer.trim() || normalizedInput.toLowerCase() === correctAnswer.trim().toLowerCase();
          }
        }

        const newStreak = isCorrect ? state.streak + 1 : 0;
        const pointsEarned = isCorrect ? DEFAULT_GRAMMAR_QUIZ_CONFIG.xpPerCorrect : 0;

        const answer: GrammarQuizAnswer = {
          questionId: currentQuestion.id,
          selectedAnswer,
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
        const passed = accuracy >= DEFAULT_GRAMMAR_QUIZ_CONFIG.passingScore;

        // Calculate XP
        const baseXP = correctCount * DEFAULT_GRAMMAR_QUIZ_CONFIG.xpPerCorrect;
        const streakBonus =
          state.maxStreak >= 3
            ? (state.maxStreak - 2) * DEFAULT_GRAMMAR_QUIZ_CONFIG.streakBonus
            : 0;
        const xpEarned = passed ? baseXP + streakBonus : 0;

        // Get unique categories from correctly answered questions
        const newCategories = passed
          ? [
              ...new Set(
                state.currentAnswers
                  .filter((a) => a.isCorrect)
                  .map((a) => {
                    const q = state.currentQuestions.find((q) => q.id === a.questionId);
                    return q?.category || '';
                  })
                  .filter(Boolean)
              ),
            ]
          : [];

        const updatedCategories = passed
          ? [...new Set([...state.categoriesCompleted, ...newCategories])]
          : state.categoriesCompleted;

        set({
          attempts: state.attempts + 1,
          bestScore: Math.max(state.bestScore, Math.round(accuracy)),
          hasPassed: passed,
          isPlaying: false,
          // Clear questions if passed so new ones are fetched next time
          currentQuestions: passed ? [] : state.currentQuestions,
          // Update stats
          totalQuizzesPassed: passed ? state.totalQuizzesPassed + 1 : state.totalQuizzesPassed,
          totalCorrectAnswers: state.totalCorrectAnswers + correctCount,
          totalQuestionsAttempted: state.totalQuestionsAttempted + totalCount,
          bestStreak: Math.max(state.bestStreak, state.maxStreak),
          categoriesCompleted: updatedCategories,
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
      name: 'grammar-quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        dataVersion: state.dataVersion,
        currentQuestions: state.currentQuestions,
        attempts: state.attempts,
        bestScore: state.bestScore,
        hasPassed: state.hasPassed,
        totalQuizzesPassed: state.totalQuizzesPassed,
        totalCorrectAnswers: state.totalCorrectAnswers,
        totalQuestionsAttempted: state.totalQuestionsAttempted,
        bestStreak: state.bestStreak,
        categoriesCompleted: state.categoriesCompleted,
      }),
      onRehydrateStorage: () => (state) => {
        // Clear old quiz questions if version changed
        if (state && state.dataVersion !== GRAMMAR_QUIZ_VERSION) {
          __DEV__ && console.log('Grammar quiz data version changed, clearing old questions...');
          state.currentQuestions = [];
          state.currentAnswers = [];
          state.attempts = 0;
          state.bestScore = 0;
          state.hasPassed = false;
          state.dataVersion = GRAMMAR_QUIZ_VERSION;
        }
      },
    }
  )
);
