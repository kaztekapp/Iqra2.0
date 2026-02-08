/**
 * Grammar Quiz API
 * Generates quiz questions from existing grammar exercises
 */

import { grammarExercises } from '../data/arabic/exercises/grammarExercises';
import { grammarLessons } from '../data/arabic/grammar/lessons';
import {
  GrammarQuizQuestion,
  GrammarQuizConfig,
  GrammarQuizOption,
  DEFAULT_GRAMMAR_QUIZ_CONFIG,
  GrammarQuizDifficulty,
} from '../types/grammarQuiz';
import { Exercise, GrammarLesson } from '../types/arabic';

// Cache version for invalidation
export const GRAMMAR_QUIZ_VERSION = 1;

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get lesson category from lesson ID
 */
function getLessonCategory(lessonId: string): string {
  const lesson = grammarLessons.find((l) => l.id === lessonId);
  return lesson?.category || 'other';
}

/**
 * Extract lesson ID from exercise ID
 * Exercise ID format: 'ex-grammar-{lessonNum}-{exerciseNum}'
 */
function extractLessonId(exerciseId: string): string {
  const match = exerciseId.match(/ex-grammar-(\d+)/);
  if (match) {
    return `grammar-${match[1]}`;
  }
  return '';
}

/**
 * Convert an Exercise to a GrammarQuizQuestion
 */
function exerciseToQuizQuestion(exercise: Exercise): GrammarQuizQuestion | null {
  // Only support multiple_choice and fill_blank for quiz
  if (exercise.type !== 'multiple_choice' && exercise.type !== 'fill_blank') {
    return null;
  }

  const lessonId = extractLessonId(exercise.id);
  const category = getLessonCategory(lessonId);

  if (exercise.type === 'multiple_choice' && exercise.options) {
    const options: GrammarQuizOption[] = exercise.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      textFr: opt.textFr,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: exercise.id,
      lessonId,
      type: 'multiple_choice',
      question: exercise.question,
      questionFr: exercise.questionFr,
      questionArabic: exercise.questionArabic,
      options: shuffleArray(options),
      correctAnswer: exercise.correctAnswer,
      hint: exercise.hint,
      hintFr: exercise.hintFr,
      explanation: exercise.explanation || '',
      explanationFr: exercise.explanationFr,
      xpReward: exercise.xpReward,
      level: exercise.level,
      category,
    };
  }

  if (exercise.type === 'fill_blank') {
    return {
      id: exercise.id,
      lessonId,
      type: 'fill_blank',
      question: exercise.question,
      questionFr: exercise.questionFr,
      questionArabic: exercise.questionArabic,
      correctAnswer: exercise.correctAnswer,
      hint: exercise.hint,
      hintFr: exercise.hintFr,
      explanation: exercise.explanation || '',
      explanationFr: exercise.explanationFr,
      xpReward: exercise.xpReward,
      level: exercise.level,
      category,
    };
  }

  return null;
}

/**
 * Filter exercises by difficulty level
 */
function filterByDifficulty(
  exercises: Exercise[],
  difficulty: GrammarQuizDifficulty
): Exercise[] {
  if (difficulty === 'mixed') {
    return exercises;
  }
  return exercises.filter((ex) => ex.level === difficulty);
}

/**
 * Filter exercises by question type
 */
function filterByType(
  exercises: Exercise[],
  includeMultipleChoice: boolean,
  includeFillBlank: boolean
): Exercise[] {
  return exercises.filter((ex) => {
    if (ex.type === 'multiple_choice' && includeMultipleChoice) return true;
    if (ex.type === 'fill_blank' && includeFillBlank) return true;
    return false;
  });
}

/**
 * Filter exercises by category
 */
function filterByCategory(exercises: Exercise[], categories?: string[]): Exercise[] {
  if (!categories || categories.length === 0) {
    return exercises;
  }

  return exercises.filter((ex) => {
    const lessonId = extractLessonId(ex.id);
    const category = getLessonCategory(lessonId);
    return categories.includes(category);
  });
}

/**
 * Generate a grammar quiz with specified configuration
 */
export async function generateGrammarQuiz(
  config: Partial<GrammarQuizConfig> = {}
): Promise<GrammarQuizQuestion[]> {
  const fullConfig: GrammarQuizConfig = {
    ...DEFAULT_GRAMMAR_QUIZ_CONFIG,
    ...config,
  };

  // Get all grammar exercises
  let filteredExercises = [...grammarExercises];

  // Apply filters
  filteredExercises = filterByDifficulty(filteredExercises, fullConfig.difficulty);
  filteredExercises = filterByType(
    filteredExercises,
    fullConfig.includeMultipleChoice,
    fullConfig.includeFillBlank
  );
  filteredExercises = filterByCategory(filteredExercises, fullConfig.categories);

  // Shuffle and take required count
  const shuffled = shuffleArray(filteredExercises);
  const selected = shuffled.slice(0, fullConfig.questionCount);

  // Convert to quiz questions
  const questions: GrammarQuizQuestion[] = [];
  for (const exercise of selected) {
    const question = exerciseToQuizQuestion(exercise);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

/**
 * Generate a grammar quiz for a specific lesson
 */
export async function generateLessonQuiz(
  lessonId: string,
  questionCount: number = 5
): Promise<GrammarQuizQuestion[]> {
  const lesson = grammarLessons.find((l) => l.id === lessonId);
  if (!lesson) {
    return [];
  }

  // Get exercises for this lesson
  const lessonExercises = grammarExercises.filter((ex) =>
    lesson.exercises.includes(ex.id)
  );

  // Filter to supported types
  const supportedExercises = lessonExercises.filter(
    (ex) => ex.type === 'multiple_choice' || ex.type === 'fill_blank'
  );

  // Shuffle and select
  const shuffled = shuffleArray(supportedExercises);
  const selected = shuffled.slice(0, questionCount);

  // Convert to quiz questions
  const questions: GrammarQuizQuestion[] = [];
  for (const exercise of selected) {
    const question = exerciseToQuizQuestion(exercise);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

/**
 * Get available grammar categories
 */
export function getGrammarCategories(): { id: string; name: string; count: number }[] {
  const categoryCounts: Record<string, number> = {};

  for (const lesson of grammarLessons) {
    const category = lesson.category;
    const exerciseCount = lesson.exercises.filter((exId) => {
      const ex = grammarExercises.find((e) => e.id === exId);
      return ex && (ex.type === 'multiple_choice' || ex.type === 'fill_blank');
    }).length;

    categoryCounts[category] = (categoryCounts[category] || 0) + exerciseCount;
  }

  const categoryNames: Record<string, string> = {
    articles: 'Articles',
    pronouns: 'Pronouns',
    verbs: 'Verbs',
    nouns: 'Nouns',
    adjectives: 'Adjectives',
    sentences: 'Sentences',
    other: 'Other',
  };

  return Object.entries(categoryCounts)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => ({
      id,
      name: categoryNames[id] || id,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get grammar lesson info for display
 */
export function getGrammarLessons(): {
  id: string;
  title: string;
  titleArabic: string;
  level: string;
  category: string;
  exerciseCount: number;
}[] {
  return grammarLessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    titleArabic: lesson.titleArabic,
    level: lesson.level,
    category: lesson.category,
    exerciseCount: lesson.exercises.filter((exId) => {
      const ex = grammarExercises.find((e) => e.id === exId);
      return ex && (ex.type === 'multiple_choice' || ex.type === 'fill_blank');
    }).length,
  }));
}

/**
 * Get total available grammar questions
 */
export function getTotalGrammarQuestions(): {
  total: number;
  byLevel: { beginner: number; intermediate: number; advanced: number };
  byType: { multipleChoice: number; fillBlank: number };
} {
  const supportedExercises = grammarExercises.filter(
    (ex) => ex.type === 'multiple_choice' || ex.type === 'fill_blank'
  );

  return {
    total: supportedExercises.length,
    byLevel: {
      beginner: supportedExercises.filter((ex) => ex.level === 'beginner').length,
      intermediate: supportedExercises.filter((ex) => ex.level === 'intermediate').length,
      advanced: supportedExercises.filter((ex) => ex.level === 'advanced').length,
    },
    byType: {
      multipleChoice: supportedExercises.filter((ex) => ex.type === 'multiple_choice').length,
      fillBlank: supportedExercises.filter((ex) => ex.type === 'fill_blank').length,
    },
  };
}

/**
 * Check if answer is correct for fill-in-blank questions
 */
export function checkFillBlankAnswer(
  userAnswer: string,
  correctAnswer: string | string[]
): boolean {
  const normalizedUserAnswer = userAnswer.trim().toLowerCase();

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(
      (ans) => normalizedUserAnswer === ans.trim().toLowerCase()
    );
  }

  return normalizedUserAnswer === correctAnswer.trim().toLowerCase();
}
