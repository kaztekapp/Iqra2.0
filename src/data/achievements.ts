// Achievement definitions for gamification

export interface Achievement {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'learning' | 'streak' | 'mastery' | 'special';
  condition: {
    type: 'letters_learned' | 'words_learned' | 'lessons_completed' | 'streak_days' | 'total_xp' | 'exercises_completed' | 'accuracy' | 'surahs_completed' | 'verbs_learned';
    value: number;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_letter',
    title: 'First Steps',
    titleArabic: 'الخطوة الأولى',
    description: 'Learn your first Arabic letter',
    icon: 'school',
    xpReward: 10,
    category: 'learning',
    condition: { type: 'letters_learned', value: 1 },
  },
  {
    id: 'half_alphabet',
    title: 'Halfway There',
    titleArabic: 'نصف الطريق',
    description: 'Learn 14 Arabic letters',
    icon: 'trending-up',
    xpReward: 50,
    category: 'learning',
    condition: { type: 'letters_learned', value: 14 },
  },
  {
    id: 'full_alphabet',
    title: 'Alphabet Master',
    titleArabic: 'سيد الحروف',
    description: 'Learn all 28 Arabic letters',
    icon: 'trophy',
    xpReward: 100,
    category: 'learning',
    condition: { type: 'letters_learned', value: 28 },
  },
  {
    id: 'word_collector_10',
    title: 'Word Collector',
    titleArabic: 'جامع الكلمات',
    description: 'Learn 10 vocabulary words',
    icon: 'book',
    xpReward: 25,
    category: 'learning',
    condition: { type: 'words_learned', value: 10 },
  },
  {
    id: 'word_collector_50',
    title: 'Vocabulary Builder',
    titleArabic: 'بناء المفردات',
    description: 'Learn 50 vocabulary words',
    icon: 'library',
    xpReward: 75,
    category: 'learning',
    condition: { type: 'words_learned', value: 50 },
  },
  {
    id: 'word_collector_100',
    title: 'Lexicon Expert',
    titleArabic: 'خبير المعجم',
    description: 'Learn 100 vocabulary words',
    icon: 'medal',
    xpReward: 150,
    category: 'learning',
    condition: { type: 'words_learned', value: 100 },
  },
  {
    id: 'first_lesson',
    title: 'Grammar Beginner',
    titleArabic: 'مبتدئ القواعد',
    description: 'Complete your first grammar lesson',
    icon: 'document-text',
    xpReward: 20,
    category: 'learning',
    condition: { type: 'lessons_completed', value: 1 },
  },
  {
    id: 'grammar_student',
    title: 'Grammar Student',
    titleArabic: 'طالب القواعد',
    description: 'Complete 10 grammar lessons',
    icon: 'school',
    xpReward: 100,
    category: 'learning',
    condition: { type: 'lessons_completed', value: 10 },
  },
  {
    id: 'grammar_scholar',
    title: 'Grammar Scholar',
    titleArabic: 'عالم القواعد',
    description: 'Complete 20 grammar lessons',
    icon: 'ribbon',
    xpReward: 200,
    category: 'learning',
    condition: { type: 'lessons_completed', value: 20 },
  },
  {
    id: 'verb_beginner',
    title: 'Verb Explorer',
    titleArabic: 'مستكشف الأفعال',
    description: 'Learn 5 Arabic verbs',
    icon: 'flash',
    xpReward: 30,
    category: 'learning',
    condition: { type: 'verbs_learned', value: 5 },
  },
  {
    id: 'verb_master',
    title: 'Verb Master',
    titleArabic: 'سيد الأفعال',
    description: 'Learn 20 Arabic verbs',
    icon: 'star',
    xpReward: 100,
    category: 'learning',
    condition: { type: 'verbs_learned', value: 20 },
  },

  // Streak Achievements
  {
    id: 'streak_3',
    title: 'Getting Started',
    titleArabic: 'بداية جيدة',
    description: 'Study for 3 days in a row',
    icon: 'flame',
    xpReward: 30,
    category: 'streak',
    condition: { type: 'streak_days', value: 3 },
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    titleArabic: 'محارب الأسبوع',
    description: 'Study for 7 days in a row',
    icon: 'flame',
    xpReward: 70,
    category: 'streak',
    condition: { type: 'streak_days', value: 7 },
  },
  {
    id: 'streak_14',
    title: 'Two Week Champion',
    titleArabic: 'بطل الأسبوعين',
    description: 'Study for 14 days in a row',
    icon: 'flame',
    xpReward: 150,
    category: 'streak',
    condition: { type: 'streak_days', value: 14 },
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    titleArabic: 'سيد الشهر',
    description: 'Study for 30 days in a row',
    icon: 'flame',
    xpReward: 300,
    category: 'streak',
    condition: { type: 'streak_days', value: 30 },
  },
  {
    id: 'streak_100',
    title: 'Dedication Legend',
    titleArabic: 'أسطورة التفاني',
    description: 'Study for 100 days in a row',
    icon: 'diamond',
    xpReward: 1000,
    category: 'streak',
    condition: { type: 'streak_days', value: 100 },
  },

  // Mastery Achievements
  {
    id: 'exercise_10',
    title: 'Practice Makes Perfect',
    titleArabic: 'الممارسة تصنع الكمال',
    description: 'Complete 10 exercises',
    icon: 'checkmark-circle',
    xpReward: 20,
    category: 'mastery',
    condition: { type: 'exercises_completed', value: 10 },
  },
  {
    id: 'exercise_50',
    title: 'Exercise Enthusiast',
    titleArabic: 'متحمس التمارين',
    description: 'Complete 50 exercises',
    icon: 'fitness',
    xpReward: 75,
    category: 'mastery',
    condition: { type: 'exercises_completed', value: 50 },
  },
  {
    id: 'exercise_100',
    title: 'Exercise Expert',
    titleArabic: 'خبير التمارين',
    description: 'Complete 100 exercises',
    icon: 'barbell',
    xpReward: 150,
    category: 'mastery',
    condition: { type: 'exercises_completed', value: 100 },
  },
  {
    id: 'accuracy_80',
    title: 'Sharp Mind',
    titleArabic: 'عقل حاد',
    description: 'Achieve 80% accuracy in exercises',
    icon: 'analytics',
    xpReward: 50,
    category: 'mastery',
    condition: { type: 'accuracy', value: 80 },
  },
  {
    id: 'accuracy_95',
    title: 'Perfectionist',
    titleArabic: 'الكمالي',
    description: 'Achieve 95% accuracy in exercises',
    icon: 'rocket',
    xpReward: 200,
    category: 'mastery',
    condition: { type: 'accuracy', value: 95 },
  },

  // Special/Quran Achievements
  {
    id: 'first_surah',
    title: 'Quran Journey Begins',
    titleArabic: 'بداية رحلة القرآن',
    description: 'Complete your first surah',
    icon: 'book',
    xpReward: 50,
    category: 'special',
    condition: { type: 'surahs_completed', value: 1 },
  },
  {
    id: 'surah_5',
    title: 'Quran Student',
    titleArabic: 'طالب القرآن',
    description: 'Complete 5 surahs',
    icon: 'star',
    xpReward: 150,
    category: 'special',
    condition: { type: 'surahs_completed', value: 5 },
  },
  {
    id: 'surah_10',
    title: 'Quran Reciter',
    titleArabic: 'قارئ القرآن',
    description: 'Complete 10 surahs',
    icon: 'ribbon',
    xpReward: 300,
    category: 'special',
    condition: { type: 'surahs_completed', value: 10 },
  },
  {
    id: 'juz_amma',
    title: 'Juz Amma Complete',
    titleArabic: 'جزء عم كامل',
    description: 'Complete all surahs in Juz Amma (30th Juz)',
    icon: 'trophy',
    xpReward: 500,
    category: 'special',
    condition: { type: 'surahs_completed', value: 37 }, // Juz 30 has 37 surahs
  },

  // XP Milestones
  {
    id: 'xp_100',
    title: 'Rising Star',
    titleArabic: 'نجم صاعد',
    description: 'Earn 100 XP',
    icon: 'star-outline',
    xpReward: 10,
    category: 'mastery',
    condition: { type: 'total_xp', value: 100 },
  },
  {
    id: 'xp_500',
    title: 'Dedicated Learner',
    titleArabic: 'متعلم مخلص',
    description: 'Earn 500 XP',
    icon: 'star-half',
    xpReward: 25,
    category: 'mastery',
    condition: { type: 'total_xp', value: 500 },
  },
  {
    id: 'xp_1000',
    title: 'XP Champion',
    titleArabic: 'بطل النقاط',
    description: 'Earn 1000 XP',
    icon: 'star',
    xpReward: 50,
    category: 'mastery',
    condition: { type: 'total_xp', value: 1000 },
  },
  {
    id: 'xp_5000',
    title: 'Arabic Master',
    titleArabic: 'سيد العربية',
    description: 'Earn 5000 XP',
    icon: 'diamond',
    xpReward: 250,
    category: 'mastery',
    condition: { type: 'total_xp', value: 5000 },
  },
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find((a) => a.id === id);
};

export const getAchievementsByCategory = (category: Achievement['category']): Achievement[] => {
  return ACHIEVEMENTS.filter((a) => a.category === category);
};
