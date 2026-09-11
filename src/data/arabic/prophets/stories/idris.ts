// Story of Prophet Idris (إدريس) - The Truthful One
// Complete comprehensive story with Quran sources and authentic hadith

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const idrisStory: Prophet = {
  id: 'idris',
  nameEnglish: 'Idris',
  nameFrench: 'Idris',
  nameArabic: 'إدريس',
  order: 2,
  title: 'The Truthful One',
  titleFr: 'Le Véridique',
  titleArabic: 'الصديق',
  summary: 'One of the earliest prophets, known for his exceptional knowledge, patience, and righteousness. Allah raised him to a high station, honoring him for his devotion and truthfulness.',
  summaryFr: "L'un des premiers prophètes, connu pour son savoir exceptionnel, sa patience et sa droiture. Allah l'a élevé à un haut rang, l'honorant pour sa dévotion et sa véracité.",
  hasSubStories: false,
  lessons: [
    'The pursuit of knowledge is a noble and virtuous path',
    'Patience in worship and devotion is greatly rewarded',
    'Truthfulness elevates a person in rank with Allah',
    'Being the first to do good deeds brings special honor',
    'Allah raises those who dedicate themselves to His worship',
    'Teaching others beneficial knowledge is a lasting charity',
  ],
  lessonsFr: [
    'La quête du savoir est un chemin noble et vertueux',
    "La patience dans l'adoration et la dévotion est grandement récompensée",
    'La véracité élève une personne en rang auprès d\'Allah',
    'Être le premier à faire de bonnes actions apporte un honneur spécial',
    'Allah élève ceux qui se consacrent à Son adoration',
    'Enseigner aux autres un savoir bénéfique est une aumône durable',
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
    contentFr: "Dans les générations qui suivirent le Prophète Adam, paix sur lui, émergea un homme d'une piété et d'une sagesse exceptionnelles. Son nom était Idris, et il faisait partie des premiers prophètes envoyés pour guider l'humanité. Il vécut à une époque où les descendants d'Adam avaient commencé à se répandre sur la terre, et le besoin de guidance divine était omniprésent.",
  },
  {
    id: 'idris-2',
    type: 'narrative',
    order: 2,
    content: "Prophet Idris lived in the generations between Adam and Nuh. The Quran and the authentic Sunnah give no lineage for him and no dates. Only what is established is mentioned here: he was a prophet of the early times, truthful, patient, and raised by Allah to a high station.",
    contentFr: "Le Prophète Idris vécut dans les générations entre Adam et Nouh. Le Coran et la Sunna authentique ne lui donnent ni lignée ni dates. Nous ne mentionnons que ce qui est établi : il fut un prophète des premiers temps, véridique, patient, et élevé par Allah à un rang élevé.",
  },
  {
    id: 'idris-3',
    type: 'hadith_source',
    order: 3,
    content: 'The Prophet Muhammad, peace be upon him, mentioned meeting Idris during his miraculous Night Journey.',
    contentFr: 'Le Prophète Muhammad, paix et bénédictions sur lui, mentionna sa rencontre avec Idris lors de son miraculeux Voyage Nocturne.',
    source: {
      type: 'hadith',
      collection: 'bukhari',
      narrator: 'Malik ibn Sa\'sa\'a',
      arabicText: 'ثُمَّ صَعِدَ بِي إِلَى السَّمَاءِ الرَّابِعَةِ فَإِذَا هُوَ بِإِدْرِيسَ قَالَ هَذَا إِدْرِيسُ فَسَلِّمْ عَلَيْهِ فَسَلَّمْتُ عَلَيْهِ فَرَدَّ ثُمَّ قَالَ مَرْحَبًا بِالأَخِ الصَّالِحِ وَالنَّبِيِّ الصَّالِحِ',
      translation: 'Then he (Jibril) ascended with me to the fourth heaven, and there was Idris. He (Jibril) said, "This is Idris, so greet him." So I greeted him, and he returned the greeting, then said, "Welcome, O righteous brother and righteous Prophet."',
      translationFr: 'Puis il (Jibril) monta avec moi au quatrième ciel, et il y avait Idris. Il (Jibril) dit : « Voici Idris, salue-le. » Alors je le saluai, et il rendit le salut, puis dit : « Bienvenue, ô frère vertueux et Prophète vertueux. »',
      grade: 'sahih',
    } as HadithReference,
  },

  // ============ PART 2: THE FIRST IN KNOWLEDGE ============
  {
    id: 'idris-4',
    type: 'narrative',
    order: 4,
    content: "The Quran states of him: \"And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.\" (19:56-57) Nothing further about his life is established in the Quran or the authentic Sunnah.",
    contentFr: "Le Coran énonce à son sujet : « Et mentionne Idris dans le Livre. C'était un véridique et un prophète. Et Nous l'élevâmes à un rang élevé. » (19:56-57) Rien de plus sur sa vie n'est établi dans le Coran ou la Sunna authentique.",
  },
  {
    id: 'idris-5',
    type: 'narrative',
    order: 5,
    content: "Whatever the details, Allah blessed Idris with knowledge, and he used it in the service of his Lord. Knowledge in the life of a prophet is never for worldly benefit alone; it is connected to worship, for the one who knows creation best is the one who recognises the Creator most.",
    contentFr: "Quels que soient les détails, Allah bénit Idris par le savoir, et il l'utilisa au service de son Seigneur. Dans la vie d'un prophète, le savoir n'est jamais destiné au seul profit mondain ; il est lié à l'adoration, car celui qui connaît le mieux la création est celui qui reconnaît le plus le Créateur.",
  },

  // ============ PART 3: HIS WORSHIP AND DEVOTION ============
  {
    id: 'idris-7',
    type: 'narrative',
    order: 6,
    content: 'The worship of Prophet Idris was legendary in its intensity and sincerity. He would spend his days teaching people the ways of righteousness and calling them to worship Allah alone. His nights were devoted to prayer and contemplation. It was said that he combined the virtues of knowledge and action, never letting his learning become mere theory.',
    contentFr: "L'adoration du Prophète Idris était légendaire dans son intensité et sa sincérité. Il passait ses jours à enseigner aux gens les voies de la droiture et à les appeler à adorer Allah seul. Ses nuits étaient consacrées à la prière et à la contemplation. On disait qu'il combinait les vertus du savoir et de l'action, ne laissant jamais son apprentissage devenir simple théorie.",
  },
  {
    id: 'idris-8',
    type: 'narrative',
    order: 7,
    content: "The scholars describe Prophet Idris as devoted in worship, combining knowledge with action. Day after day, year after year, he maintained his worship and his call to Allah without weakening or growing tired in his service to his Lord.",
    contentFr: "Les savants décrivent le Prophète Idris comme dévoué dans l'adoration, alliant le savoir à l'action. Jour après jour, année après année, il maintint son adoration et son appel à Allah sans faiblir ni se lasser dans le service de son Seigneur.",
  },
  {
    id: 'idris-9',
    type: 'narrative',
    order: 8,
    content: 'Despite his elevated spiritual state, Prophet Idris did not neglect his duty to his people. He called them to the worship of Allah alone, warned them against shirk (associating partners with Allah), and taught them to pray and give charity. He was a complete example of a prophet who balanced personal worship with public guidance.',
    contentFr: "Malgré son état spirituel élevé, le Prophète Idris ne négligea pas son devoir envers son peuple. Il les appela à l'adoration d'Allah seul, les mit en garde contre le shirk (l'association de partenaires à Allah), et leur enseigna à prier et à donner l'aumône. Il était un exemple accompli de prophète qui équilibrait l'adoration personnelle et la guidance publique.",
  },

  // ============ PART 4: THE QURAN'S TESTIMONY ============
  {
    id: 'idris-10',
    type: 'narrative',
    order: 9,
    content: 'Allah mentions Prophet Idris in the Quran with words of the highest praise. He is described with two magnificent attributes: being truthful (siddiq) and being a prophet (nabi). These words from the Creator Himself testify to the exalted status of this noble servant.',
    contentFr: "Allah mentionne le Prophète Idris dans le Coran avec des mots de la plus haute louange. Il est décrit avec deux attributs magnifiques : être véridique (siddiq) et être un prophète (nabi). Ces mots du Créateur Lui-même témoignent du statut exalté de ce noble serviteur.",
  },
  {
    id: 'idris-11',
    type: 'quran_source',
    order: 10,
    content: 'Allah describes Idris as a truthful prophet.',
    contentFr: 'Allah décrit Idris comme un prophète véridique.',
    source: {
      type: 'quran',
      surahNumber: 19,
      surahNameEnglish: 'Maryam',
      surahNameArabic: 'مريم',
      ayahStart: 56,
      ayahEnd: 57,
      arabicText: 'وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا ﴿٥٦﴾ وَرَفَعْنَاهُ مَكَانًا عَلِيًّا ﴿٥٧﴾',
      translation: 'And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.',
      translationFr: 'Et mentionne dans le Livre Idris. C\'était vraiment un véridique et un prophète. Et Nous l\'avons élevé à un haut rang.',
    } as QuranReference,
  },
  {
    id: 'idris-12',
    type: 'narrative',
    order: 11,
    content: 'The title "Siddiq" (the truthful one) is among the highest honors in Islam. It was also given to Abu Bakr, the closest companion of Prophet Muhammad, peace be upon him. This title indicates not just speaking truth, but embodying truth in every aspect of one\'s being - in belief, in speech, and in action.',
    contentFr: 'Le titre « Siddiq » (le véridique) est parmi les plus hauts honneurs en Islam. Il fut également donné à Abu Bakr, le plus proche compagnon du Prophète Muhammad, paix et bénédictions sur lui. Ce titre indique non seulement dire la vérité, mais incarner la vérité dans chaque aspect de son être — dans la croyance, dans la parole et dans l\'action.',
  },

  // ============ PART 5: RAISED TO A HIGH STATION ============
  {
    id: 'idris-13',
    type: 'narrative',
    order: 12,
    content: 'Allah honoured Prophet Idris by raising him to a high station: \"And We raised him to a high station.\" (19:57) The Quran does not say more than this, and neither does the authentic Sunnah.',
    contentFr: "Allah honora le Prophète Idris en l'élevant à un rang élevé : « Et Nous l'élevâmes à un rang élevé. » (19:57) Le Coran n'en dit pas davantage, et la Sunna authentique non plus.",
  },
  {
    id: 'idris-14',
    type: 'narrative',
    order: 13,
    content: "The Prophet ﷺ met Idris in the fourth heaven during the Night Journey, just as he met Ibrahim, Musa and other prophets in the heavens. The Quran says that Allah raised him to a high station, and says no more than that.",
    contentFr: "Le Prophète ﷺ rencontra Idris dans le quatrième ciel lors du Voyage nocturne, tout comme il rencontra Ibrahim, Moussa et d'autres prophètes dans les cieux. Le Coran dit qu'Allah l'éleva à un rang élevé, et n'en dit pas davantage.",
  },
  {
    id: 'idris-15',
    type: 'hadith_source',
    order: 14,
    content: 'The Prophet Muhammad described meeting Idris in the fourth heaven during the Miraj.',
    contentFr: "Le Prophète Muhammad décrivit sa rencontre avec Idris au quatrième ciel lors du Mi'raj.",
    source: {
      type: 'hadith',
      collection: 'muslim',
      narrator: 'Anas ibn Malik',
      arabicText: 'ثُمَّ عَرَجَ بِنَا إِلَى السَّمَاءِ الرَّابِعَةِ فَاسْتَفْتَحَ جِبْرِيلُ فَقِيلَ مَنْ هَذَا قَالَ جِبْرِيلُ قِيلَ وَمَنْ مَعَكَ قَالَ مُحَمَّدٌ فَفُتِحَ لَنَا فَإِذَا أَنَا بِإِدْرِيسَ فَرَحَّبَ وَدَعَا لِي بِخَيْرٍ',
      translation: 'Then he (Jibril) ascended with us to the fourth heaven, and Jibril sought permission to enter. It was said, "Who is this?" He said, "Jibril." It was said, "And who is with you?" He said, "Muhammad." So it was opened for us, and there was Idris. He welcomed me and prayed for good for me.',
      translationFr: 'Puis il (Jibril) monta avec nous au quatrième ciel, et Jibril demanda la permission d\'entrer. On dit : « Qui est-ce ? » Il dit : « Jibril. » On dit : « Et qui est avec toi ? » Il dit : « Muhammad. » Alors on nous ouvrit, et il y avait Idris. Il me souhaita la bienvenue et fit des invocations de bien pour moi.',
      grade: 'sahih',
    } as HadithReference,
  },

  // ============ PART 6: AMONG THE PATIENT ONES ============
  {
    id: 'idris-16',
    type: 'narrative',
    order: 15,
    content: 'In another place in the Quran, Allah mentions Prophet Idris alongside other great prophets, praising them for their patience and righteousness. He is mentioned with Ismail and Dhul-Kifl, all of whom were known for their steadfastness in the face of trials.',
    contentFr: "Dans un autre endroit du Coran, Allah mentionne le Prophète Idris aux côtés d'autres grands prophètes, les louant pour leur patience et leur droiture. Il est mentionné avec Ismaïl et Dhoul-Kifl, tous connus pour leur fermeté face aux épreuves.",
  },
  {
    id: 'idris-17',
    type: 'quran_source',
    order: 16,
    content: 'Allah mentions Idris among the patient and righteous.',
    contentFr: 'Allah mentionne Idris parmi les patients et les vertueux.',
    source: {
      type: 'quran',
      surahNumber: 21,
      surahNameEnglish: 'Al-Anbiya',
      surahNameArabic: 'الأنبياء',
      ayahStart: 85,
      ayahEnd: 86,
      arabicText: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ ﴿٨٥﴾ وَأَدْخَلْنَاهُمْ فِي رَحْمَتِنَا ۖ إِنَّهُم مِّنَ الصَّالِحِينَ ﴿٨٦﴾',
      translation: 'And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.',
      translationFr: 'Et [mentionne] Ismaïl, Idris et Dhoul-Kifl ; tous étaient parmi les patients. Et Nous les avons admis dans Notre miséricorde. En vérité, ils étaient parmi les vertueux.',
    } as QuranReference,
  },
  {
    id: 'idris-18',
    type: 'narrative',
    order: 17,
    content: 'The patience (sabr) mentioned here encompasses many meanings: patience in worshipping Allah, patience in avoiding sins, patience when facing hardship, and patience in calling people to the truth despite their rejection. Prophet Idris exemplified all of these forms of patience throughout his blessed life.',
    contentFr: "La patience (sabr) mentionnée ici englobe de nombreuses significations : la patience dans l'adoration d'Allah, la patience pour éviter les péchés, la patience face aux épreuves, et la patience à appeler les gens à la vérité malgré leur rejet. Le Prophète Idris exemplifia toutes ces formes de patience tout au long de sa vie bénie.",
  },

  // ============ PART 7: HIS MESSAGE AND TEACHINGS ============
  {
    id: 'idris-19',
    type: 'narrative',
    order: 18,
    content: 'Like all prophets, the core message of Idris was the worship of Allah alone without any partners. He called his people to pure monotheism (tawhid), to establish prayer, to give charity, and to prepare for the Day of Judgment. His teachings laid the foundation for the prophets who would come after him.',
    contentFr: "Comme tous les prophètes, le message central d'Idris était l'adoration d'Allah seul sans aucun associé. Il appela son peuple au monothéisme pur (tawhid), à établir la prière, à donner l'aumône et à se préparer pour le Jour du Jugement. Ses enseignements posèrent les fondations pour les prophètes qui viendraient après lui.",
  },
  {
    id: 'idris-20',
    type: 'narrative',
    order: 19,
    content: 'Prophet Idris taught his people about the importance of purifying the soul through worship and good deeds. He emphasized that this worldly life is temporary and that the real success lies in the Hereafter. He warned them against following their base desires and reminded them constantly of their meeting with their Lord.',
    contentFr: "Le Prophète Idris enseigna à son peuple l'importance de purifier l'âme par l'adoration et les bonnes actions. Il souligna que cette vie mondaine est temporaire et que le vrai succès réside dans l'Au-delà. Il les mit en garde contre le fait de suivre leurs désirs bas et leur rappela constamment leur rencontre avec leur Seigneur.",
  },

  // ============ PART 9: HIS LEGACY ============
  {
    id: 'idris-25',
    type: 'narrative',
    order: 20,
    content: 'What the Quran leaves of Prophet Idris is what it states of him: \"Indeed, he was a man of truth and a prophet.\" (19:56) He is named with Ismail and Dhul-Kifl among the patient (21:85), and Allah raised him to a high station.',
    contentFr: "Ce que le Coran laisse du Prophète Idris est ce qu'il énonce de lui : « C'était un véridique et un prophète. » (19:56) Il est nommé avec Ismaïl et Dhoul-Kifl parmi les endurants (21:85), et Allah l'éleva à un rang élevé.",
  },
  {
    id: 'idris-26',
    type: 'narrative',
    order: 21,
    content: "Some scholars mention that Idris received revealed scrolls (suhuf). The report specifying thirty scrolls comes from a long hadith of Abu Dharr recorded by Ibn Hibban and others, which most hadith scholars graded weak. The Quran itself confirms only that he was a prophet, and that is sufficient.",
    contentFr: "Certains savants mentionnent qu'Idris reçut des feuillets révélés (suhuf). Le récit précisant trente feuillets provient d'un long hadith d'Abu Dharr rapporté par Ibn Hibban et d'autres, que la plupart des savants du hadith ont jugé faible. Le Coran lui-même confirme seulement qu'il fut un prophète, et cela suffit.",
  },
  {
    id: 'idris-27',
    type: 'hadith_source',
    order: 22,
    content: "A weak narration recorded by Ibn Hibban from Abu Dharr mentions the number of scrolls; it is cited here for awareness, not as an established fact.",
    contentFr: "Un récit faible rapporté par Ibn Hibban d'après Abu Dharr mentionne le nombre de feuillets ; il est cité ici à titre d'information, non comme un fait établi.",
    source: {
      type: 'hadith',
      collection: "other",
      narrator: 'Abu Dharr al-Ghifari',
      arabicText: 'أُنْزِلَ عَلَى إِدْرِيسَ ثَلَاثُونَ صَحِيفَةً',
      translation: 'Thirty scriptures were revealed to Idris.',
      translationFr: 'Trente feuillets furent révélés à Idris.',
      grade: "daif",
    } as HadithReference,
  },

  // ============ PART 10: LESSONS FROM HIS LIFE ============
  {
    id: 'idris-28',
    type: 'narrative',
    order: 23,
    content: 'The story of Prophet Idris teaches us that true honor comes from knowledge and worship combined. He was not raised to a high station because of wealth or power, but because of his truthfulness, patience, and devotion to Allah. His example shows that spiritual elevation is available to all who sincerely seek it.',
    contentFr: "L'histoire du Prophète Idris nous enseigne que le véritable honneur vient de la combinaison du savoir et de l'adoration. Il ne fut pas élevé à un haut rang en raison de la richesse ou du pouvoir, mais en raison de sa véracité, de sa patience et de sa dévotion à Allah. Son exemple montre que l'élévation spirituelle est accessible à tous ceux qui la recherchent sincèrement.",
  },
  {
    id: 'idris-29',
    type: 'narrative',
    order: 24,
    content: "The Prophet ﷺ said: \"Whoever introduces a good practice in Islam has its reward and the reward of whoever acts upon it after him, without that diminishing their own rewards in any way.\" (Muslim 1017)",
    contentFr: "Le Prophète ﷺ a dit : « Quiconque instaure en Islam une bonne pratique en a la récompense, ainsi que la récompense de ceux qui l'accomplissent après lui, sans que cela ne diminue en rien leurs propres récompenses. » (Mouslim 1017)",
  },
  {
    id: 'idris-30',
    type: 'hadith_source',
    order: 25,
    content: 'The Prophet Muhammad spoke about the reward of initiating good practices.',
    contentFr: 'Le Prophète Muhammad parla de la récompense de celui qui initie de bonnes pratiques.',
    source: {
      type: 'hadith',
      collection: 'muslim',
      narrator: 'Jarir ibn Abdullah',
      arabicText: 'مَنْ سَنَّ فِي الإِسْلاَمِ سُنَّةً حَسَنَةً فَلَهُ أَجْرُهَا وَأَجْرُ مَنْ عَمِلَ بِهَا بَعْدَهُ مِنْ غَيْرِ أَنْ يَنْقُصَ مِنْ أُجُورِهِمْ شَيْءٌ',
      translation: 'Whoever initiates a good practice in Islam will have its reward and the reward of everyone who acts upon it after him, without that detracting from their rewards in the slightest.',
      translationFr: "Quiconque initie une bonne pratique en Islam aura sa récompense et la récompense de tous ceux qui agissent selon elle après lui, sans que cela ne diminue en rien leurs récompenses.",
      grade: 'sahih',
    } as HadithReference,
  },
  {
    id: 'idris-31',
    type: 'narrative',
    order: 26,
    content: 'Finally, Prophet Idris reminds us that patience is essential on the path to Allah. The Quran explicitly mentions him among "the patient ones." In our own lives, we face many trials and challenges. The example of Idris encourages us to remain steadfast, knowing that Allah is with those who are patient.',
    contentFr: "Enfin, le Prophète Idris nous rappelle que la patience est essentielle sur le chemin vers Allah. Le Coran le mentionne explicitement parmi « les patients ». Dans nos propres vies, nous faisons face à de nombreuses épreuves et défis. L'exemple d'Idris nous encourage à rester fermes, sachant qu'Allah est avec ceux qui sont patients.",
  },
  {
    id: 'idris-32',
    type: 'narrative',
    order: 27,
    content: 'May Allah have mercy upon Prophet Idris, the truthful one, the patient one, the one raised to a high station. May we learn from his example of combining knowledge with worship, and may we strive to follow in his footsteps of truthfulness and patience. And may peace and blessings be upon all the prophets of Allah.',
    contentFr: "Qu'Allah ait pitié du Prophète Idris, le véridique, le patient, celui qui fut élevé à un haut rang. Puissions-nous apprendre de son exemple de combinaison du savoir et de l'adoration, et puissions-nous nous efforcer de suivre ses pas de véracité et de patience. Et que la paix et les bénédictions soient sur tous les prophètes d'Allah.",
  },
];

// Export sub-stories array (single story, no divisions)
export const idrisSubStories: SubStory[] = [
  {
    id: 'idris-main',
    prophetId: 'idris',
    title: 'The Story of Prophet Idris',
    titleArabic: 'قصة النبي إدريس',
    order: 31,
    content: idrisStoryContent,
    estimatedReadTime: 15,
  },
];
