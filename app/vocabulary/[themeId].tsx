import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getThemeById, getWordsByTheme } from '../../src/data/arabic/vocabulary';
import { getWritingExercisesForVocabularyTheme } from '../../src/data/arabic/exercises';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { useEffect, useState } from 'react';

export default function ThemeDetailScreen() {
  const { themeId } = useLocalSearchParams<{ themeId: string }>();
  const theme = getThemeById(themeId || '');
  const words = getWordsByTheme(themeId || '');

  const {
    progress,
    showVowels,
    markWordLearned,
    markWordMastered,
    startTheme,
    addXp,
    updateStreak,
  } = useProgressStore();

  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const { speak, isSpeaking } = useArabicSpeech();

  useEffect(() => {
    if (theme && !progress.vocabularyProgress.themesStarted.includes(theme.id)) {
      startTheme(theme.id);
    }
  }, [theme]);

  if (!theme) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Theme not found</Text>
          <Pressable style={styles.backLink} onPress={() => router.back()}>
            <Text style={styles.backLinkText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const learnedWords = progress.vocabularyProgress.wordsLearned;
  const masteredWords = progress.vocabularyProgress.wordsMastered;

  const getWordStatus = (wordId: string) => {
    if (masteredWords.includes(wordId)) return 'mastered';
    if (learnedWords.includes(wordId)) return 'learned';
    return 'new';
  };

  const themeWordsLearned = words.filter((w) => learnedWords.includes(w.id)).length;
  const progressPercent = Math.round((themeWordsLearned / words.length) * 100);

  const handleMarkLearned = (wordId: string) => {
    markWordLearned(wordId);
    addXp(5);
    updateStreak();
  };

  const handleMarkMastered = (wordId: string) => {
    markWordMastered(wordId);
    addXp(15);
    updateStreak();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>{theme.name}</Text>
            <Text style={styles.titleArabic}>{theme.nameArabic}</Text>
          </View>
        </View>

        {/* Theme Info Card */}
        <View style={[styles.infoCard, { borderLeftColor: theme.color }]}>
          <View style={styles.infoLeft}>
            <Text style={styles.themeIcon}>{theme.icon}</Text>
          </View>
          <View style={styles.infoRight}>
            <Text style={styles.infoDesc}>{theme.description}</Text>
            <View style={styles.infoStats}>
              <Text style={styles.infoStat}>
                {themeWordsLearned}/{words.length} words learned
              </Text>
              <Text style={styles.infoProgress}>{progressPercent}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercent}%`, backgroundColor: theme.color },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Word List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Words ({words.length})</Text>

          {words.map((word) => {
            const status = getWordStatus(word.id);
            const isExpanded = expandedWordId === word.id;

            return (
              <Pressable
                key={word.id}
                style={styles.wordCard}
                onPress={() => setExpandedWordId(isExpanded ? null : word.id)}
              >
                <View style={styles.wordMain}>
                  <View style={styles.wordLeft}>
                    <Text style={styles.wordArabic}>
                      {showVowels ? word.arabicWithVowels : word.arabic}
                    </Text>
                    <Text style={styles.wordTranslit}>{word.transliteration}</Text>
                  </View>
                  <View style={styles.wordRight}>
                    <Text style={styles.wordEnglish}>{word.english}</Text>
                    <View style={styles.wordMeta}>
                      {word.gender && (
                        <View style={styles.genderBadge}>
                          <Text style={styles.genderText}>
                            {word.gender === 'masculine' ? 'm' : 'f'}
                          </Text>
                        </View>
                      )}
                      {status !== 'new' && (
                        <Ionicons
                          name={status === 'mastered' ? 'star' : 'checkmark-circle'}
                          size={16}
                          color={status === 'mastered' ? '#22c55e' : '#D4AF37'}
                        />
                      )}
                    </View>
                  </View>
                  <Pressable
                    style={styles.audioBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      speak(word.arabicWithVowels || word.arabic);
                    }}
                  >
                    <Ionicons name="volume-medium" size={20} color="#D4AF37" />
                  </Pressable>
                </View>

                {isExpanded && (
                  <View style={styles.wordExpanded}>
                    {word.exampleSentence && (
                      <View style={styles.exampleSection}>
                        <Text style={styles.exampleLabel}>Example:</Text>
                        <Text style={styles.exampleArabic}>
                          {word.exampleSentence.arabic}
                        </Text>
                        <Text style={styles.exampleTranslit}>
                          {word.exampleSentence.transliteration}
                        </Text>
                        <Text style={styles.exampleEnglish}>
                          {word.exampleSentence.english}
                        </Text>
                      </View>
                    )}

                    <View style={styles.actionButtons}>
                      {status === 'new' && (
                        <Pressable
                          style={styles.learnButton}
                          onPress={() => handleMarkLearned(word.id)}
                        >
                          <Ionicons name="checkmark" size={18} color="#ffffff" />
                          <Text style={styles.learnButtonText}>Mark Learned (+5 XP)</Text>
                        </Pressable>
                      )}
                      {status === 'learned' && (
                        <Pressable
                          style={styles.masterButton}
                          onPress={() => handleMarkMastered(word.id)}
                        >
                          <Ionicons name="star" size={18} color="#0f172a" />
                          <Text style={styles.masterButtonText}>
                            Mark Mastered (+15 XP)
                          </Text>
                        </Pressable>
                      )}
                      {status === 'mastered' && (
                        <View style={styles.masteredLabel}>
                          <Ionicons name="star" size={16} color="#22c55e" />
                          <Text style={styles.masteredText}>Mastered!</Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Practice Buttons */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable
            style={[styles.practiceButton, { backgroundColor: theme.color }]}
            onPress={() => router.push(`/vocabulary/flashcards?themeId=${theme.id}`)}
          >
            <Ionicons name="layers" size={20} color="#ffffff" />
            <Text style={styles.practiceButtonText}>Practice with Flashcards</Text>
          </Pressable>

          {/* Writing Practice Button */}
          {getWritingExercisesForVocabularyTheme(theme.id).length > 0 && (
            <Pressable
              style={[styles.practiceButton, styles.writingPracticeButton]}
              onPress={() => router.push(`/vocabulary/writing-practice?themeId=${theme.id}`)}
            >
              <Ionicons name="pencil" size={20} color="#ffffff" />
              <Text style={styles.practiceButtonText}>Writing Practice</Text>
              <View style={styles.exerciseCount}>
                <Text style={styles.exerciseCountText}>
                  {getWritingExercisesForVocabularyTheme(theme.id).length}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 18,
    marginBottom: 16,
  },
  backLink: {
    padding: 12,
  },
  backLinkText: {
    color: '#6366f1',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    borderLeftWidth: 4,
  },
  infoLeft: {
    marginRight: 16,
  },
  themeIcon: {
    fontSize: 40,
  },
  infoRight: {
    flex: 1,
  },
  infoDesc: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoStat: {
    fontSize: 12,
    color: '#64748b',
  },
  infoProgress: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  wordCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  wordMain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  wordLeft: {
    flex: 1,
  },
  wordArabic: {
    fontSize: 22,
    color: '#ffffff',
  },
  wordTranslit: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 2,
  },
  wordRight: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  wordEnglish: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    textAlign: 'right',
  },
  wordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  genderBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  genderText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
  },
  audioBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordExpanded: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  exampleSection: {
    marginBottom: 16,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  exampleArabic: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 4,
  },
  exampleTranslit: {
    fontSize: 13,
    color: '#6366f1',
    marginBottom: 4,
  },
  exampleEnglish: {
    fontSize: 13,
    color: '#94a3b8',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  learnButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  learnButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 6,
  },
  masterButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  masterButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    marginLeft: 6,
  },
  masteredLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masteredText: {
    color: '#22c55e',
    fontWeight: '600',
    marginLeft: 6,
  },
  practiceButton: {
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  writingPracticeButton: {
    backgroundColor: '#D4AF37',
  },
  practiceButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  exerciseCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  exerciseCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
