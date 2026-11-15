// Walking the voice store asks every one of its thousands of files for its
// size and date. Doing that after every saved clip kept the processor above
// 80% and iOS killed the app in the background (cpu_resource_fatal,
// 2026-11-15). The store is walked once, then tracked by a running total.
let mockListCalls = 0;
const mockFiles = Array.from({ length: 3000 }, (_, i) => ({ size: 30_000, modificationTime: i, delete: jest.fn() }));
jest.mock('expo-file-system', () => {
  class File {
    uri: string; exists = true; size = 10; modificationTime = 0;
    constructor(uri: string) { this.uri = uri; }
    write() {} delete() {}
  }
  class Directory {
    list() { mockListCalls += 1; return mockFiles.map((f) => Object.assign(Object.create(File.prototype), f)); }
  }
  return { File, Directory, Paths: { document: { uri: 'file:///doc/' } } };
});
jest.mock('expo-file-system/legacy', () => ({
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: true })),
  makeDirectoryAsync: jest.fn(), deleteAsync: jest.fn(() => Promise.resolve()),
}));
jest.mock('../src/lib/offlineRoom', () => ({ roomToKeep: () => true }));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AppState } = require('react-native');
const mockAppState = { currentState: 'active' };
Object.defineProperty(AppState, 'currentState', { get: () => mockAppState.currentState, configurable: true });

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { pruneClips, keepClip } = require('../src/services/speech/arabicVoiceCache');

describe('the voice store', () => {
  beforeEach(() => { mockListCalls = 0; });

  it('is not walked in the background before its size is known', () => {
    mockAppState.currentState = 'background';
    pruneClips();
    expect(mockListCalls).toBe(0);
    mockAppState.currentState = 'active';
  });

  it('is walked once, then saves under the cap do not walk it again', async () => {
    pruneClips(); // 3000 × 30 kB = 90 MB, under the 500 MB cap
    expect(mockListCalls).toBe(1);
    for (let i = 0; i < 50; i++) {
      await keepClip(`clip-${i}.mp3`, new Uint8Array(100_000));
      pruneClips();
    }
    expect(mockListCalls).toBe(1);
  });

  it('is walked again once the saves take it past the cap', async () => {
    await keepClip('big.mp3', new Uint8Array(500 * 1024 * 1024));
    pruneClips();
    expect(mockListCalls).toBe(1);
  });
});
