import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../../src/hooks/useLocalizedContent';
import { PROPHETS, TOTAL_PROPHETS } from '../../../src/data/arabic/prophets';
import { QURAN_STORIES, TOTAL_QURAN_STORIES } from '../../../src/data/arabic/quranStories';
import { ProphetCard } from '../../../src/components/prophetStories';
import { QuranStoryCard } from '../../../src/components/quranStories';
import { useProphetStoriesStore } from '../../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../../src/stores/quranStoriesStore';
import { ProphetListItem } from '../../../src/types/prophetStories';
import { QuranStoryListItem } from '../../../src/types/quranStories';

type TabType = 'prophets' | 'other';

export default function StoriesScreen() {
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();
  const [activeTab, setActiveTab] = useState<TabType>('prophets');
  const [searchQuery, setSearchQuery] = useState('');

  const { getStoryProgress, isStoryCompleted, getTotalStoriesCompleted } = useProphetStoriesStore();
  const {
    getStoryProgress: getQuranStoryProgress,
    isStoryCompleted: isQuranStoryCompleted,
    getTotalStoriesCompleted: getTotalQuranStoriesCompleted
  } = useQuranStoriesStore();

  // Filter prophets based on search query
  const filteredProphets = useMemo(() => {
    if (!searchQuery.trim()) return PROPHETS;

    const query = searchQuery.toLowerCase();
    return PROPHETS.filter(
      (prophet) =>
        prophet.nameEnglish.toLowerCase().includes(query) ||
        prophet.nameArabic.includes(searchQuery) ||
        (prophet.title && prophet.title.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Filter other Quran stories based on search query
  const filteredQuranStories = useMemo(() => {
    if (!searchQuery.trim()) return QURAN_STORIES;

    const query = searchQuery.toLowerCase();
    return QURAN_STORIES.filter(
      (story) =>
        story.titleEnglish.toLowerCase().includes(query) ||
        story.titleArabic.includes(searchQuery) ||
        (story.description && story.description.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Transform prophets to list items with progress
  const prophetListItems: ProphetListItem[] = useMemo(() => {
    return filteredProphets.map((prophet) => {
      const progress = getStoryProgress(prophet.id);
      const subStoryCount = prophet.subStories?.length || 1;
      const completionPercent = isStoryCompleted(prophet.id)
        ? 100
        : Math.round((progress.subStoriesCompleted.length / subStoryCount) * 100);

      return {
        id: prophet.id,
        nameEnglish: lc(prophet.nameEnglish, prophet.nameFrench),
        nameArabic: prophet.nameArabic,
        order: prophet.order,
        title: lc(prophet.title, prophet.titleFr),
        summary: lc(prophet.summary, prophet.summaryFr),
        isCompleted: isStoryCompleted(prophet.id),
        progress: completionPercent,
        estimatedReadTime: prophet.estimatedReadTime,
      };
    });
  }, [filteredProphets, getStoryProgress, isStoryCompleted, lc]);

  // Transform Quran stories to list items with progress
  const quranStoryListItems: QuranStoryListItem[] = useMemo(() => {
    return filteredQuranStories.map((story) => {
      const progress = getQuranStoryProgress(story.id);
      const isCompleted = isQuranStoryCompleted(story.id);

      return {
        id: story.id,
        titleEnglish: lc(story.titleEnglish, story.titleFrench),
        titleArabic: story.titleArabic,
        order: story.order,
        category: story.category,
        description: lc(story.description, story.descriptionFr),
        isCompleted,
        progress: isCompleted ? 100 : progress.percentComplete,
        estimatedReadTime: story.estimatedReadTime,
        icon: story.icon,
      };
    });
  }, [filteredQuranStories, getQuranStoryProgress, isQuranStoryCompleted, lc]);

  const prophetStoriesCompleted = getTotalStoriesCompleted();
  const quranStoriesCompleted = getTotalQuranStoriesCompleted();

  const currentTotal = activeTab === 'prophets' ? TOTAL_PROPHETS : TOTAL_QURAN_STORIES;
  const currentCompleted = activeTab === 'prophets' ? prophetStoriesCompleted : quranStoriesCompleted;
  const overallProgress = Math.round((currentCompleted / currentTotal) * 100);

  const handleProphetPress = (prophetId: string) => {
    router.push(`/quran/prophets/${prophetId}` as any);
  };

  const handleQuranStoryPress = (storyId: string) => {
    router.push(`/quran/stories/${storyId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>{t('storiesFeature.title')}</Text>
          <Text style={styles.titleArabic}>قصص القرآن</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'prophets' && styles.activeTab]}
          onPress={() => { setActiveTab('prophets'); setSearchQuery(''); }}
        >
          <Ionicons
            name="person"
            size={18}
            color={activeTab === 'prophets' ? '#8b5cf6' : '#64748b'}
          />
          <Text style={[styles.tabText, activeTab === 'prophets' && styles.activeTabText]}>
            {t('storiesFeature.prophets')}
          </Text>
          <View style={[styles.tabBadge, activeTab === 'prophets' && styles.activeTabBadge]}>
            <Text style={[styles.tabBadgeText, activeTab === 'prophets' && styles.activeTabBadgeText]}>
              {prophetStoriesCompleted}/{TOTAL_PROPHETS}
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'other' && styles.activeTab]}
          onPress={() => { setActiveTab('other'); setSearchQuery(''); }}
        >
          <Ionicons
            name="book"
            size={18}
            color={activeTab === 'other' ? '#8b5cf6' : '#64748b'}
          />
          <Text style={[styles.tabText, activeTab === 'other' && styles.activeTabText]}>
            {t('storiesFeature.otherStories')}
          </Text>
          <View style={[styles.tabBadge, activeTab === 'other' && styles.activeTabBadge]}>
            <Text style={[styles.tabBadgeText, activeTab === 'other' && styles.activeTabBadgeText]}>
              {quranStoriesCompleted}/{TOTAL_QURAN_STORIES}
            </Text>
          </View>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>{currentCompleted}</Text>
              <Text style={styles.progressTotal}>/{currentTotal}</Text>
            </View>
            <View style={styles.progressDetails}>
              <Text style={styles.progressTitle}>
                {activeTab === 'prophets' ? t('storiesFeature.prophetStories') : t('storiesFeature.quranStories')} {t('common.completed')}
              </Text>
              <Text style={styles.progressSubtitle}>
                {activeTab === 'prophets'
                  ? t('storiesFeature.learnAboutProphets')
                  : t('storiesFeature.discoverStories')}
              </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${overallProgress}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{overallProgress}%</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#64748b" />
            <TextInput
              style={styles.searchInput}
              placeholder={activeTab === 'prophets' ? t('storiesFeature.searchProphets') : t('storiesFeature.searchStories')}
              placeholderTextColor="#64748b"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#64748b" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.listContainer}>
          {activeTab === 'prophets' ? (
            prophetListItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color="#475569" />
                <Text style={styles.emptyStateText}>{t('storiesFeature.noProphetsFound')}</Text>
                <Text style={styles.emptyStateSubtext}>{t('storiesFeature.tryDifferentSearch')}</Text>
              </View>
            ) : (
              prophetListItems.map((prophet) => (
                <ProphetCard
                  key={prophet.id}
                  prophet={prophet}
                  onPress={() => handleProphetPress(prophet.id)}
                />
              ))
            )
          ) : (
            quranStoryListItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color="#475569" />
                <Text style={styles.emptyStateText}>{t('storiesFeature.noStoriesFound')}</Text>
                <Text style={styles.emptyStateSubtext}>{t('storiesFeature.tryDifferentSearch')}</Text>
              </View>
            ) : (
              quranStoryListItems.map((story) => (
                <QuranStoryCard
                  key={story.id}
                  story={story}
                  onPress={() => handleQuranStoryPress(story.id)}
                />
              ))
            )
          )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#8b5cf6',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#8b5cf620',
  },
  tabText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#8b5cf6',
  },
  tabBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeTabBadge: {
    backgroundColor: '#8b5cf630',
  },
  tabBadgeText: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
  },
  activeTabBadgeText: {
    color: '#a78bfa',
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#8b5cf630',
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8b5cf620',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a78bfa',
  },
  progressTotal: {
    fontSize: 14,
    color: '#64748b',
  },
  progressDetails: {
    flex: 1,
    marginLeft: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 18,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  progressPercent: {
    color: '#a78bfa',
    fontSize: 13,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  emptyStateSubtext: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
  },
});
