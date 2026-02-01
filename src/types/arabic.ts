// Core Arabic Types for ArabicMaster App

export type ArabicLevel = 'beginner' | 'intermediate' | 'advanced';

export interface ArabicLetter {
  id: string;
  letter: string;
  name: string;
  nameArabic: string;
  transliteration: string;
  audioUrl?: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  soundDescription: string;
  examples: {
    word: string;
    transliteration: string;
    meaning: string;
    position: 'initial' | 'medial' | 'final';
  }[];
  order: number;
  connectable: boolean;
}

export interface VocabularyTheme {
  id: string;
  name: string;
  nameArabic: string;
  icon: string;
  color: string;
  description: string;
  wordCount: number;
  level: ArabicLevel;
  order: number;
}

export interface VocabularyWord {
  id: string;
  themeId: string;
  arabic: string;
  arabicWithVowels: string;
  transliteration: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'pronoun' | 'other';
  gender?: 'masculine' | 'feminine';
  plural?: string;
  audioUrl?: string;
  exampleSentence?: {
    arabic: string;
    transliteration: string;
    english: string;
  };
  level: ArabicLevel;
  order: number;
}

export interface GrammarLesson {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  level: ArabicLevel;
  category: 'articles' | 'pronouns' | 'verbs' | 'nouns' | 'adjectives' | 'sentences' | 'other';
  content: GrammarContent[];
  exercises: string[]; // Exercise IDs
  order: number;
}

export interface GrammarContent {
  type: 'text' | 'example' | 'table' | 'rule' | 'note' | 'letters_grid' | 'description' | 'examples_grid' | 'comparison_grid';
  content: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  // For bilingual descriptions with audio
  arabicDescription?: string;
  // For letters grid display (sun/moon letters)
  letters?: string[];
  letterType?: 'sun' | 'moon';
  // For examples grid (multiple example cards)
  examples?: {
    arabic: string;
    english: string;
  }[];
  // For comparison grid (indefinite vs definite, etc.)
  comparisons?: {
    left: { arabic: string; label: string };
    right: { arabic: string; label: string };
  }[];
  leftLabel?: string;
  rightLabel?: string;
}

export interface VerbExample {
  arabic: string;
  transliteration: string;
  english: string;
  tense: 'past' | 'present' | 'future' | 'imperative';
}

export interface ArabicVerb {
  id: string;
  root: string;
  rootLetters: string[];
  form: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  pastTense: string;
  presentTense: string;
  meaning: string;
  level: ArabicLevel;
  conjugations: VerbConjugation;
  examples?: VerbExample[];
  audioUrl?: string;
}

export interface VerbConjugation {
  past: ConjugationTable;
  present: ConjugationTable;
  future: ConjugationTable;
  imperative?: ImperativeTable;
}

export interface ConjugationTable {
  firstPersonSingular: string;
  secondPersonMasculineSingular: string;
  secondPersonFeminineSingular: string;
  thirdPersonMasculineSingular: string;
  thirdPersonFeminineSingular: string;
  secondPersonDual: string;
  thirdPersonMasculineDual: string;
  thirdPersonFeminineDual: string;
  firstPersonPlural: string;
  secondPersonMasculinePlural: string;
  secondPersonFemininePlural: string;
  thirdPersonMasculinePlural: string;
  thirdPersonFemininePlural: string;
}

export interface ImperativeTable {
  secondPersonMasculineSingular: string;
  secondPersonFeminineSingular: string;
  secondPersonDual: string;
  secondPersonMasculinePlural: string;
  secondPersonFemininePlural: string;
}

export interface ReadingText {
  id: string;
  title: string;
  titleArabic: string;
  level: ArabicLevel;
  textWithVowels: string;
  textWithoutVowels: string;
  transliteration: string;
  translation: string;
  audioUrl?: string;
  vocabulary: string[];
  comprehensionQuestions: ComprehensionQuestion[];
  order: number;
}

export interface ComprehensionQuestion {
  id: string;
  questionArabic: string;
  questionEnglish: string;
  options: {
    arabic: string;
    english: string;
    isCorrect: boolean;
  }[];
}

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'writing'
  | 'listening'
  | 'reading'
  | 'letter_recognition'
  | 'vowel_placement';

export interface Exercise {
  id: string;
  type: ExerciseType;
  moduleType: 'alphabet' | 'vocabulary' | 'grammar' | 'verbs' | 'reading';
  level: ArabicLevel;
  question: string;
  questionArabic?: string;
  audioUrl?: string;
  options?: ExerciseOption[];
  correctAnswer: string | string[];
  hint?: string;
  explanation?: string;
  xpReward: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
  textArabic?: string;
  isCorrect: boolean;
}

export interface UserArabicProgress {
  id: string;
  userId: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;

  alphabetProgress: {
    lettersLearned: string[];
    writingPracticed: string[];
    masteredLetters: string[];
  };

  vocabularyProgress: {
    themesStarted: string[];
    themesCompleted: string[];
    wordsLearned: string[];
    wordsMastered: string[];
  };

  grammarProgress: {
    lessonsStarted: string[];
    lessonsCompleted: string[];
  };

  verbProgress: {
    verbsLearned: string[];
    verbsMastered: string[];
    tensesReviewed: {
      past: number;
      present: number;
      future: number;
    };
  };

  readingProgress: {
    textsStarted: string[];
    textsCompleted: string[];
  };

  exerciseResults: {
    totalCompleted: number;
    totalCorrect: number;
    byType: Record<ExerciseType, { completed: number; correct: number }>;
  };
}

export interface ExerciseResult {
  id: string;
  userId: string;
  exerciseId: string;
  exerciseType: ExerciseType;
  isCorrect: boolean;
  timeSpent: number;
  xpEarned: number;
  completedAt: string;
}

// Spaced Repetition System (SRS) Types
export type ReviewRating = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout
// 1 - Incorrect; serious difficulty
// 2 - Incorrect; remembered with significant difficulty
// 3 - Correct; significant difficulty
// 4 - Correct; some hesitation
// 5 - Perfect response

export interface VocabularyReviewItem {
  wordId: string;
  themeId: string;
  nextReviewDate: string; // ISO date string
  easeFactor: number; // SM-2 ease factor (default 2.5, min 1.3)
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  lastRating?: ReviewRating;
  lastReviewedAt?: string;
}
