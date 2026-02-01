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
export { lutStory, lutSubStories } from './stories/lut';
export { ismailStory, ismailSubStories } from './stories/ismail';
export { ishaqStory, ishaqSubStories } from './stories/ishaq';
export { yaqubStory, yaqubSubStories } from './stories/yaqub';
export { yusufStory, yusufSubStories } from './stories/yusuf';
export { ayyubStory, ayyubSubStories } from './stories/ayyub';
export { shuaybStory, shuaybSubStories } from './stories/shuayb';
export { musaStory, musaSubStories } from './stories/musa';
export { harunStory, harunSubStories } from './stories/harun';
export { dhulKiflStory, dhulKiflSubStories } from './stories/dhulkifl';
export { dawudStory, dawudSubStories } from './stories/dawud';
export { sulaymanStory, sulaymanSubStories } from './stories/sulayman';
export { ilyasStory, ilyasSubStories } from './stories/ilyas';
export { alyasaStory, alyasaSubStories } from './stories/alyasa';
export { yunusStory, yunusSubStories } from './stories/yunus';
export { zakariyaStory, zakariyaSubStories } from './stories/zakariya';
export { yahyaStory, yahyaSubStories } from './stories/yahya';
export { isaStory, isaSubStories } from './stories/isa';
export { muhammadStory, muhammadSubStories } from './stories/muhammad';

// Helper to get a prophet's full story data
import { Prophet, SubStory } from '../../../types/prophetStories';
import { getProphetById } from './prophets';
import { adamStory, adamSubStories } from './stories/adam';
import { idrisStory, idrisSubStories } from './stories/idris';
import { nuhStory, nuhSubStories } from './stories/nuh';
import { hudStory, hudSubStories } from './stories/hud';
import { salihStory, salihSubStories } from './stories/salih';
import { ibrahimStory, ibrahimSubStories } from './stories/ibrahim';
import { lutStory, lutSubStories } from './stories/lut';
import { ismailStory, ismailSubStories } from './stories/ismail';
import { ishaqStory, ishaqSubStories } from './stories/ishaq';
import { yaqubStory, yaqubSubStories } from './stories/yaqub';
import { yusufStory, yusufSubStories } from './stories/yusuf';
import { ayyubStory, ayyubSubStories } from './stories/ayyub';
import { shuaybStory, shuaybSubStories } from './stories/shuayb';
import { musaStory, musaSubStories } from './stories/musa';
import { harunStory, harunSubStories } from './stories/harun';
import { dhulKiflStory, dhulKiflSubStories } from './stories/dhulkifl';
import { dawudStory, dawudSubStories } from './stories/dawud';
import { sulaymanStory, sulaymanSubStories } from './stories/sulayman';
import { ilyasStory, ilyasSubStories } from './stories/ilyas';
import { alyasaStory, alyasaSubStories } from './stories/alyasa';
import { yunusStory, yunusSubStories } from './stories/yunus';
import { zakariyaStory, zakariyaSubStories } from './stories/zakariya';
import { yahyaStory, yahyaSubStories } from './stories/yahya';
import { isaStory, isaSubStories } from './stories/isa';
import { muhammadStory, muhammadSubStories } from './stories/muhammad';

// Map of prophet IDs to their story data
const prophetStories: Record<string, { prophet: Prophet; subStories: SubStory[] }> = {
  adam: { prophet: adamStory, subStories: adamSubStories },
  idris: { prophet: idrisStory, subStories: idrisSubStories },
  nuh: { prophet: nuhStory, subStories: nuhSubStories },
  hud: { prophet: hudStory, subStories: hudSubStories },
  salih: { prophet: salihStory, subStories: salihSubStories },
  ibrahim: { prophet: ibrahimStory, subStories: ibrahimSubStories },
  lut: { prophet: lutStory, subStories: lutSubStories },
  ismail: { prophet: ismailStory, subStories: ismailSubStories },
  ishaq: { prophet: ishaqStory, subStories: ishaqSubStories },
  yaqub: { prophet: yaqubStory, subStories: yaqubSubStories },
  yusuf: { prophet: yusufStory, subStories: yusufSubStories },
  ayyub: { prophet: ayyubStory, subStories: ayyubSubStories },
  shuayb: { prophet: shuaybStory, subStories: shuaybSubStories },
  musa: { prophet: musaStory, subStories: musaSubStories },
  harun: { prophet: harunStory, subStories: harunSubStories },
  'dhul-kifl': { prophet: dhulKiflStory, subStories: dhulKiflSubStories },
  dawud: { prophet: dawudStory, subStories: dawudSubStories },
  sulayman: { prophet: sulaymanStory, subStories: sulaymanSubStories },
  ilyas: { prophet: ilyasStory, subStories: ilyasSubStories },
  'al-yasa': { prophet: alyasaStory, subStories: alyasaSubStories },
  yunus: { prophet: yunusStory, subStories: yunusSubStories },
  zakariya: { prophet: zakariyaStory, subStories: zakariyaSubStories },
  yahya: { prophet: yahyaStory, subStories: yahyaSubStories },
  isa: { prophet: isaStory, subStories: isaSubStories },
  muhammad: { prophet: muhammadStory, subStories: muhammadSubStories },
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
