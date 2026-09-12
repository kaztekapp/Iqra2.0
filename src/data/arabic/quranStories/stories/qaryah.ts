// The People of the Town (أصحاب القرية)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const qaryahStory: QuranStory = {
  id: "qaryah",
  titleEnglish: "The People of the Town",
  titleFrench: "Les Gens de la Cité",
  titleArabic: "أصحاب القرية",
  order: 12,
  category: "groups_nations",
  description: "Three messengers, a town that denied them, and a man who ran from its farthest part",
  descriptionFr: "Trois messagers, une cité qui les démentit, et un homme accouru de son extrémité",
  summary: "Allah presents the example of a town to which messengers came: two, then a third to strengthen them. The town said they were only men, that the Most Merciful had revealed nothing, and that they were a bad omen - stop, or be stoned. A man came running from the farthest end of the town: O my people, follow the messengers, follow those who ask you no payment. He said why he worshipped the One who created him, and that he believed - and it was said to him: enter Paradise. He wished his people could know how his Lord had forgiven him. One shout, and they were extinguished.",
  summaryFr: "Allah propose l'exemple d'une cité à laquelle vinrent des messagers : deux, puis un troisième pour les renforcer. La cité dit qu'ils n'étaient que des hommes, que le Tout Miséricordieux n'avait rien révélé, et qu'ils étaient de mauvais augure - cessez, ou soyez lapidés. Un homme vint en courant du bout de la cité : ô mon peuple, suivez les messagers, suivez ceux qui ne vous demandent aucun salaire. Il dit pourquoi il adorait Celui qui l'avait créé, et qu'il croyait - et il lui fut dit : entre au Paradis. Il souhaita que son peuple sache comment son Seigneur lui avait pardonné. Un seul cri, et ils furent éteints.",
  lessons: [
    "Two messengers were denied, and a third was sent to strengthen them. Denial did not reduce the call; it increased it (36:14).",
    "\"You are not but human beings like us.\" It is the oldest objection in the Quran, and the town made it too (36:15).",
    "\"We are not responsible except for clear notification.\" The messengers did not promise results; they promised clarity (36:17).",
    "The man came from the farthest end of the town, running. Faith arrived from the edge, in a hurry (36:20).",
    "His argument for the messengers was one sentence: they ask you no payment, and they are guided. That is still the test (36:21).",
    "\"And why should I not worship He who created me and to whom you will be returned?\" He answered the whole town with a question about himself (36:22).",
    "\"Enter Paradise.\" And his first thought in Paradise was his people: I wish they knew how my Lord has forgiven me. He wanted them saved, not punished, even then (36:26-27).",
    "\"It was not but one shout, and immediately they were extinguished.\" No army from the sky was needed; a sound was enough (36:28-29).",
  ],
  lessonsFr: [
    "Deux messagers furent démentis, et un troisième fut envoyé pour les renforcer. Le démenti ne réduisit pas l'appel ; il l'accrut (36:14).",
    "« Vous n'êtes que des hommes comme nous. » C'est la plus vieille objection du Coran, et la cité la fit aussi (36:15).",
    "« Nous ne sommes chargés que de transmettre clairement. » Les messagers ne promirent pas de résultats ; ils promirent la clarté (36:17).",
    "L'homme vint du bout de la cité, en courant. La foi arriva du bord, en hâte (36:20).",
    "Son argument pour les messagers tenait en une phrase : ils ne vous demandent aucun salaire, et ils sont guidés. C'est toujours le test (36:21).",
    "« Et pourquoi n'adorerais-je pas Celui qui m'a créé, et vers qui vous serez ramenés ? » Il répondit à toute la cité par une question sur lui-même (36:22).",
    "« Entre au Paradis. » Et sa première pensée au Paradis fut son peuple : si seulement ils savaient comment mon Seigneur m'a pardonné. Il les voulait sauvés, non châtiés, même alors (36:26-27).",
    "« Ce ne fut qu'un seul Cri, et voilà qu'ils furent éteints. » Nulle armée du ciel ne fut nécessaire ; un son suffit (36:28-29).",
  ],
  estimatedReadTime: 10,
  quranMentions: 1,
  icon: "🏘️",
  mainSurah: {
    number: 36,
    name: "Ya-Sin",
    nameArabic: "يس",
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'qaryah-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the people of the town, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nThe Quran tells it in one passage of Surah Ya-Sin and names neither the town, nor the messengers, nor the man who came running. No authentic hadith adds to it. What was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire des gens de la cité, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nLe Coran la raconte en un seul passage de la sourate Ya-Sin et ne nomme ni la cité, ni les messagers, ni l'homme venu en courant. Aucun hadith authentique n'y ajoute. Ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: THE MESSENGERS, AND THE TOWN ============
    {
      id: 'qaryah-2',
      type: 'narrative',
      order: 2,
      content: "Two messengers, then a third. The town's three objections, and the messengers' answers - given line by line.",
      contentFr: "Deux messagers, puis un troisième. Les trois objections de la cité, et les réponses des messagers - données ligne par ligne.",
    },
    {
      id: 'qaryah-3',
      type: 'quran_source',
      order: 3,
      content: "\"Indeed, we are messengers to you.\" \"You are not but human beings like us.\"",
      contentFr: "« Nous sommes envoyés à vous. » « Vous n'êtes que des hommes comme nous. »",
      source: {
        type: "quran",
        surahNumber: 36,
        surahNameEnglish: "Ya-Sin",
        surahNameArabic: "يس",
        ayahStart: 13,
        ayahEnd: 19,
        arabicText: "وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَـٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ ۝ إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ ۝ قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَـٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ ۝ قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ ۝ وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَـٰغُ ٱلْمُبِينُ ۝ قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ ۝ قَالُوا۟ طَـٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ",
        translation: "And present to them an example: the people of the city, when the messengers came to it - When We sent to them two but they denied them, so We strengthened [them] with a third, and they said, \"Indeed, we are messengers to you.\" They said, \"You are not but human beings like us, and the Most Merciful has not revealed a thing. You are only telling lies.\" They said, \"Our Lord knows that we are messengers to you, And we are not responsible except for clear notification.\" They said, \"Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you, from us, a painful punishment.\" They said, \"Your omen [i.e., fate] is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.\"",
        translationFr: "Propose-leur comme exemple les habitants de la cité lorsque leur vinrent les Messagers. Nous leur en avions envoyé deux qu’ils traitèrent de menteurs. Nous les appuyâmes alors par un troisième et ils dirent : « C’est vers vous que nous avons été envoyés. » « Vous n’êtes que des humains comme nous, répondirent (les habitants de la cité), et le Tout Clément n’a rien fait descendre (en révélation) : vous n’êtes que des menteurs ! » « Notre Seigneur Sait que c’est vers vous que nous sommes certes envoyés, (dirent les Messagers) et il ne nous appartient que de (vous) transmettre clairement ce message. » « Vous nous êtes des oiseaux de mauvais augure, reprirent (les mécréants). Ou vous arrêtez ou nous vous lapiderons, et vous atteindra, de notre part, un supplice très douloureux. » « Votre mauvais augure n’est dû qu’à vous-mêmes, dirent (les Messagers). (Réagissez-vous ainsi) parce que vous est rappelée (la vérité) ? Vous n’êtes en vérité que des gens portés aux excès ! »",
      } as QuranReference,
    },
    {
      id: 'qaryah-4',
      type: 'narrative',
      order: 4,
      content: "﴿وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَـٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ﴾ And present to them an example: the people of the city, when the messengers came to it - ﴿إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ﴾ When We sent to them two but they denied them, so We strengthened [them] with a third, and they said, \"Indeed, we are messengers to you.\" ﴿قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَـٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ﴾ They said, \"You are not but human beings like us, and the Most Merciful has not revealed a thing. You are only telling lies.\" ﴿قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ﴾ They said, \"Our Lord knows that we are messengers to you, ﴿وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَـٰغُ ٱلْمُبِينُ﴾ And we are not responsible except for clear notification.\" ﴿قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ﴾ They said, \"Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you, from us, a painful punishment.\" ﴿قَالُوا۟ طَـٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ﴾ They said, \"Your omen [i.e., fate] is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.\"",
      contentFr: "﴿وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَـٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ﴾ Propose-leur comme exemple les habitants de la cité lorsque leur vinrent les Messagers. ﴿إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ﴾ Nous leur en avions envoyé deux qu’ils traitèrent de menteurs. Nous les appuyâmes alors par un troisième et ils dirent : « C’est vers vous que nous avons été envoyés. » ﴿قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَـٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ﴾ « Vous n’êtes que des humains comme nous, répondirent (les habitants de la cité), et le Tout Clément n’a rien fait descendre (en révélation) : vous n’êtes que des menteurs ! » ﴿قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ﴾ « Notre Seigneur Sait que c’est vers vous que nous sommes certes envoyés, (dirent les Messagers) ﴿وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَـٰغُ ٱلْمُبِينُ﴾ et il ne nous appartient que de (vous) transmettre clairement ce message. » ﴿قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ﴾ « Vous nous êtes des oiseaux de mauvais augure, reprirent (les mécréants). Ou vous arrêtez ou nous vous lapiderons, et vous atteindra, de notre part, un supplice très douloureux. » ﴿قَالُوا۟ طَـٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ﴾ « Votre mauvais augure n’est dû qu’à vous-mêmes, dirent (les Messagers). (Réagissez-vous ainsi) parce que vous est rappelée (la vérité) ? Vous n’êtes en vérité que des gens portés aux excès ! »",
    },

    // ============ PART 2: THE MAN WHO CAME RUNNING ============
    {
      id: 'qaryah-5',
      type: 'narrative',
      order: 5,
      content: "From the farthest end of the town, a man came running, and what he said to his people is given whole - and what was said to him, and what he wished.",
      contentFr: "Du bout de la cité, un homme vint en courant, et ce qu'il dit à son peuple est donné en entier - et ce qui lui fut dit, et ce qu'il souhaita.",
    },
    {
      id: 'qaryah-6',
      type: 'quran_source',
      order: 6,
      content: "\"O my people, follow the messengers.\" \"Enter Paradise.\" \"I wish my people could know.\"",
      contentFr: "« Ô mon peuple, suivez les messagers. » « Entre au Paradis. » « Si seulement mon peuple savait. »",
      source: {
        type: "quran",
        surahNumber: 36,
        surahNameEnglish: "Ya-Sin",
        surahNameArabic: "يس",
        ayahStart: 20,
        ayahEnd: 27,
        arabicText: "وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَـٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ ۝ ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ ۝ وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ ۝ ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَـٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّى شَفَـٰعَتُهُمْ شَيْـًٔا وَلَا يُنقِذُونِ ۝ إِنِّىٓ إِذًا لَّفِى ضَلَـٰلٍ مُّبِينٍ ۝ إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ ۝ قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَـٰلَيْتَ قَوْمِى يَعْلَمُونَ ۝ بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ",
        translation: "And there came from the farthest end of the city a man, running. He said, \"O my people, follow the messengers. Follow those who do not ask of you [any] payment, and they are [rightly] guided. And why should I not worship He who created me and to whom you will be returned? Should I take other than Him [false] deities [while], if the Most Merciful intends for me some adversity, their intercession will not avail me at all, nor can they save me? Indeed, I would then be in manifest error. Indeed, I have believed in your Lord, so listen to me.\" It was said, \"Enter Paradise.\" He said, \"I wish my people could know Of how my Lord has forgiven me and placed me among the honored.\"",
        translationFr: "Un homme, de l’autre bout de la ville, accourut en disant : « Ô peuple mien ! Suivez les Messagers ! Suivez ceux qui ne vous réclament aucune récompense et qui sont bien guidés. Et pourquoi n’adorerais-je pas Celui Qui m’a créé (sans modèle préalable) et vers Qui vous devez retourner ? Prendrais-je en dehors de Lui des divinités qui, si le Tout Clément me voulait du mal, ne sauraient en rien intercéder en ma faveur, ni ne me seraient d’aucun secours ? Je serais alors dans un égarement évident. J’ai cru en votre Seigneur, (ô Messagers), écoutez-moi. » (Mis à mort pour cet aveu), il s’entendit dire : « Entre au Paradis ! » « Si seulement mon peuple savait, s’exclama-t-il, que mon Seigneur m’a pardonné et m’a placé parmi ceux qui sont honorés ! »",
      } as QuranReference,
    },
    {
      id: 'qaryah-7',
      type: 'narrative',
      order: 7,
      content: "﴿وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَـٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ﴾ And there came from the farthest end of the city a man, running. He said, \"O my people, follow the messengers. ﴿ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ﴾ Follow those who do not ask of you [any] payment, and they are [rightly] guided. ﴿وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ﴾ And why should I not worship He who created me and to whom you will be returned? ﴿ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَـٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّى شَفَـٰعَتُهُمْ شَيْـًٔا وَلَا يُنقِذُونِ﴾ Should I take other than Him [false] deities [while], if the Most Merciful intends for me some adversity, their intercession will not avail me at all, nor can they save me? ﴿إِنِّىٓ إِذًا لَّفِى ضَلَـٰلٍ مُّبِينٍ﴾ Indeed, I would then be in manifest error. ﴿إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ﴾ Indeed, I have believed in your Lord, so listen to me.\" ﴿قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَـٰلَيْتَ قَوْمِى يَعْلَمُونَ﴾ It was said, \"Enter Paradise.\" He said, \"I wish my people could know ﴿بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ﴾ Of how my Lord has forgiven me and placed me among the honored.\"",
      contentFr: "﴿وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَـٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ﴾ Un homme, de l’autre bout de la ville, accourut en disant : « Ô peuple mien ! Suivez les Messagers ! ﴿ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ﴾ Suivez ceux qui ne vous réclament aucune récompense et qui sont bien guidés. ﴿وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ﴾ Et pourquoi n’adorerais-je pas Celui Qui m’a créé (sans modèle préalable) et vers Qui vous devez retourner ? ﴿ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَـٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّى شَفَـٰعَتُهُمْ شَيْـًٔا وَلَا يُنقِذُونِ﴾ Prendrais-je en dehors de Lui des divinités qui, si le Tout Clément me voulait du mal, ne sauraient en rien intercéder en ma faveur, ni ne me seraient d’aucun secours ? ﴿إِنِّىٓ إِذًا لَّفِى ضَلَـٰلٍ مُّبِينٍ﴾ Je serais alors dans un égarement évident. ﴿إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ﴾ J’ai cru en votre Seigneur, (ô Messagers), écoutez-moi. » ﴿قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَـٰلَيْتَ قَوْمِى يَعْلَمُونَ﴾ (Mis à mort pour cet aveu), il s’entendit dire : « Entre au Paradis ! » « Si seulement mon peuple savait, s’exclama-t-il, ﴿بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ﴾ que mon Seigneur m’a pardonné et m’a placé parmi ceux qui sont honorés ! »",
    },
    {
      id: 'qaryah-8',
      type: 'narrative',
      order: 8,
      content: "And what happened to the town after him: one shout.",
      contentFr: "Et ce qui arriva à la cité après lui : un seul cri.",
    },
    {
      id: 'qaryah-9',
      type: 'quran_source',
      order: 9,
      content: "\"It was not but one shout, and immediately they were extinguished.\"",
      contentFr: "« Ce ne fut qu'un seul Cri, et voilà qu'ils furent éteints. »",
      source: {
        type: "quran",
        surahNumber: 36,
        surahNameEnglish: "Ya-Sin",
        surahNameArabic: "يس",
        ayahStart: 28,
        ayahEnd: 32,
        arabicText: "وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ ۝ إِن كَانَتْ إِلَّا صَيْحَةً وَٰحِدَةً فَإِذَا هُمْ خَـٰمِدُونَ ۝ يَـٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ ۝ أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ ۝ وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ",
        translation: "And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so. It was not but one shout, and immediately they were extinguished. How regretful for the servants. There did not come to them any messenger except that they used to ridicule him. Have they not considered how many generations We destroyed before them - that they to them will not return? And indeed, all of them will yet be brought present before Us.",
        translationFr: "Nous ne fîmes descendre du ciel, après lui, aucune armée sur son peuple, et Nous ne comptions pas en faire descendre. Il n’y eut qu’un seul Cri, et les voilà inertes. Combien triste (est la conduite des) humains ! Jamais Messager ne vient vers eux sans qu’ils ne le tournent en dérision ! N’ont-ils donc pas vu combien de générations Nous avons fait périr avant eux et qu’ils ne verront plus vers eux revenir ? Or tous devant Nous devront comparaître.",
      } as QuranReference,
    },
    {
      id: 'qaryah-10',
      type: 'narrative',
      order: 10,
      content: "﴿وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ﴾ And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so. ﴿إِن كَانَتْ إِلَّا صَيْحَةً وَٰحِدَةً فَإِذَا هُمْ خَـٰمِدُونَ﴾ It was not but one shout, and immediately they were extinguished. ﴿يَـٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ﴾ How regretful for the servants. There did not come to them any messenger except that they used to ridicule him. ﴿أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ﴾ Have they not considered how many generations We destroyed before them - that they to them will not return? ﴿وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ﴾ And indeed, all of them will yet be brought present before Us.",
      contentFr: "﴿وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ﴾ Nous ne fîmes descendre du ciel, après lui, aucune armée sur son peuple, et Nous ne comptions pas en faire descendre. ﴿إِن كَانَتْ إِلَّا صَيْحَةً وَٰحِدَةً فَإِذَا هُمْ خَـٰمِدُونَ﴾ Il n’y eut qu’un seul Cri, et les voilà inertes. ﴿يَـٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ﴾ Combien triste (est la conduite des) humains ! Jamais Messager ne vient vers eux sans qu’ils ne le tournent en dérision ! ﴿أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ﴾ N’ont-ils donc pas vu combien de générations Nous avons fait périr avant eux et qu’ils ne verront plus vers eux revenir ? ﴿وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ﴾ Or tous devant Nous devront comparaître.",
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'qaryah-11',
      type: 'narrative',
      order: 11,
      content: "The Quran does not name the town, the three messengers, or the man, and does not say when it was. It gives their words and the shout. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne nomme ni la cité, ni les trois messagers, ni l'homme, et ne dit pas quand ce fut. Il donne leurs mots et le cri. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
