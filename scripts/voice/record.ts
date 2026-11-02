/**
 * Pre-records every spoken line of the stories and duas, one clip per line,
 * and uploads them to the voice CDN (Cloudflare R2), so the app plays files
 * instead of calling the voice service each time someone listens.
 *
 *   npx tsx scripts/voice/record.ts --dry-run        what is missing, and its size
 *   npx tsx scripts/voice/record.ts                  record and upload what is missing
 *   npx tsx scripts/voice/record.ts --find "آيَاتِنَا"  lines containing words, with their clip paths
 *   npx tsx scripts/voice/record.ts --try "آيَاتِنَا"   say a spelling with Hamed and play it here
 *
 * The plan comes from the app's own code (narrationPlan + voicePlan), so a
 * clip's name is exactly the one the app asks for. A line is only recorded
 * when its clip is not on the CDN yet: changing a line's text, adding a
 * pronunciation fix (src/services/speech/pronunciations.ts) or bumping a
 * revision (voiceRevisions.ts) gives just those lines new names, and only
 * they are recorded again.
 *
 * Credentials (git-ignored):
 *   credentials/r2.json  {"accountId","accessKeyId","secretAccessKey","bucket"}
 *   Azure Speech key: AZURE_SPEECH_KEY, or read with the az CLI from the
 *   iqra-speech-rec resource (S0, billed per character).
 */
import { createHash, createHmac } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildUtterances, type NarratableBlock } from '../../src/services/narrationPlan';
import {
  ARABIC_VOICE,
  NARRATION_RATE,
  chunkLine,
  clipPath,
  edgeRate,
  spokenArabic,
  spokenNarration,
  buildSsml,
  voiceFor,
} from '../../src/services/speech/voicePlan';
import { getProphetsWithStories, getProphetStory } from '../../src/data/arabic/prophets';
import { getQuranStories } from '../../src/data/arabic/quranStories';
import { DUAS } from '../../src/data/arabic/duas/duas';
import en from '../../src/i18n/locales/en';
import fr from '../../src/i18n/locales/fr';

type Item = { path: string; text: string; voice: string; rate: string; locale: string };

const ROOT = join(__dirname, '..', '..');
const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const value = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

// ---------------------------------------------------------------------------
// The plan: every (text, voice, rate) the app can ask for in stories and duas.
// ---------------------------------------------------------------------------

/** Both Arabic voices, each recorded at its own normal and slow rates (edgeRate). */
const ARABIC_VOICES = [voiceFor('ar', 'male'), voiceFor('ar', 'female')];

function duaBlocks(d: (typeof DUAS)[number], lang: 'en' | 'fr'): NarratableBlock[] {
  // Mirrors app/quran/duas/[duaId].tsx, with its section labels.
  const t = lang === 'fr' ? fr : en;
  const df = (t as any).duasFeature;
  const blocks: NarratableBlock[] = [
    { id: `${d.id}-dua`, type: 'narrative', content: `﴿${d.arabicText}﴾ ${d.translation}`, contentFr: `﴿${d.arabicText}﴾ ${d.translationFr ?? d.translation}` },
  ];
  if (d.occasion) blocks.push({ id: `${d.id}-occasion`, type: 'narrative', content: `${df.whenToRecite}. ${d.occasion}`, contentFr: `${df.whenToRecite}. ${d.occasionFr ?? d.occasion}` });
  if (d.virtues) blocks.push({ id: `${d.id}-virtues`, type: 'narrative', content: `${df.virtuesRewards}. ${d.virtues}`, contentFr: `${df.virtuesRewards}. ${d.virtuesFr ?? d.virtues}` });
  if (d.story) blocks.push({ id: `${d.id}-story`, type: 'narrative', content: `${df.backgroundStory}. ${d.story}`, contentFr: `${df.backgroundStory}. ${d.storyFr ?? d.story}` });
  return blocks;
}

/** Data the learning screens speak from: everything but the Quran text, stories and duas. */
const LEARNING_SKIP = [/\/quran\/surahs\//, /\/prophets\//, /\/quranStories\//, /\/duas\//, /\/legal\//, /\/community\//];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : [];
  });
}

/**
 * Every Arabic string literal in the learning data. A string counts when most
 * of its letters are Arabic, so an English sentence quoting one Arabic word
 * is left out; lines a screen builds itself are recorded by the tts function
 * the first time anyone hears them.
 */
export function learningArabic(): string[] {
  const out = new Set<string>();
  const literal = /(['"`])((?:\\.|(?!\1).)*?)\1/g;
  for (const file of walk(join(ROOT, 'src', 'data'))) {
    if (LEARNING_SKIP.some((re) => re.test(file))) continue;
    for (const m of readFileSync(file, 'utf8').matchAll(literal)) {
      const s = m[2].replace(/\\n/g, ' ').trim();
      const arabic = (s.match(/[\u0621-\u064A]/g) ?? []).length;
      const latin = (s.match(/[A-Za-z]/g) ?? []).length;
      if (arabic >= 1 && arabic >= latin * 2) out.add(s);
    }
  }
  return [...out];
}

export function buildPlan(): Item[] {
  const items = new Map<string, Item>();
  const addArabic = (line: string) => {
    for (const chunk of chunkLine(line)) {
      const text = spokenArabic(chunk);
      if (!text.trim()) continue;
      // Both Arabic voices: the ayahs follow the narrator's gender.
      for (const voice of ARABIC_VOICES) {
        for (const rate of [edgeRate(1, voice), edgeRate(0.6, voice)]) {
          const path = clipPath(text, voice, rate);
          items.set(path, { path, text, voice, rate, locale: 'ar-SA' });
        }
      }
    }
  };
  const addNarration = (text: string, lang: 'en' | 'fr') => {
    // Surah names marked for the Arabic voice, exactly as the app sends them.
    const body = spokenNarration(text.trim(), lang);
    if (!body) return;
    for (const gender of ['female', 'male'] as const) {
      const voice = voiceFor(lang, gender);
      const path = clipPath(body, voice, NARRATION_RATE);
      items.set(path, { path, text: body, voice, rate: NARRATION_RATE, locale: lang === 'fr' ? 'fr-FR' : 'en-US' });
    }
  };

  const storySets: NarratableBlock[][] = [];
  for (const id of getProphetsWithStories()) {
    for (const sub of getProphetStory(id)?.subStories ?? []) storySets.push(sub.content as NarratableBlock[]);
  }
  for (const s of getQuranStories()) storySets.push(s.content as NarratableBlock[]);

  for (const lang of ['en', 'fr'] as const) {
    const lc = (a: string, b?: string) => (lang === 'fr' ? b ?? a : a);
    const sets = [...storySets, ...DUAS.map((d) => duaBlocks(d, lang))];
    for (const blocks of sets) {
      for (const u of buildUtterances(blocks, lang, lc)) {
        if (u.lang === 'ar') addArabic(u.text);
        else addNarration(u.text, u.lang);
      }
    }
  }
  // The dua's own Arabic player reads the whole dua text.
  for (const d of DUAS) addArabic(d.arabicText);
  // The learning screens (alphabet, vocabulary, verbs, grammar, numbers,
  // prayer, tajweed, quizzes, reading, calendar) speak fields of the data
  // as they are, so every Arabic string in it is recorded.
  for (const line of learningArabic()) addArabic(line);
  return [...items.values()];
}

// ---------------------------------------------------------------------------
// Azure Speech (S0) and Cloudflare R2 (S3 API).
// ---------------------------------------------------------------------------

function azureKey(): string {
  if (process.env.AZURE_SPEECH_KEY) return process.env.AZURE_SPEECH_KEY;
  return execFileSync('az', ['cognitiveservices', 'account', 'keys', 'list', '-n', 'iqra-speech-rec', '-g', 'iqra', '--query', 'key1', '-o', 'tsv'], { encoding: 'utf8' }).trim();
}

async function synthesize(key: string, item: Pick<Item, 'text' | 'voice' | 'rate' | 'locale'>): Promise<Buffer> {
  // Same request as supabase/functions/tts, so a recorded clip sounds like a live one.
  const ssml = buildSsml(item.text, item.voice, item.rate, item.locale);
  for (let attempt = 1; ; attempt++) {
    const res = await fetch('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'iqra-voice-recorder',
      },
      body: ssml,
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length) return buf;
    }
    if (attempt >= 6 || (res.status !== 429 && res.status < 500 && res.ok === false)) {
      throw new Error(`azure ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

type R2 = { accountId: string; accessKeyId: string; secretAccessKey: string; bucket: string };

export function r2Config(): R2 {
  return JSON.parse(readFileSync(join(ROOT, 'credentials', 'r2.json'), 'utf8'));
}

const sha256 = (d: string | Buffer) => createHash('sha256').update(d).digest('hex');
const hmac = (k: Buffer | string, d: string) => createHmac('sha256', k).update(d).digest();

/** Minimal AWS SigV4 for R2 (region "auto", service "s3"). */
export async function r2(cfg: R2, method: 'GET' | 'PUT', key: string, query = '', body?: Buffer, extra: Record<string, string> = {}) {
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const path = `/${cfg.bucket}/${key.split('/').map(encodeURIComponent).join('/')}`.replace(/\/$/, key ? '' : '/');
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const day = amzDate.slice(0, 8);
  const payloadHash = sha256(body ?? '');
  const headers: Record<string, string> = { host, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amzDate, ...extra };
  const signed = Object.keys(headers).map((h) => h.toLowerCase()).sort();
  const canonical = [
    method,
    path,
    query,
    ...signed.map((h) => `${h}:${headers[Object.keys(headers).find((k) => k.toLowerCase() === h)!].trim()}`),
    '',
    signed.join(';'),
    payloadHash,
  ].join('\n');
  const scope = `${day}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256(canonical)].join('\n');
  const kSigning = hmac(hmac(hmac(hmac(`AWS4${cfg.secretAccessKey}`, day), 'auto'), 's3'), 'aws4_request');
  const signature = createHmac('sha256', kSigning).update(toSign).digest('hex');
  headers.authorization = `AWS4-HMAC-SHA256 Credential=${cfg.accessKeyId}/${scope}, SignedHeaders=${signed.join(';')}, Signature=${signature}`;
  return fetch(`https://${host}${path}${query ? `?${query}` : ''}`, { method, headers, body });
}

async function listExisting(cfg: R2): Promise<Set<string>> {
  const keys = new Set<string>();
  let token: string | undefined;
  do {
    const params = [`list-type=2`, `max-keys=1000`, `prefix=v1%2F`];
    if (token) params.push(`continuation-token=${encodeURIComponent(token)}`);
    const res = await r2(cfg, 'GET', '', params.sort().join('&'));
    const xml = await res.text();
    if (!res.ok) throw new Error(`r2 list ${res.status}: ${xml.slice(0, 200)}`);
    for (const m of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) keys.add(m[1]);
    token = /<IsTruncated>true<\/IsTruncated>/.test(xml) ? xml.match(/<NextContinuationToken>([^<]+)</)?.[1] : undefined;
  } while (token);
  return keys;
}

// ---------------------------------------------------------------------------

async function main() {
  if (value('--try')) {
    const text = spokenArabic(value('--try')!);
    const voice = value('--voice') === 'female' ? voiceFor('ar', 'female') : ARABIC_VOICE;
    const rate = value('--rate') ?? edgeRate(1, voice);
    const audio = await synthesize(azureKey(), { text, voice, rate, locale: 'ar-SA' });
    const file = join(mkdtempSync(join(tmpdir(), 'iqra-try-')), 'try.mp3');
    writeFileSync(file, audio);
    console.log(`spoken as: ${text}  (${rate})`);
    execFileSync('afplay', [file]);
    return;
  }

  const plan = buildPlan();
  if (value('--find')) {
    const words = value('--find')!.split(/\s+/).map((w) => spokenArabic(w));
    for (const it of plan) if (words.every((w) => it.text.includes(w))) console.log(`${it.voice} ${it.rate}\n  ${it.text}\n  ${it.path}`);
    return;
  }

  const chars = (items: Item[]) => items.reduce((n, it) => n + it.text.length, 0);
  const byVoice = (items: Item[]) =>
    Object.entries(items.reduce<Record<string, number>>((m, it) => ((m[it.voice] = (m[it.voice] ?? 0) + 1), m), {}))
      .map(([v, n]) => `${v} ${n}`)
      .join(', ');
  console.log(`plan: ${plan.length} clips, ${chars(plan)} characters (${byVoice(plan)})`);

  const cfg = r2Config();
  const existing = await listExisting(cfg);
  const missing = plan.filter((it) => !existing.has(it.path));
  const limit = Number(value('--limit') ?? Infinity);
  const todo = missing.slice(0, limit);
  console.log(`on the CDN: ${existing.size}; missing: ${missing.length} (${chars(missing)} characters, about $${((chars(missing) / 1e6) * 16).toFixed(2)})`);
  if (flag('--dry-run') || !todo.length) return;

  const key = azureKey();
  let done = 0;
  let failed = 0;
  const started = Date.now();
  const queue = [...todo];
  const worker = async () => {
    for (let it = queue.shift(); it; it = queue.shift()) {
      try {
        const audio = await synthesize(key, it);
        const res = await r2(cfg, 'PUT', it.path, '', audio, {
          'content-type': 'audio/mpeg',
          'cache-control': 'public, max-age=31536000, immutable',
        });
        if (!res.ok) throw new Error(`r2 put ${res.status}: ${(await res.text()).slice(0, 200)}`);
        done++;
      } catch (e) {
        failed++;
        console.error(`FAILED ${it.path}: ${(e as Error).message}`);
      }
      if ((done + failed) % 100 === 0) {
        const rate = (done + failed) / ((Date.now() - started) / 1000);
        console.log(`${done + failed}/${todo.length} (${failed} failed) — ${Math.round((todo.length - done - failed) / rate / 60)} min left`);
      }
    }
  };
  await Promise.all(Array.from({ length: Number(value('--parallel') ?? 8) }, worker));
  console.log(`recorded ${done}, failed ${failed}, in ${Math.round((Date.now() - started) / 60000)} min`);
  if (failed) process.exitCode = 1;
}

// Importable (for audits of the plan) without recording anything.
if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
