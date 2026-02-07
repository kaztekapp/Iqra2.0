import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LeaderboardEntry,
  LeaderboardType,
  Challenge,
  CommunityStats,
  CommunityAchievement,
} from '../types/community';
import { SIMULATED_USERS, simulateWeeklyXp } from '../data/community/simulatedUsers';
import {
  getDailyChallengeForDate,
  getWeeklyChallengeForDate,
  getWeekendChallengeForDate,
  ChallengeTemplate,
} from '../data/community/challenges';

interface CommunityState {
  // Challenge tracking
  dailyChallenge: Challenge | null;
  weeklyChallenge: Challenge | null;
  weekendChallenge: Challenge | null;
  challengeLastUpdated: string; // ISO date for when challenges were last refreshed

  // User's contribution tracking (persisted)
  userDailyContribution: Record<string, number>; // { 'words': 5, 'xp': 100 }
  userWeeklyContribution: Record<string, number>;

  // Recent community achievements (simulated + real)
  communityAchievements: CommunityAchievement[];

  // Actions
  initializeChallenges: () => void;
  contributeToChallenge: (type: 'words' | 'lessons' | 'xp' | 'exercises', amount: number) => void;
  getLeaderboard: (type: LeaderboardType, userXp: number, userStreak: number) => LeaderboardEntry[];
  getCommunityStats: (userXp: number) => CommunityStats;
  addUserAchievement: (achievementTitle: string, achievementTitleArabic: string, icon: string) => void;
  getRecentAchievements: (userAchievements: { title: string; titleArabic: string; icon: string }[]) => CommunityAchievement[];
}

// Helpers
const getTodayString = () => new Date().toISOString().split('T')[0];
const getWeekString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const week = Math.floor(
    (date.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  return `${year}-W${week}`;
};

const templateToChallenge = (template: ChallengeTemplate, startDate: string, endDate: string): Challenge => ({
  id: template.id,
  title: template.title,
  titleFr: template.titleFr,
  titleArabic: template.titleArabic,
  description: template.description,
  descriptionFr: template.descriptionFr,
  descriptionArabic: template.descriptionArabic,
  type: template.type,
  targetType: template.targetType,
  targetValue: template.targetValue,
  currentValue: 0,
  userContribution: 0,
  xpReward: template.xpReward,
  startDate,
  endDate,
  isCompleted: false,
});

// Simulate community progress for challenges (based on time of day and target)
const simulateCommunityProgress = (target: number, hoursElapsed: number, maxHours: number): number => {
  const progressRatio = Math.min(hoursElapsed / maxHours, 1);
  // Random factor to make it feel dynamic (60-90% of expected progress)
  const randomFactor = 0.6 + Math.random() * 0.3;
  // Community usually achieves 70-95% of goals
  const achievementFactor = 0.7 + Math.random() * 0.25;
  return Math.floor(target * progressRatio * randomFactor * achievementFactor);
};

// Generate simulated community achievements
const generateSimulatedAchievements = (): CommunityAchievement[] => {
  const achievements: CommunityAchievement[] = [];
  const now = new Date();

  // Sample achievements from simulated users
  const sampleAchievements = [
    { title: '30-Day Streak!', titleArabic: 'سلسلة 30 يوم!', icon: 'flame' },
    { title: 'Completed Al-Baqarah', titleArabic: 'أكمل سورة البقرة', icon: 'book' },
    { title: 'Mastered All Letters', titleArabic: 'أتقن جميع الحروف', icon: 'trophy' },
    { title: '1000 XP Milestone', titleArabic: 'حصل على 1000 نقطة', icon: 'star' },
    { title: 'Week Warrior', titleArabic: 'محارب الأسبوع', icon: 'flame' },
  ];

  // Pick 3-4 random simulated users and achievements
  const shuffledUsers = [...SIMULATED_USERS].sort(() => Math.random() - 0.5).slice(0, 4);

  shuffledUsers.forEach((user, index) => {
    const achievement = sampleAchievements[index % sampleAchievements.length];
    const hoursAgo = Math.floor(Math.random() * 24) + 1;
    const timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();

    achievements.push({
      id: `sim_ach_${user.id}_${index}`,
      type: 'community',
      userName: user.name,
      achievementTitle: achievement.title,
      achievementTitleArabic: achievement.titleArabic,
      icon: achievement.icon,
      timestamp,
    });
  });

  return achievements.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      dailyChallenge: null,
      weeklyChallenge: null,
      weekendChallenge: null,
      challengeLastUpdated: '',
      userDailyContribution: {},
      userWeeklyContribution: {},
      communityAchievements: [],

      initializeChallenges: () => {
        const today = new Date();
        const todayStr = getTodayString();
        const state = get();

        // Check if we need to refresh challenges
        const lastUpdated = state.challengeLastUpdated;
        const needsRefresh = lastUpdated !== todayStr;

        if (!needsRefresh && state.dailyChallenge) {
          // Just update community progress
          const now = new Date();
          const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const hoursElapsed = (now.getTime() - startOfDay.getTime()) / (1000 * 60 * 60);

          set((s) => ({
            dailyChallenge: s.dailyChallenge
              ? {
                  ...s.dailyChallenge,
                  currentValue: simulateCommunityProgress(s.dailyChallenge.targetValue, hoursElapsed, 24) + s.dailyChallenge.userContribution,
                }
              : null,
            weeklyChallenge: s.weeklyChallenge
              ? {
                  ...s.weeklyChallenge,
                  currentValue: simulateCommunityProgress(s.weeklyChallenge.targetValue, today.getDay() * 24 + hoursElapsed, 168) + s.weeklyChallenge.userContribution,
                }
              : null,
          }));
          return;
        }

        // Get challenge templates
        const dailyTemplate = getDailyChallengeForDate(today);
        const weeklyTemplate = getWeeklyChallengeForDate(today);
        const weekendTemplate = getWeekendChallengeForDate(today);

        // Calculate dates
        const dayEnd = new Date(today);
        dayEnd.setHours(23, 59, 59, 999);

        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        // Calculate initial community progress
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const hoursElapsed = (today.getTime() - startOfDay.getTime()) / (1000 * 60 * 60);

        const dailyChallenge = templateToChallenge(dailyTemplate, todayStr, dayEnd.toISOString());
        dailyChallenge.currentValue = simulateCommunityProgress(dailyTemplate.targetValue, hoursElapsed, 24);

        const weeklyChallenge = templateToChallenge(weeklyTemplate, weekStart.toISOString().split('T')[0], weekEnd.toISOString());
        weeklyChallenge.currentValue = simulateCommunityProgress(weeklyTemplate.targetValue, today.getDay() * 24 + hoursElapsed, 168);

        let weekendChallenge: Challenge | null = null;
        if (weekendTemplate) {
          weekendChallenge = templateToChallenge(weekendTemplate, todayStr, dayEnd.toISOString());
          weekendChallenge.currentValue = simulateCommunityProgress(weekendTemplate.targetValue, hoursElapsed, 48);
        }

        // Reset user contributions if it's a new day
        const newDailyContrib = needsRefresh ? {} : state.userDailyContribution;
        const newWeeklyContrib = getWeekString() !== state.challengeLastUpdated?.substring(0, 8) ? {} : state.userWeeklyContribution;

        set({
          dailyChallenge,
          weeklyChallenge,
          weekendChallenge,
          challengeLastUpdated: todayStr,
          userDailyContribution: newDailyContrib,
          userWeeklyContribution: newWeeklyContrib,
          communityAchievements: generateSimulatedAchievements(),
        });
      },

      contributeToChallenge: (type, amount) => {
        set((state) => {
          const newDailyContrib = { ...state.userDailyContribution };
          const newWeeklyContrib = { ...state.userWeeklyContribution };

          newDailyContrib[type] = (newDailyContrib[type] || 0) + amount;
          newWeeklyContrib[type] = (newWeeklyContrib[type] || 0) + amount;

          let dailyChallenge = state.dailyChallenge;
          let weeklyChallenge = state.weeklyChallenge;
          let weekendChallenge = state.weekendChallenge;

          // Update daily challenge if type matches
          if (dailyChallenge && dailyChallenge.targetType === type) {
            dailyChallenge = {
              ...dailyChallenge,
              userContribution: dailyChallenge.userContribution + amount,
              currentValue: dailyChallenge.currentValue + amount,
              isCompleted: dailyChallenge.currentValue + amount >= dailyChallenge.targetValue,
            };
          }

          // Update weekly challenge if type matches
          if (weeklyChallenge && weeklyChallenge.targetType === type) {
            weeklyChallenge = {
              ...weeklyChallenge,
              userContribution: weeklyChallenge.userContribution + amount,
              currentValue: weeklyChallenge.currentValue + amount,
              isCompleted: weeklyChallenge.currentValue + amount >= weeklyChallenge.targetValue,
            };
          }

          // Update weekend challenge if type matches and active
          if (weekendChallenge && weekendChallenge.targetType === type) {
            weekendChallenge = {
              ...weekendChallenge,
              userContribution: weekendChallenge.userContribution + amount,
              currentValue: weekendChallenge.currentValue + amount,
              isCompleted: weekendChallenge.currentValue + amount >= weekendChallenge.targetValue,
            };
          }

          return {
            userDailyContribution: newDailyContrib,
            userWeeklyContribution: newWeeklyContrib,
            dailyChallenge,
            weeklyChallenge,
            weekendChallenge,
          };
        });
      },

      getLeaderboard: (type, userXp, userStreak) => {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; // 1-7, Sunday = 7

        // Generate entries from simulated users
        const entries: LeaderboardEntry[] = SIMULATED_USERS.map((user) => {
          let value: number;

          switch (type) {
            case 'weekly':
              value = simulateWeeklyXp(user, dayOfWeek);
              break;
            case 'streaks':
              value = user.streakDays;
              break;
            case 'allTime':
            default:
              value = user.baseXp;
          }

          return {
            id: user.id,
            name: user.name,
            nameArabic: user.nameArabic,
            xp: type === 'streaks' ? user.baseXp : value,
            streak: user.streakDays,
            rank: 0,
            isCurrentUser: false,
          };
        });

        // Add current user
        let userValue: number;
        switch (type) {
          case 'weekly':
            // Assume user started this week, use portion of total XP as weekly
            userValue = Math.min(userXp, Math.floor(userXp * 0.15) + 50);
            break;
          case 'streaks':
            userValue = userStreak;
            break;
          case 'allTime':
          default:
            userValue = userXp;
        }

        entries.push({
          id: 'current_user',
          name: 'You',
          nameArabic: 'أنت',
          xp: type === 'streaks' ? userXp : userValue,
          streak: userStreak,
          rank: 0,
          isCurrentUser: true,
        });

        // Sort based on type
        if (type === 'streaks') {
          entries.sort((a, b) => b.streak - a.streak);
        } else {
          entries.sort((a, b) => {
            if (type === 'weekly') {
              // For weekly, use the value we calculated
              const aVal = a.isCurrentUser ? userValue : entries.find((e) => e.id === a.id)?.xp || 0;
              const bVal = b.isCurrentUser ? userValue : entries.find((e) => e.id === b.id)?.xp || 0;
              return bVal - aVal;
            }
            return b.xp - a.xp;
          });
        }

        // Assign ranks
        entries.forEach((entry, index) => {
          entry.rank = index + 1;
        });

        return entries;
      },

      getCommunityStats: (userXp) => {
        // Generate realistic-looking community stats
        const baseActiveLearners = 800 + Math.floor(Math.random() * 400);
        const hour = new Date().getHours();

        // More learners during peak hours (evening)
        const peakMultiplier =
          hour >= 18 && hour <= 22 ? 1.5 : hour >= 8 && hour <= 12 ? 1.2 : 1.0;

        const activeLearnersTodayCount = Math.floor(baseActiveLearners * peakMultiplier);
        const totalWordsLearnedToday = Math.floor(activeLearnersTodayCount * 3.5);
        const totalXpEarnedToday = Math.floor(activeLearnersTodayCount * 45);
        const activeStreaksCount = Math.floor(activeLearnersTodayCount * 0.6);

        return {
          activeLearnersTodayCount,
          totalWordsLearnedToday,
          totalXpEarnedToday,
          activeStreaksCount,
        };
      },

      addUserAchievement: (achievementTitle, achievementTitleArabic, icon) => {
        const newAchievement: CommunityAchievement = {
          id: `user_ach_${Date.now()}`,
          type: 'user',
          userName: 'You',
          achievementTitle,
          achievementTitleArabic,
          icon,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          communityAchievements: [newAchievement, ...state.communityAchievements].slice(0, 10),
        }));
      },

      getRecentAchievements: (userAchievements) => {
        const state = get();
        const combined: CommunityAchievement[] = [...state.communityAchievements];

        // Add user's recent achievements
        userAchievements.slice(0, 3).forEach((ach, index) => {
          combined.push({
            id: `user_recent_${index}`,
            type: 'user',
            userName: 'You',
            achievementTitle: ach.title,
            achievementTitleArabic: ach.titleArabic,
            icon: ach.icon,
            timestamp: new Date(Date.now() - index * 3600000).toISOString(),
          });
        });

        // Sort by timestamp and return top 5
        return combined
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);
      },
    }),
    {
      name: 'community-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userDailyContribution: state.userDailyContribution,
        userWeeklyContribution: state.userWeeklyContribution,
        challengeLastUpdated: state.challengeLastUpdated,
      }),
    }
  )
);
