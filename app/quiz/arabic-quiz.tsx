import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArabicQuizStore } from '../../src/stores/arabicQuizStore';
import { useProgressStore } from '../../src/stores/progressStore';
import { useCommunityStore } from '../../src/stores/communityStore';
import { generateArabicQuiz, DetailedExplanation } from '../../src/lib/arabicQuizApi';
import { playArabicAudio } from '../../src/lib/arabicVocabularyApi';
import { DEFAULT_QUIZ_CONFIG } from '../../src/types/arabicQuiz';

type ScreenState = 'loading' | 'ready' | 'playing' | 'feedback' | 'results';

export default function ArabicQuizScreen() {
  const [screenState, setScreenState] = useState<ScreenState>('loading');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_QUIZ_CONFIG.timePerQuestion);
  const [quizResult, setQuizResult] = useState<{ passed: boolean; xpEarned: number } | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Preparing your quiz...');

  const {
    currentQuestions,
    currentAnswers,
    currentIndex,
    attempts,
    bestScore,
    score,
    streak,
    maxStreak,
    isPlaying,
    isLoading,
    error,
    hasActiveQuiz,
    setQuestions,
    setLoading,
    setError,
    startAttempt,
    submitAnswer,
    nextQuestion,
    recordAttempt,
    resetSession,
    clearQuiz,
  } = useArabicQuizStore();

  const { addXp, updateStreak } = useProgressStore();
  const { contributeToChallenge } = useCommunityStore();

  const currentQuestion = currentQuestions[currentIndex];

  // Check if quiz data is valid (not corrupted from old cache)
  const isQuizDataValid = useCallback(() => {
    if (currentQuestions.length === 0) return false;

    // Check first question for signs of corrupted data
    const firstQ = currentQuestions[0];
    if (!firstQ?.explanation) return false;

    // Check for URL-encoded characters in transliteration
    if (firstQ.explanation.transliteration?.includes('%')) return false;

    // Check for overly long Arabic text (should be single words)
    if (firstQ.explanation.arabic?.length > 30) return false;

    // Check if Arabic has vowels (tashkeel) - required for v4+
    // Tashkeel Unicode range: \u064B-\u0652
    const hasTashkeel = /[\u064B-\u0652]/.test(firstQ.explanation.arabic || '');
    if (!hasTashkeel) return false;

    return true;
  }, [currentQuestions]);

  // Load or generate quiz on mount
  useEffect(() => {
    if (hasActiveQuiz() && isQuizDataValid()) {
      // Resume existing valid quiz
      setScreenState('ready');
    } else {
      // Clear any corrupted data and generate new quiz
      clearQuiz();
      generateNewQuiz();
    }
  }, []);

  const generateNewQuiz = useCallback(async () => {
    setScreenState('loading');
    setLoading(true);
    setLoadingMessage('Fetching vocabulary from dictionary...');

    try {
      // Simulate progress messages
      setTimeout(() => setLoadingMessage('Translating words to Arabic...'), 1500);
      setTimeout(() => setLoadingMessage('Generating quiz questions...'), 3000);

      const { questions } = await generateArabicQuiz(10, true);
      setQuestions(questions);
      setScreenState('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate quiz');
      setScreenState('ready');
    }
  }, [setQuestions, setLoading, setError]);

  // Timer effect - only decrements the timer
  useEffect(() => {
    if (screenState !== 'playing' || !isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screenState, isPlaying, currentQuestion?.id]);

  // Handle timeout when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && screenState === 'playing' && isPlaying) {
      submitAnswer(-1, DEFAULT_QUIZ_CONFIG.timePerQuestion * 1000);
      setIsCorrect(false);
      setScreenState('feedback');
    }
  }, [timeLeft, screenState, isPlaying]);

  // Reset timer when question changes
  useEffect(() => {
    if (screenState === 'playing' && isPlaying) {
      setTimeLeft(DEFAULT_QUIZ_CONFIG.timePerQuestion);
      setSelectedOptionIndex(null);
      setIsCorrect(null);
    }
  }, [currentQuestion?.id, isPlaying]);

  const handleStartQuiz = () => {
    startAttempt();
    setScreenState('playing');
  };

  const handleSelectOption = (index: number) => {
    if (screenState !== 'playing' || selectedOptionIndex !== null || !currentQuestion) return;

    const timeSpent = (DEFAULT_QUIZ_CONFIG.timePerQuestion - timeLeft) * 1000;
    setSelectedOptionIndex(index);

    const correct = index === currentQuestion.correctIndex;
    setIsCorrect(correct);
    submitAnswer(index, timeSpent);
    setScreenState('feedback');
  };

  const handleNext = () => {
    if (currentIndex >= currentQuestions.length - 1) {
      // Complete quiz
      const result = recordAttempt();
      setQuizResult(result);

      // Award XP and update progress if passed
      if (result.passed) {
        addXp(result.xpEarned);
        updateStreak();

        // Contribute to community challenges
        const correctCount = currentAnswers.filter((a) => a.isCorrect).length;
        contributeToChallenge('words', correctCount);
        contributeToChallenge('xp', result.xpEarned);
      }

      setScreenState('results');
    } else {
      nextQuestion();
      setScreenState('playing');
    }
  };

  const handleTryAgain = () => {
    resetSession();
    setQuizResult(null);
    setScreenState('ready');
  };

  const handleGoBack = () => {
    resetSession();
    router.back();
  };

  // Loading Screen
  if (screenState === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Loading Quiz</Text>
          <Text style={styles.loadingSubtext}>{loadingMessage}</Text>
          <View style={styles.loadingTips}>
            <Ionicons name="bulb-outline" size={16} color="#94a3b8" />
            <Text style={styles.loadingTipText}>
              Words are fetched from dictionary APIs and translated to Arabic
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Ready Screen
  if (screenState === 'ready') {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#94a3b8" />
        </Pressable>

        <View style={styles.centerContent}>
          <Ionicons name="school" size={64} color="#D4AF37" />
          <Text style={styles.title}>Arabic Vocabulary Quiz</Text>
          <Text style={styles.titleArabic}>اختبار المفردات العربية</Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="warning" size={24} color="#f97316" />
              <Text style={styles.errorText}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={generateNewQuiz}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </Pressable>
            </View>
          ) : attempts > 0 ? (
            <View style={styles.attemptInfo}>
              <Text style={styles.attemptText}>
                Same quiz until you pass ({DEFAULT_QUIZ_CONFIG.passingScore}%)
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Attempts</Text>
                  <Text style={styles.statValue}>{attempts}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Best Score</Text>
                  <Text style={styles.statValueHighlight}>{bestScore}%</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.infoBox}>
              <Text style={styles.subtitle}>
                10 vocabulary questions{'\n'}Pass with {DEFAULT_QUIZ_CONFIG.passingScore}% to unlock new words
              </Text>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Ionicons name="shuffle" size={16} color="#818cf8" />
                  <Text style={styles.featureText}>Random words from dictionary</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="book" size={16} color="#818cf8" />
                  <Text style={styles.featureText}>Detailed explanations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="refresh" size={16} color="#818cf8" />
                  <Text style={styles.featureText}>New words when you pass</Text>
                </View>
              </View>
            </View>
          )}

          {!error && (
            <Pressable style={styles.startButton} onPress={handleStartQuiz}>
              <Text style={styles.startButtonText}>
                {attempts > 0 ? 'Try Again' : 'Start Quiz'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#0f172a" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Playing / Feedback Screen
  if ((screenState === 'playing' || screenState === 'feedback') && currentQuestion) {
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={handleGoBack}>
            <Ionicons name="close" size={24} color="#94a3b8" />
          </Pressable>
          <Text style={styles.headerText}>
            {currentIndex + 1} / {currentQuestions.length}
          </Text>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={16} color="#f97316" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Timer */}
        {screenState === 'playing' && (
          <View style={styles.timerContainer}>
            <Ionicons
              name="time-outline"
              size={18}
              color={timeLeft <= 5 ? '#ef4444' : '#94a3b8'}
            />
            <Text style={[styles.timerText, timeLeft <= 5 && styles.timerTextWarning]}>
              {timeLeft}s
            </Text>
          </View>
        )}

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Question */}
          <View style={styles.questionContainer}>
            {currentQuestion.questionArabic && (
              <View style={styles.arabicQuestionRow}>
                <Text style={styles.questionArabic}>{currentQuestion.questionArabic}</Text>
                <Pressable
                  style={styles.audioButton}
                  onPress={() => playArabicAudio(currentQuestion.questionArabic!)}
                >
                  <Ionicons name="volume-high" size={24} color="#D4AF37" />
                </Pressable>
              </View>
            )}
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              let optionStyle = [styles.optionButton];
              let textStyle = [styles.optionText];

              if (screenState === 'feedback') {
                if (index === currentQuestion.correctIndex) {
                  optionStyle.push(styles.optionCorrect);
                  textStyle.push(styles.optionTextCorrect);
                } else if (index === selectedOptionIndex && !isCorrect) {
                  optionStyle.push(styles.optionWrong);
                  textStyle.push(styles.optionTextWrong);
                }
              }

              return (
                <Pressable
                  key={index}
                  style={optionStyle}
                  onPress={() => handleSelectOption(index)}
                  disabled={screenState === 'feedback'}
                >
                  <Text style={textStyle}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Detailed Feedback */}
          {screenState === 'feedback' && (
            <View style={styles.feedbackContainer}>
              <View style={[styles.feedbackBanner, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
                <Ionicons
                  name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={isCorrect ? '#22c55e' : '#ef4444'}
                />
                <Text style={[styles.feedbackText, isCorrect ? styles.feedbackTextCorrect : styles.feedbackTextWrong]}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
              </View>

              {/* Detailed Explanation Card */}
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>Learn this word</Text>

                <View style={styles.wordDisplay}>
                  <Pressable
                    style={styles.audioButtonLarge}
                    onPress={() => playArabicAudio(currentQuestion.explanation.arabic)}
                  >
                    <Ionicons name="volume-high" size={28} color="#D4AF37" />
                  </Pressable>
                  <Text style={styles.arabicLarge}>{currentQuestion.explanation.arabic}</Text>
                  <Text style={styles.transliteration}>{currentQuestion.explanation.transliteration}</Text>
                  <Text style={styles.englishMeaning}>{currentQuestion.explanation.english}</Text>
                </View>

                {currentQuestion.explanation.pronunciationTip && (
                  <View style={styles.tipBox}>
                    <View style={styles.tipHeader}>
                      <Ionicons name="volume-high" size={16} color="#818cf8" />
                      <Text style={styles.tipLabel}>Pronunciation</Text>
                    </View>
                    <Text style={styles.tipText}>{currentQuestion.explanation.pronunciationTip}</Text>
                  </View>
                )}

                {currentQuestion.explanation.memoryTip && (
                  <View style={styles.tipBox}>
                    <View style={styles.tipHeader}>
                      <Ionicons name="bulb" size={16} color="#D4AF37" />
                      <Text style={styles.tipLabel}>Memory Tip</Text>
                    </View>
                    <Text style={styles.tipText}>{currentQuestion.explanation.memoryTip}</Text>
                  </View>
                )}
              </View>

              <Pressable style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>
                  {currentIndex >= currentQuestions.length - 1 ? 'See Results' : 'Next Question'}
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Results Screen
  if (screenState === 'results' && quizResult) {
    const correctCount = currentAnswers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / currentQuestions.length) * 100);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultsScroll}>
          {/* Result Header */}
          <View style={styles.resultHeader}>
            <Ionicons
              name={quizResult.passed ? 'trophy' : 'refresh-circle'}
              size={64}
              color={quizResult.passed ? '#D4AF37' : '#94a3b8'}
            />
            <Text style={styles.resultTitle}>
              {quizResult.passed ? 'Quiz Passed!' : 'Keep Practicing!'}
            </Text>
            <Text style={styles.resultTitleArabic}>
              {quizResult.passed ? 'أحسنت!' : 'استمر في التدريب!'}
            </Text>
            {quizResult.passed && (
              <Text style={styles.newWordsMessage}>
                New words will be unlocked next quiz!
              </Text>
            )}
          </View>

          {/* Stats */}
          <View style={styles.resultsStatsRow}>
            <View style={styles.resultStatBox}>
              <Text style={styles.resultStatValue}>{accuracy}%</Text>
              <Text style={styles.resultStatLabel}>Accuracy</Text>
            </View>
            <View style={styles.resultStatBox}>
              <Text style={styles.resultStatValue}>{correctCount}/{currentQuestions.length}</Text>
              <Text style={styles.resultStatLabel}>Correct</Text>
            </View>
            <View style={styles.resultStatBox}>
              <Text style={styles.resultStatValue}>{maxStreak}</Text>
              <Text style={styles.resultStatLabel}>Best Streak</Text>
            </View>
            {quizResult.passed && (
              <View style={styles.resultStatBox}>
                <Text style={[styles.resultStatValue, styles.xpValue]}>+{quizResult.xpEarned}</Text>
                <Text style={styles.resultStatLabel}>XP Earned</Text>
              </View>
            )}
          </View>

          {!quizResult.passed && (
            <Text style={styles.passMessage}>
              Score {DEFAULT_QUIZ_CONFIG.passingScore}% or higher to pass and earn XP
            </Text>
          )}

          {/* Questions Review */}
          <View style={styles.reviewSection}>
            <Text style={styles.reviewTitle}>Review All Answers</Text>

            {currentQuestions.map((question, index) => {
              const answer = currentAnswers[index];
              const wasCorrect = answer?.isCorrect ?? false;
              const userAnswer = answer?.selectedIndex >= 0 ? question.options[answer.selectedIndex] : 'No answer';
              const correctAnswer = question.options[question.correctIndex];

              return (
                <View key={question.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Ionicons
                      name={wasCorrect ? 'checkmark-circle' : 'close-circle'}
                      size={20}
                      color={wasCorrect ? '#22c55e' : '#ef4444'}
                    />
                    <Text style={styles.reviewQuestionNum}>Question {index + 1}</Text>
                  </View>

                  <Text style={styles.reviewQuestion}>{question.question}</Text>

                  {question.questionArabic && (
                    <Text style={styles.reviewQuestionArabic}>{question.questionArabic}</Text>
                  )}

                  <View style={styles.reviewAnswers}>
                    <View style={styles.reviewAnswerRow}>
                      <Text style={styles.reviewAnswerLabel}>Your answer:</Text>
                      <Text style={[
                        styles.reviewAnswerValue,
                        wasCorrect ? styles.reviewAnswerCorrect : styles.reviewAnswerWrong
                      ]}>
                        {userAnswer}
                      </Text>
                    </View>

                    {!wasCorrect && (
                      <View style={styles.reviewAnswerRow}>
                        <Text style={styles.reviewAnswerLabel}>Correct answer:</Text>
                        <Text style={[styles.reviewAnswerValue, styles.reviewAnswerCorrect]}>
                          {correctAnswer}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Detailed explanation in review */}
                  <View style={styles.reviewExplanationBox}>
                    <View style={styles.reviewWordRow}>
                      <Pressable
                        style={styles.audioButtonSmall}
                        onPress={() => playArabicAudio(question.explanation.arabic)}
                      >
                        <Ionicons name="volume-high" size={18} color="#D4AF37" />
                      </Pressable>
                      <Text style={styles.reviewArabic}>{question.explanation.arabic}</Text>
                      <Text style={styles.reviewTranslit}>({question.explanation.transliteration})</Text>
                      <Text style={styles.reviewEnglish}>= {question.explanation.english}</Text>
                    </View>
                    {question.explanation.pronunciationTip && (
                      <Text style={styles.reviewTip}>
                        {question.explanation.pronunciationTip}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Action Buttons */}
          <View style={styles.resultActions}>
            {quizResult.passed ? (
              <Pressable style={styles.startButton} onPress={generateNewQuiz}>
                <Text style={styles.startButtonText}>New Quiz (New Words)</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.startButton} onPress={handleTryAgain}>
                <Text style={styles.startButtonText}>Try Again (Same Words)</Text>
              </Pressable>
            )}

            <Pressable style={styles.backTextButton} onPress={handleGoBack}>
              <Text style={styles.backTextButtonLabel}>Back to Community</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingTips: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  loadingTipText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
  },
  titleArabic: {
    fontSize: 22,
    color: '#D4AF37',
    marginTop: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  infoBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  featureList: {
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 10,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#f97316',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  attemptInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  attemptText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  statValueHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginTop: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f97316',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 6,
  },
  timerTextWarning: {
    color: '#ef4444',
  },
  questionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  arabicQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  questionArabic: {
    fontSize: 42,
    color: '#D4AF37',
    textAlign: 'center',
  },
  audioButton: {
    marginLeft: 12,
    padding: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 20,
  },
  audioButtonLarge: {
    padding: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 24,
    marginBottom: 12,
  },
  audioButtonSmall: {
    padding: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 14,
    marginRight: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  optionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#22c55e',
  },
  optionWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  optionTextCorrect: {
    color: '#22c55e',
  },
  optionTextWrong: {
    color: '#ef4444',
  },
  feedbackContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  feedbackWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  feedbackTextCorrect: {
    color: '#22c55e',
  },
  feedbackTextWrong: {
    color: '#ef4444',
  },
  explanationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  wordDisplay: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  arabicLarge: {
    fontSize: 48,
    color: '#D4AF37',
    marginBottom: 8,
  },
  transliteration: {
    fontSize: 18,
    color: '#818cf8',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  englishMeaning: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // Results Screen
  resultsScroll: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
  },
  resultTitleArabic: {
    fontSize: 24,
    color: '#D4AF37',
    marginTop: 8,
  },
  newWordsMessage: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 12,
    fontWeight: '600',
  },
  resultsStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultStatBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultStatLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
  },
  xpValue: {
    color: '#D4AF37',
  },
  passMessage: {
    fontSize: 14,
    color: '#f97316',
    textAlign: 'center',
    marginBottom: 24,
  },
  reviewSection: {
    marginTop: 16,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewQuestionNum: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 8,
  },
  reviewQuestion: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  reviewQuestionArabic: {
    fontSize: 24,
    color: '#D4AF37',
    marginBottom: 12,
    textAlign: 'right',
  },
  reviewAnswers: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reviewAnswerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAnswerLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  reviewAnswerValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  reviewAnswerCorrect: {
    color: '#22c55e',
  },
  reviewAnswerWrong: {
    color: '#ef4444',
  },
  reviewExplanationBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
  },
  reviewWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  reviewArabic: {
    fontSize: 18,
    color: '#D4AF37',
    marginRight: 8,
  },
  reviewTranslit: {
    fontSize: 14,
    color: '#818cf8',
    fontStyle: 'italic',
    marginRight: 8,
  },
  reviewEnglish: {
    fontSize: 14,
    color: '#ffffff',
  },
  reviewTip: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  resultActions: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  backTextButton: {
    marginTop: 16,
    padding: 12,
  },
  backTextButtonLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
});
