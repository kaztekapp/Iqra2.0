// Prophet Stories Data - Main Export
// قصص الأنبياء - Stories of the Prophets
//
// Stories are loaded ONE AT A TIME, on the tap that opens them.
//
// This file used to import all 25 at the top, which meant that anything
// touching it — the Quran tab, which wants only a count, or the prophets
// list, which wants only names — built every block of every story first.
// That is 0.85 MB of object literals and a thousand blocks, and it was the
// wait between tapping a story card and seeing the story.
//
// The require() calls below sit inside functions on purpose. Metro evaluates
// a module the first time it is actually required, so a story is built when
// someone opens it and never before. Keep them there: turning one back into
// a top-level import quietly restores the old cost. The paths have to be
// literal strings for the same reason — Metro cannot resolve a computed one.

export { PROPHETS, getProphetById, getProphetsByOrderRange, TOTAL_PROPHETS } from './prophets';

import { Prophet, SubStory } from '../../../types/prophetStories';
import { getProphetById } from './prophets';

type ProphetStory = { prophet: Prophet; subStories: SubStory[] };

const STORY_LOADERS: Record<string, () => ProphetStory> = {
  adam: () => {
    const m = require('./stories/adam');
    return { prophet: m.adamStory, subStories: m.adamSubStories };
  },
  idris: () => {
    const m = require('./stories/idris');
    return { prophet: m.idrisStory, subStories: m.idrisSubStories };
  },
  nuh: () => {
    const m = require('./stories/nuh');
    return { prophet: m.nuhStory, subStories: m.nuhSubStories };
  },
  hud: () => {
    const m = require('./stories/hud');
    return { prophet: m.hudStory, subStories: m.hudSubStories };
  },
  salih: () => {
    const m = require('./stories/salih');
    return { prophet: m.salihStory, subStories: m.salihSubStories };
  },
  ibrahim: () => {
    const m = require('./stories/ibrahim');
    return { prophet: m.ibrahimStory, subStories: m.ibrahimSubStories };
  },
  lut: () => {
    const m = require('./stories/lut');
    return { prophet: m.lutStory, subStories: m.lutSubStories };
  },
  ismail: () => {
    const m = require('./stories/ismail');
    return { prophet: m.ismailStory, subStories: m.ismailSubStories };
  },
  ishaq: () => {
    const m = require('./stories/ishaq');
    return { prophet: m.ishaqStory, subStories: m.ishaqSubStories };
  },
  yaqub: () => {
    const m = require('./stories/yaqub');
    return { prophet: m.yaqubStory, subStories: m.yaqubSubStories };
  },
  yusuf: () => {
    const m = require('./stories/yusuf');
    return { prophet: m.yusufStory, subStories: m.yusufSubStories };
  },
  ayyub: () => {
    const m = require('./stories/ayyub');
    return { prophet: m.ayyubStory, subStories: m.ayyubSubStories };
  },
  shuayb: () => {
    const m = require('./stories/shuayb');
    return { prophet: m.shuaybStory, subStories: m.shuaybSubStories };
  },
  musa: () => {
    const m = require('./stories/musa');
    return { prophet: m.musaStory, subStories: m.musaSubStories };
  },
  harun: () => {
    const m = require('./stories/harun');
    return { prophet: m.harunStory, subStories: m.harunSubStories };
  },
  'dhul-kifl': () => {
    const m = require('./stories/dhulkifl');
    return { prophet: m.dhulKiflStory, subStories: m.dhulKiflSubStories };
  },
  dawud: () => {
    const m = require('./stories/dawud');
    return { prophet: m.dawudStory, subStories: m.dawudSubStories };
  },
  sulayman: () => {
    const m = require('./stories/sulayman');
    return { prophet: m.sulaymanStory, subStories: m.sulaymanSubStories };
  },
  ilyas: () => {
    const m = require('./stories/ilyas');
    return { prophet: m.ilyasStory, subStories: m.ilyasSubStories };
  },
  'al-yasa': () => {
    const m = require('./stories/alyasa');
    return { prophet: m.alyasaStory, subStories: m.alyasaSubStories };
  },
  yunus: () => {
    const m = require('./stories/yunus');
    return { prophet: m.yunusStory, subStories: m.yunusSubStories };
  },
  zakariya: () => {
    const m = require('./stories/zakariya');
    return { prophet: m.zakariyaStory, subStories: m.zakariyaSubStories };
  },
  yahya: () => {
    const m = require('./stories/yahya');
    return { prophet: m.yahyaStory, subStories: m.yahyaSubStories };
  },
  isa: () => {
    const m = require('./stories/isa');
    return { prophet: m.isaStory, subStories: m.isaSubStories };
  },
  muhammad: () => {
    const m = require('./stories/muhammad');
    return { prophet: m.muhammadStory, subStories: m.muhammadSubStories };
  },
};

/** Built stories, so reopening one costs nothing. */
const loaded = new Map<string, ProphetStory>();

// Get full story data for a prophet
export const getProphetStory = (prophetId: string): ProphetStory | undefined => {
  const cached = loaded.get(prophetId);
  if (cached) return cached;

  const load = STORY_LOADERS[prophetId];
  if (load) {
    const story = load();
    loaded.set(prophetId, story);
    return story;
  }

  // No written story yet — the metadata alone still renders the screen.
  const prophet = getProphetById(prophetId);
  if (prophet) {
    return { prophet, subStories: [] };
  }

  return undefined;
};

// Check if a prophet has a complete story written. Deliberately does not
// load it: the list screen asks this for all 25.
export const hasProphetStory = (prophetId: string): boolean => {
  return prophetId in STORY_LOADERS;
};

// Get list of prophets with full stories available
export const getProphetsWithStories = (): string[] => {
  return Object.keys(STORY_LOADERS);
};
