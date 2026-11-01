// A line is first looked up among the pre-recorded clips on the voice CDN;
// only a line that was never recorded goes to the tts Edge Function (official
// Azure Speech). This pins what the app sends and how it fails, since every
// caller relies on a rejection to fall back.
jest.mock('expo-file-system', () => ({ File: jest.fn(), Paths: {} }));
const mockSession = jest.fn();
jest.mock('../src/lib/supabase', () => ({ safeGetSession: () => mockSession() }));

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { synthesize, voiceFor } = require('../src/services/edgeTts');
const { VOICE_CDN_URL, clipPath } = require('../src/services/speech/voicePlan');

const ok = (bytes: number[]) =>
  Promise.resolve({ ok: true, status: 200, arrayBuffer: () => Promise.resolve(new Uint8Array(bytes).buffer) });
const notRecorded = () => Promise.resolve({ ok: false, status: 404 });
const isCdn = (url: string) => url.startsWith(`${VOICE_CDN_URL}/`);
/** Function calls only, leaving out the CDN lookups. */
const functionCalls = () => (global.fetch as jest.Mock).mock.calls.filter(([url]) => !isCdn(url));

describe('tts client', () => {
  beforeEach(() => {
    mockSession.mockResolvedValue({ access_token: 'user-jwt' });
    (global as unknown as { fetch: jest.Mock }).fetch = jest.fn((url: string) => (isCdn(url) ? notRecorded() : ok([1, 2, 3])));
  });

  it('plays a recorded line from the CDN without calling the function', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => (isCdn(url) ? ok([7, 8]) : ok([1, 2, 3])));
    mockSession.mockResolvedValue(null);
    const bytes = await synthesize('hello', voiceFor('en', 'female'), 'en', '-4%');
    expect(Array.from(bytes)).toEqual([7, 8]);
    expect((global.fetch as jest.Mock).mock.calls.map(([url]) => url))
      .toEqual([`${VOICE_CDN_URL}/${clipPath('hello', 'en-US-AriaNeural', '-4%')}`]);
  });

  it('asks the tts function as the signed-in user, with the voice and rate', async () => {
    const bytes = await synthesize('بِسْمِ اللَّهِ', voiceFor('ar', 'male'), 'ar', '-4%');
    expect(Array.from(bytes)).toEqual([1, 2, 3]);
    const [url, init] = functionCalls()[0];
    expect(url).toBe('https://example.supabase.co/functions/v1/tts');
    expect(init.headers.Authorization).toBe('Bearer user-jwt');
    expect(init.headers.apikey).toBe('anon-key');
    expect(JSON.parse(init.body)).toEqual({ text: 'بِسْمِ اللَّهِ', voice: 'ar-SA-HamedNeural', rate: '-4%' });
  });

  it('rejects an unrecorded line without a session, without calling the function', async () => {
    mockSession.mockResolvedValue(null);
    await expect(synthesize('hello', voiceFor('en', 'female'), 'en')).rejects.toThrow('tts-signed-out');
    expect(functionCalls()).toHaveLength(0);
  });

  it('rejects on a refused or empty answer so callers fall back', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => (isCdn(url) ? notRecorded() : Promise.resolve({ ok: false, status: 429 })));
    await expect(synthesize('hello', voiceFor('en', 'male'), 'en')).rejects.toThrow('tts-429');
    (global.fetch as jest.Mock).mockImplementation((url: string) => (isCdn(url) ? notRecorded() : ok([])));
    await expect(synthesize('hello', voiceFor('en', 'male'), 'en')).rejects.toThrow('tts-empty');
  });

  it('uses the six voices the function allows', () => {
    expect([voiceFor('ar', 'male'), voiceFor('ar', 'female'), voiceFor('en', 'male'), voiceFor('en', 'female'), voiceFor('fr', 'male'), voiceFor('fr', 'female')].sort())
      .toEqual(['ar-SA-HamedNeural', 'ar-SA-ZariyahNeural', 'en-US-AriaNeural', 'en-US-ChristopherNeural', 'fr-FR-DeniseNeural', 'fr-FR-HenriNeural']);
  });
});
