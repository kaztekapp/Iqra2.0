import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';
import { getExercisesForGrammarLesson } from '../../src/data/arabic/exercises';
import { Exercise, GrammarLesson, GrammarContent } from '../../src/types/arabic';
import ArabicKeyboard from '../../src/components/arabic/ArabicKeyboard';
import { getLessonById } from '../../src/data/arabic/grammar/lessons';

// Comprehensive lesson content with many examples
const lessonContent: Record<string, {
  title: string;
  titleArabic: string;
  sections: {
    title: string;
    content: string;
    examples?: { arabic: string; transliteration: string; english: string }[];
  }[];
}> = {
  'definite-article': {
    title: 'The Definite Article',
    titleArabic: 'أَلْ التَّعْرِيف',
    sections: [
      {
        title: 'What is the Definite Article?',
        content: 'In Arabic, the definite article "the" is expressed by adding أَلْ (al-) to the beginning of a noun. This is equivalent to "the" in English. Arabic has NO word for "a/an" - just leave it off!',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book' },
          { arabic: 'الْكِتَاب', transliteration: 'al-kitāb', english: 'the book' },
          { arabic: 'بَيْت', transliteration: 'bayt', english: 'a house' },
          { arabic: 'الْبَيْت', transliteration: 'al-bayt', english: 'the house' },
          { arabic: 'قَلَم', transliteration: 'qalam', english: 'a pen' },
          { arabic: 'الْقَلَم', transliteration: 'al-qalam', english: 'the pen' },
          { arabic: 'بَاب', transliteration: 'bāb', english: 'a door' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door' },
        ],
      },
      {
        title: 'Sun Letters (الْحُرُوفُ الشَّمْسِيَّة)',
        content: 'When أَلْ comes before certain letters called "sun letters", the ل sound assimilates to that letter and doubles it. Sun letters are: ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ن، ل',
        examples: [
          { arabic: 'الشَّمْس', transliteration: 'ash-shams', english: 'the sun' },
          { arabic: 'النُّور', transliteration: 'an-nūr', english: 'the light' },
          { arabic: 'السَّلَام', transliteration: 'as-salām', english: 'the peace' },
          { arabic: 'الرَّجُل', transliteration: 'ar-rajul', english: 'the man' },
          { arabic: 'الدَّرْس', transliteration: 'ad-dars', english: 'the lesson' },
          { arabic: 'التُّفَّاحَة', transliteration: 'at-tuffāḥa', english: 'the apple' },
          { arabic: 'الطَّعَام', transliteration: 'aṭ-ṭaʿām', english: 'the food' },
          { arabic: 'الزَّهْرَة', transliteration: 'az-zahra', english: 'the flower' },
        ],
      },
      {
        title: 'Moon Letters (الْحُرُوفُ الْقَمَرِيَّة)',
        content: 'With "moon letters", the ل is pronounced normally. Moon letters are: أ، ب، ج، ح، خ، ع، غ، ف، ق، ك، م، ه، و، ي',
        examples: [
          { arabic: 'الْقَمَر', transliteration: 'al-qamar', english: 'the moon' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door' },
          { arabic: 'الْكَلْب', transliteration: 'al-kalb', english: 'the dog' },
          { arabic: 'الْمَاء', transliteration: 'al-māʾ', english: 'the water' },
          { arabic: 'الْوَلَد', transliteration: 'al-walad', english: 'the boy' },
          { arabic: 'الْجَبَل', transliteration: 'al-jabal', english: 'the mountain' },
          { arabic: 'الْحَدِيقَة', transliteration: 'al-ḥadīqa', english: 'the garden' },
          { arabic: 'الْفِيل', transliteration: 'al-fīl', english: 'the elephant' },
        ],
      },
    ],
  },
  'gender': {
    title: 'Gender in Arabic',
    titleArabic: 'الْمُذَكَّرُ وَالْمُؤَنَّث',
    sections: [
      {
        title: 'Two Genders',
        content: 'Arabic has two grammatical genders: masculine (مُذَكَّر) and feminine (مُؤَنَّث). Unlike English, ALL nouns in Arabic have a gender. This affects adjectives, verbs, and pronouns.',
        examples: [
          { arabic: 'وَلَد', transliteration: 'walad', english: 'boy (masculine)' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl (feminine)' },
          { arabic: 'رَجُل', transliteration: 'rajul', english: 'man (masculine)' },
          { arabic: 'اِمْرَأَة', transliteration: 'imraʾa', english: 'woman (feminine)' },
        ],
      },
      {
        title: 'The Taa Marbuta (ة)',
        content: 'Most feminine nouns end in ة (taa marbuta). This letter is pronounced as "a" at the end of sentences, or "at" when the word continues. To make many masculine words feminine, simply add ة.',
        examples: [
          { arabic: 'مُدَرِّس', transliteration: 'mudarris', english: 'teacher (m)' },
          { arabic: 'مُدَرِّسَة', transliteration: 'mudarrisa', english: 'teacher (f)' },
          { arabic: 'طَالِب', transliteration: 'ṭālib', english: 'student (m)' },
          { arabic: 'طَالِبَة', transliteration: 'ṭāliba', english: 'student (f)' },
          { arabic: 'طَبِيب', transliteration: 'ṭabīb', english: 'doctor (m)' },
          { arabic: 'طَبِيبَة', transliteration: 'ṭabība', english: 'doctor (f)' },
          { arabic: 'كَاتِب', transliteration: 'kātib', english: 'writer (m)' },
          { arabic: 'كَاتِبَة', transliteration: 'kātiba', english: 'writer (f)' },
          { arabic: 'صَدِيق', transliteration: 'ṣadīq', english: 'friend (m)' },
          { arabic: 'صَدِيقَة', transliteration: 'ṣadīqa', english: 'friend (f)' },
        ],
      },
      {
        title: 'Naturally Feminine Words',
        content: 'Some words referring to females are feminine even without ة. Body parts that come in pairs are also usually feminine.',
        examples: [
          { arabic: 'أُمّ', transliteration: 'umm', english: 'mother' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl/daughter' },
          { arabic: 'أُخْت', transliteration: 'ukht', english: 'sister' },
          { arabic: 'يَد', transliteration: 'yad', english: 'hand' },
          { arabic: 'عَيْن', transliteration: 'ʿayn', english: 'eye' },
          { arabic: 'أُذُن', transliteration: 'udhun', english: 'ear' },
          { arabic: 'رِجْل', transliteration: 'rijl', english: 'leg/foot' },
          { arabic: 'شَمْس', transliteration: 'shams', english: 'sun' },
          { arabic: 'أَرْض', transliteration: 'arḍ', english: 'earth/land' },
          { arabic: 'نَار', transliteration: 'nār', english: 'fire' },
        ],
      },
    ],
  },
  'personal-pronouns': {
    title: 'Personal Pronouns',
    titleArabic: 'الضَّمَائِر الشَّخْصِيَّة',
    sections: [
      {
        title: 'Subject Pronouns (Singular)',
        content: 'Arabic pronouns distinguish between masculine/feminine. Here are the singular pronouns you\'ll use most often.',
        examples: [
          { arabic: 'أَنَا', transliteration: 'anā', english: 'I' },
          { arabic: 'أَنْتَ', transliteration: 'anta', english: 'you (masculine singular)' },
          { arabic: 'أَنْتِ', transliteration: 'anti', english: 'you (feminine singular)' },
          { arabic: 'هُوَ', transliteration: 'huwa', english: 'he' },
          { arabic: 'هِيَ', transliteration: 'hiya', english: 'she' },
        ],
      },
      {
        title: 'Subject Pronouns (Plural)',
        content: 'Plural pronouns in Arabic. Note that "we" is the same for both genders.',
        examples: [
          { arabic: 'نَحْنُ', transliteration: 'naḥnu', english: 'we' },
          { arabic: 'أَنْتُمْ', transliteration: 'antum', english: 'you (masculine plural)' },
          { arabic: 'أَنْتُنَّ', transliteration: 'antunna', english: 'you (feminine plural)' },
          { arabic: 'هُمْ', transliteration: 'hum', english: 'they (masculine)' },
          { arabic: 'هُنَّ', transliteration: 'hunna', english: 'they (feminine)' },
        ],
      },
      {
        title: 'Using Pronouns in Sentences',
        content: 'In Arabic, you don\'t need "is/am/are" with pronouns. Just pronoun + noun/adjective!',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student (m)' },
          { arabic: 'أَنَا طَالِبَة', transliteration: 'anā ṭāliba', english: 'I am a student (f)' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher' },
          { arabic: 'هِيَ طَبِيبَة', transliteration: 'hiya ṭabība', english: 'She is a doctor' },
          { arabic: 'نَحْنُ طُلَّاب', transliteration: 'naḥnu ṭullāb', english: 'We are students' },
          { arabic: 'هُمْ مِنْ مِصْر', transliteration: 'hum min Miṣr', english: 'They are from Egypt' },
          { arabic: 'أَنْتَ كَبِير', transliteration: 'anta kabīr', english: 'You are big (m)' },
          { arabic: 'أَنْتِ جَمِيلَة', transliteration: 'anti jamīla', english: 'You are beautiful (f)' },
        ],
      },
    ],
  },
  'possessive': {
    title: 'Possessive Pronouns',
    titleArabic: 'ضَمَائِر الْمِلْكِيَّة',
    sections: [
      {
        title: 'How Possession Works in Arabic',
        content: 'Unlike English where possessives come BEFORE nouns ("my book"), Arabic uses SUFFIXES that attach to the END of nouns ("book-my" = كِتَابِي). This is a fundamental difference. These suffixes are called ضَمَائِر الْمِلْكِيَّة (possessive pronouns) or الضَّمَائِر الْمُتَّصِلَة (attached pronouns). When you add a possessive suffix, you remove ال if present.',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book (without suffix)' },
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (with ـِي suffix)' },
          { arabic: 'بَيْتُهُ', transliteration: 'baytuhu', english: 'his house (with ـهُ suffix)' },
          { arabic: 'سَيَّارَتُهَا', transliteration: 'sayyāratuhā', english: 'her car (with ـهَا suffix)' },
        ],
      },
      {
        title: 'Singular Possessive Suffixes',
        content: 'Here are the possessive suffixes for "my", "your" (singular), "his", and "her". Notice that "your" has masculine and feminine forms depending on who you\'re speaking to. The suffix ـِي (my) causes the previous letter to take kasra (ـِ).',
        examples: [
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (ـِي = my)' },
          { arabic: 'كِتَابُكَ', transliteration: 'kitābuka', english: 'your book (m) (ـكَ = your m.)' },
          { arabic: 'كِتَابُكِ', transliteration: 'kitābuki', english: 'your book (f) (ـكِ = your f.)' },
          { arabic: 'كِتَابُهُ', transliteration: 'kitābuhu', english: 'his book (ـهُ = his)' },
          { arabic: 'كِتَابُهَا', transliteration: 'kitābuhā', english: 'her book (ـهَا = her)' },
        ],
      },
      {
        title: 'Plural Possessive Suffixes',
        content: 'Here are the possessive suffixes for "our", "your" (plural), and "their". In formal Arabic, there are separate masculine and feminine forms for plural "your" and "their", but in everyday use, the masculine forms are commonly used for both.',
        examples: [
          { arabic: 'كِتَابُنَا', transliteration: 'kitābunā', english: 'our book (ـنَا = our)' },
          { arabic: 'كِتَابُكُمْ', transliteration: 'kitābukum', english: 'your book (pl.) (ـكُمْ = your pl.)' },
          { arabic: 'كِتَابُهُمْ', transliteration: 'kitābuhum', english: 'their book (ـهُمْ = their)' },
          { arabic: 'بَيْتُنَا', transliteration: 'baytunā', english: 'our house' },
          { arabic: 'سَيَّارَتُكُمْ', transliteration: 'sayyāratukum', english: 'your (pl.) car' },
          { arabic: 'مَدْرَسَتُهُمْ', transliteration: 'madrasatuhum', english: 'their school' },
        ],
      },
      {
        title: 'With Feminine Nouns (Taa Marbuta)',
        content: 'When adding possessive suffixes to feminine nouns ending in ة (taa marbuta), the ة changes to ت (regular taa). This is because ة only appears at the end of words. So سَيَّارَة becomes سَيَّارَتِي (my car).',
        examples: [
          { arabic: 'سَيَّارَتِي', transliteration: 'sayyāratī', english: 'my car (from سَيَّارَة)' },
          { arabic: 'مَدْرَسَتُهُ', transliteration: 'madrasatuhu', english: 'his school (from مَدْرَسَة)' },
          { arabic: 'حَقِيبَتُكَ', transliteration: 'ḥaqībatuka', english: 'your bag (from حَقِيبَة)' },
          { arabic: 'غُرْفَتُنَا', transliteration: 'ghurfatunā', english: 'our room (from غُرْفَة)' },
          { arabic: 'عَائِلَتُهُمْ', transliteration: 'ʿāʾilatuhum', english: 'their family (from عَائِلَة)' },
        ],
      },
      {
        title: 'Family Members with Possessives',
        content: 'Family terms are very commonly used with possessive suffixes. Some words like أَب (father) and أَخ (brother) have special forms. أَب becomes أَبُو with suffixes: أَبُوكَ (your father). أَخ becomes أَخُو: أَخُوهُ (his brother). أُمّ (mother) doubles the م: أُمِّي (my mother).',
        examples: [
          { arabic: 'أُمِّي', transliteration: 'ummī', english: 'my mother' },
          { arabic: 'أَبُوكَ', transliteration: 'abūka', english: 'your father' },
          { arabic: 'أَبِي', transliteration: 'abī', english: 'my father' },
          { arabic: 'أَخُوهُ', transliteration: 'akhūhu', english: 'his brother' },
          { arabic: 'أُخْتِي', transliteration: 'ukhtī', english: 'my sister' },
          { arabic: 'جَدِّي', transliteration: 'jaddī', english: 'my grandfather' },
          { arabic: 'جَدَّتُهَا', transliteration: 'jaddatuhā', english: 'her grandmother' },
          { arabic: 'عَمِّي', transliteration: 'ʿammī', english: 'my uncle (paternal)' },
          { arabic: 'خَالَتُكَ', transliteration: 'khālatuka', english: 'your aunt (maternal)' },
          { arabic: 'اِبْنُهُمْ', transliteration: 'ibnuhum', english: 'their son' },
        ],
      },
      {
        title: 'Common Nouns with Possessives',
        content: 'Practice with everyday nouns. These combinations appear constantly in Arabic conversation.',
        examples: [
          { arabic: 'اِسْمِي', transliteration: 'ismī', english: 'my name' },
          { arabic: 'اِسْمُكَ', transliteration: 'ismuka', english: 'your name (m)' },
          { arabic: 'بَيْتِي', transliteration: 'baytī', english: 'my house' },
          { arabic: 'عَمَلُهُ', transliteration: 'ʿamaluhu', english: 'his work/job' },
          { arabic: 'هَاتِفِي', transliteration: 'hātifī', english: 'my phone' },
          { arabic: 'صَدِيقَتُهَا', transliteration: 'ṣadīqatuhā', english: 'her friend (f)' },
          { arabic: 'رَأْيِي', transliteration: 'raʾyī', english: 'my opinion' },
          { arabic: 'بِلَادُنَا', transliteration: 'bilādunā', english: 'our country' },
        ],
      },
      {
        title: 'Possessives in Full Sentences',
        content: 'Now let\'s see how possessive pronouns work in complete sentences. This is how you\'ll use them in real conversation.',
        examples: [
          { arabic: 'مَا اسْمُكَ؟ اِسْمِي أَحْمَد', transliteration: 'mā ismuka? ismī Aḥmad', english: 'What\'s your name? My name is Ahmad' },
          { arabic: 'أَيْنَ بَيْتُكُمْ؟', transliteration: 'ayna baytukum?', english: 'Where is your (pl.) house?' },
          { arabic: 'سَيَّارَتِي جَدِيدَة', transliteration: 'sayyāratī jadīda', english: 'My car is new' },
          { arabic: 'أُمِّي طَبِيبَة وَأَبِي مُهَنْدِس', transliteration: 'ummī ṭabība wa-abī muhandis', english: 'My mother is a doctor and my father is an engineer' },
          { arabic: 'هَلْ هَذَا كِتَابُكَ؟', transliteration: 'hal hādhā kitābuka?', english: 'Is this your book?' },
          { arabic: 'أَحَبُّ عَائِلَتِي كَثِيراً', transliteration: 'uḥibbu ʿāʾilatī kathīran', english: 'I love my family very much' },
        ],
      },
    ],
  },
  'adjectives': {
    title: 'Adjectives',
    titleArabic: 'الصِّفَات',
    sections: [
      {
        title: 'Introduction to Arabic Adjectives',
        content: 'Adjectives in Arabic (الصِّفَات or النُّعُوت) describe nouns. Unlike English where adjectives come BEFORE the noun ("big house"), Arabic adjectives come AFTER the noun they describe. This is one of the most important differences between Arabic and English word order. The adjective is called صِفَة (ṣifa) and the noun it describes is called مَوْصُوف (mawṣūf).',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (lit: house big)' },
          { arabic: 'كِتَاب جَدِيد', transliteration: 'kitāb jadīd', english: 'a new book (lit: book new)' },
          { arabic: 'سَيَّارَة سَرِيعَة', transliteration: 'sayyāra sarīʿa', english: 'a fast car (lit: car fast)' },
        ],
      },
      {
        title: 'Rule 1: Gender Agreement',
        content: 'Adjectives MUST match the gender of the noun. If the noun is masculine, use the masculine adjective. If the noun is feminine, add ة (taa marbuta) to make the adjective feminine. This is not optional - it is a fundamental rule of Arabic grammar.',
        examples: [
          { arabic: 'وَلَد طَوِيل', transliteration: 'walad ṭawīl', english: 'a tall boy (masculine noun with masculine adjective)' },
          { arabic: 'بِنْت طَوِيلَة', transliteration: 'bint ṭawīla', english: 'a tall girl (feminine noun with feminine adjective)' },
          { arabic: 'كِتَاب جَمِيل', transliteration: 'kitāb jamīl', english: 'a beautiful book (m)' },
          { arabic: 'حَدِيقَة جَمِيلَة', transliteration: 'ḥadīqa jamīla', english: 'a beautiful garden (f)' },
          { arabic: 'مُعَلِّم ذَكِيّ', transliteration: 'muʿallim dhakī', english: 'a smart teacher (m)' },
          { arabic: 'مُعَلِّمَة ذَكِيَّة', transliteration: 'muʿallima dhakiyya', english: 'a smart teacher (f)' },
        ],
      },
      {
        title: 'Rule 2: Definiteness Agreement',
        content: 'Adjectives must also match the definiteness of the noun. If the noun has ال (the), the adjective must ALSO have ال. If the noun is indefinite (no ال), the adjective must also be indefinite. This creates a phrase meaning "the [adjective] [noun]".',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (both indefinite)' },
          { arabic: 'الْبَيْت الْكَبِير', transliteration: 'al-bayt al-kabīr', english: 'the big house (both definite)' },
          { arabic: 'سَيَّارَة جَدِيدَة', transliteration: 'sayyāra jadīda', english: 'a new car (both indefinite)' },
          { arabic: 'السَّيَّارَة الْجَدِيدَة', transliteration: 'as-sayyāra al-jadīda', english: 'the new car (both definite)' },
        ],
      },
      {
        title: 'Attributive vs. Predicative Adjectives',
        content: 'When an adjective DESCRIBES a noun (attributive), it follows the noun and agrees in definiteness. When an adjective IS the predicate of a sentence (predicative), it does NOT take ال even if the subject has ال. This distinction helps identify sentence structure.',
        examples: [
          { arabic: 'الْبَيْت الْكَبِير', transliteration: 'al-bayt al-kabīr', english: 'the big house (attributive - describes which house)' },
          { arabic: 'الْبَيْت كَبِير', transliteration: 'al-bayt kabīr', english: 'The house is big (predicative - complete sentence)' },
          { arabic: 'الطَّالِبَة الذَّكِيَّة', transliteration: 'aṭ-ṭāliba adh-dhakiyya', english: 'the smart student (attributive)' },
          { arabic: 'الطَّالِبَة ذَكِيَّة', transliteration: 'aṭ-ṭāliba dhakiyya', english: 'The student is smart (predicative)' },
        ],
      },
      {
        title: 'Common Adjectives (Size & Dimension)',
        content: 'Here are essential adjectives for describing size and dimensions. The masculine form is listed first, then the feminine form with ة.',
        examples: [
          { arabic: 'كَبِير / كَبِيرَة', transliteration: 'kabīr / kabīra', english: 'big, large' },
          { arabic: 'صَغِير / صَغِيرَة', transliteration: 'ṣaghīr / ṣaghīra', english: 'small, little' },
          { arabic: 'طَوِيل / طَوِيلَة', transliteration: 'ṭawīl / ṭawīla', english: 'tall, long' },
          { arabic: 'قَصِير / قَصِيرَة', transliteration: 'qaṣīr / qaṣīra', english: 'short' },
          { arabic: 'وَاسِع / وَاسِعَة', transliteration: 'wāsiʿ / wāsiʿa', english: 'wide, spacious' },
          { arabic: 'ضَيِّق / ضَيِّقَة', transliteration: 'ḍayyiq / ḍayyiqa', english: 'narrow, tight' },
          { arabic: 'ثَقِيل / ثَقِيلَة', transliteration: 'thaqīl / thaqīla', english: 'heavy' },
          { arabic: 'خَفِيف / خَفِيفَة', transliteration: 'khafīf / khafīfa', english: 'light (weight)' },
        ],
      },
      {
        title: 'Common Adjectives (Quality & State)',
        content: 'Adjectives for describing quality, condition, and characteristics of things and people.',
        examples: [
          { arabic: 'جَدِيد / جَدِيدَة', transliteration: 'jadīd / jadīda', english: 'new' },
          { arabic: 'قَدِيم / قَدِيمَة', transliteration: 'qadīm / qadīma', english: 'old (things)' },
          { arabic: 'جَمِيل / جَمِيلَة', transliteration: 'jamīl / jamīla', english: 'beautiful' },
          { arabic: 'نَظِيف / نَظِيفَة', transliteration: 'naẓīf / naẓīfa', english: 'clean' },
          { arabic: 'وَسِخ / وَسِخَة', transliteration: 'wasikh / wasikha', english: 'dirty' },
          { arabic: 'سَهْل / سَهْلَة', transliteration: 'sahl / sahla', english: 'easy' },
          { arabic: 'صَعْب / صَعْبَة', transliteration: 'ṣaʿb / ṣaʿba', english: 'difficult' },
          { arabic: 'مُمْتَاز / مُمْتَازَة', transliteration: 'mumtāz / mumtāza', english: 'excellent' },
        ],
      },
      {
        title: 'Common Adjectives (Feelings & Personality)',
        content: 'Adjectives for describing emotions, feelings, and personality traits.',
        examples: [
          { arabic: 'سَعِيد / سَعِيدَة', transliteration: 'saʿīd / saʿīda', english: 'happy' },
          { arabic: 'حَزِين / حَزِينَة', transliteration: 'ḥazīn / ḥazīna', english: 'sad' },
          { arabic: 'تَعْبَان / تَعْبَانَة', transliteration: 'taʿbān / taʿbāna', english: 'tired' },
          { arabic: 'مَشْغُول / مَشْغُولَة', transliteration: 'mashghūl / mashghūla', english: 'busy' },
          { arabic: 'ذَكِيّ / ذَكِيَّة', transliteration: 'dhakī / dhakiyya', english: 'smart, intelligent' },
          { arabic: 'لَطِيف / لَطِيفَة', transliteration: 'laṭīf / laṭīfa', english: 'kind, nice' },
          { arabic: 'قَوِيّ / قَوِيَّة', transliteration: 'qawī / qawiyya', english: 'strong' },
          { arabic: 'ضَعِيف / ضَعِيفَة', transliteration: 'ḍaʿīf / ḍaʿīfa', english: 'weak' },
        ],
      },
      {
        title: 'Common Adjectives (Temperature & Speed)',
        content: 'Adjectives for describing temperature, speed, and other physical qualities.',
        examples: [
          { arabic: 'حَارّ / حَارَّة', transliteration: 'ḥārr / ḥārra', english: 'hot' },
          { arabic: 'بَارِد / بَارِدَة', transliteration: 'bārid / bārida', english: 'cold' },
          { arabic: 'دَافِئ / دَافِئَة', transliteration: 'dāfiʾ / dāfiʾa', english: 'warm' },
          { arabic: 'سَرِيع / سَرِيعَة', transliteration: 'sarīʿ / sarīʿa', english: 'fast, quick' },
          { arabic: 'بَطِيء / بَطِيئَة', transliteration: 'baṭīʾ / baṭīʾa', english: 'slow' },
          { arabic: 'لَذِيذ / لَذِيذَة', transliteration: 'ladhīdh / ladhīdha', english: 'delicious' },
          { arabic: 'قَرِيب / قَرِيبَة', transliteration: 'qarīb / qarība', english: 'near, close' },
          { arabic: 'بَعِيد / بَعِيدَة', transliteration: 'baʿīd / baʿīda', english: 'far, distant' },
        ],
      },
      {
        title: 'Adjectives in Full Sentences',
        content: 'Now let\'s see how adjectives work in complete Arabic sentences. Pay attention to agreement rules.',
        examples: [
          { arabic: 'الطَّقْس جَمِيل الْيَوْم', transliteration: 'aṭ-ṭaqs jamīl al-yawm', english: 'The weather is beautiful today' },
          { arabic: 'هَذِهِ الْقَهْوَة سَاخِنَة جِدًّا', transliteration: 'hādhihi al-qahwa sākhina jiddan', english: 'This coffee is very hot' },
          { arabic: 'أَخِي طَالِب ذَكِيّ', transliteration: 'akhī ṭālib dhakī', english: 'My brother is a smart student' },
          { arabic: 'الْمَدِينَة الْكَبِيرَة جَمِيلَة', transliteration: 'al-madīna al-kabīra jamīla', english: 'The big city is beautiful' },
          { arabic: 'الدَّرْس الْيَوْم سَهْل', transliteration: 'ad-dars al-yawm sahl', english: 'Today\'s lesson is easy' },
          { arabic: 'هُوَ رَجُل طَوِيل وَقَوِيّ', transliteration: 'huwa rajul ṭawīl wa-qawī', english: 'He is a tall and strong man' },
        ],
      },
    ],
  },
  'prepositions': {
    title: 'Prepositions',
    titleArabic: 'حُرُوف الْجَرّ',
    sections: [
      {
        title: 'What are Prepositions?',
        content: 'Prepositions (حُرُوف الْجَرّ - ḥurūf al-jarr) are small words that show the relationship between nouns. They answer questions like "where?", "when?", "how?", and "with whom?". In Arabic, prepositions cause the following noun to take the genitive case (كَسْرَة), though this is often not visible in unvoweled text. Mastering prepositions is essential for building sentences.',
        examples: [
          { arabic: 'الْكِتَاب عَلَى الطَّاوِلَة', transliteration: 'al-kitāb ʿalā aṭ-ṭāwila', english: 'The book is on the table' },
          { arabic: 'أَنَا مِنْ مِصْر', transliteration: 'anā min Miṣr', english: 'I am from Egypt' },
        ],
      },
      {
        title: 'Essential Prepositions: فِي، عَلَى، مِنْ، إِلَى',
        content: 'These four prepositions are the most common in Arabic. فِي (fī) means "in" or "at" for locations. عَلَى (ʿalā) means "on" or "upon". مِنْ (min) means "from" and indicates origin or source. إِلَى (ilā) means "to" and indicates direction or destination.',
        examples: [
          { arabic: 'أَنَا فِي الْبَيْت', transliteration: 'anā fī al-bayt', english: 'I am in the house' },
          { arabic: 'الْقَلَم عَلَى الْمَكْتَب', transliteration: 'al-qalam ʿalā al-maktab', english: 'The pen is on the desk' },
          { arabic: 'هُوَ مِنْ لُبْنَان', transliteration: 'huwa min Lubnān', english: 'He is from Lebanon' },
          { arabic: 'ذَهَبْتُ إِلَى السُّوق', transliteration: 'dhahabtu ilā as-sūq', english: 'I went to the market' },
          { arabic: 'الطَّالِب فِي الْفَصْل', transliteration: 'aṭ-ṭālib fī al-faṣl', english: 'The student is in the classroom' },
          { arabic: 'الصُّورَة عَلَى الْحَائِط', transliteration: 'aṣ-ṣūra ʿalā al-ḥāʾiṭ', english: 'The picture is on the wall' },
        ],
      },
      {
        title: 'Prepositions of Accompaniment: مَعَ، بِـ، لِـ',
        content: 'مَعَ (maʿa) means "with" (accompaniment). بِـ (bi-) is a prefix meaning "with/by" (instrument or means) - it attaches directly to the next word. لِـ (li-) is a prefix meaning "for/to" (purpose or possession) - it also attaches to the next word. When لِـ comes before ال, it becomes لِلْـ (lil-).',
        examples: [
          { arabic: 'أَدْرُسُ مَعَ صَدِيقِي', transliteration: 'adrusu maʿa ṣadīqī', english: 'I study with my friend' },
          { arabic: 'ذَهَبْتُ مَعَ أَخِي', transliteration: 'dhahabtu maʿa akhī', english: 'I went with my brother' },
          { arabic: 'كَتَبْتُ بِالْقَلَم', transliteration: 'katabtu bil-qalam', english: 'I wrote with the pen' },
          { arabic: 'سَافَرْتُ بِالطَّائِرَة', transliteration: 'sāfartu biṭ-ṭāʾira', english: 'I traveled by plane' },
          { arabic: 'هَذَا لَكَ', transliteration: 'hādhā laka', english: 'This is for you' },
          { arabic: 'الْكِتَاب لِلطَّالِب', transliteration: 'al-kitāb liṭ-ṭālib', english: 'The book is for the student' },
        ],
      },
      {
        title: 'The Special Preposition: عِنْدَ',
        content: 'عِنْدَ (ʿinda) is a versatile preposition meaning "at", "with", or "in the possession of". It is commonly used to express possession in Arabic (instead of "have"). When you say عِنْدِي (ʿindī), it literally means "at me" but translates as "I have". This is one of the most important structures in Arabic.',
        examples: [
          { arabic: 'عِنْدِي كِتَاب', transliteration: 'ʿindī kitāb', english: 'I have a book (lit: at-me book)' },
          { arabic: 'عِنْدَكَ سَيَّارَة؟', transliteration: 'ʿindaka sayyāra?', english: 'Do you have a car?' },
          { arabic: 'عِنْدَهُ مَال كَثِير', transliteration: 'ʿindahu māl kathīr', english: 'He has a lot of money' },
          { arabic: 'عِنْدَهَا ثَلَاثَة أَوْلَاد', transliteration: 'ʿindahā thalāthat awlād', english: 'She has three children' },
          { arabic: 'عِنْدَنَا اِجْتِمَاع', transliteration: 'ʿindanā ijtimāʿ', english: 'We have a meeting' },
          { arabic: 'مَا عِنْدِي وَقْت', transliteration: 'mā ʿindī waqt', english: 'I don\'t have time' },
        ],
      },
      {
        title: 'Location Prepositions',
        content: 'These prepositions describe specific positions and locations. They are essential for giving directions and describing where things are. تَحْتَ (under), فَوْقَ (above), أَمَامَ (in front of), وَرَاءَ/خَلْفَ (behind), بَيْنَ (between), بِجَانِب (next to).',
        examples: [
          { arabic: 'الْقِطَّة تَحْتَ الطَّاوِلَة', transliteration: 'al-qiṭṭa taḥta aṭ-ṭāwila', english: 'The cat is under the table' },
          { arabic: 'الْمِصْبَاح فَوْقَ الْمَكْتَب', transliteration: 'al-miṣbāḥ fawqa al-maktab', english: 'The lamp is above the desk' },
          { arabic: 'السَّيَّارَة أَمَامَ الْبَيْت', transliteration: 'as-sayyāra amāma al-bayt', english: 'The car is in front of the house' },
          { arabic: 'الْحَدِيقَة وَرَاءَ الْمَدْرَسَة', transliteration: 'al-ḥadīqa warāʾa al-madrasa', english: 'The garden is behind the school' },
          { arabic: 'الْبَنْك بَيْنَ الْمَطْعَم وَالصَّيْدَلِيَّة', transliteration: 'al-bank bayna al-maṭʿam waṣ-ṣaydaliyya', english: 'The bank is between the restaurant and the pharmacy' },
          { arabic: 'أَجْلِسُ بِجَانِب النَّافِذَة', transliteration: 'ajlisu bi-jānib an-nāfidha', english: 'I sit next to the window' },
        ],
      },
      {
        title: 'Prepositions with Pronouns',
        content: 'Prepositions can take pronoun suffixes. This is very common and important in Arabic. The pronoun attaches directly to the preposition. For example: مِنْ + ـهُ = مِنْهُ (from him), لِـ + ـي = لِي (for me).',
        examples: [
          { arabic: 'مِنِّي', transliteration: 'minnī', english: 'from me' },
          { arabic: 'مِنْكَ', transliteration: 'minka', english: 'from you (m)' },
          { arabic: 'مِنْهُ', transliteration: 'minhu', english: 'from him' },
          { arabic: 'مِنْهَا', transliteration: 'minhā', english: 'from her' },
          { arabic: 'إِلَيْهِ', transliteration: 'ilayhi', english: 'to him' },
          { arabic: 'لَهَا', transliteration: 'lahā', english: 'for her / she has' },
          { arabic: 'مَعَهُمْ', transliteration: 'maʿahum', english: 'with them' },
          { arabic: 'عَلَيْنَا', transliteration: 'ʿalaynā', english: 'on us / we must' },
        ],
      },
      {
        title: 'Common Expressions with Prepositions',
        content: 'Many everyday expressions use prepositions. These fixed phrases are very useful to memorize.',
        examples: [
          { arabic: 'مِنْ فَضْلِكَ', transliteration: 'min faḍlika', english: 'please (from your grace)' },
          { arabic: 'عَلَى الرَّحْب وَالسَّعَة', transliteration: 'ʿalā ar-raḥb was-saʿa', english: 'you\'re welcome' },
          { arabic: 'بِخَيْر', transliteration: 'bi-khayr', english: 'fine/well (with goodness)' },
          { arabic: 'فِي أَمَان الله', transliteration: 'fī amān Allāh', english: 'goodbye (in God\'s protection)' },
          { arabic: 'إِلَى اللِّقَاء', transliteration: 'ilā al-liqāʾ', english: 'see you later (to the meeting)' },
          { arabic: 'عَنْ إِذْنِكَ', transliteration: 'ʿan idhnika', english: 'excuse me (about your permission)' },
        ],
      },
    ],
  },
  'nominal-sentence': {
    title: 'Nominal Sentences',
    titleArabic: 'الْجُمْلَة الاِسْمِيَّة',
    sections: [
      {
        title: 'What is a Nominal Sentence?',
        content: 'Arabic has two types of sentences: nominal (الجُمْلَة الاِسْمِيَّة) and verbal (الجُمْلَة الفِعْلِيَّة). A nominal sentence starts with a NOUN or PRONOUN, not a verb. The most important rule: Arabic does NOT use "is/am/are" in the present tense! You simply put the subject and predicate together. This is radically different from English.',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student (lit: I student)' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher (lit: He teacher)' },
          { arabic: 'الْجَوّ حَارّ', transliteration: 'al-jaww ḥārr', english: 'The weather is hot (lit: The-weather hot)' },
        ],
      },
      {
        title: 'The Two Parts: Subject and Predicate',
        content: 'Every nominal sentence has exactly two parts: 1) الْمُبْتَدَأ (al-mubtadaʾ) - the SUBJECT: what/who we\'re talking about. It\'s usually definite (has ال or is a proper noun/pronoun). 2) الْخَبَر (al-khabar) - the PREDICATE: what we\'re saying about the subject. It\'s usually indefinite. Together they form a complete sentence.',
        examples: [
          { arabic: 'الْبَيْتُ كَبِيرٌ', transliteration: 'al-baytu kabīrun', english: 'The house is big (Subject: الْبَيْت + Predicate: كَبِير)' },
          { arabic: 'الطَّالِبَةُ ذَكِيَّةٌ', transliteration: 'aṭ-ṭālibatu dhakiyyatun', english: 'The student (f) is smart' },
          { arabic: 'مُحَمَّدٌ مُهَنْدِسٌ', transliteration: 'Muḥammadun muhandisun', english: 'Muhammad is an engineer' },
          { arabic: 'الْقِصَّةُ مُمْتِعَةٌ', transliteration: 'al-qiṣṣatu mumtiʿatun', english: 'The story is interesting' },
        ],
      },
      {
        title: 'Pronoun as Subject',
        content: 'When a pronoun is the subject, it\'s always the first element. Pronouns are inherently definite (we know who "I", "you", "he" refers to). The predicate that follows can be a noun, adjective, or prepositional phrase.',
        examples: [
          { arabic: 'أَنَا سَعِيد', transliteration: 'anā saʿīd', english: 'I am happy' },
          { arabic: 'أَنْتَ طَبِيب', transliteration: 'anta ṭabīb', english: 'You are a doctor' },
          { arabic: 'هِيَ مِنْ مِصْر', transliteration: 'hiya min Miṣr', english: 'She is from Egypt' },
          { arabic: 'نَحْنُ طُلَّاب', transliteration: 'naḥnu ṭullāb', english: 'We are students' },
          { arabic: 'هُمْ أَصْدِقَائِي', transliteration: 'hum aṣdiqāʾī', english: 'They are my friends' },
          { arabic: 'أَنْتُمْ مَرْحَبَا بِكُمْ', transliteration: 'antum marḥaban bikum', english: 'You (pl.) are welcome' },
        ],
      },
      {
        title: 'Predicate Types',
        content: 'The predicate (الخَبَر) can be different things: 1) An adjective describing the subject 2) A noun telling what the subject is 3) A prepositional phrase showing location/relationship 4) A possessive phrase. All are valid predicates.',
        examples: [
          { arabic: 'الْكِتَابُ مُفِيدٌ', transliteration: 'al-kitābu mufīdun', english: 'The book is useful (adjective predicate)' },
          { arabic: 'أَخِي طَبِيبٌ', transliteration: 'akhī ṭabībun', english: 'My brother is a doctor (noun predicate)' },
          { arabic: 'الْمِفْتَاحُ فِي الْجَيْب', transliteration: 'al-miftāḥu fī al-jayb', english: 'The key is in the pocket (prepositional predicate)' },
          { arabic: 'هَذَا بَيْتُ أَبِي', transliteration: 'hādhā baytu abī', english: 'This is my father\'s house (possessive predicate)' },
        ],
      },
      {
        title: 'Questions in Nominal Sentences',
        content: 'To ask yes/no questions, add هَلْ at the beginning. For information questions, use question words like مَا (what), مَنْ (who), أَيْنَ (where), كَيْفَ (how). The sentence structure remains the same.',
        examples: [
          { arabic: 'هَلْ أَنْتَ طَالِب؟', transliteration: 'hal anta ṭālib?', english: 'Are you a student?' },
          { arabic: 'هَلِ الدَّرْسُ صَعْب؟', transliteration: 'hal ad-darsu ṣaʿb?', english: 'Is the lesson difficult?' },
          { arabic: 'مَا اسْمُكَ؟', transliteration: 'mā ismuka?', english: 'What is your name?' },
          { arabic: 'مَنْ هَذَا؟', transliteration: 'man hādhā?', english: 'Who is this?' },
          { arabic: 'أَيْنَ الْمَطْعَم؟', transliteration: 'ayna al-maṭʿam?', english: 'Where is the restaurant?' },
          { arabic: 'كَيْفَ حَالُكَ؟', transliteration: 'kayfa ḥāluka?', english: 'How are you?' },
        ],
      },
      {
        title: 'Negation in Nominal Sentences',
        content: 'To negate a nominal sentence (say something "is not"), use لَيْسَ (laysa) before the predicate. لَيْسَ conjugates for the subject: لَسْتُ (I\'m not), لَسْتَ (you\'re not m.), لَيْسَ (he\'s not), لَيْسَتْ (she\'s not), etc. The predicate takes accusative case (فَتْحَة).',
        examples: [
          { arabic: 'لَسْتُ طَالِباً', transliteration: 'lastu ṭāliban', english: 'I am not a student' },
          { arabic: 'لَيْسَ الْجَوُّ حَارّاً', transliteration: 'laysa al-jawwu ḥārran', english: 'The weather is not hot' },
          { arabic: 'لَيْسَتْ هِيَ مِنْ هُنَا', transliteration: 'laysat hiya min hunā', english: 'She is not from here' },
          { arabic: 'لَسْنَا مَشْغُولِين', transliteration: 'lasnā mashghūlīn', english: 'We are not busy' },
          { arabic: 'الْمُشْكِلَة لَيْسَتْ كَبِيرَة', transliteration: 'al-mushkila laysat kabīra', english: 'The problem is not big' },
        ],
      },
    ],
  },
  'verbal-sentence': {
    title: 'Verbal Sentences',
    titleArabic: 'الْجُمْلَة الْفِعْلِيَّة',
    sections: [
      {
        title: 'What is a Verbal Sentence?',
        content: 'A verbal sentence (الجُمْلَة الفِعْلِيَّة) starts with a VERB. This is the second main sentence type in Arabic. The typical word order is VSO: Verb + Subject + Object. This is very different from English (SVO: Subject + Verb + Object). In Arabic, the action (verb) comes first, emphasizing what happened.',
        examples: [
          { arabic: 'ذَهَبَ الْوَلَد', transliteration: 'dhahaba al-walad', english: 'The boy went (V + S)' },
          { arabic: 'جَاءَتِ الْمُعَلِّمَة', transliteration: 'jāʾat al-muʿallima', english: 'The teacher (f) came' },
          { arabic: 'نَامَ الطِّفْل', transliteration: 'nāma aṭ-ṭifl', english: 'The child slept' },
        ],
      },
      {
        title: 'Verb Agreement Rule',
        content: 'Important rule: When the verb comes BEFORE the subject, the verb is always SINGULAR, even if the subject is plural or dual! This is a unique feature of Arabic verbal sentences. However, the verb still agrees in gender with the subject.',
        examples: [
          { arabic: 'ذَهَبَ الطُّلَّاب', transliteration: 'dhahaba aṭ-ṭullāb', english: 'The students went (singular verb, plural subject)' },
          { arabic: 'جَاءَتِ الْبَنَات', transliteration: 'jāʾat al-banāt', english: 'The girls came (f. singular verb, f. plural subject)' },
          { arabic: 'سَافَرَ الرِّجَال', transliteration: 'sāfara ar-rijāl', english: 'The men traveled' },
          { arabic: 'وَصَلَتِ السَّيَّارَات', transliteration: 'waṣalat as-sayyārāt', english: 'The cars arrived' },
        ],
      },
      {
        title: 'With Direct Objects',
        content: 'When a verb takes a direct object (the thing receiving the action), the order is: Verb + Subject + Object. The object is called الْمَفْعُول بِهِ (al-mafʿūl bihi). It takes the accusative case (فَتْحَة).',
        examples: [
          { arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ', transliteration: 'kataba aṭ-ṭālibu ad-darsa', english: 'The student wrote the lesson' },
          { arabic: 'أَكَلَتِ الْبِنْتُ التُّفَّاحَةَ', transliteration: 'akalat al-bintu at-tuffāḥata', english: 'The girl ate the apple' },
          { arabic: 'قَرَأَ الْمُعَلِّمُ الْكِتَابَ', transliteration: 'qaraʾa al-muʿallimu al-kitāba', english: 'The teacher read the book' },
          { arabic: 'شَرِبَ الرَّجُلُ الْقَهْوَةَ', transliteration: 'shariba ar-rajulu al-qahwata', english: 'The man drank the coffee' },
          { arabic: 'فَتَحَتِ الْأُمُّ الْبَابَ', transliteration: 'fataḥat al-ummu al-bāba', english: 'The mother opened the door' },
        ],
      },
      {
        title: 'Common Past Tense Verbs',
        content: 'Here are some common verbs in the past tense (الْمَاضِي). Arabic verbs are listed in the "he" form as the base form. To make feminine, add ـَتْ. Learning these basic verbs will help you build sentences.',
        examples: [
          { arabic: 'ذَهَبَ / ذَهَبَتْ', transliteration: 'dhahaba / dhahabat', english: 'he went / she went' },
          { arabic: 'جَاءَ / جَاءَتْ', transliteration: 'jāʾa / jāʾat', english: 'he came / she came' },
          { arabic: 'أَكَلَ / أَكَلَتْ', transliteration: 'akala / akalat', english: 'he ate / she ate' },
          { arabic: 'شَرِبَ / شَرِبَتْ', transliteration: 'shariba / sharibat', english: 'he drank / she drank' },
          { arabic: 'كَتَبَ / كَتَبَتْ', transliteration: 'kataba / katabat', english: 'he wrote / she wrote' },
          { arabic: 'قَرَأَ / قَرَأَتْ', transliteration: 'qaraʾa / qaraʾat', english: 'he read / she read' },
          { arabic: 'فَهِمَ / فَهِمَتْ', transliteration: 'fahima / fahimat', english: 'he understood / she understood' },
          { arabic: 'سَمِعَ / سَمِعَتْ', transliteration: 'samiʿa / samiʿat', english: 'he heard / she heard' },
        ],
      },
      {
        title: 'Verbal vs Nominal: When to Use Each',
        content: 'Use a VERBAL sentence when: 1) Describing an action or event 2) Narrating what happened 3) The focus is on the action. Use a NOMINAL sentence when: 1) Describing a state or condition 2) Identifying something/someone 3) The focus is on the subject.',
        examples: [
          { arabic: 'الطَّالِبُ ذَكِيٌّ', transliteration: 'aṭ-ṭālibu dhakiyyun', english: 'The student is smart (nominal - describing state)' },
          { arabic: 'نَجَحَ الطَّالِبُ', transliteration: 'najaḥa aṭ-ṭālibu', english: 'The student succeeded (verbal - describing action)' },
          { arabic: 'الْبَابُ مَفْتُوحٌ', transliteration: 'al-bābu maftūḥun', english: 'The door is open (nominal - state)' },
          { arabic: 'فَتَحَ الرَّجُلُ الْبَابَ', transliteration: 'fataḥa ar-rajulu al-bāba', english: 'The man opened the door (verbal - action)' },
        ],
      },
      {
        title: 'Complete Sentence Examples',
        content: 'Here are more complete verbal sentences showing different structures and vocabulary.',
        examples: [
          { arabic: 'سَافَرَ أَبِي إِلَى دُبَيّ', transliteration: 'sāfara abī ilā Dubayy', english: 'My father traveled to Dubai' },
          { arabic: 'طَبَخَتِ الْأُمُّ طَعَاماً لَذِيذاً', transliteration: 'ṭabakhat al-ummu ṭaʿāman ladhīdhan', english: 'The mother cooked delicious food' },
          { arabic: 'اِشْتَرَى أَخِي سَيَّارَةً جَدِيدَةً', transliteration: 'ishtarā akhī sayyāratan jadīdatan', english: 'My brother bought a new car' },
          { arabic: 'زَارَتْ صَدِيقَتِي الْمَتْحَفَ', transliteration: 'zārat ṣadīqatī al-matḥafa', english: 'My friend (f) visited the museum' },
          { arabic: 'دَرَسَ الطُّلَّابُ كُلَّ اللَّيْل', transliteration: 'darasa aṭ-ṭullābu kulla al-layl', english: 'The students studied all night' },
        ],
      },
    ],
  },
  'numbers': {
    title: 'Numbers & Counting',
    titleArabic: 'الأَعْدَاد',
    sections: [
      {
        title: 'Introduction to Arabic Numbers',
        content: 'Arabic numbers (الأَعْدَاد) have complex grammatical rules, but don\'t worry - we\'ll break them down step by step. Arabic uses two number systems: 1) Arabic-Indic numerals (١٢٣) used in the Middle East, and 2) Arabic numerals (123) which the West adopted from Arabic! We\'ll focus on the written words for numbers.',
        examples: [
          { arabic: '٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩', transliteration: '0 1 2 3 4 5 6 7 8 9', english: 'Arabic-Indic numerals' },
          { arabic: 'صِفْر', transliteration: 'ṣifr', english: 'zero (origin of "cipher")' },
        ],
      },
      {
        title: 'Numbers 1-10',
        content: 'The cardinal numbers from one to ten. These are the foundation of Arabic counting. Notice that 1 and 2 have masculine and feminine forms. Numbers 3-10 have a surprising rule we\'ll cover in the next section.',
        examples: [
          { arabic: 'وَاحِد / وَاحِدَة', transliteration: 'wāḥid / wāḥida', english: '1 - one (m/f)' },
          { arabic: 'اِثْنَان / اِثْنَتَان', transliteration: 'ithnān / ithnatān', english: '2 - two (m/f)' },
          { arabic: 'ثَلَاثَة', transliteration: 'thalātha', english: '3 - three' },
          { arabic: 'أَرْبَعَة', transliteration: 'arbaʿa', english: '4 - four' },
          { arabic: 'خَمْسَة', transliteration: 'khamsa', english: '5 - five' },
          { arabic: 'سِتَّة', transliteration: 'sitta', english: '6 - six' },
          { arabic: 'سَبْعَة', transliteration: 'sabʿa', english: '7 - seven' },
          { arabic: 'ثَمَانِيَة', transliteration: 'thamāniya', english: '8 - eight' },
          { arabic: 'تِسْعَة', transliteration: 'tisʿa', english: '9 - nine' },
          { arabic: 'عَشَرَة', transliteration: 'ʿashara', english: '10 - ten' },
        ],
      },
      {
        title: 'The Reverse Gender Rule (3-10)',
        content: 'Here\'s one of the most surprising rules in Arabic: For numbers 3-10, the number takes the OPPOSITE gender of the noun it counts! If you\'re counting masculine nouns, use the feminine number form (with ة). If counting feminine nouns, use the masculine form (without ة). This seems backwards but is a firm rule.',
        examples: [
          { arabic: 'ثَلَاثَةُ رِجَال', transliteration: 'thalāthatu rijāl', english: '3 men - masculine noun uses feminine number (with ة)' },
          { arabic: 'ثَلَاثُ نِسَاء', transliteration: 'thalāthu nisāʾ', english: '3 women - feminine noun uses masculine number (no ة)' },
          { arabic: 'خَمْسَةُ كُتُب', transliteration: 'khamsatu kutub', english: '5 books - masculine noun uses feminine number' },
          { arabic: 'خَمْسُ سَيَّارَات', transliteration: 'khamsu sayyārāt', english: '5 cars - feminine noun uses masculine number' },
          { arabic: 'سَبْعَةُ أَيَّام', transliteration: 'sabʿatu ayyām', english: '7 days' },
          { arabic: 'عَشْرُ سَاعَات', transliteration: 'ʿashru sāʿāt', english: '10 hours' },
        ],
      },
      {
        title: 'Numbers 11-19',
        content: 'Numbers 11-19 are compound numbers. They consist of two parts joined together. The first part (units) agrees in gender with the counted noun, while the second part (عَشَر) takes the same gender as the counted noun. The counted noun is singular and accusative.',
        examples: [
          { arabic: 'أَحَدَ عَشَرَ كِتَاباً', transliteration: 'aḥada ʿashara kitāban', english: '11 books' },
          { arabic: 'اِثْنَا عَشَرَ طَالِباً', transliteration: 'ithnā ʿashara ṭāliban', english: '12 students (m)' },
          { arabic: 'اِثْنَتَا عَشْرَةَ طَالِبَةً', transliteration: 'ithnatā ʿashrata ṭālibatan', english: '12 students (f)' },
          { arabic: 'ثَلَاثَةَ عَشَرَ يَوْماً', transliteration: 'thalāthata ʿashara yawman', english: '13 days' },
          { arabic: 'خَمْسَةَ عَشَرَ دَقِيقَةً', transliteration: 'khamsata ʿashara daqīqatan', english: '15 minutes' },
          { arabic: 'تِسْعَةَ عَشَرَ شَخْصاً', transliteration: 'tisʿata ʿashara shakhṣan', english: '19 people' },
        ],
      },
      {
        title: 'Tens (20, 30, 40...)',
        content: 'The tens from 20 to 90 are easy - they\'re the same for masculine and feminine nouns. They end in ـُون (nominative) or ـِين (other cases). The counted noun is singular and accusative.',
        examples: [
          { arabic: 'عِشْرُون', transliteration: 'ʿishrūn', english: '20 - twenty' },
          { arabic: 'ثَلَاثُون', transliteration: 'thalāthūn', english: '30 - thirty' },
          { arabic: 'أَرْبَعُون', transliteration: 'arbaʿūn', english: '40 - forty' },
          { arabic: 'خَمْسُون', transliteration: 'khamsūn', english: '50 - fifty' },
          { arabic: 'سِتُّون', transliteration: 'sittūn', english: '60 - sixty' },
          { arabic: 'سَبْعُون', transliteration: 'sabʿūn', english: '70 - seventy' },
          { arabic: 'ثَمَانُون', transliteration: 'thamānūn', english: '80 - eighty' },
          { arabic: 'تِسْعُون', transliteration: 'tisʿūn', english: '90 - ninety' },
        ],
      },
      {
        title: 'Practical Counting',
        content: 'Here are practical examples of counting in everyday situations. Don\'t worry about mastering all the rules at once - practice with common phrases first.',
        examples: [
          { arabic: 'عِنْدِي ثَلَاثَةُ إِخْوَة', transliteration: 'ʿindī thalāthatu ikhwa', english: 'I have 3 brothers' },
          { arabic: 'فِي الْأُسْبُوعِ سَبْعَةُ أَيَّام', transliteration: 'fī al-usbūʿi sabʿatu ayyām', english: 'There are 7 days in a week' },
          { arabic: 'الدَّرْسُ عِشْرُون دَقِيقَةً', transliteration: 'ad-darsu ʿishrūn daqīqatan', english: 'The lesson is 20 minutes' },
          { arabic: 'اِشْتَرَيْتُ خَمْسَةَ كُتُب', transliteration: 'ishtaraytu khamsata kutub', english: 'I bought 5 books' },
          { arabic: 'عُمْرِي خَمْسٌ وَعِشْرُون سَنَةً', transliteration: 'ʿumrī khamsun wa-ʿishrūn sanatan', english: 'I am 25 years old' },
        ],
      },
    ],
  },
  'dual-plural': {
    title: 'Dual & Plural Forms',
    titleArabic: 'الْمُثَنَّى وَالْجَمْع',
    sections: [
      {
        title: 'Arabic Number Categories',
        content: 'Unlike English which only has singular and plural, Arabic has THREE number categories: 1) Singular (الْمُفْرَد) - one thing, 2) Dual (الْمُثَنَّى) - exactly two things, and 3) Plural (الْجَمْع) - three or more things. The dual form is unique to Arabic and a few other Semitic languages. It\'s used constantly in everyday speech.',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'one book (singular)' },
          { arabic: 'كِتَابَان', transliteration: 'kitābān', english: 'two books (dual)' },
          { arabic: 'كُتُب', transliteration: 'kutub', english: 'books/three+ books (plural)' },
        ],
      },
      {
        title: 'Forming the Dual',
        content: 'To make the dual form, add ـَانِ (-ān) to the singular noun in the nominative case, or ـَيْنِ (-ayn) in accusative/genitive cases. For feminine nouns ending in ة (taa marbuta), the ة changes to ت before the dual ending. The dual is always predictable - no memorization needed!',
        examples: [
          { arabic: 'طَالِبَانِ', transliteration: 'ṭālibāni', english: 'two students (m) - from طَالِب' },
          { arabic: 'طَالِبَتَانِ', transliteration: 'ṭālibatāni', english: 'two students (f) - from طَالِبَة' },
          { arabic: 'بَيْتَانِ', transliteration: 'baytāni', english: 'two houses - from بَيْت' },
          { arabic: 'يَوْمَانِ', transliteration: 'yawmāni', english: 'two days - from يَوْم' },
          { arabic: 'سَاعَتَانِ', transliteration: 'sāʿatāni', english: 'two hours - from سَاعَة' },
          { arabic: 'سَنَتَانِ', transliteration: 'sanatāni', english: 'two years - from سَنَة' },
        ],
      },
      {
        title: 'Sound Masculine Plural',
        content: 'The "sound" plural (جَمْع سَالِم) keeps the original word intact and adds an ending. For masculine nouns referring to male humans, add ـُونَ (-ūn) in nominative, or ـِينَ (-īn) in accusative/genitive. This plural is ONLY for words describing male people (not things!).',
        examples: [
          { arabic: 'مُعَلِّمُونَ', transliteration: 'muʿallimūna', english: 'teachers (m) - from مُعَلِّم' },
          { arabic: 'مُهَنْدِسُونَ', transliteration: 'muhandisūna', english: 'engineers (m) - from مُهَنْدِس' },
          { arabic: 'مُسْلِمُونَ', transliteration: 'muslimūna', english: 'Muslims (m) - from مُسْلِم' },
          { arabic: 'عَامِلُونَ', transliteration: 'ʿāmilūna', english: 'workers (m) - from عَامِل' },
          { arabic: 'مُوَظَّفُونَ', transliteration: 'muwaẓẓafūna', english: 'employees (m) - from مُوَظَّف' },
        ],
      },
      {
        title: 'Sound Feminine Plural',
        content: 'For feminine nouns (and some masculine nouns referring to non-humans), add ـَات (-āt). The ة is dropped before adding ـَات. This plural is very common and predictable. It\'s used for: 1) Most feminine nouns, 2) Many loanwords, 3) Some masculine non-human nouns.',
        examples: [
          { arabic: 'مُعَلِّمَات', transliteration: 'muʿallimāt', english: 'teachers (f) - from مُعَلِّمَة' },
          { arabic: 'طَالِبَات', transliteration: 'ṭālibāt', english: 'students (f) - from طَالِبَة' },
          { arabic: 'سَيَّارَات', transliteration: 'sayyārāt', english: 'cars - from سَيَّارَة' },
          { arabic: 'طَائِرَات', transliteration: 'ṭāʾirāt', english: 'airplanes - from طَائِرَة' },
          { arabic: 'جَامِعَات', transliteration: 'jāmiʿāt', english: 'universities - from جَامِعَة' },
          { arabic: 'كَلِمَات', transliteration: 'kalimāt', english: 'words - from كَلِمَة' },
          { arabic: 'اِجْتِمَاعَات', transliteration: 'ijtimāʿāt', english: 'meetings - from اِجْتِمَاع' },
        ],
      },
      {
        title: 'Broken Plurals',
        content: 'The "broken" plural (جَمْع تَكْسِير) changes the internal vowel pattern of the word - the word is "broken apart" and reformed. Most Arabic nouns for things use broken plurals. There are many patterns, and they must be memorized with each new noun. This is challenging but essential!',
        examples: [
          { arabic: 'كُتُب', transliteration: 'kutub', english: 'books - from كِتَاب' },
          { arabic: 'بُيُوت', transliteration: 'buyūt', english: 'houses - from بَيْت' },
          { arabic: 'أَقْلَام', transliteration: 'aqlām', english: 'pens - from قَلَم' },
          { arabic: 'رِجَال', transliteration: 'rijāl', english: 'men - from رَجُل' },
          { arabic: 'أَوْلَاد', transliteration: 'awlād', english: 'children - from وَلَد' },
          { arabic: 'مُدُن', transliteration: 'mudun', english: 'cities - from مَدِينَة' },
          { arabic: 'شَوَارِع', transliteration: 'shawāriʿ', english: 'streets - from شَارِع' },
          { arabic: 'مَسَاجِد', transliteration: 'masājid', english: 'mosques - from مَسْجِد' },
        ],
      },
      {
        title: 'Common Broken Plural Patterns',
        content: 'While there are many broken plural patterns, some are very common. Learning these patterns helps you guess plurals and recognize them when reading. Pattern فُعُول is common for فَعْل nouns. Pattern أَفْعَال is common for فَعْل nouns. Pattern فُعَّال is common for فَاعِل nouns.',
        examples: [
          { arabic: 'بُحُور', transliteration: 'buḥūr', english: 'seas - فُعُول pattern (from بَحْر)' },
          { arabic: 'أَنْهَار', transliteration: 'anhār', english: 'rivers - أَفْعَال pattern (from نَهْر)' },
          { arabic: 'أَيَّام', transliteration: 'ayyām', english: 'days - أَفْعَال pattern (from يَوْم)' },
          { arabic: 'طُلَّاب', transliteration: 'ṭullāb', english: 'students - فُعَّال pattern (from طَالِب)' },
          { arabic: 'كُتَّاب', transliteration: 'kuttāb', english: 'writers - فُعَّال pattern (from كَاتِب)' },
          { arabic: 'أَصْدِقَاء', transliteration: 'aṣdiqāʾ', english: 'friends - أَفْعِلَاء pattern (from صَدِيق)' },
        ],
      },
      {
        title: 'Using Dual and Plural in Sentences',
        content: 'Here\'s how dual and plural forms appear in real sentences. Notice how verbs and adjectives agree with the number of the noun.',
        examples: [
          { arabic: 'عِنْدِي كِتَابَانِ جَدِيدَانِ', transliteration: 'ʿindī kitābāni jadīdāni', english: 'I have two new books' },
          { arabic: 'الطَّالِبَاتُ ذَكِيَّاتٌ', transliteration: 'aṭ-ṭālibātu dhakiyyātun', english: 'The female students are smart' },
          { arabic: 'قَرَأْتُ كُتُباً كَثِيرَةً', transliteration: 'qaraʾtu kutuban kathīratan', english: 'I read many books' },
          { arabic: 'زَارَنِي صَدِيقَانِ', transliteration: 'zāranī ṣadīqāni', english: 'Two friends visited me' },
          { arabic: 'الْمُعَلِّمُونَ فِي الْمَدْرَسَة', transliteration: 'al-muʿallimūna fī al-madrasa', english: 'The teachers are in the school' },
        ],
      },
    ],
  },
};

// Map for lesson IDs to grammar IDs (for exercises)
// Map old lesson IDs to grammar IDs (for backwards compatibility)
const lessonToGrammarMap: Record<string, string> = {
  'definite-article': 'grammar-3',
  'personal-pronouns': 'grammar-4',
  'gender': 'grammar-5',
  'nominal-sentence': 'grammar-6',
  'possessive': 'grammar-9',
  'prepositions': 'grammar-10',
  'adjectives': 'grammar-11',
  'numbers': 'grammar-12',
};

// Helper function to get grammar ID from lesson ID
const getGrammarId = (lessonId: string): string => {
  // If it's already a grammar ID (e.g., 'grammar-13'), use it directly
  if (lessonId.startsWith('grammar-')) {
    return lessonId;
  }
  // Otherwise, try the mapping
  return lessonToGrammarMap[lessonId] || lessonId;
};

export default function GrammarLessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { startLesson, completeLesson, addXp, updateStreak } = useProgressStore();
  const { speak } = useArabicSpeech();
  const [showExercises, setShowExercises] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isWritingCorrect, setIsWritingCorrect] = useState(false);
  const [practiceType, setPracticeType] = useState<'regular' | 'writing' | null>(null);
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);

  // Try to get lesson from data file first (for grammar-X IDs)
  const dataLesson = getLessonById(lessonId || '');
  // Fall back to hardcoded content for old IDs
  const hardcodedLesson = lessonContent[lessonId || ''];

  // Use data lesson if available, converting its content structure
  const lesson = dataLesson ? {
    title: dataLesson.title,
    titleArabic: dataLesson.titleArabic,
    sections: dataLesson.content.reduce((acc: any[], item: GrammarContent, index: number) => {
      if (item.type === 'text' || item.type === 'rule' || item.type === 'note') {
        acc.push({
          title: item.type === 'rule' ? '📌 Rule' : item.type === 'note' ? '💡 Tip' : '',
          content: item.content,
          examples: [],
        });
      } else if (item.type === 'example') {
        // Add example to the last section or create a new one
        const lastSection = acc[acc.length - 1];
        if (lastSection && lastSection.examples) {
          lastSection.examples.push({
            arabic: item.arabic || '',
            transliteration: item.transliteration || '',
            english: item.translation || '',
          });
        } else {
          acc.push({
            title: item.content || 'Examples',
            content: '',
            examples: [{
              arabic: item.arabic || '',
              transliteration: item.transliteration || '',
              english: item.translation || '',
            }],
          });
        }
      } else if (item.type === 'table' && item.tableData) {
        // Convert table to section with examples
        const examples = item.tableData.rows.map(row => ({
          arabic: row[0] || '',
          transliteration: row[1] || '',
          english: row[row.length - 1] || '',
        }));
        acc.push({
          title: item.content || 'Reference',
          content: `Columns: ${item.tableData.headers.join(' | ')}`,
          examples,
        });
      }
      return acc;
    }, []),
  } : hardcodedLesson;

  const grammarId = getGrammarId(lessonId || '');
  const allExercises = grammarId ? getExercisesForGrammarLesson(grammarId) : [];

  // Separate exercises by type
  const regularExercises = allExercises.filter(ex => ex.type !== 'writing');
  const writingExercises = allExercises.filter(ex => ex.type === 'writing');

  useEffect(() => {
    if (lessonId) {
      startLesson(lessonId);
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.comingSoon}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.comingSoonContent}>
            <Ionicons name="construct" size={64} color="#D4AF37" />
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              This lesson is currently being developed. Check back soon!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleComplete = () => {
    if (lessonId) {
      completeLesson(lessonId);
      addXp(50);
      updateStreak();
      router.back();
    }
  };

  const handleStartPractice = (type: 'regular' | 'writing') => {
    const exerciseList = type === 'writing' ? writingExercises : regularExercises;
    if (exerciseList.length === 0) return;

    setPracticeType(type);
    setActiveExercises(exerciseList);
    setShowExercises(true);
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setWrittenAnswer('');
    setShowResult(false);
    setCorrectAnswers(0);
    setIsWritingCorrect(false);
  };

  const handleSelectAnswer = (answer: string, isCorrect: boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleCheckWrittenAnswer = (exercise: Exercise) => {
    const userAnswer = writtenAnswer.trim();
    const correctAnswersList = Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer
      : [exercise.correctAnswer];

    // Check if user's answer matches any correct answer (case-insensitive, trim spaces)
    const isCorrect = correctAnswersList.some(
      (correct) => correct.trim().toLowerCase() === userAnswer.toLowerCase() ||
                   correct.trim() === userAnswer
    );

    setIsWritingCorrect(isCorrect);
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < activeExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setWrittenAnswer('');
      setShowResult(false);
      setIsWritingCorrect(false);
    } else {
      const xpEarned = correctAnswers * 10;
      addXp(xpEarned);
      setShowExercises(false);
    }
  };

  // Exercise view
  if (showExercises) {
    if (activeExercises.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => setShowExercises(false)}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </Pressable>
            <View style={styles.headerText}>
              <Text style={styles.title}>Practice</Text>
            </View>
          </View>
          <View style={styles.noExercises}>
            <Ionicons name="document-text-outline" size={48} color="#64748b" />
            <Text style={styles.noExercisesText}>
              No practice exercises available yet for this lesson.
            </Text>
            <Pressable style={styles.backToLessonBtn} onPress={() => setShowExercises(false)}>
              <Text style={styles.backToLessonText}>Back to Lesson</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    const currentExercise = activeExercises[currentExerciseIndex];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => setShowExercises(false)}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>
              {practiceType === 'writing' ? 'Writing Practice' : 'Quiz Practice'}
            </Text>
            <Text style={styles.titleArabic}>{lesson.titleArabic}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.exerciseScroll}>
          {/* Progress */}
          <View style={styles.exerciseProgress}>
            <Text style={styles.exerciseProgressText}>
              {practiceType === 'writing' ? 'Exercise' : 'Question'} {currentExerciseIndex + 1} of {activeExercises.length}
            </Text>
            <View style={styles.exerciseProgressBar}>
              <View
                style={[
                  styles.exerciseProgressFill,
                  { width: `${((currentExerciseIndex + 1) / activeExercises.length) * 100}%` }
                ]}
              />
            </View>
          </View>

          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentExercise.question}</Text>
            {currentExercise.questionArabic && (
              <Pressable
                style={styles.questionArabicRow}
                onPress={() => currentExercise.questionArabic && speak(currentExercise.questionArabic)}
              >
                <Text style={styles.questionArabic}>{currentExercise.questionArabic}</Text>
                <Ionicons name="volume-medium" size={20} color="#D4AF37" />
              </Pressable>
            )}
          </View>

          {/* Options for Multiple Choice */}
          {currentExercise.type === 'multiple_choice' && currentExercise.options && (
            <View style={styles.optionsContainer}>
              {currentExercise.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const showCorrect = showResult && option.isCorrect;
                const showWrong = showResult && isSelected && !option.isCorrect;

                return (
                  <Pressable
                    key={option.id}
                    style={[
                      styles.optionBtn,
                      isSelected && !showResult && styles.optionBtnSelected,
                      showCorrect && styles.optionBtnCorrect,
                      showWrong && styles.optionBtnWrong,
                    ]}
                    onPress={() => !showResult && handleSelectAnswer(option.id, option.isCorrect)}
                    disabled={showResult}
                  >
                    <Text style={[
                      styles.optionText,
                      showCorrect && styles.optionTextCorrect,
                      showWrong && styles.optionTextWrong,
                    ]}>
                      {option.textArabic || option.text}
                    </Text>
                    {showCorrect && (
                      <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                    )}
                    {showWrong && (
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Fill in the Blank - show as multiple choice if options exist, otherwise as text input */}
          {currentExercise.type === 'fill_blank' && currentExercise.options && (
            <View style={styles.optionsContainer}>
              {currentExercise.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const showCorrect = showResult && option.isCorrect;
                const showWrong = showResult && isSelected && !option.isCorrect;

                return (
                  <Pressable
                    key={option.id}
                    style={[
                      styles.optionBtn,
                      isSelected && !showResult && styles.optionBtnSelected,
                      showCorrect && styles.optionBtnCorrect,
                      showWrong && styles.optionBtnWrong,
                    ]}
                    onPress={() => !showResult && handleSelectAnswer(option.id, option.isCorrect)}
                    disabled={showResult}
                  >
                    <Text style={[
                      styles.optionText,
                      showCorrect && styles.optionTextCorrect,
                      showWrong && styles.optionTextWrong,
                    ]}>
                      {option.textArabic || option.text}
                    </Text>
                    {showCorrect && (
                      <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                    )}
                    {showWrong && (
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Fill in the Blank without options - Arabic keyboard input */}
          {currentExercise.type === 'fill_blank' && !currentExercise.options && (
            <View style={styles.writingContainer}>
              {currentExercise.hint && !showResult && (
                <View style={styles.hintBox}>
                  <Ionicons name="bulb-outline" size={16} color="#D4AF37" />
                  <Text style={styles.hintText}>{currentExercise.hint}</Text>
                </View>
              )}

              <View
                style={[
                  styles.writingInput,
                  showResult && isWritingCorrect && styles.writingInputCorrect,
                  showResult && !isWritingCorrect && styles.writingInputWrong,
                ]}
              >
                <Text style={styles.writingInputText}>
                  {writtenAnswer || <Text style={styles.writingPlaceholder}>اكتب إجابتك هنا...</Text>}
                </Text>
              </View>

              {showResult && (
                <View style={[
                  styles.writingResult,
                  isWritingCorrect ? styles.writingResultCorrect : styles.writingResultWrong,
                ]}>
                  <Ionicons
                    name={isWritingCorrect ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={isWritingCorrect ? "#22c55e" : "#ef4444"}
                  />
                  <View style={styles.writingResultContent}>
                    <Text style={[
                      styles.writingResultLabel,
                      isWritingCorrect ? styles.writingResultLabelCorrect : styles.writingResultLabelWrong,
                    ]}>
                      {isWritingCorrect ? "Correct!" : "Not quite right"}
                    </Text>
                    {!isWritingCorrect && (
                      <Text style={styles.correctAnswerText}>
                        Correct: {Array.isArray(currentExercise.correctAnswer)
                          ? currentExercise.correctAnswer[0]
                          : currentExercise.correctAnswer}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Writing Exercise - Separate type */}
          {currentExercise.type === 'writing' && (
            <View style={styles.writingContainer}>
              {currentExercise.hint && !showResult && (
                <View style={styles.hintBox}>
                  <Ionicons name="bulb-outline" size={16} color="#D4AF37" />
                  <Text style={styles.hintText}>{currentExercise.hint}</Text>
                </View>
              )}

              <View
                style={[
                  styles.writingInput,
                  showResult && isWritingCorrect && styles.writingInputCorrect,
                  showResult && !isWritingCorrect && styles.writingInputWrong,
                ]}
              >
                <Text style={styles.writingInputText}>
                  {writtenAnswer || <Text style={styles.writingPlaceholder}>اكتب إجابتك هنا...</Text>}
                </Text>
              </View>

              {showResult && (
                <View style={[
                  styles.writingResult,
                  isWritingCorrect ? styles.writingResultCorrect : styles.writingResultWrong,
                ]}>
                  <Ionicons
                    name={isWritingCorrect ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={isWritingCorrect ? "#22c55e" : "#ef4444"}
                  />
                  <View style={styles.writingResultContent}>
                    <Text style={[
                      styles.writingResultLabel,
                      isWritingCorrect ? styles.writingResultLabelCorrect : styles.writingResultLabelWrong,
                    ]}>
                      {isWritingCorrect ? "Correct!" : "Not quite right"}
                    </Text>
                    {!isWritingCorrect && (
                      <Text style={styles.correctAnswerText}>
                        Correct answer: {Array.isArray(currentExercise.correctAnswer)
                          ? currentExercise.correctAnswer[0]
                          : currentExercise.correctAnswer}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Explanation */}
          {showResult && currentExercise.explanation && (
            <View style={styles.explanationBox}>
              <Ionicons name="bulb" size={20} color="#D4AF37" />
              <Text style={styles.explanationText}>{currentExercise.explanation}</Text>
            </View>
          )}

          {/* Next Button */}
          {showResult && (
            <Pressable style={styles.nextBtn} onPress={handleNextExercise}>
              <Text style={styles.nextBtnText}>
                {currentExerciseIndex < activeExercises.length - 1 ? 'Next Question' : 'Finish Practice'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </Pressable>
          )}
        </ScrollView>

        {/* Arabic Keyboard for writing exercises */}
        {!showResult && ((currentExercise.type === 'fill_blank' && !currentExercise.options) || currentExercise.type === 'writing') && (
          <ArabicKeyboard
            onKeyPress={(key) => setWrittenAnswer(prev => prev + key)}
            onBackspace={() => setWrittenAnswer(prev => prev.slice(0, -1))}
            onSpace={() => setWrittenAnswer(prev => prev + ' ')}
            onSubmit={() => handleCheckWrittenAnswer(currentExercise)}
          />
        )}
      </SafeAreaView>
    );
  }

  // Main lesson view
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.titleArabic}>{lesson.titleArabic}</Text>
          </View>
        </View>

        {/* Lesson Content */}
        {lesson.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>

            {section.examples && (
              <View style={styles.examplesBox}>
                {section.examples.map((example, exIndex) => (
                  <View key={exIndex} style={[
                    styles.exampleRow,
                    exIndex === section.examples!.length - 1 && styles.exampleRowLast
                  ]}>
                    <View style={styles.exampleLeft}>
                      <Text style={styles.exampleArabic}>{example.arabic}</Text>
                      <Text style={styles.exampleTranslit}>{example.transliteration}</Text>
                    </View>
                    <Text style={styles.exampleEnglish}>{example.english}</Text>
                    <Pressable
                      style={styles.audioBtn}
                      onPress={() => speak(example.arabic)}
                    >
                      <Ionicons name="volume-medium" size={18} color="#D4AF37" />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Practice Section */}
        {allExercises.length > 0 && (
          <View style={styles.practiceSection}>
            <View style={styles.practiceSectionHeader}>
              <Ionicons name="fitness" size={24} color="#22c55e" />
              <Text style={styles.practiceSectionTitle}>Practice Exercises</Text>
            </View>
            <Text style={styles.practiceSectionDesc}>
              Test your understanding with practice questions
            </Text>

            {/* Regular Practice Button */}
            {regularExercises.length > 0 && (
              <Pressable style={styles.practiceButton} onPress={() => handleStartPractice('regular')}>
                <Ionicons name="play" size={20} color="#ffffff" />
                <Text style={styles.practiceButtonText}>
                  Quiz Practice ({regularExercises.length} questions)
                </Text>
              </Pressable>
            )}

            {/* Writing Practice Button */}
            {writingExercises.length > 0 && (
              <Pressable style={styles.writingPracticeButton} onPress={() => handleStartPractice('writing')}>
                <Ionicons name="create" size={20} color="#ffffff" />
                <Text style={styles.practiceButtonText}>
                  Writing Practice ({writingExercises.length} exercises)
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Complete Button */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable style={styles.completeButton} onPress={handleComplete}>
            <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
            <Text style={styles.completeButtonText}>Mark as Complete (+50 XP)</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 24,
    marginBottom: 16,
  },
  examplesBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  exampleRowLast: {
    borderBottomWidth: 0,
  },
  exampleLeft: {
    flex: 1,
  },
  exampleArabic: {
    fontSize: 22,
    color: '#ffffff',
  },
  exampleTranslit: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 2,
  },
  exampleEnglish: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 12,
    flex: 1,
    textAlign: 'right',
  },
  audioBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceSection: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  practiceSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  practiceSectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  practiceSectionDesc: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  practiceButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  writingPracticeButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: '#6366f1',
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
  // Exercise Styles
  exerciseScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  exerciseProgress: {
    marginBottom: 24,
  },
  exerciseProgressText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
  exerciseProgressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  exerciseProgressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  questionArabicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  questionArabic: {
    color: '#D4AF37',
    fontSize: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionBtn: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionBtnSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#6366f120',
  },
  optionBtnCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#22c55e20',
  },
  optionBtnWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#ef444420',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
  optionTextCorrect: {
    color: '#22c55e',
  },
  optionTextWrong: {
    color: '#ef4444',
  },
  explanationBox: {
    backgroundColor: '#D4AF3720',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  explanationText: {
    color: '#e2e8f0',
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
  },
  nextBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  noExercises: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noExercisesText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  backToLessonBtn: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backToLessonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Writing Exercise Styles
  writingContainer: {
    marginBottom: 20,
  },
  hintBox: {
    backgroundColor: '#D4AF3715',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hintText: {
    color: '#D4AF37',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  writingInput: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#334155',
    minHeight: 60,
    justifyContent: 'center',
  },
  writingInputText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'right',
  },
  writingPlaceholder: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'right',
  },
  writingInputCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#22c55e10',
  },
  writingInputWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#ef444410',
  },
  checkAnswerBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  checkAnswerBtnDisabled: {
    backgroundColor: '#334155',
    opacity: 0.6,
  },
  checkAnswerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  writingResult: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  writingResultCorrect: {
    backgroundColor: '#22c55e20',
  },
  writingResultWrong: {
    backgroundColor: '#ef444420',
  },
  writingResultContent: {
    marginLeft: 12,
    flex: 1,
  },
  writingResultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  writingResultLabelCorrect: {
    color: '#22c55e',
  },
  writingResultLabelWrong: {
    color: '#ef4444',
  },
  correctAnswerText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
});
