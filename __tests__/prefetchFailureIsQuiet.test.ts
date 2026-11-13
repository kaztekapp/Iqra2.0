// A line fetched ahead of its turn is allowed to fail: when its turn comes it
// is fetched again or read by the phone's voice. The failure must not escape
// as an unhandled rejection, which Sentry reports as an error (IQRA2-5
// tts_resting and IQRA2-9 tts-not-recorded were exactly that).
jest.mock('expo-audio', () => ({ createAudioPlayer: jest.fn() }));
jest.mock('expo-speech', () => ({ speak: jest.fn(), stop: jest.fn(), getAvailableVoicesAsync: jest.fn(() => Promise.resolve([])) }));
jest.mock('../src/services/audioBus', () => ({
  registerAudioProducer: jest.fn(),
  claimAudio: jest.fn(),
  ensureAudioSession: jest.fn(() => Promise.resolve()),
  releaseAudioSessionIfIdle: jest.fn(),
}));
const mockSynthesize = jest.fn((..._args: unknown[]): Promise<Uint8Array> => Promise.reject(new Error('tts-not-recorded')));
jest.mock('../src/services/edgeTts', () => ({
  synthesize: (...args: unknown[]) => mockSynthesize(...args),
}));
const mockQuietly = jest.fn((..._args: unknown[]) => undefined);
jest.mock('../src/lib/report', () => ({
  quietly: (...args: unknown[]) => mockQuietly(...args),
  reportError: jest.fn(),
}));

import { prepareArabic } from '../src/services/speech/arabicTTS';

describe('a line fetched ahead', () => {
  it('fails quietly when the voice has no recording of it', async () => {
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on('unhandledRejection', onUnhandled);
    try {
      prepareArabic('ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ');
      // Let the fetch fail and Node decide whether anyone handled it.
      for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
      expect(mockSynthesize).toHaveBeenCalled();
      expect(unhandled).toEqual([]);
      expect(mockQuietly).toHaveBeenCalledWith(expect.any(Error), expect.stringContaining('prepare'));
    } finally {
      process.off('unhandledRejection', onUnhandled);
    }
  });
});
