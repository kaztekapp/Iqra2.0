import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PROPHETS } from '../../../src/data/arabic/prophets';
import { ProphetCard } from '../../../src/components/prophetStories';
import { useProphetStoriesStore } from '../../../src/stores/prophetStoriesStore';
import { ProphetListItem } from '../../../src/types/prophetStories';

export default function ProphetListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getStoryProgress, isStoryCompleted, getTotalStoriesCompleted } = useProphetStoriesStore();

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
        nameEnglish: prophet.nameEnglish,
        nameArabic: prophet.nameArabic,
        order: prophet.order,
        title: prophet.title,
        summary: prophet.summary,
        isCompleted: isStoryCompleted(prophet.id),
        progress: completionPercent,
        estimatedReadTime: prophet.estimatedReadTime,
      };
    });
  }, [filteredProphets, getStoryProgress, isStoryCompleted]);

  const totalCompleted = getTotalStoriesCompleted();
  const overallProgress = Math.round((totalCompleted / PROPHETS.length) * 100);

  const handleProphetPress = (prophetId: string) => {
    router.push(`/quran/prophets/${prophetId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Prophet Stories</Text>
          <Text style={styles.titleArabic}>قصص الأنبياء</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>{totalCompleted}</Text>
              <Text style={styles.progressTotal}>/{PROPHETS.length}</Text>
            </View>
            <View style={styles.progressDetails}>
              <Text style={styles.progressTitle}>Stories Completed</Text>
              <Text style={styles.progressSubtitle}>
                Learn about the prophets mentioned in the Quran
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
              placeholder="Search prophets..."
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

        {/* Prophet List */}
        <View style={styles.listContainer}>
          {prophetListItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#475569" />
              <Text style={styles.emptyStateText}>No prophets found</Text>
              <Text style={styles.emptyStateSubtext}>Try a different search term</Text>
            </View>
          ) : (
            prophetListItems.map((prophet) => (
              <ProphetCard
                key={prophet.id}
                prophet={prophet}
                onPress={() => handleProphetPress(prophet.id)}
              />
            ))
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
    color: '#818cf8',
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6366f130',
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
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#818cf8',
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
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  progressPercent: {
    color: '#818cf8',
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
