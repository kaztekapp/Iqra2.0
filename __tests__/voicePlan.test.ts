// A word Hamed only says right from its phonemes is recorded with them, while
// every voice that cannot read the mark gets the plain word back.
import { buildSsml, edgeRate, plainSpoken, spokenArabic, spokenNarration } from '../src/services/speech/voicePlan';

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
    expect(buildSsml(spokenArabic(line), 'ar-SA-HamedNeural', '-25%', 'ar-SA')).toContain("<phoneme alphabet='ipa' ph='biʔaːjaːtinaː'>بِآيَاتِنَا</phoneme>");
    expect(buildSsml('a < b & "c"', 'en-US-AriaNeural', '-4%', 'en-US')).toContain('>a &lt; b &amp; &quot;c&quot;</prosody>');
  });

  it('leaves lines without a fixed word untouched', () => {
    const plain = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
    expect(spokenArabic(plain)).toBe(plainSpoken(spokenArabic(plain)));
  });
});

describe('surah names in narration', () => {
  it('marks the name after Surah or sourate, longest spelling first', () => {
    expect(spokenNarration('Surah Ar Rahman: Clay like that of pottery.')).toBe('Surah ⟪الرَّحْمَٰن|Ar Rahman⟫: Clay like that of pottery.');
    expect(spokenNarration("La sourate Ali 'Imran raconte")).toBe("La sourate ⟪آلِ عِمْرَان|Ali 'Imran⟫ raconte");
    expect(spokenNarration('Surah Al Baqarah 2:30')).toContain('⟪الْبَقَرَة|Al Baqarah⟫ 2:30');
  });

  it('leaves names elsewhere in the sentence to the narrator', () => {
    expect(spokenNarration('Maryam and Yusuf were patient.')).toBe('Maryam and Yusuf were patient.');
    expect(spokenNarration('Surah Sadness')).toBe('Surah Sadness');
  });

  it('is unchanged by a second pass, and plain again for the phone voice', () => {
    const once = spokenNarration('Surah Ta Ha Allah commands');
    expect(spokenNarration(once)).toBe(once);
    expect(plainSpoken(once)).toBe('Surah Ta Ha Allah commands');
  });

  it('hands the name to the Arabic voice of the narrator\'s gender, without the gap', () => {
    const female = buildSsml(spokenNarration('Surah Ar Rahman: Clay.'), 'en-US-AriaNeural', '-4%', 'en-US');
    expect(female).toContain("<voice name='ar-SA-ZariyahNeural'><mstts:silence type='Leading-exact' value='0ms'/><mstts:silence type='Tailing-exact' value='0ms'/><prosody pitch='+0Hz' rate='+0%' volume='+0%'>الرَّحْمَٰن</prosody></voice>");
    expect(female).toContain("<voice name='en-US-AriaNeural'><mstts:silence type='Tailing-exact' value='0ms'/><prosody pitch='+0Hz' rate='-4%' volume='+0%'>Surah </prosody></voice>");
    expect(buildSsml(spokenNarration('La sourate Ar Rahman.'), 'fr-FR-HenriNeural', '-4%', 'fr-FR')).toContain("rate='-10%' volume='+0%'>الرَّحْمَٰن");
  });
});

describe('Arabic recitation pace', () => {
  it('keeps each voice at the pace chosen by ear', () => {
    expect([edgeRate(1), edgeRate(0.6)]).toEqual(['-25%', '-40%']);
    expect([edgeRate(1, 'ar-SA-ZariyahNeural'), edgeRate(0.6, 'ar-SA-ZariyahNeural')]).toEqual(['-10%', '-25%']);
  });
});
