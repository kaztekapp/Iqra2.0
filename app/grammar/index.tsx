import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../src/hooks/useLocalizedContent';
import { useProgressStore } from '../../src/stores/progressStore';
import { grammarLessons as lessonsData } from '../../src/data/arabic/grammar/lessons';

// Map category to icon and color
const categoryConfig: Record<string, { icon: string; color: string }> = {
  articles: { icon: 'text', color: '#6366f1' },
  pronouns: { icon: 'person', color: '#22c55e' },
  verbs: { icon: 'flash', color: '#ef4444' },
  nouns: { icon: 'cube', color: '#f59e0b' },
  adjectives: { icon: 'color-palette', color: '#D4AF37' },
  sentences: { icon: 'create', color: '#8b5cf6' },
  other: { icon: 'bulb', color: '#14b8a6' },
};

// Transform lessons data for UI - keep raw data, localize in component
const grammarLessons = lessonsData.map((lesson) => ({
  id: lesson.id,
  title: lesson.title,
  titleFr: (lesson as any).titleFr,
  titleArabic: lesson.titleArabic,
  description: lesson.description,
  descriptionFr: (lesson as any).descriptionFr,
  level: lesson.level,
  icon: categoryConfig[lesson.category]?.icon || 'book',
  color: categoryConfig[lesson.category]?.color || '#6366f1',
}));

export default function GrammarScreen() {
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();
  const { progress, getGrammarCompletionPercent } = useProgressStore();
  const completedLessons = progress.grammarProgress.lessonsCompleted;
  const startedLessons = progress.grammarProgress.lessonsStarted;

  const beginnerLessons = grammarLessons.filter((l) => l.level === 'beginner');
  const intermediateLessons = grammarLessons.filter((l) => l.level === 'intermediate');
  const advancedLessons = grammarLessons.filter((l) => l.level === 'advanced');

  const getLessonStatus = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return 'completed';
    if (startedLessons.includes(lessonId)) return 'in_progress';
    return 'new';
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
            <Text style={styles.title}>{t('grammar.title')}</Text>
            <Text style={styles.titleArabic}>الْقَوَاعِد</Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>{t('common.overallProgress')}</Text>
            <Text style={styles.progressValue}>
              {t('grammar.lessonsCount', { completed: completedLessons.length, total: grammarLessons.length })}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${getGrammarCompletionPercent()}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>
              {getGrammarCompletionPercent()}%
            </Text>
          </View>
        </View>

        {/* Beginner Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('common.beginner')}</Text>
            <Text style={styles.sectionTitleAr}>الْمُبْتَدِئ</Text>
          </View>

          {beginnerLessons.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            return (
              <Pressable
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => router.push(`/grammar/${lesson.id}` as any)}
              >
                <View
                  style={[styles.lessonIcon, { backgroundColor: lesson.color + '20' }]}
                >
                  <Ionicons name={lesson.icon as any} size={24} color={lesson.color} />
                </View>
                <View style={styles.lessonContent}>
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{lc(lesson.title, lesson.titleFr)}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                    {status === 'in_progress' && (
                      <Ionicons name="time" size={20} color="#D4AF37" />
                    )}
                  </View>
                  <Text style={styles.lessonTitleAr}>{lesson.titleArabic}</Text>
                  <Text style={styles.lessonDesc}>{lc(lesson.description, lesson.descriptionFr)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </Pressable>
            );
          })}
        </View>

        {/* Intermediate Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('common.intermediate')}</Text>
            <Text style={styles.sectionTitleAr}>الْمُتَوَسِّط</Text>
          </View>

          {intermediateLessons.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            return (
              <Pressable
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => router.push(`/grammar/${lesson.id}` as any)}
              >
                <View
                  style={[styles.lessonIcon, { backgroundColor: lesson.color + '20' }]}
                >
                  <Ionicons name={lesson.icon as any} size={24} color={lesson.color} />
                </View>
                <View style={styles.lessonContent}>
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{lc(lesson.title, lesson.titleFr)}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                    {status === 'in_progress' && (
                      <Ionicons name="time" size={20} color="#D4AF37" />
                    )}
                  </View>
                  <Text style={styles.lessonTitleAr}>{lesson.titleArabic}</Text>
                  <Text style={styles.lessonDesc}>{lc(lesson.description, lesson.descriptionFr)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </Pressable>
            );
          })}
        </View>

        {/* Advanced Section */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('common.advanced')}</Text>
            <Text style={styles.sectionTitleAr}>الْمُتَقَدِّم</Text>
          </View>

          {advancedLessons.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            return (
              <Pressable
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => router.push(`/grammar/${lesson.id}` as any)}
              >
                <View
                  style={[styles.lessonIcon, { backgroundColor: lesson.color + '20' }]}
                >
                  <Ionicons name={lesson.icon as any} size={24} color={lesson.color} />
                </View>
                <View style={styles.lessonContent}>
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{lc(lesson.title, lesson.titleFr)}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                    {status === 'in_progress' && (
                      <Ionicons name="time" size={20} color="#D4AF37" />
                    )}
                  </View>
                  <Text style={styles.lessonTitleAr}>{lesson.titleArabic}</Text>
                  <Text style={styles.lessonDesc}>{lc(lesson.description, lesson.descriptionFr)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </Pressable>
            );
          })}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 18,
    color: '#D4AF37',
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  progressValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  progressPercent: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 12,
    width: 36,
    textAlign: 'right',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitleAr: {
    color: '#D4AF37',
    fontSize: 16,
  },
  lessonCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lessonContent: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  lessonTitleAr: {
    color: '#D4AF37',
    fontSize: 13,
    marginTop: 2,
  },
  lessonDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
  },
});
