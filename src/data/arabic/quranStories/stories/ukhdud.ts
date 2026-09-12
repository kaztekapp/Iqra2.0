// The People of the Ditch (أصحاب الأخدود)
// Told from the Quran and the authentic Sunnah only.
// Every verse of the passage is reported; conversations are given ayah by ayah, verbatim.

import { QuranStory, StoryContentBlock, QuranReference, HadithReference } from '../../../../types/quranStories';

export const ukhdudStory: QuranStory = {
  id: 'ukhdud',
  titleEnglish: 'People of the Ditch',
  titleFrench: 'Les Gens de la Fosse',
  titleArabic: 'أصحاب الأخدود',
  order: 7,
  category: 'groups_nations',
  description: 'Believers who were burned alive for their faith but achieved eternal victory',
  descriptionFr: 'Des croyants brules vifs pour leur foi mais qui obtinrent la victoire eternelle',
  summary: "Allah swears by the sky and the promised Day: destroyed were the companions of the ditch, the fire full of fuel, when they sat by it and watched what they did to the believers - who were resented for nothing except that they believed in Allah. The Prophet ﷺ told the story behind it: a king, a sorcerer, a monk, and a boy who could not be killed until the king said, \"In the name of Allah, the Lord of the boy\" - and the people believed, and the ditches were dug, and a woman with an infant hesitated at the fire until the infant said: Mother, be patient, for you are upon the truth.",
  summaryFr: "Allah jure par le ciel et par le Jour promis : périssent les gens de la fosse, du feu plein de combustible, quand ils étaient assis autour et regardaient ce qu'ils faisaient aux croyants - à qui ils ne reprochaient que d'avoir cru en Allah. Le Prophète ﷺ raconta l'histoire derrière : un roi, un sorcier, un moine, et un garçon que l'on ne put tuer jusqu'à ce que le roi dise : « Au nom d'Allah, le Seigneur du garçon » - et les gens crurent, et les fosses furent creusées, et une femme avec un nourrisson hésita devant le feu jusqu'à ce que le nourrisson dise : Mère, patiente, car tu es sur la vérité.",
  lessons: [
    "\"They resented them not except because they believed in Allah.\" The Quran names the whole charge against them, and it is one word (85:8).",
    "The boy was sent to learn sorcery and found a monk on the way, and chose the monk. The road to what you were sent to learn can pass by what you were meant to (Muslim 3005).",
    "\"O Allah, if the affair of the monk is more beloved to You than the affair of the sorcerer, then kill this beast\" - and it died. His first prayer was a request to be shown, not to be given (Muslim 3005).",
    "The monk told him: you will be tested; if you are, do not point to me. A teacher who prepares his student for the trial has taught him the last lesson (Muslim 3005).",
    "The boy told the king: you will not be able to kill me until you say, \"In the name of Allah, the Lord of the boy.\" He made his death into the sentence that converted a people (Muslim 3005).",
    "The people said: we believe in the Lord of the boy. The king had wanted one death; he got a nation's faith, and then had to dig ditches (Muslim 3005).",
    "The woman with the infant hesitated, and the child spoke: mother, be patient, for you are upon the truth. Allah gave her the courage from the arms she was carrying (Muslim 3005).",
    "\"Indeed, those who have tortured the believing men and believing women and then have not repented\" - even here, the door of repentance is written into the verse (85:10).",
  ],
  lessonsFr: [
    "« Ils ne leur reprochaient que d'avoir cru en Allah. » Le Coran nomme toute l'accusation contre eux, et c'est un mot (85:8).",
    "Le garçon fut envoyé apprendre la sorcellerie et trouva un moine en chemin, et choisit le moine. Le chemin vers ce qu'on t'a envoyé apprendre peut passer par ce à quoi tu étais destiné (Mouslim 3005).",
    "« Ô Allah, si l'affaire du moine T'est plus chère que l'affaire du sorcier, alors tue cette bête » - et elle mourut. Sa première prière fut une demande d'être guidé, non de recevoir (Mouslim 3005).",
    "Le moine lui dit : tu seras éprouvé ; si tu l'es, ne me désigne pas. Un maître qui prépare son élève à l'épreuve lui a enseigné la dernière leçon (Mouslim 3005).",
    "Le garçon dit au roi : tu ne pourras pas me tuer avant de dire : « Au nom d'Allah, le Seigneur du garçon. » Il fit de sa mort la phrase qui convertit un peuple (Mouslim 3005).",
    "Les gens dirent : nous croyons au Seigneur du garçon. Le roi avait voulu une mort ; il obtint la foi d'une nation, et dut alors creuser des fosses (Mouslim 3005).",
    "La femme au nourrisson hésita, et l'enfant parla : mère, patiente, car tu es sur la vérité. Allah lui donna le courage depuis les bras qu'elle portait (Mouslim 3005).",
    "« Ceux qui ont fait subir des épreuves aux croyants et aux croyantes, puis ne se sont pas repentis » - même ici, la porte du repentir est écrite dans le verset (85:10).",
  ],
  estimatedReadTime: 20,
  quranMentions: 1,
  icon: '🔥',
  mainSurah: {
    number: 85,
    name: 'Al-Buruj',
    nameArabic: 'البروج',
  },
  content: [

    // ============ INTRODUCTION ============
    {
      id: 'ukhdud-1',
      type: 'narrative',
      order: 1,
      content: "This is the story of the People of the Ditch, in the Quran's own words and in the words of the Prophet ﷺ. Every line of it is from the Quran or from an authentic hadith; nothing has been added.\n\nThe Quran gives them one passage, and the Prophet ﷺ told what happened before the ditches were dug. Where and when it was, and the names of the king, the monk and the boy - we were not told, and what was not told is not ours to imagine. Allah knows best.",
      contentFr: "Voici l'histoire des Gens de la Fosse, dans les propres mots du Coran et dans les mots du Prophète ﷺ. Chaque ligne vient du Coran ou d'un hadith authentique ; rien n'y a été ajouté.\n\nLe Coran leur donne un seul passage, et le Prophète ﷺ raconta ce qui arriva avant que les fosses ne soient creusées. Où et quand ce fut, et les noms du roi, du moine et du garçon - cela ne nous a pas été dit, et ce qui ne fut pas raconté, il ne nous appartient pas de l'imaginer. Allah est le plus savant.",
    },

    // ============ PART 1: THE FIRE FULL OF FUEL ============
    {
      id: 'ukhdud-2',
      type: 'narrative',
      order: 2,
      content: "Al-Buruj opens with oaths, and then: destroyed were the companions of the ditch. They sat by the fire and watched. The believers had done nothing but believe. And the surah ends with both punishments and the great attainment.",
      contentFr: "Al-Bourouj s'ouvre par des serments, puis : périssent les gens de la fosse. Ils étaient assis près du feu et regardaient. Les croyants n'avaient rien fait que croire. Et la sourate finit par les deux châtiments et le grand succès.",
    },
    {
      id: 'ukhdud-3',
      type: 'quran_source',
      order: 3,
      content: "\"They resented them not except because they believed in Allah, the Exalted in Might, the Praiseworthy.\"",
      contentFr: "« Ils ne leur reprochaient que d'avoir cru en Allah, le Puissant, le Digne de louange. »",
      source: {
        type: "quran",
        surahNumber: 85,
        surahNameEnglish: "Al-Buruj",
        surahNameArabic: "البروج",
        ayahStart: 1,
        ayahEnd: 11,
        arabicText: " وَٱلسَّمَآءِ ذَاتِ ٱلْبُرُوجِ ۝ وَٱلْيَوْمِ ٱلْمَوْعُودِ ۝ وَشَاهِدٍ وَمَشْهُودٍ ۝ قُتِلَ أَصْحَـٰبُ ٱلْأُخْدُودِ ۝ ٱلنَّارِ ذَاتِ ٱلْوَقُودِ ۝ إِذْ هُمْ عَلَيْهَا قُعُودٌ ۝ وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِٱلْمُؤْمِنِينَ شُهُودٌ ۝ وَمَا نَقَمُوا۟ مِنْهُمْ إِلَّآ أَن يُؤْمِنُوا۟ بِٱللَّهِ ٱلْعَزِيزِ ٱلْحَمِيدِ ۝ ٱلَّذِى لَهُۥ مُلْكُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ وَٱللَّهُ عَلَىٰ كُلِّ شَىْءٍ شَهِيدٌ ۝ إِنَّ ٱلَّذِينَ فَتَنُوا۟ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَـٰتِ ثُمَّ لَمْ يَتُوبُوا۟ فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ ٱلْحَرِيقِ ۝ إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ لَهُمْ جَنَّـٰتٌ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْكَبِيرُ",
        translation: "By the sky containing great stars And [by] the promised Day And [by] the witness and what is witnessed, Destroyed [i.e., cursed] were the companions of the trench [Containing] the fire full of fuel, When they were sitting near it. And they, to what they were doing against the believers, were witnesses. And they resented them not except because they believed in Allah, the Exalted in Might, the Praiseworthy, To whom belongs the dominion of the heavens and the earth. And Allah, over all things, is Witness. Indeed, those who have tortured the believing men and believing women and then have not repented will have the punishment of Hell, and they will have the punishment of the Burning Fire. Indeed, those who have believed and done righteous deeds will have gardens beneath which rivers flow. That is the great attainment.",
        translationFr: "Par le ciel et ses constellations ! Par le jour promis ! Par le témoin et son témoignage ! Mort aux gens de la tranchée très longue (Al-Ukhdûd) ! Au bord d’un feu rugissant, (les mécréants) étaient assis, et regardaient en témoins ce qu’ils faisaient subir aux croyants. Ils ne leur en voulaient que parce qu’ils croyaient en Allah, le Tout- Puissant, le Digne de Toute Louange, Celui à Qui appartient la royauté des cieux et de la terre, Allah, Qui de Toute chose est le Témoin. Ceux qui ont infligé les pires épreuves aux croyants et aux croyantes, puis qui ne s’en sont pas repentis, auront le supplice de la Géhenne et le supplice du Brasier infernal. Ceux qui ont cru et ont accompli les bonnes œuvres auront des jardins sous lesquels coulent les rivières. Tel est le succès suprême !",
      } as QuranReference,
    },
    {
      id: 'ukhdud-4',
      type: 'narrative',
      order: 4,
      content: "﴿ وَٱلسَّمَآءِ ذَاتِ ٱلْبُرُوجِ﴾ By the sky containing great stars ﴿وَٱلْيَوْمِ ٱلْمَوْعُودِ﴾ And [by] the promised Day ﴿وَشَاهِدٍ وَمَشْهُودٍ﴾ And [by] the witness and what is witnessed, ﴿قُتِلَ أَصْحَـٰبُ ٱلْأُخْدُودِ﴾ Destroyed [i.e., cursed] were the companions of the trench ﴿ٱلنَّارِ ذَاتِ ٱلْوَقُودِ﴾ [Containing] the fire full of fuel, ﴿إِذْ هُمْ عَلَيْهَا قُعُودٌ﴾ When they were sitting near it. ﴿وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِٱلْمُؤْمِنِينَ شُهُودٌ﴾ And they, to what they were doing against the believers, were witnesses. ﴿وَمَا نَقَمُوا۟ مِنْهُمْ إِلَّآ أَن يُؤْمِنُوا۟ بِٱللَّهِ ٱلْعَزِيزِ ٱلْحَمِيدِ﴾ And they resented them not except because they believed in Allah, the Exalted in Might, the Praiseworthy, ﴿ٱلَّذِى لَهُۥ مُلْكُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ وَٱللَّهُ عَلَىٰ كُلِّ شَىْءٍ شَهِيدٌ﴾ To whom belongs the dominion of the heavens and the earth. And Allah, over all things, is Witness. ﴿إِنَّ ٱلَّذِينَ فَتَنُوا۟ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَـٰتِ ثُمَّ لَمْ يَتُوبُوا۟ فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ ٱلْحَرِيقِ﴾ Indeed, those who have tortured the believing men and believing women and then have not repented will have the punishment of Hell, and they will have the punishment of the Burning Fire. ﴿إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ لَهُمْ جَنَّـٰتٌ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْكَبِيرُ﴾ Indeed, those who have believed and done righteous deeds will have gardens beneath which rivers flow. That is the great attainment.",
      contentFr: "﴿ وَٱلسَّمَآءِ ذَاتِ ٱلْبُرُوجِ﴾ Par le ciel et ses constellations ! ﴿وَٱلْيَوْمِ ٱلْمَوْعُودِ﴾ Par le jour promis ! ﴿وَشَاهِدٍ وَمَشْهُودٍ﴾ Par le témoin et son témoignage ! ﴿قُتِلَ أَصْحَـٰبُ ٱلْأُخْدُودِ﴾ Mort aux gens de la tranchée très longue (Al-Ukhdûd) ! ﴿ٱلنَّارِ ذَاتِ ٱلْوَقُودِ﴾ Au bord d’un feu rugissant, ﴿إِذْ هُمْ عَلَيْهَا قُعُودٌ﴾ (les mécréants) étaient assis, ﴿وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِٱلْمُؤْمِنِينَ شُهُودٌ﴾ et regardaient en témoins ce qu’ils faisaient subir aux croyants. ﴿وَمَا نَقَمُوا۟ مِنْهُمْ إِلَّآ أَن يُؤْمِنُوا۟ بِٱللَّهِ ٱلْعَزِيزِ ٱلْحَمِيدِ﴾ Ils ne leur en voulaient que parce qu’ils croyaient en Allah, le Tout- Puissant, le Digne de Toute Louange, ﴿ٱلَّذِى لَهُۥ مُلْكُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ وَٱللَّهُ عَلَىٰ كُلِّ شَىْءٍ شَهِيدٌ﴾ Celui à Qui appartient la royauté des cieux et de la terre, Allah, Qui de Toute chose est le Témoin. ﴿إِنَّ ٱلَّذِينَ فَتَنُوا۟ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَـٰتِ ثُمَّ لَمْ يَتُوبُوا۟ فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ ٱلْحَرِيقِ﴾ Ceux qui ont infligé les pires épreuves aux croyants et aux croyantes, puis qui ne s’en sont pas repentis, auront le supplice de la Géhenne et le supplice du Brasier infernal. ﴿إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ لَهُمْ جَنَّـٰتٌ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۚ ذَٰلِكَ ٱلْفَوْزُ ٱلْكَبِيرُ﴾ Ceux qui ont cru et ont accompli les bonnes œuvres auront des jardins sous lesquels coulent les rivières. Tel est le succès suprême !",
    },

    // ============ PART 2: THE KING, THE SORCERER, THE MONK, AND THE BOY ============
    {
      id: 'ukhdud-5',
      type: 'narrative',
      order: 5,
      content: "The Prophet ﷺ told the story of these people. Suhayb narrated it from him, and it is given whole.",
      contentFr: "Le Prophète ﷺ raconta l'histoire de ces gens. Souhayb la rapporta de lui, et elle est donnée en entier.",
    },
    {
      id: 'ukhdud-6',
      type: 'hadith_source',
      order: 6,
      content: "The Prophet ﷺ tells the story of the king, the sorcerer, the monk, and the boy.",
      contentFr: "Le Prophète ﷺ raconte l'histoire du roi, du sorcier, du moine, et du garçon.",
      source: {
        type: "hadith",
        collection: "Sahih Muslim",
        hadithNumber: "3005",
        narrator: "Suhayb ar-Rumi",
        translation: "There was a king among those before you, and he had a sorcerer. When the sorcerer grew old, he said to the king: I have grown old, so send me a boy that I may teach him sorcery. He sent him a boy to teach. On the boy's way there was a monk; he sat with him and listened to his words, and was impressed. Whenever he went to the sorcerer he passed by the monk and sat with him, and when he came to the sorcerer he was beaten. He complained of that to the monk, who said: When you fear the sorcerer, say: my family kept me; and when you fear your family, say: the sorcerer kept me. While he was so, he came upon a great beast that had blocked the people's way. He said: Today I will know whether the sorcerer is better or the monk is better. He took a stone and said: O Allah, if the affair of the monk is more beloved to You than the affair of the sorcerer, then kill this beast, so that the people may pass. He threw it and killed it, and the people passed. He came to the monk and told him. The monk said: My son, today you are better than I am; you have reached a point I see, and you will be tested; if you are tested, do not point to me. The boy healed the blind and the leper, and treated people for every illness. A companion of the king who had gone blind heard of him and came to him with many gifts and said: All this is yours if you heal me. He said: I heal no one; it is Allah who heals; if you believe in Allah, I will pray to Allah and He will heal you. He believed in Allah, and Allah healed him. He came to the king and sat with him as he used to. The king said: Who restored your sight? He said: My Lord. He said: Do you have a lord other than me? He said: My Lord and your Lord is Allah. He seized him and went on torturing him until he pointed to the boy. The boy was brought. The king said: My son, your sorcery has reached the point where you heal the blind and the leper and do such things! He said: I heal no one; it is Allah who heals. He seized him and went on torturing him until he pointed to the monk. The monk was brought and told: Turn back from your religion. He refused. He called for a saw, placed it on the parting of his head, and split him until the two halves fell. Then the king's companion was brought and told: Turn back from your religion. He refused, and the saw was placed on the parting of his head and he was split until the two halves fell. Then the boy was brought and told: Turn back from your religion. He refused. He handed him to a group of his men and said: Take him to such-and-such a mountain and climb it with him; when you reach its top, if he turns back from his religion, well; otherwise, throw him down. They took him and climbed the mountain. He said: O Allah, suffice me against them however You will. The mountain shook with them and they fell, and he came walking to the king. The king said: What did your companions do? He said: Allah sufficed me against them. He handed him to a group of his men and said: Take him in a boat out to the middle of the sea; if he turns back from his religion, well; otherwise, throw him in. They took him. He said: O Allah, suffice me against them however You will. The boat capsized with them and they drowned, and he came walking to the king. The king said: What did your companions do? He said: Allah sufficed me against them. Then he said to the king: You will not be able to kill me until you do what I tell you. He said: What is it? He said: Gather the people on one plain, and crucify me on a trunk; then take an arrow from my quiver, place it in the middle of the bow, and say: In the name of Allah, the Lord of the boy; then shoot me. If you do that, you will kill me. So he gathered the people on one plain, crucified him on a trunk, took an arrow from his quiver, placed it in the middle of the bow, and said: In the name of Allah, the Lord of the boy - and shot him. The arrow struck his temple; he put his hand to his temple, and died. The people said: We believe in the Lord of the boy; we believe in the Lord of the boy; we believe in the Lord of the boy. The king was told: Do you see what you feared? By Allah, it has come upon you: the people have believed. He ordered ditches at the openings of the roads, and they were dug, and fires were lit in them, and he said: Whoever does not turn back from his religion, throw him in - or: let him throw himself in. They did so, until a woman came with an infant of hers, and she hesitated to go into it. The boy said to her: Mother, be patient, for you are upon the truth.",
        translationFr: "Il y avait un roi parmi ceux d'avant vous, et il avait un sorcier. Quand le sorcier devint vieux, il dit au roi : Je suis devenu vieux, envoie-moi donc un garçon à qui j'enseignerai la sorcellerie. Il lui envoya un garçon à instruire. Sur le chemin du garçon il y avait un moine ; il s'assit auprès de lui, écouta ses paroles, et en fut impressionné. Chaque fois qu'il allait chez le sorcier il passait par le moine et s'asseyait avec lui, et quand il arrivait chez le sorcier il était battu. Il s'en plaignit au moine, qui dit : Quand tu crains le sorcier, dis : ma famille m'a retenu ; et quand tu crains ta famille, dis : le sorcier m'a retenu. Tandis qu'il en était ainsi, il tomba sur une grande bête qui avait barré le chemin des gens. Il dit : Aujourd'hui je saurai si le sorcier est meilleur ou si le moine est meilleur. Il prit une pierre et dit : Ô Allah, si l'affaire du moine T'est plus chère que l'affaire du sorcier, alors tue cette bête, pour que les gens puissent passer. Il la lança et la tua, et les gens passèrent. Il vint au moine et le lui raconta. Le moine dit : Mon fils, aujourd'hui tu es meilleur que moi ; tu es parvenu à un point que je vois, et tu seras éprouvé ; si tu es éprouvé, ne me désigne pas. Le garçon guérissait l'aveugle-né et le lépreux, et soignait les gens de toute maladie. Un compagnon du roi devenu aveugle entendit parler de lui et vint à lui avec de nombreux cadeaux, et dit : Tout ceci est à toi si tu me guéris. Il dit : Je ne guéris personne ; c'est Allah qui guérit ; si tu crois en Allah, je prierai Allah et Il te guérira. Il crut en Allah, et Allah le guérit. Il vint au roi et s'assit auprès de lui comme il en avait l'habitude. Le roi dit : Qui t'a rendu la vue ? Il dit : Mon Seigneur. Il dit : As-tu un seigneur autre que moi ? Il dit : Mon Seigneur et ton Seigneur est Allah. Il le saisit et le tortura jusqu'à ce qu'il désigne le garçon. Le garçon fut amené. Le roi dit : Mon fils, ta sorcellerie en est arrivée au point de guérir l'aveugle-né et le lépreux et de faire de telles choses ! Il dit : Je ne guéris personne ; c'est Allah qui guérit. Il le saisit et le tortura jusqu'à ce qu'il désigne le moine. Le moine fut amené et on lui dit : Reviens de ta religion. Il refusa. Il fit apporter une scie, la posa sur la raie de sa tête, et le fendit jusqu'à ce que les deux moitiés tombent. Puis le compagnon du roi fut amené et on lui dit : Reviens de ta religion. Il refusa, et la scie fut posée sur la raie de sa tête et il fut fendu jusqu'à ce que les deux moitiés tombent. Puis le garçon fut amené et on lui dit : Reviens de ta religion. Il refusa. Il le remit à un groupe de ses hommes et dit : Emmenez-le à telle montagne et gravissez-la avec lui ; quand vous atteindrez son sommet, s'il revient de sa religion, bien ; sinon, jetez-le. Ils l'emmenèrent et gravirent la montagne. Il dit : Ô Allah, suffis-moi contre eux comme Tu veux. La montagne trembla avec eux et ils tombèrent, et il vint en marchant au roi. Le roi dit : Qu'ont fait tes compagnons ? Il dit : Allah m'a suffi contre eux. Il le remit à un groupe de ses hommes et dit : Emmenez-le en barque au milieu de la mer ; s'il revient de sa religion, bien ; sinon, jetez-le. Ils l'emmenèrent. Il dit : Ô Allah, suffis-moi contre eux comme Tu veux. La barque chavira avec eux et ils se noyèrent, et il vint en marchant au roi. Le roi dit : Qu'ont fait tes compagnons ? Il dit : Allah m'a suffi contre eux. Puis il dit au roi : Tu ne pourras pas me tuer avant de faire ce que je te dis. Il dit : Qu'est-ce ? Il dit : Rassemble les gens sur une même plaine, et crucifie-moi sur un tronc ; puis prends une flèche de mon carquois, place-la au milieu de l'arc, et dis : Au nom d'Allah, le Seigneur du garçon ; puis tire sur moi. Si tu fais cela, tu me tueras. Il rassembla donc les gens sur une même plaine, le crucifia sur un tronc, prit une flèche de son carquois, la plaça au milieu de l'arc, et dit : Au nom d'Allah, le Seigneur du garçon - et tira sur lui. La flèche frappa sa tempe ; il porta la main à sa tempe, et mourut. Les gens dirent : Nous croyons au Seigneur du garçon ; nous croyons au Seigneur du garçon ; nous croyons au Seigneur du garçon. On dit au roi : Vois-tu ce que tu craignais ? Par Allah, cela t'est arrivé : les gens ont cru. Il ordonna des fosses à l'entrée des routes, et elles furent creusées, et des feux y furent allumés, et il dit : Quiconque ne revient pas de sa religion, jetez-le dedans - ou : qu'il s'y jette. Ils le firent, jusqu'à ce qu'une femme vienne avec un nourrisson à elle, et elle hésita à y entrer. Le garçon lui dit : Mère, patiente, car tu es sur la vérité.",
        grade: "sahih",
        arabicText: "",
      } as HadithReference,
    },

    // ============ PART 3: WHAT WAS NOT TOLD ============
    {
      id: 'ukhdud-7',
      type: 'narrative',
      order: 7,
      content: "The Quran does not say where the ditch was or when, and the Prophet ﷺ did not name the king, the monk or the boy. What is told is why the believers were burned, and what they said. What was not told, we leave untold. Allah knows best.",
      contentFr: "Le Coran ne dit ni où était la fosse ni quand, et le Prophète ﷺ ne nomma ni le roi, ni le moine, ni le garçon. Ce qui est raconté, c'est pourquoi les croyants furent brûlés, et ce qu'ils dirent. Ce qui ne fut pas raconté, nous le laissons non raconté. Allah est le plus savant.",
    },
  ],
};
