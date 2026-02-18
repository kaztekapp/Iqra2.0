import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { getSurahById } from '../../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../../src/stores/quranStore';
import { TajweedText } from '../../../../src/components/quran/TajweedText';
import { quranAudioService, AudioState, QURAN_RECITERS, ReciterId } from '../../../../src/services/quranAudioService';
import { useAudioPlayerStore, startContinuousPlay } from '../../../../src/stores/audioPlayerStore';
import { useTranslation } from 'react-i18next';

export default function LearnModeScreen() {
  const { t } = useTranslation();
  const { surahId } = useLocalSearchParams<{ surahId: string }>();

  const surah = getSurahById(surahId);
  const { ayahs, isLoading: isLoadingAyahs } = useQuranSurah(surahId);

  const { progress, isAyahLearned } = useQuranStore();
  const { currentlyPlaying, setCurrentlyPlaying, updatePlaybackState, clearPlayer } = useAudioPlayerStore();

  // Get current reciter info for the mini player
  const currentReciterId = progress.settings.reciterId as ReciterId;
  const currentReciter = QURAN_RECITERS[currentReciterId] || QURAN_RECITERS['mishary-alafasy'];

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(progress.settings.playbackSpeed);
  const [repeatCount, setRepeatCount] = useState(1);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Verse range selection (1-indexed verse numbers)
  const [startVerse, setStartVerse] = useState(1);
  const [endVerse, setEndVerse] = useState(ayahs.length || 1);
  const [startVerseInput, setStartVerseInput] = useState('1');
  const [endVerseInput, setEndVerseInput] = useState(String(ayahs.length || 1));
  const [showRangeSelector, setShowRangeSelector] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Use ref to track values in callbacks (avoids stale closure)
  const currentRepeatRef = useRef(0);
  const repeatCountRef = useRef(1);
  const autoAdvanceRef = useRef(false);
  const currentAyahIndexRef = useRef(0);
  const startVerseRef = useRef(1);
  const endVerseRef = useRef(ayahs.length || 1);
  const isPlayingRef = useRef(false);
  const playbackSpeedRef = useRef(playbackSpeed);

  const currentAyah = ayahs[currentAyahIndex];

  // Update end verse when ayahs load
  useEffect(() => {
    if (ayahs.length > 0 && endVerse === 1) {
      setEndVerse(ayahs.length);
      setEndVerseInput(String(ayahs.length));
      endVerseRef.current = ayahs.length;
    }
  }, [ayahs.length]);

  // Sync learn screen UI when mini player / startContinuousPlay advances ayahs
  const storeAyahNumber = useAudioPlayerStore((s) => s.currentlyPlaying?.ayahNumber);
  useEffect(() => {
    if (storeAyahNumber && ayahs.length > 0) {
      const idx = ayahs.findIndex(a => a.ayahNumber === storeAyahNumber);
      if (idx !== -1 && idx !== currentAyahIndexRef.current) {
        currentAyahIndexRef.current = idx;
        setCurrentAyahIndex(idx);
      }
    }
  }, [storeAyahNumber, ayahs]);

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('surahLearnMode.surahNotFound')}</Text>
      </SafeAreaView>
    );
  }

  if (isLoadingAyahs || !currentAyah) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>{t('surahLearnMode.loadingVerses')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 1.75];
  const REPEAT_OPTIONS = [1, 2, 3, 5, 10];

  // Play a specific ayah and chain immediately on complete (same pattern as surah screen)
  const playLearnAyah = (ayahNumber: number) => {
    if (!isPlayingRef.current) return;

    // Update global audio player — isPlayingAll: true keeps audio session alive
    setCurrentlyPlaying({
      surahId: surah.id,
      surahNumber: surah.surahNumber,
      surahNameArabic: surah.nameArabic,
      surahNameEnglish: surah.nameEnglish,
      ayahNumber,
      totalAyahs: surah.ayahCount,
      reciterName: currentReciter.nameEnglish,
      reciterNameArabic: currentReciter.nameArabic,
      isPlayingAll: true,
      source: 'learn',
    });

    quranAudioService.playAyah(surah.surahNumber, ayahNumber, {
      rate: playbackSpeedRef.current,
      onStateChange: (state) => {
        setAudioState(state);
        if (state === 'loading') updatePlaybackState({ isLoading: true, isPlaying: false, isPaused: false });
        else if (state === 'playing') updatePlaybackState({ isPlaying: true, isLoading: false, isPaused: false });
        else if (state === 'paused') updatePlaybackState({ isPaused: true, isLoading: false, isPlaying: false });
      },
      onComplete: () => {
        // Chain immediately — no gap keeps audio session alive for background playback
        if (!isPlayingRef.current) return;

        const current = currentRepeatRef.current;
        const total = repeatCountRef.current;

        if (current < total - 1) {
          // Repeat same ayah — chain immediately
          currentRepeatRef.current = current + 1;
          setCurrentRepeat(current + 1);
          playLearnAyah(ayahNumber);
        } else {
          // Done repeating
          currentRepeatRef.current = 0;
          setCurrentRepeat(0);

          if (autoAdvanceRef.current) {
            // Auto-advance — chain immediately to next verse
            const currentIndex = currentAyahIndexRef.current;
            const startIdx = startVerseRef.current - 1;
            const endIdx = endVerseRef.current - 1;

            let nextIndex: number;
            if (currentIndex >= endIdx) {
              nextIndex = startIdx; // Loop back
            } else {
              nextIndex = currentIndex + 1;
            }

            currentAyahIndexRef.current = nextIndex;
            setCurrentAyahIndex(nextIndex);
            setShowHint(false);

            const nextAyah = ayahs[nextIndex];
            if (nextAyah) {
              playLearnAyah(nextAyah.ayahNumber);
            }
          } else {
            // No auto-advance — continue through surah but stop at the end
            if (ayahNumber < surah.ayahCount) {
              const nextIdx = currentAyahIndexRef.current + 1;
              currentAyahIndexRef.current = nextIdx;
              setCurrentAyahIndex(nextIdx);
              setShowHint(false);
              playLearnAyah(ayahNumber + 1);
            } else {
              // Surah finished — stop
              isPlayingRef.current = false;
              setAudioState('idle');
              clearPlayer();
            }
          }
        }
      },
      onError: () => {
        isPlayingRef.current = false;
        setAudioState('idle');
        currentRepeatRef.current = 0;
        setCurrentRepeat(0);
        clearPlayer();
      },
    });
  };

  // Play/Pause toggle for the current ayah
  const toggleAyahAudio = async () => {
    if (audioState === 'playing') {
      // Pause
      await quranAudioService.pause();
      setAudioState('paused');
      updatePlaybackState({ isPaused: true, isPlaying: false, isLoading: false });
      return;
    }

    if (audioState === 'paused') {
      // Resume
      await quranAudioService.resume();
      setAudioState('playing');
      updatePlaybackState({ isPlaying: true, isPaused: false, isLoading: false });
      return;
    }

    // Start fresh
    currentRepeatRef.current = 0;
    setCurrentRepeat(0);
    isPlayingRef.current = true;
    playLearnAyah(currentAyah.ayahNumber);
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
    playbackSpeedRef.current = speed;
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

  const handleStartVerseChange = (verse: number) => {
    const validVerse = Math.max(1, Math.min(verse, endVerse));
    setStartVerse(validVerse);
    setStartVerseInput(String(validVerse));
    startVerseRef.current = validVerse;
    // Jump to start verse if current is before it
    if (currentAyahIndex < validVerse - 1) {
      const newIndex = validVerse - 1;
      currentAyahIndexRef.current = newIndex;
      setCurrentAyahIndex(newIndex);
    }
  };

  const handleEndVerseChange = (verse: number) => {
    const validVerse = Math.max(startVerse, Math.min(verse, ayahs.length));
    setEndVerse(validVerse);
    setEndVerseInput(String(validVerse));
    endVerseRef.current = validVerse;
    // Jump to end verse if current is after it
    if (currentAyahIndex > validVerse - 1) {
      const newIndex = validVerse - 1;
      currentAyahIndexRef.current = newIndex;
      setCurrentAyahIndex(newIndex);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close learn mode">
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.surahName}>{surah.nameArabic}</Text>
          <Text style={styles.subtitle}>{t('surahLearnMode.learnMode')}</Text>
        </View>
        <View style={styles.headerStats}>
          <Text style={styles.statsText}>
            {currentAyahIndex + 1}/{ayahs.length}
          </Text>
          {(startVerse !== 1 || endVerse !== ayahs.length) && (
            <Text style={styles.rangeIndicator}>
              ({startVerse}-{endVerse})
            </Text>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* How to Use Guide */}
        <Pressable
          style={styles.guideHeader}
          onPress={() => setShowGuide(!showGuide)}
          accessibilityRole="button"
          accessibilityLabel={showGuide ? `${t('surahLearnMode.howToUse')}, collapse` : `${t('surahLearnMode.howToUse')}, expand`}
        >
          <View style={styles.guideHeaderLeft}>
            <View style={styles.guideIconBg}>
              <Ionicons name="book-outline" size={16} color="#10b981" />
            </View>
            <Text style={styles.guideHeaderText}>{t('surahLearnMode.howToUse')}</Text>
          </View>
          <Ionicons
            name={showGuide ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#6b6b60"
          />
        </Pressable>

        {showGuide && (
          <View style={styles.guideContent}>
            {/* Play/Pause */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="play" size={14} color="#10b981" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guidePlayPauseTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guidePlayPauseDesc')}</Text>
              </View>
            </View>

            {/* Speed */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="speedometer-outline" size={14} color="#f59e0b" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guideSpeedTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guideSpeedDesc')}</Text>
              </View>
            </View>

            {/* Repeat */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="repeat" size={14} color="#14b8a6" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guideRepeatTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guideRepeatDesc')}</Text>
              </View>
            </View>

            {/* Auto-Advance */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="arrow-forward" size={14} color="#fb923c" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guideAutoAdvanceTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guideAutoAdvanceDesc')}</Text>
              </View>
            </View>

            {/* Verse Range */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="options-outline" size={14} color="#34d399" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guideVerseRangeTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guideVerseRangeDesc')}</Text>
              </View>
            </View>

            {/* Background Playback */}
            <View style={styles.guideItem}>
              <View style={styles.guideItemIcon}>
                <Ionicons name="musical-notes-outline" size={14} color="#2dd4bf" />
              </View>
              <View style={styles.guideItemText}>
                <Text style={styles.guideItemTitle}>{t('surahLearnMode.guideBackgroundTitle')}</Text>
                <Text style={styles.guideItemDesc}>{t('surahLearnMode.guideBackgroundDesc')}</Text>
              </View>
            </View>

            {/* Tip */}
            <View style={styles.guideTip}>
              <Ionicons name="bulb-outline" size={16} color="#fbbf24" />
              <Text style={styles.guideTipText}>{t('surahLearnMode.guideTip')}</Text>
            </View>
          </View>
        )}

        {/* Ayah Card */}
        <View style={styles.ayahCard}>
          <View style={styles.ayahHeader}>
            <View style={styles.ayahNumber}>
              <Text style={styles.ayahNumberText}>{currentAyah.ayahNumber}</Text>
            </View>
            <Pressable
              style={[
                styles.ayahPlayButton,
                audioState === 'playing' && styles.ayahPlayButtonActive,
                audioState === 'paused' && styles.ayahPlayButtonPaused,
              ]}
              onPress={toggleAyahAudio}
              disabled={audioState === 'loading'}
              accessibilityRole="button"
              accessibilityLabel={audioState === 'playing' ? 'Pause ayah audio' : audioState === 'paused' ? 'Resume ayah audio' : 'Play ayah audio'}
            >
              {audioState === 'loading' ? (
                <ActivityIndicator color="#10b981" size="small" />
              ) : (
                <Ionicons
                  name={getPlayIcon() as any}
                  size={18}
                  color={audioState === 'playing' ? '#ffffff' : audioState === 'paused' ? '#f59e0b' : '#10b981'}
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

        </View>

        {/* Audio Controls */}
        <View style={styles.controlsCard}>
          {/* Verse Range Selector */}
          <Pressable
            style={styles.rangeSelectorHeader}
            onPress={() => setShowRangeSelector(!showRangeSelector)}
            accessibilityRole="button"
            accessibilityLabel={showRangeSelector ? `${t('surahLearnMode.verseRange')}, collapse` : `${t('surahLearnMode.verseRange')}, expand`}
          >
            <View style={styles.rangeSelectorInfo}>
              <Ionicons name="options" size={18} color="#10b981" />
              <Text style={styles.rangeSelectorTitle}>
                {t('surahLearnMode.verseRange')} {startVerse} - {endVerse}
              </Text>
            </View>
            <Ionicons
              name={showRangeSelector ? "chevron-up" : "chevron-down"}
              size={18}
              color="#cbd5e1"
            />
          </Pressable>

          {showRangeSelector && (
            <View style={styles.rangeControls}>
              {/* Start Verse */}
              <View style={styles.rangeRow}>
                <Text style={styles.rangeLabel}>{t('surahLearnMode.start')}</Text>
                <View style={styles.rangeInputContainer}>
                  <Pressable
                    style={[styles.rangeButton, startVerse <= 1 && styles.rangeButtonDisabled]}
                    onPress={() => handleStartVerseChange(startVerse - 1)}
                    disabled={startVerse <= 1}
                    accessibilityRole="button"
                    accessibilityLabel="Decrease start verse"
                  >
                    <Ionicons name="remove" size={16} color={startVerse <= 1 ? '#475569' : '#ffffff'} />
                  </Pressable>
                  <TextInput
                    style={styles.rangeInput}
                    value={startVerseInput}
                    onChangeText={(text) => {
                      // Allow empty and numeric input while typing
                      if (text === '' || /^\d+$/.test(text)) {
                        setStartVerseInput(text);
                      }
                    }}
                    onBlur={() => {
                      // Validate on blur
                      const num = parseInt(startVerseInput, 10);
                      if (!isNaN(num) && num >= 1) {
                        handleStartVerseChange(num);
                      } else {
                        // Reset to current valid value
                        setStartVerseInput(String(startVerse));
                      }
                    }}
                    keyboardType="number-pad"
                    selectTextOnFocus
                    maxLength={3}
                    accessibilityLabel="Start verse number"
                  />
                  <Pressable
                    style={[styles.rangeButton, startVerse >= endVerse && styles.rangeButtonDisabled]}
                    onPress={() => handleStartVerseChange(startVerse + 1)}
                    disabled={startVerse >= endVerse}
                    accessibilityRole="button"
                    accessibilityLabel="Increase start verse"
                  >
                    <Ionicons name="add" size={16} color={startVerse >= endVerse ? '#475569' : '#ffffff'} />
                  </Pressable>
                </View>
              </View>

              {/* End Verse */}
              <View style={styles.rangeRow}>
                <Text style={styles.rangeLabel}>{t('surahLearnMode.end')}</Text>
                <View style={styles.rangeInputContainer}>
                  <Pressable
                    style={[styles.rangeButton, endVerse <= startVerse && styles.rangeButtonDisabled]}
                    onPress={() => handleEndVerseChange(endVerse - 1)}
                    disabled={endVerse <= startVerse}
                    accessibilityRole="button"
                    accessibilityLabel="Decrease end verse"
                  >
                    <Ionicons name="remove" size={16} color={endVerse <= startVerse ? '#475569' : '#ffffff'} />
                  </Pressable>
                  <TextInput
                    style={styles.rangeInput}
                    value={endVerseInput}
                    onChangeText={(text) => {
                      // Allow empty and numeric input while typing
                      if (text === '' || /^\d+$/.test(text)) {
                        setEndVerseInput(text);
                      }
                    }}
                    onBlur={() => {
                      // Validate on blur
                      const num = parseInt(endVerseInput, 10);
                      if (!isNaN(num) && num >= 1) {
                        handleEndVerseChange(num);
                      } else {
                        // Reset to current valid value
                        setEndVerseInput(String(endVerse));
                      }
                    }}
                    keyboardType="number-pad"
                    selectTextOnFocus
                    maxLength={3}
                    accessibilityLabel="End verse number"
                  />
                  <Pressable
                    style={[styles.rangeButton, endVerse >= ayahs.length && styles.rangeButtonDisabled]}
                    onPress={() => handleEndVerseChange(endVerse + 1)}
                    disabled={endVerse >= ayahs.length}
                    accessibilityRole="button"
                    accessibilityLabel="Increase end verse"
                  >
                    <Ionicons name="add" size={16} color={endVerse >= ayahs.length ? '#475569' : '#ffffff'} />
                  </Pressable>
                </View>
              </View>

              {/* Quick Select Buttons */}
              <View style={styles.quickSelectRow}>
                <Pressable
                  style={styles.quickSelectButton}
                  onPress={() => {
                    const start = currentAyahIndex + 1;
                    const end = Math.min(start + 4, ayahs.length);
                    setStartVerse(start);
                    setEndVerse(end);
                    setStartVerseInput(String(start));
                    setEndVerseInput(String(end));
                    startVerseRef.current = start;
                    endVerseRef.current = end;
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={t('surahLearnMode.next5')}
                >
                  <Text style={styles.quickSelectText}>{t('surahLearnMode.next5')}</Text>
                </Pressable>
                <Pressable
                  style={styles.quickSelectButton}
                  onPress={() => {
                    setStartVerse(1);
                    setEndVerse(ayahs.length);
                    setStartVerseInput('1');
                    setEndVerseInput(String(ayahs.length));
                    startVerseRef.current = 1;
                    endVerseRef.current = ayahs.length;
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={t('surahLearnMode.reset')}
                >
                  <Text style={styles.quickSelectText}>{t('surahLearnMode.reset')}</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Speed Control */}
          <View style={[styles.controlSection, { marginTop: showRangeSelector ? 20 : 0 }]}>
            <Text style={styles.controlLabel}>{t('surahLearnMode.speed')}</Text>
            <View style={styles.controlButtons}>
              {SPEED_OPTIONS.map((speed) => (
                <Pressable
                  key={speed}
                  style={[
                    styles.controlButton,
                    playbackSpeed === speed && styles.controlButtonActive,
                  ]}
                  onPress={() => handleSpeedChange(speed)}
                  accessibilityRole="button"
                  accessibilityLabel={`Playback speed ${speed}x`}
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
            <Text style={styles.controlLabel}>{t('surahLearnMode.repeat')}</Text>
            <View style={styles.controlButtons}>
              {REPEAT_OPTIONS.map((count) => (
                <Pressable
                  key={count}
                  style={[
                    styles.controlButton,
                    repeatCount === count && styles.controlButtonActive,
                  ]}
                  onPress={() => handleRepeatChange(count)}
                  accessibilityRole="button"
                  accessibilityLabel={`Repeat ${count} times`}
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

        {/* Auto-Advance Toggle */}
        <Pressable
          style={styles.bottomAutoAdvance}
          onPress={toggleAutoAdvance}
          accessibilityRole="button"
          accessibilityLabel={`${t('surahLearnMode.autoAdvance')}, ${autoAdvance ? 'on' : 'off'}`}
        >
          <Text style={[styles.autoAdvanceLabel, autoAdvance && styles.autoAdvanceLabelActive]}>
            {t('surahLearnMode.autoAdvance')}
          </Text>
          <View style={[styles.toggle, autoAdvance && styles.toggleActive]}>
            <View style={[styles.toggleThumb, autoAdvance && styles.toggleThumbActive]} />
          </View>
        </Pressable>
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
  rangeIndicator: {
    color: '#10b981',
    fontSize: 11,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  guideHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  guideIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#10b98115',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideHeaderText: {
    color: '#f5f5f0',
    fontSize: 15,
    fontWeight: '600',
  },
  guideContent: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    gap: 16,
  },
  guideItem: {
    flexDirection: 'row',
    gap: 12,
  },
  guideItemIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#161613',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  guideItemText: {
    flex: 1,
    gap: 3,
  },
  guideItemTitle: {
    color: '#f5f5f0',
    fontSize: 14,
    fontWeight: '600',
  },
  guideItemDesc: {
    color: '#a3a398',
    fontSize: 13,
    lineHeight: 19,
  },
  guideTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#fbbf2410',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  guideTipText: {
    color: '#fbbf24',
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
    fontStyle: 'italic',
  },
  ayahCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
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
    marginTop: 12,
  },
  rangeSelectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  rangeSelectorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rangeSelectorTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  rangeControls: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rangeLabel: {
    color: '#94a3b8',
    fontSize: 14,
    width: 50,
  },
  rangeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rangeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeButtonDisabled: {
    backgroundColor: '#334155',
  },
  rangeInput: {
    width: 60,
    height: 36,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  quickSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  quickSelectButton: {
    flex: 1,
    backgroundColor: '#475569',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  quickSelectText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
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
  bottomAutoAdvance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    marginTop: 12,
    marginBottom: 80,
    backgroundColor: '#1e293b',
    borderRadius: 16,
  },
  autoAdvanceLabel: {
    color: '#94a3b8',
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
  ayahPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahPlayButtonActive: {
    backgroundColor: '#10b981',
  },
  ayahPlayButtonPaused: {
    backgroundColor: '#f59e0b20',
  },
});
