/**
 * The voice plan: which voice, at which rate, says which exact text, and the
 * name its clip goes by. Shared by the app (playback, saved clips, the voice
 * CDN look-up) and by scripts/voice, which pre-records every story and dua
 * line, so a recorded file is always the one the app asks for. Pure: no React
 * Native, no network.
 */

import { normalizeArabicForSpeech } from '../narrationText';
import { ARABIC_PHONEMES, ARABIC_PRONUNCIATIONS } from './pronunciations';
import { SURAH_NAMES } from './surahNames';
import { VOICE_REVISIONS } from './voiceRevisions';
import { recitationIpa, recitedIpa } from './recitationIpa';

/** Hamed reads full tashkeel cleanly; Zariyah takes the Arabic when the narrator is female. */
export const ARABIC_VOICE = 'ar-SA-HamedNeural';

/** The rate the English and French narrators read at. */
export const NARRATION_RATE = '-4%';

export const MAX_CHUNK_LEN = 180;

/**
 * Public base of the pre-recorded clips (Cloudflare R2). Every story and dua
 * line is recorded once by scripts/voice and served from here, so listening
 * costs no voice-service call. Empty means "not set up": the app goes
 * straight to the tts function.
 */
export const VOICE_CDN_URL = 'https://voice.mkaztek.com';

/**
 * The app's logo for the lock screen, Control Center and the Dynamic Island
 * while audio plays. expo-audio downloads it from a URL, so it lives on the
 * voice CDN; the name is versioned because the file is cached for a year.
 */
export const NOW_PLAYING_ARTWORK = `${VOICE_CDN_URL}/artwork/logo-v1.jpg`;

export type EdgeGender = 'female' | 'male';
export type EdgeLang = 'en' | 'fr' | 'ar';

/** Warm, unhurried voices. Christopher is the one opus-report narrates with. */
const VOICES: Record<EdgeLang, Record<EdgeGender, string>> = {
  en: { female: 'en-US-AriaNeural', male: 'en-US-ChristopherNeural' },
  fr: { female: 'fr-FR-DeniseNeural', male: 'fr-FR-HenriNeural' },
  // The Saudi pair reads full tashkeel cleanly; chosen over the Egyptian pair
  // for duas and hadith, where every vowel mark matters.
  ar: { female: 'ar-SA-ZariyahNeural', male: 'ar-SA-HamedNeural' },
};

export function voiceFor(lang: EdgeLang, gender: EdgeGender): string {
  return VOICES[lang][gender];
}

/**
 * Map a requested speed onto an Edge prosody rate.
 *
 * Edge takes a real percentage, so the learner's three tempos map to three
 * distinct rates instead of Google's byte-identical clips above 0.5.
 *
 * Arabic is set slower than the prose at every step. The narrator is telling
 * a story and can move; a quoted ayah, a dua or the words of a hadith are
 * being recited, and at the narrator's pace the vowel endings run together.
 * -25% is the unhurried reading pace; the two below it are for a learner
 * taking a line apart.
 */
export function edgeRate(speed: number, voice: string = ARABIC_VOICE): string {
  // Zariyah recites slower by nature: -10% matches Hamed's -25% (by ear).
  if (voice === VOICES.ar.female) {
    if (speed >= 0.9) return '-10%';
    if (speed >= 0.45) return '-25%';
    return '-40%';
  }
  if (speed >= 0.9) return '-25%';  // normal: recited, not narrated
  if (speed >= 0.45) return '-40%'; // slow
  return '-55%';                    // slowest, for picking a word apart
}

export function chunkLine(text: string, maxLen = MAX_CHUNK_LEN): string[] {
  // A recited verse is read whole, as Learn mode reads it: a cut mid-verse is
  // a stop the reciter would not make, and whole it is the same recording
  // Learn mode already has.
  if (text.startsWith(RECITE)) return [RECITE + text.slice(RECITE.length).trim()];
  return splitLine(text, maxLen);
}

function splitLine(text: string, maxLen: number): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return [trimmed];

  const chunks: string[] = [];
  let remaining = trimmed;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    // Each chunk is a separate clip, so the seam between them is audible. Break
    // on a sentence or clause mark where possible — including the Arabic full
    // stop, comma, semicolon and question mark — then on a space.
    let splitAt = -1;
    for (const mark of ['۔ ', '. ', '؟ ', '? ', '! ', '؛ ', '; ', '، ', ', ']) {
      const at = remaining.lastIndexOf(mark, maxLen);
      if (at > splitAt) splitAt = at + mark.length - 1;
    }
    if (splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(' ', maxLen);
    if (splitAt <= 0) {
      // No break point at all before the limit: run on to the next space rather
      // than cutting a word in half, which Google reads as gibberish.
      const next = remaining.indexOf(' ', maxLen);
      splitAt = next === -1 ? remaining.length : next;
    }
    chunks.push(remaining.substring(0, splitAt).trim());
    remaining = remaining.substring(splitAt).trim();
  }
  return chunks;
}

/**
 * A name for a clip, from everything that decides how it sounds.
 *
 * A collision here would play the wrong line - the wrong verse of the Quran,
 * in a voice that sounds certain - so the name carries two independent hashes
 * over the text, the voice and the tempo, plus the length. djb2 multiplies by
 * 33 and sdbm by 65599, so a pair of texts that collide in one will not
 * collide in the other; 64 bits and a length is not a risk this app runs.
 */
export function clipName(spoken: string, voice: string, rate: string): string {
  const revision = VOICE_REVISIONS[spoken];
  const seed = revision ? `${voice}|${rate}|${spoken}|r${revision}` : `${voice}|${rate}|${spoken}`;
  let a = 5381;
  let b = 0;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    a = ((a << 5) + a + c) >>> 0;
    b = (c + (b << 6) + (b << 16) - b) >>> 0;
  }
  return `${a.toString(36)}-${b.toString(36)}-${seed.length.toString(36)}.mp3`;
}

/** Where a recorded clip lives under the voice CDN. */
export function clipPath(text: string, voice: string, rate: string): string {
  return `v1/${voice}/${clipName(text, voice, rate)}`;
}

const PREFIXES = ['', 'و', 'ف', 'ب', 'ل', 'ك', 'وَ', 'فَ', 'بِ', 'لِ', 'كَ'];

/**
 * Quran text is recited, not read: an invisible mark in front of a line
 * (asRecitation) makes spokenArabic apply the reading rules below. Lines
 * without it - duas, hadith, the learning screens - are spoken as before.
 */
export const RECITE = '\u2063';
export const asRecitation = (text: string): string => (text.startsWith(RECITE) ? text : RECITE + text);

/** Whole recited lines said right only from phonemes (chosen by ear). */
const RECITATION_LINES: readonly (readonly [string, string])[] = [
  // An-Nas 114:4: the joined word lost the kh of al-khannās (approved 2026-11-03, take 5).
  ['مِن شَرِّلْوَسْوَاسِلْخَنَّاسْ', 'min ʃarrilwaswaːsilxannaːs'],
];

/** Whole phrases a recitation says right only from phonemes (chosen by ear). */
const RECITATION_PHONEMES: readonly (readonly [string, string])[] = [
  // The Bismillah, wherever it is recited (Al-Fatihah 1, An-Naml 30, the
  // stories): joined into one word it was read stretched (approved
  // 2026-11-04, take 3 on Al-Fatihah 1). Matched as a word, so every place gets it.
  ['بِسْمِلَّهِرَّحْمَانِرَّحِيمْ', 'bismillaːhirraħmaːnirraħiːm'],
  ['بِسْمِلَّهِرَّحْمَانِرَّحِيمِ', 'bismillaːhirraħmaːnirraħiːmi'],
  // Al-Fatiha 1:7, the stop: walaḍ-ḍāāāllīn (approved 2026-11-03, take 6).
  ['وَلَضَّالِّينْ', 'waladˤdˤaːaːaːlliːn'],
];

/** The normaliser seats shadda before its vowel; a key typed the other way round still matches. */
const shaddaFirst = (s: string) => s.replace(/([\u064B-\u0650])\u0651/g, '\u0651$1');

/**
 * The opening letters of 29 surahs are said by their names, each one held:
 * alif lām mīm, ṭā hā, yā sīn. Read as a word they came out "alm", "ṭah".
 */
const OPENING_LETTERS = new Set(['الم', 'المص', 'الر', 'المر', 'كهيعص', 'طه', 'طسم', 'طس', 'يس', 'ص', 'حم', 'عسق', 'ق', 'ن']);
const LETTER_NAMES: Record<string, string> = {
  ا: 'أَلِفْ', ل: 'لَامْ', م: 'مِيمْ', ر: 'رَا', ص: 'صَادْ', ك: 'كَافْ', ه: 'هَا',
  ي: 'يَا', ع: 'عَيْنْ', ط: 'طَا', س: 'سِينْ', ح: 'حَا', ق: 'قَافْ', ن: 'نُونْ',
};

/**
 * The words that follow a phoneme-spelled āyāt joined in wasl (61 places):
 * āyātu-llāh, āyātul-kitāb. Each is said from its phonemes so the pair can
 * be one phoneme run.
 */
const WASL_PHONEMES = new Map(Object.entries({
  'اللَّهِ': 'llaːhi', 'اللَّهُ': 'llaːhu', 'اللَّهَ': 'llaːha',
  'الْكِتَابِ': 'lkitaːbi', 'الرَّحْمَانِ': 'rraħmaːni', 'الْقُرْآنِ': 'lqurʔaːni',
  'الْكُبْرَا': 'lkubraː', 'الَّذِينَ': 'llaðiːna', 'الَّيْلُ': 'llajlu', 'الْجَوَارِ': 'ldʒawaːri',
  'الْمُبِينِ': 'lmubiːni', 'الْحَكِيمِ': 'lħakiːmi',
}).map(([word, ipa]) => [shaddaFirst(word), ipa]));

const PHONEME_WORD = /^⟦([^|⟧]+)\|([^⟧]+)⟧$/;

/** A long vowel the mushaf marks with madda (ٓ), then a doubled consonant: madd lāzim. */
const MADD_LAZIM = /[اوىي]\u0653[\u0628-\u064A][\u064B-\u0650]?\u0651/;

/**
 * The long vowels the mushaf writes small, said as long vowels in recitation.
 *
 * A small waw (ۥ) or yā (ۦ) is a long ū or ī: Dāwūd, yastawūn, al-mawʾūdah,
 * and the pronoun lengthened between two vowels (ṣilah: innahū kāna, bihī).
 * The cleaned text dropped them, so all of these came out short. The
 * pronoun's length belongs to the flow of the verse, so a stop on it (the
 * last word) is short again: bih.
 */
function sayWrittenSmall(raw: string, last: boolean): string {
  return raw.replace(/([\u0621-\u064A])(\u064F|\u0650)\u0640?(\u06E5|\u06E6)/g, (m, letter: string, vowel: string, small: string) => {
    if (last && letter === 'ه') return letter + vowel;
    return letter + vowel + (small === '\u06E5' ? 'و' : 'ي');
  });
}

/**
 * A raw word, cleaned as `spoken` is, with the marks the phoneme spelling
 * needs (see recite): § before an inner silent alif, ¤ after a held vowel.
 * Falls back to the plain cleaned word whenever the marks cannot be placed
 * exactly, so a word is never spelled from a guess.
 */
function markForPhonemes(raw: string, spoken: string): string {
  let marked = spoken;
  const inner = raw.indexOf('\u0671', 1);
  if (inner > 0) {
    const split = spokenArabic(raw.slice(0, inner)) + '§' + spokenArabic(raw.slice(inner));
    if (split.replace('§', '') === spoken) marked = split;
  }
  if (MADD_LAZIM.test(raw)) {
    marked = marked.replace(/(\u064E[اى]|\u0650ي|\u064Fو)(?=[\u0628-\u064A]\u0651)/g, '$1¤');
  }
  return marked;
}

/** Words joined by wasl past this many are said from phonemes (recitationIpa). */
const MAX_JOINED_WORDS = 2;

/** The line's last word, stopped on: dīni → dīn, kabīran → kabīrā, raḥmatun → raḥmah. */
function stopOn(word: string): string {
  const marked = word.match(PHONEME_WORD);
  if (marked) {
    // In phonemes: drop a tanween's n and any short vowel after the last consonant.
    const ipa = marked[1].replace(/([^ː])[aiu]n?$/, '$1');
    return `⟦${ipa}|${stopOn(marked[2])}⟧`;
  }
  const last = word
    .replace(/ة[ً-ِ]*$/, 'هْ')
    .replace(/ً(ا|ى)?$/, 'َا')
    .replace(/[ٌٍَُِ]+$/, '');
  return /[ّْ]$/.test(last) || /[اىوي]$/.test(last) ? last : last + 'ْ';
}

/**
 * The two rules a reciter follows that plain reading does not (approved by
 * ear on Al-Fatiha, 2026-11-03):
 * - wasl: a word that opens with the silent alif (ٱ) joins the word before
 *   it, and before a sun letter the l of "al" goes too: yawmi + ٱلدِّين →
 *   yawmid-dīn, rabbi + ٱلْعَالَمِين → rabbil-ʿālamīn. A long vowel before
 *   the join is said short (fī + ٱلْأَرْض → fil-arḍ, qālū + ٱلْآن → qālul-ān),
 *   and a tanween becomes its vowel and a nūn with kasra (khayran +
 *   ٱلْوَصِيَّة → khayranil-waṣiyyah);
 * - waqf: the line stops on its last letter: dīni → dīn, a tanween fath
 *   becomes ā, ة becomes h.
 */
function recite(raw: string): string {
  const words = raw.split(/\s+/).filter(Boolean);
  const first = words[0]?.replace(/ٓ/g, '');
  if (first && OPENING_LETTERS.has(first) && !/[ً-ْ]/.test(words[0])) {
    words.splice(0, 1, ...[...first].map((c) => LETTER_NAMES[c]));
  }
  const out: string[] = [];
  // How many words each spoken word was joined from: past two joins the voice
  // no longer reads it (see recitationIpa), so it is said from phonemes.
  const joined: number[] = [];
  // Words the mushaf marks with madd lāzim (a madda before a doubled letter):
  // the vowel is held, which only the phoneme spelling does (ḍāāāllīn).
  const held: boolean[] = [];
  // The same words for the phoneme spelling, keeping what the cleaned text
  // loses: § before a silent wasl alif inside a word (fa-ttaqū), ¤ after a
  // long vowel the mushaf marks with madda (dāāābbah). Without them the two
  // look alike, and fattaqū came out fāāāttaqū.
  const src: string[] = [];
  for (const [wi, raw] of words.entries()) {
    const w = sayWrittenSmall(raw, wi === words.length - 1);
    const spoken = spokenArabic(w);
    if (!spoken) continue;
    const srcWord = markForPhonemes(w, spoken);
    const prev = out[out.length - 1];
    const wasl = w.startsWith('ٱ') && /^ا/.test(spoken) && !spoken.includes('⟦');
    if (prev && wasl) {
      const sun = /^ال.[ً-ِ]?ّ/.test(spoken);
      const rest = sun ? spoken.slice(2) : spoken.slice(1);
      const marked = prev.match(PHONEME_WORD);
      const ipa = WASL_PHONEMES.get(spoken);
      if (marked && ipa) {
        out[out.length - 1] = `⟦${marked[1].replace(/([aiu])ː$/, '$1')}${ipa}|${marked[2]} ${spoken}⟧`;
        continue;
      }
      if (!marked && /[ً-ٍ][اى]?$/.test(prev)) {
        const vowel = { 'ً': 'َ', 'ٌ': 'ُ', 'ٍ': 'ِ' }[prev.match(/([ً-ٍ])[اى]?$/)![1]];
        out[out.length - 1] = prev.replace(/[ً-ٍ][اى]?$/, vowel + 'نِ') + rest;
        src[src.length - 1] = src[src.length - 1].replace(/[ً-ٍ][اى]?$/, vowel + 'نِ') + (sun ? srcWord.slice(2) : srcWord.slice(1));
        joined[joined.length - 1] += 1;
        if (MADD_LAZIM.test(w)) held[held.length - 1] = true;
        continue;
      }
      if (!marked && /[َ-ِ]$|[اىوي]$/.test(prev)) {
        out[out.length - 1] = prev.replace(/وا$|[اىوي]$/, '') + rest;
        src[src.length - 1] = src[src.length - 1].replace(/وا$|[اىوي]$/, '') + (sun ? srcWord.slice(2) : srcWord.slice(1));
        joined[joined.length - 1] += 1;
        if (MADD_LAZIM.test(w)) held[held.length - 1] = true;
        continue;
      }
    }
    out.push(spoken);
    src.push(srcWord);
    joined.push(1);
    held.push(MADD_LAZIM.test(w));
  }
  if (out.length) {
    out[out.length - 1] = stopOn(out[out.length - 1]);
    src[src.length - 1] = stopOn(src[src.length - 1]);
  }
  const line = out.join(' ');
  const whole = RECITATION_LINES.find(([from]) => shaddaFirst(from) === line);
  if (whole) return `⟦${recitedIpa(whole[1])}|${line}⟧`;
  return out
    .map((w, i) => {
      const fix = RECITATION_PHONEMES.find(([from]) => shaddaFirst(from) === w);
      if (fix) return `⟦${recitedIpa(fix[1])}|${w}⟧`;
      // Said from phonemes: long joins, held vowels, and any doubled letter,
      // whose hold (ghunna, shadda) only the phoneme spelling can give.
      const doubled = /[\u0628-\u064A]\u0651/.test(w);
      if ((joined[i] >= MAX_JOINED_WORDS + 1 || held[i] || doubled) && !w.includes('⟦')) return `⟦${recitedIpa(recitationIpa(src[i]))}|${w}⟧`;
      // A phoneme word joined in wasl (āyātullāh) gets the same held sounds.
      const marked = w.match(PHONEME_WORD);
      if (marked) return `⟦${recitedIpa(marked[1])}|${marked[2]}⟧`;
      return w;
    })
    .join(' ');
}

/**
 * The Arabic exactly as it is spoken and recorded: mushaf marks normalized,
 * then the pronunciation fixes applied word by word. A word with a phoneme
 * fix comes out as ⟦ipa|word⟧; the recorder (buildSsml) and the tts function
 * turn that into a phoneme tag, and the phone's own voice takes plainSpoken().
 */
export function spokenArabic(text: string): string {
  if (text.startsWith(RECITE)) return recite(text.slice(RECITE.length));
  const normalized = normalizeArabicForSpeech(text);
  if ((!ARABIC_PRONUNCIATIONS.length && !ARABIC_PHONEMES.length) || !normalized) return normalized;
  return normalized
    .split(' ')
    .map((word) => {
      for (const [from, ipa] of ARABIC_PHONEMES) {
        if (word === from) return `⟦${ipa}|${word}⟧`;
      }
      for (const [from, to] of ARABIC_PRONUNCIATIONS) {
        for (const p of PREFIXES) {
          if (word === p + from) return p + to;
        }
      }
      return word;
    })
    .join(' ');
}

const PHONEME_MARK = /⟦([^|⟧]+)\|([^⟧]+)⟧/g;
/** ⟪arabic|plain⟫: a name the Arabic voice says inside a narrated sentence. */
const ARABIC_NAME_MARK = /⟪([^|⟫]+)\|([^⟫]+)⟫/g;

/** The spoken line with its marks taken back out to the plain words. */
export function plainSpoken(text: string): string {
  return text.replace(PHONEME_MARK, '$2').replace(ARABIC_NAME_MARK, '$2');
}

/** How fast the Arabic voice says a name inside a narrated sentence (chosen by ear). */
export function arabicNameRate(arabicVoice: string): string {
  return arabicVoice === VOICES.ar.female ? '+0%' : '-10%';
}

/** The Arabic voice of the narrator's gender: Aria and Denise get Zariyah. */
export function arabicVoiceForNarrator(voice: string): string {
  const female = voice === VOICES.en.female || voice === VOICES.fr.female;
  return female ? VOICES.ar.female : VOICES.ar.male;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SURAH_NAME_RE = new RegExp(
  `(\\b(?:Surah|Surat|Sura|[Ss]ourate)\\s+)(${Object.keys(SURAH_NAMES)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|')})(?![\\p{L}'’])`,
  'gu'
);

/** A second surah named in the same breath: "Surah Sad and Al Hijr", "sourate Sad et Al Hijr". */
const NEXT_NAME_RE = new RegExp(
  `(⟫(?:,|\\s+and|\\s+et|\\s+or|\\s+ou)\\s+)(${Object.keys(SURAH_NAMES)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|')})(?![\\p{L}'’])`,
  'gu'
);

const VERSE_WORDS = {
  en: { one: 'verse', many: 'verses', to: 'to' },
  fr: { one: 'verset', many: 'versets', to: 'à' },
} as const;
/** "43:13-14" right after a surah name; the voice read it out as "43 colon 13 dash 14". */
const VERSE_REF_RE = /⟫\s*(\d+)\s*:\s*(\d+)(?:\s*[-–]\s*(\d+))?/g;

/**
 * An English or French narration line exactly as it is spoken and recorded:
 * each surah name after "Surah" / "sourate" marked for the Arabic voice, and
 * the verse reference after it said in words ("verses 13 to 14"; the name
 * already says which surah). The text on screen keeps its numbers.
 */
export function spokenNarration(text: string, lang: 'en' | 'fr'): string {
  const w = VERSE_WORDS[lang];
  return text
    .replace(SURAH_NAME_RE, (_, lead: string, name: string) => `${lead}⟪${SURAH_NAMES[name]}|${name}⟫`)
    .replace(NEXT_NAME_RE, (_, lead: string, name: string) => `${lead}⟪${SURAH_NAMES[name]}|${name}⟫`)
    .replace(VERSE_REF_RE, (_, _surah: string, from: string, to?: string) =>
      to ? `⟫, ${w.many} ${from} ${w.to} ${to}` : `⟫, ${w.one} ${from}`
    );
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const withPhonemes = (escaped: string) =>
  escaped.replace(PHONEME_MARK, "<phoneme alphabet='ipa' ph='$1'>$2</phoneme>");

/**
 * The whole SSML request for one line. Phoneme marks become <phoneme> tags;
 * an Arabic-name mark closes the narrator's voice, lets the Arabic voice say
 * the name, and reopens the narrator, with the silence Azure puts around a
 * voice change taken out so the sentence still runs as one.
 * Mirrored in supabase/functions/tts, which builds the same request.
 */
export function buildSsml(text: string, voice: string, rate: string, locale: string): string {
  const segments: { voice: string; rate: string; text: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(ARABIC_NAME_MARK)) {
    segments.push({ voice, rate, text: text.slice(last, m.index) });
    const nameVoice = arabicVoiceForNarrator(voice);
    segments.push({ voice: nameVoice, rate: arabicNameRate(nameVoice), text: m[1] });
    last = m.index! + m[0].length;
  }
  segments.push({ voice, rate, text: text.slice(last) });
  const spoken = segments.filter((s) => s.text.trim());
  const body = spoken
    .map((s, i) => {
      const silence =
        (i > 0 ? "<mstts:silence type='Leading-exact' value='0ms'/>" : '') +
        (i < spoken.length - 1 ? "<mstts:silence type='Tailing-exact' value='0ms'/>" : '');
      return `<voice name='${s.voice}'>${silence}<prosody rate='${s.rate}'>${withPhonemes(escapeXml(s.text))}</prosody></voice>`;
    })
    .join('');
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='${locale}'>${body}</speak>`;
}
