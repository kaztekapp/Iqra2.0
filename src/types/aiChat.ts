export type AIModuleContext =
  | 'alphabet'
  | 'vocabulary'
  | 'grammar'
  | 'verbs'
  | 'reading'
  | 'practice'
  | 'quran'
  | 'prayer'
  | 'duas'
  | 'general';

export type AIModelChoice = 'haiku' | 'sonnet';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AIContextPayload {
  module: AIModuleContext;
  lessonId?: string;
  lessonTitle?: string;
  userLevel: string;
  lettersLearned: number;
  wordsLearned: number;
  lessonsCompleted: number;
  accuracy: number;
  currentStreak: number;
  currentContent?: string;
  language: 'en' | 'fr';
  learningMethod?: 'learn' | 'spaced-repetition' | 'chunking' | 'active-recall' | 'visualization' | 'write' | 'shadowing' | 'methods';
  quranProgress?: {
    ayahsLearned: number;
    ayahsMemorized: number;
    surahsCompleted: number;
    juzCompleted: number;
    overallPercent: number;
  };
  prayerProgress?: {
    lessonsCompleted: number;
    totalLessons: number;
    progressPercent: number;
  };
  duasProgress?: {
    memorizedCount: number;
    favoritesCount: number;
    totalDuas: number;
    memorizedPercent: number;
  };
}

export const AI_MODEL_IDS: Record<AIModelChoice, string> = {
  haiku: 'claude-haiku-4-5-20251001',
  sonnet: 'claude-sonnet-4-5-20250929',
};

export const AI_MAX_TOKENS: Record<AIModelChoice, number> = {
  haiku: 1024,
  sonnet: 1536,
};

export interface AIConversationMemory {
  module: AIModuleContext;
  topicsCovered: string[];
  mistakes: string[];
  strengths: string[];
  weakAreas: string[];
  /** How many times each topic was gotten wrong — higher = weaker */
  mistakeCounts: Record<string, number>;
  /** Topics the student mastered (were in mistakes, then got right) */
  mastered: string[];
  conversationCount: number;
  messageCount: number;
  lastUpdated: number;
}
