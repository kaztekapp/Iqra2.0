import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProgressStore } from '../../src/stores/progressStore';

interface PracticeCardProps {
  title: string;
  titleArabic: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

function PracticeCard({
  title,
  titleArabic,
  description,
  icon,
  color,
  onPress,
}: PracticeCardProps) {
  return (
    <Pressable style={styles.practiceCard} onPress={onPress}>
      <View style={styles.practiceCardContent}>
        <View style={[styles.practiceIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={28} color={color} />
        </View>
        <View style={styles.practiceText}>
          <View style={styles.practiceHeader}>
            <Text style={styles.practiceTitle}>{title}</Text>
            <Text style={styles.practiceArabic}>{titleArabic}</Text>
          </View>
          <Text style={styles.practiceDesc}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function PracticeScreen() {
  const { progress, getAccuracy } = useProgressStore();

  const exerciseTypes = [
    {
      id: 'letter-recognition',
      title: 'Letter Recognition',
      titleArabic: 'التَّعَرُّفُ عَلَى الْحُرُوف',
      description: 'Identify Arabic letters quickly',
      icon: 'text' as const,
      color: '#6366f1',
    },
    {
      id: 'vocabulary-quiz',
      title: 'Vocabulary Quiz',
      titleArabic: 'اِخْتِبَارُ الْمُفْرَدَات',
      description: 'Test your word knowledge',
      icon: 'bulb' as const,
      color: '#f59e0b',
    },
    {
      id: 'typing-practice',
      title: 'Typing Practice',
      titleArabic: 'تَدْرِيبُ الْكِتَابَة',
      description: 'Type Arabic words using keyboard',
      icon: 'keypad' as const,
      color: '#14b8a6',
    },
    {
      id: 'handwriting',
      title: 'Handwriting Practice',
      titleArabic: 'الْخَطُّ الْيَدَوِي',
      description: 'Practice writing Arabic letters by hand',
      icon: 'pencil' as const,
      color: '#ec4899',
    },
    {
      id: 'listening',
      title: 'Listening Practice',
      titleArabic: 'الاِسْتِمَاع',
      description: 'Improve your listening skills',
      icon: 'headset' as const,
      color: '#22c55e',
    },
    {
      id: 'matching',
      title: 'Matching Game',
      titleArabic: 'لُعْبَةُ الْمُطَابَقَة',
      description: 'Match Arabic words with meanings',
      icon: 'git-compare' as const,
      color: '#8b5cf6',
    },
    {
      id: 'fill-blank',
      title: 'Fill in the Blank',
      titleArabic: 'اِمْلَأِ الْفَرَاغ',
      description: 'Complete Arabic sentences',
      icon: 'create' as const,
      color: '#ef4444',
    },
  ];

  const handlePracticePress = (exerciseId: string) => {
    // Route to specific screens based on exercise type
    if (exerciseId === 'handwriting') {
      router.push('/alphabet/writing-practice' as any);
    } else if (exerciseId === 'typing-practice') {
      router.push('/exercise/typing-practice' as any);
    } else {
      router.push(`/exercise/${exerciseId}` as any);
    }
  };

  const totalExercises = progress.exerciseResults.totalCompleted;
  const accuracy = getAccuracy();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Practice</Text>
          <Text style={styles.titleArabic}>التَّدْرِيب</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Practice Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalExercises}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#D4AF37' }]}>{accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#22c55e' }]}>{progress.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#8b5cf6' }]}>{progress.totalXp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
          </View>
        </View>

        {/* Quick Practice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Practice</Text>
          <Pressable
            style={styles.quickPracticeCard}
            onPress={() => handlePracticePress('quick-review')}
          >
            <View style={styles.quickPracticeContent}>
              <View style={styles.quickPracticeIcon}>
                <Ionicons name="flash" size={24} color="white" />
              </View>
              <View style={styles.quickPracticeText}>
                <Text style={styles.quickPracticeTitle}>Quick Review</Text>
                <Text style={styles.quickPracticeDesc}>
                  Review what you've learned recently
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </Pressable>
        </View>

        {/* Exercise Types */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Exercise Types</Text>
          {exerciseTypes.map((exercise) => (
            <PracticeCard
              key={exercise.id}
              title={exercise.title}
              titleArabic={exercise.titleArabic}
              description={exercise.description}
              icon={exercise.icon}
              color={exercise.color}
              onPress={() => handlePracticePress(exercise.id)}
            />
          ))}
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
    fontSize: 22,
    color: '#D4AF37',
    marginTop: 4,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 11,
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
  quickPracticeCard: {
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    padding: 16,
  },
  quickPracticeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickPracticeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickPracticeText: {
    flex: 1,
    marginLeft: 16,
  },
  quickPracticeTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickPracticeDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  practiceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  practiceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceText: {
    flex: 1,
    marginLeft: 16,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  practiceTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  practiceArabic: {
    color: '#D4AF37',
    fontSize: 14,
  },
  practiceDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
  },
});
