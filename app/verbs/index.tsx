import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { verbExercises } from '../../src/data/arabic/exercises/verbExercises';
import { arabicVerbs } from '../../src/data/arabic/verbs/conjugations';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';

export default function VerbsScreen() {
  const { speak } = useArabicSpeech();
  const writingExercises = verbExercises.filter(ex => ex.type === 'writing');
  const quizExercises = verbExercises.filter(ex => ex.type !== 'writing');

  const tenseCategories = [
    {
      id: 'past',
      title: 'Past Tense',
      titleArabic: 'الْمَاضِي',
      description: 'He wrote, I studied, she went...',
      icon: 'time-outline' as const,
      color: '#6366f1',
    },
    {
      id: 'present',
      title: 'Present Tense',
      titleArabic: 'الْمُضَارِع',
      description: 'He writes, I study, she goes...',
      icon: 'reload-outline' as const,
      color: '#22c55e',
    },
    {
      id: 'future',
      title: 'Future Tense',
      titleArabic: 'الْمُسْتَقْبَل',
      description: 'He will write, I will study...',
      icon: 'arrow-forward-outline' as const,
      color: '#D4AF37',
    },
    {
      id: 'imperative',
      title: 'Commands',
      titleArabic: 'الْأَمْر',
      description: 'Write!, Read!, Go!...',
      icon: 'megaphone-outline' as const,
      color: '#ec4899',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>Verb Conjugations</Text>
            <Text style={styles.titleArabic}>تَصْرِيفُ الْأَفْعَال</Text>
          </View>
        </View>

        {/* Intro Card */}
        <View style={styles.introCard}>
          <Ionicons name="information-circle" size={24} color="#ec4899" />
          <View style={styles.introContent}>
            <Text style={styles.introTitle}>Arabic Verb System</Text>
            <Text style={styles.introText}>
              Arabic verbs change based on who is doing the action (person),
              when it happens (tense), and gender. Master the patterns!
            </Text>
          </View>
        </View>

        {/* Tense Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tenses & Moods</Text>
          {tenseCategories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/verbs/${category.id}` as any)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon} size={24} color={category.color} />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryTitleArabic}>{category.titleArabic}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </Pressable>
          ))}
        </View>

        {/* Practice Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice</Text>

          {/* Quiz Practice */}
          <Pressable
            style={[styles.practiceButton, { backgroundColor: '#ec4899' }]}
            onPress={() =>
              router.push({
                pathname: '/verbs/quiz-practice',
              } as any)
            }
          >
            <Ionicons name="help-circle" size={24} color="#ffffff" />
            <View style={styles.practiceButtonContent}>
              <Text style={styles.practiceButtonText}>Quiz Practice</Text>
              <Text style={styles.practiceButtonSubtext}>
                Multiple choice & fill-in-the-blank
              </Text>
            </View>
            <View style={styles.exerciseCount}>
              <Text style={styles.exerciseCountText}>{quizExercises.length}</Text>
            </View>
          </Pressable>

          {/* Writing Practice */}
          <Pressable
            style={[styles.practiceButton, { backgroundColor: '#D4AF37' }]}
            onPress={() =>
              router.push({
                pathname: '/verbs/writing-practice',
              } as any)
            }
          >
            <Ionicons name="pencil" size={24} color="#ffffff" />
            <View style={styles.practiceButtonContent}>
              <Text style={styles.practiceButtonText}>Writing Practice</Text>
              <Text style={styles.practiceButtonSubtext}>
                Write verb conjugations in Arabic
              </Text>
            </View>
            <View style={styles.exerciseCount}>
              <Text style={styles.exerciseCountText}>{writingExercises.length}</Text>
            </View>
          </Pressable>
        </View>

        {/* All Verbs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Verbs ({arabicVerbs.length})</Text>
          <Text style={styles.sectionSubtitle}>Tap any verb to see full conjugations</Text>
          <View style={styles.verbsGrid}>
            {arabicVerbs.map((verb) => (
              <Pressable
                key={verb.id}
                style={styles.verbCard}
                onPress={() => router.push(`/verbs/verb/${verb.id}` as any)}
              >
                <Pressable
                  style={styles.verbAudioButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    speak(verb.pastTense);
                  }}
                >
                  <Ionicons name="volume-high" size={16} color="#ec4899" />
                </Pressable>
                <Text style={styles.verbArabicText}>{verb.pastTense}</Text>
                <Text style={styles.verbMeaningText}>{verb.meaning}</Text>
                <Text style={styles.verbRootText}>{verb.root}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Key Concepts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Concepts</Text>
          <View style={styles.conceptsGrid}>
            <View style={styles.conceptCard}>
              <Text style={styles.conceptEmoji}>🔤</Text>
              <Text style={styles.conceptTitle}>Root System</Text>
              <Text style={styles.conceptText}>
                Most verbs come from 3-letter roots (e.g., ك-ت-ب for writing)
              </Text>
            </View>
            <View style={styles.conceptCard}>
              <Text style={styles.conceptEmoji}>👤</Text>
              <Text style={styles.conceptTitle}>Person</Text>
              <Text style={styles.conceptText}>
                I, you, he, she, we, they - each has a different form
              </Text>
            </View>
            <View style={styles.conceptCard}>
              <Text style={styles.conceptEmoji}>⚥</Text>
              <Text style={styles.conceptTitle}>Gender</Text>
              <Text style={styles.conceptText}>
                Arabic distinguishes masculine and feminine forms
              </Text>
            </View>
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
    color: '#ec4899',
    marginTop: 4,
  },
  introCard: {
    flexDirection: 'row',
    backgroundColor: '#ec489920',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ec489940',
  },
  introContent: {
    flex: 1,
    marginLeft: 12,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
    marginBottom: 4,
  },
  introText: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryTitleArabic: {
    fontSize: 14,
    color: '#ec4899',
    marginTop: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  practiceButtonContent: {
    flex: 1,
    marginLeft: 12,
  },
  practiceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  practiceButtonSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  exerciseCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  exerciseCountText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
    marginTop: -8,
  },
  verbsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  verbCard: {
    width: '31%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  verbAudioButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ec489920',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verbArabicText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 4,
  },
  verbMeaningText: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
  },
  verbRootText: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  conceptsGrid: {
    gap: 12,
  },
  conceptCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  conceptEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  conceptTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  conceptText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
});
