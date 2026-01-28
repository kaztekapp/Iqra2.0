import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProgressStore } from '../../src/stores/progressStore';

export default function HomeScreen() {
  const { progress, getAlphabetCompletionPercent, getVocabularyCompletionPercent, getAccuracy } = useProgressStore();

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
      icon: 'fitness' as const,
      color: '#22c55e',
      route: '/(tabs)/practice',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>مَرْحَبًا</Text>
            <Text style={styles.greetingEnglish}>Welcome to ArabicMaster</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={20} color="#f59e0b" />
            <Text style={styles.streakText}>{progress.currentStreak}</Text>
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
            onPress={() => router.push('/alphabet')}
          >
            <View style={styles.continueContent}>
              <View style={styles.continueIcon}>
                <Text style={styles.continueArabic}>أ</Text>
              </View>
              <View style={styles.continueText}>
                <Text style={styles.continueTitle}>Arabic Alphabet</Text>
                <Text style={styles.continueSubtitle}>
                  {progress.alphabetProgress.lettersLearned.length}/28 letters learned
                </Text>
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
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
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
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueArabic: {
    fontSize: 28,
    color: '#ffffff',
  },
  continueText: {
    marginLeft: 16,
  },
  continueTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
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
