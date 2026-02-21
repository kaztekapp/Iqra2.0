// Arabic Vocabulary API - Fetches translations from MyMemory API
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';
const CACHE_KEY = 'arabic-vocabulary-cache';
const CACHE_VERSION = 11; // Increment to invalidate old cache - v11 fixes TTS problematic words
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export interface ArabicVocabularyWord {
  id: string;
  english: string;
  arabic: string; // With vowels (tashkeel)
  arabicWithoutVowels: string; // Without vowels for display variation
  transliteration: string;
  fetchedAt: number;
}

interface CachedVocabulary {
  words: ArabicVocabularyWord[];
  lastUsedIndex: number;
  fetchedAt: number;
  version?: number;
}

// Play Arabic word audio using Text-to-Speech
export async function playArabicAudio(arabicText: string): Promise<void> {
  try {
    // Stop any currently playing speech
    await Speech.stop();

    // Get available voices to find the best Arabic voice
    const voices = await Speech.getAvailableVoicesAsync();
    const arabicVoice = voices.find(
      (v) => v.language.startsWith('ar') && v.quality === 'Enhanced'
    ) || voices.find(
      (v) => v.language.startsWith('ar')
    );

    // Speak the Arabic text
    await Speech.speak(arabicText, {
      language: 'ar-SA', // Saudi Arabic - better for classical Arabic pronunciation
      pitch: 1.0,
      rate: 0.75, // Slower for clearer pronunciation of vowels
      voice: arabicVoice?.identifier,
    });
  } catch (error) {
    __DEV__ && console.error('Error playing Arabic audio:', error);
    // Fallback without voice selection
    try {
      await Speech.speak(arabicText, {
        language: 'ar',
        rate: 0.75,
      });
    } catch (e) {
      __DEV__ && console.error('Fallback speech also failed:', e);
    }
  }
}

// Check if speech is currently playing
export async function isSpeaking(): Promise<boolean> {
  return Speech.isSpeakingAsync();
}

// Stop any playing speech
export async function stopAudio(): Promise<void> {
  await Speech.stop();
}

// Vocalized Arabic vocabulary with tashkeel (vowel marks)
// Using standard tanween forms for grammatically correct Arabic
const VOCALIZED_VOCABULARY: { english: string; arabic: string; transliteration: string }[] = [
  // Greetings & Basics
  { english: 'hello', arabic: 'مَرْحَبًا', transliteration: 'marhaban' },
  { english: 'goodbye', arabic: 'وَدَاعًا', transliteration: 'wadaa\'an' },
  { english: 'please', arabic: 'مِنْ فَضْلِكَ', transliteration: 'min fadlika' },
  { english: 'thanks', arabic: 'شُكْرًا', transliteration: 'shukran' },
  { english: 'yes', arabic: 'نَعَمْ', transliteration: 'na\'am' },
  { english: 'no', arabic: 'لَا', transliteration: 'laa' },
  { english: 'welcome', arabic: 'أَهْلًا وَسَهْلًا', transliteration: 'ahlan wa sahlan' },
  { english: 'sorry', arabic: 'آسِفٌ', transliteration: 'aasifun' },
  { english: 'peace', arabic: 'سَلَامٌ', transliteration: 'salaamun' },

  // Family
  { english: 'mother', arabic: 'أُمٌّ', transliteration: 'ummun' },
  { english: 'father', arabic: 'أَبٌ', transliteration: 'abun' },
  { english: 'sister', arabic: 'أُخْتٌ', transliteration: 'ukhtun' },
  { english: 'brother', arabic: 'أَخٌ', transliteration: 'akhun' },
  { english: 'son', arabic: 'اِبْنٌ', transliteration: 'ibnun' },
  { english: 'daughter', arabic: 'بِنْتٌ', transliteration: 'bintun' },
  { english: 'family', arabic: 'عَائِلَةٌ', transliteration: 'aa\'ilatun' },
  { english: 'baby', arabic: 'طِفْلٌ', transliteration: 'tiflun' },
  { english: 'husband', arabic: 'زَوْجٌ', transliteration: 'zawjun' },
  { english: 'wife', arabic: 'زَوْجَةٌ', transliteration: 'zawjatun' },

  // Numbers
  { english: 'one', arabic: 'وَاحِدٌ', transliteration: 'waahidun' },
  { english: 'two', arabic: 'اِثْنَانِ', transliteration: 'ithnaani' },
  { english: 'three', arabic: 'ثَلَاثَةٌ', transliteration: 'thalaathatun' },
  { english: 'four', arabic: 'أَرْبَعَةٌ', transliteration: 'arba\'atun' },
  { english: 'five', arabic: 'خَمْسَةٌ', transliteration: 'khamsatun' },
  { english: 'six', arabic: 'سِتَّةٌ', transliteration: 'sittatun' },
  { english: 'seven', arabic: 'سَبْعَةٌ', transliteration: 'sab\'atun' },
  { english: 'eight', arabic: 'ثَمَانِيَةٌ', transliteration: 'thamaaniyatun' },
  { english: 'nine', arabic: 'تِسْعَةٌ', transliteration: 'tis\'atun' },
  { english: 'ten', arabic: 'عَشَرَةٌ', transliteration: '\'asharatun' },

  // Colors
  { english: 'red', arabic: 'أَحْمَرُ', transliteration: 'ahmaru' },
  { english: 'blue', arabic: 'أَزْرَقُ', transliteration: 'azraqu' },
  { english: 'green', arabic: 'أَخْضَرُ', transliteration: 'akhdaru' },
  { english: 'yellow', arabic: 'أَصْفَرُ', transliteration: 'asfaru' },
  { english: 'white', arabic: 'أَبْيَضُ', transliteration: 'abyadu' },
  { english: 'black', arabic: 'أَسْوَدُ', transliteration: 'aswadu' },

  // Food & Drink
  { english: 'water', arabic: 'مَاءٌ', transliteration: 'maa\'un' },
  { english: 'bread', arabic: 'خُبْزٌ', transliteration: 'khubzun' },
  { english: 'rice', arabic: 'أَرُزٌّ', transliteration: 'aruzzun' },
  { english: 'meat', arabic: 'لَحْمٌ', transliteration: 'lahmun' },
  { english: 'fish', arabic: 'سَمَكٌ', transliteration: 'samakun' },
  { english: 'milk', arabic: 'حَلِيبٌ', transliteration: 'haleebun' },
  { english: 'fruit', arabic: 'فَاكِهَةٌ', transliteration: 'faakihatun' },
  { english: 'apple', arabic: 'تُفَّاحَةٌ', transliteration: 'tuffaahatun' },
  { english: 'food', arabic: 'طَعَامٌ', transliteration: 'ta\'aamun' },
  { english: 'coffee', arabic: 'قَهْوَةٌ', transliteration: 'qahwatun' },
  { english: 'tea', arabic: 'شَايٌ', transliteration: 'shaayun' },

  // Body
  { english: 'head', arabic: 'رَأْسٌ', transliteration: 'ra\'sun' },
  { english: 'eye', arabic: 'عَيْنٌ', transliteration: '\'aynun' },
  { english: 'nose', arabic: 'أَنْفٌ', transliteration: 'anfun' },
  { english: 'mouth', arabic: 'فَمٌ', transliteration: 'famun' },
  { english: 'hand', arabic: 'يَدٌ', transliteration: 'yadun' },
  { english: 'heart', arabic: 'قَلْبٌ', transliteration: 'qalbun' },
  { english: 'ear', arabic: 'أُذُنٌ', transliteration: 'udhunun' },
  { english: 'face', arabic: 'وَجْهٌ', transliteration: 'wajhun' },

  // Nature
  { english: 'sun', arabic: 'شَمْسٌ', transliteration: 'shamsun' },
  { english: 'moon', arabic: 'قَمَرٌ', transliteration: 'qamarun' },
  { english: 'star', arabic: 'نَجْمٌ', transliteration: 'najmun' },
  { english: 'sky', arabic: 'سَمَاءٌ', transliteration: 'samaa\'un' },
  { english: 'tree', arabic: 'شَجَرَةٌ', transliteration: 'shajaratun' },
  { english: 'flower', arabic: 'زَهْرَةٌ', transliteration: 'zahratun' },
  { english: 'rain', arabic: 'مَطَرٌ', transliteration: 'matarun' },
  { english: 'sea', arabic: 'بَحْرٌ', transliteration: 'bahrun' },
  { english: 'mountain', arabic: 'جَبَلٌ', transliteration: 'jabalun' },
  { english: 'river', arabic: 'نَهْرٌ', transliteration: 'nahrun' },

  // Animals
  { english: 'cat', arabic: 'قِطَّةٌ', transliteration: 'qittatun' },
  { english: 'dog', arabic: 'كَلْبٌ', transliteration: 'kalbun' },
  { english: 'bird', arabic: 'طَائِرٌ', transliteration: 'taa\'irun' },
  { english: 'horse', arabic: 'حِصَانٌ', transliteration: 'hisaanun' },
  { english: 'lion', arabic: 'أَسَدٌ', transliteration: 'asadun' },
  { english: 'elephant', arabic: 'فِيلٌ', transliteration: 'feelun' },
  { english: 'camel', arabic: 'جَمَلٌ', transliteration: 'jamalun' },

  // Places
  { english: 'house', arabic: 'بَيْتٌ', transliteration: 'baytun' },
  { english: 'school', arabic: 'مَدْرَسَةٌ', transliteration: 'madrasatun' },
  { english: 'market', arabic: 'سُوقٌ', transliteration: 'suuqun' },
  { english: 'mosque', arabic: 'مَسْجِدٌ', transliteration: 'masjidun' },
  { english: 'hospital', arabic: 'مُسْتَشْفًى', transliteration: 'mustashfan' },
  { english: 'street', arabic: 'شَارِعٌ', transliteration: 'shaari\'un' },
  { english: 'city', arabic: 'مَدِينَةٌ', transliteration: 'madeenatun' },
  { english: 'country', arabic: 'بَلَدٌ', transliteration: 'baladun' },
  { english: 'door', arabic: 'بَابٌ', transliteration: 'baabun' },
  { english: 'window', arabic: 'نَافِذَةٌ', transliteration: 'naafidhatun' },

  // Time
  { english: 'day', arabic: 'يَوْمٌ', transliteration: 'yawmun' },
  { english: 'night', arabic: 'لَيْلٌ', transliteration: 'laylun' },
  { english: 'morning', arabic: 'صَبَاحٌ', transliteration: 'sabaahun' },
  { english: 'today', arabic: 'اَلْيَوْمَ', transliteration: 'alyawma' },
  { english: 'tomorrow', arabic: 'غَدًا', transliteration: 'ghadan' },
  { english: 'week', arabic: 'أُسْبُوعٌ', transliteration: 'usbuu\'un' },
  { english: 'month', arabic: 'شَهْرٌ', transliteration: 'shahrun' },
  { english: 'year', arabic: 'سَنَةٌ', transliteration: 'sanatun' },

  // Common Objects
  { english: 'book', arabic: 'كِتَابٌ', transliteration: 'kitaabun' },
  { english: 'pen', arabic: 'قَلَمٌ', transliteration: 'qalamun' },
  { english: 'car', arabic: 'سَيَّارَةٌ', transliteration: 'sayyaaratun' },
  { english: 'phone', arabic: 'هَاتِفٌ', transliteration: 'haatifun' },
  { english: 'money', arabic: 'مَالٌ', transliteration: 'maalun' },
  { english: 'key', arabic: 'مِفْتَاحٌ', transliteration: 'miftaahun' },
  { english: 'table', arabic: 'طَاوِلَةٌ', transliteration: 'taawilatun' },
  { english: 'chair', arabic: 'كُرْسِيٌّ', transliteration: 'kursiyyun' },

  // Adjectives
  { english: 'big', arabic: 'كَبِيرٌ', transliteration: 'kabeerun' },
  { english: 'small', arabic: 'صَغِيرٌ', transliteration: 'sagheerun' },
  { english: 'good', arabic: 'جَيِّدٌ', transliteration: 'jayyidun' },
  { english: 'bad', arabic: 'سَيِّئٌ', transliteration: 'sayyi\'un' },
  { english: 'new', arabic: 'جَدِيدٌ', transliteration: 'jadeedun' },
  { english: 'old', arabic: 'قَدِيمٌ', transliteration: 'qadeemun' },
  { english: 'beautiful', arabic: 'جَمِيلٌ', transliteration: 'jameelun' },
  { english: 'happy', arabic: 'سَعِيدٌ', transliteration: 'sa\'eedun' },
  { english: 'sad', arabic: 'حَزِينٌ', transliteration: 'hazeenun' },
  { english: 'hot', arabic: 'حَارٌّ', transliteration: 'haarrun' },
  { english: 'cold', arabic: 'بَارِدٌ', transliteration: 'baaridun' },

  // Verbal Nouns (masdar)
  { english: 'eating', arabic: 'أَكْلٌ', transliteration: 'aklun' },
  { english: 'drinking', arabic: 'شُرْبٌ', transliteration: 'shurbun' },
  { english: 'sleeping', arabic: 'نَوْمٌ', transliteration: 'nawmun' },
  { english: 'studying', arabic: 'دِرَاسَةٌ', transliteration: 'diraasatun' },
  { english: 'writing', arabic: 'كِتَابَةٌ', transliteration: 'kitaabatun' },
  { english: 'walking', arabic: 'مَشْيٌ', transliteration: 'mashyun' },
  { english: 'running', arabic: 'جَرْيٌ', transliteration: 'jaryun' },
  { english: 'working', arabic: 'عَمَلٌ', transliteration: '\'amalun' },
  { english: 'love', arabic: 'حُبٌّ', transliteration: 'hubbun' },
  { english: 'knowledge', arabic: 'مَعْرِفَةٌ', transliteration: 'ma\'rifatun' },

  // Islamic/Religious
  { english: 'worship', arabic: 'عِبَادَةٌ', transliteration: '\'ibaadatun' },
  { english: 'god', arabic: 'اللهُ', transliteration: 'Allaahu' },
  { english: 'faith', arabic: 'إِيمَانٌ', transliteration: 'eemaanun' },
  { english: 'blessing', arabic: 'بَرَكَةٌ', transliteration: 'barakatun' },
  { english: 'prophet', arabic: 'نَبِيٌّ', transliteration: 'nabiyyun' },
];

// Remove vowels from Arabic text for display variation
function removeVowels(arabic: string): string {
  // Arabic diacritics (tashkeel) Unicode range
  return arabic.replace(/[\u064B-\u0652\u0670]/g, '');
}

// Get random words from the vocabulary list
function getRandomWords(count: number, usedIndices: Set<number>): { words: typeof VOCALIZED_VOCABULARY; indices: number[] } {
  const available = VOCALIZED_VOCABULARY
    .map((word, index) => ({ word, index }))
    .filter(({ index }) => !usedIndices.has(index));

  // Shuffle available words
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return {
    words: selected.map((s) => s.word),
    indices: selected.map((s) => s.index),
  };
}

// Fetch vocabulary - now uses local vocalized data (API optional for expansion)
export async function fetchArabicVocabulary(count: number = 15): Promise<ArabicVocabularyWord[]> {
  const usedIndices = new Set<number>();
  const { words: selectedWords } = getRandomWords(count, usedIndices);

  return selectedWords.map((word) => ({
    id: `word-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    english: word.english,
    arabic: word.arabic, // With vowels
    arabicWithoutVowels: removeVowels(word.arabic),
    transliteration: word.transliteration,
    fetchedAt: Date.now(),
  }));
}

// Get vocabulary for quiz - uses cache
export async function getVocabularyForQuiz(count: number = 10): Promise<ArabicVocabularyWord[]> {
  try {
    // Check cache first
    const cached = await getCachedVocabulary();

    if (cached && cached.words.length >= count) {
      // Return words from cache
      const shuffled = [...cached.words].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }

    // Fetch new vocabulary
    const newWords = await fetchArabicVocabulary(count + 10);

    // Merge with existing cache (remove duplicates)
    const allWords = cached ? [...cached.words] : [];
    for (const word of newWords) {
      if (!allWords.some((w) => w.english === word.english)) {
        allWords.push(word);
      }
    }

    // Save to cache
    await cacheVocabulary(allWords);

    // Return requested count
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  } catch (error) {
    __DEV__ && console.error('Error getting vocabulary:', error);
    // Return directly from vocabulary list
    return fetchArabicVocabulary(count);
  }
}

// Cache management
async function getCachedVocabulary(): Promise<CachedVocabulary | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedVocabulary = JSON.parse(cached);
      // Check version and expiry
      if (data.version === CACHE_VERSION && Date.now() - data.fetchedAt < CACHE_EXPIRY) {
        return data;
      }
      // Clear old cache
      await AsyncStorage.removeItem(CACHE_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function cacheVocabulary(words: ArabicVocabularyWord[]): Promise<void> {
  try {
    const data: CachedVocabulary = {
      words,
      lastUsedIndex: 0,
      fetchedAt: Date.now(),
      version: CACHE_VERSION,
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    __DEV__ && console.error('Error caching vocabulary:', error);
  }
}

export async function clearVocabularyCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (error) {
    __DEV__ && console.error('Error clearing vocabulary cache:', error);
  }
}
