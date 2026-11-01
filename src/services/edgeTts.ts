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
/** A recorded clip is a small file on a CDN; give up quickly and synthesize instead. */
const CDN_TIMEOUT_MS = 15_000;

export type { EdgeGender, EdgeLang } from './speech/voicePlan';
export { voiceFor } from './speech/voicePlan';
import type { EdgeLang, EdgeGender } from './speech/voicePlan';
import { voiceFor, clipPath, spokenNarration, VOICE_CDN_URL } from './speech/voicePlan';

/**
 * Speak one piece of text, resolving with the MP3 bytes. Rejects when there is
 * no signed-in session, no network, or the service refuses; every caller
 * already falls back (kept clip, then the phone's own voice).
 */
export async function synthesize(rawText: string, voice: string, lang: EdgeLang, rate = '-4%'): Promise<Uint8Array> {
  // Narration says surah names with the Arabic voice; Arabic lines come
  // already spoken (spokenArabic).
  const text = lang === 'ar' ? rawText : spokenNarration(rawText, lang);
  // Recorded once for everyone: a plain download, no voice-service call.
  const recorded = await fromVoiceCdn(text, voice, rate);
  if (recorded) return recorded;

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
      // Marks go as they are: the function turns them into SSML.
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

/** The pre-recorded clip for this exact line, or null if it was never recorded. */
async function fromVoiceCdn(text: string, voice: string, rate: string): Promise<Uint8Array | null> {
  if (!VOICE_CDN_URL) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CDN_TIMEOUT_MS);
  try {
    const res = await fetch(`${VOICE_CDN_URL}/${clipPath(text, voice, rate)}`, { signal: controller.signal });
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    return bytes.length ? bytes : null;
  } catch {
    return null;
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
