import { GrammarLesson } from '../../../types/arabic';

export const verbLessons: GrammarLesson[] = [
  // LESSON 1: Introduction to Arabic Verbs
  {
    id: 'verb-lesson-1',
    title: 'Introduction to Arabic Verbs',
    titleArabic: 'مُقَدِّمَة الأَفْعَال الْعَرَبِيَّة',
    description: 'Learn the foundations: root system, patterns, and basics of Arabic verbs',
    level: 'beginner',
    category: 'verbs',
    order: 1,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'Arabic verbs are built from [[3-letter roots]] called الجذر (al-jadhr). The root carries the core meaning, while patterns and vowels modify it to create different words. This elegant system means once you know a root, you can understand many related words!',
        arabicDescription: 'الْفِعْل هُوَ قَلْب اللُّغَة الْعَرَبِيَّة',
        arabicTranslation: 'The verb is the heart of the Arabic language',
      },

      // Root System Rule
      {
        type: 'rule',
        content: 'Every Arabic verb comes from a [[3-letter root]] (الجذر). These three consonants carry the core meaning. For example, the root [[ك-ت-ب]] (k-t-b) relates to "writing" and produces dozens of related words.',
        arabicDescription: 'كُلُّ فِعْل مِنْ جَذْر ثُلَاثِي',
        arabicTranslation: 'Every verb comes from a 3-letter root',
      },

      // Root Example: ك-ت-ب
      {
        type: 'text',
        content: 'Words from Root ك-ت-ب (writing)',
      },
      {
        type: 'examples_grid',
        content: 'All these words share the same root!',
        examples: [
          { arabic: 'كَتَبَ', english: 'he wrote' },
          { arabic: 'يَكْتُبُ', english: 'he writes' },
          { arabic: 'كِتَاب', english: 'book' },
          { arabic: 'مَكْتَبَة', english: 'library' },
          { arabic: 'كَاتِب', english: 'writer' },
          { arabic: 'مَكْتُوب', english: 'written/letter' },
        ],
      },

      // Root Example: د-ر-س
      {
        type: 'text',
        content: 'Words from Root د-ر-س (studying)',
      },
      {
        type: 'examples_grid',
        content: 'Notice the pattern!',
        examples: [
          { arabic: 'دَرَسَ', english: 'he studied' },
          { arabic: 'يَدْرُسُ', english: 'he studies' },
          { arabic: 'دَرْس', english: 'lesson' },
          { arabic: 'مَدْرَسَة', english: 'school' },
          { arabic: 'مُدَرِّس', english: 'teacher' },
          { arabic: 'دِرَاسَة', english: 'study' },
        ],
      },

      // Basic Verb Structure
      {
        type: 'rule',
        content: 'The basic Arabic verb (Form I) follows the pattern [[فَعَلَ]] (fa-ʿa-la). The letters ف-ع-ل act as placeholders showing where the root letters go. The first root letter replaces ف, the second replaces ع, and the third replaces ل.',
        arabicDescription: 'الْوَزْن الأَسَاسِي: فَعَلَ',
        arabicTranslation: 'The basic pattern: faʿala',
      },

      // Pattern Examples
      {
        type: 'text',
        content: 'How Roots Fill the Pattern',
      },
      {
        type: 'examples_grid',
        content: 'Root + Pattern = Verb',
        examples: [
          { arabic: 'ك-ت-ب → كَتَبَ', english: 'he wrote' },
          { arabic: 'د-ر-س → دَرَسَ', english: 'he studied' },
          { arabic: 'ذ-ه-ب → ذَهَبَ', english: 'he went' },
          { arabic: 'ش-ر-ب → شَرِبَ', english: 'he drank' },
          { arabic: 'ع-ل-م → عَلِمَ', english: 'he knew' },
        ],
      },

      // The 13 Arabic Pronouns
      {
        type: 'rule',
        content: 'Arabic verbs change based on [[who]] does the action. There are [[13 personal pronouns]] covering: person (I, you, he/she, we, they), number (singular, dual, plural), and gender (masculine/feminine).',
        arabicDescription: 'الضَّمَائِر الْعَرَبِيَّة ثَلَاثَةَ عَشَرَ',
        arabicTranslation: 'Arabic pronouns are thirteen',
      },

      // كَتَبَ Past Tense
      {
        type: 'text',
        content: 'كَتَبَ (to write) - Past Tense الماضي',
      },
      {
        type: 'examples_grid',
        content: 'All 13 conjugations',
        examples: [
          { arabic: 'أَنَا كَتَبْتُ', english: 'I wrote' },
          { arabic: 'أَنْتَ كَتَبْتَ', english: 'you wrote (m.)' },
          { arabic: 'أَنْتِ كَتَبْتِ', english: 'you wrote (f.)' },
          { arabic: 'هُوَ كَتَبَ', english: 'he wrote' },
          { arabic: 'هِيَ كَتَبَتْ', english: 'she wrote' },
          { arabic: 'أَنْتُمَا كَتَبْتُمَا', english: 'you two wrote' },
          { arabic: 'هُمَا كَتَبَا', english: 'they two wrote (m.)' },
          { arabic: 'هُمَا كَتَبَتَا', english: 'they two wrote (f.)' },
          { arabic: 'نَحْنُ كَتَبْنَا', english: 'we wrote' },
          { arabic: 'أَنْتُمْ كَتَبْتُمْ', english: 'you all wrote (m.)' },
          { arabic: 'أَنْتُنَّ كَتَبْتُنَّ', english: 'you all wrote (f.)' },
          { arabic: 'هُمْ كَتَبُوا', english: 'they wrote (m.)' },
          { arabic: 'هُنَّ كَتَبْنَ', english: 'they wrote (f.)' },
        ],
      },

      // كَتَبَ Present Tense
      {
        type: 'text',
        content: 'يَكْتُبُ (to write) - Present Tense المضارع',
      },
      {
        type: 'examples_grid',
        content: 'All 13 conjugations',
        examples: [
          { arabic: 'أَنَا أَكْتُبُ', english: 'I write' },
          { arabic: 'أَنْتَ تَكْتُبُ', english: 'you write (m.)' },
          { arabic: 'أَنْتِ تَكْتُبِينَ', english: 'you write (f.)' },
          { arabic: 'هُوَ يَكْتُبُ', english: 'he writes' },
          { arabic: 'هِيَ تَكْتُبُ', english: 'she writes' },
          { arabic: 'أَنْتُمَا تَكْتُبَانِ', english: 'you two write' },
          { arabic: 'هُمَا يَكْتُبَانِ', english: 'they two write (m.)' },
          { arabic: 'هُمَا تَكْتُبَانِ', english: 'they two write (f.)' },
          { arabic: 'نَحْنُ نَكْتُبُ', english: 'we write' },
          { arabic: 'أَنْتُمْ تَكْتُبُونَ', english: 'you all write (m.)' },
          { arabic: 'أَنْتُنَّ تَكْتُبْنَ', english: 'you all write (f.)' },
          { arabic: 'هُمْ يَكْتُبُونَ', english: 'they write (m.)' },
          { arabic: 'هُنَّ يَكْتُبْنَ', english: 'they write (f.)' },
        ],
      },

      // ذَهَبَ Past Tense
      {
        type: 'text',
        content: 'ذَهَبَ (to go) - Past Tense الماضي',
      },
      {
        type: 'examples_grid',
        content: 'All 13 conjugations',
        examples: [
          { arabic: 'أَنَا ذَهَبْتُ', english: 'I went' },
          { arabic: 'أَنْتَ ذَهَبْتَ', english: 'you went (m.)' },
          { arabic: 'أَنْتِ ذَهَبْتِ', english: 'you went (f.)' },
          { arabic: 'هُوَ ذَهَبَ', english: 'he went' },
          { arabic: 'هِيَ ذَهَبَتْ', english: 'she went' },
          { arabic: 'أَنْتُمَا ذَهَبْتُمَا', english: 'you two went' },
          { arabic: 'هُمَا ذَهَبَا', english: 'they two went (m.)' },
          { arabic: 'هُمَا ذَهَبَتَا', english: 'they two went (f.)' },
          { arabic: 'نَحْنُ ذَهَبْنَا', english: 'we went' },
          { arabic: 'أَنْتُمْ ذَهَبْتُمْ', english: 'you all went (m.)' },
          { arabic: 'أَنْتُنَّ ذَهَبْتُنَّ', english: 'you all went (f.)' },
          { arabic: 'هُمْ ذَهَبُوا', english: 'they went (m.)' },
          { arabic: 'هُنَّ ذَهَبْنَ', english: 'they went (f.)' },
        ],
      },

      // ذَهَبَ Present Tense
      {
        type: 'text',
        content: 'يَذْهَبُ (to go) - Present Tense المضارع',
      },
      {
        type: 'examples_grid',
        content: 'All 13 conjugations',
        examples: [
          { arabic: 'أَنَا أَذْهَبُ', english: 'I go' },
          { arabic: 'أَنْتَ تَذْهَبُ', english: 'you go (m.)' },
          { arabic: 'أَنْتِ تَذْهَبِينَ', english: 'you go (f.)' },
          { arabic: 'هُوَ يَذْهَبُ', english: 'he goes' },
          { arabic: 'هِيَ تَذْهَبُ', english: 'she goes' },
          { arabic: 'أَنْتُمَا تَذْهَبَانِ', english: 'you two go' },
          { arabic: 'هُمَا يَذْهَبَانِ', english: 'they two go (m.)' },
          { arabic: 'هُمَا تَذْهَبَانِ', english: 'they two go (f.)' },
          { arabic: 'نَحْنُ نَذْهَبُ', english: 'we go' },
          { arabic: 'أَنْتُمْ تَذْهَبُونَ', english: 'you all go (m.)' },
          { arabic: 'أَنْتُنَّ تَذْهَبْنَ', english: 'you all go (f.)' },
          { arabic: 'هُمْ يَذْهَبُونَ', english: 'they go (m.)' },
          { arabic: 'هُنَّ يَذْهَبْنَ', english: 'they go (f.)' },
        ],
      },

      // Quick Reference
      {
        type: 'note',
        content: 'Don\'t be overwhelmed by 13 forms! Start with the most common 6: [[أنا]] (I), [[أنتَ/أنتِ]] (you m./f.), [[هو/هي]] (he/she), [[نحن]] (we). These cover 90% of everyday conversations.',
        arabicDescription: 'اِبْدَأ بِالضَّمَائِر الأَسَاسِيَّة السِّتَّة',
        arabicTranslation: 'Start with the six basic pronouns',
      },

      // Common Beginner Verbs
      {
        type: 'text',
        content: 'Essential Beginner Verbs',
      },
      {
        type: 'examples_grid',
        content: 'Learn these common verbs first',
        examples: [
          { arabic: 'كَتَبَ', english: 'to write' },
          { arabic: 'قَرَأَ', english: 'to read' },
          { arabic: 'ذَهَبَ', english: 'to go' },
          { arabic: 'جَلَسَ', english: 'to sit' },
          { arabic: 'أَكَلَ', english: 'to eat' },
          { arabic: 'شَرِبَ', english: 'to drink' },
          { arabic: 'فَتَحَ', english: 'to open' },
          { arabic: 'نَامَ', english: 'to sleep' },
        ],
      },
    ],
  },

  // LESSON 2: Past Tense Patterns
  {
    id: 'verb-lesson-2',
    title: 'Past Tense (الماضي)',
    titleArabic: 'الْفِعْل الْمَاضِي',
    description: 'Master past tense conjugation - add suffixes to describe completed actions',
    level: 'beginner',
    category: 'verbs',
    order: 2,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'The past tense (الماضي) describes actions that have been [[completed]]. It\'s the simplest tense to learn because you only add [[suffixes]] (endings) to the base form. The base form (3rd person masculine singular) is the "dictionary form" of the verb.',
        arabicDescription: 'الْمَاضِي يَدُلُّ عَلَى حَدَث انْتَهَى',
        arabicTranslation: 'The past indicates an action that has finished',
      },

      // Key Rule
      {
        type: 'rule',
        content: 'To conjugate past tense verbs, start with the base form (e.g., [[كَتَبَ]]) and add the appropriate [[suffix]] based on who performed the action. The root letters stay the same - only the endings change!',
        arabicDescription: 'نُضِيف لَوَاحِق لِآخِر الْفِعْل',
        arabicTranslation: 'We add suffixes to the end of the verb',
      },

      // COMPLETE Past Tense - كَتَبَ
      {
        type: 'text',
        content: 'Complete Past Tense Conjugation: كَتَبَ (to write)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - الماضي',
        examples: [
          { arabic: 'أَنَا كَتَبْتُ', english: 'I wrote' },
          { arabic: 'أَنْتَ كَتَبْتَ', english: 'you wrote (m.)' },
          { arabic: 'أَنْتِ كَتَبْتِ', english: 'you wrote (f.)' },
          { arabic: 'هُوَ كَتَبَ', english: 'he wrote' },
          { arabic: 'هِيَ كَتَبَتْ', english: 'she wrote' },
          { arabic: 'أَنْتُمَا كَتَبْتُمَا', english: 'you two wrote' },
          { arabic: 'هُمَا كَتَبَا', english: 'they two wrote (m.)' },
          { arabic: 'هُمَا كَتَبَتَا', english: 'they two wrote (f.)' },
          { arabic: 'نَحْنُ كَتَبْنَا', english: 'we wrote' },
          { arabic: 'أَنْتُمْ كَتَبْتُمْ', english: 'you all wrote (m.)' },
          { arabic: 'أَنْتُنَّ كَتَبْتُنَّ', english: 'you all wrote (f.)' },
          { arabic: 'هُمْ كَتَبُوا', english: 'they wrote (m.)' },
          { arabic: 'هُنَّ كَتَبْنَ', english: 'they wrote (f.)' },
        ],
      },

      // Suffix Pattern Note
      {
        type: 'note',
        content: 'Notice the pattern: "I/you" forms use [[ت]] with different endings. [[هو]] has no suffix (base form). [[هي]] adds [[ت]] with sukun. [[هم]] adds [[وا]]. [[نحن]] adds [[نا]].',
        arabicDescription: 'لَاحِظ نَمَط اللَّوَاحِق',
        arabicTranslation: 'Notice the suffix pattern',
      },

      // COMPLETE Past Tense - ذَهَبَ
      {
        type: 'text',
        content: 'Complete Past Tense Conjugation: ذَهَبَ (to go)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - الماضي',
        examples: [
          { arabic: 'أَنَا ذَهَبْتُ', english: 'I went' },
          { arabic: 'أَنْتَ ذَهَبْتَ', english: 'you went (m.)' },
          { arabic: 'أَنْتِ ذَهَبْتِ', english: 'you went (f.)' },
          { arabic: 'هُوَ ذَهَبَ', english: 'he went' },
          { arabic: 'هِيَ ذَهَبَتْ', english: 'she went' },
          { arabic: 'أَنْتُمَا ذَهَبْتُمَا', english: 'you two went' },
          { arabic: 'هُمَا ذَهَبَا', english: 'they two went (m.)' },
          { arabic: 'هُمَا ذَهَبَتَا', english: 'they two went (f.)' },
          { arabic: 'نَحْنُ ذَهَبْنَا', english: 'we went' },
          { arabic: 'أَنْتُمْ ذَهَبْتُمْ', english: 'you all went (m.)' },
          { arabic: 'أَنْتُنَّ ذَهَبْتُنَّ', english: 'you all went (f.)' },
          { arabic: 'هُمْ ذَهَبُوا', english: 'they went (m.)' },
          { arabic: 'هُنَّ ذَهَبْنَ', english: 'they went (f.)' },
        ],
      },

      // COMPLETE Past Tense - دَرَسَ
      {
        type: 'text',
        content: 'Complete Past Tense Conjugation: دَرَسَ (to study)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - الماضي',
        examples: [
          { arabic: 'أَنَا دَرَسْتُ', english: 'I studied' },
          { arabic: 'أَنْتَ دَرَسْتَ', english: 'you studied (m.)' },
          { arabic: 'أَنْتِ دَرَسْتِ', english: 'you studied (f.)' },
          { arabic: 'هُوَ دَرَسَ', english: 'he studied' },
          { arabic: 'هِيَ دَرَسَتْ', english: 'she studied' },
          { arabic: 'أَنْتُمَا دَرَسْتُمَا', english: 'you two studied' },
          { arabic: 'هُمَا دَرَسَا', english: 'they two studied (m.)' },
          { arabic: 'هُمَا دَرَسَتَا', english: 'they two studied (f.)' },
          { arabic: 'نَحْنُ دَرَسْنَا', english: 'we studied' },
          { arabic: 'أَنْتُمْ دَرَسْتُمْ', english: 'you all studied (m.)' },
          { arabic: 'أَنْتُنَّ دَرَسْتُنَّ', english: 'you all studied (f.)' },
          { arabic: 'هُمْ دَرَسُوا', english: 'they studied (m.)' },
          { arabic: 'هُنَّ دَرَسْنَ', english: 'they studied (f.)' },
        ],
      },

      // Sentences
      {
        type: 'text',
        content: 'Past Tense in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Real examples with different pronouns',
        examples: [
          { arabic: 'كَتَبْتُ رِسَالَةً', english: 'I wrote a letter' },
          { arabic: 'دَرَسْتَ جَيِّدًا', english: 'You (m.) studied well' },
          { arabic: 'ذَهَبَتْ إِلَى السُّوق', english: 'She went to the market' },
          { arabic: 'أَكَلْنَا الطَّعَام', english: 'We ate the food' },
          { arabic: 'كَتَبُوا الْوَاجِب', english: 'They (m.) wrote the homework' },
          { arabic: 'ذَهَبْنَ إِلَى الْمَدْرَسَة', english: 'They (f.) went to school' },
        ],
      },

      // Memory Tip
      {
        type: 'note',
        content: 'Memory trick: The suffix [[تُ]] for "I" sounds like "too" - "I did it [[too]]!" The suffix [[وا]] for "they (m.)" has a و like the و in هُم.',
        arabicDescription: 'حِيلَة لِلتَّذَكُّر',
        arabicTranslation: 'Memory trick',
      },
    ],
  },

  // LESSON 3: Present Tense Patterns
  {
    id: 'verb-lesson-3',
    title: 'Present Tense (المضارع)',
    titleArabic: 'الْفِعْل الْمُضَارِع',
    description: 'Learn present tense conjugation - prefixes and suffixes for ongoing actions',
    level: 'beginner',
    category: 'verbs',
    order: 3,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'The present tense (المضارع) describes actions happening [[now]] or [[habitually]]. Unlike past tense which only uses suffixes, present tense uses both [[prefixes]] (beginnings) AND [[suffixes]] (endings). The prefix tells you the person; the suffix adds more detail.',
        arabicDescription: 'الْمُضَارِع يَدُلُّ عَلَى الْحَاضِر وَالْمُسْتَمِر',
        arabicTranslation: 'The present indicates current and ongoing actions',
      },

      // Key Rule
      {
        type: 'rule',
        content: 'Present tense verbs start with one of four prefix letters: [[أ]] (I), [[ت]] (you/she), [[ي]] (he/they), [[ن]] (we). Remember them with the word [[أَنَيْتُ]] - these are the four letters!',
        arabicDescription: 'حُرُوف الْمُضَارَعَة: أَنَيْتُ',
        arabicTranslation: 'Present tense letters: anaytu',
      },

      // Prefix Letters Grid
      {
        type: 'letters_grid',
        content: 'The 4 Present Tense Prefixes',
        letters: ['أ', 'ن', 'ي', 'ت'],
        letterType: 'moon',
      },

      // COMPLETE Present Tense - يَكْتُبُ
      {
        type: 'text',
        content: 'Complete Present Tense Conjugation: يَكْتُبُ (to write)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - المضارع',
        examples: [
          { arabic: 'أَنَا أَكْتُبُ', english: 'I write' },
          { arabic: 'أَنْتَ تَكْتُبُ', english: 'you write (m.)' },
          { arabic: 'أَنْتِ تَكْتُبِينَ', english: 'you write (f.)' },
          { arabic: 'هُوَ يَكْتُبُ', english: 'he writes' },
          { arabic: 'هِيَ تَكْتُبُ', english: 'she writes' },
          { arabic: 'أَنْتُمَا تَكْتُبَانِ', english: 'you two write' },
          { arabic: 'هُمَا يَكْتُبَانِ', english: 'they two write (m.)' },
          { arabic: 'هُمَا تَكْتُبَانِ', english: 'they two write (f.)' },
          { arabic: 'نَحْنُ نَكْتُبُ', english: 'we write' },
          { arabic: 'أَنْتُمْ تَكْتُبُونَ', english: 'you all write (m.)' },
          { arabic: 'أَنْتُنَّ تَكْتُبْنَ', english: 'you all write (f.)' },
          { arabic: 'هُمْ يَكْتُبُونَ', english: 'they write (m.)' },
          { arabic: 'هُنَّ يَكْتُبْنَ', english: 'they write (f.)' },
        ],
      },

      // Pattern Note
      {
        type: 'note',
        content: 'Notice: [[أَنْتَ]] (you m.) and [[هِيَ]] (she) have the exact same form: تَكْتُبُ. Context tells you which is meant. [[أَنْتِ]] (you f.) adds [[ينَ]] at the end. Plural/dual forms add [[ونَ]], [[انِ]], or [[نَ]].',
        arabicDescription: 'أَنْتَ وَهِيَ لَهُمَا نَفْس الصِّيغَة',
        arabicTranslation: '"You (m.)" and "she" have the same form',
      },

      // COMPLETE Present Tense - يَذْهَبُ
      {
        type: 'text',
        content: 'Complete Present Tense Conjugation: يَذْهَبُ (to go)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - المضارع',
        examples: [
          { arabic: 'أَنَا أَذْهَبُ', english: 'I go' },
          { arabic: 'أَنْتَ تَذْهَبُ', english: 'you go (m.)' },
          { arabic: 'أَنْتِ تَذْهَبِينَ', english: 'you go (f.)' },
          { arabic: 'هُوَ يَذْهَبُ', english: 'he goes' },
          { arabic: 'هِيَ تَذْهَبُ', english: 'she goes' },
          { arabic: 'أَنْتُمَا تَذْهَبَانِ', english: 'you two go' },
          { arabic: 'هُمَا يَذْهَبَانِ', english: 'they two go (m.)' },
          { arabic: 'هُمَا تَذْهَبَانِ', english: 'they two go (f.)' },
          { arabic: 'نَحْنُ نَذْهَبُ', english: 'we go' },
          { arabic: 'أَنْتُمْ تَذْهَبُونَ', english: 'you all go (m.)' },
          { arabic: 'أَنْتُنَّ تَذْهَبْنَ', english: 'you all go (f.)' },
          { arabic: 'هُمْ يَذْهَبُونَ', english: 'they go (m.)' },
          { arabic: 'هُنَّ يَذْهَبْنَ', english: 'they go (f.)' },
        ],
      },

      // COMPLETE Present Tense - يَدْرُسُ
      {
        type: 'text',
        content: 'Complete Present Tense Conjugation: يَدْرُسُ (to study)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - المضارع',
        examples: [
          { arabic: 'أَنَا أَدْرُسُ', english: 'I study' },
          { arabic: 'أَنْتَ تَدْرُسُ', english: 'you study (m.)' },
          { arabic: 'أَنْتِ تَدْرُسِينَ', english: 'you study (f.)' },
          { arabic: 'هُوَ يَدْرُسُ', english: 'he studies' },
          { arabic: 'هِيَ تَدْرُسُ', english: 'she studies' },
          { arabic: 'أَنْتُمَا تَدْرُسَانِ', english: 'you two study' },
          { arabic: 'هُمَا يَدْرُسَانِ', english: 'they two study (m.)' },
          { arabic: 'هُمَا تَدْرُسَانِ', english: 'they two study (f.)' },
          { arabic: 'نَحْنُ نَدْرُسُ', english: 'we study' },
          { arabic: 'أَنْتُمْ تَدْرُسُونَ', english: 'you all study (m.)' },
          { arabic: 'أَنْتُنَّ تَدْرُسْنَ', english: 'you all study (f.)' },
          { arabic: 'هُمْ يَدْرُسُونَ', english: 'they study (m.)' },
          { arabic: 'هُنَّ يَدْرُسْنَ', english: 'they study (f.)' },
        ],
      },

      // Vowel Patterns
      {
        type: 'rule',
        content: 'The middle vowel of the present tense can vary by verb. Most common patterns: [[يَفْعُلُ]] (ya-fʿu-lu), [[يَفْعِلُ]] (ya-fʿi-lu), and [[يَفْعَلُ]] (ya-fʿa-lu). You\'ll learn which pattern each verb uses.',
        arabicDescription: 'الْحَرَكَة الْوُسْطَى تَتَغَيَّر',
        arabicTranslation: 'The middle vowel varies',
      },

      // Sentences
      {
        type: 'text',
        content: 'Present Tense in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Real examples with different pronouns',
        examples: [
          { arabic: 'أَكْتُبُ رِسَالَةً', english: 'I write a letter' },
          { arabic: 'تَدْرُسِينَ الْعَرَبِيَّة', english: 'You (f.) study Arabic' },
          { arabic: 'يَذْهَبُ إِلَى الْعَمَل', english: 'He goes to work' },
          { arabic: 'نَأْكُلُ الْفُطُور', english: 'We eat breakfast' },
          { arabic: 'يَكْتُبُونَ الدَّرْس', english: 'They (m.) write the lesson' },
          { arabic: 'تَذْهَبَانِ مَعًا', english: 'You two go together' },
        ],
      },

      // Memory Tip
      {
        type: 'note',
        content: 'Quick summary: [[أ]] = I, [[نَ]] = we, [[تَ]] = you/she, [[يَ]] = he/they (m.). Remember: ي is for masculine 3rd person (he/they m.).',
        arabicDescription: 'خُلَاصَة الضَّمَائِر',
        arabicTranslation: 'Summary of pronouns',
      },
    ],
  },

  // LESSON 4: Future Tense
  {
    id: 'verb-lesson-4',
    title: 'Future Tense (المستقبل)',
    titleArabic: 'الْفِعْل الْمُسْتَقْبَل',
    description: 'Express future actions by adding سـ or سوف to present tense verbs',
    level: 'beginner',
    category: 'verbs',
    order: 4,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'Good news! The future tense in Arabic is easy. Just take the [[present tense]] verb and add [[سَـ]] (sa) or [[سَوْفَ]] (sawfa) before it. That\'s it! The verb conjugation stays exactly the same as present tense.',
        arabicDescription: 'الْمُسْتَقْبَل = سَـ أَوْ سَوْفَ + الْمُضَارِع',
        arabicTranslation: 'Future = sa or sawfa + present',
      },

      // Key Rule - سَـ
      {
        type: 'rule',
        content: '[[سَـ]] (sa) indicates [[near future]] - something that will happen soon. It attaches directly to the verb as a prefix. [[سَوْفَ]] (sawfa) indicates [[distant future]] or adds emphasis. It\'s a separate word.',
        arabicDescription: 'سَـ لِلْقَرِيب، سَوْفَ لِلْبَعِيد',
        arabicTranslation: 'Sa for near, sawfa for distant',
      },

      // COMPLETE Future Tense with سَـ - يَكْتُبُ
      {
        type: 'text',
        content: 'Complete Future Tense with سَـ: يَكْتُبُ (to write)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - المستقبل',
        examples: [
          { arabic: 'أَنَا سَأَكْتُبُ', english: 'I will write' },
          { arabic: 'أَنْتَ سَتَكْتُبُ', english: 'you will write (m.)' },
          { arabic: 'أَنْتِ سَتَكْتُبِينَ', english: 'you will write (f.)' },
          { arabic: 'هُوَ سَيَكْتُبُ', english: 'he will write' },
          { arabic: 'هِيَ سَتَكْتُبُ', english: 'she will write' },
          { arabic: 'أَنْتُمَا سَتَكْتُبَانِ', english: 'you two will write' },
          { arabic: 'هُمَا سَيَكْتُبَانِ', english: 'they two will write (m.)' },
          { arabic: 'هُمَا سَتَكْتُبَانِ', english: 'they two will write (f.)' },
          { arabic: 'نَحْنُ سَنَكْتُبُ', english: 'we will write' },
          { arabic: 'أَنْتُمْ سَتَكْتُبُونَ', english: 'you all will write (m.)' },
          { arabic: 'أَنْتُنَّ سَتَكْتُبْنَ', english: 'you all will write (f.)' },
          { arabic: 'هُمْ سَيَكْتُبُونَ', english: 'they will write (m.)' },
          { arabic: 'هُنَّ سَيَكْتُبْنَ', english: 'they will write (f.)' },
        ],
      },

      // COMPLETE Future Tense with سَـ - يَذْهَبُ
      {
        type: 'text',
        content: 'Complete Future Tense with سَـ: يَذْهَبُ (to go)',
      },
      {
        type: 'examples_grid',
        content: 'All 13 Forms - المستقبل',
        examples: [
          { arabic: 'أَنَا سَأَذْهَبُ', english: 'I will go' },
          { arabic: 'أَنْتَ سَتَذْهَبُ', english: 'you will go (m.)' },
          { arabic: 'أَنْتِ سَتَذْهَبِينَ', english: 'you will go (f.)' },
          { arabic: 'هُوَ سَيَذْهَبُ', english: 'he will go' },
          { arabic: 'هِيَ سَتَذْهَبُ', english: 'she will go' },
          { arabic: 'أَنْتُمَا سَتَذْهَبَانِ', english: 'you two will go' },
          { arabic: 'هُمَا سَيَذْهَبَانِ', english: 'they two will go (m.)' },
          { arabic: 'هُمَا سَتَذْهَبَانِ', english: 'they two will go (f.)' },
          { arabic: 'نَحْنُ سَنَذْهَبُ', english: 'we will go' },
          { arabic: 'أَنْتُمْ سَتَذْهَبُونَ', english: 'you all will go (m.)' },
          { arabic: 'أَنْتُنَّ سَتَذْهَبْنَ', english: 'you all will go (f.)' },
          { arabic: 'هُمْ سَيَذْهَبُونَ', english: 'they will go (m.)' },
          { arabic: 'هُنَّ سَيَذْهَبْنَ', english: 'they will go (f.)' },
        ],
      },

      // Comparison سَـ vs سَوْفَ
      {
        type: 'comparison_grid',
        content: 'سَـ vs سَوْفَ',
        leftLabel: 'سَـ (Soon)',
        rightLabel: 'سَوْفَ (Later/Emphatic)',
        comparisons: [
          { left: { arabic: 'سَأَكْتُبُ', label: 'I\'ll write (soon)' }, right: { arabic: 'سَوْفَ أَكْتُبُ', label: 'I shall write' } },
          { left: { arabic: 'سَيَذْهَبُ', label: 'He\'ll go (soon)' }, right: { arabic: 'سَوْفَ يَذْهَبُ', label: 'He shall go' } },
          { left: { arabic: 'سَنَدْرُسُ', label: 'We\'ll study (soon)' }, right: { arabic: 'سَوْفَ نَدْرُسُ', label: 'We shall study' } },
        ],
      },

      // سَوْفَ Examples
      {
        type: 'text',
        content: 'Examples with سَوْفَ (All Pronouns)',
      },
      {
        type: 'examples_grid',
        content: 'Distant/emphatic future',
        examples: [
          { arabic: 'سَوْفَ أَنْجَحُ', english: 'I shall succeed' },
          { arabic: 'سَوْفَ تَفْهَمُ', english: 'You (m.) will understand' },
          { arabic: 'سَوْفَ تَتَعَلَّمِينَ', english: 'You (f.) will learn' },
          { arabic: 'سَوْفَ يَعُودُ', english: 'He will return' },
          { arabic: 'سَوْفَ نَلْتَقِي', english: 'We shall meet' },
          { arabic: 'سَوْفَ يَنْتَصِرُونَ', english: 'They (m.) will win' },
        ],
      },

      // Sentences
      {
        type: 'text',
        content: 'Future Tense in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Real examples with different pronouns',
        examples: [
          { arabic: 'سَأَدْرُسُ غَدًا', english: 'I will study tomorrow' },
          { arabic: 'سَتَذْهَبِينَ إِلَى السُّوق', english: 'You (f.) will go to the market' },
          { arabic: 'سَيَكْتُبُ الرِّسَالَة', english: 'He will write the letter' },
          { arabic: 'سَنَأْكُلُ مَعًا', english: 'We will eat together' },
          { arabic: 'سَيَدْرُسُونَ الْعَرَبِيَّة', english: 'They (m.) will study Arabic' },
          { arabic: 'سَوْفَ أَزُورُكَ', english: 'I shall visit you' },
        ],
      },

      // Time Words
      {
        type: 'text',
        content: 'Common Future Time Words',
      },
      {
        type: 'examples_grid',
        content: 'Use these with future tense',
        examples: [
          { arabic: 'غَدًا', english: 'tomorrow' },
          { arabic: 'بَعْد غَدٍ', english: 'day after tomorrow' },
          { arabic: 'الأُسْبُوع الْقَادِم', english: 'next week' },
          { arabic: 'الشَّهْر الْقَادِم', english: 'next month' },
          { arabic: 'السَّنَة الْقَادِمَة', english: 'next year' },
          { arabic: 'قَرِيبًا', english: 'soon' },
        ],
      },

      // Usage Note
      {
        type: 'note',
        content: 'In modern spoken Arabic, [[سَـ]] is used much more often than سَوْفَ. For formal or written Arabic, both are common. Remember: future = سَـ/سَوْفَ + present tense (no changes to the verb itself!).',
        arabicDescription: 'سَـ أَكْثَر شُيُوعًا فِي الْكَلَام الْيَوْمِي',
        arabicTranslation: 'Sa is more common in everyday speech',
      },
    ],
  },

  // LESSON 5: Imperative/Commands
  {
    id: 'verb-lesson-5',
    title: 'Commands (الأمر)',
    titleArabic: 'فِعْل الأَمْر',
    description: 'Learn to form imperatives - give commands and instructions in Arabic',
    level: 'intermediate',
    category: 'verbs',
    order: 5,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'The imperative (الأمر) is used to give [[commands]], [[instructions]], or [[requests]]. Commands are only given to "you" (2nd person), so there are only 5 forms: masculine singular, feminine singular, dual, masculine plural, and feminine plural.',
        arabicDescription: 'الأَمْر يُسْتَخْدَم لِلطَّلَب',
        arabicTranslation: 'The imperative is used for requests',
      },

      // Formation Rule
      {
        type: 'rule',
        content: 'To form the imperative: 1) Take the present tense "you" form, 2) Remove the prefix تَـ, 3) If needed, add [[اِ]] (alif with kasra) or [[اُ]] (alif with damma) at the beginning to make it pronounceable.',
        arabicDescription: 'اِحْذِف تَاء الْمُضَارَعَة وَأَضِف هَمْزَة الْوَصْل',
        arabicTranslation: 'Remove the present tense ta and add hamzat al-wasl',
      },

      // Complete Imperative - كَتَبَ
      {
        type: 'text',
        content: 'Complete Imperative Forms: اُكْتُبْ (Write!)',
      },
      {
        type: 'examples_grid',
        content: 'All 5 Command Forms',
        examples: [
          { arabic: 'أَنْتَ اُكْتُبْ', english: 'Write! (to one male)' },
          { arabic: 'أَنْتِ اُكْتُبِي', english: 'Write! (to one female)' },
          { arabic: 'أَنْتُمَا اُكْتُبَا', english: 'Write! (to two people)' },
          { arabic: 'أَنْتُمْ اُكْتُبُوا', english: 'Write! (to males/mixed)' },
          { arabic: 'أَنْتُنَّ اُكْتُبْنَ', english: 'Write! (to females)' },
        ],
      },

      // Complete Imperative - ذَهَبَ
      {
        type: 'text',
        content: 'Complete Imperative Forms: اِذْهَبْ (Go!)',
      },
      {
        type: 'examples_grid',
        content: 'All 5 Command Forms',
        examples: [
          { arabic: 'أَنْتَ اِذْهَبْ', english: 'Go! (to one male)' },
          { arabic: 'أَنْتِ اِذْهَبِي', english: 'Go! (to one female)' },
          { arabic: 'أَنْتُمَا اِذْهَبَا', english: 'Go! (to two people)' },
          { arabic: 'أَنْتُمْ اِذْهَبُوا', english: 'Go! (to males/mixed)' },
          { arabic: 'أَنْتُنَّ اِذْهَبْنَ', english: 'Go! (to females)' },
        ],
      },

      // Complete Imperative - جَلَسَ
      {
        type: 'text',
        content: 'Complete Imperative Forms: اِجْلِسْ (Sit!)',
      },
      {
        type: 'examples_grid',
        content: 'All 5 Command Forms',
        examples: [
          { arabic: 'أَنْتَ اِجْلِسْ', english: 'Sit! (to one male)' },
          { arabic: 'أَنْتِ اِجْلِسِي', english: 'Sit! (to one female)' },
          { arabic: 'أَنْتُمَا اِجْلِسَا', english: 'Sit! (to two people)' },
          { arabic: 'أَنْتُمْ اِجْلِسُوا', english: 'Sit! (to males/mixed)' },
          { arabic: 'أَنْتُنَّ اِجْلِسْنَ', english: 'Sit! (to females)' },
        ],
      },

      // Hamza Rule
      {
        type: 'rule',
        content: 'The initial hamza takes [[kasra]] (اِ) if the middle vowel of the present is fatha or kasra. It takes [[damma]] (اُ) if the middle vowel is damma. يَكْتُ[[بُ]] → اُكْتُبْ, يَجْلِ[[سُ]] → اِجْلِسْ.',
        arabicDescription: 'الْهَمْزَة تَتْبَع حَرَكَة عَيْن الْفِعْل',
        arabicTranslation: 'The hamza follows the vowel of the middle letter',
      },

      // Common Commands
      {
        type: 'text',
        content: 'Common Commands (All 5 Forms)',
      },
      {
        type: 'examples_grid',
        content: 'Essential commands to know',
        examples: [
          { arabic: 'اُكْتُبْ / اُكْتُبِي / اُكْتُبُوا', english: 'Write! (m./f./pl.)' },
          { arabic: 'اِقْرَأْ / اِقْرَئِي / اِقْرَأُوا', english: 'Read! (m./f./pl.)' },
          { arabic: 'اِذْهَبْ / اِذْهَبِي / اِذْهَبُوا', english: 'Go! (m./f./pl.)' },
          { arabic: 'اِجْلِسْ / اِجْلِسِي / اِجْلِسُوا', english: 'Sit! (m./f./pl.)' },
          { arabic: 'اِفْتَحْ / اِفْتَحِي / اِفْتَحُوا', english: 'Open! (m./f./pl.)' },
          { arabic: 'اِسْمَعْ / اِسْمَعِي / اِسْمَعُوا', english: 'Listen! (m./f./pl.)' },
        ],
      },

      // Polite Commands
      {
        type: 'note',
        content: 'To make commands more polite, add [[مِنْ فَضْلِكَ]] (please, to male), [[مِنْ فَضْلِكِ]] (please, to female), or [[مِنْ فَضْلِكُمْ]] (please, to plural) after the command.',
        arabicDescription: 'أَضِف "مِنْ فَضْلِكَ" لِلتَّأَدُّب',
        arabicTranslation: 'Add "min fadlik" to be polite',
      },

      // Polite Examples
      {
        type: 'examples_grid',
        content: 'Polite commands',
        examples: [
          { arabic: 'اِجْلِسْ مِنْ فَضْلِكَ', english: 'Please sit (to male)' },
          { arabic: 'اِجْلِسِي مِنْ فَضْلِكِ', english: 'Please sit (to female)' },
          { arabic: 'اِفْتَحُوا الْكِتَاب', english: 'Open the book (to group)' },
          { arabic: 'اُكْتُبِي اسْمَكِ', english: 'Write your name (to female)' },
        ],
      },

      // Negative Commands
      {
        type: 'rule',
        content: 'For negative commands (prohibitions), use [[لَا]] + present tense (jussive mood). The verb stays in present tense form, not imperative. Example: [[لَا تَكْتُبْ]] = "Don\'t write!"',
        arabicDescription: 'النَّهْي = لَا + الْمُضَارِع الْمَجْزُوم',
        arabicTranslation: 'Prohibition = la + jussive present',
      },

      // Negative Command
      {
        type: 'text',
        content: 'Negative Commands: لَا تَكْتُبْ (Don\'t write!)',
      },
      {
        type: 'examples_grid',
        content: 'All 5 Prohibition Forms',
        examples: [
          { arabic: 'أَنْتَ لَا تَكْتُبْ', english: 'Don\'t write! (to male)' },
          { arabic: 'أَنْتِ لَا تَكْتُبِي', english: 'Don\'t write! (to female)' },
          { arabic: 'أَنْتُمَا لَا تَكْتُبَا', english: 'Don\'t write! (to two)' },
          { arabic: 'أَنْتُمْ لَا تَكْتُبُوا', english: 'Don\'t write! (to males)' },
          { arabic: 'أَنْتُنَّ لَا تَكْتُبْنَ', english: 'Don\'t write! (to females)' },
        ],
      },
    ],
  },

  // LESSON 6: Verb Forms Overview
  {
    id: 'verb-lesson-6',
    title: 'Arabic Verb Forms (I-X)',
    titleArabic: 'أَوْزَان الْفِعْل الْعَرَبِي',
    description: 'Discover how Arabic creates related verbs using ten different forms',
    level: 'intermediate',
    category: 'verbs',
    order: 6,
    exercises: [],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'Arabic has [[10 verb forms]] (أوزان) that modify the 3-letter root to create related meanings. Form I is the basic verb; Forms II-X add letters or double consonants to change the meaning in predictable ways. This is one of Arabic\'s most elegant features!',
        arabicDescription: 'لِلْفِعْل الْعَرَبِي عَشَرَة أَوْزَان',
        arabicTranslation: 'The Arabic verb has ten forms',
      },

      // Why Forms Matter
      {
        type: 'rule',
        content: 'Each form has a general meaning tendency. [[Form II]] often means "to cause to do" (causative). [[Form V]] often means "to do to oneself" (reflexive). Learning forms helps you guess meanings of new words!',
        arabicDescription: 'كُلُّ وَزْن لَهُ مَعْنَى عَام',
        arabicTranslation: 'Each form has a general meaning',
      },

      // All 10 Forms Overview
      {
        type: 'text',
        content: 'The 10 Arabic Verb Forms',
      },
      {
        type: 'examples_grid',
        content: 'Complete Forms Overview',
        examples: [
          { arabic: 'الوزن الأول: فَعَلَ - يَفْعَلُ', english: 'Form I: Basic meaning' },
          { arabic: 'الوزن الثاني: فَعَّلَ - يُفَعِّلُ', english: 'Form II: Causative, intensive' },
          { arabic: 'الوزن الثالث: فَاعَلَ - يُفَاعِلُ', english: 'Form III: Doing with someone' },
          { arabic: 'الوزن الرابع: أَفْعَلَ - يُفْعِلُ', english: 'Form IV: Causative' },
          { arabic: 'الوزن الخامس: تَفَعَّلَ - يَتَفَعَّلُ', english: 'Form V: Reflexive of II' },
          { arabic: 'الوزن السادس: تَفَاعَلَ - يَتَفَاعَلُ', english: 'Form VI: Mutual/reciprocal' },
          { arabic: 'الوزن السابع: اِنْفَعَلَ - يَنْفَعِلُ', english: 'Form VII: Passive/reflexive' },
          { arabic: 'الوزن الثامن: اِفْتَعَلَ - يَفْتَعِلُ', english: 'Form VIII: Reflexive/middle' },
          { arabic: 'الوزن التاسع: اِفْعَلَّ - يَفْعَلُّ', english: 'Form IX: Colors/defects' },
          { arabic: 'الوزن العاشر: اِسْتَفْعَلَ - يَسْتَفْعِلُ', english: 'Form X: Seeking/considering' },
        ],
      },

      // Form I
      {
        type: 'text',
        content: 'Form I (الوزن الأول): فَعَلَ',
      },
      {
        type: 'examples_grid',
        content: 'Basic form - the root meaning',
        examples: [
          { arabic: 'كَتَبَ - يَكْتُبُ', english: 'to write' },
          { arabic: 'عَلِمَ - يَعْلَمُ', english: 'to know' },
          { arabic: 'فَتَحَ - يَفْتَحُ', english: 'to open' },
          { arabic: 'دَخَلَ - يَدْخُلُ', english: 'to enter' },
        ],
      },

      // Form II
      {
        type: 'text',
        content: 'Form II (الوزن الثاني): فَعَّلَ',
      },
      {
        type: 'rule',
        content: 'Form II [[doubles the middle letter]]. It often means: [[causative]] (make someone do), [[intensive]] (do intensely), or creates verbs from nouns.',
        arabicDescription: 'تَضْعِيف الْعَيْن - لِلتَّكْثِير وَالتَّعْدِيَة',
        arabicTranslation: 'Doubling middle letter - for intensity and causation',
      },
      {
        type: 'examples_grid',
        content: 'Form II examples',
        examples: [
          { arabic: 'عَلَّمَ - يُعَلِّمُ', english: 'to teach (make know)' },
          { arabic: 'دَرَّسَ - يُدَرِّسُ', english: 'to teach (lessons)' },
          { arabic: 'كَسَّرَ - يُكَسِّرُ', english: 'to smash (break intensely)' },
          { arabic: 'صَوَّرَ - يُصَوِّرُ', english: 'to photograph' },
        ],
      },

      // Form III
      {
        type: 'text',
        content: 'Form III (الوزن الثالث): فَاعَلَ',
      },
      {
        type: 'rule',
        content: 'Form III adds [[alif after the first letter]]. It indicates [[doing with someone]] (reciprocal action) or [[attempting]].',
        arabicDescription: 'زِيَادَة أَلِف - لِلْمُشَارَكَة',
        arabicTranslation: 'Adding alif - for participation',
      },
      {
        type: 'examples_grid',
        content: 'Form III examples',
        examples: [
          { arabic: 'كَاتَبَ - يُكَاتِبُ', english: 'to correspond with' },
          { arabic: 'قَاتَلَ - يُقَاتِلُ', english: 'to fight (with)' },
          { arabic: 'سَافَرَ - يُسَافِرُ', english: 'to travel' },
          { arabic: 'حَاوَلَ - يُحَاوِلُ', english: 'to try/attempt' },
        ],
      },

      // Form IV
      {
        type: 'text',
        content: 'Form IV (الوزن الرابع): أَفْعَلَ',
      },
      {
        type: 'examples_grid',
        content: 'Form IV adds أَ - causative',
        examples: [
          { arabic: 'أَخْرَجَ - يُخْرِجُ', english: 'to take out' },
          { arabic: 'أَدْخَلَ - يُدْخِلُ', english: 'to insert' },
          { arabic: 'أَرْسَلَ - يُرْسِلُ', english: 'to send' },
          { arabic: 'أَسْلَمَ - يُسْلِمُ', english: 'to submit/become Muslim' },
        ],
      },

      // Form V
      {
        type: 'text',
        content: 'Form V (الوزن الخامس): تَفَعَّلَ',
      },
      {
        type: 'examples_grid',
        content: 'Form V = تَ + Form II - reflexive',
        examples: [
          { arabic: 'تَعَلَّمَ - يَتَعَلَّمُ', english: 'to learn (teach oneself)' },
          { arabic: 'تَكَلَّمَ - يَتَكَلَّمُ', english: 'to speak' },
          { arabic: 'تَذَكَّرَ - يَتَذَكَّرُ', english: 'to remember' },
          { arabic: 'تَوَقَّعَ - يَتَوَقَّعُ', english: 'to expect' },
        ],
      },

      // Form VI
      {
        type: 'text',
        content: 'Form VI (الوزن السادس): تَفَاعَلَ',
      },
      {
        type: 'examples_grid',
        content: 'Form VI = تَ + Form III - mutual action',
        examples: [
          { arabic: 'تَبَادَلَ - يَتَبَادَلُ', english: 'to exchange' },
          { arabic: 'تَعَاوَنَ - يَتَعَاوَنُ', english: 'to cooperate' },
          { arabic: 'تَقَاتَلَ - يَتَقَاتَلُ', english: 'to fight each other' },
          { arabic: 'تَوَاصَلَ - يَتَوَاصَلُ', english: 'to communicate' },
        ],
      },

      // Forms VII-X
      {
        type: 'text',
        content: 'Forms VII-X',
      },
      {
        type: 'examples_grid',
        content: 'Advanced Forms',
        examples: [
          { arabic: 'الوزن السابع: اِنْكَسَرَ', english: 'Form VII: it broke (passive)' },
          { arabic: 'الوزن الثامن: اِجْتَمَعَ', english: 'Form VIII: to gather/meet' },
          { arabic: 'الوزن التاسع: اِحْمَرَّ', english: 'Form IX: to become red' },
          { arabic: 'الوزن العاشر: اِسْتَخْدَمَ', english: 'Form X: to use (seek service)' },
        ],
      },

      // Form X Detail
      {
        type: 'rule',
        content: 'Form X (اِسْتَفْعَلَ) is very common. It often means [[to seek/request]] the action, or [[to consider]] something. Pattern: اِسْتَفْعَلَ - يَسْتَفْعِلُ',
        arabicDescription: 'اِسْتَفْعَلَ - لِلطَّلَب',
        arabicTranslation: 'Istafʿala - for requesting',
      },
      {
        type: 'examples_grid',
        content: 'Form X examples',
        examples: [
          { arabic: 'اِسْتَخْدَمَ - يَسْتَخْدِمُ', english: 'to use' },
          { arabic: 'اِسْتَعْمَلَ - يَسْتَعْمِلُ', english: 'to employ/use' },
          { arabic: 'اِسْتَقْبَلَ - يَسْتَقْبِلُ', english: 'to welcome' },
          { arabic: 'اِسْتَفْهَمَ - يَسْتَفْهِمُ', english: 'to inquire' },
        ],
      },

      // Root Comparison
      {
        type: 'text',
        content: 'One Root, Many Forms: ع-ل-م (knowing)',
      },
      {
        type: 'examples_grid',
        content: 'Same root across different forms',
        examples: [
          { arabic: 'عَلِمَ - يَعْلَمُ', english: 'Form I: to know' },
          { arabic: 'عَلَّمَ - يُعَلِّمُ', english: 'Form II: to teach' },
          { arabic: 'أَعْلَمَ - يُعْلِمُ', english: 'Form IV: to inform' },
          { arabic: 'تَعَلَّمَ - يَتَعَلَّمُ', english: 'Form V: to learn' },
          { arabic: 'اِسْتَعْلَمَ - يَسْتَعْلِمُ', english: 'Form X: to inquire' },
        ],
      },

      // Learning Tip
      {
        type: 'note',
        content: 'Focus on [[Forms I, II, V, and X]] first - these are the most common. As you encounter new verbs, noting their form will help you understand and remember their meanings.',
        arabicDescription: 'اِبْدَأ بِالأَوْزَان الأَكْثَر شُيُوعًا',
        arabicTranslation: 'Start with the most common forms',
      },
    ],
  },
];

export default verbLessons;
