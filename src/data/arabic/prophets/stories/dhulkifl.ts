// Story of Prophet Dhul-Kifl (ذو الكفل) - The One of the Pledge
// Single continuous narrative with Quran sources

import { Prophet, SubStory, StoryContentBlock, QuranReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const dhulKiflStory: Prophet = {
  id: 'dhul-kifl',
  nameEnglish: 'Dhul-Kifl',
  nameArabic: 'ذو الكفل',
  order: 16,
  title: 'The One of the Pledge',
  titleArabic: 'ذو الكفل',
  summary: "Prophet Dhul-Kifl is mentioned twice in the Quran among the righteous prophets. His name means 'The One of the Portion' or 'The One of the Pledge' - possibly referring to a pledge he made and fulfilled. While the Quran provides limited details about his specific story, it praises him as being among the patient and righteous, counted among the best of creation. Some scholars identify him with the Biblical prophet Ezekiel, while others consider him a separate figure. His inclusion among the prophets teaches us that faithfulness to one's commitments and patience in adversity are hallmarks of prophethood.",
  hasSubStories: false,
  lessons: [
    'Fulfilling pledges and promises is a prophetic quality',
    'Patience in adversity leads to honor with Allah',
    'Being righteous earns a place among the best of creation',
    'Not all prophets are equally detailed in scripture, but all are honored',
    'Steadfastness in faith is more important than fame',
    'Every prophet, whether widely known or not, carries Allah\'s message',
  ],
  estimatedReadTime: 8,
  quranMentions: 2,
  icon: '📜',
};

// Single continuous narrative
const dhulKiflStoryContent: StoryContentBlock[] = [
  {
    id: 'dhulkifl-1',
    type: 'narrative',
    order: 1,
    content: "Among the prophets mentioned in the Quran, Dhul-Kifl holds a unique place. Unlike prophets such as Musa or Ibrahim whose stories span many chapters, Dhul-Kifl is mentioned only twice, briefly but with great honor. His name itself is a title meaning 'The One of the Kifl' - where 'kifl' can mean a portion, share, or pledge.",
  },
  {
    id: 'dhulkifl-2',
    type: 'quran_source',
    order: 2,
    content: "Allah mentions Dhul-Kifl among the patient prophets.",
    source: {
      type: 'quran',
      surahNumber: 21,
      surahNameEnglish: 'Al-Anbiya',
      surahNameArabic: 'الأنبياء',
      ayahStart: 85,
      ayahEnd: 86,
      arabicText: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ ۝ وَأَدْخَلْنَاهُمْ فِي رَحْمَتِنَا ۖ إِنَّهُم مِّنَ الصَّالِحِينَ',
      translation: 'And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.',
    } as QuranReference,
  },
  {
    id: 'dhulkifl-3',
    type: 'narrative',
    order: 3,
    content: "In this beautiful passage, Allah groups Dhul-Kifl with Ismail and Idris - two great prophets known for their patience and righteousness. Three profound attributes are mentioned: they were patient (sabirin), they were admitted into Allah's mercy, and they were righteous (salihin). To be mentioned alongside such noble prophets is the highest honor.",
  },
  {
    id: 'dhulkifl-4',
    type: 'quran_source',
    order: 4,
    content: "Allah mentions Dhul-Kifl again among those who receive good remembrance.",
    source: {
      type: 'quran',
      surahNumber: 38,
      surahNameEnglish: 'Sad',
      surahNameArabic: 'ص',
      ayahStart: 48,
      ayahEnd: 48,
      arabicText: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِّنَ الْأَخْيَارِ',
      translation: 'And remember Ismail and Al-Yasa and Dhul-Kifl, and all are among the outstanding.',
    } as QuranReference,
  },
  {
    id: 'dhulkifl-5',
    type: 'narrative',
    order: 5,
    content: "Here, Dhul-Kifl is listed with Ismail and Al-Yasa (Elisha), and all three are described as 'min al-akhyar' - among the best, the outstanding, the excellent. The Quran commands us to remember these prophets, keeping their examples alive in our hearts and minds. Though their stories may be brief in scripture, their rank with Allah is immense.",
  },
  {
    id: 'dhulkifl-6',
    type: 'narrative',
    order: 6,
    content: "Who was Dhul-Kifl? Scholars have offered various opinions. Some identify him with the Biblical prophet Ezekiel (Hizqil in Arabic), who was sent to the exiled Israelites in Babylon and is famous for his vivid visions. The similarity in names and the connection to the Israelite prophets makes this identification plausible.",
  },
  {
    id: 'dhulkifl-7',
    type: 'narrative',
    order: 7,
    content: "Other scholars suggest Dhul-Kifl might be a title rather than a name, given to a prophet who made and fulfilled a significant pledge. According to this view, he may have taken upon himself a difficult commitment - perhaps to lead his people, to worship without rest, or to bear some heavy burden - and fulfilled it completely. The 'kifl' (portion) he took became his identifying mark.",
  },
  {
    id: 'dhulkifl-8',
    type: 'narrative',
    order: 8,
    content: "There is a narration, though not from the strongest sources, that speaks of a righteous king named Al-Kifl who succeeded the prophet Al-Yasa. Before Al-Yasa died, he sought someone to take his place - someone who would fast every day, pray all night, and never become angry. A young man accepted this 'kifl' (pledge/portion) and fulfilled it faithfully, earning the name Dhul-Kifl.",
  },
  {
    id: 'dhulkifl-9',
    type: 'narrative',
    order: 9,
    content: "According to this narration, Shaytan (Satan) tried repeatedly to make Dhul-Kifl break his pledge, especially the vow never to become angry. He would send people to annoy and provoke him, but Dhul-Kifl maintained his patience. Even when interrupted during his brief rest, even when tested at his most vulnerable moments, he remained calm and composed.",
  },
  {
    id: 'dhulkifl-10',
    type: 'narrative',
    order: 10,
    content: "One account describes how Shaytan appeared in the form of an old man seeking help with a dispute. He came three times, each time at the most inconvenient moment - once when Dhul-Kifl was about to sleep after a long night of prayer. Each time, Dhul-Kifl listened patiently without anger. When he finally realized the old man was Shaytan testing him, he remained steadfast. Allah honored his patience and made him a prophet.",
  },
  {
    id: 'dhulkifl-11',
    type: 'narrative',
    order: 11,
    content: "Whether this specific narrative is historically accurate or not, it teaches valuable lessons consistent with what the Quran tells us about Dhul-Kifl. He was patient - extraordinarily patient. He made commitments and kept them. He was righteous in his actions. And these qualities earned him a place among Allah's chosen prophets.",
  },
  {
    id: 'dhulkifl-12',
    type: 'narrative',
    order: 12,
    content: "The location associated with Dhul-Kifl also varies in tradition. Some place him in Babylon (modern Iraq), where a shrine exists attributed to him near the town of Kifl. Others connect him to the Levant (Sham) region. The historical uncertainty does not diminish his prophetic status - the Quran's testimony is sufficient confirmation.",
  },
  {
    id: 'dhulkifl-13',
    type: 'narrative',
    order: 13,
    content: "What we know with certainty from the Quran is profound enough: Dhul-Kifl was patient, he was righteous, he was admitted into Allah's mercy, and he is among the best of creation. These four attributes describe the essence of a prophet's character and mission.",
  },
  {
    id: 'dhulkifl-14',
    type: 'narrative',
    order: 14,
    content: "Patience (sabr) in Islam is not passive waiting but active endurance - persisting in obedience, resisting sin, and bearing hardship without complaint. Whatever trials Dhul-Kifl faced, he met them with this quality. His patience was not a single moment of fortitude but a lifelong characteristic.",
  },
  {
    id: 'dhulkifl-15',
    type: 'narrative',
    order: 15,
    content: "Righteousness (salah) encompasses doing good deeds, fulfilling obligations, and living in alignment with Allah's commands. Dhul-Kifl did not merely avoid sin; he actively pursued goodness. His righteousness earned him the description 'min as-salihin' - from among the righteous ones, a title shared by the greatest prophets.",
  },
  {
    id: 'dhulkifl-16',
    type: 'narrative',
    order: 16,
    content: "Being admitted into Allah's mercy (rahma) is the ultimate success. No matter what worldly achievements one might have, nothing compares to being enveloped in the mercy of the Creator. Dhul-Kifl achieved this, and it is mentioned specifically to assure us that his patient, righteous life was rewarded.",
  },
  {
    id: 'dhulkifl-17',
    type: 'narrative',
    order: 17,
    content: "Being among the 'akhyar' (the best, the outstanding) places Dhul-Kifl in the most elite company - the prophets and messengers, the friends of Allah, the martyrs and the truthful. This is not a rank achieved through worldly status but through sincere devotion to Allah.",
  },
  {
    id: 'dhulkifl-18',
    type: 'narrative',
    order: 18,
    content: "The story of Dhul-Kifl, though brief, carries important lessons for believers. First, one does not need to be famous to be honored by Allah. Dhul-Kifl is mentioned only twice in the Quran, yet he is counted among the greatest of creation. Allah sees what is hidden, and He honors sincere effort regardless of public recognition.",
  },
  {
    id: 'dhulkifl-19',
    type: 'narrative',
    order: 19,
    content: "Second, fulfilling one's commitments is a prophetic quality. If Dhul-Kifl earned his name from keeping a pledge, then his example teaches us the importance of honoring our promises. In a world where commitments are often broken, being someone who keeps their word is a noble distinction.",
  },
  {
    id: 'dhulkifl-20',
    type: 'narrative',
    order: 20,
    content: "Third, patience under pressure is a path to honor. If the narration about Shaytan's attempts to anger him is authentic, Dhul-Kifl's victory came not through dramatic miracles but through daily, consistent self-control. Sometimes the greatest battles are fought within, and the greatest victories are invisible to others.",
  },
  {
    id: 'dhulkifl-21',
    type: 'narrative',
    order: 21,
    content: "Finally, Dhul-Kifl reminds us that every prophet, known or unknown, famous or obscure, carries the same essential mission: calling people to worship Allah alone and to live righteously. The Quran mentions him to ensure we remember him, even if his story is not elaborated. In Allah's sight, he is among the best.",
  },
  {
    id: 'dhulkifl-22',
    type: 'narrative',
    order: 22,
    content: "Prophet Dhul-Kifl, the One of the Pledge, stands as a reminder that faithfulness matters, that patience is power, and that righteousness earns eternal honor. When we read his name in the Quran, we send peace upon him as we do upon all the prophets, honoring his place in the blessed chain that connects Adam to Muhammad, peace be upon them all.",
  },
];

// Export as single continuous story
export const dhulKiflSubStories: SubStory[] = [
  {
    id: 'dhulkifl-complete',
    prophetId: 'dhul-kifl',
    title: 'The Story of Prophet Dhul-Kifl',
    titleArabic: 'قصة نبي الله ذي الكفل',
    order: 1,
    estimatedReadTime: 8,
    content: dhulKiflStoryContent,
  },
];
