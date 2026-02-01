import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { getWordById } from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { VocabularyWord, VocabularyReviewItem, ReviewRating } from '../../src/types/arabic';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Rating descriptions for SM-2 scale
const RATING_DESCRIPTIONS: Record<ReviewRating, { label: string; color: string; icon: string }> = {
  0: { label: 'Blackout', color: '#ef4444', icon: 'close-circle' },
  1: { label: 'Wrong', color: '#f97316', icon: 'close' },
  2: { label: 'Hard', color: '#f59e0b', icon: 'help' },
  3: { label: 'OK', color: '#84cc16', icon: 'checkmark' },
  4: { label: 'Good', color: '#22c55e', icon: 'checkmark-circle' },
  5: { label: 'Perfect', color: '#10b981', icon: 'star' },
};

export default function VocabularyReviewScreen() {
  const {
    showVowels,
    getDueVocabularyReviews,
    updateVocabularyReviewItem,
    addXp,
    updateStreak,
  } = useProgressStore();

  const [dueReviews, setDueReviews] = useState<VocabularyReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentWord, setCurrentWord] = useState<VocabularyWord | null>(null);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, totalXp: 0 });
  const { speak, isSpeaking } = useArabicSpeech();

  const rotateY = useSharedValue(0);

  useEffect(() => {
    const reviews = getDueVocabularyReviews();
    setDueReviews(reviews);
  }, []);

  useEffect(() => {
    if (dueReviews.length > 0 && currentIndex < dueReviews.length) {
      const word = getWordById(dueReviews[currentIndex].wordId);
      setCurrentWord(word || null);
    }
  }, [dueReviews, currentIndex]);

  const flipCard = () => {
    rotateY.value = withSpring(isFlipped ? 0 : 180);
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: ReviewRating) => {
    if (!currentWord || currentIndex >= dueReviews.length) return;

    const reviewItem = dueReviews[currentIndex];
    updateVocabularyReviewItem(reviewItem.wordId, rating);

    // Calculate XP based on rating
    let xpEarned = 0;
    if (rating >= 3) {
      xpEarned = rating === 5 ? 5 : rating === 4 ? 3 : 2;
      setStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        totalXp: prev.totalXp + xpEarned,
      }));
      addXp(xpEarned);
    } else {
      setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    // Move to next card
    if (currentIndex < dueReviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      rotateY.value = 0;
    } else {
      // Session complete
      setCurrentIndex(dueReviews.length);
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value + 180}deg` }],
    backfaceVisibility: 'hidden',
  }));

  // No reviews due
  if (dueReviews.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="checkmark-done-circle" size={64} color="#22c55e" />
          </View>
          <Text style={styles.emptyTitle}>All Caught Up!</Text>
          <Text style={styles.emptyTitleArabic}>لا مراجعات اليوم</Text>
          <Text style={styles.emptySubtitle}>
            No vocabulary words are due for review right now.
            Learn new words to add them to your review queue.
          </Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Vocabulary</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Session complete
  if (currentIndex >= dueReviews.length) {
    updateStreak();
    const accuracy = dueReviews.length > 0
      ? Math.round((stats.correct / dueReviews.length) * 100)
      : 0;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <View style={styles.completeIcon}>
            <Ionicons name="trophy" size={64} color="#D4AF37" />
          </View>
          <Text style={styles.completeTitle}>Review Complete!</Text>
          <Text style={styles.completeTitleArabic}>اكتملت المراجعة</Text>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.correct}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>
                {stats.incorrect}
              </Text>
              <Text style={styles.statLabel}>Need Practice</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#6366f1' }]}>
                {accuracy}%
              </Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>

          <Text style={styles.xpEarned}>+{stats.totalXp} XP earned!</Text>

          <Pressable style={styles.doneButton} onPress={() => router.back()}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentWord) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const reviewItem = dueReviews[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Spaced Review</Text>
          <Text style={styles.headerProgress}>
            {currentIndex + 1} / {dueReviews.length}
          </Text>
        </View>
        <View style={styles.headerBadge}>
          <Ionicons name="repeat" size={16} color="#6366f1" />
          <Text style={styles.headerBadgeText}>{reviewItem.repetitions}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / dueReviews.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <Pressable onPress={flipCard} style={styles.cardWrapper}>
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
            <Text style={styles.rateHint}>Rate how well you remembered</Text>
          </Animated.View>
        </Pressable>
      </View>

      {/* Rating Buttons - Only show when flipped */}
      {isFlipped && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>How well did you remember?</Text>
          <View style={styles.ratingButtons}>
            {([0, 1, 2, 3, 4, 5] as ReviewRating[]).map((rating) => {
              const config = RATING_DESCRIPTIONS[rating];
              return (
                <Pressable
                  key={rating}
                  style={[styles.ratingButton, { borderColor: config.color }]}
                  onPress={() => handleRating(rating)}
                >
                  <Ionicons name={config.icon as any} size={20} color={config.color} />
                  <Text style={[styles.ratingLabel, { color: config.color }]}>
                    {config.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
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
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f120',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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
    height: 350,
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
    fontSize: 52,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardTranslit: {
    fontSize: 18,
    color: '#6366f1',
    marginBottom: 20,
  },
  cardAudioBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
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
  rateHint: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
  },
  cardEnglish: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backArabic: {
    marginBottom: 16,
  },
  backArabicText: {
    fontSize: 24,
    color: '#D4AF37',
    textAlign: 'center',
  },
  exampleBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    width: '100%',
  },
  exampleArabic: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  exampleEnglish: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  ratingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  ratingTitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  ratingButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#1e293b',
    minWidth: 60,
  },
  ratingLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#22c55e20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyTitleArabic: {
    fontSize: 20,
    color: '#22c55e',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Complete state
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
    marginBottom: 4,
  },
  completeTitleArabic: {
    fontSize: 20,
    color: '#D4AF37',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 12,
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
