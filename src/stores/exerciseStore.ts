import { create } from 'zustand';
import { Exercise, ExerciseType } from '../types/arabic';

interface ExerciseAnswer {
  exerciseId: string;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
}

interface ExerciseSession {
  exercises: Exercise[];
  currentIndex: number;
  answers: ExerciseAnswer[];
  startTime: number;
  totalXpEarned: number;
}

interface ExerciseState {
  currentSession: ExerciseSession | null;

  // Session management
  startSession: (exercises: Exercise[]) => void;
  submitAnswer: (answer: string | string[]) => boolean;
  nextExercise: () => boolean;
  previousExercise: () => boolean;
  endSession: () => ExerciseSession | null;

  // Getters
  getCurrentExercise: () => Exercise | null;
  getProgress: () => { current: number; total: number };
  getSessionResults: () => { correct: number; total: number; xp: number; accuracy: number } | null;
  isSessionComplete: () => boolean;
  hasAnsweredCurrent: () => boolean;
  getCurrentAnswer: () => ExerciseAnswer | null;
}

export const useExerciseStore = create<ExerciseState>()((set, get) => ({
  currentSession: null,

  startSession: (exercises) => set({
    currentSession: {
      exercises,
      currentIndex: 0,
      answers: [],
      startTime: Date.now(),
      totalXpEarned: 0,
    },
  }),

  submitAnswer: (answer) => {
    const state = get();
    if (!state.currentSession) return false;

    const exercise = state.currentSession.exercises[state.currentSession.currentIndex];
    if (!exercise) return false;

    // Check if already answered
    const existingAnswer = state.currentSession.answers.find(
      a => a.exerciseId === exercise.id
    );
    if (existingAnswer) return existingAnswer.isCorrect;

    // Check if answer is correct
    let isCorrect = false;
    if (Array.isArray(exercise.correctAnswer)) {
      if (Array.isArray(answer)) {
        isCorrect = exercise.correctAnswer.length === answer.length &&
          exercise.correctAnswer.every(a => answer.includes(a));
      } else {
        isCorrect = exercise.correctAnswer.includes(answer);
      }
    } else {
      isCorrect = exercise.correctAnswer.toLowerCase() ===
        (typeof answer === 'string' ? answer.toLowerCase() : answer[0]?.toLowerCase());
    }

    const timeSpent = Math.round((Date.now() - state.currentSession.startTime) / 1000);
    const xpEarned = isCorrect ? exercise.xpReward : 0;

    set({
      currentSession: {
        ...state.currentSession,
        answers: [
          ...state.currentSession.answers,
          { exerciseId: exercise.id, answer, isCorrect, timeSpent },
        ],
        totalXpEarned: state.currentSession.totalXpEarned + xpEarned,
        startTime: Date.now(), // Reset for next question
      },
    });

    return isCorrect;
  },

  nextExercise: () => {
    const state = get();
    if (!state.currentSession) return false;

    const nextIndex = state.currentSession.currentIndex + 1;
    if (nextIndex >= state.currentSession.exercises.length) return false;

    set({
      currentSession: {
        ...state.currentSession,
        currentIndex: nextIndex,
        startTime: Date.now(),
      },
    });

    return true;
  },

  previousExercise: () => {
    const state = get();
    if (!state.currentSession) return false;

    const prevIndex = state.currentSession.currentIndex - 1;
    if (prevIndex < 0) return false;

    set({
      currentSession: {
        ...state.currentSession,
        currentIndex: prevIndex,
      },
    });

    return true;
  },

  endSession: () => {
    const state = get();
    const session = state.currentSession;
    set({ currentSession: null });
    return session;
  },

  getCurrentExercise: () => {
    const state = get();
    if (!state.currentSession) return null;
    return state.currentSession.exercises[state.currentSession.currentIndex] || null;
  },

  getProgress: () => {
    const state = get();
    if (!state.currentSession) return { current: 0, total: 0 };
    return {
      current: state.currentSession.currentIndex + 1,
      total: state.currentSession.exercises.length,
    };
  },

  getSessionResults: () => {
    const state = get();
    if (!state.currentSession) return null;

    const correct = state.currentSession.answers.filter(a => a.isCorrect).length;
    const total = state.currentSession.answers.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      correct,
      total,
      xp: state.currentSession.totalXpEarned,
      accuracy,
    };
  },

  isSessionComplete: () => {
    const state = get();
    if (!state.currentSession) return false;
    return state.currentSession.answers.length >= state.currentSession.exercises.length;
  },

  hasAnsweredCurrent: () => {
    const state = get();
    if (!state.currentSession) return false;
    const exercise = state.currentSession.exercises[state.currentSession.currentIndex];
    if (!exercise) return false;
    return state.currentSession.answers.some(a => a.exerciseId === exercise.id);
  },

  getCurrentAnswer: () => {
    const state = get();
    if (!state.currentSession) return null;
    const exercise = state.currentSession.exercises[state.currentSession.currentIndex];
    if (!exercise) return null;
    return state.currentSession.answers.find(a => a.exerciseId === exercise.id) || null;
  },
}));
