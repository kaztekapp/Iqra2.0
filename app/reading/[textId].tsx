import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';

// Reading content
const readingContent: Record<string, {
  title: string;
  titleArabic: string;
  paragraphs: { arabic: string; transliteration: string; english: string }[];
}> = {
  'intro-1': {
    title: 'Introducing Yourself',
    titleArabic: 'التَّعْرِيفُ بِالنَّفْس',
    paragraphs: [
      {
        arabic: 'مَرْحَبًا، اِسْمِي أَحْمَد.',
        transliteration: 'Marḥaban, ismī Aḥmad.',
        english: 'Hello, my name is Ahmad.',
      },
      {
        arabic: 'أَنَا مِنْ مِصْر.',
        transliteration: 'Anā min Miṣr.',
        english: 'I am from Egypt.',
      },
      {
        arabic: 'أَنَا طَالِبٌ فِي الْجَامِعَة.',
        transliteration: 'Anā ṭālibun fī al-jāmiʿa.',
        english: 'I am a student at the university.',
      },
      {
        arabic: 'أَدْرُسُ اللُّغَةَ الْعَرَبِيَّة.',
        transliteration: 'Adrusu al-lughata al-ʿarabiyya.',
        english: 'I study the Arabic language.',
      },
      {
        arabic: 'أُحِبُّ الْقِرَاءَةَ وَالْمُوسِيقَى.',
        transliteration: 'Uḥibbu al-qirāʾa wa al-mūsīqā.',
        english: 'I love reading and music.',
      },
    ],
  },
  'family-1': {
    title: 'My Family',
    titleArabic: 'عَائِلَتِي',
    paragraphs: [
      {
        arabic: 'هَذِهِ عَائِلَتِي.',
        transliteration: 'Hādhihi ʿāʾilatī.',
        english: 'This is my family.',
      },
      {
        arabic: 'أَبِي اِسْمُهُ مُحَمَّد وَأُمِّي اِسْمُهَا فَاطِمَة.',
        transliteration: 'Abī ismuhu Muḥammad wa ummī ismuhā Fāṭima.',
        english: 'My father\'s name is Muhammad and my mother\'s name is Fatima.',
      },
      {
        arabic: 'عِنْدِي أَخٌ وَاحِدٌ وَأُخْتٌ وَاحِدَة.',
        transliteration: 'ʿIndī akhun wāḥid wa ukhtun wāḥida.',
        english: 'I have one brother and one sister.',
      },
      {
        arabic: 'أَخِي اِسْمُهُ عَلِيّ وَهُوَ طَبِيب.',
        transliteration: 'Akhī ismuhu ʿAlī wa huwa ṭabīb.',
        english: 'My brother\'s name is Ali and he is a doctor.',
      },
      {
        arabic: 'أُخْتِي اِسْمُهَا مَرْيَم وَهِيَ مُعَلِّمَة.',
        transliteration: 'Ukhtī ismuhā Maryam wa hiya muʿallima.',
        english: 'My sister\'s name is Maryam and she is a teacher.',
      },
      {
        arabic: 'نَحْنُ عَائِلَةٌ سَعِيدَة.',
        transliteration: 'Naḥnu ʿāʾilatun saʿīda.',
        english: 'We are a happy family.',
      },
    ],
  },
  'daily-routine': {
    title: 'Daily Routine',
    titleArabic: 'الرُّوتِينُ الْيَوْمِي',
    paragraphs: [
      {
        arabic: 'أَسْتَيْقِظُ فِي السَّاعَةِ السَّادِسَةِ صَبَاحًا.',
        transliteration: 'Astayqiẓu fī as-sāʿa as-sādisa ṣabāḥan.',
        english: 'I wake up at six o\'clock in the morning.',
      },
      {
        arabic: 'أَغْسِلُ وَجْهِي وَأَتَنَاوَلُ الْفُطُور.',
        transliteration: 'Aghsilu wajhī wa atanāwalu al-fuṭūr.',
        english: 'I wash my face and have breakfast.',
      },
      {
        arabic: 'أَذْهَبُ إِلَى الْعَمَلِ فِي السَّاعَةِ الثَّامِنَة.',
        transliteration: 'Adhhabu ilā al-ʿamal fī as-sāʿa ath-thāmina.',
        english: 'I go to work at eight o\'clock.',
      },
      {
        arabic: 'أَعْمَلُ حَتَّى السَّاعَةِ الْخَامِسَة.',
        transliteration: 'Aʿmalu ḥattā as-sāʿa al-khāmisa.',
        english: 'I work until five o\'clock.',
      },
      {
        arabic: 'أَرْجِعُ إِلَى الْبَيْتِ وَأَتَعَشَّى مَعَ عَائِلَتِي.',
        transliteration: 'Arjiʿu ilā al-bayt wa ataʿashshā maʿa ʿāʾilatī.',
        english: 'I return home and have dinner with my family.',
      },
      {
        arabic: 'أَنَامُ فِي السَّاعَةِ الْعَاشِرَة.',
        transliteration: 'Anāmu fī as-sāʿa al-ʿāshira.',
        english: 'I sleep at ten o\'clock.',
      },
    ],
  },
};

export default function ReadingDetailScreen() {
  const { textId } = useLocalSearchParams<{ textId: string }>();
  const {
    showVowels,
    setShowVowels,
    startReading,
    completeReading,
    addXp,
    updateStreak,
  } = useProgressStore();

  const [showTranslation, setShowTranslation] = useState(true);
  const { speak, speakSlow, isSpeaking } = useArabicSpeech();
  const text = readingContent[textId || ''];

  useEffect(() => {
    if (textId) {
      startReading(textId);
    }
  }, [textId]);

  if (!text) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.comingSoon}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.comingSoonContent}>
            <Ionicons name="book" size={64} color="#D4AF37" />
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              This reading passage is currently being developed. Check back soon!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleComplete = () => {
    if (textId) {
      completeReading(textId);
      addXp(30);
      updateStreak();
      router.back();
    }
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
            <Text style={styles.title}>{text.title}</Text>
            <Text style={styles.titleArabic}>{text.titleArabic}</Text>
          </View>
          <Pressable
            style={[styles.playButton, isSpeaking && styles.playButtonActive]}
            onPress={() => {
              const allText = text.paragraphs.map(p => p.arabic).join(' ');
              speakSlow(allText);
            }}
          >
            <Ionicons name={isSpeaking ? "pause" : "play"} size={20} color="#ffffff" />
          </Pressable>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            style={[styles.controlBtn, showVowels && styles.controlBtnActive]}
            onPress={() => setShowVowels(!showVowels)}
          >
            <Ionicons
              name="text"
              size={18}
              color={showVowels ? '#ffffff' : '#94a3b8'}
            />
            <Text
              style={[
                styles.controlText,
                showVowels && styles.controlTextActive,
              ]}
            >
              Vowels
            </Text>
          </Pressable>
          <Pressable
            style={[styles.controlBtn, showTranslation && styles.controlBtnActive]}
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <Ionicons
              name="language"
              size={18}
              color={showTranslation ? '#ffffff' : '#94a3b8'}
            />
            <Text
              style={[
                styles.controlText,
                showTranslation && styles.controlTextActive,
              ]}
            >
              Translation
            </Text>
          </Pressable>
        </View>

        {/* Reading Content */}
        <View style={styles.content}>
          {text.paragraphs.map((paragraph, index) => (
            <View key={index} style={styles.paragraph}>
              <View style={styles.arabicRow}>
                <Text style={styles.arabicText}>{paragraph.arabic}</Text>
                <Pressable
                  style={styles.audioBtn}
                  onPress={() => speak(paragraph.arabic)}
                >
                  <Ionicons name="volume-medium" size={20} color="#D4AF37" />
                </Pressable>
              </View>
              {showVowels && (
                <Text style={styles.translitText}>{paragraph.transliteration}</Text>
              )}
              {showTranslation && (
                <Text style={styles.englishText}>{paragraph.english}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Complete Button */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable style={styles.completeButton} onPress={handleComplete}>
            <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
            <Text style={styles.completeButtonText}>
              Mark as Complete (+30 XP)
            </Text>
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
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: '#D4AF37',
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  controlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  controlBtnActive: {
    backgroundColor: '#6366f1',
  },
  controlText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  controlTextActive: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
  },
  paragraph: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  arabicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  arabicText: {
    fontSize: 26,
    color: '#ffffff',
    lineHeight: 44,
    textAlign: 'right',
    flex: 1,
    writingDirection: 'rtl',
  },
  audioBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  translitText: {
    fontSize: 14,
    color: '#6366f1',
    marginTop: 12,
  },
  englishText: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 8,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  completeButton: {
    backgroundColor: '#22c55e',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
