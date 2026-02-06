// Prayer Data - Main Export
// دليل الصلاة - Salah Guide

import { PrayerCategory } from '../../../types/prayer';
import { PRAYER_LESSONS } from './prayerLessons';

export { PRAYER_LESSONS } from './prayerLessons';

export const getAllPrayerLessons = () => PRAYER_LESSONS;

export const getPrayerLessonById = (id: string) =>
  PRAYER_LESSONS.find((lesson) => lesson.id === id);

export const getPrayerLessonsByCategory = (category: PrayerCategory) =>
  PRAYER_LESSONS.filter((lesson) => lesson.category === category);

export const getPrayerGuideLessons = () =>
  PRAYER_LESSONS.filter((lesson) => lesson.category === 'prayer_guide');

export const getSujudSahwLessons = () =>
  PRAYER_LESSONS.filter((lesson) => lesson.category === 'sujud_sahw');
