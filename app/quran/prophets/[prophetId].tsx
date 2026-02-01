import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getProphetStory, hasProphetStory } from '../../../src/data/arabic/prophets';
import { SubStoryNav, StoryContentBlock } from '../../../src/components/prophetStories';
import { useProphetStoriesStore } from '../../../src/stores/prophetStoriesStore';
import { SubStory, QuranReference } from '../../../src/types/prophetStories';
import { quranAudioService, AudioState } from '../../../src/services/quranAudioService';

export default function ProphetStoryScreen() {
  const { prophetId } = useLocalSearchParams<{ prophetId: string }>();
  const scrollViewRef = useRef<ScrollView>(null);

  const [currentSubStoryId, setCurrentSubStoryId] = useState<string | null>(null);
  const [playingSourceId, setPlayingSourceId] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('idle');

  const {
    startStory,
    markSubStoryCompleted,
    getStoryProgress,
    isSubStoryCompleted,
    progress,
  } = useProphetStoriesStore();

  // Get prophet story data
  const storyData = prophetId ? getProphetStory(prophetId) : undefined;
  const hasFullStory = prophetId ? hasProphetStory(prophetId) : false;
  const prophet = storyData?.prophet;
  const subStories = storyData?.subStories || [];

  // Initialize first sub-story
  useEffect(() => {
    if (prophetId && subStories.length > 0 && !currentSubStoryId) {
      startStory(prophetId);
      const savedProgress = getStoryProgress(prophetId);
      setCurrentSubStoryId(savedProgress.currentSubStoryId || subStories[0].id);
    }
  }, [prophetId, subStories, currentSubStoryId]);

  // Current sub-story content
  const currentSubStory = subStories.find((s) => s.id === currentSubStoryId);
  const currentContent = currentSubStory?.content || [];

  // Get completed sub-stories
  const storyProgress = prophetId ? getStoryProgress(prophetId) : null;
  const completedSubStories = storyProgress?.subStoriesCompleted || [];

  // Calculate source count
  const sourceCount = currentContent.filter((block) => block.type !== 'narrative').length;

  // Handle sub-story selection
  const handleSubStorySelect = useCallback((subStoryId: string) => {
    setCurrentSubStoryId(subStoryId);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // Mark sub-story as completed when reaching the end
  const handleMarkComplete = useCallback(() => {
    if (prophetId && currentSubStoryId) {
      markSubStoryCompleted(prophetId, currentSubStoryId);
    }
  }, [prophetId, currentSubStoryId, markSubStoryCompleted]);

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

  if (!prophet) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading story...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCurrentSubStoryCompleted = currentSubStoryId
    ? isSubStoryCompleted(prophetId!, currentSubStoryId)
    : false;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <View style={styles.prophetNameRow}>
            <Text style={styles.prophetNameArabic}>{prophet.nameArabic}</Text>
            <Text style={styles.prophetNameEnglish}>{prophet.nameEnglish}</Text>
          </View>
          <Text style={styles.prophetTitle}>{prophet.title}</Text>
        </View>
        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#64748b" />
            <Text style={styles.metaText}>{prophet.estimatedReadTime} min</Text>
          </View>
        </View>
      </View>

      {/* Sub-story Navigation - only show if there are multiple sub-stories */}
      {subStories.length > 1 && currentSubStoryId && (
        <SubStoryNav
          subStories={subStories}
          currentSubStoryId={currentSubStoryId}
          completedSubStories={completedSubStories}
          onSubStorySelect={handleSubStorySelect}
        />
      )}

      {/* Story Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Sub-story Title */}
        {currentSubStory && (
          <View style={styles.subStoryHeader}>
            <Text style={styles.subStoryTitle}>{currentSubStory.title}</Text>
            {currentSubStory.titleArabic && (
              <Text style={styles.subStoryTitleArabic}>{currentSubStory.titleArabic}</Text>
            )}
            <View style={styles.subStoryMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={12} color="#64748b" />
                <Text style={styles.metaText}>{sourceCount} sources</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={12} color="#64748b" />
                <Text style={styles.metaText}>{currentSubStory.estimatedReadTime} min</Text>
              </View>
            </View>
          </View>
        )}

        {/* Content Blocks */}
        {!hasFullStory ? (
          <View style={styles.comingSoonContainer}>
            <Ionicons name="construct-outline" size={48} color="#64748b" />
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              The full story of {prophet.nameEnglish} is being prepared. Check back soon!
            </Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>{prophet.summary}</Text>
            </View>
            {prophet.lessons.length > 0 && (
              <View style={styles.lessonsCard}>
                <Text style={styles.lessonsTitle}>Key Lessons</Text>
                {prophet.lessons.map((lesson, index) => (
                  <View key={index} style={styles.lessonItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text style={styles.lessonText}>{lesson}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.blocksContainer}>
            {currentContent.map((block) => (
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
            {currentContent.length > 0 && !isCurrentSubStoryCompleted && (
              <Pressable style={styles.completeButton} onPress={handleMarkComplete}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#10b981" />
                <Text style={styles.completeButtonText}>Mark as Complete</Text>
              </Pressable>
            )}

            {isCurrentSubStoryCompleted && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.completedText}>Section Completed</Text>
              </View>
            )}
          </View>
        )}

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
  prophetNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prophetNameArabic: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  prophetNameEnglish: {
    fontSize: 18,
    color: '#cbd5e1',
  },
  prophetTitle: {
    fontSize: 12,
    color: '#818cf8',
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
  contentContainer: {
    flex: 1,
  },
  subStoryHeader: {
    padding: 20,
    paddingBottom: 12,
  },
  subStoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subStoryTitleArabic: {
    fontSize: 16,
    color: '#818cf8',
    marginTop: 4,
  },
  subStoryMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  blocksContainer: {
    paddingHorizontal: 20,
  },
  comingSoonContainer: {
    padding: 24,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    width: '100%',
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
    marginTop: 16,
    width: '100%',
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
