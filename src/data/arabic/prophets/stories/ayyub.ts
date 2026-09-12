// Story of Prophet Ayyub (أيوب) - The Patient One
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Ayyub is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const ayyubStory: Prophet = {
  id: 'ayyub',
  nameEnglish: 'Ayyub',
  nameFrench: 'Ayyoub',
  nameArabic: 'أيوب',
  order: 12,
  title: 'The Patient One',
  titleFr: 'Le Patient',
  titleArabic: 'الصابر',
  summary: "Ayyub called to his Lord: adversity has touched me, and You are the most merciful of the merciful. He did not describe the adversity; he described his Lord. Allah answered him, removed what afflicted him, gave him his family and the like of them with them, told him to strike the ground with his foot for a cool bath and drink, and to keep his oath with a bunch of grass. And Allah said of him: We found him patient, an excellent servant, one repeatedly turning back.",
  summaryFr: "Ayyoub appela son Seigneur : le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. Il ne décrivit pas le mal ; il décrivit son Seigneur. Allah lui répondit, ôta ce qui l'affligeait, lui donna sa famille et autant avec eux, lui dit de frapper le sol de son pied pour un bain frais et une boisson, et de tenir son serment avec une poignée d'herbe. Et Allah dit de lui : Nous l'avons trouvé patient, un excellent serviteur, toujours repentant.",
  hasSubStories: false,
  lessons: [
    "His whole prayer was: \"adversity has touched me, and You are the most merciful of the merciful.\" He did not list the harm; he named the mercy. That was enough (21:83).",
    "He said Satan had touched him with hardship - and asked nothing else. Naming the enemy and turning to Allah were the same sentence (38:41).",
    "The answer began with something small: strike the ground with your foot. The cure was under him the whole time, waiting for the command (38:42).",
    "Allah gave him his family \"and the like of them with them\" - not only what was lost, but more. Patience is repaid beyond restoration (21:84, 38:43).",
    "He had sworn an oath, and Allah showed him a way to keep it that did no harm: a bunch of grass. A promise to Allah is not broken by relief; it is kept gently (38:44).",
    "Allah's verdict on him is three words long: patient, excellent servant, ever-returning. Nothing is said of what he owned or lost (38:44).",
    "When gold locusts fell on him after his healing, he gathered them, and when asked whether he had not been made rich enough, he said: \"by Your might, yes - but I cannot do without Your blessing.\" Needing Allah's gift is not greed (Bukhari 279).",
  ],
  lessonsFr: [
    "Toute sa prière fut : « le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. » Il n'énuméra pas le mal ; il nomma la miséricorde. Cela suffit (21:83).",
    "Il dit que Satan l'avait touché de peine - et ne demanda rien d'autre. Nommer l'ennemi et se tourner vers Allah furent une même phrase (38:41).",
    "La réponse commença par une chose petite : frappe le sol de ton pied. Le remède était sous lui tout ce temps, attendant l'ordre (38:42).",
    "Allah lui donna sa famille « et autant avec eux » - non seulement ce qui fut perdu, mais davantage. La patience est payée au-delà de la restitution (21:84, 38:43).",
    "Il avait fait un serment, et Allah lui montra une façon de le tenir sans nuire : une poignée d'herbe. Une promesse à Allah n'est pas rompue par le soulagement ; elle est tenue avec douceur (38:44).",
    "Le verdict d'Allah sur lui tient en trois mots : patient, excellent serviteur, toujours repentant. Rien n'est dit de ce qu'il posséda ou perdit (38:44).",
    "Quand des sauterelles d'or tombèrent sur lui après sa guérison, il les ramassa, et quand on lui demanda s'il n'avait pas été rendu assez riche, il dit : « par Ta puissance, si - mais je ne peux me passer de Ta bénédiction. » Avoir besoin du don d'Allah n'est pas de la cupidité (Boukhari 279).",
  ],
  estimatedReadTime: 12,
  quranMentions: 4,
  icon: '💪',
};

// Single continuous story (no sub-stories)
export const ayyubStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'ayyub-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Ayyub, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nIt is a short story, because that is how the Quran tells it: two passages, a prayer and its answer. What his illness was, how long it lasted, and what he lost - the Quran does not say, and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Ayyoub, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nC'est une courte histoire, parce que c'est ainsi que le Coran la raconte : deux passages, une prière et sa réponse. Quelle fut sa maladie, combien de temps elle dura, et ce qu'il perdit - le Coran ne le dit pas, et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: THE PRAYER ============
  {
    id: 'ayyub-2',
    type: 'narrative',
    order: 2,
    content: "Surah Al-Anbiya gives his prayer in one line, and Allah's answer in the next.",
    contentFr: "La sourate Al-Anbiya donne sa prière en une ligne, et la réponse d'Allah dans la suivante.",
  },
  {
    id: 'ayyub-3',
    type: 'quran_source',
    order: 3,
    content: "\"Adversity has touched me, and You are the most merciful of the merciful.\"",
    contentFr: "« Le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. »",
    source: {
      type: "quran",
      surahNumber: 21,
      surahNameEnglish: "Al-Anbiya",
      surahNameArabic: "الأنبياء",
      ayahStart: 83,
      ayahEnd: 84,
      arabicText: "وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلضُّرُّ وَأَنتَ أَرْحَمُ ٱلرَّٰحِمِينَ ۝ فَٱسْتَجَبْنَا لَهُۥ فَكَشَفْنَا مَا بِهِۦ مِن ضُرٍّ ۖ وَءَاتَيْنَـٰهُ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَـٰبِدِينَ",
      translation: "And [mention] Ayyub, when he called to his Lord, \"Indeed, adversity has touched me, and You are the most merciful of the merciful.\" So We responded to him and removed what afflicted him of adversity. And We gave him [back] his family and the like thereof with them as mercy from Us and a reminder for the worshippers [of Allah].",
      translationFr: "Puis (évoque) Ayyoub, qui supplia son Seigneur : « Le mal m’a atteint et Tu es le plus Miséricordieux des miséricordieux ! » Nous l’exauçâmes alors, dissipâmes tous ses maux, et lui rendîmes sa famille à laquelle (Nous ajoutâmes) une autre pareille, par un effet de Notre grâce et comme rappel pour les adorateurs.",
    } as QuranReference,
  },
  {
    id: 'ayyub-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلضُّرُّ وَأَنتَ أَرْحَمُ ٱلرَّٰحِمِينَ﴾ And [mention] Ayyub, when he called to his Lord, \"Indeed, adversity has touched me, and You are the most merciful of the merciful.\" ﴿فَٱسْتَجَبْنَا لَهُۥ فَكَشَفْنَا مَا بِهِۦ مِن ضُرٍّ ۖ وَءَاتَيْنَـٰهُ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَـٰبِدِينَ﴾ So We responded to him and removed what afflicted him of adversity. And We gave him [back] his family and the like thereof with them as mercy from Us and a reminder for the worshippers [of Allah].",
    contentFr: "﴿وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلضُّرُّ وَأَنتَ أَرْحَمُ ٱلرَّٰحِمِينَ﴾ Puis (évoque) Ayyoub, qui supplia son Seigneur : « Le mal m’a atteint et Tu es le plus Miséricordieux des miséricordieux ! » ﴿فَٱسْتَجَبْنَا لَهُۥ فَكَشَفْنَا مَا بِهِۦ مِن ضُرٍّ ۖ وَءَاتَيْنَـٰهُ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَـٰبِدِينَ﴾ Nous l’exauçâmes alors, dissipâmes tous ses maux, et lui rendîmes sa famille à laquelle (Nous ajoutâmes) une autre pareille, par un effet de Notre grâce et comme rappel pour les adorateurs.",
  },
  {
    id: 'ayyub-5',
    type: 'narrative',
    order: 5,
    content: "Surah Sad tells it more fully: what he said Satan had done, the spring he was told to strike from the ground, the family given back with the like of them, the oath and the bunch of grass - and what Allah found him to be.",
    contentFr: "La sourate Sad le raconte plus complètement : ce qu'il dit que Satan avait fait, la source qu'il lui fut dit de faire jaillir du sol, la famille rendue avec autant qu'elle, le serment et la poignée d'herbe - et ce qu'Allah trouva qu'il était.",
  },
  {
    id: 'ayyub-6',
    type: 'quran_source',
    order: 6,
    content: "\"Strike the ground with your foot.\" \"We found him patient, an excellent servant.\"",
    contentFr: "« Frappe le sol de ton pied. » « Nous l'avons trouvé patient, un excellent serviteur. »",
    source: {
      type: "quran",
      surahNumber: 38,
      surahNameEnglish: "Sad",
      surahNameArabic: "ص",
      ayahStart: 41,
      ayahEnd: 44,
      arabicText: "وَٱذْكُرْ عَبْدَنَآ أَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلشَّيْطَـٰنُ بِنُصْبٍ وَعَذَابٍ ۝ ٱرْكُضْ بِرِجْلِكَ ۖ هَـٰذَا مُغْتَسَلٌۢ بَارِدٌ وَشَرَابٌ ۝ وَوَهَبْنَا لَهُۥٓ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنَّا وَذِكْرَىٰ لِأُو۟لِى ٱلْأَلْبَـٰبِ ۝ وَخُذْ بِيَدِكَ ضِغْثًا فَٱضْرِب بِّهِۦ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَـٰهُ صَابِرًا ۚ نِّعْمَ ٱلْعَبْدُ ۖ إِنَّهُۥٓ أَوَّابٌ",
      translation: "And remember Our servant Ayyub, when he called to his Lord, \"Indeed, Satan has touched me with hardship and torment.\" [So he was told], \"Strike [the ground] with your foot; this is a [spring for a] cool bath and drink.\" And We granted him his family and a like [number] with them as mercy from Us and a reminder for those of understanding. [We said], \"And take in your hand a bunch [of grass] and strike with it and do not break your oath.\" Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].",
      translationFr: "Évoque aussi Notre serviteur Ayyoub lorsqu’il invoqua (ainsi) son Seigneur : « Satan m’inflige peine et souffrance. » « Frappe le sol de ton pied, (lui fut-il dit), voici une source d’eau fraîche où tu pourras te laver et boire ! » Nous lui avons rendu sa famille et en avons doublé le nombre, miséricorde de Notre part et leçon pour les esprits sagaces. « Prends donc, (ô Ayyoub), un faisceau de brindilles, frappes-en (ta femme) et ne te parjure point ! » Nous l’avons trouvé patient à la peine. Et quel excellent serviteur ! Il aimait tant à se repentir.",
    } as QuranReference,
  },
  {
    id: 'ayyub-7',
    type: 'narrative',
    order: 7,
    content: "﴿وَٱذْكُرْ عَبْدَنَآ أَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلشَّيْطَـٰنُ بِنُصْبٍ وَعَذَابٍ﴾ And remember Our servant Ayyub, when he called to his Lord, \"Indeed, Satan has touched me with hardship and torment.\" ﴿ٱرْكُضْ بِرِجْلِكَ ۖ هَـٰذَا مُغْتَسَلٌۢ بَارِدٌ وَشَرَابٌ﴾ [So he was told], \"Strike [the ground] with your foot; this is a [spring for a] cool bath and drink.\" ﴿وَوَهَبْنَا لَهُۥٓ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنَّا وَذِكْرَىٰ لِأُو۟لِى ٱلْأَلْبَـٰبِ﴾ And We granted him his family and a like [number] with them as mercy from Us and a reminder for those of understanding. ﴿وَخُذْ بِيَدِكَ ضِغْثًا فَٱضْرِب بِّهِۦ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَـٰهُ صَابِرًا ۚ نِّعْمَ ٱلْعَبْدُ ۖ إِنَّهُۥٓ أَوَّابٌ﴾ [We said], \"And take in your hand a bunch [of grass] and strike with it and do not break your oath.\" Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].",
    contentFr: "﴿وَٱذْكُرْ عَبْدَنَآ أَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلشَّيْطَـٰنُ بِنُصْبٍ وَعَذَابٍ﴾ Évoque aussi Notre serviteur Ayyoub lorsqu’il invoqua (ainsi) son Seigneur : « Satan m’inflige peine et souffrance. » ﴿ٱرْكُضْ بِرِجْلِكَ ۖ هَـٰذَا مُغْتَسَلٌۢ بَارِدٌ وَشَرَابٌ﴾ « Frappe le sol de ton pied, (lui fut-il dit), voici une source d’eau fraîche où tu pourras te laver et boire ! » ﴿وَوَهَبْنَا لَهُۥٓ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنَّا وَذِكْرَىٰ لِأُو۟لِى ٱلْأَلْبَـٰبِ﴾ Nous lui avons rendu sa famille et en avons doublé le nombre, miséricorde de Notre part et leçon pour les esprits sagaces. ﴿وَخُذْ بِيَدِكَ ضِغْثًا فَٱضْرِب بِّهِۦ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَـٰهُ صَابِرًا ۚ نِّعْمَ ٱلْعَبْدُ ۖ إِنَّهُۥٓ أَوَّابٌ﴾ « Prends donc, (ô Ayyoub), un faisceau de brindilles, frappes-en (ta femme) et ne te parjure point ! » Nous l’avons trouvé patient à la peine. Et quel excellent serviteur ! Il aimait tant à se repentir.",
  },

  // ============ PART 2: WHERE ELSE THE QURAN NAMES HIM ============
  {
    id: 'ayyub-8',
    type: 'quran_source',
    order: 8,
    content: "Allah revealed to Ayyub, as to the prophets before him.",
    contentFr: "Allah a fait une révélation à Ayyoub, comme aux prophètes avant lui.",
    source: {
      type: "quran",
      surahNumber: 4,
      surahNameEnglish: "An-Nisa",
      surahNameArabic: "النساء",
      ayahStart: 163,
      ayahEnd: 163,
      arabicText: "إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّـۧنَ مِنۢ بَعْدِهِۦ ۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبْرَٰهِيمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَـٰرُونَ وَسُلَيْمَـٰنَ ۚ وَءَاتَيْنَا دَاوُۥدَ زَبُورًا",
      translation: "Indeed, We have revealed to you, [O Muhammad], as We revealed to Nuh and the prophets after him. And We revealed to Ibrahim, Ismail, Ishaq, Yaqub, the Descendants, Isa, Ayyub, Yunus, Harun, and Sulayman, and to Dawud We gave the book [of Psalms].",
      translationFr: "Nous t’avons inspiré des révélations comme nous les avons inspirées à Nouh et aux Prophètes après lui. Nous les avons inspirées à Ibrahim, à Ismaïl, à Ishaq, à Yaqub, aux (douze) Tribus, à Issa, à Ayyoub, à Younous, à Haroun, à Soulayman et nous avons donné les Psaumes à Dawoud.",
    } as QuranReference,
  },
  {
    id: 'ayyub-9',
    type: 'narrative',
    order: 9,
    content: "﴿إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّـۧنَ مِنۢ بَعْدِهِۦ ۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبْرَٰهِيمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَـٰرُونَ وَسُلَيْمَـٰنَ ۚ وَءَاتَيْنَا دَاوُۥدَ زَبُورًا﴾ Indeed, We have revealed to you, [O Muhammad], as We revealed to Nuh and the prophets after him. And We revealed to Ibrahim, Ismail, Ishaq, Yaqub, the Descendants, Isa, Ayyub, Yunus, Harun, and Sulayman, and to Dawud We gave the book [of Psalms].",
    contentFr: "﴿إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّـۧنَ مِنۢ بَعْدِهِۦ ۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبْرَٰهِيمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَـٰرُونَ وَسُلَيْمَـٰنَ ۚ وَءَاتَيْنَا دَاوُۥدَ زَبُورًا﴾ Nous t’avons inspiré des révélations comme nous les avons inspirées à Nouh et aux Prophètes après lui. Nous les avons inspirées à Ibrahim, à Ismaïl, à Ishaq, à Yaqub, aux (douze) Tribus, à Issa, à Ayyoub, à Younous, à Haroun, à Soulayman et nous avons donné les Psaumes à Dawoud.",
  },
  {
    id: 'ayyub-10',
    type: 'quran_source',
    order: 10,
    content: "Among the descendants of Ibrahim whom Allah guided: Ayyub.",
    contentFr: "Parmi les descendants d'Ibrahim qu'Allah a guidés : Ayyoub.",
    source: {
      type: "quran",
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: "الأنعام",
      ayahStart: 84,
      ayahEnd: 84,
      arabicText: "وَوَهَبْنَا لَهُۥٓ إِسْحَـٰقَ وَيَعْقُوبَ ۚ كُلًّا هَدَيْنَا ۚ وَنُوحًا هَدَيْنَا مِن قَبْلُ ۖ وَمِن ذُرِّيَّتِهِۦ دَاوُۥدَ وَسُلَيْمَـٰنَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَىٰ وَهَـٰرُونَ ۚ وَكَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ",
      translation: "And We gave to him [i.e., Ibrahim] Ishaq and Yaqub - all [of them] We guided. And Nuh, We guided before; and among his descendants, Dawud and Sulayman and Ayyub and Yusuf and Musa and Harun. Thus do We reward the doers of good.",
      translationFr: "Nous lui donnâmes Ishaq et Yaqub que Nous orientâmes vers la juste voie. Ainsi avions-nous orienté Nouh auparavant. Parmi ses descendants, il y eut Dawoud, Soulayman, Ayyoub, Youssouf, Moussa et Haroun, et c’est ainsi que Nous récompensons les bienfaiteurs.",
    } as QuranReference,
  },
  {
    id: 'ayyub-11',
    type: 'narrative',
    order: 11,
    content: "﴿وَوَهَبْنَا لَهُۥٓ إِسْحَـٰقَ وَيَعْقُوبَ ۚ كُلًّا هَدَيْنَا ۚ وَنُوحًا هَدَيْنَا مِن قَبْلُ ۖ وَمِن ذُرِّيَّتِهِۦ دَاوُۥدَ وَسُلَيْمَـٰنَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَىٰ وَهَـٰرُونَ ۚ وَكَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ﴾ And We gave to him [i.e., Ibrahim] Ishaq and Yaqub - all [of them] We guided. And Nuh, We guided before; and among his descendants, Dawud and Sulayman and Ayyub and Yusuf and Musa and Harun. Thus do We reward the doers of good.",
    contentFr: "﴿وَوَهَبْنَا لَهُۥٓ إِسْحَـٰقَ وَيَعْقُوبَ ۚ كُلًّا هَدَيْنَا ۚ وَنُوحًا هَدَيْنَا مِن قَبْلُ ۖ وَمِن ذُرِّيَّتِهِۦ دَاوُۥدَ وَسُلَيْمَـٰنَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَىٰ وَهَـٰرُونَ ۚ وَكَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ﴾ Nous lui donnâmes Ishaq et Yaqub que Nous orientâmes vers la juste voie. Ainsi avions-nous orienté Nouh auparavant. Parmi ses descendants, il y eut Dawoud, Soulayman, Ayyoub, Youssouf, Moussa et Haroun, et c’est ainsi que Nous récompensons les bienfaiteurs.",
  },

  // ============ PART 3: WHAT THE PROPHET ﷺ TOLD OF HIM ============
  {
    id: 'ayyub-12',
    type: 'narrative',
    order: 12,
    content: "The Prophet ﷺ told of a moment after Ayyub's healing, and of what he answered when his Lord asked him a question (Sahih al-Bukhari 279).",
    contentFr: "Le Prophète ﷺ raconta un moment après la guérison d'Ayyoub, et ce qu'il répondit quand son Seigneur lui posa une question (Sahih al-Boukhari 279).",
  },
  {
    id: 'ayyub-13',
    type: 'hadith_source',
    order: 13,
    content: "\"I cannot do without Your blessing.\"",
    contentFr: "« Je ne peux me passer de Ta bénédiction. »",
    source: {
      type: "hadith",
      collection: "bukhari",
      hadithNumber: "279",
      narrator: "Abu Hurayrah",
      translation: "While Ayyub was bathing, unclothed, locusts of gold fell upon him, and he began gathering them into his garment. His Lord called to him: O Ayyub, had I not made you rich enough for what you see? He said: Yes, by Your might - but I cannot do without Your blessing.",
      translationFr: "Tandis qu'Ayyoub se lavait, dévêtu, des sauterelles d'or tombèrent sur lui, et il se mit à les ramasser dans son vêtement. Son Seigneur l'appela : Ô Ayyoub, ne t'ai-Je pas rendu assez riche pour te passer de ce que tu vois ? Il dit : Si, par Ta puissance - mais je ne peux me passer de Ta bénédiction.",
      grade: "sahih",
    } as HadithReference,
  },

  // ============ PART 4: WHAT WAS NOT TOLD ============
  {
    id: 'ayyub-14',
    type: 'narrative',
    order: 14,
    content: "The Quran does not say what Ayyub's affliction was, how many years it lasted, where he lived, or what the oath was that he kept with a bunch of grass. It says what he said, and what Allah did, and what Allah called him. What was not told, we leave untold. Allah knows best.",
    contentFr: "Le Coran ne dit ni quelle fut l'affliction d'Ayyoub, ni combien d'années elle dura, ni où il vécut, ni quel fut le serment qu'il tint avec une poignée d'herbe. Il dit ce qu'il dit, ce qu'Allah fit, et comment Allah l'appela. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const ayyubSubStories: SubStory[] = [
  {
    id: 'ayyub-complete',
    prophetId: 'ayyub',
    title: 'The Story of Prophet Ayyub',
    titleFr: "L'Histoire du Prophète Ayyoub",
    titleArabic: "قصة نبي الله أيوب",
    order: 1,
    estimatedReadTime: 12,
    content: ayyubStoryContent,
  },
];
