/** The Bismillah, exactly as Al-Fatihah 1:1 is written in the app's mushaf. */
export const BASMALA = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

/** Verse 1 of every surah but Al-Fatihah (where it is the verse) and At-Tawbah. */
export function opensWithBasmala(surahNumber: number, ayahNumber: number): boolean {
  return ayahNumber === 1 && surahNumber !== 1 && surahNumber !== 9;
}
