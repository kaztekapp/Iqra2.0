import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getSurahById, getSurahByNumber } from '../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../src/stores/quranStore';
import { AyahCard, AyahListItem } from '../../../src/components/quran/AyahCard';
import { quranAudioService, AudioState, QURAN_RECITERS, ReciterId } from '../../../src/services/quranAudioService';

export default function SurahDetailScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [activeAyahId, setActiveAyahId] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  const [showReciterModal, setShowReciterModal] = useState(false);

  // Refs to track state in callbacks (avoids stale closures)
  const isPlayingAllRef = useRef(false);
  const currentPlayingIndexRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const ayahPositions = useRef<{ [key: string]: number }>({});
  const ayahsContainerOffset = useRef(0);

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
    setReciter,
  } = useQuranStore();

  // Get current reciter info
  const currentReciterId = progress.settings.reciterId as ReciterId;
  const currentReciter = QURAN_RECITERS[currentReciterId] || QURAN_RECITERS['mishary-alafasy'];

  // Handle reciter change
  const handleReciterChange = useCallback((reciterId: ReciterId) => {
    setReciter(reciterId);
    quranAudioService.setReciter(reciterId);
    setShowReciterModal(false);
  }, [setReciter]);

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

  // Scroll to a specific ayah
  const scrollToAyah = useCallback((ayahId: string) => {
    const position = ayahPositions.current[ayahId];
    if (position !== undefined && scrollViewRef.current) {
      const scrollY = ayahsContainerOffset.current + position - 100;
      scrollViewRef.current.scrollTo({ y: scrollY, animated: true });
    }
  }, []);

  // Play a specific ayah by index and chain to next on completion
  const playAyahAtIndex = useCallback(async (index: number) => {
    if (!surah || !ayahs[index]) return;

    const ayah = ayahs[index];
    currentPlayingIndexRef.current = index;
    setCurrentPlayingAyah(ayah.ayahNumber);
    setActiveAyahId(ayah.id);

    // Auto-scroll to the current ayah
    scrollToAyah(ayah.id);

    await quranAudioService.playAyah(surah.surahNumber, ayah.ayahNumber, {
      rate: progress.settings.playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
      },
      onComplete: () => {
        // Check if we should continue to next ayah
        if (!isPlayingAllRef.current) return;

        const nextIndex = currentPlayingIndexRef.current + 1;
        if (nextIndex < ayahs.length) {
          // Play next ayah after a short delay
          setTimeout(() => {
            playAyahAtIndex(nextIndex);
          }, 300);
        } else {
          // Finished all ayahs
          isPlayingAllRef.current = false;
          setIsPlayingAll(false);
          setCurrentPlayingAyah(null);
          setActiveAyahId(null);
          setAudioState('idle');
        }
      },
      onError: () => {
        isPlayingAllRef.current = false;
        setIsPlayingAll(false);
        setCurrentPlayingAyah(null);
        setActiveAyahId(null);
        setAudioState('idle');
      },
    });
  }, [surah, ayahs, progress.settings.playbackSpeed]);

  // Play/Stop entire surah
  const handlePlayAllToggle = useCallback(async () => {
    if (!surah) return;

    if (isPlayingAll || audioState === 'playing' || audioState === 'loading') {
      // Stop playback
      isPlayingAllRef.current = false;
      await quranAudioService.stop();
      setIsPlayingAll(false);
      setCurrentPlayingAyah(null);
      setActiveAyahId(null);
      setAudioState('idle');
    } else {
      // Start playing all ayahs from the beginning
      isPlayingAllRef.current = true;
      setIsPlayingAll(true);
      playAyahAtIndex(0);
    }
  }, [surah, isPlayingAll, audioState, playAyahAtIndex]);

  // Navigation to previous/next surah
  const handlePreviousSurah = useCallback(() => {
    if (surah && surah.surahNumber > 1) {
      const prevSurah = getSurahByNumber(surah.surahNumber - 1);
      if (prevSurah) {
        quranAudioService.stop();
        router.replace(`/quran/surah/${prevSurah.id}` as any);
      }
    }
  }, [surah]);

  const handleNextSurah = useCallback(() => {
    if (surah && surah.surahNumber < 114) {
      const nextSurah = getSurahByNumber(surah.surahNumber + 1);
      if (nextSurah) {
        quranAudioService.stop();
        router.replace(`/quran/surah/${nextSurah.id}` as any);
      }
    }
  }, [surah]);

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
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.surahNameArabic}>{surah.nameArabic}</Text>
            <Text style={styles.surahNameEnglish}>{surah.nameEnglish}</Text>
          </View>
          <View style={styles.headerNav}>
            <Pressable
              style={[styles.navButton, surah.surahNumber <= 1 && styles.navButtonDisabled]}
              onPress={handlePreviousSurah}
              disabled={surah.surahNumber <= 1}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={surah.surahNumber <= 1 ? '#334155' : '#10b981'}
              />
            </Pressable>
            <Text style={styles.surahNumber}>#{surah.surahNumber}</Text>
            <Pressable
              style={[styles.navButton, surah.surahNumber >= 114 && styles.navButtonDisabled]}
              onPress={handleNextSurah}
              disabled={surah.surahNumber >= 114}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={surah.surahNumber >= 114 ? '#334155' : '#10b981'}
              />
            </Pressable>
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

        {/* Reciter Selector */}
        <Pressable style={styles.reciterCard} onPress={() => setShowReciterModal(true)}>
          <View style={styles.reciterInfo}>
            <View style={styles.reciterIcon}>
              <Ionicons name="mic" size={20} color="#10b981" />
            </View>
            <View style={styles.reciterDetails}>
              <Text style={styles.reciterLabel}>Reciter</Text>
              <Text style={styles.reciterName}>{currentReciter.nameEnglish}</Text>
              <Text style={styles.reciterNameArabic}>{currentReciter.nameArabic}</Text>
            </View>
          </View>
          <View style={styles.reciterAction}>
            <Text style={styles.changeText}>Change</Text>
            <Ionicons name="chevron-forward" size={18} color="#64748b" />
          </View>
        </Pressable>

        {/* Reciter Selection Modal */}
        <Modal
          visible={showReciterModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowReciterModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Reciter</Text>
                <Pressable onPress={() => setShowReciterModal(false)}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </Pressable>
              </View>
              <ScrollView style={styles.reciterList}>
                {Object.values(QURAN_RECITERS).map((reciter) => (
                  <Pressable
                    key={reciter.id}
                    style={[
                      styles.reciterOption,
                      currentReciterId === reciter.id && styles.reciterOptionActive,
                    ]}
                    onPress={() => handleReciterChange(reciter.id as ReciterId)}
                  >
                    <View style={styles.reciterOptionInfo}>
                      <Text style={styles.reciterOptionName}>{reciter.nameEnglish}</Text>
                      <Text style={styles.reciterOptionArabic}>{reciter.nameArabic}</Text>
                      <View style={styles.reciterMeta}>
                        <Text style={styles.reciterStyle}>{reciter.style}</Text>
                        {reciter.recommended && (
                          <View style={styles.recommendedBadge}>
                            <Ionicons name="star" size={10} color="#f59e0b" />
                            <Text style={styles.recommendedText}>Recommended</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    {currentReciterId === reciter.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

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
          <Pressable
            style={[
              styles.playAllButton,
              (isPlayingAll || audioState === 'playing') && styles.playAllButtonActive,
            ]}
            onPress={handlePlayAllToggle}
          >
            {audioState === 'loading' && isPlayingAll ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons
                name={isPlayingAll || audioState === 'playing' ? 'stop' : 'play'}
                size={14}
                color="#ffffff"
              />
            )}
            <Text style={styles.playAllButtonText}>
              {isPlayingAll || audioState === 'playing'
                ? currentPlayingAyah
                  ? `${currentPlayingAyah}/${surah.ayahCount}`
                  : 'Stop'
                : 'Play All'}
            </Text>
          </Pressable>
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
        <View
          style={[styles.ayahsContainer, { marginBottom: 100 }]}
          onLayout={(event) => {
            ayahsContainerOffset.current = event.nativeEvent.layout.y;
          }}
        >
          {viewMode === 'cards' ? (
            ayahs.map((ayah) => (
              <View
                key={ayah.id}
                onLayout={(event) => {
                  ayahPositions.current[ayah.id] = event.nativeEvent.layout.y;
                }}
              >
                <AyahCard
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
              </View>
            ))
          ) : (
            ayahs.map((ayah) => (
              <View
                key={ayah.id}
                onLayout={(event) => {
                  ayahPositions.current[ayah.id] = event.nativeEvent.layout.y;
                }}
              >
                <AyahListItem
                  ayah={ayah}
                  isLearned={isAyahLearned(surahId, ayah.id)}
                  isMemorized={isAyahMemorized(surahId, ayah.id)}
                  onPress={() => handleAyahPress(ayah.id)}
                />
              </View>
            ))
          )}

          {/* Back to Top Button */}
          <Pressable
            style={styles.backToTopButton}
            onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
          >
            <Ionicons name="arrow-up" size={18} color="#10b981" />
            <Text style={styles.backToTopText}>Back to Top</Text>
          </Pressable>
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
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  surahNumber: {
    color: '#64748b',
    fontSize: 14,
    minWidth: 36,
    textAlign: 'center',
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
  reciterCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reciterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reciterIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reciterDetails: {
    marginLeft: 12,
    flex: 1,
  },
  reciterLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  reciterName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  reciterNameArabic: {
    color: '#10b981',
    fontSize: 14,
    marginTop: 2,
  },
  reciterAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    color: '#64748b',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reciterList: {
    padding: 16,
  },
  reciterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    marginBottom: 10,
  },
  reciterOptionActive: {
    borderWidth: 1,
    borderColor: '#10b981',
  },
  reciterOptionInfo: {
    flex: 1,
  },
  reciterOptionName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  reciterOptionArabic: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 2,
  },
  reciterMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  reciterStyle: {
    color: '#64748b',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recommendedText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '600',
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
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 5,
  },
  playAllButtonActive: {
    backgroundColor: '#ef4444',
  },
  playAllButtonText: {
    color: '#ffffff',
    fontSize: 12,
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
  backToTopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    marginHorizontal: 8,
  },
  backToTopText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
});
