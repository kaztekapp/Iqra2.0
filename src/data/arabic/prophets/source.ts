import { Prophet, SubStory } from '../../../types/prophetStories';

/**
 * The prophet stories as written: the master copy. Read by the voice
 * recorder, the tests and scripts/stories/exportStoryFiles.ts, which writes
 * the data files the app reads (assets/stories). The app never imports this
 * file, so the stories are not part of its code: every over-the-air update
 * re-sends the code to every phone, and the stories were 5 MB of it.
 */
export type ProphetStory = { prophet: Prophet; subStories: SubStory[] };

export const STORY_LOADERS: Record<string, () => ProphetStory> = {
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
    return { prophet: m.dhulkiflStory, subStories: m.dhulkiflSubStories };
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

export const getProphetStorySource = (prophetId: string): ProphetStory | undefined => STORY_LOADERS[prophetId]?.();

export const getProphetsWithStorySource = (): string[] => Object.keys(STORY_LOADERS);
