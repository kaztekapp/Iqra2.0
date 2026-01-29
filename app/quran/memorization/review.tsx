import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useQuranStore } from '../../../src/stores/quranStore';
import { getAyahById, getSurahById } from '../../../src/data/arabic/quran';
import { ReviewRating } from '../../../src/types/quran';
import { TajweedText } from '../../../src/components/quran/TajweedText';
import { quranAudioService, QURAN_RECITERS } from '../../../src/services/quranAudioService';

export default function MemorizationReviewScreen() {
  const { getDueReviews, updateReviewItem, updateMemorizationStreak, progress } = useQuranStore();

  const dueReviews = getDueReviews();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = dueReviews[currentIndex];
  const currentAyah = currentItem ? getAyahById(currentItem.ayahId) : null;
  const currentSurah = currentItem ? getSurahById(currentItem.surahId) : null;

  if (!currentItem || !currentAyah || isComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <View style={styles.completeIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#10b981" />
          </View>
          <Text style={styles.completeTitle}>
            {dueReviews.length === 0 ? 'No Reviews Due' : 'Review Complete!'}
          </Text>
          <Text style={styles.completeSubtitle}>
            {dueReviews.length === 0
              ? 'Great job! Come back later for more reviews.'
              : `You reviewed ${completedCount} ayahs`}
          </Text>
          <Pressable style={styles.completeButton} onPress={() => router.back()}>
            <Text style={styles.completeButtonText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      quranAudioService.stop();
    };
  }, []);

  const playAyah = async () => {
    if (!currentSurah) return;

    setIsLoading(true);
    setIsPlaying(true);

    try {
      await quranAudioService.playAyah(currentSurah.surahNumber, currentAyah.ayahNumber, {
        rate: progress.settings.playbackSpeed,
        onComplete: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        onError: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const stopPlayback = async () => {
    await quranAudioService.stop();
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRating = (rating: ReviewRating) => {
    updateReviewItem(currentItem.ayahId, rating);
    updateMemorizationStreak();
    setCompletedCount((prev) => prev + 1);

    if (currentIndex < dueReviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setIsComplete(true);
    }
  };

  const ratingOptions: { rating: ReviewRating; label: string; color: string }[] = [
    { rating: 0, label: 'Blackout', color: '#ef4444' },
    { rating: 1, label: 'Wrong', color: '#f97316' },
    { rating: 2, label: 'Hard', color: '#f59e0b' },
    { rating: 3, label: 'Good', color: '#84cc16' },
    { rating: 4, label: 'Easy', color: '#22c55e' },
    { rating: 5, label: 'Perfect', color: '#10b981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Spaced Repetition Review</Text>
          <Text style={styles.headerSubtitle}>
            {currentIndex + 1} of {dueReviews.length}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
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
        <View style={styles.card}>
          {/* Surah Info */}
          <View style={styles.surahInfo}>
            <Text style={styles.surahName}>{currentSurah?.nameArabic}</Text>
            <Text style={styles.ayahNumber}>Ayah {currentAyah.ayahNumber}</Text>
          </View>

          {/* Question Side */}
          {!showAnswer && (
            <View style={styles.questionSide}>
              <Text style={styles.questionPrompt}>Can you recite this ayah?</Text>
              <Text style={styles.questionHint}>
                Starting with: {currentAyah.words[0]?.text}...
              </Text>
              <Pressable
                style={styles.playButton}
                onPress={isPlaying ? stopPlayback : playAyah}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : isPlaying ? (
                  <Ionicons name="stop" size={24} color="#ffffff" />
                ) : (
                  <Ionicons name="volume-high" size={24} color="#ffffff" />
                )}
                <Text style={styles.playButtonText}>
                  {isPlaying ? 'Stop' : 'Play to Hint'}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Answer Side */}
          {showAnswer && (
            <View style={styles.answerSide}>
              <View style={styles.ayahContainer}>
                <TajweedText
                  text={currentAyah.textUthmani}
                  tajweedRules={currentAyah.tajweedRules}
                  showTajweed={progress.settings.showTajweedColors}
                  fontSize={26}
                />
              </View>
              {progress.settings.showTransliteration && (
                <Text style={styles.transliteration}>{currentAyah.transliteration}</Text>
              )}
              {progress.settings.showTranslation && (
                <Text style={styles.translation}>{currentAyah.translation}</Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {!showAnswer ? (
          <Pressable style={styles.showAnswerButton} onPress={handleShowAnswer}>
            <Text style={styles.showAnswerText}>Show Answer</Text>
          </Pressable>
        ) : (
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingPrompt}>How well did you remember?</Text>
            <View style={styles.ratingButtons}>
              {ratingOptions.map(({ rating, label, color }) => (
                <Pressable
                  key={rating}
                  style={[styles.ratingButton, { backgroundColor: color + '20' }]}
                  onPress={() => handleRating(rating)}
                >
                  <Text style={[styles.ratingNumber, { color }]}>{rating}</Text>
                  <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  progressContainer: {
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
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
  },
  surahInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 24,
  },
  surahName: {
    color: '#8b5cf6',
    fontSize: 18,
  },
  ayahNumber: {
    color: '#64748b',
    fontSize: 14,
  },
  questionSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionPrompt: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionHint: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  answerSide: {
    flex: 1,
  },
  ayahContainer: {
    marginBottom: 20,
  },
  transliteration: {
    color: '#94a3b8',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionsContainer: {
    padding: 20,
  },
  showAnswerButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  showAnswerText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  ratingsContainer: {
    alignItems: 'center',
  },
  ratingPrompt: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  ratingButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingLabel: {
    fontSize: 9,
    marginTop: 2,
  },
  // Complete Screen
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  completeIcon: {
    marginBottom: 24,
  },
  completeTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  completeSubtitle: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  completeButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
