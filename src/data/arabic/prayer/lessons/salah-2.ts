// Lesson 2: Wudu (Ablution)
// الوضوء

import { PrayerContent } from '../../../../types/prayer';

export const salah2Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'What is Wudu?',
    titleArabic: 'ما هو الوضوء؟',
    content: 'Wudu (ablution) is the ritual washing performed before prayer. It is a prerequisite for the validity of Salah. Allah says in the Quran:',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ',
  },
  {
    type: 'rule',
    title: 'When is Wudu Required?',
    content: 'Wudu must be performed before prayer, touching the Quran, and performing Tawaf around the Ka\'bah. You must renew your wudu if it is broken by any of the invalidators.',
    icon: 'information-circle',
  },
  {
    type: 'step_list',
    title: 'Steps of Wudu',
    titleArabic: 'خطوات الوضوء',
    steps: [
      {
        stepNumber: 1,
        title: 'Intention (Niyyah)',
        titleArabic: 'النية',
        description: 'Make the intention in your heart to perform wudu for the purpose of purification. The intention is in the heart, not spoken aloud.',
      },
      {
        stepNumber: 2,
        title: 'Say Bismillah',
        titleArabic: 'التسمية',
        description: 'Begin by saying the name of Allah.',
        arabic: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        translation: 'In the name of Allah',
      },
      {
        stepNumber: 3,
        title: 'Wash Hands (3 times)',
        titleArabic: 'غسل اليدين',
        description: 'Wash both hands up to the wrists three times, making sure water reaches between the fingers.',
      },
      {
        stepNumber: 4,
        title: 'Rinse Mouth (3 times)',
        titleArabic: 'المضمضة',
        description: 'Take water into the mouth, swirl it around thoroughly, and spit it out. Repeat three times.',
      },
      {
        stepNumber: 5,
        title: 'Rinse Nose (3 times)',
        titleArabic: 'الاستنشاق',
        description: 'Sniff water into the nostrils and blow it out. Use the left hand to blow the water out. Repeat three times.',
      },
      {
        stepNumber: 6,
        title: 'Wash Face (3 times)',
        titleArabic: 'غسل الوجه',
        description: 'Wash the entire face from the hairline to the chin, and from ear to ear. Repeat three times.',
      },
      {
        stepNumber: 7,
        title: 'Wash Arms (3 times)',
        titleArabic: 'غسل اليدين إلى المرفقين',
        description: 'Wash the right arm from fingertips to elbow, including the elbow, three times. Then the left arm three times.',
      },
      {
        stepNumber: 8,
        title: 'Wipe Head (once)',
        titleArabic: 'مسح الرأس',
        description: 'Wet your hands and wipe over the entire head from front to back and back to front, once.',
      },
      {
        stepNumber: 9,
        title: 'Wipe Ears (once)',
        titleArabic: 'مسح الأذنين',
        description: 'Using the remaining wetness, wipe the inside of the ears with the index fingers and the outside with the thumbs.',
      },
      {
        stepNumber: 10,
        title: 'Wash Feet (3 times)',
        titleArabic: 'غسل القدمين',
        description: 'Wash the right foot up to and including the ankle three times, ensuring water reaches between the toes. Then the left foot.',
      },
    ],
  },
  {
    type: 'examples_grid',
    title: 'Dua After Wudu',
    titleArabic: 'الدعاء بعد الوضوء',
    examples: [
      {
        arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'Ash-hadu an la ilaha illallahu wahdahu la shareeka lahu, wa ash-hadu anna Muhammadan \'abduhu wa rasuluh',
        translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger',
      },
      {
        arabic: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
        transliteration: 'Allahumma-j\'alni minat-tawwabeena waj\'alni minal-mutatahireen',
        translation: 'O Allah, make me among those who repent and make me among those who purify themselves',
      },
    ],
  },
  {
    type: 'table',
    title: 'What Breaks Wudu',
    titleArabic: 'نواقض الوضوء',
    headers: ['Invalidator', 'Details'],
    rows: [
      ['Natural discharge', 'Anything that exits from the private parts (urine, stool, gas)'],
      ['Deep sleep', 'Deep sleep where one loses awareness (lying down or reclining)'],
      ['Loss of consciousness', 'Fainting, anesthesia, or intoxication'],
      ['Touching private parts', 'Touching one\'s own private parts directly without a barrier'],
      ['Eating camel meat', 'According to the Hanbali madhab, based on an authentic hadith'],
    ],
  },
  {
    type: 'note',
    title: 'Important Notes',
    content: 'The obligation in wudu is to wash each part once. Washing three times is the Sunnah of the Prophet (peace be upon him). Be moderate in water usage - the Prophet used to perform wudu with about one mudd (roughly 750ml) of water.',
  },
];
