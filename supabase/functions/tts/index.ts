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

    const ssml =
      `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${locale}'>` +
      `<voice name='${voice}'><prosody pitch='+0Hz' rate='${prosodyRate}' volume='+0%'>${escapeXml(text)}</prosody>` +
      `</voice></speak>`;
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

/** SSML is XML; unescaped prose would break the request. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
