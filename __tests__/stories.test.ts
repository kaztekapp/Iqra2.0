/**
 * The stories are content, and content has invariants a person cannot check
 * by eye across 44 files: block numbering, the shape every hadith card must
 * have after 7730ee3, and that every quoted ayah is the mushaf's own text.
 */
import { getProphetsWithStories, getProphetStory } from '../src/data/arabic/prophets';
import { getQuranStories } from '../src/data/arabic/quranStories';
import { getSurahAyahsSync } from '../src/services/staticQuranService';
import { splitQuranRuns, hasHadithRun } from '../src/services/narrationText';

type Block = {
  id: string;
  type: string;
  order: number;
  content: string;
  contentFr?: string;
  source?: any;
};

function blocksOf(story: any): Block[] {
  if (Array.isArray(story?.content)) return story.content;
  if (Array.isArray(story?.subStories)) return story.subStories.flatMap((s: any) => s.content || []);
  return [];
}

const skeleton = (s: string) =>
  s.normalize('NFC').replace(/[ً-ٰٓ-ٟؐ-ؚۖ-ۭـ‏‎"]/g, '').replace(/[آأإٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/[ؤئ]/g, 'ء').replace(/ة/g, 'ه').replace(/[^ء-ي]/g, '');

const all: { name: string; blocks: Block[] }[] = [
  ...getProphetsWithStories().map((id) => ({ name: id, blocks: blocksOf(getProphetStory(id)) })),
  ...getQuranStories().map((s: any) => ({ name: s.id, blocks: blocksOf(s) })),
];

describe('story data', () => {
  it('loads every story', () => {
    expect(all.length).toBeGreaterThanOrEqual(40);
    for (const s of all) expect(`${s.name}: ${s.blocks.length} blocks`).not.toBe(`${s.name}: 0 blocks`);
  });

  it('numbers blocks 1..n with matching ids and orders', () => {
    for (const s of all) {
      // ids are '<prefix>-N'; the prefix is whatever the first block uses
      const prefix = s.blocks[0]?.id.replace(/-\d+$/, '');
      s.blocks.forEach((b, i) => {
        expect(`${s.name}:${b.id}`).toBe(`${s.name}:${prefix}-${i + 1}`);
        expect(`${s.name}:${b.order}`).toBe(`${s.name}:${i + 1}`);
      });
    }
  });

  it('gives every block a French text', () => {
    for (const s of all) for (const b of s.blocks) expect(`${s.name}:${b.id}:${!!b.contentFr}`).toBe(`${s.name}:${b.id}:true`);
  });

  it('follows every hadith card with at least one ⟨Arabic⟩ run, and every run parses', () => {
    let cards = 0;
    for (const s of all) {
      s.blocks.forEach((b, i) => {
        if (b.type !== 'hadith_source') return;
        cards++;
        const next = s.blocks[i + 1];
        expect(`${s.name}:${b.id}:${hasHadithRun(next?.content)}`).toBe(`${s.name}:${b.id}:true`);
        for (let j = i + 1; j < s.blocks.length && hasHadithRun(s.blocks[j].content); j++) {
          const kinds = splitQuranRuns(s.blocks[j].content).map((x) => x.kind).join(',');
          expect(kinds).toMatch(/^hadith(,prose)?$/);
          expect(splitQuranRuns(s.blocks[j].contentFr || '').map((x) => x.kind).join(',')).toMatch(/^hadith(,prose)?$/);
        }
      });
    }
    expect(cards).toBeGreaterThan(90);
  });

  it('cites a collection, number and Arabic text on every hadith card', () => {
    for (const s of all) for (const b of s.blocks) {
      if (b.type !== 'hadith_source') continue;
      expect(b.source?.collection).toBeTruthy();
      expect(b.source?.hadithNumber).toBeTruthy();
      expect((b.source?.arabicText || '').length).toBeGreaterThan(20);
      expect((b.source?.translationFr || '').length).toBeGreaterThan(10);
    }
  });

  it('quotes the Quran exactly as the bundled mushaf has it', () => {
    let passages = 0;
    for (const s of all) for (const b of s.blocks) {
      if (b.type !== 'quran_source' || b.source?.type !== 'quran') continue;
      const { surahNumber, ayahStart, ayahEnd, arabicText } = b.source;
      const ayahs = getSurahAyahsSync(surahNumber);
      const ref = ayahs.filter((a) => a.ayahNumber >= ayahStart && a.ayahNumber <= ayahEnd).map((a) => a.textUthmani).join(' ');
      if (!ref) continue; // a surah not bundled statically
      passages++;
      expect(`${s.name} ${surahNumber}:${ayahStart}-${ayahEnd} ${skeleton(arabicText) === skeleton(ref)}`)
        .toBe(`${s.name} ${surahNumber}:${ayahStart}-${ayahEnd} true`);
    }
    expect(passages).toBeGreaterThan(500);
  });
});
