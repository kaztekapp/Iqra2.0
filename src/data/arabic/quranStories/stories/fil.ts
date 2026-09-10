// Story of the People of the Elephant (أصحاب الفيل)
// Abraha's army, and the birds Allah sent
//
// Verses are copied from the app's own Quran data, so the Arabic and both
// translations are exactly what the surah screen shows. Prophets carry their
// Islamic names throughout, including inside quoted translations.

import { QuranStory, QuranReference, HadithReference } from '../../../../types/quranStories';

export const filStory: QuranStory = {
  id: "fil",
  titleEnglish: "The People of the Elephant",
  titleFrench: "Les Gens de l'Éléphant",
  titleArabic: "أصحاب الفيل",
  order: 11,
  category: "historical_events",
  description: "An army came with an elephant to destroy the Ka'bah, and Allah sent birds",
  descriptionFr: "Une armée vint avec un éléphant pour détruire la Kaaba, et Allah envoya des oiseaux",
  summary: "In the year the Prophet ﷺ was born, Abraha marched on Makkah with an army led by an elephant to destroy the Ka'bah. The Quraysh could not resist him and withdrew to the hills. Allah sent birds in flocks that struck the army with stones of baked clay until it was left like eaten straw. Surah Al-Fil recalls the event to the Quraysh as something they had seen with their own eyes, and Surah Quraysh draws the conclusion: worship the Lord of this House.",
  summaryFr: "L'année où naquit le Prophète ﷺ, Abraha marcha sur La Mecque avec une armée précédée d'un éléphant pour détruire la Kaaba. Les Quraych ne purent lui résister et se retirèrent dans les collines. Allah envoya des oiseaux par volées qui frappèrent l'armée de pierres d'argile cuite jusqu'à la laisser comme de la paille mâchée. La sourate Al-Fil rappelle l'événement aux Quraych comme une chose vue de leurs propres yeux, et la sourate Quraych en tire la conclusion : adorez le Seigneur de cette Maison.",
  lessons: ["Allah defends His House without any army of men","The mightiest force is nothing before a flock of birds that Allah sends","A favour of Allah should be remembered and answered with worship","Arrogance against the sacred ends in humiliation","The Quran recounts what matters and leaves the rest","The Prophet ﷺ was born in the year Allah showed Makkah His protection"],
  lessonsFr: ["Allah défend Sa Maison sans aucune armée d'hommes","La force la plus redoutable n'est rien devant une volée d'oiseaux qu'Allah envoie","Un bienfait d'Allah doit être rappelé et payé par l'adoration","L'arrogance contre le sacré finit dans l'humiliation","Le Coran raconte l'essentiel et laisse le reste","Le Prophète ﷺ naquit l'année où Allah montra à La Mecque Sa protection"],
  estimatedReadTime: 8,
  quranMentions: 1,
  icon: "🐘",
  mainSurah: {
    number: 105,
    name: "Al-Fil",
    nameArabic: "الفيل",
  },
  content: [
    {
      id: "fil-1",
      type: 'narrative',
      order: 1,
      content: "Surah Al-Fil is five verses long, and it opens with a question the Quraysh could answer from memory: 'Have you not seen how your Lord dealt with the companions of the elephant?' The event was within living memory in Makkah when the surah was revealed. The Quran gives what matters and leaves the rest; the background below comes from the biographers, and it is marked as theirs.",
      contentFr: "La sourate Al-Fil compte cinq versets et s'ouvre sur une question à laquelle les Quraych pouvaient répondre de mémoire : « N'as-tu pas vu comment ton Seigneur a agi envers les gens de l'éléphant ? » L'événement était encore dans les mémoires à La Mecque lorsque la sourate fut révélée. Le Coran donne l'essentiel et laisse le reste ; le contexte ci-dessous vient des biographes, et il est présenté comme tel.",
    },
    {
      id: "fil-2",
      type: 'quran_source',
      order: 2,
      content: "The whole surah: Allah recalls how He dealt with the army of the elephant.",
      contentFr: "La sourate entière : Allah rappelle comment Il a traité l'armée de l'éléphant.",
      source: {
        type: 'quran',
        surahNumber: 105,
        surahNameEnglish: "Al-Fil",
        surahNameArabic: "الفيل",
        ayahStart: 1,
        ayahEnd: 5,
        arabicText: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَـٰبِ ٱلْفِيلِ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍ وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ",
        translation: "Have you not considered, [O Muḥammad], how your Lord dealt with the companions of the elephant? Did He not make their plan into misguidance? And He sent against them birds in flocks, Striking them with stones of hard clay, And He made them like eaten straw.",
        translationFr: "N’as-tu pas vu ce que fit ton Seigneur aux compagnons de l’Éléphant ? N’a-t-Il pas déjoué leurs intrigues, en leur envoyant des nuées d’oiseaux, qui leur lançaient des pierres argileuses ? Il les rendit telles des brindilles mâchées (et recrachées.).",
      } as QuranReference,
    },
    {
      id: "fil-3",
      type: 'narrative',
      order: 3,
      content: "The biographers, Ibn Ishaq among them, relate that Abraha, the Abyssinian ruler of Yemen, built a great church in San'a and meant to turn the Arabs' pilgrimage away from the Ka'bah to it. When that failed, he marched on Makkah with an army, and at its head walked an elephant. The Quraysh could not fight such a force. They withdrew to the hills and left the House to its Lord.",
      contentFr: "Les biographes, dont Ibn Ishaq, rapportent qu'Abraha, le gouverneur abyssin du Yémen, construisit une grande église à Sanaa et voulut y détourner le pèlerinage des Arabes, loin de la Kaaba. Devant l'échec, il marcha sur La Mecque avec une armée, un éléphant en tête. Les Quraych ne pouvaient affronter une telle force. Ils se retirèrent dans les collines et laissèrent la Maison à son Seigneur.",
    },
    {
      id: "fil-4",
      type: 'narrative',
      order: 4,
      content: "Ibn Ishaq relates that Abd al-Muttalib, the grandfather of the Prophet ﷺ, went to Abraha to ask for his camels that the army had seized. Abraha was surprised that he asked for camels and said nothing of the Ka'bah. Abd al-Muttalib answered that he was the owner of the camels, and the House had an Owner who would defend it. This is a report of the sirah, not a verse; the Quran states only the outcome.",
      contentFr: "Ibn Ishaq rapporte qu'Abd al-Muttalib, le grand-père du Prophète ﷺ, alla trouver Abraha pour réclamer ses chameaux que l'armée avait saisis. Abraha s'étonna qu'il demandât des chameaux et ne dît rien de la Kaaba. Abd al-Muttalib répondit qu'il était le propriétaire des chameaux, et que la Maison avait un Propriétaire qui la défendrait. C'est un récit de la sîra, non un verset ; le Coran n'énonce que l'issue.",
    },
    {
      id: "fil-5",
      type: 'narrative',
      order: 5,
      content: "Then Allah did what the surah describes. He made their plan go astray, and He sent against them birds in flocks that struck them with stones of baked clay, until the army was left like straw that has been eaten. The Ka'bah was untouched. No army of Quraysh had done it; the surah says 'your Lord' did it, and asks them to see.",
      contentFr: "Alors Allah fit ce que la sourate décrit. Il fit échouer leur stratagème et envoya contre eux des oiseaux par volées, qui les frappèrent de pierres d'argile cuite, jusqu'à ce que l'armée fût comme de la paille mâchée. La Kaaba resta intacte. Aucune armée des Quraych n'avait fait cela ; la sourate dit que « ton Seigneur » l'a fait, et leur demande de le voir.",
    },
    {
      id: "fil-6",
      type: 'hadith_source',
      order: 6,
      content: "Years later, the Prophet ﷺ recalled the elephant at al-Hudaybiyyah.",
      contentFr: "Des années plus tard, le Prophète ﷺ évoqua l'éléphant à Al-Hudaybiyya.",
      source: {
        type: 'hadith',
        collection: "Sahih al-Bukhari (2731)",
        narrator: "Al-Miswar ibn Makhrama and Marwan ibn al-Hakam",
        arabicText: "مَا خَلَأَتِ الْقَصْوَاءُ، وَمَا ذَاكَ لَهَا بِخُلُقٍ، وَلَكِنْ حَبَسَهَا حَابِسُ الْفِيلِ",
        translation: "On the way to Makkah at al-Hudaybiyyah, the Prophet's camel al-Qaswa knelt down and would not move, and the people said she had become stubborn. The Prophet ﷺ said: 'Al-Qaswa has not become stubborn, and that is not her nature; rather she has been held back by the One who held back the elephant.'",
        translationFr: "Sur la route de La Mecque, à Al-Hudaybiyya, la chamelle du Prophète, Al-Qaswa, s'agenouilla et refusa d'avancer, et les gens dirent qu'elle était devenue rétive. Le Prophète ﷺ dit : « Al-Qaswa n'est pas devenue rétive, ce n'est pas dans sa nature ; c'est Celui qui a retenu l'éléphant qui l'a retenue. »",
        grade: "sahih",
      } as HadithReference,
    },
    {
      id: "fil-7",
      type: 'narrative',
      order: 7,
      content: "That year became known among the Arabs as the Year of the Elephant. The biographers relate that the Prophet ﷺ was born in it, in the same Makkah whose House Allah had just defended. The surah that follows, Quraysh, continues the thought: let them worship the Lord of this House, who fed them against hunger and made them safe from fear.",
      contentFr: "Cette année devint connue chez les Arabes comme l'Année de l'Éléphant. Les biographes rapportent que le Prophète ﷺ y naquit, dans cette même Mecque dont Allah venait de défendre la Maison. La sourate suivante, Quraych, poursuit la pensée : qu'ils adorent le Seigneur de cette Maison, qui les a nourris contre la faim et mis à l'abri de la peur.",
    },
  ],
};

export default filStory;
