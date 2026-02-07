// Types for Other Quran Stories (non-prophet narratives)

export type StoryCategory =
  | 'righteous_people'    // Khidr, Luqman, Maryam, etc.
  | 'groups_nations'      // People of the Cave, People of the Ditch, etc.
  | 'historical_events'   // Year of the Elephant, etc.
  | 'parables'           // The Two Gardens, etc.
  | 'individuals';        // Qarun, Dhul-Qarnayn, etc.

export interface QuranReference {
  type: 'quran';
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  ayahStart: number;
  ayahEnd: number;
  arabicText: string;
  translation: string;
  translationFr?: string;
}

export interface HadithReference {
  type: 'hadith';
  collection: string;
  narrator: string;
  arabicText: string;
  translation: string;
  translationFr?: string;
  grade?: string;
}

export type SourceReference = QuranReference | HadithReference;

export interface StoryContentBlock {
  id: string;
  type: 'narrative' | 'quran_source' | 'hadith_source';
  order: number;
  content: string;
  contentFr?: string;
  source?: SourceReference;
}

export interface QuranStory {
  id: string;
  titleEnglish: string;
  titleFrench?: string;
  titleArabic: string;
  order: number;
  category: StoryCategory;
  description: string;
  descriptionFr?: string;
  summary: string;
  summaryFr?: string;
  lessons: string[];
  lessonsFr?: string[];
  estimatedReadTime: number;
  quranMentions: number;
  icon: string;
  mainSurah?: {
    number: number;
    name: string;
    nameArabic: string;
  };
  content: StoryContentBlock[];
}

export interface QuranStoryListItem {
  id: string;
  titleEnglish: string;
  titleFrench?: string;
  titleArabic: string;
  order: number;
  category: StoryCategory;
  description: string;
  descriptionFr?: string;
  isCompleted: boolean;
  progress: number;
  estimatedReadTime: number;
  icon: string;
}

export interface QuranStoryProgress {
  storyId: string;
  percentComplete: number;
  lastReadBlockId: string | null;
  isCompleted: boolean;
  lastReadAt: Date | null;
}

export const STORY_CATEGORY_LABELS: Record<StoryCategory, { english: string; french: string; arabic: string }> = {
  righteous_people: { english: 'Righteous People', french: 'Les Pieux', arabic: 'الصالحون' },
  groups_nations: { english: 'Groups & Nations', french: 'Groupes & Nations', arabic: 'الأمم والجماعات' },
  historical_events: { english: 'Historical Events', french: 'Événements Historiques', arabic: 'أحداث تاريخية' },
  parables: { english: 'Parables', french: 'Paraboles', arabic: 'أمثال' },
  individuals: { english: 'Individuals', french: 'Individus', arabic: 'شخصيات' },
};
