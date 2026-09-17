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
      translation: "The Prophet of Allah ﷺ told them about the night he was taken on the night journey: While I was in al-Hatim - and perhaps he said: in al-Hijr - lying down, someone came to me and cut open - he said: and I heard him say: split open - from here to here. I said to al-Jarud, who was beside me: What does he mean by it? He said: From the pit of his throat to his pubic hair; and I heard him say: from his chest to his pubic hair. He took out my heart. Then a basin of gold full of faith was brought to me, and my heart was washed, then filled, then put back. Then I was brought a beast smaller than a mule and larger than a donkey, white. Al-Jarud said to him: Is it al-Buraq, O Abu Hamzah? Anas said: Yes; it places its step at the farthest reach of its sight. I was mounted on it, and Jibril set off with me until he came to the lowest heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there was Adam. He said: This is your father Adam; greet him. So I greeted him and he returned the greeting, then said: Welcome, righteous son and righteous prophet. Then he ascended until he came to the second heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there were Yahya and Isa, who are the two maternal cousins. He said: These are Yahya and Isa; greet them. So I greeted them and they returned it, then said: Welcome, righteous brother and righteous prophet. Then he ascended with me to the third heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there was Yusuf. He said: This is Yusuf; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet. Then he ascended with me until he came to the fourth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I came through to Idris, he said: This is Idris; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet. Then he ascended with me until he came to the fifth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad ﷺ. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. When I passed through, there was Harun. He said: This is Harun; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet. Then he ascended with me until he came to the sixth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: Who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. He said: Welcome to him; what an excellent coming is his. When I passed through, there was Musa. He said: This is Musa; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet. And when I passed on, he wept. It was said to him: What makes you weep? He said: I weep because a young man was sent after me, of whose nation more will enter Paradise than will enter it of my nation. Then he ascended with me to the seventh heaven, and Jibril asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. He said: Welcome to him; what an excellent coming is his. When I passed through, there was Ibrahim. He said: This is your father; greet him. He said: So I greeted him and he returned the greeting. He said: Welcome, righteous son and righteous prophet. Then the Lote Tree of the Utmost Boundary was raised up for me, and its fruits were like the jars of Hajar and its leaves like the ears of elephants. He said: This is the Lote Tree of the Utmost Boundary. And there were four rivers: two hidden and two visible. I said: What are these two, O Jibril? He said: As for the two hidden, they are two rivers in Paradise; and as for the two visible, they are the Nile and the Euphrates. Then the Much-Frequented House was raised up for me. Then I was brought a vessel of wine, a vessel of milk and a vessel of honey. I took the milk, and he said: It is the fitrah which you and your nation are upon. Then the prayers were made obligatory upon me: fifty prayers every day. I returned and passed by Musa, and he said: What were you commanded? He said: I was commanded fifty prayers every day. He said: Your nation cannot manage fifty prayers every day; and by Allah, I have tried people before you, and I strove with the Children of Israel with the utmost striving. Go back to your Lord and ask Him for a lightening for your nation. So I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and I was commanded ten prayers every day. I returned, and he said the same. I went back, and I was commanded five prayers every day. I returned to Musa and he said: What were you commanded? I said: I was commanded five prayers every day. He said: Your nation cannot manage five prayers every day; I have tried people before you, and I strove with the Children of Israel with the utmost striving. Go back to your Lord and ask Him for a lightening for your nation. He said: I have asked my Lord until I feel shy; but I am content and I submit. He said: When I passed on, a caller called: I have carried out My obligation, and I have lightened it for My servants.",
      translationFr: "Le Prophète d'Allah ﷺ leur raconta la nuit où il fut emmené en voyage nocturne : Tandis que j'étais dans al-Hatim - et peut-être dit-il : dans al-Hijr - étendu, quelqu'un vint à moi et fendit - il dit : et je l'ai entendu dire : ouvrit - d'ici à ici. Je dis à al-Jaroud, qui était à côté de moi : Que veut-il dire par là ? Il dit : Du creux de sa gorge à son pubis ; et je l'ai entendu dire : de sa poitrine à son pubis. Il extraya mon cœur. Puis on m'apporta un bassin d'or rempli de foi, et mon cœur fut lavé, puis rempli, puis remis. Puis on m'amena une bête plus petite qu'un mulet et plus grande qu'un âne, blanche. Al-Jaroud lui dit : Est-ce al-Bouraq, ô Abou Hamza ? Anas dit : Oui ; elle pose son pas à la limite de son regard. On m'y fit monter, et Jibril partit avec moi jusqu'à arriver au ciel le plus proche et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Adam. Il dit : Voici ton père Adam ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au fils vertueux et au prophète vertueux. Puis il monta jusqu'à arriver au deuxième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Yahya et Issa, qui sont les deux cousins maternels. Il dit : Voici Yahya et Issa ; salue-les. Je les saluai et ils rendirent le salut, puis dirent : Bienvenue au frère vertueux et au prophète vertueux. Puis il monta avec moi au troisième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Youssouf. Il dit : Voici Youssouf ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux. Puis il monta avec moi jusqu'à arriver au quatrième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je parvins à Idris, il dit : Voici Idris ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux. Puis il monta avec moi jusqu'à arriver au cinquième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad ﷺ. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Haroun. Il dit : Voici Haroun ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux. Puis il monta avec moi jusqu'à arriver au sixième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. Il dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Moussa. Il dit : Voici Moussa ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux. Et quand je passai outre, il pleura. Il lui fut dit : Qu'est-ce qui te fait pleurer ? Il dit : Je pleure parce qu'un jeune homme a été envoyé après moi, dont la communauté entrera au Paradis en plus grand nombre que n'y entrera la mienne. Puis il monta avec moi au septième ciel, et Jibril demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. Il dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Ibrahim. Il dit : Voici ton père ; salue-le. Il dit : Je le saluai et il rendit le salut. Il dit : Bienvenue au fils vertueux et au prophète vertueux. Puis le Lotus de la Limite fut élevé pour moi, et ses fruits étaient comme les jarres de Hajar et ses feuilles comme les oreilles des éléphants. Il dit : Voici le Lotus de la Limite. Et voici quatre fleuves : deux cachés et deux visibles. Je dis : Que sont ces deux-là, ô Jibril ? Il dit : Quant aux deux cachés, ce sont deux fleuves du Paradis ; et quant aux deux visibles, ce sont le Nil et l'Euphrate. Puis la Maison Fréquentée fut élevée pour moi. Puis on m'apporta un vase de vin, un vase de lait et un vase de miel. Je pris le lait, et il dit : C'est la fitrah sur laquelle vous êtes, toi et ta communauté. Puis les prières me furent prescrites : cinquante prières chaque jour. Je revins et passai près de Moussa, et il dit : Que t'a-t-on ordonné ? Il dit : On m'a ordonné cinquante prières chaque jour. Il dit : Ta communauté ne peut pas cinquante prières chaque jour ; et par Allah, j'ai éprouvé les gens avant toi, et j'ai lutté avec les enfants d'Israël de toutes mes forces. Retourne vers ton Seigneur et demande-Lui un allègement pour ta communauté. Je retournai donc, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et il me fut ordonné dix prières chaque jour. Je revins, et il dit la même chose. Je retournai, et il me fut ordonné cinq prières chaque jour. Je revins vers Moussa et il dit : Que t'a-t-on ordonné ? Je dis : On m'a ordonné cinq prières chaque jour. Il dit : Ta communauté ne peut pas cinq prières chaque jour ; j'ai éprouvé les gens avant toi, et j'ai lutté avec les enfants d'Israël de toutes mes forces. Retourne vers ton Seigneur et demande-Lui un allègement pour ta communauté. Il dit : J'ai demandé à mon Seigneur jusqu'à en avoir honte ; mais je suis satisfait et je me soumets. Il dit : Quand je passai outre, un héraut appela : J'ai fait passer Mon obligation, et J'ai allégé pour Mes serviteurs.",
      grade: "sahih",
    } as HadithReference,
  },
  {
    id: 'idris-13',
    type: 'narrative',
    order: 13,
    content: "⟨أَنَّ نَبِيَّ اللَّهِ صلى الله عليه وسلم حَدَّثَهُمْ عَنْ لَيْلَةَ أُسْرِيَ بِهِ بَيْنَمَا أَنَا فِي الْحَطِيمِ ـ وَرُبَّمَا قَالَ فِي الْحِجْرِ ـ مُضْطَجِعًا، إِذْ أَتَانِي آتٍ فَقَدَّ ـ قَالَ وَسَمِعْتُهُ يَقُولُ فَشَقَّ ـ مَا بَيْنَ هَذِهِ إِلَى هَذِهِ ـ فَقُلْتُ لِلْجَارُودِ وَهْوَ إِلَى جَنْبِي مَا يَعْنِي بِهِ قَالَ مِنْ ثُغْرَةِ نَحْرِهِ إِلَى شِعْرَتِهِ، وَسَمِعْتُهُ يَقُولُ مِنْ قَصِّهِ إِلَى شِعْرَتِهِ ـ فَاسْتَخْرَجَ قَلْبِي، ثُمَّ أُتِيتُ بِطَسْتٍ مِنْ ذَهَبٍ مَمْلُوءَةٍ إِيمَانًا، فَغُسِلَ قَلْبِي ثُمَّ حُشِيَ، ثُمَّ أُوتِيتُ بِدَابَّةٍ دُونَ الْبَغْلِ وَفَوْقَ الْحِمَارِ أَبْيَضَ . ـ فَقَالَ لَهُ الْجَارُودُ هُوَ الْبُرَاقُ يَا أَبَا حَمْزَةَ قَالَ أَنَسٌ نَعَمْ، يَضَعُ خَطْوَهُ عِنْدَ أَقْصَى طَرْفِهِ ـ⟩ The Prophet of Allah ﷺ told them about the night he was taken on the night journey: While I was in al-Hatim - and perhaps he said: in al-Hijr - lying down, someone came to me and cut open - he said: and I heard him say: split open - from here to here. I said to al-Jarud, who was beside me: What does he mean by it? He said: From the pit of his throat to his pubic hair; and I heard him say: from his chest to his pubic hair. He took out my heart. Then a basin of gold full of faith was brought to me, and my heart was washed, then filled, then put back. Then I was brought a beast smaller than a mule and larger than a donkey, white. Al-Jarud said to him: Is it al-Buraq, O Abu Hamzah? Anas said: Yes; it places its step at the farthest reach of its sight.",
    contentFr: "⟨أَنَّ نَبِيَّ اللَّهِ صلى الله عليه وسلم حَدَّثَهُمْ عَنْ لَيْلَةَ أُسْرِيَ بِهِ بَيْنَمَا أَنَا فِي الْحَطِيمِ ـ وَرُبَّمَا قَالَ فِي الْحِجْرِ ـ مُضْطَجِعًا، إِذْ أَتَانِي آتٍ فَقَدَّ ـ قَالَ وَسَمِعْتُهُ يَقُولُ فَشَقَّ ـ مَا بَيْنَ هَذِهِ إِلَى هَذِهِ ـ فَقُلْتُ لِلْجَارُودِ وَهْوَ إِلَى جَنْبِي مَا يَعْنِي بِهِ قَالَ مِنْ ثُغْرَةِ نَحْرِهِ إِلَى شِعْرَتِهِ، وَسَمِعْتُهُ يَقُولُ مِنْ قَصِّهِ إِلَى شِعْرَتِهِ ـ فَاسْتَخْرَجَ قَلْبِي، ثُمَّ أُتِيتُ بِطَسْتٍ مِنْ ذَهَبٍ مَمْلُوءَةٍ إِيمَانًا، فَغُسِلَ قَلْبِي ثُمَّ حُشِيَ، ثُمَّ أُوتِيتُ بِدَابَّةٍ دُونَ الْبَغْلِ وَفَوْقَ الْحِمَارِ أَبْيَضَ . ـ فَقَالَ لَهُ الْجَارُودُ هُوَ الْبُرَاقُ يَا أَبَا حَمْزَةَ قَالَ أَنَسٌ نَعَمْ، يَضَعُ خَطْوَهُ عِنْدَ أَقْصَى طَرْفِهِ ـ⟩ Le Prophète d'Allah ﷺ leur raconta la nuit où il fut emmené en voyage nocturne : Tandis que j'étais dans al-Hatim - et peut-être dit-il : dans al-Hijr - étendu, quelqu'un vint à moi et fendit - il dit : et je l'ai entendu dire : ouvrit - d'ici à ici. Je dis à al-Jaroud, qui était à côté de moi : Que veut-il dire par là ? Il dit : Du creux de sa gorge à son pubis ; et je l'ai entendu dire : de sa poitrine à son pubis. Il extraya mon cœur. Puis on m'apporta un bassin d'or rempli de foi, et mon cœur fut lavé, puis rempli, puis remis. Puis on m'amena une bête plus petite qu'un mulet et plus grande qu'un âne, blanche. Al-Jaroud lui dit : Est-ce al-Bouraq, ô Abou Hamza ? Anas dit : Oui ; elle pose son pas à la limite de son regard.",
  },
  {
    id: 'idris-14',
    type: 'narrative',
    order: 14,
    content: "⟨فَحُمِلْتُ عَلَيْهِ، فَانْطَلَقَ بِي جِبْرِيلُ حَتَّى أَتَى السَّمَاءَ الدُّنْيَا فَاسْتَفْتَحَ، فَقِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَفَتَحَ، فَلَمَّا خَلَصْتُ، فَإِذَا فِيهَا آدَمُ، فَقَالَ هَذَا أَبُوكَ آدَمُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ السَّلاَمَ ثُمَّ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ I was mounted on it, and Jibril set off with me until he came to the lowest heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there was Adam. He said: This is your father Adam; greet him. So I greeted him and he returned the greeting, then said: Welcome, righteous son and righteous prophet.",
    contentFr: "⟨فَحُمِلْتُ عَلَيْهِ، فَانْطَلَقَ بِي جِبْرِيلُ حَتَّى أَتَى السَّمَاءَ الدُّنْيَا فَاسْتَفْتَحَ، فَقِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَفَتَحَ، فَلَمَّا خَلَصْتُ، فَإِذَا فِيهَا آدَمُ، فَقَالَ هَذَا أَبُوكَ آدَمُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ السَّلاَمَ ثُمَّ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ On m'y fit monter, et Jibril partit avec moi jusqu'à arriver au ciel le plus proche et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Adam. Il dit : Voici ton père Adam ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au fils vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-15',
    type: 'narrative',
    order: 15,
    content: "⟨ثُمَّ صَعِدَ حَتَّى أَتَى السَّمَاءَ الثَّانِيَةَ فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ فَنِعْمَ الْمَجِيءُ جَاءَ. فَفَتَحَ، فَلَمَّا خَلَصْتُ، إِذَا يَحْيَى وَعِيسَى، وَهُمَا ابْنَا الْخَالَةِ قَالَ هَذَا يَحْيَى وَعِيسَى فَسَلِّمْ عَلَيْهِمَا. فَسَلَّمْتُ فَرَدَّا، ثُمَّ قَالاَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Then he ascended until he came to the second heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there were Yahya and Isa, who are the two maternal cousins. He said: These are Yahya and Isa; greet them. So I greeted them and they returned it, then said: Welcome, righteous brother and righteous prophet.",
    contentFr: "⟨ثُمَّ صَعِدَ حَتَّى أَتَى السَّمَاءَ الثَّانِيَةَ فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ فَنِعْمَ الْمَجِيءُ جَاءَ. فَفَتَحَ، فَلَمَّا خَلَصْتُ، إِذَا يَحْيَى وَعِيسَى، وَهُمَا ابْنَا الْخَالَةِ قَالَ هَذَا يَحْيَى وَعِيسَى فَسَلِّمْ عَلَيْهِمَا. فَسَلَّمْتُ فَرَدَّا، ثُمَّ قَالاَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Puis il monta jusqu'à arriver au deuxième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Yahya et Issa, qui sont les deux cousins maternels. Il dit : Voici Yahya et Issa ; salue-les. Je les saluai et ils rendirent le salut, puis dirent : Bienvenue au frère vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-16',
    type: 'narrative',
    order: 16,
    content: "⟨ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ الثَّالِثَةِ، فَاسْتَفْتَحَ قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِذَا يُوسُفُ. قَالَ هَذَا يُوسُفُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ، ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ،⟩ Then he ascended with me to the third heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I passed through, there was Yusuf. He said: This is Yusuf; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet.",
    contentFr: "⟨ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ الثَّالِثَةِ، فَاسْتَفْتَحَ قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِذَا يُوسُفُ. قَالَ هَذَا يُوسُفُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ، ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ،⟩ Puis il monta avec moi au troisième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je passai, voici Youssouf. Il dit : Voici Youssouf ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-17',
    type: 'narrative',
    order: 17,
    content: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الرَّابِعَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ أَوَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِلَى إِدْرِيسَ قَالَ هَذَا إِدْرِيسُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Then he ascended with me until he came to the fourth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. And it was opened. When I came through to Idris, he said: This is Idris; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet.",
    contentFr: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الرَّابِعَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ أَوَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَفُتِحَ، فَلَمَّا خَلَصْتُ إِلَى إِدْرِيسَ قَالَ هَذَا إِدْرِيسُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Puis il monta avec moi jusqu'à arriver au quatrième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Et l'on ouvrit. Quand je parvins à Idris, il dit : Voici Idris ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-18',
    type: 'narrative',
    order: 18,
    content: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الْخَامِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ صلى الله عليه وسلم. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَلَمَّا خَلَصْتُ فَإِذَا هَارُونُ قَالَ هَذَا هَارُونُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Then he ascended with me until he came to the fifth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad ﷺ. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him; what an excellent coming is his. When I passed through, there was Harun. He said: This is Harun; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet.",
    contentFr: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ الْخَامِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ صلى الله عليه وسلم. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قِيلَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ. فَلَمَّا خَلَصْتُ فَإِذَا هَارُونُ قَالَ هَذَا هَارُونُ فَسَلِّمْ عَلَيْهِ. فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Puis il monta avec moi jusqu'à arriver au cinquième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad ﷺ. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Haroun. Il dit : Voici Haroun ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-19',
    type: 'narrative',
    order: 19,
    content: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ السَّادِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ مَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ، فَلَمَّا خَلَصْتُ، فَإِذَا مُوسَى قَالَ هَذَا مُوسَى فَسَلِّمْ عَلَيْهِ، فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. فَلَمَّا تَجَاوَزْتُ بَكَى، قِيلَ لَهُ مَا يُبْكِيكَ قَالَ أَبْكِي لأَنَّ غُلاَمًا بُعِثَ بَعْدِي، يَدْخُلُ الْجَنَّةَ مِنْ أُمَّتِهِ أَكْثَرُ مَنْ يَدْخُلُهَا مِنْ أُمَّتِي.⟩ Then he ascended with me until he came to the sixth heaven and asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: Who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. He said: Welcome to him; what an excellent coming is his. When I passed through, there was Musa. He said: This is Musa; greet him. So I greeted him and he returned it, then said: Welcome, righteous brother and righteous prophet. And when I passed on, he wept. It was said to him: What makes you weep? He said: I weep because a young man was sent after me, of whose nation more will enter Paradise than will enter it of my nation.",
    contentFr: "⟨ثُمَّ صَعِدَ بِي حَتَّى أَتَى السَّمَاءَ السَّادِسَةَ، فَاسْتَفْتَحَ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ مَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ أُرْسِلَ إِلَيْهِ قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ، فَلَمَّا خَلَصْتُ، فَإِذَا مُوسَى قَالَ هَذَا مُوسَى فَسَلِّمْ عَلَيْهِ، فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ. فَلَمَّا تَجَاوَزْتُ بَكَى، قِيلَ لَهُ مَا يُبْكِيكَ قَالَ أَبْكِي لأَنَّ غُلاَمًا بُعِثَ بَعْدِي، يَدْخُلُ الْجَنَّةَ مِنْ أُمَّتِهِ أَكْثَرُ مَنْ يَدْخُلُهَا مِنْ أُمَّتِي.⟩ Puis il monta avec moi jusqu'à arriver au sixième ciel et demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. Il dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Moussa. Il dit : Voici Moussa ; salue-le. Je le saluai et il rendit le salut, puis dit : Bienvenue au frère vertueux et au prophète vertueux. Et quand je passai outre, il pleura. Il lui fut dit : Qu'est-ce qui te fait pleurer ? Il dit : Je pleure parce qu'un jeune homme a été envoyé après moi, dont la communauté entrera au Paradis en plus grand nombre que n'y entrera la mienne.",
  },
  {
    id: 'idris-20',
    type: 'narrative',
    order: 20,
    content: "⟨ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ السَّابِعَةِ، فَاسْتَفْتَحَ جِبْرِيلُ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ بُعِثَ إِلَيْهِ. قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَلَمَّا خَلَصْتُ، فَإِذَا إِبْرَاهِيمُ قَالَ هَذَا أَبُوكَ فَسَلِّمْ عَلَيْهِ. قَالَ فَسَلَّمْتُ عَلَيْهِ، فَرَدَّ السَّلاَمَ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Then he ascended with me to the seventh heaven, and Jibril asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. He said: Welcome to him; what an excellent coming is his. When I passed through, there was Ibrahim. He said: This is your father; greet him. He said: So I greeted him and he returned the greeting. He said: Welcome, righteous son and righteous prophet.",
    contentFr: "⟨ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ السَّابِعَةِ، فَاسْتَفْتَحَ جِبْرِيلُ، قِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ. قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ. قِيلَ وَقَدْ بُعِثَ إِلَيْهِ. قَالَ نَعَمْ. قَالَ مَرْحَبًا بِهِ، فَنِعْمَ الْمَجِيءُ جَاءَ فَلَمَّا خَلَصْتُ، فَإِذَا إِبْرَاهِيمُ قَالَ هَذَا أَبُوكَ فَسَلِّمْ عَلَيْهِ. قَالَ فَسَلَّمْتُ عَلَيْهِ، فَرَدَّ السَّلاَمَ قَالَ مَرْحَبًا بِالاِبْنِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ.⟩ Puis il monta avec moi au septième ciel, et Jibril demanda qu'on ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. Il dit : Bienvenue à lui ; quelle excellente venue que la sienne. Quand je passai, voici Ibrahim. Il dit : Voici ton père ; salue-le. Il dit : Je le saluai et il rendit le salut. Il dit : Bienvenue au fils vertueux et au prophète vertueux.",
  },
  {
    id: 'idris-21',
    type: 'narrative',
    order: 21,
    content: "⟨ثُمَّ رُفِعَتْ لِي سِدْرَةُ الْمُنْتَهَى، فَإِذَا نَبِقُهَا مِثْلُ قِلاَلِ هَجَرَ، وَإِذَا وَرَقُهَا مِثْلُ آذَانِ الْفِيَلَةِ قَالَ هَذِهِ سِدْرَةُ الْمُنْتَهَى، وَإِذَا أَرْبَعَةُ أَنْهَارٍ نَهْرَانِ بَاطِنَانِ، وَنَهْرَانِ ظَاهِرَانِ. فَقُلْتُ مَا هَذَانِ يَا جِبْرِيلُ قَالَ أَمَّا الْبَاطِنَانِ، فَنَهَرَانِ فِي الْجَنَّةِ، وَأَمَّا الظَّاهِرَانِ فَالنِّيلُ وَالْفُرَاتُ.⟩ Then the Lote Tree of the Utmost Boundary was raised up for me, and its fruits were like the jars of Hajar and its leaves like the ears of elephants. He said: This is the Lote Tree of the Utmost Boundary. And there were four rivers: two hidden and two visible. I said: What are these two, O Jibril? He said: As for the two hidden, they are two rivers in Paradise; and as for the two visible, they are the Nile and the Euphrates.",
    contentFr: "⟨ثُمَّ رُفِعَتْ لِي سِدْرَةُ الْمُنْتَهَى، فَإِذَا نَبِقُهَا مِثْلُ قِلاَلِ هَجَرَ، وَإِذَا وَرَقُهَا مِثْلُ آذَانِ الْفِيَلَةِ قَالَ هَذِهِ سِدْرَةُ الْمُنْتَهَى، وَإِذَا أَرْبَعَةُ أَنْهَارٍ نَهْرَانِ بَاطِنَانِ، وَنَهْرَانِ ظَاهِرَانِ. فَقُلْتُ مَا هَذَانِ يَا جِبْرِيلُ قَالَ أَمَّا الْبَاطِنَانِ، فَنَهَرَانِ فِي الْجَنَّةِ، وَأَمَّا الظَّاهِرَانِ فَالنِّيلُ وَالْفُرَاتُ.⟩ Puis le Lotus de la Limite fut élevé pour moi, et ses fruits étaient comme les jarres de Hajar et ses feuilles comme les oreilles des éléphants. Il dit : Voici le Lotus de la Limite. Et voici quatre fleuves : deux cachés et deux visibles. Je dis : Que sont ces deux-là, ô Jibril ? Il dit : Quant aux deux cachés, ce sont deux fleuves du Paradis ; et quant aux deux visibles, ce sont le Nil et l'Euphrate.",
  },
  {
    id: 'idris-22',
    type: 'narrative',
    order: 22,
    content: "⟨ثُمَّ رُفِعَ لِي الْبَيْتُ الْمَعْمُورُ، ثُمَّ أُتِيتُ بِإِنَاءٍ مِنْ خَمْرٍ، وَإِنَاءٍ مِنْ لَبَنٍ وَإِنَاءٍ مِنْ عَسَلٍ، فَأَخَذْتُ اللَّبَنَ، فَقَالَ هِيَ الْفِطْرَةُ أَنْتَ عَلَيْهَا وَأُمَّتُكَ.⟩ Then the Much-Frequented House was raised up for me. Then I was brought a vessel of wine, a vessel of milk and a vessel of honey. I took the milk, and he said: It is the fitrah which you and your nation are upon.",
    contentFr: "⟨ثُمَّ رُفِعَ لِي الْبَيْتُ الْمَعْمُورُ، ثُمَّ أُتِيتُ بِإِنَاءٍ مِنْ خَمْرٍ، وَإِنَاءٍ مِنْ لَبَنٍ وَإِنَاءٍ مِنْ عَسَلٍ، فَأَخَذْتُ اللَّبَنَ، فَقَالَ هِيَ الْفِطْرَةُ أَنْتَ عَلَيْهَا وَأُمَّتُكَ.⟩ Puis la Maison Fréquentée fut élevée pour moi. Puis on m'apporta un vase de vin, un vase de lait et un vase de miel. Je pris le lait, et il dit : C'est la fitrah sur laquelle vous êtes, toi et ta communauté.",
  },
  {
    id: 'idris-23',
    type: 'narrative',
    order: 23,
    content: "⟨ثُمَّ فُرِضَتْ عَلَىَّ الصَّلَوَاتُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. فَرَجَعْتُ فَمَرَرْتُ عَلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قَالَ أُمِرْتُ بِخَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ، وَإِنِّي وَاللَّهِ قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ.⟩ Then the prayers were made obligatory upon me: fifty prayers every day. I returned and passed by Musa, and he said: What were you commanded? He said: I was commanded fifty prayers every day. He said: Your nation cannot manage fifty prayers every day; and by Allah, I have tried people before you, and I strove with the Children of Israel with the utmost striving. Go back to your Lord and ask Him for a lightening for your nation.",
    contentFr: "⟨ثُمَّ فُرِضَتْ عَلَىَّ الصَّلَوَاتُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. فَرَجَعْتُ فَمَرَرْتُ عَلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قَالَ أُمِرْتُ بِخَمْسِينَ صَلاَةً كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسِينَ صَلاَةً كُلَّ يَوْمٍ، وَإِنِّي وَاللَّهِ قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ.⟩ Puis les prières me furent prescrites : cinquante prières chaque jour. Je revins et passai près de Moussa, et il dit : Que t'a-t-on ordonné ? Il dit : On m'a ordonné cinquante prières chaque jour. Il dit : Ta communauté ne peut pas cinquante prières chaque jour ; et par Allah, j'ai éprouvé les gens avant toi, et j'ai lutté avec les enfants d'Israël de toutes mes forces. Retourne vers ton Seigneur et demande-Lui un allègement pour ta communauté.",
  },
  {
    id: 'idris-24',
    type: 'narrative',
    order: 24,
    content: "⟨فَرَجَعْتُ، فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِعَشْرِ صَلَوَاتٍ كُلَّ يَوْمٍ، فَرَجَعْتُ فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ،⟩ So I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and He took ten from me. I returned to Musa and he said the same. I went back, and I was commanded ten prayers every day. I returned, and he said the same. I went back, and I was commanded five prayers every day.",
    contentFr: "⟨فَرَجَعْتُ، فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَوَضَعَ عَنِّي عَشْرًا، فَرَجَعْتُ إِلَى مُوسَى فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِعَشْرِ صَلَوَاتٍ كُلَّ يَوْمٍ، فَرَجَعْتُ فَقَالَ مِثْلَهُ، فَرَجَعْتُ فَأُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ،⟩ Je retournai donc, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et Il m'en ôta dix. Je revins vers Moussa et il dit la même chose. Je retournai, et il me fut ordonné dix prières chaque jour. Je revins, et il dit la même chose. Je retournai, et il me fut ordonné cinq prières chaque jour.",
  },
  {
    id: 'idris-25',
    type: 'narrative',
    order: 25,
    content: "⟨فَرَجَعْتُ إِلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قُلْتُ أُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسَ صَلَوَاتٍ كُلَّ يَوْمٍ، وَإِنِّي قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ. قَالَ سَأَلْتُ رَبِّي حَتَّى اسْتَحْيَيْتُ، وَلَكِنْ أَرْضَى وَأُسَلِّمُ ـ قَالَ ـ فَلَمَّا جَاوَزْتُ نَادَى مُنَادٍ أَمْضَيْتُ فَرِيضَتِي وَخَفَّفْتُ عَنْ عِبَادِي⟩ I returned to Musa and he said: What were you commanded? I said: I was commanded five prayers every day. He said: Your nation cannot manage five prayers every day; I have tried people before you, and I strove with the Children of Israel with the utmost striving. Go back to your Lord and ask Him for a lightening for your nation. He said: I have asked my Lord until I feel shy; but I am content and I submit. He said: When I passed on, a caller called: I have carried out My obligation, and I have lightened it for My servants.",
    contentFr: "⟨فَرَجَعْتُ إِلَى مُوسَى، فَقَالَ بِمَا أُمِرْتَ قُلْتُ أُمِرْتُ بِخَمْسِ صَلَوَاتٍ كُلَّ يَوْمٍ. قَالَ إِنَّ أُمَّتَكَ لاَ تَسْتَطِيعُ خَمْسَ صَلَوَاتٍ كُلَّ يَوْمٍ، وَإِنِّي قَدْ جَرَّبْتُ النَّاسَ قَبْلَكَ، وَعَالَجْتُ بَنِي إِسْرَائِيلَ أَشَدَّ الْمُعَالَجَةِ، فَارْجِعْ إِلَى رَبِّكَ فَاسْأَلْهُ التَّخْفِيفَ لأُمَّتِكَ. قَالَ سَأَلْتُ رَبِّي حَتَّى اسْتَحْيَيْتُ، وَلَكِنْ أَرْضَى وَأُسَلِّمُ ـ قَالَ ـ فَلَمَّا جَاوَزْتُ نَادَى مُنَادٍ أَمْضَيْتُ فَرِيضَتِي وَخَفَّفْتُ عَنْ عِبَادِي⟩ Je revins vers Moussa et il dit : Que t'a-t-on ordonné ? Je dis : On m'a ordonné cinq prières chaque jour. Il dit : Ta communauté ne peut pas cinq prières chaque jour ; j'ai éprouvé les gens avant toi, et j'ai lutté avec les enfants d'Israël de toutes mes forces. Retourne vers ton Seigneur et demande-Lui un allègement pour ta communauté. Il dit : J'ai demandé à mon Seigneur jusqu'à en avoir honte ; mais je suis satisfait et je me soumets. Il dit : Quand je passai outre, un héraut appela : J'ai fait passer Mon obligation, et J'ai allégé pour Mes serviteurs.",
  },

  // ============ PART 4: WHAT WAS NOT TOLD ============
  {
    id: 'idris-26',
    type: 'narrative',
    order: 26,
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
