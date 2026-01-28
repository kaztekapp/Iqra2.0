import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { arabicLetters } from '../../src/data/arabic/alphabet/letters';
import { vocabularyWords } from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';

interface Question {
  id: string;
  type: 'letter_recognition' | 'vocabulary_quiz';
  question: string;
  questionArabic?: string;
  options: { id: string; text: string; textArabic?: string }[];
  correctAnswerId: string;
}

const generateLetterRecognitionQuestions = (count: number): Question[] => {
  const shuffledLetters = [...arabicLetters].sort(() => Math.random() - 0.5);
  const questions: Question[] = [];

  for (let i = 0; i < Math.min(count, shuffledLetters.length); i++) {
    const correctLetter = shuffledLetters[i];
    const wrongLetters = arabicLetters
      .filter((l) => l.id !== correctLetter.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [
      { id: correctLetter.id, text: correctLetter.name, textArabic: correctLetter.letter },
      ...wrongLetters.map((l) => ({ id: l.id, text: l.name, textArabic: l.letter })),
    ].sort(() => Math.random() - 0.5);

    questions.push({
      id: `letter-${i}`,
      type: 'letter_recognition',
      question: `What letter is this?`,
      questionArabic: correctLetter.letter,
      options,
      correctAnswerId: correctLetter.id,
    });
  }

  return questions;
};

const generateVocabularyQuizQuestions = (count: number): Question[] => {
  const shuffledWords = [...vocabularyWords].sort(() => Math.random() - 0.5);
  const questions: Question[] = [];

  for (let i = 0; i < Math.min(count, shuffledWords.length); i++) {
    const correctWord = shuffledWords[i];
    const wrongWords = vocabularyWords
      .filter((w) => w.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [
      { id: correctWord.id, text: correctWord.english },
      ...wrongWords.map((w) => ({ id: w.id, text: w.english })),
    ].sort(() => Math.random() - 0.5);

    questions.push({
      id: `vocab-${i}`,
      type: 'vocabulary_quiz',
      question: `What does this word mean?`,
      questionArabic: correctWord.arabicWithVowels,
      options,
      correctAnswerId: correctWord.id,
    });
  }

  return questions;
};

export default function ExerciseScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { recordExerciseResult, addXp, updateStreak, showVowels } = useProgressStore();
  const { speak, isSpeaking } = useArabicSpeech();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const shakeX = useSharedValue(0);
  const scaleCorrect = useSharedValue(1);

  useEffect(() => {
    // Generate questions based on exercise type
    let generatedQuestions: Question[] = [];

    switch (exerciseId) {
      case 'letter-recognition':
        generatedQuestions = generateLetterRecognitionQuestions(10);
        break;
      case 'vocabulary-quiz':
        generatedQuestions = generateVocabularyQuizQuestions(10);
        break;
      case 'quick-review':
        // Mix of both
        generatedQuestions = [
          ...generateLetterRecognitionQuestions(5),
          ...generateVocabularyQuizQuestions(5),
        ].sort(() => Math.random() - 0.5);
        break;
      default:
        generatedQuestions = generateVocabularyQuizQuestions(10);
    }

    setQuestions(generatedQuestions);
  }, [exerciseId]);

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionId);
    setIsAnswered(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = optionId === currentQuestion.correctAnswerId;

    if (isCorrect) {
      scaleCorrect.value = withSequence(
        withTiming(1.2, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      addXp(5);
    } else {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    recordExerciseResult(
      currentQuestion.type === 'letter_recognition' ? 'letter_recognition' : 'multiple_choice',
      isCorrect
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      updateStreak();
      setIsComplete(true);
    }
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const exerciseTitle = {
    'letter-recognition': 'Letter Recognition',
    'vocabulary-quiz': 'Vocabulary Quiz',
    'quick-review': 'Quick Review',
    listening: 'Listening Practice',
    writing: 'Writing Practice',
    matching: 'Matching Game',
    'fill-blank': 'Fill in the Blank',
  }[exerciseId || ''] || 'Exercise';

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isComplete) {
    const accuracy = Math.round((score.correct / score.total) * 100);
    const xpEarned = score.correct * 5;

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
            {accuracy >= 80 ? 'Excellent!' : accuracy >= 50 ? 'Good Job!' : 'Keep Practicing!'}
          </Text>
          <Text style={styles.completeSubtitle}>{exerciseTitle}</Text>

          <View style={styles.resultsCard}>
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{score.correct}</Text>
              <Text style={styles.resultLabel}>Correct</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{score.total - score.correct}</Text>
              <Text style={styles.resultLabel}>Wrong</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultItem}>
              <Text style={[styles.resultValue, { color: '#6366f1' }]}>{accuracy}%</Text>
              <Text style={styles.resultLabel}>Accuracy</Text>
            </View>
          </View>

          <Text style={styles.xpEarned}>+{xpEarned} XP earned!</Text>

          <View style={styles.completeButtons}>
            <Pressable
              style={styles.retryButton}
              onPress={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setScore({ correct: 0, total: 0 });
                setIsComplete(false);
                // Regenerate questions
                const newQuestions =
                  exerciseId === 'letter-recognition'
                    ? generateLetterRecognitionQuestions(10)
                    : generateVocabularyQuizQuestions(10);
                setQuestions(newQuestions);
              }}
            >
              <Ionicons name="refresh" size={20} color="#6366f1" />
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable>
            <Pressable style={styles.doneButton} onPress={() => router.back()}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{exerciseTitle}</Text>
          <Text style={styles.headerProgress}>
            {currentIndex + 1} / {questions.length}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Ionicons name="star" size={16} color="#D4AF37" />
          <Text style={styles.scoreText}>{score.correct}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <Animated.View style={[styles.questionContainer, shakeStyle]}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.questionArabic && (
          <View style={styles.questionArabicContainer}>
            <Text style={styles.questionArabic}>{currentQuestion.questionArabic}</Text>
            <Pressable
              style={[styles.questionAudioBtn, isSpeaking && styles.questionAudioBtnActive]}
              onPress={() => speak(currentQuestion.questionArabic!)}
            >
              <Ionicons name="volume-high" size={24} color={isSpeaking ? "#ffffff" : "#D4AF37"} />
            </Pressable>
          </View>
        )}
      </Animated.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === currentQuestion.correctAnswerId;
          const showCorrect = isAnswered && isCorrect;
          const showWrong = isAnswered && isSelected && !isCorrect;

          return (
            <Pressable
              key={option.id}
              style={[
                styles.optionButton,
                isSelected && styles.optionSelected,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
              onPress={() => handleSelectAnswer(option.id)}
              disabled={isAnswered}
            >
              {option.textArabic && (
                <Text
                  style={[
                    styles.optionArabic,
                    (showCorrect || showWrong) && styles.optionTextActive,
                  ]}
                >
                  {option.textArabic}
                </Text>
              )}
              <Text
                style={[
                  styles.optionText,
                  (showCorrect || showWrong) && styles.optionTextActive,
                ]}
              >
                {option.text}
              </Text>
              {showCorrect && (
                <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
              )}
              {showWrong && <Ionicons name="close-circle" size={24} color="#ffffff" />}
            </Pressable>
          );
        })}
      </View>

      {/* Next Button */}
      {isAnswered && (
        <View style={styles.nextButtonContainer}>
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
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
    backgroundColor: '#D4AF3720',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  scoreText: {
    color: '#D4AF37',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
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
  questionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  questionArabicContainer: {
    alignItems: 'center',
  },
  questionArabic: {
    fontSize: 72,
    color: '#ffffff',
    textAlign: 'center',
  },
  questionAudioBtn: {
    marginTop: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionAudioBtnActive: {
    backgroundColor: '#D4AF37',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#6366f1',
  },
  optionCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  optionWrong: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  optionArabic: {
    fontSize: 28,
    color: '#ffffff',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#ffffff',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
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
    color: '#D4AF37',
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
