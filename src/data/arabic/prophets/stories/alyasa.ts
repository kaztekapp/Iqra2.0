// Story of Prophet Al-Yasa (اليسع) - The Successor
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Al-Yasa is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const alyasaStory: Prophet = {
  id: 'al-yasa',
  nameEnglish: "Al-Yasa'",
  nameFrench: "Al-Yasa'",
  nameArabic: 'اليسع',
  order: 20,
  title: 'The Successor',
  titleFr: 'Le Successeur',
  titleArabic: 'الخليفة',
  summary: "Al-Yasa is named twice in the Quran: with Ismail, Yunus and Lut as those Allah preferred over the worlds (6:86), and with Ismail and Dhul-Kifl among the outstanding (38:48). Nothing else is told of him, and no authentic hadith adds to it.",
  summaryFr: "Al-Yasa est nommé deux fois dans le Coran : avec Ismaïl, Younous et Lout parmi ceux qu'Allah a préférés aux mondes (6:86), et avec Ismaïl et Dhoul-Kifl parmi les meilleurs (38:48). Rien d'autre n'est dit de lui, et aucun hadith authentique n'y ajoute.",
  hasSubStories: false,
  lessons: [
    "He is named among those Allah \"preferred over the worlds\", and nothing else is said. Preference with Allah does not need a story to be real (6:86).",
    "\"All are among the outstanding.\" His whole biography in the Quran is one word of praise, shared with two others (38:48).",
    "Twenty-five prophets are named in the Quran, and some of them, like Al-Yasa, are only named. The Quran was not sent to tell every life; it was sent to guide ours (6:90).",
  ],
  lessonsFr: [
    "Il est nommé parmi ceux qu'Allah « a préférés aux mondes », et rien d'autre n'est dit. La préférence auprès d'Allah n'a pas besoin d'histoire pour être réelle (6:86).",
    "« Tous sont parmi les meilleurs. » Toute sa biographie dans le Coran tient en un mot de louange, partagé avec deux autres (38:48).",
    "Vingt-cinq prophètes sont nommés dans le Coran, et certains, comme Al-Yasa, ne sont que nommés. Le Coran n'a pas été envoyé pour raconter chaque vie ; il a été envoyé pour guider la nôtre (6:90).",
  ],
  estimatedReadTime: 4,
  quranMentions: 2,
  icon: '🌟',
};

// Single continuous story (no sub-stories)
export const alyasaStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'alyasa-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Al-Yasa, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nIt is the shortest kind of story the Quran tells: a name, twice, in the company of other prophets. No authentic hadith adds to it. What was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Al-Yasa, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nC'est la plus courte sorte d'histoire que raconte le Coran : un nom, deux fois, en compagnie d'autres prophètes. Aucun hadith authentique n'y ajoute. Ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: PREFERRED OVER THE WORLDS ============
  {
    id: 'alyasa-2',
    type: 'narrative',
    order: 2,
    content: "Al-An'am names him in a list of the prophets given to Ibrahim's line, and says what Allah did with all of them.",
    contentFr: "Al-An'am le nomme dans une liste des prophètes donnés à la lignée d'Ibrahim, et dit ce qu'Allah fit d'eux tous.",
  },
  {
    id: 'alyasa-3',
    type: 'quran_source',
    order: 3,
    content: "Ismail, Al-Yasa, Yunus and Lut: preferred over the worlds.",
    contentFr: "Ismaïl, Al-Yasa, Younous et Lout : préférés aux mondes.",
    source: {
      type: "quran",
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: "الأنعام",
      ayahStart: 86,
      ayahEnd: 86,
      arabicText: "وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ",
      translation: "And Ismail and Al-Yasa and Yunus and Lut - and all [of them] We preferred over the worlds.",
      translationFr: "Ainsi qu’Ismaïl, Al-Yasa, Younous et Lout, que Nous tînmes tous en plus haute estime que le reste du monde.",
    } as QuranReference,
  },
  {
    id: 'alyasa-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ﴾ And Ismail and Al-Yasa and Yunus and Lut - and all [of them] We preferred over the worlds.",
    contentFr: "﴿وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ﴾ Ainsi qu’Ismaïl, Al-Yasa, Younous et Lout, que Nous tînmes tous en plus haute estime que le reste du monde.",
  },
  {
    id: 'alyasa-5',
    type: 'narrative',
    order: 5,
    content: "Sad names him again, and gives the three of them one word.",
    contentFr: "Sad le nomme à nouveau, et donne aux trois un seul mot.",
  },
  {
    id: 'alyasa-6',
    type: 'quran_source',
    order: 6,
    content: "\"And remember Ismail, Al-Yasa and Dhul-Kifl; all are among the outstanding.\"",
    contentFr: "« Et rappelle-toi Ismaïl, Al-Yasa et Dhoul-Kifl ; tous sont parmi les meilleurs. »",
    source: {
      type: "quran",
      surahNumber: 38,
      surahNameEnglish: "Sad",
      surahNameArabic: "ص",
      ayahStart: 48,
      ayahEnd: 48,
      arabicText: "وَٱذْكُرْ إِسْمَـٰعِيلَ وَٱلْيَسَعَ وَذَا ٱلْكِفْلِ ۖ وَكُلٌّ مِّنَ ٱلْأَخْيَارِ",
      translation: "And remember Ismail, Al-Yasa and Dhul-Kifl, and all are among the outstanding.",
      translationFr: "Évoque aussi Ismaïl, Al-Yasa et Dhul-Kifl. Tous étaient du nombre des meilleurs (de Nos serviteurs).",
    } as QuranReference,
  },
  {
    id: 'alyasa-7',
    type: 'narrative',
    order: 7,
    content: "﴿وَٱذْكُرْ إِسْمَـٰعِيلَ وَٱلْيَسَعَ وَذَا ٱلْكِفْلِ ۖ وَكُلٌّ مِّنَ ٱلْأَخْيَارِ﴾ And remember Ismail, Al-Yasa and Dhul-Kifl, and all are among the outstanding.",
    contentFr: "﴿وَٱذْكُرْ إِسْمَـٰعِيلَ وَٱلْيَسَعَ وَذَا ٱلْكِفْلِ ۖ وَكُلٌّ مِّنَ ٱلْأَخْيَارِ﴾ Évoque aussi Ismaïl, Al-Yasa et Dhul-Kifl. Tous étaient du nombre des meilleurs (de Nos serviteurs).",
  },

  // ============ PART 2: WHAT WAS NOT TOLD ============
  {
    id: 'alyasa-8',
    type: 'narrative',
    order: 8,
    content: "That is all the Quran says. It does not say whom Al-Yasa was sent to, where, or when, and it tells nothing of his life. What was not told, we leave untold. Allah knows best.",
    contentFr: "C'est tout ce que dit le Coran. Il ne dit ni vers qui Al-Yasa fut envoyé, ni où, ni quand, et il ne raconte rien de sa vie. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const alyasaSubStories: SubStory[] = [
  {
    id: 'alyasa-complete',
    prophetId: 'al-yasa',
    title: 'The Story of Prophet Al-Yasa',
    titleFr: "L'Histoire du Prophète Al-Yasa",
    titleArabic: "قصة نبي الله اليسع",
    order: 1,
    estimatedReadTime: 4,
    content: alyasaStoryContent,
  },
];
