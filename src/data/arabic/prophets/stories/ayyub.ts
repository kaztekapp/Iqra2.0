// Story of Prophet Ayyub (أيوب) - The Patient One
// Single continuous narrative with Quran sources

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const ayyubStory: Prophet = {
  id: 'ayyub',
  nameEnglish: 'Ayyub',
  nameArabic: 'أيوب',
  order: 12,
  title: 'The Patient One',
  titleArabic: 'الصابر',
  summary: "Prophet Ayyub (Job) is renowned for his extraordinary patience during severe trials. He was a wealthy, healthy man blessed with a large family. Allah tested him by taking away his health, wealth, and children, yet Ayyub remained steadfast in his faith, never complaining about Allah's decree. After years of suffering, Allah restored everything to him manifold, making his story an eternal example of patience and trust in Allah.",
  hasSubStories: false,
  lessons: [
    'True patience means accepting Allah\'s decree without complaint',
    'Trials are tests from Allah, not punishments for the righteous',
    'Turning to Allah in hardship is the mark of a true believer',
    'Allah\'s relief comes after patience and supplication',
    'Worldly blessings can be restored and multiplied after trials',
    'Satan tries to make believers despair during difficulties',
  ],
  estimatedReadTime: 15,
  quranMentions: 4,
  icon: '💪',
};

// Single continuous narrative
const ayyubStoryContent: StoryContentBlock[] = [
  {
    id: 'ayyub-1',
    type: 'narrative',
    order: 1,
    content: "Prophet Ayyub was a descendant of Prophet Ibrahim. He lived in the land of the Romans (some say in the area of modern-day Syria or Jordan). Allah had blessed him abundantly - he had vast wealth, extensive lands, many livestock, numerous children, and excellent health. Despite all these blessings, Ayyub was not arrogant. He was grateful to Allah and used his wealth to help the poor, orphans, and travelers.",
  },
  {
    id: 'ayyub-2',
    type: 'narrative',
    order: 2,
    content: "Ayyub was known for his devotion to Allah and his kindness to creation. He would feed the hungry, clothe the naked, and care for the sick. He was patient in worship and consistent in his gratitude. Allah loved him and praised him before the angels.",
  },
  {
    id: 'ayyub-3',
    type: 'quran_source',
    order: 3,
    content: "Allah describes Ayyub as an excellent servant who was constantly returning to Him.",
    source: {
      type: 'quran',
      surahNumber: 38,
      surahNameEnglish: 'Sad',
      surahNameArabic: 'ص',
      ayahStart: 44,
      ayahEnd: 44,
      arabicText: 'وَخُذْ بِيَدِكَ ضِغْثًا فَاضْرِب بِّهِ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ',
      translation: '"[We said], Take in your hand a bunch [of grass] and strike with it and do not break your oath." Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].',
    } as QuranReference,
  },
  {
    id: 'ayyub-4',
    type: 'narrative',
    order: 4,
    content: "Satan, the eternal enemy of mankind, became jealous of Ayyub's devotion. He claimed to Allah that Ayyub only worshipped Him because of his blessings. 'Take away his wealth,' Satan argued, 'and he will abandon You.' Allah, knowing Ayyub's true heart, allowed Satan to test him, to prove the sincerity of Ayyub's faith.",
  },
  {
    id: 'ayyub-5',
    type: 'narrative',
    order: 5,
    content: "The trials began. Ayyub's livestock perished. His lands became barren. His wealth vanished. Yet Ayyub responded with patience, saying, 'Allah gave and Allah has taken. To Him we belong and to Him we return.' He continued his worship without a single complaint.",
  },
  {
    id: 'ayyub-6',
    type: 'narrative',
    order: 6,
    content: "Satan was not satisfied. He asked to test Ayyub further. Then, one by one, Ayyub's children died in various calamities. The grief of losing a child is immense, yet Ayyub lost all of them. Still, he remained patient, his faith unshaken, his tongue praising Allah.",
  },
  {
    id: 'ayyub-7',
    type: 'narrative',
    order: 7,
    content: "Finally, Satan asked to afflict Ayyub's body. Allah permitted this final test. A terrible disease struck Ayyub. His body became covered with sores and wounds. His flesh deteriorated. People who once sought his company now fled from him, fearing contagion. Only his faithful wife remained by his side.",
  },
  {
    id: 'ayyub-8',
    type: 'narrative',
    order: 8,
    content: "For years - some narrations say seven years, others eighteen - Ayyub suffered. He was cast out of the city and lay on a garbage heap outside the town. His wife worked as a servant to support them, eventually selling her beautiful hair for bread. Through it all, Ayyub never once complained about Allah's decree.",
  },
  {
    id: 'ayyub-9',
    type: 'quran_source',
    order: 9,
    content: "Ayyub called upon his Lord, acknowledging his suffering but never complaining.",
    source: {
      type: 'quran',
      surahNumber: 21,
      surahNameEnglish: 'Al-Anbiya',
      surahNameArabic: 'الأنبياء',
      ayahStart: 83,
      ayahEnd: 83,
      arabicText: 'وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
      translation: 'And [mention] Ayyub, when he called to his Lord, "Indeed, adversity has touched me, and You are the Most Merciful of the merciful."',
    } as QuranReference,
  },
  {
    id: 'ayyub-10',
    type: 'narrative',
    order: 10,
    content: "Notice the beauty of Ayyub's supplication. He did not complain or demand. He simply stated his condition - 'adversity has touched me' - and then affirmed Allah's attribute of mercy. This is the model of how a believer should pray during hardship: acknowledging the difficulty while maintaining trust in Allah's mercy and wisdom.",
  },
  {
    id: 'ayyub-11',
    type: 'quran_source',
    order: 11,
    content: "In another verse, Ayyub mentioned Satan's role in his suffering.",
    source: {
      type: 'quran',
      surahNumber: 38,
      surahNameEnglish: 'Sad',
      surahNameArabic: 'ص',
      ayahStart: 41,
      ayahEnd: 42,
      arabicText: 'وَاذْكُرْ عَبْدَنَا أَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الشَّيْطَانُ بِنُصْبٍ وَعَذَابٍ ۝ ارْكُضْ بِرِجْلِكَ ۖ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ',
      translation: 'And remember Our servant Ayyub, when he called to his Lord, "Indeed, Satan has touched me with hardship and torment." [So he was told], "Strike [the ground] with your foot; this is a [spring for] a cool bath and drink."',
    } as QuranReference,
  },
  {
    id: 'ayyub-12',
    type: 'narrative',
    order: 12,
    content: "After years of patient endurance, Allah answered Ayyub's prayer. He commanded Ayyub to strike the ground with his foot. When he did, a spring of water gushed forth. Ayyub washed in it and drank from it, and his disease was completely healed. His body was restored to full health and strength.",
  },
  {
    id: 'ayyub-13',
    type: 'quran_source',
    order: 13,
    content: "Allah responded to Ayyub's patience and supplication.",
    source: {
      type: 'quran',
      surahNumber: 21,
      surahNameEnglish: 'Al-Anbiya',
      surahNameArabic: 'الأنبياء',
      ayahStart: 84,
      ayahEnd: 84,
      arabicText: 'فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَابِدِينَ',
      translation: 'So We responded to him and removed what afflicted him of adversity. And We gave him [back] his family and the like thereof with them as mercy from Us and a reminder for the worshippers [of Allah].',
    } as QuranReference,
  },
  {
    id: 'ayyub-14',
    type: 'narrative',
    order: 14,
    content: "Allah not only restored Ayyub's health but gave him back his family and doubled his blessings. His wealth returned greater than before. He was blessed with new children. According to some narrations, his deceased children were also given to him in the Hereafter. His patience had been rewarded beyond measure.",
  },
  {
    id: 'ayyub-15',
    type: 'narrative',
    order: 15,
    content: "There is a touching narration about Ayyub's wife. During his illness, in a moment of human weakness, she had once suggested to Ayyub that he ask Allah why this was happening to him. Ayyub was displeased and made an oath to discipline her if he recovered. But when he was healed, he did not want to hurt the wife who had served him faithfully.",
  },
  {
    id: 'ayyub-16',
    type: 'narrative',
    order: 16,
    content: "Allah, in His mercy, provided a way for Ayyub to fulfill his oath without harming his wife. He was told to take a bundle of grass and strike her lightly with it. This fulfilled the letter of his oath while showing mercy to his devoted companion. This is mentioned in Surah Sad, verse 44, showing Allah's consideration for both His servant's oath and his wife's faithful service.",
  },
  {
    id: 'ayyub-17',
    type: 'narrative',
    order: 17,
    content: "The story of Ayyub became legendary. His patience - called 'صبر أيوب' (the patience of Ayyub) - became a proverb in Arabic. When people face trials, they are reminded of Ayyub, who lost everything yet never lost his faith in Allah.",
  },
  {
    id: 'ayyub-18',
    type: 'quran_source',
    order: 18,
    content: "Allah mentions Ayyub among the guided prophets.",
    source: {
      type: 'quran',
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: 'الأنعام',
      ayahStart: 84,
      ayahEnd: 84,
      arabicText: 'وَوَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ ۚ كُلًّا هَدَيْنَا ۚ وَنُوحًا هَدَيْنَا مِن قَبْلُ ۖ وَمِن ذُرِّيَّتِهِ دَاوُودَ وَسُلَيْمَانَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَىٰ وَهَارُونَ ۚ وَكَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ',
      translation: 'And We gave to [Ibrahim] Ishaq and Yaqub - all [of them] We guided. And Nuh, We guided before; and among his descendants, Dawud and Sulayman and Ayyub and Yusuf and Musa and Harun. Thus do We reward the doers of good.',
    } as QuranReference,
  },
  {
    id: 'ayyub-19',
    type: 'hadith_source',
    order: 19,
    content: "The Prophet Muhammad ﷺ mentioned Ayyub's story.",
    source: {
      type: 'hadith',
      collection: 'bukhari',
      narrator: 'Abu Hurairah',
      arabicText: 'بَيْنَمَا أَيُّوبُ يَغْتَسِلُ عُرْيَانًا خَرَّ عَلَيْهِ رِجْلُ جَرَادٍ مِنْ ذَهَبٍ، فَجَعَلَ يَحْثِي فِي ثَوْبِهِ، فَنَادَاهُ رَبُّهُ: يَا أَيُّوبُ أَلَمْ أَكُنْ أَغْنَيْتُكَ عَمَّا تَرَى؟ قَالَ: بَلَى يَا رَبِّ، وَلَكِنْ لاَ غِنَى لِي عَنْ بَرَكَتِكَ',
      translation: 'While Ayyub was bathing naked, a swarm of golden locusts fell on him, and he started collecting them in his garment. His Lord called him, "O Ayyub! Have I not made you rich enough to dispense with what you see?" He said, "Yes, my Lord! But I cannot dispense with Your blessings."',
      grade: 'sahih',
    } as HadithReference,
  },
  {
    id: 'ayyub-20',
    type: 'narrative',
    order: 20,
    content: "This beautiful hadith shows Ayyub's character even after his restoration. When Allah showered him with golden locusts, Ayyub eagerly gathered them. When Allah asked if He hadn't already made him wealthy enough, Ayyub's response was perfect: he could never have enough of Allah's blessings. This is the heart of a grateful servant.",
  },
  {
    id: 'ayyub-21',
    type: 'narrative',
    order: 21,
    content: "The lessons from Ayyub's story are profound. First, trials can come to the most righteous people - they are not punishments but tests and opportunities to demonstrate faith. Second, true patience means not complaining about Allah's decree to His creation while turning to Him alone in supplication. Third, Allah's help comes at the appointed time, and after hardship comes ease.",
  },
  {
    id: 'ayyub-22',
    type: 'narrative',
    order: 22,
    content: "Prophet Ayyub lived a long life after his recovery, continuing to worship Allah and call people to His way. He passed away as a righteous prophet, his story preserved in the Quran as an eternal example of patience. Whenever believers face trials, they remember Ayyub - who lost everything but never lost faith, and who was rewarded with more than he had ever possessed.",
  },
];

// Export as single continuous story
export const ayyubSubStories: SubStory[] = [
  {
    id: 'ayyub-complete',
    prophetId: 'ayyub',
    title: 'The Story of Prophet Ayyub',
    titleArabic: 'قصة نبي الله أيوب',
    order: 1,
    estimatedReadTime: 15,
    content: ayyubStoryContent,
  },
];
