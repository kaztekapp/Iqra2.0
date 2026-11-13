// A story listened to in the background for a long time must not grow the
// app until the system kills it (reported 2026-11-13, iPhone and Android).
const mockPreload = jest.fn((..._a: unknown[]) => Promise.resolve());
const mockClear = jest.fn((..._a: unknown[]) => Promise.resolve());
jest.mock('expo-audio', () => ({
  preload: (...a: unknown[]) => mockPreload(...a),
  clearPreloadedSource: (...a: unknown[]) => mockClear(...a),
}));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));

import { preloadClip, clipTaken } from '../src/services/speech/clipPreload';
import { lockScreenClaimed, lockScreenOwnedBy, lockScreenReleased } from '../src/services/speech/lockScreenOwner';

describe('a clip that has been played', () => {
  it('lets its preloaded copy go (Android kept every one in memory)', () => {
    preloadClip('file:///cache/sentence-1.mp3');
    clipTaken('file:///cache/sentence-1.mp3');
    expect(mockClear).toHaveBeenCalledWith({ uri: 'file:///cache/sentence-1.mp3' });
  });
});

describe('the lock-screen controls', () => {
  it('are claimed again only when another player took them', () => {
    const story = {};
    const verse = {};
    lockScreenClaimed(story);
    expect(lockScreenOwnedBy(story)).toBe(true); // next sentence: no new claim
    lockScreenClaimed(verse);
    expect(lockScreenOwnedBy(story)).toBe(false); // after the verse: claim back
    lockScreenReleased(verse);
    expect(lockScreenOwnedBy(verse)).toBe(false);
    expect(lockScreenOwnedBy(null)).toBe(false);
  });
});

describe('waits during a story', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('end on a native audio report when timers do not run (Android in the background)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { sleep, audioTick } = require('../src/services/speech/audioClock');
    let done = false;
    const wait = sleep(260).then(() => { done = true; });
    // Timers are paused: time passes, no timer fires.
    jest.setSystemTime(Date.now() + 300);
    audioTick();
    await wait;
    expect(done).toBe(true);
  });

  it('do not end early on a report that comes too soon', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { sleep, audioTick } = require('../src/services/speech/audioClock');
    let done = false;
    void sleep(260).then(() => { done = true; });
    audioTick();
    await Promise.resolve();
    expect(done).toBe(false);
    jest.advanceTimersByTime(260); // foreground: the timer ends it
    await Promise.resolve();
    expect(done).toBe(true);
  });
});
