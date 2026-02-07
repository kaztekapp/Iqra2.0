// Prophet Stories Types for Iqra2.0 App
// Types for the Stories of the Prophets (قصص الأنبياء) feature

// ============ Core Prophet Types ============

export interface Prophet {
  id: string;
  nameEnglish: string;
  nameFrench?: string;
  nameArabic: string;
  order: number; // 1-25 chronological order
  title?: string; // e.g., "Father of Mankind"
  titleFr?: string;
  titleArabic?: string;
  summary: string; // Brief description of the prophet
  summaryFr?: string;
  hasSubStories: boolean;
  subStories?: SubStory[];
  lessons: string[]; // Key lessons from the prophet's story
  lessonsFr?: string[];
  estimatedReadTime: number; // in minutes
  quranMentions: number; // Number of times mentioned in Quran
  icon?: string; // Emoji or icon identifier
}

// ============ Sub-Story Types ============

export interface SubStory {
  id: string;
  prophetId: string;
  title: string;
  titleFr?: string;
  titleArabic?: string;
  order: number;
  content: StoryContentBlock[];
  estimatedReadTime: number; // in minutes
}

// ============ Content Block Types ============

export type ContentBlockType = 'narrative' | 'quran_source' | 'hadith_source';

export interface StoryContentBlock {
  id: string;
  type: ContentBlockType;
  order: number;
  content: string; // The narrative text in English
  contentFr?: string;
  source?: QuranReference | HadithReference;
}

// ============ Source Reference Types ============

export interface QuranReference {
  type: 'quran';
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  ayahStart: number;
  ayahEnd: number;
  arabicText: string; // The Arabic text of the verse(s)
  translation: string; // English translation
  translationFr?: string;
}

export interface HadithReference {
  type: 'hadith';
  collection: HadithCollection;
  bookName?: string;
  hadithNumber?: string;
  narrator?: string;
  arabicText?: string;
  translation: string;
  translationFr?: string;
  grade?: HadithGrade;
}

export type HadithCollection =
  | 'bukhari'
  | 'muslim'
  | 'tirmidhi'
  | 'abu_dawud'
  | 'nasai'
  | 'ibn_majah'
  | 'ahmad'
  | 'malik'
  | 'darimi'
  | 'other';

export type HadithGrade = 'sahih' | 'hasan' | 'daif' | 'mutawatir';

// ============ Progress Types ============

export type StoryReadingStatus = 'not_started' | 'in_progress' | 'completed';

export interface ProphetStoryProgress {
  prophetId: string;
  status: StoryReadingStatus;
  subStoriesCompleted: string[]; // IDs of completed sub-stories
  lastReadAt?: string;
  completedAt?: string;
  currentSubStoryId?: string;
  currentBlockIndex?: number;
}

export interface ProphetStoriesProgress {
  storiesProgress: Record<string, ProphetStoryProgress>;
  totalStoriesCompleted: number;
  lastReadProphetId?: string;
  lastReadDate?: string;
  totalReadingTime: number; // in minutes
  audioSettings: StoryAudioSettings;
}

// ============ Audio Types ============

export type PlaybackSpeed = 0.75 | 1 | 1.25 | 1.5;
export type AudioPlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface StoryAudioSettings {
  playbackSpeed: PlaybackSpeed;
  autoPlay: boolean;
  highlightCurrentBlock: boolean;
}

export interface StoryAudioState {
  playbackState: AudioPlaybackState;
  currentBlockId?: string;
  currentProphetId?: string;
  currentSubStoryId?: string;
  progress: number; // 0-100 percentage
}

// ============ Display Types ============

export interface ProphetListItem {
  id: string;
  nameEnglish: string;
  nameFrench?: string;
  nameArabic: string;
  order: number;
  title?: string;
  titleFr?: string;
  summary: string;
  summaryFr?: string;
  isCompleted: boolean;
  progress: number; // 0-100 percentage
  estimatedReadTime: number;
}
