import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { getSurahById } from '../../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../../src/stores/quranStore';
import { TajweedText, WordByWordText } from '../../../../src/components/quran/TajweedText';
import { quranAudioService, AudioState, QURAN_RECITERS } from '../../../../src/services/quranAudioService';

type LearnPhase = 'listen_full' | 'listen_word' | 'repeat' | 'next';

export default function LearnModeScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();

  const surah = getSurahById(surahId);
  const { ayahs, isLoading: isLoadingAyahs } = useQuranSurah(surahId);

  const { markAyahLearned, progress, isAyahLearned } = useQuranStore();

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [phase, setPhase] = useState<LearnPhase>('listen_full');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [repeatCount, setRepeatCount] = useState(0);

  const currentAyah = ayahs[currentAyahIndex];

  // Find first unlearned ayah to start from
  useEffect(() => {
    const firstUnlearned = ayahs.findIndex(
      (ayah) => !isAyahLearned(surahId, ayah.id)
    );
    if (firstUnlearned > 0) {
      setCurrentAyahIndex(firstUnlearned);
    }
  }, []);

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

  // Play/Pause ayah using real reciter audio
  const toggleAyahAudio = async () => {
    await quranAudioService.togglePlayPause(surah.surahNumber, currentAyah.ayahNumber, {
      rate: progress.settings.playbackSpeed,
      onStateChange: (state) => {
        setAudioState(state);
      },
      onComplete: () => {
        setAudioState('idle');
        if (phase === 'listen_full') {
          setPhase('listen_word');
          setCurrentWordIndex(0);
        }
      },
      onError: (error) => {
        console.error('Playback error:', error);
        setAudioState('idle');
      },
    });
  };

  // Helper to get play button icon
  const getPlayIcon = () => {
    if (audioState === 'playing') return 'pause';
    return 'play';
  };

  // For word-by-word, use TTS as fallback (since word-level audio isn't available)
  const playWord = async (index: number) => {
    const word = currentAyah.words[index];
    if (!word) return;

    setAudioState('playing');
    setCurrentWordIndex(index);

    // Use TTS for individual words (reciter audio is ayah-level)
    await Speech.speak(word.text, {
      language: 'ar',
      rate: 0.6, // Slower for learning
      onDone: () => {
        setAudioState('idle');
      },
      onError: () => setAudioState('idle'),
    });
  };

  const handleNextWord = () => {
    if (currentWordIndex < currentAyah.words.length - 1) {
      playWord(currentWordIndex + 1);
    } else {
      // Finished all words
      setPhase('repeat');
      setRepeatCount(0);
    }
  };

  const handleRepeat = async () => {
    setRepeatCount((prev) => prev + 1);
    await toggleAyahAudio();
  };

  const handleMarkComplete = () => {
    markAyahLearned(surahId, currentAyah.id);
    setPhase('next');
  };

  const handleNextAyah = () => {
    if (currentAyahIndex < ayahs.length - 1) {
      setCurrentAyahIndex(currentAyahIndex + 1);
      setPhase('listen_full');
      setCurrentWordIndex(0);
      setRepeatCount(0);
    } else {
      // Completed all ayahs
      router.back();
    }
  };

  const handlePreviousAyah = () => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex(currentAyahIndex - 1);
      setPhase('listen_full');
      setCurrentWordIndex(0);
      setRepeatCount(0);
    }
  };

  const stopPlayback = async () => {
    await quranAudioService.stop();
    Speech.stop();
    setAudioState('idle');
  };

  const getPhaseTitle = () => {
    switch (phase) {
      case 'listen_full':
        return 'Listen to the full ayah';
      case 'listen_word':
        return 'Listen word by word';
      case 'repeat':
        return 'Repeat after the recitation';
      case 'next':
        return 'Great job! Move to next ayah';
      default:
        return '';
    }
  };

  const getPhaseIcon = () => {
    switch (phase) {
      case 'listen_full':
        return 'ear';
      case 'listen_word':
        return 'text';
      case 'repeat':
        return 'mic';
      case 'next':
        return 'checkmark-circle';
      default:
        return 'play';
    }
  };

  // Get current reciter info
  const currentReciter = QURAN_RECITERS[quranAudioService.getReciter()];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.surahName}>{surah.nameArabic}</Text>
          <Text style={styles.ayahCount}>
            Ayah {currentAyahIndex + 1} of {ayahs.length}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.settingsButton}
            onPress={() => {/* Toggle settings */}}
          >
            <Ionicons name="settings-outline" size={22} color="#64748b" />
          </Pressable>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentAyahIndex + 1) / ayahs.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Reciter Info */}
      <View style={styles.reciterInfo}>
        <Ionicons name="person" size={14} color="#64748b" />
        <Text style={styles.reciterName}>{currentReciter.nameEnglish}</Text>
      </View>

      {/* Phase Indicator */}
      <View style={styles.phaseContainer}>
        <View style={styles.phaseIcon}>
          <Ionicons name={getPhaseIcon() as any} size={24} color="#10b981" />
        </View>
        <Text style={styles.phaseTitle}>{getPhaseTitle()}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Arabic Text */}
        <View style={styles.ayahContainer}>
          {phase === 'listen_word' ? (
            <WordByWordText
              words={currentAyah.words}
              currentWordIndex={currentWordIndex}
              showTransliteration={progress.settings.showTransliteration}
              showTranslation={progress.settings.showTranslation}
              fontSize={26}
              onWordPress={playWord}
            />
          ) : (
            <TajweedText
              text={currentAyah.textUthmani}
              tajweedRules={currentAyah.tajweedRules}
              showTajweed={progress.settings.showTajweedColors}
              fontSize={32}
            />
          )}
        </View>

        {/* Transliteration & Translation */}
        {progress.settings.showTransliteration && phase !== 'listen_word' && (
          <Text style={styles.transliteration}>{currentAyah.transliteration}</Text>
        )}
        {progress.settings.showTranslation && phase !== 'listen_word' && (
          <Text style={styles.translation}>{currentAyah.translation}</Text>
        )}

        {/* Repeat Counter */}
        {phase === 'repeat' && (
          <View style={styles.repeatCounter}>
            <Text style={styles.repeatLabel}>Repeats</Text>
            <Text style={styles.repeatCount}>{repeatCount}/3</Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Navigation */}
        <View style={styles.navigation}>
          <Pressable
            style={[styles.navButton, currentAyahIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePreviousAyah}
            disabled={currentAyahIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={currentAyahIndex === 0 ? '#334155' : '#ffffff'}
            />
          </Pressable>

          {/* Main Action Button */}
          {phase === 'listen_full' && (
            <Pressable
              style={[
                styles.mainButton,
                audioState === 'playing' && styles.mainButtonPlaying,
                audioState === 'paused' && styles.mainButtonPaused,
              ]}
              onPress={toggleAyahAudio}
              disabled={audioState === 'loading'}
            >
              {audioState === 'loading' ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Ionicons name={getPlayIcon() as any} size={32} color="#ffffff" />
              )}
            </Pressable>
          )}

          {phase === 'listen_word' && (
            <Pressable
              style={styles.mainButton}
              onPress={audioState === 'playing' ? stopPlayback : handleNextWord}
            >
              <Text style={styles.mainButtonText}>
                {currentWordIndex === 0 ? 'Start' : 'Next Word'}
              </Text>
            </Pressable>
          )}

          {phase === 'repeat' && (
            <Pressable
              style={[
                styles.mainButton,
                audioState === 'playing' && styles.mainButtonPlaying,
              ]}
              onPress={repeatCount >= 3 ? handleMarkComplete : handleRepeat}
              disabled={audioState === 'loading'}
            >
              {audioState === 'loading' ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.mainButtonText}>
                  {repeatCount >= 3 ? 'Complete' : 'Repeat'}
                </Text>
              )}
            </Pressable>
          )}

          {phase === 'next' && (
            <Pressable style={styles.mainButton} onPress={handleNextAyah}>
              <Text style={styles.mainButtonText}>
                {currentAyahIndex < ayahs.length - 1 ? 'Next Ayah' : 'Finish'}
              </Text>
            </Pressable>
          )}

          <Pressable
            style={[
              styles.navButton,
              currentAyahIndex === ayahs.length - 1 && styles.navButtonDisabled,
            ]}
            onPress={handleNextAyah}
            disabled={currentAyahIndex === ayahs.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={currentAyahIndex === ayahs.length - 1 ? '#334155' : '#ffffff'}
            />
          </Pressable>
        </View>

        {/* Speed Control */}
        <View style={styles.speedControl}>
          <Text style={styles.speedLabel}>Speed</Text>
          <View style={styles.speedButtons}>
            {[0.5, 0.75, 1].map((speed) => (
              <Pressable
                key={speed}
                style={[
                  styles.speedButton,
                  progress.settings.playbackSpeed === speed && styles.speedButtonActive,
                ]}
                onPress={() => {
                  useQuranStore.getState().setPlaybackSpeed(speed as any);
                  quranAudioService.setRate(speed);
                }}
              >
                <Text
                  style={[
                    styles.speedButtonText,
                    progress.settings.playbackSpeed === speed && styles.speedButtonTextActive,
                  ]}
                >
                  {speed}x
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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
  ayahCount: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    padding: 8,
  },
  settingsButton: {
    padding: 4,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  reciterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  reciterName: {
    color: '#64748b',
    fontSize: 12,
  },
  phaseContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  phaseIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  phaseTitle: {
    color: '#94a3b8',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ayahContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    minHeight: 150,
    justifyContent: 'center',
  },
  transliteration: {
    color: '#94a3b8',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  repeatCounter: {
    alignItems: 'center',
    marginTop: 20,
  },
  repeatLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  repeatCount: {
    color: '#10b981',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#1e293b50',
  },
  mainButton: {
    width: 120,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  mainButtonPlaying: {
    backgroundColor: '#3b82f6',
  },
  mainButtonPaused: {
    backgroundColor: '#f59e0b',
  },
  mainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  speedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  speedLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  speedButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  speedButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1e293b',
  },
  speedButtonActive: {
    backgroundColor: '#10b981',
  },
  speedButtonText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  speedButtonTextActive: {
    color: '#ffffff',
  },
});
