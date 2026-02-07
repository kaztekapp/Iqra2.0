// Tajweed Rules Data
// Comprehensive rules for proper Quran recitation with real Quran verse examples

import { TajweedRule, TajweedRuleId } from '../../../../types/quran';
import { TAJWEED_COLORS } from './colors';

export const TAJWEED_RULES: TajweedRule[] = [
  // ============ Noon Sakinah & Tanween Rules ============
  {
    id: 'izhar',
    nameArabic: 'إظهار',
    nameEnglish: 'Izhar (Clear)',
    nameFrench: 'Prononciation Claire',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.izhar,
    description:
      'When you see a Noon with sukoon (نْ) or Tanween (ـً ـٍ ـٌ) followed by one of 6 throat letters, pronounce the Noon clearly and fully. Do NOT blend or hide it. These 6 letters come from deep in the throat, making it natural to say the Noon separately. Think of it as "showing" the Noon sound before moving to the throat letter.',
    descriptionFr:
      'Lorsque vous voyez un Noun avec soukoun (نْ) ou un Tanween (ـً ـٍ ـٌ) suivi par l\'une des 6 lettres de la gorge, prononcez le Noun clairement et complètement. Ne le mélangez PAS et ne le cachez pas. Ces 6 lettres proviennent du fond de la gorge, ce qui rend naturel de prononcer le Noun séparément. Pensez-y comme le fait de « montrer » le son du Noun avant de passer à la lettre de la gorge.',
    descriptionArabic:
      'إظهار النون الساكنة أو التنوين عند حروف الحلق الستة: الهمزة والهاء والعين والحاء والغين والخاء',
    letters: ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
    examples: [
      // Hamza (ء)
      {
        text: 'أَنْ أَعْبُدَ',
        fullAyahText: 'قُلْ إِنِّي أُمِرْتُ أَنْ أَعْبُدَ اللَّهَ مُخْلِصًا لَّهُ الدِّينَ',
        highlightText: 'نْ أَ',
        transliteration: "an a'buda",
        surahNumber: 39,
        surahName: 'Az-Zumar',
        ayahNumber: 11,
        explanation: 'Noon sakinah before Hamza (ء) - clear pronunciation',
        explanationFr: 'Noun sakinah avant Hamza (ء) - prononciation claire',
      },
      // Ha (ه)
      {
        text: 'عَنْهُ',
        fullAyahText: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ',
        highlightText: 'نْهُ',
        transliteration: "'anhu",
        surahNumber: 111,
        surahName: 'Al-Masad',
        ayahNumber: 2,
        explanation: 'Noon sakinah before Ha (ه) - pronounced clearly without merging',
        explanationFr: 'Noun sakinah avant Ha (ه) - prononcé clairement sans fusion',
      },
      // Ayn (ع)
      {
        text: 'أَنْعَمْتَ',
        fullAyahText: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        highlightText: 'نْعَ',
        transliteration: "an'amta",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 7,
        explanation: 'Noon sakinah before Ayn (ع) - the most recited verse',
        explanationFr: 'Noun sakinah avant Ayn (ع) - le verset le plus récité',
      },
      // Haa (ح)
      {
        text: 'لَّدُنْ حَكِيمٍ',
        fullAyahText: 'وَإِنَّكَ لَتُلَقَّى الْقُرْآنَ مِن لَّدُنْ حَكِيمٍ عَلِيمٍ',
        highlightText: 'نْ حَ',
        transliteration: "ladun hakīm",
        surahNumber: 27,
        surahName: 'An-Naml',
        ayahNumber: 6,
        explanation: 'Noon sakinah before Haa (ح) - clear without nasalization',
        explanationFr: 'Noun sakinah avant Haa (ح) - clair sans nasalisation',
      },
      // Ghayn (غ)
      {
        text: 'مِنْ غَيْرِ',
        fullAyahText: 'أَمْ خُلِقُوا مِنْ غَيْرِ شَيْءٍ أَمْ هُمُ الْخَالِقُونَ',
        highlightText: 'نْ غَ',
        transliteration: "min ghayri",
        surahNumber: 52,
        surahName: 'At-Tur',
        ayahNumber: 35,
        explanation: 'Noon sakinah before Ghayn (غ) - izhar from the throat',
        explanationFr: 'Noun sakinah avant Ghayn (غ) - izhar de la gorge',
      },
      // Kha (خ)
      {
        text: 'مِنْ خَوْفٍ',
        fullAyahText: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ',
        highlightText: 'نْ خَ',
        transliteration: "min khawf",
        surahNumber: 106,
        surahName: 'Quraysh',
        ayahNumber: 4,
        explanation: 'Noon sakinah before Kha (خ) - clear throat pronunciation',
        explanationFr: 'Noun sakinah avant Kha (خ) - prononciation claire de la gorge',
      },
    ],
  },
  {
    id: 'ikhfa',
    nameArabic: 'إخفاء',
    nameEnglish: 'Ikhfa (Hiding)',
    nameFrench: 'Dissimulation',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.ikhfa,
    description:
      'When Noon Sakinah or Tanween is followed by one of 15 letters, you "hide" the Noon sound. Do not pronounce it fully, but let a soft nasal hum (ghunnah) flow through your nose for 2 counts while your tongue moves toward the next letter. Your tongue position changes slightly depending on which letter follows - this creates different "shades" of hiding.',
    descriptionFr:
      'Lorsque le Noun Sakinah ou le Tanween est suivi par l\'une des 15 lettres, vous « dissimulez » le son du Noun. Ne le prononcez pas complètement, mais laissez un léger bourdonnement nasal (ghunnah) passer par le nez pendant 2 temps tandis que votre langue se déplace vers la lettre suivante. La position de votre langue change légèrement selon la lettre qui suit, créant différentes « nuances » de dissimulation.',
    descriptionArabic:
      'إخفاء النون الساكنة أو التنوين عند خمسة عشر حرفاً مع الغنة بمقدار حركتين',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    duration: 2,
    examples: [
      // ت (Ta)
      {
        text: 'مُنتَقِمُونَ',
        fullAyahText: 'يَوْمَ نَبْطِشُ الْبَطْشَةَ الْكُبْرَىٰ إِنَّا مُنتَقِمُونَ',
        highlightText: 'نتَ',
        transliteration: "muntaqimūn",
        surahNumber: 44,
        surahName: 'Ad-Dukhan',
        ayahNumber: 16,
        explanation: 'Noon before Ta (ت) - hide with ghunnah, tongue near upper teeth',
        explanationFr: 'Noun avant Ta (ت) - dissimulé avec ghunnah, langue près des dents supérieures',
      },
      // ث (Tha)
      {
        text: 'مِنثَورًا',
        fullAyahText: 'وَقَدِمْنَا إِلَىٰ مَا عَمِلُوا مِنْ عَمَلٍ فَجَعَلْنَاهُ هَبَاءً مَّنثُورًا',
        highlightText: 'نثُ',
        transliteration: "manthūrā",
        surahNumber: 25,
        surahName: 'Al-Furqan',
        ayahNumber: 23,
        explanation: 'Noon before Tha (ث) - hide with tongue between teeth',
        explanationFr: 'Noun avant Tha (ث) - dissimulé avec la langue entre les dents',
      },
      // ج (Jeem)
      {
        text: 'فَأَنجَيْنَاهُ',
        fullAyahText: 'فَأَنجَيْنَاهُ وَأَصْحَابَ السَّفِينَةِ',
        highlightText: 'نجَ',
        transliteration: "fa-anjaynāhu",
        surahNumber: 29,
        surahName: 'Al-Ankabut',
        ayahNumber: 15,
        explanation: 'Noon before Jeem (ج) - hide with ghunnah',
        explanationFr: 'Noun avant Jeem (ج) - dissimulé avec ghunnah',
      },
      // د (Dal)
      {
        text: 'عِندَ',
        fullAyahText: 'عِندَ سِدْرَةِ الْمُنتَهَىٰ',
        highlightText: 'ندَ',
        transliteration: "'inda",
        surahNumber: 53,
        surahName: 'An-Najm',
        ayahNumber: 14,
        explanation: 'Noon before Dal (د) - hide with tongue at upper teeth ridge',
        explanationFr: 'Noun avant Dal (د) - dissimulé avec la langue sur la crête des dents supérieures',
      },
      // ذ (Dhal)
      {
        text: 'فَأَنذَرْتُكُمْ',
        fullAyahText: 'فَأَنذَرْتُكُمْ نَارًا تَلَظَّىٰ',
        highlightText: 'نذَ',
        transliteration: "fa-andhartukum",
        surahNumber: 92,
        surahName: 'Al-Layl',
        ayahNumber: 14,
        explanation: 'Noon before Dhal (ذ) - hide with tongue tip visible',
        explanationFr: 'Noun avant Dhal (ذ) - dissimulé avec le bout de la langue visible',
      },
      // ز (Zayn)
      {
        text: 'أَنزَلْنَاهُ',
        fullAyahText: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        highlightText: 'نزَ',
        transliteration: "anzalnāhu",
        surahNumber: 97,
        surahName: 'Al-Qadr',
        ayahNumber: 1,
        explanation: 'Noon before Zayn (ز) - hide with slight buzz',
        explanationFr: 'Noun avant Zayn (ز) - dissimulé avec un léger bourdonnement',
      },
      // س (Seen)
      {
        text: 'الْإِنسَانَ',
        fullAyahText: 'خَلَقَ الْإِنسَانَ مِن نُّطْفَةٍ',
        highlightText: 'نسَ',
        transliteration: "al-insān",
        surahNumber: 16,
        surahName: 'An-Nahl',
        ayahNumber: 4,
        explanation: 'Noon before Seen (س) - hide with soft hiss',
        explanationFr: 'Noun avant Seen (س) - dissimulé avec un léger sifflement',
      },
      // ش (Sheen)
      {
        text: 'مِن شَرِّ',
        fullAyahText: 'مِن شَرِّ مَا خَلَقَ',
        highlightText: 'ن شَ',
        transliteration: "min sharri",
        surahNumber: 113,
        surahName: 'Al-Falaq',
        ayahNumber: 2,
        explanation: 'Noon before Sheen (ش) - hide with hushing sound',
        explanationFr: 'Noun avant Sheen (ش) - dissimulé avec un son chuchoté',
      },
      // ص (Sad)
      {
        text: 'نَصْرُ',
        fullAyahText: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        highlightText: 'نَصْ',
        transliteration: "naṣr",
        surahNumber: 110,
        surahName: 'An-Nasr',
        ayahNumber: 1,
        explanation: 'Noon before Sad (ص) - hide with emphatic quality',
        explanationFr: 'Noun avant Sad (ص) - dissimulé avec une qualité emphatique',
      },
      // ض (Dad)
      {
        text: 'مَنضُودٍ',
        fullAyahText: 'وَطَلْحٍ مَّنضُودٍ',
        highlightText: 'نضُ',
        transliteration: "manḍūd",
        surahNumber: 56,
        surahName: 'Al-Waqi\'ah',
        ayahNumber: 29,
        explanation: 'Noon before Dad (ض) - hide with emphatic heaviness',
        explanationFr: 'Noun avant Dad (ض) - dissimulé avec une lourdeur emphatique',
      },
      // ط (Ṭa)
      {
        text: 'يَنطِقُونَ',
        fullAyahText: 'هَٰذَا يَوْمُ لَا يَنطِقُونَ',
        highlightText: 'نطِ',
        transliteration: "yanṭiqūn",
        surahNumber: 77,
        surahName: 'Al-Mursalat',
        ayahNumber: 35,
        explanation: 'Noon before Ṭa (ط) - hide with full mouth emphasis',
        explanationFr: 'Noun avant Ṭa (ط) - dissimulé avec emphase buccale complète',
      },
      // ظ (Ẓa)
      {
        text: 'يَنظُرُونَ',
        fullAyahText: 'هَلْ يَنظُرُونَ إِلَّا السَّاعَةَ',
        highlightText: 'نظُ',
        transliteration: "yanẓurūn",
        surahNumber: 43,
        surahName: 'Az-Zukhruf',
        ayahNumber: 66,
        explanation: 'Noon before Ẓa (ظ) - hide with emphatic tongue position',
        explanationFr: 'Noun avant Ẓa (ظ) - dissimulé avec position emphatique de la langue',
      },
      // ف (Fa)
      {
        text: 'يَنفَعُ',
        fullAyahText: 'يَوْمَ لَا يَنفَعُ مَالٌ وَلَا بَنُونَ',
        highlightText: 'نفَ',
        transliteration: "yanfa'u",
        surahNumber: 26,
        surahName: 'Ash-Shu\'ara',
        ayahNumber: 88,
        explanation: 'Noon before Fa (ف) - hide with lip near teeth',
        explanationFr: 'Noun avant Fa (ف) - dissimulé avec la lèvre près des dents',
      },
      // ق (Qaf)
      {
        text: 'مِن قَبْلُ',
        fullAyahText: 'مِن قَبْلُ هُدًى لِّلنَّاسِ',
        highlightText: 'ن قَ',
        transliteration: "min qablu",
        surahNumber: 3,
        surahName: 'Aal-Imran',
        ayahNumber: 4,
        explanation: 'Noon before Qaf (ق) - hide with back tongue raised',
        explanationFr: 'Noun avant Qaf (ق) - dissimulé avec l\'arrière de la langue relevé',
      },
      // ك (Kaf)
      {
        text: 'مِن كُلِّ',
        fullAyahText: 'وَمِن كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ',
        highlightText: 'ن كُ',
        transliteration: "min kulli",
        surahNumber: 51,
        surahName: 'Adh-Dhariyat',
        ayahNumber: 49,
        explanation: 'Noon before Kaf (ك) - hide with mid-back tongue',
        explanationFr: 'Noun avant Kaf (ك) - dissimulé avec le milieu-arrière de la langue',
      },
    ],
  },
  {
    id: 'iqlab',
    nameArabic: 'إقلاب',
    nameEnglish: 'Iqlab (Conversion)',
    nameFrench: 'Conversion',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.iqlab,
    description:
      'When Noon Sakinah or Tanween comes before the letter Ba (ب), convert the Noon sound into a Meem (م) sound. Close your lips lightly (as if saying "m") and let a nasal hum flow through your nose for 2 counts. This happens because both Meem and Ba are pronounced with the lips, making this transition smooth and natural.',
    descriptionFr:
      'Lorsque le Noun Sakinah ou le Tanween précède la lettre Ba (ب), convertissez le son du Noun en un son de Meem (م). Fermez légèrement les lèvres (comme si vous disiez « m ») et laissez un bourdonnement nasal passer par le nez pendant 2 temps. Cela se produit parce que le Meem et le Ba sont tous deux prononcés avec les lèvres, rendant cette transition douce et naturelle.',
    descriptionArabic:
      'قلب النون الساكنة أو التنوين ميماً مخفاة عند الباء مع الغنة بمقدار حركتين',
    letters: ['ب'],
    duration: 2,
    examples: [
      {
        text: 'لَيُنبَذَنَّ',
        fullAyahText: 'كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ',
        highlightText: 'نبَ',
        transliteration: "la-yunbadhanna",
        surahNumber: 104,
        surahName: 'Al-Humazah',
        ayahNumber: 4,
        explanation: 'Noon becomes Meem (م) sound before Ba (ب) with ghunnah',
        explanationFr: 'Le Noun devient un son de Meem (م) avant Ba (ب) avec ghunnah',
      },
      {
        text: 'مِن بَيْنِ',
        fullAyahText: 'يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ',
        highlightText: 'ن بَ',
        transliteration: "min bayni",
        surahNumber: 86,
        surahName: 'At-Tariq',
        ayahNumber: 7,
        explanation: 'Noon sakinah converts to Meem sound before Ba (ب)',
        explanationFr: 'Le Noun sakinah se convertit en son de Meem avant Ba (ب)',
      },
      {
        text: 'حَدِيثٍ بَعْدَهُ',
        fullAyahText: 'فَبِأَيِّ حَدِيثٍ بَعْدَهُ يُؤْمِنُونَ',
        highlightText: 'ثٍ بَ',
        transliteration: "ḥadīthin ba'dahu",
        surahNumber: 77,
        surahName: 'Al-Mursalat',
        ayahNumber: 50,
        explanation: 'Tanween converts to Meem sound before Ba with nasal hum',
        explanationFr: 'Le Tanween se convertit en son de Meem avant Ba avec bourdonnement nasal',
      },
    ],
  },
  {
    id: 'idgham_with_ghunnah',
    nameArabic: 'إدغام بغنة',
    nameEnglish: 'Idgham with Ghunnah',
    nameFrench: 'Assimilation avec Nasalisation',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.idgham_with_ghunnah,
    description:
      'When Noon Sakinah or Tanween is followed by ي ن م و (remember: "YaNMaWu" ينمو), merge the Noon completely into the next letter while keeping a nasal hum (ghunnah) for 2 counts. The Noon disappears, but you hear the nasalization. The next letter sounds doubled. Note: This only applies when these letters start the NEXT word.',
    descriptionFr:
      'Lorsque le Noun Sakinah ou le Tanween est suivi par ي ن م و (retenez : « YaNMaWu » ينمو), fusionnez le Noun complètement dans la lettre suivante tout en maintenant un bourdonnement nasal (ghunnah) pendant 2 temps. Le Noun disparaît, mais vous entendez la nasalisation. La lettre suivante sonne doublée. Note : cela ne s\'applique que lorsque ces lettres commencent le mot SUIVANT.',
    descriptionArabic:
      'إدغام النون الساكنة أو التنوين في حروف ينمو مع الغنة بمقدار حركتين - يشترط أن يكون الحرف في كلمة أخرى',
    letters: ['ي', 'ن', 'م', 'و'],
    duration: 2,
    examples: [
      // ي (Ya)
      {
        text: 'مَن يَعْمَلْ',
        fullAyahText: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
        highlightText: 'ن يَ',
        transliteration: "may-ya'mal",
        surahNumber: 99,
        surahName: 'Az-Zalzalah',
        ayahNumber: 7,
        explanation: 'Noon merges into Ya (ي) - sounds like "may-ya\'mal" with ghunnah',
        explanationFr: 'Le Noun fusionne dans Ya (ي) - se prononce « may-ya\'mal » avec ghunnah',
      },
      // ن (Noon)
      {
        text: 'مِّن نَّارٍ',
        fullAyahText: 'وَخَلَقَ الْجَانَّ مِن مَّارِجٍ مِّن نَّارٍ',
        highlightText: 'ن نَّ',
        transliteration: "min-nār",
        surahNumber: 55,
        surahName: 'Ar-Rahman',
        ayahNumber: 15,
        explanation: 'Noon merges into Noon (ن) - doubled noon with ghunnah',
        explanationFr: 'Le Noun fusionne dans Noun (ن) - Noun doublé avec ghunnah',
      },
      // م (Meem)
      {
        text: 'مِن مَّاءٍ',
        fullAyahText: 'خُلِقَ مِن مَّاءٍ دَافِقٍ',
        highlightText: 'ن مَّ',
        transliteration: "mim-mā'",
        surahNumber: 86,
        surahName: 'At-Tariq',
        ayahNumber: 6,
        explanation: 'Noon merges into Meem (م) - sounds like "mim-mā" with ghunnah',
        explanationFr: 'Le Noun fusionne dans Meem (م) - se prononce « mim-mā » avec ghunnah',
      },
      // و (Waw)
      {
        text: 'مِن وَرَائِهِ',
        fullAyahText: 'مِّن وَرَائِهِ جَهَنَّمُ',
        highlightText: 'ن وَ',
        transliteration: "miw-warā'ihi",
        surahNumber: 14,
        surahName: 'Ibrahim',
        ayahNumber: 16,
        explanation: 'Noon merges into Waw (و) - sounds like "miw-warā\'ihi" with ghunnah',
        explanationFr: 'Le Noun fusionne dans Waw (و) - se prononce « miw-warā\'ihi » avec ghunnah',
      },
    ],
  },
  {
    id: 'idgham_without_ghunnah',
    nameArabic: 'إدغام بلا غنة',
    nameEnglish: 'Idgham without Ghunnah',
    nameFrench: 'Assimilation sans Nasalisation',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.idgham_without_ghunnah,
    description:
      'When Noon Sakinah or Tanween is followed by Lam (ل) or Ra (ر), merge completely WITHOUT any nasal sound. The Noon vanishes entirely and the next letter sounds doubled. Unlike Idgham with Ghunnah, there is NO humming through the nose here. This is called "complete merging" because the Noon leaves no trace.',
    descriptionFr:
      'Lorsque le Noun Sakinah ou le Tanween est suivi par Lam (ل) ou Ra (ر), fusionnez complètement SANS aucun son nasal. Le Noun disparaît entièrement et la lettre suivante sonne doublée. Contrairement à l\'Idgham avec Ghunnah, il n\'y a AUCUN bourdonnement par le nez ici. C\'est appelé « fusion complète » car le Noun ne laisse aucune trace.',
    descriptionArabic:
      'إدغام النون الساكنة أو التنوين في اللام والراء بدون غنة - إدغام كامل بلا أثر للنون',
    letters: ['ل', 'ر'],
    examples: [
      // ل (Lam)
      {
        text: 'مِن لَّدُنَّا',
        fullAyahText: 'فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَاهُ مِن لَّدُنَّا عِلْمًا',
        highlightText: 'ن لَّ',
        transliteration: "mil-ladunnā",
        surahNumber: 18,
        surahName: 'Al-Kahf',
        ayahNumber: 65,
        explanation: 'Noon merges into Lam (ل) - say "mil-ladunnā" with NO nasal sound',
        explanationFr: 'Le Noun fusionne dans Lam (ل) - dites « mil-ladunnā » SANS son nasal',
      },
      // ر (Ra)
      {
        text: 'مِن رَّبِّهِمْ',
        fullAyahText: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ',
        highlightText: 'ن رَّ',
        transliteration: "mir-rabbihim",
        surahNumber: 2,
        surahName: 'Al-Baqarah',
        ayahNumber: 5,
        explanation: 'Noon merges into Ra (ر) - say "mir-rabbihim" with NO nasal sound',
        explanationFr: 'Le Noun fusionne dans Ra (ر) - dites « mir-rabbihim » SANS son nasal',
      },
    ],
  },

  // ============ Meem Sakinah Rules ============
  {
    id: 'ikhfa_shafawi',
    nameArabic: 'إخفاء شفوي',
    nameEnglish: 'Ikhfa Shafawi (Labial Hiding)',
    nameFrench: 'Dissimulation Labiale',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.ikhfa_shafawi,
    description:
      'When Meem Sakinah (مْ) is followed by Ba (ب), hide the Meem with your lips slightly apart (not fully closed). Let a nasal hum flow through your nose for 2 counts. This is called "labial hiding" because both Meem and Ba are lip letters. Your lips should be relaxed, not pressed together.',
    descriptionFr:
      'Lorsque le Meem Sakinah (مْ) est suivi par Ba (ب), dissimulez le Meem avec les lèvres légèrement entrouvertes (pas complètement fermées). Laissez un bourdonnement nasal passer par le nez pendant 2 temps. C\'est appelé « dissimulation labiale » car le Meem et le Ba sont tous deux des lettres labiales. Vos lèvres doivent être détendues, pas pressées l\'une contre l\'autre.',
    descriptionArabic:
      'إخفاء الميم الساكنة عند حرف الباء فقط مع إبقاء الشفتين منفرجتين قليلاً والغنة بمقدار حركتين',
    letters: ['ب'],
    duration: 2,
    examples: [
      {
        text: 'تَرْمِيهِم بِحِجَارَةٍ',
        fullAyahText: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ',
        highlightText: 'م بِ',
        transliteration: "tarmīhim bihijāratin",
        surahNumber: 105,
        surahName: 'Al-Fil',
        ayahNumber: 4,
        explanation: 'Meem sakinah hidden before Ba (ب) with ghunnah',
        explanationFr: 'Meem sakinah dissimulé avant Ba (ب) avec ghunnah',
      },
      {
        text: 'فَبَشِّرْهُم بِعَذَابٍ',
        fullAyahText: 'فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ',
        highlightText: 'م بِ',
        transliteration: "fa-bashirhum bi'adhāb",
        surahNumber: 84,
        surahName: 'Al-Inshiqaq',
        ayahNumber: 24,
        explanation: 'Meem hidden before Ba with lips slightly apart',
        explanationFr: 'Meem dissimulé avant Ba avec les lèvres légèrement entrouvertes',
      },
    ],
  },
  {
    id: 'idgham_shafawi',
    nameArabic: 'إدغام شفوي',
    nameEnglish: 'Idgham Shafawi (Labial Merging)',
    nameFrench: 'Assimilation Labiale',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.idgham_shafawi,
    description:
      'When Meem Sakinah (مْ) is followed by another Meem (م), the two Meems merge into one long Meem sound with nasalization for 2 counts. Close your lips and let the sound flow through your nose. It sounds like one extended "mmm" sound.',
    descriptionFr:
      'Lorsque le Meem Sakinah (مْ) est suivi par un autre Meem (م), les deux Meem fusionnent en un seul son de Meem prolongé avec nasalisation pendant 2 temps. Fermez les lèvres et laissez le son passer par le nez. Cela sonne comme un son « mmm » prolongé.',
    descriptionArabic:
      'إدغام الميم الساكنة في الميم المتحركة فتصيران ميماً واحدة مشددة مع الغنة بمقدار حركتين',
    letters: ['م'],
    duration: 2,
    examples: [
      {
        text: 'لَهُم مَّا يَشَاءُونَ',
        fullAyahText: 'لَهُم مَّا يَشَاءُونَ فِيهَا وَلَدَيْنَا مَزِيدٌ',
        highlightText: 'م مَّ',
        transliteration: "lahum-mā yashā'ūn",
        surahNumber: 50,
        surahName: 'Qaf',
        ayahNumber: 35,
        explanation: 'Two Meems merge into one extended Meem with ghunnah',
        explanationFr: 'Deux Meem fusionnent en un seul Meem prolongé avec ghunnah',
      },
      {
        text: 'أَنَّهُم مُّهْتَدُونَ',
        fullAyahText: 'وَإِنَّهُمْ لَيَصُدُّونَهُمْ عَنِ السَّبِيلِ وَيَحْسَبُونَ أَنَّهُم مُّهْتَدُونَ',
        highlightText: 'م مُّ',
        transliteration: "annahum-muhtadūn",
        surahNumber: 43,
        surahName: 'Az-Zukhruf',
        ayahNumber: 37,
        explanation: 'Meem sakinah merges into Meem - pronounced as one long Meem',
        explanationFr: 'Meem sakinah fusionne dans Meem - prononcé comme un seul Meem prolongé',
      },
    ],
  },
  {
    id: 'izhar_shafawi',
    nameArabic: 'إظهار شفوي',
    nameEnglish: 'Izhar Shafawi (Labial Clear)',
    nameFrench: 'Prononciation Claire Labiale',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.izhar_shafawi,
    description:
      'When Meem Sakinah (مْ) is followed by ANY letter except Ba (ب) or Meem (م), pronounce the Meem clearly and fully. Close your lips briefly for the Meem, then open them for the next letter. There is NO nasal hum here - just a clean, clear Meem sound.',
    descriptionFr:
      'Lorsque le Meem Sakinah (مْ) est suivi par N\'IMPORTE QUELLE lettre sauf Ba (ب) ou Meem (م), prononcez le Meem clairement et complètement. Fermez brièvement les lèvres pour le Meem, puis ouvrez-les pour la lettre suivante. Il n\'y a AUCUN bourdonnement nasal ici - juste un son de Meem net et clair.',
    descriptionArabic:
      'إظهار الميم الساكنة وإخراجها واضحة عند جميع الحروف ما عدا الباء والميم - بدون غنة زائدة',
    letters: [],
    examples: [
      {
        text: 'الْحَمْدُ',
        fullAyahText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        highlightText: 'مْدُ',
        transliteration: "al-hamdu",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 2,
        explanation: 'Meem sakinah before Dal (د) - clear pronunciation',
        explanationFr: 'Meem sakinah avant Dal (د) - prononciation claire',
      },
      {
        text: 'لَكُمْ دِينُكُمْ',
        fullAyahText: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
        highlightText: 'مْ دِ',
        transliteration: "lakum dīnukum",
        surahNumber: 109,
        surahName: 'Al-Kafirun',
        ayahNumber: 6,
        explanation: 'Meem sakinah before Dal (د) - izhar shafawi',
        explanationFr: 'Meem sakinah avant Dal (د) - izhar shafawi',
      },
    ],
  },

  // ============ Madd (Elongation) Rules ============
  {
    id: 'madd_tabii',
    nameArabic: 'مد طبيعي',
    nameEnglish: 'Madd Tabii (Natural)',
    nameFrench: 'Prolongation Naturelle',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_tabii,
    description:
      'The basic elongation that naturally occurs with long vowels. When you see Alif (ا) after Fatha, Waw (و) after Damma, or Ya (ي) after Kasra, stretch the sound for exactly 2 counts (like saying "one-two" in your head). This is the foundation - all other Madd rules build on this.',
    descriptionFr:
      'La prolongation de base qui se produit naturellement avec les voyelles longues. Lorsque vous voyez un Alif (ا) après une Fatha, un Waw (و) après une Damma, ou un Ya (ي) après une Kasra, étirez le son pendant exactement 2 temps (comme si vous disiez « un-deux » dans votre tête). C\'est le fondement - toutes les autres règles de Madd s\'appuient sur celui-ci.',
    descriptionArabic:
      'المد الأصلي الطبيعي - الألف بعد الفتحة، الواو بعد الضمة، الياء بعد الكسرة - مقداره حركتان',
    duration: 2,
    examples: [
      {
        text: 'الرَّحِيمِ',
        fullAyahText: 'الرَّحْمَٰنِ الرَّحِيمِ',
        highlightText: 'حِي',
        transliteration: "ar-rahīm",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 3,
        explanation: 'Ya after kasra - elongate for 2 counts',
        explanationFr: 'Ya après kasra - prolonger pendant 2 temps',
      },
      {
        text: 'مَالِكِ',
        fullAyahText: 'مَالِكِ يَوْمِ الدِّينِ',
        highlightText: 'مَا',
        transliteration: "māliki",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 4,
        explanation: 'Alif after fatha - 2 counts natural elongation',
        explanationFr: 'Alif après fatha - prolongation naturelle de 2 temps',
      },
      {
        text: 'الْأُولَىٰ',
        fullAyahText: 'وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ',
        highlightText: 'أُو',
        transliteration: "al-ūlā",
        surahNumber: 93,
        surahName: 'Ad-Duha',
        ayahNumber: 4,
        explanation: 'Waw after damma (أُو) - elongate for 2 counts',
        explanationFr: 'Waw après damma (أُو) - prolonger pendant 2 temps',
      },
    ],
  },
  {
    id: 'madd_wajib',
    nameArabic: 'مد واجب متصل',
    nameEnglish: 'Madd Wajib (Required Connected)',
    nameFrench: 'Prolongation Obligatoire',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_wajib,
    description:
      'When a Hamza (ء) comes AFTER a Madd letter WITHIN THE SAME WORD, you MUST stretch for 4-5 counts. This is called "connected" because the Madd and Hamza are connected in one word. Think of it as the Hamza "pulling" the sound longer. This is REQUIRED - not optional.',
    descriptionFr:
      'Lorsqu\'une Hamza (ء) vient APRES une lettre de Madd DANS LE MEME MOT, vous DEVEZ étirer pendant 4-5 temps. C\'est appelé « connecté » car le Madd et la Hamza sont connectés dans un seul mot. Pensez-y comme la Hamza qui « tire » le son plus longtemps. C\'est OBLIGATOIRE - pas optionnel.',
    descriptionArabic:
      'المد المتصل الواجب - الهمزة بعد حرف المد في كلمة واحدة - مقداره ٤-٥ حركات - لا يجوز قصره',
    duration: 5,
    examples: [
      {
        text: 'جَاءَ',
        fullAyahText: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        highlightText: 'جَاءَ',
        transliteration: "jā'a",
        surahNumber: 110,
        surahName: 'An-Nasr',
        ayahNumber: 1,
        explanation: 'Alif followed by hamza in same word - must elongate 4-5 counts',
        explanationFr: 'Alif suivi d\'une hamza dans le même mot - prolonger obligatoirement 4-5 temps',
      },
      {
        text: 'السَّمَاءُ',
        fullAyahText: 'وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا',
        highlightText: 'مَاءُ',
        transliteration: "as-samā'u",
        surahNumber: 78,
        surahName: 'An-Naba',
        ayahNumber: 19,
        explanation: 'Alif before hamza within the word - 4-5 counts',
        explanationFr: 'Alif avant hamza dans le mot - 4-5 temps',
      },
      {
        text: 'مَاءً',
        fullAyahText: 'وَأَنزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا',
        highlightText: 'مَاءً',
        transliteration: "mā'an",
        surahNumber: 78,
        surahName: 'An-Naba',
        ayahNumber: 14,
        explanation: 'Alif followed by hamza - madd wajib muttasil',
        explanationFr: 'Alif suivi d\'une hamza - madd wajib muttasil',
      },
    ],
  },
  {
    id: 'madd_jaiz',
    nameArabic: 'مد جائز منفصل',
    nameEnglish: 'Madd Jaiz (Permissible Separated)',
    nameFrench: 'Prolongation Permise',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_jaiz,
    description:
      'When a Madd letter at the END of one word is followed by a Hamza (ء) at the START of the NEXT word, you MAY stretch for 2, 4, or 6 counts. This is "permissible" because you have flexibility. It is called "separated" because the Madd and Hamza are in different words.',
    descriptionFr:
      'Lorsqu\'une lettre de Madd à la FIN d\'un mot est suivie par une Hamza (ء) au DEBUT du mot SUIVANT, vous POUVEZ étirer pendant 2, 4 ou 6 temps. C\'est « permis » car vous avez de la flexibilité. C\'est appelé « séparé » car le Madd et la Hamza sont dans des mots différents.',
    descriptionArabic:
      'المد المنفصل الجائز - حرف المد في آخر كلمة والهمزة في أول الكلمة التالية - يجوز مده ٢ أو ٤ أو ٦ حركات',
    duration: 4,
    examples: [
      {
        text: 'يَا أَيُّهَا',
        fullAyahText: 'يَا أَيُّهَا الْمُزَّمِّلُ',
        highlightText: 'يَا أَ',
        transliteration: "yā ayyuhā",
        surahNumber: 73,
        surahName: 'Al-Muzzammil',
        ayahNumber: 1,
        explanation: 'Alif of "yā" followed by hamza of next word - 2, 4, or 6 counts',
        explanationFr: 'Alif de « yā » suivi d\'une hamza du mot suivant - 2, 4 ou 6 temps',
      },
      {
        text: 'إِنَّا أَنزَلْنَاهُ',
        fullAyahText: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        highlightText: 'نَّا أَ',
        transliteration: "innā anzalnāhu",
        surahNumber: 97,
        surahName: 'Al-Qadr',
        ayahNumber: 1,
        explanation: 'Alif madd followed by hamza in next word',
        explanationFr: 'Alif madd suivi d\'une hamza dans le mot suivant',
      },
    ],
  },
  {
    id: 'madd_lazim',
    nameArabic: 'مد لازم',
    nameEnglish: 'Madd Lazim (Obligatory)',
    nameFrench: 'Prolongation Nécessaire',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_lazim,
    description:
      'When a Sukoon (ـْـ) or Shaddah (ـّـ) comes AFTER a Madd letter, you MUST stretch for exactly 6 counts - no more, no less. This is the longest required Madd. The "heaviness" of the sukoon/shaddah demands this full elongation. Common in words like "الضَّالِّين" and opening letters of some Surahs.',
    descriptionFr:
      'Lorsqu\'un Soukoun (ـْـ) ou une Shadda (ـّـ) vient APRES une lettre de Madd, vous DEVEZ étirer pendant exactement 6 temps - ni plus, ni moins. C\'est la plus longue prolongation obligatoire. La « lourdeur » du soukoun/shadda exige cette prolongation complète. Courant dans des mots comme « الضَّالِّين » et les lettres d\'ouverture de certaines sourates.',
    descriptionArabic:
      'المد اللازم - سكون أو شدة بعد حرف المد - مقداره ٦ حركات وجوباً - أطول أنواع المد',
    duration: 6,
    examples: [
      {
        text: 'الضَّالِّينَ',
        fullAyahText: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        highlightText: 'ضَّالِّ',
        transliteration: "ad-dāllīn",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 7,
        explanation: 'Alif before shaddah on Lam - must elongate exactly 6 counts',
        explanationFr: 'Alif avant shadda sur Lam - prolonger obligatoirement exactement 6 temps',
      },
      {
        text: 'الْحَاقَّةُ',
        fullAyahText: 'الْحَاقَّةُ',
        highlightText: 'حَاقَّ',
        transliteration: "al-hāqqah",
        surahNumber: 69,
        surahName: 'Al-Haqqah',
        ayahNumber: 1,
        explanation: 'Alif before shaddah on Qaf - obligatory 6 counts',
        explanationFr: 'Alif avant shadda sur Qaf - 6 temps obligatoires',
      },
    ],
  },
  {
    id: 'madd_arid',
    nameArabic: 'مد عارض للسكون',
    nameEnglish: 'Madd Arid (Due to Stopping)',
    nameFrench: 'Prolongation due au Arrêt',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_arid,
    description:
      'When you STOP (pause) at the end of a word that has a Madd letter before the final letter, you may stretch for 2, 4, or 6 counts. The sukoon is "temporary" - it only exists because you stopped. This commonly happens at the end of verses. You have flexibility in how long to stretch.',
    descriptionFr:
      'Lorsque vous vous ARRETEZ (pause) à la fin d\'un mot qui contient une lettre de Madd avant la dernière lettre, vous pouvez étirer pendant 2, 4 ou 6 temps. Le soukoun est « temporaire » - il n\'existe que parce que vous vous êtes arrêté. Cela se produit couramment à la fin des versets. Vous avez de la flexibilité dans la durée de l\'étirement.',
    descriptionArabic:
      'المد العارض للسكون - يحدث عند الوقف على كلمة فيها حرف مد قبل الحرف الأخير - يجوز مده ٢ أو ٤ أو ٦ حركات',
    examples: [
      {
        text: 'الْعَالَمِينَ',
        fullAyahText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        highlightText: 'مِينَ',
        transliteration: "al-'ālamīn",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 2,
        explanation: 'When stopping, Ya before Noon can be elongated 2, 4, or 6 counts',
        explanationFr: 'En s\'arrêtant, Ya avant Noun peut être prolongé de 2, 4 ou 6 temps',
      },
      {
        text: 'نَسْتَعِينُ',
        fullAyahText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        highlightText: 'عِينُ',
        transliteration: "nasta'īn",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 5,
        explanation: 'Ya before Noon - madd arid when pausing',
        explanationFr: 'Ya avant Noun - madd arid lors d\'une pause',
      },
    ],
  },
  {
    id: 'madd_leen',
    nameArabic: 'مد لين',
    nameEnglish: 'Madd Leen (Soft)',
    nameFrench: 'Prolongation Douce',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_leen,
    description:
      'When Waw Sakinah (وْ) or Ya Sakinah (يْ) is preceded by a FATHA (not their matching vowel), and you stop on the following letter, you may softly stretch for 2, 4, or 6 counts. These are called "soft letters" because the sound glides smoothly. Examples: خَوْف (khawf), بَيْت (bayt).',
    descriptionFr:
      'Lorsque le Waw Sakinah (وْ) ou le Ya Sakinah (يْ) est précédé par une FATHA (pas leur voyelle correspondante), et que vous vous arrêtez sur la lettre suivante, vous pouvez doucement étirer pendant 2, 4 ou 6 temps. Elles sont appelées « lettres douces » car le son glisse en douceur. Exemples : خَوْف (khawf), بَيْت (bayt).',
    descriptionArabic:
      'مد الواو والياء الساكنتين المفتوح ما قبلهما (حرفا اللين) عند الوقف - يجوز مده ٢ أو ٤ أو ٦ حركات',
    examples: [
      {
        text: 'قُرَيْشٍ',
        fullAyahText: 'لِإِيلَافِ قُرَيْشٍ',
        highlightText: 'رَيْ',
        transliteration: "Quraysh",
        surahNumber: 106,
        surahName: 'Quraysh',
        ayahNumber: 1,
        explanation: 'Ya sakinah after fatha - soft elongation when stopping',
        explanationFr: 'Ya sakinah après fatha - prolongation douce lors de l\'arrêt',
      },
      {
        text: 'خَوْفٍ',
        fullAyahText: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ',
        highlightText: 'خَوْ',
        transliteration: "khawf",
        surahNumber: 106,
        surahName: 'Quraysh',
        ayahNumber: 4,
        explanation: 'Waw sakinah after fatha - soft elongation when stopping',
        explanationFr: 'Waw sakinah après fatha - prolongation douce lors de l\'arrêt',
      },
    ],
  },

  // ============ Qalqalah Rules ============
  {
    id: 'qalqalah_sughra',
    nameArabic: 'قلقلة صغرى',
    nameEnglish: 'Qalqalah Sughra (Minor Echo)',
    category: 'qalqalah',
    colorCode: TAJWEED_COLORS.qalqalah_sughra,
    description:
      'When the letters ق ط ب ج د (remember "Qutub Jad" قطب جد) have sukoon IN THE MIDDLE of a word, add a small bouncing/echoing sound. Your tongue or lips bounce slightly off the articulation point, creating a brief "popping" sound. The echo is subtle - not as strong as at the end of words.',
    descriptionArabic:
      'القلقلة الصغرى - اضطراب الحرف في وسط الكلمة مع نبرة خفيفة - أحرفها: قطب جد',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: [
      // ق (Qaf)
      {
        text: 'اقْرَأْ',
        fullAyahText: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
        highlightText: 'قْرَ',
        transliteration: "iqra'",
        surahNumber: 96,
        surahName: 'Al-Alaq',
        ayahNumber: 1,
        explanation: 'Qaf (ق) with sukoon - subtle bounce from back of tongue',
      },
      // ط (Ṭa)
      {
        text: 'أَطْعَمَهُم',
        fullAyahText: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ',
        highlightText: 'طْعَ',
        transliteration: "aṭ'amahum",
        surahNumber: 106,
        surahName: 'Quraysh',
        ayahNumber: 4,
        explanation: 'Ṭa (ط) with sukoon - emphatic bounce sound',
      },
      // ب (Ba)
      {
        text: 'سَبْعًا',
        fullAyahText: 'وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا',
        highlightText: 'بْعً',
        transliteration: "sab'an",
        surahNumber: 78,
        surahName: 'An-Naba',
        ayahNumber: 12,
        explanation: 'Ba (ب) with sukoon - lips bounce apart briefly',
      },
      // ج (Jeem)
      {
        text: 'نَجْعَلُ',
        fullAyahText: 'أَفَنَجْعَلُ الْمُسْلِمِينَ كَالْمُجْرِمِينَ',
        highlightText: 'جْعَ',
        transliteration: "naj'alu",
        surahNumber: 68,
        surahName: 'Al-Qalam',
        ayahNumber: 35,
        explanation: 'Jeem (ج) with sukoon - middle tongue bounces',
      },
      // د (Dal)
      {
        text: 'يَدْخُلُونَ',
        fullAyahText: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
        highlightText: 'دْخُ',
        transliteration: "yadkhulūn",
        surahNumber: 110,
        surahName: 'An-Nasr',
        ayahNumber: 2,
        explanation: 'Dal (د) with sukoon - tongue tip bounces from teeth ridge',
      },
    ],
  },
  {
    id: 'qalqalah_kubra',
    nameArabic: 'قلقلة كبرى',
    nameEnglish: 'Qalqalah Kubra (Major Echo)',
    category: 'qalqalah',
    colorCode: TAJWEED_COLORS.qalqalah_kubra,
    description:
      'When the letters ق ط ب ج د appear AT THE END of a word (or when you stop on them), the echoing sound is STRONGER and more pronounced. This is the "major" qalqalah. The bouncing sound is clear and noticeable. When you pause at the end of a verse on these letters, give them a strong, clear echo.',
    descriptionArabic:
      'القلقلة الكبرى - اضطراب الحرف في آخر الكلمة أو عند الوقف - النبرة أقوى وأوضح',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: [
      // ق (Qaf)
      {
        text: 'الْفَلَقِ',
        fullAyahText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        highlightText: 'لَقِ',
        transliteration: "al-falaq",
        surahNumber: 113,
        surahName: 'Al-Falaq',
        ayahNumber: 1,
        explanation: 'Qaf (ق) at end - strong echo from deep in throat',
      },
      // ط (Ṭa)
      {
        text: 'الصِّرَاطَ',
        fullAyahText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        highlightText: 'رَاطَ',
        transliteration: "aṣ-ṣirāṭ",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 6,
        explanation: 'Ṭa (ط) when stopping - strong emphatic echo',
      },
      // ب (Ba)
      {
        text: 'لَهَبٍ',
        fullAyahText: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
        highlightText: 'هَبٍ',
        transliteration: "lahab",
        surahNumber: 111,
        surahName: 'Al-Masad',
        ayahNumber: 1,
        explanation: 'Ba (ب) at end - lips create strong popping echo',
      },
      // ج (Jeem)
      {
        text: 'الْبُرُوجِ',
        fullAyahText: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ',
        highlightText: 'رُوجِ',
        transliteration: "al-burūj",
        surahNumber: 85,
        surahName: 'Al-Buruj',
        ayahNumber: 1,
        explanation: 'Jeem (ج) at end - strong bouncing echo',
      },
      // د (Dal)
      {
        text: 'مَسَدٍ',
        fullAyahText: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ',
        highlightText: 'سَدٍ',
        transliteration: "masad",
        surahNumber: 111,
        surahName: 'Al-Masad',
        ayahNumber: 5,
        explanation: 'Dal (د) at end - tongue creates clear echoing sound',
      },
    ],
  },

  // ============ Ghunnah Rules ============
  {
    id: 'ghunnah',
    nameArabic: 'غنة',
    nameEnglish: 'Ghunnah (Nasalization)',
    category: 'ghunnah',
    colorCode: TAJWEED_COLORS.ghunnah,
    description:
      'Ghunnah is the nasal humming sound that comes from your nose (not your mouth). When Noon (ن) or Meem (م) has a Shaddah (ـّـ), you MUST make this humming sound for 2 counts. Close your mouth slightly and let the sound resonate in your nasal passage. It sounds like "mmm" or "nnn". This appears in many Tajweed rules.',
    descriptionArabic:
      'الغنة صوت أغن لذيذ يخرج من الخيشوم (الأنف) مقداره حركتان - واجبة في النون والميم المشددتين',
    letters: ['ن', 'م'],
    duration: 2,
    examples: [
      {
        text: 'فَإِنَّ',
        fullAyahText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        highlightText: 'إِنَّ',
        transliteration: "fa-inna",
        surahNumber: 94,
        surahName: 'Ash-Sharh',
        ayahNumber: 5,
        explanation: 'Noon with shaddah - ghunnah for 2 counts through the nose',
      },
      {
        text: 'ثُمَّ',
        fullAyahText: 'ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ',
        highlightText: 'ثُمَّ',
        transliteration: "thumma",
        surahNumber: 102,
        surahName: 'At-Takathur',
        ayahNumber: 4,
        explanation: 'Meem with shaddah - nasal sound for 2 counts',
      },
      {
        text: 'إِنَّا',
        fullAyahText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        highlightText: 'إِنَّا',
        transliteration: "innā",
        surahNumber: 108,
        surahName: 'Al-Kawthar',
        ayahNumber: 1,
        explanation: 'Noon mushaddad - pronounced with nasalization',
      },
    ],
  },

  // ============ Lam Rules ============
  {
    id: 'lam_shamsiyyah',
    nameArabic: 'لام شمسية',
    nameEnglish: 'Lam Shamsiyyah (Sun Letters)',
    category: 'lam_shamsiyyah',
    colorCode: TAJWEED_COLORS.lam_shamsiyyah,
    description:
      'When "Al" (ال) comes before a "Sun Letter", the Lam becomes SILENT - you do NOT pronounce it! Instead, you double the following letter. Why "sun"? Because الشَّمْس (the sun) is pronounced "ash-shams" not "al-shams". The 14 sun letters are all pronounced near the front of the mouth, close to where Lam is made.',
    descriptionArabic:
      'اللام الشمسية: لام (ال) التعريف لا تُنطق عند الحروف الشمسية الـ١٤ وتُدغم في الحرف الذي بعدها فيُشدَّد',
    letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
    examples: [
      // ت (Ta)
      {
        text: 'التَّكَاثُرُ',
        fullAyahText: 'أَلْهَاكُمُ التَّكَاثُرُ',
        highlightText: 'التَّ',
        transliteration: "at-takāthur",
        surahNumber: 102,
        surahName: 'At-Takathur',
        ayahNumber: 1,
        explanation: 'Lam merges into Ta (ت) - pronounced "at-takāthur"',
      },
      // ث (Tha)
      {
        text: 'الثَّاقِبُ',
        fullAyahText: 'النَّجْمُ الثَّاقِبُ',
        highlightText: 'الثَّ',
        transliteration: "ath-thāqib",
        surahNumber: 86,
        surahName: 'At-Tariq',
        ayahNumber: 3,
        explanation: 'Lam merges into Tha (ث) - pronounced "ath-thāqib"',
      },
      // د (Dal)
      {
        text: 'الدِّينِ',
        fullAyahText: 'مَالِكِ يَوْمِ الدِّينِ',
        highlightText: 'الدِّ',
        transliteration: "ad-dīn",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 4,
        explanation: 'Lam merges into Dal (د) - pronounced "ad-dīn"',
      },
      // ذ (Dhal)
      {
        text: 'الذِّكْرَ',
        fullAyahText: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
        highlightText: 'الذِّ',
        transliteration: "adh-dhikr",
        surahNumber: 15,
        surahName: 'Al-Hijr',
        ayahNumber: 9,
        explanation: 'Lam merges into Dhal (ذ) - pronounced "adh-dhikr"',
      },
      // ر (Ra)
      {
        text: 'الرَّحْمَٰنِ',
        fullAyahText: 'الرَّحْمَٰنِ الرَّحِيمِ',
        highlightText: 'الرَّ',
        transliteration: "ar-raḥmān",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 3,
        explanation: 'Lam merges into Ra (ر) - pronounced "ar-raḥmān"',
      },
      // ز (Zayn)
      {
        text: 'الزَّيْتُونِ',
        fullAyahText: 'وَالتِّينِ وَالزَّيْتُونِ',
        highlightText: 'الزَّ',
        transliteration: "az-zaytūn",
        surahNumber: 95,
        surahName: 'At-Tin',
        ayahNumber: 1,
        explanation: 'Lam merges into Zayn (ز) - pronounced "az-zaytūn"',
      },
      // س (Seen)
      {
        text: 'السَّمَاءِ',
        fullAyahText: 'وَالسَّمَاءِ وَالطَّارِقِ',
        highlightText: 'السَّ',
        transliteration: "as-samā'",
        surahNumber: 86,
        surahName: 'At-Tariq',
        ayahNumber: 1,
        explanation: 'Lam merges into Seen (س) - pronounced "as-samā\'"',
      },
      // ش (Shin)
      {
        text: 'الشَّمْسِ',
        fullAyahText: 'وَالشَّمْسِ وَضُحَاهَا',
        highlightText: 'الشَّ',
        transliteration: "ash-shams",
        surahNumber: 91,
        surahName: 'Ash-Shams',
        ayahNumber: 1,
        explanation: 'Lam merges into Shin (ش) - pronounced "ash-shams"',
      },
      // ص (Sad)
      {
        text: 'الصَّمَدُ',
        fullAyahText: 'اللَّهُ الصَّمَدُ',
        highlightText: 'الصَّ',
        transliteration: "aṣ-ṣamad",
        surahNumber: 112,
        surahName: 'Al-Ikhlas',
        ayahNumber: 2,
        explanation: 'Lam merges into Sad (ص) - pronounced "aṣ-ṣamad"',
      },
      // ض (Dad)
      {
        text: 'الضُّحَى',
        fullAyahText: 'وَالضُّحَى',
        highlightText: 'الضُّ',
        transliteration: "aḍ-ḍuḥā",
        surahNumber: 93,
        surahName: 'Ad-Duha',
        ayahNumber: 1,
        explanation: 'Lam merges into Dad (ض) - pronounced "aḍ-ḍuḥā"',
      },
      // ط (Taa)
      {
        text: 'الطَّارِقِ',
        fullAyahText: 'وَالسَّمَاءِ وَالطَّارِقِ',
        highlightText: 'الطَّ',
        transliteration: "aṭ-ṭāriq",
        surahNumber: 86,
        surahName: 'At-Tariq',
        ayahNumber: 1,
        explanation: 'Lam merges into Taa (ط) - pronounced "aṭ-ṭāriq"',
      },
      // ظ (Dhaa)
      {
        text: 'الظُّلُمَاتِ',
        fullAyahText: 'هُوَ الَّذِي يُصَلِّي عَلَيْكُمْ وَمَلَائِكَتُهُ لِيُخْرِجَكُم مِّنَ الظُّلُمَاتِ إِلَى النُّورِ وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا',
        highlightText: 'الظُّ',
        transliteration: "aẓ-ẓulumāt",
        surahNumber: 33,
        surahName: 'Al-Ahzab',
        ayahNumber: 43,
        explanation: 'Lam merges into Dhaa (ظ) - pronounced "aẓ-ẓulumāt"',
      },
      // ل (Lam)
      {
        text: 'اللَّيْلِ',
        fullAyahText: 'وَاللَّيْلِ إِذَا يَغْشَى',
        highlightText: 'اللَّ',
        transliteration: "al-layl",
        surahNumber: 92,
        surahName: 'Al-Layl',
        ayahNumber: 1,
        explanation: 'Lam merges into Lam (ل) - pronounced "al-layl"',
      },
      // ن (Noon)
      {
        text: 'النَّاسِ',
        fullAyahText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        highlightText: 'النَّ',
        transliteration: "an-nās",
        surahNumber: 114,
        surahName: 'An-Nas',
        ayahNumber: 1,
        explanation: 'Lam merges into Noon (ن) - pronounced "an-nās"',
      },
    ],
  },
  {
    id: 'lam_qamariyyah',
    nameArabic: 'لام قمرية',
    nameEnglish: 'Lam Qamariyyah (Moon Letters)',
    category: 'lam_shamsiyyah',
    colorCode: TAJWEED_COLORS.lam_qamariyyah,
    description:
      'When "Al" (ال) comes before a "Moon Letter", the Lam is clearly PRONOUNCED - you hear the "L" sound! Why "moon"? Because الْقَمَر (the moon) is pronounced "al-qamar" with a clear "L". The 14 moon letters are pronounced further from where Lam is made, so the Lam stays separate and clear.',
    descriptionArabic:
      'اللام القمرية: لام (ال) التعريف تُنطق واضحة وظاهرة عند الحروف القمرية الـ١٤',
    letters: ['ا', 'ب', 'ج', 'ح', 'خ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'و', 'ه', 'ي'],
    examples: [
      // ا (Alif)
      {
        text: 'الْأَرْضُ',
        fullAyahText: 'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا',
        highlightText: 'الْأَ',
        transliteration: "al-arḍ",
        surahNumber: 99,
        surahName: 'Az-Zalzalah',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Alif (ا) - "al-arḍ"',
      },
      // ب (Ba)
      {
        text: 'الْبَيْتِ',
        fullAyahText: 'فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ',
        highlightText: 'الْبَ',
        transliteration: "al-bayt",
        surahNumber: 106,
        surahName: 'Quraysh',
        ayahNumber: 3,
        explanation: 'Lam clearly pronounced before Ba (ب) - "al-bayt"',
      },
      // ج (Jeem)
      {
        text: 'الْجِبَالُ',
        fullAyahText: 'وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا',
        highlightText: 'الْجِ',
        transliteration: "al-jibāl",
        surahNumber: 78,
        surahName: 'An-Naba',
        ayahNumber: 20,
        explanation: 'Lam clearly pronounced before Jeem (ج) - "al-jibāl"',
      },
      // ح (Ha)
      {
        text: 'الْحَمْدُ',
        fullAyahText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        highlightText: 'الْحَ',
        transliteration: "al-ḥamd",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 2,
        explanation: 'Lam clearly pronounced before Ha (ح) - "al-ḥamd"',
      },
      // خ (Kha)
      {
        text: 'الْخَنَّاسِ',
        fullAyahText: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        highlightText: 'الْخَ',
        transliteration: "al-khannās",
        surahNumber: 114,
        surahName: 'An-Nas',
        ayahNumber: 4,
        explanation: 'Lam clearly pronounced before Kha (خ) - "al-khannās"',
      },
      // ع (Ayn)
      {
        text: 'الْعَصْرِ',
        fullAyahText: 'وَالْعَصْرِ',
        highlightText: 'الْعَ',
        transliteration: "al-'aṣr",
        surahNumber: 103,
        surahName: 'Al-Asr',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Ayn (ع) - "al-\'aṣr"',
      },
      // غ (Ghayn)
      {
        text: 'الْغَاشِيَةِ',
        fullAyahText: 'هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ',
        highlightText: 'الْغَ',
        transliteration: "al-ghāshiyah",
        surahNumber: 88,
        surahName: 'Al-Ghashiyah',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Ghayn (غ) - "al-ghāshiyah"',
      },
      // ف (Fa)
      {
        text: 'الْفَلَقِ',
        fullAyahText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        highlightText: 'الْفَ',
        transliteration: "al-falaq",
        surahNumber: 113,
        surahName: 'Al-Falaq',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Fa (ف) - "al-falaq"',
      },
      // ق (Qaf)
      {
        text: 'الْقَمَرُ',
        fullAyahText: 'اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ',
        highlightText: 'الْقَ',
        transliteration: "al-qamar",
        surahNumber: 54,
        surahName: 'Al-Qamar',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Qaf (ق) - "al-qamar"',
      },
      // ك (Kaf)
      {
        text: 'الْكَوْثَرَ',
        fullAyahText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        highlightText: 'الْكَ',
        transliteration: "al-kawthar",
        surahNumber: 108,
        surahName: 'Al-Kawthar',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Kaf (ك) - "al-kawthar"',
      },
      // م (Meem)
      {
        text: 'الْمَاعُونَ',
        fullAyahText: 'وَيَمْنَعُونَ الْمَاعُونَ',
        highlightText: 'الْمَ',
        transliteration: "al-mā'ūn",
        surahNumber: 107,
        surahName: 'Al-Ma\'un',
        ayahNumber: 7,
        explanation: 'Lam clearly pronounced before Meem (م) - "al-mā\'ūn"',
      },
      // و (Waw)
      {
        text: 'الْوَاقِعَةُ',
        fullAyahText: 'إِذَا وَقَعَتِ الْوَاقِعَةُ',
        highlightText: 'الْوَ',
        transliteration: "al-wāqi'ah",
        surahNumber: 56,
        surahName: 'Al-Waqi\'ah',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Waw (و) - "al-wāqi\'ah"',
      },
      // ه (Ha)
      {
        text: 'الْهَوَى',
        fullAyahText: 'وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ',
        highlightText: 'الْهَ',
        transliteration: "al-hawā",
        surahNumber: 79,
        surahName: 'An-Nazi\'at',
        ayahNumber: 40,
        explanation: 'Lam clearly pronounced before Ha (ه) - "al-hawā"',
      },
      // ي (Ya)
      {
        text: 'الْيَتِيمَ',
        fullAyahText: 'فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ',
        highlightText: 'الْيَ',
        transliteration: "al-yatīm",
        surahNumber: 93,
        surahName: 'Ad-Duha',
        ayahNumber: 9,
        explanation: 'Lam clearly pronounced before Ya (ي) - "al-yatīm"',
      },
    ],
  },

  // ============ Recitation Styles (Speeds) ============
  {
    id: 'recitation_tahqiq',
    nameArabic: 'تحقيق',
    nameEnglish: 'Tahqiq (Precision)',
    category: 'recitation_styles',
    colorCode: TAJWEED_COLORS.recitation_tahqiq,
    description:
      'Tahqiq is the SLOWEST style of recitation, designed specifically for learning and teaching. Every letter is given its full right - articulation points are precise, elongations are at maximum length, and rules are applied with extreme care. This is ideal for beginners learning Tajweed, as it allows time to focus on each rule. Think of it as "slow motion" Quran recitation where nothing is rushed.',
    descriptionArabic:
      'التحقيق هو أبطأ أنواع التلاوة، مخصص للتعليم والتعلم. يُعطى كل حرف حقه الكامل مع التأني في إخراج الحروف وتطبيق الأحكام بدقة متناهية',
    examples: [
      {
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        fullAyahText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        highlightText: 'الْحَمْدُ',
        transliteration: "al-ḥamdu lillāhi rabbi al-'ālamīn",
        surahNumber: 1,
        surahName: 'Al-Fatiha',
        ayahNumber: 2,
        explanation: 'In Tahqiq, each letter is pronounced slowly with full attention to articulation points',
      },
    ],
  },
  {
    id: 'recitation_tartil',
    nameArabic: 'ترتيل',
    nameEnglish: 'Tartil (Measured)',
    category: 'recitation_styles',
    colorCode: TAJWEED_COLORS.recitation_tartil,
    description:
      'Tartil is the style RECOMMENDED by Allah in the Quran: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا" (And recite the Quran with measured recitation - 73:4). It is slow and measured, but slightly faster than Tahqiq. Each word is given proper attention, Tajweed rules are fully applied, and there is contemplation (tadabbur) of the meaning. This is the ideal style for regular recitation and prayer.',
    descriptionArabic:
      'الترتيل هو الأسلوب الذي أمر الله به في قوله: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا". تلاوة متأنية مع تدبر المعاني وتطبيق أحكام التجويد كاملة',
    examples: [
      {
        text: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
        fullAyahText: 'أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
        highlightText: 'وَرَتِّلِ',
        transliteration: "wa rattilil-qur'āna tartīlā",
        surahNumber: 73,
        surahName: 'Al-Muzzammil',
        ayahNumber: 4,
        explanation: 'The command from Allah to recite with Tartil - slow, measured, and contemplative',
      },
    ],
  },
  {
    id: 'recitation_tadwir',
    nameArabic: 'تدوير',
    nameEnglish: 'Tadwir (Moderate)',
    category: 'recitation_styles',
    colorCode: TAJWEED_COLORS.recitation_tadwir,
    description:
      'Tadwir is the MIDDLE pace between Tartil (slow) and Hadr (fast). It maintains all Tajweed rules while moving at a comfortable, moderate speed. This style is commonly used by many famous reciters in their recordings. It balances between careful pronunciation and fluid recitation, making it suitable for those who have mastered the basics and want a natural flow.',
    descriptionArabic:
      'التدوير هو الوسط بين الترتيل والحدر. تلاوة بسرعة معتدلة مع الحفاظ على جميع أحكام التجويد. هذا الأسلوب شائع بين القراء المشهورين',
    examples: [
      {
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        fullAyahText: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        highlightText: 'قُلْ هُوَ',
        transliteration: "qul huwa Allāhu aḥad",
        surahNumber: 112,
        surahName: 'Al-Ikhlas',
        ayahNumber: 1,
        explanation: 'Tadwir allows moderate pace while maintaining proper Tajweed application',
      },
    ],
  },
  {
    id: 'recitation_hadr',
    nameArabic: 'حدر',
    nameEnglish: 'Hadr (Swift)',
    category: 'recitation_styles',
    colorCode: TAJWEED_COLORS.recitation_hadr,
    description:
      'Hadr is the FASTEST style of recitation while STILL maintaining all Tajweed rules. Nothing is skipped or rushed incorrectly - the reciter simply moves quickly through the text. This requires mastery of Tajweed rules, as speed must not compromise accuracy. It is often used for completing the Quran quickly (like in Ramadan) or for personal review (muraja\'ah) by those who have memorized.',
    descriptionArabic:
      'الحدر هو أسرع أنواع التلاوة مع الحفاظ على أحكام التجويد. يتطلب إتقان القواعد حيث لا يجوز أن تؤثر السرعة على صحة النطق. يُستخدم لختم القرآن سريعاً أو للمراجعة',
    examples: [
      {
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        fullAyahText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        highlightText: 'أَعُوذُ',
        transliteration: "qul a'ūdhu bi rabbi an-nās",
        surahNumber: 114,
        surahName: 'An-Nas',
        ayahNumber: 1,
        explanation: 'Even in Hadr (fast recitation), all Tajweed rules must be observed correctly',
      },
    ],
  },
];

// Helper functions
export const getTajweedRuleById = (id: TajweedRuleId): TajweedRule | undefined => {
  return TAJWEED_RULES.find((rule) => rule.id === id);
};

export const getTajweedRulesByCategory = (category: string): TajweedRule[] => {
  return TAJWEED_RULES.filter((rule) => rule.category === category);
};

export const getAllTajweedCategories = (): string[] => {
  const categories = new Set(TAJWEED_RULES.map((rule) => rule.category));
  return Array.from(categories);
};

// Generate audio URL for a Tajweed example
export const getTajweedExampleAudioUrl = (
  surahNumber: number,
  ayahNumber: number,
  reciterId: string = 'mishary'
): string => {
  const RECITER_PATHS: Record<string, string> = {
    mishary: 'Alafasy_128kbps',
    abdul_basit: 'Abdul_Basit_Murattal_192kbps',
    husary: 'Husary_128kbps',
    minshawi: 'Minshawy_Murattal_128kbps',
  };

  const reciterPath = RECITER_PATHS[reciterId] || RECITER_PATHS.mishary;
  const surahStr = surahNumber.toString().padStart(3, '0');
  const ayahStr = ayahNumber.toString().padStart(3, '0');

  return `https://everyayah.com/data/${reciterPath}/${surahStr}${ayahStr}.mp3`;
};
