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

export const DUA_CATEGORY_LABELS: Record<DuaCategory, { english: string; arabic: string }> = {
  protection: { english: 'Protection', arabic: 'الحماية' },
  rizq: { english: 'Provision', arabic: 'الرزق' },
  forgiveness: { english: 'Forgiveness', arabic: 'الاستغفار' },
  morning_evening: { english: 'Morning & Evening', arabic: 'أذكار الصباح والمساء' },
  health: { english: 'Health', arabic: 'الصحة' },
  guidance: { english: 'Guidance', arabic: 'الهداية' },
  distress: { english: 'Distress & Relief', arabic: 'الكرب والفرج' },
};

// ============ Hadith Source Types ============

export type HadithCollection =
  | 'bukhari'
  | 'muslim'
  | 'tirmidhi'
  | 'abu_dawud'
  | 'nasai'
  | 'ibn_majah'
  | 'ahmad';

export const HADITH_COLLECTION_NAMES: Record<HadithCollection, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  tirmidhi: 'Jami\' at-Tirmidhi',
  abu_dawud: 'Sunan Abu Dawud',
  nasai: 'Sunan an-Nasa\'i',
  ibn_majah: 'Sunan Ibn Majah',
  ahmad: 'Musnad Ahmad',
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
  titleArabic: string;
  category: DuaCategory;
  arabicText: string;           // Full Arabic with diacritics
  transliteration: string;      // Latin script
  translation: string;          // English meaning
  source: DuaSource;
  occasion?: string;            // When to recite
  virtues?: string;             // Benefits/rewards
  story?: string;               // Narration behind the dua
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
  titleArabic: string;
  category: DuaCategory;
  arabicText: string;
  source: DuaSource;
  order: number;
  isFavorite: boolean;
  isMemorized: boolean;
}

export const TOTAL_DUAS = 50;
