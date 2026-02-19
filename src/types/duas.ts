// Duas (Prayers) Types for Iqra2.0 App
// Types for the Prophetic Duas (الأدعية النبوية) feature

// ============ Dua Category Types ============

export type DuaCategory =
  | 'protection'
  | 'rizq'
  | 'forgiveness'
  | 'morning_evening'
  | 'health'
  | 'guidance'
  | 'distress';

export const DUA_CATEGORY_LABELS: Record<DuaCategory, { english: string; french: string; arabic: string }> = {
  protection: { english: 'Protection', french: 'Protection', arabic: 'الحماية' },
  rizq: { english: 'Provision', french: 'Subsistance', arabic: 'الرزق' },
  forgiveness: { english: 'Forgiveness', french: 'Pardon', arabic: 'الاستغفار' },
  morning_evening: { english: 'Morning & Evening', french: 'Matin & Soir', arabic: 'أذكار الصباح والمساء' },
  health: { english: 'Health', french: 'Santé', arabic: 'الصحة' },
  guidance: { english: 'Guidance', french: 'Guidée', arabic: 'الهداية' },
  distress: { english: 'Distress & Relief', french: 'Détresse & Soulagement', arabic: 'الكرب والفرج' },
};

// ============ Hadith Source Types ============

export type HadithCollection =
  | 'bukhari'
  | 'muslim'
  | 'tirmidhi'
  | 'abu_dawud'
  | 'nasai'
  | 'ibn_majah'
  | 'ahmad'
  | 'malik'
  | 'quran';

export const HADITH_COLLECTION_NAMES: Record<HadithCollection, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  tirmidhi: 'Jami\' at-Tirmidhi',
  abu_dawud: 'Sunan Abu Dawud',
  nasai: 'Sunan an-Nasa\'i',
  ibn_majah: 'Sunan Ibn Majah',
  ahmad: 'Musnad Ahmad',
  malik: 'Muwatta Imam Malik',
  quran: 'Al-Quran Al-Kareem',
};

// ============ Core Dua Types ============

export interface DuaSource {
  collection: HadithCollection;
  hadithNumber: string;
  narrator?: string;
}

export interface Dua {
  id: string;
  titleEnglish: string;
  titleFrench?: string;
  titleArabic: string;
  category: DuaCategory;
  arabicText: string;           // Full Arabic with diacritics
  transliteration: string;      // Latin script
  translation: string;          // English meaning
  translationFr?: string;       // French meaning
  source: DuaSource;
  occasion?: string;            // When to recite
  occasionFr?: string;
  virtues?: string;             // Benefits/rewards
  virtuesFr?: string;
  story?: string;               // Narration behind the dua
  storyFr?: string;
  order: number;
}

// ============ Progress Types ============

export interface DuasProgress {
  favorites: string[];          // IDs of favorited duas
  memorized: string[];          // IDs of memorized duas
  lastViewedDuaId?: string;
  lastViewedDate?: string;
}

// ============ Display Types ============

export interface DuaListItem {
  id: string;
  titleEnglish: string;
  titleFrench?: string;
  titleArabic: string;
  category: DuaCategory;
  arabicText: string;
  source: DuaSource;
  order: number;
  isFavorite: boolean;
  isMemorized: boolean;
}

export const TOTAL_DUAS = 70;
