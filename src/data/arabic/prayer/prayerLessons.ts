// Prayer Lessons Metadata
// بيانات دروس الصلاة

import { PrayerLesson } from '../../../types/prayer';
import { salah1Content } from './lessons/salah-1';
import { salah2Content } from './lessons/salah-2';
import { salah3Content } from './lessons/salah-3';
import { salah4Content } from './lessons/salah-4';
import { salah5Content } from './lessons/salah-5';
import { salah6Content } from './lessons/salah-6';
import { salah7Content } from './lessons/salah-7';

export const PRAYER_LESSONS: PrayerLesson[] = [
  {
    id: 'salah-1',
    title: 'Importance of Salah',
    titleArabic: 'أهمية الصلاة',
    description: 'Understanding the significance of prayer in Islam, its obligation, and the five daily prayers.',
    icon: 'star',
    color: '#10b981',
    category: 'prayer_guide',
    order: 1,
    estimatedMinutes: 8,
    content: salah1Content,
  },
  {
    id: 'salah-2',
    title: 'Wudu (Ablution)',
    titleArabic: 'الوضوء',
    description: 'Complete guide to performing wudu with all 10 steps, duas, and what breaks wudu.',
    icon: 'water',
    color: '#10b981',
    category: 'prayer_guide',
    order: 2,
    estimatedMinutes: 10,
    content: salah2Content,
  },
  {
    id: 'salah-3',
    title: 'Conditions of Prayer',
    titleArabic: 'شروط الصلاة',
    description: 'The nine prerequisites that must be met before starting prayer.',
    icon: 'clipboard',
    color: '#10b981',
    category: 'prayer_guide',
    order: 3,
    estimatedMinutes: 7,
    content: salah3Content,
  },
  {
    id: 'salah-4',
    title: 'Step-by-Step Prayer',
    titleArabic: 'الصلاة خطوة بخطوة',
    description: 'Complete guide from Takbir to Tasleem with all Arabic recitations and movements.',
    icon: 'body',
    color: '#10b981',
    category: 'prayer_guide',
    order: 4,
    estimatedMinutes: 15,
    content: salah4Content,
  },
  {
    id: 'salah-5',
    title: 'Five Prayers in Detail',
    titleArabic: 'الصلوات الخمس بالتفصيل',
    description: 'Specific details for each prayer: rak\'ahs, recitation type, and Sunnah prayers.',
    icon: 'time',
    color: '#10b981',
    category: 'prayer_guide',
    order: 5,
    estimatedMinutes: 12,
    content: salah5Content,
  },
  {
    id: 'salah-6',
    title: 'Sujud as-Sahw Intro',
    titleArabic: 'مقدمة سجود السهو',
    description: 'What is Sujud as-Sahw, when it is required, and how to perform it.',
    icon: 'alert-circle',
    color: '#D4AF37',
    category: 'sujud_sahw',
    order: 6,
    estimatedMinutes: 10,
    content: salah6Content,
  },
  {
    id: 'salah-7',
    title: 'Common Scenarios',
    titleArabic: 'سيناريوهات شائعة',
    description: 'Seven practical scenarios with solutions for correcting prayer mistakes.',
    icon: 'list',
    color: '#D4AF37',
    category: 'sujud_sahw',
    order: 7,
    estimatedMinutes: 12,
    content: salah7Content,
  },
];
