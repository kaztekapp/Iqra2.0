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
  summary: "Ayyub called to his Lord: adversity has touched me, and You are the most merciful of the merciful. He did not describe the adversity; he described his Lord. Allah answered him, removed what afflicted him, gave him his family and the like of them with them, told him to strike the ground with his foot for a cool bath and drink, and to keep his oath with a bunch of grass. And Allah said of him: We found him patient, an excellent servant, one repeatedly turning back. The Prophet ﷺ told that the trial lasted eighteen years, that all but two of his brothers abandoned him, that his wife led him by the hand, and that when he was healed she did not know him, and Allah rained gold and silver on his threshing floors.",
  summaryFr: "Ayyoub appela son Seigneur : le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. Il ne décrivit pas le mal ; il décrivit son Seigneur. Allah lui répondit, ôta ce qui l'affligeait, lui donna sa famille et autant avec eux, lui dit de frapper le sol de son pied pour un bain frais et une boisson, et de tenir son serment avec une poignée d'herbe. Et Allah dit de lui : Nous l'avons trouvé patient, un excellent serviteur, toujours repentant. Le Prophète ﷺ raconta que l'épreuve dura dix-huit ans, que tous ses frères sauf deux l'abandonnèrent, que sa femme le menait par la main, et que lorsqu'il fut guéri elle ne le reconnut pas, et qu'Allah fit pleuvoir de l'or et de l'argent sur ses aires de battage.",
  hasSubStories: false,
  lessons: [
    "His whole prayer was: \"adversity has touched me, and You are the most merciful of the merciful.\" He did not list the harm; he named the mercy. That was enough (21:83).",
    "He said Satan had touched him with hardship - and asked nothing else. Naming the enemy and turning to Allah were the same sentence (38:41).",
    "The answer began with something small: strike the ground with your foot. The cure was under him the whole time, waiting for the command (38:42).",
    "Allah gave him his family \"and the like of them with them\" - not only what was lost, but more. Patience is repaid beyond restoration (21:84, 38:43).",
    "He had sworn an oath, and Allah showed him a way to keep it that did no harm: a bunch of grass. A promise to Allah is not broken by relief; it is kept gently (38:44).",
    "Allah's verdict on him is three words long: patient, excellent servant, ever-returning. Nothing is said of what he owned or lost (38:44).",
    "Eighteen years of illness, and near and far left him except two of his brothers. The Prophet ﷺ counted the years and counted the friends: patience is measured in both (Ibn Hibban 2898).",
    "When a friend suggested that only a sin could explain so long a trial, Ayyub did not defend himself. He said: I do not know what you are saying - except that Allah knows I hated for Him to be mentioned except in truth. The only sin he could find in himself was the one he had been expiating for others (Ibn Hibban 2898).",
    "His wife held his hand to and from the place he relieved himself for years, and when he came back healed, she did not recognise him. Devotion had known him only as the sick man; Allah returned him better than she had ever seen him (Ibn Hibban 2898).",
    "When gold locusts fell on him after his healing, he gathered them, and when asked whether he had not been made rich enough, he said: \"by Your might, yes - but I cannot do without Your blessing.\" Needing Allah's gift is not greed (Bukhari 279).",
  ],
  lessonsFr: [
    "Toute sa prière fut : « le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. » Il n'énuméra pas le mal ; il nomma la miséricorde. Cela suffit (21:83).",
    "Il dit que Satan l'avait touché de peine - et ne demanda rien d'autre. Nommer l'ennemi et se tourner vers Allah furent une même phrase (38:41).",
    "La réponse commença par une chose petite : frappe le sol de ton pied. Le remède était sous lui tout ce temps, attendant l'ordre (38:42).",
    "Allah lui donna sa famille « et autant avec eux » - non seulement ce qui fut perdu, mais davantage. La patience est payée au-delà de la restitution (21:84, 38:43).",
    "Il avait fait un serment, et Allah lui montra une façon de le tenir sans nuire : une poignée d'herbe. Une promesse à Allah n'est pas rompue par le soulagement ; elle est tenue avec douceur (38:44).",
    "Le verdict d'Allah sur lui tient en trois mots : patient, excellent serviteur, toujours repentant. Rien n'est dit de ce qu'il posséda ou perdit (38:44).",
    "Dix-huit ans de maladie, et proches et lointains le quittèrent sauf deux de ses frères. Le Prophète ﷺ compta les années et compta les amis : la patience se mesure aux deux (Ibn Hibban 2898).",
    "Quand un ami suggéra que seul un péché pouvait expliquer une si longue épreuve, Ayyoub ne se défendit pas. Il dit : je ne sais pas ce que tu dis - sinon qu'Allah sait que je détestais qu'Il soit mentionné autrement qu'en vérité. Le seul péché qu'il put trouver en lui-même était celui qu'il expiait pour les autres (Ibn Hibban 2898).",
    "Sa femme lui tint la main à l'aller et au retour du lieu où il faisait ses besoins pendant des années, et quand il revint guéri, elle ne le reconnut pas. Le dévouement ne l'avait connu que malade ; Allah le lui rendit meilleur qu'elle ne l'avait jamais vu (Ibn Hibban 2898).",
    "Quand des sauterelles d'or tombèrent sur lui après sa guérison, il les ramassa, et quand on lui demanda s'il n'avait pas été rendu assez riche, il dit : « par Ta puissance, si - mais je ne peux me passer de Ta bénédiction. » Avoir besoin du don d'Allah n'est pas de la cupidité (Boukhari 279).",
  ],
  estimatedReadTime: 20,
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
    content: "This is the story of Prophet Ayyub, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran tells it in two passages, a prayer and its answer, and does not say what his illness was or what he lost. What the Quran leaves unsaid, the Prophet ﷺ filled in part: how long the trial lasted, who stayed with him, and how the healing came. That account is given here as he gave it. What neither source tells is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Ayyoub, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran la raconte en deux passages, une prière et sa réponse, et ne dit ni quelle fut sa maladie ni ce qu'il perdit. Ce que le Coran tait, le Prophète ﷺ le compléta en partie : combien de temps dura l'épreuve, qui resta auprès de lui, et comment vint la guérison. Ce récit est donné ici tel qu'il le donna. Ce qu'aucune des deux sources ne raconte, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
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
    content: "Surah Al-Anbiya: \"Adversity has touched me, and You are the most merciful of the merciful.\"",
    contentFr: "La sourate Al-Anbiya : « Le mal m'a touché, et Tu es le plus miséricordieux des miséricordieux. »",
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
    content: "Surah Sad: \"Strike the ground with your foot.\" \"We found him patient, an excellent servant.\"",
    contentFr: "La sourate Sad : « Frappe le sol de ton pied. » « Nous l'avons trouvé patient, un excellent serviteur. »",
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
    content: "Surah An-Nisa: Allah revealed to Ayyub, as to the prophets before him.",
    contentFr: "La sourate An-Nisa : Allah a fait une révélation à Ayyoub, comme aux prophètes avant lui.",
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
    content: "Surah Al-An'am: Among the descendants of Ibrahim whom Allah guided: Ayyub.",
    contentFr: "La sourate Al-An'am : Parmi les descendants d'Ibrahim qu'Allah a guidés : Ayyoub.",
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

  // ============ PART 3: WHAT THE PROPHET ﷺ TOLD OF THE TRIAL ============
  {
    id: 'ayyub-12',
    type: 'narrative',
    order: 12,
    content: "Anas ibn Malik reported that the Prophet ﷺ told the story of Ayyub's trial. The hadith is in Sahih Ibn Hibban (2898), Abu Ya'la and al-Hakim; al-Hakim graded it sahih on the conditions of al-Bukhari and Muslim, adh-Dhahabi agreed, and al-Albani graded it sahih (as-Silsilah as-Sahihah 17). Here it is, as the Prophet ﷺ told it.",
    contentFr: "Anas ibn Malik rapporta que le Prophète ﷺ raconta l'épreuve d'Ayyoub. Le hadith est dans le Sahih d'Ibn Hibban (2898), chez Abou Ya'la et al-Hakim ; al-Hakim le jugea sahih selon les conditions d'al-Boukhari et de Mouslim, adh-Dhahabi l'approuva, et al-Albani le jugea sahih (as-Silsilah as-Sahihah 17). Le voici, tel que le Prophète ﷺ le raconta.",
  },
  {
    id: 'ayyub-13',
    type: 'narrative',
    order: 13,
    content: "The Prophet ﷺ said: \"The prophet of Allah Ayyub remained in his trial for eighteen years. The near and the far abandoned him, except two men from among his brothers who were among the closest of his brothers; they came to him in the morning and in the evening.\"",
    contentFr: "Le Prophète ﷺ dit : « Le prophète d'Allah Ayyoub demeura dans son épreuve dix-huit ans. Les proches et les lointains l'abandonnèrent, sauf deux hommes parmi ses frères qui étaient des plus intimes de ses frères ; ils venaient à lui le matin et le soir. »",
  },
  {
    id: 'ayyub-14',
    type: 'narrative',
    order: 14,
    content: "\"One of them said to his companion: You know, by Allah, Ayyub has committed a sin that no one in the worlds has committed. His companion said to him: And what is that? He said: For eighteen years Allah has not shown him mercy and removed what is on him.\"",
    contentFr: "« L'un d'eux dit à son compagnon : Tu sais, par Allah, Ayyoub a commis un péché que personne au monde n'a commis. Son compagnon lui dit : Et qu'est-ce donc ? Il dit : Depuis dix-huit ans, Allah ne lui a pas fait miséricorde en ôtant ce qu'il a. »",
  },
  {
    id: 'ayyub-15',
    type: 'narrative',
    order: 15,
    content: "\"When they went to him in the evening, the man could not hold back until he mentioned that to him. Ayyub said: I do not know what you are saying - except that Allah, Mighty and Majestic, knows that I used to pass by two men disputing, and they would mention Allah, and I would go back to my house and make expiation for them, hating that Allah be mentioned except in truth.\"",
    contentFr: "« Quand ils allèrent à lui le soir, l'homme ne put se retenir de le lui dire. Ayyoub dit : Je ne sais pas ce que tu dis - sinon qu'Allah, Puissant et Majestueux, sait que je passais près de deux hommes qui se disputaient et mentionnaient Allah, et je rentrais chez moi et faisais une expiation pour eux, détestant qu'Allah soit mentionné autrement qu'en vérité. »",
  },
  {
    id: 'ayyub-16',
    type: 'narrative',
    order: 16,
    content: "\"He used to go out to relieve himself, and when he had finished, his wife would take him by the hand until he reached home. One day he was slow in coming back to her, and it was revealed to Ayyub where he was: Strike with your foot; this is a cool bath and a drink.\"",
    contentFr: "« Il sortait pour faire ses besoins, et quand il avait fini, sa femme le prenait par la main jusqu'à ce qu'il arrive. Un jour, il tarda à revenir vers elle, et il fut révélé à Ayyoub là où il était : Frappe du pied ; voici un bain frais et une boisson. »",
  },
  {
    id: 'ayyub-17',
    type: 'narrative',
    order: 17,
    content: "\"She thought him slow, so she went to meet him, looking for him, and he came toward her - Allah had taken away the trial that was on him, and he was in the best state he had ever been. When she saw him she said: May Allah bless you, have you seen the prophet of Allah, the one afflicted? By Allah, I have never seen a man who resembled him more than you, when he was well. He said: I am he.\"",
    contentFr: "« Le trouvant lent, elle alla à sa rencontre, le cherchant du regard, et il vint vers elle - Allah avait ôté l'épreuve qui était sur lui, et il était dans le meilleur état qu'il ait jamais eu. Quand elle le vit, elle dit : Qu'Allah te bénisse, as-tu vu le prophète d'Allah, cet éprouvé ? Par Allah, je n'ai jamais vu un homme qui lui ressemble plus que toi, quand il était en bonne santé. Il dit : C'est moi. »",
  },
  {
    id: 'ayyub-18',
    type: 'narrative',
    order: 18,
    content: "\"He had two threshing floors, one for wheat and one for barley. Allah sent two clouds. When one of them was over the wheat floor it poured gold into it until it overflowed, and the other poured silver into the barley floor until it overflowed.\"",
    contentFr: "« Il avait deux aires de battage, une pour le blé et une pour l'orge. Allah envoya deux nuages. Quand l'un fut au-dessus de l'aire du blé, il y déversa de l'or jusqu'à ce qu'elle déborde, et l'autre déversa de l'argent dans l'aire de l'orge jusqu'à ce qu'elle déborde. »",
  },
  {
    id: 'ayyub-19',
    type: 'hadith_source',
    order: 19,
    content: "\"Have you seen the prophet of Allah, the one afflicted?\" \"I am he.\"",
    contentFr: "« As-tu vu le prophète d'Allah, cet éprouvé ? » « C'est moi. »",
    source: {
      type: "hadith",
      collection: "ibn_hibban",
      hadithNumber: "2898",
      narrator: "Anas ibn Malik",
      translation: "The prophet of Allah Ayyub remained in his trial for eighteen years. The near and the far abandoned him, except two men from among his brothers who were among the closest of his brothers; they came to him in the morning and in the evening. One of them said to his companion: You know, by Allah, Ayyub has committed a sin that no one in the worlds has committed. His companion said: And what is that? He said: For eighteen years Allah has not shown him mercy and removed what is on him. When they went to him in the evening, the man could not hold back until he mentioned that to him. Ayyub said: I do not know what you are saying, except that Allah knows that I used to pass by two men disputing, and they would mention Allah, and I would go back to my house and make expiation for them, hating that Allah be mentioned except in truth. He used to go out to relieve himself, and when he had finished, his wife would take him by the hand until he reached home. One day he was slow in coming back to her, and it was revealed to Ayyub where he was: Strike with your foot; this is a cool bath and a drink. She thought him slow and went to meet him, looking for him, and he came toward her; Allah had taken away the trial that was on him, and he was in the best state he had ever been. When she saw him she said: May Allah bless you, have you seen the prophet of Allah, the one afflicted? By Allah, I have never seen a man who resembled him more than you, when he was well. He said: I am he. He had two threshing floors, one for wheat and one for barley. Allah sent two clouds; when one was over the wheat floor it poured gold into it until it overflowed, and the other poured silver into the barley floor until it overflowed.",
      translationFr: "Le prophète d'Allah Ayyoub demeura dans son épreuve dix-huit ans. Les proches et les lointains l'abandonnèrent, sauf deux hommes parmi ses frères qui étaient des plus intimes de ses frères ; ils venaient à lui le matin et le soir. L'un d'eux dit à son compagnon : Tu sais, par Allah, Ayyoub a commis un péché que personne au monde n'a commis. Son compagnon dit : Et qu'est-ce donc ? Il dit : Depuis dix-huit ans, Allah ne lui a pas fait miséricorde en ôtant ce qu'il a. Quand ils allèrent à lui le soir, l'homme ne put se retenir de le lui dire. Ayyoub dit : Je ne sais pas ce que tu dis, sinon qu'Allah sait que je passais près de deux hommes qui se disputaient et mentionnaient Allah, et je rentrais chez moi et faisais une expiation pour eux, détestant qu'Allah soit mentionné autrement qu'en vérité. Il sortait pour faire ses besoins, et quand il avait fini, sa femme le prenait par la main jusqu'à ce qu'il arrive. Un jour, il tarda à revenir vers elle, et il fut révélé à Ayyoub là où il était : Frappe du pied ; voici un bain frais et une boisson. Le trouvant lent, elle alla à sa rencontre, le cherchant du regard, et il vint vers elle ; Allah avait ôté l'épreuve qui était sur lui, et il était dans le meilleur état qu'il ait jamais eu. Quand elle le vit, elle dit : Qu'Allah te bénisse, as-tu vu le prophète d'Allah, cet éprouvé ? Par Allah, je n'ai jamais vu un homme qui lui ressemble plus que toi, quand il était en bonne santé. Il dit : C'est moi. Il avait deux aires de battage, une pour le blé et une pour l'orge. Allah envoya deux nuages ; quand l'un fut au-dessus de l'aire du blé, il y déversa de l'or jusqu'à ce qu'elle déborde, et l'autre déversa de l'argent dans l'aire de l'orge jusqu'à ce qu'elle déborde.",
      grade: "sahih",
      arabicText: "إِنَّ نَبِيَّ اللَّهِ أَيُّوبَ لَبِثَ بِهِ بَلَاؤُهُ ثَمَانِيَ عَشْرَةَ سَنَةً، فَرَفَضَهُ الْقَرِيبُ وَالْبَعِيدُ إِلَّا رَجُلَيْنِ مِنْ إِخْوَانِهِ كَانَا مِنْ أَخَصِّ إِخْوَانِهِ، كَانَا يَغْدُوَانِ إِلَيْهِ وَيَرُوحَانِ، فَقَالَ أَحَدُهُمَا لِصَاحِبِهِ: تَعْلَمُ وَاللَّهِ لَقَدْ أَذْنَبَ أَيُّوبُ ذَنْبًا مَا أَذْنَبَهُ أَحَدٌ مِنَ الْعَالَمِينَ، فَقَالَ لَهُ صَاحِبُهُ: وَمَا ذَاكَ؟ قَالَ: مُنْذُ ثَمَانِيَ عَشْرَةَ سَنَةً لَمْ يَرْحَمْهُ اللَّهُ فَيَكْشِفَ مَا بِهِ، فَلَمَّا رَاحَا إِلَيْهِ لَمْ يَصْبِرِ الرَّجُلُ حَتَّى ذَكَرَ ذَلِكَ لَهُ، فَقَالَ أَيُّوبُ: لَا أَدْرِي مَا تَقُولُ، غَيْرَ أَنَّ اللَّهَ عَزَّ وَجَلَّ يَعْلَمُ أَنِّي كُنْتُ أَمُرُّ عَلَى الرَّجُلَيْنِ يَتَنَازَعَانِ فَيَذْكُرَانِ اللَّهَ، فَأَرْجِعُ إِلَى بَيْتِي فَأُكَفِّرُ عَنْهُمَا كَرَاهِيَةَ أَنْ يُذْكَرَ اللَّهُ إِلَّا فِي حَقٍّ. وَكَانَ يَخْرُجُ إِلَى حَاجَتِهِ، فَإِذَا قَضَاهَا أَمْسَكَتِ امْرَأَتُهُ بِيَدِهِ حَتَّى يَبْلُغَ، فَلَمَّا كَانَ ذَاتَ يَوْمٍ أَبْطَأَ عَلَيْهَا، وَأُوحِيَ إِلَى أَيُّوبَ فِي مَكَانِهِ أَنِ ارْكُضْ بِرِجْلِكَ هَذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ، فَاسْتَبْطَأَتْهُ فَتَلَقَّتْهُ تَنْظُرُ، وَأَقْبَلَ عَلَيْهَا قَدْ أَذْهَبَ اللَّهُ مَا بِهِ مِنَ الْبَلَاءِ وَهُوَ عَلَى أَحْسَنِ مَا كَانَ، فَلَمَّا رَأَتْهُ قَالَتْ: أَيْ بَارَكَ اللَّهُ فِيكَ، هَلْ رَأَيْتَ نَبِيَّ اللَّهِ هَذَا الْمُبْتَلَى؟ فَوَاللَّهِ عَلَى ذَلِكَ مَا رَأَيْتُ رَجُلًا أَشْبَهَ بِهِ مِنْكَ إِذْ كَانَ صَحِيحًا، قَالَ: فَإِنِّي أَنَا هُوَ. وَكَانَ لَهُ أَنْدَرَانِ: أَنْدَرٌ لِلْقَمْحِ وَأَنْدَرٌ لِلشَّعِيرِ، فَبَعَثَ اللَّهُ سَحَابَتَيْنِ، فَلَمَّا كَانَتْ إِحْدَاهُمَا عَلَى أَنْدَرِ الْقَمْحِ أَفْرَغَتْ فِيهِ الذَّهَبَ حَتَّى فَاضَ، وَأَفْرَغَتِ الْأُخْرَى فِي أَنْدَرِ الشَّعِيرِ الْوَرِقَ حَتَّى فَاضَ",
    } as HadithReference,
  },
  {
    id: 'ayyub-20',
    type: 'narrative',
    order: 20,
    content: "So the spring that Surah Sad names - strike with your foot, a cool bath and a drink - came to him on an ordinary day, on the way back from relieving himself, after eighteen years. And the family given back \"and the like of them with them\" began with a wife who had never left his side.",
    contentFr: "Ainsi la source que nomme la sourate Sad - frappe du pied, un bain frais et une boisson - lui vint un jour ordinaire, sur le chemin du retour de ses besoins, après dix-huit ans. Et la famille rendue « et autant avec eux » commença par une épouse qui n'avait jamais quitté son côté.",
  },

  // ============ PART 4: THE GOLDEN LOCUSTS ============
  {
    id: 'ayyub-21',
    type: 'narrative',
    order: 21,
    content: "The Prophet ﷺ also told of a moment after Ayyub's healing, while he bathed, and of what he answered when his Lord asked him a question (Sahih al-Bukhari 279).",
    contentFr: "Le Prophète ﷺ raconta aussi un moment après la guérison d'Ayyoub, tandis qu'il se lavait, et ce qu'il répondit quand son Seigneur lui posa une question (Sahih al-Boukhari 279).",
  },
  {
    id: 'ayyub-22',
    type: 'hadith_source',
    order: 22,
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
      arabicText: "بَيْنَا أَيُّوبُ يَغْتَسِلُ عُرْيَانًا فَخَرَّ عَلَيْهِ جَرَادٌ مِنْ ذَهَبٍ، فَجَعَلَ أَيُّوبُ يَحْتَثِي فِي ثَوْبِهِ، فَنَادَاهُ رَبُّهُ: يَا أَيُّوبُ، أَلَمْ أَكُنْ أَغْنَيْتُكَ عَمَّا تَرَى؟ قَالَ: بَلَى وَعِزَّتِكَ، وَلَكِنْ لَا غِنَى بِي عَنْ بَرَكَتِكَ",
    } as HadithReference,
  },

  // ============ PART 5: WHAT WAS NOT TOLD ============
  {
    id: 'ayyub-23',
    type: 'narrative',
    order: 23,
    content: "The Quran does not say what Ayyub's illness was, where he lived, or what the oath was that he kept with a bunch of grass. The Prophet ﷺ gave the length of the trial, the two brothers, the wife, the spring, and the two clouds - and no more. The rest that is often told of him - how the illness came, what it did to his body, what his wife did to feed him, what the oath was about - is not in the Quran and not in an authentic hadith, and it is not in this story. Allah knows best.",
    contentFr: "Le Coran ne dit ni quelle fut la maladie d'Ayyoub, ni où il vécut, ni quel fut le serment qu'il tint avec une poignée d'herbe. Le Prophète ﷺ donna la durée de l'épreuve, les deux frères, l'épouse, la source et les deux nuages - et rien de plus. Le reste qu'on raconte souvent de lui - comment vint la maladie, ce qu'elle fit à son corps, ce que sa femme fit pour le nourrir, sur quoi portait le serment - n'est ni dans le Coran ni dans un hadith authentique, et n'est pas dans cette histoire. Allah est le plus savant.",
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
    estimatedReadTime: 20,
    content: ayyubStoryContent,
  },
];
