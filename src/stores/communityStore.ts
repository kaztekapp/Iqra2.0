import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LeaderboardEntry,
  LeaderboardType,
  Challenge,
  CommunityStats,
  CommunityAchievement,
  DiscussionThread,
  DiscussionCategory,
  DiscussionReply,
  StudyGroup,
  StudyPartner,
  ActivityFeedItem,
} from '../types/community';
import {
  getDailyChallengeForDate,
  getWeeklyChallengeForDate,
  getWeekendChallengeForDate,
  ChallengeTemplate,
} from '../data/community/challenges';
import * as communityService from '../services/communityService';
import * as socialService from '../services/communitySocialService';
import { clearGroupSnapshot } from '../services/groupContentCache';
import {
  cacheDiscussions,
  cacheGroups,
  hydrateCommunityCache,
  patchCachedGroup,
  removeCachedGroup,
} from '../services/communityCache';
import { useProgressStore } from './progressStore';
import { useSettingsStore } from './settingsStore';
import { supabase } from '../lib/supabase';

// --- TTL Cache (not persisted) ---
const CACHE_TTL_MS = 60_000;

const _leaderboardCache: Record<string, { entries: LeaderboardEntry[]; fetchedAt: number }> = {};
let _statsFetchedAt = 0;

/**
 * Groups and threads change over hours, not seconds, so a list fetched a
 * moment ago is refetched only when the person asks for it by pulling down.
 * Inside this window a return to the tab is instant and silent.
 */
const SOCIAL_TTL_MS = 60_000;

let _groupsFetchedAt = 0;
const _discussionsFetchedAt: Record<string, number> = {};

/** Which discussion fetch is the current one; see loadDiscussions. */
let _discussionsTicket = 0;

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

  // Social state
  discussions: DiscussionThread[];
  isLoadingDiscussions: boolean;
  currentThread: DiscussionThread | null;
  replies: DiscussionReply[];
  isLoadingReplies: boolean;

  groups: StudyGroup[];
  isLoadingGroups: boolean;
  userGroupIds: Set<string>;

  partners: StudyPartner[];
  isLoadingPartners: boolean;
  connectedPartnerIds: Set<string>;

  activityFeed: ActivityFeedItem[];
  isLoadingActivity: boolean;

  // Actions
  initializeChallenges: () => void;
  contributeToChallenge: (type: 'words' | 'lessons' | 'xp' | 'exercises', amount: number) => void;
  fetchLeaderboard: (type: LeaderboardType, userId?: string, forceRefresh?: boolean) => Promise<void>;
  fetchCommunityStats: (forceRefresh?: boolean) => Promise<void>;
  addUserAchievement: (achievementTitle: string, achievementTitleArabic: string, icon: string) => void;
  getRecentAchievements: (userAchievements: { title: string; titleArabic: string; icon: string }[]) => CommunityAchievement[];

  // Social actions
  loadDiscussions: (category?: DiscussionCategory, forceRefresh?: boolean) => Promise<void>;
  loadThread: (threadId: string) => Promise<void>;
  loadReplies: (threadId: string) => Promise<void>;
  postThread: (title: string, body: string, category: DiscussionCategory) => Promise<DiscussionThread | null>;
  postReply: (threadId: string, body: string) => Promise<DiscussionReply | null>;
  toggleLikeThread: (threadId: string) => Promise<void>;
  toggleLikeReply: (replyId: string) => Promise<void>;

  loadGroups: (forceRefresh?: boolean) => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  /** Creator only. Resolves true when the group is gone. */
  deleteGroup: (groupId: string) => Promise<boolean>;
  createGroup: (name: string, description: string, topic: string, goal: string, icon?: string, color?: string) => Promise<StudyGroup | null>;

  loadPartners: () => Promise<void>;
  connectPartner: (targetId: string) => Promise<void>;
  disconnectPartner: (targetId: string) => Promise<void>;

  loadActivityFeed: () => Promise<void>;
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

      // Social initial state
      discussions: [],
      isLoadingDiscussions: false,
      currentThread: null,
      replies: [],
      isLoadingReplies: false,
      groups: [],
      isLoadingGroups: false,
      userGroupIds: new Set<string>(),
      partners: [],
      isLoadingPartners: false,
      connectedPartnerIds: new Set<string>(),
      activityFeed: [],
      isLoadingActivity: false,

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

      // ── Social Actions ──────────────────────────────────────────

      loadDiscussions: async (category?, forceRefresh?) => {
        const key = category ?? 'all';
        const cache = await hydrateCommunityCache();
        const known = cache.discussions[key];

        // Paint the last answer for THIS category first. Always this one,
        // never whatever happens to be on screen: tapping a filter has to
        // change the list, or the filter looks broken.
        if (known && known.length > 0) {
          set({ discussions: known, isLoadingDiscussions: false });
        } else if (get().discussions.length > 0 || !get().isLoadingDiscussions) {
          set({ discussions: [], isLoadingDiscussions: true });
        }

        // Skip the network only when this category is both known and fresh.
        const fetchedAt = _discussionsFetchedAt[key] ?? 0;
        if (!forceRefresh && known && known.length > 0 && Date.now() - fetchedAt < SOCIAL_TTL_MS) {
          return;
        }

        // Tapping through filters leaves several fetches in flight. Only the
        // last one asked for may land, or a slow earlier answer would
        // overwrite the category the person is actually looking at.
        const ticket = ++_discussionsTicket;
        const discussions = await socialService.fetchThreads(category);
        if (ticket !== _discussionsTicket) return;

        _discussionsFetchedAt[key] = Date.now();
        cacheDiscussions(key, discussions);
        set({ discussions, isLoadingDiscussions: false });
      },

      loadThread: async (threadId) => {
        const thread = await socialService.fetchThread(threadId);
        set({ currentThread: thread });
      },

      loadReplies: async (threadId) => {
        set({ isLoadingReplies: true });
        const userId = useSettingsStore.getState().user?.id;
        const replies = await socialService.fetchReplies(threadId, userId);
        set({ replies, isLoadingReplies: false });
      },

      postThread: async (title, body, category) => {
        const user = useSettingsStore.getState().user;
        if (!user?.id) return null;
        const authorName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        const thread = await socialService.createThread(user.id, authorName, title, body, category);
        if (thread) {
          set((s) => ({ discussions: [thread, ...s.discussions] }));
          // Post activity
          await socialService.postActivity(user.id, authorName, 'discussion_post', title, 'chatbubble', '#14b8a6');
        }
        return thread;
      },

      postReply: async (threadId, body) => {
        const user = useSettingsStore.getState().user;
        if (!user?.id) return null;
        const authorName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        const reply = await socialService.createReply(threadId, user.id, authorName, body);
        if (reply) {
          set((s) => ({
            replies: [...s.replies, reply],
            currentThread: s.currentThread
              ? { ...s.currentThread, replyCount: s.currentThread.replyCount + 1 }
              : null,
            discussions: s.discussions.map((d) =>
              d.id === threadId ? { ...d, replyCount: d.replyCount + 1 } : d
            ),
          }));
        }
        return reply;
      },

      toggleLikeThread: async (threadId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        const liked = await socialService.toggleLikeThread(threadId, userId);
        const delta = liked ? 1 : -1;
        set((s) => ({
          discussions: s.discussions.map((d) =>
            d.id === threadId ? { ...d, likeCount: Math.max(0, d.likeCount + delta) } : d
          ),
          currentThread:
            s.currentThread?.id === threadId
              ? { ...s.currentThread, likeCount: Math.max(0, s.currentThread.likeCount + delta) }
              : s.currentThread,
        }));
      },

      toggleLikeReply: async (replyId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        const liked = await socialService.toggleLikeReply(replyId, userId);
        const delta = liked ? 1 : -1;
        set((s) => ({
          replies: s.replies.map((r) =>
            r.id === replyId
              ? { ...r, likeCount: Math.max(0, r.likeCount + delta), isLiked: liked }
              : r
          ),
        }));
      },

      loadGroups: async (forceRefresh?) => {
        if (!forceRefresh && Date.now() - _groupsFetchedAt < SOCIAL_TTL_MS && get().groups.length > 0) {
          return;
        }

        // Last session's list, straight onto the screen.
        if (get().groups.length === 0) {
          const cache = await hydrateCommunityCache();
          if (cache.groups.length > 0 && get().groups.length === 0) {
            set({ groups: cache.groups });
          }
        }

        // The spinner is only for a screen with nothing on it. With rows
        // already showing, the refresh happens behind them and swaps in.
        if (get().groups.length === 0) set({ isLoadingGroups: true });

        const [groups, userGroupIds] = await Promise.all([
          socialService.fetchGroups(),
          (async () => {
            const userId = useSettingsStore.getState().user?.id;
            return userId ? socialService.fetchUserGroupIds(userId) : new Set<string>();
          })(),
        ]);
        // Mark joined groups
        const enrichedGroups = groups.map((g) => ({
          ...g,
          isJoined: userGroupIds.has(g.id),
        }));
        _groupsFetchedAt = Date.now();
        cacheGroups(enrichedGroups);
        set({ groups: enrichedGroups, userGroupIds, isLoadingGroups: false });
      },

      joinGroup: async (groupId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        // Prevent joining twice
        if (get().userGroupIds.has(groupId)) return;
        const success = await socialService.joinGroup(groupId, userId);
        if (success) {
          const current = get().groups.find((g) => g.id === groupId);
          patchCachedGroup(groupId, {
            isJoined: true,
            memberCount: (current?.memberCount ?? 0) + 1,
          });
          set((s) => {
            const newIds = new Set(s.userGroupIds);
            newIds.add(groupId);
            return {
              userGroupIds: newIds,
              groups: s.groups.map((g) =>
                g.id === groupId ? { ...g, isJoined: true, memberCount: g.memberCount + 1 } : g
              ),
            };
          });
          // Post activity
          const group = get().groups.find((g) => g.id === groupId);
          if (group) {
            const userName = useSettingsStore.getState().user?.user_metadata?.full_name || 'User';
            await socialService.postActivity(userId, userName, 'joined_group', group.name, 'people', '#818cf8');
          }
        }
      },

      leaveGroup: async (groupId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        const success = await socialService.leaveGroup(groupId, userId);
        if (success) {
          const current = get().groups.find((g) => g.id === groupId);
          patchCachedGroup(groupId, {
            isJoined: false,
            memberCount: Math.max(0, (current?.memberCount ?? 0) - 1),
          });
          set((s) => {
            const newIds = new Set(s.userGroupIds);
            newIds.delete(groupId);
            return {
              userGroupIds: newIds,
              groups: s.groups.map((g) =>
                g.id === groupId ? { ...g, isJoined: false, memberCount: Math.max(0, g.memberCount - 1) } : g
              ),
            };
          });
        }
      },

      deleteGroup: async (groupId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return false;
        const success = await socialService.deleteGroup(groupId, userId);
        if (success) {
          clearGroupSnapshot(groupId);
          removeCachedGroup(groupId);
          set((s) => {
            const newIds = new Set(s.userGroupIds);
            newIds.delete(groupId);
            return { userGroupIds: newIds, groups: s.groups.filter((g) => g.id !== groupId) };
          });
        }
        return success;
      },

      createGroup: async (name, description, topic, goal, icon, color) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return null;
        const group = await socialService.createGroup(userId, name, description, topic, goal, icon, color);
        if (group) {
          const joined = { ...group, isJoined: true };
          cacheGroups([joined, ...get().groups]);
          set((s) => {
            const newIds = new Set(s.userGroupIds);
            newIds.add(group.id);
            return { groups: [joined, ...s.groups], userGroupIds: newIds };
          });
          return joined;
        }
        return null;
      },

      loadPartners: async () => {
        set({ isLoadingPartners: true });
        const userId = useSettingsStore.getState().user?.id;
        const [partners, connectedPartnerIds] = await Promise.all([
          userId ? socialService.fetchPartnerSuggestions(userId) : Promise.resolve([]),
          userId ? socialService.fetchConnectedPartnerIds(userId) : Promise.resolve(new Set<string>()),
        ]);
        // Mark connected partners
        const enriched = partners.map((p) => ({
          ...p,
          isConnected: connectedPartnerIds.has(p.id),
        }));
        set({ partners: enriched, connectedPartnerIds, isLoadingPartners: false });
      },

      connectPartner: async (targetId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        const success = await socialService.sendConnection(userId, targetId);
        if (success) {
          set((s) => {
            const newIds = new Set(s.connectedPartnerIds);
            newIds.add(targetId);
            return {
              connectedPartnerIds: newIds,
              partners: s.partners.map((p) =>
                p.id === targetId ? { ...p, isConnected: true } : p
              ),
            };
          });
        }
      },

      disconnectPartner: async (targetId) => {
        const userId = useSettingsStore.getState().user?.id;
        if (!userId) return;
        const success = await socialService.removeConnection(userId, targetId);
        if (success) {
          set((s) => {
            const newIds = new Set(s.connectedPartnerIds);
            newIds.delete(targetId);
            return {
              connectedPartnerIds: newIds,
              partners: s.partners.map((p) =>
                p.id === targetId ? { ...p, isConnected: false } : p
              ),
            };
          });
        }
      },

      loadActivityFeed: async () => {
        set({ isLoadingActivity: true });
        const feed = await socialService.fetchActivityFeed();
        set({ activityFeed: feed, isLoadingActivity: false });
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
