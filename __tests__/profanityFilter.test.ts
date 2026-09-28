import { containsProfanity, maskProfanity, MASK } from '../src/lib/profanityFilter';

describe('profanityFilter', () => {
  it('masks whole blocked words in English and French', () => {
    expect(maskProfanity('this is shit')).toBe(`this is ${MASK}`);
    expect(maskProfanity('Quelle merde !')).toBe(`Quelle ${MASK} !`);
  });

  it('ignores case and Latin accents', () => {
    expect(maskProfanity('FUCK that')).toBe(`${MASK} that`);
    expect(maskProfanity('espèce d’ENCULÉ')).toBe(`espèce d’${MASK}`);
    expect(containsProfanity('Bâtard')).toBe(true);
  });

  it('never matches inside a longer word', () => {
    const clean = 'Scunthorpe class assessment, unique, cocktail, therapist';
    expect(containsProfanity(clean)).toBe(false);
    expect(maskProfanity(clean)).toBe(clean);
  });

  it('keeps Arabic and harakat untouched', () => {
    const verse = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ — merde';
    expect(maskProfanity(verse)).toBe(`بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ — ${MASK}`);
  });

  it('passes empty input through', () => {
    expect(maskProfanity('')).toBe('');
    expect(maskProfanity(null)).toBeNull();
    expect(containsProfanity(undefined)).toBe(false);
  });
});
