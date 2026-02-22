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
import {
  getDailyChallengeForDate,
  getWeeklyChallengeForDate,
  getWeekendChallengeForDate,
  ChallengeTemplate,
} from '../data/community/challenges';
import * as communityService from '../services/communityService';
import { useProgressStore } from './progressStore';
import { useSettingsStore } from './settingsStore';
import { supabase } from '../lib/supabase';

// --- TTL Cache (not persisted) ---
const CACHE_TTL_MS = 60_000;

const _leaderboardCache: Record<string, { entries: LeaderboardEntry[]; fetchedAt: number }> = {};
let _statsFetchedAt = 0;

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

  // Leaderboard state (async from Supabase)
  leaderboardEntries: LeaderboardEntry[];
  isLoadingLeaderboard: boolean;

  // Community stats state (async from Supabase)
  communityStatsData: CommunityStats;
  isLoadingStats: boolean;

  // Actions
  initializeChallenges: () => void;
  contributeToChallenge: (type: 'words' | 'lessons' | 'xp' | 'exercises', amount: number) => void;
  fetchLeaderboard: (type: LeaderboardType, userId?: string, forceRefresh?: boolean) => Promise<void>;
  fetchCommunityStats: (forceRefresh?: boolean) => Promise<void>;
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

const defaultStats: CommunityStats = {
  activeLearnersTodayCount: 0,
  totalWordsLearnedToday: 0,
  totalXpEarnedToday: 0,
  activeStreaksCount: 0,
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
      leaderboardEntries: [],
      isLoadingLeaderboard: false,
      communityStatsData: defaultStats,
      isLoadingStats: false,

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

      fetchLeaderboard: async (type, userId, forceRefresh) => {
        // Return cached data if fresh
        const cached = _leaderboardCache[type];
        if (!forceRefresh && cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
          set({ leaderboardEntries: cached.entries, isLoadingLeaderboard: false });
          return;
        }

        set({ isLoadingLeaderboard: true });

        let entries: LeaderboardEntry[] = [];
        try {
          if (supabase) {
            entries = await communityService.fetchLeaderboard(type, userId);
          }
        } catch (e) {
          if (__DEV__) console.warn('[communityStore] fetchLeaderboard error:', e);
        }

        // Always ensure current user appears with their local progress
        const { progress } = useProgressStore.getState();
        const user = useSettingsStore.getState().user;
        const currentUserId = userId || user?.id;

        const alreadyInList = currentUserId && entries.some((e) => e.isCurrentUser);

        if (!alreadyInList && progress.totalXp > 0) {
          const userEntry: LeaderboardEntry = {
            id: currentUserId || 'local_user',
            name: 'You',
            nameArabic: 'أنت',
            xp: progress.totalXp,
            streak: progress.currentStreak,
            rank: 0,
            isCurrentUser: true,
          };
          entries.push(userEntry);
        }

        // Re-sort and assign ranks
        if (entries.length > 0) {
          if (type === 'streaks') {
            entries.sort((a, b) => b.streak - a.streak);
          } else {
            entries.sort((a, b) => b.xp - a.xp);
          }
          entries.forEach((entry, index) => {
            entry.rank = index + 1;
          });
        }

        // Update cache
        _leaderboardCache[type] = { entries, fetchedAt: Date.now() };

        set({ leaderboardEntries: entries, isLoadingLeaderboard: false });
      },

      fetchCommunityStats: async (forceRefresh) => {
        // Return cached data if fresh
        if (!forceRefresh && _statsFetchedAt && Date.now() - _statsFetchedAt < CACHE_TTL_MS) {
          return;
        }

        set({ isLoadingStats: true });
        let stats = defaultStats;
        try {
          if (supabase) {
            stats = await communityService.fetchCommunityStats();
          }
        } catch (e) {
          if (__DEV__) console.warn('[communityStore] fetchCommunityStats error:', e);
        }

        // If Supabase returned zeros but user studied today, show at least 1
        const { progress } = useProgressStore.getState();
        const today = new Date().toISOString().split('T')[0];
        if (stats.activeLearnersTodayCount === 0 && progress.lastStudyDate === today) {
          stats = {
            ...stats,
            activeLearnersTodayCount: 1,
            totalXpEarnedToday: progress.totalXp,
            activeStreaksCount: progress.currentStreak > 0 ? 1 : 0,
          };
        }

        _statsFetchedAt = Date.now();
        set({ communityStatsData: stats, isLoadingStats: false });
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
