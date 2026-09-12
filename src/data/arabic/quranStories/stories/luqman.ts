// Luqman (لقمان)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const luqmanStory: QuranStory = {
  id: 'luqman',
  titleEnglish: 'Luqman the Wise',
  titleFrench: "Louqman le Sage",
  titleArabic: 'لقمان الحكيم',
  order: 4,
  category: 'individuals',
  description: 'A wise man who gave timeless advice to his son',
  descriptionFr: 'Un homme sage qui donna des conseils intemporels a son fils',
  summary: "Allah gave Luqman wisdom, and the first word of it was: be grateful. The Quran then gives what he said to his son while instructing him - do not associate anything with Allah; nothing is hidden from Him, not the weight of a mustard seed in a rock; establish prayer, enjoin right, forbid wrong, be patient; do not turn your cheek from people or walk exultantly; be moderate in your pace and lower your voice. Between his words, Allah speaks of the mother who carried him in weakness upon weakness.",
  summaryFr: "Allah donna la sagesse à Louqman, et son premier mot fut : sois reconnaissant. Le Coran donne ensuite ce qu'il dit à son fils en l'exhortant - n'associe rien à Allah ; rien ne Lui est caché, pas même le poids d'un grain de moutarde dans un rocher ; accomplis la prière, commande le bien, interdis le mal, sois patient ; ne détourne pas ton visage des gens et ne marche pas avec insolence ; sois modéré dans ta marche et baisse ta voix. Entre ses mots, Allah parle de la mère qui l'a porté, faiblesse sur faiblesse.",
  lessons: [
    "Wisdom, when Allah gave it, began with \"be grateful to Allah\" - and gratitude is for the one who gives it. The wise man's first lesson was thanks (31:12).",
    "His first word to his son was about shirk, and he called it \"great injustice\". The gravest wrong is named first, and named as an injustice - against the One who made you (31:13).",
    "In the middle of Luqman's advice, Allah Himself speaks of the mother: weakness upon weakness, and two years of weaning. Gratitude to Allah and to parents are in one sentence (31:14).",
    "Even parents who push toward shirk are to be accompanied \"with appropriate kindness\". Refusal of the wrong and kindness to the person are not in conflict (31:15).",
    "A mustard seed inside a rock, in the heavens or the earth - Allah will bring it forth. Nothing is too small to be seen, and nothing hidden enough to be forgotten (31:16).",
    "Prayer, enjoining right, forbidding wrong, patience over what befalls you - and then: that is of the matters requiring resolve. Doing right will cost something; he told his son so (31:17).",
    "\"Do not turn your cheek toward people, and do not walk through the earth exultantly.\" Pride shows in the face and the walk before it shows anywhere else (31:18).",
    "\"Be moderate in your pace and lower your voice.\" The wisdom ends with the volume of a voice. How you carry yourself is part of your religion (31:19).",
  ],
  lessonsFr: [
    "La sagesse, quand Allah la donna, commença par « sois reconnaissant envers Allah » - et la gratitude profite à celui qui la donne. La première leçon du sage fut le remerciement (31:12).",
    "Son premier mot à son fils fut sur le chirk, et il l'appela « une énorme injustice ». Le tort le plus grave est nommé en premier, et nommé comme une injustice - envers Celui qui t'a fait (31:13).",
    "Au milieu du conseil de Louqman, Allah Lui-même parle de la mère : faiblesse sur faiblesse, et deux ans de sevrage. La gratitude envers Allah et envers les parents tiennent en une phrase (31:14).",
    "Même des parents qui poussent au chirk doivent être accompagnés « avec bonté ». Le refus du mal et la bonté envers la personne ne s'opposent pas (31:15).",
    "Un grain de moutarde dans un rocher, dans les cieux ou sur la terre - Allah le fera venir. Rien n'est trop petit pour être vu, et rien assez caché pour être oublié (31:16).",
    "La prière, commander le bien, interdire le mal, la patience sur ce qui t'atteint - puis : cela fait partie des choses qui demandent de la résolution. Faire le bien coûtera quelque chose ; il le dit à son fils (31:17).",
    "« Ne détourne pas ton visage des gens, et ne marche pas sur la terre avec insolence. » L'orgueil se voit dans le visage et la démarche avant de se voir ailleurs (31:18).",
    "« Sois modeste dans ta démarche et baisse ta voix. » La sagesse se termine par le volume d'une voix. La façon de se tenir fait partie de la religion (31:19).",
  ],
  estimatedReadTime: 10,
  quranMentions: 1,
  icon: '📜',
  mainSurah: {
    number: 31,
    name: 'Luqman',
    nameArabic: 'لقمان',
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'luqman-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of Luqman, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nThe Quran gives him one passage in the surah that carries his name, and no authentic hadith adds to it. It does not say whether he was a prophet, who he was, where he lived, or who his son was - and what was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire de Louqman, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nLe Coran lui donne un seul passage dans la sourate qui porte son nom, et aucun hadith authentique n'y ajoute. Il ne dit ni s'il était prophète, ni qui il était, ni où il vécut, ni qui était son fils - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: WISDOM, AND GRATITUDE ============
    {
      id: 'luqman-2',
      type: 'narrative',
      order: 2,
      content: "Allah gave Luqman wisdom, and the wisdom began with gratitude. Then the first thing he said to his son.",
      contentFr: "Allah donna à Louqman la sagesse, et la sagesse commença par la gratitude. Puis la première chose qu'il dit à son fils.",
    },
    {
      id: 'luqman-3',
      type: 'quran_source',
      order: 3,
      content: "\"O my son, do not associate anything with Allah. Indeed, association with Him is great injustice.\"",
      contentFr: "« Ô mon fils, ne donne pas d'associé à Allah, car l'association est vraiment une injustice énorme. »",
      source: {
        type: "quran",
        surahNumber: 31,
        surahNameEnglish: "Luqman",
        surahNameArabic: "لقمان",
        ayahStart: 12,
        ayahEnd: 13,
        arabicText: "وَلَقَدْ ءَاتَيْنَا لُقْمَـٰنَ ٱلْحِكْمَةَ أَنِ ٱشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ حَمِيدٌ ۝ وَإِذْ قَالَ لُقْمَـٰنُ لِٱبْنِهِۦ وَهُوَ يَعِظُهُۥ يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ",
        translation: "And We had certainly given Luqman wisdom [and said], \"Be grateful to Allah.\" And whoever is grateful is grateful for [the benefit of] himself. And whoever denies [His favor] - then indeed, Allah is Free of need and Praiseworthy. And [mention, O Muhammad], when Luqman said to his son while he was instructing him, \"O my son, do not associate [anything] with Allah. Indeed, association [with Him] is great injustice.\"",
        translationFr: "Nous avons certes donné à Louqman la sagesse (en lui enjoignant) : « Rends grâces à Allah, car celui qui Lui rend grâces le fait pour lui-même. Quant à l’ingrat qui méconnaît (les bienfaits d’Allah), (il doit savoir qu’) Allah Se passe (de Toute gratitude) et qu’Il est Digne de Toutes Louanges. (Évoque) Louqman lorsqu’il dit à son fils qu’il moralisait : « Mon fils, ne prête pas d’associés à Allah, car l’associâtrie est une énorme injustice. »",
      } as QuranReference,
    },
    {
      id: 'luqman-4',
      type: 'narrative',
      order: 4,
      content: "﴿وَلَقَدْ ءَاتَيْنَا لُقْمَـٰنَ ٱلْحِكْمَةَ أَنِ ٱشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ حَمِيدٌ﴾ And We had certainly given Luqman wisdom [and said], \"Be grateful to Allah.\" And whoever is grateful is grateful for [the benefit of] himself. And whoever denies [His favor] - then indeed, Allah is Free of need and Praiseworthy. ﴿وَإِذْ قَالَ لُقْمَـٰنُ لِٱبْنِهِۦ وَهُوَ يَعِظُهُۥ يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ﴾ And [mention, O Muhammad], when Luqman said to his son while he was instructing him, \"O my son, do not associate [anything] with Allah. Indeed, association [with Him] is great injustice.\"",
      contentFr: "﴿وَلَقَدْ ءَاتَيْنَا لُقْمَـٰنَ ٱلْحِكْمَةَ أَنِ ٱشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ حَمِيدٌ﴾ Nous avons certes donné à Louqman la sagesse (en lui enjoignant) : « Rends grâces à Allah, car celui qui Lui rend grâces le fait pour lui-même. Quant à l’ingrat qui méconnaît (les bienfaits d’Allah), (il doit savoir qu’) Allah Se passe (de Toute gratitude) et qu’Il est Digne de Toutes Louanges. ﴿وَإِذْ قَالَ لُقْمَـٰنُ لِٱبْنِهِۦ وَهُوَ يَعِظُهُۥ يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ﴾ (Évoque) Louqman lorsqu’il dit à son fils qu’il moralisait : « Mon fils, ne prête pas d’associés à Allah, car l’associâtrie est une énorme injustice. »",
    },
    {
      id: 'luqman-5',
      type: 'narrative',
      order: 5,
      content: "Between his words, Allah speaks of parents: the mother's weakness upon weakness, the two years, and what to do if parents push toward shirk.",
      contentFr: "Entre ses mots, Allah parle des parents : la faiblesse sur faiblesse de la mère, les deux années, et que faire si les parents poussent au chirk.",
    },
    {
      id: 'luqman-6',
      type: 'quran_source',
      order: 6,
      content: "\"Be grateful to Me and to your parents.\"",
      contentFr: "« Sois reconnaissant envers Moi ainsi qu'envers tes parents. »",
      source: {
        type: "quran",
        surahNumber: 31,
        surahNameEnglish: "Luqman",
        surahNameArabic: "لقمان",
        ayahStart: 14,
        ayahEnd: 15,
        arabicText: "وَوَصَّيْنَا ٱلْإِنسَـٰنَ بِوَٰلِدَيْهِ حَمَلَتْهُ أُمُّهُۥ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَـٰلُهُۥ فِى عَامَيْنِ أَنِ ٱشْكُرْ لِى وَلِوَٰلِدَيْكَ إِلَىَّ ٱلْمَصِيرُ ۝ وَإِن جَـٰهَدَاكَ عَلَىٰٓ أَن تُشْرِكَ بِى مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ فَلَا تُطِعْهُمَا ۖ وَصَاحِبْهُمَا فِى ٱلدُّنْيَا مَعْرُوفًا ۖ وَٱتَّبِعْ سَبِيلَ مَنْ أَنَابَ إِلَىَّ ۚ ثُمَّ إِلَىَّ مَرْجِعُكُمْ فَأُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ",
        translation: "And We have enjoined upon man [care] for his parents. His mother carried him, [increasing her] in weakness upon weakness, and his weaning is in two years. Be grateful to Me and to your parents; to Me is the [final] destination. But if they endeavor to make you associate with Me that of which you have no knowledge, do not obey them but accompany them in [this] world with appropriate kindness and follow the way of those who turn back to Me [in repentance]. Then to Me will be your return, and I will inform you about what you used to do.",
        translationFr: "Nous avons recommandé à l’homme (de bien traiter) ses deux parents : sa mère l’a porté en endurant épuisement après épuisement, et son sevrage n’a lieu qu’au bout de deux ans. Rends- Moi donc grâces, ainsi qu’à tes deux parents. C’est vers Moi qu’est le devenir. Mais s’ils essaient de te contraindre à M’associer ce dont tu n’as nulle science, ne leur obéis point. Sois-leur cependant un compagnon de toute bonté en ce bas monde, et suis le chemin de celui qui revient repentant vers Moi. Car c’est vers Moi que sera votre retour, et Je vous informerai alors de ce que vous faisiez.",
      } as QuranReference,
    },
    {
      id: 'luqman-7',
      type: 'narrative',
      order: 7,
      content: "﴿وَوَصَّيْنَا ٱلْإِنسَـٰنَ بِوَٰلِدَيْهِ حَمَلَتْهُ أُمُّهُۥ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَـٰلُهُۥ فِى عَامَيْنِ أَنِ ٱشْكُرْ لِى وَلِوَٰلِدَيْكَ إِلَىَّ ٱلْمَصِيرُ﴾ And We have enjoined upon man [care] for his parents. His mother carried him, [increasing her] in weakness upon weakness, and his weaning is in two years. Be grateful to Me and to your parents; to Me is the [final] destination. ﴿وَإِن جَـٰهَدَاكَ عَلَىٰٓ أَن تُشْرِكَ بِى مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ فَلَا تُطِعْهُمَا ۖ وَصَاحِبْهُمَا فِى ٱلدُّنْيَا مَعْرُوفًا ۖ وَٱتَّبِعْ سَبِيلَ مَنْ أَنَابَ إِلَىَّ ۚ ثُمَّ إِلَىَّ مَرْجِعُكُمْ فَأُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ﴾ But if they endeavor to make you associate with Me that of which you have no knowledge, do not obey them but accompany them in [this] world with appropriate kindness and follow the way of those who turn back to Me [in repentance]. Then to Me will be your return, and I will inform you about what you used to do.",
      contentFr: "﴿وَوَصَّيْنَا ٱلْإِنسَـٰنَ بِوَٰلِدَيْهِ حَمَلَتْهُ أُمُّهُۥ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَـٰلُهُۥ فِى عَامَيْنِ أَنِ ٱشْكُرْ لِى وَلِوَٰلِدَيْكَ إِلَىَّ ٱلْمَصِيرُ﴾ Nous avons recommandé à l’homme (de bien traiter) ses deux parents : sa mère l’a porté en endurant épuisement après épuisement, et son sevrage n’a lieu qu’au bout de deux ans. Rends- Moi donc grâces, ainsi qu’à tes deux parents. C’est vers Moi qu’est le devenir. ﴿وَإِن جَـٰهَدَاكَ عَلَىٰٓ أَن تُشْرِكَ بِى مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ فَلَا تُطِعْهُمَا ۖ وَصَاحِبْهُمَا فِى ٱلدُّنْيَا مَعْرُوفًا ۖ وَٱتَّبِعْ سَبِيلَ مَنْ أَنَابَ إِلَىَّ ۚ ثُمَّ إِلَىَّ مَرْجِعُكُمْ فَأُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ﴾ Mais s’ils essaient de te contraindre à M’associer ce dont tu n’as nulle science, ne leur obéis point. Sois-leur cependant un compagnon de toute bonté en ce bas monde, et suis le chemin de celui qui revient repentant vers Moi. Car c’est vers Moi que sera votre retour, et Je vous informerai alors de ce que vous faisiez.",
    },

    // ============ PART 2: WHAT HE TOLD HIS SON ============
    {
      id: 'luqman-8',
      type: 'narrative',
      order: 8,
      content: "Then the rest of what Luqman said, whole: the mustard seed, prayer and patience, the cheek and the walk, the pace and the voice.",
      contentFr: "Puis le reste de ce que dit Louqman, en entier : le grain de moutarde, la prière et la patience, le visage et la marche, le pas et la voix.",
    },
    {
      id: 'luqman-9',
      type: 'quran_source',
      order: 9,
      content: "\"O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient.\"",
      contentFr: "« Ô mon fils, accomplis la prière, commande le convenable, interdis le blâmable, et endure. »",
      source: {
        type: "quran",
        surahNumber: 31,
        surahNameEnglish: "Luqman",
        surahNameArabic: "لقمان",
        ayahStart: 16,
        ayahEnd: 19,
        arabicText: "يَـٰبُنَىَّ إِنَّهَآ إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِى صَخْرَةٍ أَوْ فِى ٱلسَّمَـٰوَٰتِ أَوْ فِى ٱلْأَرْضِ يَأْتِ بِهَا ٱللَّهُ ۚ إِنَّ ٱللَّهَ لَطِيفٌ خَبِيرٌ ۝ يَـٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ ۝ وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِى ٱلْأَرْضِ مَرَحًا ۖ إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ ۝ وَٱقْصِدْ فِى مَشْيِكَ وَٱغْضُضْ مِن صَوْتِكَ ۚ إِنَّ أَنكَرَ ٱلْأَصْوَٰتِ لَصَوْتُ ٱلْحَمِيرِ",
        translation: "[And Luqman said], \"O my son, indeed if it [i.e., a wrong] should be the weight of a mustard seed and should be within a rock or [anywhere] in the heavens or in the earth, Allah will bring it forth. Indeed, Allah is Subtle and Aware. O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you. Indeed, [all] that is of the matters [requiring] resolve. And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful. And be moderate in your pace and lower your voice; indeed, the most disagreeable of sounds is the voice of donkeys.\"",
        translationFr: "« Mon fils, (dit encore Louqman), (la moindre action), fût-elle du poids d’un grain de moutarde, enfouie dans quelque rocher, dans les cieux ou sur terre, Allah l’exposera (au Jour de la Résurrection). Allah est Subtil et parfaitement Informé. Mon fils, accomplis la Çalât ! Enjoins ce qui est convenable et interdis ce qui est condamnable ! Prends ton mal en patience ! Voilà bien la résolution (à prendre). Ne détourne pas ton visage (avec dédain) devant les autres et ne te pavane pas sur terre avec suffisance ! Allah n’aime pas tout vaniteux imbu de lui-même. Sois sans prétention dans ta démarche ! Baisse ta voix car la plus exécrable des voix est bien celle des ânes ! »",
      } as QuranReference,
    },
    {
      id: 'luqman-10',
      type: 'narrative',
      order: 10,
      content: "﴿يَـٰبُنَىَّ إِنَّهَآ إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِى صَخْرَةٍ أَوْ فِى ٱلسَّمَـٰوَٰتِ أَوْ فِى ٱلْأَرْضِ يَأْتِ بِهَا ٱللَّهُ ۚ إِنَّ ٱللَّهَ لَطِيفٌ خَبِيرٌ﴾ [And Luqman said], \"O my son, indeed if it [i.e., a wrong] should be the weight of a mustard seed and should be within a rock or [anywhere] in the heavens or in the earth, Allah will bring it forth. Indeed, Allah is Subtle and Aware. ﴿يَـٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ﴾ O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you. Indeed, [all] that is of the matters [requiring] resolve. ﴿وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِى ٱلْأَرْضِ مَرَحًا ۖ إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ﴾ And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful. ﴿وَٱقْصِدْ فِى مَشْيِكَ وَٱغْضُضْ مِن صَوْتِكَ ۚ إِنَّ أَنكَرَ ٱلْأَصْوَٰتِ لَصَوْتُ ٱلْحَمِيرِ﴾ And be moderate in your pace and lower your voice; indeed, the most disagreeable of sounds is the voice of donkeys.\"",
      contentFr: "﴿يَـٰبُنَىَّ إِنَّهَآ إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِى صَخْرَةٍ أَوْ فِى ٱلسَّمَـٰوَٰتِ أَوْ فِى ٱلْأَرْضِ يَأْتِ بِهَا ٱللَّهُ ۚ إِنَّ ٱللَّهَ لَطِيفٌ خَبِيرٌ﴾ « Mon fils, (dit encore Louqman), (la moindre action), fût-elle du poids d’un grain de moutarde, enfouie dans quelque rocher, dans les cieux ou sur terre, Allah l’exposera (au Jour de la Résurrection). Allah est Subtil et parfaitement Informé. ﴿يَـٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ﴾ Mon fils, accomplis la Çalât ! Enjoins ce qui est convenable et interdis ce qui est condamnable ! Prends ton mal en patience ! Voilà bien la résolution (à prendre). ﴿وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِى ٱلْأَرْضِ مَرَحًا ۖ إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ﴾ Ne détourne pas ton visage (avec dédain) devant les autres et ne te pavane pas sur terre avec suffisance ! Allah n’aime pas tout vaniteux imbu de lui-même. ﴿وَٱقْصِدْ فِى مَشْيِكَ وَٱغْضُضْ مِن صَوْتِكَ ۚ إِنَّ أَنكَرَ ٱلْأَصْوَٰتِ لَصَوْتُ ٱلْحَمِيرِ﴾ Sois sans prétention dans ta démarche ! Baisse ta voix car la plus exécrable des voix est bien celle des ânes ! »",
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'luqman-11',
      type: 'narrative',
      order: 11,
      content: "The Quran does not say who Luqman was, where or when he lived, or what became of his son. It gives his wisdom, and calls it wisdom. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne dit ni qui était Louqman, ni où ni quand il vécut, ni ce qu'il advint de son fils. Il donne sa sagesse, et l'appelle sagesse. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
