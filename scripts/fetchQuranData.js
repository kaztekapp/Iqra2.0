#!/usr/bin/env node

/**
 * Script to fetch all 114 Quran surahs from Quran.com API
 * and save them as static TypeScript files organized by Juz
 *
 * Usage: node scripts/fetchQuranData.js
 */

const fs = require('fs');
const path = require('path');

const QURAN_API_BASE = 'https://api.quran.com/api/v4';

// Juz to Surah mapping (which surahs belong to which juz)
const JUZ_MAPPING = {
  1: [1, 2], // Al-Fatiha, Al-Baqarah (partial)
  2: [2], // Al-Baqarah (continued)
  3: [2, 3], // Al-Baqarah (end), Al-Imran (partial)
  4: [3, 4], // Al-Imran (end), An-Nisa (partial)
  5: [4], // An-Nisa (continued)
  6: [4, 5], // An-Nisa (end), Al-Ma'idah (partial)
  7: [5, 6], // Al-Ma'idah (end), Al-An'am (partial)
  8: [6, 7], // Al-An'am (end), Al-A'raf (partial)
  9: [7, 8], // Al-A'raf (end), Al-Anfal (partial)
  10: [8, 9], // Al-Anfal (end), At-Tawbah (partial)
  11: [9, 10, 11], // At-Tawbah (end), Yunus, Hud (partial)
  12: [11, 12], // Hud (end), Yusuf
  13: [12, 13, 14], // Yusuf (end), Ar-Ra'd, Ibrahim
  14: [15, 16], // Al-Hijr, An-Nahl (partial)
  15: [17, 18], // Al-Isra, Al-Kahf (partial)
  16: [18, 19, 20], // Al-Kahf (end), Maryam, Ta-Ha (partial)
  17: [21, 22], // Al-Anbiya, Al-Hajj (partial)
  18: [23, 24, 25], // Al-Mu'minun, An-Nur, Al-Furqan (partial)
  19: [25, 26, 27], // Al-Furqan (end), Ash-Shu'ara, An-Naml (partial)
  20: [27, 28, 29], // An-Naml (end), Al-Qasas, Al-Ankabut (partial)
  21: [29, 30, 31, 32, 33], // Al-Ankabut (end), Ar-Rum, Luqman, As-Sajdah, Al-Ahzab (partial)
  22: [33, 34, 35, 36], // Al-Ahzab (end), Saba, Fatir, Ya-Sin (partial)
  23: [36, 37, 38, 39], // Ya-Sin (end), As-Saffat, Sad, Az-Zumar (partial)
  24: [39, 40, 41], // Az-Zumar (end), Ghafir, Fussilat (partial)
  25: [41, 42, 43, 44, 45], // Fussilat (end), Ash-Shura, Az-Zukhruf, Ad-Dukhan, Al-Jathiyah
  26: [46, 47, 48, 49, 50, 51], // Al-Ahqaf through Adh-Dhariyat
  27: [51, 52, 53, 54, 55, 56, 57], // Adh-Dhariyat (end) through Al-Hadid
  28: [58, 59, 60, 61, 62, 63, 64, 65, 66], // Al-Mujadila through At-Tahrim
  29: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77], // Al-Mulk through Al-Mursalat
  30: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114], // An-Naba through An-Nas
};

// Surah metadata (names, meanings, etc.)
const SURAH_INFO = {};

// Helper to create surah ID from name
function createSurahId(nameEnglish) {
  return nameEnglish
    .toLowerCase()
    .replace(/^al-/, 'al-')
    .replace(/^an-/, 'an-')
    .replace(/^at-/, 'at-')
    .replace(/^ar-/, 'ar-')
    .replace(/^as-/, 'as-')
    .replace(/^ad-/, 'ad-')
    .replace(/^ash-/, 'ash-')
    .replace(/^az-/, 'az-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fetch with retry
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`  Retry ${i + 1}/${retries} for ${url}`);
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

// Fetch surah metadata
async function fetchSurahMetadata() {
  console.log('Fetching surah metadata...');
  const data = await fetchWithRetry(`${QURAN_API_BASE}/chapters`);

  for (const chapter of data.chapters) {
    SURAH_INFO[chapter.id] = {
      surahNumber: chapter.id,
      nameArabic: chapter.name_arabic,
      nameEnglish: chapter.name_simple,
      nameTransliteration: chapter.name_simple,
      meaning: chapter.translated_name.name,
      revelationType: chapter.revelation_place === 'makkah' ? 'Meccan' : 'Medinan',
      ayahCount: chapter.verses_count,
      id: createSurahId(chapter.name_simple),
    };
  }
  console.log(`  Loaded metadata for ${Object.keys(SURAH_INFO).length} surahs`);
}

// Fetch ayahs for a surah
async function fetchSurahAyahs(surahNumber) {
  const info = SURAH_INFO[surahNumber];
  console.log(`Fetching Surah ${surahNumber}: ${info.nameEnglish}...`);

  // Fetch verses with Uthmani text and translations
  const versesData = await fetchWithRetry(
    `${QURAN_API_BASE}/verses/by_chapter/${surahNumber}?language=en&words=true&word_fields=text_uthmani,translation&translations=131&fields=text_uthmani&per_page=300`
  );

  // Also fetch transliterations separately (more reliable)
  let transliterations = {};
  try {
    const transData = await fetchWithRetry(
      `${QURAN_API_BASE}/quran/translations/57?chapter_number=${surahNumber}`
    );
    if (transData.translations) {
      for (const t of transData.translations) {
        transliterations[t.verse_key] = t.text;
      }
    }
  } catch (e) {
    console.log('  Could not fetch transliterations, using word-by-word');
  }

  const ayahs = [];

  for (const verse of versesData.verses) {
    const verseKey = `${surahNumber}:${verse.verse_number}`;

    // Build words array
    const words = (verse.words || [])
      .filter(w => w.char_type_name === 'word') // Exclude "end" markers
      .map((word, idx) => ({
        id: `${info.id}-${verse.verse_number}-${idx + 1}`,
        text: word.text_uthmani || word.text || '',
        transliteration: word.transliteration?.text || word.transliteration || '',
        translation: word.translation?.text || word.translation || '',
        position: idx,
      }));

    // Get translation text safely
    let translationText = '';
    if (verse.translations && verse.translations.length > 0) {
      const rawText = verse.translations[0].text || '';
      translationText = rawText.replace(/<[^>]*>/g, '').replace(/<sup[^>]*>.*?<\/sup>/g, '');
    }

    // Get Uthmani text
    const textUthmani = verse.text_uthmani || '';

    // Create simple text by removing diacritics
    const textSimple = textUthmani.replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g, '');

    const ayah = {
      id: `${info.id}-${verse.verse_number}`,
      surahId: info.id,
      ayahNumber: verse.verse_number,
      textUthmani: textUthmani,
      textSimple: textSimple,
      transliteration: words.map(w => w.transliteration).filter(Boolean).join(' '),
      translation: translationText,
      words,
      tajweedRules: [], // Will be populated later if needed
    };

    ayahs.push(ayah);
  }

  console.log(`  Fetched ${ayahs.length} ayahs`);
  return ayahs;
}

// Generate TypeScript file content for a surah
function generateSurahFile(surahNumber, ayahs) {
  const info = SURAH_INFO[surahNumber];
  const constName = info.nameEnglish.toUpperCase().replace(/[^A-Z]/g, '_') + '_AYAHS';

  return `// Surah ${info.nameEnglish} (${surahNumber}) - ${info.meaning}
// Auto-generated from Quran.com API - DO NOT EDIT MANUALLY

import { Ayah } from '../../../../../types/quran';

export const ${constName}: Ayah[] = ${JSON.stringify(ayahs, null, 2)};

export default ${constName};
`;
}

// Generate index file for a juz
function generateJuzIndex(juzNumber, surahNumbers) {
  const imports = [];
  const exports = [];

  for (const num of surahNumbers) {
    const info = SURAH_INFO[num];
    const constName = info.nameEnglish.toUpperCase().replace(/[^A-Z]/g, '_') + '_AYAHS';
    const fileName = `${String(num).padStart(3, '0')}-${info.id}`;

    imports.push(`import ${constName} from './${fileName}';`);
    exports.push(`  '${info.id}': ${constName},`);
  }

  return `// Juz ${juzNumber} - Surah Index
// Auto-generated - DO NOT EDIT MANUALLY

import { Ayah } from '../../../../types/quran';

${imports.join('\n')}

export const JUZ_${juzNumber}_SURAHS: Record<string, Ayah[]> = {
${exports.join('\n')}
};

export default JUZ_${juzNumber}_SURAHS;
`;
}

// Main function
async function main() {
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'arabic', 'quran', 'surahs');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Fetch metadata first
  await fetchSurahMetadata();

  // Process each juz
  for (let juz = 30; juz >= 1; juz--) { // Start from Juz 30 (shortest surahs)
    const juzDir = path.join(outputDir, `juz${juz}`);

    if (!fs.existsSync(juzDir)) {
      fs.mkdirSync(juzDir, { recursive: true });
    }

    console.log(`\n=== Processing Juz ${juz} ===`);

    // Get unique surahs for this juz (some surahs span multiple juz)
    const surahsInJuz = [...new Set(JUZ_MAPPING[juz])];

    for (const surahNum of surahsInJuz) {
      const info = SURAH_INFO[surahNum];
      const fileName = `${String(surahNum).padStart(3, '0')}-${info.id}.ts`;
      const filePath = path.join(juzDir, fileName);

      // Skip if file already exists (for resuming interrupted downloads)
      if (fs.existsSync(filePath)) {
        console.log(`  Skipping ${info.nameEnglish} (already exists)`);
        continue;
      }

      try {
        const ayahs = await fetchSurahAyahs(surahNum);
        const content = generateSurahFile(surahNum, ayahs);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  Saved ${fileName}`);

        // Rate limiting - be nice to the API
        await new Promise(r => setTimeout(r, 500));
      } catch (error) {
        console.error(`  Error fetching surah ${surahNum}:`, error.message);
      }
    }

    // Generate juz index file
    const indexContent = generateJuzIndex(juz, surahsInJuz);
    fs.writeFileSync(path.join(juzDir, 'index.ts'), indexContent, 'utf8');
    console.log(`  Generated juz${juz}/index.ts`);
  }

  // Generate master index
  console.log('\n=== Generating master index ===');
  generateMasterIndex(outputDir);

  console.log('\nDone! All surahs have been fetched and saved.');
}

function generateMasterIndex(outputDir) {
  const imports = [];
  const juzExports = [];

  for (let juz = 1; juz <= 30; juz++) {
    imports.push(`import JUZ_${juz}_SURAHS from './juz${juz}';`);
    juzExports.push(`  ${juz}: JUZ_${juz}_SURAHS,`);
  }

  const content = `// Master Quran Surahs Index
// Auto-generated - DO NOT EDIT MANUALLY
// Organized by Juz for lazy loading

import { Ayah } from '../../../../types/quran';

${imports.join('\n')}

// All surahs organized by Juz
export const QURAN_BY_JUZ: Record<number, Record<string, Ayah[]>> = {
${juzExports.join('\n')}
};

// Helper to get ayahs for a surah
export function getSurahAyahs(surahId: string): Ayah[] | undefined {
  for (let juz = 1; juz <= 30; juz++) {
    if (QURAN_BY_JUZ[juz][surahId]) {
      return QURAN_BY_JUZ[juz][surahId];
    }
  }
  return undefined;
}

// Lazy load a specific juz
export async function loadJuz(juzNumber: number): Promise<Record<string, Ayah[]>> {
  return QURAN_BY_JUZ[juzNumber];
}

export default QURAN_BY_JUZ;
`;

  fs.writeFileSync(path.join(outputDir, 'allSurahs.ts'), content, 'utf8');
  console.log('Generated allSurahs.ts');
}

main().catch(console.error);
