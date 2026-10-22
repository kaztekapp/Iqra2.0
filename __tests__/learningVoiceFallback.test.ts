// When the learning voice (a network service) cannot be made, the reciter must
// read the verse instead of the screen going silent, and the voice is left to
// rest for a while before it is tried again.
const mockPlayers: { url: string }[] = [];
jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn((url: string) => {
    const player = {
      url,
      setPlaybackRate: jest.fn(),
      setActiveForLockScreen: jest.fn(),
      clearLockScreenControls: jest.fn(),
      addListener: jest.fn(() => ({ remove: jest.fn() })),
      play: jest.fn(),
      pause: jest.fn(),
      remove: jest.fn(),
      release: jest.fn(),
    };
    mockPlayers.push(player);
    return player;
  }),
}));
jest.mock('../src/services/audioBus', () => ({
  registerAudioProducer: jest.fn(),
  claimAudio: jest.fn(),
  ensureAudioSession: jest.fn(() => Promise.resolve()),
  releaseAudioSessionIfIdle: jest.fn(),
}));
jest.mock('../src/data/arabic/quran/surahs', () => ({
  getSurahByNumber: () => ({ nameEnglish: 'Al-Fatihah', ayahCount: 7 }),
}));
jest.mock('../src/services/audioCacheService', () => ({
  audioCacheService: {
    getAudioUrl: jest.fn((remote: string) => Promise.resolve(remote)),
    cacheAudio: jest.fn(() => Promise.resolve()),
    isCached: jest.fn(() => Promise.resolve(true)),
    getCacheStatus: jest.fn(() => Promise.resolve({ isCached: true })),
  },
}));
const mockSynthesize = jest.fn((..._args: unknown[]): Promise<string> => Promise.resolve(""));
const mockHasClip = jest.fn((..._args: unknown[]) => false);
jest.mock('../src/services/speech/arabicTTS', () => ({
  synthesizeAyahToFile: (...args: unknown[]) => mockSynthesize(...args),
  hasArabicClip: (...args: unknown[]) => mockHasClip(...args),
}));
const mockReportError = jest.fn((..._args: unknown[]) => undefined);
jest.mock('../src/lib/report', () => ({
  quietly: jest.fn(),
  reportError: (...args: unknown[]) => mockReportError(...args),
}));

import { quranAudioService } from '../src/services/quranAudioService';

const VERSE = 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ';
const lastUrl = () => mockPlayers[mockPlayers.length - 1]?.url;

describe('learning voice fallback', () => {
  const heard: boolean[] = [];
  let unsubscribe: () => void;

  beforeAll(() => {
    unsubscribe = quranAudioService.onSpokenVoiceFallback((usingReciter) => heard.push(usingReciter));
  });
  afterAll(() => unsubscribe());

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000);
  });
  afterEach(() => jest.restoreAllMocks());

  it('plays the reciter when the voice cannot be made, and says so', async () => {
    mockSynthesize.mockRejectedValueOnce(new Error('edge-tts-socket'));
    const onError = jest.fn();

    await quranAudioService.playAyah(1, 2, { neural: true, text: VERSE, onError });

    expect(mockSynthesize).toHaveBeenCalledTimes(1);
    expect(lastUrl()).toMatch(/001002\.mp3$/);
    expect(onError).not.toHaveBeenCalled();
    expect(heard).toEqual([true]);
    expect(mockReportError).toHaveBeenCalledTimes(1);
  });

  it('goes straight to the reciter while the voice rests, without another round trip', async () => {
    mockSynthesize.mockClear();
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000 + 60_000);

    await quranAudioService.playAyah(1, 3, { neural: true, text: VERSE });

    expect(mockSynthesize).not.toHaveBeenCalled();
    expect(lastUrl()).toMatch(/001003\.mp3$/);
    expect(heard[heard.length - 1]).toBe(true);
  });

  it('still reads a verse already kept on the phone in the learning voice while resting', async () => {
    mockSynthesize.mockClear().mockResolvedValueOnce('file:///kept/verse.mp3');
    mockHasClip.mockReturnValueOnce(true);
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000 + 60_000);

    await quranAudioService.playAyah(1, 4, { neural: true, text: VERSE });

    expect(mockSynthesize).toHaveBeenCalledTimes(1);
    expect(lastUrl()).toBe('file:///kept/verse.mp3');
    expect(heard[heard.length - 1]).toBe(false);
  });

  it('tries the voice again after the rest, and reports a session only once', async () => {
    mockSynthesize.mockClear().mockRejectedValueOnce(new Error('edge-tts-socket'));
    // The kept-clip success above cleared the rest; fail once more to start it again.
    await quranAudioService.playAyah(1, 5, { neural: true, text: VERSE });
    expect(mockReportError).toHaveBeenCalledTimes(1);

    mockSynthesize.mockClear().mockResolvedValueOnce('file:///fresh/verse.mp3');
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000 + 3 * 60_000);

    await quranAudioService.playAyah(1, 6, { neural: true, text: VERSE });

    expect(mockSynthesize).toHaveBeenCalledTimes(1);
    expect(lastUrl()).toBe('file:///fresh/verse.mp3');
    expect(heard[heard.length - 1]).toBe(false);
  });
});
