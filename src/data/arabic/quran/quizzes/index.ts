// Quran Quiz Data
// Comprehensive question banks for all quiz categories

import { QuizQuestion, QuizCategory, QuizCategoryInfo } from '../../../../types/quran';
import { ALL_SURAH_STRUCTURE_QUESTIONS, SURAH_STRUCTURE_SETS, SURAH_STRUCTURE_SET_KEYS } from './surahStructure';
import { ALL_JUZ_QUESTIONS, JUZ_SETS, JUZ_SET_KEYS, JUZ_SET_NAMES } from './juzQuestions';
import { ALL_MAKKI_MADANI_QUESTIONS, MAKKI_MADANI_SETS, MAKKI_MADANI_SET_KEYS, MAKKI_MADANI_SET_NAMES } from './makkiMadaniQuestions';
import { ALL_TAJWEED_QUESTIONS, TAJWEED_SETS, TAJWEED_SET_KEYS, TAJWEED_SET_NAMES } from './tajweedQuestions';

// Quiz Categories Configuration
export const QUIZ_CATEGORIES: QuizCategoryInfo[] = [
  {
    id: 'surah_structure',
    nameEnglish: 'Surah & Structure',
    nameArabic: 'السور والتركيب',
    description: 'Test your knowledge of Surah names, numbers, and order',
    icon: 'book',
    color: '#10b981',
    questionCount: 154,
  },
  {
    id: 'juz',
    nameEnglish: 'Juz (Ajza\')',
    nameArabic: 'الأجزاء',
    description: 'Learn and test your knowledge of the 30 Juz',
    icon: 'layers',
    color: '#3b82f6',
    questionCount: 100,
  },
  {
    id: 'makki_madani',
    nameEnglish: 'Makki vs Madani',
    nameArabic: 'مكي ومدني',
    description: 'Learn about revelation locations',
    icon: 'location',
    color: '#ec4899',
    questionCount: 50,
  },
  {
    id: 'tajweed',
    nameEnglish: 'Tajweed Rules',
    nameArabic: 'أحكام التجويد',
    description: 'Test your Tajweed knowledge',
    icon: 'musical-notes',
    color: '#14b8a6',
    questionCount: 50,
  },
];

// Get all questions for a category
export function getQuestionsByCategory(category: QuizCategory): QuizQuestion[] {
  switch (category) {
    case 'surah_structure':
      return ALL_SURAH_STRUCTURE_QUESTIONS;
    case 'juz':
      return ALL_JUZ_QUESTIONS;
    case 'makki_madani':
      return ALL_MAKKI_MADANI_QUESTIONS;
    case 'tajweed':
      return ALL_TAJWEED_QUESTIONS;
    default:
      return [];
  }
}

// Get random questions for a quiz session
export function getRandomQuestions(category: QuizCategory, count: number = 10): QuizQuestion[] {
  const questions = getQuestionsByCategory(category);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}

// Get category info
export function getCategoryById(categoryId: QuizCategory): QuizCategoryInfo | undefined {
  return QUIZ_CATEGORIES.find(c => c.id === categoryId);
}

// Set names for display (Surah Structure)
export const SET_NAMES: Record<string, string> = {
  set1_surahs_1_10: 'Surahs 1-10',
  set2_surahs_11_20: 'Surahs 11-20',
  set3_surahs_21_30: 'Surahs 21-30',
  set4_surahs_31_40: 'Surahs 31-40',
  set5_surahs_41_50: 'Surahs 41-50',
  set6_surahs_51_60: 'Surahs 51-60',
  set7_surahs_61_70: 'Surahs 61-70',
  set8_surahs_71_80: 'Surahs 71-80',
  set9_surahs_81_90: 'Surahs 81-90',
  set10_surahs_91_100: 'Surahs 91-100',
  set11_surahs_101_114: 'Surahs 101-114',
  set12_which_comes_next: 'Which Comes Next',
  set13_name_from_number: 'Name from Number',
  set14_true_false: 'True or False',
  set15_special_facts: 'Special Facts',
};

// Get total number of sets for a category
export function getTotalSets(category: QuizCategory): number {
  switch (category) {
    case 'surah_structure':
      return SURAH_STRUCTURE_SET_KEYS.length;
    case 'juz':
      return JUZ_SET_KEYS.length;
    case 'makki_madani':
      return MAKKI_MADANI_SET_KEYS.length;
    case 'tajweed':
      return TAJWEED_SET_KEYS.length;
    default:
      return 1;
  }
}

// Get questions by set number (0-indexed)
export function getQuestionsBySet(category: QuizCategory, setIndex: number): QuizQuestion[] {
  switch (category) {
    case 'surah_structure': {
      const setKey = SURAH_STRUCTURE_SET_KEYS[setIndex];
      return setKey ? SURAH_STRUCTURE_SETS[setKey] : [];
    }
    case 'juz': {
      const setKey = JUZ_SET_KEYS[setIndex];
      return setKey ? JUZ_SETS[setKey] : [];
    }
    case 'makki_madani': {
      const setKey = MAKKI_MADANI_SET_KEYS[setIndex];
      return setKey ? MAKKI_MADANI_SETS[setKey] : [];
    }
    case 'tajweed': {
      const setKey = TAJWEED_SET_KEYS[setIndex];
      return setKey ? TAJWEED_SETS[setKey] : [];
    }
    default:
      return getQuestionsByCategory(category);
  }
}

// Get set name by index
export function getSetName(category: QuizCategory, setIndex: number): string {
  switch (category) {
    case 'surah_structure': {
      const setKey = SURAH_STRUCTURE_SET_KEYS[setIndex];
      return setKey ? (SET_NAMES[setKey] || `Set ${setIndex + 1}`) : `Set ${setIndex + 1}`;
    }
    case 'juz': {
      const setKey = JUZ_SET_KEYS[setIndex];
      return setKey ? (JUZ_SET_NAMES[setKey] || `Set ${setIndex + 1}`) : `Set ${setIndex + 1}`;
    }
    case 'makki_madani': {
      const setKey = MAKKI_MADANI_SET_KEYS[setIndex];
      return setKey ? (MAKKI_MADANI_SET_NAMES[setKey] || `Set ${setIndex + 1}`) : `Set ${setIndex + 1}`;
    }
    case 'tajweed': {
      const setKey = TAJWEED_SET_KEYS[setIndex];
      return setKey ? (TAJWEED_SET_NAMES[setKey] || `Set ${setIndex + 1}`) : `Set ${setIndex + 1}`;
    }
    default:
      return `Set ${setIndex + 1}`;
  }
}
