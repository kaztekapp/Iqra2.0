// The app reads the prophet stories from assets/stories (one data file per
// prophet); the voice recorder and the other tests read the source files in
// src/data/arabic/prophets/stories. They must never differ: a story fixed in
// the source and not exported would be recorded and tested but never shown.
// Re-export with:  npx tsx scripts/stories/exportStoryFiles.ts
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getProphetStorySource, getProphetsWithStorySource } from '../src/data/arabic/prophets/source';
import { storyFileName } from '../scripts/stories/exportStoryFiles';

const DIR = join(__dirname, '..', 'assets', 'stories');

describe('prophet story data files', () => {
  const ids = getProphetsWithStorySource();

  it('has a file for every story and no others', () => {
    expect(ids).toHaveLength(25);
    const files = readdirSync(DIR).filter((f) => f.endsWith('.qjson')).sort();
    expect(files).toEqual(ids.map(storyFileName).sort());
    const index = readFileSync(join(DIR, 'index.ts'), 'utf8');
    for (const id of ids) expect(index).toContain(`${JSON.stringify(id)}: require('./${storyFileName(id)}')`);
  });

  it('matches the source stories exactly', () => {
    const stale = ids.filter((id) => readFileSync(join(DIR, storyFileName(id)), 'utf8') !== JSON.stringify(getProphetStorySource(id)));
    expect(stale).toEqual([]);
  });
});
