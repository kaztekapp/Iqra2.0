import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { vocabularyThemes } from '../../src/data/arabic/vocabulary';
import { useProgressStore } from '../../src/stores/progressStore';

export default function VocabularyScreen() {
  const { progress, getVocabularyCompletionPercent } = useProgressStore();
  const startedThemes = progress.vocabularyProgress.themesStarted;
  const completedThemes = progress.vocabularyProgress.themesCompleted;
  const wordsLearned = progress.vocabularyProgress.wordsLearned.length;

  const getThemeStatus = (themeId: string) => {
    if (completedThemes.includes(themeId)) return 'completed';
    if (startedThemes.includes(themeId)) return 'in_progress';
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
            <Text style={styles.title}>Vocabulary</Text>
            <Text style={styles.titleArabic}>الْمُفْرَدَات</Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>{wordsLearned}</Text>
              <Text style={styles.progressStatLabel}>Words Learned</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>
                {completedThemes.length}/{vocabularyThemes.length}
              </Text>
              <Text style={styles.progressStatLabel}>Themes Complete</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>
                {getVocabularyCompletionPercent()}%
              </Text>
              <Text style={styles.progressStatLabel}>Overall</Text>
            </View>
          </View>
        </View>

        {/* Theme Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulary Themes</Text>
          <Text style={styles.sectionSubtitle}>
            Master essential words organized by topic
          </Text>

          <View style={styles.themeGrid}>
            {vocabularyThemes.map((theme) => {
              const status = getThemeStatus(theme.id);
              return (
                <Pressable
                  key={theme.id}
                  style={styles.themeCard}
                  onPress={() => router.push(`/vocabulary/${theme.id}` as any)}
                >
                  <View
                    style={[styles.themeIconBg, { backgroundColor: theme.color + '20' }]}
                  >
                    <Text style={styles.themeIcon}>{theme.icon}</Text>
                  </View>
                  <Text style={styles.themeName}>{theme.name}</Text>
                  <Text style={styles.themeNameAr}>{theme.nameArabic}</Text>
                  <View style={styles.themeFooter}>
                    <Text style={styles.themeWordCount}>{theme.wordCount} words</Text>
                    {status === 'completed' && (
                      <View style={styles.completedBadge}>
                        <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
                      </View>
                    )}
                    {status === 'in_progress' && (
                      <View style={styles.progressBadge}>
                        <Ionicons name="time" size={14} color="#D4AF37" />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.themeColorBar, { backgroundColor: theme.color }]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Quick Practice */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Practice Mode</Text>
          <Pressable
            style={styles.practiceCard}
            onPress={() => router.push('/vocabulary/flashcards' as any)}
          >
            <View style={styles.practiceContent}>
              <View style={styles.practiceIcon}>
                <Ionicons name="layers" size={28} color="#D4AF37" />
              </View>
              <View style={styles.practiceText}>
                <Text style={styles.practiceTitle}>Flashcards</Text>
                <Text style={styles.practiceDesc}>
                  Review all vocabulary with interactive flashcards
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#64748b" />
            </View>
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
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStat: {
    flex: 1,
    alignItems: 'center',
  },
  progressStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressStatLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  themeCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    margin: '1%',
    position: 'relative',
    overflow: 'hidden',
  },
  themeIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  themeIcon: {
    fontSize: 24,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  themeNameAr: {
    fontSize: 12,
    color: '#D4AF37',
    marginBottom: 8,
  },
  themeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeWordCount: {
    fontSize: 11,
    color: '#64748b',
  },
  completedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#22c55e20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeColorBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  practiceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  practiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceText: {
    flex: 1,
    marginLeft: 16,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  practiceDesc: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
});
