import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { getSurahById } from '../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../src/stores/quranStore';
import { AyahCard, AyahListItem } from '../../../src/components/quran/AyahCard';
import { quranAudioService, AudioState } from '../../../src/services/quranAudioService';

export default function SurahDetailScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [activeAyahId, setActiveAyahId] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('idle');

  // Get surah metadata from static data (always available)
  const surah = getSurahById(surahId);

  // Fetch ayahs from API (verified Quran text)
  const { ayahs, isLoading, error, refetch } = useQuranSurah(surahId);

  const {
    getSurahProgress,
    isAyahLearned,
    isAyahMemorized,
    startSurah,
    bookmarkAyah,
    unbookmarkAyah,
    progress,
  } = useQuranStore();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      quranAudioService.stop();
    };
  }, []);

  // Play/Pause ayah using reciter audio - must be before any returns
  const handlePlayAyah = useCallback(async (ayahId: string, ayahNumber: number) => {
    if (!surah) return;

    // Use togglePlayPause for smart play/pause behavior
    await quranAudioService.togglePlayPause(surah.surahNumber, ayahNumber, {
      rate: progress.settings.playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
        if (state === 'idle') {
          setActiveAyahId(null);
        } else {
          setActiveAyahId(ayahId);
        }
      },
      onComplete: () => {
        setActiveAyahId(null);
        setAudioState('idle');
      },
      onError: () => {
        setActiveAyahId(null);
        setAudioState('idle');
      },
    });
  }, [surah, progress.settings.playbackSpeed]);

  // Get surah progress - must call after useQuranStore
  const surahProgress = surah
    ? getSurahProgress(surahId)
    : { bookmarkedAyahs: [] as string[], ayahsLearned: [] as string[], ayahsMemorized: [] as string[], completionPercent: 0 };

  // Handler functions
  const handleStartLearning = useCallback(() => {
    startSurah(surahId);
    router.push(`/quran/surah/${surahId}/learn` as any);
  }, [surahId, startSurah]);

  const handlePractice = useCallback(() => {
    router.push(`/quran/surah/${surahId}/practice` as any);
  }, [surahId]);

  const handleTest = useCallback(() => {
    router.push(`/quran/surah/${surahId}/test` as any);
  }, [surahId]);

  const handleAyahPress = useCallback((ayahId: string) => {
    // Could open ayah detail or start learning from this ayah
  }, []);

  const handleBookmark = useCallback((ayahId: string) => {
    if (surahProgress.bookmarkedAyahs.includes(ayahId)) {
      unbookmarkAyah(surahId, ayahId);
    } else {
      bookmarkAyah(surahId, ayahId);
    }
  }, [surahId, surahProgress.bookmarkedAyahs, unbookmarkAyah, bookmarkAyah]);

  const handleSpeedChange = useCallback((speed: number) => {
    useQuranStore.getState().setPlaybackSpeed(speed as 0.75 | 1 | 1.25 | 1.5 | 1.75);
    quranAudioService.setRate(speed);
  }, []);

  // Early returns after all hooks
  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Surah not found</Text>
      </SafeAreaView>
    );
  }

  if (isLoading && ayahs.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading {surah.nameEnglish}...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && ayahs.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline" size={48} color="#64748b" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.surahNameArabic}>{surah.nameArabic}</Text>
            <Text style={styles.surahNameEnglish}>{surah.nameEnglish}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.surahNumber}>#{surah.surahNumber}</Text>
          </View>
        </View>

        {/* Surah Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="list" size={16} color="#10b981" />
              <Text style={styles.infoText}>{surah.ayahCount} Verses</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location" size={16} color="#10b981" />
              <Text style={styles.infoText}>{surah.revelationType}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="book" size={16} color="#10b981" />
              <Text style={styles.infoText}>Juz {surah.juz}</Text>
            </View>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>{surahProgress.completionPercent}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${surahProgress.completionPercent}%` }]}
            />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>
                {surahProgress.ayahsLearned.length}/{surah.ayahCount}
              </Text>
              <Text style={styles.progressStatLabel}>Learned</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={[styles.progressStatValue, { color: '#8b5cf6' }]}>
                {surahProgress.ayahsMemorized.length}/{surah.ayahCount}
              </Text>
              <Text style={styles.progressStatLabel}>Memorized</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.primaryButton} onPress={handleStartLearning}>
            <Ionicons name="school" size={20} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Learn</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handlePractice}>
            <Ionicons name="refresh" size={20} color="#10b981" />
            <Text style={styles.secondaryButtonText}>Practice</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleTest}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            <Text style={styles.secondaryButtonText}>Test</Text>
          </Pressable>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <Text style={styles.sectionTitle}>Verses</Text>
          <View style={styles.toggleButtons}>
            <Pressable
              style={[styles.toggleButton, viewMode === 'cards' && styles.toggleButtonActive]}
              onPress={() => setViewMode('cards')}
            >
              <Ionicons
                name="grid"
                size={18}
                color={viewMode === 'cards' ? '#ffffff' : '#64748b'}
              />
            </Pressable>
            <Pressable
              style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons
                name="list"
                size={18}
                color={viewMode === 'list' ? '#ffffff' : '#64748b'}
              />
            </Pressable>
          </View>
        </View>

        {/* Ayahs */}
        <View style={[styles.ayahsContainer, { marginBottom: 100 }]}>
          {viewMode === 'cards' ? (
            ayahs.map((ayah) => (
              <AyahCard
                key={ayah.id}
                ayah={ayah}
                showTransliteration={progress.settings.showTransliteration}
                showTranslation={progress.settings.showTranslation}
                showTajweed={progress.settings.showTajweedColors}
                isLearned={isAyahLearned(surahId, ayah.id)}
                isMemorized={isAyahMemorized(surahId, ayah.id)}
                isBookmarked={surahProgress.bookmarkedAyahs.includes(ayah.id)}
                isLoading={activeAyahId === ayah.id && audioState === 'loading'}
                isPlaying={activeAyahId === ayah.id && audioState === 'playing'}
                isPaused={activeAyahId === ayah.id && audioState === 'paused'}
                playbackSpeed={progress.settings.playbackSpeed}
                onPlay={() => handlePlayAyah(ayah.id, ayah.ayahNumber)}
                onBookmark={() => handleBookmark(ayah.id)}
                onPress={() => handleAyahPress(ayah.id)}
                onSpeedChange={handleSpeedChange}
              />
            ))
          ) : (
            ayahs.map((ayah) => (
              <AyahListItem
                key={ayah.id}
                ayah={ayah}
                isLearned={isAyahLearned(surahId, ayah.id)}
                isMemorized={isAyahMemorized(surahId, ayah.id)}
                onPress={() => handleAyahPress(ayah.id)}
              />
            ))
          )}
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
  errorText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  retryButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  surahNameArabic: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  surahNameEnglish: {
    color: '#10b981',
    fontSize: 14,
    marginTop: 2,
  },
  headerInfo: {
    padding: 8,
  },
  surahNumber: {
    color: '#64748b',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  bismillah: {
    color: '#10b981',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  progressPercent: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatValue: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressStatLabel: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#10b98120',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryButtonText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1e293b',
  },
  toggleButtonActive: {
    backgroundColor: '#10b981',
  },
  ayahsContainer: {
    paddingHorizontal: 12,
  },
});
