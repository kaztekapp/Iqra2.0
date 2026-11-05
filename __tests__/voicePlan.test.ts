// A word Hamed only says right from its phonemes is recorded with them, while
// every voice that cannot read the mark gets the plain word back.
import { asRecitation, buildSsml, chunkLine, edgeRate, plainSpoken, RECITE, spokenArabic, spokenNarration } from '../src/services/speech/voicePlan';

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
    expect(spokenNarration('Surah Ar Rahman: Clay like that of pottery.', 'en')).toBe('Surah ⟪الرَّحْمَٰن|Ar Rahman⟫: Clay like that of pottery.');
    expect(spokenNarration("La sourate Ali 'Imran raconte", 'fr')).toBe("La sourate ⟪آلِ عِمْرَان|Ali 'Imran⟫ raconte");
    expect(spokenNarration('Surah Al Baqarah 2:30', 'en')).toBe('Surah ⟪الْبَقَرَة|Al Baqarah⟫, verse 30');
  });

  it('also gives the Arabic voice a second surah named in the same breath', () => {
    expect(spokenNarration('Surah Sad and Al Hijr record it.', 'en')).toBe('Surah ⟪صَادْ|Sad⟫ and ⟪الْحِجْر|Al Hijr⟫ record it.');
    expect(spokenNarration('La sourate Sad et Al Hijr le disent.', 'fr')).toBe('La sourate ⟪صَادْ|Sad⟫ et ⟪الْحِجْر|Al Hijr⟫ le disent.');
  });

  it('leaves names elsewhere in the sentence to the narrator', () => {
    expect(spokenNarration('Maryam and Yusuf were patient.', 'en')).toBe('Maryam and Yusuf were patient.');
    expect(spokenNarration('Surah Sadness', 'en')).toBe('Surah Sadness');
  });

  it('says the verse reference in words', () => {
    expect(spokenNarration("Surah Ash Shu'ara 26:170-171", 'en')).toBe("Surah ⟪الشُّعَرَاء|Ash Shu'ara⟫, verses 170 to 171");
    expect(spokenNarration('la sourate Ta Ha 20:36.', 'fr')).toBe('la sourate ⟪طَاهَا|Ta Ha⟫, verset 36.');
    expect(spokenNarration('At 10:30 they left.', 'en')).toBe('At 10:30 they left.');
  });

  it('is unchanged by a second pass, and plain again for the phone voice', () => {
    const once = spokenNarration('Surah Ta Ha Allah commands', 'en');
    expect(spokenNarration(once, 'en')).toBe(once);
    expect(plainSpoken(once)).toBe('Surah Ta Ha Allah commands');
  });

  it('hands the name to the Arabic voice of the narrator\'s gender, without the gap', () => {
    const female = buildSsml(spokenNarration('Surah Ar Rahman: Clay.', 'en'), 'en-US-AriaNeural', '-4%', 'en-US');
    expect(female).toContain("<voice name='ar-SA-ZariyahNeural'><mstts:silence type='Leading-exact' value='0ms'/><mstts:silence type='Tailing-exact' value='0ms'/><prosody rate='+0%'>الرَّحْمَٰن</prosody></voice>");
    expect(female).toContain("<voice name='en-US-AriaNeural'><mstts:silence type='Tailing-exact' value='0ms'/><prosody rate='-4%'>Surah </prosody></voice>");
    expect(buildSsml(spokenNarration('La sourate Ar Rahman.', 'fr'), 'fr-FR-HenriNeural', '-4%', 'fr-FR')).toContain("rate='-10%'>الرَّحْمَٰن");
  });
});

describe('Arabic recitation pace', () => {
  it('keeps each voice at the pace chosen by ear', () => {
    expect([edgeRate(1), edgeRate(0.6)]).toEqual(['-25%', '-40%']);
    expect([edgeRate(1, 'ar-SA-ZariyahNeural'), edgeRate(0.6, 'ar-SA-ZariyahNeural')]).toEqual(['-10%', '-25%']);
  });
});

describe('recitation (Quran only)', () => {
  const recite = (t: string) => spokenArabic(asRecitation(t));
  const unstressed = (t: string) => t.replace(/ˈ/g, '');
  // The words as written, for the rules on joins and stops (most recited
  // words are now also spelled in phonemes; see recitationIpa).
  const reciteText = (t: string) => plainSpoken(recite(t));
  // Expectations are typed vowel-then-shadda; the normaliser seats shadda first.
  const seated = (s: string) => s.replace(/([\u064B-\u0650])\u0651/g, '\u0651$1');

  it('joins a silent alif to the word before: sun letter drops the l, moon letter keeps it', () => {
    expect(reciteText('مَٰلِكِ يَوْمِ ٱلدِّينِ')).toBe(seated('مَالِكِ يَوْمِدِّينْ'));
    expect(reciteText('ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ')).toBe(seated('الْحَمْدُ لِلَّهِ رَبِّلْ عَالَمِينْ'));
  });

  it('stops on the last letter of the line', () => {
    expect(reciteText('إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ')).toBe(seated('إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينْ'));
  });

  it('says the end of Al-Fatiha from the approved phonemes', () => {
    expect(recite('غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ')).toContain('⟦waladˤdˤdˤaːaːaːllliːn|');
  });

  it('says a long vowel short before a join, and a tanween as its vowel plus nun', () => {
    expect(unstressed(recite('لَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ قَالُوٓا۟'))).toContain('⟦fil|فِلْ⟧ ⟦ʔardˤi|');
    expect(recite('لَقُوا۟ ٱلَّذِينَ ءَامَنُوا۟')).toContain(seated('لَقُلَّذِينَ'));
    expect(recite('عُزَيْرٌ ٱبْنُ ٱللَّهِ وَقَالَتِ')).toContain(seated('عُزَيْرُنِبْنُلَّهِ'));
  });

  it('says the Bismillah (Al-Fatihah 1) from the approved phonemes', () => {
    expect(recite('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ')).toMatch(/^⟦bismillaːaːhirrraħmaːnirrraħiːm\|/);
  });

  it('says An-Nas 4 from the approved phonemes', () => {
    expect(recite('مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ')).toMatch(/^⟦min ʃarrrilwaswaːsilxannnaːs\|/);
  });

  it('names the opening letters of a surah', () => {
    expect(plainSpoken(recite('الٓمٓ'))).toBe('أَلِفْ لَامْ مِيمْ');
    expect(plainSpoken(recite('طه'))).toBe('طَا هَا');
    expect(plainSpoken(recite('نٓ ۚ وَٱلْقَلَمِ وَمَا يَسْطُرُونَ'))).toBe('نُونْ. وَالْقَلَمِ وَمَا يَسْطُرُونْ');
  });

  it('stops at a pause mark as at a verse end (Sad 38:30, take 4)', () => {
    const line = recite('نِعْمَ ٱلْعَبْدُ ۖ إِنَّهُۥٓ أَوَّابٌ');
    expect(line).toContain('ʕabd|');
    expect(line).not.toMatch(/ʕabdu/);
    expect(line).toMatch(/⟧\. /);
  });

  it('splits a doubled throat letter instead of holding it (Al-Maun 107:2, take C)', () => {
    expect(unstressed(recite('فَذَٰلِكَ ٱلَّذِى يَدُعُّ ٱلْيَتِيمَ'))).toContain('jaduʕ.ʕuljatiːm');
  });

  it('keeps the l of a moon-letter al- on the word before (take C, 2026-11-05)', () => {
    expect(unstressed(recite('قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ'))).toMatch(/^⟦qiːladxulil\|[^⟧]+⟧ ⟦dʒannnah\|/);
    expect(unstressed(recite('وَهُوَ ٱلْعَزِيزُ ٱلْحَكِيمُ'))).toMatch(/^⟦wahuwal\|[^⟧]+⟧ ⟦ʕaziːzul\|[^⟧]+⟧ ⟦ħakiːm\|/);
    expect(unstressed(recite('نِعْمَ ٱلْعَبْدُ ۖ إِنَّهُۥٓ أَوَّابٌ'))).toMatch(/^⟦niʕmalʕabd\|/);
  });

  it('stretches and stresses a long ā before h (sāhūn, take E)', () => {
    expect(recite('ٱلَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ')).toContain('⟦ˈsaːaːhuːn|');
    expect(recite('صُحُفِ إِبْرَٰهِيمَ وَمُوسَىٰ')).toContain('⟦ʔibˈraːaːhiːma|');
    expect(recite('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ')).not.toContain('ˈ');
  });

  it('applies the rules found by speech recognition over Juz Amma (2026-11-05)', () => {
    expect(recite('أَلَمْ نَجْعَل لَّهُۥ عَيْنَيْنِ')).toMatch(/^⟦ʔaˈlamm\|/);
    expect(recite('ثُمَّ لَا يَمُوتُ فِيهَا وَلَا يَحْيَىٰ')).toMatch(/^⟦ˈθumma\|/);
    expect(recite('قُتِلَ ٱلْإِنسَـٰنُ مَآ أَكْفَرَهُۥ')).toMatch(/rahh\|[^⟧]+⟧$/);
    expect(recite('أَرَءَيْتَ إِن كَذَّبَ وَتَوَلَّىٰٓ')).toContain('⟦ˈʔin|');
  });

  it('reads a word with a hamza inside it from phonemes (take 4B)', () => {
    expect(unstressed(recite('يُبْدِئُ وَيُعِيدُ'))).toMatch(/^⟦jubdiʔu\|/);
  });

  it('joins a phoneme-spelled word to the al- word after it, and stops in phonemes too', () => {
    expect(unstressed(recite('تِلْكَ ءَايَـٰتُ ٱلْكِتَـٰبِ ٱلْمُبِينِ'))).toBe('⟦tilka|تِلْكَ⟧ ⟦ʔaːjaːtulkitaːbilmubiːn|آيَاتُ الْكِتَابِ الْمُبِينْ⟧');
  });

  it('reads a recited verse whole, however long, as Learn mode does', () => {
    const line = asRecitation(`${'وَقُلْنَا يَـٰٓـَٔادَمُ ٱسْكُنْ أَنتَ وَزَوْجُكَ '.repeat(6)}ۚ ${'وَلَا تَقْرَبَا هَـٰذِهِ '.repeat(6)}`);
    expect(chunkLine(line)).toEqual([line.trim()]);
  });

  it('keeps the mark on every chunk, and leaves other Arabic as it was', () => {
    const long = asRecitation('ٱلْحَمْدُ لِلَّهِ '.repeat(40).trim());
    expect(chunkLine(long).every((c) => c.startsWith(RECITE))).toBe(true);
    expect(spokenArabic('يَوْمِ ٱلدِّينِ')).not.toContain(seated('يَوْمِدِّينْ'));
  });
});
