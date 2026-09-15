// Story of Prophet Idris (إدريس) - The Truthful One
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Idris is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const idrisStory: Prophet = {
  id: 'idris',
  nameEnglish: 'Idris',
  nameFrench: 'Idris',
  nameArabic: 'إدريس',
  order: 2,
  title: 'The Truthful One',
  titleFr: 'Le Véridique',
  titleArabic: 'الصديق',
  summary: "Idris is named twice in the Quran: a man of truth and a prophet, raised by Allah to a high station (19:56-57), and one of the patient whom Allah admitted into His mercy (21:85-86). The Prophet ﷺ met him in the fourth heaven on the night of the ascension. Nothing else about him is told.",
  summaryFr: "Idris est nommé deux fois dans le Coran : un homme véridique et un prophète, qu'Allah éleva à une place très haute (19:56-57), et l'un des patients qu'Allah reçut dans Sa miséricorde (21:85-86). Le Prophète ﷺ le rencontra au quatrième ciel la nuit de l'ascension. Rien d'autre n'est raconté de lui.",
  hasSubStories: false,
  lessons: [
    "Two verses are all the Quran gives Idris, and the first thing they say of him is that he was a man of truth. Before any deed, that is what he is remembered for (19:56).",
    "He was \"raised to a high station\", and the Quran does not say what the station was. Some of what Allah gives His servants is told to us only as an honour, not as a detail (19:57).",
    "He is named with Ismail and Dhul-Kifl as one of \"the patient\", and the reward named for that patience is Allah's mercy (21:85-86).",
    "When the Prophet ﷺ met him in the heavens, Idris greeted him as \"righteous brother\" and \"righteous prophet\". The prophets knew one another as brothers (Bukhari 3887).",
  ],
  lessonsFr: [
    "Deux versets sont tout ce que le Coran donne d'Idris, et la première chose qu'ils disent de lui, c'est qu'il était véridique. Avant toute œuvre, c'est pour cela qu'on se souvient de lui (19:56).",
    "Il fut « élevé à une place très haute », et le Coran ne dit pas quelle était cette place. Une part de ce qu'Allah donne à Ses serviteurs ne nous est dite que comme un honneur, non comme un détail (19:57).",
    "Il est nommé avec Ismaïl et Dhul-Kifl parmi « les patients », et la récompense nommée pour cette patience est la miséricorde d'Allah (21:85-86).",
    "Quand le Prophète ﷺ le rencontra dans les cieux, Idris le salua comme « frère vertueux » et « prophète vertueux ». Les prophètes se connaissaient comme des frères (Boukhari 3887).",
  ],
  estimatedReadTime: 8,
  quranMentions: 2,
  icon: '📚',
};

// Single continuous story (no sub-stories)
export const idrisStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'idris-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Idris, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nAnd it is a short story, because that is how the Quran tells it: two passages, and a meeting on the night of the ascension. Where he lived, when, and among whom, we were not told - and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Idris, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nEt c'est une courte histoire, parce que c'est ainsi que le Coran la raconte : deux passages, et une rencontre la nuit de l'ascension. Où il vécut, quand, et parmi qui, cela ne nous a pas été dit - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: A MAN OF TRUTH, AND A PROPHET ============
  {
    id: 'idris-2',
    type: 'narrative',
    order: 2,
    content: "Surah Maryam, after Ibrahim, Musa and Ismail, tells the Prophet ﷺ to mention Idris in the Book. It says three things about him: he was a man of truth, he was a prophet, and Allah raised him to a high station.",
    contentFr: "La sourate Maryam, après Ibrahim, Moussa et Ismaïl, dit au Prophète ﷺ d'évoquer Idris dans le Livre. Elle dit trois choses de lui : il était véridique, il était prophète, et Allah l'éleva à une place très haute.",
  },
  {
    id: 'idris-3',
    type: 'quran_source',
    order: 3,
    content: "Surah Maryam: Idris: a man of truth, a prophet, raised to a high station.",
    contentFr: "La sourate Maryam : Idris : un véridique, un prophète, élevé à une place très haute.",
    source: {
      type: "quran",
      surahNumber: 19,
      surahNameEnglish: "Maryam",
      surahNameArabic: "مريم",
      ayahStart: 56,
      ayahEnd: 57,
      arabicText: "وَٱذْكُرْ فِى ٱلْكِتَـٰبِ إِدْرِيسَ ۚ إِنَّهُۥ كَانَ صِدِّيقًا نَّبِيًّا ۝ وَرَفَعْنَـٰهُ مَكَانًا عَلِيًّا",
      translation: "And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.",
      translationFr: "Évoque aussi Idris dans le Livre. C’était un (homme) véridique et un Prophète. Nous l’avons élevé à une place très haute.",
    } as QuranReference,
  },
  {
    id: 'idris-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَٱذْكُرْ فِى ٱلْكِتَـٰبِ إِدْرِيسَ ۚ إِنَّهُۥ كَانَ صِدِّيقًا نَّبِيًّا﴾ And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. ﴿وَرَفَعْنَـٰهُ مَكَانًا عَلِيًّا﴾ And We raised him to a high station.",
    contentFr: "﴿وَٱذْكُرْ فِى ٱلْكِتَـٰبِ إِدْرِيسَ ۚ إِنَّهُۥ كَانَ صِدِّيقًا نَّبِيًّا﴾ Évoque aussi Idris dans le Livre. C’était un (homme) véridique et un Prophète. ﴿وَرَفَعْنَـٰهُ مَكَانًا عَلِيًّا﴾ Nous l’avons élevé à une place très haute.",
  },
  {
    id: 'idris-5',
    type: 'narrative',
    order: 5,
    content: "The verse that follows gathers him with the prophets it has just named, and tells what they all did when the verses of the Most Merciful were recited to them.",
    contentFr: "Le verset qui suit le réunit aux prophètes qu'elle vient de nommer, et dit ce qu'ils faisaient tous quand les versets du Tout Miséricordieux leur étaient récités.",
  },
  {
    id: 'idris-6',
    type: 'quran_source',
    order: 6,
    content: "Surah Maryam: Those upon whom Allah bestowed favour fell in prostration, weeping.",
    contentFr: "La sourate Maryam : Ceux qu'Allah a comblés de Ses faveurs tombaient prosternés, en pleurs.",
    source: {
      type: "quran",
      surahNumber: 19,
      surahNameEnglish: "Maryam",
      surahNameArabic: "مريم",
      ayahStart: 58,
      ayahEnd: 58,
      arabicText: "أُو۟لَـٰٓئِكَ ٱلَّذِينَ أَنْعَمَ ٱللَّهُ عَلَيْهِم مِّنَ ٱلنَّبِيِّـۧنَ مِن ذُرِّيَّةِ ءَادَمَ وَمِمَّنْ حَمَلْنَا مَعَ نُوحٍ وَمِن ذُرِّيَّةِ إِبْرَٰهِيمَ وَإِسْرَٰٓءِيلَ وَمِمَّنْ هَدَيْنَا وَٱجْتَبَيْنَآ ۚ إِذَا تُتْلَىٰ عَلَيْهِمْ ءَايَـٰتُ ٱلرَّحْمَـٰنِ خَرُّوا۟ سُجَّدًا وَبُكِيًّا ۩",
      translation: "Those were the ones upon whom Allah bestowed favor from among the prophets of the descendants of Adam and of those We carried [in the ship] with Nuh, and of the descendants of Ibrahim and Israel [i.e., Yaqub], and of those whom We guided and chose. When the verses of the Most Merciful were recited to them, they fell in prostration and weeping.",
      translationFr: "Ce sont eux qu’Allah a comblés de Ses faveurs, parmi les Prophètes de la descendance d’Adam, et parmi ceux que Nous avons transportés sur l’Arche avec Nouh, mais aussi parmi la descendance d’Ibrahim et d’Israël ; et enfin parmi ceux que Nous avons guidés et élus. (Ceux-là), quand les versets du Tout Clément leur étaient récités, ils tombaient à terre, prosternés et en pleurs.",
    } as QuranReference,
  },
  {
    id: 'idris-7',
    type: 'narrative',
    order: 7,
    content: "﴿أُو۟لَـٰٓئِكَ ٱلَّذِينَ أَنْعَمَ ٱللَّهُ عَلَيْهِم مِّنَ ٱلنَّبِيِّـۧنَ مِن ذُرِّيَّةِ ءَادَمَ وَمِمَّنْ حَمَلْنَا مَعَ نُوحٍ وَمِن ذُرِّيَّةِ إِبْرَٰهِيمَ وَإِسْرَٰٓءِيلَ وَمِمَّنْ هَدَيْنَا وَٱجْتَبَيْنَآ ۚ إِذَا تُتْلَىٰ عَلَيْهِمْ ءَايَـٰتُ ٱلرَّحْمَـٰنِ خَرُّوا۟ سُجَّدًا وَبُكِيًّا ۩﴾ Those were the ones upon whom Allah bestowed favor from among the prophets of the descendants of Adam and of those We carried [in the ship] with Nuh, and of the descendants of Ibrahim and Israel [i.e., Yaqub], and of those whom We guided and chose. When the verses of the Most Merciful were recited to them, they fell in prostration and weeping.",
    contentFr: "﴿أُو۟لَـٰٓئِكَ ٱلَّذِينَ أَنْعَمَ ٱللَّهُ عَلَيْهِم مِّنَ ٱلنَّبِيِّـۧنَ مِن ذُرِّيَّةِ ءَادَمَ وَمِمَّنْ حَمَلْنَا مَعَ نُوحٍ وَمِن ذُرِّيَّةِ إِبْرَٰهِيمَ وَإِسْرَٰٓءِيلَ وَمِمَّنْ هَدَيْنَا وَٱجْتَبَيْنَآ ۚ إِذَا تُتْلَىٰ عَلَيْهِمْ ءَايَـٰتُ ٱلرَّحْمَـٰنِ خَرُّوا۟ سُجَّدًا وَبُكِيًّا ۩﴾ Ce sont eux qu’Allah a comblés de Ses faveurs, parmi les Prophètes de la descendance d’Adam, et parmi ceux que Nous avons transportés sur l’Arche avec Nouh, mais aussi parmi la descendance d’Ibrahim et d’Israël ; et enfin parmi ceux que Nous avons guidés et élus. (Ceux-là), quand les versets du Tout Clément leur étaient récités, ils tombaient à terre, prosternés et en pleurs.",
  },

  // ============ PART 2: ONE OF THE PATIENT ============
  {
    id: 'idris-8',
    type: 'narrative',
    order: 8,
    content: "Surah Al-Anbiya names him again, between Ismail and Dhul-Kifl, and gives him one word: patient. And it says what Allah did with the three of them.",
    contentFr: "La sourate Al-Anbiya le nomme à nouveau, entre Ismaïl et Dhul-Kifl, et lui donne un seul mot : patient. Et elle dit ce qu'Allah fit des trois.",
  },
  {
    id: 'idris-9',
    type: 'quran_source',
    order: 9,
    content: "Surah Al-Anbiya: Ismail, Idris and Dhul-Kifl: all were of the patient, and admitted into Allah's mercy.",
    contentFr: "La sourate Al-Anbiya : Ismaïl, Idris et Dhul-Kifl : tous étaient des patients, et reçus dans la miséricorde d'Allah.",
    source: {
      type: "quran",
      surahNumber: 21,
      surahNameEnglish: "Al-Anbiya",
      surahNameArabic: "الأنبياء",
      ayahStart: 85,
      ayahEnd: 86,
      arabicText: "وَإِسْمَـٰعِيلَ وَإِدْرِيسَ وَذَا ٱلْكِفْلِ ۖ كُلٌّ مِّنَ ٱلصَّـٰبِرِينَ ۝ وَأَدْخَلْنَـٰهُمْ فِى رَحْمَتِنَآ ۖ إِنَّهُم مِّنَ ٱلصَّـٰلِحِينَ",
      translation: "And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.",
      translationFr: "Et Ismaïl, et Idris, et Dhul-Kifl, tous étaient des (modèles) de patience. Nous les reçûmes dans Notre miséricorde, car ils étaient du nombre des vertueux.",
    } as QuranReference,
  },
  {
    id: 'idris-10',
    type: 'narrative',
    order: 10,
    content: "﴿وَإِسْمَـٰعِيلَ وَإِدْرِيسَ وَذَا ٱلْكِفْلِ ۖ كُلٌّ مِّنَ ٱلصَّـٰبِرِينَ﴾ And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. ﴿وَأَدْخَلْنَـٰهُمْ فِى رَحْمَتِنَآ ۖ إِنَّهُم مِّنَ ٱلصَّـٰلِحِينَ﴾ And We admitted them into Our mercy. Indeed, they were of the righteous.",
    contentFr: "﴿وَإِسْمَـٰعِيلَ وَإِدْرِيسَ وَذَا ٱلْكِفْلِ ۖ كُلٌّ مِّنَ ٱلصَّـٰبِرِينَ﴾ Et Ismaïl, et Idris, et Dhul-Kifl, tous étaient des (modèles) de patience. ﴿وَأَدْخَلْنَـٰهُمْ فِى رَحْمَتِنَآ ۖ إِنَّهُم مِّنَ ٱلصَّـٰلِحِينَ﴾ Nous les reçûmes dans Notre miséricorde, car ils étaient du nombre des vertueux.",
  },

  // ============ PART 3: THE NIGHT OF THE ASCENSION ============
  {
    id: 'idris-11',
    type: 'narrative',
    order: 11,
    content: "On the night he was taken up through the heavens, the Prophet ﷺ met Idris. He told us in which heaven, and what Idris said to him (Sahih al-Bukhari 3887).",
    contentFr: "La nuit où il fut élevé à travers les cieux, le Prophète ﷺ rencontra Idris. Il nous a dit dans quel ciel, et ce qu'Idris lui dit (Sahih al-Boukhari 3887).",
  },
  {
    id: 'idris-12',
    type: 'hadith_source',
    order: 12,
    content: "The Prophet ﷺ met Idris in the fourth heaven.",
    contentFr: "Le Prophète ﷺ rencontra Idris au quatrième ciel.",
    source: {
      type: "hadith",
      collection: "bukhari",
      hadithNumber: "3887",
      narrator: "Malik ibn Sa'sa'a",
      arabicText: "حَدَّثَنَا هُدْبَةُ بْنُ خَالِدٍ، حَدَّثَنَا هَمَّامُ بْنُ يَحْيَى، حَدَّثَنَا قَتَادَةُ، عَنْ أَنَسِ بْنِ مَالِكٍ، عَنْ مَالِكِ بْنِ صَعْصَعَةَ ـ رضى الله عنهما ـ أَنَّ نَبِيَّ اللَّهِ صلى الله عليه وسلم حَدَّثَهُمْ عَنْ لَيْلَةَ أُسْرِيَ بِهِ بَيْنَمَا أَنَا فِي الْحَطِيمِ ـ وَرُبَّمَا قَالَ فِي الْحِجْرِ ـ مُضْطَجِعًا، إِذْ أَتَانِي آتٍ فَقَدَّ ـ قَالَ وَسَمِعْتُهُ يَقُولُ فَشَقَّ ـ مَا بَيْنَ هَذِهِ إِلَى هَذِهِ ـ فَقُلْتُ لِلْجَارُودِ وَهْوَ إِلَى جَنْبِي مَا يَعْنِي بِهِ قَالَ مِنْ ثُغْرَةِ نَحْرِهِ إِلَى شِعْرَتِهِ، وَسَمِعْتُهُ يَقُولُ مِنْ قَصِّهِ إِلَى شِعْرَتِهِ ـ فَاسْتَخْرَجَ قَلْبِي، ثُمَّ أُتِيتُ بِطَسْتٍ مِنْ ذَهَبٍ مَمْلُوءَةٍ إِيمَانًا، فَغُسِلَ قَلْبِي ثُمَّ حُشِيَ، ثُمَّ أُوتِيتُ بِدَابَّةٍ دُونَ الْبَغْلِ وَفَوْقَ الْحِمَارِ أَبْيَضَ . ـ فَقَالَ لَهُ الْجَارُودُ هُوَ الْبُرَاقُ يَا أَبَا حَمْزَةَ قَالَ أَنَسٌ نَعَمْ، يَضَعُ خَطْوَهُ عِنْدَ أَقْصَى طَرْفِهِ ـ فَحُمِلْتُ عَلَيْهِ، فَانْطَلَقَ بِي جِبْرِيلُ حَتَّى أَتَى السَّمَاءَ الدُّنْيَا فَاسْتَفْتَحَ، فَقِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَفَتَحَ، فَلَمَّا خَلَصْتُ، فَإِذَا فِيهَا آدَمُ، فَقَالَ هَذَا أَبُوكَ آدَمُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ السَّلاَمَ ثُمَّ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. ثُمَّ صَعِدَ حَتَّى أَتَى السَّمَاءَ الثَّانِيَةَ فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ فَنِعْمَ الْمَجِيءُ جَاءَ. فَفَتَحَ، فَلَمَّا خَلَصْتُ، إِذَا يَحْيَى وَعِيسَى، وَهُمَا ابْنَا الْخَالَةِ قَالَ هَذَا يَحْيَى وَعِيسَى فَسَلِّمْ عَلَيْهِمَا. فَسَلَّمْتُ فَرَدَّا، ثُمَّ قَالاَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ الثَّالِثَةِ، فَاسْتَفْتَحَ قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِذَا يُوسُفُ. قَالَ هَذَا يُوسُفُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ، ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ، ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الرَّابِعَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ أَوَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِلَى إِدْرِيسَ قَالَ هَذَا إِدْرِيسُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الْخَامِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ صلى الله عليه وسلم. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَلَمَّا خَلَصْتُ فَإِذَا هَارُونُ قَالَ هَذَا هَارُونُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ السَّادِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ مَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ، فَلَمَّا خَلَصْتُ، فَإِذَا مُوسَى قَالَ هَذَا مُوسَى فَسَلِّمْ عَلَيْهِ، فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. فَلَمَّا تَجَاوَزْتُ بَكَى، قِيلَ لَهُ مَا يُبْكِيكَ قَالَ أَبْكِي لأَنَّ غُلاَمًا بُعِثَ بَعْدِي، يَدْخُلُ الْجَنَّةَ مِنْ أُمَّتِهِ أَكْثَرُ مَنْ يَدْخُلُهَا مِنْ أُمَّتِي. ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ السَّابِعَةِ، فَاسْتَفْتَحَ جِبْرِيلُ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ بُعِثَ إِلَيْهِ. قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَلَمَّا خَلَصْتُ، فَإِذَا إِبْرَاهِيمُ قَالَ هَذَا أَبُوكَ فَسَلِّمْ عَلَيْهِ. قَالَ فَسَلَّمْتُ عَلَيْهِ، فَرَدَّ السَّلاَمَ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. ثُمَّ رُفِعَتْ لِي سِدْرَةُ الْمُنْتَهَى، فَإِذَا نَبِقُهَا مِثْلُ قِلاَلِ هَجَرَ، وَإِذَا وَرَقُهَا مِثْلُ آذَانِ الْفِيَلَةِ قَالَ هَذِهِ سِدْرَةُ الْمُنْتَهَى، وَإِذَا أَرْبَعَةُ أَنْهَارٍ نَهْرَانِ بَاطِنَانِ، وَنَهْرَانِ ظَاهِرَانِ. فَقُلْتُ مَا هَذَانِ يَا جِبْرِيلُ قَالَ أَمَّا الْبَاطِنَانِ، فَنَهَرَانِ فِي الْجَنَّةِ، وَأَمَّا الظَّاهِرَانِ فَالنِّيلُ وَالْفُرَاتُ. ثُمَّ رُفِعَ لِي الْبَيْتُ الْمَعْمُورُ، ثُمَّ أُتِيتُ بِإِنَاءٍ مِنْ خَمْرٍ، وَإِنَاءٍ مِنْ لَبَنٍ وَإِنَاءٍ مِنْ عَسَلٍ، فَأَخَذْتُ اللَّبَنَ، فَقَالَ هِيَ الْفِطْرَةُ أَنْتَ عَلَيْهَا وَأُمَّتُكَ. ثُمَّ فُرِضَتْ عَلَىَّ الصَّلَوَاتُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. فَرَجَعْتُ فَمَرَرْتُ عَلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قَالَ أُمِرْتُ بِخَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ، وَإِنِّي وَاللَّهِ قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ. فَرَجَعْتُ، فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِعَشْرِ صَلَوَاتٍ كُلَّ يَوْمٍ، فَرَجَعْتُ فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ، فَرَجَعْتُ إِلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قُلْتُ أُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسَ صَلَوَاتٍ كُلَّ يَوْمٍ، وَإِنِّي قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ. قَالَ سَأَلْتُ رَبِّي حَتَّى اسْتَحْيَيْتُ، وَلَكِنْ أَرْضَى وَأُسَلِّمُ ـ قَالَ ـ فَلَمَّا جَاوَزْتُ نَادَى مُنَادٍ أَمْضَيْتُ فَرِيضَتِي وَخَفَّفْتُ عَنْ عِبَادِي",
      translation: "Then he ascended with me until we came to the fourth heaven, and he asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him, and what an excellent coming this is! It was opened, and when I passed through, there was Idris. He said: This is Idris, so greet him. I greeted him, and he returned the greeting, then said: Welcome, O righteous brother and righteous prophet.",
      translationFr: "Puis il monta avec moi jusqu'à ce que nous arrivions au quatrième ciel, et il demanda qu'on lui ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui, et quelle excellente venue ! On ouvrit, et quand je passai, il y avait là Idris. Il dit : Voici Idris, salue-le. Je le saluai, et il me rendit le salut, puis dit : Bienvenue, ô frère vertueux et prophète vertueux.",
      grade: "sahih",
    } as HadithReference,
  },

  // ============ PART 4: WHAT WAS NOT TOLD ============
  {
    id: 'idris-13',
    type: 'narrative',
    order: 13,
    content: "That is all. The Quran does not say where Idris lived or when, who his people were, what he was sent with, or how his life ended; and the high station he was raised to is named as an honour, not described. Allah knows best.",
    contentFr: "C'est tout. Le Coran ne dit pas où Idris vécut ni quand, qui était son peuple, avec quoi il fut envoyé, ni comment sa vie prit fin ; et la place très haute où il fut élevé est nommée comme un honneur, non décrite. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const idrisSubStories: SubStory[] = [
  {
    id: 'idris-complete',
    prophetId: 'idris',
    title: 'The Story of Prophet Idris',
    titleFr: "L'Histoire du Prophète Idris",
    titleArabic: "قصة نبي الله إدريس",
    order: 1,
    estimatedReadTime: 8,
    content: idrisStoryContent,
  },
];
