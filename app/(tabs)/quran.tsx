import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useQuranStore } from '../../src/stores/quranStore';
import { SURAHS } from '../../src/data/arabic/quran';
import { Surah } from '../../src/types/quran';

interface SurahCardProps {
  surah: Surah;
  progress: number;
  isCompleted: boolean;
  onPress: () => void;
}

function SurahCard({ surah, progress, isCompleted, onPress }: SurahCardProps) {
  return (
    <Pressable style={styles.surahCard} onPress={onPress}>
      <View style={styles.surahNumber}>
        <Text style={styles.surahNumberText}>{surah.surahNumber}</Text>
      </View>
      <View style={styles.surahInfo}>
        <View style={styles.surahHeader}>
          <Text style={styles.surahNameArabic}>{surah.nameArabic}</Text>
          <Text style={styles.surahNameEnglish}>{surah.nameEnglish}</Text>
        </View>
        <View style={styles.surahMeta}>
          <Text style={styles.surahMetaText}>
            {surah.ayahCount} verses • {surah.revelationType}
          </Text>
        </View>
        {progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
      </View>
      {isCompleted ? (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#64748b" />
      )}
    </Pressable>
  );
}

export default function QuranScreen() {
  const {
    getOverallCompletionPercent,
    getTotalAyahsLearned,
    getTotalAyahsMemorized,
    getTotalSurahsCompleted,
    getSurahCompletionPercent,
    isSurahCompleted,
    getDueReviews,
    progress,
  } = useQuranStore();

  const overallProgress = getOverallCompletionPercent();
  const totalLearned = getTotalAyahsLearned();
  const totalMemorized = getTotalAyahsMemorized();
  const surahsCompleted = getTotalSurahsCompleted();
  const dueReviews = getDueReviews();

  const handleSurahPress = (surahId: string) => {
    router.push(`/quran/surah/${surahId}` as any);
  };

  const handleTajweedPress = () => {
    router.push('/quran/tajweed' as any);
  };

  const handleMemorizationPress = () => {
    router.push('/quran/memorization' as any);
  };

  const handleQuizPress = () => {
    router.push('/quran/quiz' as any);
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
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{overallProgress}%</Text>
              <Text style={styles.statLabel}>Overall</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{totalLearned}</Text>
              <Text style={styles.statLabel}>Ayahs Learned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#8b5cf6' }]}>{totalMemorized}</Text>
              <Text style={styles.statLabel}>Memorized</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>{surahsCompleted}</Text>
              <Text style={styles.statLabel}>Surahs Done</Text>
            </View>
          </View>
        </View>

        {/* Due Reviews Alert */}
        {dueReviews.length > 0 && (
          <Pressable style={styles.reviewAlert} onPress={handleMemorizationPress}>
            <View style={styles.reviewAlertIcon}>
              <Ionicons name="refresh" size={24} color="#ffffff" />
            </View>
            <View style={styles.reviewAlertContent}>
              <Text style={styles.reviewAlertTitle}>
                {dueReviews.length} Review{dueReviews.length > 1 ? 's' : ''} Due
              </Text>
              <Text style={styles.reviewAlertDesc}>
                Keep your memorization strong
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </Pressable>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.actionCard} onPress={handleQuizPress}>
            <View style={[styles.actionIcon, { backgroundColor: '#f59e0b20' }]}>
              <Ionicons name="help-circle" size={24} color="#f59e0b" />
            </View>
            <Text style={styles.actionTitle}>Quizzes</Text>
            <Text style={styles.actionDesc}>Test knowledge</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={handleTajweedPress}>
            <View style={[styles.actionIcon, { backgroundColor: '#10b98120' }]}>
              <Ionicons name="musical-notes" size={24} color="#10b981" />
            </View>
            <Text style={styles.actionTitle}>Tajweed</Text>
            <Text style={styles.actionDesc}>Pronunciation</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={handleMemorizationPress}>
            <View style={[styles.actionIcon, { backgroundColor: '#8b5cf620' }]}>
              <Ionicons name="heart" size={24} color="#8b5cf6" />
            </View>
            <Text style={styles.actionTitle}>Memorize</Text>
            <Text style={styles.actionDesc}>Track progress</Text>
          </Pressable>
        </View>

        {/* Surah List */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Juz Amma - Short Surahs</Text>
          <Text style={styles.sectionSubtitle}>Perfect for beginners</Text>
          {SURAHS.map((surah) => (
            <SurahCard
              key={surah.id}
              surah={surah}
              progress={getSurahCompletionPercent(surah.id)}
              isCompleted={isSurahCompleted(surah.id)}
              onPress={() => handleSurahPress(surah.id)}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  reviewAlert: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAlertIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAlertContent: {
    flex: 1,
    marginLeft: 12,
  },
  reviewAlertTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewAlertDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 16,
  },
  surahCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahNumberText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
    marginLeft: 14,
  },
  surahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  surahNameArabic: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  surahNameEnglish: {
    color: '#10b981',
    fontSize: 14,
  },
  surahMeta: {
    marginTop: 4,
  },
  surahMetaText: {
    color: '#64748b',
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  progressBar: {
    flex: 1,
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
  progressText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '600',
  },
  completedBadge: {
    marginLeft: 8,
  },
});
