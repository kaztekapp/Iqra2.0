// Story of Prophet Dhul-Kifl (ذو الكفل) - The One of the Pledge
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Dhul-Kifl is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const dhulkiflStory: Prophet = {
  id: 'dhul-kifl',
  nameEnglish: 'Dhul-Kifl',
  nameFrench: 'Dhoul-Kifl',
  nameArabic: 'ذو الكفل',
  order: 16,
  title: 'The One of the Pledge',
  titleFr: 'Celui du Pacte',
  titleArabic: 'ذو الكفل',
  summary: "Dhul-Kifl is named twice in the Quran, each time beside Ismail: one of the patient, admitted into Allah's mercy, one of the righteous (21:85-86), and among the outstanding (38:48). Nothing else is told of him, and no authentic hadith adds to it.",
  summaryFr: "Dhoul-Kifl est nommé deux fois dans le Coran, chaque fois à côté d'Ismaïl : l'un des patients, reçu dans la miséricorde d'Allah, l'un des vertueux (21:85-86), et parmi les meilleurs (38:48). Rien d'autre n'est dit de lui, et aucun hadith authentique n'y ajoute.",
  hasSubStories: false,
  lessons: [
    "He is remembered for one quality, patience, and one reward, Allah's mercy. A whole life can be summed up truthfully in that (21:85-86).",
    "The Quran does not say who he was, where he lived, or what he did - only that he was among the outstanding. What Allah chooses to record of a person is His to choose (38:48).",
    "Two verses, and no story: and still his name is recited wherever the Quran is read. Being mentioned by Allah needs no story (21:85, 38:48).",
  ],
  lessonsFr: [
    "On se souvient de lui pour une qualité, la patience, et une récompense, la miséricorde d'Allah. Toute une vie peut se résumer véridiquement à cela (21:85-86).",
    "Le Coran ne dit ni qui il était, ni où il vécut, ni ce qu'il fit - seulement qu'il était parmi les meilleurs. Ce qu'Allah choisit de consigner d'une personne, c'est à Lui de le choisir (38:48).",
    "Deux versets, et pas d'histoire : et pourtant son nom est récité partout où le Coran est lu. Être mentionné par Allah n'a pas besoin d'histoire (21:85, 38:48).",
  ],
  estimatedReadTime: 5,
  quranMentions: 2,
  icon: '📜',
};

// Single continuous story (no sub-stories)
export const dhulkiflStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'dhulkifl-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Dhul-Kifl, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nIt is the shortest of these stories, because the Quran gives him two verses and no narrative, and no authentic hadith adds to them. Who he was and where he lived, we were not told - and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire de Dhoul-Kifl, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nC'est la plus courte de ces histoires, parce que le Coran lui donne deux versets et aucun récit, et qu'aucun hadith authentique n'y ajoute. Qui il était et où il vécut, cela ne nous a pas été dit - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: ONE OF THE PATIENT ============
  {
    id: 'dhulkifl-2',
    type: 'narrative',
    order: 2,
    content: "Surah Al-Anbiya names him with Ismail and Idris, and gives the three of them one word - patient - and one reward.",
    contentFr: "La sourate Al-Anbiya le nomme avec Ismaïl et Idris, et donne aux trois un seul mot - patients - et une seule récompense.",
  },
  {
    id: 'dhulkifl-3',
    type: 'quran_source',
    order: 3,
    content: "Ismail, Idris and Dhul-Kifl: of the patient, admitted into Allah's mercy.",
    contentFr: "Ismaïl, Idris et Dhoul-Kifl : des patients, reçus dans la miséricorde d'Allah.",
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
    id: 'dhulkifl-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَإِسْمَـٰعِيلَ وَإِدْرِيسَ وَذَا ٱلْكِفْلِ ۖ كُلٌّ مِّنَ ٱلصَّـٰبِرِينَ﴾ And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. ﴿وَأَدْخَلْنَـٰهُمْ فِى رَحْمَتِنَآ ۖ إِنَّهُم مِّنَ ٱلصَّـٰلِحِينَ﴾ And We admitted them into Our mercy. Indeed, they were of the righteous.",
    contentFr: "﴿وَإِسْمَـٰعِيلَ وَإِدْرِيسَ وَذَا ٱلْكِفْلِ ۖ كُلٌّ مِّنَ ٱلصَّـٰبِرِينَ﴾ Et Ismaïl, et Idris, et Dhul-Kifl, tous étaient des (modèles) de patience. ﴿وَأَدْخَلْنَـٰهُمْ فِى رَحْمَتِنَآ ۖ إِنَّهُم مِّنَ ٱلصَّـٰلِحِينَ﴾ Nous les reçûmes dans Notre miséricorde, car ils étaient du nombre des vertueux.",
  },
  {
    id: 'dhulkifl-5',
    type: 'narrative',
    order: 5,
    content: "Surah Sad names him again, with Ismail and Al-Yasa, among the outstanding.",
    contentFr: "La sourate Sad le nomme à nouveau, avec Ismaïl et Al-Yasa, parmi les meilleurs.",
  },
  {
    id: 'dhulkifl-6',
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
    id: 'dhulkifl-7',
    type: 'narrative',
    order: 7,
    content: "﴿وَٱذْكُرْ إِسْمَـٰعِيلَ وَٱلْيَسَعَ وَذَا ٱلْكِفْلِ ۖ وَكُلٌّ مِّنَ ٱلْأَخْيَارِ﴾ And remember Ismail, Al-Yasa and Dhul-Kifl, and all are among the outstanding.",
    contentFr: "﴿وَٱذْكُرْ إِسْمَـٰعِيلَ وَٱلْيَسَعَ وَذَا ٱلْكِفْلِ ۖ وَكُلٌّ مِّنَ ٱلْأَخْيَارِ﴾ Évoque aussi Ismaïl, Al-Yasa et Dhul-Kifl. Tous étaient du nombre des meilleurs (de Nos serviteurs).",
  },

  // ============ PART 2: WHAT WAS NOT TOLD ============
  {
    id: 'dhulkifl-8',
    type: 'narrative',
    order: 8,
    content: "That is all the Quran says. It does not say whether Dhul-Kifl was a prophet or a righteous man, whom he was sent to if he was sent, or what the name he is called by refers to. What was not told, we leave untold. Allah knows best.",
    contentFr: "C'est tout ce que dit le Coran. Il ne dit pas si Dhoul-Kifl était un prophète ou un homme vertueux, vers qui il fut envoyé s'il fut envoyé, ni à quoi renvoie le nom par lequel il est appelé. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const dhulkiflSubStories: SubStory[] = [
  {
    id: 'dhulkifl-complete',
    prophetId: 'dhul-kifl',
    title: 'The Story of Prophet Dhul-Kifl',
    titleFr: "L'Histoire du Prophète Dhoul-Kifl",
    titleArabic: "قصة نبي الله ذو الكفل",
    order: 1,
    estimatedReadTime: 5,
    content: dhulkiflStoryContent,
  },
];
