import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCommunityStore } from '../../src/stores/communityStore';
import { useProgressStore } from '../../src/stores/progressStore';

// Shortcut Card Component
const ShortcutCard = ({
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
  <Pressable style={styles.shortcutCard} onPress={onPress}>
    <View style={[styles.shortcutIconContainer, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon as any} size={32} color={color} />
    </View>
    <View style={styles.shortcutContent}>
      <Text style={styles.shortcutTitle}>{title}</Text>
      <Text style={styles.shortcutTitleArabic}>{titleArabic}</Text>
      {subtitle && <Text style={styles.shortcutSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={24} color="#64748b" />
  </Pressable>
);

export default function CommunityScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { dailyChallenge, initializeChallenges, getCommunityStats } = useCommunityStore();
  const { progress } = useProgressStore();

  useEffect(() => {
    initializeChallenges();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    initializeChallenges();
    setTimeout(() => setRefreshing(false), 500);
  };

  const communityStats = getCommunityStats(progress.totalXp);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            <Text style={styles.headerTitle}>Community</Text>
            <Text style={styles.headerTitleArabic}>المجتمع</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={18} color="#22c55e" />
              <Text style={styles.statValue}>{communityStats.activeLearnersTodayCount.toLocaleString()}</Text>
              <Text style={styles.statLabel}>active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="flame" size={18} color="#f97316" />
              <Text style={styles.statValue}>{communityStats.activeStreaksCount.toLocaleString()}</Text>
              <Text style={styles.statLabel}>streaks</Text>
            </View>
          </View>
        </View>

        {/* Shortcut Cards */}
        <View style={styles.cardsContainer}>
          <ShortcutCard
            title="Leaderboard"
            titleArabic="الترتيب"
            icon="trophy"
            color="#D4AF37"
            subtitle="See top learners"
            onPress={() => router.push('/community/leaderboard')}
          />

          <ShortcutCard
            title="Challenges"
            titleArabic="التحديات"
            icon="flag"
            color="#6366f1"
            subtitle={dailyChallenge ? `${dailyChallenge.currentValue}/${dailyChallenge.targetValue} today` : undefined}
            onPress={() => router.push('/community/challenges')}
          />
        </View>
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
    paddingTop: 16,
    paddingBottom: 24,
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

  // Cards Container
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Shortcut Card
  shortcutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  shortcutIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutContent: {
    flex: 1,
    marginLeft: 14,
  },
  shortcutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  shortcutTitleArabic: {
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 2,
  },
  shortcutSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
});
