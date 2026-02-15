import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAudioPlayerStore } from '../../stores/audioPlayerStore';
import { quranAudioService } from '../../services/quranAudioService';
import { getSurahByNumber } from '../../data/arabic/quran';

export function MiniAudioPlayer() {
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const {
    currentlyPlaying,
    isPlaying,
    isPaused,
    isLoading,
    progress,
    setCurrentlyPlaying,
    updatePlaybackState,
    clearPlayer,
  } = useAudioPlayerStore();

  const slideAnim = useRef(new Animated.Value(100)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Detect if tab bar is visible (we're in the tabs section)
  const isInTabs = segments[0] === '(tabs)';
  const tabBarHeight = Platform.OS === 'ios' ? 60 : 60;
  const tabBarPadding = Platform.OS === 'ios' ? 28 : Math.max(insets.bottom, 24);
  const bottomOffset = isInTabs
    ? tabBarHeight + tabBarPadding
    : insets.bottom;

  // Animate in/out
  useEffect(() => {
    if (currentlyPlaying) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 100,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    }
  }, [currentlyPlaying, isPlaying, isPaused, isLoading]);

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handlePlayPause = async () => {
    if (!currentlyPlaying) return;

    if (isPlaying) {
      await quranAudioService.pause();
      updatePlaybackState({ isPaused: true, isPlaying: false, isLoading: false });
    } else if (isPaused) {
      await quranAudioService.resume();
      updatePlaybackState({ isPlaying: true, isPaused: false, isLoading: false });
    }
  };

  const handleClose = async () => {
    await quranAudioService.stop();
    clearPlayer();
  };

  // Auto-advance to next surah when current one finishes
  const advanceToNextSurah = (currentSurahNumber: number) => {
    if (currentSurahNumber >= 114) {
      // Reached end of Quran
      updatePlaybackState({ isPlaying: false, isPaused: false, isLoading: false });
      clearPlayer();
      return;
    }

    const nextSurah = getSurahByNumber(currentSurahNumber + 1);
    if (!nextSurah) {
      clearPlayer();
      return;
    }

    const store = useAudioPlayerStore.getState();
    setCurrentlyPlaying({
      surahId: nextSurah.id,
      surahNumber: nextSurah.surahNumber,
      surahNameArabic: nextSurah.nameArabic,
      surahNameEnglish: nextSurah.nameEnglish,
      ayahNumber: 1,
      totalAyahs: nextSurah.ayahCount,
      reciterName: store.currentlyPlaying?.reciterName || '',
      reciterNameArabic: store.currentlyPlaying?.reciterNameArabic || '',
      isPlayingAll: true,
    });

    playAyahContinuously(nextSurah.surahNumber, 1, nextSurah.ayahCount);
  };

  // Play an ayah and auto-advance to the next one
  const playAyahContinuously = async (surahNumber: number, ayahNumber: number, totalAyahs: number) => {
    const store = useAudioPlayerStore.getState();
    if (store.currentlyPlaying) {
      setCurrentlyPlaying({ ...store.currentlyPlaying, ayahNumber });
    }
    updatePlaybackState({ isLoading: true, isPlaying: false, isPaused: false });

    await quranAudioService.playAyah(surahNumber, ayahNumber, {
      onStateChange: (state) => {
        if (state === 'playing') updatePlaybackState({ isPlaying: true, isLoading: false, isPaused: false });
        else if (state === 'paused') updatePlaybackState({ isPaused: true, isLoading: false, isPlaying: false });
      },
      onComplete: () => {
        // Chain immediately — no gap keeps the audio session alive for background playback
        if (ayahNumber < totalAyahs) {
          playAyahContinuously(surahNumber, ayahNumber + 1, totalAyahs);
        } else {
          // Surah finished — auto-advance to next surah
          advanceToNextSurah(surahNumber);
        }
      },
      onError: () => clearPlayer(),
    });
  };

  const handlePreviousAyah = async () => {
    if (!currentlyPlaying || currentlyPlaying.ayahNumber <= 1) return;
    const newAyah = currentlyPlaying.ayahNumber - 1;
    playAyahContinuously(currentlyPlaying.surahNumber, newAyah, currentlyPlaying.totalAyahs);
  };

  const handleNextAyah = async () => {
    if (!currentlyPlaying || currentlyPlaying.ayahNumber >= currentlyPlaying.totalAyahs) return;
    const newAyah = currentlyPlaying.ayahNumber + 1;
    playAyahContinuously(currentlyPlaying.surahNumber, newAyah, currentlyPlaying.totalAyahs);
  };

  const handlePreviousSurah = async () => {
    if (!currentlyPlaying || currentlyPlaying.surahNumber <= 1) return;
    const prevSurah = getSurahByNumber(currentlyPlaying.surahNumber - 1);
    if (!prevSurah) return;

    setCurrentlyPlaying({
      surahId: prevSurah.id,
      surahNumber: prevSurah.surahNumber,
      surahNameArabic: prevSurah.nameArabic,
      surahNameEnglish: prevSurah.nameEnglish,
      ayahNumber: 1,
      totalAyahs: prevSurah.ayahCount,
      reciterName: currentlyPlaying.reciterName,
      reciterNameArabic: currentlyPlaying.reciterNameArabic,
      isPlayingAll: true,
    });
    updatePlaybackState({ isLoading: true, isPlaying: false, isPaused: false });
    await quranAudioService.stop();

    if (router.canGoBack()) {
      router.replace(`/quran/surah/${prevSurah.id}` as any);
    } else {
      router.push(`/quran/surah/${prevSurah.id}` as any);
    }

    setTimeout(() => {
      playAyahContinuously(prevSurah.surahNumber, 1, prevSurah.ayahCount);
    }, 500);
  };

  const handleNextSurah = async () => {
    if (!currentlyPlaying || currentlyPlaying.surahNumber >= 114) return;
    const nextSurah = getSurahByNumber(currentlyPlaying.surahNumber + 1);
    if (!nextSurah) return;

    setCurrentlyPlaying({
      surahId: nextSurah.id,
      surahNumber: nextSurah.surahNumber,
      surahNameArabic: nextSurah.nameArabic,
      surahNameEnglish: nextSurah.nameEnglish,
      ayahNumber: 1,
      totalAyahs: nextSurah.ayahCount,
      reciterName: currentlyPlaying.reciterName,
      reciterNameArabic: currentlyPlaying.reciterNameArabic,
      isPlayingAll: true,
    });
    updatePlaybackState({ isLoading: true, isPlaying: false, isPaused: false });
    await quranAudioService.stop();

    if (router.canGoBack()) {
      router.replace(`/quran/surah/${nextSurah.id}` as any);
    } else {
      router.push(`/quran/surah/${nextSurah.id}` as any);
    }

    setTimeout(() => {
      playAyahContinuously(nextSurah.surahNumber, 1, nextSurah.ayahCount);
    }, 500);
  };

  const handleNavigateToSurah = () => {
    if (currentlyPlaying) {
      router.push(`/quran/surah/${currentlyPlaying.surahId}` as any);
    }
  };

  if (!currentlyPlaying) return null;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      {/* Main Content */}
      <Pressable style={styles.content} onPress={handleNavigateToSurah}>
        {/* Ayah Number Badge */}
        <View style={styles.ayahBadge}>
          <Text style={styles.ayahNumberText}>{currentlyPlaying.ayahNumber}</Text>
        </View>

        {/* Surah Info */}
        <View style={styles.info}>
          <Text style={styles.surahArabic} numberOfLines={1}>
            {currentlyPlaying.surahNameArabic}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.surahName} numberOfLines={1}>
              {currentlyPlaying.surahNameEnglish}
              {currentlyPlaying.isPlayingAll && `: ${currentlyPlaying.ayahNumber}`}
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.reciter} numberOfLines={1}>
              {currentlyPlaying.reciterName}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {/* Previous Surah */}
          <Pressable
            style={[styles.skipButton, currentlyPlaying.surahNumber <= 1 && styles.disabledButton]}
            disabled={currentlyPlaying.surahNumber <= 1}
            onPress={(e) => { e.stopPropagation(); handlePreviousSurah(); }}
          >
            <Ionicons name="play-skip-back" size={14} color={currentlyPlaying.surahNumber > 1 ? '#a3a398' : '#3a3a32'} />
          </Pressable>

          {/* Previous Ayah */}
          <Pressable
            style={[styles.controlButton, currentlyPlaying.ayahNumber <= 1 && styles.disabledButton]}
            disabled={currentlyPlaying.ayahNumber <= 1}
            onPress={(e) => { e.stopPropagation(); handlePreviousAyah(); }}
          >
            <Ionicons name="chevron-back" size={18} color={currentlyPlaying.ayahNumber > 1 ? '#f5f5f0' : '#3a3a32'} />
          </Pressable>

          {/* Play/Pause */}
          <Pressable
            style={styles.playPauseButton}
            onPress={(e) => { e.stopPropagation(); handlePlayPause(); }}
          >
            {isLoading ? (
              <View style={styles.loadingIndicator}>
                <View style={styles.loadingDot} />
                <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
                <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
              </View>
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#ffffff" />
            )}
          </Pressable>

          {/* Next Ayah */}
          <Pressable
            style={[styles.controlButton, currentlyPlaying.ayahNumber >= currentlyPlaying.totalAyahs && styles.disabledButton]}
            disabled={currentlyPlaying.ayahNumber >= currentlyPlaying.totalAyahs}
            onPress={(e) => { e.stopPropagation(); handleNextAyah(); }}
          >
            <Ionicons name="chevron-forward" size={18} color={currentlyPlaying.ayahNumber < currentlyPlaying.totalAyahs ? '#f5f5f0' : '#3a3a32'} />
          </Pressable>

          {/* Next Surah */}
          <Pressable
            style={[styles.skipButton, currentlyPlaying.surahNumber >= 114 && styles.disabledButton]}
            disabled={currentlyPlaying.surahNumber >= 114}
            onPress={(e) => { e.stopPropagation(); handleNextSurah(); }}
          >
            <Ionicons name="play-skip-forward" size={14} color={currentlyPlaying.surahNumber < 114 ? '#a3a398' : '#3a3a32'} />
          </Pressable>

          {/* Close */}
          <Pressable
            style={styles.closeButton}
            onPress={(e) => { e.stopPropagation(); handleClose(); }}
          >
            <Ionicons name="close" size={18} color="#6b6b60" />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a24',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 999,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: '#2a2a24',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  ayahBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#161613',
    borderWidth: 2,
    borderColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahNumberText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  surahArabic: {
    color: '#f5f5f0',
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  surahName: {
    color: '#a3a398',
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  separator: {
    color: '#6b6b60',
    fontSize: 10,
  },
  reciter: {
    color: '#6b6b60',
    fontSize: 11,
    flexShrink: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skipButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  loadingIndicator: {
    flexDirection: 'row',
    gap: 4,
  },
  loadingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    opacity: 0.4,
  },
  loadingDotDelay1: {
    opacity: 0.6,
  },
  loadingDotDelay2: {
    opacity: 0.8,
  },
});
