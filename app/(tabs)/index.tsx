import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProgressStore, ModuleType, LastAccessedInfo } from '../../src/stores/progressStore';

// Module configuration data
const MODULES: Record<ModuleType, {
  title: string;
  titleArabic: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
  arabicChar: string;
}> = {
  alphabet: {
    title: 'Arabic Alphabet',
    titleArabic: 'الْحُرُوف',
    icon: 'text',
    color: '#6366f1',
    route: '/alphabet',
    arabicChar: 'أ',
  },
  vocabulary: {
    title: 'Vocabulary',
    titleArabic: 'الْمُفْرَدَات',
    icon: 'library',
    color: '#D4AF37',
    route: '/vocabulary',
    arabicChar: 'ك',
  },
  grammar: {
    title: 'Grammar',
    titleArabic: 'الْقَوَاعِد',
    icon: 'git-branch',
    color: '#22c55e',
    route: '/grammar',
    arabicChar: 'ق',
  },
  verbs: {
    title: 'Verb Conjugations',
    titleArabic: 'تَصْرِيفُ الْأَفْعَال',
    icon: 'swap-horizontal',
    color: '#ec4899',
    route: '/verbs',
    arabicChar: 'ف',
  },
  reading: {
    title: 'Reading',
    titleArabic: 'الْقِرَاءَة',
    icon: 'document-text',
    color: '#f59e0b',
    route: '/reading',
    arabicChar: 'ر',
  },
  practice: {
    title: 'Practice',
    titleArabic: 'التَّدْرِيب',
    icon: 'pencil',
    color: '#ec4899',
    route: '/practice',
    arabicChar: 'د',
  },
};

export default function HomeScreen() {
  const { progress, getAlphabetCompletionPercent, getVocabularyCompletionPercent, getAccuracy, lastAccessed } = useProgressStore();

  // Get the module to display in Continue Learning
  const currentModule = MODULES[lastAccessed?.module || 'alphabet'];

  // Get the module name (English only)
  const getModuleName = () => {
    if (lastAccessed?.moduleName) {
      return lastAccessed.moduleName;
    }
    return currentModule.title;
  };

  // Check if there's a specific lesson to display
  const hasLesson = lastAccessed?.lessonTitle && lastAccessed?.lessonTitleArabic;

  // Get the subtitle to display (progress info)
  const getDisplaySubtitle = () => {
    switch (lastAccessed?.module) {
      case 'alphabet':
        return `${progress.alphabetProgress.lettersLearned.length}/28 letters learned`;
      case 'vocabulary':
        return `${progress.vocabularyProgress.themesCompleted.length} themes completed`;
      case 'grammar':
        return `${progress.grammarProgress.lessonsCompleted.length} lessons completed`;
      case 'verbs':
        return `${progress.verbProgress.verbsLearned.length} verbs learned`;
      case 'reading':
        return `${progress.readingProgress.textsCompleted.length} texts completed`;
      case 'practice':
        return 'Continue practicing';
      default:
        return `${progress.alphabetProgress.lettersLearned.length}/28 letters learned`;
    }
  };

  const quickActions = [
    {
      id: 'alphabet',
      title: 'Alphabet',
      titleArabic: 'الْحُرُوف',
      icon: 'text' as const,
      color: '#6366f1',
      route: '/alphabet',
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      titleArabic: 'الْمُفْرَدَات',
      icon: 'library' as const,
      color: '#D4AF37',
      route: '/vocabulary',
    },
    {
      id: 'practice',
      title: 'Practice',
      titleArabic: 'تَدْرِيب',
      icon: 'pencil' as const,
      color: '#ec4899',
      route: '/practice',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>مَرْحَبًا</Text>
            <Text style={styles.greetingEnglish}>Welcome to Iqra</Text>
          </View>
          <View style={styles.logoBadge}>
            <View style={styles.logoBadgeInner}>
              <Text style={styles.logoArabic}>اقْرَأ</Text>
            </View>
            <View style={styles.logoVersionBadge}>
              <Text style={styles.logoVersion}>2.0</Text>
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.totalXp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getAlphabetCompletionPercent()}%</Text>
              <Text style={styles.statLabel}>Alphabet</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getVocabularyCompletionPercent()}%</Text>
              <Text style={styles.statLabel}>Vocabulary</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getAccuracy()}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <Pressable
            style={styles.continueCard}
            onPress={() => router.push(currentModule.route as any)}
          >
            <View style={styles.continueContent}>
              <View style={[styles.continueIcon, { backgroundColor: currentModule.color + '20' }]}>
                <Ionicons name={currentModule.icon} size={28} color={currentModule.color} />
              </View>
              <View style={styles.continueText}>
                <Text style={styles.continueModuleName}>{getModuleName()}</Text>
                <Text style={styles.continueModuleNameArabic}>{currentModule.titleArabic}</Text>
                {hasLesson && lastAccessed.lessonTitle !== getModuleName() && (
                  <>
                    <Text style={styles.continueLesson}>{lastAccessed.lessonTitle}</Text>
                    <Text style={styles.continueLessonArabic}>{lastAccessed.lessonTitleArabic}</Text>
                  </>
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </Pressable>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionArabic}>{action.titleArabic}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Daily Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goal</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalContent}>
              <Ionicons name="trophy" size={32} color="#D4AF37" />
              <View style={styles.goalText}>
                <Text style={styles.goalTitle}>Complete 5 lessons today</Text>
                <Text style={styles.goalProgress}>0/5 completed</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '0%' }]} />
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Tip of the Day</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={24} color="#D4AF37" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Reading Arabic</Text>
              <Text style={styles.tipText}>
                Arabic is read from right to left. The vowel marks (harakat)
                above and below letters help you pronounce words correctly!
              </Text>
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  greetingEnglish: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  logoBadge: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoArabic: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoVersionBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#1e293b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  logoVersion: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statsTitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  continueCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    marginLeft: 16,
  },
  continueModuleName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueModuleNameArabic: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 2,
  },
  continueLesson: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  continueLessonArabic: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionArabic: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 4,
  },
  goalCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalText: {
    marginLeft: 16,
  },
  goalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalProgress: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 4,
  },
  tipCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
});
