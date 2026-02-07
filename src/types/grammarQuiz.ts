// Grammar Quiz Types for Iqra2.0 App

export type GrammarQuizDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'mixed';

export type GrammarQuestionType = 'multiple_choice' | 'fill_blank';

export interface GrammarQuizQuestion {
  id: string;
  lessonId: string;
  type: GrammarQuestionType;
  question: string;
  questionFr?: string;
  questionArabic?: string;
  options?: GrammarQuizOption[];
  correctAnswer: string | string[];
  hint?: string;
  hintFr?: string;
  explanation: string;
  explanationFr?: string;
  xpReward: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface GrammarQuizOption {
  id: string;
  text: string;
  textFr?: string;
  isCorrect: boolean;
}

export interface GrammarQuizConfig {
  questionCount: number;
  difficulty: GrammarQuizDifficulty;
  includeMultipleChoice: boolean;
  includeFillBlank: boolean;
  passingScore: number;
  xpPerCorrect: number;
  streakBonus: number;
  categories?: string[];
}

export const DEFAULT_GRAMMAR_QUIZ_CONFIG: GrammarQuizConfig = {
  questionCount: 10,
  difficulty: 'mixed',
  includeMultipleChoice: true,
  includeFillBlank: true,
  passingScore: 70,
  xpPerCorrect: 15,
  streakBonus: 5,
};

export interface GrammarQuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  xpEarned: number;
  maxStreak: number;
  passed: boolean;
  timeSpent: number;
  questionResults: {
    questionId: string;
    isCorrect: boolean;
    selectedAnswer: string;
    correctAnswer: string | string[];
  }[];
}
