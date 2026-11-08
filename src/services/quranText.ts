import { readDataFile } from '../lib/dataFile';
import type { Ayah } from '../types/quran';
import { SURAH_FILES } from '../../assets/quran';

/**
 * The verses of each surah, read from its data file (assets/quran) the
 * first time it is asked for and kept in memory after.
 *
 * The files ship inside the store build and come with an update only when
 * they change, so this works with no connection. Reading one is a file read
 * and a JSON parse: a short surah is instant, al-Baqarah a moment, which the
 * screens show as their loading state.
 */
const loaded = new Map<number, Ayah[]>();
const loading = new Map<number, Promise<Ayah[]>>();

/** The verses if this surah has been read already, else null. */
export function cachedSurah(surahNumber: number): Ayah[] | null {
  return loaded.get(surahNumber) ?? null;
}

/** Read a surah's verses (once; later calls share the first read). */
export function loadSurah(surahNumber: number): Promise<Ayah[]> {
  const done = loaded.get(surahNumber);
  if (done) return Promise.resolve(done);
  const running = loading.get(surahNumber);
  if (running) return running;
  const module = SURAH_FILES[surahNumber];
  if (module === undefined) return Promise.resolve([]);
  const work = readDataFile<Ayah[]>(module)
    .then((ayahs) => {
      loaded.set(surahNumber, ayahs);
      return ayahs;
    })
    .finally(() => loading.delete(surahNumber));
  loading.set(surahNumber, work);
  return work;
}
