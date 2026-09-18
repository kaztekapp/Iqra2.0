import {
  normalizeArabicForSpeech,
  splitQuranRuns,
  hasHadithRun,
  splitSentences,
  prepareForSpeech,
} from '../src/services/narrationText';

const letters = (s: string) => s.replace(/[^ء-ي]/g, '');

// The normaliser puts every shadda before its vowel, the order typed Arabic
// uses and the voice reads correctly; source literals here are NFC.
const typed = (s: string) => s.normalize('NFC').replace(/([\u064B-\u0650])\u0651/g, '\u0651$1');

describe('normalizeArabicForSpeech', () => {
  it('keeps the shadda before the vowel, the order the voice reads correctly (Maryam 19:57)', () => {
    const out = normalizeArabicForSpeech('وَرَفَعْنَٰهُ مَكَانًا عَلِيًّا');
    expect(out.endsWith('\u064A\u0651\u064B\u0627')).toBe(true); // ي + shadda + fathatan + ا
    expect(out).not.toMatch(/[\u064B-\u0650]\u0651/);
  });
  it('drops the idgham shadda that the mushaf puts on the first letter of a word', () => {
    // ṣiddīqan nabiyyā (19:56): the voice cannot begin a word with a geminate.
    const out = normalizeArabicForSpeech('صِدِّيقًا نَّبِيًّا');
    expect(out).toBe(typed('صِدِّيقًا نَبِيًّا'));
  });

  it('keeps every shadda that is not on the first letter', () => {
    for (const w of ['إِنَّهُ', 'اللَّهِ', 'الرَّحِيمِ', 'الْمُتَّقِينَ']) {
      expect(normalizeArabicForSpeech(w)).toBe(typed(w));
    }
  });

  it('removes a letter the mushaf marks as silent, and keeps the plural alef', () => {
    expect(letters(normalizeArabicForSpeech('ٱلرِّبَوٰا۟'))).toBe('الربا');
    expect(letters(normalizeArabicForSpeech('بِأَيْي۟دٍ'))).toBe('بأيد');
    expect(letters(normalizeArabicForSpeech('قَالُوٓا۟'))).toBe('قالوا');
    expect(letters(normalizeArabicForSpeech('تَوَلَّوْا۟'))).toBe('تولوا');
    expect(letters(normalizeArabicForSpeech('وَجِا۟ىٓءَ'))).toBe('وجيء');
  });

  it('writes the dagger alef and alef maqsura out so the voice says the long vowel', () => {
    expect(normalizeArabicForSpeech('ذَٰلِكَ')).toBe('ذَالِكَ');
    expect(letters(normalizeArabicForSpeech('مُوسَىٰ'))).toBe('موسا');
    expect(letters(normalizeArabicForSpeech('فِى'))).toBe('في');
  });

  it('turns the mushaf hamza seats into ordinary letters', () => {
    expect(normalizeArabicForSpeech('ءَامَنُوا۟')).toBe('آمَنُوا');
    expect(letters(normalizeArabicForSpeech('يَسْـَٔلُونَكَ'))).toBe('يسئلونك');
  });

  it('strips annotation marks, braces and tatweel but keeps the harakat', () => {
    const out = normalizeArabicForSpeech('قَالَ {ص} لَيْسَ ۚ مِـنْ');
    expect(out).not.toMatch(/[{}ۚـ]/);
    expect(out).toMatch(/[ً-ْ]/);
  });

  it('returns an empty string for empty input', () => {
    expect(normalizeArabicForSpeech('')).toBe('');
  });
});

describe('splitQuranRuns', () => {
  it('separates prose from a Quran run and from a hadith run', () => {
    const segs = splitQuranRuns('Musa said, ﴿رَبِّ أَرِنِي﴾ show me. ⟨قَالَ النَّبِيُّ⟩ The Prophet said.');
    expect(segs.map((s) => s.kind)).toEqual(['prose', 'quran', 'prose', 'hadith', 'prose']);
    expect(segs[1]).toEqual({ kind: 'quran', text: 'رَبِّ أَرِنِي' });
    expect(segs[3]).toEqual({ kind: 'hadith', text: 'قَالَ النَّبِيُّ' });
  });

  it('returns plain prose untouched', () => {
    expect(splitQuranRuns('Only prose.')).toEqual([{ kind: 'prose', text: 'Only prose.' }]);
    expect(splitQuranRuns('')).toEqual([]);
  });

  it('knows a hadith run when it sees one', () => {
    expect(hasHadithRun('⟨أ⟩ b')).toBe(true);
    expect(hasHadithRun('﴿أ﴾ b')).toBe(false);
    expect(hasHadithRun(undefined)).toBe(false);
  });
});

describe('splitSentences', () => {
  it('cuts on sentence ends and never mid-clause', () => {
    expect(splitSentences('One. Two! Three?')).toEqual(['One.', 'Two!', 'Three?']);
    const long = Array.from({ length: 40 }, (_, i) => `w${i}`).join(' ') + ', tail here.';
    const parts = splitSentences(long, 34);
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.join(' ')).toBe(long);
  });
});

describe('prepareForSpeech', () => {
  it('keeps Arabic out of the English track and expands honorific abbreviations', () => {
    const out = prepareForSpeech('The Prophet (PBUH) said ﴿قَالَ﴾ so.', 'en');
    expect(out).not.toMatch(/[؀-ۿ]/);
    expect(out).toMatch(/peace be upon him/);
  });
});
