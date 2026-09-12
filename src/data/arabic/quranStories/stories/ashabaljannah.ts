// The Owners of the Garden (أصحاب الجنة)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const ashabAlJannahStory: QuranStory = {
  id: "ashabaljannah",
  titleEnglish: "The Owners of the Garden",
  titleFrench: "Les Propriétaires du Jardin",
  titleArabic: "أصحاب الجنة",
  order: 13,
  category: "parables",
  description: "They swore to harvest at dawn so the poor would get nothing, and woke to find the garden gone",
  descriptionFr: "Ils jurèrent de récolter à l'aube pour que les pauvres n'aient rien, et trouvèrent le jardin disparu",
  summary: "They swore to harvest their garden at dawn, without saying \"if Allah wills\", and lowering their voices so no poor person would enter it that day. An affliction from their Lord passed over it while they slept, and it became as though reaped. They set out early, sure of themselves, and when they saw it said: we are lost - rather, we have been deprived. The most moderate of them said: did I not tell you to glorify Allah? They said: exalted is our Lord, we were wrongdoers - and blamed one another, and hoped He would give them better.",
  summaryFr: "Ils jurèrent de récolter leur jardin à l'aube, sans dire « si Allah veut », et en baissant la voix pour qu'aucun pauvre n'y entre ce jour-là. Un fléau de leur Seigneur passa dessus pendant qu'ils dormaient, et il devint comme moissonné. Ils partirent tôt, sûrs d'eux, et en le voyant dirent : nous sommes perdus - non, nous avons été privés. Le plus modéré d'entre eux dit : ne vous avais-je pas dit de glorifier Allah ? Ils dirent : gloire à notre Seigneur, nous étions injustes - et se blâmèrent les uns les autres, et espérèrent qu'Il leur donnerait mieux.",
  lessons: [
    "They swore to cut the fruit in the morning \"without making exception\" - without \"if Allah wills\". The Quran counts the missing words as the first wrong (68:17-18).",
    "The affliction came while they were asleep. What they were sure of was taken before they woke (68:19-20).",
    "They lowered their voices so no poor person would hear. A plan to deprive the poor is made quietly, and Allah records the volume (68:23-24).",
    "\"Indeed, we are lost - rather, we have been deprived.\" Their first thought was that they had the wrong garden; their second was the truth (68:26-27).",
    "\"Did I not say to you, why do you not glorify Allah?\" One of them had warned them, and been ignored. The most moderate voice is often the one not listened to (68:28).",
    "They said: exalted is our Lord, we were wrongdoers - then turned on each other, then said: perhaps our Lord will substitute for us better. Repentance, blame, and hope, in that order (68:29-32).",
    "\"Such is the punishment. And the punishment of the Hereafter is greater, if they only knew.\" A lost harvest is the small version (68:33).",
  ],
  lessonsFr: [
    "Ils jurèrent de cueillir les fruits au matin « sans faire d'exception » - sans « si Allah veut ». Le Coran compte les mots manquants comme le premier tort (68:17-18).",
    "Le fléau vint pendant qu'ils dormaient. Ce dont ils étaient sûrs fut pris avant leur réveil (68:19-20).",
    "Ils baissèrent la voix pour qu'aucun pauvre n'entende. Un plan pour priver les pauvres se fait à voix basse, et Allah en consigne le volume (68:23-24).",
    "« Nous sommes perdus - non, nous avons été privés. » Leur première pensée fut qu'ils s'étaient trompés de jardin ; la seconde fut la vérité (68:26-27).",
    "« Ne vous avais-je pas dit : pourquoi ne glorifiez-vous pas Allah ? » L'un d'eux les avait avertis, et n'avait pas été écouté. La voix la plus modérée est souvent celle qu'on n'écoute pas (68:28).",
    "Ils dirent : gloire à notre Seigneur, nous étions injustes - puis se retournèrent les uns contre les autres, puis dirent : peut-être notre Seigneur nous donnera-t-Il mieux en échange. Repentir, reproche, et espoir, dans cet ordre (68:29-32).",
    "« Tel fut le châtiment. Et le châtiment de l'au-delà est plus grand encore, s'ils savaient. » Une récolte perdue en est la petite version (68:33).",
  ],
  estimatedReadTime: 8,
  quranMentions: 1,
  icon: "🌾",
  mainSurah: {
    number: 68,
    name: "Al-Qalam",
    nameArabic: "القلم",
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'ashabaljannah-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the owners of the garden, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nThe Quran tells it in one passage of Al-Qalam, as a trial like the one given to the Prophet's ﷺ people. It does not say where the garden was or who they were, and no authentic hadith adds to it. What was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire des propriétaires du jardin, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nLe Coran la raconte en un seul passage d'Al-Qalam, comme une épreuve semblable à celle donnée au peuple du Prophète ﷺ. Il ne dit ni où était le jardin ni qui ils étaient, et aucun hadith authentique n'y ajoute. Ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: THE OATH, AND THE NIGHT ============
    {
      id: 'ashabaljannah-2',
      type: 'narrative',
      order: 2,
      content: "They swore to harvest at dawn without exception. Something passed over the garden while they slept. In the morning they called one another, set out with lowered voices, and were sure.",
      contentFr: "Ils jurèrent de récolter à l'aube sans exception. Quelque chose passa sur le jardin pendant qu'ils dormaient. Au matin ils s'appelèrent, partirent à voix basse, et étaient sûrs.",
    },
    {
      id: 'ashabaljannah-3',
      type: 'quran_source',
      order: 3,
      content: "\"There will surely not enter it today upon you any poor person.\"",
      contentFr: "« Qu'aucun pauvre n'y entre aujourd'hui chez vous. »",
      source: {
        type: "quran",
        surahNumber: 68,
        surahNameEnglish: "Al-Qalam",
        surahNameArabic: "القلم",
        ayahStart: 17,
        ayahEnd: 25,
        arabicText: "إِنَّا بَلَوْنَـٰهُمْ كَمَا بَلَوْنَآ أَصْحَـٰبَ ٱلْجَنَّةِ إِذْ أَقْسَمُوا۟ لَيَصْرِمُنَّهَا مُصْبِحِينَ ۝ وَلَا يَسْتَثْنُونَ ۝ فَطَافَ عَلَيْهَا طَآئِفٌ مِّن رَّبِّكَ وَهُمْ نَآئِمُونَ ۝ فَأَصْبَحَتْ كَٱلصَّرِيمِ ۝ فَتَنَادَوْا۟ مُصْبِحِينَ ۝ أَنِ ٱغْدُوا۟ عَلَىٰ حَرْثِكُمْ إِن كُنتُمْ صَـٰرِمِينَ ۝ فَٱنطَلَقُوا۟ وَهُمْ يَتَخَـٰفَتُونَ ۝ أَن لَّا يَدْخُلَنَّهَا ٱلْيَوْمَ عَلَيْكُم مِّسْكِينٌ ۝ وَغَدَوْا۟ عَلَىٰ حَرْدٍ قَـٰدِرِينَ",
        translation: "Indeed, We have tried them as We tried the companions of the garden, when they swore to cut its fruit in the [early] morning Without making exception. So there came upon it [i.e., the garden] an affliction from your Lord while they were asleep. And it became as though reaped. And they called one another at morning, [Saying], \"Go early to your crop if you would cut the fruit.\" So they set out, while lowering their voices, [Saying], \"There will surely not enter it today upon you [any] poor person.\" And they went early in determination, [assuming themselves] able.",
        translationFr: "Nous les avons éprouvés comme Nous avions autrefois éprouvé les propriétaires du jardin et qui s’étaient juré de procéder à sa récolte au petit jour sans restreindre (leur serment) Un fléau venu de la part de ton Seigneur fondit sur le jardin pendant qu’ils dormaient. Au matin, (le jardin) était complètement ravagé. En se levant avec le jour, ils s’appelèrent les uns les autres : « Allez vite à votre champ si vous comptez (toujours) en achever la récolte. » Ils s’élancèrent aussitôt en se disant tout bas les uns aux autres : « Que nul pauvre n’y entre aujourd’hui ! » Ils s’en furent, au petit jour, fermement résolus à empêcher (les pauvres d’entrer dans leur jardin), et persuadés qu’ils en avaient le pouvoir.",
      } as QuranReference,
    },
    {
      id: 'ashabaljannah-4',
      type: 'narrative',
      order: 4,
      content: "﴿إِنَّا بَلَوْنَـٰهُمْ كَمَا بَلَوْنَآ أَصْحَـٰبَ ٱلْجَنَّةِ إِذْ أَقْسَمُوا۟ لَيَصْرِمُنَّهَا مُصْبِحِينَ﴾ Indeed, We have tried them as We tried the companions of the garden, when they swore to cut its fruit in the [early] morning ﴿وَلَا يَسْتَثْنُونَ﴾ Without making exception. ﴿فَطَافَ عَلَيْهَا طَآئِفٌ مِّن رَّبِّكَ وَهُمْ نَآئِمُونَ﴾ So there came upon it [i.e., the garden] an affliction from your Lord while they were asleep. ﴿فَأَصْبَحَتْ كَٱلصَّرِيمِ﴾ And it became as though reaped. ﴿فَتَنَادَوْا۟ مُصْبِحِينَ﴾ And they called one another at morning, ﴿أَنِ ٱغْدُوا۟ عَلَىٰ حَرْثِكُمْ إِن كُنتُمْ صَـٰرِمِينَ﴾ [Saying], \"Go early to your crop if you would cut the fruit.\" ﴿فَٱنطَلَقُوا۟ وَهُمْ يَتَخَـٰفَتُونَ﴾ So they set out, while lowering their voices, ﴿أَن لَّا يَدْخُلَنَّهَا ٱلْيَوْمَ عَلَيْكُم مِّسْكِينٌ﴾ [Saying], \"There will surely not enter it today upon you [any] poor person.\" ﴿وَغَدَوْا۟ عَلَىٰ حَرْدٍ قَـٰدِرِينَ﴾ And they went early in determination, [assuming themselves] able.",
      contentFr: "﴿إِنَّا بَلَوْنَـٰهُمْ كَمَا بَلَوْنَآ أَصْحَـٰبَ ٱلْجَنَّةِ إِذْ أَقْسَمُوا۟ لَيَصْرِمُنَّهَا مُصْبِحِينَ﴾ Nous les avons éprouvés comme Nous avions autrefois éprouvé les propriétaires du jardin et qui s’étaient juré de procéder à sa récolte au petit jour ﴿وَلَا يَسْتَثْنُونَ﴾ sans restreindre (leur serment) ﴿فَطَافَ عَلَيْهَا طَآئِفٌ مِّن رَّبِّكَ وَهُمْ نَآئِمُونَ﴾ Un fléau venu de la part de ton Seigneur fondit sur le jardin pendant qu’ils dormaient. ﴿فَأَصْبَحَتْ كَٱلصَّرِيمِ﴾ Au matin, (le jardin) était complètement ravagé. ﴿فَتَنَادَوْا۟ مُصْبِحِينَ﴾ En se levant avec le jour, ils s’appelèrent les uns les autres : ﴿أَنِ ٱغْدُوا۟ عَلَىٰ حَرْثِكُمْ إِن كُنتُمْ صَـٰرِمِينَ﴾ « Allez vite à votre champ si vous comptez (toujours) en achever la récolte. » ﴿فَٱنطَلَقُوا۟ وَهُمْ يَتَخَـٰفَتُونَ﴾ Ils s’élancèrent aussitôt en se disant tout bas les uns aux autres : ﴿أَن لَّا يَدْخُلَنَّهَا ٱلْيَوْمَ عَلَيْكُم مِّسْكِينٌ﴾ « Que nul pauvre n’y entre aujourd’hui ! » ﴿وَغَدَوْا۟ عَلَىٰ حَرْدٍ قَـٰدِرِينَ﴾ Ils s’en furent, au petit jour, fermement résolus à empêcher (les pauvres d’entrer dans leur jardin), et persuadés qu’ils en avaient le pouvoir.",
    },

    // ============ PART 2: THE MORNING ============
    {
      id: 'ashabaljannah-5',
      type: 'narrative',
      order: 5,
      content: "What they saw, what they said, what the most moderate of them said, and how they turned on one another - and the last verse.",
      contentFr: "Ce qu'ils virent, ce qu'ils dirent, ce que dit le plus modéré d'entre eux, et comment ils se retournèrent les uns contre les autres - et le dernier verset.",
    },
    {
      id: 'ashabaljannah-6',
      type: 'quran_source',
      order: 6,
      content: "\"Indeed, we are lost; rather, we have been deprived.\" \"Did I not say to you, why do you not glorify Allah?\"",
      contentFr: "« Nous sommes perdus ; non, nous avons été privés. » « Ne vous avais-je pas dit : pourquoi ne glorifiez-vous pas Allah ? »",
      source: {
        type: "quran",
        surahNumber: 68,
        surahNameEnglish: "Al-Qalam",
        surahNameArabic: "القلم",
        ayahStart: 26,
        ayahEnd: 33,
        arabicText: "فَلَمَّا رَأَوْهَا قَالُوٓا۟ إِنَّا لَضَآلُّونَ ۝ بَلْ نَحْنُ مَحْرُومُونَ ۝ قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا تُسَبِّحُونَ ۝ قَالُوا۟ سُبْحَـٰنَ رَبِّنَآ إِنَّا كُنَّا ظَـٰلِمِينَ ۝ فَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍ يَتَلَـٰوَمُونَ ۝ قَالُوا۟ يَـٰوَيْلَنَآ إِنَّا كُنَّا طَـٰغِينَ ۝ عَسَىٰ رَبُّنَآ أَن يُبْدِلَنَا خَيْرًا مِّنْهَآ إِنَّآ إِلَىٰ رَبِّنَا رَٰغِبُونَ ۝ كَذَٰلِكَ ٱلْعَذَابُ ۖ وَلَعَذَابُ ٱلْـَٔاخِرَةِ أَكْبَرُ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ",
        translation: "But when they saw it, they said, \"Indeed, we are lost; Rather, we have been deprived.\" The most moderate of them said, \"Did I not say to you, 'Why do you not exalt [Allah]?'\" They said, \"Exalted is our Lord! Indeed, we were wrongdoers.\" Then they approached one another, blaming each other. They said, \"O woe to us; indeed we were transgressors. Perhaps our Lord will substitute for us [one] better than it. Indeed, we are toward our Lord desirous.\" Such is the punishment [of this world]. And the punishment of the Hereafter is greater, if they only knew.",
        translationFr: "Quand ils eurent vu (le jardin), ils dirent : « Nous nous sommes vraiment égarés ! Ou plutôt voilà que nous avons tout perdu ! » Le plus sage d’entre eux dit alors : «Ne vous avais-je pas dit de rendre gloire à Allah ? » « Gloire soit rendue à notre Seigneur, s’écrièrent-ils, nous étions vraiment injustes ! » Puis ils se mirent à s’agonir de reproches mutuels. « Malheur à nous, dirent-ils, nous sommes allés à la démesure ! Que notre Seigneur nous accorde en échange mieux que (ce jardin) ! Car nous ne voulons plus rien désormais que l’agrément de notre Seigneur ! » C’est ainsi qu’est le supplice. Mais le supplice de l’autre monde est plus grand encore. Ah, si seulement ils pouvaient savoir !",
      } as QuranReference,
    },
    {
      id: 'ashabaljannah-7',
      type: 'narrative',
      order: 7,
      content: "﴿فَلَمَّا رَأَوْهَا قَالُوٓا۟ إِنَّا لَضَآلُّونَ﴾ But when they saw it, they said, \"Indeed, we are lost; ﴿بَلْ نَحْنُ مَحْرُومُونَ﴾ Rather, we have been deprived.\" ﴿قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا تُسَبِّحُونَ﴾ The most moderate of them said, \"Did I not say to you, 'Why do you not exalt [Allah]?'\" ﴿قَالُوا۟ سُبْحَـٰنَ رَبِّنَآ إِنَّا كُنَّا ظَـٰلِمِينَ﴾ They said, \"Exalted is our Lord! Indeed, we were wrongdoers.\" ﴿فَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍ يَتَلَـٰوَمُونَ﴾ Then they approached one another, blaming each other. ﴿قَالُوا۟ يَـٰوَيْلَنَآ إِنَّا كُنَّا طَـٰغِينَ﴾ They said, \"O woe to us; indeed we were transgressors. ﴿عَسَىٰ رَبُّنَآ أَن يُبْدِلَنَا خَيْرًا مِّنْهَآ إِنَّآ إِلَىٰ رَبِّنَا رَٰغِبُونَ﴾ Perhaps our Lord will substitute for us [one] better than it. Indeed, we are toward our Lord desirous.\" ﴿كَذَٰلِكَ ٱلْعَذَابُ ۖ وَلَعَذَابُ ٱلْـَٔاخِرَةِ أَكْبَرُ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ﴾ Such is the punishment [of this world]. And the punishment of the Hereafter is greater, if they only knew.",
      contentFr: "﴿فَلَمَّا رَأَوْهَا قَالُوٓا۟ إِنَّا لَضَآلُّونَ﴾ Quand ils eurent vu (le jardin), ils dirent : « Nous nous sommes vraiment égarés ! ﴿بَلْ نَحْنُ مَحْرُومُونَ﴾ Ou plutôt voilà que nous avons tout perdu ! » ﴿قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا تُسَبِّحُونَ﴾ Le plus sage d’entre eux dit alors : «Ne vous avais-je pas dit de rendre gloire à Allah ? » ﴿قَالُوا۟ سُبْحَـٰنَ رَبِّنَآ إِنَّا كُنَّا ظَـٰلِمِينَ﴾ « Gloire soit rendue à notre Seigneur, s’écrièrent-ils, nous étions vraiment injustes ! » ﴿فَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍ يَتَلَـٰوَمُونَ﴾ Puis ils se mirent à s’agonir de reproches mutuels. ﴿قَالُوا۟ يَـٰوَيْلَنَآ إِنَّا كُنَّا طَـٰغِينَ﴾ « Malheur à nous, dirent-ils, nous sommes allés à la démesure ! ﴿عَسَىٰ رَبُّنَآ أَن يُبْدِلَنَا خَيْرًا مِّنْهَآ إِنَّآ إِلَىٰ رَبِّنَا رَٰغِبُونَ﴾ Que notre Seigneur nous accorde en échange mieux que (ce jardin) ! Car nous ne voulons plus rien désormais que l’agrément de notre Seigneur ! » ﴿كَذَٰلِكَ ٱلْعَذَابُ ۖ وَلَعَذَابُ ٱلْـَٔاخِرَةِ أَكْبَرُ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ﴾ C’est ainsi qu’est le supplice. Mais le supplice de l’autre monde est plus grand encore. Ah, si seulement ils pouvaient savoir !",
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'ashabaljannah-8',
      type: 'narrative',
      order: 8,
      content: "The Quran does not say where the garden was, who its owners were, or whether they were given better. It gives their oath, their whisper, and their morning. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne dit ni où était le jardin, ni qui étaient ses propriétaires, ni s'ils reçurent mieux. Il donne leur serment, leur murmure, et leur matin. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
