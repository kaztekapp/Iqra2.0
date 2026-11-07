// A verse stopped while its clip is still being fetched must never start
// afterwards: pressing stop, or closing Memorize, used to be followed by the
// verse playing anyway, and the verse before it kept playing too.
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

describe('stop while a verse is loading', () => {
  it('starts nothing once stopped, and releases the verse that was playing', async () => {
    mockSynthesize.mockResolvedValueOnce('file:///one.mp3');
    await quranAudioService.playAyah(1, 1, { neural: true, text: VERSE });
    expect(mockPlayers).toHaveLength(1);
    const first = mockPlayers[0] as unknown as { remove: jest.Mock; release: jest.Mock };

    let finish: (url: string) => void = () => {};
    mockSynthesize.mockImplementationOnce(() => new Promise<string>((r) => { finish = r; }));
    const onComplete = jest.fn();
    const onError = jest.fn();
    const loading = quranAudioService.playAyah(1, 2, { neural: true, text: VERSE, onComplete, onError });
    await new Promise((r) => setTimeout(r, 0));

    await quranAudioService.stop();
    finish('file:///two.mp3');
    await loading;

    expect(mockPlayers).toHaveLength(1);
    expect(first.remove.mock.calls.length + first.release.mock.calls.length).toBeGreaterThan(0);
    expect(onError).not.toHaveBeenCalled();
  });

  it('plays the next verse asked for after the stop', async () => {
    mockSynthesize.mockResolvedValueOnce('file:///three.mp3');
    await quranAudioService.playAyah(1, 3, { neural: true, text: VERSE });
    expect(mockPlayers[mockPlayers.length - 1].url).toBe('file:///three.mp3');
  });
});
