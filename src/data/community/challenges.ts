// Challenge templates for daily and weekly community goals

export interface ChallengeTemplate {
  id: string;
  title: string;
  titleFr: string;
  titleArabic: string;
  description: string;
  descriptionFr: string;
  descriptionArabic: string;
  type: 'daily' | 'weekly' | 'weekend';
  targetType: 'words' | 'lessons' | 'xp' | 'minutes' | 'exercises';
  targetValue: number;
  xpReward: number;
}

// Daily challenges - rotate through these
export const DAILY_CHALLENGES: ChallengeTemplate[] = [
  {
    id: 'daily_words_100',
    title: 'Word Warriors',
    titleFr: 'Guerriers des mots',
    titleArabic: 'محاربو الكلمات',
    description: 'Learn 100 new words as a community',
    descriptionFr: 'Apprenez 100 nouveaux mots en communauté',
    descriptionArabic: 'تعلم 100 كلمة جديدة كمجتمع',
    type: 'daily',
    targetType: 'words',
    targetValue: 100,
    xpReward: 15,
  },
  {
    id: 'daily_xp_1000',
    title: 'XP Hunters',
    titleFr: 'Chasseurs d\'XP',
    titleArabic: 'صائدو النقاط',
    description: 'Earn 1,000 XP together today',
    descriptionFr: 'Gagnez 1 000 XP ensemble aujourd\'hui',
    descriptionArabic: 'اكسبوا 1000 نقطة معاً اليوم',
    type: 'daily',
    targetType: 'xp',
    targetValue: 1000,
    xpReward: 20,
  },
  {
    id: 'daily_exercises_50',
    title: 'Practice Squad',
    titleFr: 'Équipe pratique',
    titleArabic: 'فريق الممارسة',
    description: 'Complete 50 exercises as a community',
    descriptionFr: 'Complétez 50 exercices en communauté',
    descriptionArabic: 'أكمل 50 تمرين كمجتمع',
    type: 'daily',
    targetType: 'exercises',
    targetValue: 50,
    xpReward: 15,
  },
  {
    id: 'daily_lessons_20',
    title: 'Lesson Leaders',
    titleFr: 'Leaders des leçons',
    titleArabic: 'قادة الدروس',
    description: 'Complete 20 lessons together',
    descriptionFr: 'Complétez 20 leçons ensemble',
    descriptionArabic: 'أكمل 20 درس معاً',
    type: 'daily',
    targetType: 'lessons',
    targetValue: 20,
    xpReward: 18,
  },
];

// Weekly challenges - bigger goals
export const WEEKLY_CHALLENGES: ChallengeTemplate[] = [
  {
    id: 'weekly_words_500',
    title: 'Word Marathon',
    titleFr: 'Marathon des mots',
    titleArabic: 'ماراثون الكلمات',
    description: 'Learn 500 new words this week',
    descriptionFr: 'Apprenez 500 nouveaux mots cette semaine',
    descriptionArabic: 'تعلم 500 كلمة جديدة هذا الأسبوع',
    type: 'weekly',
    targetType: 'words',
    targetValue: 500,
    xpReward: 50,
  },
  {
    id: 'weekly_xp_10000',
    title: 'XP Champions',
    titleFr: 'Champions d\'XP',
    titleArabic: 'أبطال النقاط',
    description: 'Earn 10,000 XP as a community',
    descriptionFr: 'Gagnez 10 000 XP en communauté',
    descriptionArabic: 'اكسبوا 10000 نقطة كمجتمع',
    type: 'weekly',
    targetType: 'xp',
    targetValue: 10000,
    xpReward: 75,
  },
  {
    id: 'weekly_exercises_300',
    title: 'Exercise Excellence',
    titleFr: 'Excellence des exercices',
    titleArabic: 'تميز التمارين',
    description: 'Complete 300 exercises together',
    descriptionFr: 'Complétez 300 exercices ensemble',
    descriptionArabic: 'أكمل 300 تمرين معاً',
    type: 'weekly',
    targetType: 'exercises',
    targetValue: 300,
    xpReward: 60,
  },
  {
    id: 'weekly_lessons_100',
    title: 'Learning League',
    titleFr: 'Ligue de l\'apprentissage',
    titleArabic: 'دوري التعلم',
    description: 'Finish 100 lessons this week',
    descriptionFr: 'Terminez 100 leçons cette semaine',
    descriptionArabic: 'أنهِ 100 درس هذا الأسبوع',
    type: 'weekly',
    targetType: 'lessons',
    targetValue: 100,
    xpReward: 65,
  },
];

// Weekend sprint challenges
export const WEEKEND_CHALLENGES: ChallengeTemplate[] = [
  {
    id: 'weekend_words_200',
    title: 'Weekend Word Sprint',
    titleFr: 'Sprint de mots du week-end',
    titleArabic: 'سباق كلمات نهاية الأسبوع',
    description: 'Learn 200 words this weekend',
    descriptionFr: 'Apprenez 200 mots ce week-end',
    descriptionArabic: 'تعلم 200 كلمة نهاية هذا الأسبوع',
    type: 'weekend',
    targetType: 'words',
    targetValue: 200,
    xpReward: 30,
  },
  {
    id: 'weekend_xp_3000',
    title: 'Weekend Warriors',
    titleFr: 'Guerriers du week-end',
    titleArabic: 'محاربو نهاية الأسبوع',
    description: 'Earn 3,000 XP this weekend',
    descriptionFr: 'Gagnez 3 000 XP ce week-end',
    descriptionArabic: 'اكسب 3000 نقطة نهاية هذا الأسبوع',
    type: 'weekend',
    targetType: 'xp',
    targetValue: 3000,
    xpReward: 40,
  },
];

// Get a challenge based on the current date (deterministic selection)
export const getDailyChallengeForDate = (date: Date): ChallengeTemplate => {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
};

export const getWeeklyChallengeForDate = (date: Date): ChallengeTemplate => {
  const weekOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  const index = weekOfYear % WEEKLY_CHALLENGES.length;
  return WEEKLY_CHALLENGES[index];
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

export const getWeekendChallengeForDate = (date: Date): ChallengeTemplate | null => {
  if (!isWeekend(date)) return null;

  const weekOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  const index = weekOfYear % WEEKEND_CHALLENGES.length;
  return WEEKEND_CHALLENGES[index];
};
