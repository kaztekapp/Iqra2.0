import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useQuranStore } from '../../src/stores/quranStore';
import { useProphetStoriesStore } from '../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../src/stores/quranStoriesStore';
import { useDuasStore } from '../../src/stores/duasStore';
import { TOTAL_PROPHETS } from '../../src/data/arabic/prophets';
import { TOTAL_QURAN_STORIES } from '../../src/data/arabic/quranStories';
import { TOTAL_DUAS } from '../../src/types/duas';

export default function QuranScreen() {
  const {
    getOverallCompletionPercent,
    getTotalSurahsCompleted,
    getJuzCompleted,
    getHizbCompleted,
  } = useQuranStore();

  const { getTotalStoriesCompleted: getProphetStoriesCompleted } = useProphetStoriesStore();
  const { getTotalStoriesCompleted: getQuranStoriesCompleted } = useQuranStoriesStore();
  const { getMemorizedCount } = useDuasStore();

  const overallProgress = getOverallCompletionPercent();
  const duasMemorized = getMemorizedCount();
  const surahsCompleted = getTotalSurahsCompleted();
  const juzCompleted = getJuzCompleted();
  const hizbCompleted = getHizbCompleted();
  const prophetStoriesCompleted = getProphetStoriesCompleted();
  const quranStoriesCompleted = getQuranStoriesCompleted();
  const totalStoriesCompleted = prophetStoriesCompleted + quranStoriesCompleted;
  const totalStories = TOTAL_PROPHETS + TOTAL_QURAN_STORIES;

  const handleTajweedPress = () => {
    router.push('/quran/tajweed' as any);
  };

  const handleLearnQuranPress = () => {
    router.push('/quran/all-surahs' as any);
  };

  const handleQuizPress = () => {
    router.push('/quran/quiz' as any);
  };

  const handleStoriesPress = () => {
    router.push('/quran/stories' as any);
  };

  const handleDuasPress = () => {
    router.push('/quran/duas' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Quran</Text>
            <Text style={styles.titleArabic}>القرآن الكريم</Text>
          </View>
          <Pressable style={styles.settingsButton} onPress={handleTajweedPress}>
            <Ionicons name="color-palette-outline" size={24} color="#10b981" />
          </Pressable>
        </View>

        {/* Bismillah */}
        <View style={styles.bismillahCard}>
          <Text style={styles.bismillahText}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <Text style={styles.bismillahTranslation}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </Text>
        </View>

        {/* Progress Overview */}
        <View style={styles.statsCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.statsTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>{overallProgress}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${overallProgress}%` }]} />
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{surahsCompleted}</Text>
              <Text style={styles.statLabel}>Surahs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>{juzCompleted}</Text>
              <Text style={styles.statLabel}>Juz</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>{hizbCompleted}</Text>
              <Text style={styles.statLabel}>Hizb</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions - 2x2 Grid */}
        <View style={styles.quickActionsGrid}>
          <View style={styles.quickActionsRow}>
            <Pressable style={styles.actionCardGrid} onPress={handleLearnQuranPress}>
              <View style={[styles.actionIcon, { backgroundColor: '#3b82f620' }]}>
                <Ionicons name="book" size={24} color="#3b82f6" />
              </View>
              <Text style={styles.actionTitle}>Quran</Text>
              <Text style={styles.actionDesc}>All 114 Surahs</Text>
            </Pressable>
            <Pressable style={styles.actionCardGrid} onPress={handleStoriesPress}>
              <View style={[styles.actionIcon, { backgroundColor: '#8b5cf620' }]}>
                <Ionicons name="library" size={24} color="#8b5cf6" />
              </View>
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>{totalStoriesCompleted}/{totalStories}</Text>
              </View>
              <Text style={styles.actionTitle}>Stories</Text>
              <Text style={styles.actionDesc}>Prophets & More</Text>
            </Pressable>
          </View>
          <View style={styles.quickActionsRow}>
            <Pressable style={styles.actionCardGrid} onPress={handleDuasPress}>
              <View style={[styles.actionIcon, { backgroundColor: '#f59e0b20' }]}>
                <Ionicons name="hand-left" size={24} color="#f59e0b" />
              </View>
              <View style={[styles.actionBadge, { backgroundColor: '#f59e0b30' }]}>
                <Text style={[styles.actionBadgeText, { color: '#fbbf24' }]}>{duasMemorized}/{TOTAL_DUAS}</Text>
              </View>
              <Text style={styles.actionTitle}>Duas</Text>
              <Text style={styles.actionDesc}>Prophetic prayers</Text>
            </Pressable>
            <Pressable style={styles.actionCardGrid} onPress={handleQuizPress}>
              <View style={[styles.actionIcon, { backgroundColor: '#06b6d420' }]}>
                <Ionicons name="help-circle" size={24} color="#06b6d4" />
              </View>
              <Text style={styles.actionTitle}>Quizzes</Text>
              <Text style={styles.actionDesc}>Test knowledge</Text>
            </Pressable>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    color: '#10b981',
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 12,
  },
  bismillahCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  bismillahText: {
    fontSize: 24,
    color: '#10b981',
    textAlign: 'center',
    lineHeight: 40,
  },
  bismillahTranslation: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsTitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  progressPercent: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  quickActionsGrid: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCardGrid: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#8b5cf630',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  actionBadgeText: {
    color: '#a78bfa',
    fontSize: 10,
    fontWeight: '600',
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionDesc: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 2,
  },
});
