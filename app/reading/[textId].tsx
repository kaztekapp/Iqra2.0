import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';

// Reading content
const readingContent: Record<string, {
  title: string;
  titleArabic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  paragraphs: { arabic: string; english: string }[];
}> = {
  'intro-1': {
    title: 'Introducing Yourself',
    titleArabic: 'التَّعْرِيفُ بِالنَّفْس',
    level: 'beginner',
    icon: '👋',
    color: '#10b981',
    paragraphs: [
      { arabic: 'مَرْحَبًا، اِسْمِي أَحْمَد.', english: 'Hello, my name is Ahmad.' },
      { arabic: 'أَنَا مِنْ مِصْر.', english: 'I am from Egypt.' },
      { arabic: 'أَنَا طَالِبٌ فِي الْجَامِعَة.', english: 'I am a student at the university.' },
      { arabic: 'أَدْرُسُ اللُّغَةَ الْعَرَبِيَّة.', english: 'I study the Arabic language.' },
      { arabic: 'أُحِبُّ الْقِرَاءَةَ وَالْمُوسِيقَى.', english: 'I love reading and music.' },
    ],
  },
  'family-1': {
    title: 'My Family',
    titleArabic: 'عَائِلَتِي',
    level: 'beginner',
    icon: '👨‍👩‍👧‍👦',
    color: '#6366f1',
    paragraphs: [
      { arabic: 'هَذِهِ عَائِلَتِي.', english: 'This is my family.' },
      { arabic: 'أَبِي اِسْمُهُ مُحَمَّد وَأُمِّي اِسْمُهَا فَاطِمَة.', english: "My father's name is Muhammad and my mother's name is Fatima." },
      { arabic: 'عِنْدِي أَخٌ وَاحِدٌ وَأُخْتٌ وَاحِدَة.', english: 'I have one brother and one sister.' },
      { arabic: 'أَخِي اِسْمُهُ عَلِيّ وَهُوَ طَبِيب.', english: "My brother's name is Ali and he is a doctor." },
      { arabic: 'أُخْتِي اِسْمُهَا مَرْيَم وَهِيَ مُعَلِّمَة.', english: "My sister's name is Maryam and she is a teacher." },
      { arabic: 'نَحْنُ عَائِلَةٌ سَعِيدَة.', english: 'We are a happy family.' },
    ],
  },
  'daily-routine': {
    title: 'Daily Routine',
    titleArabic: 'الرُّوتِينُ الْيَوْمِي',
    level: 'beginner',
    icon: '☀️',
    color: '#f59e0b',
    paragraphs: [
      { arabic: 'أَسْتَيْقِظُ فِي السَّاعَةِ السَّادِسَةِ صَبَاحًا.', english: "I wake up at six o'clock in the morning." },
      { arabic: 'أَغْسِلُ وَجْهِي وَأَتَنَاوَلُ الْفُطُور.', english: 'I wash my face and have breakfast.' },
      { arabic: 'أَذْهَبُ إِلَى الْعَمَلِ فِي السَّاعَةِ الثَّامِنَة.', english: "I go to work at eight o'clock." },
      { arabic: 'أَعْمَلُ حَتَّى السَّاعَةِ الْخَامِسَة.', english: "I work until five o'clock." },
      { arabic: 'أَرْجِعُ إِلَى الْبَيْتِ وَأَتَعَشَّى مَعَ عَائِلَتِي.', english: 'I return home and have dinner with my family.' },
      { arabic: 'أَنَامُ فِي السَّاعَةِ الْعَاشِرَة.', english: "I sleep at ten o'clock." },
    ],
  },
  'at-school': {
    title: 'At School',
    titleArabic: 'فِي الْمَدْرَسَة',
    level: 'intermediate',
    icon: '🏫',
    color: '#8b5cf6',
    paragraphs: [
      { arabic: 'أَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ يَوْم.', english: 'I go to school every day.' },
      { arabic: 'مَدْرَسَتِي كَبِيرَةٌ وَجَمِيلَة.', english: 'My school is big and beautiful.' },
      { arabic: 'عِنْدِي مُعَلِّمُونَ مُمْتَازُون.', english: 'I have excellent teachers.' },
      { arabic: 'أَدْرُسُ الْعَرَبِيَّةَ وَالرِّيَاضِيَّاتِ وَالْعُلُوم.', english: 'I study Arabic, mathematics, and science.' },
      { arabic: 'أُحِبُّ الْقِرَاءَةَ وَالْكِتَابَة.', english: 'I love reading and writing.' },
      { arabic: 'أَلْعَبُ مَعَ أَصْدِقَائِي فِي الاِسْتِرَاحَة.', english: 'I play with my friends during break.' },
    ],
  },
  'at-market': {
    title: 'At the Market',
    titleArabic: 'فِي السُّوق',
    level: 'intermediate',
    icon: '🛒',
    color: '#ec4899',
    paragraphs: [
      { arabic: 'أُحِبُّ الذَّهَابَ إِلَى السُّوقِ مَعَ أُمِّي.', english: 'I love going to the market with my mother.' },
      { arabic: 'السُّوقُ مَلِيءٌ بِالْفَوَاكِهِ وَالْخُضْرَاوَات.', english: 'The market is full of fruits and vegetables.' },
      { arabic: 'نَشْتَرِي الْخُبْزَ الطَّازَجَ مِنَ الْمَخْبَز.', english: 'We buy fresh bread from the bakery.' },
      { arabic: 'أُحِبُّ التُّفَّاحَ الْأَحْمَرَ وَالْبُرْتُقَال.', english: 'I love red apples and oranges.' },
      { arabic: 'الْبَائِعُ لَطِيفٌ وَيُسَاعِدُنَا.', english: 'The seller is nice and helps us.' },
    ],
  },
  'weather': {
    title: 'The Weather',
    titleArabic: 'الطَّقْس',
    level: 'intermediate',
    icon: '🌤️',
    color: '#14b8a6',
    paragraphs: [
      { arabic: 'الطَّقْسُ جَمِيلٌ الْيَوْم.', english: 'The weather is beautiful today.' },
      { arabic: 'الشَّمْسُ مُشْرِقَةٌ وَالسَّمَاءُ زَرْقَاء.', english: 'The sun is shining and the sky is blue.' },
      { arabic: 'فِي الصَّيْفِ يَكُونُ الطَّقْسُ حَارًّا.', english: 'In summer, the weather is hot.' },
      { arabic: 'فِي الشِّتَاءِ يَكُونُ الطَّقْسُ بَارِدًا.', english: 'In winter, the weather is cold.' },
      { arabic: 'أُحِبُّ الرَّبِيعَ لِأَنَّ الْأَزْهَارَ تَتَفَتَّح.', english: 'I love spring because the flowers bloom.' },
      { arabic: 'أَحْيَانًا تُمْطِرُ السَّمَاء.', english: 'Sometimes it rains.' },
    ],
  },
  'travel-story': {
    title: 'A Travel Story',
    titleArabic: 'قِصَّةُ سَفَر',
    level: 'advanced',
    icon: '✈️',
    color: '#D4AF37',
    paragraphs: [
      { arabic: 'سَافَرْتُ إِلَى مِصْرَ فِي الصَّيْفِ الْمَاضِي.', english: 'I traveled to Egypt last summer.' },
      { arabic: 'زُرْتُ الْأَهْرَامَاتِ الْعَظِيمَةَ فِي الْجِيزَة.', english: 'I visited the great pyramids in Giza.' },
      { arabic: 'رَكِبْتُ الْجَمَلَ فِي الصَّحْرَاء.', english: 'I rode a camel in the desert.' },
      { arabic: 'شَاهَدْتُ أَبُو الْهَوْلِ وَهُوَ رَائِع.', english: 'I saw the Sphinx and it was amazing.' },
      { arabic: 'أَكَلْتُ الطَّعَامَ الْمِصْرِيَّ اللَّذِيذ.', english: 'I ate delicious Egyptian food.' },
      { arabic: 'كَانَتْ رِحْلَةً لَا تُنْسَى.', english: 'It was an unforgettable trip.' },
    ],
  },
  'arab-culture': {
    title: 'Arab Culture',
    titleArabic: 'الثَّقَافَةُ الْعَرَبِيَّة',
    level: 'advanced',
    icon: '🕌',
    color: '#ef4444',
    paragraphs: [
      { arabic: 'الثَّقَافَةُ الْعَرَبِيَّةُ غَنِيَّةٌ وَمُتَنَوِّعَة.', english: 'Arab culture is rich and diverse.' },
      { arabic: 'اللُّغَةُ الْعَرَبِيَّةُ مِنْ أَقْدَمِ اللُّغَاتِ فِي الْعَالَم.', english: 'The Arabic language is one of the oldest languages in the world.' },
      { arabic: 'الضِّيَافَةُ قِيمَةٌ مُهِمَّةٌ عِنْدَ الْعَرَب.', english: 'Hospitality is an important value among Arabs.' },
      { arabic: 'الْقَهْوَةُ الْعَرَبِيَّةُ رَمْزٌ لِلْكَرَم.', english: 'Arabic coffee is a symbol of generosity.' },
      { arabic: 'الْخَطُّ الْعَرَبِيُّ فَنٌّ جَمِيل.', english: 'Arabic calligraphy is a beautiful art.' },
      { arabic: 'الْمُوسِيقَى الْعَرَبِيَّةُ مَشْهُورَةٌ فِي كُلِّ الْعَالَم.', english: 'Arabic music is famous all over the world.' },
    ],
  },
};

// Sentence Card Component (similar to AyahCard)
interface SentenceCardProps {
  index: number;
  arabic: string;
  english: string;
  color: string;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
}

function SentenceCard({ index, arabic, english, color, isPlaying, isLoading, onPlay }: SentenceCardProps) {
  return (
    <View style={styles.sentenceCard}>
      {/* Header with Number and Play Button */}
      <View style={styles.sentenceHeader}>
        <View style={[styles.sentenceNumber, { backgroundColor: color + '20' }]}>
          <Text style={[styles.sentenceNumberText, { color }]}>{index + 1}</Text>
        </View>
        <Pressable
          style={[
            styles.playButton,
            { backgroundColor: color },
            isPlaying && styles.playButtonActive,
          ]}
          onPress={onPlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color="#ffffff" />
          )}
        </Pressable>
      </View>

      {/* Arabic Text */}
      <Text style={styles.sentenceArabic}>{arabic}</Text>

      {/* English Translation */}
      <Text style={styles.sentenceEnglish}>{english}</Text>
    </View>
  );
}

export default function ReadingDetailScreen() {
  const { textId } = useLocalSearchParams<{ textId: string }>();
  const { startReading, completeReading, addXp, updateStreak } = useProgressStore();

  const { speak, isSpeaking } = useArabicSpeech();
  const text = readingContent[textId || ''];

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const isPlayingAllRef = useRef(false);
  const currentIndexRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (textId) {
      startReading(textId);
    }
  }, [textId]);

  // Play a single sentence
  const handlePlaySentence = useCallback((index: number) => {
    if (!text) return;
    setCurrentPlayingIndex(index);
    speak(text.paragraphs[index].arabic);
  }, [text, speak]);

  // Play all sentences sequentially
  const handlePlayAll = useCallback(async () => {
    if (!text) return;

    if (isPlayingAll) {
      // Stop playback
      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      setCurrentPlayingIndex(null);
    } else {
      // Start playing all
      isPlayingAllRef.current = true;
      setIsPlayingAll(true);

      for (let i = 0; i < text.paragraphs.length; i++) {
        if (!isPlayingAllRef.current) break;

        currentIndexRef.current = i;
        setCurrentPlayingIndex(i);

        await new Promise<void>((resolve) => {
          speak(text.paragraphs[i].arabic);
          // Wait for speech to complete (approximate timing)
          setTimeout(resolve, 2500);
        });
      }

      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      setCurrentPlayingIndex(null);
    }
  }, [text, speak, isPlayingAll]);

  const handleComplete = () => {
    if (textId) {
      completeReading(textId);
      addXp(30);
      updateStreak();
      router.back();
    }
  };

  if (!text) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.comingSoon}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.comingSoonContent}>
            <Ionicons name="book" size={64} color="#10b981" />
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              This reading passage is currently being developed. Check back soon!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const levelColors = {
    beginner: '#10b981',
    intermediate: '#6366f1',
    advanced: '#D4AF37',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.titleArabic}>{text.titleArabic}</Text>
            <Text style={styles.title}>{text.title}</Text>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.iconText}>{text.icon}</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={[styles.infoCard, { borderColor: text.color + '30' }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="list" size={16} color={text.color} />
              <Text style={styles.infoText}>{text.paragraphs.length} Sentences</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="school" size={16} color={text.color} />
              <Text style={[styles.infoText, { textTransform: 'capitalize' }]}>{text.level}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={16} color={text.color} />
              <Text style={styles.infoText}>~{Math.ceil(text.paragraphs.length * 0.5)} min</Text>
            </View>
          </View>
        </View>

        {/* Sentences Header with Play All */}
        <View style={styles.sentencesHeader}>
          <Text style={styles.sectionTitle}>Sentences</Text>
          <Pressable
            style={[
              styles.playAllButton,
              { backgroundColor: text.color },
              isPlayingAll && styles.playAllButtonActive,
            ]}
            onPress={handlePlayAll}
          >
            {isPlayingAll ? (
              <>
                <Ionicons name="stop" size={14} color="#ffffff" />
                <Text style={styles.playAllText}>
                  {currentPlayingIndex !== null ? `${currentPlayingIndex + 1}/${text.paragraphs.length}` : 'Stop'}
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="play" size={14} color="#ffffff" />
                <Text style={styles.playAllText}>Play All</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Sentence Cards */}
        <View style={styles.sentencesContainer}>
          {text.paragraphs.map((paragraph, index) => (
            <SentenceCard
              key={index}
              index={index}
              arabic={paragraph.arabic}
              english={paragraph.english}
              color={text.color}
              isPlaying={currentPlayingIndex === index}
              isLoading={false}
              onPlay={() => handlePlaySentence(index)}
            />
          ))}
        </View>

        {/* Complete Button */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable
            style={[styles.completeButton, { backgroundColor: text.color }]}
            onPress={handleComplete}
          >
            <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
            <Text style={styles.completeButtonText}>Mark as Complete (+30 XP)</Text>
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
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  titleArabic: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: '#10b981',
    fontSize: 14,
    marginTop: 4,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  infoCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  sentencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  playAllButtonActive: {
    backgroundColor: '#ef4444',
  },
  playAllText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  sentencesContainer: {
    paddingHorizontal: 20,
  },
  // Sentence Card Styles
  sentenceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  sentenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sentenceNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: '#3b82f6',
  },
  sentenceArabic: {
    fontSize: 24,
    color: '#ffffff',
    lineHeight: 40,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 12,
  },
  sentenceEnglish: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  completeButton: {
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comingSoon: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  comingSoonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
