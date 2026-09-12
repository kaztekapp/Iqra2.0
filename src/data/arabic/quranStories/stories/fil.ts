// The People of the Elephant (أصحاب الفيل)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const filStory: QuranStory = {
  id: "fil",
  titleEnglish: "The People of the Elephant",
  titleFrench: "Les Gens de l'Éléphant",
  titleArabic: "أصحاب الفيل",
  order: 11,
  category: "historical_events",
  description: "An army came with an elephant to destroy the Ka'bah, and Allah sent birds",
  descriptionFr: "Une armée vint avec un éléphant pour détruire la Kaaba, et Allah envoya des oiseaux",
  summary: "Have you not considered how your Lord dealt with the companions of the elephant? He made their plan into misguidance, sent birds in flocks striking them with stones of hard clay, and made them like eaten straw. The Quran gives them five verses and no more; the Prophet ﷺ, at Hudaybiyah, said of his camel that she had been restrained by the One who restrained the elephant.",
  summaryFr: "N'as-tu pas vu comment ton Seigneur a agi envers les gens de l'éléphant ? Il a rendu leur ruse complètement vaine, a envoyé contre eux des oiseaux par volées leur lançant des pierres d'argile, et les a rendus comme une paille mâchée. Le Coran leur donne cinq versets et pas davantage ; le Prophète ﷺ, à Houdaybiya, dit de sa chamelle qu'elle avait été retenue par Celui qui avait retenu l'éléphant.",
  lessons: [
    "\"Did He not make their plan into misguidance?\" Their army was not defeated; their plan was made to fail before it was carried out (105:2).",
    "Birds, and stones of clay. What ended an army with an elephant was the smallest thing in the sky and the commonest thing on the ground (105:3-4).",
    "\"And He made them like eaten straw.\" The surah does not say who they were or where they came from; it says what they became (105:5).",
    "At Hudaybiyah, when the Prophet's camel knelt and would not go on, he said she had been restrained by the One who restrained the elephant. The same Lord who stopped an army from reaching Makkah stopped a Prophet from entering it that year (Bukhari 2731).",
  ],
  lessonsFr: [
    "« N'a-t-Il pas rendu leur ruse complètement vaine ? » Leur armée ne fut pas vaincue ; leur plan fut rendu vain avant d'être exécuté (105:2).",
    "Des oiseaux, et des pierres d'argile. Ce qui mit fin à une armée avec un éléphant fut la plus petite chose du ciel et la plus commune de la terre (105:3-4).",
    "« Et Il les a rendus comme une paille mâchée. » La sourate ne dit ni qui ils étaient ni d'où ils venaient ; elle dit ce qu'ils devinrent (105:5).",
    "À Houdaybiya, quand la chamelle du Prophète s'agenouilla et refusa d'avancer, il dit qu'elle avait été retenue par Celui qui avait retenu l'éléphant. Le même Seigneur qui empêcha une armée d'atteindre La Mecque empêcha un Prophète d'y entrer cette année-là (Boukhari 2731).",
  ],
  estimatedReadTime: 6,
  quranMentions: 1,
  icon: "🐘",
  mainSurah: {
    number: 105,
    name: "Al-Fil",
    nameArabic: "الفيل",
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'fil-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the People of the Elephant, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran gives them one short surah. It does not say who they were, who led them, or when it was - and what was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire des Gens de l'Éléphant, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran leur donne une courte sourate. Il ne dit ni qui ils étaient, ni qui les menait, ni quand ce fut - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: BIRDS IN FLOCKS ============
    {
      id: 'fil-2',
      type: 'narrative',
      order: 2,
      content: "The whole surah: the question, the plan made vain, the birds, the stones, and the straw.",
      contentFr: "Toute la sourate : la question, la ruse rendue vaine, les oiseaux, les pierres, et la paille.",
    },
    {
      id: 'fil-3',
      type: 'quran_source',
      order: 3,
      content: "\"Have you not considered how your Lord dealt with the companions of the elephant?\"",
      contentFr: "« N'as-tu pas vu comment ton Seigneur a agi envers les gens de l'éléphant ? »",
      source: {
        type: "quran",
        surahNumber: 105,
        surahNameEnglish: "Al-Fil",
        surahNameArabic: "الفيل",
        ayahStart: 1,
        ayahEnd: 5,
        arabicText: " أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَـٰبِ ٱلْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍ ۝ وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ ۝ تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ ۝ فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ",
        translation: "Have you not considered, [O Muhammad], how your Lord dealt with the companions of the elephant? Did He not make their plan into misguidance? And He sent against them birds in flocks, Striking them with stones of hard clay, And He made them like eaten straw.",
        translationFr: "N’as-tu pas vu ce que fit ton Seigneur aux compagnons de l’Éléphant ? N’a-t-Il pas déjoué leurs intrigues, en leur envoyant des nuées d’oiseaux, qui leur lançaient des pierres argileuses ? Il les rendit telles des brindilles mâchées (et recrachées.).",
      } as QuranReference,
    },
    {
      id: 'fil-4',
      type: 'narrative',
      order: 4,
      content: "﴿ أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَـٰبِ ٱلْفِيلِ﴾ Have you not considered, [O Muhammad], how your Lord dealt with the companions of the elephant? ﴿أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍ﴾ Did He not make their plan into misguidance? ﴿وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ﴾ And He sent against them birds in flocks, ﴿تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ﴾ Striking them with stones of hard clay, ﴿فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ﴾ And He made them like eaten straw.",
      contentFr: "﴿ أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَـٰبِ ٱلْفِيلِ﴾ N’as-tu pas vu ce que fit ton Seigneur aux compagnons de l’Éléphant ? ﴿أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍ﴾ N’a-t-Il pas déjoué leurs intrigues, ﴿وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ﴾ en leur envoyant des nuées d’oiseaux, ﴿تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ﴾ qui leur lançaient des pierres argileuses ? ﴿فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ﴾ Il les rendit telles des brindilles mâchées (et recrachées.).",
    },

    // ============ PART 2: WHAT THE PROPHET ﷺ SAID ============
    {
      id: 'fil-5',
      type: 'narrative',
      order: 5,
      content: "On the road to Makkah in the year of Hudaybiyah, the Prophet's camel knelt and would not move, and he named the One who had held her (Sahih al-Bukhari 2731).",
      contentFr: "Sur la route de La Mecque l'année de Houdaybiya, la chamelle du Prophète s'agenouilla et refusa de bouger, et il nomma Celui qui la retenait (Sahih al-Boukhari 2731).",
    },
    {
      id: 'fil-6',
      type: 'hadith_source',
      order: 6,
      content: "\"She has been restrained by the One who restrained the elephant.\"",
      contentFr: "« Elle a été retenue par Celui qui a retenu l'éléphant. »",
      source: {
        type: "hadith",
        collection: "Sahih al-Bukhari",
        hadithNumber: "2731",
        narrator: "al-Miswar ibn Makhramah and Marwan",
        translation: "When the Messenger of Allah ﷺ was at the pass from which one descends upon them, his camel knelt. The people said: Hal, hal! - but she persisted. They said: Al-Qaswa has become stubborn; al-Qaswa has become stubborn. The Prophet ﷺ said: Al-Qaswa has not become stubborn, and that is not her nature; but she has been restrained by the One who restrained the elephant.",
        translationFr: "Quand le Messager d'Allah ﷺ fut au col d'où l'on descend vers eux, sa chamelle s'agenouilla. Les gens dirent : Hal, hal ! - mais elle s'obstina. Ils dirent : Al-Qaswa est devenue rétive ; al-Qaswa est devenue rétive. Le Prophète ﷺ dit : Al-Qaswa n'est pas devenue rétive, et ce n'est pas son caractère ; mais elle a été retenue par Celui qui a retenu l'éléphant.",
        grade: "sahih",
        arabicText: "",
      } as HadithReference,
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'fil-7',
      type: 'narrative',
      order: 7,
      content: "The Quran does not name the people of the elephant, their leader, their land, or the year. It says what their Lord did with them. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne nomme ni les gens de l'éléphant, ni leur chef, ni leur pays, ni l'année. Il dit ce que leur Seigneur fit d'eux. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
