import { View, Text, ScrollView, Pressable, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProgressStore } from '../../src/stores/progressStore';

export default function ProfileScreen() {
  const {
    progress,
    showVowels,
    setShowVowels,
    getAlphabetCompletionPercent,
    getVocabularyCompletionPercent,
    getGrammarCompletionPercent,
    getOverallLevel,
    getAccuracy,
    resetProgress,
  } = useProgressStore();

  const levelLabels = {
    beginner: { en: 'Beginner', ar: 'الْمُبْتَدِئ' },
    intermediate: { en: 'Intermediate', ar: 'الْمُتَوَسِّط' },
    advanced: { en: 'Advanced', ar: 'الْمُتَقَدِّم' },
  };

  const currentLevel = getOverallLevel();
  const levelInfo = levelLabels[currentLevel];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.titleArabic}>الْمَلَفُّ الشَّخْصِي</Text>
        </View>

        {/* User Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelBadge}>
            <Ionicons name="school" size={32} color="#D4AF37" />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelLabel}>Current Level</Text>
            <Text style={styles.levelValue}>{levelInfo.en}</Text>
            <Text style={styles.levelArabic}>{levelInfo.ar}</Text>
          </View>
          <View style={styles.xpBadge}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.xpText}>{progress.totalXp} XP</Text>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Progress</Text>

          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="text" size={20} color="#6366f1" />
                <Text style={styles.progressLabel}>Alphabet</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getAlphabetCompletionPercent()}%`, backgroundColor: '#6366f1' }]} />
                </View>
                <Text style={styles.progressPercent}>{getAlphabetCompletionPercent()}%</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="library" size={20} color="#D4AF37" />
                <Text style={styles.progressLabel}>Vocabulary</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getVocabularyCompletionPercent()}%`, backgroundColor: '#D4AF37' }]} />
                </View>
                <Text style={styles.progressPercent}>{getVocabularyCompletionPercent()}%</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="git-branch" size={20} color="#22c55e" />
                <Text style={styles.progressLabel}>Grammar</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getGrammarCompletionPercent()}%`, backgroundColor: '#22c55e' }]} />
                </View>
                <Text style={styles.progressPercent}>{getGrammarCompletionPercent()}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={24} color="#f59e0b" />
              <Text style={styles.statValue}>{progress.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#D4AF37" />
              <Text style={styles.statValue}>{progress.longestStreak}</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text style={styles.statValue}>{progress.exerciseResults.totalCompleted}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={24} color="#6366f1" />
              <Text style={styles.statValue}>{getAccuracy()}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="text-outline" size={22} color="#94a3b8" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Show Vowel Marks</Text>
                  <Text style={styles.settingDesc}>
                    Display harakat on Arabic text (recommended for beginners)
                  </Text>
                </View>
              </View>
              <Switch
                value={showVowels}
                onValueChange={setShowVowels}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={showVowels ? '#ffffff' : '#94a3b8'}
              />
            </View>
          </View>
        </View>

        {/* Reset Progress */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable
            style={styles.resetButton}
            onPress={() => {
              // Add confirmation dialog in production
              resetProgress();
            }}
          >
            <Ionicons name="refresh" size={20} color="#ef4444" />
            <Text style={styles.resetButtonText}>Reset All Progress</Text>
          </Pressable>
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
  levelCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  levelBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 16,
  },
  levelLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  levelValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  levelArabic: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
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
    borderRadius: 4,
  },
  progressPercent: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 12,
    width: 36,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    margin: '1%',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ef444440',
  },
  resetButtonText: {
    color: '#ef4444',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
