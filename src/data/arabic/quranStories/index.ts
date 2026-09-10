// Quran Stories Data - Main Export
// قصص القرآن الأخرى - Other Stories from the Quran
//
// Stories are loaded on demand, not at import.
//
// This file used to import all ten at the top, so anything touching it built
// every block of every story first. The Quran tab paid that for a count; a
// single story paid it for itself and nine others. Same mistake as the
// prophets index, fixed the same way.
//
// The require() calls sit inside functions on purpose. Metro evaluates a
// module the first time it is actually required, so a story is built when it
// is opened and never before. Keep them there, and keep the paths literal —
// Metro cannot resolve a computed one.

import { QuranStory } from '../../../types/quranStories';

/** Story ids in display order. The count comes from here, so it costs nothing. */
export const QURAN_STORY_IDS = [
  'kahf',
  'khidr',
  'dhulqarnayn',
  'luqman',
  'maryam',
  'qarun',
  'ukhdud',
  'twogardens',
  'habilqabil',
  'uzayr',
  'fil',
  'qaryah',
  'ashabaljannah',
  'muminalfirawn',
  'talut',
  'sabt',
] as const;

export const TOTAL_QURAN_STORIES = QURAN_STORY_IDS.length;

const STORY_LOADERS: Record<string, () => QuranStory> = {
  kahf: () => require('./stories/kahf').kahfStory,
  khidr: () => require('./stories/khidr').khidrStory,
  dhulqarnayn: () => require('./stories/dhulqarnayn').dhulQarnaynStory,
  luqman: () => require('./stories/luqman').luqmanStory,
  maryam: () => require('./stories/maryam').maryamStory,
  qarun: () => require('./stories/qarun').qarunStory,
  ukhdud: () => require('./stories/ukhdud').ukhdudStory,
  twogardens: () => require('./stories/twogardens').twoGardensStory,
  habilqabil: () => require('./stories/habilqabil').habilQabilStory,
  uzayr: () => require('./stories/uzayr').uzayrStory,
  fil: () => require('./stories/fil').filStory,
  qaryah: () => require('./stories/qaryah').qaryahStory,
  ashabaljannah: () => require('./stories/ashabaljannah').ashabAlJannahStory,
  muminalfirawn: () => require('./stories/muminalfirawn').muminAlFirawnStory,
  talut: () => require('./stories/talut').talutStory,
  sabt: () => require('./stories/sabt').sabtStory,
};

/** Built stories, so reopening one costs nothing. */
const loaded = new Map<string, QuranStory>();

/** One story, built on first request. */
export const getQuranStoryById = (id: string): QuranStory | undefined => {
  const cached = loaded.get(id);
  if (cached) return cached;
  const load = STORY_LOADERS[id];
  if (!load) return undefined;
  const story = load();
  loaded.set(id, story);
  return story;
};

/**
 * Every story, in order. Only the stories list needs this, for search; it is
 * the one place that pays for all ten, and it is the screen they belong to.
 */
export const getQuranStories = (): QuranStory[] =>
  QURAN_STORY_IDS.map((id) => getQuranStoryById(id)!).filter(Boolean);

export const getQuranStoriesByCategory = (category: string): QuranStory[] =>
  getQuranStories().filter((story) => story.category === category);
