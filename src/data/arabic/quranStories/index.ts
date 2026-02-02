// Quran Stories Data - Main Export
// قصص القرآن الأخرى - Other Stories from the Quran

import { QuranStory } from '../../../types/quranStories';

// Import stories as they are created
import { kahfStory } from './stories/kahf';
import { khidrStory } from './stories/khidr';
import { dhulQarnaynStory } from './stories/dhulqarnayn';
import { luqmanStory } from './stories/luqman';
import { maryamStory } from './stories/maryam';
import { qarunStory } from './stories/qarun';
import { ukhdudStory } from './stories/ukhdud';
import { twoGardensStory } from './stories/twogardens';
import { habilQabilStory } from './stories/habilqabil';
import { uzayrStory } from './stories/uzayr';

// All Quran stories in order
export const QURAN_STORIES: QuranStory[] = [
  kahfStory,
  khidrStory,
  dhulQarnaynStory,
  luqmanStory,
  maryamStory,
  qarunStory,
  ukhdudStory,
  twoGardensStory,
  habilQabilStory,
  uzayrStory,
];

export const TOTAL_QURAN_STORIES = QURAN_STORIES.length;

// Helper functions
export const getQuranStoryById = (id: string): QuranStory | undefined => {
  return QURAN_STORIES.find(story => story.id === id);
};

export const getQuranStoriesByCategory = (category: string): QuranStory[] => {
  return QURAN_STORIES.filter(story => story.category === category);
};

// Export individual stories
export { kahfStory } from './stories/kahf';
export { khidrStory } from './stories/khidr';
export { dhulQarnaynStory } from './stories/dhulqarnayn';
export { luqmanStory } from './stories/luqman';
export { maryamStory } from './stories/maryam';
export { qarunStory } from './stories/qarun';
export { ukhdudStory } from './stories/ukhdud';
export { twoGardensStory } from './stories/twogardens';
export { habilQabilStory } from './stories/habilqabil';
export { uzayrStory } from './stories/uzayr';
