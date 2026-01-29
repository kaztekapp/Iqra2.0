import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuranStore } from '../../../src/stores/quranStore';
import { SURAHS, getAyahsBySurahId } from '../../../src/data/arabic/quran';

export default function MemorizationDashboardScreen() {
  const {
    getTotalAyahsMemorized,
    progress,
    getDueReviews,
  } = useQuranStore();

  const totalMemorized = getTotalAyahsMemorized();
  const dueReviews = getDueReviews();
  const memProgress = progress.memorizationProgress;

  const getSurahsInProgress = () => {
    return SURAHS.filter((surah) => {
      const sp = progress.surahProgress[surah.id];
      return sp && sp.ayahsMemorized.length > 0 && sp.ayahsMemorized.length < surah.ayahCount;
    });
  };

  const getCompletedSurahs = () => {
    return SURAHS.filter((surah) => {
      const sp = progress.surahProgress[surah.id];
      return sp && sp.ayahsMemorized.length === surah.ayahCount;
    });
  };

  const surahsInProgress = getSurahsInProgress();
  const completedSurahs = getCompletedSurahs();

  const handleStartReview = () => {
    router.push('/quran/memorization/review' as any);
  };

  const handleSurahPress = (surahId: string) => {
    router.push(`/quran/surah/${surahId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Memorization</Text>
            <Text style={styles.titleArabic}>الحفظ</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.mainStat}>
              <View style={styles.mainStatIcon}>
                <Ionicons name="heart" size={28} color="#8b5cf6" />
              </View>
              <Text style={styles.mainStatValue}>{totalMemorized}</Text>
              <Text style={styles.mainStatLabel}>Ayahs Memorized</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{memProgress.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>
                {memProgress.longestStreak}
              </Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                {completedSurahs.length}
              </Text>
              <Text style={styles.statLabel}>Surahs Complete</Text>
            </View>
          </View>
        </View>

        {/* Due Reviews */}
        {dueReviews.length > 0 && (
          <Pressable style={styles.reviewCard} onPress={handleStartReview}>
            <View style={styles.reviewIcon}>
              <Ionicons name="refresh" size={28} color="#ffffff" />
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewTitle}>
                {dueReviews.length} Review{dueReviews.length > 1 ? 's' : ''} Due
              </Text>
              <Text style={styles.reviewDesc}>
                Keep your memorization fresh with spaced repetition
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ffffff" />
          </Pressable>
        )}

        {/* Surahs In Progress */}
        {surahsInProgress.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>In Progress</Text>
            {surahsInProgress.map((surah) => {
              const sp = progress.surahProgress[surah.id];
              const percent = Math.round((sp.ayahsMemorized.length / surah.ayahCount) * 100);

              return (
                <Pressable
                  key={surah.id}
                  style={styles.surahCard}
                  onPress={() => handleSurahPress(surah.id)}
                >
                  <View style={styles.surahInfo}>
                    <Text style={styles.surahName}>{surah.nameArabic}</Text>
                    <Text style={styles.surahEnglish}>{surah.nameEnglish}</Text>
                    <View style={styles.surahProgress}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${percent}%` }]} />
                      </View>
                      <Text style={styles.progressText}>
                        {sp.ayahsMemorized.length}/{surah.ayahCount} ayahs
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Completed Surahs */}
        {completedSurahs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            <View style={styles.completedGrid}>
              {completedSurahs.map((surah) => (
                <Pressable
                  key={surah.id}
                  style={styles.completedCard}
                  onPress={() => handleSurahPress(surah.id)}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  <Text style={styles.completedName}>{surah.nameArabic}</Text>
                  <Text style={styles.completedEnglish}>{surah.nameEnglish}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {totalMemorized === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={48} color="#64748b" />
            </View>
            <Text style={styles.emptyTitle}>Start Memorizing</Text>
            <Text style={styles.emptyDesc}>
              Begin your memorization journey by learning ayahs in any surah
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => router.push('/quran' as any)}
            >
              <Text style={styles.emptyButtonText}>Browse Surahs</Text>
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
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleArabic: {
    color: '#8b5cf6',
    fontSize: 16,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  statsCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  statsRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainStat: {
    alignItems: 'center',
  },
  mainStatIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8b5cf620',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mainStatValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  mainStatLabel: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#8b5cf6',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  reviewCard: {
    backgroundColor: '#8b5cf6',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContent: {
    flex: 1,
    marginLeft: 14,
  },
  reviewTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  reviewDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
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
  surahCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    color: '#ffffff',
    fontSize: 18,
  },
  surahEnglish: {
    color: '#8b5cf6',
    fontSize: 13,
    marginTop: 2,
  },
  surahProgress: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  progressText: {
    color: '#64748b',
    fontSize: 12,
  },
  completedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  completedCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  completedName: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 8,
  },
  completedEnglish: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyDesc: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
