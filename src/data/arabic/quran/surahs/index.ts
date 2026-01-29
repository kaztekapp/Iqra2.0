// Surah Metadata for Learning - All 114 Surahs
// Note: Ayah text is fetched from Quran.com API for accuracy

import { Surah } from '../../../../types/quran';

export const SURAHS: Surah[] = [
  // Juz 1-2
  { id: 'al-fatihah', surahNumber: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', nameTransliteration: 'Al-Fatihah', meaning: 'The Opening', revelationType: 'Meccan', ayahCount: 7, wordCount: 29, difficulty: 'beginner', order: 1, juz: 1, hizb: 1 },
  { id: 'al-baqarah', surahNumber: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', nameTransliteration: 'Al-Baqarah', meaning: 'The Cow', revelationType: 'Medinan', ayahCount: 286, wordCount: 6144, difficulty: 'advanced', order: 2, juz: 1, hizb: 1 },
  { id: 'ali-imran', surahNumber: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali \'Imran', nameTransliteration: 'Ali \'Imran', meaning: 'Family of Imran', revelationType: 'Medinan', ayahCount: 200, wordCount: 3503, difficulty: 'advanced', order: 3, juz: 3, hizb: 6 },
  { id: 'an-nisa', surahNumber: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', nameTransliteration: 'An-Nisa', meaning: 'The Women', revelationType: 'Medinan', ayahCount: 176, wordCount: 3765, difficulty: 'advanced', order: 4, juz: 4, hizb: 8 },
  { id: 'al-maidah', surahNumber: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Ma\'idah', nameTransliteration: 'Al-Ma\'idah', meaning: 'The Table Spread', revelationType: 'Medinan', ayahCount: 120, wordCount: 2837, difficulty: 'advanced', order: 5, juz: 6, hizb: 11 },
  { id: 'al-anam', surahNumber: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-An\'am', nameTransliteration: 'Al-An\'am', meaning: 'The Cattle', revelationType: 'Meccan', ayahCount: 165, wordCount: 3055, difficulty: 'advanced', order: 6, juz: 7, hizb: 13 },
  { id: 'al-araf', surahNumber: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-A\'raf', nameTransliteration: 'Al-A\'raf', meaning: 'The Heights', revelationType: 'Meccan', ayahCount: 206, wordCount: 3344, difficulty: 'advanced', order: 7, juz: 8, hizb: 15 },
  { id: 'al-anfal', surahNumber: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', nameTransliteration: 'Al-Anfal', meaning: 'The Spoils of War', revelationType: 'Medinan', ayahCount: 75, wordCount: 1243, difficulty: 'intermediate', order: 8, juz: 9, hizb: 18 },
  { id: 'at-tawbah', surahNumber: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', nameTransliteration: 'At-Tawbah', meaning: 'The Repentance', revelationType: 'Medinan', ayahCount: 129, wordCount: 2506, difficulty: 'advanced', order: 9, juz: 10, hizb: 19 },
  { id: 'yunus', surahNumber: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', nameTransliteration: 'Yunus', meaning: 'Jonah', revelationType: 'Meccan', ayahCount: 109, wordCount: 1844, difficulty: 'intermediate', order: 10, juz: 11, hizb: 21 },
  { id: 'hud', surahNumber: 11, nameArabic: 'هود', nameEnglish: 'Hud', nameTransliteration: 'Hud', meaning: 'Hud', revelationType: 'Meccan', ayahCount: 123, wordCount: 1947, difficulty: 'intermediate', order: 11, juz: 11, hizb: 22 },
  { id: 'yusuf', surahNumber: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', nameTransliteration: 'Yusuf', meaning: 'Joseph', revelationType: 'Meccan', ayahCount: 111, wordCount: 1795, difficulty: 'intermediate', order: 12, juz: 12, hizb: 24 },
  { id: 'ar-rad', surahNumber: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Ra\'d', nameTransliteration: 'Ar-Ra\'d', meaning: 'The Thunder', revelationType: 'Medinan', ayahCount: 43, wordCount: 854, difficulty: 'intermediate', order: 13, juz: 13, hizb: 25 },
  { id: 'ibrahim', surahNumber: 14, nameArabic: 'إبراهيم', nameEnglish: 'Ibrahim', nameTransliteration: 'Ibrahim', meaning: 'Abraham', revelationType: 'Meccan', ayahCount: 52, wordCount: 830, difficulty: 'intermediate', order: 14, juz: 13, hizb: 26 },
  { id: 'al-hijr', surahNumber: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', nameTransliteration: 'Al-Hijr', meaning: 'The Rocky Tract', revelationType: 'Meccan', ayahCount: 99, wordCount: 658, difficulty: 'intermediate', order: 15, juz: 14, hizb: 27 },
  { id: 'an-nahl', surahNumber: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', nameTransliteration: 'An-Nahl', meaning: 'The Bee', revelationType: 'Meccan', ayahCount: 128, wordCount: 1845, difficulty: 'intermediate', order: 16, juz: 14, hizb: 27 },
  { id: 'al-isra', surahNumber: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', nameTransliteration: 'Al-Isra', meaning: 'The Night Journey', revelationType: 'Meccan', ayahCount: 111, wordCount: 1560, difficulty: 'intermediate', order: 17, juz: 15, hizb: 29 },
  { id: 'al-kahf', surahNumber: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', nameTransliteration: 'Al-Kahf', meaning: 'The Cave', revelationType: 'Meccan', ayahCount: 110, wordCount: 1583, difficulty: 'intermediate', order: 18, juz: 15, hizb: 30 },
  { id: 'maryam', surahNumber: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', nameTransliteration: 'Maryam', meaning: 'Mary', revelationType: 'Meccan', ayahCount: 98, wordCount: 972, difficulty: 'intermediate', order: 19, juz: 16, hizb: 31 },
  { id: 'ta-ha', surahNumber: 20, nameArabic: 'طه', nameEnglish: 'Ta-Ha', nameTransliteration: 'Ta-Ha', meaning: 'Ta-Ha', revelationType: 'Meccan', ayahCount: 135, wordCount: 1354, difficulty: 'intermediate', order: 20, juz: 16, hizb: 31 },
  { id: 'al-anbiya', surahNumber: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', nameTransliteration: 'Al-Anbiya', meaning: 'The Prophets', revelationType: 'Meccan', ayahCount: 112, wordCount: 1174, difficulty: 'intermediate', order: 21, juz: 17, hizb: 33 },
  { id: 'al-hajj', surahNumber: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', nameTransliteration: 'Al-Hajj', meaning: 'The Pilgrimage', revelationType: 'Medinan', ayahCount: 78, wordCount: 1279, difficulty: 'intermediate', order: 22, juz: 17, hizb: 34 },
  { id: 'al-muminun', surahNumber: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Mu\'minun', nameTransliteration: 'Al-Mu\'minun', meaning: 'The Believers', revelationType: 'Meccan', ayahCount: 118, wordCount: 1055, difficulty: 'intermediate', order: 23, juz: 18, hizb: 35 },
  { id: 'an-nur', surahNumber: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', nameTransliteration: 'An-Nur', meaning: 'The Light', revelationType: 'Medinan', ayahCount: 64, wordCount: 1320, difficulty: 'intermediate', order: 24, juz: 18, hizb: 35 },
  { id: 'al-furqan', surahNumber: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', nameTransliteration: 'Al-Furqan', meaning: 'The Criterion', revelationType: 'Meccan', ayahCount: 77, wordCount: 896, difficulty: 'intermediate', order: 25, juz: 18, hizb: 36 },
  { id: 'ash-shuara', surahNumber: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shu\'ara', nameTransliteration: 'Ash-Shu\'ara', meaning: 'The Poets', revelationType: 'Meccan', ayahCount: 227, wordCount: 1322, difficulty: 'intermediate', order: 26, juz: 19, hizb: 37 },
  { id: 'an-naml', surahNumber: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', nameTransliteration: 'An-Naml', meaning: 'The Ant', revelationType: 'Meccan', ayahCount: 93, wordCount: 1165, difficulty: 'intermediate', order: 27, juz: 19, hizb: 38 },
  { id: 'al-qasas', surahNumber: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', nameTransliteration: 'Al-Qasas', meaning: 'The Stories', revelationType: 'Meccan', ayahCount: 88, wordCount: 1441, difficulty: 'intermediate', order: 28, juz: 20, hizb: 39 },
  { id: 'al-ankabut', surahNumber: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-Ankabut', nameTransliteration: 'Al-Ankabut', meaning: 'The Spider', revelationType: 'Meccan', ayahCount: 69, wordCount: 980, difficulty: 'intermediate', order: 29, juz: 20, hizb: 40 },
  { id: 'ar-rum', surahNumber: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', nameTransliteration: 'Ar-Rum', meaning: 'The Romans', revelationType: 'Meccan', ayahCount: 60, wordCount: 819, difficulty: 'intermediate', order: 30, juz: 21, hizb: 41 },
  { id: 'luqman', surahNumber: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', nameTransliteration: 'Luqman', meaning: 'Luqman', revelationType: 'Meccan', ayahCount: 34, wordCount: 550, difficulty: 'beginner', order: 31, juz: 21, hizb: 41 },
  { id: 'as-sajdah', surahNumber: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajdah', nameTransliteration: 'As-Sajdah', meaning: 'The Prostration', revelationType: 'Meccan', ayahCount: 30, wordCount: 374, difficulty: 'beginner', order: 32, juz: 21, hizb: 42 },
  { id: 'al-ahzab', surahNumber: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', nameTransliteration: 'Al-Ahzab', meaning: 'The Combined Forces', revelationType: 'Medinan', ayahCount: 73, wordCount: 1303, difficulty: 'intermediate', order: 33, juz: 21, hizb: 42 },
  { id: 'saba', surahNumber: 34, nameArabic: 'سبأ', nameEnglish: 'Saba', nameTransliteration: 'Saba', meaning: 'Sheba', revelationType: 'Meccan', ayahCount: 54, wordCount: 884, difficulty: 'intermediate', order: 34, juz: 22, hizb: 43 },
  { id: 'fatir', surahNumber: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', nameTransliteration: 'Fatir', meaning: 'The Originator', revelationType: 'Meccan', ayahCount: 45, wordCount: 780, difficulty: 'intermediate', order: 35, juz: 22, hizb: 44 },
  { id: 'ya-sin', surahNumber: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', nameTransliteration: 'Ya-Sin', meaning: 'Ya-Sin', revelationType: 'Meccan', ayahCount: 83, wordCount: 733, difficulty: 'intermediate', order: 36, juz: 22, hizb: 44 },
  { id: 'as-saffat', surahNumber: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', nameTransliteration: 'As-Saffat', meaning: 'Those Who Set The Ranks', revelationType: 'Meccan', ayahCount: 182, wordCount: 866, difficulty: 'intermediate', order: 37, juz: 23, hizb: 45 },
  { id: 'sad', surahNumber: 38, nameArabic: 'ص', nameEnglish: 'Sad', nameTransliteration: 'Sad', meaning: 'Sad', revelationType: 'Meccan', ayahCount: 88, wordCount: 735, difficulty: 'intermediate', order: 38, juz: 23, hizb: 46 },
  { id: 'az-zumar', surahNumber: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', nameTransliteration: 'Az-Zumar', meaning: 'The Troops', revelationType: 'Meccan', ayahCount: 75, wordCount: 1177, difficulty: 'intermediate', order: 39, juz: 23, hizb: 46 },
  { id: 'ghafir', surahNumber: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', nameTransliteration: 'Ghafir', meaning: 'The Forgiver', revelationType: 'Meccan', ayahCount: 85, wordCount: 1228, difficulty: 'intermediate', order: 40, juz: 24, hizb: 47 },
  { id: 'fussilat', surahNumber: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', nameTransliteration: 'Fussilat', meaning: 'Explained in Detail', revelationType: 'Meccan', ayahCount: 54, wordCount: 796, difficulty: 'intermediate', order: 41, juz: 24, hizb: 48 },
  { id: 'ash-shura', surahNumber: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shura', nameTransliteration: 'Ash-Shura', meaning: 'The Consultation', revelationType: 'Meccan', ayahCount: 53, wordCount: 860, difficulty: 'intermediate', order: 42, juz: 25, hizb: 49 },
  { id: 'az-zukhruf', surahNumber: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', nameTransliteration: 'Az-Zukhruf', meaning: 'The Ornaments of Gold', revelationType: 'Meccan', ayahCount: 89, wordCount: 837, difficulty: 'intermediate', order: 43, juz: 25, hizb: 49 },
  { id: 'ad-dukhan', surahNumber: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', nameTransliteration: 'Ad-Dukhan', meaning: 'The Smoke', revelationType: 'Meccan', ayahCount: 59, wordCount: 346, difficulty: 'beginner', order: 44, juz: 25, hizb: 50 },
  { id: 'al-jathiyah', surahNumber: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiyah', nameTransliteration: 'Al-Jathiyah', meaning: 'The Crouching', revelationType: 'Meccan', ayahCount: 37, wordCount: 488, difficulty: 'beginner', order: 45, juz: 25, hizb: 50 },
  { id: 'al-ahqaf', surahNumber: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', nameTransliteration: 'Al-Ahqaf', meaning: 'The Wind-Curved Sandhills', revelationType: 'Meccan', ayahCount: 35, wordCount: 646, difficulty: 'beginner', order: 46, juz: 26, hizb: 51 },
  { id: 'muhammad', surahNumber: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', nameTransliteration: 'Muhammad', meaning: 'Muhammad', revelationType: 'Medinan', ayahCount: 38, wordCount: 542, difficulty: 'beginner', order: 47, juz: 26, hizb: 51 },
  { id: 'al-fath', surahNumber: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', nameTransliteration: 'Al-Fath', meaning: 'The Victory', revelationType: 'Medinan', ayahCount: 29, wordCount: 560, difficulty: 'beginner', order: 48, juz: 26, hizb: 51 },
  { id: 'al-hujurat', surahNumber: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', nameTransliteration: 'Al-Hujurat', meaning: 'The Rooms', revelationType: 'Medinan', ayahCount: 18, wordCount: 353, difficulty: 'beginner', order: 49, juz: 26, hizb: 52 },
  { id: 'qaf', surahNumber: 50, nameArabic: 'ق', nameEnglish: 'Qaf', nameTransliteration: 'Qaf', meaning: 'Qaf', revelationType: 'Meccan', ayahCount: 45, wordCount: 373, difficulty: 'beginner', order: 50, juz: 26, hizb: 52 },
  { id: 'adh-dhariyat', surahNumber: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', nameTransliteration: 'Adh-Dhariyat', meaning: 'The Winnowing Winds', revelationType: 'Meccan', ayahCount: 60, wordCount: 360, difficulty: 'beginner', order: 51, juz: 26, hizb: 52 },
  { id: 'at-tur', surahNumber: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', nameTransliteration: 'At-Tur', meaning: 'The Mount', revelationType: 'Meccan', ayahCount: 49, wordCount: 312, difficulty: 'beginner', order: 52, juz: 27, hizb: 53 },
  { id: 'an-najm', surahNumber: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', nameTransliteration: 'An-Najm', meaning: 'The Star', revelationType: 'Meccan', ayahCount: 62, wordCount: 360, difficulty: 'beginner', order: 53, juz: 27, hizb: 53 },
  { id: 'al-qamar', surahNumber: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', nameTransliteration: 'Al-Qamar', meaning: 'The Moon', revelationType: 'Meccan', ayahCount: 55, wordCount: 342, difficulty: 'beginner', order: 54, juz: 27, hizb: 53 },
  { id: 'ar-rahman', surahNumber: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', nameTransliteration: 'Ar-Rahman', meaning: 'The Beneficent', revelationType: 'Medinan', ayahCount: 78, wordCount: 352, difficulty: 'beginner', order: 55, juz: 27, hizb: 54 },
  { id: 'al-waqiah', surahNumber: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqi\'ah', nameTransliteration: 'Al-Waqi\'ah', meaning: 'The Inevitable', revelationType: 'Meccan', ayahCount: 96, wordCount: 379, difficulty: 'beginner', order: 56, juz: 27, hizb: 54 },
  { id: 'al-hadid', surahNumber: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', nameTransliteration: 'Al-Hadid', meaning: 'The Iron', revelationType: 'Medinan', ayahCount: 29, wordCount: 575, difficulty: 'beginner', order: 57, juz: 27, hizb: 54 },
  { id: 'al-mujadila', surahNumber: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', nameTransliteration: 'Al-Mujadila', meaning: 'The Pleading Woman', revelationType: 'Medinan', ayahCount: 22, wordCount: 475, difficulty: 'beginner', order: 58, juz: 28, hizb: 55 },
  { id: 'al-hashr', surahNumber: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', nameTransliteration: 'Al-Hashr', meaning: 'The Exile', revelationType: 'Medinan', ayahCount: 24, wordCount: 447, difficulty: 'beginner', order: 59, juz: 28, hizb: 55 },
  { id: 'al-mumtahanah', surahNumber: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahanah', nameTransliteration: 'Al-Mumtahanah', meaning: 'She That Is Examined', revelationType: 'Medinan', ayahCount: 13, wordCount: 352, difficulty: 'beginner', order: 60, juz: 28, hizb: 55 },
  { id: 'as-saf', surahNumber: 61, nameArabic: 'الصف', nameEnglish: 'As-Saf', nameTransliteration: 'As-Saf', meaning: 'The Ranks', revelationType: 'Medinan', ayahCount: 14, wordCount: 226, difficulty: 'beginner', order: 61, juz: 28, hizb: 56 },
  { id: 'al-jumuah', surahNumber: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumu\'ah', nameTransliteration: 'Al-Jumu\'ah', meaning: 'Friday', revelationType: 'Medinan', ayahCount: 11, wordCount: 177, difficulty: 'beginner', order: 62, juz: 28, hizb: 56 },
  { id: 'al-munafiqun', surahNumber: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', nameTransliteration: 'Al-Munafiqun', meaning: 'The Hypocrites', revelationType: 'Medinan', ayahCount: 11, wordCount: 181, difficulty: 'beginner', order: 63, juz: 28, hizb: 56 },
  { id: 'at-taghabun', surahNumber: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', nameTransliteration: 'At-Taghabun', meaning: 'The Mutual Disillusion', revelationType: 'Medinan', ayahCount: 18, wordCount: 242, difficulty: 'beginner', order: 64, juz: 28, hizb: 56 },
  { id: 'at-talaq', surahNumber: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', nameTransliteration: 'At-Talaq', meaning: 'The Divorce', revelationType: 'Medinan', ayahCount: 12, wordCount: 289, difficulty: 'beginner', order: 65, juz: 28, hizb: 56 },
  { id: 'at-tahrim', surahNumber: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', nameTransliteration: 'At-Tahrim', meaning: 'The Prohibition', revelationType: 'Medinan', ayahCount: 12, wordCount: 254, difficulty: 'beginner', order: 66, juz: 28, hizb: 56 },
  { id: 'al-mulk', surahNumber: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', nameTransliteration: 'Al-Mulk', meaning: 'The Sovereignty', revelationType: 'Meccan', ayahCount: 30, wordCount: 333, difficulty: 'beginner', order: 67, juz: 29, hizb: 57 },
  { id: 'al-qalam', surahNumber: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', nameTransliteration: 'Al-Qalam', meaning: 'The Pen', revelationType: 'Meccan', ayahCount: 52, wordCount: 301, difficulty: 'beginner', order: 68, juz: 29, hizb: 57 },
  { id: 'al-haqqah', surahNumber: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', nameTransliteration: 'Al-Haqqah', meaning: 'The Reality', revelationType: 'Meccan', ayahCount: 52, wordCount: 261, difficulty: 'beginner', order: 69, juz: 29, hizb: 57 },
  { id: 'al-maarij', surahNumber: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Ma\'arij', nameTransliteration: 'Al-Ma\'arij', meaning: 'The Ascending Stairways', revelationType: 'Meccan', ayahCount: 44, wordCount: 217, difficulty: 'beginner', order: 70, juz: 29, hizb: 57 },
  { id: 'nuh', surahNumber: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', nameTransliteration: 'Nuh', meaning: 'Noah', revelationType: 'Meccan', ayahCount: 28, wordCount: 227, difficulty: 'beginner', order: 71, juz: 29, hizb: 58 },
  { id: 'al-jinn', surahNumber: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', nameTransliteration: 'Al-Jinn', meaning: 'The Jinn', revelationType: 'Meccan', ayahCount: 28, wordCount: 286, difficulty: 'beginner', order: 72, juz: 29, hizb: 58 },
  { id: 'al-muzzammil', surahNumber: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', nameTransliteration: 'Al-Muzzammil', meaning: 'The Enshrouded One', revelationType: 'Meccan', ayahCount: 20, wordCount: 200, difficulty: 'beginner', order: 73, juz: 29, hizb: 58 },
  { id: 'al-muddaththir', surahNumber: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', nameTransliteration: 'Al-Muddaththir', meaning: 'The Cloaked One', revelationType: 'Meccan', ayahCount: 56, wordCount: 256, difficulty: 'beginner', order: 74, juz: 29, hizb: 58 },
  { id: 'al-qiyamah', surahNumber: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', nameTransliteration: 'Al-Qiyamah', meaning: 'The Resurrection', revelationType: 'Meccan', ayahCount: 40, wordCount: 164, difficulty: 'beginner', order: 75, juz: 29, hizb: 58 },
  { id: 'al-insan', surahNumber: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', nameTransliteration: 'Al-Insan', meaning: 'Man', revelationType: 'Medinan', ayahCount: 31, wordCount: 243, difficulty: 'beginner', order: 76, juz: 29, hizb: 58 },
  { id: 'al-mursalat', surahNumber: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', nameTransliteration: 'Al-Mursalat', meaning: 'The Emissaries', revelationType: 'Meccan', ayahCount: 50, wordCount: 181, difficulty: 'beginner', order: 77, juz: 29, hizb: 58 },
  // Juz 30 (Juz Amma)
  { id: 'an-naba', surahNumber: 78, nameArabic: 'النبأ', nameEnglish: 'An-Naba', nameTransliteration: 'An-Naba', meaning: 'The Tidings', revelationType: 'Meccan', ayahCount: 40, wordCount: 174, difficulty: 'beginner', order: 78, juz: 30, hizb: 59 },
  { id: 'an-naziat', surahNumber: 79, nameArabic: 'النازعات', nameEnglish: 'An-Nazi\'at', nameTransliteration: 'An-Nazi\'at', meaning: 'Those Who Drag Forth', revelationType: 'Meccan', ayahCount: 46, wordCount: 179, difficulty: 'beginner', order: 79, juz: 30, hizb: 59 },
  { id: 'abasa', surahNumber: 80, nameArabic: 'عبس', nameEnglish: 'Abasa', nameTransliteration: 'Abasa', meaning: 'He Frowned', revelationType: 'Meccan', ayahCount: 42, wordCount: 133, difficulty: 'beginner', order: 80, juz: 30, hizb: 59 },
  { id: 'at-takwir', surahNumber: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', nameTransliteration: 'At-Takwir', meaning: 'The Overthrowing', revelationType: 'Meccan', ayahCount: 29, wordCount: 104, difficulty: 'beginner', order: 81, juz: 30, hizb: 59 },
  { id: 'al-infitar', surahNumber: 82, nameArabic: 'الانفطار', nameEnglish: 'Al-Infitar', nameTransliteration: 'Al-Infitar', meaning: 'The Cleaving', revelationType: 'Meccan', ayahCount: 19, wordCount: 81, difficulty: 'beginner', order: 82, juz: 30, hizb: 59 },
  { id: 'al-mutaffifin', surahNumber: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', nameTransliteration: 'Al-Mutaffifin', meaning: 'The Defrauding', revelationType: 'Meccan', ayahCount: 36, wordCount: 169, difficulty: 'beginner', order: 83, juz: 30, hizb: 59 },
  { id: 'al-inshiqaq', surahNumber: 84, nameArabic: 'الانشقاق', nameEnglish: 'Al-Inshiqaq', nameTransliteration: 'Al-Inshiqaq', meaning: 'The Sundering', revelationType: 'Meccan', ayahCount: 25, wordCount: 108, difficulty: 'beginner', order: 84, juz: 30, hizb: 59 },
  { id: 'al-buruj', surahNumber: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', nameTransliteration: 'Al-Buruj', meaning: 'The Mansions of the Stars', revelationType: 'Meccan', ayahCount: 22, wordCount: 109, difficulty: 'beginner', order: 85, juz: 30, hizb: 59 },
  { id: 'at-tariq', surahNumber: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', nameTransliteration: 'At-Tariq', meaning: 'The Night-Comer', revelationType: 'Meccan', ayahCount: 17, wordCount: 61, difficulty: 'beginner', order: 86, juz: 30, hizb: 59 },
  { id: 'al-ala', surahNumber: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-A\'la', nameTransliteration: 'Al-A\'la', meaning: 'The Most High', revelationType: 'Meccan', ayahCount: 19, wordCount: 72, difficulty: 'beginner', order: 87, juz: 30, hizb: 60 },
  { id: 'al-ghashiyah', surahNumber: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', nameTransliteration: 'Al-Ghashiyah', meaning: 'The Overwhelming', revelationType: 'Meccan', ayahCount: 26, wordCount: 92, difficulty: 'beginner', order: 88, juz: 30, hizb: 60 },
  { id: 'al-fajr', surahNumber: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', nameTransliteration: 'Al-Fajr', meaning: 'The Dawn', revelationType: 'Meccan', ayahCount: 30, wordCount: 139, difficulty: 'beginner', order: 89, juz: 30, hizb: 60 },
  { id: 'al-balad', surahNumber: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', nameTransliteration: 'Al-Balad', meaning: 'The City', revelationType: 'Meccan', ayahCount: 20, wordCount: 82, difficulty: 'beginner', order: 90, juz: 30, hizb: 60 },
  { id: 'ash-shams', surahNumber: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', nameTransliteration: 'Ash-Shams', meaning: 'The Sun', revelationType: 'Meccan', ayahCount: 15, wordCount: 54, difficulty: 'beginner', order: 91, juz: 30, hizb: 60 },
  { id: 'al-layl', surahNumber: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', nameTransliteration: 'Al-Layl', meaning: 'The Night', revelationType: 'Meccan', ayahCount: 21, wordCount: 71, difficulty: 'beginner', order: 92, juz: 30, hizb: 60 },
  { id: 'ad-duha', surahNumber: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duha', nameTransliteration: 'Ad-Duha', meaning: 'The Morning Hours', revelationType: 'Meccan', ayahCount: 11, wordCount: 40, difficulty: 'beginner', order: 93, juz: 30, hizb: 60 },
  { id: 'ash-sharh', surahNumber: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', nameTransliteration: 'Ash-Sharh', meaning: 'The Relief', revelationType: 'Meccan', ayahCount: 8, wordCount: 27, difficulty: 'beginner', order: 94, juz: 30, hizb: 60 },
  { id: 'at-tin', surahNumber: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', nameTransliteration: 'At-Tin', meaning: 'The Fig', revelationType: 'Meccan', ayahCount: 8, wordCount: 34, difficulty: 'beginner', order: 95, juz: 30, hizb: 60 },
  { id: 'al-alaq', surahNumber: 96, nameArabic: 'العلق', nameEnglish: 'Al-Alaq', nameTransliteration: 'Al-Alaq', meaning: 'The Clot', revelationType: 'Meccan', ayahCount: 19, wordCount: 72, difficulty: 'beginner', order: 96, juz: 30, hizb: 60 },
  { id: 'al-qadr', surahNumber: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', nameTransliteration: 'Al-Qadr', meaning: 'The Power', revelationType: 'Meccan', ayahCount: 5, wordCount: 30, difficulty: 'beginner', order: 97, juz: 30, hizb: 60 },
  { id: 'al-bayyinah', surahNumber: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyinah', nameTransliteration: 'Al-Bayyinah', meaning: 'The Clear Proof', revelationType: 'Medinan', ayahCount: 8, wordCount: 94, difficulty: 'beginner', order: 98, juz: 30, hizb: 60 },
  { id: 'az-zalzalah', surahNumber: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', nameTransliteration: 'Az-Zalzalah', meaning: 'The Earthquake', revelationType: 'Medinan', ayahCount: 8, wordCount: 36, difficulty: 'beginner', order: 99, juz: 30, hizb: 60 },
  { id: 'al-adiyat', surahNumber: 100, nameArabic: 'العاديات', nameEnglish: 'Al-Adiyat', nameTransliteration: 'Al-Adiyat', meaning: 'The Courser', revelationType: 'Meccan', ayahCount: 11, wordCount: 40, difficulty: 'beginner', order: 100, juz: 30, hizb: 60 },
  { id: 'al-qariah', surahNumber: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qari\'ah', nameTransliteration: 'Al-Qari\'ah', meaning: 'The Calamity', revelationType: 'Meccan', ayahCount: 11, wordCount: 36, difficulty: 'beginner', order: 101, juz: 30, hizb: 60 },
  { id: 'at-takathur', surahNumber: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', nameTransliteration: 'At-Takathur', meaning: 'The Rivalry in World Increase', revelationType: 'Meccan', ayahCount: 8, wordCount: 28, difficulty: 'beginner', order: 102, juz: 30, hizb: 60 },
  { id: 'al-asr', surahNumber: 103, nameArabic: 'العصر', nameEnglish: 'Al-Asr', nameTransliteration: 'Al-Asr', meaning: 'The Declining Day', revelationType: 'Meccan', ayahCount: 3, wordCount: 14, difficulty: 'beginner', order: 103, juz: 30, hizb: 60 },
  { id: 'al-humazah', surahNumber: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', nameTransliteration: 'Al-Humazah', meaning: 'The Traducer', revelationType: 'Meccan', ayahCount: 9, wordCount: 33, difficulty: 'beginner', order: 104, juz: 30, hizb: 60 },
  { id: 'al-fil', surahNumber: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', nameTransliteration: 'Al-Fil', meaning: 'The Elephant', revelationType: 'Meccan', ayahCount: 5, wordCount: 23, difficulty: 'beginner', order: 105, juz: 30, hizb: 60 },
  { id: 'quraysh', surahNumber: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', nameTransliteration: 'Quraysh', meaning: 'Quraysh', revelationType: 'Meccan', ayahCount: 4, wordCount: 17, difficulty: 'beginner', order: 106, juz: 30, hizb: 60 },
  { id: 'al-maun', surahNumber: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Ma\'un', nameTransliteration: 'Al-Ma\'un', meaning: 'The Small Kindnesses', revelationType: 'Meccan', ayahCount: 7, wordCount: 25, difficulty: 'beginner', order: 107, juz: 30, hizb: 60 },
  { id: 'al-kawthar', surahNumber: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', nameTransliteration: 'Al-Kawthar', meaning: 'The Abundance', revelationType: 'Meccan', ayahCount: 3, wordCount: 10, difficulty: 'beginner', order: 108, juz: 30, hizb: 60 },
  { id: 'al-kafirun', surahNumber: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', nameTransliteration: 'Al-Kafirun', meaning: 'The Disbelievers', revelationType: 'Meccan', ayahCount: 6, wordCount: 26, difficulty: 'beginner', order: 109, juz: 30, hizb: 60 },
  { id: 'an-nasr', surahNumber: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', nameTransliteration: 'An-Nasr', meaning: 'The Divine Support', revelationType: 'Medinan', ayahCount: 3, wordCount: 19, difficulty: 'beginner', order: 110, juz: 30, hizb: 60 },
  { id: 'al-masad', surahNumber: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', nameTransliteration: 'Al-Masad', meaning: 'The Palm Fiber', revelationType: 'Meccan', ayahCount: 5, wordCount: 23, difficulty: 'beginner', order: 111, juz: 30, hizb: 60 },
  { id: 'al-ikhlas', surahNumber: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', nameTransliteration: 'Al-Ikhlas', meaning: 'The Sincerity', revelationType: 'Meccan', ayahCount: 4, wordCount: 15, difficulty: 'beginner', order: 112, juz: 30, hizb: 60 },
  { id: 'al-falaq', surahNumber: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', nameTransliteration: 'Al-Falaq', meaning: 'The Daybreak', revelationType: 'Meccan', ayahCount: 5, wordCount: 23, difficulty: 'beginner', order: 113, juz: 30, hizb: 60 },
  { id: 'an-nas', surahNumber: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', nameTransliteration: 'An-Nas', meaning: 'Mankind', revelationType: 'Meccan', ayahCount: 6, wordCount: 20, difficulty: 'beginner', order: 114, juz: 30, hizb: 60 },
];

// Helper functions
export const getSurahById = (id: string): Surah | undefined => {
  return SURAHS.find((s) => s.id === id);
};

export const getSurahByNumber = (number: number): Surah | undefined => {
  return SURAHS.find((s) => s.surahNumber === number);
};

export const getSurahsByDifficulty = (difficulty: string): Surah[] => {
  return SURAHS.filter((s) => s.difficulty === difficulty);
};

export const getSurahsByJuz = (juz: number): Surah[] => {
  return SURAHS.filter((s) => s.juz === juz);
};

export const getAllSurahs = (): Surah[] => {
  return [...SURAHS].sort((a, b) => a.surahNumber - b.surahNumber);
};

export const getBeginnerSurahs = (): Surah[] => {
  return SURAHS.filter((s) => s.difficulty === 'beginner');
};

export const getJuzAmmaSurahs = (): Surah[] => {
  return SURAHS.filter((s) => s.juz === 30);
};
