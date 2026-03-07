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
  keyThemesFr?: string[];
  highlights: string[];
  highlightsFr?: string[];
  famousVerses: {
    arabic: string;
    translation: string;
    translationFr?: string;
    reference: string;
  }[];
  memorization: {
    difficulty: 'easy' | 'medium' | 'hard';
    tips: string[];
    tipsFr?: string[];
    estimatedDays: number;
  };
  stories?: string[];
  storiesFr?: string[];
}

export interface JuzIntroLesson {
  id: string;
  title: string;
  titleFr?: string;
  titleArabic: string;
  description: string;
  descriptionFr?: string;
  content: {
    type: 'text' | 'fact' | 'tip' | 'example';
    text: string;
    textFr?: string;
    icon?: string;
  }[];
}

// Introduction lessons about the Juz system
export const JUZ_INTRO_LESSONS: JuzIntroLesson[] = [
  {
    id: 'intro_what_is_juz',
    title: 'What is a Juz?',
    titleFr: 'Qu\'est-ce qu\'un Juz ?',
    titleArabic: 'ما هو الجزء؟',
    description: 'Understanding the division of the Quran',
    descriptionFr: 'Comprendre la division du Coran',
    content: [
      {
        type: 'text',
        text: 'A Juz (جزء) is one of 30 parts of roughly equal length into which the Quran is divided. The word "Juz" literally means "part" or "portion" in Arabic.',
        textFr: 'Un Juz (جزء) est l\'une des 30 parties de longueur à peu près égale en lesquelles le Coran est divisé. Le mot « Juz » signifie littéralement « partie » ou « portion » en arabe.',
      },
      {
        type: 'fact',
        text: 'The Quran has 30 Juz, 60 Hizb, and 240 quarters (Rub).',
        textFr: 'Le Coran contient 30 Juz, 60 Hizb et 240 quarts (Rub).',
        icon: 'information-circle',
      },
      {
        type: 'text',
        text: 'This division was created by scholars after the Prophet\'s time to make it easier to complete the Quran in one month, especially during Ramadan - reading one Juz per day.',
        textFr: 'Cette division a été créée par les savants après l\'époque du Prophète pour faciliter la lecture complète du Coran en un mois, notamment pendant le Ramadan — en lisant un Juz par jour.',
      },
      {
        type: 'tip',
        text: 'Many Muslims aim to read one Juz per day during Ramadan to complete the entire Quran in the month.',
        textFr: 'De nombreux musulmans visent à lire un Juz par jour pendant le Ramadan pour compléter l\'intégralité du Coran dans le mois.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_structure',
    title: 'Structure of a Juz',
    titleFr: 'Structure d\'un Juz',
    titleArabic: 'هيكل الجزء',
    description: 'How each Juz is organized',
    descriptionFr: 'Comment chaque Juz est organisé',
    content: [
      {
        type: 'text',
        text: 'Each Juz is further divided into smaller sections to facilitate reading and memorization:',
        textFr: 'Chaque Juz est subdivisé en sections plus petites pour faciliter la lecture et la mémorisation :',
      },
      {
        type: 'example',
        text: '1 Juz = 2 Hizb (أحزاب)\n1 Hizb = 4 Quarters (أرباع)',
        textFr: '1 Juz = 2 Hizb (أحزاب)\n1 Hizb = 4 Quarts (أرباع)',
        icon: 'layers',
      },
      {
        type: 'fact',
        text: 'In Quran copies, you\'ll see symbols marking: Juz (۞), Hizb (حزب), and Quarter (ربع).',
        textFr: 'Dans les copies du Coran, vous verrez des symboles marquant : Juz (۞), Hizb (حزب) et Quart (ربع).',
        icon: 'bookmark',
      },
      {
        type: 'tip',
        text: 'Use these markers to track your progress and set daily reading goals.',
        textFr: 'Utilisez ces repères pour suivre votre progression et fixer vos objectifs de lecture quotidiens.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_naming',
    title: 'How Juz are Named',
    titleFr: 'Comment les Juz sont nommés',
    titleArabic: 'تسمية الأجزاء',
    description: 'Understanding Juz names',
    descriptionFr: 'Comprendre les noms des Juz',
    content: [
      {
        type: 'text',
        text: 'Each Juz is traditionally named after its first word or phrase. This helps in quick identification and reference.',
        textFr: 'Chaque Juz est traditionnellement nommé d\'après son premier mot ou sa première phrase. Cela facilite l\'identification et la référence rapides.',
      },
      {
        type: 'example',
        text: 'Juz 1: "Alif Lam Mim" (ألم)\nJuz 30: "Amma" (عمّ)\nJuz 29: "Tabarak" (تبارك)',
        textFr: 'Juz 1 : « Alif Lam Mim » (ألم)\nJuz 30 : « Amma » (عمّ)\nJuz 29 : « Tabarak » (تبارك)',
        icon: 'text',
      },
      {
        type: 'fact',
        text: 'Juz 30 is called "Juz Amma" because it starts with Surah An-Naba which begins with "عَمَّ يَتَسَاءَلُونَ" (What are they asking about?).',
        textFr: 'Le Juz 30 est appelé « Juz Amma » car il commence par la sourate An-Naba qui débute par « عَمَّ يَتَسَاءَلُونَ » (De quoi s\'interrogent-ils ?).',
        icon: 'information-circle',
      },
      {
        type: 'tip',
        text: 'Learning the Juz names helps you quickly locate verses and track your memorization progress.',
        textFr: 'Apprendre les noms des Juz vous aide à localiser rapidement les versets et à suivre votre progression de mémorisation.',
        icon: 'bulb',
      },
    ],
  },
  {
    id: 'intro_memorization',
    title: 'Memorization Journey',
    titleFr: 'Parcours de Mémorisation',
    titleArabic: 'رحلة الحفظ',
    description: 'Tips for memorizing the Quran by Juz',
    descriptionFr: 'Conseils pour mémoriser le Coran par Juz',
    content: [
      {
        type: 'text',
        text: 'Most people begin their memorization journey with Juz 30 (Juz Amma) because it contains the shortest and most commonly recited Surahs.',
        textFr: 'La plupart des gens commencent leur parcours de mémorisation par le Juz 30 (Juz Amma) car il contient les sourates les plus courtes et les plus récitées.',
      },
      {
        type: 'tip',
        text: 'Recommended order for beginners:\n1. Juz 30 (Juz Amma)\n2. Juz 29 (Tabarak)\n3. Juz 1 (Al-Fatiha & Al-Baqarah)',
        textFr: 'Ordre recommandé pour les débutants :\n1. Juz 30 (Juz Amma)\n2. Juz 29 (Tabarak)\n3. Juz 1 (Al-Fatiha et Al-Baqarah)',
        icon: 'footsteps',
      },
      {
        type: 'fact',
        text: 'A person who memorizes the entire Quran is called a "Hafiz" (حافظ) for males or "Hafiza" (حافظة) for females.',
        textFr: 'Une personne qui mémorise l\'intégralité du Coran est appelée « Hafiz » (حافظ) pour les hommes ou « Hafiza » (حافظة) pour les femmes.',
        icon: 'medal',
      },
      {
        type: 'text',
        text: 'The key to successful memorization is consistency. Even 15-20 minutes of focused daily practice is better than hours of occasional study.',
        textFr: 'La clé d\'une mémorisation réussie est la régularité. Même 15 à 20 minutes de pratique quotidienne concentrée valent mieux que des heures d\'étude occasionnelle.',
      },
    ],
  },
  {
    id: 'intro_reading_plan',
    title: '30-Day Reading Plan',
    titleFr: 'Plan de Lecture en 30 Jours',
    titleArabic: 'خطة القراءة',
    description: 'Complete the Quran in one month',
    descriptionFr: 'Compléter le Coran en un mois',
    content: [
      {
        type: 'text',
        text: 'The Juz system makes it simple to complete the Quran in exactly 30 days by reading one Juz per day.',
        textFr: 'Le système des Juz permet de compléter le Coran en exactement 30 jours en lisant un Juz par jour.',
      },
      {
        type: 'example',
        text: 'Daily breakdown:\n• After Fajr: 4 pages\n• After Dhuhr: 4 pages\n• After Asr: 4 pages\n• After Maghrib: 4 pages\n• After Isha: 4 pages\n= 20 pages = 1 Juz',
        textFr: 'Répartition quotidienne :\n• Après Fajr : 4 pages\n• Après Dhuhr : 4 pages\n• Après Asr : 4 pages\n• Après Maghrib : 4 pages\n• Après Isha : 4 pages\n= 20 pages = 1 Juz',
        icon: 'time',
      },
      {
        type: 'tip',
        text: 'Each Juz is approximately 20 pages in a standard Mushaf (Quran copy).',
        textFr: 'Chaque Juz fait environ 20 pages dans un Mushaf (exemplaire du Coran) standard.',
        icon: 'bulb',
      },
      {
        type: 'fact',
        text: 'During Ramadan, the Taraweeh prayers in many mosques are designed to complete one Juz per night.',
        textFr: 'Pendant le Ramadan, les prières de Taraweeh dans de nombreuses mosquées sont conçues pour compléter un Juz par nuit.',
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
    keyThemesFr: [
      'Introduction à la guidance',
      'Catégories de personnes (croyants, mécréants, hypocrites)',
      'Histoire d\'Adam et d\'Iblis',
      'Histoire des Bani Israïl',
    ],
    highlights: [
      'Contains Al-Fatiha - the most recited Surah',
      'Introduces the theme of guidance vs. misguidance',
      'Describes three types of people in detail',
    ],
    highlightsFr: [
      'Contient Al-Fatiha — la sourate la plus récitée',
      'Introduit le thème de la guidance vs l\'égarement',
      'Décrit trois types de personnes en détail',
    ],
    famousVerses: [
      {
        arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        translation: 'All praise is for Allah, Lord of all worlds',
        translationFr: 'Louange à Allah, Seigneur de l\'univers',
        reference: 'Al-Fatiha 1:2',
      },
      {
        arabic: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ',
        translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah',
        translationFr: 'C\'est le Livre au sujet duquel il n\'y a aucun doute, c\'est un guide pour les pieux',
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
      tipsFr: [
        'Maîtrisez Al-Fatiha en premier — elle est requise pour chaque prière',
        'Divisez Al-Baqarah en petites sections (10 versets à la fois)',
        'Concentrez-vous sur la compréhension des histoires pour faciliter la mémorisation',
      ],
      estimatedDays: 60,
    },
    stories: [
      'Creation of Adam',
      'Adam and Iblis (Satan)',
      'Bani Israel and Musa',
    ],
    storiesFr: [
      'Création d\'Adam',
      'Adam et Iblis (Satan)',
      'Bani Israïl et Moussa',
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
    keyThemesFr: [
      'Changement de Qiblah',
      'Jeûne et Ramadan',
      'Rituels du Hajj',
      'Combattre dans la voie d\'Allah',
    ],
    highlights: [
      'Contains verses about changing Qiblah to Makkah',
      'Fasting in Ramadan made obligatory',
      'Rules of Hajj and Umrah',
    ],
    highlightsFr: [
      'Contient les versets sur le changement de Qiblah vers La Mecque',
      'Le jeûne du Ramadan rendu obligatoire',
      'Règles du Hajj et de la Omra',
    ],
    famousVerses: [
      {
        arabic: 'وَإِلَـٰهُكُمْ إِلَـٰهٌۭ وَٰحِدٌۭ ۖ لَّآ إِلَـٰهَ إِلَّا هُوَ ٱلرَّحْمَـٰنُ ٱلرَّحِيمُ',
        translation: 'Your God is one God. There is no deity except Him, the Most Merciful.',
        translationFr: 'Votre Dieu est un Dieu unique. Il n\'y a de divinité que Lui, le Tout Miséricordieux.',
        reference: 'Al-Baqarah 2:163',
      },
      {
        arabic: 'شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ',
        translation: 'The month of Ramadan in which the Quran was revealed',
        translationFr: 'Le mois de Ramadan au cours duquel le Coran a été révélé',
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
      tipsFr: [
        'Apprenez les versets de la Qiblah pour comprendre l\'histoire islamique',
        'Mémorisez les versets du jeûne avant le Ramadan',
        'Concentrez-vous sur les sections thématiques',
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
    keyThemesFr: [
      'Transactions financières et charité',
      'Le plus grand verset — Ayat al-Kursi',
      'Pas de contrainte en religion',
      'Famille d\'Imran',
    ],
    highlights: [
      'Contains Ayat al-Kursi - the greatest verse',
      'Prohibition of Riba (usury)',
      'Story of Maryam\'s birth',
    ],
    highlightsFr: [
      'Contient Ayat al-Kursi — le plus grand verset',
      'Interdiction du Riba (usure)',
      'Histoire de la naissance de Maryam',
    ],
    famousVerses: [
      {
        arabic: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence',
        translationFr: 'Allah — il n\'y a de divinité que Lui, le Vivant, le Subsistant',
        reference: 'Al-Baqarah 2:255 (Ayat al-Kursi)',
      },
      {
        arabic: 'لَآ إِكْرَاهَ فِى ٱلدِّينِ',
        translation: 'There is no compulsion in religion',
        translationFr: 'Nulle contrainte en religion',
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
      tipsFr: [
        'Priorisez Ayat al-Kursi — récité pour la protection',
        'Apprenez les deux derniers versets d\'Al-Baqarah',
        'Comprenez les règles financières pour les retenir',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Birth of Maryam',
      'Zakariyya and Yahya',
    ],
    storiesFr: [
      'Naissance de Maryam',
      'Zakariyya et Yahya',
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
    keyThemesFr: [
      'Leçons de la bataille d\'Uhud',
      'Unité de la Oumma musulmane',
      'Droits des femmes en Islam',
      'Lois sur l\'héritage',
    ],
    highlights: [
      'Detailed account of Battle of Uhud',
      'Beginning of Surah An-Nisa (Women)',
      'Inheritance laws introduction',
    ],
    highlightsFr: [
      'Récit détaillé de la bataille d\'Uhud',
      'Début de la sourate An-Nisa (Les Femmes)',
      'Introduction aux lois sur l\'héritage',
    ],
    famousVerses: [
      {
        arabic: 'لَن تَنَالُوا۟ ٱلْبِرَّ حَتَّىٰ تُنفِقُوا۟ مِمَّا تُحِبُّونَ',
        translation: 'You will never attain righteousness until you spend from what you love',
        translationFr: 'Vous n\'atteindrez la piété que lorsque vous dépenserez de ce que vous aimez',
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
      tipsFr: [
        'Étudiez la bataille d\'Uhud pour comprendre le contexte',
        'Apprenez les versets sur l\'héritage avec un enseignant',
        'Divisez en sections thématiques',
      ],
      estimatedDays: 55,
    },
    stories: [
      'Battle of Uhud',
      'Story of the archers\' mistake',
    ],
    storiesFr: [
      'Bataille d\'Uhud',
      'Histoire de l\'erreur des archers',
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
    keyThemesFr: [
      'Lois du mariage',
      'Traitement des femmes',
      'Justice et équité',
      'Caractéristiques des hypocrites',
    ],
    highlights: [
      'Detailed marriage regulations',
      'Rights of women emphasized',
      'Description of hypocrites',
    ],
    highlightsFr: [
      'Réglementations détaillées du mariage',
      'Droits des femmes soulignés',
      'Description des hypocrites',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّ ٱللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا۟ ٱلْأَمَـٰنَـٰتِ إِلَىٰٓ أَهْلِهَا',
        translation: 'Indeed, Allah commands you to render trusts to whom they are due',
        translationFr: 'En vérité, Allah vous commande de rendre les dépôts à leurs ayants droit',
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
      tipsFr: [
        'Concentrez-vous sur les versets juridiques avec compréhension',
        'Utilisez la structure thématique pour organiser',
        'Révisez régulièrement car le contenu est détaillé',
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
    keyThemesFr: [
      'Gens du Livre',
      'Issa (Jésus) en Islam',
      'Lois alimentaires (Halal/Haram)',
      'Wudu et purification',
    ],
    highlights: [
      'Islamic perspective on Jesus',
      'Beginning of Surah Al-Maidah',
      'Rules of purification for prayer',
    ],
    highlightsFr: [
      'Perspective islamique sur Jésus',
      'Début de la sourate Al-Maidah',
      'Règles de purification pour la prière',
    ],
    famousVerses: [
      {
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا قُمْتُمْ إِلَى ٱلصَّلَوٰةِ فَٱغْسِلُوا۟ وُجُوهَكُمْ',
        translation: 'O you who believe, when you rise for prayer, wash your faces...',
        translationFr: 'Ô vous qui croyez, lorsque vous vous levez pour la prière, lavez vos visages...',
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
      tipsFr: [
        'Apprenez les versets du wudu car ils sont utilisés en pratique',
        'Comprenez les versets sur la nourriture halal/haram',
        'Reliez à vos pratiques quotidiennes',
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
    keyThemesFr: [
      'Serments et expiation',
      'Interdiction des intoxicants et des jeux de hasard',
      'Tawhid (Unicité d\'Allah)',
      'Arguments contre le polythéisme',
    ],
    highlights: [
      'Prohibition of alcohol and gambling',
      'Story of the table from heaven',
      'Powerful arguments for monotheism',
    ],
    highlightsFr: [
      'Interdiction de l\'alcool et des jeux de hasard',
      'Histoire de la table descendue du ciel',
      'Arguments puissants pour le monothéisme',
    ],
    famousVerses: [
      {
        arabic: 'ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ',
        translation: 'Today I have perfected your religion for you',
        translationFr: 'Aujourd\'hui, J\'ai parachevé pour vous votre religion',
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
      tipsFr: [
        'Concentrez-vous sur les versets d\'interdiction',
        'Étudiez les arguments de la sourate Al-An\'am',
        'Reliez les thèmes entre les deux sourates',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The Table Spread (Al-Ma\'idah)',
    ],
    storiesFr: [
      'La Table Servie (Al-Ma\'idah)',
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
    keyThemesFr: [
      'Guidance divine',
      'Histoires des prophètes précédents',
      'Mise en garde contre les désirs',
      'Histoire d\'Adam et d\'Iblis approfondie',
    ],
    highlights: [
      'Detailed story of Iblis refusing to prostrate',
      'Beginning of Prophet stories in Al-A\'raf',
      'Lessons from previous nations',
    ],
    highlightsFr: [
      'Histoire détaillée d\'Iblis refusant de se prosterner',
      'Début des histoires de prophètes dans Al-A\'raf',
      'Leçons des nations passées',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ إِنَّ صَلَاتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        translation: 'Say: My prayer and sacrifice, my living and dying are for Allah, Lord of the worlds',
        translationFr: 'Dis : Ma prière et mon sacrifice, ma vie et ma mort sont pour Allah, Seigneur de l\'univers',
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
      tipsFr: [
        'Étudiez les histoires des prophètes pour le contexte',
        'Apprenez le dialogue entre Allah et Iblis',
        'Concentrez-vous sur les versets de liaison',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Adam and Iblis in detail',
      'Beginning of Noah\'s story',
    ],
    storiesFr: [
      'Adam et Iblis en détail',
      'Début de l\'histoire de Noé',
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
    keyThemesFr: [
      'Histoires de Nouh, Houd, Salih, Lout, Chou\'ayb',
      'Histoire de Moussa et Pharaon',
      'Bataille de Badr',
      'Règles de guerre et de paix',
    ],
    highlights: [
      'Comprehensive prophet stories',
      'Beginning of Surah Al-Anfal',
      'Battle of Badr introduction',
    ],
    highlightsFr: [
      'Histoires complètes des prophètes',
      'Début de la sourate Al-Anfal',
      'Introduction à la bataille de Badr',
    ],
    famousVerses: [
      {
        arabic: 'إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَٱسْتَجَابَ لَكُمْ',
        translation: 'When you asked help of your Lord, and He answered you',
        translationFr: 'Quand vous imploriez le secours de votre Seigneur, Il vous répondit',
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
      tipsFr: [
        'Apprenez l\'histoire de chaque prophète comme une unité',
        'Comprenez le schéma de rejet et de châtiment',
        'Reliez aux récits de la bataille de Badr',
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
    storiesFr: [
      'Nouh (Noé) et son peuple',
      'Houd et les \'Ad',
      'Salih et les Thamoud',
      'Lout et son peuple',
      'Chou\'ayb et Madyan',
      'Moussa et Pharaon commence',
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
    keyThemesFr: [
      'Distribution du butin de guerre',
      'Contexte du traité d\'Hudaybiyyah',
      'Repentir et pardon',
      'Hypocrites démasqués',
    ],
    highlights: [
      'Rules for war spoils',
      'Surah At-Tawbah - no Bismillah',
      'Declaration against polytheists',
    ],
    highlightsFr: [
      'Règles pour le butin de guerre',
      'Sourate At-Tawbah — sans Bismillah',
      'Déclaration contre les polythéistes',
    ],
    famousVerses: [
      {
        arabic: 'وَأَعِدُّوا۟ لَهُم مَّا ٱسْتَطَعْتُم مِّن قُوَّةٍۢ',
        translation: 'And prepare against them whatever you are able of power',
        translationFr: 'Et préparez contre eux tout ce que vous pouvez comme force',
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
      tipsFr: [
        'Notez qu\'At-Tawbah n\'a pas de Bismillah',
        'Étudiez le contexte historique de la révélation',
        'Concentrez-vous sur les thèmes du repentir',
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
    keyThemesFr: [
      'Excuses des hypocrites',
      'Caractéristiques des vrais croyants',
      'Histoire du prophète Younous',
      'Avertissement de châtiment',
    ],
    highlights: [
      'End of Surah At-Tawbah',
      'Beginning of Surah Yunus',
      'Story of Yunus (Jonah)',
    ],
    highlightsFr: [
      'Fin de la sourate At-Tawbah',
      'Début de la sourate Younous',
      'Histoire de Younous (Jonas)',
    ],
    famousVerses: [
      {
        arabic: 'أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
        translation: 'Unquestionably, for the allies of Allah there is no fear, nor shall they grieve',
        translationFr: 'Certes, les alliés d\'Allah n\'auront aucune crainte et ne seront point affligés',
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
      tipsFr: [
        'Concentrez-vous sur le contraste entre croyants et hypocrites',
        'Apprenez l\'histoire de Younous',
        'Notez la transition entre les sourates',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Prophet Yunus and the whale',
    ],
    storiesFr: [
      'Le prophète Younous et la baleine',
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
    keyThemesFr: [
      'Suite des histoires des prophètes',
      'Histoire de Nouh en détail',
      'Début de l\'histoire de Youssouf',
      'Confiance en la provision d\'Allah',
    ],
    highlights: [
      'The Ark of Nuh',
      'Beginning of the most beautiful story - Yusuf',
      'Dreams and their interpretation',
    ],
    highlightsFr: [
      'L\'Arche de Nouh',
      'Début de la plus belle histoire — Youssouf',
      'Rêves et leur interprétation',
    ],
    famousVerses: [
      {
        arabic: 'نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ ٱلْقَصَصِ',
        translation: 'We narrate to you the best of stories',
        translationFr: 'Nous te racontons le meilleur des récits',
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
      tipsFr: [
        'La sourate Youssouf est une histoire continue — plus facile à mémoriser',
        'Apprenez l\'histoire de Youssouf dans l\'ordre',
        'Concentrez-vous sur les interprétations des rêves',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Nuh and the Flood (detailed)',
      'Yusuf\'s dream and brothers\' jealousy',
      'Yusuf thrown in the well',
      'Yusuf in Egypt - beginning',
    ],
    storiesFr: [
      'Nouh et le Déluge (détaillé)',
      'Rêve de Youssouf et jalousie des frères',
      'Youssouf jeté dans le puits',
      'Youssouf en Égypte — début',
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
    keyThemesFr: [
      'Conclusion de l\'histoire de Youssouf',
      'Tonnerre et éclairs comme signes',
      'Prières d\'Ibrahim',
      'Patience et gratitude',
    ],
    highlights: [
      'Yusuf reunited with family',
      'Surah Ar-Ra\'d (Thunder)',
      'Ibrahim\'s prayers for Makkah',
    ],
    highlightsFr: [
      'Youssouf retrouve sa famille',
      'Sourate Ar-Ra\'d (Le Tonnerre)',
      'Prières d\'Ibrahim pour La Mecque',
    ],
    famousVerses: [
      {
        arabic: 'رَبَّنَآ إِنِّىٓ أَسْكَنتُ مِن ذُرِّيَّتِى بِوَادٍ غَيْرِ ذِى زَرْعٍ',
        translation: 'Our Lord, I have settled some of my descendants in an uncultivated valley',
        translationFr: 'Ô notre Seigneur, j\'ai établi une partie de ma descendance dans une vallée sans culture',
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
      tipsFr: [
        'Complétez l\'histoire de Youssouf pour la motivation',
        'Apprenez les belles prières d\'Ibrahim',
        'Concentrez-vous sur les versets de du\'a',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Yusuf becomes minister',
      'Brothers come to Egypt',
      'Family reunification',
      'Ibrahim\'s prayers',
    ],
    storiesFr: [
      'Youssouf devient ministre',
      'Les frères viennent en Égypte',
      'Réunification de la famille',
      'Prières d\'Ibrahim',
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
    keyThemesFr: [
      'Protection du Coran',
      'Signes de la création dans la nature',
      'Abeilles et miel',
      'Gratitude pour les bienfaits',
    ],
    highlights: [
      'Allah\'s promise to protect the Quran',
      'Surah An-Nahl (The Bee)',
      'Natural signs of Allah',
    ],
    highlightsFr: [
      'Promesse d\'Allah de protéger le Coran',
      'Sourate An-Nahl (L\'Abeille)',
      'Signes naturels d\'Allah',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ',
        translation: 'Indeed, it is We who sent down the reminder, and We will guard it',
        translationFr: 'C\'est Nous qui avons fait descendre le Rappel, et c\'est Nous qui en sommes les gardiens',
        reference: 'Al-Hijr 15:9',
      },
      {
        arabic: 'وَأَوْحَىٰ رَبُّكَ إِلَى ٱلنَّحْلِ',
        translation: 'And your Lord inspired the bee',
        translationFr: 'Et ton Seigneur inspira l\'abeille',
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
      tipsFr: [
        'Apprenez le verset de la protection du Coran — très puissant',
        'Étudiez les versets sur l\'abeille avec émerveillement',
        'Reliez les signes naturels à la foi',
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
    keyThemesFr: [
      'Voyage Nocturne (Isra)',
      'Droits des parents',
      'Histoire des compagnons de la Caverne',
      'Moussa et Al-Khidr',
    ],
    highlights: [
      'The miraculous Night Journey',
      'Beginning of Surah Al-Kahf',
      'Story of Ashab al-Kahf',
    ],
    highlightsFr: [
      'Le miraculeux Voyage Nocturne',
      'Début de la sourate Al-Kahf',
      'Histoire des Gens de la Caverne',
    ],
    famousVerses: [
      {
        arabic: 'سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ لَيْلًۭا',
        translation: 'Exalted is He who took His Servant by night',
        translationFr: 'Gloire à Celui qui a fait voyager Son serviteur de nuit',
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
      tipsFr: [
        'Apprenez Al-Kahf pour la récitation du vendredi',
        'Concentrez-vous sur les quatre histoires d\'Al-Kahf',
        'Comprenez le contexte de l\'Isra et du Mi\'raj',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The Night Journey (Isra & Mi\'raj)',
      'The People of the Cave',
      'The Owner of the Two Gardens',
      'Musa and Khidr begins',
    ],
    storiesFr: [
      'Le Voyage Nocturne (Isra et Mi\'raj)',
      'Les Gens de la Caverne',
      'Le propriétaire des deux jardins',
      'Moussa et Al-Khidr commence',
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
    keyThemesFr: [
      'Histoire de Dhul-Qarnayn',
      'Naissance d\'Issa (Jésus)',
      'Histoire de Maryam',
      'Jeunesse de Moussa',
    ],
    highlights: [
      'Completion of Al-Kahf stories',
      'Surah Maryam - Mary\'s story',
      'Beginning of Surah Taha',
    ],
    highlightsFr: [
      'Fin des histoires d\'Al-Kahf',
      'Sourate Maryam — l\'histoire de Marie',
      'Début de la sourate Taha',
    ],
    famousVerses: [
      {
        arabic: 'قَالَ إِنَّمَآ أَنَا۠ رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَـٰمًۭا زَكِيًّۭا',
        translation: 'He said: I am only a messenger of your Lord to give you a pure boy',
        translationFr: 'Il dit : Je suis seulement un messager de ton Seigneur pour te donner un garçon pur',
        reference: 'Maryam 19:19',
      },
      {
        arabic: 'طه ● مَآ أَنزَلْنَا عَلَيْكَ ٱلْقُرْءَانَ لِتَشْقَىٰٓ',
        translation: 'Ta Ha. We have not sent down the Quran to you to cause you distress',
        translationFr: 'Ta Ha. Nous n\'avons pas fait descendre le Coran sur toi pour te rendre malheureux',
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
      tipsFr: [
        'Apprenez l\'histoire de Maryam — profondément émouvante',
        'La sourate Taha est mélodieuse — plus facile à mémoriser',
        'Concentrez-vous sur les naissances miraculeuses',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Dhul-Qarnayn and Yajuj Majuj',
      'Birth of Yahya (John)',
      'Birth of Isa (Jesus)',
      'Musa\'s early life and calling',
    ],
    storiesFr: [
      'Dhul-Qarnayn et Yajuj Majuj',
      'Naissance de Yahya (Jean)',
      'Naissance d\'Issa (Jésus)',
      'Jeunesse et appel de Moussa',
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
    keyThemesFr: [
      'Histoires de nombreux prophètes',
      'Ibrahim détruit les idoles',
      'Rituels du Hajj',
      'Le Jour du Jugement approche',
    ],
    highlights: [
      'Surah Al-Anbiya - 16 prophets mentioned',
      'Ibrahim and the idols',
      'Complete Hajj rulings',
    ],
    highlightsFr: [
      'Sourate Al-Anbiya — 16 prophètes mentionnés',
      'Ibrahim et les idoles',
      'Règles complètes du Hajj',
    ],
    famousVerses: [
      {
        arabic: 'وَمَآ أَرْسَلْنَـٰكَ إِلَّا رَحْمَةًۭ لِّلْعَـٰلَمِينَ',
        translation: 'And We have not sent you except as a mercy to the worlds',
        translationFr: 'Et Nous ne t\'avons envoyé qu\'en miséricorde pour l\'univers',
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
      tipsFr: [
        'Apprenez le verset « Miséricorde pour l\'univers »',
        'Étudiez les résumés des prophètes',
        'Reliez les versets du Hajj à la pratique',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Ibrahim destroys idols',
      'Ibrahim thrown in fire',
      'Multiple prophets mentioned briefly',
    ],
    storiesFr: [
      'Ibrahim détruit les idoles',
      'Ibrahim jeté dans le feu',
      'Plusieurs prophètes mentionnés brièvement',
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
    keyThemesFr: [
      'Caractéristiques des croyants qui réussissent',
      'Verset de la Lumière (Ayat an-Nur)',
      'Pudeur et hijab',
      'Critère entre le bien et le mal',
    ],
    highlights: [
      'Opening describes true believers',
      'Famous Light Verse',
      'Hijab and modesty rulings',
    ],
    highlightsFr: [
      'L\'ouverture décrit les vrais croyants',
      'Célèbre Verset de la Lumière',
      'Règles du hijab et de la pudeur',
    ],
    famousVerses: [
      {
        arabic: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ',
        translation: 'Successful indeed are the believers',
        translationFr: 'Bienheureux sont certes les croyants',
        reference: 'Al-Mu\'minun 23:1',
      },
      {
        arabic: 'ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ',
        translation: 'Allah is the Light of the heavens and the earth',
        translationFr: 'Allah est la Lumière des cieux et de la terre',
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
      tipsFr: [
        'Mémorisez les qualités des croyants',
        'Apprenez le Verset de la Lumière — très puissant',
        'Concentrez-vous sur les règles pratiques',
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
    keyThemesFr: [
      'Serviteurs du Tout Miséricordieux',
      'Histoire de Moussa approfondie',
      'Histoire de Soulayman',
      'Reine de Saba',
    ],
    highlights: [
      'Ibadur-Rahman (Servants of the Most Merciful) qualities',
      'Musa\'s detailed story in Ash-Shu\'ara',
      'Sulayman and the ants/hoopoe',
    ],
    highlightsFr: [
      'Qualités des Ibadur-Rahman (Serviteurs du Tout Miséricordieux)',
      'Histoire détaillée de Moussa dans Ash-Shu\'ara',
      'Soulayman et les fourmis/la huppe',
    ],
    famousVerses: [
      {
        arabic: 'وَعِبَادُ ٱلرَّحْمَـٰنِ ٱلَّذِينَ يَمْشُونَ عَلَى ٱلْأَرْضِ هَوْنًۭا',
        translation: 'The servants of the Most Merciful are those who walk upon the earth humbly',
        translationFr: 'Les serviteurs du Tout Miséricordieux sont ceux qui marchent humblement sur terre',
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
      tipsFr: [
        'Mémorisez les versets Ibadur-Rahman — belles qualités',
        'Apprenez les histoires de Soulayman',
        'Reliez aux miracles de la nature',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Musa\'s complete journey',
      'Sulayman and the ants',
      'Sulayman and the hoopoe',
      'Queen of Sheba begins',
    ],
    storiesFr: [
      'Parcours complet de Moussa',
      'Soulayman et les fourmis',
      'Soulayman et la huppe',
      'La Reine de Saba commence',
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
    keyThemesFr: [
      'Fin de l\'histoire de la Reine de Saba',
      'Al-Qasas — Histoires de Moussa',
      'Analogie de la toile d\'araignée',
      'Épreuves et tribulations',
    ],
    highlights: [
      'Queen of Sheba accepts Islam',
      'Surah Al-Qasas - Musa\'s story',
      'Spider\'s web - false gods',
    ],
    highlightsFr: [
      'La Reine de Saba accepte l\'Islam',
      'Sourate Al-Qasas — histoire de Moussa',
      'Toile d\'araignée — faux dieux',
    ],
    famousVerses: [
      {
        arabic: 'وَرَبُّكَ يَخْلُقُ مَا يَشَآءُ وَيَخْتَارُ',
        translation: 'And your Lord creates what He wills and chooses',
        translationFr: 'Et ton Seigneur crée ce qu\'Il veut et choisit',
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
      tipsFr: [
        'Complétez l\'histoire de la Reine de Saba',
        'Apprenez l\'histoire de Moussa dans Al-Qasas',
        'Concentrez-vous sur l\'analogie de l\'araignée',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Queen of Sheba accepts faith',
      'Musa\'s escape from Egypt',
      'Musa in Madyan',
      'Qarun\'s arrogance',
    ],
    storiesFr: [
      'La Reine de Saba accepte la foi',
      'Fuite de Moussa d\'Égypte',
      'Moussa à Madyan',
      'Arrogance de Qarun',
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
    keyThemesFr: [
      'Débat avec les Gens du Livre',
      'Prophétie des Romains et des Perses',
      'Sagesse de Luqman',
      'Bataille de la Tranchée',
    ],
    highlights: [
      'Surah Ar-Rum prophecy fulfilled',
      'Luqman\'s advice to his son',
      'Beginning of Al-Ahzab',
    ],
    highlightsFr: [
      'Prophétie de la sourate Ar-Rum accomplie',
      'Conseils de Luqman à son fils',
      'Début d\'Al-Ahzab',
    ],
    famousVerses: [
      {
        arabic: 'وَوَصَّيْنَا ٱلْإِنسَـٰنَ بِوَٰلِدَيْهِ حُسْنًۭا',
        translation: 'And We have enjoined upon man goodness to parents',
        translationFr: 'Et Nous avons enjoint à l\'homme la bonté envers ses parents',
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
      tipsFr: [
        'Apprenez la sagesse de Luqman — conseils pratiques',
        'Étudiez la prophétie d\'Ar-Rum',
        'Concentrez-vous sur les versets sur les parents',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Luqman\'s advice to his son',
      'Battle of the Trench begins',
    ],
    storiesFr: [
      'Conseils de Luqman à son fils',
      'La Bataille de la Tranchée commence',
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
    keyThemesFr: [
      'Épouses du Prophète adressées',
      'Versets du hijab',
      'Histoire de Saba',
      'Le Cœur du Coran commence',
    ],
    highlights: [
      'Rules for Prophet\'s household',
      'Beginning of Surah Ya-Sin',
      'Story of Saba (Sheba)',
    ],
    highlightsFr: [
      'Règles pour le foyer du Prophète',
      'Début de la sourate Ya-Sin',
      'Histoire de Saba',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّ ٱللَّهَ وَمَلَـٰٓئِكَتَهُۥ يُصَلُّونَ عَلَى ٱلنَّبِىِّ',
        translation: 'Indeed, Allah and His angels send blessings upon the Prophet',
        translationFr: 'Certes, Allah et Ses anges prient sur le Prophète',
        reference: 'Al-Ahzab 33:56',
      },
      {
        arabic: 'يسٓ ● وَٱلْقُرْءَانِ ٱلْحَكِيمِ',
        translation: 'Ya-Sin. By the wise Quran',
        translationFr: 'Ya-Sin. Par le Coran plein de sagesse',
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
      tipsFr: [
        'Commencez Ya-Sin — le Cœur du Coran',
        'Apprenez le verset de la salawat',
        'Concentrez-vous sur les règles pour la communauté musulmane',
      ],
      estimatedDays: 45,
    },
    stories: [
      'Story of Saba kingdom',
    ],
    storiesFr: [
      'Histoire du royaume de Saba',
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
    keyThemesFr: [
      'Signes de la résurrection',
      'Scènes du Jour du Jugement',
      'Histoires des prophètes résumées',
      'Anges en rangs',
    ],
    highlights: [
      'Completion of Ya-Sin',
      'Surah As-Saffat - angels',
      'Ibrahim willing to sacrifice his son',
    ],
    highlightsFr: [
      'Fin de Ya-Sin',
      'Sourate As-Saffat — les anges',
      'Ibrahim prêt à sacrifier son fils',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ',
        translation: 'His command is only when He intends a thing that He says: Be, and it is',
        translationFr: 'Son commandement, quand Il veut une chose, est seulement de dire : Sois, et elle est',
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
      tipsFr: [
        'Complétez Ya-Sin — très méritoire',
        'Apprenez le verset Kun Fayakun',
        'Concentrez-vous sur l\'histoire du sacrifice',
      ],
      estimatedDays: 45,
    },
    stories: [
      'The man from the city (Ya-Sin)',
      'Ibrahim\'s sacrifice',
      'Various prophets mentioned',
    ],
    storiesFr: [
      'L\'homme de la ville (Ya-Sin)',
      'Le sacrifice d\'Ibrahim',
      'Divers prophètes mentionnés',
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
    keyThemesFr: [
      'Détails du Jour du Jugement',
      'Pardon de tous les péchés',
      'Croyants vs mécréants',
      'Nature miraculeuse du Coran',
    ],
    highlights: [
      'All sins can be forgiven',
      'Paradise and Hell descriptions',
      'Surah Fussilat challenges',
    ],
    highlightsFr: [
      'Tous les péchés peuvent être pardonnés',
      'Descriptions du Paradis et de l\'Enfer',
      'Défis de la sourate Fussilat',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ',
        translation: 'Say: O My servants who have transgressed, do not despair of the mercy of Allah',
        translationFr: 'Dis : Ô Mes serviteurs qui avez commis des excès, ne désespérez pas de la miséricorde d\'Allah',
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
      tipsFr: [
        'Apprenez le verset de la miséricorde — il donne espoir',
        'Étudiez les scènes du Jour du Jugement',
        'Concentrez-vous sur les thèmes du repentir',
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
    keyThemesFr: [
      'Consultation (Choura)',
      'Histoire des ornements d\'or',
      'La fumée comme signe',
      'À genoux au Jour du Jugement',
    ],
    highlights: [
      'Surah Ash-Shura - consultation',
      'Surah Az-Zukhruf - gold ornaments',
      'Surah Ad-Dukhan - smoke',
    ],
    highlightsFr: [
      'Sourate Ash-Choura — la consultation',
      'Sourate Az-Zukhruf — ornements d\'or',
      'Sourate Ad-Dukhan — la fumée',
    ],
    famousVerses: [
      {
        arabic: 'وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ',
        translation: 'And their affair is consultation among themselves',
        translationFr: 'Et leur affaire est consultation entre eux',
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
      tipsFr: [
        'Apprenez le verset de la consultation',
        'Étudiez les sourates Ha Mim ensemble',
        'Notez les thèmes communs',
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
    keyThemesFr: [
      'Les Djinns écoutent le Coran',
      'Victoire et conquête',
      'Muhammad (PSL) loué',
      'Victoire et défaite',
    ],
    highlights: [
      'Jinn believe in Quran',
      'Surah Al-Fath - Conquest',
      'Surah Muhammad',
    ],
    highlightsFr: [
      'Les Djinns croient au Coran',
      'Sourate Al-Fath — la Conquête',
      'Sourate Muhammad',
    ],
    famousVerses: [
      {
        arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًۭا مُّبِينًۭا',
        translation: 'Indeed, We have given you a clear conquest',
        translationFr: 'En vérité, Nous t\'avons accordé une victoire éclatante',
        reference: 'Al-Fath 48:1',
      },
      {
        arabic: 'مُّحَمَّدٌۭ رَّسُولُ ٱللَّهِ',
        translation: 'Muhammad is the Messenger of Allah',
        translationFr: 'Muhammad est le Messager d\'Allah',
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
      tipsFr: [
        'Apprenez la sourate Muhammad',
        'Étudiez les versets d\'Al-Fath',
        'Concentrez-vous sur les thèmes de la victoire',
      ],
      estimatedDays: 50,
    },
    stories: [
      'Jinn listen to the Quran',
      'Treaty of Hudaybiyyah',
    ],
    storiesFr: [
      'Les Djinns écoutent le Coran',
      'Traité d\'Hudaybiyyah',
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
    keyThemesFr: [
      'Invités d\'Ibrahim',
      'Étoile et lune',
      'Le Tout Miséricordieux (Ar-Rahman)',
      'L\'Événement Inévitable',
    ],
    highlights: [
      'Surah Ar-Rahman - repeated refrain',
      'Surah Al-Waqi\'ah - categories of people',
      'Beautiful natural imagery',
    ],
    highlightsFr: [
      'Sourate Ar-Rahman — refrain répété',
      'Sourate Al-Waqi\'ah — catégories de personnes',
      'Belles images de la nature',
    ],
    famousVerses: [
      {
        arabic: 'فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ',
        translation: 'So which of the favors of your Lord would you deny?',
        translationFr: 'Lequel donc des bienfaits de votre Seigneur nierez-vous ?',
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
      tipsFr: [
        'Ar-Rahman a un beau rythme',
        'Al-Waqi\'ah est très méritoire',
        'Concentrez-vous sur les versets répétés',
      ],
      estimatedDays: 40,
    },
    stories: [
      'Ibrahim\'s angelic guests',
      'Lut\'s people destroyed',
    ],
    storiesFr: [
      'Les invités angéliques d\'Ibrahim',
      'Destruction du peuple de Lout',
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
    keyThemesFr: [
      'Allah entend tout',
      'Prière du vendredi (Joumou\'ah)',
      'Hypocrites démasqués',
      'Règles du divorce',
    ],
    highlights: [
      'Surah Al-Jumu\'ah - Friday',
      'Surah Al-Munafiqun - hypocrites',
      'Surah At-Talaq - divorce',
    ],
    highlightsFr: [
      'Sourate Al-Joumou\'ah — le Vendredi',
      'Sourate Al-Munafiqun — les hypocrites',
      'Sourate At-Talaq — le divorce',
    ],
    famousVerses: [
      {
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ',
        translation: 'O you who believe, when the call for prayer on Friday is made...',
        translationFr: 'Ô vous qui croyez, lorsque l\'appel à la prière du vendredi est lancé...',
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
      tipsFr: [
        'Apprenez Al-Joumou\'ah pour la récitation du vendredi',
        'Concentrez-vous sur les règles pratiques',
        'Étudiez les sourates courtes',
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
    keyThemesFr: [
      'Souveraineté d\'Allah',
      'Le Calame et l\'écriture',
      'Sourate des Djinns',
      'Scènes du Jour du Jugement',
    ],
    highlights: [
      'Surah Al-Mulk - protection from grave',
      'Surah Al-Qalam - the Pen',
      'Surah Al-Jinn',
    ],
    highlightsFr: [
      'Sourate Al-Mulk — protection de la tombe',
      'Sourate Al-Qalam — le Calame',
      'Sourate Al-Jinn',
    ],
    famousVerses: [
      {
        arabic: 'تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ',
        translation: 'Blessed is He in whose hand is dominion',
        translationFr: 'Béni soit Celui dans la main de qui est la royauté',
        reference: 'Al-Mulk 67:1',
      },
      {
        arabic: 'نٓ ۚ وَٱلْقَلَمِ وَمَا يَسْطُرُونَ',
        translation: 'Nun. By the pen and what they inscribe',
        translationFr: 'Noun. Par le calame et ce qu\'ils écrivent',
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
      tipsFr: [
        'Al-Mulk — récitez-la chaque nuit pour la protection',
        'Sourates plus courtes, plus faciles à mémoriser',
        'Bonne étape vers le Juz 30',
      ],
      estimatedDays: 35,
    },
    stories: [
      'Story of the garden owners',
      'Nuh\'s story in Surah Nuh',
    ],
    storiesFr: [
      'Histoire des propriétaires du jardin',
      'Histoire de Nouh dans la sourate Nuh',
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
    keyThemesFr: [
      'Jour du Jugement',
      'Courts rappels puissants',
      'Sourates de protection',
      'Tawhid (Unicité)',
    ],
    highlights: [
      'Most commonly memorized Juz',
      'Contains Al-Fatiha equivalent: Al-Ikhlas',
      'Protection Surahs (Mu\'awwidhat)',
    ],
    highlightsFr: [
      'Juz le plus couramment mémorisé',
      'Contient l\'équivalent d\'Al-Fatiha : Al-Ikhlas',
      'Sourates de protection (Mu\'awwidhat)',
    ],
    famousVerses: [
      {
        arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        translation: 'Say: He is Allah, the One',
        translationFr: 'Dis : Il est Allah, l\'Unique',
        reference: 'Al-Ikhlas 112:1',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
        translation: 'Say: I seek refuge in the Lord of daybreak',
        translationFr: 'Dis : Je cherche refuge auprès du Seigneur de l\'aube naissante',
        reference: 'Al-Falaq 113:1',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
        translation: 'Say: I seek refuge in the Lord of mankind',
        translationFr: 'Dis : Je cherche refuge auprès du Seigneur des hommes',
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
      tipsFr: [
        'Commencez votre mémorisation du Coran ici',
        'Sourates courtes utilisées dans les prières quotidiennes',
        'Apprenez les 10 dernières sourates en premier',
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
