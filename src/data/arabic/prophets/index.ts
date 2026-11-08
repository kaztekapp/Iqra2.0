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

import { Prophet, SubStory } from '../../../types/prophetStories';
import { getProphetById } from './prophets';
import { STORY_FILES } from '../../../../assets/stories';
import { readDataFile } from '../../../lib/dataFile';

export { PROPHETS, getProphetById, getProphetsByOrderRange, TOTAL_PROPHETS } from './prophets';

/**
 * Each story is a data file (assets/stories, written from the source files
 * by scripts/stories/exportStoryFiles.ts), read the first time it is opened
 * and kept in memory after.
 */
type ProphetStory = { prophet: Prophet; subStories: SubStory[] };
const reading = new Map<string, Promise<ProphetStory | undefined>>();

/** Built stories, so reopening one costs nothing. */
const loaded = new Map<string, ProphetStory>();

/** The story if it has been read already, else undefined. */
export const getProphetStory = (prophetId: string): ProphetStory | undefined => loaded.get(prophetId);

/** Read a prophet's story from its data file (once; later calls share it). */
export const loadProphetStory = (prophetId: string): Promise<ProphetStory | undefined> => {
  const done = loaded.get(prophetId);
  if (done) return Promise.resolve(done);
  const running = reading.get(prophetId);
  if (running) return running;
  const module = STORY_FILES[prophetId];
  if (module === undefined) {
    // No written story yet: the metadata alone still renders the screen.
    const prophet = getProphetById(prophetId);
    return Promise.resolve(prophet ? { prophet, subStories: [] } : undefined);
  }
  const work = readDataFile<ProphetStory>(module)
    .then((story) => {
      loaded.set(prophetId, story);
      return story;
    })
    .finally(() => reading.delete(prophetId));
  reading.set(prophetId, work);
  return work;
};

// Check if a prophet has a complete story written. Deliberately does not
// load it: the list screen asks this for all 25.
export const hasProphetStory = (prophetId: string): boolean => {
  return prophetId in STORY_FILES;
};

// Get list of prophets with full stories available
export const getProphetsWithStories = (): string[] => {
  return Object.keys(STORY_FILES);
};
