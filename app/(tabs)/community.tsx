import React, { useEffect, useCallback, useState, memo } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCommunityStore } from '../../src/stores/communityStore';
import { useProgressStore } from '../../src/stores/progressStore';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { LeaderboardType, LeaderboardEntry } from '../../src/types/community';
import * as communityService from '../../src/services/communityService';

// Compact square card (icon on top, text below)
const CompactCard = ({
  title,
  titleArabic,
  icon,
  color,
  subtitle,
  onPress,
}: {
  title: string;
  titleArabic: string;
  icon: string;
  color: string;
  subtitle?: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.compactCard} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
    <View style={[styles.compactIconContainer, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon as any} size={26} color={color} />
    </View>
    <Text style={styles.compactTitle}>{title}</Text>
    <Text style={styles.compactTitleArabic}>{titleArabic}</Text>
    {subtitle && <Text style={styles.compactSubtitle} numberOfLines={1}>{subtitle}</Text>}
  </Pressable>
);

// Shimmer skeleton for loading stats
const StatSkeleton = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Animated.View style={[styles.skeletonBlock, { width: 80, opacity }]} />
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Animated.View style={[styles.skeletonBlock, { width: 80, opacity }]} />
      </View>
    </View>
  );
};

// Inline leaderboard row
const InlineLeaderboardRow = memo(function InlineLeaderboardRow({
  entry,
  type,
}: {
  entry: LeaderboardEntry;
  type: LeaderboardType;
}) {
  const { t } = useTranslation();

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', color: '#FFD700' };
    if (rank === 2) return { emoji: '🥈', color: '#C0C0C0' };
    if (rank === 3) return { emoji: '🥉', color: '#CD7F32' };
    return { emoji: null, color: '#64748b' };
  };

  const rankInfo = getRankDisplay(entry.rank);

  const getValue = () => {
    if (type === 'streaks') return t('community.days', { count: entry.streak });
    return `${entry.xp.toLocaleString()} XP`;
  };

  return (
    <View style={[styles.lbRow, entry.isCurrentUser && styles.lbRowCurrent]}>
      <View style={[styles.lbRankBadge, entry.rank <= 3 && { backgroundColor: `${rankInfo.color}20` }]}>
        {rankInfo.emoji ? (
          <Text style={styles.lbRankEmoji}>{rankInfo.emoji}</Text>
        ) : (
          <Text style={styles.lbRankNumber}>{entry.rank}</Text>
        )}
      </View>
      <View style={styles.lbUserInfo}>
        <Text style={[styles.lbUserName, entry.isCurrentUser && styles.lbUserNameCurrent]} numberOfLines={1}>
          {entry.isCurrentUser ? t('community.you') : entry.name}
        </Text>
      </View>
      <Text style={[styles.lbValue, entry.isCurrentUser && styles.lbValueCurrent]}>
        {getValue()}
      </Text>
    </View>
  );
});

// Leaderboard skeleton
const LeaderboardRowSkeleton = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <Animated.View key={i} style={[styles.lbRow, { opacity }]}>
          <View style={[styles.lbRankBadge, { backgroundColor: '#334155' }]} />
          <View style={styles.lbUserInfo}>
            <View style={{ width: 90, height: 13, backgroundColor: '#334155', borderRadius: 6 }} />
          </View>
          <View style={{ width: 50, height: 13, backgroundColor: '#334155', borderRadius: 6 }} />
        </Animated.View>
      ))}
    </>
  );
};

const TAB_KEYS: { type: LeaderboardType; labelKey: string; icon: string }[] = [
  { type: 'allTime', labelKey: 'community.allTime', icon: 'trophy' },
  { type: 'weekly', labelKey: 'community.weekly', icon: 'calendar' },
  { type: 'streaks', labelKey: 'community.streaks', icon: 'flame' },
];

export default function CommunityScreen() {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [lbType, setLbType] = useState<LeaderboardType>('allTime');

  const {
    dailyChallenge,
    initializeChallenges,
    fetchCommunityStats,
    communityStatsData,
    isLoadingStats,
    fetchLeaderboard,
    leaderboardEntries,
    isLoadingLeaderboard,
  } = useCommunityStore();
  const { progress } = useProgressStore();
  const userId = useSettingsStore((s) => s.user?.id);

  useEffect(() => {
    initializeChallenges();
    if (userId && progress.totalXp > 0) {
      communityService.syncProgress(userId, progress.totalXp, progress.currentStreak, progress.longestStreak);
    }
    fetchCommunityStats();
  }, []);

  // Fetch leaderboard when tab changes
  useEffect(() => {
    fetchLeaderboard(lbType, userId);
  }, [lbType, userId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    initializeChallenges();
    await Promise.all([
      fetchCommunityStats(true),
      fetchLeaderboard(lbType, userId, true),
    ]);
    setRefreshing(false);
  }, [initializeChallenges, fetchCommunityStats, fetchLeaderboard, lbType, userId]);

  const hasLearners = communityStatsData.activeLearnersTodayCount > 0;
  const topEntries = leaderboardEntries.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#818cf8"
            colors={['#818cf8']}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>{t('community.title')}</Text>
            <Text style={styles.headerTitleArabic}>المجتمع</Text>
          </View>
          {isLoadingStats ? (
            <StatSkeleton />
          ) : hasLearners ? (
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="people" size={18} color="#22c55e" />
                <Text style={styles.statValue}>{communityStatsData.activeLearnersTodayCount.toLocaleString()}</Text>
                <Text style={styles.statLabel}>{t('community.active')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="flame" size={18} color="#f97316" />
                <Text style={styles.statValue}>{communityStatsData.activeStreaksCount.toLocaleString()}</Text>
                <Text style={styles.statLabel}>{t('community.streaks')}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyStatsRow}>
              <Ionicons name="people-outline" size={20} color="#64748b" />
              <Text style={styles.emptyStatsText}>{t('community.beTheFirst', { defaultValue: 'Be the first to study today!' })}</Text>
            </View>
          )}
        </View>

        {/* Shortcut Cards — side by side */}
        <View style={styles.cardsRow}>
          <CompactCard
            title={t('community.leaderboard')}
            titleArabic="الترتيب"
            icon="trophy"
            color="#D4AF37"
            onPress={() => router.push('/community/leaderboard')}
          />
          <CompactCard
            title={t('community.challenges')}
            titleArabic="التحديات"
            icon="flag"
            color="#6366f1"
            subtitle={dailyChallenge ? `${dailyChallenge.currentValue}/${dailyChallenge.targetValue}` : undefined}
            onPress={() => router.push('/community/challenges')}
          />
        </View>

        {/* Embedded Leaderboard */}
        <View style={styles.lbSection}>
          {/* Section header */}
          <View style={styles.lbSectionHeader}>
            <Text style={styles.lbSectionTitle}>{t('community.leaderboard')}</Text>
            <Pressable onPress={() => router.push('/community/leaderboard')}>
              <Text style={styles.lbSeeAll}>{t('community.seeAll', { defaultValue: 'See all' })}</Text>
            </Pressable>
          </View>

          {/* Tab selector */}
          <View style={styles.lbTabContainer}>
            {TAB_KEYS.map((tab) => (
              <Pressable
                key={tab.type}
                style={[styles.lbTab, lbType === tab.type && styles.lbTabActive]}
                onPress={() => setLbType(tab.type)}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={14}
                  color={lbType === tab.type ? '#ffffff' : '#64748b'}
                />
                <Text style={[styles.lbTabText, lbType === tab.type && styles.lbTabTextActive]}>
                  {t(tab.labelKey)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Rankings */}
          <View style={styles.lbCard}>
            {isLoadingLeaderboard ? (
              <LeaderboardRowSkeleton />
            ) : topEntries.length === 0 ? (
              <View style={styles.lbEmpty}>
                <Ionicons name="trophy-outline" size={32} color="#334155" />
                <Text style={styles.lbEmptyText}>{t('community.noLearnersYet', { defaultValue: 'No learners yet' })}</Text>
              </View>
            ) : (
              topEntries.map((entry) => (
                <InlineLeaderboardRow key={entry.id} entry={entry} type={lbType} />
              ))
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerTitleArabic: {
    fontSize: 24,
    color: '#D4AF37',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 8,
  },
  skeletonBlock: {
    height: 16,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  emptyStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyStatsText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },

  // Side-by-side compact cards
  cardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  compactCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  compactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  compactTitleArabic: {
    fontSize: 12,
    color: '#D4AF37',
    marginTop: 2,
    textAlign: 'center',
  },
  compactSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },

  // Embedded leaderboard section
  lbSection: {
    paddingHorizontal: 20,
  },
  lbSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lbSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  lbSeeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  lbTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  lbTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  lbTabActive: {
    backgroundColor: '#6366f1',
  },
  lbTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  lbTabTextActive: {
    color: '#ffffff',
  },
  lbCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  lbRowCurrent: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  lbRankBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
  },
  lbRankEmoji: {
    fontSize: 16,
  },
  lbRankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  lbUserInfo: {
    flex: 1,
    marginLeft: 10,
  },
  lbUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  lbUserNameCurrent: {
    color: '#818cf8',
  },
  lbValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  lbValueCurrent: {
    color: '#818cf8',
  },
  lbEmpty: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  lbEmptyText: {
    fontSize: 14,
    color: '#64748b',
  },
});
