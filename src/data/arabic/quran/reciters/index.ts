// Quran Reciters Data

import { Reciter } from '../../../../types/quran';

export const RECITERS: Reciter[] = [
  {
    id: 'mishary-alafasy',
    nameArabic: 'مشاري راشد العفاسي',
    nameEnglish: 'Mishary Rashid Alafasy',
    style: 'murattal',
    audioBaseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy',
    hasWordTimestamps: false,
  },
  {
    id: 'abdul-basit',
    nameArabic: 'عبد الباسط عبد الصمد',
    nameEnglish: 'Abdul Basit Abdul Samad',
    style: 'mujawwad',
    audioBaseUrl: 'https://cdn.islamic.network/quran/audio/64/ar.abdulbasitmurattal',
    hasWordTimestamps: false,
  },
  {
    id: 'mahmoud-khalil',
    nameArabic: 'محمود خليل الحصري',
    nameEnglish: 'Mahmoud Khalil Al-Husary',
    style: 'murattal',
    audioBaseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.husary',
    hasWordTimestamps: false,
  },
  {
    id: 'minshawi',
    nameArabic: 'محمد صديق المنشاوي',
    nameEnglish: 'Mohamed Siddiq Al-Minshawi',
    style: 'murattal',
    audioBaseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.minshawi',
    hasWordTimestamps: false,
  },
];

export const DEFAULT_RECITER_ID = 'mishary-alafasy';

export const getReciterById = (id: string): Reciter | undefined => {
  return RECITERS.find((r) => r.id === id);
};

export const getDefaultReciter = (): Reciter => {
  return RECITERS.find((r) => r.id === DEFAULT_RECITER_ID) || RECITERS[0];
};

// Helper to construct audio URL for an ayah
export const getAyahAudioUrl = (reciterId: string, surahNumber: number, ayahNumber: number): string => {
  const reciter = getReciterById(reciterId);
  if (!reciter) {
    return '';
  }
  // Format: baseUrl/surahNumber:ayahNumber (e.g., /1:1 for Al-Fatiha verse 1)
  const ayahId = surahNumber * 1000 + ayahNumber; // Unique ayah ID across Quran
  return `${reciter.audioBaseUrl}/${ayahId}.mp3`;
};
