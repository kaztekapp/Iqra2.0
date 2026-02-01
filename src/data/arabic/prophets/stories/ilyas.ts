// Story of Prophet Ilyas (إلياس) - The Zealous Preacher
// Single continuous narrative with Quran sources

import { Prophet, SubStory, StoryContentBlock, QuranReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const ilyasStory: Prophet = {
  id: 'ilyas',
  nameEnglish: 'Ilyas',
  nameArabic: 'إلياس',
  order: 19,
  title: 'The Zealous Preacher',
  titleArabic: 'الداعي الغيور',
  summary: "Prophet Ilyas (Elijah) was sent to the people of Israel when they had fallen into worship of the idol Ba'l (Baal) during the reign of King Ahab and his wife Jezebel. With fiery zeal, he called his people to abandon their idols and return to the worship of Allah alone, the Best of Creators. Though many rejected him, he persisted in his mission until Allah raised him. The Quran honors him among the messengers and sends peace upon 'Il-Yasin' (Elijah/his followers). His story demonstrates the importance of standing firm against popular falsehood.",
  hasSubStories: false,
  lessons: [
    'Standing against popular falsehood requires courage',
    'True faith means worshipping Allah alone, not following majority',
    'Prophets face rejection but must persist in their mission',
    'Allah honors those who uphold His message against opposition',
    'Idol worship in any form must be confronted',
    'The righteous will be rewarded regardless of worldly outcomes',
  ],
  estimatedReadTime: 8,
  quranMentions: 2,
  icon: '🔥',
};

// Single continuous narrative
const ilyasStoryContent: StoryContentBlock[] = [
  {
    id: 'ilyas-1',
    type: 'narrative',
    order: 1,
    content: "Prophet Ilyas (known as Elijah in the Biblical tradition) lived during a dark period in Israelite history. After the golden age of Dawud and Sulayman, the kingdom had split, and many people had fallen into idol worship. The northern kingdom of Israel, under King Ahab and his pagan wife Jezebel, had embraced the worship of Ba'l, a Canaanite deity associated with storms and fertility.",
  },
  {
    id: 'ilyas-2',
    type: 'narrative',
    order: 2,
    content: "Ba'l worship involved elaborate rituals, sacrifices, and even immoral practices. The people had abandoned the pure monotheism of their ancestors - Ibrahim, Musa, and Dawud - for this false god. Temples to Ba'l were built throughout the land, and the worship of Allah was suppressed. Into this environment of spiritual corruption, Allah sent His prophet Ilyas.",
  },
  {
    id: 'ilyas-3',
    type: 'quran_source',
    order: 3,
    content: "Allah mentions Ilyas calling his people away from Ba'l worship.",
    source: {
      type: 'quran',
      surahNumber: 37,
      surahNameEnglish: 'As-Saffat',
      surahNameArabic: 'الصافات',
      ayahStart: 123,
      ayahEnd: 126,
      arabicText: 'وَإِنَّ إِلْيَاسَ لَمِنَ الْمُرْسَلِينَ ۝ إِذْ قَالَ لِقَوْمِهِ أَلَا تَتَّقُونَ ۝ أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ الْخَالِقِينَ ۝ اللَّهَ رَبَّكُمْ وَرَبَّ آبَائِكُمُ الْأَوَّلِينَ',
      translation: 'And indeed, Ilyas was from among the messengers, when he said to his people, "Will you not fear Allah? Do you call upon Ba\'l and leave the Best of Creators - Allah, your Lord and the Lord of your first forefathers?"',
    } as QuranReference,
  },
  {
    id: 'ilyas-4',
    type: 'narrative',
    order: 4,
    content: "Ilyas's message was clear and direct: How could they worship Ba'l and abandon Allah, the Best of Creators? He reminded them that Allah was not just some abstract deity but their Lord and the Lord of their ancestors. Their forefathers - the great prophets and righteous people of Israel - had all worshipped Allah alone. The people were betraying their own heritage.",
  },
  {
    id: 'ilyas-5',
    type: 'narrative',
    order: 5,
    content: "The phrase 'Ahsan al-Khaliqin' (Best of Creators) is significant. While humans can 'create' in a limited sense (making objects, crafting art), only Allah is the true Creator who brings existence from non-existence. To worship anything created, while ignoring the Creator, is the height of foolishness. Ilyas made this logic crystal clear.",
  },
  {
    id: 'ilyas-6',
    type: 'quran_source',
    order: 6,
    content: "Despite his efforts, most people rejected Ilyas.",
    source: {
      type: 'quran',
      surahNumber: 37,
      surahNameEnglish: 'As-Saffat',
      surahNameArabic: 'الصافات',
      ayahStart: 127,
      ayahEnd: 128,
      arabicText: 'فَكَذَّبُوهُ فَإِنَّهُمْ لَمُحْضَرُونَ ۝ إِلَّا عِبَادَ اللَّهِ الْمُخْلَصِينَ',
      translation: 'And they denied him, so indeed, they will be brought [for punishment], except the chosen servants of Allah.',
    } as QuranReference,
  },
  {
    id: 'ilyas-7',
    type: 'narrative',
    order: 7,
    content: "The majority rejected Ilyas's message. They were too attached to their idol worship, too influenced by their corrupt leaders, too comfortable in their false traditions. But the verse carries both warning and hope: those who denied him will face punishment, but the sincere servants of Allah - those who believed and followed Ilyas - were saved from this fate.",
  },
  {
    id: 'ilyas-8',
    type: 'quran_source',
    order: 8,
    content: "Allah honored Ilyas and preserved his good name.",
    source: {
      type: 'quran',
      surahNumber: 37,
      surahNameEnglish: 'As-Saffat',
      surahNameArabic: 'الصافات',
      ayahStart: 129,
      ayahEnd: 132,
      arabicText: 'وَتَرَكْنَا عَلَيْهِ فِي الْآخِرِينَ ۝ سَلَامٌ عَلَىٰ إِلْ يَاسِينَ ۝ إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ ۝ إِنَّهُ مِنْ عِبَادِنَا الْمُؤْمِنِينَ',
      translation: 'And We left for him [favorable mention] among later generations: "Peace upon Il-Yasin." Indeed, We thus reward the doers of good. Indeed, he was of Our believing servants.',
    } as QuranReference,
  },
  {
    id: 'ilyas-9',
    type: 'narrative',
    order: 9,
    content: "The phrase 'Salam ala Il-Yasin' (Peace upon Il-Yasin) is interpreted by scholars in different ways. Some say 'Il-Yasin' is a variant pronunciation of Ilyas. Others suggest it refers to Ilyas and his followers (the family/group of Ilyas). Either way, Allah sends peace upon him, honoring him for eternity. His good name was preserved 'among later generations' - and here we are, still remembering him.",
  },
  {
    id: 'ilyas-10',
    type: 'quran_source',
    order: 10,
    content: "Allah lists Ilyas among the guided prophets.",
    source: {
      type: 'quran',
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: 'الأنعام',
      ayahStart: 85,
      ayahEnd: 85,
      arabicText: 'وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ الصَّالِحِينَ',
      translation: 'And Zakariya and Yahya and Isa and Ilyas - each was of the righteous.',
    } as QuranReference,
  },
  {
    id: 'ilyas-11',
    type: 'narrative',
    order: 11,
    content: "In this powerful verse, Ilyas is mentioned alongside Zakariya, Yahya, and Isa - prophets who came centuries after him. All are described as 'min as-salihin' (among the righteous). This places Ilyas in the most noble company, affirming his status as one of Allah's chosen messengers.",
  },
  {
    id: 'ilyas-12',
    type: 'narrative',
    order: 12,
    content: "According to historical accounts, Ilyas lived during the 9th century BCE. His confrontation with Ba'l worship was dramatic and often miraculous. Tradition tells of him challenging the prophets of Ba'l to a contest: both would prepare a sacrifice, and the true God would send fire from heaven to consume it. Ba'l's prophets called upon their idol all day with no response, while Ilyas's prayer to Allah was immediately answered with fire.",
  },
  {
    id: 'ilyas-13',
    type: 'narrative',
    order: 13,
    content: "Ilyas also prophesied a severe drought as punishment for the people's idol worship. For years, no rain fell on the land. The drought demonstrated Ba'l's impotence - if he was supposedly the god of storms and rain, why could he not provide water for his worshippers? Only when Ilyas prayed to Allah did the rains return.",
  },
  {
    id: 'ilyas-14',
    type: 'narrative',
    order: 14,
    content: "Queen Jezebel, the driving force behind Ba'l worship, sought to kill Ilyas. He was forced to flee and hide, experiencing periods of intense loneliness and danger. Yet he persisted, continuing to preach the message of tawhid (monotheism) wherever he could find listeners. A small community of believers gathered around him.",
  },
  {
    id: 'ilyas-15',
    type: 'narrative',
    order: 15,
    content: "According to various traditions, Ilyas did not die a natural death but was raised by Allah. Some narrations suggest he was taken up in a whirlwind or chariot of fire. Whether this is literal or metaphorical, the point is clear: Allah honored His faithful servant who had stood firm against overwhelming opposition.",
  },
  {
    id: 'ilyas-16',
    type: 'narrative',
    order: 16,
    content: "Ilyas prepared his successor, Al-Yasa (Elisha), to continue the prophetic mission. Before his departure, he passed on his spiritual authority and blessed Al-Yasa to carry on the work of calling people to Allah. The prophetic chain continued, as it always did, with one generation passing the torch to the next.",
  },
  {
    id: 'ilyas-17',
    type: 'narrative',
    order: 17,
    content: "The lessons from Ilyas's story remain relevant today. First, truth is not determined by majority opinion. Even when most people embrace falsehood, a believer must stand firm. Second, courage in the face of power is a prophetic quality. Ilyas confronted kings and queens with the message of Allah, fearing only his Lord.",
  },
  {
    id: 'ilyas-18',
    type: 'narrative',
    order: 18,
    content: "Third, false gods - whether ancient idols or modern substitutes - cannot help their worshippers. Ba'l could not bring rain or respond to prayers. Whatever people worship besides Allah - whether wealth, power, fame, or ideology - is equally impotent. Only Allah, 'Ahsan al-Khaliqin' (the Best of Creators), deserves worship.",
  },
  {
    id: 'ilyas-19',
    type: 'narrative',
    order: 19,
    content: "Finally, Ilyas teaches us that success is not measured by numbers of followers but by faithfulness to the message. Though most rejected him, he fulfilled his mission. Allah preserved his good name, sent peace upon him, and counted him among His believing servants. That is the only success that truly matters.",
  },
  {
    id: 'ilyas-20',
    type: 'narrative',
    order: 20,
    content: "Prophet Ilyas, the zealous preacher who stood alone against Ba'l worship, remains an inspiration for all who must speak truth in the face of popular falsehood. When we read his name in the Quran and send peace upon him, we connect with a legacy of courage and conviction that stretches back through the ages.",
  },
];

// Export as single continuous story
export const ilyasSubStories: SubStory[] = [
  {
    id: 'ilyas-complete',
    prophetId: 'ilyas',
    title: 'The Story of Prophet Ilyas',
    titleArabic: 'قصة نبي الله إلياس',
    order: 1,
    estimatedReadTime: 8,
    content: ilyasStoryContent,
  },
];
