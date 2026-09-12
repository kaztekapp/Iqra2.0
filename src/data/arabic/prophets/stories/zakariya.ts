// Story of Prophet Zakariya (زكريا) - The Guardian of Maryam
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Zakariya is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const zakariyaStory: Prophet = {
  id: 'zakariya',
  nameEnglish: 'Zakariya',
  nameFrench: 'Zakariya',
  nameArabic: 'زكريا',
  order: 1,
  title: 'The Guardian of Maryam',
  titleFr: 'Le Gardien de Maryam',
  titleArabic: 'كافل مريم',
  summary: "Zakariya was given the care of Maryam, and every time he entered her prayer chamber he found provision with her - and it was there that he prayed for a child of his own, an old man with a barren wife: my bones have weakened, my head has filled with white, and never have I been disappointed in calling on You. The angels called him while he stood in prayer with tidings of Yahya, a name given to no one before. His sign was three nights without speech. The Quran says of him and his family: they used to hasten to good deeds and call on Us in hope and fear.",
  summaryFr: "Zakariya reçut la garde de Maryam, et chaque fois qu'il entrait dans son sanctuaire il trouvait auprès d'elle une subsistance - et c'est là qu'il pria pour un enfant à lui, vieillard à la femme stérile : mes os se sont affaiblis, ma tête s'est couverte de blanc, et jamais je n'ai été déçu en T'invoquant. Les anges l'appelèrent tandis qu'il se tenait en prière avec l'annonce de Yahya, un nom donné à nul avant lui. Son signe fut trois nuits sans parole. Le Coran dit de lui et des siens : ils s'empressaient au bien et Nous invoquaient par désir et par crainte.",
  hasSubStories: false,
  lessons: [
    "He saw provision with Maryam that he had not brought, asked where it came from, and heard: from Allah, who provides without account. At that, he prayed for a child. Seeing Allah's gift to someone else was what taught him to ask (3:37-38).",
    "\"My Lord, my bones have weakened and my head has filled with white, and never have I been in my supplication to You disappointed.\" He began his prayer by reminding himself that Allah had never let him down (19:4).",
    "He prayed a private call. The most famous prayer for a child in the Quran was said quietly (19:3).",
    "He did not ask only for a son; he asked for an heir who would inherit from the family of Yaqub, and be pleasing to Allah. He asked for the religion to continue, not for his name to (19:5-6).",
    "\"How will I have a boy when my wife has been barren and I have reached extreme old age?\" \"It is easy for Me, for I created you before, while you were nothing.\" The answer to every 'how' is the first creation (19:8-9).",
    "His sign was silence: three nights without speech, while sound. Even the sign of the gift was a form of worship (19:10-11).",
    "\"They used to hasten to good deeds and supplicate Us in hope and fear, and they were to Us humbly submissive.\" That is the verdict on his house, and it is why the prayer was answered (21:90).",
    "The Prophet ﷺ said Zakariya was a carpenter. A prophet who worked with his hands, whose prayer chamber was the place he received the angels (Muslim 2379).",
  ],
  lessonsFr: [
    "Il vit auprès de Maryam une subsistance qu'il n'avait pas apportée, demanda d'où elle venait, et entendit : d'Allah, qui pourvoit sans compter. Alors il pria pour un enfant. Voir le don d'Allah à quelqu'un d'autre lui apprit à demander (3:37-38).",
    "« Mon Seigneur, mes os se sont affaiblis et ma tête s'est couverte de blanc, et jamais je n'ai été déçu en T'invoquant. » Il commença sa prière en se rappelant qu'Allah ne l'avait jamais abandonné (19:4).",
    "Il fit un appel secret. La prière pour un enfant la plus célèbre du Coran fut dite à voix basse (19:3).",
    "Il ne demanda pas seulement un fils ; il demanda un héritier qui hériterait de la famille de Yaqub, et serait agréé d'Allah. Il demanda que la religion continue, non que son nom continue (19:5-6).",
    "« Comment aurais-je un garçon alors que ma femme est stérile et que j'ai atteint l'extrême vieillesse ? » « Cela M'est facile, car Je t'ai créé auparavant alors que tu n'étais rien. » La réponse à chaque « comment » est la première création (19:8-9).",
    "Son signe fut le silence : trois nuits sans parole, tout en étant sain. Même le signe du don fut une forme d'adoration (19:10-11).",
    "« Ils s'empressaient au bien et Nous invoquaient par désir et par crainte, et ils étaient humbles devant Nous. » C'est le verdict sur sa maison, et c'est pourquoi la prière fut exaucée (21:90).",
    "Le Prophète ﷺ a dit que Zakariya était charpentier. Un prophète qui travaillait de ses mains, et dont le sanctuaire fut le lieu où il reçut les anges (Mouslim 2379).",
  ],
  estimatedReadTime: 15,
  quranMentions: 7,
  icon: '🕯️',
};

// Single continuous story (no sub-stories)
export const zakariyaStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'zakariya-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Zakariya, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran tells of him in Al Imran, Maryam and Al-Anbiya, and each passage is given here whole. It does not say how old he was, what became of him after Yahya, or how he died - and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Zakariya, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran le raconte dans Al Imran, Maryam et Al-Anbiya, et chaque passage est donné ici en entier. Il ne dit ni quel âge il avait, ni ce qu'il advint de lui après Yahya, ni comment il mourut - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: THE CARE OF MARYAM ============
  {
    id: 'zakariya-2',
    type: 'narrative',
    order: 2,
    content: "Al Imran begins before him: the wife of Imran vowed what was in her womb to Allah, delivered a girl, named her Maryam, and sought refuge for her. Allah accepted her - and put her in the care of Zakariya. Then the provision he found with her, and their exchange.",
    contentFr: "Al Imran commence avant lui : la femme d'Imran voua à Allah ce qui était dans son ventre, mit au monde une fille, la nomma Maryam, et chercha refuge pour elle. Allah l'accepta - et la plaça sous la garde de Zakariya. Puis la subsistance qu'il trouvait auprès d'elle, et leur échange.",
  },
  {
    id: 'zakariya-3',
    type: 'quran_source',
    order: 3,
    content: "\"O Maryam, from where is this coming to you?\" \"It is from Allah.\"",
    contentFr: "« Ô Maryam, d'où te vient cela ? » « Cela vient d'Allah. »",
    source: {
      type: "quran",
      surahNumber: 3,
      surahNameEnglish: "Ali 'Imran",
      surahNameArabic: "آل عمران",
      ayahStart: 35,
      ayahEnd: 37,
      arabicText: "إِذْ قَالَتِ ٱمْرَأَتُ عِمْرَٰنَ رَبِّ إِنِّى نَذَرْتُ لَكَ مَا فِى بَطْنِى مُحَرَّرًا فَتَقَبَّلْ مِنِّىٓ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ ۝ فَلَمَّا وَضَعَتْهَا قَالَتْ رَبِّ إِنِّى وَضَعْتُهَآ أُنثَىٰ وَٱللَّهُ أَعْلَمُ بِمَا وَضَعَتْ وَلَيْسَ ٱلذَّكَرُ كَٱلْأُنثَىٰ ۖ وَإِنِّى سَمَّيْتُهَا مَرْيَمَ وَإِنِّىٓ أُعِيذُهَا بِكَ وَذُرِّيَّتَهَا مِنَ ٱلشَّيْطَـٰنِ ٱلرَّجِيمِ ۝ فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنۢبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا ۖ كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا ٱلْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًا ۖ قَالَ يَـٰمَرْيَمُ أَنَّىٰ لَكِ هَـٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ ٱللَّهِ ۖ إِنَّ ٱللَّهَ يَرْزُقُ مَن يَشَآءُ بِغَيْرِ حِسَابٍ",
      translation: "[Mention, O Muhammad], when the wife of Imran said, \"My Lord, indeed I have pledged to You what is in my womb, consecrated [for Your service], so accept this from me. Indeed, You are the Hearing, the Knowing.\" But when she delivered her, she said, \"My Lord, I have delivered a female.\" And Allah was most knowing of what she delivered, and the male is not like the female. \"And I have named her Maryam, and I seek refuge for her in You and [for] her descendants from Satan, the expelled [from the mercy of Allah].\" So her Lord accepted her with good acceptance and caused her to grow in a good manner and put her in the care of Zakariya. Every time Zakariya entered upon her in the prayer chamber, he found with her provision. He said, \"O Maryam, from where is this [coming] to you?\" She said, \"It is from Allah. Indeed, Allah provides for whom He wills without account.\"",
      translationFr: "(Souviens-toi) lorsque la femme d’Imran dit : « Je Te voue en exclusivité ce que je porte dans mon ventre. Veuille donc l’accepter de moi, Toi Qui Entends Tout, Toi Qui es Omniscient ! » Quand elle l’eut mise au monde, elle dit : « J’ai accouché d’une fille. » Allah savait mieux ce qu’elle avait mis au monde. « Et le garçon n’est certes pas comme la fille. Je l’ai nommée Maryam, dit-elle, et je cherche refuge auprès de Toi, pour elle et pour sa descendance, contre Satan le lapidé. » Son Seigneur l’a alors accueillie du meilleur accueil, l’a fait croître de la meilleure croissance et l’a confiée à la garde de Zakariya. Or chaque fois que Zakariya entrait dans le sanctuaire, il trouvait près d’elle de la nourriture. « Ô Maryam ! D’où cela te vient-il ? » lui demandait-il. « Cela est d’Allah, car Allah dispense Ses biens à qui Il veut, sans compter ! »",
    } as QuranReference,
  },
  {
    id: 'zakariya-4',
    type: 'narrative',
    order: 4,
    content: "﴿إِذْ قَالَتِ ٱمْرَأَتُ عِمْرَٰنَ رَبِّ إِنِّى نَذَرْتُ لَكَ مَا فِى بَطْنِى مُحَرَّرًا فَتَقَبَّلْ مِنِّىٓ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ﴾ [Mention, O Muhammad], when the wife of Imran said, \"My Lord, indeed I have pledged to You what is in my womb, consecrated [for Your service], so accept this from me. Indeed, You are the Hearing, the Knowing.\" ﴿فَلَمَّا وَضَعَتْهَا قَالَتْ رَبِّ إِنِّى وَضَعْتُهَآ أُنثَىٰ وَٱللَّهُ أَعْلَمُ بِمَا وَضَعَتْ وَلَيْسَ ٱلذَّكَرُ كَٱلْأُنثَىٰ ۖ وَإِنِّى سَمَّيْتُهَا مَرْيَمَ وَإِنِّىٓ أُعِيذُهَا بِكَ وَذُرِّيَّتَهَا مِنَ ٱلشَّيْطَـٰنِ ٱلرَّجِيمِ﴾ But when she delivered her, she said, \"My Lord, I have delivered a female.\" And Allah was most knowing of what she delivered, and the male is not like the female. \"And I have named her Maryam, and I seek refuge for her in You and [for] her descendants from Satan, the expelled [from the mercy of Allah].\" ﴿فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنۢبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا ۖ كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا ٱلْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًا ۖ قَالَ يَـٰمَرْيَمُ أَنَّىٰ لَكِ هَـٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ ٱللَّهِ ۖ إِنَّ ٱللَّهَ يَرْزُقُ مَن يَشَآءُ بِغَيْرِ حِسَابٍ﴾ So her Lord accepted her with good acceptance and caused her to grow in a good manner and put her in the care of Zakariya. Every time Zakariya entered upon her in the prayer chamber, he found with her provision. He said, \"O Maryam, from where is this [coming] to you?\" She said, \"It is from Allah. Indeed, Allah provides for whom He wills without account.\"",
    contentFr: "﴿إِذْ قَالَتِ ٱمْرَأَتُ عِمْرَٰنَ رَبِّ إِنِّى نَذَرْتُ لَكَ مَا فِى بَطْنِى مُحَرَّرًا فَتَقَبَّلْ مِنِّىٓ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ﴾ (Souviens-toi) lorsque la femme d’Imran dit : « Je Te voue en exclusivité ce que je porte dans mon ventre. Veuille donc l’accepter de moi, Toi Qui Entends Tout, Toi Qui es Omniscient ! » ﴿فَلَمَّا وَضَعَتْهَا قَالَتْ رَبِّ إِنِّى وَضَعْتُهَآ أُنثَىٰ وَٱللَّهُ أَعْلَمُ بِمَا وَضَعَتْ وَلَيْسَ ٱلذَّكَرُ كَٱلْأُنثَىٰ ۖ وَإِنِّى سَمَّيْتُهَا مَرْيَمَ وَإِنِّىٓ أُعِيذُهَا بِكَ وَذُرِّيَّتَهَا مِنَ ٱلشَّيْطَـٰنِ ٱلرَّجِيمِ﴾ Quand elle l’eut mise au monde, elle dit : « J’ai accouché d’une fille. » Allah savait mieux ce qu’elle avait mis au monde. « Et le garçon n’est certes pas comme la fille. Je l’ai nommée Maryam, dit-elle, et je cherche refuge auprès de Toi, pour elle et pour sa descendance, contre Satan le lapidé. » ﴿فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنۢبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا ۖ كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا ٱلْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًا ۖ قَالَ يَـٰمَرْيَمُ أَنَّىٰ لَكِ هَـٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ ٱللَّهِ ۖ إِنَّ ٱللَّهَ يَرْزُقُ مَن يَشَآءُ بِغَيْرِ حِسَابٍ﴾ Son Seigneur l’a alors accueillie du meilleur accueil, l’a fait croître de la meilleure croissance et l’a confiée à la garde de Zakariya. Or chaque fois que Zakariya entrait dans le sanctuaire, il trouvait près d’elle de la nourriture. « Ô Maryam ! D’où cela te vient-il ? » lui demandait-il. « Cela est d’Allah, car Allah dispense Ses biens à qui Il veut, sans compter ! »",
  },

  // ============ PART 2: THE PRAYER, AND THE TIDINGS ============
  {
    id: 'zakariya-5',
    type: 'narrative',
    order: 5,
    content: "At that, he called on his Lord for a good offspring. The angels called him while he stood in prayer in the chamber with tidings of Yahya - and the surah gives his question, the answer, and the sign he asked for.",
    contentFr: "Alors il invoqua son Seigneur pour une bonne descendance. Les anges l'appelèrent tandis qu'il se tenait en prière dans le sanctuaire avec l'annonce de Yahya - et la sourate donne sa question, la réponse, et le signe qu'il demanda.",
  },
  {
    id: 'zakariya-6',
    type: 'quran_source',
    order: 6,
    content: "\"My Lord, grant me from Yourself a good offspring.\" \"Allah gives you good tidings of Yahya.\"",
    contentFr: "« Mon Seigneur, accorde-moi de Ta part une bonne descendance. » « Allah t'annonce Yahya. »",
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
    id: 'zakariya-7',
    type: 'narrative',
    order: 7,
    content: "﴿هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُۥ ۖ قَالَ رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ﴾ At that, Zakariya called upon his Lord, saying, \"My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.\" ﴿فَنَادَتْهُ ٱلْمَلَـٰٓئِكَةُ وَهُوَ قَآئِمٌ يُصَلِّى فِى ٱلْمِحْرَابِ أَنَّ ٱللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًۢا بِكَلِمَةٍ مِّنَ ٱللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِّنَ ٱلصَّـٰلِحِينَ﴾ So the angels called him while he was standing in prayer in the chamber, \"Indeed, Allah gives you good tidings of Yahya, confirming a word from Allah and [who will be] honorable, abstaining [from women], and a prophet from among the righteous.\" ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَقَدْ بَلَغَنِىَ ٱلْكِبَرُ وَٱمْرَأَتِى عَاقِرٌ ۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفْعَلُ مَا يَشَآءُ﴾ He said, \"My Lord, how will I have a boy when I have reached old age and my wife is barren?\" He [the angel] said, \"Such is Allah; He does what He wills.\" ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۖ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَٱذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِٱلْعَشِىِّ وَٱلْإِبْكَـٰرِ﴾ He said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not [be able to] speak to the people for three days except by gesture. And remember your Lord much and exalt [Him with praise] in the evening and the morning.\"",
    contentFr: "﴿هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُۥ ۖ قَالَ رَبِّ هَبْ لِى مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ ٱلدُّعَآءِ﴾ Zakariya invoqua alors son Seigneur en disant : « Seigneur ! Donne-moi une bonne descendance, car c’est Toi Qui Entends Toute prière ! » ﴿فَنَادَتْهُ ٱلْمَلَـٰٓئِكَةُ وَهُوَ قَآئِمٌ يُصَلِّى فِى ٱلْمِحْرَابِ أَنَّ ٱللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًۢا بِكَلِمَةٍ مِّنَ ٱللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِّنَ ٱلصَّـٰلِحِينَ﴾ Les Anges l’appelèrent aussitôt, pendant qu’il était debout et priait dans le sanctuaire : « Allah t’annonce une heureuse nouvelle : la naissance prochaine de Yahya (Yahya), qui viendra confirmer la Parole d’Allah. Ce sera un homme d’une grande noblesse, chaste et un Prophète parmi les vertueux. » ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَقَدْ بَلَغَنِىَ ٱلْكِبَرُ وَٱمْرَأَتِى عَاقِرٌ ۖ قَالَ كَذَٰلِكَ ٱللَّهُ يَفْعَلُ مَا يَشَآءُ﴾ Il dit : « Seigneur ! Comment pourrait-il me naître un garçon alors que je suis atteint par le grand âge et que ma femme est stérile ? » (Allah) répondit : « Ainsi en sera-t-il, Allah fait ce qu’Il veut. » ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۖ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَٱذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِٱلْعَشِىِّ وَٱلْإِبْكَـٰرِ﴾ Il dit : « Seigneur ! Que me vienne un signe de Toi ! » – « Ton signe, répondit Allah, sera de t’abstenir de parler aux gens pendant trois jours, si ce n’est par gestes. Invoque abondamment ton Seigneur, rends-Lui gloire, matin et soir ! »",
  },
  {
    id: 'zakariya-8',
    type: 'narrative',
    order: 8,
    content: "Surah Maryam opens with the mercy of Allah to His servant Zakariya, and gives his private call whole: his bones, his white hair, his fear for the successors, his barren wife, and the heir he asked for. The tidings, the name given to no one before, his question, the answer - and the three nights.",
    contentFr: "La sourate Maryam s'ouvre sur la miséricorde d'Allah envers Son serviteur Zakariya, et donne son appel secret en entier : ses os, ses cheveux blancs, sa crainte pour les successeurs, sa femme stérile, et l'héritier qu'il demanda. L'annonce, le nom donné à nul avant, sa question, la réponse - et les trois nuits.",
  },
  {
    id: 'zakariya-9',
    type: 'quran_source',
    order: 9,
    content: "\"My Lord, my bones have weakened.\" \"O Zakariya, We give you good tidings of a boy whose name will be Yahya.\"",
    contentFr: "« Mon Seigneur, mes os se sont affaiblis. » « Ô Zakariya, Nous t'annonçons un garçon dont le nom sera Yahya. »",
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
    id: 'zakariya-10',
    type: 'narrative',
    order: 10,
    content: "﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ﴾ [This is] a mention of the mercy of your Lord to His servant Zakariya ﴿إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا﴾ When he called to his Lord a private call [i.e., supplication]. ﴿قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا﴾ He said, \"My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy [i.e., disappointed]. ﴿وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا﴾ And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir ﴿يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا﴾ Who will inherit me and inherit from the family of Yaqub. And make him, my Lord, pleasing [to You].\" ﴿يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا﴾ [He was told], \"O Zakariya, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before [this] name.\" ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا﴾ He said, \"My Lord, how will I have a boy when my wife has been barren and I have reached extreme old age?\" ﴿قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا﴾ [An angel] said, \"Thus [it will be]; your Lord says, 'It is easy for Me, for I created you before, while you were nothing.'\" ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا﴾ [Zakariya] said, \"My Lord, make for me a sign.\" He said, \"Your sign is that you will not speak to the people for three nights, [being] sound.\" ﴿فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا﴾ So he came out to his people from the prayer chamber and signaled to them to exalt [Allah] in the morning and afternoon.",
    contentFr: "﴿ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ﴾ Ceci est le récit évoquant la grâce de ton Seigneur envers son serviteur Zakariya, ﴿إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا﴾ lorsqu’il appela son Seigneur d’un appel discret. ﴿قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا﴾ Il dit : « Seigneur, mes os ont vieilli et ma tête s’est enflammée de canitie, mais jamais, en T’invoquant, mon Seigneur, je n’ai été malheureux. ﴿وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا﴾ Je crains (le comportement de) mes proches après (ma mort) et ma femme est stérile. Veuille donc, de Ta part, me faire don d’un descendant, ﴿يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا﴾ qui tienne de moi et de la famille de Yaqub. Et fais, ô Seigneur, qu’il te soit agréable. » ﴿يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا﴾ « Ô Zakariya, Nous t’annonçons l’heureuse nouvelle (de la naissance) d’un fils dont le nom sera Yahya (Yahya) et auquel Nous n’avons jamais donné d’homonyme. » ﴿قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا﴾ « Ô Seigneur, dit Zakariya, comment pourrait-il me naître un garçon quand ma femme est stérile, et que moi-même j’ai atteint l’âge sénile. » ﴿قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا﴾ « Il en sera ainsi, répondit (Allah). Ton Seigneur a dit : “Cela M’est facile. Avant cela, Je t’ai bien créé quand tu n’étais rien. ”» ﴿قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا﴾ « Seigneur, dit (Zakariya), donne-moi un Signe. » « Ton Signe, répondit (Allah), sera de ne pas parler aux gens durant trois nuits, bien que bien portant. » ﴿فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا﴾ Il sortit alors du sanctuaire, alla trouver les siens et leur signifia de rendre gloire (à Allah) matin et soir.",
  },
  {
    id: 'zakariya-11',
    type: 'narrative',
    order: 11,
    content: "Al-Anbiya gives the prayer in one line, and the answer - and says what his household was like.",
    contentFr: "Al-Anbiya donne la prière en une ligne, et la réponse - et dit ce qu'était sa maison.",
  },
  {
    id: 'zakariya-12',
    type: 'quran_source',
    order: 12,
    content: "\"My Lord, do not leave me alone, while You are the best of inheritors.\"",
    contentFr: "« Mon Seigneur, ne me laisse pas seul, alors que Tu es le meilleur des héritiers. »",
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
    id: 'zakariya-13',
    type: 'narrative',
    order: 13,
    content: "﴿وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ﴾ And [mention] Zakariya, when he called to his Lord, \"My Lord, do not leave me alone [with no heir], while You are the best of inheritors.\" ﴿فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ﴾ So We responded to him, and We gave to him Yahya, and amended for him his wife. Indeed, they used to hasten to good deeds and supplicate Us in hope and fear, and they were to Us humbly submissive.",
    contentFr: "﴿وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ﴾ Et Zakariya, qui supplia son Seigneur : « Seigneur, ne me laisse pas seul (sans descendance), Toi le meilleur des héritiers ! » ﴿فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ﴾ Nous l’exauçâmes, (lui aussi), lui fîmes don de Yahya (Yahya le Baptiste) et guérîmes son épouse. Tous rivalisaient de vertu et Nous invoquaient pleins d’espoir et avec crainte ; tous se recueillaient, humbles devant Nous.",
  },

  // ============ PART 3: WHERE ELSE THE QURAN NAMES HIM ============
  {
    id: 'zakariya-14',
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
    id: 'zakariya-15',
    type: 'narrative',
    order: 15,
    content: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ And Zakariya and Yahya and Isa and Ilyas - and all were of the righteous.",
    contentFr: "﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ ٱلصَّـٰلِحِينَ﴾ Et (il y eut aussi) Zakariya, Yahya le Baptiste, Issa et Ilyas, tous étaient du nombre des vertueux.",
  },

  // ============ PART 4: WHAT THE PROPHET ﷺ TOLD OF HIM ============
  {
    id: 'zakariya-16',
    type: 'narrative',
    order: 16,
    content: "The Prophet ﷺ told us his trade.",
    contentFr: "Le Prophète ﷺ nous a dit son métier.",
  },
  {
    id: 'zakariya-17',
    type: 'hadith_source',
    order: 17,
    content: "\"Zakariya was a carpenter.\"",
    contentFr: "« Zakariya était charpentier. »",
    source: {
      type: "hadith",
      collection: "muslim",
      hadithNumber: "2379",
      narrator: "Abu Hurayrah",
      translation: "Zakariya was a carpenter.",
      translationFr: "Zakariya était charpentier.",
      grade: "sahih",
    } as HadithReference,
  },

  // ============ PART 5: WHAT WAS NOT TOLD ============
  {
    id: 'zakariya-18',
    type: 'narrative',
    order: 18,
    content: "The Quran does not say how Zakariya came to be chosen as Maryam's guardian beyond the casting of pens it mentions elsewhere, does not tell his years with Yahya, and does not tell how he died. What was not told, we leave untold. Allah knows best.",
    contentFr: "Le Coran ne dit pas comment Zakariya fut choisi comme tuteur de Maryam au-delà du tirage au sort qu'il mentionne ailleurs, ne raconte pas ses années avec Yahya, et ne raconte pas sa mort. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const zakariyaSubStories: SubStory[] = [
  {
    id: 'zakariya-complete',
    prophetId: 'zakariya',
    title: 'The Story of Prophet Zakariya',
    titleFr: "L'Histoire du Prophète Zakariya",
    titleArabic: "قصة نبي الله زكريا",
    order: 1,
    estimatedReadTime: 15,
    content: zakariyaStoryContent,
  },
];
