import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  JUZ_LESSONS,
  JUZ_INTRO_LESSONS,
  JuzLesson,
  JuzIntroLesson,
} from '../../../src/data/arabic/quran/lessons/juzLessons';
import {
  getTotalSets,
  getSetName,
  getQuestionsBySet,
} from '../../../src/data/arabic/quran/quizzes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TabType = 'learn' | 'quiz';

// Intro Card Component
function IntroCard({ lesson, onPress }: { lesson: JuzIntroLesson; onPress: () => void }) {
  const iconMap: Record<string, string> = {
    intro_what_is_juz: 'help-circle',
    intro_structure: 'layers',
    intro_naming: 'text',
    intro_memorization: 'school',
    intro_reading_plan: 'calendar',
  };

  return (
    <Pressable style={styles.introCard} onPress={onPress}>
      <LinearGradient
        colors={['#3b82f6', '#1d4ed8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.introCardGradient}
      >
        <View style={styles.introCardIcon}>
          <Ionicons name={iconMap[lesson.id] as any || 'book'} size={24} color="#ffffff" />
        </View>
        <View style={styles.introCardContent}>
          <Text style={styles.introCardTitle}>{lesson.title}</Text>
          <Text style={styles.introCardTitleArabic}>{lesson.titleArabic}</Text>
          <Text style={styles.introCardDesc} numberOfLines={2}>
            {lesson.description}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ffffff80" />
      </LinearGradient>
    </Pressable>
  );
}

// Juz Card Component
function JuzCard({ juz, onPress }: { juz: JuzLesson; onPress: () => void }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#22c55e';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  return (
    <Pressable style={styles.juzCard} onPress={onPress}>
      <View style={styles.juzCardHeader}>
        <View style={styles.juzNumber}>
          <Text style={styles.juzNumberText}>{juz.id}</Text>
        </View>
        <View style={styles.juzInfo}>
          <Text style={styles.juzName}>{juz.nameEnglish}</Text>
          <Text style={styles.juzNameArabic}>{juz.nameArabic}</Text>
        </View>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: `${getDifficultyColor(juz.memorization.difficulty)}20` },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: getDifficultyColor(juz.memorization.difficulty) },
            ]}
          >
            {juz.memorization.difficulty}
          </Text>
        </View>
      </View>

      <View style={styles.juzCardDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="book-outline" size={14} color="#64748b" />
          <Text style={styles.detailText}>
            {juz.startSurah} → {juz.endSurah}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="layers-outline" size={14} color="#64748b" />
          <Text style={styles.detailText}>{juz.totalSurahs} Surah(s)</Text>
        </View>
      </View>

      <View style={styles.juzCardThemes}>
        {juz.keyThemes.slice(0, 2).map((theme, index) => (
          <View key={index} style={styles.themeBadge}>
            <Text style={styles.themeText} numberOfLines={1}>
              {theme}
            </Text>
          </View>
        ))}
        {juz.keyThemes.length > 2 && (
          <Text style={styles.moreThemes}>+{juz.keyThemes.length - 2} more</Text>
        )}
      </View>

      <View style={styles.juzCardFooter}>
        <View style={styles.memorizeInfo}>
          <Ionicons name="time-outline" size={14} color="#3b82f6" />
          <Text style={styles.memorizeText}>
            ~{juz.memorization.estimatedDays} days to memorize
          </Text>
        </View>
        <Pressable style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>View</Text>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

// Quiz Set Card Component
function QuizSetCard({
  setIndex,
  setName,
  questionCount,
  onPress,
}: {
  setIndex: number;
  setName: string;
  questionCount: number;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quizSetCard} onPress={onPress}>
      <View style={styles.quizSetIcon}>
        <Text style={styles.quizSetNumber}>{setIndex + 1}</Text>
      </View>
      <View style={styles.quizSetInfo}>
        <Text style={styles.quizSetName}>{setName}</Text>
        <Text style={styles.quizSetCount}>{questionCount} questions</Text>
      </View>
      <Ionicons name="play-circle" size={28} color="#3b82f6" />
    </Pressable>
  );
}

export default function JuzMainScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    Animated.spring(slideAnim, {
      toValue: tab === 'learn' ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handleIntroPress = (lessonId: string) => {
    router.push(`/quran/juz/intro/${lessonId}` as any);
  };

  const handleJuzPress = (juzId: number) => {
    router.push(`/quran/juz/${juzId}` as any);
  };

  const handleQuizSetPress = (setIndex: number) => {
    router.push(`/quran/quiz/juz?setIndex=${setIndex}` as any);
  };

  const totalSets = getTotalSets('juz');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Juz (Ajza')</Text>
          <Text style={styles.titleArabic}>الأجزاء</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBackground}>
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (SCREEN_WIDTH - 48) / 2],
                    }),
                  },
                ],
              },
            ]}
          />
          <Pressable
            style={styles.tab}
            onPress={() => handleTabChange('learn')}
          >
            <Ionicons
              name="school"
              size={18}
              color={activeTab === 'learn' ? '#ffffff' : '#64748b'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'learn' && styles.tabTextActive,
              ]}
            >
              Learn
            </Text>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => handleTabChange('quiz')}
          >
            <Ionicons
              name="help-circle"
              size={18}
              color={activeTab === 'quiz' ? '#ffffff' : '#64748b'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'quiz' && styles.tabTextActive,
              ]}
            >
              Quiz
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'learn' ? (
          /* Learn Tab Content */
          <View style={styles.content}>
            {/* Introduction Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="information-circle" size={20} color="#3b82f6" />
                <Text style={styles.sectionTitle}>Introduction</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Start here to understand the Juz system
              </Text>
              {JUZ_INTRO_LESSONS.map((lesson) => (
                <IntroCard
                  key={lesson.id}
                  lesson={lesson}
                  onPress={() => handleIntroPress(lesson.id)}
                />
              ))}
            </View>

            {/* All 30 Juz Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="library" size={20} color="#3b82f6" />
                <Text style={styles.sectionTitle}>All 30 Juz</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Explore each Juz in detail
              </Text>

              {/* Quick Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>30</Text>
                  <Text style={styles.statLabel}>Juz</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>60</Text>
                  <Text style={styles.statLabel}>Hizb</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>240</Text>
                  <Text style={styles.statLabel}>Quarters</Text>
                </View>
              </View>

              {JUZ_LESSONS.map((juz) => (
                <JuzCard
                  key={juz.id}
                  juz={juz}
                  onPress={() => handleJuzPress(juz.id)}
                />
              ))}
            </View>
          </View>
        ) : (
          /* Quiz Tab Content */
          <View style={styles.content}>
            {/* Quiz Header Card */}
            <View style={styles.quizHeaderCard}>
              <View style={styles.quizHeaderIcon}>
                <Ionicons name="trophy" size={40} color="#f59e0b" />
              </View>
              <Text style={styles.quizHeaderTitle}>Test Your Knowledge</Text>
              <Text style={styles.quizHeaderSubtitle}>
                Challenge yourself with {totalSets} sets of questions about the 30 Juz
              </Text>
            </View>

            {/* Quiz Sets */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={20} color="#3b82f6" />
                <Text style={styles.sectionTitle}>Quiz Sets</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Complete each set to master Juz knowledge
              </Text>

              {Array.from({ length: totalSets }).map((_, index) => {
                const questions = getQuestionsBySet('juz', index);
                return (
                  <QuizSetCard
                    key={index}
                    setIndex={index}
                    setName={getSetName('juz', index)}
                    questionCount={questions.length}
                    onPress={() => handleQuizSetPress(index)}
                  />
                );
              })}
            </View>

            {/* Random Quiz Option */}
            <Pressable
              style={styles.randomQuizButton}
              onPress={() => router.push('/quran/quiz/juz' as any)}
            >
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.randomQuizGradient}
              >
                <Ionicons name="shuffle" size={24} color="#ffffff" />
                <View style={styles.randomQuizText}>
                  <Text style={styles.randomQuizTitle}>Random Quiz</Text>
                  <Text style={styles.randomQuizSubtitle}>
                    Mix of all questions
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#ffffff" />
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#3b82f6',
    marginTop: 2,
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: (SCREEN_WIDTH - 48) / 2 - 4,
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  // Intro Card Styles
  introCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  introCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  introCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introCardContent: {
    flex: 1,
    marginLeft: 14,
  },
  introCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  introCardTitleArabic: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  introCardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#334155',
  },
  // Juz Card Styles
  juzCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  juzCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  juzNumber: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3b82f620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  juzNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  juzInfo: {
    flex: 1,
    marginLeft: 12,
  },
  juzName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  juzNameArabic: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  juzCardDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  juzCardThemes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  themeBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    maxWidth: '45%',
  },
  themeText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  moreThemes: {
    fontSize: 11,
    color: '#3b82f6',
    alignSelf: 'center',
  },
  juzCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
  },
  memorizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memorizeText: {
    fontSize: 12,
    color: '#3b82f6',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Quiz Tab Styles
  quizHeaderCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  quizHeaderIcon: {
    marginBottom: 12,
  },
  quizHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  quizHeaderSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  quizSetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  quizSetIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3b82f620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizSetNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  quizSetInfo: {
    flex: 1,
    marginLeft: 14,
  },
  quizSetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  quizSetCount: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  randomQuizButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  randomQuizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  randomQuizText: {
    flex: 1,
  },
  randomQuizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  randomQuizSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
});
