/**
 * Legacy lesson content for backwards compatibility
 * Used for old lesson IDs like 'definite-article', 'gender', etc.
 * New lessons use the grammarLessons data structure instead.
 */

export interface LessonSection {
  title: string;
  content: string;
  examples?: { arabic: string; transliteration: string; english: string }[];
}

export interface LegacyLesson {
  title: string;
  titleArabic: string;
  sections: LessonSection[];
}

export const lessonContent: Record<string, LegacyLesson> = {
  'definite-article': {
    title: 'The Definite Article',
    titleArabic: 'أَلْ التَّعْرِيف',
    sections: [
      {
        title: 'What is the Definite Article?',
        content: 'In Arabic, the definite article "the" is expressed by adding أَلْ (al-) to the beginning of a noun. This is equivalent to "the" in English. Arabic has NO word for "a/an" - just leave it off!',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book' },
          { arabic: 'الْكِتَاب', transliteration: 'al-kitāb', english: 'the book' },
          { arabic: 'بَيْت', transliteration: 'bayt', english: 'a house' },
          { arabic: 'الْبَيْت', transliteration: 'al-bayt', english: 'the house' },
          { arabic: 'قَلَم', transliteration: 'qalam', english: 'a pen' },
          { arabic: 'الْقَلَم', transliteration: 'al-qalam', english: 'the pen' },
          { arabic: 'بَاب', transliteration: 'bāb', english: 'a door' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door' },
        ],
      },
      {
        title: 'Sun Letters (الْحُرُوفُ الشَّمْسِيَّة)',
        content: 'When أَلْ comes before certain letters called "sun letters", the ل sound assimilates to that letter and doubles it. Sun letters are: ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ن، ل',
        examples: [
          { arabic: 'الشَّمْس', transliteration: 'ash-shams', english: 'the sun' },
          { arabic: 'النُّور', transliteration: 'an-nūr', english: 'the light' },
          { arabic: 'السَّلَام', transliteration: 'as-salām', english: 'the peace' },
          { arabic: 'الرَّجُل', transliteration: 'ar-rajul', english: 'the man' },
          { arabic: 'الدَّرْس', transliteration: 'ad-dars', english: 'the lesson' },
          { arabic: 'التُّفَّاحَة', transliteration: 'at-tuffāḥa', english: 'the apple' },
          { arabic: 'الطَّعَام', transliteration: 'aṭ-ṭaʿām', english: 'the food' },
          { arabic: 'الزَّهْرَة', transliteration: 'az-zahra', english: 'the flower' },
        ],
      },
      {
        title: 'Moon Letters (الْحُرُوفُ الْقَمَرِيَّة)',
        content: 'With "moon letters", the ل is pronounced normally. Moon letters are: أ، ب، ج، ح، خ، ع، غ، ف، ق، ك، م، ه، و، ي',
        examples: [
          { arabic: 'الْقَمَر', transliteration: 'al-qamar', english: 'the moon' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door' },
          { arabic: 'الْكَلْب', transliteration: 'al-kalb', english: 'the dog' },
          { arabic: 'الْمَاء', transliteration: 'al-māʾ', english: 'the water' },
          { arabic: 'الْوَلَد', transliteration: 'al-walad', english: 'the boy' },
          { arabic: 'الْجَبَل', transliteration: 'al-jabal', english: 'the mountain' },
          { arabic: 'الْحَدِيقَة', transliteration: 'al-ḥadīqa', english: 'the garden' },
          { arabic: 'الْفِيل', transliteration: 'al-fīl', english: 'the elephant' },
        ],
      },
    ],
  },
  'gender': {
    title: 'Gender in Arabic',
    titleArabic: 'الْمُذَكَّرُ وَالْمُؤَنَّث',
    sections: [
      {
        title: 'Two Genders',
        content: 'Arabic has two grammatical genders: masculine (مُذَكَّر) and feminine (مُؤَنَّث). Unlike English, ALL nouns in Arabic have a gender. This affects adjectives, verbs, and pronouns.',
        examples: [
          { arabic: 'وَلَد', transliteration: 'walad', english: 'boy (masculine)' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl (feminine)' },
          { arabic: 'رَجُل', transliteration: 'rajul', english: 'man (masculine)' },
          { arabic: 'اِمْرَأَة', transliteration: 'imraʾa', english: 'woman (feminine)' },
        ],
      },
      {
        title: 'The Taa Marbuta (ة)',
        content: 'Most feminine nouns end in ة (taa marbuta). This letter is pronounced as "a" at the end of sentences, or "at" when the word continues. To make many masculine words feminine, simply add ة.',
        examples: [
          { arabic: 'مُدَرِّس', transliteration: 'mudarris', english: 'teacher (m)' },
          { arabic: 'مُدَرِّسَة', transliteration: 'mudarrisa', english: 'teacher (f)' },
          { arabic: 'طَالِب', transliteration: 'ṭālib', english: 'student (m)' },
          { arabic: 'طَالِبَة', transliteration: 'ṭāliba', english: 'student (f)' },
          { arabic: 'طَبِيب', transliteration: 'ṭabīb', english: 'doctor (m)' },
          { arabic: 'طَبِيبَة', transliteration: 'ṭabība', english: 'doctor (f)' },
          { arabic: 'كَاتِب', transliteration: 'kātib', english: 'writer (m)' },
          { arabic: 'كَاتِبَة', transliteration: 'kātiba', english: 'writer (f)' },
          { arabic: 'صَدِيق', transliteration: 'ṣadīq', english: 'friend (m)' },
          { arabic: 'صَدِيقَة', transliteration: 'ṣadīqa', english: 'friend (f)' },
        ],
      },
      {
        title: 'Naturally Feminine Words',
        content: 'Some words referring to females are feminine even without ة. Body parts that come in pairs are also usually feminine.',
        examples: [
          { arabic: 'أُمّ', transliteration: 'umm', english: 'mother' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl/daughter' },
          { arabic: 'أُخْت', transliteration: 'ukht', english: 'sister' },
          { arabic: 'يَد', transliteration: 'yad', english: 'hand' },
          { arabic: 'عَيْن', transliteration: 'ʿayn', english: 'eye' },
          { arabic: 'أُذُن', transliteration: 'udhun', english: 'ear' },
          { arabic: 'رِجْل', transliteration: 'rijl', english: 'leg/foot' },
          { arabic: 'شَمْس', transliteration: 'shams', english: 'sun' },
          { arabic: 'أَرْض', transliteration: 'arḍ', english: 'earth/land' },
          { arabic: 'نَار', transliteration: 'nār', english: 'fire' },
        ],
      },
    ],
  },
  'personal-pronouns': {
    title: 'Personal Pronouns',
    titleArabic: 'الضَّمَائِر الشَّخْصِيَّة',
    sections: [
      {
        title: 'Subject Pronouns (Singular)',
        content: 'Arabic pronouns distinguish between masculine/feminine. Here are the singular pronouns you\'ll use most often.',
        examples: [
          { arabic: 'أَنَا', transliteration: 'anā', english: 'I' },
          { arabic: 'أَنْتَ', transliteration: 'anta', english: 'you (masculine singular)' },
          { arabic: 'أَنْتِ', transliteration: 'anti', english: 'you (feminine singular)' },
          { arabic: 'هُوَ', transliteration: 'huwa', english: 'he' },
          { arabic: 'هِيَ', transliteration: 'hiya', english: 'she' },
        ],
      },
      {
        title: 'Subject Pronouns (Plural)',
        content: 'Plural pronouns in Arabic. Note that "we" is the same for both genders.',
        examples: [
          { arabic: 'نَحْنُ', transliteration: 'naḥnu', english: 'we' },
          { arabic: 'أَنْتُمْ', transliteration: 'antum', english: 'you (masculine plural)' },
          { arabic: 'أَنْتُنَّ', transliteration: 'antunna', english: 'you (feminine plural)' },
          { arabic: 'هُمْ', transliteration: 'hum', english: 'they (masculine)' },
          { arabic: 'هُنَّ', transliteration: 'hunna', english: 'they (feminine)' },
        ],
      },
      {
        title: 'Using Pronouns in Sentences',
        content: 'In Arabic, you don\'t need "is/am/are" with pronouns. Just pronoun + noun/adjective!',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student (m)' },
          { arabic: 'أَنَا طَالِبَة', transliteration: 'anā ṭāliba', english: 'I am a student (f)' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher' },
          { arabic: 'هِيَ طَبِيبَة', transliteration: 'hiya ṭabība', english: 'She is a doctor' },
          { arabic: 'نَحْنُ طُلَّاب', transliteration: 'naḥnu ṭullāb', english: 'We are students' },
          { arabic: 'هُمْ مِنْ مِصْر', transliteration: 'hum min Miṣr', english: 'They are from Egypt' },
          { arabic: 'أَنْتَ كَبِير', transliteration: 'anta kabīr', english: 'You are big (m)' },
          { arabic: 'أَنْتِ جَمِيلَة', transliteration: 'anti jamīla', english: 'You are beautiful (f)' },
        ],
      },
    ],
  },
  'possessive': {
    title: 'Possessive Pronouns',
    titleArabic: 'ضَمَائِر الْمِلْكِيَّة',
    sections: [
      {
        title: 'How Possession Works in Arabic',
        content: 'Unlike English where possessives come BEFORE nouns ("my book"), Arabic uses SUFFIXES that attach to the END of nouns ("book-my" = كِتَابِي). This is a fundamental difference.',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book (without suffix)' },
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (with ـِي suffix)' },
          { arabic: 'بَيْتُهُ', transliteration: 'baytuhu', english: 'his house (with ـهُ suffix)' },
          { arabic: 'سَيَّارَتُهَا', transliteration: 'sayyāratuhā', english: 'her car (with ـهَا suffix)' },
        ],
      },
      {
        title: 'Singular Possessive Suffixes',
        content: 'Here are the possessive suffixes for "my", "your" (singular), "his", and "her".',
        examples: [
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (ـِي = my)' },
          { arabic: 'كِتَابُكَ', transliteration: 'kitābuka', english: 'your book (m) (ـكَ = your m.)' },
          { arabic: 'كِتَابُكِ', transliteration: 'kitābuki', english: 'your book (f) (ـكِ = your f.)' },
          { arabic: 'كِتَابُهُ', transliteration: 'kitābuhu', english: 'his book (ـهُ = his)' },
          { arabic: 'كِتَابُهَا', transliteration: 'kitābuhā', english: 'her book (ـهَا = her)' },
        ],
      },
      {
        title: 'Plural Possessive Suffixes',
        content: 'Here are the possessive suffixes for "our", "your" (plural), and "their".',
        examples: [
          { arabic: 'كِتَابُنَا', transliteration: 'kitābunā', english: 'our book (ـنَا = our)' },
          { arabic: 'كِتَابُكُمْ', transliteration: 'kitābukum', english: 'your book (pl.) (ـكُمْ = your pl.)' },
          { arabic: 'كِتَابُهُمْ', transliteration: 'kitābuhum', english: 'their book (ـهُمْ = their)' },
        ],
      },
      {
        title: 'Family Members with Possessives',
        content: 'Family terms are very commonly used with possessive suffixes.',
        examples: [
          { arabic: 'أُمِّي', transliteration: 'ummī', english: 'my mother' },
          { arabic: 'أَبِي', transliteration: 'abī', english: 'my father' },
          { arabic: 'أُخْتِي', transliteration: 'ukhtī', english: 'my sister' },
          { arabic: 'أَخِي', transliteration: 'akhī', english: 'my brother' },
        ],
      },
    ],
  },
  'adjectives': {
    title: 'Adjectives',
    titleArabic: 'الصِّفَات',
    sections: [
      {
        title: 'Introduction to Arabic Adjectives',
        content: 'Adjectives in Arabic come AFTER the noun they describe. This is different from English where adjectives come BEFORE the noun.',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (lit: house big)' },
          { arabic: 'كِتَاب جَدِيد', transliteration: 'kitāb jadīd', english: 'a new book (lit: book new)' },
          { arabic: 'سَيَّارَة سَرِيعَة', transliteration: 'sayyāra sarīʿa', english: 'a fast car (lit: car fast)' },
        ],
      },
      {
        title: 'Rule 1: Gender Agreement',
        content: 'Adjectives MUST match the gender of the noun. If the noun is masculine, use the masculine adjective. If the noun is feminine, add ة.',
        examples: [
          { arabic: 'وَلَد طَوِيل', transliteration: 'walad ṭawīl', english: 'a tall boy' },
          { arabic: 'بِنْت طَوِيلَة', transliteration: 'bint ṭawīla', english: 'a tall girl' },
        ],
      },
      {
        title: 'Rule 2: Definiteness Agreement',
        content: 'Adjectives must also match the definiteness of the noun. If the noun has ال, the adjective must ALSO have ال.',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (both indefinite)' },
          { arabic: 'الْبَيْت الْكَبِير', transliteration: 'al-bayt al-kabīr', english: 'the big house (both definite)' },
        ],
      },
      {
        title: 'Common Adjectives',
        content: 'Here are essential adjectives for describing size and quality.',
        examples: [
          { arabic: 'كَبِير / كَبِيرَة', transliteration: 'kabīr / kabīra', english: 'big, large' },
          { arabic: 'صَغِير / صَغِيرَة', transliteration: 'ṣaghīr / ṣaghīra', english: 'small, little' },
          { arabic: 'جَدِيد / جَدِيدَة', transliteration: 'jadīd / jadīda', english: 'new' },
          { arabic: 'قَدِيم / قَدِيمَة', transliteration: 'qadīm / qadīma', english: 'old' },
          { arabic: 'جَمِيل / جَمِيلَة', transliteration: 'jamīl / jamīla', english: 'beautiful' },
        ],
      },
    ],
  },
  'prepositions': {
    title: 'Prepositions',
    titleArabic: 'حُرُوف الْجَرّ',
    sections: [
      {
        title: 'What are Prepositions?',
        content: 'Prepositions show the relationship between nouns. They answer questions like "where?", "when?", "how?", and "with whom?".',
        examples: [
          { arabic: 'الْكِتَاب عَلَى الطَّاوِلَة', transliteration: 'al-kitāb ʿalā aṭ-ṭāwila', english: 'The book is on the table' },
          { arabic: 'أَنَا مِنْ مِصْر', transliteration: 'anā min Miṣr', english: 'I am from Egypt' },
        ],
      },
      {
        title: 'Essential Prepositions',
        content: 'These four prepositions are the most common in Arabic: فِي (in), عَلَى (on), مِنْ (from), إِلَى (to).',
        examples: [
          { arabic: 'أَنَا فِي الْبَيْت', transliteration: 'anā fī al-bayt', english: 'I am in the house' },
          { arabic: 'الْقَلَم عَلَى الْمَكْتَب', transliteration: 'al-qalam ʿalā al-maktab', english: 'The pen is on the desk' },
          { arabic: 'هُوَ مِنْ لُبْنَان', transliteration: 'huwa min Lubnān', english: 'He is from Lebanon' },
          { arabic: 'ذَهَبْتُ إِلَى السُّوق', transliteration: 'dhahabtu ilā as-sūq', english: 'I went to the market' },
        ],
      },
      {
        title: 'Preposition عِنْدَ (to have)',
        content: 'عِنْدَ is commonly used to express possession in Arabic (instead of "have").',
        examples: [
          { arabic: 'عِنْدِي كِتَاب', transliteration: 'ʿindī kitāb', english: 'I have a book' },
          { arabic: 'عِنْدَكَ سَيَّارَة؟', transliteration: 'ʿindaka sayyāra?', english: 'Do you have a car?' },
          { arabic: 'عِنْدَهُ مَال', transliteration: 'ʿindahu māl', english: 'He has money' },
        ],
      },
    ],
  },
  'nominal-sentence': {
    title: 'Nominal Sentences',
    titleArabic: 'الْجُمْلَة الاِسْمِيَّة',
    sections: [
      {
        title: 'What is a Nominal Sentence?',
        content: 'A nominal sentence starts with a NOUN or PRONOUN, not a verb. Arabic does NOT use "is/am/are" in the present tense!',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher' },
          { arabic: 'الْجَوّ حَارّ', transliteration: 'al-jaww ḥārr', english: 'The weather is hot' },
        ],
      },
      {
        title: 'The Two Parts',
        content: 'Every nominal sentence has: الْمُبْتَدَأ (subject) and الْخَبَر (predicate).',
        examples: [
          { arabic: 'الْبَيْتُ كَبِيرٌ', transliteration: 'al-baytu kabīrun', english: 'The house is big' },
          { arabic: 'الطَّالِبَةُ ذَكِيَّةٌ', transliteration: 'aṭ-ṭālibatu dhakiyyatun', english: 'The student (f) is smart' },
        ],
      },
      {
        title: 'Questions',
        content: 'To ask yes/no questions, add هَلْ at the beginning.',
        examples: [
          { arabic: 'هَلْ أَنْتَ طَالِب؟', transliteration: 'hal anta ṭālib?', english: 'Are you a student?' },
          { arabic: 'مَا اسْمُكَ؟', transliteration: 'mā ismuka?', english: 'What is your name?' },
          { arabic: 'أَيْنَ الْمَطْعَم؟', transliteration: 'ayna al-maṭʿam?', english: 'Where is the restaurant?' },
        ],
      },
    ],
  },
  'numbers': {
    title: 'Numbers & Counting',
    titleArabic: 'الأَعْدَاد',
    sections: [
      {
        title: 'Numbers 1-10',
        content: 'The cardinal numbers from one to ten.',
        examples: [
          { arabic: 'وَاحِد', transliteration: 'wāḥid', english: '1 - one' },
          { arabic: 'اِثْنَان', transliteration: 'ithnān', english: '2 - two' },
          { arabic: 'ثَلَاثَة', transliteration: 'thalātha', english: '3 - three' },
          { arabic: 'أَرْبَعَة', transliteration: 'arbaʿa', english: '4 - four' },
          { arabic: 'خَمْسَة', transliteration: 'khamsa', english: '5 - five' },
          { arabic: 'سِتَّة', transliteration: 'sitta', english: '6 - six' },
          { arabic: 'سَبْعَة', transliteration: 'sabʿa', english: '7 - seven' },
          { arabic: 'ثَمَانِيَة', transliteration: 'thamāniya', english: '8 - eight' },
          { arabic: 'تِسْعَة', transliteration: 'tisʿa', english: '9 - nine' },
          { arabic: 'عَشَرَة', transliteration: 'ʿashara', english: '10 - ten' },
        ],
      },
      {
        title: 'Tens (20, 30, 40...)',
        content: 'The tens from 20 to 90.',
        examples: [
          { arabic: 'عِشْرُون', transliteration: 'ʿishrūn', english: '20 - twenty' },
          { arabic: 'ثَلَاثُون', transliteration: 'thalāthūn', english: '30 - thirty' },
          { arabic: 'أَرْبَعُون', transliteration: 'arbaʿūn', english: '40 - forty' },
          { arabic: 'خَمْسُون', transliteration: 'khamsūn', english: '50 - fifty' },
        ],
      },
    ],
  },
};

// Map old lesson IDs to grammar IDs (for backwards compatibility)
export const lessonToGrammarMap: Record<string, string> = {
  'definite-article': 'grammar-3',
  'personal-pronouns': 'grammar-4',
  'gender': 'grammar-5',
  'nominal-sentence': 'grammar-6',
  'possessive': 'grammar-9',
  'prepositions': 'grammar-10',
  'adjectives': 'grammar-11',
  'numbers': 'grammar-12',
};

// Helper function to get grammar ID from lesson ID
export const getGrammarId = (lessonId: string): string => {
  if (lessonId.startsWith('grammar-')) {
    return lessonId;
  }
  return lessonToGrammarMap[lessonId] || lessonId;
};
