// Story of Prophet Al-Yasa (اليسع) - The Successor
// Single continuous narrative with Quran sources

import { Prophet, SubStory, StoryContentBlock, QuranReference } from '../../../../types/prophetStories';

// Full prophet data with story details
export const alyasaStory: Prophet = {
  id: 'al-yasa',
  nameEnglish: "Al-Yasa'",
  nameFrench: "Al-Yasa'",
  nameArabic: 'اليسع',
  order: 20,
  title: 'The Successor',
  titleFr: 'Le Successeur',
  titleArabic: 'الخليفة',
  summary: "Prophet Al-Yasa' (Elisha) was the successor of Prophet Ilyas. He continued his predecessor's mission of calling the Children of Israel back to the worship of Allah alone. Mentioned briefly in the Quran alongside other great prophets, he is praised as being among the chosen and outstanding. While the Quran provides limited details about his specific story, his inclusion among the prophets and the historical accounts of his miracles and teachings demonstrate his importance in the prophetic chain.",
  summaryFr: "Le Prophète Al-Yasa' (Élisée) fut le successeur du Prophète Ilyas. Il poursuivit la mission de son prédécesseur en appelant les Enfants d'Israël à revenir à l'adoration d'Allah seul. Mentionné brièvement dans le Coran aux côtés d'autres grands prophètes, il est loué comme faisant partie des élus et des remarquables. Bien que le Coran fournisse peu de détails sur son histoire spécifique, son inclusion parmi les prophètes et les récits historiques de ses miracles et enseignements démontrent son importance dans la chaîne prophétique.",
  hasSubStories: false,
  lessons: [
    'Continuing the work of righteous predecessors is honorable',
    'Every prophet, regardless of fame, carries immense responsibility',
    'Persistence in guidance even when facing opposition',
    'Being chosen by Allah is the highest honor',
    'Faith must be passed from generation to generation',
    'The prophetic mission is always the same: calling to Allah',
  ],
  lessonsFr: [
    'Poursuivre l\'œuvre des prédécesseurs vertueux est honorable',
    'Chaque prophète, quelle que soit sa renommée, porte une immense responsabilité',
    'La persévérance dans la guidance même face à l\'opposition',
    'Être choisi par Allah est le plus grand honneur',
    'La foi doit être transmise de génération en génération',
    'La mission prophétique est toujours la même : appeler à Allah',
  ],
  estimatedReadTime: 6,
  quranMentions: 2,
  icon: '🌟',
};

// Single continuous narrative
const alyasaStoryContent: StoryContentBlock[] = [
  {
    id: 'alyasa-1',
    type: 'narrative',
    order: 1,
    content: "Prophet Al-Yasa' (known as Elisha in the Biblical tradition) was the chosen successor of Prophet Ilyas. Before Ilyas was raised by Allah, he appointed Al-Yasa' to continue the prophetic mission among the Children of Israel. Al-Yasa' had been Ilyas's devoted student and servant, learning from his teacher and preparing for the great responsibility that would fall upon him.",
    contentFr: "Le Prophète Al-Yasa' (connu sous le nom d'Élisée dans la tradition biblique) fut le successeur choisi du Prophète Ilyas. Avant qu'Ilyas ne soit élevé par Allah, il désigna Al-Yasa' pour poursuivre la mission prophétique parmi les Enfants d'Israël. Al-Yasa' avait été l'élève dévoué et le serviteur d'Ilyas, apprenant de son maître et se préparant à la grande responsabilité qui allait lui incomber.",
  },
  {
    id: 'alyasa-2',
    type: 'narrative',
    order: 2,
    content: "The Quran mentions Al-Yasa' twice, both times in the company of other great prophets. While detailed stories about him are not narrated in the Quran, his inclusion among Allah's messengers confirms his status and importance. The very act of being named in the Quran is an eternal honor.",
    contentFr: "Le Coran mentionne Al-Yasa' deux fois, les deux fois en compagnie d'autres grands prophètes. Bien que des récits détaillés à son sujet ne soient pas narrés dans le Coran, son inclusion parmi les messagers d'Allah confirme son statut et son importance. Le simple fait d'être nommé dans le Coran est un honneur éternel.",
  },
  {
    id: 'alyasa-3',
    type: 'quran_source',
    order: 3,
    content: "Allah mentions Al-Yasa' among the favored prophets.",
    contentFr: "Allah mentionne Al-Yasa' parmi les prophètes favorisés.",
    source: {
      type: 'quran',
      surahNumber: 6,
      surahNameEnglish: "Al-An'am",
      surahNameArabic: 'الأنعام',
      ayahStart: 86,
      ayahEnd: 86,
      arabicText: 'وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ',
      translation: 'And Ismail and Al-Yasa\' and Yunus and Lut - and all [of them] We preferred over the worlds.',
      translationFr: 'Et Ismaïl, Al-Yasa\', Younous et Lout : à chacun Nous avons donné la préférence sur les mondes.',
    } as QuranReference,
  },
  {
    id: 'alyasa-4',
    type: 'narrative',
    order: 4,
    content: "In this verse, Al-Yasa' is mentioned alongside Ismail, Yunus, and Lut - prophets whose stories are told in greater detail in the Quran. All of them, Allah declares, were 'preferred over the worlds' (faddalna 'ala al-'alamin). This phrase indicates their exalted status - each prophet was favored above all other people of their time and given a rank that ordinary humans could never attain.",
    contentFr: "Dans ce verset, Al-Yasa' est mentionné aux côtés d'Ismaïl, Younous et Lout — des prophètes dont les histoires sont racontées plus en détail dans le Coran. Tous, déclare Allah, furent « préférés au-dessus des mondes » (faddalna 'ala al-'alamin). Cette expression indique leur statut exalté — chaque prophète fut favorisé au-dessus de tous les autres gens de son époque et reçut un rang que les humains ordinaires ne pourraient jamais atteindre.",
  },
  {
    id: 'alyasa-5',
    type: 'quran_source',
    order: 5,
    content: "Allah mentions Al-Yasa' among the outstanding.",
    contentFr: "Allah mentionne Al-Yasa' parmi les remarquables.",
    source: {
      type: 'quran',
      surahNumber: 38,
      surahNameEnglish: 'Sad',
      surahNameArabic: 'ص',
      ayahStart: 48,
      ayahEnd: 48,
      arabicText: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِّنَ الْأَخْيَارِ',
      translation: 'And remember Ismail and Al-Yasa\' and Dhul-Kifl, and all are among the outstanding.',
      translationFr: 'Et rappelle-toi Ismaïl, Al-Yasa\' et Dhoul-Kifl : tous font partie des meilleurs.',
    } as QuranReference,
  },
  {
    id: 'alyasa-6',
    type: 'narrative',
    order: 6,
    content: "Here, Al-Yasa' is listed with Ismail and Dhul-Kifl, and all three are described as 'min al-akhyar' - among the best, the outstanding, the excellent. The Quran commands us to remember these prophets, keeping their examples alive. Though their stories may be brief in the Quran, their rank with Allah is immense.",
    contentFr: "Ici, Al-Yasa' est cité avec Ismaïl et Dhoul-Kifl, et tous trois sont décrits comme « min al-akhyar » — parmi les meilleurs, les remarquables, les excellents. Le Coran nous ordonne de nous souvenir de ces prophètes, gardant leurs exemples vivants. Bien que leurs histoires soient brèves dans le Coran, leur rang auprès d'Allah est immense.",
  },
  {
    id: 'alyasa-7',
    type: 'narrative',
    order: 7,
    content: "According to historical traditions, Al-Yasa' lived in the land of Israel during the 9th century BCE, continuing the work Ilyas had begun. He faced the same corrupt leadership and widespread idol worship that had plagued his predecessor. But armed with Allah's guidance and the spiritual training he had received from Ilyas, he persisted in calling people to truth.",
    contentFr: "Selon les traditions historiques, Al-Yasa' vécut en terre d'Israël au IXe siècle avant J.-C., poursuivant l'œuvre qu'Ilyas avait commencée. Il fit face au même leadership corrompu et au culte généralisé des idoles qui avait tourmenté son prédécesseur. Mais armé de la guidance d'Allah et de la formation spirituelle qu'il avait reçue d'Ilyas, il persista à appeler les gens à la vérité.",
  },
  {
    id: 'alyasa-8',
    type: 'narrative',
    order: 8,
    content: "Traditions record numerous miracles performed by Al-Yasa'. He is said to have healed the sick, purified poisoned food, multiplied provisions for the needy, and even restored life to the dead by Allah's permission. These miracles served as signs of his prophethood, demonstrating that Allah's power was with him.",
    contentFr: "Les traditions rapportent de nombreux miracles accomplis par Al-Yasa'. On dit qu'il a guéri les malades, purifié la nourriture empoisonnée, multiplié les provisions pour les nécessiteux, et même rendu la vie aux morts par la permission d'Allah. Ces miracles servaient de signes de sa prophétie, démontrant que la puissance d'Allah était avec lui.",
  },
  {
    id: 'alyasa-9',
    type: 'narrative',
    order: 9,
    content: "One notable account describes how Al-Yasa' helped a poor widow whose creditors were about to take her sons as slaves. He instructed her to gather empty vessels and pour the small amount of oil she had. The oil multiplied miraculously, filling vessel after vessel, until there were no more containers. She sold the oil, paid her debts, and saved her family.",
    contentFr: "Un récit notable décrit comment Al-Yasa' aida une pauvre veuve dont les créanciers étaient sur le point de prendre ses fils comme esclaves. Il lui ordonna de rassembler des récipients vides et de verser la petite quantité d'huile qu'elle possédait. L'huile se multiplia miraculeusement, remplissant récipient après récipient, jusqu'à ce qu'il n'y ait plus de contenants. Elle vendit l'huile, paya ses dettes et sauva sa famille.",
  },
  {
    id: 'alyasa-10',
    type: 'narrative',
    order: 10,
    content: "Another tradition tells of a woman who had been kind to Al-Yasa', providing him hospitality. When her son died, she came to the prophet in grief. Al-Yasa' went to the child and prayed to Allah, and the boy was restored to life. Such miracles were not the prophet's own power but demonstrations of Allah's ability to do all things.",
    contentFr: "Une autre tradition raconte l'histoire d'une femme qui avait été bienveillante envers Al-Yasa', lui offrant l'hospitalité. Quand son fils mourut, elle vint vers le prophète dans sa douleur. Al-Yasa' alla vers l'enfant et pria Allah, et le garçon fut ramené à la vie. De tels miracles n'étaient pas le pouvoir propre du prophète, mais des démonstrations de la capacité d'Allah à faire toute chose.",
  },
  {
    id: 'alyasa-11',
    type: 'narrative',
    order: 11,
    content: "Al-Yasa' also played a political role, advising and sometimes anointing kings. He guided the kingdoms of Israel and Judah during turbulent times, always reminding the rulers of their duty to establish justice and worship Allah alone. When kings listened, their lands prospered; when they ignored him, trouble followed.",
    contentFr: "Al-Yasa' joua également un rôle politique, conseillant et parfois oignant des rois. Il guida les royaumes d'Israël et de Juda pendant des temps tumultueux, rappelant toujours aux dirigeants leur devoir d'établir la justice et d'adorer Allah seul. Quand les rois l'écoutaient, leurs terres prospéraient ; quand ils l'ignoraient, les troubles suivaient.",
  },
  {
    id: 'alyasa-12',
    type: 'narrative',
    order: 12,
    content: "The transition from Ilyas to Al-Yasa' represents an important principle: the prophetic mission must continue from generation to generation. When one messenger passes, another rises to carry the message forward. The content of the message - worship Allah alone - remains unchanged, even as the messenger changes.",
    contentFr: "La transition d'Ilyas à Al-Yasa' représente un principe important : la mission prophétique doit se poursuivre de génération en génération. Quand un messager s'en va, un autre se lève pour porter le message en avant. Le contenu du message — adorer Allah seul — reste inchangé, même si le messager change.",
  },
  {
    id: 'alyasa-13',
    type: 'narrative',
    order: 13,
    content: "Al-Yasa' served for many years before passing away naturally. Unlike his teacher Ilyas, who was raised by Allah, Al-Yasa' experienced death like most humans. But his legacy continued through the believers he had guided and the prophets who would come after him.",
    contentFr: "Al-Yasa' servit pendant de nombreuses années avant de mourir naturellement. Contrairement à son maître Ilyas, qui fut élevé par Allah, Al-Yasa' connut la mort comme la plupart des humains. Mais son héritage se poursuivit à travers les croyants qu'il avait guidés et les prophètes qui viendraient après lui.",
  },
  {
    id: 'alyasa-14',
    type: 'narrative',
    order: 14,
    content: "The fact that Al-Yasa' is mentioned in the Quran, despite limited details about his story, teaches us something important: not all prophets are meant to be equally famous. Some are mentioned extensively, like Musa; others briefly, like Al-Yasa'. But all are honored by Allah. Fame in this world is not the measure of worth with the Creator.",
    contentFr: "Le fait qu'Al-Yasa' soit mentionné dans le Coran, malgré les détails limités sur son histoire, nous enseigne quelque chose d'important : tous les prophètes ne sont pas destinés à être également célèbres. Certains sont mentionnés abondamment, comme Moussa ; d'autres brièvement, comme Al-Yasa'. Mais tous sont honorés par Allah. La renommée dans ce monde n'est pas la mesure de la valeur auprès du Créateur.",
  },
  {
    id: 'alyasa-15',
    type: 'narrative',
    order: 15,
    content: "For believers today, Al-Yasa's example teaches the importance of carrying on the work of those who came before us. Just as he continued Ilyas's mission, we are called to continue the work of the Prophet Muhammad ﷺ - calling people to Allah, establishing prayer, enjoining good, and forbidding evil. The specific person matters less than the continuity of the message.",
    contentFr: "Pour les croyants d'aujourd'hui, l'exemple d'Al-Yasa' enseigne l'importance de poursuivre l'œuvre de ceux qui nous ont précédés. Tout comme il poursuivit la mission d'Ilyas, nous sommes appelés à continuer l'œuvre du Prophète Muhammad ﷺ — appeler les gens à Allah, établir la prière, ordonner le bien et interdire le mal. La personne spécifique compte moins que la continuité du message.",
  },
  {
    id: 'alyasa-16',
    type: 'narrative',
    order: 16,
    content: "Prophet Al-Yasa', the faithful successor who continued his teacher's mission, stands as an example for all who inherit responsibility from those before them. When we read his name in the Quran, we send peace upon him and remember that he too was among Allah's chosen servants, preferred above the worlds, counted among the outstanding. What greater honor could there be?",
    contentFr: "Le Prophète Al-Yasa', le fidèle successeur qui poursuivit la mission de son maître, se dresse comme un exemple pour tous ceux qui héritent d'une responsabilité de ceux qui les ont précédés. Quand nous lisons son nom dans le Coran, nous lui envoyons la paix et nous rappelons qu'il faisait lui aussi partie des serviteurs élus d'Allah, préférés au-dessus des mondes, comptés parmi les remarquables. Quel plus grand honneur pourrait-il y avoir ?",
  },
];

// Export as single continuous story
export const alyasaSubStories: SubStory[] = [
  {
    id: 'alyasa-complete',
    prophetId: 'al-yasa',
    title: "The Story of Prophet Al-Yasa'",
    titleArabic: 'قصة نبي الله اليسع',
    order: 1,
    estimatedReadTime: 6,
    content: alyasaStoryContent,
  },
];
