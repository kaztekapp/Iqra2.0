export type LearningGoalId =
  | 'alphabet'
  | 'vocabulary'
  | 'grammar'
  | 'verbs'
  | 'reading'
  | 'quran'
  | 'tajweed'
  | 'duas'
  | 'prayer'
  | 'stories';

export interface LearningGoalOption {
  id: LearningGoalId;
  labelKey: string;
  arabic: string;
  icon: string;
  color: string;
}

export const LEARNING_GOALS: LearningGoalOption[] = [
  { id: 'alphabet', labelKey: 'onboarding.goalAlphabet', arabic: 'الحروف', icon: 'text', color: '#6366f1' },
  { id: 'vocabulary', labelKey: 'onboarding.goalVocabulary', arabic: 'المفردات', icon: 'library', color: '#D4AF37' },
  { id: 'grammar', labelKey: 'onboarding.goalGrammar', arabic: 'القواعد', icon: 'git-branch', color: '#22c55e' },
  { id: 'verbs', labelKey: 'onboarding.goalVerbs', arabic: 'الأفعال', icon: 'swap-horizontal', color: '#ec4899' },
  { id: 'reading', labelKey: 'onboarding.goalReading', arabic: 'القراءة', icon: 'document-text', color: '#f59e0b' },
  { id: 'quran', labelKey: 'onboarding.goalQuran', arabic: 'القرآن', icon: 'book', color: '#3b82f6' },
  { id: 'tajweed', labelKey: 'onboarding.goalTajweed', arabic: 'التجويد', icon: 'musical-notes', color: '#8b5cf6' },
  { id: 'duas', labelKey: 'onboarding.goalDuas', arabic: 'الأدعية', icon: 'hand-left', color: '#06b6d4' },
  { id: 'prayer', labelKey: 'onboarding.goalPrayer', arabic: 'الصلاة', icon: 'body', color: '#10b981' },
  { id: 'stories', labelKey: 'onboarding.goalStories', arabic: 'القصص', icon: 'book-outline', color: '#f97316' },
];
