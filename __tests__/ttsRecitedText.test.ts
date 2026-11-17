// The voice service makes only recited Quran lines live. Its check must
// accept every verse exactly as the app sends it, and refuse anything else.
import { readFileSync } from 'fs';
import { join } from 'path';
import { asRecitation, chunkLine, spokenArabic } from '../src/services/speech/voicePlan';
import { isRecitedArabic } from '../supabase/functions/tts/recitedText';

const DIR = join(__dirname, '..', 'assets', 'quran');
const pad = (n: number) => String(n).padStart(3, '0');

describe('the voice service accepts recited Quran only', () => {
  it('accepts every verse as the app sends it', () => {
    const refused: string[] = [];
    let longest = 0;
    for (let s = 1; s <= 114; s++) {
      const ayahs = JSON.parse(readFileSync(join(DIR, `${pad(s)}.qjson`), 'utf8')) as { textUthmani: string }[];
      ayahs.forEach((a, i) => {
        const arabic = a.textUthmani;
        for (const chunk of chunkLine(asRecitation(arabic))) {
          const spoken = spokenArabic(chunk);
          longest = Math.max(longest, spoken.length);
          if (!isRecitedArabic(spoken)) refused.push(`${s}:${i + 1}`);
        }
      });
    }
    expect(refused).toEqual([]);
    expect(longest).toBeLessThanOrEqual(4000);
  });

  it('refuses prose in other languages and empty text', () => {
    for (const t of ['Hello, this is free speech on your bill', 'Bonjour à tous', '', '   ', '<speak>x</speak>', 'بسم الله <voice>']) {
      expect(isRecitedArabic(t)).toBe(false);
    }
  });
});
