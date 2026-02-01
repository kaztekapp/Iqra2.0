// Story of Prophet Idris (إدريس) - The Truthful One
// Complete comprehensive story with Quran sources and authentic hadith

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const idrisStory: Prophet = {
  id: 'idris',
  nameEnglish: 'Idris',
  nameArabic: 'إدريس',
  order: 2,
  title: 'The Truthful One',
  titleArabic: 'الصديق',
  summary: 'One of the earliest prophets, known for his exceptional knowledge, patience, and righteousness. Allah raised him to a high station, honoring him for his devotion and truthfulness.',
  hasSubStories: false,
  lessons: [
    'The pursuit of knowledge is a noble and virtuous path',
    'Patience in worship and devotion is greatly rewarded',
    'Truthfulness elevates a person in rank with Allah',
    'Being the first to do good deeds brings special honor',
    'Allah raises those who dedicate themselves to His worship',
    'Teaching others beneficial knowledge is a lasting charity',
  ],
  estimatedReadTime: 15,
  quranMentions: 2,
  icon: '📚',
};

// Single comprehensive story content (no sub-stories)
export const idrisStoryContent: StoryContentBlock[] = [
  // ============ PART 1: THE LINEAGE AND EARLY LIFE ============
  {
    id: 'idris-1',
    type: 'narrative',
    order: 1,
    content: 'In the generations that followed Prophet Adam, peace be upon him, there emerged a man of exceptional piety and wisdom. His name was Idris, and he was among the earliest prophets sent to guide humanity. He lived in a time when the descendants of Adam had begun to spread across the earth, and the need for divine guidance was ever-present.',
  },
  {
    id: 'idris-2',
    type: 'narrative',
    order: 2,
    content: 'Prophet Idris was a descendant of Prophet Adam through the line of Shith (Seth). According to the scholars, he was the great-grandfather of Prophet Nuh (Noah). His original name, according to some scholars, was Akhnukh (Enoch), and he was called Idris because of his devotion to studying (darasa) the divine scriptures and knowledge.',
  },
  {
    id: 'idris-3',
    type: 'hadith_source',
    order: 3,
    content: 'The Prophet Muhammad, peace be upon him, mentioned meeting Idris during his miraculous Night Journey.',
    source: {
      type: 'hadith',
      collection: 'bukhari',
      narrator: 'Malik ibn Sa\'sa\'a',
      arabicText: 'ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ الرَّابِعَةِ فَإِذَا هُوَ بِإِدْرِيسَ قَالَ هَذَا إِدْرِيسُ فَسَلِّمْ عَلَيْهِ فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ',
      translation: 'Then he (Jibril) ascended with me to the fourth heaven, and there was Idris. He (Jibril) said, "This is Idris, so greet him." So I greeted him, and he returned the greeting, then said, "Welcome, O righteous brother and righteous Prophet."',
      grade: 'sahih',
    } as HadithReference,
  },

  // ============ PART 2: THE FIRST IN KNOWLEDGE ============
  {
    id: 'idris-4',
    type: 'narrative',
    order: 4,
    content: 'Prophet Idris was distinguished by his immense knowledge and his pioneering contributions to human civilization. The scholars mention that he was the first to write with a pen, the first to study astronomy and mathematics, and the first to sew clothes. Before him, people wore animal skins, but Idris taught them the craft of making proper garments.',
  },
  {
    id: 'idris-5',
    type: 'narrative',
    order: 5,
    content: 'Allah blessed Idris with knowledge of many sciences. He understood the movements of the stars and the calculation of time. He established systems of weights and measures. His knowledge was not merely for worldly benefit, but was connected to his worship of Allah, as he saw the signs of the Creator in all of creation.',
  },
  {
    id: 'idris-6',
    type: 'hadith_source',
    order: 6,
    content: 'Ibn Ishaq narrated regarding the pioneering knowledge of Idris.',
    source: {
      type: 'hadith',
      collection: 'other',
      narrator: 'Ibn Ishaq',
      arabicText: 'وَهُوَ أَوَّلُ مَنْ خَطَّ بِالْقَلَمِ وَأَوَّلُ مَنْ خَاطَ الثِّيَابَ وَلَبِسَهَا وَكَانُوا مِنْ قَبْلِهِ يَلْبَسُونَ الْجُلُودَ',
      translation: 'He (Idris) was the first to write with the pen, and the first to sew garments and wear them, for before him people used to wear animal skins.',
      grade: 'hasan',
    } as HadithReference,
  },

  // ============ PART 3: HIS WORSHIP AND DEVOTION ============
  {
    id: 'idris-7',
    type: 'narrative',
    order: 7,
    content: 'The worship of Prophet Idris was legendary in its intensity and sincerity. He would spend his days teaching people the ways of righteousness and calling them to worship Allah alone. His nights were devoted to prayer and contemplation. It was said that he combined the virtues of knowledge and action, never letting his learning become mere theory.',
  },
  {
    id: 'idris-8',
    type: 'narrative',
    order: 8,
    content: 'The scholars mention that Prophet Idris would fast during the day and spend the night in prayer. His devotion was so complete that the angels themselves were amazed at his dedication. Day after day, year after year, he maintained his worship without weakening or growing tired in his service to Allah.',
  },
  {
    id: 'idris-9',
    type: 'narrative',
    order: 9,
    content: 'Despite his elevated spiritual state, Prophet Idris did not neglect his duty to his people. He called them to the worship of Allah alone, warned them against shirk (associating partners with Allah), and taught them to pray and give charity. He was a complete example of a prophet who balanced personal worship with public guidance.',
  },

  // ============ PART 4: THE QURAN'S TESTIMONY ============
  {
    id: 'idris-10',
    type: 'narrative',
    order: 10,
    content: 'Allah mentions Prophet Idris in the Quran with words of the highest praise. He is described with two magnificent attributes: being truthful (siddiq) and being a prophet (nabi). These words from the Creator Himself testify to the exalted status of this noble servant.',
  },
  {
    id: 'idris-11',
    type: 'quran_source',
    order: 11,
    content: 'Allah describes Idris as a truthful prophet.',
    source: {
      type: 'quran',
      surahNumber: 19,
      surahNameEnglish: 'Maryam',
      surahNameArabic: 'مريم',
      ayahStart: 56,
      ayahEnd: 57,
      arabicText: 'وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا ﴿٥٦﴾ وَرَفَعْنَاهُ مَكَانًا عَلِيًّا ﴿٥٧﴾',
      translation: 'And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.',
    } as QuranReference,
  },
  {
    id: 'idris-12',
    type: 'narrative',
    order: 12,
    content: 'The title "Siddiq" (the truthful one) is among the highest honors in Islam. It was also given to Abu Bakr, the closest companion of Prophet Muhammad, peace be upon him. This title indicates not just speaking truth, but embodying truth in every aspect of one\'s being - in belief, in speech, and in action.',
  },

  // ============ PART 5: RAISED TO A HIGH STATION ============
  {
    id: 'idris-13',
    type: 'narrative',
    order: 13,
    content: 'Allah honored Prophet Idris by raising him to a high station. The scholars have discussed the meaning of this verse extensively. Some say it refers to his high rank in Paradise. Others say it refers to his being raised physically to the heavens. And some say it refers to his elevated status among the prophets.',
  },
  {
    id: 'idris-14',
    type: 'narrative',
    order: 14,
    content: 'What we know with certainty is that when Prophet Muhammad, peace be upon him, traveled through the heavens during the Night Journey (Isra and Miraj), he met Prophet Idris in the fourth heaven. This confirms that Idris was indeed raised to the heavens, whether during his lifetime or after his death.',
  },
  {
    id: 'idris-15',
    type: 'hadith_source',
    order: 15,
    content: 'The Prophet Muhammad described meeting Idris in the fourth heaven during the Miraj.',
    source: {
      type: 'hadith',
      collection: 'muslim',
      narrator: 'Anas ibn Malik',
      arabicText: 'ثُمَّ عَرَجَ بِنَا إِلَى السَّمَاءِ الرَّابِعَةِ فَاسْتَفْتَحَ جِبْرِيلُ فَقِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ فَفُتِحَ لَنَا فَإِذَا أَنَا بِإِدْرِيسَ فَرَحَّبَ وَدَعَا لِي بِخَيْرٍ',
      translation: 'Then he (Jibril) ascended with us to the fourth heaven, and Jibril sought permission to enter. It was said, "Who is this?" He said, "Jibril." It was said, "And who is with you?" He said, "Muhammad." So it was opened for us, and there was Idris. He welcomed me and prayed for good for me.',
      grade: 'sahih',
    } as HadithReference,
  },

  // ============ PART 6: AMONG THE PATIENT ONES ============
  {
    id: 'idris-16',
    type: 'narrative',
    order: 16,
    content: 'In another place in the Quran, Allah mentions Prophet Idris alongside other great prophets, praising them for their patience and righteousness. He is mentioned with Ismail and Dhul-Kifl, all of whom were known for their steadfastness in the face of trials.',
  },
  {
    id: 'idris-17',
    type: 'quran_source',
    order: 17,
    content: 'Allah mentions Idris among the patient and righteous.',
    source: {
      type: 'quran',
      surahNumber: 21,
      surahNameEnglish: 'Al-Anbiya',
      surahNameArabic: 'الأنبياء',
      ayahStart: 85,
      ayahEnd: 86,
      arabicText: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ ﴿٨٥﴾ وَأَدْخَلْنَاهُمْ فِي رَحْمَتِنَا ۖ إِنَّهُم مِّنَ الصَّالِحِينَ ﴿٨٦﴾',
      translation: 'And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.',
    } as QuranReference,
  },
  {
    id: 'idris-18',
    type: 'narrative',
    order: 18,
    content: 'The patience (sabr) mentioned here encompasses many meanings: patience in worshipping Allah, patience in avoiding sins, patience when facing hardship, and patience in calling people to the truth despite their rejection. Prophet Idris exemplified all of these forms of patience throughout his blessed life.',
  },

  // ============ PART 7: HIS MESSAGE AND TEACHINGS ============
  {
    id: 'idris-19',
    type: 'narrative',
    order: 19,
    content: 'Like all prophets, the core message of Idris was the worship of Allah alone without any partners. He called his people to pure monotheism (tawhid), to establish prayer, to give charity, and to prepare for the Day of Judgment. His teachings laid the foundation for the prophets who would come after him.',
  },
  {
    id: 'idris-20',
    type: 'narrative',
    order: 20,
    content: 'Prophet Idris taught his people about the importance of purifying the soul through worship and good deeds. He emphasized that this worldly life is temporary and that the real success lies in the Hereafter. He warned them against following their base desires and reminded them constantly of their meeting with their Lord.',
  },
  {
    id: 'idris-21',
    type: 'narrative',
    order: 21,
    content: 'The scholars mention that Prophet Idris established seventy-two languages among his people, enabling different groups to communicate and learn from one another. This gift of language was used to spread the message of truth far and wide, reaching different nations and peoples.',
  },

  // ============ PART 8: THE ANGEL OF DEATH ============
  {
    id: 'idris-22',
    type: 'narrative',
    order: 22,
    content: 'There is a famous narration about Prophet Idris and the Angel of Death. It is said that Idris had a close friendship with one of the angels, who would carry him up to the heavens. One day, they passed by the Angel of Death in the fourth heaven, and the Angel of Death looked at Idris with wonder.',
  },
  {
    id: 'idris-23',
    type: 'narrative',
    order: 23,
    content: 'When asked why he looked so strangely at Idris, the Angel of Death explained that he had been commanded to take the soul of Idris in the fourth heaven, yet he had found Idris still on earth. He wondered how this could be possible. But at that very moment, Idris was in the fourth heaven, and thus the decree of Allah was fulfilled.',
  },
  {
    id: 'idris-24',
    type: 'narrative',
    order: 24,
    content: 'This narration, while not from the most authentic sources, illustrates the scholars\' understanding that Prophet Idris was raised to the heavens and that his soul was taken there. It shows how Allah fulfills His decree in ways that may seem miraculous but are always according to His divine wisdom.',
  },

  // ============ PART 9: HIS LEGACY ============
  {
    id: 'idris-25',
    type: 'narrative',
    order: 25,
    content: 'Prophet Idris left behind a legacy that would benefit humanity for all time. The knowledge he pioneered - writing, sewing, astronomy, and more - became the foundation for human civilization. But more importantly, his example of combining knowledge with worship, and action with faith, remains a model for all believers.',
  },
  {
    id: 'idris-26',
    type: 'narrative',
    order: 26,
    content: 'The scholars say that Prophet Idris received thirty scrolls (suhuf) of divine revelation. These scriptures contained guidance for his people and emphasized the fundamental truths that all prophets would teach: belief in One God, accountability in the Hereafter, and the importance of righteous action.',
  },
  {
    id: 'idris-27',
    type: 'hadith_source',
    order: 27,
    content: 'The Prophet Muhammad mentioned the scriptures given to earlier prophets.',
    source: {
      type: 'hadith',
      collection: 'ahmad',
      narrator: 'Abu Dharr al-Ghifari',
      arabicText: 'أُنْزِلَ عَلَى إِدْرِيسَ ثَلَاثُونَ صَحِيفَةً',
      translation: 'Thirty scriptures were revealed to Idris.',
      grade: 'hasan',
    } as HadithReference,
  },

  // ============ PART 10: LESSONS FROM HIS LIFE ============
  {
    id: 'idris-28',
    type: 'narrative',
    order: 28,
    content: 'The story of Prophet Idris teaches us that true honor comes from knowledge and worship combined. He was not raised to a high station because of wealth or power, but because of his truthfulness, patience, and devotion to Allah. His example shows that spiritual elevation is available to all who sincerely seek it.',
  },
  {
    id: 'idris-29',
    type: 'narrative',
    order: 29,
    content: 'Prophet Idris also teaches us the value of being the first to do good. He was the first to write, the first to sew, the first to establish many beneficial practices. In Islam, the one who initiates a good practice receives the reward for everyone who follows that practice until the Day of Judgment.',
  },
  {
    id: 'idris-30',
    type: 'hadith_source',
    order: 30,
    content: 'The Prophet Muhammad spoke about the reward of initiating good practices.',
    source: {
      type: 'hadith',
      collection: 'muslim',
      narrator: 'Jarir ibn Abdullah',
      arabicText: 'مَنْ سَنَّ فِي الإِسْلاَمِ سُنَّةً حَسَنَةً فَلَهُ أَجْرُهَا وَأَجْرُ مَنْ عَمِلَ بِهَا بَعْدَهُ مِنْ غَيْرِ أَنْ يَنْقُصَ مِنْ أُجُورِهِمْ شَيْءٌ',
      translation: 'Whoever initiates a good practice in Islam will have its reward and the reward of everyone who acts upon it after him, without that detracting from their rewards in the slightest.',
      grade: 'sahih',
    } as HadithReference,
  },
  {
    id: 'idris-31',
    type: 'narrative',
    order: 31,
    content: 'Finally, Prophet Idris reminds us that patience is essential on the path to Allah. The Quran explicitly mentions him among "the patient ones." In our own lives, we face many trials and challenges. The example of Idris encourages us to remain steadfast, knowing that Allah is with those who are patient.',
  },
  {
    id: 'idris-32',
    type: 'narrative',
    order: 32,
    content: 'May Allah have mercy upon Prophet Idris, the truthful one, the patient one, the one raised to a high station. May we learn from his example of combining knowledge with worship, and may we strive to follow in his footsteps of truthfulness and patience. And may peace and blessings be upon all the prophets of Allah.',
  },
];

// Export sub-stories array (single story, no divisions)
export const idrisSubStories: SubStory[] = [
  {
    id: 'idris-main',
    prophetId: 'idris',
    title: 'The Story of Prophet Idris',
    titleArabic: 'قصة النبي إدريس',
    order: 1,
    content: idrisStoryContent,
    estimatedReadTime: 15,
  },
];
