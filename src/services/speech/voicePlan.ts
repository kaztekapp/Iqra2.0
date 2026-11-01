/**
 * The voice plan: which voice, at which rate, says which exact text, and the
 * name its clip goes by. Shared by the app (playback, saved clips, the voice
 * CDN look-up) and by scripts/voice, which pre-records every story and dua
 * line, so a recorded file is always the one the app asks for. Pure: no React
 * Native, no network.
 */

import { normalizeArabicForSpeech } from '../narrationText';
import { ARABIC_PRONUNCIATIONS } from './pronunciations';
import { VOICE_REVISIONS } from './voiceRevisions';

/** Hamed reads full tashkeel cleanly; every line of Arabic is his. */
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
export function edgeRate(speed: number): string {
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
 * then the pronunciation fixes applied word by word.
 */
export function spokenArabic(text: string): string {
  const normalized = normalizeArabicForSpeech(text);
  if (!ARABIC_PRONUNCIATIONS.length || !normalized) return normalized;
  return normalized
    .split(' ')
    .map((word) => {
      for (const [from, to] of ARABIC_PRONUNCIATIONS) {
        for (const p of PREFIXES) {
          if (word === p + from) return p + to;
        }
      }
      return word;
    })
    .join(' ');
}
