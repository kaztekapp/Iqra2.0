// Every surah is recited from the Bismillah, except Al-Fatihah (where it is
// verse 1) and At-Tawbah; the words are Al-Fatihah 1:1 as the app holds it.
import { readFileSync } from 'fs';
import { join } from 'path';
import { BASMALA, opensWithBasmala } from '../src/services/basmala';

describe('basmala', () => {
  it('is Al-Fatihah 1:1, letter for letter', () => {
    const fatiha = readFileSync(join(__dirname, '../src/data/arabic/quran/surahs/juz1/001-al-fatihah.ts'), 'utf8');
    expect(fatiha.match(/"textUthmani": "([^"]*)"/)![1]).toBe(BASMALA);
  });

  it('opens verse 1 of every surah but Al-Fatihah and At-Tawbah', () => {
    expect(opensWithBasmala(2, 1)).toBe(true);
    expect(opensWithBasmala(114, 1)).toBe(true);
    expect(opensWithBasmala(1, 1)).toBe(false);
    expect(opensWithBasmala(9, 1)).toBe(false);
    expect(opensWithBasmala(2, 2)).toBe(false);
  });
});
