import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { useCommunityStore } from '../../src/stores/communityStore';
import * as communityService from '../../src/services/communityService';
import { useProgressStore } from '../../src/stores/progressStore';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { useCreditStore, getCreditDisplayInfo } from '../../src/stores/creditStore';
import { CommunityStatsBar } from '../../src/components/community/CommunityStatsBar';
import { LeaderboardPreview } from '../../src/components/community/LeaderboardPreview';
import { LeaderboardType, StudyGroup } from '../../src/types/community';

export default function CommunityScreen() {
  const { t } = useTranslation();
  const [lbType, setLbType] = useState<LeaderboardType>('allTime');
  const [refreshing, setRefreshing] = useState(false);

  const userId = useSettingsStore((s) => s.user?.id);
  const progress = useProgressStore((s) => s.progress);
  const creditState = useCreditStore();
  const isPremium = getCreditDisplayInfo(creditState).isPremium;

  const {
    initializeChallenges,
    fetchCommunityStats,
    communityStatsData,
    isLoadingStats,
    fetchLeaderboard,
    leaderboardEntries,
    isLoadingLeaderboard,
    dailyChallenge,
    // Social state
    groups,
    isLoadingGroups,
    // Social actions
    loadGroups,
  } = useCommunityStore();

  useEffect(() => {
    initializeChallenges();
    fetchCommunityStats();
    fetchLeaderboard(lbType, userId);
    loadGroups();
    if (userId && progress.totalXp > 0) {
      communityService.syncProgress(userId, progress.totalXp, progress.currentStreak, progress.longestStreak);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard(lbType, userId);
  }, [lbType, userId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    initializeChallenges();
    await Promise.all([
      fetchCommunityStats(true),
      fetchLeaderboard(lbType, userId, true),
      loadGroups(),
    ]);
    setRefreshing(false);
  }, [initializeChallenges, fetchCommunityStats, fetchLeaderboard, lbType, userId, loadGroups]);

  const topGroups = groups.filter((g) => g.isActive).slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>{t('community.title')}</Text>
          <Text style={styles.headerTitleArabic}>{'\u0627\u0644\u0645\u062C\u062A\u0645\u0639'}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />
        }
      >
        {/* Stats bar */}
        <View style={styles.section}>
          <CommunityStatsBar stats={communityStatsData} isLoading={isLoadingStats} />
        </View>

        {/* ── Study Groups Preview ───────────────────────────── */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="people" size={18} color="#818cf8" />
            <Text style={styles.sectionTitle}>{t('community.studyGroups')}</Text>
          </View>
          <Pressable onPress={() => router.push('/community/groups')}>
            <Text style={styles.seeAll}>{t('community.seeAll')}</Text>
          </Pressable>
        </View>
        {isLoadingGroups ? (
          <ActivityIndicator color="#818cf8" style={{ marginBottom: 24 }} />
        ) : (
          <FlatList
            data={topGroups}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.groupsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GroupCard group={item} t={t} isPremium={isPremium} />}
          />
        )}

        {/* ── Study Partners CTA ─────────────────────────────── */}
        <View style={styles.section}>
          <Pressable
            style={styles.partnersCta}
            onPress={() => router.push('/community/partners')}
          >
            <View style={styles.partnersCtaLeft}>
              <View style={styles.partnersIconCircle}>
                <Ionicons name="hand-left" size={24} color="#f59e0b" />
              </View>
              <View style={styles.partnersCtaText}>
                <Text style={styles.partnersCtaTitle}>{t('community.studyPartners')}</Text>
                <Text style={styles.partnersCtaDesc}>{t('community.studyPartnersDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </Pressable>
        </View>

        {/* ── Shortcut cards: Leaderboard + Challenges ───────── */}
        <View style={styles.shortcutRow}>
          <Pressable
            style={styles.shortcutCard}
            onPress={() => router.push('/community/leaderboard')}
          >
            <Ionicons name="trophy" size={28} color="#f59e0b" />
            <Text style={styles.shortcutLabel}>{t('community.leaderboard')}</Text>
            <Text style={styles.shortcutSub}>{t('community.seeTopLearners')}</Text>
          </Pressable>
          <Pressable
            style={styles.shortcutCard}
            onPress={() => router.push('/community/challenges')}
          >
            <Ionicons name="flag" size={28} color="#f97316" />
            <Text style={styles.shortcutLabel}>{t('community.challenges')}</Text>
            {dailyChallenge && (
              <Text style={styles.shortcutSub}>
                {t('community.todayProgress', {
                  current: dailyChallenge.currentValue,
                  target: dailyChallenge.targetValue,
                })}
              </Text>
            )}
          </Pressable>
        </View>

        {/* ── Embedded Leaderboard ───────────────────────────── */}
        <LeaderboardPreview
          entries={leaderboardEntries}
          isLoading={isLoadingLeaderboard}
          currentType={lbType}
          onTypeChange={setLbType}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function GroupCard({ group, t, isPremium }: { group: StudyGroup; t: any; isPremium: boolean }) {
  return (
    <Pressable
      style={styles.groupCard}
      onPress={() => router.push(`/community/groups/${group.id}` as any)}
    >
      <View style={[styles.groupIconCircle, { backgroundColor: `${group.color}20` }]}>
        <Ionicons name={group.icon as any} size={24} color={group.color} />
      </View>
      <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
      <Text style={styles.groupTopic} numberOfLines={1}>{group.topic}</Text>
      <View style={styles.groupMetaRow}>
        <Ionicons name="people-outline" size={13} color="#64748b" />
        <Text style={styles.groupMembers}>{t('community.members', { count: group.memberCount })}</Text>
      </View>
      {group.isActive && (
        <View style={styles.activeDot}>
          <View style={styles.activeDotInner} />
          <Text style={styles.activeText}>{t('community.activeNow')}</Text>
        </View>
      )}
    </Pressable>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f97316',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    paddingVertical: 20,
  },

  // Groups
  groupsList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  groupCard: {
    width: 160,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  groupIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  groupTopic: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 10,
  },
  groupMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  groupMembers: {
    fontSize: 12,
    color: '#64748b',
  },
  activeDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  activeText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },

  // Partners CTA
  partnersCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  partnersCtaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  partnersIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f59e0b20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnersCtaText: {
    flex: 1,
  },
  partnersCtaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 3,
  },
  partnersCtaDesc: {
    fontSize: 13,
    color: '#94a3b8',
  },

  // Shortcut cards
  shortcutRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  shortcutLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 10,
  },
  shortcutSub: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
});
