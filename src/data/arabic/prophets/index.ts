// Prophet Stories Data - Main Export
// قصص الأنبياء - Stories of the Prophets

export { PROPHETS, getProphetById, getProphetsByOrderRange, TOTAL_PROPHETS } from './prophets';

// Story imports - Add as they are created
export { adamStory, adamSubStories } from './stories/adam';
export { idrisStory, idrisSubStories } from './stories/idris';
export { nuhStory, nuhSubStories } from './stories/nuh';
export { hudStory, hudSubStories } from './stories/hud';
export { salihStory, salihSubStories } from './stories/salih';
export { ibrahimStory, ibrahimSubStories } from './stories/ibrahim';

// Helper to get a prophet's full story data
import { Prophet, SubStory } from '../../../types/prophetStories';
import { getProphetById } from './prophets';
import { adamStory, adamSubStories } from './stories/adam';
import { idrisStory, idrisSubStories } from './stories/idris';
import { nuhStory, nuhSubStories } from './stories/nuh';
import { hudStory, hudSubStories } from './stories/hud';
import { salihStory, salihSubStories } from './stories/salih';
import { ibrahimStory, ibrahimSubStories } from './stories/ibrahim';

// Map of prophet IDs to their story data
const prophetStories: Record<string, { prophet: Prophet; subStories: SubStory[] }> = {
  adam: { prophet: adamStory, subStories: adamSubStories },
  idris: { prophet: idrisStory, subStories: idrisSubStories },
  nuh: { prophet: nuhStory, subStories: nuhSubStories },
  hud: { prophet: hudStory, subStories: hudSubStories },
  salih: { prophet: salihStory, subStories: salihSubStories },
  ibrahim: { prophet: ibrahimStory, subStories: ibrahimSubStories },
  // Add more prophets as their stories are created
};

// Get full story data for a prophet
export const getProphetStory = (prophetId: string): { prophet: Prophet; subStories: SubStory[] } | undefined => {
  // First check if we have full story data
  if (prophetStories[prophetId]) {
    return prophetStories[prophetId];
  }

  // Otherwise return just the metadata with empty sub-stories
  const prophet = getProphetById(prophetId);
  if (prophet) {
    return { prophet, subStories: [] };
  }

  return undefined;
};

// Check if a prophet has a complete story written
export const hasProphetStory = (prophetId: string): boolean => {
  return prophetId in prophetStories;
};

// Get list of prophets with full stories available
export const getProphetsWithStories = (): string[] => {
  return Object.keys(prophetStories);
};
