/**
 * Turning story prose into something a speech engine reads well.
 *
 * Two jobs, kept apart from the audio service so they can be reasoned about
 * on their own:
 *
 *   1. `prepareForSpeech` — remove what cannot be spoken, and nothing else.
 *
 *      English used to go through thirty-five phonetic respellings tuned by
 *      ear for the old compact voice: Allah as "Ollah", honored as
 *      "honnerd", Yusuf as "Yoosuf". French had none, and French was
 *      noticeably the smoother of the two.
 *
 *      That is not a coincidence. A neural voice reads real words from a
 *      learned model of how they sound in a sentence. Hand it an invented
 *      spelling and it falls back to sounding the letters out, which carries
 *      no rhythm, so the word lands flat and drags the phrase around it out
 *      of shape. On common words like "honored" that happened constantly.
 *      "Allah's" also lost its possessive, and "Satan" was quietly swapped
 *      for a different word altogether.
 *
 *      The voices we ask for now say these names perfectly well on their
 *      own. So English is left alone, exactly as French always was. Resist
 *      re-adding a respelling here: if a name really is mispronounced, it is
 *      one name, and it is worth less than the rhythm of every sentence.
 *   2. `splitSentences` — cut a paragraph into utterances. Short utterances
 *      are what make pause, skip and highlight feel immediate, and they keep
 *      the cost of an interrupted sentence to a single sentence.
 */
export type NarrationLang = 'en' | 'fr';

/**
 * A spoken line of the Quran inside story prose, marked with the ornate
 * Quranic brackets: `Musa said, ﴿رَبِّ أَرِنِي أَنظُرْ إِلَيْكَ﴾ "My Lord, show me..."`.
 *
 * The brackets are the convention for quoting the Quran in running text, and
 * they let the reader and the narration find the Arabic without guessing at
 * script ranges. The reader sets the run in the Quran face; the narration
 * hands it to the Arabic voice and reads the words around it in the story's
 * own language.
 */
export const QURAN_RUN = /﴿([^﴾]*)﴾/g;

export type ProseSegment = { kind: 'prose'; text: string } | { kind: 'quran'; text: string };

/** Cut prose into the story's own words and the Quranic lines quoted in it. */
export function splitQuranRuns(text: string): ProseSegment[] {
  const out: ProseSegment[] = [];
  if (!text) return out;
  let last = 0;
  for (const m of text.matchAll(QURAN_RUN)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ kind: 'prose', text: text.slice(last, at) });
    const arabic = m[1].trim();
    if (arabic) out.push({ kind: 'quran', text: arabic });
    last = at + m[0].length;
  }
  if (last < text.length) out.push({ kind: 'prose', text: text.slice(last) });
  return out;
}

/**
 * Normalise a line of Quranic (Uthmani) Arabic so a text-to-speech voice reads
 * the WORDS, not the letters.
 *
 * The mushaf text carries marks that standard Arabic writing does not: the
 * alef wasla (ٱ), the dagger/superscript alef (ـٰ), the little waqf signs above
 * the line (ۖ ۗ ۚ …), small superscript letters, and tatweel. A neural voice
 * trained on ordinary Arabic meets these and, unable to place them in a word,
 * spells the word out one letter at a time — which is exactly the "reading the
 * letters" a listener hears on the device voice, and on any engine handed a
 * fragment it cannot parse. Converting the two alefs to a plain alef and
 * dropping the annotation marks leaves fully-vowelled, ordinary Arabic that
 * every engine reads as speech. The harakat that matter for pronunciation —
 * fatha, damma, kasra, the tanwin, shadda, sukun, maddah, hamza — are kept.
 */
export function normalizeArabicForSpeech(input: string): string {
  if (!input) return '';
  return input
    // A tatweel carrying a hamza is a SEAT, not decoration. The mushaf writes
    // anbi'uni as ب + kasra + tatweel + damma + hamza: the hamza rides on a
    // dummy stroke. Stripping the tatweel further down used to leave the beh
    // holding a kasra, a damma AND a hamza at once — a cluster no engine can
    // parse, so it spelled the word out. That is the letter-by-letter reading
    // that survived every other rule here. Rebuild it as a real ya-seat hamza
    // and keep whatever haraka rode on the stroke. Must run before the tatweel
    // is removed.
    // The same long ā, written on the mushaf's dummy stroke: tatweel + hamza +
    // fatha + alef, as in al-ākhirah, bi-āyātinā, yā-Ādam. It has to be caught
    // BEFORE the stroke becomes a ya-seat below, or the word is read with a
    // seat vowel and then the alif - the same doubling again. 360 places.
    .replace(/\u0640\u0654\u064E\u0627/g, '\u0622')
    // al-āna ("now") writes that same long ā with a dagger instead of an alef:
    // stroke, hamza, fatha, stroke, dagger. Same word, same merge.
    .replace(/\u0640\u0654\u064E\u0640?\u0670/g, '\u0622')
    .replace(/\u0640([\u064B-\u0652]*)\u0654/g, '\u0626$1')
    // The mushaf writes the long ā that opens a word as hamza + fatha + alef:
    // ءَامَنُوا, ءَادَمَ, ءَايَة, and al-Qurʾān after a sukun. Read letter by
    // letter that is a short a and THEN a long ā - the alif said twice - where
    // the word is a single alef-madda. Merge the three into آ, but only where
    // the hamza opens the word (one prefix letter may precede it) or follows a
    // sukun. Where the hamza is a real glottal stop between two vowels - raʾā,
    // tabawwaʾā, tarāʾā - it stays, and so does its stop. 874 places.
    .replace(/(^|[\s\u0648\u0641\u0644\u0628\u0643][\u064E\u0650]?)\u0621\u064E\u0627/g, '$1\u0622')
    .replace(/\u0652\u0621\u064E\u0627/g, '\u0652\u0622')
    // A dagger alef on an alef maqsura is not a second letter: ʿalā, ilā,
    // Mūsā, ʿĪsā are written ى + the mark, and turning the mark into a full
    // alef spelled them ʿalayā, ilayā - a non-word, and the single commonest
    // fault in the reading (2,170 places in the stories). Drop the mark and
    // leave the maqsura, which is how the word is spelled everywhere else.
    .replace(/\u0649\u0670/g, '\u0649')
    // A dotless ya carrying a vowel is a ya, not an alef maqsura. The mushaf
    // writes waḥyun, khizyun, shayʾ, hiya, ʿalayya, yā-bunayya with the
    // undotted form, and read as a maqsura the word comes out wrong - waḥyun
    // became "waḥtun". A maqsura is a long ā and never takes a vowel, so a
    // vowel, a tanwin, a sukun or a shadda on it settles the matter. 654
    // places in the stories. Runs after the dagger alef above, which is the
    // one mark that leaves it a maqsura.
    .replace(/\u0649(?=[\u064B-\u0652])/g, '\u064A')
    // A dagger alef after a waw marks a SILENT waw: ṣalāh, zakāh, ḥayāh and
    // najāh are written صلوٰة زكوٰة حيوٰة نجوٰة. Keeping both letters produced
    // ṣalawāh. The waw goes and the mark becomes the alef it stands for.
    .replace(/\u0648\u0670/g, '\u0627')
    // The vocative is two words. The mushaf joins them - yā-qawmi, yā-Mūsā,
    // yā-ayyuhā, yā-Ibrāhīm are all written as one word - and the voice then
    // hunts for a word it does not know. Put the space back: a yā carrying a
    // dagger alef AT THE START of a word is the calling particle (220 places
    // in the stories). Mid-word the same pair is an ordinary long ā - āyāt,
    // al-qiyāmah - and must be left alone, so the word boundary is the whole
    // rule. Runs after the tatweel that the mushaf puts under the mark.
    .replace(/(^|\s)((?:[\u0648\u0641]\u064E)?)\u064A\u064E?\u0640?\u0670\u0653?/g, '$1$2\u064A\u064E\u0627 ')
    // alef wasla and any remaining dagger alef → plain alef (a real long
    // vowel the voice knows: hādhā, dhālika, ibrāhīm, samāwāt)
    .replace(/\u0671/g, '\u0627')
    .replace(/\u0670/g, '\u0627')
    // The madd sign is a mark for the reciter's ear, never a letter - not on a
    // waw or a ya, and not on an alef either. Left on an alef it composes into
    // alef-madda further down, and the voice then reads a glottal stop and a
    // second vowel: yatasāʾalūn became "yata-sa-a-alūn", wa-mā became
    // "wa-ma-ā". Every one of them goes.
    .replace(/\u0653/g, '')
    // A final dotless ya after a KASRA is a long ī, not an alef maqsura: fī,
    // innī, rabbī, alladhī, lī, banī - 2,962 places, and among the commonest
    // words in the Quran. Read as a maqsura they come out as fā, innā, rabbā.
    // After a FATHA the same letter is the long ā it looks like - ʿalā, ilā,
    // Mūsā, ʿĪsā - and is left alone, as is a maqsura carrying a tanwin:
    // hudan, fatan, muṣallan. The shadda may sit between the two, as it does
    // in innī and rabbī, where the mushaf writes the vowel before it.
    .replace(/\u0650([\u0651\u0652]*)\u0649(?![\u064B-\u0652\u0670])/g, '\u0650$1\u064A')
    // A dotless ya in the MIDDLE of a word is a long ā that the mushaf writes
    // without its alef: atāka, at-Tawrāh, iḥdāhumā, li-fatāhu, narāka - 88
    // words, 270 places. Ordinary spelling gives them the alef, and the voice
    // needs it: a maqsura belongs at the end of a word and nowhere else.
    .replace(/\u0649(?=[\u0621-\u064A])/g, '\u0627')
    // A silent alef after a tanwin DAMMA - the mushaf writes balāʾun with one -
    // is not sounded, and left there it adds a vowel to the end of the word.
    // Only after a damma: after a tanwin fatha the alef is ordinary spelling
    // and is the vowel itself, as in kathīran, shayʾan, qawman.
    .replace(/\u064C\u0627(?![\u0621-\u064A])/g, '\u064C')
    // small high honorific marks (U+0610–U+061A)
    .replace(/[\u0610-\u061A]/g, '')
    // extended combining marks that are not the standard harakat (U+0656–U+065F)
    .replace(/[\u0656-\u065F]/g, '')
    // Quranic annotation & waqf signs (U+06D6–U+06ED) and small super letters
    .replace(/[\u06D6-\u06ED]/g, '')
    .replace(/[\u06E5\u06E6]/g, '')
    // tatweel (kashida) and zero-width joiners
    .replace(/\u0640/g, '')
    .replace(/[\u200B-\u200F\u2060]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    // Compose what is left. The mushaf writes alef+maddah, waw+hamza and
    // ya+hamza as a letter plus a combining mark; ordinary Arabic — and the
    // voices — expect the single characters آ ؤ ئ أ إ. NFC turns one into the
    // other, and leaves everything already composed alone.
    .normalize('NFC')
    // An alef carrying a madd sign before a hamza is an ordinary long ā, not
    // the letter alef-madda: yatasāʾalūn, jāʾa, yashāʾu, as-samāʾ,
    // al-malāʾikah, Isrāʾīl are written with it, and reading it as the letter
    // adds a glottal stop and a second vowel - "yata-sa-a-alūn". The mark is
    // for the reciter's ear, not for the word. 1,220 places in the stories.
    //
    // It only applies before a hamza or a hamza seat. Everywhere else the
    // alef-madda is the real letter - Ādam, āyāt, al-Qurʾān - and stays.
    // The Quran screens take their text from an API that sends that same mark
    // already composed, as the single letter alef-madda. Mid-word and at the
    // end it is the mark, so it becomes a plain alef; at the start of a word
    // (one prefix letter may precede) it is the real letter - Ādam, āyāt - and
    // is kept. The sentinel marks those before the rest are converted.
    // Two places it is the real letter, and both are recognisable: at the start
    // of a word (one prefix letter may precede) - Ādam, āyāt - and straight
    // after a sukun - al-ākhirah, bil-Qurʾān. A madd mark cannot sit there: it
    // belongs on an alef that carries the vowel of the consonant before it.
    // Those two are set aside, the rest become a plain alef, and then they
    // come back.
    .replace(/(^|[\s\u0648\u0641\u0644\u0628\u0643][\u064E\u0650]?)\u0622/g, '$1\u0001')
    .replace(/\u0652\u0622/g, '\u0652\u0001')
    .replace(/\u0622/g, '\u0627')
    .replace(/\u0001/g, '\u0622');
}

const HONORIFIC = /ﷺ|صلى الله عليه وسلم/g;

const EN_EXPAND: Array<[RegExp, string]> = [
  [/\(?\bPBUH\b\)?/gi, 'peace be upon him'],
  [/\(?\bSWT\b\)?/gi, 'glorified and exalted'],
  [/\bAS\b(?= *\))/g, 'peace be upon him'],
];

const FR_EXPAND: Array<[RegExp, string]> = [
  [/\(?\bPSL\b\)?/gi, 'paix et bénédictions sur lui'],
];

/** Arabic script has no place in an English or French narration track. */
const ARABIC_RANGE = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g;

export function prepareForSpeech(input: string, lang: NarrationLang): string {
  if (!input) return '';
  let t = input;

  t = t.replace(HONORIFIC, lang === 'fr' ? ', paix et bénédictions sur lui, ' : ', peace be upon him, ');

  for (const [re, to] of lang === 'fr' ? FR_EXPAND : EN_EXPAND) t = t.replace(re, to);

  t = t.replace(ARABIC_RANGE, '');

  // Verse and hadith references read as noise mid-sentence.
  t = t.replace(/\(\s*\d+:\d+(\s*[-–]\s*\d+)?\s*\)/g, '');
  t = t.replace(/#\s*\d+/g, '');

  // Quote marks make some engines pause oddly; the prose reads fine without.
  t = t.replace(/["“”«»]/g, '');

  // A hyphen inside a word (Dhul-Kifl, Al-Yasa) makes some engines stop
  // short. Twice, so the middle of a doubly-hyphenated name is caught too.
  t = t.replace(/([A-Za-zÀ-ÖØ-öø-ÿ])-([A-Za-zÀ-ÖØ-öø-ÿ])/g, '$1 $2');
  t = t.replace(/([A-Za-zÀ-ÖØ-öø-ÿ])-([A-Za-zÀ-ÖØ-öø-ÿ])/g, '$1 $2');

  // Dashes and brackets are typography, not speech. Keep . , ! ? ; :
  t = t.replace(/[—–]/g, ', ');
  t = t.replace(/[()[\]{}<>*_~`|\\/]/g, ' ');

  t = t.replace(/\s+([.,!?;:])/g, '$1');
  t = t.replace(/,\s*,/g, ',');
  t = t.replace(/\s+/g, ' ').trim();

  return t;
}

/**
 * Split prepared prose into utterances. Sentence-sized, with very long
 * sentences broken at a clause boundary so that no single utterance runs long
 * enough to make pausing feel unresponsive.
 */
export function splitSentences(text: string, maxWords = 34): string[] {
  const prepared = text.trim();
  if (!prepared) return [];

  const sentences = prepared
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const out: string[] = [];
  for (const sentence of sentences) {
    if (sentence.split(/\s+/).length <= maxWords) {
      out.push(sentence);
      continue;
    }
    // Too long: break on commas/semicolons, never mid-clause.
    const parts = sentence.split(/(?<=[,;:])\s+/);
    let buffer = '';
    for (const part of parts) {
      const candidate = buffer ? `${buffer} ${part}` : part;
      if (candidate.split(/\s+/).length > maxWords && buffer) {
        out.push(buffer);
        buffer = part;
      } else {
        buffer = candidate;
      }
    }
    if (buffer) out.push(buffer);
  }

  return out;
}

/**
 * Cut one sentence into clips short enough for a URL-based voice.
 *
 * Each clip is a separate piece of audio, so a boundary in the middle of a
 * clause is audible as a stumble. Prefer a sentence end, then a clause end,
 * then any space, and only fall back to a hard cut.
 */
export function chunkForUrl(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitAt = -1;
    for (const mark of ['. ', '! ', '? ', '; ', ', ']) {
      const at = remaining.lastIndexOf(mark, maxLen);
      if (at > splitAt) splitAt = at;
    }
    if (splitAt === -1 || splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(' ', maxLen);
    if (splitAt === -1) splitAt = maxLen;

    chunks.push(remaining.substring(0, splitAt + 1).trim());
    remaining = remaining.substring(splitAt + 1).trim();
  }

  return chunks.filter(Boolean);
}

/**
 * Comparison key for "have we already said this?".
 *
 * Arabic counts. The key used to keep only `[a-z0-9 ]`, so every ayah reduced
 * to an empty string - and an empty key is treated as nothing to say, which
 * silently dropped every quoted line of the Quran before the Arabic voice
 * ever got it. Arabic letters are kept; the harakat, the dagger alef, the
 * tatweel and the recitation marks are not. The letters that the two scripts
 * spell differently - the alefs, alef maqsura, ta marbuta and the hamza seats
 * - are folded together, so an ayah set in the Uthmani script keys the same as
 * the same ayah set in the plain one.
 */
export function speechKey(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0640\u064b-\u0652\u0670\u06d6-\u06ed]/g, '')
    .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
    .replace(/\u0649/g, '\u064a')
    .replace(/\u0629/g, '\u0647')
    .replace(/[\u0624\u0626]/g, '\u0621')
    .replace(/[^a-z0-9\u0621-\u064a ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
