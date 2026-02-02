// Simulated users for leaderboard and community features
// These users create the illusion of an active community

import { SimulatedUser } from '../../types/community';

export const SIMULATED_USERS: SimulatedUser[] = [
  // High performers
  {
    id: 'sim_1',
    name: 'Ahmad',
    nameArabic: 'أحمد',
    baseXp: 8500,
    streakDays: 45,
    activeLevel: 'dedicated',
    joinedDaysAgo: 120,
  },
  {
    id: 'sim_2',
    name: 'Fatima',
    nameArabic: 'فاطمة',
    baseXp: 7800,
    streakDays: 38,
    activeLevel: 'dedicated',
    joinedDaysAgo: 95,
  },
  {
    id: 'sim_3',
    name: 'Omar',
    nameArabic: 'عمر',
    baseXp: 6500,
    streakDays: 32,
    activeLevel: 'dedicated',
    joinedDaysAgo: 85,
  },
  {
    id: 'sim_4',
    name: 'Aisha',
    nameArabic: 'عائشة',
    baseXp: 5900,
    streakDays: 28,
    activeLevel: 'regular',
    joinedDaysAgo: 78,
  },
  {
    id: 'sim_5',
    name: 'Yusuf',
    nameArabic: 'يوسف',
    baseXp: 5200,
    streakDays: 24,
    activeLevel: 'regular',
    joinedDaysAgo: 65,
  },
  // Mid-tier performers
  {
    id: 'sim_6',
    name: 'Sara',
    nameArabic: 'سارة',
    baseXp: 4600,
    streakDays: 21,
    activeLevel: 'regular',
    joinedDaysAgo: 60,
  },
  {
    id: 'sim_7',
    name: 'Mohammed',
    nameArabic: 'محمد',
    baseXp: 4100,
    streakDays: 18,
    activeLevel: 'regular',
    joinedDaysAgo: 55,
  },
  {
    id: 'sim_8',
    name: 'Khadija',
    nameArabic: 'خديجة',
    baseXp: 3700,
    streakDays: 15,
    activeLevel: 'regular',
    joinedDaysAgo: 50,
  },
  {
    id: 'sim_9',
    name: 'Ali',
    nameArabic: 'علي',
    baseXp: 3300,
    streakDays: 14,
    activeLevel: 'casual',
    joinedDaysAgo: 48,
  },
  {
    id: 'sim_10',
    name: 'Mariam',
    nameArabic: 'مريم',
    baseXp: 2900,
    streakDays: 12,
    activeLevel: 'casual',
    joinedDaysAgo: 42,
  },
  // Lower-mid tier
  {
    id: 'sim_11',
    name: 'Ibrahim',
    nameArabic: 'إبراهيم',
    baseXp: 2500,
    streakDays: 10,
    activeLevel: 'casual',
    joinedDaysAgo: 38,
  },
  {
    id: 'sim_12',
    name: 'Zainab',
    nameArabic: 'زينب',
    baseXp: 2200,
    streakDays: 9,
    activeLevel: 'casual',
    joinedDaysAgo: 35,
  },
  {
    id: 'sim_13',
    name: 'Hassan',
    nameArabic: 'حسن',
    baseXp: 1900,
    streakDays: 8,
    activeLevel: 'casual',
    joinedDaysAgo: 32,
  },
  {
    id: 'sim_14',
    name: 'Noor',
    nameArabic: 'نور',
    baseXp: 1600,
    streakDays: 7,
    activeLevel: 'casual',
    joinedDaysAgo: 28,
  },
  {
    id: 'sim_15',
    name: 'Abdullah',
    nameArabic: 'عبدالله',
    baseXp: 1400,
    streakDays: 6,
    activeLevel: 'casual',
    joinedDaysAgo: 25,
  },
  // Newer learners
  {
    id: 'sim_16',
    name: 'Layla',
    nameArabic: 'ليلى',
    baseXp: 1100,
    streakDays: 5,
    activeLevel: 'regular',
    joinedDaysAgo: 20,
  },
  {
    id: 'sim_17',
    name: 'Bilal',
    nameArabic: 'بلال',
    baseXp: 850,
    streakDays: 4,
    activeLevel: 'casual',
    joinedDaysAgo: 18,
  },
  {
    id: 'sim_18',
    name: 'Amina',
    nameArabic: 'أمينة',
    baseXp: 650,
    streakDays: 3,
    activeLevel: 'casual',
    joinedDaysAgo: 14,
  },
  {
    id: 'sim_19',
    name: 'Hamza',
    nameArabic: 'حمزة',
    baseXp: 450,
    streakDays: 2,
    activeLevel: 'regular',
    joinedDaysAgo: 10,
  },
  {
    id: 'sim_20',
    name: 'Salma',
    nameArabic: 'سلمى',
    baseXp: 280,
    streakDays: 2,
    activeLevel: 'casual',
    joinedDaysAgo: 7,
  },
  {
    id: 'sim_21',
    name: 'Idris',
    nameArabic: 'إدريس',
    baseXp: 150,
    streakDays: 1,
    activeLevel: 'casual',
    joinedDaysAgo: 5,
  },
  {
    id: 'sim_22',
    name: 'Hana',
    nameArabic: 'هناء',
    baseXp: 80,
    streakDays: 1,
    activeLevel: 'casual',
    joinedDaysAgo: 3,
  },
  {
    id: 'sim_23',
    name: 'Kareem',
    nameArabic: 'كريم',
    baseXp: 45,
    streakDays: 1,
    activeLevel: 'casual',
    joinedDaysAgo: 2,
  },
  {
    id: 'sim_24',
    name: 'Yasmin',
    nameArabic: 'ياسمين',
    baseXp: 20,
    streakDays: 0,
    activeLevel: 'casual',
    joinedDaysAgo: 1,
  },
  {
    id: 'sim_25',
    name: 'Tariq',
    nameArabic: 'طارق',
    baseXp: 10,
    streakDays: 0,
    activeLevel: 'casual',
    joinedDaysAgo: 1,
  },
];

// Helper to get XP gain multiplier based on activity level
export const getActivityMultiplier = (level: SimulatedUser['activeLevel']): number => {
  switch (level) {
    case 'dedicated':
      return 1.5;
    case 'regular':
      return 1.0;
    case 'casual':
      return 0.5;
  }
};

// Simulate weekly XP for a user (adds some randomness)
export const simulateWeeklyXp = (user: SimulatedUser, dayOfWeek: number): number => {
  const baseWeeklyGain = user.activeLevel === 'dedicated' ? 350 :
                         user.activeLevel === 'regular' ? 200 : 100;

  // Add some randomness (±30%)
  const randomFactor = 0.7 + Math.random() * 0.6;

  // Scale by day of week (1-7, more XP earlier in week for simulation)
  const dayFactor = 1 + (dayOfWeek / 7) * randomFactor;

  return Math.round(baseWeeklyGain * dayFactor * randomFactor);
};
