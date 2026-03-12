import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { CommunityStats } from '../../types/community';

interface CommunityStatsBarProps {
  stats: CommunityStats;
  isLoading: boolean;
}

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

export function CommunityStatsBar({ stats, isLoading }: CommunityStatsBarProps) {
  const { t } = useTranslation();
  const hasLearners = stats.activeLearnersTodayCount > 0;

  if (isLoading) return <StatSkeleton />;

  if (!hasLearners) return null;

  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="people" size={18} color="#10b981" />
        <Text style={styles.statValue}>{stats.activeLearnersTodayCount.toLocaleString()}</Text>
        <Text style={styles.statLabel}>{t('community.active')}</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Ionicons name="flame" size={18} color="#f59e0b" />
        <Text style={styles.statValue}>{stats.activeStreaksCount.toLocaleString()}</Text>
        <Text style={styles.statLabel}>{t('community.streaks')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1a',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2a2a24',
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
    color: '#f5f5f0',
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#a3a398',
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a24',
    marginHorizontal: 8,
  },
  skeletonBlock: {
    height: 16,
    backgroundColor: '#2a2a24',
    borderRadius: 8,
  },
  emptyStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1a',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2a2a24',
  },
  emptyStatsText: {
    fontSize: 14,
    color: '#a3a398',
    fontWeight: '500',
  },
});
