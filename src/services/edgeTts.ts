/**
 * The app's neural voices, from Microsoft's official Azure Speech API.
 *
 * They are the same voices Edge's "read aloud" uses, and the only way to get
 * a genuinely good MALE voice on an iPhone: Apple exposes no good male voice
 * to third-party apps. Until October 2026 the app reached them through Edge's
 * read-aloud endpoint by presenting itself as the Edge browser; that was not a
 * permitted use of the service (and broke whenever Microsoft changed its
 * request signing), so synthesis now goes through the `tts` Edge Function,
 * which holds the Azure key, keeps one shared copy of every clip, and only
 * answers signed-in users. The module keeps its old name and exports so the
 * callers (Arabic speech, story narration) did not have to change.
 */
import { File, Paths } from 'expo-file-system';
import { safeGetSession } from '../lib/supabase';

const FUNCTION_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''}/functions/v1/tts`;
const ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
/** A long paragraph made fresh still answers well inside this. */
const SYNTH_TIMEOUT_MS = 60_000;

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
 * Speak one piece of text, resolving with the MP3 bytes. Rejects when there is
 * no signed-in session, no network, or the service refuses; every caller
 * already falls back (kept clip, then the phone's own voice).
 */
export async function synthesize(text: string, voice: string, _lang: EdgeLang, rate = '-4%'): Promise<Uint8Array> {
  const session = await safeGetSession();
  if (!session?.access_token) throw new Error('tts-signed-out');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SYNTH_TIMEOUT_MS);
  try {
    const res = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voice, rate }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`tts-${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (!bytes.length) throw new Error('tts-empty');
    return bytes;
  } catch (e) {
    if (controller.signal.aborted) throw new Error('tts-timeout');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export async function synthesizeToFile(
  text: string,
  lang: EdgeLang,
  gender: EdgeGender,
  rate = '-4%'
): Promise<string> {
  const bytes = await synthesize(text, voiceFor(lang, gender), lang, rate);
  const file = new File(Paths.cache, `story-${Date.now()}-${Math.floor(Math.random() * 1e6)}.mp3`);
  file.write(bytes);
  return file.uri;
}

export default { synthesize, synthesizeToFile, voiceFor };
