import type { NarrationLang } from './storyAudioService';

/**
 * The line that names a hadith before it is read.
 *
 * A verse is announced by its surah; a hadith is announced by where it is
 * recorded, its number, and who reported it. Said once, in the story's
 * language, before the first segment - the way a teacher gives the reference
 * and then reads.
 *
 * Prophet stories store the collection as a key ("bukhari"); the Quran
 * stories store the display name ("Sahih al-Bukhari"). Both are accepted.
 */
const NAMES: Record<string, { en: string; fr: string }> = {
  bukhari: { en: 'Sahih al-Bukhari', fr: 'Sahih al-Boukhari' },
  muslim: { en: 'Sahih Muslim', fr: 'Sahih Mouslim' },
  tirmidhi: { en: "Jami' at-Tirmidhi", fr: "Jami' at-Tirmidhi" },
  abu_dawud: { en: 'Sunan Abu Dawud', fr: 'Sunan Abou Dawoud' },
  nasai: { en: "Sunan an-Nasa'i", fr: "Sunan an-Nasa'i" },
  ibn_majah: { en: 'Sunan Ibn Majah', fr: 'Sunan Ibn Majah' },
  ahmad: { en: 'Musnad Ahmad', fr: 'Mousnad Ahmad' },
  malik: { en: 'Muwatta Malik', fr: 'Mouwatta Malik' },
  darimi: { en: 'Sunan ad-Darimi', fr: 'Sunan ad-Darimi' },
  ibn_hibban: { en: 'Sahih Ibn Hibban', fr: 'Sahih Ibn Hibban' },
};

function collectionKey(collection: string): string {
  const c = collection.toLowerCase();
  for (const key of Object.keys(NAMES)) {
    if (c === key || c.replace(/[^a-z]/g, '').includes(key.replace('_', ''))) return key;
  }
  return '';
}

export interface HadithReferenceLike {
  collection: string;
  hadithNumber?: string;
  narrator?: string;
}

/** "Sahih al-Bukhari, hadith 4418, narrated by Ka'b ibn Malik." */
export function hadithReferenceLine(source: HadithReferenceLike, lang: NarrationLang): string {
  const key = collectionKey(source.collection);
  const name = key ? NAMES[key][lang] : source.collection;
  const parts: string[] = [name];
  if (source.hadithNumber) {
    parts.push(lang === 'fr' ? `hadith numéro ${source.hadithNumber}` : `hadith ${source.hadithNumber}`);
  }
  if (source.narrator) {
    parts.push(lang === 'fr' ? `rapporté par ${source.narrator}` : `narrated by ${source.narrator}`);
  }
  return parts.join(', ') + '.';
}
