// Supabase Edge Function: tts
//
// The app's neural voices (Hamed and Zariyah for Arabic, Aria and Christopher
// for English, Denise and Henri for French) through Microsoft's official Azure
// Speech API. The key lives here, never in the app.
//
// Every clip is kept in the private `tts-cache` bucket under a hash of what was
// asked, so a verse or a story sentence is synthesized once for everyone and
// served from storage after that. That keeps the Azure bill near zero and makes
// repeat requests fast.
//
// Only signed-in users may call it, only for the voices the app uses, with a
// cap on text length and on how much fresh synthesis one account may ask for.
//
// Secrets (Supabase dashboard > Edge Functions > Secrets):
//   AZURE_SPEECH_KEY     — key 1 of the Azure Speech resource
//   AZURE_SPEECH_REGION  — its region, e.g. eastus
//
// Deploy:
//   supabase functions deploy tts --project-ref <ref>

import { createClient } from 'npm:@supabase/supabase-js@2';

const VOICES: Record<string, string> = {
  'ar-SA-HamedNeural': 'ar-SA',
  'ar-SA-ZariyahNeural': 'ar-SA',
  'en-US-AriaNeural': 'en-US',
  'en-US-ChristopherNeural': 'en-US',
  'fr-FR-DeniseNeural': 'fr-FR',
  'fr-FR-HenriNeural': 'fr-FR',
};
/** Longer than any verse or story paragraph the app sends in one piece. */
const MAX_TEXT = 4000;
/** Fresh (not cached) characters one account may have synthesized per day. */
const DAILY_CHAR_LIMIT = 60_000;
const BUCKET = 'tts-cache';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    });
    const { data: userData } = await asCaller.auth.getUser();
    const caller = userData?.user;
    if (!caller) return json({ error: 'unauthorized' }, 401);

    const { text, voice, rate } = await req.json().catch(() => ({}));
    if (typeof text !== 'string' || !text.trim()) return json({ error: 'text required' }, 400);
    if (text.length > MAX_TEXT) return json({ error: 'text too long' }, 413);
    const locale = typeof voice === 'string' ? VOICES[voice] : undefined;
    if (!locale) return json({ error: 'unknown voice' }, 400);
    const prosodyRate = typeof rate === 'string' && /^[+-]?\d{1,3}%$/.test(rate) ? rate : '+0%';

    const supa = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const path = `${voice}/${await sha256(`${voice}|${prosodyRate}|${text}`)}.mp3`;

    // Already made for someone: serve the kept copy.
    const cached = await supa.storage.from(BUCKET).download(path);
    if (cached.data) return audio(new Uint8Array(await cached.data.arrayBuffer()));

    // Live synthesis is off: every line the app plays is pre-recorded on the
    // voice CDN (scripts/voice/record.ts), and nothing a user does may spend
    // on Azure. A line that was never recorded falls back to the phone's own
    // voice in the app. Set TTS_LIVE=on to allow it again.
    if (Deno.env.get('TTS_LIVE') !== 'on') return json({ error: 'not recorded' }, 404);

    // Fresh synthesis costs money, so it is budgeted per account.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: usage } = await supa
      .from('tts_usage')
      .select('chars')
      .eq('user_id', caller.id)
      .gte('created_at', since);
    const used = (usage ?? []).reduce((sum, row) => sum + (row.chars as number), 0);
    if (used + text.length > DAILY_CHAR_LIMIT) return json({ error: 'daily limit reached' }, 429);

    const key = Deno.env.get('AZURE_SPEECH_KEY');
    const region = Deno.env.get('AZURE_SPEECH_REGION');
    if (!key || !region) return json({ error: 'voice not configured' }, 503);

    const ssml = buildSsml(text, voice, prosodyRate, locale);
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'iqra-tts',
      },
      body: ssml,
    });
    if (!res.ok) {
      console.error('tts: Azure refused', res.status, await res.text());
      return json({ error: 'synthesis failed' }, 502);
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (!bytes.length) return json({ error: 'synthesis failed' }, 502);

    // Keep it for everyone and count it against this account; neither may
    // stand between the listener and the clip they asked for.
    await Promise.allSettled([
      supa.storage.from(BUCKET).upload(path, bytes, { contentType: 'audio/mpeg', upsert: true }),
      supa.from('tts_usage').insert({ user_id: caller.id, chars: text.length }),
      // And on the voice CDN, under the name the app looks for first, so the
      // next listener anywhere is served the recording without this function.
      toVoiceCdn(`v1/${voice}/${clipName(text, voice, prosodyRate)}`, bytes),
    ]);
    return audio(bytes);
  } catch (e) {
    console.error('tts failed', e);
    return json({ error: 'internal error' }, 500);
  }
});

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * The app's clip name (src/services/speech/voicePlan.ts clipName), copied
 * exactly: the app looks for `v1/<voice>/<this>` on the voice CDN before it
 * calls here. Lines with a voice revision get a different name in the app,
 * so a copy saved here under the plain name is simply never asked for.
 */
function clipName(spoken: string, voice: string, rate: string): string {
  const seed = `${voice}|${rate}|${spoken}`;
  let a = 5381;
  let b = 0;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    a = ((a << 5) + a + c) >>> 0;
    b = (c + (b << 6) + (b << 16) - b) >>> 0;
  }
  return `${a.toString(36)}-${b.toString(36)}-${seed.length.toString(36)}.mp3`;
}

const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('');
const sha256Hex = async (data: Uint8Array | string) =>
  hex(await crypto.subtle.digest('SHA-256', (typeof data === 'string' ? enc.encode(data) : data) as BufferSource));
async function hmac(key: Uint8Array | ArrayBuffer, data: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey('raw', key as BufferSource, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', k, enc.encode(data));
}

/** Put a clip on the voice CDN (Cloudflare R2, S3 API, SigV4). Silent when not configured. */
async function toVoiceCdn(key: string, body: Uint8Array): Promise<void> {
  const account = Deno.env.get('R2_ACCOUNT_ID');
  const id = Deno.env.get('R2_ACCESS_KEY_ID');
  const secret = Deno.env.get('R2_SECRET_ACCESS_KEY');
  const bucket = Deno.env.get('R2_BUCKET') ?? 'iqra-voice';
  if (!account || !id || !secret) return;
  const host = `${account}.r2.cloudflarestorage.com`;
  const path = `/${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`;
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const day = amzDate.slice(0, 8);
  const payloadHash = await sha256Hex(body);
  const headers: Record<string, string> = {
    'cache-control': 'public, max-age=31536000, immutable',
    'content-type': 'audio/mpeg',
    host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  const signed = Object.keys(headers).sort();
  const canonical = ['PUT', path, '', ...signed.map((h) => `${h}:${headers[h]}`), '', signed.join(';'), payloadHash].join('\n');
  const scope = `${day}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, await sha256Hex(canonical)].join('\n');
  let k = await hmac(enc.encode(`AWS4${secret}`), day);
  for (const part of ['auto', 's3', 'aws4_request']) k = await hmac(k, part);
  const signature = hex(await hmac(k, toSign));
  headers.authorization = `AWS4-HMAC-SHA256 Credential=${id}/${scope}, SignedHeaders=${signed.join(';')}, Signature=${signature}`;
  const res = await fetch(`https://${host}${path}`, { method: 'PUT', headers, body: body as BodyInit });
  if (!res.ok) console.error('tts: voice CDN put failed', res.status, await res.text());
}

/** SSML is XML; unescaped prose would break the request. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const PHONEME_MARK = /⟦([^|⟧]+)\|([^⟧]+)⟧/g;
const ARABIC_NAME_MARK = /⟪([^|⟫]+)\|([^⟫]+)⟫/g;
/** Zariyah reads names at her own pace, Hamed a little slower (chosen by ear). */
const arabicNameRate = (voice: string) => (voice === 'ar-SA-ZariyahNeural' ? '+0%' : '-10%');

/** Aria and Denise get Zariyah for a name; the male narrators get Hamed. */
function arabicVoiceForNarrator(voice: string): string {
  return voice === 'en-US-AriaNeural' || voice === 'fr-FR-DeniseNeural' ? 'ar-SA-ZariyahNeural' : 'ar-SA-HamedNeural';
}

/**
 * The same request scripts/voice records with (src/services/speech/voicePlan.ts
 * buildSsml): ⟦ipa|word⟧ becomes a phoneme tag, and ⟪arabic|plain⟫ hands a
 * surah name to the Arabic voice inside a narrated sentence. Marks are read
 * from escaped text, so nothing in one can break out of the markup.
 */
function buildSsml(text: string, voice: string, rate: string, locale: string): string {
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
      const inner = escapeXml(s.text).replace(PHONEME_MARK, "<phoneme alphabet='ipa' ph='$1'>$2</phoneme>");
      return `<voice name='${s.voice}'>${silence}<prosody pitch='+0Hz' rate='${s.rate}' volume='+0%'>${inner}</prosody></voice>`;
    })
    .join('');
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='${locale}'>${body}</speak>`;
}

function audio(bytes: Uint8Array): Response {
  return new Response(new Blob([bytes as BlobPart], { type: 'audio/mpeg' }), {
    status: 200,
    headers: { 'Content-Type': 'audio/mpeg' },
  });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
