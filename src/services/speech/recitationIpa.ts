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
  // § (from recite) says the next alif is the silent alif of wasl; ¤ says the
  // long vowel before it is held (madd lāzim, marked with madda in the mushaf).
  type Unit = { letter: string; marks: string; silent?: boolean; held?: boolean; stretched?: boolean };
  const units: Unit[] = [];
  let silentNext = false;
  for (const c of ch) {
    if (c === '§') { silentNext = true; continue; }
    if (c === '¤') { if (units.length) units[units.length - 1].held = true; continue; }
    if (c === '¦') { if (units.length) units[units.length - 1].stretched = true; continue; }
    if (MARK.test(c) && units.length) units[units.length - 1].marks += c;
    else { units.push({ letter: c, marks: '', silent: silentNext }); silentNext = false; }
  }

  const vowelOf = (u: Unit) => u.marks.replace(SHADDA, '').replace(SUKUN, '');
  // A long vowel held (madd lāzim): ḍāāāllīn. Only where the mushaf marks it.
  const heldBefore = (i: number) => !!units[i].held;
  // How long a long vowel is: held ×3 (madd lāzim), stretched ×2 before a hamza.
  const long = (i: number, v: string) => (units[i].held ? v + v + v : units[i].stretched ? v + v : v);

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
    // The silent alif of wasl inside a word: nothing is said (fa-ttaqū).
    if (u.silent) continue;
    if (u.letter === 'ا' || u.letter === 'ى' || u.letter === 'ٰ') {
      // The silent alif after a tanween fath, or after a plural waw.
      if (prev && (prev.marks.includes(FATHATAN) || (prev.letter === 'و' && !vowelOf(prev)))) continue;
      out += long(i, 'aː');
      continue;
    }
    if (u.letter === 'آ') {
      out += 'ʔ' + (heldBefore(i) ? 'aːaːaː' : 'aː');
      continue;
    }
    if ((u.letter === 'ي' && prevVowel === KASRA) || (u.letter === 'و' && prevVowel === DAMMA)) {
      if (!vowelOf(u) && !u.marks.includes(SHADDA)) {
        out += long(i, u.letter === 'ي' ? 'iː' : 'uː');
        continue;
      }
    }

    // The l of al- before a sun letter is not said (wash-shahādah): the mushaf
    // leaves it bare, where a said l carries a sukun.
    if (u.letter === 'ل' && !u.marks && units[i + 1]?.marks.includes(SHADDA)) continue;

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
      !!next && !next.silent && !vowelOf(next) && !next.marks.includes(SHADDA) &&
      ((v === FATHA && (next.letter === 'ا' || next.letter === 'ى' || next.letter === 'ٰ')) ||
        (v === KASRA && next.letter === 'ي') ||
        (v === DAMMA && next.letter === 'و'));
    if (isAllah) out += 'aː';
    else if (TANWEEN[v]) out += TANWEEN[v];
    else if (SHORT[v] && !intoLong) out += SHORT[v];
  }
  return out;
}

/**
 * The name of God as it is recited: its ā held long (Allāāh), and its l heavy
 * after a or u (qālalˤlˤāāh), light after i (bismillāāh). Chosen by ear,
 * 2026-11-04 (take F). Runs over every phoneme spelling a recitation uses,
 * so the rule is the same in every verse.
 */
export function soundOfAllah(ipa: string): string {
  return ipa.replace(/(aː|uː|iː|a|u|i)?llaːh/g, (_m, before: string | undefined) =>
    before && before.startsWith('i') ? `${before}llaːaːh` : `${before ?? ''}${before ? 'lˤlˤ' : 'll'}aːaːh`
  );
}

/**
 * Doubled letters, held: a doubled n or m keeps its nasal for two counts
 * (ghunna: ʿamma, innā, take C on 2026-11-05), and every other doubled letter
 * is said firmly, a touch longer than the voice makes nn or bb (rabbaka,
 * kallā, take C on 2026-11-05). The name of God keeps its own approved form.
 */
// w and y are glides, said doubled but not held (awwāb, take 2D).
const DOUBLED = /(dʒ|sˤ|dˤ|tˤ|ðˤ|[btθħxdðrzsʃʕɣfqklhnm])\1(?!\1)(?!aːaːh)/g;

// A held throat letter (ʿayn, ḥā, hā, khā, ghayn, hamza) loses its vowel in
// the voice: yaduʿʿul-yatīm came out yadaʿa. Split into two clean ones it is
// right (yaduʿ·ʿul, take C on 2026-11-05).
const THROAT = new Set(['ʕ', 'ħ', 'h', 'x', 'ɣ', 'ʔ']);

export function holdDoubled(ipa: string): string {
  return ipa.replace(DOUBLED, (_m, c: string) => (THROAT.has(c) ? `${c}.${c}` : c + c + c));
}

/** Every phoneme spelling a recitation uses, with the held sounds applied. */
export function recitedIpa(ipa: string): string {
  return holdDoubled(soundOfAllah(ipa));
}
