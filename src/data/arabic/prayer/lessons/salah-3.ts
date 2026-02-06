// Lesson 3: Conditions of Prayer
// شروط الصلاة

import { PrayerContent } from '../../../../types/prayer';

export const salah3Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'Prerequisites for Valid Prayer',
    titleArabic: 'شروط صحة الصلاة',
    content: 'Before performing Salah, certain conditions must be met for the prayer to be valid. These are different from the pillars (Arkan) of prayer which are performed during the prayer itself.',
  },
  {
    type: 'step_list',
    title: 'The Nine Conditions',
    titleArabic: 'الشروط التسعة',
    steps: [
      {
        stepNumber: 1,
        title: 'Islam',
        titleArabic: 'الإسلام',
        description: 'The person must be a Muslim. Prayer is not accepted from a non-Muslim.',
      },
      {
        stepNumber: 2,
        title: 'Sanity (Aql)',
        titleArabic: 'العقل',
        description: 'The person must be of sound mind. Prayer is not obligatory on one who has lost their mental faculties.',
      },
      {
        stepNumber: 3,
        title: 'Age of Discernment (Tamyiz)',
        titleArabic: 'التمييز',
        description: 'The person must have reached the age of discernment (around 7 years). Children should be taught to pray at 7 and encouraged at 10.',
      },
      {
        stepNumber: 4,
        title: 'Ritual Purity (Taharah)',
        titleArabic: 'الطهارة',
        description: 'One must have wudu (minor purification) or ghusl (major purification) if needed. Tayammum (dry ablution) is permitted when water is unavailable.',
      },
      {
        stepNumber: 5,
        title: 'Removing Impurities (Najasah)',
        titleArabic: 'إزالة النجاسة',
        description: 'The body, clothes, and place of prayer must be free from impurities (najasah) such as blood, urine, or other impure substances.',
      },
      {
        stepNumber: 6,
        title: 'Covering the Awrah',
        titleArabic: 'ستر العورة',
        description: 'For men: cover from the navel to the knees at minimum. For women: cover the entire body except the face and hands during prayer.',
      },
      {
        stepNumber: 7,
        title: 'Entering Prayer Time',
        titleArabic: 'دخول الوقت',
        description: 'Each prayer must be performed within its designated time. Praying before the time enters invalidates the prayer.',
      },
      {
        stepNumber: 8,
        title: 'Facing the Qiblah',
        titleArabic: 'استقبال القبلة',
        description: 'Face the direction of the Ka\'bah in Makkah. Use a compass or Qiblah app if unsure. The exception is during extreme fear or inability.',
        arabic: 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ',
        transliteration: 'Fawalli wajhaka shatral-masjidil-haram',
        translation: 'So turn your face toward al-Masjid al-Haram (Al-Baqarah 2:144)',
      },
      {
        stepNumber: 9,
        title: 'Intention (Niyyah)',
        titleArabic: 'النية',
        description: 'Make the intention in your heart for the specific prayer you are about to perform (e.g., Dhuhr, Asr). The intention is in the heart, not verbalized.',
      },
    ],
  },
  {
    type: 'table',
    title: 'Covering Requirements',
    titleArabic: 'شروط الستر',
    headers: ['Person', 'Minimum Coverage', 'Details'],
    rows: [
      ['Men', 'Navel to knees', 'Shoulders should also be covered (Sunnah)'],
      ['Women', 'Entire body', 'Except face and hands during prayer'],
      ['Children', 'Should be taught modesty', 'Encouraged to cover like adults'],
    ],
  },
  {
    type: 'rule',
    title: 'Facing the Qiblah',
    content: 'All Muslims pray facing the Ka\'bah in Makkah, Saudi Arabia. When you cannot determine the exact direction, make your best effort based on available information. There is no sin in a small deviation if you have made a sincere effort.',
    icon: 'compass',
  },
  {
    type: 'note',
    title: 'Flexibility in Islam',
    content: 'If a person cannot stand, they may pray sitting. If they cannot sit, they may pray lying down. If they cannot find water, they may perform Tayammum (dry ablution) using clean earth. Allah does not burden a soul beyond what it can bear.',
  },
];
