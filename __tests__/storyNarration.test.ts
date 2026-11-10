import { act } from 'react-test-renderer';

// The engine talks to two voices and the audio bus; here they answer at once.
const spoken: string[] = [];
jest.mock('../src/services/storyAudioService', () => ({
  storyAudioService: {
    prime: jest.fn(async () => {}),
    prepare: jest.fn(),
    speak: jest.fn(async (text: string) => { spoken.push(text); return 'done'; }),
    getEngine: () => 'edge',
    stop: jest.fn(async () => {}),
    pause: jest.fn(async () => true),
    resume: jest.fn(async () => {}),
    resetSession: jest.fn(),
    discardPrepared: jest.fn(),
    setGender: jest.fn(),
    setNowPlaying: jest.fn(),
    setTransportListener: jest.fn(),
    setNarrating: jest.fn(),
    saveClip: jest.fn(),
    hasClip: () => false,
  },
  estimateSeconds: (t: string) => t.length / 10,
}));
jest.mock('../src/services/speech/arabicTTS', () => ({
  speakArabic: jest.fn(async (text: string, o: { onDone: () => void }) => { spoken.push(text); o.onDone(); }),
  stopArabic: jest.fn(),
  prewarmArabicVoice: jest.fn(),
  isArabicSpeaking: () => false,
  setArabicNowPlaying: jest.fn(),
  prepareArabic: jest.fn(),
  discardPreparedArabic: jest.fn(),
  setArabicVoiceGender: jest.fn(),
  forgiveArabicEdge: jest.fn(),
  hasArabicClip: () => false,
  saveArabicClip: jest.fn(),
}));
jest.mock('../src/services/audioBus', () => ({ releaseAudioSessionIfIdle: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

import {
  useNarrationStore,
  buildUtterances,
  attachNarration,
  seekNarrationToBlock,
  startNarration,
  stopNarration,
  NarratableBlock,
} from '../src/services/storyNarration';
import { useNarrationResumeStore } from '../src/stores/narrationResumeStore';

const blocks: NarratableBlock[] = [
  { id: 'b0', type: 'narrative', content: 'First paragraph.' },
  { id: 'b1', type: 'narrative', content: 'Second paragraph.' },
  { id: 'b2', type: 'narrative', content: 'Third paragraph.' },
];
const lc = (en: string) => en;
const session = (key: string) => ({
  key,
  route: '/quran/stories/kahf',
  title: 'Al-Kahf',
  lang: 'en' as const,
  utterances: buildUtterances(blocks, 'en', lc),
  blockCount: blocks.length,
});
// The loop breathes for 260 ms after a line before it moves on or ends.
const settle = () => act(async () => { await new Promise((r) => setTimeout(r, 400)); });

describe('story narration engine', () => {
  beforeEach(async () => {
    spoken.length = 0;
    await stopNarration();
  });

  it('reads from the tapped paragraph', async () => {
    attachNarration(session('kahf|en'));
    expect(useNarrationStore.getState().status).toBe('idle');
    seekNarrationToBlock(2);
    await settle();
    expect(spoken).toEqual(['Third paragraph.']);
    expect(useNarrationStore.getState().status).toBe('idle'); // the story ended
  });

  it('keeps reading when the same story attaches again, and stops for another', async () => {
    attachNarration(session('kahf|en'));
    startNarration(0);
    await act(async () => { await new Promise((r) => setTimeout(r, 5)); });
    expect(useNarrationStore.getState().status).toBe('playing');
    attachNarration(session('kahf|en')); // the screen came back
    expect(useNarrationStore.getState().status).toBe('playing');
    attachNarration(session('maryam|en')); // a different story
    expect(useNarrationStore.getState().status).toBe('idle');
    await settle();
  });

  it('picks a reading up where it was left, even after the app was closed', async () => {
    // A reading stopped on its third sentence in an earlier launch.
    useNarrationResumeStore.getState().savePosition('yusuf|en', 2);
    attachNarration(session('yusuf|en'));
    expect(useNarrationStore.getState().index).toBe(2);
    startNarration(useNarrationStore.getState().index);
    await settle();
    expect(spoken).toEqual(['Third paragraph.']);
    // Heard to the end: the next listen starts from the beginning.
    expect(useNarrationResumeStore.getState().positions['yusuf|en']).toBeUndefined();
  });

  it('remembers the sentence being read', async () => {
    attachNarration(session('isa|en'));
    seekNarrationToBlock(1);
    await act(async () => { await new Promise((r) => setTimeout(r, 5)); });
    expect(useNarrationResumeStore.getState().positions['isa|en']?.index).toBe(1);
    await settle();
  });
});

