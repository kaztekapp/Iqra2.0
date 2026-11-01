/**
 * Words the Arabic voice says wrongly, with the spelling that makes it say
 * them right. Applied to every Arabic line before it is spoken or recorded,
 * so one entry fixes the word everywhere it occurs.
 *
 * How to fix a word:
 *   1. Find a spelling the voice reads correctly (try it with
 *      `node scripts/voice/record.mjs --try "<spelling>"`, which plays it).
 *   2. Add [word as normalized, replacement] below.
 *   3. Run `node scripts/voice/record.mjs`: only the lines containing the word
 *      get new clips (their text changed, so their names did too).
 *   4. Push, so the app's own copy of this list matches the recordings.
 *
 * Matching is on whole words of the normalized text (after
 * normalizeArabicForSpeech), with or without a leading و / ف / ب / ل / ك.
 */
export const ARABIC_PRONUNCIATIONS: ReadonlyArray<readonly [string, string]> = [];
