// Prayer Practice Types for Iqra2.0 App
// Types for the Prayer Guide & Sujud as-Sahw features

// ============ Prayer Category Types ============

export type PrayerCategory = 'prayer_guide' | 'sujud_sahw';

export const PRAYER_CATEGORY_LABELS: Record<PrayerCategory, { english: string; arabic: string }> = {
  prayer_guide: { english: 'Prayer Guide', arabic: 'دليل الصلاة' },
  sujud_sahw: { english: 'Correcting Mistakes', arabic: 'سجود السهو' },
};

// ============ Content Block Types ============

export type PrayerContentType =
  | 'text'
  | 'description'
  | 'rule'
  | 'note'
  | 'table'
  | 'examples_grid'
  | 'prayer_step'
  | 'step_list'
  | 'prayer_times_table';

export interface PrayerContentBase {
  type: PrayerContentType;
  title?: string;
  titleArabic?: string;
}

export interface PrayerTextContent extends PrayerContentBase {
  type: 'text';
  content: string;
}

export interface PrayerDescriptionContent extends PrayerContentBase {
  type: 'description';
  content: string;
  arabic?: string;
}

export interface PrayerRuleContent extends PrayerContentBase {
  type: 'rule';
  content: string;
  icon?: string;
}

export interface PrayerNoteContent extends PrayerContentBase {
  type: 'note';
  content: string;
}

export interface PrayerTableContent extends PrayerContentBase {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface PrayerExamplesGridContent extends PrayerContentBase {
  type: 'examples_grid';
  examples: {
    arabic: string;
    transliteration: string;
    translation: string;
  }[];
}

export interface PrayerStepContent extends PrayerContentBase {
  type: 'prayer_step';
  step: PrayerStepData;
}

export interface PrayerStepListContent extends PrayerContentBase {
  type: 'step_list';
  steps: StepListItem[];
}

export interface PrayerTimesTableContent extends PrayerContentBase {
  type: 'prayer_times_table';
  rows: PrayerTimesRow[];
}

export type PrayerContent =
  | PrayerTextContent
  | PrayerDescriptionContent
  | PrayerRuleContent
  | PrayerNoteContent
  | PrayerTableContent
  | PrayerExamplesGridContent
  | PrayerStepContent
  | PrayerStepListContent
  | PrayerTimesTableContent;

// ============ Prayer Step Data ============

export interface PrayerStepData {
  stepNumber: number;
  positionName: string;
  positionNameArabic: string;
  positionIcon?: string;
  arabic: string;
  transliteration: string;
  translation: string;
  instruction?: string;
  repetitions?: number;
  isSunnah?: boolean;
}

// ============ Step List Item ============

export interface StepListItem {
  stepNumber: number;
  title: string;
  titleArabic?: string;
  description: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
}

// ============ Prayer Times Table Row ============

export interface PrayerTimesRow {
  name: string;
  nameArabic: string;
  rakaat: number;
  time: string;
  recitation: string;
  sunnahBefore?: number;
  sunnahAfter?: number;
}

// ============ Prayer Lesson ============

export interface PrayerLesson {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  icon: string;
  color: string;
  category: PrayerCategory;
  order: number;
  estimatedMinutes: number;
  content: PrayerContent[];
}

// ============ Prayer Progress ============

export interface PrayerProgress {
  lessonsCompleted: string[];
  lessonsStarted: string[];
  lastViewedLessonId?: string;
  lastViewedDate?: string;
}

// ============ Constants ============

export const TOTAL_PRAYER_LESSONS = 7;
export const TOTAL_PRAYER_GUIDE_LESSONS = 5;
export const TOTAL_SUJUD_SAHW_LESSONS = 2;
