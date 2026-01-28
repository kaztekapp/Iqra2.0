import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProgressStore } from '../../src/stores/progressStore';

const readingTexts = [
  {
    id: 'intro-1',
    title: 'Introducing Yourself',
    titleArabic: 'التَّعْرِيفُ بِالنَّفْس',
    level: 'beginner',
    wordCount: 25,
    preview: 'مَرْحَبًا، اِسْمِي...',
    color: '#6366f1',
  },
  {
    id: 'family-1',
    title: 'My Family',
    titleArabic: 'عَائِلَتِي',
    level: 'beginner',
    wordCount: 40,
    preview: 'هَذِهِ عَائِلَتِي...',
    color: '#ec4899',
  },
  {
    id: 'daily-routine',
    title: 'Daily Routine',
    titleArabic: 'الرُّوتِينُ الْيَوْمِي',
    level: 'beginner',
    wordCount: 50,
    preview: 'أَسْتَيْقِظُ صَبَاحًا...',
    color: '#22c55e',
  },
  {
    id: 'at-school',
    title: 'At School',
    titleArabic: 'فِي الْمَدْرَسَة',
    level: 'intermediate',
    wordCount: 75,
    preview: 'أَذْهَبُ إِلَى الْمَدْرَسَة...',
    color: '#f59e0b',
  },
  {
    id: 'at-market',
    title: 'At the Market',
    titleArabic: 'فِي السُّوق',
    level: 'intermediate',
    wordCount: 80,
    preview: 'أُحِبُّ الذَّهَابَ إِلَى السُّوق...',
    color: '#8b5cf6',
  },
  {
    id: 'travel-story',
    title: 'A Travel Story',
    titleArabic: 'قِصَّةُ سَفَر',
    level: 'advanced',
    wordCount: 150,
    preview: 'سَافَرْتُ إِلَى مِصْر...',
    color: '#D4AF37',
  },
];

export default function ReadingScreen() {
  const { progress, showVowels, setShowVowels } = useProgressStore();
  const completedTexts = progress.readingProgress.textsCompleted;
  const startedTexts = progress.readingProgress.textsStarted;

  const beginnerTexts = readingTexts.filter((t) => t.level === 'beginner');
  const intermediateTexts = readingTexts.filter((t) => t.level === 'intermediate');
  const advancedTexts = readingTexts.filter((t) => t.level === 'advanced');

  const getTextStatus = (textId: string) => {
    if (completedTexts.includes(textId)) return 'completed';
    if (startedTexts.includes(textId)) return 'in_progress';
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
            <Text style={styles.title}>Reading</Text>
            <Text style={styles.titleArabic}>الْقِرَاءَة</Text>
          </View>
        </View>

        {/* Vowel Toggle */}
        <Pressable
          style={styles.vowelToggle}
          onPress={() => setShowVowels(!showVowels)}
        >
          <View style={styles.vowelLeft}>
            <Ionicons
              name={showVowels ? 'eye' : 'eye-off'}
              size={20}
              color="#D4AF37"
            />
            <View style={styles.vowelText}>
              <Text style={styles.vowelTitle}>Vowel Marks (Harakat)</Text>
              <Text style={styles.vowelDesc}>
                {showVowels
                  ? 'Showing vowels - recommended for beginners'
                  : 'Hiding vowels - advanced reading mode'}
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, showVowels && styles.toggleActive]}>
            <View style={[styles.toggleThumb, showVowels && styles.toggleThumbActive]} />
          </View>
        </Pressable>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Reading Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{completedTexts.length}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{startedTexts.length}</Text>
              <Text style={styles.progressLabel}>In Progress</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>
                {readingTexts.length - completedTexts.length - startedTexts.length}
              </Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
          </View>
        </View>

        {/* Beginner Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Beginner</Text>
            <Text style={styles.sectionTitleAr}>الْمُبْتَدِئ</Text>
          </View>

          {beginnerTexts.map((text) => {
            const status = getTextStatus(text.id);
            return (
              <Pressable
                key={text.id}
                style={styles.textCard}
                onPress={() => router.push(`/reading/${text.id}` as any)}
              >
                <View style={[styles.textColorBar, { backgroundColor: text.color }]} />
                <View style={styles.textContent}>
                  <View style={styles.textHeader}>
                    <Text style={styles.textTitle}>{text.title}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                    {status === 'in_progress' && (
                      <Ionicons name="time" size={20} color="#D4AF37" />
                    )}
                  </View>
                  <Text style={styles.textTitleAr}>{text.titleArabic}</Text>
                  <Text style={styles.textPreview}>{text.preview}</Text>
                  <Text style={styles.textMeta}>{text.wordCount} words</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Intermediate Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Intermediate</Text>
            <Text style={styles.sectionTitleAr}>الْمُتَوَسِّط</Text>
          </View>

          {intermediateTexts.map((text) => {
            const status = getTextStatus(text.id);
            return (
              <Pressable
                key={text.id}
                style={styles.textCard}
                onPress={() => router.push(`/reading/${text.id}` as any)}
              >
                <View style={[styles.textColorBar, { backgroundColor: text.color }]} />
                <View style={styles.textContent}>
                  <View style={styles.textHeader}>
                    <Text style={styles.textTitle}>{text.title}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                  </View>
                  <Text style={styles.textTitleAr}>{text.titleArabic}</Text>
                  <Text style={styles.textPreview}>{text.preview}</Text>
                  <Text style={styles.textMeta}>{text.wordCount} words</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Advanced Section */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Advanced</Text>
            <Text style={styles.sectionTitleAr}>الْمُتَقَدِّم</Text>
          </View>

          {advancedTexts.map((text) => {
            const status = getTextStatus(text.id);
            return (
              <Pressable
                key={text.id}
                style={styles.textCard}
                onPress={() => router.push(`/reading/${text.id}` as any)}
              >
                <View style={[styles.textColorBar, { backgroundColor: text.color }]} />
                <View style={styles.textContent}>
                  <View style={styles.textHeader}>
                    <Text style={styles.textTitle}>{text.title}</Text>
                    {status === 'completed' && (
                      <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                  </View>
                  <Text style={styles.textTitleAr}>{text.titleArabic}</Text>
                  <Text style={styles.textPreview}>{text.preview}</Text>
                  <Text style={styles.textMeta}>{text.wordCount} words</Text>
                </View>
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
  vowelToggle: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vowelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vowelText: {
    marginLeft: 12,
    flex: 1,
  },
  vowelTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  vowelDesc: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#6366f1',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#94a3b8',
  },
  toggleThumbActive: {
    backgroundColor: '#ffffff',
    marginLeft: 20,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  progressTitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
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
  progressValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
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
  textCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  textColorBar: {
    width: 4,
  },
  textContent: {
    flex: 1,
    padding: 16,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  textTitleAr: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 4,
  },
  textPreview: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 12,
  },
  textMeta: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 8,
  },
});
