// Story of Prophet Ilyas (إلياس) - The Zealous Preacher
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Ilyas is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const ilyasStory: Prophet = {
  id: 'ilyas',
  nameEnglish: 'Ilyas',
  nameFrench: 'Ilyas',
  nameArabic: 'إلياس',
  order: 19,
  title: 'The Zealous Preacher',
  titleFr: 'Le Predicateur Zele',
  titleArabic: 'الداعي الغيور',
  summary: "Ilyas was among the messengers. He said to his people: will you not fear Allah? Do you call upon Baal and leave the best of creators - Allah, your Lord and the Lord of your first forefathers? They denied him. Allah left for him among later generations: peace upon Ilyas. Nothing else of his life is told.",
  summaryFr: "Ilyas fut parmi les messagers. Il dit à son peuple : ne craindrez-vous pas Allah ? Invoquez-vous Baal et délaissez-vous le meilleur des créateurs - Allah, votre Seigneur et le Seigneur de vos premiers ancêtres ? Ils le traitèrent de menteur. Allah laissa pour lui parmi les générations suivantes : paix sur Ilyas. Rien d'autre de sa vie n'est raconté.",
  hasSubStories: false,
  lessons: [
    "His whole message, as the Quran records it, is two questions: will you not fear Allah, and do you call upon Baal and leave the best of creators? Sometimes the truth needs only to be asked (37:124-126).",
    "He named their idol, and he named Allah as the Lord of their first forefathers. The oldest thing about their people was not Baal (37:125-126).",
    "They denied him, and the Quran says they will be brought - except the chosen servants of Allah. Even in a denying people, some were chosen (37:127-128).",
    "\"Peace upon Ilyas.\" He is one of the few for whom Allah records this greeting, and it is the only reward the Quran names for him (37:130).",
  ],
  lessonsFr: [
    "Tout son message, tel que le Coran le rapporte, tient en deux questions : ne craindrez-vous pas Allah, et invoquez-vous Baal en délaissant le meilleur des créateurs ? Parfois la vérité n'a besoin que d'être demandée (37:124-126).",
    "Il nomma leur idole, et il nomma Allah comme le Seigneur de leurs premiers ancêtres. La chose la plus ancienne de leur peuple n'était pas Baal (37:125-126).",
    "Ils le traitèrent de menteur, et le Coran dit qu'ils seront amenés - sauf les serviteurs élus d'Allah. Même dans un peuple qui nie, certains furent élus (37:127-128).",
    "« Paix sur Ilyas. » Il est l'un des rares pour qui Allah consigne cette salutation, et c'est la seule récompense que le Coran nomme pour lui (37:130).",
  ],
  estimatedReadTime: 6,
  quranMentions: 2,
  icon: '🔥',
};

// Single continuous story (no sub-stories)
export const ilyasStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'ilyas-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Ilyas, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nIt is a short story, because that is how the Quran tells it: one passage in As-Saffat, and his name once more among the righteous. No authentic hadith adds to it. Who his people were, where they lived, and what became of him - we were not told, and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Ilyas, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nC'est une courte histoire, parce que c'est ainsi que le Coran la raconte : un passage dans As-Saffat, et son nom une fois encore parmi les vertueux. Aucun hadith authentique n'y ajoute. Qui était son peuple, où il vécut, et ce qu'il advint de lui - cela ne nous a pas été dit, et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: DO YOU CALL UPON BAAL? ============
  {
    id: 'ilyas-2',
    type: 'narrative',
    order: 2,
    content: "As-Saffat counts him among the messengers, gives what he said to his people, and what they did - and the greeting Allah left for him.",
    contentFr: "As-Saffat le compte parmi les messagers, donne ce qu'il dit à son peuple, et ce qu'ils firent - et la salutation qu'Allah laissa pour lui.",
  },
  {
    id: 'ilyas-3',
    type: 'quran_source',
    order: 3,
    content: "\"Do you call upon Baal and leave the best of creators?\" \"Peace upon Ilyas.\"",
    contentFr: "« Invoquez-vous Baal et délaissez-vous le meilleur des créateurs ? » « Paix sur Ilyas. »",
    source: {
      type: "quran",
      surahNumber: 37,
      surahNameEnglish: "As-Saffat",
      surahNameArabic: "الصافات",
      ayahStart: 123,
      ayahEnd: 132,
      arabicText: "وَإِنَّ إِلْيَاسَ لَمِنَ ٱلْمُرْسَلِينَ ۝ إِذْ قَالَ لِقَوْمِهِۦٓ أَلَا تَتَّقُونَ ۝ أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ ٱلْخَـٰلِقِينَ ۝ ٱللَّهَ رَبَّكُمْ وَرَبَّ ءَابَآئِكُمُ ٱلْأَوَّلِينَ ۝ فَكَذَّبُوهُ فَإِنَّهُمْ لَمُحْضَرُونَ ۝ إِلَّا عِبَادَ ٱللَّهِ ٱلْمُخْلَصِينَ ۝ وَتَرَكْنَا عَلَيْهِ فِى ٱلْـَٔاخِرِينَ ۝ سَلَـٰمٌ عَلَىٰٓ إِلْ يَاسِينَ ۝ إِنَّا كَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ ۝ إِنَّهُۥ مِنْ عِبَادِنَا ٱلْمُؤْمِنِينَ",
      translation: "And indeed, Ilyas was from among the messengers, When he said to his people, \"Will you not fear Allah? Do you call upon Baal and leave the best of creators - Allah, your Lord and the Lord of your first forefathers?\" And they denied him, so indeed, they will be brought [for punishment], Except the chosen servants of Allah. And We left for him [favorable mention] among later generations: \"Peace upon Ilyas.\" Indeed, We thus reward the doers of good. Indeed, he was of Our believing servants.",
      translationFr: "Ilyas fut aussi du nombre des Envoyés. « Ne craignez-vous donc pas (Allah)? dit-il à son peuple. Invoquerez-vous donc Baal en délaissant le Meilleur des créateurs, Allah, votre Seigneur et le Seigneur de vos tout premiers ancêtres? » Or, ils le traitèrent de menteur, et ils comparaîtront assurément et ils seront livrés au supplice, excepté les élus parmi les serviteurs d’Allah. Nous le fîmes passer à la postérité. Que la paix soit sur Ilyas ! C’est ainsi que Nous récompensons les bienfaiteurs. Il fut l’un de Nos serviteurs croyants.",
    } as QuranReference,
  },
  {
    id: 'ilyas-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَإِنَّ إِلْيَاسَ لَمِنَ ٱلْمُرْسَلِينَ﴾ And indeed, Ilyas was from among the messengers, ﴿إِذْ قَالَ لِقَوْمِهِۦٓ أَلَا تَتَّقُونَ﴾ When he said to his people, \"Will you not fear Allah? ﴿أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ ٱلْخَـٰلِقِينَ﴾ Do you call upon Baal and leave the best of creators - ﴿ٱللَّهَ رَبَّكُمْ وَرَبَّ ءَابَآئِكُمُ ٱلْأَوَّلِينَ﴾ Allah, your Lord and the Lord of your first forefathers?\" ﴿فَكَذَّبُوهُ فَإِنَّهُمْ لَمُحْضَرُونَ﴾ And they denied him, so indeed, they will be brought [for punishment], ﴿إِلَّا عِبَادَ ٱللَّهِ ٱلْمُخْلَصِينَ﴾ Except the chosen servants of Allah. ﴿وَتَرَكْنَا عَلَيْهِ فِى ٱلْـَٔاخِرِينَ﴾ And We left for him [favorable mention] among later generations: ﴿سَلَـٰمٌ عَلَىٰٓ إِلْ يَاسِينَ﴾ \"Peace upon Ilyas.\" ﴿إِنَّا كَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ﴾ Indeed, We thus reward the doers of good. ﴿إِنَّهُۥ مِنْ عِبَادِنَا ٱلْمُؤْمِنِينَ﴾ Indeed, he was of Our believing servants.",
    contentFr: "﴿وَإِنَّ إِلْيَاسَ لَمِنَ ٱلْمُرْسَلِينَ﴾ Ilyas fut aussi du nombre des Envoyés. ﴿إِذْ قَالَ لِقَوْمِهِۦٓ أَلَا تَتَّقُونَ﴾ « Ne craignez-vous donc pas (Allah)? dit-il à son peuple. ﴿أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ ٱلْخَـٰلِقِينَ﴾ Invoquerez-vous donc Baal en délaissant le Meilleur des créateurs, ﴿ٱللَّهَ رَبَّكُمْ وَرَبَّ ءَابَآئِكُمُ ٱلْأَوَّلِينَ﴾ Allah, votre Seigneur et le Seigneur de vos tout premiers ancêtres? » ﴿فَكَذَّبُوهُ فَإِنَّهُمْ لَمُحْضَرُونَ﴾ Or, ils le traitèrent de menteur, et ils comparaîtront assurément et ils seront livrés au supplice, ﴿إِلَّا عِبَادَ ٱللَّهِ ٱلْمُخْلَصِينَ﴾ excepté les élus parmi les serviteurs d’Allah. ﴿وَتَرَكْنَا عَلَيْهِ فِى ٱلْـَٔاخِرِينَ﴾ Nous le fîmes passer à la postérité. ﴿سَلَـٰمٌ عَلَىٰٓ إِلْ يَاسِينَ﴾ Que la paix soit sur Ilyas ! ﴿إِنَّا كَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ﴾ C’est ainsi que Nous récompensons les bienfaiteurs. ﴿إِنَّهُۥ مِنْ عِبَادِنَا ٱلْمُؤْمِنِينَ﴾ Il fut l’un de Nos serviteurs croyants.",
  },
  {
    id: 'ilyas-5',
    type: 'narrative',
    order: 5,
    content: "Al-An'am names him with Zakariya, Yahya and Isa, among the righteous.",
    contentFr: "Al-An'am le nomme avec Zakariya, Yahya et Issa, parmi les vertueux.",
  },
  {
    id: 'ilyas-6',
    type: 'quran_source',
    order: 6,
    content: "Zakariya, Yahya, Isa and Ilyas: all of the righteous.",
    contentFr: "Zakariya, Yahya, Issa et Ilyas : tous des vertueux.",
    source: {
      type: "quran",
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: "الأنعام",
      ayahStart: 85,
      ayahEnd: 85,
      arabicText: "وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ",
      translation: "And Zakariya and Yahya and Isa and Ilyas - and all were of the righteous.",
      translationFr: "Et (il y eut aussi) Zakariya, Yahya le Baptiste, Issa et Ilyas, tous étaient du nombre des vertueux.",
    } as QuranReference,
  },
  {
    id: 'ilyas-7',
    type: 'narrative',
    order: 7,
    content: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ And Zakariya and Yahya and Isa and Ilyas - and all were of the righteous.",
    contentFr: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ Et (il y eut aussi) Zakariya, Yahya le Baptiste, Issa et Ilyas, tous étaient du nombre des vertueux.",
  },

  // ============ PART 2: WHAT WAS NOT TOLD ============
  {
    id: 'ilyas-8',
    type: 'narrative',
    order: 8,
    content: "That is all. The Quran does not say who his people were or where, how they answered beyond denying, or how his life ended. What was not told, we leave untold. Allah knows best.",
    contentFr: "C'est tout. Le Coran ne dit ni qui était son peuple ni où, ni comment ils répondirent au-delà du démenti, ni comment sa vie prit fin. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const ilyasSubStories: SubStory[] = [
  {
    id: 'ilyas-complete',
    prophetId: 'ilyas',
    title: 'The Story of Prophet Ilyas',
    titleFr: "L'Histoire du Prophète Ilyas",
    titleArabic: "قصة نبي الله إلياس",
    order: 1,
    estimatedReadTime: 6,
    content: ilyasStoryContent,
  },
];
