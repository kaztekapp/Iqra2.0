// The app reads the Quran from assets/quran (one data file per surah); the
// voice recorder and the other tests read the source files in
// src/data/arabic/quran/surahs. They must never differ: a fix made to the
// source and not exported would be heard in recordings and checked by tests,
// but never shown in the app. Re-export with:
//   npx tsx scripts/quran/exportSurahFiles.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import { surahsFromSource, fileName } from '../scripts/quran/exportSurahFiles';

const DIR = join(__dirname, '..', 'assets', 'quran');

describe('Quran data files', () => {
  const source = surahsFromSource();

  it('has every surah', () => {
    expect(source.size).toBe(114);
    const index = readFileSync(join(DIR, 'index.ts'), 'utf8');
    for (let n = 1; n <= 114; n++) expect(index).toContain(`require('./${fileName(n)}')`);
  });

  it('matches the source files verse for verse', () => {
    const stale: number[] = [];
    for (const [n, ayahs] of source) {
      if (readFileSync(join(DIR, fileName(n)), 'utf8') !== JSON.stringify(ayahs)) stale.push(n);
    }
    expect(stale).toEqual([]);
  });

  it('holds the right number of verses (6,236)', () => {
    let verses = 0;
    for (let n = 1; n <= 114; n++) verses += JSON.parse(readFileSync(join(DIR, fileName(n)), 'utf8')).length;
    expect(verses).toBe(6236);
  });
});
