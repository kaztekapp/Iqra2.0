// Story of Prophet Yunus (يونس) - The One of the Whale
// Told from the Quran and the authentic Sunnah only.
// Every Quranic passage about Yunus is reported; conversations are given ayah by
// ayah, verbatim, with no paraphrase around them.

import { Prophet, SubStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const yunusStory: Prophet = {
  id: 'yunus',
  nameEnglish: 'Yunus',
  nameFrench: 'Younous',
  nameArabic: 'يونس',
  order: 1,
  title: 'The One of the Whale',
  titleFr: 'Le Compagnon de la Baleine',
  titleArabic: 'صاحب الحوت',
  summary: "Yunus went off in anger and ran to the laden ship; he drew lots and lost, and the fish swallowed him while he was blameworthy. In the darknesses he called: there is no god but You, exalted are You, I have been of the wrongdoers - and had he not been of those who glorify Allah, he would have stayed in its belly until the Day of Resurrection. He was thrown on the shore, ill, and a gourd vine was grown over him. He was sent to a hundred thousand or more, and they believed - the only city whose faith, when it came, benefited it. His Lord chose him and made him of the righteous.",
  summaryFr: "Younous partit en colère et courut au vaisseau chargé ; il tira au sort et perdit, et le poisson l'avala tandis qu'il était blâmable. Dans les ténèbres il appela : il n'y a de dieu que Toi, gloire à Toi, j'ai été du nombre des injustes - et s'il n'avait pas été de ceux qui glorifient Allah, il serait resté dans son ventre jusqu'au Jour de la Résurrection. Il fut jeté sur le rivage, malade, et un plant de courge fut fait pousser sur lui. Il fut envoyé à cent mille ou plus, et ils crurent - la seule cité dont la foi, quand elle vint, lui profita. Son Seigneur le choisit et le mit au nombre des vertueux.",
  hasSubStories: false,
  lessons: [
    "\"He went off in anger and thought that We would not decree anything upon him.\" A prophet's anger is recorded, and so is the thought behind it. No one is above being called to account for leaving (21:87).",
    "In the belly of the fish, in the dark, he said three things: there is no god but You; exalted are You; I have been of the wrongdoers. Praise first, then confession. That is the order of a prayer that is answered (21:87).",
    "\"Had he not been of those who exalt Allah, he would have remained inside its belly until the Day they are resurrected.\" What saved him was not the prayer of that moment alone; it was that he had always glorified Allah (37:143-144).",
    "He was thrown on the shore ill, and a gourd vine was grown over him. Mercy after the fish was shade over a sick man (37:145-146).",
    "He was sent to a hundred thousand or more, and they believed. The only city in the Quran whose faith came in time came through the prophet who had once run (37:147-148, 10:98).",
    "\"Be not like the companion of the fish\" - Allah told His last Prophet that. Yunus's story was given as a warning, and Yunus is still called of the righteous (68:48-50).",
    "The Prophet ﷺ said: it is not fitting for a servant to say, \"I am better than Yunus ibn Matta.\" The one who ran, repented, and was chosen is not to be looked down on by anyone (Bukhari 3412).",
    "The Prophet ﷺ said that no Muslim calls with the prayer of Dhun-Nun for anything except that Allah answers him. What was said in the belly of a fish became a door for everyone (Tirmidhi 3505).",
  ],
  lessonsFr: [
    "« Il partit en colère et pensa que Nous ne décréterions rien contre lui. » La colère d'un prophète est consignée, et la pensée qui la sous-tend aussi. Nul n'est au-dessus de rendre compte d'un départ (21:87).",
    "Dans le ventre du poisson, dans le noir, il dit trois choses : il n'y a de dieu que Toi ; gloire à Toi ; j'ai été du nombre des injustes. La louange d'abord, puis l'aveu. C'est l'ordre d'une prière exaucée (21:87).",
    "« S'il n'avait pas été de ceux qui glorifient Allah, il serait resté dans son ventre jusqu'au Jour où ils seront ressuscités. » Ce qui le sauva ne fut pas seulement la prière de cet instant ; c'est qu'il avait toujours glorifié Allah (37:143-144).",
    "Il fut jeté sur le rivage malade, et un plant de courge fut fait pousser sur lui. La miséricorde après le poisson fut de l'ombre sur un homme malade (37:145-146).",
    "Il fut envoyé à cent mille ou plus, et ils crurent. La seule cité du Coran dont la foi vint à temps la reçut par le prophète qui avait un jour fui (37:147-148, 10:98).",
    "« Ne sois pas comme l'homme au poisson » - Allah dit cela à Son dernier Prophète. L'histoire de Younous fut donnée comme avertissement, et Younous est toujours appelé des vertueux (68:48-50).",
    "Le Prophète ﷺ a dit : il ne convient pas à un serviteur de dire : « Je suis meilleur que Younous fils de Matta. » Celui qui fuit, se repentit et fut choisi ne doit être méprisé par personne (Boukhari 3412).",
    "Le Prophète ﷺ a dit que nul musulman n'invoque avec la prière de Dhoun-Noun pour quelque chose sans qu'Allah ne l'exauce. Ce qui fut dit dans le ventre d'un poisson devint une porte pour tous (Tirmidhi 3505).",
  ],
  estimatedReadTime: 15,
  quranMentions: 4,
  icon: '🐋',
};

// Single continuous story (no sub-stories)
export const yunusStoryContent: StoryContentBlock[] = [

  // ============ INTRODUCTION ============
  {
    id: 'yunus-1',
    type: 'narrative',
    order: 1,
    content: "This is the story of Prophet Yunus, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran tells of him in four surahs, and each passage is given here whole. It does not name his city, does not say what angered him or how long he was in the fish, and tells nothing of his life after - and what was not told is not ours to imagine. Allah knows best.",
    contentFr: "Voici l'histoire du prophète Younous, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran le raconte dans quatre sourates, et chaque passage est donné ici en entier. Il ne nomme pas sa cité, ne dit ni ce qui le mit en colère ni combien de temps il resta dans le poisson, et ne raconte rien de sa vie après - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
  },

  // ============ PART 1: THE SHIP, AND THE FISH ============
  {
    id: 'yunus-2',
    type: 'narrative',
    order: 2,
    content: "Surah As-Saffat tells it from the ship: he ran to it, drew lots and lost, and the fish swallowed him. What would have happened had he not been one who glorified Allah; the shore; the gourd vine; and the hundred thousand who believed.",
    contentFr: "La sourate As-Saffat le raconte depuis le vaisseau : il y courut, tira au sort et perdit, et le poisson l'avala. Ce qui serait arrivé s'il n'avait pas été de ceux qui glorifient Allah ; le rivage ; le plant de courge ; et les cent mille qui crurent.",
  },
  {
    id: 'yunus-3',
    type: 'quran_source',
    order: 3,
    content: "The laden ship, the lots, the fish, the shore, the gourd vine, and the hundred thousand.",
    contentFr: "Le vaisseau chargé, le tirage au sort, le poisson, le rivage, le plant de courge, et les cent mille.",
    source: {
      type: "quran",
      surahNumber: 37,
      surahNameEnglish: "As-Saffat",
      surahNameArabic: "الصافات",
      ayahStart: 139,
      ayahEnd: 148,
      arabicText: "وَإِنَّ يُونُسَ لَمِنَ ٱلْمُرْسَلِينَ ۝ إِذْ أَبَقَ إِلَى ٱلْفُلْكِ ٱلْمَشْحُونِ ۝ فَسَاهَمَ فَكَانَ مِنَ ٱلْمُدْحَضِينَ ۝ فَٱلْتَقَمَهُ ٱلْحُوتُ وَهُوَ مُلِيمٌ ۝ فَلَوْلَآ أَنَّهُۥ كَانَ مِنَ ٱلْمُسَبِّحِينَ ۝ لَلَبِثَ فِى بَطْنِهِۦٓ إِلَىٰ يَوْمِ يُبْعَثُونَ ۝ فَنَبَذْنَـٰهُ بِٱلْعَرَآءِ وَهُوَ سَقِيمٌ ۝ وَأَنۢبَتْنَا عَلَيْهِ شَجَرَةً مِّن يَقْطِينٍ ۝ وَأَرْسَلْنَـٰهُ إِلَىٰ مِا۟ئَةِ أَلْفٍ أَوْ يَزِيدُونَ ۝ فَـَٔامَنُوا۟ فَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ",
      translation: "And indeed, Yunus was among the messengers. [Mention] when he ran away to the laden ship. And he drew lots and was among the losers. Then the fish swallowed him, while he was blameworthy. And had he not been of those who exalt Allah, He would have remained inside its belly until the Day they are resurrected. But We threw him onto the open shore while he was ill. And We caused to grow over him a gourd vine. And We sent him to [his people of] a hundred thousand or more. And they believed, so We gave them enjoyment [of life] for a time.",
      translationFr: "Younous fut aussi du nombre des Messagers. Il s’était enfui sur le vaisseau chargé. Désigné par le tirage au sort, il fut du nombre des perdants. Le poisson l’avala, lui qui était à blâmer. S’il n’avait été de ceux qui rendent gloire (à Allah), il serait certainement resté dans le ventre (du poisson) jusqu’au Jour où (les hommes) seront ressuscités. Nous le fîmes rejeter, malade, sur une terre nue. Nous fîmes pousser au-dessus de lui un plant de courge, et Nous l’envoyâmes (en Messager) à quelque cent mille (hommes) ou plus. Ils crurent et Nous les fîmes jouir (de ce bas monde) pour un temps.",
    } as QuranReference,
  },
  {
    id: 'yunus-4',
    type: 'narrative',
    order: 4,
    content: "﴿وَإِنَّ يُونُسَ لَمِنَ ٱلْمُرْسَلِينَ﴾ And indeed, Yunus was among the messengers. ﴿إِذْ أَبَقَ إِلَى ٱلْفُلْكِ ٱلْمَشْحُونِ﴾ [Mention] when he ran away to the laden ship. ﴿فَسَاهَمَ فَكَانَ مِنَ ٱلْمُدْحَضِينَ﴾ And he drew lots and was among the losers. ﴿فَٱلْتَقَمَهُ ٱلْحُوتُ وَهُوَ مُلِيمٌ﴾ Then the fish swallowed him, while he was blameworthy. ﴿فَلَوْلَآ أَنَّهُۥ كَانَ مِنَ ٱلْمُسَبِّحِينَ﴾ And had he not been of those who exalt Allah, ﴿لَلَبِثَ فِى بَطْنِهِۦٓ إِلَىٰ يَوْمِ يُبْعَثُونَ﴾ He would have remained inside its belly until the Day they are resurrected. ﴿فَنَبَذْنَـٰهُ بِٱلْعَرَآءِ وَهُوَ سَقِيمٌ﴾ But We threw him onto the open shore while he was ill. ﴿وَأَنۢبَتْنَا عَلَيْهِ شَجَرَةً مِّن يَقْطِينٍ﴾ And We caused to grow over him a gourd vine. ﴿وَأَرْسَلْنَـٰهُ إِلَىٰ مِا۟ئَةِ أَلْفٍ أَوْ يَزِيدُونَ﴾ And We sent him to [his people of] a hundred thousand or more. ﴿فَـَٔامَنُوا۟ فَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ﴾ And they believed, so We gave them enjoyment [of life] for a time.",
    contentFr: "﴿وَإِنَّ يُونُسَ لَمِنَ ٱلْمُرْسَلِينَ﴾ Younous fut aussi du nombre des Messagers. ﴿إِذْ أَبَقَ إِلَى ٱلْفُلْكِ ٱلْمَشْحُونِ﴾ Il s’était enfui sur le vaisseau chargé. ﴿فَسَاهَمَ فَكَانَ مِنَ ٱلْمُدْحَضِينَ﴾ Désigné par le tirage au sort, il fut du nombre des perdants. ﴿فَٱلْتَقَمَهُ ٱلْحُوتُ وَهُوَ مُلِيمٌ﴾ Le poisson l’avala, lui qui était à blâmer. ﴿فَلَوْلَآ أَنَّهُۥ كَانَ مِنَ ٱلْمُسَبِّحِينَ﴾ S’il n’avait été de ceux qui rendent gloire (à Allah), ﴿لَلَبِثَ فِى بَطْنِهِۦٓ إِلَىٰ يَوْمِ يُبْعَثُونَ﴾ il serait certainement resté dans le ventre (du poisson) jusqu’au Jour où (les hommes) seront ressuscités. ﴿فَنَبَذْنَـٰهُ بِٱلْعَرَآءِ وَهُوَ سَقِيمٌ﴾ Nous le fîmes rejeter, malade, sur une terre nue. ﴿وَأَنۢبَتْنَا عَلَيْهِ شَجَرَةً مِّن يَقْطِينٍ﴾ Nous fîmes pousser au-dessus de lui un plant de courge, ﴿وَأَرْسَلْنَـٰهُ إِلَىٰ مِا۟ئَةِ أَلْفٍ أَوْ يَزِيدُونَ﴾ et Nous l’envoyâmes (en Messager) à quelque cent mille (hommes) ou plus. ﴿فَـَٔامَنُوا۟ فَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ﴾ Ils crurent et Nous les fîmes jouir (de ce bas monde) pour un temps.",
  },
  {
    id: 'yunus-5',
    type: 'narrative',
    order: 5,
    content: "Surah Al-Anbiya gives the prayer he made in the darknesses, word for word, and Allah's answer - and says that this is how the believers are saved.",
    contentFr: "La sourate Al-Anbiya donne la prière qu'il fit dans les ténèbres, mot pour mot, et la réponse d'Allah - et dit que c'est ainsi que les croyants sont sauvés.",
  },
  {
    id: 'yunus-6',
    type: 'quran_source',
    order: 6,
    content: "\"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.\"",
    contentFr: "« Il n'y a de dieu que Toi ; gloire à Toi. J'ai été du nombre des injustes. »",
    source: {
      type: "quran",
      surahNumber: 21,
      surahNameEnglish: "Al-Anbiya",
      surahNameArabic: "الأنبياء",
      ayahStart: 87,
      ayahEnd: 88,
      arabicText: "وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ ۝ فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ",
      translation: "And [mention] the man of the fish [i.e., Yunus], when he went off in anger and thought that We would not decree [anything] upon him. And he called out within the darknesses, \"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.\" So We responded to him and saved him from the distress. And thus do We save the believers.",
      translationFr: "Et Dhoun-Noun, qui s’en alla dépité croyant pouvoir échapper à Nos rigueurs. Puis il appela dans les ténèbres : « Il n’est point d’autre divinité que Toi, gloire Te soit rendue, j’étais certes du nombre des injustes ! » Nous l’exauçâmes et le délivrâmes de l’angoisse. Ainsi délivrons-Nous les croyants.",
    } as QuranReference,
  },
  {
    id: 'yunus-7',
    type: 'narrative',
    order: 7,
    content: "﴿وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ﴾ And [mention] the man of the fish [i.e., Yunus], when he went off in anger and thought that We would not decree [anything] upon him. And he called out within the darknesses, \"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.\" ﴿فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ﴾ So We responded to him and saved him from the distress. And thus do We save the believers.",
    contentFr: "﴿وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ﴾ Et Dhoun-Noun, qui s’en alla dépité croyant pouvoir échapper à Nos rigueurs. Puis il appela dans les ténèbres : « Il n’est point d’autre divinité que Toi, gloire Te soit rendue, j’étais certes du nombre des injustes ! » ﴿فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ﴾ Nous l’exauçâmes et le délivrâmes de l’angoisse. Ainsi délivrons-Nous les croyants.",
  },
  {
    id: 'yunus-8',
    type: 'narrative',
    order: 8,
    content: "Surah Al-Qalam tells the Prophet ﷺ to be patient and not to be like the companion of the fish - and says what Allah did for Yunus after.",
    contentFr: "La sourate Al-Qalam dit au Prophète ﷺ de patienter et de ne pas être comme l'homme au poisson - et dit ce qu'Allah fit pour Younous ensuite.",
  },
  {
    id: 'yunus-9',
    type: 'quran_source',
    order: 9,
    content: "\"And his Lord chose him and made him of the righteous.\"",
    contentFr: "« Et son Seigneur le choisit et le mit au nombre des vertueux. »",
    source: {
      type: "quran",
      surahNumber: 68,
      surahNameEnglish: "Al-Qalam",
      surahNameArabic: "القلم",
      ayahStart: 48,
      ayahEnd: 50,
      arabicText: "فَٱصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ ٱلْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ ۝ لَّوْلَآ أَن تَدَٰرَكَهُۥ نِعْمَةٌ مِّن رَّبِّهِۦ لَنُبِذَ بِٱلْعَرَآءِ وَهُوَ مَذْمُومٌ ۝ فَٱجْتَبَـٰهُ رَبُّهُۥ فَجَعَلَهُۥ مِنَ ٱلصَّـٰلِحِينَ",
      translation: "Then be patient for the decision of your Lord, [O Muhammad], and be not like the companion of the fish [i.e., Yunus] when he called out while he was distressed. If not that a favor [i.e., mercy] from his Lord overtook him, he would have been thrown onto the naked shore while he was censured. And his Lord chose him and made him of the righteous.",
      translationFr: "Supporte patiemment le Verdict de ton Seigneur ! Ne sois pas comme l’Homme au Poisson quand, en pleine angoisse, il adressa sa plainte (à Allah). N’eût été une grâce qui l’atteignît de la part de son Seigneur, il eût été sans doute jeté, couvert d’ignominie, sur un rivage désert. Son Seigneur l’élut et le fit du nombre des vertueux.",
    } as QuranReference,
  },
  {
    id: 'yunus-10',
    type: 'narrative',
    order: 10,
    content: "﴿فَٱصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ ٱلْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ﴾ Then be patient for the decision of your Lord, [O Muhammad], and be not like the companion of the fish [i.e., Yunus] when he called out while he was distressed. ﴿لَّوْلَآ أَن تَدَٰرَكَهُۥ نِعْمَةٌ مِّن رَّبِّهِۦ لَنُبِذَ بِٱلْعَرَآءِ وَهُوَ مَذْمُومٌ﴾ If not that a favor [i.e., mercy] from his Lord overtook him, he would have been thrown onto the naked shore while he was censured. ﴿فَٱجْتَبَـٰهُ رَبُّهُۥ فَجَعَلَهُۥ مِنَ ٱلصَّـٰلِحِينَ﴾ And his Lord chose him and made him of the righteous.",
    contentFr: "﴿فَٱصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ ٱلْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ﴾ Supporte patiemment le Verdict de ton Seigneur ! Ne sois pas comme l’Homme au Poisson quand, en pleine angoisse, il adressa sa plainte (à Allah). ﴿لَّوْلَآ أَن تَدَٰرَكَهُۥ نِعْمَةٌ مِّن رَّبِّهِۦ لَنُبِذَ بِٱلْعَرَآءِ وَهُوَ مَذْمُومٌ﴾ N’eût été une grâce qui l’atteignît de la part de son Seigneur, il eût été sans doute jeté, couvert d’ignominie, sur un rivage désert. ﴿فَٱجْتَبَـٰهُ رَبُّهُۥ فَجَعَلَهُۥ مِنَ ٱلصَّـٰلِحِينَ﴾ Son Seigneur l’élut et le fit du nombre des vertueux.",
  },

  // ============ PART 2: THE PEOPLE OF YUNUS ============
  {
    id: 'yunus-11',
    type: 'narrative',
    order: 11,
    content: "The surah that carries his name gives his people one verse, and it is a verse given to no other people.",
    contentFr: "La sourate qui porte son nom donne à son peuple un seul verset, et c'est un verset donné à nul autre peuple.",
  },
  {
    id: 'yunus-12',
    type: 'quran_source',
    order: 12,
    content: "The only city whose faith benefited it: the people of Yunus.",
    contentFr: "La seule cité dont la foi lui profita : le peuple de Younous.",
    source: {
      type: "quran",
      surahNumber: 10,
      surahNameEnglish: "Yunus",
      surahNameArabic: "يونس",
      ayahStart: 98,
      ayahEnd: 98,
      arabicText: "فَلَوْلَا كَانَتْ قَرْيَةٌ ءَامَنَتْ فَنَفَعَهَآ إِيمَـٰنُهَآ إِلَّا قَوْمَ يُونُسَ لَمَّآ ءَامَنُوا۟ كَشَفْنَا عَنْهُمْ عَذَابَ ٱلْخِزْىِ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ",
      translation: "Then has there not been a [single] city that believed so its faith benefited it except the people of Yunus? When they believed, We removed from them the punishment of disgrace in worldly life and gave them enjoyment [i.e., provision] for a time.",
      translationFr: "Que n’y eut-il une seule cité qui eût cru et eût bénéficié de sa foi, tel le peuple de Younous ! Lorsque ces derniers eurent cru, Nous leur épargnâmes le supplice de l’humiliation en ce bas monde et Nous les laissâmes jouir de leur subsistance pour un temps.",
    } as QuranReference,
  },
  {
    id: 'yunus-13',
    type: 'narrative',
    order: 13,
    content: "﴿فَلَوْلَا كَانَتْ قَرْيَةٌ ءَامَنَتْ فَنَفَعَهَآ إِيمَـٰنُهَآ إِلَّا قَوْمَ يُونُسَ لَمَّآ ءَامَنُوا۟ كَشَفْنَا عَنْهُمْ عَذَابَ ٱلْخِزْىِ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ﴾ Then has there not been a [single] city that believed so its faith benefited it except the people of Yunus? When they believed, We removed from them the punishment of disgrace in worldly life and gave them enjoyment [i.e., provision] for a time.",
    contentFr: "﴿فَلَوْلَا كَانَتْ قَرْيَةٌ ءَامَنَتْ فَنَفَعَهَآ إِيمَـٰنُهَآ إِلَّا قَوْمَ يُونُسَ لَمَّآ ءَامَنُوا۟ كَشَفْنَا عَنْهُمْ عَذَابَ ٱلْخِزْىِ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ﴾ Que n’y eut-il une seule cité qui eût cru et eût bénéficié de sa foi, tel le peuple de Younous ! Lorsque ces derniers eurent cru, Nous leur épargnâmes le supplice de l’humiliation en ce bas monde et Nous les laissâmes jouir de leur subsistance pour un temps.",
  },

  // ============ PART 3: WHERE ELSE THE QURAN NAMES HIM ============
  {
    id: 'yunus-14',
    type: 'quran_source',
    order: 14,
    content: "Allah revealed to Yunus, as to the prophets before him.",
    contentFr: "Allah a fait une révélation à Younous, comme aux prophètes avant lui.",
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
    id: 'yunus-15',
    type: 'narrative',
    order: 15,
    content: "﴿إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّـۧنَ مِنۢ بَعْدِهِۦ ۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبْرَٰهِيمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَـٰرُونَ وَسُلَيْمَـٰنَ ۚ وَءَاتَيْنَا دَاوُۥدَ زَبُورًا﴾ Indeed, We have revealed to you, [O Muhammad], as We revealed to Nuh and the prophets after him. And We revealed to Ibrahim, Ismail, Ishaq, Yaqub, the Descendants, Isa, Ayyub, Yunus, Harun, and Sulayman, and to Dawud We gave the book [of Psalms].",
    contentFr: "﴿إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ أَوْحَيْنَآ إِلَىٰ نُوحٍ وَٱلنَّبِيِّـۧنَ مِنۢ بَعْدِهِۦ ۚ وَأَوْحَيْنَآ إِلَىٰٓ إِبْرَٰهِيمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَـٰرُونَ وَسُلَيْمَـٰنَ ۚ وَءَاتَيْنَا دَاوُۥدَ زَبُورًا﴾ Nous t’avons inspiré des révélations comme nous les avons inspirées à Nouh et aux Prophètes après lui. Nous les avons inspirées à Ibrahim, à Ismaïl, à Ishaq, à Yaqub, aux (douze) Tribus, à Issa, à Ayyoub, à Younous, à Haroun, à Soulayman et nous avons donné les Psaumes à Dawoud.",
  },
  {
    id: 'yunus-16',
    type: 'quran_source',
    order: 16,
    content: "Ismail, Al-Yasa, Yunus and Lut: preferred over the worlds.",
    contentFr: "Ismaïl, Al-Yasa, Younous et Lout : préférés aux mondes.",
    source: {
      type: "quran",
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: "الأنعام",
      ayahStart: 86,
      ayahEnd: 86,
      arabicText: "وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ",
      translation: "And Ismail and Al-Yasa and Yunus and Lut - and all [of them] We preferred over the worlds.",
      translationFr: "Ainsi qu’Ismaïl, Al-Yasa, Younous et Lout, que Nous tînmes tous en plus haute estime que le reste du monde.",
    } as QuranReference,
  },
  {
    id: 'yunus-17',
    type: 'narrative',
    order: 17,
    content: "﴿وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ﴾ And Ismail and Al-Yasa and Yunus and Lut - and all [of them] We preferred over the worlds.",
    contentFr: "﴿وَإِسْمَـٰعِيلَ وَٱلْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى ٱلْعَـٰلَمِينَ﴾ Ainsi qu’Ismaïl, Al-Yasa, Younous et Lout, que Nous tînmes tous en plus haute estime que le reste du monde.",
  },

  // ============ PART 4: WHAT THE PROPHET ﷺ TOLD OF HIM ============
  {
    id: 'yunus-18',
    type: 'narrative',
    order: 18,
    content: "The Prophet ﷺ forbade anyone to place himself above Yunus (Sahih al-Bukhari 3412).",
    contentFr: "Le Prophète ﷺ interdit à quiconque de se placer au-dessus de Younous (Sahih al-Boukhari 3412).",
  },
  {
    id: 'yunus-19',
    type: 'hadith_source',
    order: 19,
    content: "\"I am better than Yunus ibn Matta\" - no servant should say it.",
    contentFr: "« Je suis meilleur que Younous fils de Matta » - nul serviteur ne doit le dire.",
    source: {
      type: "hadith",
      collection: "bukhari",
      hadithNumber: "3412",
      narrator: "Abdullah ibn Abbas",
      translation: "It is not fitting for a servant to say: I am better than Yunus ibn Matta.",
      translationFr: "Il ne convient pas à un serviteur de dire : Je suis meilleur que Younous fils de Matta.",
      grade: "sahih",
    } as HadithReference,
  },
  {
    id: 'yunus-20',
    type: 'narrative',
    order: 20,
    content: "And he ﷺ told what the prayer of the belly of the fish is worth to whoever says it (Jami at-Tirmidhi 3505).",
    contentFr: "Et il ﷺ dit ce que vaut la prière du ventre du poisson pour quiconque la dit (Jami at-Tirmidhi 3505).",
  },
  {
    id: 'yunus-21',
    type: 'hadith_source',
    order: 21,
    content: "The prayer of Dhun-Nun is answered for whoever says it.",
    contentFr: "La prière de Dhoun-Noun est exaucée pour quiconque la dit.",
    source: {
      type: "hadith",
      collection: "tirmidhi",
      hadithNumber: "3505",
      narrator: "Sa'd ibn Abi Waqqas",
      translation: "The supplication of Dhun-Nun when he called out in the belly of the fish: \"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers\" - no Muslim ever calls with it, for any matter, except that Allah answers him.",
      translationFr: "L'invocation de Dhoun-Noun quand il appela dans le ventre du poisson : « Il n'y a de dieu que Toi ; gloire à Toi. J'ai été du nombre des injustes » - nul musulman ne l'invoque, pour quelque affaire que ce soit, sans qu'Allah ne l'exauce.",
      grade: "sahih",
    } as HadithReference,
  },

  // ============ PART 5: WHAT WAS NOT TOLD ============
  {
    id: 'yunus-22',
    type: 'narrative',
    order: 22,
    content: "The Quran does not name his city, does not say what he was angry about or where the ship was going, and does not tell how long the fish held him or how he died. It gives his prayer, and his people's faith, and his Lord's choosing him. What was not told, we leave untold. Allah knows best.",
    contentFr: "Le Coran ne nomme pas sa cité, ne dit ni pourquoi il était en colère ni où allait le vaisseau, et ne dit ni combien de temps le poisson le garda ni comment il mourut. Il donne sa prière, la foi de son peuple, et le choix que fit de lui son Seigneur. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
  },
];

// Export as single continuous story
export const yunusSubStories: SubStory[] = [
  {
    id: 'yunus-complete',
    prophetId: 'yunus',
    title: 'The Story of Prophet Yunus',
    titleFr: "L'Histoire du Prophète Younous",
    titleArabic: "قصة نبي الله يونس",
    order: 1,
    estimatedReadTime: 15,
    content: yunusStoryContent,
  },
];
