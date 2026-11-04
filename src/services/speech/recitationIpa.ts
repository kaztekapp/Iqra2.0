/**
 * A recited word, spelled in phonemes for the Arabic voice.
 *
 * Wasl joins words into one (rabbil-ʿālamīn), and past two joins the voice no
 * longer reads the result as Arabic: the Bismillah came out stretched, An-Nas
 * 4 lost its kh. Said from phonemes, both were right (chosen by ear,
 * 2026-11-03/04). The Quran's text is fully vowelled, so its phonemes follow
 * from the letters and marks alone, and this is that reading, done the same
 * way everywhere.
 *
 * Input is a word as `recite` makes it: normalised, joined across silent
 * alifs, the sun letter already doubled, stopped on its last letter.
 */

const CONSONANTS: Record<string, string> = {
  'ب': 'b', 'ت': 't', 'ث': 'θ', 'ج': 'dʒ', 'ح': 'ħ', 'خ': 'x', 'د': 'd', 'ذ': 'ð',
  'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'ʃ', 'ص': 'sˤ', 'ض': 'dˤ', 'ط': 'tˤ', 'ظ': 'ðˤ',
  'ع': 'ʕ', 'غ': 'ɣ', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'j', 'ء': 'ʔ', 'أ': 'ʔ', 'إ': 'ʔ', 'ؤ': 'ʔ', 'ئ': 'ʔ', 'ة': 't',
};

const FATHA = 'َ';
const DAMMA = 'ُ';
const KASRA = 'ِ';
const SUKUN = 'ْ';
const SHADDA = 'ّ';
const FATHATAN = 'ً';
const DAMMATAN = 'ٌ';
const KASRATAN = 'ٍ';
const SHORT: Record<string, string> = { [FATHA]: 'a', [DAMMA]: 'u', [KASRA]: 'i' };
const TANWEEN: Record<string, string> = { [FATHATAN]: 'an', [DAMMATAN]: 'un', [KASRATAN]: 'in' };
const MARK = /[ً-ْ]/;

/** The phonemes of one recited word. */
export function recitationIpa(word: string): string {
  const ch = [...word];
  let out = '';
  // Each letter with the marks that follow it.
  type Unit = { letter: string; marks: string };
  const units: Unit[] = [];
  for (const c of ch) {
    if (MARK.test(c) && units.length) units[units.length - 1].marks += c;
    else units.push({ letter: c, marks: '' });
  }

  const vowelOf = (u: Unit) => u.marks.replace(SHADDA, '').replace(SUKUN, '');
  // A long vowel held before a doubled consonant (madd lāzim): ḍāāāllīn.
  const heldBefore = (i: number) => {
    const next = units[i + 1];
    return !!next && next.marks.includes(SHADDA);
  };

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    const prev = units[i - 1];
    const prevVowel = prev ? vowelOf(prev) : '';

    // A word that opens on its silent alif (after a stop): al- before l, else i.
    if ((u.letter === 'ا' || u.letter === 'ٱ') && i === 0) {
      out += units[1]?.letter === 'ل' ? 'a' : 'i';
      continue;
    }
    // Long vowels: the letter carries no mark of its own and follows its short vowel.
    if (u.letter === 'ا' || u.letter === 'ى' || u.letter === 'ٰ') {
      // The silent alif after a tanween fath, or after a plural waw.
      if (prev && (prev.marks.includes(FATHATAN) || (prev.letter === 'و' && !vowelOf(prev)))) continue;
      out += heldBefore(i) ? 'aːaːaː' : 'aː';
      continue;
    }
    if (u.letter === 'آ') {
      out += 'ʔ' + (heldBefore(i) ? 'aːaːaː' : 'aː');
      continue;
    }
    if ((u.letter === 'ي' && prevVowel === KASRA) || (u.letter === 'و' && prevVowel === DAMMA)) {
      if (!vowelOf(u) && !u.marks.includes(SHADDA)) {
        const long = u.letter === 'ي' ? 'iː' : 'uː';
        out += heldBefore(i) ? long + long + long : long;
        continue;
      }
    }

    const c = CONSONANTS[u.letter];
    if (!c) continue;
    // The name of God: the mushaf writes no alif for its long ā (-llāh-).
    const isAllah =
      u.letter === 'ل' && u.marks.includes(SHADDA) && units[i + 1]?.letter === 'ه' && vowelOf(u) !== KASRA;
    // ة before a stop is said h; with a vowel, t.
    const sound = u.letter === 'ة' && !vowelOf(u) ? 'h' : c;
    out += u.marks.includes(SHADDA) ? sound + sound : sound;
    const v = vowelOf(u);
    // A short vowel that runs into its long letter is said once, as the long
    // vowel the next letter writes (ka + ا = kaː).
    const next = units[i + 1];
    const intoLong =
      !!next && !vowelOf(next) && !next.marks.includes(SHADDA) &&
      ((v === FATHA && (next.letter === 'ا' || next.letter === 'ى' || next.letter === 'ٰ')) ||
        (v === KASRA && next.letter === 'ي') ||
        (v === DAMMA && next.letter === 'و'));
    if (isAllah) out += 'aː';
    else if (TANWEEN[v]) out += TANWEEN[v];
    else if (SHORT[v] && !intoLong) out += SHORT[v];
  }
  return out;
}
