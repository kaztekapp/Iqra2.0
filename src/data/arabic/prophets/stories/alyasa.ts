// Story of Prophet Al-Yasa (اليسع) - The Successor
// Single continuous narrative with Quran sources

import { Prophet, SubStory, StoryContentBlock, QuranReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const alyasaStory: Prophet = {
  id: 'al-yasa',
  nameEnglish: "Al-Yasa'",
  nameArabic: 'اليسع',
  order: 20,
  title: 'The Successor',
  titleArabic: 'الخليفة',
  summary: "Prophet Al-Yasa' (Elisha) was the successor of Prophet Ilyas. He continued his predecessor's mission of calling the Children of Israel back to the worship of Allah alone. Mentioned briefly in the Quran alongside other great prophets, he is praised as being among the chosen and outstanding. While the Quran provides limited details about his specific story, his inclusion among the prophets and the historical accounts of his miracles and teachings demonstrate his importance in the prophetic chain.",
  hasSubStories: false,
  lessons: [
    'Continuing the work of righteous predecessors is honorable',
    'Every prophet, regardless of fame, carries immense responsibility',
    'Persistence in guidance even when facing opposition',
    'Being chosen by Allah is the highest honor',
    'Faith must be passed from generation to generation',
    'The prophetic mission is always the same: calling to Allah',
  ],
  estimatedReadTime: 6,
  quranMentions: 2,
  icon: '🌟',
};

// Single continuous narrative
const alyasaStoryContent: StoryContentBlock[] = [
  {
    id: 'alyasa-1',
    type: 'narrative',
    order: 1,
    content: "Prophet Al-Yasa' (known as Elisha in the Biblical tradition) was the chosen successor of Prophet Ilyas. Before Ilyas was raised by Allah, he appointed Al-Yasa' to continue the prophetic mission among the Children of Israel. Al-Yasa' had been Ilyas's devoted student and servant, learning from his teacher and preparing for the great responsibility that would fall upon him.",
  },
  {
    id: 'alyasa-2',
    type: 'narrative',
    order: 2,
    content: "The Quran mentions Al-Yasa' twice, both times in the company of other great prophets. While detailed stories about him are not narrated in the Quran, his inclusion among Allah's messengers confirms his status and importance. The very act of being named in the Quran is an eternal honor.",
  },
  {
    id: 'alyasa-3',
    type: 'quran_source',
    order: 3,
    content: "Allah mentions Al-Yasa' among the favored prophets.",
    source: {
      type: 'quran',
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: 'الأنعام',
      ayahStart: 86,
      ayahEnd: 86,
      arabicText: 'وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ',
      translation: 'And Ismail and Al-Yasa\' and Yunus and Lut - and all [of them] We preferred over the worlds.',
    } as QuranReference,
  },
  {
    id: 'alyasa-4',
    type: 'narrative',
    order: 4,
    content: "In this verse, Al-Yasa' is mentioned alongside Ismail, Yunus, and Lut - prophets whose stories are told in greater detail in the Quran. All of them, Allah declares, were 'preferred over the worlds' (faddalna 'ala al-'alamin). This phrase indicates their exalted status - each prophet was favored above all other people of their time and given a rank that ordinary humans could never attain.",
  },
  {
    id: 'alyasa-5',
    type: 'quran_source',
    order: 5,
    content: "Allah mentions Al-Yasa' among the outstanding.",
    source: {
      type: 'quran',
      surahNumber: 38,
      surahNameEnglish: 'Sad',
      surahNameArabic: 'ص',
      ayahStart: 48,
      ayahEnd: 48,
      arabicText: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِّنَ الْأَخْيَارِ',
      translation: 'And remember Ismail and Al-Yasa\' and Dhul-Kifl, and all are among the outstanding.',
    } as QuranReference,
  },
  {
    id: 'alyasa-6',
    type: 'narrative',
    order: 6,
    content: "Here, Al-Yasa' is listed with Ismail and Dhul-Kifl, and all three are described as 'min al-akhyar' - among the best, the outstanding, the excellent. The Quran commands us to remember these prophets, keeping their examples alive. Though their stories may be brief in the Quran, their rank with Allah is immense.",
  },
  {
    id: 'alyasa-7',
    type: 'narrative',
    order: 7,
    content: "According to historical traditions, Al-Yasa' lived in the land of Israel during the 9th century BCE, continuing the work Ilyas had begun. He faced the same corrupt leadership and widespread idol worship that had plagued his predecessor. But armed with Allah's guidance and the spiritual training he had received from Ilyas, he persisted in calling people to truth.",
  },
  {
    id: 'alyasa-8',
    type: 'narrative',
    order: 8,
    content: "Traditions record numerous miracles performed by Al-Yasa'. He is said to have healed the sick, purified poisoned food, multiplied provisions for the needy, and even restored life to the dead by Allah's permission. These miracles served as signs of his prophethood, demonstrating that Allah's power was with him.",
  },
  {
    id: 'alyasa-9',
    type: 'narrative',
    order: 9,
    content: "One notable account describes how Al-Yasa' helped a poor widow whose creditors were about to take her sons as slaves. He instructed her to gather empty vessels and pour the small amount of oil she had. The oil multiplied miraculously, filling vessel after vessel, until there were no more containers. She sold the oil, paid her debts, and saved her family.",
  },
  {
    id: 'alyasa-10',
    type: 'narrative',
    order: 10,
    content: "Another tradition tells of a woman who had been kind to Al-Yasa', providing him hospitality. When her son died, she came to the prophet in grief. Al-Yasa' went to the child and prayed to Allah, and the boy was restored to life. Such miracles were not the prophet's own power but demonstrations of Allah's ability to do all things.",
  },
  {
    id: 'alyasa-11',
    type: 'narrative',
    order: 11,
    content: "Al-Yasa' also played a political role, advising and sometimes anointing kings. He guided the kingdoms of Israel and Judah during turbulent times, always reminding the rulers of their duty to establish justice and worship Allah alone. When kings listened, their lands prospered; when they ignored him, trouble followed.",
  },
  {
    id: 'alyasa-12',
    type: 'narrative',
    order: 12,
    content: "The transition from Ilyas to Al-Yasa' represents an important principle: the prophetic mission must continue from generation to generation. When one messenger passes, another rises to carry the message forward. The content of the message - worship Allah alone - remains unchanged, even as the messenger changes.",
  },
  {
    id: 'alyasa-13',
    type: 'narrative',
    order: 13,
    content: "Al-Yasa' served for many years before passing away naturally. Unlike his teacher Ilyas, who was raised by Allah, Al-Yasa' experienced death like most humans. But his legacy continued through the believers he had guided and the prophets who would come after him.",
  },
  {
    id: 'alyasa-14',
    type: 'narrative',
    order: 14,
    content: "The fact that Al-Yasa' is mentioned in the Quran, despite limited details about his story, teaches us something important: not all prophets are meant to be equally famous. Some are mentioned extensively, like Musa; others briefly, like Al-Yasa'. But all are honored by Allah. Fame in this world is not the measure of worth with the Creator.",
  },
  {
    id: 'alyasa-15',
    type: 'narrative',
    order: 15,
    content: "For believers today, Al-Yasa's example teaches the importance of carrying on the work of those who came before us. Just as he continued Ilyas's mission, we are called to continue the work of the Prophet Muhammad ﷺ - calling people to Allah, establishing prayer, enjoining good, and forbidding evil. The specific person matters less than the continuity of the message.",
  },
  {
    id: 'alyasa-16',
    type: 'narrative',
    order: 16,
    content: "Prophet Al-Yasa', the faithful successor who continued his teacher's mission, stands as an example for all who inherit responsibility from those before them. When we read his name in the Quran, we send peace upon him and remember that he too was among Allah's chosen servants, preferred above the worlds, counted among the outstanding. What greater honor could there be?",
  },
];

// Export as single continuous story
export const alyasaSubStories: SubStory[] = [
  {
    id: 'alyasa-complete',
    prophetId: 'al-yasa',
    title: "The Story of Prophet Al-Yasa'",
    titleArabic: 'قصة نبي الله اليسع',
    order: 1,
    estimatedReadTime: 6,
    content: alyasaStoryContent,
  },
];
