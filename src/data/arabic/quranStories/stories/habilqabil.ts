// The Two Sons of Adam (ابنا آدم)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const habilQabilStory: QuranStory = {
  id: 'habilqabil',
  titleEnglish: 'Habil and Qabil - The First Murder',
  titleFrench: 'Habil et Qabil (Abel et Cain) - Le Premier Meurtre',
  titleArabic: 'هابيل وقابيل',
  order: 1,
  category: 'historical_events',
  description: 'The story of the two sons of Adam and the first murder in human history',
  descriptionFr: 'L\'histoire des deux fils d\'Adam et du premier meurtre de l\'histoire humaine',
  summary: "Allah tells the Prophet ﷺ to recite the story of Adam's two sons in truth. Each made an offering; it was accepted from one and not the other. The one said: I will kill you. The other said: Allah only accepts from the righteous; if you raise your hand to kill me, I will not raise mine to kill you. He killed him, and became of the losers. A crow was sent scratching the ground to show him how to bury his brother, and he became of the regretful. The Quran does not name them. The Prophet ﷺ said the first son of Adam carries a share of every unjust killing after him.",
  summaryFr: "Allah dit au Prophète ﷺ de réciter en vérité l'histoire des deux fils d'Adam. Chacun fit une offrande ; elle fut acceptée de l'un et non de l'autre. L'un dit : je te tuerai. L'autre dit : Allah n'accepte que des pieux ; si tu lèves la main pour me tuer, je ne lèverai pas la mienne pour te tuer. Il le tua, et fut du nombre des perdants. Un corbeau fut envoyé gratter la terre pour lui montrer comment enterrer son frère, et il fut du nombre des regrettants. Le Coran ne les nomme pas. Le Prophète ﷺ a dit que le premier fils d'Adam porte une part de tout meurtre injuste après lui.",
  lessons: [
    "\"Allah only accepts from the righteous.\" The one whose offering was accepted did not say why it was; he said what acceptance depends on (5:27).",
    "\"If you should raise your hand toward me to kill me, I shall not raise my hand toward you to kill you. Indeed, I fear Allah, Lord of the worlds.\" Fear of Allah was his only reason, and it was enough (5:28).",
    "\"His soul permitted to him the murder of his brother.\" The killing happened inside him before it happened outside (5:30).",
    "A crow taught the first killer how to bury the dead. The first human to take a life had to learn what to do with a body from a bird (5:31).",
    "\"Have I failed to be like this crow?\" - and he became of the regretful. Regret came; the Quran does not say repentance did (5:31).",
    "\"Because of that\" - the law that killing one soul is like killing all mankind, and saving one is like saving all, was written on account of this story (5:32).",
    "The Prophet ﷺ said: no soul is killed unjustly but that a share of its blood is on the first son of Adam, because he was the first to introduce killing. Every murder since is partly his (Bukhari 3335).",
  ],
  lessonsFr: [
    "« Allah n'accepte que des pieux. » Celui dont l'offrande fut acceptée ne dit pas pourquoi elle le fut ; il dit de quoi dépend l'acceptation (5:27).",
    "« Si tu lèves la main vers moi pour me tuer, je ne lèverai pas la mienne vers toi pour te tuer. Je crains Allah, le Seigneur des mondes. » La crainte d'Allah fut sa seule raison, et elle suffit (5:28).",
    "« Son âme l'incita à tuer son frère. » Le meurtre eut lieu en lui avant d'avoir lieu au-dehors (5:30).",
    "Un corbeau apprit au premier meurtrier à enterrer les morts. Le premier humain à ôter une vie dut apprendre d'un oiseau que faire d'un corps (5:31).",
    "« Suis-je incapable d'être comme ce corbeau ? » - et il fut du nombre des regrettants. Le regret vint ; le Coran ne dit pas que le repentir vint (5:31).",
    "« C'est pourquoi » - la loi selon laquelle tuer une âme est comme tuer tous les hommes, et en sauver une comme les sauver tous, fut écrite à cause de cette histoire (5:32).",
    "Le Prophète ﷺ a dit : aucune âme n'est tuée injustement sans qu'une part de son sang ne retombe sur le premier fils d'Adam, car il fut le premier à instaurer le meurtre. Chaque meurtre depuis est en partie le sien (Boukhari 3335).",
  ],
  estimatedReadTime: 10,
  quranMentions: 1,
  icon: '⚔️',
  mainSurah: {
    number: 5,
    name: 'Al-Ma\'idah',
    nameArabic: 'المائدة',
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'habilqabil-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the two sons of Adam, in the Quran's own words. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran does not name them, does not say what each offered, and does not say what their dispute was about before the offering. It tells the offering, the words, the killing, and the crow - and what was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire des deux fils d'Adam, dans les propres mots du Coran. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran ne les nomme pas, ne dit pas ce que chacun offrit, et ne dit pas quel était leur différend avant l'offrande. Il raconte l'offrande, les mots, le meurtre, et le corbeau - et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: THE OFFERING, AND THE ANSWER ============
    {
      id: 'habilqabil-2',
      type: 'narrative',
      order: 2,
      content: "The offering, one accepted and one not; the threat; and the whole of the answer to it.",
      contentFr: "L'offrande, l'une acceptée et l'autre non ; la menace ; et la réponse entière qui lui fut faite.",
    },
    {
      id: 'habilqabil-3',
      type: 'quran_source',
      order: 3,
      content: "\"I will surely kill you.\" \"Indeed, Allah only accepts from the righteous.\"",
      contentFr: "« Je te tuerai sûrement. » « Allah n'accepte que des pieux. »",
      source: {
        type: "quran",
        surahNumber: 5,
        surahNameEnglish: "Al-Ma'idah",
        surahNameArabic: "المائدة",
        ayahStart: 27,
        ayahEnd: 29,
        arabicText: "وَٱتْلُ عَلَيْهِمْ نَبَأَ ٱبْنَىْ ءَادَمَ بِٱلْحَقِّ إِذْ قَرَّبَا قُرْبَانًا فَتُقُبِّلَ مِنْ أَحَدِهِمَا وَلَمْ يُتَقَبَّلْ مِنَ ٱلْـَٔاخَرِ قَالَ لَأَقْتُلَنَّكَ ۖ قَالَ إِنَّمَا يَتَقَبَّلُ ٱللَّهُ مِنَ ٱلْمُتَّقِينَ ۝ لَئِنۢ بَسَطتَ إِلَىَّ يَدَكَ لِتَقْتُلَنِى مَآ أَنَا۠ بِبَاسِطٍ يَدِىَ إِلَيْكَ لِأَقْتُلَكَ ۖ إِنِّىٓ أَخَافُ ٱللَّهَ رَبَّ ٱلْعَـٰلَمِينَ ۝ إِنِّىٓ أُرِيدُ أَن تَبُوٓأَ بِإِثْمِى وَإِثْمِكَ فَتَكُونَ مِنْ أَصْحَـٰبِ ٱلنَّارِ ۚ وَذَٰلِكَ جَزَٰٓؤُا۟ ٱلظَّـٰلِمِينَ",
        translation: "And recite to them the story of Adam's two sons, in truth, when they both made an offering [to Allah], and it was accepted from one of them but was not accepted from the other. Said [the latter], \"I will surely kill you.\" Said [the former], \"Indeed, Allah only accepts from the righteous [who fear Him]. If you should raise your hand toward me to kill me - I shall not raise my hand toward you to kill you. Indeed, I fear Allah, Lord of the worlds. Indeed, I want you to obtain [thereby] my sin and your sin so you will be among the companions of the Fire. And that is the recompense of wrongdoers.\"",
        translationFr: "Raconte-leur, en toute vérité, l’histoire des deux fils d’Adam lorsqu’ils firent une offrande : elle fut acceptée de l’un, et ne le fut point de l’autre. Ce dernier dit alors : « Je te tuerai ! » Le premier répondit : « Allah n’accepte (les offrandes) que de la part des gens pieux ! » Si tu portes la main sur moi pour me tuer, je ne porterai pas la mienne sur toi pour te tuer. Car moi, je crains Allah, Seigneur de l’Univers. Je veux que tu endosses le péché de mon meurtre et ton propre péché (qui l’a précédé). Ainsi seras-tu parmi les hôtes du Feu, et c’est là la rétribution des injustes.",
      } as QuranReference,
    },
    {
      id: 'habilqabil-4',
      type: 'narrative',
      order: 4,
      content: "﴿وَٱتْلُ عَلَيْهِمْ نَبَأَ ٱبْنَىْ ءَادَمَ بِٱلْحَقِّ إِذْ قَرَّبَا قُرْبَانًا فَتُقُبِّلَ مِنْ أَحَدِهِمَا وَلَمْ يُتَقَبَّلْ مِنَ ٱلْـَٔاخَرِ قَالَ لَأَقْتُلَنَّكَ ۖ قَالَ إِنَّمَا يَتَقَبَّلُ ٱللَّهُ مِنَ ٱلْمُتَّقِينَ﴾ And recite to them the story of Adam's two sons, in truth, when they both made an offering [to Allah], and it was accepted from one of them but was not accepted from the other. Said [the latter], \"I will surely kill you.\" Said [the former], \"Indeed, Allah only accepts from the righteous [who fear Him]. ﴿لَئِنۢ بَسَطتَ إِلَىَّ يَدَكَ لِتَقْتُلَنِى مَآ أَنَا۠ بِبَاسِطٍ يَدِىَ إِلَيْكَ لِأَقْتُلَكَ ۖ إِنِّىٓ أَخَافُ ٱللَّهَ رَبَّ ٱلْعَـٰلَمِينَ﴾ If you should raise your hand toward me to kill me - I shall not raise my hand toward you to kill you. Indeed, I fear Allah, Lord of the worlds. ﴿إِنِّىٓ أُرِيدُ أَن تَبُوٓأَ بِإِثْمِى وَإِثْمِكَ فَتَكُونَ مِنْ أَصْحَـٰبِ ٱلنَّارِ ۚ وَذَٰلِكَ جَزَٰٓؤُا۟ ٱلظَّـٰلِمِينَ﴾ Indeed, I want you to obtain [thereby] my sin and your sin so you will be among the companions of the Fire. And that is the recompense of wrongdoers.\"",
      contentFr: "﴿وَٱتْلُ عَلَيْهِمْ نَبَأَ ٱبْنَىْ ءَادَمَ بِٱلْحَقِّ إِذْ قَرَّبَا قُرْبَانًا فَتُقُبِّلَ مِنْ أَحَدِهِمَا وَلَمْ يُتَقَبَّلْ مِنَ ٱلْـَٔاخَرِ قَالَ لَأَقْتُلَنَّكَ ۖ قَالَ إِنَّمَا يَتَقَبَّلُ ٱللَّهُ مِنَ ٱلْمُتَّقِينَ﴾ Raconte-leur, en toute vérité, l’histoire des deux fils d’Adam lorsqu’ils firent une offrande : elle fut acceptée de l’un, et ne le fut point de l’autre. Ce dernier dit alors : « Je te tuerai ! » Le premier répondit : « Allah n’accepte (les offrandes) que de la part des gens pieux ! » ﴿لَئِنۢ بَسَطتَ إِلَىَّ يَدَكَ لِتَقْتُلَنِى مَآ أَنَا۠ بِبَاسِطٍ يَدِىَ إِلَيْكَ لِأَقْتُلَكَ ۖ إِنِّىٓ أَخَافُ ٱللَّهَ رَبَّ ٱلْعَـٰلَمِينَ﴾ Si tu portes la main sur moi pour me tuer, je ne porterai pas la mienne sur toi pour te tuer. Car moi, je crains Allah, Seigneur de l’Univers. ﴿إِنِّىٓ أُرِيدُ أَن تَبُوٓأَ بِإِثْمِى وَإِثْمِكَ فَتَكُونَ مِنْ أَصْحَـٰبِ ٱلنَّارِ ۚ وَذَٰلِكَ جَزَٰٓؤُا۟ ٱلظَّـٰلِمِينَ﴾ Je veux que tu endosses le péché de mon meurtre et ton propre péché (qui l’a précédé). Ainsi seras-tu parmi les hôtes du Feu, et c’est là la rétribution des injustes.",
    },

    // ============ PART 2: THE KILLING, AND THE CROW ============
    {
      id: 'habilqabil-5',
      type: 'narrative',
      order: 5,
      content: "His soul permitted it, and he killed him. Then the crow, and what the killer said when he saw it.",
      contentFr: "Son âme le lui permit, et il le tua. Puis le corbeau, et ce que le meurtrier dit en le voyant.",
    },
    {
      id: 'habilqabil-6',
      type: 'quran_source',
      order: 6,
      content: "\"O woe to me! Have I failed to be like this crow?\"",
      contentFr: "« Malheur à moi ! Suis-je incapable d'être comme ce corbeau ? »",
      source: {
        type: "quran",
        surahNumber: 5,
        surahNameEnglish: "Al-Ma'idah",
        surahNameArabic: "المائدة",
        ayahStart: 30,
        ayahEnd: 31,
        arabicText: "فَطَوَّعَتْ لَهُۥ نَفْسُهُۥ قَتْلَ أَخِيهِ فَقَتَلَهُۥ فَأَصْبَحَ مِنَ ٱلْخَـٰسِرِينَ ۝ فَبَعَثَ ٱللَّهُ غُرَابًا يَبْحَثُ فِى ٱلْأَرْضِ لِيُرِيَهُۥ كَيْفَ يُوَٰرِى سَوْءَةَ أَخِيهِ ۚ قَالَ يَـٰوَيْلَتَىٰٓ أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَـٰذَا ٱلْغُرَابِ فَأُوَٰرِىَ سَوْءَةَ أَخِى ۖ فَأَصْبَحَ مِنَ ٱلنَّـٰدِمِينَ",
        translation: "And his soul permitted to him the murder of his brother, so he killed him and became among the losers. Then Allah sent a crow searching [i.e., scratching] in the ground to show him how to hide the disgrace of his brother. He said, \"O woe to me! Have I failed to be like this crow and hide the disgrace [i.e., body] of my brother?\" And he became of the regretful.",
        translationFr: "Son âme le persuada de tuer son frère et il le tua. Il se retrouva ainsi du nombre des perdants. Allah envoya un corbeau qui se mit à gratter la terre pour lui montrer comment enfouir la dépouille de son frère. Il dit : « Malheur à moi ! Suis-je donc incapable d’être comme ce corbeau et d’enfouir le cadavre de mon frère ? » Il se retrouva alors du nombre de ceux que ronge le remords.",
      } as QuranReference,
    },
    {
      id: 'habilqabil-7',
      type: 'narrative',
      order: 7,
      content: "﴿فَطَوَّعَتْ لَهُۥ نَفْسُهُۥ قَتْلَ أَخِيهِ فَقَتَلَهُۥ فَأَصْبَحَ مِنَ ٱلْخَـٰسِرِينَ﴾ And his soul permitted to him the murder of his brother, so he killed him and became among the losers. ﴿فَبَعَثَ ٱللَّهُ غُرَابًا يَبْحَثُ فِى ٱلْأَرْضِ لِيُرِيَهُۥ كَيْفَ يُوَٰرِى سَوْءَةَ أَخِيهِ ۚ قَالَ يَـٰوَيْلَتَىٰٓ أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَـٰذَا ٱلْغُرَابِ فَأُوَٰرِىَ سَوْءَةَ أَخِى ۖ فَأَصْبَحَ مِنَ ٱلنَّـٰدِمِينَ﴾ Then Allah sent a crow searching [i.e., scratching] in the ground to show him how to hide the disgrace of his brother. He said, \"O woe to me! Have I failed to be like this crow and hide the disgrace [i.e., body] of my brother?\" And he became of the regretful.",
      contentFr: "﴿فَطَوَّعَتْ لَهُۥ نَفْسُهُۥ قَتْلَ أَخِيهِ فَقَتَلَهُۥ فَأَصْبَحَ مِنَ ٱلْخَـٰسِرِينَ﴾ Son âme le persuada de tuer son frère et il le tua. Il se retrouva ainsi du nombre des perdants. ﴿فَبَعَثَ ٱللَّهُ غُرَابًا يَبْحَثُ فِى ٱلْأَرْضِ لِيُرِيَهُۥ كَيْفَ يُوَٰرِى سَوْءَةَ أَخِيهِ ۚ قَالَ يَـٰوَيْلَتَىٰٓ أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَـٰذَا ٱلْغُرَابِ فَأُوَٰرِىَ سَوْءَةَ أَخِى ۖ فَأَصْبَحَ مِنَ ٱلنَّـٰدِمِينَ﴾ Allah envoya un corbeau qui se mit à gratter la terre pour lui montrer comment enfouir la dépouille de son frère. Il dit : « Malheur à moi ! Suis-je donc incapable d’être comme ce corbeau et d’enfouir le cadavre de mon frère ? » Il se retrouva alors du nombre de ceux que ronge le remords.",
    },
    {
      id: 'habilqabil-8',
      type: 'narrative',
      order: 8,
      content: "Because of that, a law was decreed - and the passage says what it is.",
      contentFr: "À cause de cela, une loi fut décrétée - et le passage dit laquelle.",
    },
    {
      id: 'habilqabil-9',
      type: 'quran_source',
      order: 9,
      content: "\"Whoever kills a soul... it is as if he had slain mankind entirely.\"",
      contentFr: "« Quiconque tue une âme... c'est comme s'il avait tué tous les hommes. »",
      source: {
        type: "quran",
        surahNumber: 5,
        surahNameEnglish: "Al-Ma'idah",
        surahNameArabic: "المائدة",
        ayahStart: 32,
        ayahEnd: 32,
        arabicText: "مِنْ أَجْلِ ذَٰلِكَ كَتَبْنَا عَلَىٰ بَنِىٓ إِسْرَٰٓءِيلَ أَنَّهُۥ مَن قَتَلَ نَفْسًۢا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِى ٱلْأَرْضِ فَكَأَنَّمَا قَتَلَ ٱلنَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَآ أَحْيَا ٱلنَّاسَ جَمِيعًا ۚ وَلَقَدْ جَآءَتْهُمْ رُسُلُنَا بِٱلْبَيِّنَـٰتِ ثُمَّ إِنَّ كَثِيرًا مِّنْهُم بَعْدَ ذَٰلِكَ فِى ٱلْأَرْضِ لَمُسْرِفُونَ",
        translation: "Because of that, We decreed upon the Children of Israel that whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely. And Our messengers had certainly come to them with clear proofs. Then indeed many of them, [even] after that, throughout the land, were transgressors.",
        translationFr: "C’est pour cela que Nous avons prescrit aux Enfants d’Israël (la loi que voici) : Quiconque aura tué une personne sans que celle-ci n’ait commis un meurtre ou semé la corruption sur terre, c’est comme s’il avait tué l’humanité entière. Et quiconque l’aura fait revivre, c’est comme s’il avait fait revivre l’humanité entière. Nos Messagers leur ont apporté les preuves évidentes, et pourtant beaucoup d’entre eux se laissent aller à leurs excès sur terre.",
      } as QuranReference,
    },
    {
      id: 'habilqabil-10',
      type: 'narrative',
      order: 10,
      content: "﴿مِنْ أَجْلِ ذَٰلِكَ كَتَبْنَا عَلَىٰ بَنِىٓ إِسْرَٰٓءِيلَ أَنَّهُۥ مَن قَتَلَ نَفْسًۢا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِى ٱلْأَرْضِ فَكَأَنَّمَا قَتَلَ ٱلنَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَآ أَحْيَا ٱلنَّاسَ جَمِيعًا ۚ وَلَقَدْ جَآءَتْهُمْ رُسُلُنَا بِٱلْبَيِّنَـٰتِ ثُمَّ إِنَّ كَثِيرًا مِّنْهُم بَعْدَ ذَٰلِكَ فِى ٱلْأَرْضِ لَمُسْرِفُونَ﴾ Because of that, We decreed upon the Children of Israel that whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely. And Our messengers had certainly come to them with clear proofs. Then indeed many of them, [even] after that, throughout the land, were transgressors.",
      contentFr: "﴿مِنْ أَجْلِ ذَٰلِكَ كَتَبْنَا عَلَىٰ بَنِىٓ إِسْرَٰٓءِيلَ أَنَّهُۥ مَن قَتَلَ نَفْسًۢا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِى ٱلْأَرْضِ فَكَأَنَّمَا قَتَلَ ٱلنَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَآ أَحْيَا ٱلنَّاسَ جَمِيعًا ۚ وَلَقَدْ جَآءَتْهُمْ رُسُلُنَا بِٱلْبَيِّنَـٰتِ ثُمَّ إِنَّ كَثِيرًا مِّنْهُم بَعْدَ ذَٰلِكَ فِى ٱلْأَرْضِ لَمُسْرِفُونَ﴾ C’est pour cela que Nous avons prescrit aux Enfants d’Israël (la loi que voici) : Quiconque aura tué une personne sans que celle-ci n’ait commis un meurtre ou semé la corruption sur terre, c’est comme s’il avait tué l’humanité entière. Et quiconque l’aura fait revivre, c’est comme s’il avait fait revivre l’humanité entière. Nos Messagers leur ont apporté les preuves évidentes, et pourtant beaucoup d’entre eux se laissent aller à leurs excès sur terre.",
    },

    // ============ PART 3: WHAT THE PROPHET ﷺ SAID ============
    {
      id: 'habilqabil-11',
      type: 'narrative',
      order: 11,
      content: "The Prophet ﷺ told what that first killing left on the one who did it (Sahih al-Bukhari 3335).",
      contentFr: "Le Prophète ﷺ dit ce que ce premier meurtre laissa sur celui qui le commit (Sahih al-Boukhari 3335).",
    },
    {
      id: 'habilqabil-12',
      type: 'hadith_source',
      order: 12,
      content: "\"He was the first to introduce killing.\"",
      contentFr: "« Il fut le premier à instaurer le meurtre. »",
      source: {
        type: "hadith",
        collection: "Sahih al-Bukhari",
        hadithNumber: "3335",
        narrator: "Abdullah ibn Mas'ud",
        translation: "No soul is killed unjustly except that a share of its blood is upon the first son of Adam, because he was the first to introduce killing.",
        translationFr: "Aucune âme n'est tuée injustement sans qu'une part de son sang ne retombe sur le premier fils d'Adam, car il fut le premier à instaurer le meurtre.",
        grade: "sahih",
        arabicText: "",
      } as HadithReference,
    },

    // ============ PART 4: WHAT WAS NOT TOLD ============
    {
      id: 'habilqabil-13',
      type: 'narrative',
      order: 13,
      content: "The Quran does not name the two sons - the names Habil and Qabil are not in it - does not say what they offered, and does not say what became of the killer after his regret. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne nomme pas les deux fils - les noms Habil et Qabil n'y sont pas - ne dit pas ce qu'ils offrirent, et ne dit pas ce qu'il advint du meurtrier après son regret. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
