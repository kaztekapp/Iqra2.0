import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProgressStore } from '../../src/stores/progressStore';

interface ModuleCardProps {
  title: string;
  titleArabic: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  progress: number;
  route: string;
  locked?: boolean;
}

function ModuleCard({
  title,
  titleArabic,
  description,
  icon,
  color,
  progress,
  route,
  locked = false,
}: ModuleCardProps) {
  return (
    <Pressable
      style={[styles.moduleCard, locked && styles.moduleCardLocked]}
      onPress={() => !locked && router.push(route as any)}
      disabled={locked}
    >
      <View style={styles.moduleHeader}>
        <View style={[styles.moduleIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={28} color={locked ? '#64748b' : color} />
        </View>
        {locked && (
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={14} color="#64748b" />
          </View>
        )}
      </View>

      <View style={styles.moduleContent}>
        <Text style={[styles.moduleTitle, locked && styles.textLocked]}>{title}</Text>
        <Text style={[styles.moduleTitleArabic, locked && styles.textLocked]}>{titleArabic}</Text>
        <Text style={[styles.moduleDescription, locked && styles.textLocked]}>{description}</Text>
      </View>

      {!locked && (
        <View style={styles.moduleProgress}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}

      <View style={styles.moduleArrow}>
        <Ionicons name="chevron-forward" size={24} color={locked ? '#334155' : '#64748b'} />
      </View>
    </Pressable>
  );
}

export default function LearnScreen() {
  const { getAlphabetCompletionPercent, getVocabularyCompletionPercent, getGrammarCompletionPercent } = useProgressStore();

  const modules = [
    {
      id: 'alphabet',
      title: 'Alphabet & Writing',
      titleArabic: 'الْحُرُوفُ وَالْكِتَابَة',
      description: 'Learn the 28 Arabic letters, their forms, and how to write them',
      icon: 'text' as const,
      color: '#6366f1',
      progress: getAlphabetCompletionPercent(),
      route: '/alphabet',
      locked: false,
    },
    {
      id: 'grammar',
      title: 'Grammar',
      titleArabic: 'الْقَوَاعِد',
      description: 'Master Arabic sentence structure, articles, and pronouns',
      icon: 'git-branch' as const,
      color: '#22c55e',
      progress: getGrammarCompletionPercent(),
      route: '/grammar',
      locked: false,
    },
    {
      id: 'verbs',
      title: 'Verb Conjugations',
      titleArabic: 'تَصْرِيفُ الْأَفْعَال',
      description: 'Learn verb patterns and conjugations in all tenses',
      icon: 'swap-horizontal' as const,
      color: '#ec4899',
      progress: 0,
      route: '/verbs',
      locked: false,
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      titleArabic: 'الْمُفْرَدَات',
      description: 'Build your Arabic vocabulary with themed word lists',
      icon: 'library' as const,
      color: '#D4AF37',
      progress: getVocabularyCompletionPercent(),
      route: '/vocabulary',
      locked: false,
    },
    {
      id: 'reading',
      title: 'Reading',
      titleArabic: 'الْقِرَاءَة',
      description: 'Practice reading Arabic texts with and without vowels',
      icon: 'document-text' as const,
      color: '#f59e0b',
      progress: 0,
      route: '/reading',
      locked: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learn Arabic</Text>
          <Text style={styles.titleArabic}>تَعَلَّمِ الْعَرَبِيَّة</Text>
          <Text style={styles.subtitle}>
            Master Modern Standard Arabic (Fusha) step by step
          </Text>
        </View>

        {/* Level Indicator */}
        <View style={styles.levelCard}>
          <View style={styles.levelContent}>
            <View style={styles.levelBadge}>
              <Ionicons name="school" size={24} color="#D4AF37" />
            </View>
            <View>
              <Text style={styles.levelLabel}>Current Level</Text>
              <Text style={styles.levelValue}>الْمُبْتَدِئ - Beginner</Text>
            </View>
          </View>
        </View>

        {/* Modules */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              titleArabic={module.titleArabic}
              description={module.description}
              icon={module.icon}
              color={module.color}
              progress={module.progress}
              route={module.route}
              locked={module.locked}
            />
          ))}
        </View>

        {/* Vowels Toggle Info */}
        <View style={styles.vowelsInfo}>
          <Ionicons name="information-circle" size={20} color="#6366f1" />
          <Text style={styles.vowelsInfoText}>
            Vowel marks (harakat) are shown on all Arabic text to help you learn proper pronunciation.
            You can toggle this off in settings once you advance.
          </Text>
        </View>

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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 24,
    color: '#D4AF37',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
  levelCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  levelLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  levelValue: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 2,
  },
  modulesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleCardLocked: {
    opacity: 0.6,
  },
  moduleHeader: {
    position: 'relative',
  },
  moduleIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleContent: {
    flex: 1,
    marginLeft: 16,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  moduleTitleArabic: {
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 2,
  },
  moduleDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  textLocked: {
    color: '#64748b',
  },
  moduleProgress: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  progressBarBg: {
    width: 60,
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  moduleArrow: {
    marginLeft: 4,
  },
  vowelsInfo: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  vowelsInfoText: {
    flex: 1,
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 12,
    lineHeight: 20,
  },
});
