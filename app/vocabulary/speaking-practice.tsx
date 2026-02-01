import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import { vocabularyWords, getWordsByTheme, getThemeById } from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { useSpeechRecognition, PronunciationResult } from '../../src/hooks/useSpeechRecognition';
import { VocabularyWord } from '../../src/types/arabic';

type PracticeState = 'ready' | 'listening' | 'recording' | 'processing' | 'result';

export default function SpeakingPracticeScreen() {
  const { themeId } = useLocalSearchParams<{ themeId?: string }>();
  const { showVowels, addXp, updateStreak } = useProgressStore();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, totalXp: 0 });
  const [practiceState, setPracticeState] = useState<PracticeState>('ready');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [hasListened, setHasListened] = useState(false);

  const { speak, isSpeaking } = useArabicSpeech();
  const {
    isListening,
    transcript,
    error: speechError,
    isSupported,
    isFallbackMode,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const theme = themeId ? getThemeById(themeId) : null;

  // Animations
  const recordingScale = useSharedValue(1);
  const recordingOpacity = useSharedValue(1);
  const resultScale = useSharedValue(0);

  useEffect(() => {
    const wordList = themeId ? getWordsByTheme(themeId) : vocabularyWords;
    const shuffled = [...wordList].sort(() => Math.random() - 0.5).slice(0, 10);
    setWords(shuffled);
  }, [themeId]);

  useEffect(() => {
    if (isListening) {
      recordingScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
      recordingOpacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(recordingScale);
      cancelAnimation(recordingOpacity);
      recordingScale.value = withTiming(1);
      recordingOpacity.value = withTiming(1);
    }
  }, [isListening]);

  useEffect(() => {
    if (result) {
      resultScale.value = withSpring(1, { damping: 12 });
    } else {
      resultScale.value = 0;
    }
  }, [result]);

  const recordingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: recordingScale.value }],
    opacity: recordingOpacity.value,
  }));

  const resultAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: resultScale.value }],
  }));

  const handlePlayExample = async () => {
    if (isSpeaking) return;
    const word = words[currentIndex];
    await speak(word.arabicWithVowels || word.arabic);
    setHasListened(true);
    if (practiceState === 'ready') {
      setPracticeState('listening');
    }
  };

  const handleStartRecording = async () => {
    if (!hasListened) {
      // Must listen first
      await handlePlayExample();
      return;
    }

    const word = words[currentIndex];
    const expectedText = word.arabic;

    setPracticeState('recording');

    await startListening(expectedText, (pronunciationResult) => {
      setResult(pronunciationResult);
      setPracticeState('result');

      // Update stats
      const xpEarned = pronunciationResult.isCorrect ? 10 : 2;
      setStats((prev) => ({
        correct: prev.correct + (pronunciationResult.isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (pronunciationResult.isCorrect ? 0 : 1),
        totalXp: prev.totalXp + xpEarned,
      }));
      addXp(xpEarned);
    });
  };

  const handleStopRecording = async () => {
    await stopListening();
    setPracticeState('processing');
  };

  const handleNextWord = () => {
    setResult(null);
    setHasListened(false);
    setPracticeState('ready');

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      updateStreak();
      setCurrentIndex(words.length); // Complete
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setPracticeState('ready');
  };

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading practice words...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show fallback mode message
  if (isFallbackMode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Speaking Practice</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.fallbackContainer}>
          <View style={styles.fallbackIcon}>
            <Ionicons name="build" size={64} color="#f59e0b" />
          </View>
          <Text style={styles.fallbackTitle}>Development Build Required</Text>
          <Text style={styles.fallbackTitleArabic}>يتطلب بناء التطوير</Text>
          <Text style={styles.fallbackDesc}>
            Speech recognition requires a development build to work. Run the following commands:
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>npx expo prebuild</Text>
            <Text style={styles.codeText}>npx expo run:ios</Text>
          </View>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Session complete
  if (currentIndex >= words.length) {
    const accuracy = words.length > 0
      ? Math.round((stats.correct / words.length) * 100)
      : 0;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <View style={styles.completeIcon}>
            <Ionicons name="mic" size={64} color="#10b981" />
          </View>
          <Text style={styles.completeTitle}>Practice Complete!</Text>
          <Text style={styles.completeTitleArabic}>اكتمل التدريب</Text>

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

  const currentWord = words[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Speaking Practice</Text>
          <Text style={styles.headerProgress}>
            {currentIndex + 1} / {words.length}
          </Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{stats.correct}/{currentIndex}</Text>
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Word Card */}
        <View style={styles.wordCard}>
          <Text style={styles.wordArabic}>
            {showVowels ? currentWord.arabicWithVowels : currentWord.arabic}
          </Text>
          <Text style={styles.wordTranslit}>{currentWord.transliteration}</Text>
          <Text style={styles.wordEnglish}>{currentWord.english}</Text>
        </View>

        {/* Listen Button */}
        <View style={styles.actionSection}>
          <Pressable
            style={[styles.listenButton, isSpeaking && styles.listenButtonActive]}
            onPress={handlePlayExample}
          >
            <Ionicons
              name={isSpeaking ? 'volume-high' : 'play'}
              size={28}
              color={isSpeaking ? '#ffffff' : '#D4AF37'}
            />
            <Text style={[styles.listenButtonText, isSpeaking && { color: '#ffffff' }]}>
              {isSpeaking ? 'Playing...' : hasListened ? 'Listen Again' : 'Listen First'}
            </Text>
          </Pressable>
        </View>

        {/* Recording Section */}
        {practiceState !== 'result' && (
          <View style={styles.recordSection}>
            <Text style={styles.recordInstruction}>
              {!hasListened
                ? 'Tap "Listen First" to hear the pronunciation'
                : practiceState === 'recording' || isListening
                ? 'Speaking... Tap to stop'
                : practiceState === 'processing'
                ? 'Processing...'
                : 'Tap the microphone and say the word'}
            </Text>

            <Animated.View style={[styles.recordButtonWrapper, recordingAnimatedStyle]}>
              <Pressable
                style={[
                  styles.recordButton,
                  (isListening || practiceState === 'recording') && styles.recordButtonRecording,
                  !hasListened && styles.recordButtonDisabled,
                ]}
                onPress={isListening ? handleStopRecording : handleStartRecording}
                disabled={practiceState === 'processing' || !hasListened}
              >
                <Ionicons
                  name={isListening || practiceState === 'recording' ? 'stop' : 'mic'}
                  size={48}
                  color="#ffffff"
                />
              </Pressable>
            </Animated.View>

            {transcript && (
              <Text style={styles.transcriptText}>"{transcript}"</Text>
            )}

            {speechError && (
              <Text style={styles.errorText}>{speechError}</Text>
            )}
          </View>
        )}

        {/* Result Section */}
        {practiceState === 'result' && result && (
          <Animated.View style={[styles.resultSection, resultAnimatedStyle]}>
            <View
              style={[
                styles.resultCard,
                result.isCorrect ? styles.resultCardCorrect : styles.resultCardIncorrect,
              ]}
            >
              <View style={styles.resultHeader}>
                <View
                  style={[
                    styles.resultIcon,
                    result.isCorrect ? styles.resultIconCorrect : styles.resultIconIncorrect,
                  ]}
                >
                  <Ionicons
                    name={result.isCorrect ? 'checkmark' : 'close'}
                    size={32}
                    color="#ffffff"
                  />
                </View>
                <Text
                  style={[
                    styles.resultTitle,
                    result.isCorrect ? styles.resultTitleCorrect : styles.resultTitleIncorrect,
                  ]}
                >
                  {result.isCorrect ? 'Correct!' : 'Try Again'}
                </Text>
              </View>

              <View style={styles.similarityContainer}>
                <Text style={styles.similarityLabel}>Match Score</Text>
                <Text
                  style={[
                    styles.similarityValue,
                    result.similarity >= 70 ? styles.similarityGood : styles.similarityLow,
                  ]}
                >
                  {result.similarity}%
                </Text>
              </View>

              <Text style={styles.feedbackText}>{result.feedback}</Text>

              {result.transcript && (
                <View style={styles.transcriptContainer}>
                  <Text style={styles.transcriptLabel}>You said:</Text>
                  <Text style={styles.transcriptValue}>"{result.transcript}"</Text>
                </View>
              )}

              <View style={styles.xpBadge}>
                <Ionicons name="star" size={16} color="#D4AF37" />
                <Text style={styles.xpBadgeText}>
                  +{result.isCorrect ? 10 : 2} XP
                </Text>
              </View>
            </View>

            <View style={styles.resultActions}>
              {!result.isCorrect && (
                <Pressable style={styles.tryAgainButton} onPress={handleTryAgain}>
                  <Ionicons name="refresh" size={20} color="#f59e0b" />
                  <Text style={styles.tryAgainText}>Try Again</Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.nextButton, !result.isCorrect && styles.nextButtonSecondary]}
                onPress={handleNextWord}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex < words.length - 1 ? 'Next Word' : 'Finish'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </Pressable>
            </View>
          </Animated.View>
        )}

        {/* Example Sentence */}
        {currentWord.exampleSentence && (
          <View style={styles.exampleCard}>
            <Text style={styles.exampleLabel}>Example:</Text>
            <Text style={styles.exampleArabic}>
              {currentWord.exampleSentence.arabic}
            </Text>
            <Text style={styles.exampleEnglish}>
              {currentWord.exampleSentence.english}
            </Text>
          </View>
        )}
      </ScrollView>
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
  scoreBadge: {
    backgroundColor: '#10b98120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
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
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  wordCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  wordArabic: {
    fontSize: 56,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  wordTranslit: {
    fontSize: 18,
    color: '#10b981',
    marginBottom: 8,
  },
  wordEnglish: {
    fontSize: 16,
    color: '#94a3b8',
  },
  actionSection: {
    marginBottom: 24,
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF3720',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  listenButtonActive: {
    backgroundColor: '#D4AF37',
  },
  listenButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },
  recordSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  recordInstruction: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  recordButtonWrapper: {
    marginBottom: 16,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordButtonRecording: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  recordButtonDisabled: {
    backgroundColor: '#334155',
    shadowOpacity: 0,
  },
  transcriptText: {
    color: '#94a3b8',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 8,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  resultSection: {
    marginBottom: 24,
  },
  resultCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCardCorrect: {
    backgroundColor: '#10b98120',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  resultCardIncorrect: {
    backgroundColor: '#ef444420',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultIconCorrect: {
    backgroundColor: '#10b981',
  },
  resultIconIncorrect: {
    backgroundColor: '#ef4444',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultTitleCorrect: {
    color: '#10b981',
  },
  resultTitleIncorrect: {
    color: '#ef4444',
  },
  similarityContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  similarityLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 4,
  },
  similarityValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  similarityGood: {
    color: '#10b981',
  },
  similarityLow: {
    color: '#f59e0b',
  },
  feedbackText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  transcriptContainer: {
    backgroundColor: '#0f172a40',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  transcriptLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 4,
  },
  transcriptValue: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF3720',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  xpBadgeText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 12,
  },
  tryAgainButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b20',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f59e0b',
    gap: 8,
  },
  tryAgainText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  nextButtonSecondary: {
    flex: 1,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  exampleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  exampleLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  exampleArabic: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  exampleEnglish: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  // Complete screen
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
    backgroundColor: '#10b98120',
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
    color: '#10b981',
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
    color: '#10b981',
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
  // Fallback mode styles
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  fallbackIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f59e0b20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  fallbackTitleArabic: {
    fontSize: 18,
    color: '#f59e0b',
    marginBottom: 24,
  },
  fallbackDesc: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  codeBlock: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
  },
  codeText: {
    color: '#10b981',
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  backButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
