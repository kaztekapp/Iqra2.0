import React, { useEffect, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { LeaderboardEntry, LeaderboardType } from '../../types/community';

const TAB_KEYS: { type: LeaderboardType; labelKey: string; icon: string }[] = [
  { type: 'allTime', labelKey: 'community.allTime', icon: 'trophy' },
  { type: 'weekly', labelKey: 'community.weekly', icon: 'calendar' },
  { type: 'streaks', labelKey: 'community.streaks', icon: 'flame' },
];

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

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  currentType: LeaderboardType;
  onTypeChange: (type: LeaderboardType) => void;
}

export function LeaderboardPreview({ entries, isLoading, currentType, onTypeChange }: LeaderboardPreviewProps) {
  const { t } = useTranslation();
  const topEntries = entries.slice(0, 5);

  return (
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
            style={[styles.lbTab, currentType === tab.type && styles.lbTabActive]}
            onPress={() => onTypeChange(tab.type)}
          >
            <Ionicons
              name={tab.icon as any}
              size={14}
              color={currentType === tab.type ? '#ffffff' : '#6b6b60'}
            />
            <Text style={[styles.lbTabText, currentType === tab.type && styles.lbTabTextActive]}>
              {t(tab.labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Rankings */}
      <View style={styles.lbCard}>
        {isLoading ? (
          <LeaderboardRowSkeleton />
        ) : topEntries.length === 0 ? (
          <View style={styles.lbEmpty}>
            <Ionicons name="trophy-outline" size={32} color="#334155" />
            <Text style={styles.lbEmptyText}>{t('community.noLearnersYet', { defaultValue: 'No learners yet' })}</Text>
          </View>
        ) : (
          topEntries.map((entry) => (
            <InlineLeaderboardRow key={entry.id} entry={entry} type={currentType} />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lbSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
    color: '#f97316',
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
    backgroundColor: '#f97316',
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
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    borderWidth: 1,
    borderColor: '#f97316',
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
    color: '#fb923c',
  },
  lbValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  lbValueCurrent: {
    color: '#fb923c',
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
