// Story of Prophet Yahya (يحيى) - The Pure and Devout
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Yahya is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const yahyaStory: Prophet = {
  id: 'yahya',
  nameEnglish: 'Yahya',
  nameFrench: 'Yahya',
  nameArabic: 'يحيى',
  order: 23,
  title: 'The Pure and Devout',
  titleFr: 'Le Pur et le Dévot',
  titleArabic: 'الطاهر التقي',
  summary: "Yahya was announced to his father Zakariya by the angels while he stood in prayer, and given a name no one had been given before. He was told: take the Scripture with determination - and was given judgement while still a boy, and affection from Allah, and purity; he feared Allah, was dutiful to his parents, and was not a disobedient tyrant. Peace be upon him the day he was born, the day he dies, and the day he is raised alive. The Prophet ﷺ met him with Isa in the second heaven.",
  summaryFr: "Yahya fut annoncé à son père Zakariya par les anges tandis qu'il se tenait en prière, et reçut un nom que nul n'avait porté avant lui. Il lui fut dit : prends le Livre avec force - et il reçut le jugement encore enfant, et la tendresse d'Allah, et la pureté ; il craignait Allah, était bon envers ses parents, et n'était ni violent ni désobéissant. Paix sur lui le jour où il naquit, le jour où il mourra, et le jour où il sera ressuscité. Le Prophète ﷺ le rencontra avec Issa au deuxième ciel.",
  hasSubStories: false,
  lessons: [
    "He was named by Allah before he was born, with a name no one had carried. Some things about a person are decided before there is a person (19:7).",
    "\"O Yahya, take the Scripture with determination.\" The first command recorded to him is not about what to believe but how to hold it (19:12).",
    "\"And We gave him judgement while yet a boy.\" Wisdom is not tied to age; it is given (19:12).",
    "The Quran lists what he was given - affection, purity, fear of Allah, dutifulness to his parents - and what he was not: a disobedient tyrant. A life described in five words and one negation (19:13-14).",
    "\"Peace be upon him the day he was born, the day he dies, and the day he is raised alive.\" The three hardest days of a life are covered by one greeting (19:15).",
    "He was \"confirming a word from Allah\" - he came to bear witness to Isa. A prophet whose task included pointing to another (3:39).",
    "The Prophet ﷺ met him in the second heaven beside Isa, and called them the two maternal cousins. Two prophets born to two women who were each told the impossible (Bukhari 3887).",
  ],
  lessonsFr: [
    "Il fut nommé par Allah avant de naître, d'un nom que nul n'avait porté. Certaines choses d'une personne sont décidées avant qu'il y ait une personne (19:7).",
    "« Ô Yahya, prends le Livre avec force. » Le premier ordre qui lui est adressé ne porte pas sur ce qu'il faut croire mais sur la manière de le tenir (19:12).",
    "« Et Nous lui donnâmes la sagesse alors qu'il était enfant. » La sagesse n'est pas liée à l'âge ; elle est donnée (19:12).",
    "Le Coran énumère ce qui lui fut donné - tendresse, pureté, crainte d'Allah, bonté envers ses parents - et ce qu'il n'était pas : un tyran désobéissant. Une vie décrite en cinq mots et une négation (19:13-14).",
    "« Paix sur lui le jour où il naquit, le jour où il mourra, et le jour où il sera ressuscité. » Les trois jours les plus durs d'une vie sont couverts par une seule salutation (19:15).",
    "Il « confirmait une parole d'Allah » - il vint témoigner d'Issa. Un prophète dont la mission incluait d'en désigner un autre (3:39).",
    "Le Prophète ﷺ le rencontra au deuxième ciel à côté d'Issa, et les appela les deux cousins maternels. Deux prophètes nés de deux femmes à qui l'on avait dit l'impossible (Boukhari 3887).",
  ],
  estimatedReadTime: 12,
  quranMentions: 5,
  icon: '🌿',
};

// Single continuous story (no sub-stories)
export const yahyaStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'yahya-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Yahya, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran gives his birth in Surah Al Imran and Maryam, and his description in four verses. It does not tell his life or his death - and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Yahya, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran donne sa naissance dans la sourate Al Imran et Maryam, et sa description en quatre versets. Il ne raconte ni sa vie ni sa mort - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: A NAME GIVEN TO NO ONE BEFORE ============
  {
    id: 'yahya-2',
    type: 'narrative',
    order: 2,
    content: "His father asked for a good offspring, and the angels answered while he stood in prayer: Allah gives you good tidings of Yahya - and said what Yahya would be.",
    contentFr: "Son père demanda une bonne descendance, et les anges répondirent tandis qu'il se tenait en prière : Allah t'annonce Yahya - et dirent ce que Yahya serait.",
  },
  {
    id: 'yahya-3',
    type: 'quran_source',
    order: 3,
    content: "\"Allah gives you good tidings of Yahya, confirming a word from Allah.\"",
    contentFr: "« Allah t'annonce Yahya, confirmateur d'une parole d'Allah. »",
    source: {
      type: "quran",
      surahNumber: 3,
      surahNameEnglish: "Ali 'Imran",
      surahNameArabic: "آل عمران",
      ayahStart: 38,
      ayahEnd: 41,
      arabicText: "هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُۥ ۖ قَالَ رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ ۝ فَنَادَتْهُ ٱلْمَلَـٰٓئِكَةُ وَهُوَ قَآئِمٌ يُصَلِّى فِى ٱلْمِحْرَابِ أَنَّ ٱللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًۢا بِكَلِمَةٍ مِّنَ ٱللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِّنَ ٱلصَّـٰلِحِينَ ۝ قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَقَدْ بَلَغَنِىَ ٱلْكِبَرُ وَٱمْرَأَتِى عَاقِرٌ ۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفْعَلُ مَا يَشَآءُ ۝ قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۖ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَٱذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِٱلْعَشِىِّ وَٱلْإِبْكَـٰرِ",
      translation: "At that, Zakariya called upon his Lord, saying, \"My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.\" So the angels called him while he was standing in prayer in the chamber, \"Indeed, Allah gives you good tidings of Yahya, confirming a word from Allah and [who will be] honorable, abstaining [from women], and a prophet from among the righteous.\" He said, \"My Lord, how will I have a boy when I have reached old age and my wife is barren?\" He [the angel] said, \"Such is Allah; He does what He wills.\" He said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not [be able to] speak to the people for three days except by gesture. And remember your Lord much and exalt [Him with praise] in the evening and the morning.\"",
      translationFr: "Zakariya invoqua alors son Seigneur en disant : « Seigneur ! Donne-moi une bonne descendance, car c’est Toi Qui Entends Toute prière ! » Les Anges l’appelèrent aussitôt, pendant qu’il était debout et priait dans le sanctuaire : « Allah t’annonce une heureuse nouvelle : la naissance prochaine de Yahya (Yahya), qui viendra confirmer la Parole d’Allah. Ce sera un homme d’une grande noblesse, chaste et un Prophète parmi les vertueux. » Il dit : « Seigneur ! Comment pourrait-il me naître un garçon alors que je suis atteint par le grand âge et que ma femme est stérile ? » (Allah) répondit : « Ainsi en sera-t-il, Allah fait ce qu’Il veut. » Il dit : « Seigneur ! Que me vienne un signe de Toi ! » – « Ton signe, répondit Allah, sera de t’abstenir de parler aux gens pendant trois jours, si ce n’est par gestes. Invoque abondamment ton Seigneur, rends-Lui gloire, matin et soir ! »",
    } as QuranReference,
  },
  {
    id: 'yahya-4',
    type: 'narrative',
    order: 4,
    content: "﴿هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُۥ ۖ قَالَ رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ﴾ At that, Zakariya called upon his Lord, saying, \"My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.\" ﴿فَنَادَتْهُ ٱلْمَلَـٰٓئِكَةُ وَهُوَ قَآئِمٌ يُصَلِّى فِى ٱلْمِحْرَابِ أَنَّ ٱللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًۢا بِكَلِمَةٍ مِّنَ ٱللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِّنَ ٱلصَّـٰلِحِينَ﴾ So the angels called him while he was standing in prayer in the chamber, \"Indeed, Allah gives you good tidings of Yahya, confirming a word from Allah and [who will be] honorable, abstaining [from women], and a prophet from among the righteous.\" ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَقَدْ بَلَغَنِىَ ٱلْكِبَرُ وَٱمْرَأَتِى عَاقِرٌ ۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفْعَلُ مَا يَشَآءُ﴾ He said, \"My Lord, how will I have a boy when I have reached old age and my wife is barren?\" He [the angel] said, \"Such is Allah; He does what He wills.\" ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۖ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَٱذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِٱلْعَشِىِّ وَٱلْإِبْكَـٰرِ﴾ He said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not [be able to] speak to the people for three days except by gesture. And remember your Lord much and exalt [Him with praise] in the evening and the morning.\"",
    contentFr: "﴿هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُۥ ۖ قَالَ رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ﴾ Zakariya invoqua alors son Seigneur en disant : « Seigneur ! Donne-moi une bonne descendance, car c’est Toi Qui Entends Toute prière ! » ﴿فَنَادَتْهُ ٱلْمَلَـٰٓئِكَةُ وَهُوَ قَآئِمٌ يُصَلِّى فِى ٱلْمِحْرَابِ أَنَّ ٱللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًۢا بِكَلِمَةٍ مِّنَ ٱللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِّنَ ٱلصَّـٰلِحِينَ﴾ Les Anges l’appelèrent aussitôt, pendant qu’il était debout et priait dans le sanctuaire : « Allah t’annonce une heureuse nouvelle : la naissance prochaine de Yahya (Yahya), qui viendra confirmer la Parole d’Allah. Ce sera un homme d’une grande noblesse, chaste et un Prophète parmi les vertueux. » ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَقَدْ بَلَغَنِىَ ٱلْكِبَرُ وَٱمْرَأَتِى عَاقِرٌ ۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفْعَلُ مَا يَشَآءُ﴾ Il dit : « Seigneur ! Comment pourrait-il me naître un garçon alors que je suis atteint par le grand âge et que ma femme est stérile ? » (Allah) répondit : « Ainsi en sera-t-il, Allah fait ce qu’Il veut. » ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۖ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَٱذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِٱلْعَشِىِّ وَٱلْإِبْكَـٰرِ﴾ Il dit : « Seigneur ! Que me vienne un signe de Toi ! » – « Ton signe, répondit Allah, sera de t’abstenir de parler aux gens pendant trois jours, si ce n’est par gestes. Invoque abondamment ton Seigneur, rends-Lui gloire, matin et soir ! »",
  },
  {
    id: 'yahya-5',
    type: 'narrative',
    order: 5,
    content: "Surah Maryam gives his father's prayer whole, and the answer: a boy whose name will be Yahya, a name assigned to no one before.",
    contentFr: "La sourate Maryam donne la prière de son père en entier, et la réponse : un garçon dont le nom sera Yahya, un nom attribué à nul auparavant.",
  },
  {
    id: 'yahya-6',
    type: 'quran_source',
    order: 6,
    content: "\"We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before this name.\"",
    contentFr: "« Nous t'annonçons un garçon dont le nom sera Yahya. Nous n'avons donné ce nom à personne avant lui. »",
    source: {
      type: "quran",
      surahNumber: 19,
      surahNameEnglish: "Maryam",
      surahNameArabic: "مريم",
      ayahStart: 2,
      ayahEnd: 11,
      arabicText: "ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ ۝ إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا ۝ قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا ۝ وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا ۝ يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا ۝ يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا ۝ قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا ۝ قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا ۝ قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا ۝ فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا",
      translation: "[This is] a mention of the mercy of your Lord to His servant Zakariya When he called to his Lord a private call [i.e., supplication]. He said, \"My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy [i.e., disappointed]. And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir Who will inherit me and inherit from the family of Yaqub. And make him, my Lord, pleasing [to You].\" [He was told], \"O Zakariya, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before [this] name.\" He said, \"My Lord, how will I have a boy when my wife has been barren and I have reached extreme old age?\" [An angel] said, \"Thus [it will be]; your Lord says, 'It is easy for Me, for I created you before, while you were nothing.'\" [Zakariya] said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not speak to the people for three nights, [being] sound.\" So he came out to his people from the prayer chamber and signaled to them to exalt [Allah] in the morning and afternoon.",
      translationFr: "Ceci est le récit évoquant la grâce de ton Seigneur envers son serviteur Zakariya, lorsqu’il appela son Seigneur d’un appel discret. Il dit : « Seigneur, mes os ont vieilli et ma tête s’est enflammée de canitie, mais jamais, en T’invoquant, mon Seigneur, je n’ai été malheureux. Je crains (le comportement de) mes proches après (ma mort) et ma femme est stérile. Veuille donc, de Ta part, me faire don d’un descendant, qui tienne de moi et de la famille de Yaqub. Et fais, ô Seigneur, qu’il te soit agréable. » « Ô Zakariya, Nous t’annonçons l’heureuse nouvelle (de la naissance) d’un fils dont le nom sera Yahya (Yahya) et auquel Nous n’avons jamais donné d’homonyme. » « Ô Seigneur, dit Zakariya, comment pourrait-il me naître un garçon quand ma femme est stérile, et que moi-même j’ai atteint l’âge sénile. » « Il en sera ainsi, répondit (Allah). Ton Seigneur a dit : “Cela M’est facile. Avant cela, Je t’ai bien créé quand tu n’étais rien. ”» « Seigneur, dit (Zakariya), donne-moi un Signe. » « Ton Signe, répondit (Allah), sera de ne pas parler aux gens durant trois nuits, bien que bien portant. » Il sortit alors du sanctuaire, alla trouver les siens et leur signifia de rendre gloire (à Allah) matin et soir.",
    } as QuranReference,
  },
  {
    id: 'yahya-7',
    type: 'narrative',
    order: 7,
    content: "﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ﴾ [This is] a mention of the mercy of your Lord to His servant Zakariya ﴿إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا﴾ When he called to his Lord a private call [i.e., supplication]. ﴿قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا﴾ He said, \"My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy [i.e., disappointed]. ﴿وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا﴾ And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir ﴿يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا﴾ Who will inherit me and inherit from the family of Yaqub. And make him, my Lord, pleasing [to You].\" ﴿يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا﴾ [He was told], \"O Zakariya, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before [this] name.\" ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا﴾ He said, \"My Lord, how will I have a boy when my wife has been barren and I have reached extreme old age?\" ﴿قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا﴾ [An angel] said, \"Thus [it will be]; your Lord says, 'It is easy for Me, for I created you before, while you were nothing.'\" ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا﴾ [Zakariya] said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not speak to the people for three nights, [being] sound.\" ﴿فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا﴾ So he came out to his people from the prayer chamber and signaled to them to exalt [Allah] in the morning and afternoon.",
    contentFr: "﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ﴾ Ceci est le récit évoquant la grâce de ton Seigneur envers son serviteur Zakariya, ﴿إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا﴾ lorsqu’il appela son Seigneur d’un appel discret. ﴿قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا﴾ Il dit : « Seigneur, mes os ont vieilli et ma tête s’est enflammée de canitie, mais jamais, en T’invoquant, mon Seigneur, je n’ai été malheureux. ﴿وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا﴾ Je crains (le comportement de) mes proches après (ma mort) et ma femme est stérile. Veuille donc, de Ta part, me faire don d’un descendant, ﴿يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا﴾ qui tienne de moi et de la famille de Yaqub. Et fais, ô Seigneur, qu’il te soit agréable. » ﴿يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا﴾ « Ô Zakariya, Nous t’annonçons l’heureuse nouvelle (de la naissance) d’un fils dont le nom sera Yahya (Yahya) et auquel Nous n’avons jamais donné d’homonyme. » ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا﴾ « Ô Seigneur, dit Zakariya, comment pourrait-il me naître un garçon quand ma femme est stérile, et que moi-même j’ai atteint l’âge sénile. » ﴿قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا﴾ « Il en sera ainsi, répondit (Allah). Ton Seigneur a dit : “Cela M’est facile. Avant cela, Je t’ai bien créé quand tu n’étais rien. ”» ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا﴾ « Seigneur, dit (Zakariya), donne-moi un Signe. » « Ton Signe, répondit (Allah), sera de ne pas parler aux gens durant trois nuits, bien que bien portant. » ﴿فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا﴾ Il sortit alors du sanctuaire, alla trouver les siens et leur signifia de rendre gloire (à Allah) matin et soir.",
  },
  {
    id: 'yahya-8',
    type: 'narrative',
    order: 8,
    content: "Surah Al-Anbiya says he was given as an answer, and his mother made able - and says what his house was like.",
    contentFr: "La sourate Al-Anbiya dit qu'il fut donné en réponse, et sa mère rendue capable - et dit ce qu'était sa maison.",
  },
  {
    id: 'yahya-9',
    type: 'quran_source',
    order: 9,
    content: "\"We gave to him Yahya, and amended for him his wife.\"",
    contentFr: "« Nous lui donnâmes Yahya, et rendîmes sa femme capable d'enfanter. »",
    source: {
      type: "quran",
      surahNumber: 21,
      surahNameEnglish: "Al-Anbiya",
      surahNameArabic: "الأنبياء",
      ayahStart: 89,
      ayahEnd: 90,
      arabicText: "وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ ۝ فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ",
      translation: "And [mention] Zakariya, when he called to his Lord, \"My Lord, do not leave me alone [with no heir], while You are the best of inheritors.\" So We responded to him, and We gave to him Yahya, and amended for him his wife. Indeed, they used to hasten to good deeds and supplicate Us in hope and fear, and they were to Us humbly submissive.",
      translationFr: "Et Zakariya, qui supplia son Seigneur : « Seigneur, ne me laisse pas seul (sans descendance), Toi le meilleur des héritiers ! » Nous l’exauçâmes, (lui aussi), lui fîmes don de Yahya (Yahya le Baptiste) et guérîmes son épouse. Tous rivalisaient de vertu et Nous invoquaient pleins d’espoir et avec crainte ; tous se recueillaient, humbles devant Nous.",
    } as QuranReference,
  },
  {
    id: 'yahya-10',
    type: 'narrative',
    order: 10,
    content: "﴿وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ﴾ And [mention] Zakariya, when he called to his Lord, \"My Lord, do not leave me alone [with no heir], while You are the best of inheritors.\" ﴿فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ﴾ So We responded to him, and We gave to him Yahya, and amended for him his wife. Indeed, they used to hasten to good deeds and supplicate Us in hope and fear, and they were to Us humbly submissive.",
    contentFr: "﴿وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ﴾ Et Zakariya, qui supplia son Seigneur : « Seigneur, ne me laisse pas seul (sans descendance), Toi le meilleur des héritiers ! » ﴿فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ﴾ Nous l’exauçâmes, (lui aussi), lui fîmes don de Yahya (Yahya le Baptiste) et guérîmes son épouse. Tous rivalisaient de vertu et Nous invoquaient pleins d’espoir et avec crainte ; tous se recueillaient, humbles devant Nous.",
  },

  // ============ PART 2: WHAT HE WAS ============
  {
    id: 'yahya-11',
    type: 'narrative',
    order: 11,
    content: "Then the Quran speaks to him, and of him: take the Scripture with determination; judgement while a boy; affection and purity; fear of Allah; dutiful to his parents; not a disobedient tyrant. And the greeting over his three days.",
    contentFr: "Puis le Coran lui parle, et parle de lui : prends le Livre avec force ; le jugement encore enfant ; la tendresse et la pureté ; la crainte d'Allah ; bon envers ses parents ; ni violent ni désobéissant. Et la salutation sur ses trois jours.",
  },
  {
    id: 'yahya-12',
    type: 'quran_source',
    order: 12,
    content: "\"O Yahya, take the Scripture with determination.\" Peace upon him the day he was born.",
    contentFr: "« Ô Yahya, prends le Livre avec force. » Paix sur lui le jour où il naquit.",
    source: {
      type: "quran",
      surahNumber: 19,
      surahNameEnglish: "Maryam",
      surahNameArabic: "مريم",
      ayahStart: 12,
      ayahEnd: 15,
      arabicText: "يَـٰيَحْيَىٰ خُذِ ٱلْكِتَـٰبَ بِقُوَّةٍ ۖ وَءَاتَيْنَـٰهُ ٱلْحُكْمَ صَبِيًّا ۝ وَحَنَانًا مِّن لَّدُنَّا وَزَكَوٰةً ۖ وَكَانَ تَقِيًّا ۝ وَبَرًّۢا بِوَٰلِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا ۝ وَسَلَـٰمٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا",
      translation: "[Allah said], \"O Yahya, take the Scripture [i.e., adhere to it] with determination.\" And We gave him judgement [while yet] a boy And affection from Us and purity, and he was fearing of Allah And dutiful to his parents, and he was not a disobedient tyrant. And peace be upon him the day he was born and the day he dies and the day he is raised alive.",
      translationFr: "« Ô Yahya ! Prends le Livre avec fermeté. » Et Nous lui avons donné le discernement depuis qu’il était enfant, Ainsi que l’affection et la pureté, par Notre grâce ; et il était pieux, bon avec ses parents, et n’était ni arrogant ni rebelle. La paix soit sur lui le jour où il est né, le jour où il sera mort et le jour où il sera ressuscité.",
    } as QuranReference,
  },
  {
    id: 'yahya-13',
    type: 'narrative',
    order: 13,
    content: "﴿يَـٰيَحْيَىٰ خُذِ ٱلْكِتَـٰبَ بِقُوَّةٍ ۖ وَءَاتَيْنَـٰهُ ٱلْحُكْمَ صَبِيًّا﴾ [Allah said], \"O Yahya, take the Scripture [i.e., adhere to it] with determination.\" And We gave him judgement [while yet] a boy ﴿وَحَنَانًا مِّن لَّدُنَّا وَزَكَوٰةً ۖ وَكَانَ تَقِيًّا﴾ And affection from Us and purity, and he was fearing of Allah ﴿وَبَرًّۢا بِوَٰلِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا﴾ And dutiful to his parents, and he was not a disobedient tyrant. ﴿وَسَلَـٰمٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا﴾ And peace be upon him the day he was born and the day he dies and the day he is raised alive.",
    contentFr: "﴿يَـٰيَحْيَىٰ خُذِ ٱلْكِتَـٰبَ بِقُوَّةٍ ۖ وَءَاتَيْنَـٰهُ ٱلْحُكْمَ صَبِيًّا﴾ « Ô Yahya ! Prends le Livre avec fermeté. » Et Nous lui avons donné le discernement depuis qu’il était enfant, ﴿وَحَنَانًا مِّن لَّدُنَّا وَزَكَوٰةً ۖ وَكَانَ تَقِيًّا﴾ Ainsi que l’affection et la pureté, par Notre grâce ; et il était pieux, ﴿وَبَرًّۢا بِوَٰلِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا﴾ bon avec ses parents, et n’était ni arrogant ni rebelle. ﴿وَسَلَـٰمٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا﴾ La paix soit sur lui le jour où il est né, le jour où il sera mort et le jour où il sera ressuscité.",
  },

  // ============ PART 3: WHERE ELSE THE QURAN NAMES HIM ============
  {
    id: 'yahya-14',
    type: 'quran_source',
    order: 14,
    content: "Zakariya, Yahya, Isa and Ilyas: all of the righteous.",
    contentFr: "Zakariya, Yahya, Issa et Ilyas : tous des vertueux.",
    source: {
      type: "quran",
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: "الأنعام",
      ayahStart: 85,
      ayahEnd: 85,
      arabicText: "وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ",
      translation: "And Zakariya and Yahya and Isa and Ilyas - and all were of the righteous.",
      translationFr: "Et (il y eut aussi) Zakariya, Yahya le Baptiste, Issa et Ilyas, tous étaient du nombre des vertueux.",
    } as QuranReference,
  },
  {
    id: 'yahya-15',
    type: 'narrative',
    order: 15,
    content: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ And Zakariya and Yahya and Isa and Ilyas - and all were of the righteous.",
    contentFr: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ Et (il y eut aussi) Zakariya, Yahya le Baptiste, Issa et Ilyas, tous étaient du nombre des vertueux.",
  },

  // ============ PART 4: WHAT THE PROPHET ﷺ TOLD OF HIM ============
  {
    id: 'yahya-16',
    type: 'narrative',
    order: 16,
    content: "On the night of the ascension, the Prophet ﷺ met Yahya and Isa together in the second heaven (Sahih al-Bukhari 3887).",
    contentFr: "La nuit de l'ascension, le Prophète ﷺ rencontra Yahya et Issa ensemble au deuxième ciel (Sahih al-Boukhari 3887).",
  },
  {
    id: 'yahya-17',
    type: 'hadith_source',
    order: 17,
    content: "The Prophet ﷺ met Yahya and Isa in the second heaven.",
    contentFr: "Le Prophète ﷺ rencontra Yahya et Issa au deuxième ciel.",
    source: {
      type: "hadith",
      collection: "bukhari",
      hadithNumber: "3887",
      narrator: "Malik ibn Sa'sa'a",
      translation: "Then he ascended with me until we came to the second heaven, and he asked for it to be opened. It was said: Who is this? He said: Jibril. It was said: And who is with you? He said: Muhammad. It was said: Has he been sent for? He said: Yes. It was said: Welcome to him, and what an excellent coming this is! It was opened, and when I passed through, there were Yahya and Isa - and they are the two maternal cousins. He said: These are Yahya and Isa, so greet them. I greeted them, and they returned the greeting, then said: Welcome, O righteous brother and righteous prophet.",
      translationFr: "Puis il monta avec moi jusqu'à ce que nous arrivions au deuxième ciel, et il demanda qu'on lui ouvre. On dit : Qui est-ce ? Il dit : Jibril. On dit : Et qui est avec toi ? Il dit : Muhammad. On dit : A-t-il été envoyé chercher ? Il dit : Oui. On dit : Bienvenue à lui, et quelle excellente venue ! On ouvrit, et quand je passai, il y avait là Yahya et Issa - et ce sont les deux cousins maternels. Il dit : Voici Yahya et Issa, salue-les. Je les saluai, et ils me rendirent le salut, puis dirent : Bienvenue, ô frère vertueux et prophète vertueux.",
      grade: "sahih",
    } as HadithReference,
  },

  // ============ PART 5: WHAT WAS NOT TOLD ============
  {
    id: 'yahya-18',
    type: 'narrative',
    order: 18,
    content: "The Quran does not tell what Yahya did among his people, whom he called, or how he died. It gives his birth, his description, and the peace upon him. What was not told, we leave untold. Allah knows best.",
    contentFr: "Le Coran ne dit ni ce que Yahya fit parmi son peuple, ni qui il appela, ni comment il mourut. Il donne sa naissance, sa description, et la paix sur lui. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const yahyaSubStories: SubStory[] = [
  {
    id: 'yahya-complete',
    prophetId: 'yahya',
    title: 'The Story of Prophet Yahya',
    titleFr: "L'Histoire du Prophète Yahya",
    titleArabic: "قصة نبي الله يحيى",
    order: 1,
    estimatedReadTime: 12,
    content: yahyaStoryContent,
  },
];
