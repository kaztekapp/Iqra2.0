// What the voice service will make live: a recited Quran line, and nothing
// else. Plain TypeScript with no Deno or app imports, so the app's tests can
// check it against every verse (__tests__/ttsRecitedText.test.ts).

/** The one voice the Quran is recited in (the user's choice, 2026-11-06). */
export const RECITER_VOICE = 'ar-SA-HamedNeural';

/** ⟦ipa|word⟧: a word said from phonemes. The IPA part is Latin by nature. */
const PHONEME_MARK = /⟦[^|⟧]+\|([^⟧]+)⟧/g;

/**
 * Arabic letters and marks (including the Quranic annotation signs and the
 * presentation forms), digits, spaces, the punctuation a verse can carry, and
 * the invisible joiners and direction marks the reading pipeline inserts.
 */
const ALLOWED = /^[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿​-‏⁠-⁤\s0-9.,;:!?()«»"'\-…﴾﴿۝]*$/u;
const ARABIC_LETTER = /[ء-ي]/u;

export function isRecitedArabic(text: string): boolean {
  const words = text.replace(PHONEME_MARK, '$1');
  return ARABIC_LETTER.test(words) && ALLOWED.test(words);
}
