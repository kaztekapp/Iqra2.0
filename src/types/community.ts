// Community/Social Feature Types for Iqra2.0 App

export interface LeaderboardEntry {
  id: string;
  name: string;
  nameArabic: string;
  avatarUrl?: string;
  xp: number;
  streak: number;
  rank: number;
  isCurrentUser: boolean;
  rankChange?: number; // positive = moved up, negative = moved down
}

export type LeaderboardType = 'weekly' | 'streaks' | 'allTime';

export interface Challenge {
  id: string;
  title: string;
  titleFr?: string;
  titleArabic: string;
  description: string;
  descriptionFr?: string;
  descriptionArabic: string;
  type: 'daily' | 'weekly' | 'weekend';
  targetType: 'words' | 'lessons' | 'xp' | 'minutes' | 'exercises';
  targetValue: number;
  currentValue: number; // Community progress
  userContribution: number; // User's contribution
  xpReward: number;
  startDate: string; // ISO date
  endDate: string; // ISO date
  isCompleted: boolean;
}

export interface CommunityStats {
  activeLearnersTodayCount: number;
  totalWordsLearnedToday: number;
  totalXpEarnedToday: number;
  activeStreaksCount: number;
}

export interface CommunityAchievement {
  id: string;
  type: 'user' | 'community';
  userId?: string;
  userName: string;
  achievementTitle: string;
  achievementTitleArabic: string;
  icon: string;
  timestamp: string; // ISO date
}

export interface SimulatedUser {
  id: string;
  name: string;
  nameArabic: string;
  baseXp: number;
  streakDays: number;
  activeLevel: 'casual' | 'regular' | 'dedicated'; // Affects how they "progress"
  joinedDaysAgo: number;
}
