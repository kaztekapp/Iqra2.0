import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getSurahById } from '../../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../../src/stores/quranStore';
import { TajweedText } from '../../../../src/components/quran/TajweedText';
import { quranAudioService, AudioState, QURAN_RECITERS, ReciterId } from '../../../../src/services/quranAudioService';
import { useAudioPlayerStore } from '../../../../src/stores/audioPlayerStore';
import { useTranslation } from 'react-i18next';
import { color, radius, type, weight, space, gutter } from '../../../../src/theme/tokens';
import { LearnSettingsSheet, type LearnSheetKind } from '../../../../src/components/quran/LearnSettingsSheet';
import { SurahPickerSheet } from '../../../../src/components/quran/SurahPickerSheet';
import { useLearnModeStore } from '../../../../src/stores/learnModeStore';
import { useLocalizedContent } from '../../../../src/hooks/useLocalizedContent';
import { withAlpha } from '../../../../src/components/ui/Primitives';

/**
 * The verse's text size, from its length. Verses run from 2 characters
 * (Ṭā Hā) to 1,208 (al-Baqarah 282), half of them under 93: a short verse is
 * set large in the middle of the card, a long one smaller so less of it
 * needs scrolling.
 */
function verseFontSize(text: string): number {
  const n = text.trim().length;
  if (n <= 35) return 40;
  if (n <= 100) return 34;
  if (n <= 220) return 30;
  if (n <= 450) return 27;
  return 24;
}

/** What the player calls the app's own voice, in Arabic. */
const LEARNING_VOICE_ARABIC = 'صَوْتُ التَّعَلُّمِ';

export default function LearnModeScreen() {
  const { t } = useTranslation();
  const { surahId } = useLocalSearchParams<{ surahId: string }>();

  const surah = getSurahById(surahId);
  const { ayahs, isLoading: isLoadingAyahs } = useQuranSurah(surahId);

  const progress = useQuranStore((s) => s.progress);
  const setCurrentlyPlaying = useAudioPlayerStore((s) => s.setCurrentlyPlaying);
  const updatePlaybackState = useAudioPlayerStore((s) => s.updatePlaybackState);
  const clearPlayer = useAudioPlayerStore((s) => s.clearPlayer);

  // Get current reciter info for the mini player
  const currentReciterId = progress.settings.reciterId as ReciterId;
  const currentReciter = QURAN_RECITERS[currentReciterId] || QURAN_RECITERS['mishary-alafasy'];

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(Math.min(progress.settings.playbackSpeed, 1.5));
  const [repeatCount, setRepeatCount] = useState(1);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Verse range selection (1-indexed verse numbers)
  const [startVerse, setStartVerse] = useState(1);
  const [endVerse, setEndVerse] = useState(ayahs.length || 1);
  // Which settings sheet is open, if any.
  const [sheet, setSheet] = useState<LearnSheetKind | null>(null);
  // Counts each time the screen is shown, so the voice is set again on return.
  const [focusCount, setFocusCount] = useState(0);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  // Tracked by hand: NativeWind drops Pressable's style function on device.
  const [switchPressed, setSwitchPressed] = useState(false);
  const { lc } = useLocalizedContent();
  const setLastSurah = useLearnModeStore((s) => s.setLastSurah);
  const toggleTajweedColors = useQuranStore((s) => s.toggleTajweedColors);

  // A swipe on the verse moves to the one before or after. The handlers are
  // made once, so they reach the current screen through a ref.
  const stepRef = useRef<(delta: number) => void>(() => {});
  // A long verse scrolls inside its card; the next one starts at its top.
  const verseScrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    verseScrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentAyahIndex]);
  const swipe = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 18 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -60) stepRef.current(1);
        else if (g.dx > 60) stepRef.current(-1);
      },
    })
  ).current;

  // Remembered for the Learn mode shortcut on Home.
  useEffect(() => {
    if (surah) setLastSurah(surah.id);
  }, [surah?.id]);

  // Use ref to track values in callbacks (avoids stale closure)
  const currentRepeatRef = useRef(0);
  const repeatCountRef = useRef(1);
  const autoAdvanceRef = useRef(true);
  const currentAyahIndexRef = useRef(0);
  const startVerseRef = useRef(1);
  const endVerseRef = useRef(ayahs.length || 1);
  const isPlayingRef = useRef(false);
  const playbackSpeedRef = useRef(playbackSpeed);
  // Recitation, or the app's own Arabic voice reading the words plainly.
  // Only Learn mode offers the choice: elsewhere the Quran is recited. It
  // starts on the learning voice, because that is what this screen is for -
  // someone working through the words, who can switch to a reciter in a tap.
  const [useLearningVoice, setUseLearningVoice] = useState(true);
  const learningVoiceRef = useRef(true);
  // The learning voice could not be made and the reciter is reading instead.
  const [voiceFellBack, setVoiceFellBack] = useState(false);

  const currentAyah = ayahs[currentAyahIndex];

  // Update end verse when ayahs load
  useEffect(() => {
    if (ayahs.length > 0 && endVerse === 1) {
      setEndVerse(ayahs.length);
      endVerseRef.current = ayahs.length;
    }
  }, [ayahs.length]);

  // Tell the service which voice this screen reads in, and where the words
  // are. Every control then obeys it - the play button here, the mini player's
  // next and previous, the chaining between verses - instead of each caller
  // having to know. Cleared on the way out, so the rest of the app recites.
  useEffect(() => {
    quranAudioService.setSpokenVoice(
      useLearningVoice,
      // The surah has to match. This screen holds one surah's verses, and
      // playback can move to the next one: answering by ayah number alone
      // would hand back THIS surah's verse 3 to be read as that surah's verse
      // 3 - the wrong words of the Quran, spoken confidently. Where the words
      // are not known, no text means the reciter reads, which is correct.
      (surahNumber, ayahNumber) =>
        surahNumber === surah?.surahNumber
          ? ayahs.find((a) => a.ayahNumber === ayahNumber)?.textUthmani
          : undefined
    );
  }, [useLearningVoice, ayahs, surah?.surahNumber, focusCount]);

  // Leaving Learn mode ends its playback, period: closing it, changing surah,
  // or another screen opening over it. It has no mini player to be stopped
  // from elsewhere. Locking the phone or switching apps is not leaving: the
  // screen stays focused and the verse plays on in the background.
  useFocusEffect(
    useCallback(() => {
      setFocusCount((n) => n + 1);
      return () => {
        quranAudioService.setSpokenVoice(false, null);
        if (useAudioPlayerStore.getState().currentlyPlaying?.source === 'learn') {
          isPlayingRef.current = false;
          quranAudioService.stop();
          useAudioPlayerStore.getState().clearPlayer();
          setAudioState('idle');
        }
      };
    }, [])
  );

  // When the learning voice is unavailable the service hands the verse to the
  // reciter. Say so here, and keep the mini player naming the voice that is
  // actually reading.
  useEffect(
    () =>
      quranAudioService.onSpokenVoiceFallback((usingReciter) => {
        setVoiceFellBack(usingReciter);
        const playing = useAudioPlayerStore.getState().currentlyPlaying;
        if (playing?.source === 'learn' && learningVoiceRef.current) {
          setCurrentlyPlaying({
            ...playing,
            reciterName: usingReciter ? currentReciter.nameEnglish : t('surahLearnMode.voiceLearning'),
            reciterNameArabic: usingReciter ? currentReciter.nameArabic : LEARNING_VOICE_ARABIC,
          });
        }
      }),
    [currentReciter, setCurrentlyPlaying, t]
  );

  // The verse on screen, made ready before it is asked for. Opening Learn mode
  // and pressing play should not begin with a wait, and the clip is kept, so
  // this costs one round trip the first time and nothing after.
  useEffect(() => {
    if (!useLearningVoice) return;
    const ayah = ayahs[currentAyahIndex];
    if (ayah?.textUthmani) quranAudioService.prewarmSpokenAyah(ayah.textUthmani);
  }, [useLearningVoice, ayahs, currentAyahIndex]);

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
          <ActivityIndicator size="large" color={color.progress} />
          <Text style={styles.loadingText}>{t('surahLearnMode.loadingVerses')}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
      // Name the voice that is actually reading. The player used to say
      // "Mishary Rashid Alafasy" while the app's own voice read the verse.
      reciterName: learningVoiceRef.current
        ? t('surahLearnMode.voiceLearning')
        : currentReciter.nameEnglish,
      reciterNameArabic: learningVoiceRef.current
        ? LEARNING_VOICE_ARABIC
        : currentReciter.nameArabic,
      isPlayingAll: true,
      source: 'learn',
    });

    // With the learning voice, start making the next verse now: it is a
    // network round trip, and the reader should not hear the wait.
    if (learningVoiceRef.current) {
      quranAudioService.prewarmSpokenAyah(
        ayahs.find((a) => a.ayahNumber === ayahNumber + 1)?.textUthmani
      );
    }

    quranAudioService.playAyah(surah.surahNumber, ayahNumber, {
      rate: playbackSpeedRef.current,
      neural: learningVoiceRef.current,
      text: ayahs.find((a) => a.ayahNumber === ayahNumber)?.textUthmani,
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

            const nextAyah = ayahs[nextIndex];
            if (nextAyah) {
              playLearnAyah(nextAyah.ayahNumber);
            }
          } else {
            // "Stay on this verse": stop, so the reader can say it themselves.
            isPlayingRef.current = false;
            setAudioState('idle');
            clearPlayer();
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


  const handleVoiceChange = (learning: boolean) => {
    if (learning === learningVoiceRef.current) return;
    setUseLearningVoice(learning);
    learningVoiceRef.current = learning;

    // Change it under the reader, not at the end of the verse. Picking the
    // same verse up again in the new voice is what the tap means; finishing
    // in the old one and changing later feels like the switch did nothing.
    if (isPlayingRef.current && (audioState === 'playing' || audioState === 'loading')) {
      currentRepeatRef.current = 0;
      setCurrentRepeat(0);
      playLearnAyah(currentAyah.ayahNumber);
    } else if (learning) {
      // Not playing: make the verse now, so the first press starts at once.
      quranAudioService.prewarmSpokenAyah(currentAyah?.textUthmani);
    }
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


  // Choose the verses to learn. The verse on screen moves inside them.
  const handleVerses = (start: number, end: number) => {
    setStartVerse(start);
    setEndVerse(end);
    startVerseRef.current = start;
    endVerseRef.current = end;
    const idx = currentAyahIndexRef.current;
    if (idx < start - 1 || idx > end - 1) goToVerse(start - 1);
  };

  // Move to another verse. While playing, that verse starts at once, from its
  // first repeat; otherwise it is only shown (and made ready to play).
  const goToVerse = (index: number) => {
    if (index < 0 || index >= ayahs.length || index === currentAyahIndexRef.current) return;
    currentAyahIndexRef.current = index;
    setCurrentAyahIndex(index);
    currentRepeatRef.current = 0;
    setCurrentRepeat(0);
    if (isPlayingRef.current && audioState !== 'paused') {
      playLearnAyah(ayahs[index].ayahNumber);
    } else {
      if (audioState === 'paused') {
        isPlayingRef.current = false;
        quranAudioService.stop();
        setAudioState('idle');
        clearPlayer();
      }
      if (learningVoiceRef.current) quranAudioService.prewarmSpokenAyah(ayahs[index].textUthmani);
    }
  };
  stepRef.current = (delta) => goToVerse(currentAyahIndexRef.current + delta);

  // What pressing play will do, in words: the settings, read back.
  const verseNumber = currentAyah.ayahNumber;
  const playPart = t('surahLearnMode.sayPlay', { count: repeatCount, verse: verseNumber });
  const thenPart = !autoAdvance
    ? t('surahLearnMode.sayThenStop')
    : verseNumber >= endVerse
      ? startVerse === endVerse
        ? t('surahLearnMode.sayThenAgain')
        : t('surahLearnMode.sayThenLoop', { verse: startVerse })
      : t('surahLearnMode.sayThenNext', { verse: verseNumber + 1 });
  const wholeSurah = startVerse === 1 && endVerse === ayahs.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: close, and the surah being learned (tap to learn another) */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()} hitSlop={8} accessibilityRole="button" accessibilityLabel={t('listen.close')}>
          <Ionicons name="close" size={24} color={color.textMuted} />
        </Pressable>
        <Pressable
          style={[styles.surahSwitch, switchPressed && styles.surahSwitchPressed]}
          onPress={() => setShowSurahPicker(true)}
          onPressIn={() => setSwitchPressed(true)}
          onPressOut={() => setSwitchPressed(false)}
          accessibilityRole="button"
          accessibilityLabel={`${t('surahLearnMode.changeSurah')}: ${surah.nameEnglish}`}
        >
          <View style={styles.surahNumber}>
            <Text style={styles.surahNumberText}>{surah.surahNumber}</Text>
          </View>
          <View style={styles.surahText}>
            <Text style={styles.surahTitle} numberOfLines={1}>{surah.nameEnglish}</Text>
            <Text style={styles.surahSub} numberOfLines={1}>
              {lc(surah.meaning, surah.meaningFr)}, {t('surahLearnMode.ayahCount', { count: surah.ayahCount })}
            </Text>
          </View>
          <Text style={styles.surahChange}>{t('surahLearnMode.changeSurah')}</Text>
          <Ionicons name="chevron-down" size={15} color={color.accentStrong} />
        </Pressable>
      </View>

      {/* Where the reader is in the surah. A segment per verse while they fit. */}
      <Pressable
        style={styles.track}
        onPress={() => setSheet('verses')}
        accessibilityRole="button"
        accessibilityLabel={`${t('surahLearnMode.verseOf', { verse: verseNumber, total: ayahs.length })}, ${t('surahLearnMode.sheetVerses')}`}
      >
        {ayahs.length <= 40 ? (
          <View style={styles.segments}>
            {ayahs.map((a, i) => (
              <View
                key={a.ayahNumber}
                style={[
                  styles.segment,
                  (a.ayahNumber < startVerse || a.ayahNumber > endVerse) && styles.segmentOutside,
                  i < currentAyahIndex && styles.segmentDone,
                  i === currentAyahIndex && styles.segmentNow,
                ]}
              />
            ))}
          </View>
        ) : (
          <View style={styles.bar}>
            <View style={[styles.barFill, { width: `${((currentAyahIndex + 1) / ayahs.length) * 100}%` }]} />
          </View>
        )}
        <View style={styles.trackRow}>
          <Text style={styles.trackText}>
            {t('surahLearnMode.verseOf', { verse: verseNumber, total: ayahs.length })}
          </Text>
          <Ionicons name="chevron-down" size={13} color={color.textMuted} />
        </View>
      </Pressable>

      {/* The verse fills the space between the header and the dock, centred;
          a long one scrolls inside it. Swipe it to move to the next or previous. */}
      <ScrollView
        ref={verseScrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={currentAyah.textUthmani.length > 220}
      >
        <View style={styles.verseCard} {...swipe.panHandlers}>
          <View style={styles.verseText}>
            <TajweedText
              text={currentAyah.textUthmani}
              tajweedRules={currentAyah.tajweedRules}
              showTajweed={progress.settings.showTajweedColors}
              fontSize={verseFontSize(currentAyah.textUthmani)}
            />
          </View>
          <View style={styles.toggles}>
            <Pressable
              style={[styles.toggleChip, progress.settings.showTajweedColors && styles.toggleChipOn]}
              onPress={toggleTajweedColors}
              accessibilityRole="switch"
              accessibilityState={{ checked: progress.settings.showTajweedColors }}
              accessibilityLabel={t('surahLearnMode.showTajweed')}
            >
              <Text style={[styles.toggleChipText, progress.settings.showTajweedColors && styles.toggleChipTextOn]}>
                {t('surahLearnMode.showTajweed')}
              </Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>

      {/* The dock: what play will do, and the three buttons, within thumb reach */}
      <View style={styles.dock}>
        {/* Who reads: on the screen, one tap, because it changes what the
            reader hears more than any setting. */}
        <View style={styles.voiceSwitch} accessibilityRole="radiogroup">
          {[true, false].map((learning) => {
            const on = useLearningVoice === learning;
            return (
              <Pressable
                key={String(learning)}
                style={[styles.voiceOption, on && styles.voiceOptionOn]}
                onPress={() => handleVoiceChange(learning)}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                accessibilityHint={learning ? t('surahLearnMode.voiceLearningNote') : t('surahLearnMode.voiceReciterNote')}
              >
                <Ionicons name={learning ? 'school-outline' : 'mic-outline'} size={15} color={on ? color.textOnAccent : color.textMuted} />
                <Text style={[styles.voiceOptionText, on && styles.voiceOptionTextOn]} numberOfLines={1}>
                  {learning ? t('surahLearnMode.voiceLearning') : currentReciter.nameEnglish}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* The settings, each showing its current choice; a tap opens it. */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips}>
          <Pressable style={styles.chip} onPress={() => setSheet('repeat')} accessibilityRole="button">
            <Text style={styles.chipLabel}>{t('surahLearnMode.repeat')}</Text>
            <Text style={styles.chipValue}>{repeatCount}×</Text>
          </Pressable>
          <Pressable style={styles.chip} onPress={() => setSheet('speed')} accessibilityRole="button">
            <Text style={styles.chipLabel}>{t('surahLearnMode.speed')}</Text>
            <Text style={styles.chipValue}>{playbackSpeed}×</Text>
          </Pressable>
          <Pressable style={styles.chip} onPress={() => setSheet('verses')} accessibilityRole="button">
            <Text style={styles.chipLabel}>{t('surahLearnMode.verses')}</Text>
            <Text style={styles.chipValue}>{wholeSurah ? t('surahLearnMode.all') : startVerse === endVerse ? String(startVerse) : `${startVerse}–${endVerse}`}</Text>
          </Pressable>
        </ScrollView>
        {useLearningVoice && voiceFellBack ? (
          <View style={styles.voiceFallback} accessibilityLiveRegion="polite">
            <Ionicons name="information-circle" size={16} color={color.warning} />
            <Text style={styles.voiceFallbackText}>
              {t('surahLearnMode.voiceLearningUnavailable', { reciter: currentReciter.nameEnglish })}
            </Text>
          </View>
        ) : (
          <Text style={styles.say} accessibilityLiveRegion="polite">{playPart}, {thenPart}</Text>
        )}

        <View style={styles.transport}>
          <Pressable
            style={[styles.side, currentAyahIndex === 0 && styles.sideDisabled]}
            onPress={() => goToVerse(currentAyahIndex - 1)}
            disabled={currentAyahIndex === 0}
            accessibilityRole="button"
            accessibilityLabel={t('surahLearnMode.previous')}
          >
            <View style={styles.sideIcon}>
              <Ionicons name="play-skip-back" size={20} color={color.text} />
            </View>
            <Text style={styles.sideText}>{t('surahLearnMode.previous')}</Text>
          </Pressable>

          <Pressable
            style={styles.play}
            onPress={toggleAyahAudio}
            accessibilityRole="button"
            accessibilityLabel={audioState === 'playing' ? t('surahLearnMode.pause') : t('surahLearnMode.play')}
          >
            {audioState === 'loading' ? (
              <ActivityIndicator color={color.textOnAccent} />
            ) : (
              <Ionicons
                name={audioState === 'playing' ? 'pause' : 'play'}
                size={34}
                color={color.textOnAccent}
                style={audioState === 'playing' ? undefined : styles.playGlyph}
              />
            )}
          </Pressable>

          <Pressable
            style={[styles.side, currentAyahIndex >= ayahs.length - 1 && styles.sideDisabled]}
            onPress={() => goToVerse(currentAyahIndex + 1)}
            disabled={currentAyahIndex >= ayahs.length - 1}
            accessibilityRole="button"
            accessibilityLabel={t('surahLearnMode.next')}
          >
            <View style={styles.sideIcon}>
              <Ionicons name="play-skip-forward" size={20} color={color.text} />
            </View>
            <Text style={styles.sideText}>{t('surahLearnMode.next')}</Text>
          </Pressable>
        </View>

        {/* Which repeat is playing: a gold dot for each one heard. */}
        <View style={styles.repeatDots} accessible={repeatCount > 1} accessibilityLabel={repeatCount > 1 ? t('surahLearnMode.repeatOf', { current: currentRepeat + 1, total: repeatCount }) : undefined}>
          {repeatCount > 1 && repeatCount <= 10 &&
            Array.from({ length: repeatCount }, (_, i) => (
              <View key={i} style={[styles.repeatDot, audioState !== 'idle' && i <= currentRepeat && styles.repeatDotOn]} />
            ))}
          {/* Past ten, dots stop being countable at a glance: say it instead. */}
          {repeatCount > 10 && audioState !== 'idle' && (
            <Text style={styles.repeatCountText}>
              {t('surahLearnMode.repeatOf', { current: currentRepeat + 1, total: repeatCount })}
            </Text>
          )}
        </View>
      </View>

      <LearnSettingsSheet
        kind={sheet}
        onClose={() => setSheet(null)}
        useLearningVoice={useLearningVoice}
        reciterName={currentReciter.nameEnglish}
        onVoice={handleVoiceChange}
        repeatCount={repeatCount}
        autoAdvance={autoAdvance}
        onRepeat={handleRepeatChange}
        onAutoAdvance={(on) => {
          setAutoAdvance(on);
          autoAdvanceRef.current = on;
        }}
        speed={playbackSpeed}
        onSpeed={handleSpeedChange}
        verseCount={ayahs.length}
        currentVerse={verseNumber}
        startVerse={startVerse}
        endVerse={endVerse}
        onVerses={handleVerses}
      />

      <SurahPickerSheet
        visible={showSurahPicker}
        currentSurahId={surah.id}
        onClose={() => setShowSurahPicker(false)}
        onPick={(picked) => {
          setShowSurahPicker(false);
          if (picked.id === surah.id) return;
          // A new surah starts from its first verse: the one playing stops.
          isPlayingRef.current = false;
          quranAudioService.stop();
          clearPlayer();
          router.replace(`/quran/surah/${picked.id}/learn`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  errorText: {
    color: color.danger,
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
    color: color.textMuted,
    fontSize: 16,
    marginTop: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingTop: space.xs,
    paddingBottom: space.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahSwitch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: color.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: withAlpha(color.sacred, 0.28),
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
  },
  surahSwitchPressed: {
    backgroundColor: color.sacredSoft,
  },
  // Gold marks Quran content across the app.
  surahNumber: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: color.sacred,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahNumberText: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.textOnAccent,
    fontVariant: ['tabular-nums'],
  },
  surahText: {
    flex: 1,
  },
  surahTitle: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
  },
  surahSub: {
    ...type.micro,
    color: color.textMuted,
  },
  surahChange: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.accentStrong,
  },

  // Track
  track: {
    paddingHorizontal: gutter,
    paddingBottom: space.md,
    gap: 6,
  },
  segments: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.border,
  },
  segmentOutside: {
    opacity: 0.4,
  },
  segmentDone: {
    backgroundColor: withAlpha(color.accent, 0.45),
  },
  segmentNow: {
    backgroundColor: color.accent,
    opacity: 1,
  },
  bar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: color.border,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: color.accent,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trackText: {
    ...type.caption,
    color: color.textMuted,
    fontVariant: ['tabular-nums'],
  },

  // Verse
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: space.md,
    paddingBottom: space.md,
  },
  verseCard: {
    flexGrow: 1,
    backgroundColor: color.surface,
    borderRadius: radius.xl,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.lg,
    gap: space.md,
  },
  // Takes the card's spare height, so a short verse sits in the middle.
  verseText: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  toggles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: space.sm,
    marginTop: space.xs,
  },
  toggleChip: {
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },
  toggleChipOn: {
    backgroundColor: color.accentSoft,
    borderColor: 'transparent',
  },
  toggleChipText: {
    ...type.caption,
    color: color.textMuted,
  },
  toggleChipTextOn: {
    color: color.accentStrong,
    fontWeight: weight.semibold,
  },

  // Settings chips
  voiceSwitch: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },
  voiceOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: space.sm,
    borderRadius: radius.sm,
  },
  voiceOptionOn: {
    backgroundColor: color.accent,
  },
  voiceOptionText: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.textMuted,
    flexShrink: 1,
  },
  voiceOptionTextOn: {
    color: color.textOnAccent,
  },
  chipsScroll: {
    flexGrow: 0,
    marginHorizontal: -gutter,
  },
  chips: {
    flexDirection: 'row',
    gap: space.sm,
    paddingHorizontal: gutter,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: space.md,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    maxWidth: 220,
  },
  chipLabel: {
    ...type.caption,
    color: color.textMuted,
  },
  chipValue: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.text,
    fontVariant: ['tabular-nums'],
    flexShrink: 1,
  },

  // Dock
  dock: {
    paddingHorizontal: gutter,
    paddingTop: space.md,
    paddingBottom: space.sm,
    gap: space.md,
    borderTopWidth: 1,
    borderTopColor: color.borderSubtle,
    backgroundColor: color.bg,
  },
  say: {
    ...type.caption,
    color: color.textMuted,
    textAlign: 'center',
    minHeight: 36,
  },
  voiceFallback: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.sm,
    minHeight: 36,
  },
  voiceFallbackText: {
    ...type.caption,
    color: color.warning,
    flex: 1,
  },
  transport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: {
    width: 88,
    alignItems: 'center',
    gap: 4,
  },
  sideDisabled: {
    opacity: 0.35,
  },
  sideIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideText: {
    ...type.micro,
    color: color.textMuted,
  },
  play: {
    width: 76,
    height: 76,
    borderRadius: radius.full,
    backgroundColor: color.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: color.accent,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  // The triangle's visual centre sits right of its box.
  playGlyph: {
    marginLeft: 4,
  },
  repeatDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    minHeight: 8,
  },
  repeatCountText: {
    ...type.micro,
    color: color.sacred,
    fontWeight: weight.semibold,
    fontVariant: ['tabular-nums'],
  },
  repeatDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: color.border,
  },
  repeatDotOn: {
    backgroundColor: color.sacred,
  },
});
