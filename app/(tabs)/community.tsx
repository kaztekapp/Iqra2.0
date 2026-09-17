import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as communityService from '../../src/services/communityService';
import { useProgressStore } from '../../src/stores/progressStore';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { GroupsTab } from '../../src/components/community/GroupsTab';
import { DiscussionsTab } from '../../src/components/community/DiscussionsTab';
import { ChallengesTab } from '../../src/components/community/ChallengesTab';
import { Txt, Arabic, MastheadWash } from '../../src/components/ui/Primitives';
import { color, space, radius, gutter } from '../../src/theme/tokens';

type CommunityTab = 'groups' | 'discussions' | 'challenges';

const TABS: { key: CommunityTab; icon: keyof typeof Ionicons.glyphMap; labelKey: string }[] = [
  { key: 'groups', icon: 'people', labelKey: 'community.tabGroups' },
  { key: 'discussions', icon: 'chatbubbles', labelKey: 'community.tabDiscussions' },
  { key: 'challenges', icon: 'flag', labelKey: 'community.tabChallenges' },
];

export default function CommunityScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CommunityTab>('groups');

  // Which tabs have been opened at least once. A ref, not state: it only
  // ever grows alongside a setActiveTab that re-renders anyway.
  const visited = useRef<Set<CommunityTab>>(new Set(['groups']));
  visited.current.add(activeTab);

  const userId = useSettingsStore((s) => s.user?.id);

  // Progress is read when the sync runs, not subscribed to. Subscribing meant
  // every XP change anywhere in the app re-rendered this screen and all three
  // panes under it, for a value used once.
  useEffect(() => {
    const { progress } = useProgressStore.getState();
    if (userId && progress.totalXp > 0) {
      communityService.syncProgress(userId, progress.totalXp, progress.currentStreak, progress.longestStreak);
    }
  }, [userId]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MastheadWash />
      {/* Masthead. No illuminated rule here — the segmented control below
          already divides the page, and the mark stays rare by design. */}
      <View style={styles.header}>
        <Arabic size="title" align="left">المجتمع</Arabic>
        <Txt variant="caption" tone="faint" style={styles.headerLatin}>
          {t('community.title')}
        </Txt>
      </View>

      {/* Segmented control */}
      <View style={styles.segmented}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => setActiveTab(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={t(tab.labelKey)}
            >
              <Ionicons
                name={tab.icon}
                size={16}
                color={isActive ? color.textOnAccent : color.textMuted}
              />
              <Txt
                variant="caption"
                weight="semibold"
                style={isActive ? styles.segmentLabelActive : styles.segmentLabel}
              >
                {t(tab.labelKey)}
              </Txt>
            </Pressable>
          );
        })}
      </View>

      {/* A tab is built the first time it is opened and then kept, hidden,
          so going back to it is instant and it returns to where it was
          scrolled. Only the tab the person actually opens is ever built:
          mounting all three up front would slow down the arrival, which is
          the thing this screen most needs to be fast. */}
      <View style={styles.tabContent}>
        {visited.current.has('groups') && (
          <View style={[styles.pane, activeTab !== 'groups' && styles.paneHidden]}>
            <GroupsTab active={activeTab === 'groups'} />
          </View>
        )}
        {visited.current.has('discussions') && (
          <View style={[styles.pane, activeTab !== 'discussions' && styles.paneHidden]}>
            <DiscussionsTab active={activeTab === 'discussions'} />
          </View>
        )}
        {visited.current.has('challenges') && (
          <View style={[styles.pane, activeTab !== 'challenges' && styles.paneHidden]}>
            <ChallengesTab active={activeTab === 'challenges'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space.lg,
  },
  headerLatin: {
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  segmented: {
    flexDirection: 'row',
    marginHorizontal: gutter,
    marginBottom: space.lg,
    padding: space.xs,
    backgroundColor: color.surfaceSunken,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: color.border,
    gap: space.xs,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    paddingVertical: space.md,
    borderRadius: radius.sm,
  },
  segmentActive: {
    backgroundColor: color.accent,
  },
  segmentLabel: {
    color: color.textMuted,
  },
  segmentLabelActive: {
    color: color.textOnAccent,
  },
  tabContent: {
    flex: 1,
  },
  pane: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paneHidden: {
    display: 'none',
  },
});
