/**
 * Arabic text utilities for character-level operations.
 * Used by active recall, fill-blank, and other Quran learning modes.
 */

const ARABIC_DIACRITICS = new Set([
  '\u064B', // fathatan
  '\u064C', // dammatan
  '\u064D', // kasratan
  '\u064E', // fatha
  '\u064F', // damma
  '\u0650', // kasra
  '\u0651', // shadda
  '\u0652', // sukun
  '\u0653', // maddah
  '\u0654', // hamza above
  '\u0655', // hamza below
  '\u0670', // superscript alef
]);

/** Check if a character is an Arabic diacritic (tashkeel). */
export function isArabicDiacritic(char: string): boolean {
  return ARABIC_DIACRITICS.has(char);
}

/**
 * Extract the first N base (non-diacritic) characters from Arabic text,
 * preserving any diacritics attached to them.
 */
export function getFirstNBaseChars(text: string, n: number): string {
  let baseCount = 0;
  let result = '';

  for (const char of text) {
    if (isArabicDiacritic(char)) {
      // Attach diacritic to the current result (belongs to previous base char)
      if (baseCount > 0 && baseCount <= n) {
        result += char;
      }
    } else {
      baseCount++;
      if (baseCount > n) break;
      result += char;
    }
  }

  return result;
}

/**
 * Count base (non-diacritic) characters in text.
 */
function countBaseChars(text: string): number {
  let count = 0;
  for (const char of text) {
    if (!isArabicDiacritic(char)) count++;
  }
  return count;
}

// Key Arabic characters for prefix detection
const ALIF_WASLA = '\u0671'; // ٱ - used in definite article
const ALIF = '\u0627';       // ا - regular alif
const WAW = '\u0648';        // و - conjunction "and"
const FA = '\u0641';         // ف - conjunction "so/then"
const BA = '\u0628';         // ب - preposition "in/with"
const KAF = '\u0643';        // ك - preposition "like/as"
const SIN = '\u0633';        // س - future marker "will"
const LAM = '\u0644';        // ل - part of definite article / preposition "for"

/**
 * Get the base (non-diacritic) characters from text as an array.
 */
function getBaseChars(text: string): string[] {
  const bases: string[] = [];
  for (const char of text) {
    if (!isArabicDiacritic(char)) bases.push(char);
  }
  return bases;
}

/**
 * Detect how many base characters form grammatical prefixes.
 *
 * Quranic Arabic prefixes stack in strict order:
 *   [Conjunction] + [Preposition] + [Article] + WORD
 *
 * Conjunctions (layer 1): و "and", ف "so/then"
 * Prepositions (layer 2): ب "in/with", ك "like/as", س "will", لِ "for/to"
 * Article (layer 3): ال / ٱل "the"
 *
 * Special case: لِ + ال merges into لِلْ (two lams, alif dropped)
 *
 * Returns the number of prefix base chars (0 if no prefix detected).
 */
function detectPrefixLength(text: string): number {
  const bases = getBaseChars(text);
  if (bases.length < 2) return 0;

  let pos = 0;

  // Layer 1: Conjunction و or ف
  if (bases[pos] === WAW || bases[pos] === FA) {
    pos++;
  }

  if (pos >= bases.length - 1) return pos > 0 ? pos : 0;

  // Layer 2: Preposition ب, ك, س
  if (bases[pos] === BA || bases[pos] === KAF || bases[pos] === SIN) {
    pos++;
  }
  // Special: لِ + الْ merger → لِلْ (two consecutive lams)
  // First ل is preposition "for", second ل is article "the" (alif dropped)
  else if (
    bases[pos] === LAM &&
    pos + 1 < bases.length &&
    bases[pos + 1] === LAM
  ) {
    pos += 2; // both lams are prefix (preposition + article)
    if (pos >= bases.length) return 0;
    return pos;
  }

  if (pos >= bases.length - 1) return pos > 0 ? pos : 0;

  // Layer 3: Definite article ال or ٱل
  if (
    pos + 1 < bases.length &&
    (bases[pos] === ALIF_WASLA || bases[pos] === ALIF) &&
    bases[pos + 1] === LAM
  ) {
    pos += 2;
  }

  // Must have at least 1 base char remaining for the actual word
  if (pos >= bases.length) return 0;

  return pos;
}

/**
 * Generate a smart hint for a word in first-letter mode.
 *
 * Shows all prefix characters plus the first real letter of the
 * actual word, with "..." if the word continues.
 *
 * Prefixes detected:
 * - و "and", ف "so/then" (conjunctions)
 * - ب "in/with", ك "like", س "will", لِ "for" (prepositions)
 * - ال/ٱل "the" (definite article)
 * - Stacked combos: وَبِالْ "and in the", فَالْ "so the", etc.
 *
 * Examples:
 * - ٱلرَّحِيمِ → ٱلرَّ...   (ال + ر)
 * - وَٱلنَّاسِ → وَٱلنَّ...  (و + ال + ن)
 * - بِسْمِ     → بِسْ...     (ب + س)
 * - فَقَالَ    → فَقَ...     (ف + ق)
 * - لِلَّهِ    → لِلَّ...    (لل + ه)
 * - كَمَثَلِ   → كَمَ...     (ك + م)
 * - وَلَا      → وَلَ...     (و + ل)
 * - قُلْ       → قُ...       (no prefix, ق)
 * - فِى       → فِ          (short word, no ellipsis)
 */
export function getHintText(wordText: string): string {
  const prefixLen = detectPrefixLength(wordText);
  const hintCharCount = prefixLen + 1; // prefix + 1 real letter

  const hint = getFirstNBaseChars(wordText, hintCharCount);
  const totalBase = countBaseChars(wordText);

  if (totalBase <= hintCharCount) {
    return hint;
  }

  return hint + '...';
}
