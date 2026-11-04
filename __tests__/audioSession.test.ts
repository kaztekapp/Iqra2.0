// Releasing the audio session switches audio off; Android then refuses every
// player until it is switched back on. Bringing the session back must do that,
// or every verse after the app first went quiet plays silently.
const calls: string[] = [];
jest.mock('expo-audio', () => ({
  setAudioModeAsync: jest.fn(async () => { calls.push('mode'); }),
  setIsAudioActiveAsync: jest.fn(async (on: boolean) => { calls.push(on ? 'on' : 'off'); }),
}));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ensureAudioSession, releaseAudioSessionIfIdle } = require('../src/services/audioBus');

describe('audio session', () => {
  it('switches audio back on when the session returns after a release', async () => {
    await ensureAudioSession('longform');
    releaseAudioSessionIfIdle();
    await ensureAudioSession('longform');
    const off = calls.lastIndexOf('off');
    expect(off).toBeGreaterThan(-1);
    expect(calls.slice(off)).toEqual(['off', 'on', 'mode']);
  });
});
