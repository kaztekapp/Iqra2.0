import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface PracticeCardProps {
  title: string;
  titleArabic: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
}

function PracticeCard({ title, titleArabic, description, icon, color, route }: PracticeCardProps) {
  return (
    <Pressable
      style={[styles.practiceCard, { borderColor: color + '40' }]}
      onPress={() => router.push(route as any)}
    >
      <View style={[styles.practiceIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View style={styles.practiceContent}>
        <Text style={styles.practiceTitle}>{title}</Text>
        <Text style={[styles.practiceTitleArabic, { color }]}>{titleArabic}</Text>
        <Text style={styles.practiceDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#64748b" />
    </Pressable>
  );
}

export default function PracticeScreen() {
  const practiceOptions = [
    {
      id: 'handwriting',
      title: 'Handwriting Practice',
      titleArabic: 'الْخَطُّ الْيَدَوِي',
      description: 'Draw Arabic letters by hand and get instant feedback',
      icon: 'pencil' as const,
      color: '#ec4899',
      route: '/alphabet/writing-practice',
    },
    {
      id: 'typing',
      title: 'Keyboard Typing',
      titleArabic: 'الْكِتَابَةُ بِالْمِفْتَاح',
      description: 'Type Arabic words and sentences using the keyboard',
      icon: 'keypad' as const,
      color: '#14b8a6',
      route: '/exercise/typing-practice',
    },
    {
      id: 'listening',
      title: 'Listening Practice',
      titleArabic: 'تَدْرِيبُ الاِسْتِمَاع',
      description: 'Listen to Arabic audio and test your comprehension',
      icon: 'headset' as const,
      color: '#8b5cf6',
      route: '/exercise/listening',
    },
    {
      id: 'speaking',
      title: 'Speaking Practice',
      titleArabic: 'تَدْرِيبُ التَّحَدُّث',
      description: 'Practice pronunciation with speech recognition',
      icon: 'mic' as const,
      color: '#f59e0b',
      route: '/speaking',
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
            <Text style={styles.title}>Practice</Text>
            <Text style={styles.titleArabic}>التَّدْرِيب</Text>
          </View>
        </View>

        {/* Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="fitness" size={32} color="#ec4899" />
          </View>
          <Text style={styles.introTitle}>Build Your Skills</Text>
          <Text style={styles.introText}>
            Practice makes perfect! Choose from different exercises to strengthen your Arabic writing, typing, listening, and speaking skills.
          </Text>
        </View>

        {/* Practice Options */}
        <View style={styles.practiceSection}>
          <Text style={styles.sectionTitle}>Practice Exercises</Text>
          {practiceOptions.map((option) => (
            <PracticeCard
              key={option.id}
              title={option.title}
              titleArabic={option.titleArabic}
              description={option.description}
              icon={option.icon}
              color={option.color}
              route={option.route}
            />
          ))}
        </View>

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#D4AF37" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Daily Practice Tip</Text>
            <Text style={styles.tipText}>
              Consistent practice is key! Try to spend at least 10-15 minutes daily on different exercises to see the best results.
            </Text>
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
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ec489930',
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ec489920',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  practiceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  practiceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  practiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceContent: {
    flex: 1,
    marginLeft: 16,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  practiceTitleArabic: {
    fontSize: 14,
    marginTop: 2,
  },
  practiceDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
});
