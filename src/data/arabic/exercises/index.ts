import { Exercise } from '../../../types/arabic';
import alphabetExercises from './alphabetExercises';
import vocabularyExercises from './vocabularyExercises';
import grammarExercises from './grammarExercises';
import verbExercises from './verbExercises';

// Combine all exercises
export const exercises: Exercise[] = [
  ...alphabetExercises,
  ...vocabularyExercises,
  ...grammarExercises,
  ...verbExercises,
];

// Helper functions
export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(ex => ex.id === id);
};

export const getExercisesByModule = (moduleType: Exercise['moduleType']): Exercise[] => {
  return exercises.filter(ex => ex.moduleType === moduleType);
};

export const getExercisesByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Exercise[] => {
  return exercises.filter(ex => ex.level === level);
};

export const getExercisesByType = (type: Exercise['type']): Exercise[] => {
  return exercises.filter(ex => ex.type === type);
};

export const getExercisesByModuleAndLevel = (
  moduleType: Exercise['moduleType'],
  level: 'beginner' | 'intermediate' | 'advanced'
): Exercise[] => {
  return exercises.filter(ex => ex.moduleType === moduleType && ex.level === level);
};

export const getRandomExercises = (
  count: number,
  options?: {
    level?: 'beginner' | 'intermediate' | 'advanced';
    moduleType?: Exercise['moduleType'];
    type?: Exercise['type'];
  }
): Exercise[] => {
  let pool = [...exercises];

  if (options?.level) {
    pool = pool.filter(ex => ex.level === options.level);
  }
  if (options?.moduleType) {
    pool = pool.filter(ex => ex.moduleType === options.moduleType);
  }
  if (options?.type) {
    pool = pool.filter(ex => ex.type === options.type);
  }

  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Get exercise counts by module
export const getExerciseCountByModule = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  exercises.forEach(ex => {
    counts[ex.moduleType] = (counts[ex.moduleType] || 0) + 1;
  });
  return counts;
};

// Get exercises for a specific grammar lesson
export const getExercisesForGrammarLesson = (lessonId: string): Exercise[] => {
  // Map lesson IDs to related exercises (including writing exercises)
  const lessonExerciseMap: Record<string, string[]> = {
    'grammar-3': [
      'ex-grammar-3-1', 'ex-grammar-3-2', 'ex-grammar-3-3', 'ex-grammar-3-4', 'ex-grammar-3-5',
      'ex-grammar-3-6', 'ex-grammar-3-7', 'ex-grammar-3-8', 'ex-grammar-3-9', 'ex-grammar-3-10',
      // Writing exercises (12)
      'ex-grammar-3-11', 'ex-grammar-3-12', 'ex-grammar-3-13', 'ex-grammar-3-14', 'ex-grammar-3-15',
      'ex-grammar-3-16', 'ex-grammar-3-17', 'ex-grammar-3-18', 'ex-grammar-3-19', 'ex-grammar-3-20',
      'ex-grammar-3-21', 'ex-grammar-3-22'
    ],
    'grammar-4': [
      'ex-grammar-4-1', 'ex-grammar-4-2', 'ex-grammar-4-3', 'ex-grammar-4-4', 'ex-grammar-4-5',
      'ex-grammar-4-6', 'ex-grammar-4-7', 'ex-grammar-4-8', 'ex-grammar-4-9', 'ex-grammar-4-10',
      // Writing exercises (12)
      'ex-grammar-4-11', 'ex-grammar-4-12', 'ex-grammar-4-13', 'ex-grammar-4-14', 'ex-grammar-4-15',
      'ex-grammar-4-16', 'ex-grammar-4-17', 'ex-grammar-4-18', 'ex-grammar-4-19', 'ex-grammar-4-20',
      'ex-grammar-4-21', 'ex-grammar-4-22'
    ],
    'grammar-5': [
      'ex-grammar-5-1', 'ex-grammar-5-2', 'ex-grammar-5-3', 'ex-grammar-5-4', 'ex-grammar-5-5',
      'ex-grammar-5-6', 'ex-grammar-5-7', 'ex-grammar-5-8', 'ex-grammar-5-9', 'ex-grammar-5-10',
      // Writing exercises (12)
      'ex-grammar-5-11', 'ex-grammar-5-12', 'ex-grammar-5-13', 'ex-grammar-5-14', 'ex-grammar-5-15',
      'ex-grammar-5-16', 'ex-grammar-5-17', 'ex-grammar-5-18', 'ex-grammar-5-19', 'ex-grammar-5-20',
      'ex-grammar-5-21', 'ex-grammar-5-22'
    ],
    'grammar-6': [
      'ex-grammar-6-1', 'ex-grammar-6-2', 'ex-grammar-6-3', 'ex-grammar-6-4', 'ex-grammar-6-5',
      'ex-grammar-6-6', 'ex-grammar-6-7', 'ex-grammar-6-8', 'ex-grammar-6-9', 'ex-grammar-6-10',
      // Writing exercises (12)
      'ex-grammar-6-11', 'ex-grammar-6-12', 'ex-grammar-6-13', 'ex-grammar-6-14', 'ex-grammar-6-15',
      'ex-grammar-6-16', 'ex-grammar-6-17', 'ex-grammar-6-18', 'ex-grammar-6-19', 'ex-grammar-6-20',
      'ex-grammar-6-21', 'ex-grammar-6-22'
    ],
    'grammar-7': [
      'ex-grammar-7-1', 'ex-grammar-7-2', 'ex-grammar-7-3', 'ex-grammar-7-4', 'ex-grammar-7-5',
      'ex-grammar-7-6', 'ex-grammar-7-7', 'ex-grammar-7-8', 'ex-grammar-7-9', 'ex-grammar-7-10',
      // Writing exercises (12)
      'ex-grammar-7-11', 'ex-grammar-7-12', 'ex-grammar-7-13', 'ex-grammar-7-14', 'ex-grammar-7-15',
      'ex-grammar-7-16', 'ex-grammar-7-17', 'ex-grammar-7-18', 'ex-grammar-7-19', 'ex-grammar-7-20',
      'ex-grammar-7-21', 'ex-grammar-7-22'
    ],
    'grammar-8': [
      'ex-grammar-8-1', 'ex-grammar-8-2', 'ex-grammar-8-3', 'ex-grammar-8-4', 'ex-grammar-8-5',
      'ex-grammar-8-6', 'ex-grammar-8-7', 'ex-grammar-8-8', 'ex-grammar-8-9', 'ex-grammar-8-10',
      // Writing exercises (12)
      'ex-grammar-8-11', 'ex-grammar-8-12', 'ex-grammar-8-13', 'ex-grammar-8-14', 'ex-grammar-8-15',
      'ex-grammar-8-16', 'ex-grammar-8-17', 'ex-grammar-8-18', 'ex-grammar-8-19', 'ex-grammar-8-20',
      'ex-grammar-8-21', 'ex-grammar-8-22'
    ],
    'grammar-9': [
      'ex-grammar-9-1', 'ex-grammar-9-2', 'ex-grammar-9-3', 'ex-grammar-9-4', 'ex-grammar-9-5',
      'ex-grammar-9-6', 'ex-grammar-9-7', 'ex-grammar-9-8', 'ex-grammar-9-9', 'ex-grammar-9-10',
      // Writing exercises (12)
      'ex-grammar-9-11', 'ex-grammar-9-12', 'ex-grammar-9-13', 'ex-grammar-9-14', 'ex-grammar-9-15',
      'ex-grammar-9-16', 'ex-grammar-9-17', 'ex-grammar-9-18', 'ex-grammar-9-19', 'ex-grammar-9-20',
      'ex-grammar-9-21', 'ex-grammar-9-22'
    ],
    'grammar-10': [
      'ex-grammar-10-1', 'ex-grammar-10-2', 'ex-grammar-10-3', 'ex-grammar-10-4', 'ex-grammar-10-5',
      'ex-grammar-10-6', 'ex-grammar-10-7', 'ex-grammar-10-8', 'ex-grammar-10-9', 'ex-grammar-10-10',
      'ex-grammar-10-11', 'ex-grammar-10-12',
      // Writing exercises (12)
      'ex-grammar-10-13', 'ex-grammar-10-14', 'ex-grammar-10-15', 'ex-grammar-10-16', 'ex-grammar-10-17',
      'ex-grammar-10-18', 'ex-grammar-10-19', 'ex-grammar-10-20', 'ex-grammar-10-21', 'ex-grammar-10-22',
      'ex-grammar-10-23', 'ex-grammar-10-24'
    ],
    'grammar-11': [
      'ex-grammar-11-1', 'ex-grammar-11-2', 'ex-grammar-11-3', 'ex-grammar-11-4', 'ex-grammar-11-5',
      'ex-grammar-11-6', 'ex-grammar-11-7', 'ex-grammar-11-8', 'ex-grammar-11-9', 'ex-grammar-11-10',
      'ex-grammar-11-11', 'ex-grammar-11-12',
      // Writing exercises (12)
      'ex-grammar-11-13', 'ex-grammar-11-14', 'ex-grammar-11-15', 'ex-grammar-11-16', 'ex-grammar-11-17',
      'ex-grammar-11-18', 'ex-grammar-11-19', 'ex-grammar-11-20', 'ex-grammar-11-21', 'ex-grammar-11-22',
      'ex-grammar-11-23', 'ex-grammar-11-24'
    ],
  };

  const exerciseIds = lessonExerciseMap[lessonId] || [];
  return exercises.filter(ex => exerciseIds.includes(ex.id));
};

// Get exercises for a specific vocabulary theme
export const getExercisesForVocabularyTheme = (themeId: string): Exercise[] => {
  // Map theme IDs to exercise ID prefixes
  const themePrefixMap: Record<string, string> = {
    'greetings': 'ex-vocab-greet',
    'numbers': 'ex-vocab-num',
    'family': 'ex-vocab-fam',
    'colors': 'ex-vocab-color',
    'food': 'ex-vocab-food',
    'body': 'ex-vocab-body',
  };

  const prefix = themePrefixMap[themeId];
  if (!prefix) return [];

  return exercises.filter(ex =>
    ex.moduleType === 'vocabulary' && ex.id.startsWith(prefix)
  );
};

// Get writing exercises for a specific vocabulary theme
export const getWritingExercisesForVocabularyTheme = (themeId: string): Exercise[] => {
  const themeExercises = getExercisesForVocabularyTheme(themeId);
  return themeExercises.filter(ex => ex.type === 'writing');
};

// Get quiz exercises (non-writing) for a specific vocabulary theme
export const getQuizExercisesForVocabularyTheme = (themeId: string): Exercise[] => {
  const themeExercises = getExercisesForVocabularyTheme(themeId);
  return themeExercises.filter(ex => ex.type !== 'writing');
};

// Export individual modules for direct access
export { alphabetExercises } from './alphabetExercises';
export { vocabularyExercises } from './vocabularyExercises';
export { grammarExercises } from './grammarExercises';
export { verbExercises } from './verbExercises';
