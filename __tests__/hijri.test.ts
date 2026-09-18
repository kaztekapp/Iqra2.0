import { toHijriTabular, toArabicDigits, HIJRI_MONTHS_EN } from '../src/lib/hijri';

describe('hijri', () => {
  it('converts known dates: Ramadan 1445 began 11 March 2024; 19 Muharram 1447 is 15 July 2025', () => {
    const r = toHijriTabular(new Date(Date.UTC(2024, 2, 11, 12)));
    expect([r.year, r.month, r.day]).toEqual([1445, 9, 1]);
    const m = toHijriTabular(new Date(Date.UTC(2025, 6, 15, 12)));
    expect([m.year, m.month, m.day]).toEqual([1447, 1, 19]);
  });
  it('writes Arabic-Indic digits', () => {
    expect(toArabicDigits(1447)).toBe('١٤٤٧');
  });
  it('has twelve months', () => {
    expect(HIJRI_MONTHS_EN).toHaveLength(12);
  });
});
