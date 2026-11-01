/**
 * Words the Arabic voice says wrongly, with the spelling that makes it say
 * them right. Applied to every Arabic line before it is spoken or recorded,
 * so one entry fixes the word everywhere it occurs.
 *
 * How to fix a word:
 *   1. Find a spelling the voice reads correctly (try it with
 *      `npx tsx scripts/voice/record.ts --try "<spelling>"`, which plays it).
 *   2. Add [word as normalized, replacement] below.
 *   3. Run `npx tsx scripts/voice/record.ts`: only the lines containing the word
 *      get new clips (their text changed, so their names did too).
 *   4. Push, so the app's own copy of this list matches the recordings.
 *
 * Matching is on whole words of the normalized text (after
 * normalizeArabicForSpeech), with or without a leading و / ف / ب / ل / ك.
 */
export const ARABIC_PRONUNCIATIONS: readonly (readonly [string, string])[] = [];

/**
 * Words no spelling gets right, spelled out sound by sound in IPA instead.
 * Each entry is one whole word exactly as normalized (prefix included), so
 * every form needs its own line. The recorder and the tts function voice
 * them as phonemes; the phone's own voice gets the plain word.
 *
 * Hamed reads the madda of آيَات as "ayaya-"; the long ā on both sides of
 * the ya is only said right from the phonemes (checked by ear 2026-10-31).
 */
export const ARABIC_PHONEMES: readonly (readonly [string, string])[] = [
  ['آيَاتِنَا', 'ʔaːjaːtinaː'],
  ['بِآيَاتِنَا', 'biʔaːjaːtinaː'],
  ['آيَاتُنَا', 'ʔaːjaːtunaː'],
  ['آيَاتِ', 'ʔaːjaːti'],
  ['آيَاتُ', 'ʔaːjaːtu'],
  ['آيَاتٍ', 'ʔaːjaːtin'],
  ['آيَاتٌ', 'ʔaːjaːtun'],
  ['آيَاتِهِ', 'ʔaːjaːtihi'],
  ['آيَاتِكَ', 'ʔaːjaːtika'],
  ['آيَاتِي', 'ʔaːjaːtiː'],
  ['آيَاتِيَ', 'ʔaːjaːtija'],
  ['بِآيَاتِ', 'biʔaːjaːti'],
  ['بِآيَاتِي', 'biʔaːjaːtiː'],
  ['لَآيَاتٍ', 'laʔaːjaːtin'],
  ['الْآيَاتِ', 'lʔaːjaːti'],
  ['بِالْآيَاتِ', 'bilʔaːjaːti'],
];
