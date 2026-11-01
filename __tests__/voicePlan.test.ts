// A word Hamed only says right from its phonemes is recorded with them, while
// every voice that cannot read the mark gets the plain word back.
import { plainSpoken, spokenArabic, toSsml } from '../src/services/speech/voicePlan';

describe('phoneme fixes', () => {
  const line = 'فَلَمَّا جَآءَهُم بِـَٔايَـٰتِنَا إِذَا هُم مِّنْهَا يَضْحَكُونَ';

  it('marks the fixed word in the spoken line', () => {
    expect(spokenArabic(line)).toContain('⟦biʔaːjaːtinaː|بِآيَاتِنَا⟧');
  });

  it('gives the plain word to anything but the recorder', () => {
    const plain = plainSpoken(spokenArabic(line));
    expect(plain).not.toMatch(/[⟦⟧]/);
    expect(plain).toContain('بِآيَاتِنَا');
  });

  it('turns the mark into an SSML phoneme tag', () => {
    expect(toSsml(spokenArabic(line))).toContain("<phoneme alphabet='ipa' ph='biʔaːjaːtinaː'>بِآيَاتِنَا</phoneme>");
    expect(toSsml('a < b & "c"')).toBe('a &lt; b &amp; &quot;c&quot;');
  });

  it('leaves lines without a fixed word untouched', () => {
    const plain = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
    expect(spokenArabic(plain)).toBe(plainSpoken(spokenArabic(plain)));
  });
});
