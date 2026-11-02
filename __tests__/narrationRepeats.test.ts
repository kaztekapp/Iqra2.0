// A story introduces each source in its own words; the card's title line and
// a hadith's reference are not said (or shown) a second time right after.
jest.mock('@react-native-async-storage/async-storage', () => ({}));
import { buildUtterances, restatesBefore, sourceLeadHidden, type NarratableBlock } from '../src/services/narrationPlan';

const lc = (en: string, fr?: string) => fr ?? en;

describe('repeated lines', () => {
  it('spots a card title that repeats the paragraph before it', () => {
    expect(restatesBefore('La sourate Ar-Rahman : Une argile semblable à celle de la poterie.',
      "La sourate Ar-Rahman le redit, et nous dit à quoi ressemblait cette argile : une argile semblable à celle de la poterie.")).toBe(true);
    expect(restatesBefore('Surah Al-Baqarah: The angels are told of a successor.',
      'Then Musa went out to the people of Madyan.')).toBe(false);
  });

  it('neither shows nor reads that title, and keeps one that adds something', () => {
    const blocks = [
      { id: 'p', type: 'narrative', content: 'Surah Ar-Rahman says it again: clay like that of pottery.' },
      { id: 'q', type: 'quran_source', content: 'Surah Ar-Rahman: Clay like that of pottery.' },
      { id: 'r', type: 'quran_source', content: 'Surah Al-Hijr: The jinn, from fire.' },
    ] as NarratableBlock[];
    const en = (a: string) => a;
    expect(sourceLeadHidden(blocks, 1, en)).toBe(true);
    expect(sourceLeadHidden(blocks, 2, en)).toBe(false);
    const said = buildUtterances(blocks, 'en', en).map((u) => u.text);
    expect(said.some((t) => t.startsWith('Surah Ar-Rahman: Clay'))).toBe(false);
    expect(said.some((t) => t.includes('The jinn, from fire'))).toBe(true);
  });

  it('does not read a hadith reference the paragraph just gave', () => {
    const blocks = [
      { id: 'p', type: 'narrative', content: 'Ibn Abbas narrated it, Sahih al-Bukhari 3364.' },
      { id: 'h', type: 'hadith_source', content: 'The well of Zamzam.', source: { type: 'hadith', collection: 'Sahih al-Bukhari', hadithNumber: 3364, narrator: 'Abdullah ibn Abbas', translation: '' } },
    ] as unknown as NarratableBlock[];
    const said = buildUtterances(blocks, 'en', (a) => a).map((u) => u.text).join(' | ');
    expect(said).not.toMatch(/hadith 3364/);
  });
});
void lc;
