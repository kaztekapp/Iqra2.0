/**
 * Microsoft Edge's read-aloud voices.
 *
 * These are Azure neural voices, and they are free and keyless: the same
 * service Edge uses for "read aloud" on a web page. It is what the opus-report
 * project narrates with, and it is the only way to get a genuinely good MALE
 * voice on an iPhone. Apple exposes no good male voice to third-party apps —
 * the ones a stock phone has are the old Fred and the Eloquence novelties —
 * and the Google endpoint we used before serves exactly one female voice per
 * language.
 *
 * Synthesis is WebSocket-only, so this is more machinery than a plain fetch:
 *
 *   1. Build a Sec-MS-GEC token (v2, see below) from the current time in
 *      Windows file-time, rounded down to five minutes, joined to a fixed
 *      client token. The hashing is done here in plain JavaScript rather than
 *      with expo-crypto, which is only a transitive dependency and so may not
 *      be in the installed binary. This has to keep working over the air.
 *   2. Open the socket, send a config frame, then an SSML frame.
 *   3. Audio arrives as binary frames, each with a small text header whose
 *      length is the first two bytes. Concatenate what follows.
 *   4. `Path:turn.end` on a text frame means the utterance is complete.
 */
import { File, Paths } from 'expo-file-system';
import { quietly } from '../lib/report';

const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const GEC_VERSION = '2-143.0.3650.75';
const WIN_EPOCH_SECONDS = 11644473600;
/**
 * Give up only when the socket has gone QUIET for this long. Audio streams
 * back frame by frame from the first second, so a request that is still
 * sending is still fine however long the paragraph; the old fixed 12-second
 * budget failed every long hadith and got the neural voice retired.
 */
const SYNTH_IDLE_TIMEOUT_MS = 15000;
/** And never wait longer than this in total, whatever arrives. */
const SYNTH_MAX_MS = 120000;

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

const LOCALES: Record<EdgeLang, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-SA' };

export function voiceFor(lang: EdgeLang, gender: EdgeGender): string {
  return VOICES[lang][gender];
}

// ---------------------------------------------------------------------------
// Sec-MS-GEC v2, plain JavaScript. No native module, so it cannot fail to link.
//
// Microsoft stopped accepting the v1 token (a plain SHA-256): by 2026-10-22
// every request signed that way got HTTP 403, which silenced the Quran
// learning voice and every other Edge voice in the app. v2 is a SHA-256 over a fixed
// secret prefix plus the same time-and-client string, whose first block is
// pre-folded into the constants below, followed by a "CS64" mix keyed by that
// digest. Ported line for line from edge-tts 7.3.1 (drm.generate_sec_ms_gec_v2)
// and checked against it for identical tokens at several timestamps.
// ---------------------------------------------------------------------------

const SHA256_INITIAL = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
const SHA256_STATE = [0xfd9fbea2, 0x91243ce7, 0xbe499094, 0xcd2e1e0a, 0x6c006f49, 0x04bd35ab, 0xfeb0a7e4, 0x03effbd2];
const SHA256_SCHEDULE = [
  0xeb24bf9e, 0x1558691f, 0xa0c09ee2, 0x0cfa32ba, 0xa622ee8c, 0xd1dd9491, 0xc0dd25a0,
  0xf9e70ab6, 0xf0c31573, 0x7058ce4e, 0x7188e606, 0x00e5ab33, 0xd258b060, 0x72766564,
];
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
const SHA256_ADJUSTMENT = 0xc9dc06a7;
const BLOCK_K = K.slice(0, 14).concat([SHA256_ADJUSTMENT], K.slice(15));
const SIGMA0_ADJUSTMENT = 0x059c0b80;
const SIGMA1_ADJUSTMENT = 0x000b92c0;
const CS64_COEFFICIENTS: [number, number][] = [
  [0xe82e91b1, 0xb32700d0], [0x44de24c6, 0x88dff51d], [0x3beb65bc, 0x29514038], [0xc89c5933, 0xb328cbdf],
  [0x8d1ec211, 0xd405b4d5], [0x314ef5d5, 0x26e55f3c], [0xe92491b1, 0x607801c6], [0xf0a5b9d5, 0x82b2c1fb],
  [0x06064cf3, 0xfa51a3da], [0xda79fa60, 0x207cc464], [0xbed20560, 0x3c3c74f3], [0x89f9c9f8, 0xd2d14b61],
  [0x35fa38c6, 0xbb04a2c1], [0xcb49e3c6, 0xc5626167],
];
const CS64_FACTOR = 0x82893933;
const CS64_ADJUSTMENT0 = 0xf2f90b1a;
const CS64_ADJUSTMENT1 = 0x0b1a0000;

const u32 = (x: number) => x >>> 0;
const mul32 = (a: number, b: number) => Math.imul(a, b) >>> 0;
const rotr = (x: number, n: number) => ((x >>> n) | (x << (32 - n))) >>> 0;
const rol16 = (x: number) => ((x << 16) | (x >>> 16)) >>> 0;
const sigma0 = (x: number) => u32(rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3));
const sigma1 = (x: number) => u32(rotr(x, 17) ^ rotr(x, 19) ^ (x >>> 10));

function shaRounds(state: number[], w: number[], first: number, k: number[]): number[] {
  let [a, b, c, d, e, f, g, h] = state;
  for (let i = first; i < 64; i++) {
    const t1 = u32(h + u32(rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + u32(g ^ (e & (f ^ g))) + k[i] + w[i]);
    const t2 = u32(u32(rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + u32((a & b) | (c & (a | b))));
    h = g; g = f; f = e; e = u32(d + t1); d = c; c = b; b = a; a = u32(t1 + t2);
  }
  return [a, b, c, d, e, f, g, h];
}

function expandSchedule(w: number[], from: number): void {
  for (let i = from; i < 64; i++) w[i] = u32(sigma1(w[i - 2]) + w[i - 7] + sigma0(w[i - 15]) + w[i - 16]);
}

/** The state after the secret prefix and the first seven bytes of `data`. */
function tokenShaInit(d: Uint8Array): number[] {
  const w = new Array<number>(64).fill(0);
  w[14] = ((d[0] << 16) | (d[1] << 8) | d[2]) >>> 0;
  w[15] = ((d[3] << 24) | (d[4] << 16) | (d[5] << 8) | d[6]) >>> 0;
  for (let i = 16; i < 30; i++) {
    let v = SHA256_SCHEDULE[i - 16];
    if (i - 2 >= 14) v = u32(v + (i === 16 ? u32(sigma1(w[i - 2]) ^ SIGMA1_ADJUSTMENT) : sigma1(w[i - 2])));
    if (i - 7 >= 14) v = u32(v + w[i - 7]);
    if (i - 15 >= 14) v = u32(v + (i === 29 ? u32(sigma0(w[i - 15]) ^ SIGMA0_ADJUSTMENT) : sigma0(w[i - 15])));
    w[i] = v;
  }
  w[30] = u32(sigma1(w[28]) + w[23] + sigma0(w[15]) + w[14] + SHA256_ADJUSTMENT - K[14]);
  expandSchedule(w, 31);
  const working = shaRounds(SHA256_STATE, w, 14, BLOCK_K);
  return SHA256_INITIAL.map((x, i) => u32(x + working[i]));
}

function tokenSha256(data: Uint8Array): Uint8Array {
  const length = 57 + data.length;
  const zeros = (((55 - length) % 64) + 64) % 64;
  const tail = data.length - 7;
  const padded = new Uint8Array(tail + 1 + zeros + 8);
  padded.set(data.subarray(7), 0);
  padded[tail] = 0x80;
  const bits = length * 8;
  const end = padded.length;
  padded[end - 4] = (bits >>> 24) & 0xff;
  padded[end - 3] = (bits >>> 16) & 0xff;
  padded[end - 2] = (bits >>> 8) & 0xff;
  padded[end - 1] = bits & 0xff;
  let state = tokenShaInit(data);
  for (let off = 0; off < padded.length; off += 64) {
    const w = new Array<number>(64).fill(0);
    for (let i = 0; i < 16; i++) {
      const p = off + i * 4;
      w[i] = ((padded[p] << 24) | (padded[p + 1] << 16) | (padded[p + 2] << 8) | padded[p + 3]) >>> 0;
    }
    expandSchedule(w, 16);
    const working = shaRounds(state, w, 0, K);
    state = state.map((x, i) => u32(x + working[i]));
  }
  const out = new Uint8Array(32);
  state.forEach((x, i) => {
    out[i * 4] = x >>> 24;
    out[i * 4 + 1] = (x >>> 16) & 0xff;
    out[i * 4 + 2] = (x >>> 8) & 0xff;
    out[i * 4 + 3] = x & 0xff;
  });
  return out;
}

function tokenCs64(data: Uint8Array, digest: Uint8Array): [number, number] {
  const le = (b: Uint8Array, i: number) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;
  const keyA = u32(le(digest, 0) | 1);
  const keyB = u32(le(digest, 4) | 1);
  const factors = [mul32(keyA, CS64_FACTOR), mul32(keyB, CS64_FACTOR)];
  const terms = CS64_COEFFICIENTS.map(([coefficient], i) => mul32(coefficient, factors[i % 2]));
  const offsets = CS64_COEFFICIENTS.map(([, offset]) => offset);
  const words: number[] = [];
  const src = new Uint8Array(Math.ceil((1 + data.length) / 4) * 4);
  src.set(data, 1);
  for (let i = 0; i < src.length; i += 4) words.push(le(src, i));
  if (words.length % 2) words.push(0);
  words.forEach((word, i) => {
    let term = mul32(word, i % 2 === 0 ? keyA : keyB);
    let offset = mul32(rol16(word), i % 2 === 0 ? 0xef0569fb : 0xc31713db);
    if (i === 0) {
      term = u32(term + mul32(CS64_ADJUSTMENT0, factors[0]));
      offset = u32(offset + CS64_ADJUSTMENT1);
    }
    terms.push(term);
    offsets.push(offset);
  });
  let swapAcc = 0;
  let swapLast = 0;
  let state = 0;
  let acc = 0;
  for (let i = 0; i < terms.length; i += 2) {
    const x = terms[i];
    const y = terms[i + 1];
    let t = rol16(u32(offsets[i] + x));
    let q = mul32(t, 0x76f50f34);
    swapAcc = u32(swapAcc + u32(mul32(rol16(q), 0xc3efea97) + q));
    t = rol16(u32(offsets[i + 1] + y));
    q = mul32(t, 0x1881ce3c);
    swapLast = u32(mul32(rol16(q), 0x35bd1ec9) + q);
    swapAcc = u32(swapAcc + swapLast);
    state = u32(mul32(state, keyA) + x);
    state = mul32(rol16(state), 0xcf98b111);
    state = mul32(rol16(state), 0x87085b9f);
    state = mul32(rol16(state), 0x12ceb96d);
    state = mul32(rol16(state), 0x257e1d83);
    acc = u32(acc + state);
    t = u32(mul32(state, keyB) + y);
    t = mul32(rol16(t), 0xa27416f5);
    t = mul32(rol16(t), 0xd38396ff);
    state = mul32(rol16(mul32(rol16(t), 0x7c932b89)), 0xbfa49f69);
    acc = u32(acc + state);
  }
  return [u32(swapLast ^ state), u32(swapAcc ^ acc)];
}

const toHex = (bytes: ArrayLike<number>) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
const wordHexLE = (w: number) => toHex([w & 0xff, (w >>> 8) & 0xff, (w >>> 16) & 0xff, w >>> 24]);

/** The v2 Sec-MS-GEC token: `<16 hex CS64>-<64 hex SHA-256>`. */
export function secMsGec(now = Date.now()): string {
  let ticks = Math.floor(now / 1000) + WIN_EPOCH_SECONDS;
  ticks -= ticks % 300; // the token is only valid to a five-minute window
  // 100-nanosecond intervals. Beyond 2^53 an integer would lose precision, so
  // build the digits rather than multiplying.
  const text = `${ticks}0000000${TRUSTED_CLIENT_TOKEN}`;
  const data = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) data[i] = text.charCodeAt(i);
  const digest = tokenSha256(data);
  const [w0, w1] = tokenCs64(data, digest);
  return `${wordHexLE(w0)}${wordHexLE(w1)}-${toHex(digest)}`;
}

/** A fresh random MUID cookie, as Edge sends with every request. */
function muid(): string {
  let s = '';
  for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s.toUpperCase();
}

// ---------------------------------------------------------------------------

function uuid(): string {
  let s = '';
  for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s;
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

/** Speak one piece of text, resolving with the MP3 bytes. */
export function synthesize(text: string, voice: string, lang: EdgeLang, rate = '-4%'): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const url =
      `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1` +
      `?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}` +
      `&Sec-MS-GEC=${secMsGec()}&Sec-MS-GEC-Version=${GEC_VERSION}&ConnectionId=${uuid()}`;

    let socket: WebSocket;
    try {
      // React Native's WebSocket takes a third options argument for headers.
      // The DOM typings do not describe it, hence the cast.
      socket = new (WebSocket as any)(url, undefined, {
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
          Origin: 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',
          'Accept-Language': 'en-US,en;q=0.9',
          Cookie: `muid=${muid()};`,
        },
      });
    } catch (e) {
      reject(e);
      return;
    }
    socket.binaryType = 'arraybuffer';

    const parts: Uint8Array[] = [];
    let total = 0;
    let done = false;

    const finish = (fn: () => void) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      clearTimeout(cap);
      try {
        socket.close();
      } catch (e) { quietly(e, 'services/edgeTts'); }
      fn();
    };

    let timer = setTimeout(() => finish(() => reject(new Error('edge-tts-timeout'))), SYNTH_IDLE_TIMEOUT_MS);
    const cap = setTimeout(() => finish(() => reject(new Error('edge-tts-timeout'))), SYNTH_MAX_MS);
    const stillAlive = () => {
      clearTimeout(timer);
      timer = setTimeout(() => finish(() => reject(new Error('edge-tts-timeout'))), SYNTH_IDLE_TIMEOUT_MS);
    };

    socket.onopen = () => {
      const stamp = new Date().toString();
      socket.send(
        `X-Timestamp:${stamp}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
          `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false",` +
          `"wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`
      );
      const locale = LOCALES[lang];
      const ssml =
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${locale}'>` +
        `<voice name='${voice}'><prosody pitch='+0Hz' rate='${rate}' volume='+0%'>${escapeXml(text)}</prosody>` +
        `</voice></speak>`;
      socket.send(
        `X-RequestId:${uuid()}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${stamp}Z\r\nPath:ssml\r\n\r\n${ssml}`
      );
    };

    socket.onmessage = (event: MessageEvent) => {
      stillAlive();
      const data = event.data;
      if (typeof data === 'string') {
        if (data.includes('Path:turn.end')) {
          if (!total) {
            finish(() => reject(new Error('edge-tts-empty')));
            return;
          }
          const merged = new Uint8Array(total);
          let at = 0;
          for (const part of parts) {
            merged.set(part, at);
            at += part.length;
          }
          finish(() => resolve(merged));
        }
        return;
      }
      // Binary: two-byte big-endian header length, header, then audio.
      const bytes = new Uint8Array(data as ArrayBuffer);
      if (bytes.length < 2) return;
      const headerLength = (bytes[0] << 8) | bytes[1];
      const audio = bytes.subarray(2 + headerLength);
      if (audio.length) {
        parts.push(audio);
        total += audio.length;
      }
    };

    socket.onerror = () => finish(() => reject(new Error('edge-tts-socket')));
    socket.onclose = () => finish(() => reject(new Error('edge-tts-closed')));
  });
}

/** Synthesize and drop the audio in the cache, returning a playable uri. */
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

export default { synthesize, synthesizeToFile, voiceFor, secMsGec };
