export type LearningMethodId =
  | 'repetitive_listening'
  | 'spaced_repetition'
  | 'chunking'
  | 'active_recall'
  | 'visualization'
  | 'writing_practice'
  | 'shadowing';

export type AgeGroup = 'under_25' | 'age_25_40' | 'age_40_plus';

export interface LearningMethodOption {
  id: LearningMethodId;
  nameKey: string;
  descriptionKey: string;
  bestForKey: string;
  icon: string;
  color: string;
  available: boolean;
  route: string;
  recommendedAges: AgeGroup[];
}

export const LEARNING_METHODS: LearningMethodOption[] = [
  {
    id: 'repetitive_listening',
    nameKey: 'learningMethods.repetitiveListening',
    descriptionKey: 'learningMethods.repetitiveListeningDesc',
    bestForKey: 'learningMethods.bestForBeginners',
    icon: 'headset',
    color: '#10b981',
    available: true,
    route: 'learn',
    recommendedAges: ['under_25'],
  },
  {
    id: 'spaced_repetition',
    nameKey: 'learningMethods.spacedRepetition',
    descriptionKey: 'learningMethods.spacedRepetitionDesc',
    bestForKey: 'learningMethods.bestForRetention',
    icon: 'calendar',
    color: '#6366f1',
    available: true,
    route: 'spaced-repetition',
    recommendedAges: ['age_25_40', 'age_40_plus'],
  },
  {
    id: 'chunking',
    nameKey: 'learningMethods.chunking',
    descriptionKey: 'learningMethods.chunkingDesc',
    bestForKey: 'learningMethods.bestForLongSurahs',
    icon: 'grid',
    color: '#f59e0b',
    available: true,
    route: 'chunking',
    recommendedAges: ['age_25_40'],
  },
  {
    id: 'active_recall',
    nameKey: 'learningMethods.activeRecall',
    descriptionKey: 'learningMethods.activeRecallDesc',
    bestForKey: 'learningMethods.bestForRetention',
    icon: 'bulb',
    color: '#ec4899',
    available: true,
    route: 'active-recall',
    recommendedAges: ['age_25_40', 'age_40_plus'],
  },
  {
    id: 'visualization',
    nameKey: 'learningMethods.visualization',
    descriptionKey: 'learningMethods.visualizationDesc',
    bestForKey: 'learningMethods.bestForVisualLearners',
    icon: 'eye',
    color: '#3b82f6',
    available: true,
    route: 'visualization',
    recommendedAges: ['age_40_plus'],
  },
  {
    id: 'writing_practice',
    nameKey: 'learningMethods.writingPractice',
    descriptionKey: 'learningMethods.writingPracticeDesc',
    bestForKey: 'learningMethods.bestForBeginners',
    icon: 'pencil',
    color: '#8b5cf6',
    available: true,
    route: 'write',
    recommendedAges: ['under_25'],
  },
  {
    id: 'shadowing',
    nameKey: 'learningMethods.shadowing',
    descriptionKey: 'learningMethods.shadowingDesc',
    bestForKey: 'learningMethods.bestForPronunciation',
    icon: 'mic',
    color: '#06b6d4',
    available: true,
    route: 'shadowing',
    recommendedAges: ['under_25'],
  },
];
