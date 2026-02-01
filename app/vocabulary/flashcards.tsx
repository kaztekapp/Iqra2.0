import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  vocabularyWords,
  getWordsByTheme,
  getThemeById,
} from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { VocabularyWord } from '../../src/types/arabic';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function FlashcardsScreen() {
  const { themeId } = useLocalSearchParams<{ themeId?: string }>();
  const { showVowels, markWordLearned, addXp, updateStreak, scheduleVocabularyReview } = useProgressStore();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, learning: 0 });
  const { speak, isSpeaking } = useArabicSpeech();

  const theme = themeId ? getThemeById(themeId) : null;

  useEffect(() => {
    const wordList = themeId ? getWordsByTheme(themeId) : vocabularyWords;
    // Shuffle words
    const shuffled = [...wordList].sort(() => Math.random() - 0.5);
    setWords(shuffled);
  }, [themeId]);

  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const handleNext = (known: boolean) => {
    const currentWord = words[currentIndex];

    // Always schedule word for SRS review
    scheduleVocabularyReview(currentWord.id, currentWord.themeId);

    if (known) {
      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
      markWordLearned(currentWord.id);
      addXp(2);
    } else {
      setStats((prev) => ({ ...prev, learning: prev.learning + 1 }));
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      translateX.value = 0;
    }
  };

  const flipCard = () => {
    rotateY.value = withSpring(isFlipped ? 0 : 180);
    setIsFlipped(!isFlipped);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          runOnJS(handleNext)(true);
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          runOnJS(handleNext)(false);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-15, 0, 15])}deg` },
    ],
  }));

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value + 180}deg` }],
    backfaceVisibility: 'hidden',
  }));

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading flashcards...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isComplete = currentIndex >= words.length - 1 && (stats.known + stats.learning) === words.length;

  if (isComplete) {
    updateStreak();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <View style={styles.completeIcon}>
            <Ionicons name="trophy" size={64} color="#D4AF37" />
          </View>
          <Text style={styles.completeTitle}>Session Complete!</Text>
          <Text style={styles.completeSubtitle}>
            {theme ? theme.name : 'All Vocabulary'}
          </Text>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.known}</Text>
              <Text style={styles.statLabel}>Known</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>
                {stats.learning}
              </Text>
              <Text style={styles.statLabel}>Still Learning</Text>
            </View>
          </View>

          <Text style={styles.xpEarned}>+{stats.known * 2} XP earned!</Text>

          <Pressable style={styles.doneButton} onPress={() => router.back()}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {theme ? theme.name : 'All Vocabulary'}
          </Text>
          <Text style={styles.headerProgress}>
            {currentIndex + 1} / {words.length}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / words.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardWrapper, cardStyle]}>
            <Pressable onPress={flipCard} style={styles.cardPressable}>
              {/* Front of Card (Arabic) */}
              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardArabic}>
                    {showVowels ? currentWord.arabicWithVowels : currentWord.arabic}
                  </Text>
                  <Text style={styles.cardTranslit}>
                    {currentWord.transliteration}
                  </Text>
                  <Pressable
                    style={[styles.cardAudioBtn, isSpeaking && styles.cardAudioBtnActive]}
                    onPress={(e) => {
                      e.stopPropagation();
                      speak(currentWord.arabicWithVowels || currentWord.arabic);
                    }}
                  >
                    <Ionicons name="volume-high" size={28} color={isSpeaking ? "#ffffff" : "#D4AF37"} />
                  </Pressable>
                </View>
                <Text style={styles.tapHint}>Tap to reveal answer</Text>
              </Animated.View>

              {/* Back of Card (English) */}
              <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardEnglish}>{currentWord.english}</Text>
                  <View style={styles.backArabic}>
                    <Text style={styles.backArabicText}>
                      {showVowels ? currentWord.arabicWithVowels : currentWord.arabic}
                    </Text>
                  </View>
                  {currentWord.exampleSentence && (
                    <View style={styles.exampleBox}>
                      <Text style={styles.exampleArabic}>
                        {currentWord.exampleSentence.arabic}
                      </Text>
                      <Text style={styles.exampleEnglish}>
                        {currentWord.exampleSentence.english}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.swipeHint}>Swipe right = Know it, Left = Learning</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.actionButton, styles.learningButton]}
          onPress={() => handleNext(false)}
        >
          <Ionicons name="refresh" size={24} color="#f59e0b" />
          <Text style={styles.learningButtonText}>Still Learning</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.knowButton]}
          onPress={() => handleNext(true)}
        >
          <Ionicons name="checkmark" size={24} color="#22c55e" />
          <Text style={styles.knowButtonText}>Know It!</Text>
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerProgress: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: '100%',
    height: 400,
  },
  cardPressable: {
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardBack: {
    backgroundColor: '#1e3a5f',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardArabic: {
    fontSize: 56,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardTranslit: {
    fontSize: 20,
    color: '#6366f1',
    marginBottom: 24,
  },
  cardAudioBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAudioBtnActive: {
    backgroundColor: '#D4AF37',
  },
  tapHint: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
  },
  swipeHint: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
  },
  cardEnglish: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backArabic: {
    marginBottom: 20,
  },
  backArabicText: {
    fontSize: 28,
    color: '#D4AF37',
    textAlign: 'center',
  },
  exampleBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  exampleArabic: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  exampleEnglish: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  learningButton: {
    backgroundColor: '#f59e0b20',
    borderColor: '#f59e0b',
  },
  learningButtonText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  knowButton: {
    backgroundColor: '#22c55e20',
    borderColor: '#22c55e',
  },
  knowButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  completeIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  completeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 32,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  xpEarned: {
    fontSize: 18,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 32,
  },
  doneButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
