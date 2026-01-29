// Comprehensive Juz Learning Content
// Interactive lessons covering all 30 Juz of the Quran

export interface JuzLesson {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  alternativeName?: string;
  startSurah: string;
  startVerse: number;
  endSurah: string;
  endVerse: number;
  totalSurahs: number;
  keyThemes: string[];
  highlights: string[];
  famousVerses: {
    arabic: string;
    translation: string;
    reference: string;
  }[];
  memorization: {
    difficulty: 'easy' | 'medium' | 'hard';
    tips: string[];
    estimatedDays: number;
  };
  stories?: string[];
}

export interface JuzIntroLesson {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  content: {
    type: 'text' | 'fact' | 'tip' | 'example';
    text: string;
    icon?: string;
  }[];
}

// Introduction lessons about the Juz system
export const JUZ_INTRO_LESSONS: JuzIntroLesson[] = [
  {
    id: 'intro_what_is_juz',
    title: 'What is a Juz?',
    titleArabic: 'ما هو الجزء؟',
    description: 'Understanding the division of the Quran',
    content: [
      {
        type: 'text',
        text: 'A Juz (جزء) is one of 30 parts of roughly equal length into which the Quran is divided. The word "Juz" literally means "part" or "portion" in Arabic.',
      },
      {
        type: 'fact',
        text: 'The Quran has 30 Juz, 60 Hizb, and 240 quarters (Rub).',
        icon: 'information-circle',
      },
      {
        type: 'text',
        text: 'This division was created by scholars after the Prophet\'s time to make it easier to complete the Quran in one month, especially during Ramadan - reading one Juz per day.',
      },
      {
        type: 'tip',
        text: 'Many Muslims aim to read one Juz per day during Ramadan to complete the entire Quran in the month.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_structure',
    title: 'Structure of a Juz',
    titleArabic: 'هيكل الجزء',
    description: 'How each Juz is organized',
    content: [
      {
        type: 'text',
        text: 'Each Juz is further divided into smaller sections to facilitate reading and memorization:',
      },
      {
        type: 'example',
        text: '1 Juz = 2 Hizb (أحزاب)\n1 Hizb = 4 Quarters (أرباع)',
        icon: 'layers',
      },
      {
        type: 'fact',
        text: 'In Quran copies, you\'ll see symbols marking: Juz (۞), Hizb (حزب), and Quarter (ربع).',
        icon: 'bookmark',
      },
      {
        type: 'tip',
        text: 'Use these markers to track your progress and set daily reading goals.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_naming',
    title: 'How Juz are Named',
    titleArabic: 'تسمية الأجزاء',
    description: 'Understanding Juz names',
    content: [
      {
        type: 'text',
        text: 'Each Juz is traditionally named after its first word or phrase. This helps in quick identification and reference.',
      },
      {
        type: 'example',
        text: 'Juz 1: "Alif Lam Mim" (ألم)\nJuz 30: "Amma" (عمّ)\nJuz 29: "Tabarak" (تبارك)',
        icon: 'text',
      },
      {
        type: 'fact',
        text: 'Juz 30 is called "Juz Amma" because it starts with Surah An-Naba which begins with "عَمَّ يَتَسَاءَلُونَ" (What are they asking about?).',
        icon: 'information-circle',
      },
      {
        type: 'tip',
        text: 'Learning the Juz names helps you quickly locate verses and track your memorization progress.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_memorization',
    title: 'Memorization Journey',
    titleArabic: 'رحلة الحفظ',
    description: 'Tips for memorizing the Quran by Juz',
    content: [
      {
        type: 'text',
        text: 'Most people begin their memorization journey with Juz 30 (Juz Amma) because it contains the shortest and most commonly recited Surahs.',
      },
      {
        type: 'tip',
        text: 'Recommended order for beginners:\n1. Juz 30 (Juz Amma)\n2. Juz 29 (Tabarak)\n3. Juz 1 (Al-Fatiha & Al-Baqarah)',
        icon: 'footsteps',
      },
      {
        type: 'fact',
        text: 'A person who memorizes the entire Quran is called a "Hafiz" (حافظ) for males or "Hafiza" (حافظة) for females.',
        icon: 'medal',
      },
      {
        type: 'text',
        text: 'The key to successful memorization is consistency. Even 15-20 minutes of focused daily practice is better than hours of occasional study.',
      },
    ],
  },
  {
    id: 'intro_reading_plan',
    title: '30-Day Reading Plan',
    titleArabic: 'خطة القراءة',
    description: 'Complete the Quran in one month',
    content: [
      {
        type: 'text',
        text: 'The Juz system makes it simple to complete the Quran in exactly 30 days by reading one Juz per day.',
      },
      {
        type: 'example',
        text: 'Daily breakdown:\n• After Fajr: 4 pages\n• After Dhuhr: 4 pages\n• After Asr: 4 pages\n• After Maghrib: 4 pages\n• After Isha: 4 pages\n= 20 pages = 1 Juz',
        icon: 'time',
      },
      {
        type: 'tip',
        text: 'Each Juz is approximately 20 pages in a standard Mushaf (Quran copy).',
        icon: 'bulb',
      },
      {
        type: 'fact',
        text: 'During Ramadan, the Taraweeh prayers in many mosques are designed to complete one Juz per night.',
        icon: 'moon',
      },
    ],
  },
];

// Detailed information for all 30 Juz
export const JUZ_LESSONS: JuzLesson[] = [
  {
    id: 1,
    nameArabic: 'ألم',
    nameEnglish: 'Alif Lam Mim',
    startSurah: 'Al-Fatiha',
    startVerse: 1,
    endSurah: 'Al-Baqarah',
    endVerse: 141,
    totalSurahs: 2,
    keyThemes: [
      'Introduction to guidance',
      'Categories of people (believers, disbelievers, hypocrites)',
      'Story of Adam and Iblis',
      'Story of Bani Israel',
    ],
    highlights: [
      'Contains Al-Fatiha - the most recited Surah',
      'Introduces the theme of guidance vs. misguidance',
      'Describes three types of people in detail',
    ],
    famousVerses: [
      {
        arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        translation: 'All praise is for Allah, Lord of all worlds',
        reference: 'Al-Fatiha 1:2',
      },
      {
        arabic: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ',
        translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah',
        reference: 'Al-Baqarah 2:2',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Master Al-Fatiha first - it\'s required for every prayer',
        'Break Al-Baqarah into small sections (10 verses at a time)',
        'Focus on understanding the stories to aid memorization',
      ],
      estimatedDays: 60,
    },
    stories: [
      'Creation of Adam',
      'Adam and Iblis (Satan)',
      'Bani Israel and Musa',
    ],
  },
  {
    id: 2,
    nameArabic: 'سيقول',
    nameEnglish: 'Sayaqool',
    startSurah: 'Al-Baqarah',
    startVerse: 142,
    endSurah: 'Al-Baqarah',
    endVerse: 252,
    totalSurahs: 1,
    keyThemes: [
      'Change of Qiblah',
      'Fasting and Ramadan',
      'Hajj rituals',
      'Fighting in the cause of Allah',
    ],
    highlights: [
      'Contains verses about changing Qiblah to Makkah',
      'Fasting in Ramadan made obligatory',
      'Rules of Hajj and Umrah',
    ],
    famousVerses: [
      {
        arabic: 'وَإِلَـٰهُكُمْ إِلَـٰهٌۭ وَٰحِدٌۭ ۖ لَّآ إِلَـٰهَ إِلَّا هُوَ ٱلرَّحْمَـٰنُ ٱلرَّحِيمُ',
        translation: 'Your God is one God. There is no deity except Him, the Most Merciful.',
        reference: 'Al-Baqarah 2:163',
      },
      {
        arabic: 'شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ',
        translation: 'The month of Ramadan in which the Quran was revealed',
        reference: 'Al-Baqarah 2:185',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn the Qiblah verses to understand Islamic history',
        'Memorize the fasting verses before Ramadan',
        'Focus on thematic sections',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 3,
    nameArabic: 'تلك الرسل',
    nameEnglish: 'Tilka\'r-Rusul',
    startSurah: 'Al-Baqarah',
    startVerse: 253,
    endSurah: 'Al-Imran',
    endVerse: 92,
    totalSurahs: 2,
    keyThemes: [
      'Financial transactions and charity',
      'The greatest verse - Ayat al-Kursi',
      'No compulsion in religion',
      'Family of Imran',
    ],
    highlights: [
      'Contains Ayat al-Kursi - the greatest verse',
      'Prohibition of Riba (usury)',
      'Story of Maryam\'s birth',
    ],
    famousVerses: [
      {
        arabic: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence',
        reference: 'Al-Baqarah 2:255 (Ayat al-Kursi)',
      },
      {
        arabic: 'لَآ إِكْرَاهَ فِى ٱلدِّينِ',
        translation: 'There is no compulsion in religion',
        reference: 'Al-Baqarah 2:256',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Prioritize Ayat al-Kursi - recited for protection',
        'Learn the last two verses of Al-Baqarah',
        'Understand financial rulings to remember them',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Birth of Maryam',
      'Zakariyya and Yahya',
    ],
  },
  {
    id: 4,
    nameArabic: 'لن تنالوا',
    nameEnglish: 'Lan Tanaloo',
    startSurah: 'Al-Imran',
    startVerse: 93,
    endSurah: 'An-Nisa',
    endVerse: 23,
    totalSurahs: 2,
    keyThemes: [
      'Battle of Uhud lessons',
      'Unity of the Muslim Ummah',
      'Women\'s rights in Islam',
      'Inheritance laws',
    ],
    highlights: [
      'Detailed account of Battle of Uhud',
      'Beginning of Surah An-Nisa (Women)',
      'Inheritance laws introduction',
    ],
    famousVerses: [
      {
        arabic: 'لَن تَنَالُوا۟ ٱلْبِرَّ حَتَّىٰ تُنفِقُوا۟ مِمَّا تُحِبُّونَ',
        translation: 'You will never attain righteousness until you spend from what you love',
        reference: 'Al-Imran 3:92',
      },
    ],
    memorization: {
      difficulty: 'hard',
      tips: [
        'Study the Battle of Uhud to understand context',
        'Learn inheritance verses with a teacher',
        'Break into thematic sections',
      ],
      estimatedDays: 55,
    },
    stories: [
      'Battle of Uhud',
      'Story of the archers\' mistake',
    ],
  },
  {
    id: 5,
    nameArabic: 'والمحصنات',
    nameEnglish: 'Wal-Muhsanat',
    startSurah: 'An-Nisa',
    startVerse: 24,
    endSurah: 'An-Nisa',
    endVerse: 147,
    totalSurahs: 1,
    keyThemes: [
      'Marriage laws',
      'Treatment of women',
      'Justice and fairness',
      'Hypocrites\' characteristics',
    ],
    highlights: [
      'Detailed marriage regulations',
      'Rights of women emphasized',
      'Description of hypocrites',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّ ٱللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا۟ ٱلْأَمَـٰنَـٰتِ إِلَىٰٓ أَهْلِهَا',
        translation: 'Indeed, Allah commands you to render trusts to whom they are due',
        reference: 'An-Nisa 4:58',
      },
    ],
    memorization: {
      difficulty: 'hard',
      tips: [
        'Focus on legal verses with understanding',
        'Use the thematic structure to organize',
        'Review regularly as content is detailed',
      ],
      estimatedDays: 50,
    },
  },
  {
    id: 6,
    nameArabic: 'لا يحب الله',
    nameEnglish: 'La Yuhibb-Allah',
    startSurah: 'An-Nisa',
    startVerse: 148,
    endSurah: 'Al-Maidah',
    endVerse: 81,
    totalSurahs: 2,
    keyThemes: [
      'People of the Book',
      'Isa (Jesus) in Islam',
      'Food laws (Halal/Haram)',
      'Wudu and purification',
    ],
    highlights: [
      'Islamic perspective on Jesus',
      'Beginning of Surah Al-Maidah',
      'Rules of purification for prayer',
    ],
    famousVerses: [
      {
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا قُمْتُمْ إِلَى ٱلصَّلَوٰةِ فَٱغْسِلُوا۟ وُجُوهَكُمْ',
        translation: 'O you who believe, when you rise for prayer, wash your faces...',
        reference: 'Al-Maidah 5:6',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn wudu verses as they\'re practically used',
        'Understand the halal/haram food verses',
        'Connect to daily practices',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 7,
    nameArabic: 'وإذا سمعوا',
    nameEnglish: 'Wa Idha Sami\'oo',
    startSurah: 'Al-Maidah',
    startVerse: 82,
    endSurah: 'Al-An\'am',
    endVerse: 110,
    totalSurahs: 2,
    keyThemes: [
      'Oaths and expiation',
      'Intoxicants and gambling prohibited',
      'Tawheed (Oneness of Allah)',
      'Arguments against polytheism',
    ],
    highlights: [
      'Prohibition of alcohol and gambling',
      'Story of the table from heaven',
      'Powerful arguments for monotheism',
    ],
    famousVerses: [
      {
        arabic: 'ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ',
        translation: 'Today I have perfected your religion for you',
        reference: 'Al-Maidah 5:3',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Focus on the prohibition verses',
        'Study Surah Al-An\'am\'s arguments',
        'Connect themes between the two Surahs',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The Table Spread (Al-Ma\'idah)',
    ],
  },
  {
    id: 8,
    nameArabic: 'ولو أننا',
    nameEnglish: 'Wa Law Annana',
    startSurah: 'Al-An\'am',
    startVerse: 111,
    endSurah: 'Al-A\'raf',
    endVerse: 87,
    totalSurahs: 2,
    keyThemes: [
      'Divine guidance',
      'Stories of previous prophets',
      'Warning against following desires',
      'Story of Adam and Iblis expanded',
    ],
    highlights: [
      'Detailed story of Iblis refusing to prostrate',
      'Beginning of Prophet stories in Al-A\'raf',
      'Lessons from previous nations',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ إِنَّ صَلَاتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        translation: 'Say: My prayer and sacrifice, my living and dying are for Allah, Lord of the worlds',
        reference: 'Al-An\'am 6:162',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Study the prophet stories for context',
        'Learn the dialogue between Allah and Iblis',
        'Focus on connecting verses',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Adam and Iblis in detail',
      'Beginning of Noah\'s story',
    ],
  },
  {
    id: 9,
    nameArabic: 'قال الملأ',
    nameEnglish: 'Qalal-Mala\'',
    startSurah: 'Al-A\'raf',
    startVerse: 88,
    endSurah: 'Al-Anfal',
    endVerse: 40,
    totalSurahs: 2,
    keyThemes: [
      'Stories of Nuh, Hud, Salih, Lut, Shu\'ayb',
      'Story of Musa and Fir\'awn',
      'Battle of Badr',
      'Rules of war and peace',
    ],
    highlights: [
      'Comprehensive prophet stories',
      'Beginning of Surah Al-Anfal',
      'Battle of Badr introduction',
    ],
    famousVerses: [
      {
        arabic: 'إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَٱسْتَجَابَ لَكُمْ',
        translation: 'When you asked help of your Lord, and He answered you',
        reference: 'Al-Anfal 8:9',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn each prophet\'s story as a unit',
        'Understand the pattern of rejection and punishment',
        'Connect to Battle of Badr narratives',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Nuh (Noah) and his people',
      'Hud and \'Ad',
      'Salih and Thamud',
      'Lut and his people',
      'Shu\'ayb and Madyan',
      'Musa and Fir\'awn begins',
    ],
  },
  {
    id: 10,
    nameArabic: 'واعلموا',
    nameEnglish: 'Wa\'lamoo',
    startSurah: 'Al-Anfal',
    startVerse: 41,
    endSurah: 'At-Tawbah',
    endVerse: 92,
    totalSurahs: 2,
    keyThemes: [
      'War booty distribution',
      'Treaty of Hudaybiyyah context',
      'Repentance and forgiveness',
      'Hypocrites exposed',
    ],
    highlights: [
      'Rules for war spoils',
      'Surah At-Tawbah - no Bismillah',
      'Declaration against polytheists',
    ],
    famousVerses: [
      {
        arabic: 'وَأَعِدُّوا۟ لَهُم مَّا ٱسْتَطَعْتُم مِّن قُوَّةٍۢ',
        translation: 'And prepare against them whatever you are able of power',
        reference: 'Al-Anfal 8:60',
      },
    ],
    memorization: {
      difficulty: 'hard',
      tips: [
        'Note that At-Tawbah has no Bismillah',
        'Study historical context of revelation',
        'Focus on repentance themes',
      ],
      estimatedDays: 50,
    },
  },
  // Juz 11-20
  {
    id: 11,
    nameArabic: 'يعتذرون',
    nameEnglish: 'Ya\'tadhiroon',
    startSurah: 'At-Tawbah',
    startVerse: 93,
    endSurah: 'Hud',
    endVerse: 5,
    totalSurahs: 3,
    keyThemes: [
      'Hypocrites\' excuses',
      'True believers\' characteristics',
      'Story of Prophet Yunus',
      'Warning of punishment',
    ],
    highlights: [
      'End of Surah At-Tawbah',
      'Beginning of Surah Yunus',
      'Story of Yunus (Jonah)',
    ],
    famousVerses: [
      {
        arabic: 'أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
        translation: 'Unquestionably, for the allies of Allah there is no fear, nor shall they grieve',
        reference: 'Yunus 10:62',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Focus on the contrast between believers and hypocrites',
        'Learn the story of Yunus',
        'Note the transition between Surahs',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Prophet Yunus and the whale',
    ],
  },
  {
    id: 12,
    nameArabic: 'وما من دابة',
    nameEnglish: 'Wa Ma Min Dabbah',
    startSurah: 'Hud',
    startVerse: 6,
    endSurah: 'Yusuf',
    endVerse: 52,
    totalSurahs: 2,
    keyThemes: [
      'Prophet stories continued',
      'Story of Nuh in detail',
      'Beginning of Yusuf\'s story',
      'Trust in Allah\'s provision',
    ],
    highlights: [
      'The Ark of Nuh',
      'Beginning of the most beautiful story - Yusuf',
      'Dreams and their interpretation',
    ],
    famousVerses: [
      {
        arabic: 'نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ ٱلْقَصَصِ',
        translation: 'We narrate to you the best of stories',
        reference: 'Yusuf 12:3',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Surah Yusuf is one continuous story - easier to memorize',
        'Learn Yusuf\'s story in sequence',
        'Focus on the dream interpretations',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Nuh and the Flood (detailed)',
      'Yusuf\'s dream and brothers\' jealousy',
      'Yusuf thrown in the well',
      'Yusuf in Egypt - beginning',
    ],
  },
  {
    id: 13,
    nameArabic: 'وما أبرئ',
    nameEnglish: 'Wa Ma Ubarri\'',
    startSurah: 'Yusuf',
    startVerse: 53,
    endSurah: 'Ibrahim',
    endVerse: 52,
    totalSurahs: 3,
    keyThemes: [
      'Yusuf\'s story conclusion',
      'Thunder and lightning as signs',
      'Ibrahim\'s prayers',
      'Patience and gratitude',
    ],
    highlights: [
      'Yusuf reunited with family',
      'Surah Ar-Ra\'d (Thunder)',
      'Ibrahim\'s prayers for Makkah',
    ],
    famousVerses: [
      {
        arabic: 'رَبَّنَآ إِنِّىٓ أَسْكَنتُ مِن ذُرِّيَّتِى بِوَادٍ غَيْرِ ذِى زَرْعٍ',
        translation: 'Our Lord, I have settled some of my descendants in an uncultivated valley',
        reference: 'Ibrahim 14:37',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Complete Yusuf\'s story for motivation',
        'Learn Ibrahim\'s beautiful prayers',
        'Focus on du\'a verses',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Yusuf becomes minister',
      'Brothers come to Egypt',
      'Family reunification',
      'Ibrahim\'s prayers',
    ],
  },
  {
    id: 14,
    nameArabic: 'ربما',
    nameEnglish: 'Rubama',
    alternativeName: 'Alif Lam Ra',
    startSurah: 'Al-Hijr',
    startVerse: 1,
    endSurah: 'An-Nahl',
    endVerse: 128,
    totalSurahs: 2,
    keyThemes: [
      'Protection of the Quran',
      'Creation signs in nature',
      'Bees and honey',
      'Gratitude for blessings',
    ],
    highlights: [
      'Allah\'s promise to protect the Quran',
      'Surah An-Nahl (The Bee)',
      'Natural signs of Allah',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ',
        translation: 'Indeed, it is We who sent down the reminder, and We will guard it',
        reference: 'Al-Hijr 15:9',
      },
      {
        arabic: 'وَأَوْحَىٰ رَبُّكَ إِلَى ٱلنَّحْلِ',
        translation: 'And your Lord inspired the bee',
        reference: 'An-Nahl 16:68',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn the Quran protection verse - very powerful',
        'Study the bee verses with wonder',
        'Connect natural signs to faith',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 15,
    nameArabic: 'سبحان الذي',
    nameEnglish: 'Subhanal-Ladhi',
    startSurah: 'Al-Isra',
    startVerse: 1,
    endSurah: 'Al-Kahf',
    endVerse: 74,
    totalSurahs: 2,
    keyThemes: [
      'Night Journey (Isra)',
      'Rights of parents',
      'Story of the Cave companions',
      'Musa and Khidr',
    ],
    highlights: [
      'The miraculous Night Journey',
      'Beginning of Surah Al-Kahf',
      'Story of Ashab al-Kahf',
    ],
    famousVerses: [
      {
        arabic: 'سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ لَيْلًۭا',
        translation: 'Exalted is He who took His Servant by night',
        reference: 'Al-Isra 17:1',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn Al-Kahf for Friday recitation',
        'Focus on the four stories in Al-Kahf',
        'Understand the Isra and Mi\'raj context',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The Night Journey (Isra & Mi\'raj)',
      'The People of the Cave',
      'The Owner of the Two Gardens',
      'Musa and Khidr begins',
    ],
  },
  {
    id: 16,
    nameArabic: 'قال ألم',
    nameEnglish: 'Qala Alam',
    startSurah: 'Al-Kahf',
    startVerse: 75,
    endSurah: 'Taha',
    endVerse: 135,
    totalSurahs: 3,
    keyThemes: [
      'Dhul-Qarnayn\'s story',
      'Birth of Isa (Jesus)',
      'Maryam\'s story',
      'Musa\'s early life',
    ],
    highlights: [
      'Completion of Al-Kahf stories',
      'Surah Maryam - Mary\'s story',
      'Beginning of Surah Taha',
    ],
    famousVerses: [
      {
        arabic: 'قَالَ إِنَّمَآ أَنَا۠ رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَـٰمًۭا زَكِيًّۭا',
        translation: 'He said: I am only a messenger of your Lord to give you a pure boy',
        reference: 'Maryam 19:19',
      },
      {
        arabic: 'طه ● مَآ أَنزَلْنَا عَلَيْكَ ٱلْقُرْءَانَ لِتَشْقَىٰٓ',
        translation: 'Ta Ha. We have not sent down the Quran to you to cause you distress',
        reference: 'Taha 20:1-2',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn Maryam\'s story - deeply moving',
        'Surah Taha is melodious - easier to memorize',
        'Focus on the miraculous births',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Dhul-Qarnayn and Yajuj Majuj',
      'Birth of Yahya (John)',
      'Birth of Isa (Jesus)',
      'Musa\'s early life and calling',
    ],
  },
  {
    id: 17,
    nameArabic: 'اقترب',
    nameEnglish: 'Iqtaraba',
    startSurah: 'Al-Anbiya',
    startVerse: 1,
    endSurah: 'Al-Hajj',
    endVerse: 78,
    totalSurahs: 2,
    keyThemes: [
      'Stories of many prophets',
      'Ibrahim destroys idols',
      'Hajj rituals',
      'Day of Judgment approaches',
    ],
    highlights: [
      'Surah Al-Anbiya - 16 prophets mentioned',
      'Ibrahim and the idols',
      'Complete Hajj rulings',
    ],
    famousVerses: [
      {
        arabic: 'وَمَآ أَرْسَلْنَـٰكَ إِلَّا رَحْمَةًۭ لِّلْعَـٰلَمِينَ',
        translation: 'And We have not sent you except as a mercy to the worlds',
        reference: 'Al-Anbiya 21:107',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn the "Mercy to the worlds" verse',
        'Study the prophet summaries',
        'Connect Hajj verses to practice',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Ibrahim destroys idols',
      'Ibrahim thrown in fire',
      'Multiple prophets mentioned briefly',
    ],
  },
  {
    id: 18,
    nameArabic: 'قد أفلح',
    nameEnglish: 'Qad Aflaha',
    startSurah: 'Al-Mu\'minun',
    startVerse: 1,
    endSurah: 'Al-Furqan',
    endVerse: 20,
    totalSurahs: 3,
    keyThemes: [
      'Characteristics of successful believers',
      'Light verse (Ayat an-Nur)',
      'Modesty and hijab',
      'Criterion between right and wrong',
    ],
    highlights: [
      'Opening describes true believers',
      'Famous Light Verse',
      'Hijab and modesty rulings',
    ],
    famousVerses: [
      {
        arabic: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ',
        translation: 'Successful indeed are the believers',
        reference: 'Al-Mu\'minun 23:1',
      },
      {
        arabic: 'ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ',
        translation: 'Allah is the Light of the heavens and the earth',
        reference: 'An-Nur 24:35',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Memorize the believers\' qualities',
        'Learn the Light Verse - very powerful',
        'Focus on practical rulings',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 19,
    nameArabic: 'وقال الذين',
    nameEnglish: 'Wa Qalal-Ladhina',
    startSurah: 'Al-Furqan',
    startVerse: 21,
    endSurah: 'An-Naml',
    endVerse: 55,
    totalSurahs: 3,
    keyThemes: [
      'Servants of the Most Merciful',
      'Musa\'s story expanded',
      'Story of Sulayman',
      'Queen of Sheba',
    ],
    highlights: [
      'Ibadur-Rahman (Servants of the Most Merciful) qualities',
      'Musa\'s detailed story in Ash-Shu\'ara',
      'Sulayman and the ants/hoopoe',
    ],
    famousVerses: [
      {
        arabic: 'وَعِبَادُ ٱلرَّحْمَـٰنِ ٱلَّذِينَ يَمْشُونَ عَلَى ٱلْأَرْضِ هَوْنًۭا',
        translation: 'The servants of the Most Merciful are those who walk upon the earth humbly',
        reference: 'Al-Furqan 25:63',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Memorize Ibadur-Rahman verses - beautiful qualities',
        'Learn the Sulayman stories',
        'Connect to nature miracles',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Musa\'s complete journey',
      'Sulayman and the ants',
      'Sulayman and the hoopoe',
      'Queen of Sheba begins',
    ],
  },
  {
    id: 20,
    nameArabic: 'أمن خلق',
    nameEnglish: 'Amman Khalaq',
    startSurah: 'An-Naml',
    startVerse: 56,
    endSurah: 'Al-Ankabut',
    endVerse: 45,
    totalSurahs: 3,
    keyThemes: [
      'Queen of Sheba story completed',
      'Qasas - Stories of Musa',
      'Spider\'s web analogy',
      'Tests and trials',
    ],
    highlights: [
      'Queen of Sheba accepts Islam',
      'Surah Al-Qasas - Musa\'s story',
      'Spider\'s web - false gods',
    ],
    famousVerses: [
      {
        arabic: 'وَرَبُّكَ يَخْلُقُ مَا يَشَآءُ وَيَخْتَارُ',
        translation: 'And your Lord creates what He wills and chooses',
        reference: 'Al-Qasas 28:68',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Complete the Queen of Sheba story',
        'Learn Musa\'s story in Al-Qasas',
        'Focus on the spider analogy',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Queen of Sheba accepts faith',
      'Musa\'s escape from Egypt',
      'Musa in Madyan',
      'Qarun\'s arrogance',
    ],
  },
  // Juz 21-30
  {
    id: 21,
    nameArabic: 'اتل ما أوحي',
    nameEnglish: 'Utlu Ma Oohiya',
    startSurah: 'Al-Ankabut',
    startVerse: 46,
    endSurah: 'Al-Ahzab',
    endVerse: 30,
    totalSurahs: 5,
    keyThemes: [
      'Debate with People of the Book',
      'Romans and Persians prophecy',
      'Luqman\'s wisdom',
      'Battle of the Trench',
    ],
    highlights: [
      'Surah Ar-Rum prophecy fulfilled',
      'Luqman\'s advice to his son',
      'Beginning of Al-Ahzab',
    ],
    famousVerses: [
      {
        arabic: 'وَوَصَّيْنَا ٱلْإِنسَـٰنَ بِوَٰلِدَيْهِ حُسْنًۭا',
        translation: 'And We have enjoined upon man goodness to parents',
        reference: 'Al-Ankabut 29:8',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn Luqman\'s wisdom - practical advice',
        'Study the Ar-Rum prophecy',
        'Focus on parent verses',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Luqman\'s advice to his son',
      'Battle of the Trench begins',
    ],
  },
  {
    id: 22,
    nameArabic: 'ومن يقنت',
    nameEnglish: 'Wa Man Yaqnut',
    startSurah: 'Al-Ahzab',
    startVerse: 31,
    endSurah: 'Ya-Sin',
    endVerse: 27,
    totalSurahs: 3,
    keyThemes: [
      'Prophet\'s wives addressed',
      'Hijab verses',
      'Sheba story (Saba)',
      'Heart of the Quran begins',
    ],
    highlights: [
      'Rules for Prophet\'s household',
      'Beginning of Surah Ya-Sin',
      'Story of Saba (Sheba)',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّ ٱللَّهَ وَمَلَـٰٓئِكَتَهُۥ يُصَلُّونَ عَلَى ٱلنَّبِىِّ',
        translation: 'Indeed, Allah and His angels send blessings upon the Prophet',
        reference: 'Al-Ahzab 33:56',
      },
      {
        arabic: 'يسٓ ● وَٱلْقُرْءَانِ ٱلْحَكِيمِ',
        translation: 'Ya-Sin. By the wise Quran',
        reference: 'Ya-Sin 36:1-2',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Begin Ya-Sin - the Heart of the Quran',
        'Learn the salawat verse',
        'Focus on rulings for Muslim community',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Story of Saba kingdom',
    ],
  },
  {
    id: 23,
    nameArabic: 'وما أنزلنا',
    nameEnglish: 'Wa Ma Anzalna',
    alternativeName: 'Wa Ma Liya',
    startSurah: 'Ya-Sin',
    startVerse: 28,
    endSurah: 'As-Saffat',
    endVerse: 182,
    totalSurahs: 3,
    keyThemes: [
      'Signs of resurrection',
      'Day of Judgment scenes',
      'Prophet stories summarized',
      'Angels in rows',
    ],
    highlights: [
      'Completion of Ya-Sin',
      'Surah As-Saffat - angels',
      'Ibrahim willing to sacrifice his son',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ',
        translation: 'His command is only when He intends a thing that He says: Be, and it is',
        reference: 'Ya-Sin 36:82',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Complete Ya-Sin - highly rewarding',
        'Learn the Kun Fayakun verse',
        'Focus on the sacrifice story',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The man from the city (Ya-Sin)',
      'Ibrahim\'s sacrifice',
      'Various prophets mentioned',
    ],
  },
  {
    id: 24,
    nameArabic: 'فمن أظلم',
    nameEnglish: 'Faman Adhlam',
    startSurah: 'Az-Zumar',
    startVerse: 32,
    endSurah: 'Fussilat',
    endVerse: 46,
    totalSurahs: 3,
    keyThemes: [
      'Day of Judgment details',
      'Forgiveness for all sins',
      'Believers vs. disbelievers',
      'Quran\'s miraculous nature',
    ],
    highlights: [
      'All sins can be forgiven',
      'Paradise and Hell descriptions',
      'Surah Fussilat challenges',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ',
        translation: 'Say: O My servants who have transgressed, do not despair of the mercy of Allah',
        reference: 'Az-Zumar 39:53',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn the mercy verse - gives hope',
        'Study the Judgment Day scenes',
        'Focus on repentance themes',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 25,
    nameArabic: 'إليه يرد',
    nameEnglish: 'Ilayhi Yuraddu',
    startSurah: 'Fussilat',
    startVerse: 47,
    endSurah: 'Al-Jathiyah',
    endVerse: 37,
    totalSurahs: 5,
    keyThemes: [
      'Consultation (Shura)',
      'Golden ornaments story',
      'Smoke as a sign',
      'Kneeling on Judgment Day',
    ],
    highlights: [
      'Surah Ash-Shura - consultation',
      'Surah Az-Zukhruf - gold ornaments',
      'Surah Ad-Dukhan - smoke',
    ],
    famousVerses: [
      {
        arabic: 'وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ',
        translation: 'And their affair is consultation among themselves',
        reference: 'Ash-Shura 42:38',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn the consultation verse',
        'Study the Ha Mim Surahs together',
        'Note the common themes',
      ],
      estimatedDays: 50,
    },
  },
  {
    id: 26,
    nameArabic: 'حم',
    nameEnglish: 'Ha Mim',
    startSurah: 'Al-Ahqaf',
    startVerse: 1,
    endSurah: 'Adh-Dhariyat',
    endVerse: 30,
    totalSurahs: 6,
    keyThemes: [
      'Jinn listening to Quran',
      'Victory and conquest',
      'Muhammad (PBUH) praised',
      'Winning and losing',
    ],
    highlights: [
      'Jinn believe in Quran',
      'Surah Al-Fath - Conquest',
      'Surah Muhammad',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًۭا مُّبِينًۭا',
        translation: 'Indeed, We have given you a clear conquest',
        reference: 'Al-Fath 48:1',
      },
      {
        arabic: 'مُّحَمَّدٌۭ رَّسُولُ ٱللَّهِ',
        translation: 'Muhammad is the Messenger of Allah',
        reference: 'Al-Fath 48:29',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn Surah Muhammad',
        'Study the Fath verses',
        'Focus on victory themes',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Jinn listen to the Quran',
      'Treaty of Hudaybiyyah',
    ],
  },
  {
    id: 27,
    nameArabic: 'قال فما خطبكم',
    nameEnglish: 'Qala Fama Khatbukum',
    startSurah: 'Adh-Dhariyat',
    startVerse: 31,
    endSurah: 'Al-Hadid',
    endVerse: 29,
    totalSurahs: 7,
    keyThemes: [
      'Ibrahim\'s guests',
      'Star and moon',
      'The Most Merciful (Ar-Rahman)',
      'The Inevitable Event',
    ],
    highlights: [
      'Surah Ar-Rahman - repeated refrain',
      'Surah Al-Waqi\'ah - categories of people',
      'Beautiful natural imagery',
    ],
    famousVerses: [
      {
        arabic: 'فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ',
        translation: 'So which of the favors of your Lord would you deny?',
        reference: 'Ar-Rahman 55:13',
      },
    ],
    memorization: {
      difficulty: 'easy',
      tips: [
        'Ar-Rahman has a beautiful rhythm',
        'Al-Waqi\'ah is highly rewarding',
        'Focus on the repeated verses',
      ],
      estimatedDays: 40,
    },
    stories: [
      'Ibrahim\'s angelic guests',
      'Lut\'s people destroyed',
    ],
  },
  {
    id: 28,
    nameArabic: 'قد سمع الله',
    nameEnglish: 'Qad Sami\' Allah',
    startSurah: 'Al-Mujadila',
    startVerse: 1,
    endSurah: 'At-Tahrim',
    endVerse: 12,
    totalSurahs: 9,
    keyThemes: [
      'Allah hears all',
      'Friday prayer (Jumu\'ah)',
      'Hypocrites exposed',
      'Divorce rulings',
    ],
    highlights: [
      'Surah Al-Jumu\'ah - Friday',
      'Surah Al-Munafiqun - hypocrites',
      'Surah At-Talaq - divorce',
    ],
    famousVerses: [
      {
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ',
        translation: 'O you who believe, when the call for prayer on Friday is made...',
        reference: 'Al-Jumu\'ah 62:9',
      },
    ],
    memorization: {
      difficulty: 'medium',
      tips: [
        'Learn Al-Jumu\'ah for Friday recitation',
        'Focus on practical rulings',
        'Study the short Surahs',
      ],
      estimatedDays: 45,
    },
  },
  {
    id: 29,
    nameArabic: 'تبارك',
    nameEnglish: 'Tabarak',
    startSurah: 'Al-Mulk',
    startVerse: 1,
    endSurah: 'Al-Mursalat',
    endVerse: 50,
    totalSurahs: 11,
    keyThemes: [
      'Dominion of Allah',
      'Pen and writing',
      'Jinn Surah',
      'Day of Judgment scenes',
    ],
    highlights: [
      'Surah Al-Mulk - protection from grave',
      'Surah Al-Qalam - the Pen',
      'Surah Al-Jinn',
    ],
    famousVerses: [
      {
        arabic: 'تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ',
        translation: 'Blessed is He in whose hand is dominion',
        reference: 'Al-Mulk 67:1',
      },
      {
        arabic: 'نٓ ۚ وَٱلْقَلَمِ وَمَا يَسْطُرُونَ',
        translation: 'Nun. By the pen and what they inscribe',
        reference: 'Al-Qalam 68:1',
      },
    ],
    memorization: {
      difficulty: 'easy',
      tips: [
        'Al-Mulk - recite nightly for protection',
        'Shorter Surahs, easier to memorize',
        'Good stepping stone to Juz 30',
      ],
      estimatedDays: 35,
    },
    stories: [
      'Story of the garden owners',
      'Nuh\'s story in Surah Nuh',
    ],
  },
  {
    id: 30,
    nameArabic: 'عم',
    nameEnglish: 'Amma',
    alternativeName: 'Juz Amma',
    startSurah: 'An-Naba',
    startVerse: 1,
    endSurah: 'An-Nas',
    endVerse: 6,
    totalSurahs: 37,
    keyThemes: [
      'Day of Judgment',
      'Short powerful reminders',
      'Protection Surahs',
      'Tawheed (Oneness)',
    ],
    highlights: [
      'Most commonly memorized Juz',
      'Contains Al-Fatiha equivalent: Al-Ikhlas',
      'Protection Surahs (Mu\'awwidhat)',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        translation: 'Say: He is Allah, the One',
        reference: 'Al-Ikhlas 112:1',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
        translation: 'Say: I seek refuge in the Lord of daybreak',
        reference: 'Al-Falaq 113:1',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
        translation: 'Say: I seek refuge in the Lord of mankind',
        reference: 'An-Nas 114:1',
      },
    ],
    memorization: {
      difficulty: 'easy',
      tips: [
        'Start your Quran memorization here',
        'Short Surahs used in daily prayers',
        'Learn the last 10 Surahs first',
      ],
      estimatedDays: 30,
    },
  },
];

// Get lesson by Juz number
export function getJuzLesson(juzNumber: number): JuzLesson | undefined {
  return JUZ_LESSONS.find(lesson => lesson.id === juzNumber);
}

// Get all intro lessons
export function getIntroLessons(): JuzIntroLesson[] {
  return JUZ_INTRO_LESSONS;
}

// Get Juz by difficulty
export function getJuzByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): JuzLesson[] {
  return JUZ_LESSONS.filter(lesson => lesson.memorization.difficulty === difficulty);
}

// Calculate total estimated days for full memorization
export function getTotalMemorizationDays(): number {
  return JUZ_LESSONS.reduce((total, lesson) => total + lesson.memorization.estimatedDays, 0);
}
