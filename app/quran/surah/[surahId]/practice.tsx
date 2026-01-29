import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { getSurahById } from '../../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../../src/stores/quranStore';
import { TajweedText } from '../../../../src/components/quran/TajweedText';
import { quranAudioService, AudioState } from '../../../../src/services/quranAudioService';

export default function PracticeModeScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();

  const surah = getSurahById(surahId);
  const { ayahs, isLoading: isLoadingAyahs } = useQuranSurah(surahId);

  const { progress, isAyahLearned } = useQuranStore();

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(progress.settings.playbackSpeed);
  const [repeatCount, setRepeatCount] = useState(1);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Use ref to track values in callbacks (avoids stale closure)
  const currentRepeatRef = useRef(0);
  const repeatCountRef = useRef(1);
  const autoAdvanceRef = useRef(false);
  const currentAyahIndexRef = useRef(0);

  const currentAyah = ayahs[currentAyahIndex];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      quranAudioService.stop();
    };
  }, []);

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Surah not found</Text>
      </SafeAreaView>
    );
  }

  if (isLoadingAyahs || !currentAyah) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading verses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];
  const REPEAT_OPTIONS = [1, 2, 3, 5, 10];

  // Handle repeat completion
  const handleAudioComplete = () => {
    const current = currentRepeatRef.current;
    const total = repeatCountRef.current;

    if (current < total - 1) {
      // Increment and play again
      currentRepeatRef.current = current + 1;
      setCurrentRepeat(current + 1);
      setTimeout(() => {
        playAyahAudio();
      }, 500);
    } else {
      // Done repeating
      currentRepeatRef.current = 0;
      setCurrentRepeat(0);

      // Auto-advance to next verse if enabled
      if (autoAdvanceRef.current) {
        setTimeout(() => {
          goToNextVerse();
        }, 500);
      } else {
        setAudioState('idle');
      }
    }
  };

  // Go to next verse and auto-play
  const goToNextVerse = () => {
    const currentIndex = currentAyahIndexRef.current;
    // Loop back to first verse after last verse
    const nextIndex = currentIndex >= ayahs.length - 1 ? 0 : currentIndex + 1;

    // Update both ref and state
    currentAyahIndexRef.current = nextIndex;
    setCurrentAyahIndex(nextIndex);
    setShowHint(false);
    currentRepeatRef.current = 0;
    setCurrentRepeat(0);

    // Play the next ayah using the ref value
    const nextAyah = ayahs[nextIndex];
    if (nextAyah) {
      setTimeout(() => {
        playAyahByNumber(nextAyah.ayahNumber);
      }, 300);
    }
  };

  // Play specific ayah by number (used for auto-advance)
  const playAyahByNumber = async (ayahNumber: number) => {
    await quranAudioService.playAyah(surah.surahNumber, ayahNumber, {
      rate: playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
      },
      onComplete: handleAudioComplete,
      onError: () => {
        setAudioState('idle');
        currentRepeatRef.current = 0;
        setCurrentRepeat(0);
      },
    });
  };

  // Play/Pause full ayah using reciter audio
  const toggleAyahAudio = async () => {
    // Reset repeat counter when starting fresh
    if (audioState === 'idle') {
      currentRepeatRef.current = 0;
      setCurrentRepeat(0);
    }

    await quranAudioService.togglePlayPause(surah.surahNumber, currentAyah.ayahNumber, {
      rate: playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
      },
      onComplete: handleAudioComplete,
      onError: () => {
        setAudioState('idle');
        currentRepeatRef.current = 0;
        setCurrentRepeat(0);
      },
    });
  };

  // Play ayah (used for repeat)
  const playAyahAudio = async () => {
    await quranAudioService.playAyah(surah.surahNumber, currentAyah.ayahNumber, {
      rate: playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
      },
      onComplete: handleAudioComplete,
      onError: () => {
        setAudioState('idle');
        currentRepeatRef.current = 0;
        setCurrentRepeat(0);
      },
    });
  };

  // Helper to get the play button icon
  const getPlayIcon = () => {
    if (audioState === 'playing') return 'pause';
    return 'play';
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    quranAudioService.setRate(speed);
  };

  const handleRepeatChange = (count: number) => {
    setRepeatCount(count);
    repeatCountRef.current = count;
    setCurrentRepeat(0);
    currentRepeatRef.current = 0;
  };

  const toggleAutoAdvance = () => {
    const newValue = !autoAdvance;
    setAutoAdvance(newValue);
    autoAdvanceRef.current = newValue;
  };

  const handleNext = () => {
    quranAudioService.stop();
    currentRepeatRef.current = 0;
    setCurrentRepeat(0);
    if (currentAyahIndex < ayahs.length - 1) {
      const nextIndex = currentAyahIndex + 1;
      currentAyahIndexRef.current = nextIndex;
      setCurrentAyahIndex(nextIndex);
      setShowHint(false);
    } else {
      router.back();
    }
  };

  const handlePrevious = () => {
    quranAudioService.stop();
    currentRepeatRef.current = 0;
    setCurrentRepeat(0);
    if (currentAyahIndex > 0) {
      const prevIndex = currentAyahIndex - 1;
      currentAyahIndexRef.current = prevIndex;
      setCurrentAyahIndex(prevIndex);
      setShowHint(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.surahName}>{surah.nameArabic}</Text>
          <Text style={styles.subtitle}>Practice Mode</Text>
        </View>
        <View style={styles.headerStats}>
          <Text style={styles.statsText}>
            {currentAyahIndex + 1}/{ayahs.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle" size={20} color="#10b981" />
          <Text style={styles.instructionText}>
            Listen and practice reciting the ayah
          </Text>
        </View>

        {/* Ayah Card */}
        <View style={styles.ayahCard}>
          <View style={styles.ayahHeader}>
            <View style={styles.ayahNumber}>
              <Text style={styles.ayahNumberText}>{currentAyah.ayahNumber}</Text>
            </View>
            <Pressable
              style={[
                styles.playButton,
                audioState === 'playing' && styles.playButtonActive,
                audioState === 'paused' && styles.playButtonPaused,
              ]}
              onPress={toggleAyahAudio}
              disabled={audioState === 'loading'}
            >
              {audioState === 'loading' ? (
                <ActivityIndicator color="#10b981" size="small" />
              ) : (
                <Ionicons
                  name={getPlayIcon() as any}
                  size={20}
                  color="#10b981"
                />
              )}
            </Pressable>
          </View>

          {/* Arabic Text */}
          <View style={styles.arabicContainer}>
            <TajweedText
              text={currentAyah.textUthmani}
              tajweedRules={currentAyah.tajweedRules}
              showTajweed={progress.settings.showTajweedColors}
              fontSize={24}
            />
          </View>

          {/* Hint Button */}
          {!showHint && (
            <Pressable style={styles.hintButton} onPress={handleShowHint}>
              <Ionicons name="bulb-outline" size={18} color="#f59e0b" />
              <Text style={styles.hintButtonText}>Show Transliteration</Text>
            </Pressable>
          )}

          {/* Hint Content */}
          {showHint && (
            <View style={styles.hintContent}>
              <Text style={styles.transliteration}>{currentAyah.transliteration}</Text>
              <Text style={styles.translation}>{currentAyah.translation}</Text>
            </View>
          )}
        </View>

        {/* Audio Controls */}
        <View style={styles.controlsCard}>
          {/* Speed Control */}
          <View style={styles.controlSection}>
            <Text style={styles.controlLabel}>Speed</Text>
            <View style={styles.controlButtons}>
              {SPEED_OPTIONS.map((speed) => (
                <Pressable
                  key={speed}
                  style={[
                    styles.controlButton,
                    playbackSpeed === speed && styles.controlButtonActive,
                  ]}
                  onPress={() => handleSpeedChange(speed)}
                >
                  <Text
                    style={[
                      styles.controlButtonText,
                      playbackSpeed === speed && styles.controlButtonTextActive,
                    ]}
                  >
                    {speed}x
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Repeat Control */}
          <View style={styles.controlSection}>
            <Text style={styles.controlLabel}>Repeat</Text>
            <View style={styles.controlButtons}>
              {REPEAT_OPTIONS.map((count) => (
                <Pressable
                  key={count}
                  style={[
                    styles.controlButton,
                    repeatCount === count && styles.controlButtonActive,
                  ]}
                  onPress={() => handleRepeatChange(count)}
                >
                  <Text
                    style={[
                      styles.controlButtonText,
                      repeatCount === count && styles.controlButtonTextActive,
                    ]}
                  >
                    {count}×
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Auto-Advance Toggle */}
          <Pressable style={styles.autoAdvanceRow} onPress={toggleAutoAdvance}>
            <View style={styles.autoAdvanceInfo}>
              <Ionicons name="play-forward" size={18} color={autoAdvance ? '#10b981' : '#64748b'} />
              <Text style={[styles.autoAdvanceLabel, autoAdvance && styles.autoAdvanceLabelActive]}>
                Auto-advance to next verse
              </Text>
            </View>
            <View style={[styles.toggle, autoAdvance && styles.toggleActive]}>
              <View style={[styles.toggleThumb, autoAdvance && styles.toggleThumbActive]} />
            </View>
          </Pressable>

          {/* Current Repeat Progress */}
          {audioState !== 'idle' && repeatCount > 1 && (
            <View style={styles.repeatProgress}>
              <Ionicons name="repeat" size={16} color="#10b981" />
              <Text style={styles.repeatProgressText}>
                {currentRepeat + 1} / {repeatCount}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Pressable
          style={[styles.navButton, currentAyahIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentAyahIndex === 0}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
          <Text style={styles.navButtonText}>Previous</Text>
        </Pressable>

        <Pressable
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentAyahIndex < ayahs.length - 1 ? 'Next' : 'Finish'}
          </Text>
          <Ionicons name="arrow-forward" size={24} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  closeButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  surahName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#10b981',
    fontSize: 12,
    marginTop: 2,
  },
  headerStats: {
    padding: 8,
  },
  statsText: {
    color: '#64748b',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b98115',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    gap: 10,
  },
  instructionText: {
    color: '#94a3b8',
    fontSize: 13,
    flex: 1,
  },
  ayahCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ayahNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahNumberText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playButton: {
    padding: 8,
  },
  playButtonActive: {
    backgroundColor: '#10b98120',
    borderRadius: 8,
  },
  playButtonPaused: {
    backgroundColor: '#f59e0b20',
    borderRadius: 8,
  },
  arabicContainer: {
    marginBottom: 20,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  hintButtonText: {
    color: '#f59e0b',
    fontSize: 14,
  },
  hintContent: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  transliteration: {
    color: '#94a3b8',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  controlsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  controlSection: {
    marginBottom: 20,
  },
  controlLabel: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#334155',
    minWidth: 50,
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#10b981',
  },
  controlButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  controlButtonTextActive: {
    color: '#ffffff',
  },
  autoAdvanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  autoAdvanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  autoAdvanceLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  autoAdvanceLabelActive: {
    color: '#10b981',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#334155',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#10b981',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#64748b',
  },
  toggleThumbActive: {
    backgroundColor: '#ffffff',
    marginLeft: 20,
  },
  repeatProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 16,
    marginTop: 12,
  },
  repeatProgressText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 14,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
