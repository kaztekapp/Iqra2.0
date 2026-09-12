// The Man Who Passed by a Ruined Town (الذي مر على قرية)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const uzayrStory: QuranStory = {
  id: 'uzayr',
  titleEnglish: 'Uzayr - Death and Resurrection',
  titleFrench: "Ouzayr - Mort et Résurrection",
  titleArabic: 'عزير',
  order: 10,
  category: 'individuals',
  description: 'A righteous man whom Allah caused to die for 100 years, then brought back to life',
  descriptionFr: 'Un homme pieux qu\'Allah fit mourir pendant 100 ans, puis ramena a la vie',
  summary: "A man passed by a town fallen into ruin and said: how will Allah bring this to life after its death? Allah caused him to die for a hundred years, then revived him and asked how long he had remained. A day, or part of a day, he said. Rather, a hundred years: look at your food and drink, unchanged; look at your donkey; look at the bones, how We raise them and clothe them with flesh. And he said: I know that Allah is over all things competent. The Quran does not name him; the name Uzayr appears in the Quran only in another verse, in another matter.",
  summaryFr: "Un homme passa près d'une cité tombée en ruine et dit : comment Allah va-t-Il redonner vie à ceci après sa mort ? Allah le fit mourir cent ans, puis le ressuscita et lui demanda combien de temps il était resté. Un jour, ou une partie d'un jour, dit-il. Non, cent ans : regarde ta nourriture et ta boisson, intactes ; regarde ton âne ; regarde les os, comment Nous les assemblons et les revêtons de chair. Et il dit : je sais qu'Allah est capable de toute chose. Le Coran ne le nomme pas ; le nom Ouzayr n'apparaît dans le Coran que dans un autre verset, à un autre sujet.",
  lessons: [
    "His question was not denial; it was wonder: how will Allah bring this to life? And Allah answered it by making him the answer (2:259).",
    "\"How long have you remained?\" \"A day or part of a day.\" A hundred years felt like an afternoon. Time is not what it feels like (2:259).",
    "His food and drink had not changed in a hundred years, and his donkey was bones. The same power preserved one and let the other decay, side by side (2:259).",
    "\"Look at the bones, how We raise them and then cover them with flesh.\" He was shown resurrection on the animal he had ridden there (2:259).",
    "\"I know that Allah is over all things competent.\" The story ends with knowledge, not with astonishment (2:259).",
    "The Quran does not name him, and this app does not pretend to. The lesson is the same whoever he was (2:259).",
  ],
  lessonsFr: [
    "Sa question n'était pas un déni ; c'était de l'étonnement : comment Allah va-t-Il redonner vie à ceci ? Et Allah y répondit en faisant de lui la réponse (2:259).",
    "« Combien de temps es-tu resté ? » « Un jour ou une partie d'un jour. » Cent ans parurent un après-midi. Le temps n'est pas ce qu'il semble (2:259).",
    "Sa nourriture et sa boisson n'avaient pas changé en cent ans, et son âne était des os. La même puissance préserva l'un et laissa l'autre se décomposer, côte à côte (2:259).",
    "« Regarde les os, comment Nous les assemblons puis les revêtons de chair. » On lui montra la résurrection sur l'animal qui l'avait porté jusque-là (2:259).",
    "« Je sais qu'Allah est capable de toute chose. » L'histoire finit par une connaissance, non par un étonnement (2:259).",
    "Le Coran ne le nomme pas, et cette application ne prétend pas le faire. La leçon est la même, quel qu'il ait été (2:259).",
  ],
  estimatedReadTime: 8,
  quranMentions: 1,
  icon: '⏳',
  mainSurah: {
    number: 2,
    name: 'Al-Baqarah',
    nameArabic: 'البقرة',
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'uzayr-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the man who passed by a ruined town, in the Quran's own words. Every line of it is from the Quran; nothing has been added.\n\nThe Quran does not name him. He is often called Uzayr, and this story is listed under that name, but the Quran's only mention of Uzayr is in a different verse about a different matter, given here so that nothing is hidden. No authentic hadith names him either. What was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire de l'homme qui passa près d'une cité en ruine, dans les propres mots du Coran. Chaque ligne vient du Coran ; rien n'y a été ajouté.\n\nLe Coran ne le nomme pas. On l'appelle souvent Ouzayr, et cette histoire est classée sous ce nom, mais la seule mention d'Ouzayr dans le Coran se trouve dans un autre verset sur un autre sujet, donné ici pour que rien ne soit caché. Aucun hadith authentique ne le nomme non plus. Ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: A HUNDRED YEARS ============
    {
      id: 'uzayr-2',
      type: 'narrative',
      order: 2,
      content: "One verse holds the whole story: the ruined town, the question, the hundred years, the food, the donkey, the bones - and what he said when it became clear to him.",
      contentFr: "Un seul verset contient toute l'histoire : la cité en ruine, la question, les cent ans, la nourriture, l'âne, les os - et ce qu'il dit quand cela lui fut devenu clair.",
    },
    {
      id: 'uzayr-3',
      type: 'quran_source',
      order: 3,
      content: "\"How will Allah bring this to life after its death?\" \"Rather, you have remained one hundred years.\"",
      contentFr: "« Comment Allah va-t-Il redonner vie à celle-ci après sa mort ? » « Non, tu es resté cent ans. »",
      source: {
        type: "quran",
        surahNumber: 2,
        surahNameEnglish: "Al-Baqarah",
        surahNameArabic: "البقرة",
        ayahStart: 259,
        ayahEnd: 259,
        arabicText: "أَوْ كَٱلَّذِى مَرَّ عَلَىٰ قَرْيَةٍ وَهِىَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا قَالَ أَنَّىٰ يُحْىِۦ هَـٰذِهِ ٱللَّهُ بَعْدَ مَوْتِهَا ۖ فَأَمَاتَهُ ٱللَّهُ مِا۟ئَةَ عَامٍ ثُمَّ بَعَثَهُۥ ۖ قَالَ كَمْ لَبِثْتَ ۖ قَالَ لَبِثْتُ يَوْمًا أَوْ بَعْضَ يَوْمٍ ۖ قَالَ بَل لَّبِثْتَ مِا۟ئَةَ عَامٍ فَٱنظُرْ إِلَىٰ طَعَامِكَ وَشَرَابِكَ لَمْ يَتَسَنَّهْ ۖ وَٱنظُرْ إِلَىٰ حِمَارِكَ وَلِنَجْعَلَكَ ءَايَةً لِّلنَّاسِ ۖ وَٱنظُرْ إِلَى ٱلْعِظَامِ كَيْفَ نُنشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا ۚ فَلَمَّا تَبَيَّنَ لَهُۥ قَالَ أَعْلَمُ أَنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ",
        translation: "Or [consider such an example] as the one who passed by a township which had fallen into ruin. He said, \"How will Allah bring this to life after its death?\" So Allah caused him to die for a hundred years; then He revived him. He said, \"How long have you remained?\" He [the man] said, \"I have remained a day or part of a day.\" He said, \"Rather, you have remained one hundred years. Look at your food and your drink; it has not changed with time. And look at your donkey; and We will make you a sign for the people. And look at the bones [of this donkey] - how We raise them and then We cover them with flesh.\" And when it became clear to him, he said, \"I know that Allah is over all things competent.\"",
        translationFr: "Ou comme celui qui, passant par un village désert et en désolation, dit : « Comment Allah saurait-t-Il faire revivre ce (village) après sa mort ? » Alors Allah le fit mourir pendant cent ans puis le ressuscita et lui dit : « Combien de temps es-tu resté ainsi ? » « Un jour, ou peut-être seulement une partie d’un jour. » « Certes non ! Tu es resté cent ans, dit Allah. Regarde un peu ta nourriture et ta boisson qui ne se sont point gâtées, et regarde aussi ton âne (mort). Cela, pour que Nous fassions de toi un Signe pour les hommes. Et regarde les ossements comment Nous les assemblons (à nouveau) et comment Nous les revêtons de chair. » Se rendant à l’évidence, il dit : « Je sais qu’Allah est de Toute chose Infiniment Capable ! »",
      } as QuranReference,
    },
    {
      id: 'uzayr-4',
      type: 'narrative',
      order: 4,
      content: "﴿أَوْ كَٱلَّذِى مَرَّ عَلَىٰ قَرْيَةٍ وَهِىَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا قَالَ أَنَّىٰ يُحْىِۦ هَـٰذِهِ ٱللَّهُ بَعْدَ مَوْتِهَا ۖ فَأَمَاتَهُ ٱللَّهُ مِا۟ئَةَ عَامٍ ثُمَّ بَعَثَهُۥ ۖ قَالَ كَمْ لَبِثْتَ ۖ قَالَ لَبِثْتُ يَوْمًا أَوْ بَعْضَ يَوْمٍ ۖ قَالَ بَل لَّبِثْتَ مِا۟ئَةَ عَامٍ فَٱنظُرْ إِلَىٰ طَعَامِكَ وَشَرَابِكَ لَمْ يَتَسَنَّهْ ۖ وَٱنظُرْ إِلَىٰ حِمَارِكَ وَلِنَجْعَلَكَ ءَايَةً لِّلنَّاسِ ۖ وَٱنظُرْ إِلَى ٱلْعِظَامِ كَيْفَ نُنشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا ۚ فَلَمَّا تَبَيَّنَ لَهُۥ قَالَ أَعْلَمُ أَنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ﴾ Or [consider such an example] as the one who passed by a township which had fallen into ruin. He said, \"How will Allah bring this to life after its death?\" So Allah caused him to die for a hundred years; then He revived him. He said, \"How long have you remained?\" He [the man] said, \"I have remained a day or part of a day.\" He said, \"Rather, you have remained one hundred years. Look at your food and your drink; it has not changed with time. And look at your donkey; and We will make you a sign for the people. And look at the bones [of this donkey] - how We raise them and then We cover them with flesh.\" And when it became clear to him, he said, \"I know that Allah is over all things competent.\"",
      contentFr: "﴿أَوْ كَٱلَّذِى مَرَّ عَلَىٰ قَرْيَةٍ وَهِىَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا قَالَ أَنَّىٰ يُحْىِۦ هَـٰذِهِ ٱللَّهُ بَعْدَ مَوْتِهَا ۖ فَأَمَاتَهُ ٱللَّهُ مِا۟ئَةَ عَامٍ ثُمَّ بَعَثَهُۥ ۖ قَالَ كَمْ لَبِثْتَ ۖ قَالَ لَبِثْتُ يَوْمًا أَوْ بَعْضَ يَوْمٍ ۖ قَالَ بَل لَّبِثْتَ مِا۟ئَةَ عَامٍ فَٱنظُرْ إِلَىٰ طَعَامِكَ وَشَرَابِكَ لَمْ يَتَسَنَّهْ ۖ وَٱنظُرْ إِلَىٰ حِمَارِكَ وَلِنَجْعَلَكَ ءَايَةً لِّلنَّاسِ ۖ وَٱنظُرْ إِلَى ٱلْعِظَامِ كَيْفَ نُنشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا ۚ فَلَمَّا تَبَيَّنَ لَهُۥ قَالَ أَعْلَمُ أَنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ﴾ Ou comme celui qui, passant par un village désert et en désolation, dit : « Comment Allah saurait-t-Il faire revivre ce (village) après sa mort ? » Alors Allah le fit mourir pendant cent ans puis le ressuscita et lui dit : « Combien de temps es-tu resté ainsi ? » « Un jour, ou peut-être seulement une partie d’un jour. » « Certes non ! Tu es resté cent ans, dit Allah. Regarde un peu ta nourriture et ta boisson qui ne se sont point gâtées, et regarde aussi ton âne (mort). Cela, pour que Nous fassions de toi un Signe pour les hommes. Et regarde les ossements comment Nous les assemblons (à nouveau) et comment Nous les revêtons de chair. » Se rendant à l’évidence, il dit : « Je sais qu’Allah est de Toute chose Infiniment Capable ! »",
    },

    // ============ PART 2: THE ONLY VERSE THAT NAMES UZAYR ============
    {
      id: 'uzayr-5',
      type: 'narrative',
      order: 5,
      content: "The name Uzayr appears once in the Quran, in Surah At-Tawbah, about what some said of him - not in the story above.",
      contentFr: "Le nom Ouzayr apparaît une fois dans le Coran, dans la sourate At-Tawba, au sujet de ce que certains dirent de lui - non dans l'histoire ci-dessus.",
    },
    {
      id: 'uzayr-6',
      type: 'quran_source',
      order: 6,
      content: "\"The Jews say: Uzayr is the son of Allah.\"",
      contentFr: "« Les Juifs disent : Ouzayr est fils d'Allah. »",
      source: {
        type: "quran",
        surahNumber: 9,
        surahNameEnglish: "At-Tawbah",
        surahNameArabic: "التوبة",
        ayahStart: 30,
        ayahEnd: 30,
        arabicText: "وَقَالَتِ ٱلْيَهُودُ عُزَيْرٌ ٱبْنُ ٱللَّهِ وَقَالَتِ ٱلنَّصَـٰرَى ٱلْمَسِيحُ ٱبْنُ ٱللَّهِ ۖ ذَٰلِكَ قَوْلُهُم بِأَفْوَٰهِهِمْ ۖ يُضَـٰهِـُٔونَ قَوْلَ ٱلَّذِينَ كَفَرُوا۟ مِن قَبْلُ ۚ قَـٰتَلَهُمُ ٱللَّهُ ۚ أَنَّىٰ يُؤْفَكُونَ",
        translation: "The Jews say, \"Uzayr is the son of Allah\"; and the Christians say, \"The Messiah is the son of Allah.\" That is their statement from their mouths; they imitate the saying of those who disbelieved before [them]. May Allah destroy them; how are they deluded?",
        translationFr: "Les Juifs ont dit : « ‘Uzayr est le fils d’Allah » et les Chrétiens ont dit : « Le Messie est le fils d’Allah ». Voilà ce qu’ils soutiennent de leurs propres bouches. Ils répètent des propos semblables à ceux des mécréants avant eux. Qu’Allah les fasse périr ! Combien ils sont dans l’erreur !",
      } as QuranReference,
    },
    {
      id: 'uzayr-7',
      type: 'narrative',
      order: 7,
      content: "﴿وَقَالَتِ ٱلْيَهُودُ عُزَيْرٌ ٱبْنُ ٱللَّهِ وَقَالَتِ ٱلنَّصَـٰرَى ٱلْمَسِيحُ ٱبْنُ ٱللَّهِ ۖ ذَٰلِكَ قَوْلُهُم بِأَفْوَٰهِهِمْ ۖ يُضَـٰهِـُٔونَ قَوْلَ ٱلَّذِينَ كَفَرُوا۟ مِن قَبْلُ ۚ قَـٰتَلَهُمُ ٱللَّهُ ۚ أَنَّىٰ يُؤْفَكُونَ﴾ The Jews say, \"Uzayr is the son of Allah\"; and the Christians say, \"The Messiah is the son of Allah.\" That is their statement from their mouths; they imitate the saying of those who disbelieved before [them]. May Allah destroy them; how are they deluded?",
      contentFr: "﴿وَقَالَتِ ٱلْيَهُودُ عُزَيْرٌ ٱبْنُ ٱللَّهِ وَقَالَتِ ٱلنَّصَـٰرَى ٱلْمَسِيحُ ٱبْنُ ٱللَّهِ ۖ ذَٰلِكَ قَوْلُهُم بِأَفْوَٰهِهِمْ ۖ يُضَـٰهِـُٔونَ قَوْلَ ٱلَّذِينَ كَفَرُوا۟ مِن قَبْلُ ۚ قَـٰتَلَهُمُ ٱللَّهُ ۚ أَنَّىٰ يُؤْفَكُونَ﴾ Les Juifs ont dit : « ‘Uzayr est le fils d’Allah » et les Chrétiens ont dit : « Le Messie est le fils d’Allah ». Voilà ce qu’ils soutiennent de leurs propres bouches. Ils répètent des propos semblables à ceux des mécréants avant eux. Qu’Allah les fasse périr ! Combien ils sont dans l’erreur !",
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'uzayr-8',
      type: 'narrative',
      order: 8,
      content: "The Quran does not say who the man was, which town it was, or what he did after. It gives his question, his hundred years, and his answer. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne dit ni qui était cet homme, ni quelle cité c'était, ni ce qu'il fit ensuite. Il donne sa question, ses cent ans, et sa réponse. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
