import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../src/hooks/useLocalizedContent';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { vocabularyWords } from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { VocabularyWord } from '../../src/types/arabic';
import ArabicWritingInput from '../../src/components/arabic/ArabicWritingInput';

export default function TypingPracticeScreen() {
  const { showVowels, recordExerciseResult, addXp, updateStreak } = useProgressStore();
  const { speak, isSpeaking } = useArabicSpeech();
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const shakeX = useSharedValue(0);
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    // Select 10 random words for practice
    const shuffled = [...vocabularyWords].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 10));
  }, []);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 300 });
  }, [currentIndex]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const currentWord = words[currentIndex];

  const normalizeArabic = (text: string) => {
    return text
      .replace(/[\u064B-\u065F]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .trim();
  };

  const checkAnswer = () => {
    if (!currentWord || !userAnswer.trim() || isAnswered) return;

    const targetWord = showVowels ? currentWord.arabicWithVowels : currentWord.arabic;
    const userNormalized = normalizeArabic(userAnswer);
    const targetNormalized = normalizeArabic(targetWord);

    const correct = userNormalized === targetNormalized;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      addXp(10);
    } else {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    recordExerciseResult('writing', correct);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      fadeIn.value = 0;
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      updateStreak();
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    const shuffled = [...vocabularyWords].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
    setIsComplete(false);
  };

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isComplete) {
    const accuracy = Math.round((score.correct / score.total) * 100);
    const xpEarned = score.correct * 10;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <View
            style={[
              styles.completeIcon,
              {
                backgroundColor:
                  accuracy >= 80 ? '#22c55e20' : accuracy >= 50 ? '#D4AF3720' : '#ef444420',
              },
            ]}
          >
            <Ionicons
              name={accuracy >= 80 ? 'trophy' : accuracy >= 50 ? 'thumbs-up' : 'refresh'}
              size={64}
              color={accuracy >= 80 ? '#22c55e' : accuracy >= 50 ? '#D4AF37' : '#ef4444'}
            />
          </View>
          <Text style={styles.completeTitle}>
            {accuracy >= 80 ? t('exercise.excellent') : accuracy >= 50 ? t('exercise.goodJob') : t('exercise.keepPracticing')}
          </Text>
          <Text style={styles.completeSubtitle}>{t('exercise.typingPractice')}</Text>

          <View style={styles.resultsCard}>
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{score.correct}</Text>
              <Text style={styles.resultLabel}>{t('common.correct')}</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{score.total - score.correct}</Text>
              <Text style={styles.resultLabel}>{t('common.wrong')}</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultItem}>
              <Text style={[styles.resultValue, { color: '#6366f1' }]}>{accuracy}%</Text>
              <Text style={styles.resultLabel}>{t('common.accuracy')}</Text>
            </View>
          </View>

          <Text style={styles.xpEarned}>{t('common.xpEarned', { count: xpEarned })}</Text>

          <View style={styles.completeButtons}>
            <Pressable style={styles.retryButton} onPress={handleRetry}>
              <Ionicons name="refresh" size={20} color="#6366f1" />
              <Text style={styles.retryButtonText}>{t('common.tryAgain')}</Text>
            </Pressable>
            <Pressable style={styles.doneButton} onPress={() => router.back()}>
              <Text style={styles.doneButtonText}>{t('common.done')}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('exercise.typingPractice')}</Text>
          <Text style={styles.headerProgress}>
            {currentIndex + 1} / {words.length}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Ionicons name="star" size={16} color="#6366f1" />
          <Text style={styles.scoreText}>{score.correct}</Text>
        </View>
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

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <Animated.View style={[styles.questionContainer, shakeStyle, fadeStyle]}>
          <Text style={styles.instructionText}>{t('exercise.typeInArabic')}</Text>
          <Text style={styles.questionText}>{lc(currentWord.english, (currentWord as any).french)}</Text>
          <View style={styles.questionArabicRow}>
            <Text style={styles.transliteration}>({currentWord.transliteration})</Text>
            <Pressable
              style={[styles.audioButton, isSpeaking && styles.audioButtonActive]}
              onPress={() => speak(currentWord.arabicWithVowels || currentWord.arabic)}
            >
              <Ionicons name="volume-medium" size={20} color={isSpeaking ? '#ffffff' : '#6366f1'} />
            </Pressable>
          </View>
        </Animated.View>

        {/* Hint Button */}
        {!showHint && !isAnswered && (
          <Pressable style={styles.hintButton} onPress={() => setShowHint(true)}>
            <Ionicons name="eye-outline" size={18} color="#6366f1" />
            <Text style={styles.hintButtonText}>{t('exercise.showAnswer')}</Text>
          </Pressable>
        )}

        {/* Hint Display */}
        {showHint && !isAnswered && (
          <View style={styles.hintBox}>
            <Text style={styles.hintArabic}>
              {showVowels ? currentWord.arabicWithVowels : currentWord.arabic}
            </Text>
          </View>
        )}

        {/* Feedback */}
        {isAnswered && (
          <View style={[styles.feedbackBox, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <View style={styles.feedbackHeader}>
              <Ionicons
                name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={isCorrect ? '#22c55e' : '#ef4444'}
              />
              <Text style={[styles.feedbackTitle, isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleWrong]}>
                {isCorrect ? t('exercise.correctFeedback') : t('exercise.notQuite')}
              </Text>
            </View>

            {!isCorrect && (
              <View style={styles.correctAnswerBox}>
                <Text style={styles.correctAnswerLabel}>{t('exercise.correctAnswerLabel')}</Text>
                <Pressable
                  style={styles.correctAnswerRow}
                  onPress={() => speak(currentWord.arabicWithVowels || currentWord.arabic)}
                >
                  <Text style={styles.correctAnswerText}>
                    {showVowels ? currentWord.arabicWithVowels : currentWord.arabic}
                  </Text>
                  <Ionicons name="volume-medium" size={20} color="#6366f1" />
                </Pressable>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Arabic Writing Input with Keyboard */}
      {!isAnswered ? (
        <ArabicWritingInput
          value={userAnswer}
          onChange={setUserAnswer}
          onSubmit={checkAnswer}
          placeholder="اكتب إجابتك هنا..."
          disabled={isAnswered}
          isCorrect={isCorrect}
          showResult={isAnswered}
          accentColor="#6366f1"
        />
      ) : (
        <View style={styles.actionContainer}>
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < words.length - 1 ? t('exercise.nextWord') : t('exercise.seeResults')}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </Pressable>
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
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f120',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  scoreText: {
    color: '#6366f1',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  instructionText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  questionArabicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  transliteration: {
    fontSize: 16,
    color: '#6366f1',
  },
  audioButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioButtonActive: {
    backgroundColor: '#6366f1',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  hintButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  hintBox: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  hintArabic: {
    fontSize: 28,
    color: '#D4AF37',
  },
  feedbackBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  feedbackCorrect: {
    backgroundColor: '#22c55e20',
    borderWidth: 1,
    borderColor: '#22c55e40',
  },
  feedbackWrong: {
    backgroundColor: '#ef444420',
    borderWidth: 1,
    borderColor: '#ef444440',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  feedbackTitleCorrect: {
    color: '#22c55e',
  },
  feedbackTitleWrong: {
    color: '#ef4444',
  },
  correctAnswerBox: {
    marginBottom: 12,
  },
  correctAnswerLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  correctAnswerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  correctAnswerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 12,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
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
  resultsCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    width: '100%',
  },
  resultItem: {
    flex: 1,
    alignItems: 'center',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  resultDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  xpEarned: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 32,
  },
  completeButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  retryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  retryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
