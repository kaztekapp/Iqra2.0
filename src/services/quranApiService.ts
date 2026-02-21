// Quran API Service
// Fetches verified Quran text from Quran.com API to ensure 100% accuracy

import { Ayah, Surah, QuranWord } from '../types/quran';

const QURAN_API_BASE = 'https://api.quran.com/api/v4';
const FETCH_TIMEOUT = 15000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  } finally {
    clearTimeout(id);
  }
}

// Surah metadata (this is static and verified) - All 114 Surahs
export const SURAH_METADATA: Record<number, Omit<Surah, 'id'>> = {
  // Juz 1
  1: { surahNumber: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', nameTransliteration: 'Al-Fatihah', meaning: 'The Opening', ayahCount: 7, wordCount: 29, revelationType: 'Meccan', juz: 1, hizb: 1, order: 1, difficulty: 'beginner' },
  2: { surahNumber: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', nameTransliteration: 'Al-Baqarah', meaning: 'The Cow', ayahCount: 286, wordCount: 6144, revelationType: 'Medinan', juz: 1, hizb: 1, order: 2, difficulty: 'advanced' },
  3: { surahNumber: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali \'Imran', nameTransliteration: 'Ali \'Imran', meaning: 'Family of Imran', ayahCount: 200, wordCount: 3503, revelationType: 'Medinan', juz: 3, hizb: 6, order: 3, difficulty: 'advanced' },
  4: { surahNumber: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', nameTransliteration: 'An-Nisa', meaning: 'The Women', ayahCount: 176, wordCount: 3765, revelationType: 'Medinan', juz: 4, hizb: 8, order: 4, difficulty: 'advanced' },
  5: { surahNumber: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Ma\'idah', nameTransliteration: 'Al-Ma\'idah', meaning: 'The Table Spread', ayahCount: 120, wordCount: 2837, revelationType: 'Medinan', juz: 6, hizb: 11, order: 5, difficulty: 'advanced' },
  6: { surahNumber: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-An\'am', nameTransliteration: 'Al-An\'am', meaning: 'The Cattle', ayahCount: 165, wordCount: 3055, revelationType: 'Meccan', juz: 7, hizb: 13, order: 6, difficulty: 'advanced' },
  7: { surahNumber: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-A\'raf', nameTransliteration: 'Al-A\'raf', meaning: 'The Heights', ayahCount: 206, wordCount: 3344, revelationType: 'Meccan', juz: 8, hizb: 15, order: 7, difficulty: 'advanced' },
  8: { surahNumber: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', nameTransliteration: 'Al-Anfal', meaning: 'The Spoils of War', ayahCount: 75, wordCount: 1243, revelationType: 'Medinan', juz: 9, hizb: 18, order: 8, difficulty: 'intermediate' },
  9: { surahNumber: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', nameTransliteration: 'At-Tawbah', meaning: 'The Repentance', ayahCount: 129, wordCount: 2506, revelationType: 'Medinan', juz: 10, hizb: 19, order: 9, difficulty: 'advanced' },
  10: { surahNumber: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', nameTransliteration: 'Yunus', meaning: 'Jonah', ayahCount: 109, wordCount: 1844, revelationType: 'Meccan', juz: 11, hizb: 21, order: 10, difficulty: 'intermediate' },
  11: { surahNumber: 11, nameArabic: 'هود', nameEnglish: 'Hud', nameTransliteration: 'Hud', meaning: 'Hud', ayahCount: 123, wordCount: 1947, revelationType: 'Meccan', juz: 11, hizb: 22, order: 11, difficulty: 'intermediate' },
  12: { surahNumber: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', nameTransliteration: 'Yusuf', meaning: 'Joseph', ayahCount: 111, wordCount: 1795, revelationType: 'Meccan', juz: 12, hizb: 24, order: 12, difficulty: 'intermediate' },
  13: { surahNumber: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Ra\'d', nameTransliteration: 'Ar-Ra\'d', meaning: 'The Thunder', ayahCount: 43, wordCount: 854, revelationType: 'Medinan', juz: 13, hizb: 25, order: 13, difficulty: 'intermediate' },
  14: { surahNumber: 14, nameArabic: 'إبراهيم', nameEnglish: 'Ibrahim', nameTransliteration: 'Ibrahim', meaning: 'Abraham', ayahCount: 52, wordCount: 830, revelationType: 'Meccan', juz: 13, hizb: 26, order: 14, difficulty: 'intermediate' },
  15: { surahNumber: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', nameTransliteration: 'Al-Hijr', meaning: 'The Rocky Tract', ayahCount: 99, wordCount: 658, revelationType: 'Meccan', juz: 14, hizb: 27, order: 15, difficulty: 'intermediate' },
  16: { surahNumber: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', nameTransliteration: 'An-Nahl', meaning: 'The Bee', ayahCount: 128, wordCount: 1845, revelationType: 'Meccan', juz: 14, hizb: 27, order: 16, difficulty: 'intermediate' },
  17: { surahNumber: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', nameTransliteration: 'Al-Isra', meaning: 'The Night Journey', ayahCount: 111, wordCount: 1560, revelationType: 'Meccan', juz: 15, hizb: 29, order: 17, difficulty: 'intermediate' },
  18: { surahNumber: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', nameTransliteration: 'Al-Kahf', meaning: 'The Cave', ayahCount: 110, wordCount: 1583, revelationType: 'Meccan', juz: 15, hizb: 30, order: 18, difficulty: 'intermediate' },
  19: { surahNumber: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', nameTransliteration: 'Maryam', meaning: 'Mary', ayahCount: 98, wordCount: 972, revelationType: 'Meccan', juz: 16, hizb: 31, order: 19, difficulty: 'intermediate' },
  20: { surahNumber: 20, nameArabic: 'طه', nameEnglish: 'Ta-Ha', nameTransliteration: 'Ta-Ha', meaning: 'Ta-Ha', ayahCount: 135, wordCount: 1354, revelationType: 'Meccan', juz: 16, hizb: 31, order: 20, difficulty: 'intermediate' },
  21: { surahNumber: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', nameTransliteration: 'Al-Anbiya', meaning: 'The Prophets', ayahCount: 112, wordCount: 1174, revelationType: 'Meccan', juz: 17, hizb: 33, order: 21, difficulty: 'intermediate' },
  22: { surahNumber: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', nameTransliteration: 'Al-Hajj', meaning: 'The Pilgrimage', ayahCount: 78, wordCount: 1279, revelationType: 'Medinan', juz: 17, hizb: 34, order: 22, difficulty: 'intermediate' },
  23: { surahNumber: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Mu\'minun', nameTransliteration: 'Al-Mu\'minun', meaning: 'The Believers', ayahCount: 118, wordCount: 1055, revelationType: 'Meccan', juz: 18, hizb: 35, order: 23, difficulty: 'intermediate' },
  24: { surahNumber: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', nameTransliteration: 'An-Nur', meaning: 'The Light', ayahCount: 64, wordCount: 1320, revelationType: 'Medinan', juz: 18, hizb: 35, order: 24, difficulty: 'intermediate' },
  25: { surahNumber: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', nameTransliteration: 'Al-Furqan', meaning: 'The Criterion', ayahCount: 77, wordCount: 896, revelationType: 'Meccan', juz: 18, hizb: 36, order: 25, difficulty: 'intermediate' },
  26: { surahNumber: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shu\'ara', nameTransliteration: 'Ash-Shu\'ara', meaning: 'The Poets', ayahCount: 227, wordCount: 1322, revelationType: 'Meccan', juz: 19, hizb: 37, order: 26, difficulty: 'intermediate' },
  27: { surahNumber: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', nameTransliteration: 'An-Naml', meaning: 'The Ant', ayahCount: 93, wordCount: 1165, revelationType: 'Meccan', juz: 19, hizb: 38, order: 27, difficulty: 'intermediate' },
  28: { surahNumber: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', nameTransliteration: 'Al-Qasas', meaning: 'The Stories', ayahCount: 88, wordCount: 1441, revelationType: 'Meccan', juz: 20, hizb: 39, order: 28, difficulty: 'intermediate' },
  29: { surahNumber: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-Ankabut', nameTransliteration: 'Al-Ankabut', meaning: 'The Spider', ayahCount: 69, wordCount: 980, revelationType: 'Meccan', juz: 20, hizb: 40, order: 29, difficulty: 'intermediate' },
  30: { surahNumber: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', nameTransliteration: 'Ar-Rum', meaning: 'The Romans', ayahCount: 60, wordCount: 819, revelationType: 'Meccan', juz: 21, hizb: 41, order: 30, difficulty: 'intermediate' },
  31: { surahNumber: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', nameTransliteration: 'Luqman', meaning: 'Luqman', ayahCount: 34, wordCount: 550, revelationType: 'Meccan', juz: 21, hizb: 41, order: 31, difficulty: 'beginner' },
  32: { surahNumber: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajdah', nameTransliteration: 'As-Sajdah', meaning: 'The Prostration', ayahCount: 30, wordCount: 374, revelationType: 'Meccan', juz: 21, hizb: 42, order: 32, difficulty: 'beginner' },
  33: { surahNumber: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', nameTransliteration: 'Al-Ahzab', meaning: 'The Combined Forces', ayahCount: 73, wordCount: 1303, revelationType: 'Medinan', juz: 21, hizb: 42, order: 33, difficulty: 'intermediate' },
  34: { surahNumber: 34, nameArabic: 'سبأ', nameEnglish: 'Saba', nameTransliteration: 'Saba', meaning: 'Sheba', ayahCount: 54, wordCount: 884, revelationType: 'Meccan', juz: 22, hizb: 43, order: 34, difficulty: 'intermediate' },
  35: { surahNumber: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', nameTransliteration: 'Fatir', meaning: 'The Originator', ayahCount: 45, wordCount: 780, revelationType: 'Meccan', juz: 22, hizb: 44, order: 35, difficulty: 'intermediate' },
  36: { surahNumber: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', nameTransliteration: 'Ya-Sin', meaning: 'Ya-Sin', ayahCount: 83, wordCount: 733, revelationType: 'Meccan', juz: 22, hizb: 44, order: 36, difficulty: 'intermediate' },
  37: { surahNumber: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', nameTransliteration: 'As-Saffat', meaning: 'Those Who Set The Ranks', ayahCount: 182, wordCount: 866, revelationType: 'Meccan', juz: 23, hizb: 45, order: 37, difficulty: 'intermediate' },
  38: { surahNumber: 38, nameArabic: 'ص', nameEnglish: 'Sad', nameTransliteration: 'Sad', meaning: 'Sad', ayahCount: 88, wordCount: 735, revelationType: 'Meccan', juz: 23, hizb: 46, order: 38, difficulty: 'intermediate' },
  39: { surahNumber: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', nameTransliteration: 'Az-Zumar', meaning: 'The Troops', ayahCount: 75, wordCount: 1177, revelationType: 'Meccan', juz: 23, hizb: 46, order: 39, difficulty: 'intermediate' },
  40: { surahNumber: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', nameTransliteration: 'Ghafir', meaning: 'The Forgiver', ayahCount: 85, wordCount: 1228, revelationType: 'Meccan', juz: 24, hizb: 47, order: 40, difficulty: 'intermediate' },
  41: { surahNumber: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', nameTransliteration: 'Fussilat', meaning: 'Explained in Detail', ayahCount: 54, wordCount: 796, revelationType: 'Meccan', juz: 24, hizb: 48, order: 41, difficulty: 'intermediate' },
  42: { surahNumber: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shura', nameTransliteration: 'Ash-Shura', meaning: 'The Consultation', ayahCount: 53, wordCount: 860, revelationType: 'Meccan', juz: 25, hizb: 49, order: 42, difficulty: 'intermediate' },
  43: { surahNumber: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', nameTransliteration: 'Az-Zukhruf', meaning: 'The Ornaments of Gold', ayahCount: 89, wordCount: 837, revelationType: 'Meccan', juz: 25, hizb: 49, order: 43, difficulty: 'intermediate' },
  44: { surahNumber: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', nameTransliteration: 'Ad-Dukhan', meaning: 'The Smoke', ayahCount: 59, wordCount: 346, revelationType: 'Meccan', juz: 25, hizb: 50, order: 44, difficulty: 'beginner' },
  45: { surahNumber: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiyah', nameTransliteration: 'Al-Jathiyah', meaning: 'The Crouching', ayahCount: 37, wordCount: 488, revelationType: 'Meccan', juz: 25, hizb: 50, order: 45, difficulty: 'beginner' },
  46: { surahNumber: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', nameTransliteration: 'Al-Ahqaf', meaning: 'The Wind-Curved Sandhills', ayahCount: 35, wordCount: 646, revelationType: 'Meccan', juz: 26, hizb: 51, order: 46, difficulty: 'beginner' },
  47: { surahNumber: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', nameTransliteration: 'Muhammad', meaning: 'Muhammad', ayahCount: 38, wordCount: 542, revelationType: 'Medinan', juz: 26, hizb: 51, order: 47, difficulty: 'beginner' },
  48: { surahNumber: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', nameTransliteration: 'Al-Fath', meaning: 'The Victory', ayahCount: 29, wordCount: 560, revelationType: 'Medinan', juz: 26, hizb: 51, order: 48, difficulty: 'beginner' },
  49: { surahNumber: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', nameTransliteration: 'Al-Hujurat', meaning: 'The Rooms', ayahCount: 18, wordCount: 353, revelationType: 'Medinan', juz: 26, hizb: 52, order: 49, difficulty: 'beginner' },
  50: { surahNumber: 50, nameArabic: 'ق', nameEnglish: 'Qaf', nameTransliteration: 'Qaf', meaning: 'Qaf', ayahCount: 45, wordCount: 373, revelationType: 'Meccan', juz: 26, hizb: 52, order: 50, difficulty: 'beginner' },
  51: { surahNumber: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', nameTransliteration: 'Adh-Dhariyat', meaning: 'The Winnowing Winds', ayahCount: 60, wordCount: 360, revelationType: 'Meccan', juz: 26, hizb: 52, order: 51, difficulty: 'beginner' },
  52: { surahNumber: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', nameTransliteration: 'At-Tur', meaning: 'The Mount', ayahCount: 49, wordCount: 312, revelationType: 'Meccan', juz: 27, hizb: 53, order: 52, difficulty: 'beginner' },
  53: { surahNumber: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', nameTransliteration: 'An-Najm', meaning: 'The Star', ayahCount: 62, wordCount: 360, revelationType: 'Meccan', juz: 27, hizb: 53, order: 53, difficulty: 'beginner' },
  54: { surahNumber: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', nameTransliteration: 'Al-Qamar', meaning: 'The Moon', ayahCount: 55, wordCount: 342, revelationType: 'Meccan', juz: 27, hizb: 53, order: 54, difficulty: 'beginner' },
  55: { surahNumber: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', nameTransliteration: 'Ar-Rahman', meaning: 'The Beneficent', ayahCount: 78, wordCount: 352, revelationType: 'Medinan', juz: 27, hizb: 54, order: 55, difficulty: 'beginner' },
  56: { surahNumber: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqi\'ah', nameTransliteration: 'Al-Waqi\'ah', meaning: 'The Inevitable', ayahCount: 96, wordCount: 379, revelationType: 'Meccan', juz: 27, hizb: 54, order: 56, difficulty: 'beginner' },
  57: { surahNumber: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', nameTransliteration: 'Al-Hadid', meaning: 'The Iron', ayahCount: 29, wordCount: 575, revelationType: 'Medinan', juz: 27, hizb: 54, order: 57, difficulty: 'beginner' },
  58: { surahNumber: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', nameTransliteration: 'Al-Mujadila', meaning: 'The Pleading Woman', ayahCount: 22, wordCount: 475, revelationType: 'Medinan', juz: 28, hizb: 55, order: 58, difficulty: 'beginner' },
  59: { surahNumber: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', nameTransliteration: 'Al-Hashr', meaning: 'The Exile', ayahCount: 24, wordCount: 447, revelationType: 'Medinan', juz: 28, hizb: 55, order: 59, difficulty: 'beginner' },
  60: { surahNumber: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahanah', nameTransliteration: 'Al-Mumtahanah', meaning: 'She That Is Examined', ayahCount: 13, wordCount: 352, revelationType: 'Medinan', juz: 28, hizb: 55, order: 60, difficulty: 'beginner' },
  61: { surahNumber: 61, nameArabic: 'الصف', nameEnglish: 'As-Saf', nameTransliteration: 'As-Saf', meaning: 'The Ranks', ayahCount: 14, wordCount: 226, revelationType: 'Medinan', juz: 28, hizb: 56, order: 61, difficulty: 'beginner' },
  62: { surahNumber: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumu\'ah', nameTransliteration: 'Al-Jumu\'ah', meaning: 'Friday', ayahCount: 11, wordCount: 177, revelationType: 'Medinan', juz: 28, hizb: 56, order: 62, difficulty: 'beginner' },
  63: { surahNumber: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', nameTransliteration: 'Al-Munafiqun', meaning: 'The Hypocrites', ayahCount: 11, wordCount: 181, revelationType: 'Medinan', juz: 28, hizb: 56, order: 63, difficulty: 'beginner' },
  64: { surahNumber: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', nameTransliteration: 'At-Taghabun', meaning: 'The Mutual Disillusion', ayahCount: 18, wordCount: 242, revelationType: 'Medinan', juz: 28, hizb: 56, order: 64, difficulty: 'beginner' },
  65: { surahNumber: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', nameTransliteration: 'At-Talaq', meaning: 'The Divorce', ayahCount: 12, wordCount: 289, revelationType: 'Medinan', juz: 28, hizb: 56, order: 65, difficulty: 'beginner' },
  66: { surahNumber: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', nameTransliteration: 'At-Tahrim', meaning: 'The Prohibition', ayahCount: 12, wordCount: 254, revelationType: 'Medinan', juz: 28, hizb: 56, order: 66, difficulty: 'beginner' },
  67: { surahNumber: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', nameTransliteration: 'Al-Mulk', meaning: 'The Sovereignty', ayahCount: 30, wordCount: 333, revelationType: 'Meccan', juz: 29, hizb: 57, order: 67, difficulty: 'beginner' },
  68: { surahNumber: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', nameTransliteration: 'Al-Qalam', meaning: 'The Pen', ayahCount: 52, wordCount: 301, revelationType: 'Meccan', juz: 29, hizb: 57, order: 68, difficulty: 'beginner' },
  69: { surahNumber: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', nameTransliteration: 'Al-Haqqah', meaning: 'The Reality', ayahCount: 52, wordCount: 261, revelationType: 'Meccan', juz: 29, hizb: 57, order: 69, difficulty: 'beginner' },
  70: { surahNumber: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Ma\'arij', nameTransliteration: 'Al-Ma\'arij', meaning: 'The Ascending Stairways', ayahCount: 44, wordCount: 217, revelationType: 'Meccan', juz: 29, hizb: 57, order: 70, difficulty: 'beginner' },
  71: { surahNumber: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', nameTransliteration: 'Nuh', meaning: 'Noah', ayahCount: 28, wordCount: 227, revelationType: 'Meccan', juz: 29, hizb: 58, order: 71, difficulty: 'beginner' },
  72: { surahNumber: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', nameTransliteration: 'Al-Jinn', meaning: 'The Jinn', ayahCount: 28, wordCount: 286, revelationType: 'Meccan', juz: 29, hizb: 58, order: 72, difficulty: 'beginner' },
  73: { surahNumber: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', nameTransliteration: 'Al-Muzzammil', meaning: 'The Enshrouded One', ayahCount: 20, wordCount: 200, revelationType: 'Meccan', juz: 29, hizb: 58, order: 73, difficulty: 'beginner' },
  74: { surahNumber: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', nameTransliteration: 'Al-Muddaththir', meaning: 'The Cloaked One', ayahCount: 56, wordCount: 256, revelationType: 'Meccan', juz: 29, hizb: 58, order: 74, difficulty: 'beginner' },
  75: { surahNumber: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', nameTransliteration: 'Al-Qiyamah', meaning: 'The Resurrection', ayahCount: 40, wordCount: 164, revelationType: 'Meccan', juz: 29, hizb: 58, order: 75, difficulty: 'beginner' },
  76: { surahNumber: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', nameTransliteration: 'Al-Insan', meaning: 'Man', ayahCount: 31, wordCount: 243, revelationType: 'Medinan', juz: 29, hizb: 58, order: 76, difficulty: 'beginner' },
  77: { surahNumber: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', nameTransliteration: 'Al-Mursalat', meaning: 'The Emissaries', ayahCount: 50, wordCount: 181, revelationType: 'Meccan', juz: 29, hizb: 58, order: 77, difficulty: 'beginner' },
  // Juz 30 (Juz Amma)
  78: { surahNumber: 78, nameArabic: 'النبأ', nameEnglish: 'An-Naba', nameTransliteration: 'An-Naba', meaning: 'The Tidings', ayahCount: 40, wordCount: 174, revelationType: 'Meccan', juz: 30, hizb: 59, order: 78, difficulty: 'beginner' },
  79: { surahNumber: 79, nameArabic: 'النازعات', nameEnglish: 'An-Nazi\'at', nameTransliteration: 'An-Nazi\'at', meaning: 'Those Who Drag Forth', ayahCount: 46, wordCount: 179, revelationType: 'Meccan', juz: 30, hizb: 59, order: 79, difficulty: 'beginner' },
  80: { surahNumber: 80, nameArabic: 'عبس', nameEnglish: 'Abasa', nameTransliteration: 'Abasa', meaning: 'He Frowned', ayahCount: 42, wordCount: 133, revelationType: 'Meccan', juz: 30, hizb: 59, order: 80, difficulty: 'beginner' },
  81: { surahNumber: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', nameTransliteration: 'At-Takwir', meaning: 'The Overthrowing', ayahCount: 29, wordCount: 104, revelationType: 'Meccan', juz: 30, hizb: 59, order: 81, difficulty: 'beginner' },
  82: { surahNumber: 82, nameArabic: 'الانفطار', nameEnglish: 'Al-Infitar', nameTransliteration: 'Al-Infitar', meaning: 'The Cleaving', ayahCount: 19, wordCount: 81, revelationType: 'Meccan', juz: 30, hizb: 59, order: 82, difficulty: 'beginner' },
  83: { surahNumber: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', nameTransliteration: 'Al-Mutaffifin', meaning: 'The Defrauding', ayahCount: 36, wordCount: 169, revelationType: 'Meccan', juz: 30, hizb: 59, order: 83, difficulty: 'beginner' },
  84: { surahNumber: 84, nameArabic: 'الانشقاق', nameEnglish: 'Al-Inshiqaq', nameTransliteration: 'Al-Inshiqaq', meaning: 'The Sundering', ayahCount: 25, wordCount: 108, revelationType: 'Meccan', juz: 30, hizb: 59, order: 84, difficulty: 'beginner' },
  85: { surahNumber: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', nameTransliteration: 'Al-Buruj', meaning: 'The Mansions of the Stars', ayahCount: 22, wordCount: 109, revelationType: 'Meccan', juz: 30, hizb: 59, order: 85, difficulty: 'beginner' },
  86: { surahNumber: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', nameTransliteration: 'At-Tariq', meaning: 'The Night-Comer', ayahCount: 17, wordCount: 61, revelationType: 'Meccan', juz: 30, hizb: 59, order: 86, difficulty: 'beginner' },
  87: { surahNumber: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-A\'la', nameTransliteration: 'Al-A\'la', meaning: 'The Most High', ayahCount: 19, wordCount: 72, revelationType: 'Meccan', juz: 30, hizb: 60, order: 87, difficulty: 'beginner' },
  88: { surahNumber: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', nameTransliteration: 'Al-Ghashiyah', meaning: 'The Overwhelming', ayahCount: 26, wordCount: 92, revelationType: 'Meccan', juz: 30, hizb: 60, order: 88, difficulty: 'beginner' },
  89: { surahNumber: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', nameTransliteration: 'Al-Fajr', meaning: 'The Dawn', ayahCount: 30, wordCount: 139, revelationType: 'Meccan', juz: 30, hizb: 60, order: 89, difficulty: 'beginner' },
  90: { surahNumber: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', nameTransliteration: 'Al-Balad', meaning: 'The City', ayahCount: 20, wordCount: 82, revelationType: 'Meccan', juz: 30, hizb: 60, order: 90, difficulty: 'beginner' },
  91: { surahNumber: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', nameTransliteration: 'Ash-Shams', meaning: 'The Sun', ayahCount: 15, wordCount: 54, revelationType: 'Meccan', juz: 30, hizb: 60, order: 91, difficulty: 'beginner' },
  92: { surahNumber: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', nameTransliteration: 'Al-Layl', meaning: 'The Night', ayahCount: 21, wordCount: 71, revelationType: 'Meccan', juz: 30, hizb: 60, order: 92, difficulty: 'beginner' },
  93: { surahNumber: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duha', nameTransliteration: 'Ad-Duha', meaning: 'The Morning Hours', ayahCount: 11, wordCount: 40, revelationType: 'Meccan', juz: 30, hizb: 60, order: 93, difficulty: 'beginner' },
  94: { surahNumber: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', nameTransliteration: 'Ash-Sharh', meaning: 'The Relief', ayahCount: 8, wordCount: 27, revelationType: 'Meccan', juz: 30, hizb: 60, order: 94, difficulty: 'beginner' },
  95: { surahNumber: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', nameTransliteration: 'At-Tin', meaning: 'The Fig', ayahCount: 8, wordCount: 34, revelationType: 'Meccan', juz: 30, hizb: 60, order: 95, difficulty: 'beginner' },
  96: { surahNumber: 96, nameArabic: 'العلق', nameEnglish: 'Al-Alaq', nameTransliteration: 'Al-Alaq', meaning: 'The Clot', ayahCount: 19, wordCount: 72, revelationType: 'Meccan', juz: 30, hizb: 60, order: 96, difficulty: 'beginner' },
  97: { surahNumber: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', nameTransliteration: 'Al-Qadr', meaning: 'The Power', ayahCount: 5, wordCount: 30, revelationType: 'Meccan', juz: 30, hizb: 60, order: 97, difficulty: 'beginner' },
  98: { surahNumber: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyinah', nameTransliteration: 'Al-Bayyinah', meaning: 'The Clear Proof', ayahCount: 8, wordCount: 94, revelationType: 'Medinan', juz: 30, hizb: 60, order: 98, difficulty: 'beginner' },
  99: { surahNumber: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', nameTransliteration: 'Az-Zalzalah', meaning: 'The Earthquake', ayahCount: 8, wordCount: 36, revelationType: 'Medinan', juz: 30, hizb: 60, order: 99, difficulty: 'beginner' },
  100: { surahNumber: 100, nameArabic: 'العاديات', nameEnglish: 'Al-Adiyat', nameTransliteration: 'Al-Adiyat', meaning: 'The Courser', ayahCount: 11, wordCount: 40, revelationType: 'Meccan', juz: 30, hizb: 60, order: 100, difficulty: 'beginner' },
  101: { surahNumber: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qari\'ah', nameTransliteration: 'Al-Qari\'ah', meaning: 'The Calamity', ayahCount: 11, wordCount: 36, revelationType: 'Meccan', juz: 30, hizb: 60, order: 101, difficulty: 'beginner' },
  102: { surahNumber: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', nameTransliteration: 'At-Takathur', meaning: 'The Rivalry in World Increase', ayahCount: 8, wordCount: 28, revelationType: 'Meccan', juz: 30, hizb: 60, order: 102, difficulty: 'beginner' },
  103: { surahNumber: 103, nameArabic: 'العصر', nameEnglish: 'Al-Asr', nameTransliteration: 'Al-Asr', meaning: 'The Declining Day', ayahCount: 3, wordCount: 14, revelationType: 'Meccan', juz: 30, hizb: 60, order: 103, difficulty: 'beginner' },
  104: { surahNumber: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', nameTransliteration: 'Al-Humazah', meaning: 'The Traducer', ayahCount: 9, wordCount: 33, revelationType: 'Meccan', juz: 30, hizb: 60, order: 104, difficulty: 'beginner' },
  105: { surahNumber: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', nameTransliteration: 'Al-Fil', meaning: 'The Elephant', ayahCount: 5, wordCount: 23, revelationType: 'Meccan', juz: 30, hizb: 60, order: 105, difficulty: 'beginner' },
  106: { surahNumber: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', nameTransliteration: 'Quraysh', meaning: 'Quraysh', ayahCount: 4, wordCount: 17, revelationType: 'Meccan', juz: 30, hizb: 60, order: 106, difficulty: 'beginner' },
  107: { surahNumber: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Ma\'un', nameTransliteration: 'Al-Ma\'un', meaning: 'The Small Kindnesses', ayahCount: 7, wordCount: 25, revelationType: 'Meccan', juz: 30, hizb: 60, order: 107, difficulty: 'beginner' },
  108: { surahNumber: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', nameTransliteration: 'Al-Kawthar', meaning: 'The Abundance', ayahCount: 3, wordCount: 10, revelationType: 'Meccan', juz: 30, hizb: 60, order: 108, difficulty: 'beginner' },
  109: { surahNumber: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', nameTransliteration: 'Al-Kafirun', meaning: 'The Disbelievers', ayahCount: 6, wordCount: 26, revelationType: 'Meccan', juz: 30, hizb: 60, order: 109, difficulty: 'beginner' },
  110: { surahNumber: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', nameTransliteration: 'An-Nasr', meaning: 'The Divine Support', ayahCount: 3, wordCount: 19, revelationType: 'Medinan', juz: 30, hizb: 60, order: 110, difficulty: 'beginner' },
  111: { surahNumber: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', nameTransliteration: 'Al-Masad', meaning: 'The Palm Fiber', ayahCount: 5, wordCount: 23, revelationType: 'Meccan', juz: 30, hizb: 60, order: 111, difficulty: 'beginner' },
  112: { surahNumber: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', nameTransliteration: 'Al-Ikhlas', meaning: 'The Sincerity', ayahCount: 4, wordCount: 15, revelationType: 'Meccan', juz: 30, hizb: 60, order: 112, difficulty: 'beginner' },
  113: { surahNumber: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', nameTransliteration: 'Al-Falaq', meaning: 'The Daybreak', ayahCount: 5, wordCount: 23, revelationType: 'Meccan', juz: 30, hizb: 60, order: 113, difficulty: 'beginner' },
  114: { surahNumber: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', nameTransliteration: 'An-Nas', meaning: 'Mankind', ayahCount: 6, wordCount: 20, revelationType: 'Meccan', juz: 30, hizb: 60, order: 114, difficulty: 'beginner' },
};

interface QuranApiVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei: string;
  words?: QuranApiWord[];
}

interface QuranApiWord {
  id: number;
  position: number;
  text_uthmani: string;
  text_imlaei: string;
  transliteration?: { text: string };
  translation?: { text: string };
}

interface QuranApiTranslation {
  resource_id: number;
  text: string;
}

interface QuranApiResponse<T> {
  verses?: T[];
  verse?: T;
  translations?: QuranApiTranslation[];
}

class QuranApiService {
  private cache: Map<string, any> = new Map();

  /**
   * Fetch a complete surah with word-by-word data
   */
  async fetchSurah(surahNumber: number): Promise<Ayah[]> {
    const cacheKey = `surah-${surahNumber}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Fetch verses with word-by-word data
      // fields: verse-level text fields, word_fields: word-level text fields
      const versesResponse = await fetchWithTimeout(
        `${QURAN_API_BASE}/verses/by_chapter/${surahNumber}?language=en&words=true&fields=text_uthmani,text_imlaei&word_fields=text_uthmani,text_imlaei,transliteration,translation&per_page=286`
      );
      const versesData: QuranApiResponse<QuranApiVerse> = await versesResponse.json();

      // Fetch translations (Sahih International - resource_id: 131)
      const translationResponse = await fetchWithTimeout(
        `${QURAN_API_BASE}/quran/translations/131?chapter_number=${surahNumber}`
      );
      const translationData: QuranApiResponse<any> = await translationResponse.json();

      const translationsMap = new Map<number, string>();
      translationData.translations?.forEach((t: any) => {
        translationsMap.set(t.verse_number || t.resource_id, t.text);
      });

      const surahId = this.getSurahId(surahNumber);
      const ayahs: Ayah[] = (versesData.verses || []).map((verse, index) => {
        const words: QuranWord[] = (verse.words || [])
          .filter(w => w.text_uthmani && w.text_uthmani.trim()) // Filter out empty words
          .map((word, wordIndex) => ({
            id: `${surahId}-${verse.verse_number}-${wordIndex + 1}`,
            text: word.text_uthmani,
            transliteration: word.transliteration?.text || '',
            translation: word.translation?.text || '',
            position: wordIndex,
          }));

        // Fallback: construct verse text from words if API doesn't return it
        const verseText = verse.text_uthmani || words.map(w => w.text).join(' ');
        const verseTextSimple = verse.text_imlaei || verseText;

        return {
          id: `${surahId}-${verse.verse_number}`,
          surahId,
          ayahNumber: verse.verse_number,
          textUthmani: verseText,
          textSimple: verseTextSimple,
          transliteration: this.generateTransliteration(words),
          translation: this.cleanTranslation(translationsMap.get(verse.verse_number) || ''),
          words,
          tajweedRules: [], // Will be added separately or computed
        };
      });

      this.cache.set(cacheKey, ayahs);
      return ayahs;
    } catch (error) {
      __DEV__ && console.error(`Error fetching surah ${surahNumber}:`, error);
      throw error;
    }
  }

  /**
   * Fetch a single ayah
   */
  async fetchAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | null> {
    try {
      const response = await fetchWithTimeout(
        `${QURAN_API_BASE}/verses/by_key/${surahNumber}:${ayahNumber}?language=en&words=true&fields=text_uthmani,text_imlaei&word_fields=text_uthmani,text_imlaei,transliteration,translation`
      );
      const data: QuranApiResponse<QuranApiVerse> = await response.json();

      if (!data.verse) return null;

      const verse = data.verse;
      const surahId = this.getSurahId(surahNumber);

      const words: QuranWord[] = (verse.words || [])
        .filter(w => w.text_uthmani && w.text_uthmani.trim())
        .map((word, wordIndex) => ({
          id: `${surahId}-${verse.verse_number}-${wordIndex + 1}`,
          text: word.text_uthmani,
          transliteration: word.transliteration?.text || '',
          translation: word.translation?.text || '',
          position: wordIndex,
        }));

      // Fallback: construct verse text from words if API doesn't return it
      const verseText = verse.text_uthmani || words.map(w => w.text).join(' ');
      const verseTextSimple = verse.text_imlaei || verseText;

      return {
        id: `${surahId}-${verse.verse_number}`,
        surahId,
        ayahNumber: verse.verse_number,
        textUthmani: verseText,
        textSimple: verseTextSimple,
        transliteration: this.generateTransliteration(words),
        translation: '',
        words,
        tajweedRules: [],
      };
    } catch (error) {
      __DEV__ && console.error(`Error fetching ayah ${surahNumber}:${ayahNumber}:`, error);
      return null;
    }
  }

  /**
   * Fetch ayah-level translations for a surah in a given language
   * Returns a Map of ayahNumber → translated text
   */
  async fetchSurahTranslations(surahNumber: number, language: 'en' | 'fr'): Promise<Map<number, string>> {
    const resourceId = language === 'fr' ? 136 : 20;
    const cacheKey = `translations-${surahNumber}-${language}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetchWithTimeout(
        `${QURAN_API_BASE}/quran/translations/${resourceId}?chapter_number=${surahNumber}`
      );
      const data: QuranApiResponse<any> = await response.json();

      const translations = new Map<number, string>();
      data.translations?.forEach((t: any, index: number) => {
        // API returns translations in verse order, use index+1 as verse number
        translations.set(index + 1, this.cleanTranslation(t.text));
      });

      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      __DEV__ && console.error(`Error fetching translations for surah ${surahNumber} (${language}):`, error);
      return new Map();
    }
  }

  /**
   * Fetch word-by-word transliteration
   */
  async fetchTransliteration(surahNumber: number): Promise<Map<number, string[]>> {
    try {
      const response = await fetchWithTimeout(
        `${QURAN_API_BASE}/quran/verses/uthmani?chapter_number=${surahNumber}`
      );
      const data = await response.json();

      const transliterations = new Map<number, string[]>();
      // Process transliteration data...

      return transliterations;
    } catch (error) {
      __DEV__ && console.error('Error fetching transliteration:', error);
      return new Map();
    }
  }

  /**
   * Get all available surahs metadata
   */
  getSurahList(): Surah[] {
    return Object.entries(SURAH_METADATA).map(([num, data]) => ({
      id: this.getSurahId(Number(num)),
      ...data,
    }));
  }

  /**
   * Get surah metadata
   */
  getSurahMetadata(surahNumber: number): Surah | null {
    const data = SURAH_METADATA[surahNumber];
    if (!data) return null;
    return {
      id: this.getSurahId(surahNumber),
      ...data,
    };
  }

  /**
   * Pre-fetch and cache all surahs (call on app init)
   */
  async prefetchAllSurahs(): Promise<void> {
    const surahNumbers = Object.keys(SURAH_METADATA).map(Number);

    await Promise.all(
      surahNumbers.map(num => this.fetchSurah(num).catch(err => {
        __DEV__ && console.error(`Failed to prefetch surah ${num}:`, err);
      }))
    );
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  // Helper methods
  private getSurahId(surahNumber: number): string {
    const names: Record<number, string> = {
      1: 'al-fatihah',
      2: 'al-baqarah',
      3: 'ali-imran',
      4: 'an-nisa',
      5: 'al-maidah',
      6: 'al-anam',
      7: 'al-araf',
      8: 'al-anfal',
      9: 'at-tawbah',
      10: 'yunus',
      11: 'hud',
      12: 'yusuf',
      13: 'ar-rad',
      14: 'ibrahim',
      15: 'al-hijr',
      16: 'an-nahl',
      17: 'al-isra',
      18: 'al-kahf',
      19: 'maryam',
      20: 'ta-ha',
      21: 'al-anbiya',
      22: 'al-hajj',
      23: 'al-muminun',
      24: 'an-nur',
      25: 'al-furqan',
      26: 'ash-shuara',
      27: 'an-naml',
      28: 'al-qasas',
      29: 'al-ankabut',
      30: 'ar-rum',
      31: 'luqman',
      32: 'as-sajdah',
      33: 'al-ahzab',
      34: 'saba',
      35: 'fatir',
      36: 'ya-sin',
      37: 'as-saffat',
      38: 'sad',
      39: 'az-zumar',
      40: 'ghafir',
      41: 'fussilat',
      42: 'ash-shura',
      43: 'az-zukhruf',
      44: 'ad-dukhan',
      45: 'al-jathiyah',
      46: 'al-ahqaf',
      47: 'muhammad',
      48: 'al-fath',
      49: 'al-hujurat',
      50: 'qaf',
      51: 'adh-dhariyat',
      52: 'at-tur',
      53: 'an-najm',
      54: 'al-qamar',
      55: 'ar-rahman',
      56: 'al-waqiah',
      57: 'al-hadid',
      58: 'al-mujadila',
      59: 'al-hashr',
      60: 'al-mumtahanah',
      61: 'as-saf',
      62: 'al-jumuah',
      63: 'al-munafiqun',
      64: 'at-taghabun',
      65: 'at-talaq',
      66: 'at-tahrim',
      67: 'al-mulk',
      68: 'al-qalam',
      69: 'al-haqqah',
      70: 'al-maarij',
      71: 'nuh',
      72: 'al-jinn',
      73: 'al-muzzammil',
      74: 'al-muddaththir',
      75: 'al-qiyamah',
      76: 'al-insan',
      77: 'al-mursalat',
      78: 'an-naba',
      79: 'an-naziat',
      80: 'abasa',
      81: 'at-takwir',
      82: 'al-infitar',
      83: 'al-mutaffifin',
      84: 'al-inshiqaq',
      85: 'al-buruj',
      86: 'at-tariq',
      87: 'al-ala',
      88: 'al-ghashiyah',
      89: 'al-fajr',
      90: 'al-balad',
      91: 'ash-shams',
      92: 'al-layl',
      93: 'ad-duha',
      94: 'ash-sharh',
      95: 'at-tin',
      96: 'al-alaq',
      97: 'al-qadr',
      98: 'al-bayyinah',
      99: 'az-zalzalah',
      100: 'al-adiyat',
      101: 'al-qariah',
      102: 'at-takathur',
      103: 'al-asr',
      104: 'al-humazah',
      105: 'al-fil',
      106: 'quraysh',
      107: 'al-maun',
      108: 'al-kawthar',
      109: 'al-kafirun',
      110: 'an-nasr',
      111: 'al-masad',
      112: 'al-ikhlas',
      113: 'al-falaq',
      114: 'an-nas',
    };
    return names[surahNumber] || `surah-${surahNumber}`;
  }

  private generateTransliteration(words: QuranWord[]): string {
    return words.map(w => w.transliteration).filter(Boolean).join(' ');
  }

  private cleanTranslation(text: string): string {
    // Remove footnote markers (full <sup>...</sup> with content) first, then remaining tags
    return text
      .replace(/<sup[^>]*>.*?<\/sup>/g, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }
}

// Export singleton instance
export const quranApiService = new QuranApiService();

// Export class for testing
export { QuranApiService };
