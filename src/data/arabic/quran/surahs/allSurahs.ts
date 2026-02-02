// Master Quran Surahs Index
// Auto-generated - DO NOT EDIT MANUALLY
// Organized by Juz for lazy loading

import { Ayah } from '../../../../types/quran';

import JUZ_1_SURAHS from './juz1';
import JUZ_2_SURAHS from './juz2';
import JUZ_3_SURAHS from './juz3';
import JUZ_4_SURAHS from './juz4';
import JUZ_5_SURAHS from './juz5';
import JUZ_6_SURAHS from './juz6';
import JUZ_7_SURAHS from './juz7';
import JUZ_8_SURAHS from './juz8';
import JUZ_9_SURAHS from './juz9';
import JUZ_10_SURAHS from './juz10';
import JUZ_11_SURAHS from './juz11';
import JUZ_12_SURAHS from './juz12';
import JUZ_13_SURAHS from './juz13';
import JUZ_14_SURAHS from './juz14';
import JUZ_15_SURAHS from './juz15';
import JUZ_16_SURAHS from './juz16';
import JUZ_17_SURAHS from './juz17';
import JUZ_18_SURAHS from './juz18';
import JUZ_19_SURAHS from './juz19';
import JUZ_20_SURAHS from './juz20';
import JUZ_21_SURAHS from './juz21';
import JUZ_22_SURAHS from './juz22';
import JUZ_23_SURAHS from './juz23';
import JUZ_24_SURAHS from './juz24';
import JUZ_25_SURAHS from './juz25';
import JUZ_26_SURAHS from './juz26';
import JUZ_27_SURAHS from './juz27';
import JUZ_28_SURAHS from './juz28';
import JUZ_29_SURAHS from './juz29';
import JUZ_30_SURAHS from './juz30';

// All surahs organized by Juz
export const QURAN_BY_JUZ: Record<number, Record<string, Ayah[]>> = {
  1: JUZ_1_SURAHS,
  2: JUZ_2_SURAHS,
  3: JUZ_3_SURAHS,
  4: JUZ_4_SURAHS,
  5: JUZ_5_SURAHS,
  6: JUZ_6_SURAHS,
  7: JUZ_7_SURAHS,
  8: JUZ_8_SURAHS,
  9: JUZ_9_SURAHS,
  10: JUZ_10_SURAHS,
  11: JUZ_11_SURAHS,
  12: JUZ_12_SURAHS,
  13: JUZ_13_SURAHS,
  14: JUZ_14_SURAHS,
  15: JUZ_15_SURAHS,
  16: JUZ_16_SURAHS,
  17: JUZ_17_SURAHS,
  18: JUZ_18_SURAHS,
  19: JUZ_19_SURAHS,
  20: JUZ_20_SURAHS,
  21: JUZ_21_SURAHS,
  22: JUZ_22_SURAHS,
  23: JUZ_23_SURAHS,
  24: JUZ_24_SURAHS,
  25: JUZ_25_SURAHS,
  26: JUZ_26_SURAHS,
  27: JUZ_27_SURAHS,
  28: JUZ_28_SURAHS,
  29: JUZ_29_SURAHS,
  30: JUZ_30_SURAHS,
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
