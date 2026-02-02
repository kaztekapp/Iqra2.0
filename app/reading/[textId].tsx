import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback, useRef, memo } from 'react';
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
      { arabic: 'عُمْرِي عِشْرُونَ سَنَة.', english: 'I am twenty years old.' },
      { arabic: 'أَنَا طَالِبٌ فِي الْجَامِعَة.', english: 'I am a student at the university.' },
      { arabic: 'أَدْرُسُ اللُّغَةَ الْعَرَبِيَّة وَالتَّارِيخ.', english: 'I study the Arabic language and history.' },
      { arabic: 'أَسْكُنُ فِي شَقَّةٍ صَغِيرَةٍ مَعَ صَدِيقِي.', english: 'I live in a small apartment with my friend.' },
      { arabic: 'أُحِبُّ الْقِرَاءَةَ وَالْمُوسِيقَى.', english: 'I love reading and music.' },
      { arabic: 'أَقْرَأُ كِتَابًا كُلَّ أُسْبُوع.', english: 'I read a book every week.' },
      { arabic: 'أَلْعَبُ كُرَةَ الْقَدَمِ يَوْمَ الْجُمُعَة.', english: 'I play football on Friday.' },
      { arabic: 'أُرِيدُ أَنْ أَكُونَ مُعَلِّمًا فِي الْمُسْتَقْبَل.', english: 'I want to be a teacher in the future.' },
      { arabic: 'أُحِبُّ مُسَاعَدَةَ النَّاس.', english: 'I love helping people.' },
      { arabic: 'تَشَرَّفْتُ بِمَعْرِفَتِكُمْ!', english: 'Pleased to meet you!' },
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
      { arabic: 'عَائِلَتِي كَبِيرَةٌ وَسَعِيدَة.', english: 'My family is big and happy.' },
      { arabic: 'أَبِي اِسْمُهُ مُحَمَّد وَهُوَ مُهَنْدِس.', english: "My father's name is Muhammad and he is an engineer." },
      { arabic: 'أَبِي رَجُلٌ طَيِّبٌ وَكَرِيم.', english: 'My father is a kind and generous man.' },
      { arabic: 'أُمِّي اِسْمُهَا فَاطِمَة وَهِيَ مُعَلِّمَة.', english: "My mother's name is Fatima and she is a teacher." },
      { arabic: 'أُمِّي تَطْبُخُ طَعَامًا لَذِيذًا كُلَّ يَوْم.', english: 'My mother cooks delicious food every day.' },
      { arabic: 'عِنْدِي أَخٌ وَاحِدٌ وَأُخْتَان.', english: 'I have one brother and two sisters.' },
      { arabic: 'أَخِي اِسْمُهُ عَلِيّ وَهُوَ طَبِيب.', english: "My brother's name is Ali and he is a doctor." },
      { arabic: 'أُخْتِي الْكَبِيرَة اِسْمُهَا مَرْيَم وَهِيَ مُحَامِيَة.', english: "My older sister's name is Maryam and she is a lawyer." },
      { arabic: 'أُخْتِي الصَّغِيرَة اِسْمُهَا سَارَة وَهِيَ طَالِبَة.', english: "My younger sister's name is Sara and she is a student." },
      { arabic: 'عِنْدَنَا قِطَّةٌ جَمِيلَةٌ اِسْمُهَا لُولُو.', english: 'We have a beautiful cat named Lulu.' },
      { arabic: 'نَجْتَمِعُ كُلَّ يَوْمِ جُمُعَةٍ لِتَنَاوُلِ الْغَدَاء.', english: 'We gather every Friday for lunch.' },
      { arabic: 'نَأْكُلُ وَنَتَحَدَّثُ وَنَضْحَك.', english: 'We eat, talk, and laugh.' },
      { arabic: 'أُحِبُّ عَائِلَتِي كَثِيرًا.', english: 'I love my family very much.' },
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
      { arabic: 'أَغْسِلُ وَجْهِي وَأُنَظِّفُ أَسْنَانِي.', english: 'I wash my face and brush my teeth.' },
      { arabic: 'أُصَلِّي صَلَاةَ الْفَجْر.', english: 'I pray the Fajr prayer.' },
      { arabic: 'أَتَنَاوَلُ الْفُطُورَ مَعَ عَائِلَتِي.', english: 'I have breakfast with my family.' },
      { arabic: 'آكُلُ الْخُبْزَ وَالْجُبْنَ وَأَشْرَبُ الْحَلِيب.', english: 'I eat bread and cheese and drink milk.' },
      { arabic: 'أَذْهَبُ إِلَى الْعَمَلِ فِي السَّاعَةِ الثَّامِنَة.', english: "I go to work at eight o'clock." },
      { arabic: 'أَرْكَبُ الْحَافِلَةَ كُلَّ يَوْم.', english: 'I take the bus every day.' },
      { arabic: 'أَعْمَلُ فِي مَكْتَبٍ كَبِير.', english: 'I work in a big office.' },
      { arabic: 'أَعْمَلُ حَتَّى السَّاعَةِ الْخَامِسَة.', english: "I work until five o'clock." },
      { arabic: 'أَرْجِعُ إِلَى الْبَيْتِ وَأَسْتَرِيح.', english: 'I return home and rest.' },
      { arabic: 'أَتَعَشَّى مَعَ عَائِلَتِي فِي السَّاعَةِ السَّابِعَة.', english: "I have dinner with my family at seven o'clock." },
      { arabic: 'أُشَاهِدُ التِّلْفَازَ أَوْ أَقْرَأُ كِتَابًا.', english: 'I watch TV or read a book.' },
      { arabic: 'أَنَامُ فِي السَّاعَةِ الْعَاشِرَةِ مَسَاءً.', english: "I sleep at ten o'clock in the evening." },
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
      { arabic: 'فِيهَا حَدِيقَةٌ خَضْرَاءُ وَمَلْعَب.', english: 'It has a green garden and a playground.' },
      { arabic: 'عِنْدِي مُعَلِّمُونَ مُمْتَازُونَ وَلَطِيفُون.', english: 'I have excellent and kind teachers.' },
      { arabic: 'مُعَلِّمَةُ الْعَرَبِيَّةِ اِسْمُهَا أُسْتَاذَة نُورَة.', english: "The Arabic teacher's name is teacher Noura." },
      { arabic: 'أَدْرُسُ الْعَرَبِيَّةَ وَالرِّيَاضِيَّاتِ وَالْعُلُوم.', english: 'I study Arabic, mathematics, and science.' },
      { arabic: 'أُحِبُّ حِصَّةَ الْعُلُومِ كَثِيرًا.', english: 'I love the science class very much.' },
      { arabic: 'نَتَعَلَّمُ عَنِ النَّبَاتَاتِ وَالْحَيَوَانَات.', english: 'We learn about plants and animals.' },
      { arabic: 'أُحِبُّ الْقِرَاءَةَ وَالْكِتَابَةَ فِي الْعَرَبِيَّة.', english: 'I love reading and writing in Arabic.' },
      { arabic: 'فِي الاِسْتِرَاحَةِ أَلْعَبُ مَعَ أَصْدِقَائِي.', english: 'During break, I play with my friends.' },
      { arabic: 'نَلْعَبُ كُرَةَ الْقَدَمِ فِي الْمَلْعَب.', english: 'We play football on the playground.' },
      { arabic: 'نَأْكُلُ السَّنْدَوِيتْشَاتِ وَنَشْرَبُ الْعَصِير.', english: 'We eat sandwiches and drink juice.' },
      { arabic: 'تَنْتَهِي الْمَدْرَسَةُ فِي السَّاعَةِ الثَّانِيَة.', english: "School ends at two o'clock." },
      { arabic: 'أَرْجِعُ إِلَى الْبَيْتِ سَعِيدًا.', english: 'I return home happy.' },
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
      { arabic: 'نَذْهَبُ كُلَّ يَوْمِ سَبْتٍ صَبَاحًا.', english: 'We go every Saturday morning.' },
      { arabic: 'السُّوقُ كَبِيرٌ وَمَلِيءٌ بِالنَّاس.', english: 'The market is big and full of people.' },
      { arabic: 'هُنَاكَ مَحَلَّاتٌ كَثِيرَةٌ وَمُخْتَلِفَة.', english: 'There are many different shops.' },
      { arabic: 'نَشْتَرِي الْفَوَاكِهَ وَالْخُضْرَاوَاتِ الطَّازَجَة.', english: 'We buy fresh fruits and vegetables.' },
      { arabic: 'أُحِبُّ التُّفَّاحَ الْأَحْمَرَ وَالْمَوْزَ الْأَصْفَر.', english: 'I love red apples and yellow bananas.' },
      { arabic: 'نَشْتَرِي الْبُرْتُقَالَ وَالْعِنَبَ أَيْضًا.', english: 'We also buy oranges and grapes.' },
      { arabic: 'نَشْتَرِي الْخُبْزَ الطَّازَجَ مِنَ الْمَخْبَز.', english: 'We buy fresh bread from the bakery.' },
      { arabic: 'رَائِحَةُ الْخُبْزِ لَذِيذَةٌ جِدًّا.', english: 'The smell of bread is very delicious.' },
      { arabic: 'الْبَائِعُ لَطِيفٌ وَيُسَاعِدُنَا فِي الاِخْتِيَار.', english: 'The seller is nice and helps us choose.' },
      { arabic: 'نَسْأَلُهُ عَنِ الْأَسْعَار.', english: 'We ask him about the prices.' },
      { arabic: 'أَحْيَانًا نُسَاوِمُ عَلَى الثَّمَن.', english: 'Sometimes we bargain for the price.' },
      { arabic: 'نَدْفَعُ وَنَشْكُرُ الْبَائِعَ.', english: 'We pay and thank the seller.' },
      { arabic: 'نَرْجِعُ إِلَى الْبَيْتِ وَنَطْبُخُ طَعَامًا لَذِيذًا.', english: 'We return home and cook delicious food.' },
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
      { arabic: 'الْجَوُّ دَافِئٌ وَلَطِيف.', english: 'The air is warm and pleasant.' },
      { arabic: 'فِي الرَّبِيعِ تَتَفَتَّحُ الْأَزْهَارُ الْمُلَوَّنَة.', english: 'In spring, colorful flowers bloom.' },
      { arabic: 'الْأَشْجَارُ تُصْبِحُ خَضْرَاءَ وَجَمِيلَة.', english: 'The trees become green and beautiful.' },
      { arabic: 'فِي الصَّيْفِ يَكُونُ الطَّقْسُ حَارًّا جِدًّا.', english: 'In summer, the weather is very hot.' },
      { arabic: 'أُحِبُّ السِّبَاحَةَ فِي الْبَحْرِ فِي الصَّيْف.', english: 'I love swimming in the sea in summer.' },
      { arabic: 'نَأْكُلُ الْمُثَلَّجَاتِ لِنُبَرِّدَ أَجْسَامَنَا.', english: 'We eat ice cream to cool our bodies.' },
      { arabic: 'فِي الْخَرِيفِ تَسْقُطُ الْأَوْرَاقُ مِنَ الشَّجَر.', english: 'In autumn, the leaves fall from the trees.' },
      { arabic: 'الْأَوْرَاقُ تُصْبِحُ صَفْرَاءَ وَبُرْتُقَالِيَّة.', english: 'The leaves become yellow and orange.' },
      { arabic: 'فِي الشِّتَاءِ يَكُونُ الطَّقْسُ بَارِدًا جِدًّا.', english: 'In winter, the weather is very cold.' },
      { arabic: 'أَحْيَانًا يَنْزِلُ الْمَطَرُ أَوِ الثَّلْج.', english: 'Sometimes it rains or snows.' },
      { arabic: 'أَلْبَسُ مِعْطَفًا ثَقِيلًا وَقُفَّازَات.', english: 'I wear a heavy coat and gloves.' },
      { arabic: 'أُحِبُّ الْجُلُوسَ قُرْبَ الْمِدْفَأَة.', english: 'I love sitting near the fireplace.' },
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
      { arabic: 'كَانَتْ أَوَّلَ رِحْلَةٍ لِي خَارِجَ بَلَدِي.', english: 'It was my first trip outside my country.' },
      { arabic: 'رَكِبْتُ الطَّائِرَةَ لِمُدَّةِ ثَلَاثِ سَاعَات.', english: 'I flew on the plane for three hours.' },
      { arabic: 'وَصَلْتُ إِلَى مَطَارِ الْقَاهِرَةِ الدَّوْلِي.', english: 'I arrived at Cairo International Airport.' },
      { arabic: 'زُرْتُ الْأَهْرَامَاتِ الْعَظِيمَةَ فِي الْجِيزَة.', english: 'I visited the great pyramids in Giza.' },
      { arabic: 'الْأَهْرَامَاتُ ضَخْمَةٌ وَمُذْهِلَة.', english: 'The pyramids are huge and amazing.' },
      { arabic: 'رَكِبْتُ الْجَمَلَ فِي الصَّحْرَاءِ حَوْلَ الْأَهْرَامَات.', english: 'I rode a camel in the desert around the pyramids.' },
      { arabic: 'شَاهَدْتُ أَبُو الْهَوْلِ وَالتَقَطْتُ صُوَرًا كَثِيرَة.', english: 'I saw the Sphinx and took many pictures.' },
      { arabic: 'زُرْتُ الْمَتْحَفَ الْمِصْرِيَّ وَرَأَيْتُ الْآثَارَ الْقَدِيمَة.', english: 'I visited the Egyptian Museum and saw ancient artifacts.' },
      { arabic: 'أَكَلْتُ الطَّعَامَ الْمِصْرِيَّ اللَّذِيذَ كَالْكُشَرِي وَالْفُول.', english: 'I ate delicious Egyptian food like koshari and foul.' },
      { arabic: 'شَرِبْتُ الشَّايَ الْمِصْرِيَّ فِي مَقْهًى قَدِيم.', english: 'I drank Egyptian tea in an old cafe.' },
      { arabic: 'تَعَرَّفْتُ عَلَى نَاسٍ لَطِيفِينَ وَكَرِيمِين.', english: 'I met nice and generous people.' },
      { arabic: 'النَّاسُ فِي مِصْرَ وَدُودُونَ جِدًّا.', english: 'The people in Egypt are very friendly.' },
      { arabic: 'كَانَتْ رِحْلَةً لَا تُنْسَى وَأُرِيدُ الْعَوْدَةَ قَرِيبًا.', english: 'It was an unforgettable trip and I want to return soon.' },
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
      { arabic: 'يَمْتَدُّ تَارِيخُهَا لِآلَافِ السِّنِين.', english: 'Its history extends for thousands of years.' },
      { arabic: 'اللُّغَةُ الْعَرَبِيَّةُ مِنْ أَقْدَمِ اللُّغَاتِ فِي الْعَالَم.', english: 'The Arabic language is one of the oldest languages in the world.' },
      { arabic: 'يَتَكَلَّمُهَا أَكْثَرُ مِنْ أَرْبَعِمِئَةِ مِلْيُونِ شَخْص.', english: 'More than four hundred million people speak it.' },
      { arabic: 'الْقُرْآنُ الْكَرِيمُ نَزَلَ بِاللُّغَةِ الْعَرَبِيَّة.', english: 'The Holy Quran was revealed in Arabic.' },
      { arabic: 'الضِّيَافَةُ قِيمَةٌ مُهِمَّةٌ جِدًّا عِنْدَ الْعَرَب.', english: 'Hospitality is a very important value among Arabs.' },
      { arabic: 'يُرَحِّبُ الْعَرَبُ بِالضُّيُوفِ بِحَرَارَة.', english: 'Arabs welcome guests warmly.' },
      { arabic: 'الْقَهْوَةُ الْعَرَبِيَّةُ رَمْزٌ لِلْكَرَمِ وَالتَّرْحِيب.', english: 'Arabic coffee is a symbol of generosity and welcome.' },
      { arabic: 'تُقَدَّمُ مَعَ التَّمْرِ لِلضُّيُوف.', english: 'It is served with dates to guests.' },
      { arabic: 'الْخَطُّ الْعَرَبِيُّ فَنٌّ جَمِيلٌ وَفَرِيد.', english: 'Arabic calligraphy is a beautiful and unique art.' },
      { arabic: 'يُزَيِّنُ الْمَسَاجِدَ وَالْقُصُورَ وَالْكُتُب.', english: 'It decorates mosques, palaces, and books.' },
      { arabic: 'الْمُوسِيقَى الْعَرَبِيَّةُ مَشْهُورَةٌ فِي كُلِّ الْعَالَم.', english: 'Arabic music is famous all over the world.' },
      { arabic: 'تَسْتَخْدِمُ آلَاتٍ مِثْلَ الْعُودِ وَالنَّاي.', english: 'It uses instruments like the oud and the ney.' },
      { arabic: 'الشِّعْرُ الْعَرَبِيُّ لَهُ مَكَانَةٌ خَاصَّةٌ فِي الثَّقَافَة.', english: 'Arabic poetry has a special place in the culture.' },
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

const SentenceCard = memo(function SentenceCard({ index, arabic, english, color, isPlaying, isLoading, onPlay }: SentenceCardProps) {
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
});

export default function ReadingDetailScreen() {
  const { textId } = useLocalSearchParams<{ textId: string }>();
  const { startReading, completeReading, addXp, updateStreak } = useProgressStore();

  const { speak, speakSlow, isSpeaking } = useArabicSpeech();
  const text = readingContent[textId || ''];

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [isSlowMode, setIsSlowMode] = useState(true); // Default to slow for better learning
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
    if (isSlowMode) {
      speakSlow(text.paragraphs[index].arabic);
    } else {
      speak(text.paragraphs[index].arabic);
    }
  }, [text, speak, speakSlow, isSlowMode]);

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
          if (isSlowMode) {
            speakSlow(text.paragraphs[i].arabic);
            // Wait for speech to complete (slow mode needs more time)
            setTimeout(resolve, 5000);
          } else {
            speak(text.paragraphs[i].arabic);
            // Wait for speech to complete
            setTimeout(resolve, 4000);
          }
        });
      }

      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      setCurrentPlayingIndex(null);
    }
  }, [text, speak, speakSlow, isPlayingAll, isSlowMode]);

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
          <View style={styles.headerButtons}>
            {/* Speed Toggle */}
            <Pressable
              style={[
                styles.speedToggle,
                isSlowMode && styles.speedToggleActive,
              ]}
              onPress={() => setIsSlowMode(!isSlowMode)}
            >
              <Ionicons name="speedometer" size={14} color={isSlowMode ? '#ffffff' : '#94a3b8'} />
              <Text style={[styles.speedToggleText, isSlowMode && styles.speedToggleTextActive]}>
                {isSlowMode ? 'Slow' : 'Normal'}
              </Text>
            </Pressable>
            {/* Play All Button */}
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  speedToggleActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  speedToggleText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  speedToggleTextActive: {
    color: '#ffffff',
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
