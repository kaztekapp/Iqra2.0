import { View, Text, ScrollView, Pressable, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { getRandomQuestions, getCategoryById, getQuestionsBySet, getTotalSets, getSetName } from '../../../src/data/arabic/quran/quizzes';
import { QuizQuestion, QuizCategory, QuizAnswer } from '../../../src/types/quran';

const PASSING_SCORE = 70; // Percentage required to pass and unlock next set

export default function QuizScreen() {
  const { categoryId, setIndex } = useLocalSearchParams<{ categoryId: string; setIndex?: string }>();
  const category = getCategoryById(categoryId as QuizCategory);

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const totalSets = categoryId ? getTotalSets(categoryId as QuizCategory) : 1;

  useEffect(() => {
    if (categoryId) {
      // Start at specified set index if provided, otherwise start at 0
      const initialSetIndex = setIndex ? parseInt(setIndex, 10) : 0;
      loadSetQuestions(initialSetIndex);
    }
  }, [categoryId, setIndex]);

  const loadSetQuestions = (setIndex: number) => {
    const quizQuestions = getQuestionsBySet(categoryId as QuizCategory, setIndex);
    // Shuffle questions within the set
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentSetIndex(setIndex);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setQuizComplete(false);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  };

  if (!category || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const score = answers.filter(a => a.isCorrect).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleConfirm = () => {
    if (!selectedAnswer) return;

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
      timeSpent,
    };

    setAnswers([...answers, answer]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      // Animate transition
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuestionStartTime(Date.now());
      }, 150);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    // Restart the same set
    loadSetQuestions(currentSetIndex);
  };

  const handleNextSet = () => {
    if (currentSetIndex < totalSets - 1) {
      loadSetQuestions(currentSetIndex + 1);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option ? styles.optionSelected : styles.option;
    }

    if (option === currentQuestion.correctAnswer) {
      return styles.optionCorrect;
    }
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return styles.optionWrong;
    }
    return styles.option;
  };

  const getOptionTextStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option ? styles.optionTextSelected : styles.optionText;
    }

    if (option === currentQuestion.correctAnswer) {
      return styles.optionTextCorrect;
    }
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return styles.optionTextWrong;
    }
    return styles.optionText;
  };

  // Quiz Complete Screen
  if (quizComplete) {
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= PASSING_SCORE;
    const hasNextSet = currentSetIndex < totalSets - 1;
    const currentSetName = getSetName(categoryId as QuizCategory, currentSetIndex);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.resultCard}>
            <View style={[styles.resultIcon, { backgroundColor: passed ? '#10b98120' : '#ef444420' }]}>
              <Ionicons
                name={passed ? 'trophy' : 'refresh'}
                size={48}
                color={passed ? '#10b981' : '#ef4444'}
              />
            </View>

            <Text style={styles.resultTitle}>
              {passed ? 'Passed!' : percentage >= 50 ? 'Almost There!' : 'Keep Learning!'}
            </Text>

            <Text style={styles.resultCategory}>{category.nameEnglish}</Text>
            <Text style={styles.resultSetName}>{currentSetName}</Text>
            {totalSets > 1 && (
              <Text style={styles.resultSetProgress}>Set {currentSetIndex + 1} of {totalSets}</Text>
            )}

            <View style={[styles.scoreCircle, { borderColor: passed ? '#10b981' : '#ef4444' }]}>
              <Text style={[styles.scorePercentage, { color: passed ? '#10b981' : '#ef4444' }]}>{percentage}%</Text>
              <Text style={styles.scoreLabel}>{passed ? 'Passed' : `Need ${PASSING_SCORE}%`}</Text>
            </View>

            <View style={styles.resultStats}>
              <View style={styles.resultStat}>
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                <Text style={styles.resultStatValue}>{score}</Text>
                <Text style={styles.resultStatLabel}>Correct</Text>
              </View>
              <View style={styles.resultStat}>
                <Ionicons name="close-circle" size={24} color="#ef4444" />
                <Text style={styles.resultStatValue}>{questions.length - score}</Text>
                <Text style={styles.resultStatLabel}>Wrong</Text>
              </View>
              <View style={styles.resultStat}>
                <Ionicons name="time" size={24} color="#3b82f6" />
                <Text style={styles.resultStatValue}>{totalTime}s</Text>
                <Text style={styles.resultStatLabel}>Time</Text>
              </View>
            </View>

            <View style={styles.resultActions}>
              {hasNextSet && (
                <Pressable style={styles.nextSetButton} onPress={handleNextSet}>
                  <Text style={styles.nextSetButtonText}>Next Set</Text>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </Pressable>
              )}
              <Pressable style={styles.restartButton} onPress={handleRestart}>
                <Ionicons name="refresh" size={20} color="#ffffff" />
                <Text style={styles.restartButtonText}>Try Again</Text>
              </Pressable>
              <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="#64748b" />
                <Text style={styles.backButtonText}>Back to Categories</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
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
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>
        <View style={styles.scoreContainer}>
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Category Badge */}
          <View style={styles.badgeRow}>
            <View style={[styles.categoryBadge, { backgroundColor: `${category.color}20` }]}>
              <Ionicons name={category.icon as any} size={16} color={category.color} />
              <Text style={[styles.categoryBadgeText, { color: category.color }]}>
                {category.nameEnglish}
              </Text>
            </View>
            {totalSets > 1 && (
              <View style={styles.setBadge}>
                <Text style={styles.setBadgeText}>
                  {getSetName(categoryId as QuizCategory, currentSetIndex)}
                </Text>
              </View>
            )}
          </View>

          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.difficultyBadge}>
              {currentQuestion.difficulty.toUpperCase()}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.questionArabic && (
              <Text style={styles.questionArabic}>{currentQuestion.questionArabic}</Text>
            )}
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options?.map((option, index) => (
              <Pressable
                key={index}
                style={getOptionStyle(option)}
                onPress={() => handleSelectAnswer(option)}
                disabled={showResult}
              >
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={getOptionTextStyle(option)}>{option}</Text>
                {showResult && option === currentQuestion.correctAnswer && (
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                )}
              </Pressable>
            ))}
          </View>

          {/* Explanation */}
          {showResult && currentQuestion.explanation && (
            <View style={[styles.explanationCard, isCorrect ? styles.explanationCorrect : styles.explanationWrong]}>
              <Ionicons
                name={isCorrect ? 'checkmark-circle' : 'information-circle'}
                size={24}
                color={isCorrect ? '#10b981' : '#f59e0b'}
              />
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        {!showResult ? (
          <Pressable
            style={[styles.confirmButton, !selectedAnswer && styles.confirmButtonDisabled]}
            onPress={handleConfirm}
            disabled={!selectedAnswer}
          >
            <Text style={styles.confirmButtonText}>Check Answer</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </Pressable>
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
  loadingContainer: {
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  closeButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  setBadge: {
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  setBadgeText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  difficultyBadge: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  questionArabic: {
    color: '#10b981',
    fontSize: 24,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 40,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  optionCorrect: {
    backgroundColor: '#10b98120',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  optionWrong: {
    backgroundColor: '#ef444420',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  optionTextSelected: {
    flex: 1,
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextCorrect: {
    flex: 1,
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextWrong: {
    flex: 1,
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  explanationCard: {
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  explanationCorrect: {
    backgroundColor: '#10b98115',
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  explanationWrong: {
    backgroundColor: '#f59e0b15',
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  explanationText: {
    flex: 1,
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#334155',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Result Screen Styles
  resultContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  resultCategory: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#10b981',
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  resultStat: {
    alignItems: 'center',
  },
  resultStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  resultStatLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  resultActions: {
    width: '100%',
    gap: 12,
  },
  restartButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#334155',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  backButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  resultSetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f59e0b',
    marginTop: 4,
  },
  resultSetProgress: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
  },
  nextSetButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextSetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#10b98120',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  retryButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
});
