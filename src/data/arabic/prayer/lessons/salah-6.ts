// Lesson 6: Introduction to Sujud as-Sahw
// مقدمة سجود السهو

import { PrayerContent } from '../../../../types/prayer';

export const salah6Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'What is Sujud as-Sahw?',
    titleFr: 'Qu\'est-ce que le Sujud as-Sahw ?',
    titleArabic: 'ما هو سجود السهو؟',
    content: 'Sujud as-Sahw (prostration of forgetfulness) is two prostrations performed to compensate for mistakes made during prayer due to forgetfulness. It is a mercy from Allah that allows us to correct our prayer rather than repeat it entirely.',
    contentFr: 'Le Sujud as-Sahw (prosternation de l\'oubli) est deux prosternations effectuees pour compenser les erreurs commises durant la priere par oubli. C\'est une misericorde d\'Allah qui nous permet de corriger notre priere plutot que de la repeter entierement.',
    arabic: 'سُجُودُ السَّهْوِ',
  },
  {
    type: 'rule',
    title: 'When is Sujud as-Sahw Required?',
    titleFr: 'Quand le Sujud as-Sahw est-il requis ?',
    content: 'Sujud as-Sahw is performed in three situations: (1) Adding something extra to the prayer (Ziyadah), such as an extra rak\'ah. (2) Omitting something from the prayer (Naqs), such as forgetting the first Tashahhud. (3) Doubt about the number of rak\'ahs (Shakk).',
    contentFr: 'Le Sujud as-Sahw est effectue dans trois situations : (1) Ajouter quelque chose en plus a la priere (Ziyadah), comme une rak\'ah supplementaire. (2) Omettre quelque chose de la priere (Naqs), comme oublier le premier Tashahhud. (3) Douter du nombre de rak\'ahs (Shakk).',
    icon: 'help-circle',
  },
  {
    type: 'step_list',
    title: 'The Three Causes',
    titleFr: 'Les trois causes',
    titleArabic: 'الأسباب الثلاثة',
    steps: [
      {
        stepNumber: 1,
        title: 'Addition (Ziyadah)',
        titleFr: 'Ajout (Ziyadah)',
        titleArabic: 'الزيادة',
        description: 'Adding an extra standing, sitting, bowing, or prostration to the prayer. For example, praying 5 rak\'ahs instead of 4. If you realize during the addition, return to the correct position and perform Sujud as-Sahw.',
        descriptionFr: 'Ajouter une station debout, assise, une inclinaison ou une prosternation supplementaire a la priere. Par exemple, prier 5 rak\'ahs au lieu de 4. Si vous vous en rendez compte durant l\'ajout, revenez a la position correcte et effectuez le Sujud as-Sahw.',
      },
      {
        stepNumber: 2,
        title: 'Omission (Naqs)',
        titleFr: 'Omission (Naqs)',
        titleArabic: 'النقص',
        description: 'Forgetting an obligatory part of the prayer, such as skipping the first Tashahhud or forgetting to say "Subhana rabbiyal-a\'la" in sujud. If you remember before reaching the next equivalent position, go back and do it. Otherwise, continue and perform Sujud as-Sahw.',
        descriptionFr: 'Oublier une partie obligatoire de la priere, comme sauter le premier Tashahhud ou oublier de dire "Subhana rabbiyal-a\'la" dans le sujud. Si vous vous en souvenez avant d\'atteindre la position equivalente suivante, revenez en arriere et faites-le. Sinon, continuez et effectuez le Sujud as-Sahw.',
      },
      {
        stepNumber: 3,
        title: 'Doubt (Shakk)',
        titleFr: 'Doute (Shakk)',
        titleArabic: 'الشك',
        description: 'Being unsure about the number of rak\'ahs performed. For example, not knowing if you prayed 3 or 4 rak\'ahs. Build on what you are certain of (the lesser number) and complete the prayer, then perform Sujud as-Sahw.',
        descriptionFr: 'Etre incertain du nombre de rak\'ahs effectuees. Par exemple, ne pas savoir si vous avez prie 3 ou 4 rak\'ahs. Basez-vous sur ce dont vous etes certain (le nombre inferieur) et completez la priere, puis effectuez le Sujud as-Sahw.',
      },
    ],
  },
  {
    type: 'prayer_step',
    title: 'How to Perform Sujud as-Sahw',
    titleFr: 'Comment effectuer le Sujud as-Sahw',
    step: {
      stepNumber: 1,
      positionName: 'The Prostrations',
      positionNameFr: 'Les prosternations',
      positionNameArabic: 'كيفية سجود السهو',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
      transliteration: 'Subhana rabbiyal-a\'la',
      translation: 'Glory be to my Lord, the Most High',
      translationFr: 'Gloire a mon Seigneur, le Tres-Haut',
      instruction: 'Perform two prostrations just like the regular prostrations in prayer, with a brief sitting between them. Say "Subhana rabbiyal-a\'la" in each prostration at least once (three times is recommended).',
      instructionFr: 'Effectuez deux prosternations comme les prosternations habituelles de la priere, avec une breve assise entre elles. Dites "Subhana rabbiyal-a\'la" dans chaque prosternation au moins une fois (trois fois est recommande).',
      repetitions: 3,
    },
  },
  {
    type: 'table',
    title: 'Before or After the Tasleem?',
    titleFr: 'Avant ou apres le Tasleem ?',
    titleArabic: 'قبل أم بعد التسليم؟',
    headers: ['Situation', 'When to Perform', 'Reason'],
    headersFr: ['Situation', 'Quand l\'effectuer', 'Raison'],
    rows: [
      ['Omission (forgot something)', 'Before Tasleem', 'To complete the prayer before ending it'],
      ['Addition (added something extra)', 'After Tasleem', 'As a correction after the prayer'],
      ['Doubt (unsure of count)', 'Before Tasleem', 'Building on certainty, completing before ending'],
    ],
    rowsFr: [
      ['Omission (oubli de quelque chose)', 'Avant le Tasleem', 'Pour completer la priere avant de la terminer'],
      ['Ajout (ajout de quelque chose en plus)', 'Apres le Tasleem', 'Comme correction apres la priere'],
      ['Doute (incertitude sur le nombre)', 'Avant le Tasleem', 'Se baser sur la certitude, completer avant de terminer'],
    ],
  },
  {
    type: 'note',
    title: 'The Scholarly View',
    titleFr: 'L\'avis des savants',
    content: 'There are different opinions among the madhahib (schools of jurisprudence). The Hanafi madhab generally performs Sujud as-Sahw after the Tasleem in all cases. The Shafi\'i madhab generally performs it before the Tasleem. The description above follows the Hanbali position which differentiates based on the situation, and is supported by multiple hadiths.',
    contentFr: 'Il existe differents avis parmi les madhahib (ecoles de jurisprudence). Le madhab Hanafite effectue generalement le Sujud as-Sahw apres le Tasleem dans tous les cas. Le madhab Chafiite l\'effectue generalement avant le Tasleem. La description ci-dessus suit la position Hanbalite qui differencie selon la situation, et est soutenue par plusieurs hadiths.',
  },
  {
    type: 'rule',
    title: 'Important Principles',
    titleFr: 'Principes importants',
    content: 'If you are certain about a mistake, act on your certainty. If you are in doubt, build on the lesser count (what you are sure of). Sujud as-Sahw does not make up for missing a pillar (rukn) of prayer - if you miss a pillar, you must make up the entire rak\'ah.',
    contentFr: 'Si vous etes certain d\'une erreur, agissez selon votre certitude. Si vous etes dans le doute, basez-vous sur le nombre inferieur (ce dont vous etes sur). Le Sujud as-Sahw ne compense pas l\'omission d\'un pilier (rukn) de la priere - si vous manquez un pilier, vous devez rattraper la rak\'ah entiere.',
    icon: 'bulb',
  },
  {
    type: 'examples_grid',
    title: 'Key Terms',
    titleFr: 'Termes cles',
    titleArabic: 'مصطلحات مهمة',
    examples: [
      {
        arabic: 'سُجُودُ السَّهْوِ',
        transliteration: 'Sujud as-Sahw',
        translation: 'Prostration of Forgetfulness',
        translationFr: 'Prosternation de l\'oubli',
      },
      {
        arabic: 'زِيَادَة',
        transliteration: 'Ziyadah',
        translation: 'Addition (extra action in prayer)',
        translationFr: 'Ajout (action supplementaire dans la priere)',
      },
      {
        arabic: 'نَقْص',
        transliteration: 'Naqs',
        translation: 'Omission (missing something)',
        translationFr: 'Omission (oubli de quelque chose)',
      },
      {
        arabic: 'شَكّ',
        transliteration: 'Shakk',
        translation: 'Doubt (uncertainty about count)',
        translationFr: 'Doute (incertitude sur le nombre)',
      },
    ],
  },
];
