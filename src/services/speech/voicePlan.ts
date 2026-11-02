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
 * The Arabic exactly as it is spoken and recorded: mushaf marks normalized,
 * then the pronunciation fixes applied word by word. A word with a phoneme
 * fix comes out as ⟦ipa|word⟧; the recorder (buildSsml) and the tts function
 * turn that into a phoneme tag, and the phone's own voice takes plainSpoken().
 */
export function spokenArabic(text: string): string {
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
      return `<voice name='${s.voice}'>${silence}<prosody pitch='+0Hz' rate='${s.rate}' volume='+0%'>${withPhonemes(escapeXml(s.text))}</prosody></voice>`;
    })
    .join('');
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='${locale}'>${body}</speak>`;
}
