import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../../src/hooks/useLocalizedContent';
import { getQuranStoryById } from '../../../src/data/arabic/quranStories';
import { StoryContentBlock } from '../../../src/components/quranStories';
import { useQuranStoriesStore } from '../../../src/stores/quranStoriesStore';
import { QuranReference, STORY_CATEGORY_LABELS } from '../../../src/types/quranStories';
import { quranAudioService, AudioState } from '../../../src/services/quranAudioService';

export default function QuranStoryDetailScreen() {
  const { t } = useTranslation();
  const { lc, lcArray } = useLocalizedContent();
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const scrollViewRef = useRef<ScrollView>(null);

  const [playingSourceId, setPlayingSourceId] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('idle');

  const {
    updateProgress,
    markStoryComplete,
    getStoryProgress,
    isStoryCompleted,
  } = useQuranStoriesStore();

  // Get story data
  const story = storyId ? getQuranStoryById(storyId) : undefined;

  // Initialize story progress tracking
  useEffect(() => {
    if (storyId && story) {
      // Start reading - update last read time
      updateProgress(storyId, { lastReadAt: new Date() });
    }
  }, [storyId, story]);

  // Calculate source count
  const sourceCount = story?.content.filter((block) => block.type !== 'narrative').length || 0;

  // Handle mark complete
  const handleMarkComplete = useCallback(() => {
    if (storyId) {
      markStoryComplete(storyId);
    }
  }, [storyId, markStoryComplete]);

  // Handle play Quran audio
  const handlePlayQuranAudio = useCallback(async (source: QuranReference, blockId: string) => {
    // If same source is playing, toggle pause/resume
    if (playingSourceId === blockId) {
      if (audioState === 'playing') {
        await quranAudioService.pause();
        setAudioState('paused');
      } else if (audioState === 'paused') {
        await quranAudioService.resume();
        setAudioState('playing');
      }
      return;
    }

    // Stop any current playback
    await quranAudioService.stop();

    // Set the new playing source
    setPlayingSourceId(blockId);
    setAudioState('loading');

    // Play the ayah range
    await quranAudioService.playAyahRange(
      source.surahNumber,
      source.ayahStart,
      source.ayahEnd,
      {
        onStateChange: (state) => {
          setAudioState(state);
          if (state === 'idle') {
            setPlayingSourceId(null);
          }
        },
        onComplete: () => {
          setPlayingSourceId(null);
          setAudioState('idle');
        },
        onError: () => {
          setPlayingSourceId(null);
          setAudioState('idle');
        },
      }
    );
  }, [playingSourceId, audioState]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      quranAudioService.stop();
    };
  }, []);

  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>{t('storiesFeature.loadingStory')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted = storyId ? isStoryCompleted(storyId) : false;
  const categoryLabel = STORY_CATEGORY_LABELS[story.category];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <View style={styles.storyNameRow}>
            <Text style={styles.storyIcon}>{story.icon}</Text>
            <Text style={styles.storyNameArabic}>{story.titleArabic}</Text>
          </View>
          <Text style={styles.storyNameEnglish}>{lc(story.titleEnglish, story.titleFrench)}</Text>
        </View>
        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#64748b" />
            <Text style={styles.metaText}>{story.estimatedReadTime} {t('common.min')}</Text>
          </View>
        </View>
      </View>

      {/* Category Badge and Main Surah */}
      <View style={styles.subHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{lc(categoryLabel.english, categoryLabel.french)}</Text>
        </View>
        {story.mainSurah && (
          <View style={styles.surahBadge}>
            <Ionicons name="book-outline" size={12} color="#818cf8" />
            <Text style={styles.surahText}>
              {t('storiesFeature.surah')} {story.mainSurah.name} ({story.mainSurah.nameArabic})
            </Text>
          </View>
        )}
        <View style={styles.sourceCountBadge}>
          <Ionicons name="library-outline" size={12} color="#64748b" />
          <Text style={styles.sourceCountText}>{sourceCount} {t('prophetsFeature.sources')}</Text>
        </View>
      </View>

      {/* Story Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{t('storiesFeature.summary')}</Text>
          <Text style={styles.summaryText}>{lc(story.summary, story.summaryFr)}</Text>
        </View>

        {/* Key Lessons */}
        {story.lessons.length > 0 && (
          <View style={styles.lessonsCard}>
            <Text style={styles.lessonsTitle}>{t('storiesFeature.keyLessons')}</Text>
            {lcArray(story.lessons, story.lessonsFr).map((lesson, index) => (
              <View key={index} style={styles.lessonItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.lessonText}>{lesson}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Story Narrative Section Header */}
        <View style={styles.narrativeHeader}>
          <Text style={styles.narrativeHeaderTitle}>{t('storiesFeature.theStory')}</Text>
          <View style={styles.divider} />
        </View>

        {/* Content Blocks */}
        <View style={styles.blocksContainer}>
          {story.content.map((block) => (
            <StoryContentBlock
              key={block.id}
              block={block}
              onPlayQuranAudio={
                block.source?.type === 'quran'
                  ? () => handlePlayQuranAudio(block.source as QuranReference, block.id)
                  : undefined
              }
              isQuranPlaying={playingSourceId === block.id && audioState === 'playing'}
              isQuranLoading={playingSourceId === block.id && audioState === 'loading'}
            />
          ))}

          {/* Mark Complete Button */}
          {story.content.length > 0 && !isCompleted && (
            <Pressable style={styles.completeButton} onPress={handleMarkComplete}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10b981" />
              <Text style={styles.completeButtonText}>{t('storiesFeature.markComplete')}</Text>
            </Pressable>
          )}

          {isCompleted && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.completedText}>{t('storiesFeature.storyCompleted')}</Text>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
  },
  storyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storyIcon: {
    fontSize: 22,
  },
  storyNameArabic: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  storyNameEnglish: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 2,
  },
  headerMeta: {
    alignItems: 'flex-end',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#64748b',
    fontSize: 11,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  categoryBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#818cf8',
    fontSize: 11,
    fontWeight: '600',
  },
  surahBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  surahText: {
    color: '#818cf8',
    fontSize: 11,
  },
  sourceCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sourceCountText: {
    color: '#64748b',
    fontSize: 11,
  },
  contentContainer: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#818cf8',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
  },
  lessonsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  lessonsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 12,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  lessonText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  narrativeHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  narrativeHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
  },
  blocksContainer: {
    paddingHorizontal: 16,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b98120',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#10b98140',
  },
  completeButtonText: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b98120',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    gap: 8,
  },
  completedText: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '600',
  },
});
