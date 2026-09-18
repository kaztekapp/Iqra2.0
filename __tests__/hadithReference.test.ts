import { hadithReferenceLine } from '../src/services/hadithReference';

describe('hadithReferenceLine', () => {
  it('names the collection, number and narrator in English', () => {
    expect(hadithReferenceLine({ collection: 'bukhari', hadithNumber: '4418', narrator: "Ka'b ibn Malik" }, 'en'))
      .toBe("Sahih al-Bukhari, hadith 4418, narrated by Ka'b ibn Malik.");
  });
  it('and in French', () => {
    expect(hadithReferenceLine({ collection: 'muslim', hadithNumber: '2550', narrator: 'Abou Hourayra' }, 'fr'))
      .toBe('Sahih Mouslim, hadith numéro 2550, rapporté par Abou Hourayra.');
  });
  it('accepts the display name the Quran stories store', () => {
    expect(hadithReferenceLine({ collection: 'Sahih al-Bukhari', hadithNumber: '3346' }, 'en'))
      .toBe('Sahih al-Bukhari, hadith 3346.');
  });
  it('falls back to the raw collection when it is unknown', () => {
    expect(hadithReferenceLine({ collection: 'Musannaf' }, 'en')).toBe('Musannaf.');
  });
});
