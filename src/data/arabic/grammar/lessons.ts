import { GrammarLesson, GrammarContent } from '../../../types/arabic';

export const grammarLessons: GrammarLesson[] = [
  // LESSON 1: The Arabic Alphabet Overview
  {
    id: 'grammar-1',
    title: 'The Arabic Writing System',
    titleArabic: 'نِظَامُ الْكِتَابَةِ الْعَرَبِيَّة',
    description: 'Learn how Arabic writing works - right to left, connected letters, and vowel marks',
    level: 'beginner',
    category: 'other',
    order: 1,
    exercises: ['ex-grammar-1-1', 'ex-grammar-1-2'],
    content: [
      {
        type: 'text',
        content: 'Arabic is written from RIGHT to LEFT. This is the opposite of English! The Arabic alphabet has 28 letters, and most letters connect to each other within a word.',
      },
      {
        type: 'rule',
        content: 'Key Rule: Most Arabic letters change shape depending on their position in a word (isolated, beginning, middle, or end).',
      },
      {
        type: 'example',
        content: 'The letter Ba (ب)',
        arabic: 'ب - بـ - ـبـ - ـب',
        transliteration: 'isolated - initial - medial - final',
        translation: 'Shows how ب changes in different positions',
      },
      {
        type: 'text',
        content: 'Six letters NEVER connect to the letter after them: ا (alif), د (dal), ذ (dhal), ر (ra), ز (zay), و (waw). These are called "non-connectors".',
      },
      {
        type: 'example',
        content: 'Non-connector example',
        arabic: 'دَرَسَ',
        transliteration: 'darasa',
        translation: 'he studied - notice د and ر don\'t connect forward',
      },
      {
        type: 'note',
        content: 'Tip: Think of Arabic letters like cursive English - letters flow together, but some letters always "lift the pen".',
      },
    ],
  },

  // LESSON 2: Vowels and Diacritics
  {
    id: 'grammar-2',
    title: 'Arabic Vowels (Harakat)',
    titleArabic: 'الْحَرَكَات',
    description: 'Master the short vowels (fatha, kasra, damma) and long vowels',
    level: 'beginner',
    category: 'other',
    order: 2,
    exercises: ['ex-grammar-2-1', 'ex-grammar-2-2', 'ex-grammar-2-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has 3 SHORT vowels (shown as marks above/below letters) and 3 LONG vowels (shown as letters). Short vowels are often omitted in everyday writing.',
      },
      {
        type: 'table',
        content: 'Short Vowels (الحركات القصيرة)',
        tableData: {
          headers: ['Name', 'Symbol', 'Sound', 'Example'],
          rows: [
            ['Fatha', 'ـَ', 'a (as in "cat")', 'كَتَبَ (kataba)'],
            ['Kasra', 'ـِ', 'i (as in "sit")', 'كِتَاب (kitāb)'],
            ['Damma', 'ـُ', 'u (as in "put")', 'كُتُب (kutub)'],
          ],
        },
      },
      {
        type: 'table',
        content: 'Long Vowels (الحركات الطويلة)',
        tableData: {
          headers: ['Long Vowel', 'Letters', 'Sound', 'Example'],
          rows: [
            ['ā', 'ـَا', 'aa (as in "father")', 'بَاب (bāb) - door'],
            ['ī', 'ـِي', 'ee (as in "see")', 'كَبِير (kabīr) - big'],
            ['ū', 'ـُو', 'oo (as in "moon")', 'نُور (nūr) - light'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'Sukun (ـْ) means NO vowel on that letter. Shadda (ـّ) means the letter is DOUBLED.',
      },
      {
        type: 'example',
        content: 'Sukun and Shadda',
        arabic: 'قَلْب - كَتَّبَ',
        transliteration: 'qalb - kattaba',
        translation: 'heart (no vowel on ل) - he made someone write (doubled ت)',
      },
    ],
  },

  // LESSON 3: The Definite Article
  {
    id: 'grammar-3',
    title: 'The Definite Article (ال)',
    titleArabic: 'أَدَاةُ التَّعْرِيف',
    description: 'Learn how to say "the" in Arabic and understand Sun/Moon letters',
    level: 'beginner',
    category: 'articles',
    order: 3,
    exercises: ['ex-grammar-3-1', 'ex-grammar-3-2', 'ex-grammar-3-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has ONE word for "the": أَلْ (al). It attaches to the beginning of nouns. Unlike English, Arabic has NO word for "a/an" - just leave it off!',
      },
      {
        type: 'example',
        content: 'Adding "the"',
        arabic: 'كِتَاب → الْكِتَاب',
        transliteration: 'kitāb → al-kitāb',
        translation: 'a book → the book',
      },
      {
        type: 'rule',
        content: 'Sun Letters (الحروف الشمسية): When ال comes before these 14 letters, the ل sound disappears and the letter doubles!',
      },
      {
        type: 'table',
        content: 'Sun Letters',
        tableData: {
          headers: ['Letter', 'Example', 'Pronunciation'],
          rows: [
            ['ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ن، ل', 'الشَّمْس', 'ash-shams (not al-shams)'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Sun Letter Examples',
        arabic: 'الشَّمْس - السَّلَام - النُّور',
        transliteration: 'ash-shams - as-salām - an-nūr',
        translation: 'the sun - the peace - the light',
      },
      {
        type: 'rule',
        content: 'Moon Letters (الحروف القمرية): The remaining 14 letters keep the ل sound.',
      },
      {
        type: 'example',
        content: 'Moon Letter Examples',
        arabic: 'الْقَمَر - الْكِتَاب - الْبَيْت',
        transliteration: 'al-qamar - al-kitāb - al-bayt',
        translation: 'the moon - the book - the house',
      },
    ],
  },

  // LESSON 4: Personal Pronouns
  {
    id: 'grammar-4',
    title: 'Personal Pronouns',
    titleArabic: 'الضَّمَائِر الشَّخْصِيَّة',
    description: 'Learn I, you, he, she, we, they in Arabic',
    level: 'beginner',
    category: 'pronouns',
    order: 4,
    exercises: ['ex-grammar-4-1', 'ex-grammar-4-2', 'ex-grammar-4-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic pronouns distinguish between masculine/feminine AND singular/dual/plural. Let\'s start with the most common ones.',
      },
      {
        type: 'table',
        content: 'Personal Pronouns (Singular)',
        tableData: {
          headers: ['English', 'Arabic', 'Transliteration'],
          rows: [
            ['I', 'أَنَا', 'anā'],
            ['You (masc.)', 'أَنْتَ', 'anta'],
            ['You (fem.)', 'أَنْتِ', 'anti'],
            ['He', 'هُوَ', 'huwa'],
            ['She', 'هِيَ', 'hiya'],
          ],
        },
      },
      {
        type: 'table',
        content: 'Personal Pronouns (Plural)',
        tableData: {
          headers: ['English', 'Arabic', 'Transliteration'],
          rows: [
            ['We', 'نَحْنُ', 'naḥnu'],
            ['You (masc. pl.)', 'أَنْتُمْ', 'antum'],
            ['You (fem. pl.)', 'أَنْتُنَّ', 'antunna'],
            ['They (masc.)', 'هُمْ', 'hum'],
            ['They (fem.)', 'هُنَّ', 'hunna'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Using pronouns',
        arabic: 'أَنَا طَالِب - هِيَ مُعَلِّمَة',
        transliteration: 'anā ṭālib - hiya muʿallima',
        translation: 'I am a student - She is a teacher',
      },
      {
        type: 'note',
        content: 'In spoken Arabic, أَنْتُنَّ and هُنَّ are rare. Most dialects use أَنْتُمْ and هُمْ for mixed or all-female groups too.',
      },
    ],
  },

  // LESSON 5: Noun Gender
  {
    id: 'grammar-5',
    title: 'Masculine & Feminine Nouns',
    titleArabic: 'الْمُذَكَّر وَالْمُؤَنَّث',
    description: 'Understand how Arabic marks gender in nouns',
    level: 'beginner',
    category: 'nouns',
    order: 5,
    exercises: ['ex-grammar-5-1', 'ex-grammar-5-2'],
    content: [
      {
        type: 'text',
        content: 'Every Arabic noun is either MASCULINE (مُذَكَّر) or FEMININE (مُؤَنَّث). This affects adjectives, verbs, and pronouns!',
      },
      {
        type: 'rule',
        content: 'The Ta Marbuta (ة): Most feminine nouns end in ة (tā marbūṭa). This letter is pronounced "a" or "at" depending on context.',
      },
      {
        type: 'table',
        content: 'Masculine vs Feminine',
        tableData: {
          headers: ['Masculine', 'Feminine', 'English'],
          rows: [
            ['مُعَلِّم (muʿallim)', 'مُعَلِّمَة (muʿallima)', 'teacher'],
            ['طَالِب (ṭālib)', 'طَالِبَة (ṭāliba)', 'student'],
            ['صَدِيق (ṣadīq)', 'صَدِيقَة (ṣadīqa)', 'friend'],
            ['كَبِير (kabīr)', 'كَبِيرَة (kabīra)', 'big'],
            ['جَمِيل (jamīl)', 'جَمِيلَة (jamīla)', 'beautiful'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'Some nouns are naturally feminine without ة: body parts that come in pairs (يَد hand, عَيْن eye), and some others (شَمْس sun, أَرْض earth).',
      },
      {
        type: 'example',
        content: 'Natural feminine nouns',
        arabic: 'الشَّمْس جَمِيلَة - الْيَد كَبِيرَة',
        transliteration: 'ash-shams jamīla - al-yad kabīra',
        translation: 'The sun is beautiful - The hand is big',
      },
    ],
  },

  // LESSON 6: Basic Sentence Structure
  {
    id: 'grammar-6',
    title: 'Basic Sentences (Nominal)',
    titleArabic: 'الْجُمْلَة الاِسْمِيَّة',
    description: 'Build your first Arabic sentences without verbs',
    level: 'beginner',
    category: 'sentences',
    order: 6,
    exercises: ['ex-grammar-6-1', 'ex-grammar-6-2', 'ex-grammar-6-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has TWO types of sentences: Nominal (starts with noun) and Verbal (starts with verb). Nominal sentences are simpler - NO verb "is/am/are" needed!',
      },
      {
        type: 'rule',
        content: 'Structure: Subject (المُبْتَدَأ) + Predicate (الخَبَر) = Complete sentence. No "is" required!',
      },
      {
        type: 'example',
        content: 'Simple nominal sentences',
        arabic: 'أَنَا طَالِب',
        transliteration: 'anā ṭālib',
        translation: 'I (am) a student',
      },
      {
        type: 'example',
        content: 'With adjectives',
        arabic: 'الْبَيْتُ كَبِير',
        transliteration: 'al-baytu kabīr',
        translation: 'The house (is) big',
      },
      {
        type: 'example',
        content: 'With locations',
        arabic: 'الْكِتَابُ عَلَى الطَّاوِلَة',
        transliteration: 'al-kitābu ʿalā aṭ-ṭāwila',
        translation: 'The book (is) on the table',
      },
      {
        type: 'table',
        content: 'More Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['هُوَ مُعَلِّم', 'huwa muʿallim', 'He is a teacher'],
            ['هِيَ طَبِيبَة', 'hiya ṭabība', 'She is a doctor'],
            ['نَحْنُ طُلَّاب', 'naḥnu ṭullāb', 'We are students'],
            ['الطَّقْسُ جَمِيل', 'aṭ-ṭaqsu jamīl', 'The weather is beautiful'],
            ['الْقَهْوَةُ سَاخِنَة', 'al-qahwatu sākhina', 'The coffee is hot'],
          ],
        },
      },
    ],
  },

  // LESSON 7: Question Words
  {
    id: 'grammar-7',
    title: 'Question Words',
    titleArabic: 'أَدَوَات الاِسْتِفْهَام',
    description: 'Learn to ask who, what, where, when, why, and how',
    level: 'beginner',
    category: 'other',
    order: 7,
    exercises: ['ex-grammar-7-1', 'ex-grammar-7-2', 'ex-grammar-7-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic question words usually come at the BEGINNING of the sentence, just like English.',
      },
      {
        type: 'table',
        content: 'Essential Question Words',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['مَا / مَاذَا', 'mā / mādhā', 'What?'],
            ['مَنْ', 'man', 'Who?'],
            ['أَيْنَ', 'ayna', 'Where?'],
            ['مَتَى', 'matā', 'When?'],
            ['لِمَاذَا', 'limādhā', 'Why?'],
            ['كَيْفَ', 'kayfa', 'How?'],
            ['كَمْ', 'kam', 'How many/much?'],
            ['أَيّ', 'ayy', 'Which?'],
            ['هَلْ', 'hal', 'Is/Are? (yes/no question)'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Question examples',
        arabic: 'مَا اسْمُكَ؟',
        transliteration: 'mā ismuka?',
        translation: 'What is your name?',
      },
      {
        type: 'example',
        content: 'Where question',
        arabic: 'أَيْنَ الْمَدْرَسَة؟',
        transliteration: 'ayna al-madrasa?',
        translation: 'Where is the school?',
      },
      {
        type: 'example',
        content: 'Yes/No question',
        arabic: 'هَلْ أَنْتَ طَالِب؟',
        transliteration: 'hal anta ṭālib?',
        translation: 'Are you a student?',
      },
      {
        type: 'table',
        content: 'More Question Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['مَنْ هَذَا؟', 'man hādhā?', 'Who is this?'],
            ['كَيْفَ حَالُكَ؟', 'kayfa ḥāluka?', 'How are you?'],
            ['مَتَى الدَّرْس؟', 'matā ad-dars?', 'When is the lesson?'],
            ['لِمَاذَا أَنْتَ هُنَا؟', 'limādhā anta hunā?', 'Why are you here?'],
            ['كَمْ عُمْرُكَ؟', 'kam ʿumruka?', 'How old are you?'],
          ],
        },
      },
    ],
  },

  // LESSON 8: Demonstrative Pronouns
  {
    id: 'grammar-8',
    title: 'This & That (Demonstratives)',
    titleArabic: 'أَسْمَاء الْإِشَارَة',
    description: 'Point to things using this, that, these, those',
    level: 'beginner',
    category: 'pronouns',
    order: 8,
    exercises: ['ex-grammar-8-1', 'ex-grammar-8-2'],
    content: [
      {
        type: 'text',
        content: 'Demonstrative pronouns in Arabic must match the gender of the noun they refer to.',
      },
      {
        type: 'table',
        content: 'Demonstrative Pronouns',
        tableData: {
          headers: ['English', 'Masculine', 'Feminine'],
          rows: [
            ['This (near)', 'هَذَا (hādhā)', 'هَذِهِ (hādhihi)'],
            ['That (far)', 'ذَلِكَ (dhālika)', 'تِلْكَ (tilka)'],
            ['These', 'هَؤُلَاء (hāʾulāʾi)', 'هَؤُلَاء (hāʾulāʾi)'],
            ['Those', 'أُولَئِكَ (ūlāʾika)', 'أُولَئِكَ (ūlāʾika)'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Using "this"',
        arabic: 'هَذَا كِتَاب - هَذِهِ سَيَّارَة',
        transliteration: 'hādhā kitāb - hādhihi sayyāra',
        translation: 'This is a book - This is a car',
      },
      {
        type: 'example',
        content: 'Using "that"',
        arabic: 'ذَلِكَ الرَّجُل - تِلْكَ الْمَرْأَة',
        transliteration: 'dhālika ar-rajul - tilka al-marʾa',
        translation: 'That man - That woman',
      },
      {
        type: 'rule',
        content: 'When the noun has "ال", the demonstrative comes BEFORE it: هَذَا الْكِتَاب (this book)',
      },
    ],
  },

  // LESSON 9: Possessive Pronouns
  {
    id: 'grammar-9',
    title: 'Possessive Pronouns (My, Your, His)',
    titleArabic: 'ضَمَائِر الْمِلْكِيَّة',
    description: 'Express ownership: my book, your house, her car',
    level: 'beginner',
    category: 'pronouns',
    order: 9,
    exercises: ['ex-grammar-9-1', 'ex-grammar-9-2', 'ex-grammar-9-3'],
    content: [
      {
        type: 'text',
        content: 'In Arabic, possessive pronouns are SUFFIXES attached to the end of nouns. They replace "ال" if present.',
      },
      {
        type: 'table',
        content: 'Possessive Suffixes',
        tableData: {
          headers: ['English', 'Suffix', 'Example with كِتَاب'],
          rows: [
            ['my', 'ـِي (-ī)', 'كِتَابِي (kitābī)'],
            ['your (m)', 'ـكَ (-ka)', 'كِتَابُكَ (kitābuka)'],
            ['your (f)', 'ـكِ (-ki)', 'كِتَابُكِ (kitābuki)'],
            ['his', 'ـهُ (-hu)', 'كِتَابُهُ (kitābuhu)'],
            ['her', 'ـهَا (-hā)', 'كِتَابُهَا (kitābuhā)'],
            ['our', 'ـنَا (-nā)', 'كِتَابُنَا (kitābunā)'],
            ['their (m)', 'ـهُمْ (-hum)', 'كِتَابُهُمْ (kitābuhum)'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Examples in sentences',
        arabic: 'بَيْتِي كَبِير',
        transliteration: 'baytī kabīr',
        translation: 'My house is big',
      },
      {
        type: 'example',
        content: 'More examples',
        arabic: 'اسْمُهَا فَاطِمَة',
        transliteration: 'ismuhā Fāṭima',
        translation: 'Her name is Fatima',
      },
      {
        type: 'table',
        content: 'Practice Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['سَيَّارَتُهُ جَدِيدَة', 'sayyāratuhu jadīda', 'His car is new'],
            ['أُمِّي طَبِيبَة', 'ummī ṭabība', 'My mother is a doctor'],
            ['أَيْنَ حَقِيبَتُكَ؟', 'ayna ḥaqībatuka?', 'Where is your bag?'],
            ['صَدِيقَتُنَا مِنْ مِصْر', 'ṣadīqatunā min Miṣr', 'Our friend (f) is from Egypt'],
          ],
        },
      },
    ],
  },

  // LESSON 10: Prepositions
  {
    id: 'grammar-10',
    title: 'Common Prepositions',
    titleArabic: 'حُرُوف الْجَرّ',
    description: 'Learn in, on, from, to, with and other prepositions',
    level: 'beginner',
    category: 'other',
    order: 10,
    exercises: ['ex-grammar-10-1', 'ex-grammar-10-2'],
    content: [
      {
        type: 'text',
        content: 'Prepositions in Arabic are small words that show relationships between nouns. They affect the noun that follows (causing genitive case).',
      },
      {
        type: 'table',
        content: 'Essential Prepositions',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'Meaning'],
          rows: [
            ['فِي', 'fī', 'in'],
            ['عَلَى', 'ʿalā', 'on'],
            ['مِنْ', 'min', 'from'],
            ['إِلَى', 'ilā', 'to'],
            ['مَعَ', 'maʿa', 'with'],
            ['عِنْدَ', 'ʿinda', 'at / with (possession)'],
            ['بِـ', 'bi-', 'with / by'],
            ['لِـ', 'li-', 'for / to'],
            ['عَنْ', 'ʿan', 'about / from'],
            ['بَيْنَ', 'bayna', 'between'],
            ['تَحْتَ', 'taḥta', 'under'],
            ['فَوْقَ', 'fawqa', 'above'],
            ['أَمَامَ', 'amāma', 'in front of'],
            ['وَرَاءَ', 'warāʾa', 'behind'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Preposition examples',
        arabic: 'الْكِتَابُ عَلَى الطَّاوِلَة',
        transliteration: 'al-kitābu ʿalā aṭ-ṭāwila',
        translation: 'The book is on the table',
      },
      {
        type: 'example',
        content: 'More examples',
        arabic: 'أَنَا مِنْ أَمْرِيكَا',
        transliteration: 'anā min Amrīkā',
        translation: 'I am from America',
      },
      {
        type: 'table',
        content: 'Practice Sentences',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['الْقِطَّة تَحْتَ السَّرِير', 'al-qiṭṭa taḥta as-sarīr', 'The cat is under the bed'],
            ['ذَهَبْتُ إِلَى الْمَدْرَسَة', 'dhahabtu ilā al-madrasa', 'I went to school'],
            ['أَدْرُسُ مَعَ صَدِيقِي', 'adrusu maʿa ṣadīqī', 'I study with my friend'],
            ['الصُّورَة عَلَى الْحَائِط', 'aṣ-ṣūra ʿalā al-ḥāʾiṭ', 'The picture is on the wall'],
          ],
        },
      },
    ],
  },

  // LESSON 11: Adjectives Agreement
  {
    id: 'grammar-11',
    title: 'Adjectives (Agreement)',
    titleArabic: 'الصِّفَات',
    description: 'Learn how adjectives match nouns in gender and definiteness',
    level: 'beginner',
    category: 'adjectives',
    order: 11,
    exercises: ['ex-grammar-11-1', 'ex-grammar-11-2', 'ex-grammar-11-3'],
    content: [
      {
        type: 'text',
        content: 'In Arabic, adjectives MUST agree with their nouns in: 1) Gender, 2) Definiteness (ال or not), 3) Number, and 4) Case. Adjectives come AFTER the noun.',
      },
      {
        type: 'rule',
        content: 'Rule 1: If the noun is feminine, add ة to the adjective. If the noun has ال, the adjective must have ال too.',
      },
      {
        type: 'table',
        content: 'Adjective Agreement Examples',
        tableData: {
          headers: ['Type', 'Arabic', 'English'],
          rows: [
            ['Masc. Indefinite', 'بَيْتٌ كَبِيرٌ', 'a big house'],
            ['Masc. Definite', 'الْبَيْتُ الْكَبِيرُ', 'the big house'],
            ['Fem. Indefinite', 'سَيَّارَةٌ كَبِيرَةٌ', 'a big car'],
            ['Fem. Definite', 'السَّيَّارَةُ الْكَبِيرَةُ', 'the big car'],
          ],
        },
      },
      {
        type: 'table',
        content: 'Common Adjectives',
        tableData: {
          headers: ['Masculine', 'Feminine', 'English'],
          rows: [
            ['كَبِير', 'كَبِيرَة', 'big'],
            ['صَغِير', 'صَغِيرَة', 'small'],
            ['جَدِيد', 'جَدِيدَة', 'new'],
            ['قَدِيم', 'قَدِيمَة', 'old (things)'],
            ['جَمِيل', 'جَمِيلَة', 'beautiful'],
            ['طَوِيل', 'طَوِيلَة', 'tall/long'],
            ['قَصِير', 'قَصِيرَة', 'short'],
            ['سَهْل', 'سَهْلَة', 'easy'],
            ['صَعْب', 'صَعْبَة', 'difficult'],
            ['سَرِيع', 'سَرِيعَة', 'fast'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Multiple adjectives',
        arabic: 'بَيْتٌ كَبِيرٌ جَمِيلٌ',
        transliteration: 'baytun kabīrun jamīlun',
        translation: 'a big beautiful house',
      },
    ],
  },

  // LESSON 12: Numbers with Nouns
  {
    id: 'grammar-12',
    title: 'Numbers with Nouns',
    titleArabic: 'الْأَعْدَاد مَعَ الْأَسْمَاء',
    description: 'Learn how to count things in Arabic',
    level: 'beginner',
    category: 'nouns',
    order: 12,
    exercises: ['ex-grammar-12-1', 'ex-grammar-12-2'],
    content: [
      {
        type: 'text',
        content: 'Arabic numbers have complex rules, but here are the basics for beginners.',
      },
      {
        type: 'rule',
        content: 'Numbers 1-2: Follow the noun and match its gender. وَاحِد/وَاحِدَة (one), اِثْنَان/اِثْنَتَان (two)',
      },
      {
        type: 'example',
        content: 'One and Two',
        arabic: 'كِتَابٌ وَاحِدٌ - سَيَّارَةٌ وَاحِدَةٌ',
        transliteration: 'kitābun wāḥidun - sayyāratun wāḥida',
        translation: 'one book - one car',
      },
      {
        type: 'rule',
        content: 'Numbers 3-10: The number has OPPOSITE gender from noun, and noun is PLURAL.',
      },
      {
        type: 'example',
        content: 'Three to Ten',
        arabic: 'ثَلَاثَةُ كُتُبٍ - ثَلَاثُ سَيَّارَاتٍ',
        transliteration: 'thalāthat kutubin - thalāth sayyārātin',
        translation: 'three books (masc. noun → fem. number) - three cars (fem. noun → masc. number)',
      },
      {
        type: 'rule',
        content: 'Numbers 11+: Noun is SINGULAR! ثَلَاثَةَ عَشَرَ كِتَابًا (thirteen books)',
      },
      {
        type: 'table',
        content: 'Quick Reference',
        tableData: {
          headers: ['Number', 'Noun Form', 'Example'],
          rows: [
            ['1-2', 'Singular', 'كِتَابٌ وَاحِدٌ'],
            ['3-10', 'Plural', 'خَمْسَةُ كُتُبٍ'],
            ['11-99', 'Singular', 'عِشْرُونَ كِتَابًا'],
            ['100+', 'Singular', 'مِئَةُ كِتَابٍ'],
          ],
        },
      },
    ],
  },

  // LESSON 13: Verbal Sentences
  {
    id: 'grammar-13',
    title: 'Verbal Sentences',
    titleArabic: 'الْجُمْلَة الْفِعْلِيَّة',
    description: 'Learn sentences that start with verbs - the other main sentence type',
    level: 'beginner',
    category: 'sentences',
    order: 13,
    exercises: ['ex-grammar-13-1', 'ex-grammar-13-2', 'ex-grammar-13-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has two sentence types: Nominal (الجملة الاسمية) starts with a noun, and Verbal (الجملة الفعلية) starts with a VERB. Verbal sentences are very common in Arabic.',
      },
      {
        type: 'rule',
        content: 'Structure: Verb (الفعل) + Subject (الفاعل) + Object (المفعول به). The verb comes FIRST!',
      },
      {
        type: 'example',
        content: 'Basic verbal sentence',
        arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ',
        transliteration: 'kataba aṭ-ṭālibu ad-darsa',
        translation: 'The student wrote the lesson',
      },
      {
        type: 'table',
        content: 'Verbal vs Nominal Comparison',
        tableData: {
          headers: ['Type', 'Arabic', 'English'],
          rows: [
            ['Verbal', 'ذَهَبَ الْوَلَدُ', 'The boy went'],
            ['Nominal', 'الْوَلَدُ ذَهَبَ', 'The boy, he went'],
            ['Verbal', 'أَكَلَتْ الْبِنْتُ', 'The girl ate'],
            ['Nominal', 'الْبِنْتُ أَكَلَتْ', 'The girl, she ate'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'In verbal sentences, the verb agrees with the subject in GENDER only (not number). In nominal sentences, it agrees in both gender AND number.',
      },
      {
        type: 'example',
        content: 'Verb agreement in verbal sentences',
        arabic: 'جَاءَ الطُّلَّابُ',
        transliteration: 'jāʾa aṭ-ṭullāb',
        translation: 'The students came (verb is singular masculine)',
      },
      {
        type: 'table',
        content: 'More Verbal Sentence Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['قَرَأَ الْمُعَلِّمُ الْكِتَابَ', 'qaraʾa al-muʿallimu al-kitāba', 'The teacher read the book'],
            ['فَتَحَتْ الْأُمُّ الْبَابَ', 'fataḥat al-ummu al-bāba', 'The mother opened the door'],
            ['شَرِبَ الطِّفْلُ الْحَلِيبَ', 'shariba aṭ-ṭiflu al-ḥalība', 'The child drank the milk'],
            ['سَافَرَ أَحْمَدُ إِلَى مِصْرَ', 'sāfara Aḥmadu ilā Miṣra', 'Ahmed traveled to Egypt'],
          ],
        },
      },
    ],
  },

  // LESSON 14: Past Tense Basics
  {
    id: 'grammar-14',
    title: 'Past Tense Basics',
    titleArabic: 'الْمَاضِي',
    description: 'Learn to express actions that happened in the past',
    level: 'beginner',
    category: 'verbs',
    order: 14,
    exercises: ['ex-grammar-14-1', 'ex-grammar-14-2', 'ex-grammar-14-3'],
    content: [
      {
        type: 'text',
        content: 'The past tense (الماضي) describes completed actions. Most Arabic verbs follow a 3-letter root pattern. The basic past tense form is: فَعَلَ (faʿala).',
      },
      {
        type: 'rule',
        content: 'Past tense verbs change their endings based on the subject. The "he" form is the base/dictionary form.',
      },
      {
        type: 'table',
        content: 'Past Tense Conjugation: كَتَبَ (to write)',
        tableData: {
          headers: ['Person', 'Arabic', 'Transliteration', 'English'],
          rows: [
            ['I', 'كَتَبْتُ', 'katabtu', 'I wrote'],
            ['You (m)', 'كَتَبْتَ', 'katabta', 'You wrote'],
            ['You (f)', 'كَتَبْتِ', 'katabti', 'You wrote'],
            ['He', 'كَتَبَ', 'kataba', 'He wrote'],
            ['She', 'كَتَبَتْ', 'katabat', 'She wrote'],
            ['We', 'كَتَبْنَا', 'katabnā', 'We wrote'],
            ['They (m)', 'كَتَبُوا', 'katabū', 'They wrote'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Using past tense',
        arabic: 'ذَهَبْتُ إِلَى الْمَدْرَسَةِ',
        transliteration: 'dhahabtu ilā al-madrasati',
        translation: 'I went to school',
      },
      {
        type: 'table',
        content: 'Common Past Tense Verbs',
        tableData: {
          headers: ['Arabic (he)', 'Transliteration', 'English'],
          rows: [
            ['ذَهَبَ', 'dhahaba', 'went'],
            ['أَكَلَ', 'akala', 'ate'],
            ['شَرِبَ', 'shariba', 'drank'],
            ['قَرَأَ', 'qaraʾa', 'read'],
            ['فَعَلَ', 'faʿala', 'did'],
            ['سَمِعَ', 'samiʿa', 'heard'],
            ['جَلَسَ', 'jalasa', 'sat'],
            ['خَرَجَ', 'kharaja', 'went out'],
          ],
        },
      },
      {
        type: 'note',
        content: 'Tip: The pronoun is often dropped because the verb ending shows who did the action. كَتَبْتُ alone means "I wrote".',
      },
    ],
  },

  // LESSON 15: Present Tense Basics
  {
    id: 'grammar-15',
    title: 'Present Tense Basics',
    titleArabic: 'الْمُضَارِع',
    description: 'Express current actions and habits',
    level: 'beginner',
    category: 'verbs',
    order: 15,
    exercises: ['ex-grammar-15-1', 'ex-grammar-15-2', 'ex-grammar-15-3'],
    content: [
      {
        type: 'text',
        content: 'The present tense (المضارع) describes ongoing actions, habits, or future events. It uses PREFIXES (and sometimes suffixes) added to a modified root.',
      },
      {
        type: 'rule',
        content: 'Present tense formula: Prefix + modified root (+ suffix for some forms). The key prefixes are: أَـ (I), تَـ (you/she), يَـ (he/they), نَـ (we).',
      },
      {
        type: 'table',
        content: 'Present Tense Conjugation: يَكْتُبُ (to write)',
        tableData: {
          headers: ['Person', 'Arabic', 'Transliteration', 'English'],
          rows: [
            ['I', 'أَكْتُبُ', 'aktubu', 'I write / am writing'],
            ['You (m)', 'تَكْتُبُ', 'taktubu', 'You write'],
            ['You (f)', 'تَكْتُبِينَ', 'taktubīna', 'You write'],
            ['He', 'يَكْتُبُ', 'yaktubu', 'He writes'],
            ['She', 'تَكْتُبُ', 'taktubu', 'She writes'],
            ['We', 'نَكْتُبُ', 'naktubu', 'We write'],
            ['They (m)', 'يَكْتُبُونَ', 'yaktubūna', 'They write'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Present tense in sentences',
        arabic: 'أَدْرُسُ الْعَرَبِيَّةَ كُلَّ يَوْمٍ',
        transliteration: 'adrusu al-ʿarabiyyata kulla yawmin',
        translation: 'I study Arabic every day',
      },
      {
        type: 'table',
        content: 'Common Present Tense Verbs',
        tableData: {
          headers: ['Arabic (he)', 'Transliteration', 'English'],
          rows: [
            ['يَذْهَبُ', 'yadhhabu', 'goes'],
            ['يَأْكُلُ', 'yaʾkulu', 'eats'],
            ['يَشْرَبُ', 'yashrabu', 'drinks'],
            ['يَقْرَأُ', 'yaqraʾu', 'reads'],
            ['يَفْعَلُ', 'yafʿalu', 'does'],
            ['يَسْمَعُ', 'yasmaʿu', 'hears'],
            ['يَجْلِسُ', 'yajlisu', 'sits'],
            ['يَخْرُجُ', 'yakhruju', 'goes out'],
          ],
        },
      },
      {
        type: 'note',
        content: 'Tip: Notice that "you (m)" and "she" have the same form: تَكْتُبُ. Context makes it clear!',
      },
    ],
  },

  // LESSON 16: Negation
  {
    id: 'grammar-16',
    title: 'Negation (Not, Don\'t)',
    titleArabic: 'النَّفْي',
    description: 'Learn to say "not", "don\'t", and "didn\'t" in Arabic',
    level: 'beginner',
    category: 'other',
    order: 16,
    exercises: ['ex-grammar-16-1', 'ex-grammar-16-2', 'ex-grammar-16-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has several words for negation, each used in different situations: لَا (lā), مَا (mā), and لَيْسَ (laysa).',
      },
      {
        type: 'rule',
        content: 'لَا (lā): Used to negate PRESENT tense verbs and for commands ("don\'t!").',
      },
      {
        type: 'example',
        content: 'Negating present tense with لا',
        arabic: 'لَا أَفْهَمُ',
        transliteration: 'lā afhamu',
        translation: 'I don\'t understand',
      },
      {
        type: 'example',
        content: 'Negative command',
        arabic: 'لَا تَذْهَبْ!',
        transliteration: 'lā tadhhab!',
        translation: 'Don\'t go!',
      },
      {
        type: 'rule',
        content: 'مَا (mā): Used to negate PAST tense verbs.',
      },
      {
        type: 'example',
        content: 'Negating past tense with ما',
        arabic: 'مَا ذَهَبْتُ',
        transliteration: 'mā dhahabtu',
        translation: 'I didn\'t go',
      },
      {
        type: 'rule',
        content: 'لَيْسَ (laysa): Used to negate NOMINAL sentences (no verb). It conjugates like a verb!',
      },
      {
        type: 'table',
        content: 'لَيْسَ Conjugation',
        tableData: {
          headers: ['Person', 'Arabic', 'Transliteration'],
          rows: [
            ['I', 'لَسْتُ', 'lastu'],
            ['You (m)', 'لَسْتَ', 'lasta'],
            ['You (f)', 'لَسْتِ', 'lasti'],
            ['He', 'لَيْسَ', 'laysa'],
            ['She', 'لَيْسَتْ', 'laysat'],
            ['We', 'لَسْنَا', 'lasnā'],
            ['They (m)', 'لَيْسُوا', 'laysū'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Using ليس',
        arabic: 'لَسْتُ طَالِبًا',
        transliteration: 'lastu ṭāliban',
        translation: 'I am not a student',
      },
      {
        type: 'table',
        content: 'Negation Summary',
        tableData: {
          headers: ['Negation Word', 'Used For', 'Example'],
          rows: [
            ['لَا (lā)', 'Present tense / Commands', 'لَا أَعْرِفُ (I don\'t know)'],
            ['مَا (mā)', 'Past tense', 'مَا فَهِمْتُ (I didn\'t understand)'],
            ['لَيْسَ (laysa)', 'Nominal sentences', 'لَيْسَ هُنَا (He\'s not here)'],
          ],
        },
      },
    ],
  },

  // LESSON 17: Idafa Construction
  {
    id: 'grammar-17',
    title: 'Idafa (Possessive Construction)',
    titleArabic: 'الْإِضَافَة',
    description: 'Learn "X of Y" constructions like "door of the house"',
    level: 'beginner',
    category: 'nouns',
    order: 17,
    exercises: ['ex-grammar-17-1', 'ex-grammar-17-2', 'ex-grammar-17-3'],
    content: [
      {
        type: 'text',
        content: 'Idafa (الإضافة) is how Arabic expresses "X of Y" or possession between nouns. The two nouns are placed next to each other with NO word for "of".',
      },
      {
        type: 'rule',
        content: 'Structure: First noun (possessed) + Second noun (possessor). The first noun NEVER has ال. The second noun determines definiteness.',
      },
      {
        type: 'example',
        content: 'Basic Idafa',
        arabic: 'بَابُ الْبَيْتِ',
        transliteration: 'bābu al-bayti',
        translation: 'the door of the house / the house\'s door',
      },
      {
        type: 'table',
        content: 'Idafa Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'Literal', 'English'],
          rows: [
            ['كِتَابُ الطَّالِبِ', 'kitābu aṭ-ṭālibi', 'book the-student', 'the student\'s book'],
            ['مُدِيرُ الْمَدْرَسَةِ', 'mudīru al-madrasati', 'director the-school', 'the school principal'],
            ['لُغَةُ الْعَرَبِ', 'lughatu al-ʿarabi', 'language the-Arabs', 'the Arabic language'],
            ['بَيْتُ صَدِيقِي', 'baytu ṣadīqī', 'house friend-my', 'my friend\'s house'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'Indefinite Idafa: If the second noun has no ال, the whole phrase is indefinite.',
      },
      {
        type: 'example',
        content: 'Indefinite vs Definite Idafa',
        arabic: 'بَابُ بَيْتٍ vs بَابُ الْبَيْتِ',
        transliteration: 'bābu baytin vs bābu al-bayti',
        translation: 'a door of a house vs the door of the house',
      },
      {
        type: 'note',
        content: 'Tip: Idafa chains can have 3+ nouns: مُدِيرُ مَدْرَسَةِ الْمَدِينَةِ (the city school\'s principal).',
      },
      {
        type: 'table',
        content: 'Common Idafa Phrases',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['صَبَاحُ الْخَيْرِ', 'ṣabāḥu al-khayri', 'good morning (morning of goodness)'],
            ['مَسَاءُ النُّورِ', 'masāʾu an-nūri', 'good evening (evening of light)'],
            ['غُرْفَةُ النَّوْمِ', 'ghurfatu an-nawmi', 'bedroom (room of sleep)'],
            ['رَقْمُ الْهَاتِفِ', 'raqmu al-hātifi', 'phone number'],
          ],
        },
      },
    ],
  },

  // LESSON 18: Plurals (Intermediate)
  {
    id: 'grammar-18',
    title: 'Plurals (Sound & Broken)',
    titleArabic: 'الْجَمْع',
    description: 'Master sound plurals and common broken plural patterns',
    level: 'intermediate',
    category: 'nouns',
    order: 18,
    exercises: ['ex-grammar-18-1', 'ex-grammar-18-2', 'ex-grammar-18-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has TWO types of plurals: Sound Plurals (regular endings) and Broken Plurals (internal pattern changes). Both are essential!',
      },
      {
        type: 'rule',
        content: 'Sound Masculine Plural: Add ـونَ (-ūna) or ـينَ (-īna) to words referring to male humans.',
      },
      {
        type: 'table',
        content: 'Sound Masculine Plural',
        tableData: {
          headers: ['Singular', 'Plural', 'English'],
          rows: [
            ['مُعَلِّم', 'مُعَلِّمُونَ', 'teachers (m)'],
            ['مُهَنْدِس', 'مُهَنْدِسُونَ', 'engineers (m)'],
            ['مُسْلِم', 'مُسْلِمُونَ', 'Muslims (m)'],
            ['عَامِل', 'عَامِلُونَ', 'workers (m)'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'Sound Feminine Plural: Add ـات (-āt) to words ending in ة. Also used for many foreign words.',
      },
      {
        type: 'table',
        content: 'Sound Feminine Plural',
        tableData: {
          headers: ['Singular', 'Plural', 'English'],
          rows: [
            ['مُعَلِّمَة', 'مُعَلِّمَات', 'teachers (f)'],
            ['سَيَّارَة', 'سَيَّارَات', 'cars'],
            ['طَائِرَة', 'طَائِرَات', 'airplanes'],
            ['جَامِعَة', 'جَامِعَات', 'universities'],
          ],
        },
      },
      {
        type: 'rule',
        content: 'Broken Plurals: The internal vowel pattern changes. These must be memorized, but common patterns exist.',
      },
      {
        type: 'table',
        content: 'Common Broken Plural Patterns',
        tableData: {
          headers: ['Pattern', 'Singular → Plural', 'English'],
          rows: [
            ['فُعُول', 'بَيْت → بُيُوت', 'house → houses'],
            ['أَفْعَال', 'قَلَم → أَقْلَام', 'pen → pens'],
            ['فُعَلَاء', 'صَدِيق → أَصْدِقَاء', 'friend → friends'],
            ['فِعَال', 'كِتَاب → كُتُب', 'book → books'],
            ['أَفْعِلَة', 'طَعَام → أَطْعِمَة', 'food → foods'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Broken plural examples',
        arabic: 'وَلَد → أَوْلَاد | رَجُل → رِجَال | يَوْم → أَيَّام',
        transliteration: 'walad → awlād | rajul → rijāl | yawm → ayyām',
        translation: 'boy → boys | man → men | day → days',
      },
      {
        type: 'note',
        content: 'Tip: Non-human plurals are treated as FEMININE SINGULAR for agreement. الكُتُب الجَدِيدَة (the new books) - not جَدِيدُون.',
      },
    ],
  },

  // LESSON 19: Dual Form
  {
    id: 'grammar-19',
    title: 'The Dual Form',
    titleArabic: 'الْمُثَنَّى',
    description: 'Learn the special Arabic form for exactly two things',
    level: 'intermediate',
    category: 'nouns',
    order: 19,
    exercises: ['ex-grammar-19-1', 'ex-grammar-19-2', 'ex-grammar-19-3'],
    content: [
      {
        type: 'text',
        content: 'Arabic has a special form for EXACTLY two of something - the dual (المثنى). It\'s used for nouns, adjectives, verbs, and pronouns!',
      },
      {
        type: 'rule',
        content: 'Dual Noun Endings: Add ـانِ (-āni) for nominative, or ـَيْنِ (-ayni) for accusative/genitive.',
      },
      {
        type: 'table',
        content: 'Dual Noun Formation',
        tableData: {
          headers: ['Singular', 'Dual (Nominative)', 'English'],
          rows: [
            ['كِتَاب', 'كِتَابَانِ', 'two books'],
            ['طَالِب', 'طَالِبَانِ', 'two students (m)'],
            ['طَالِبَة', 'طَالِبَتَانِ', 'two students (f)'],
            ['بَيْت', 'بَيْتَانِ', 'two houses'],
            ['يَوْم', 'يَوْمَانِ', 'two days'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Dual in sentences',
        arabic: 'عِنْدِي كِتَابَانِ',
        transliteration: 'ʿindī kitābāni',
        translation: 'I have two books',
      },
      {
        type: 'rule',
        content: 'Dual Pronouns: هُمَا (they two), أَنْتُمَا (you two) - same for both genders!',
      },
      {
        type: 'table',
        content: 'Dual Verb Conjugation',
        tableData: {
          headers: ['Person', 'Past', 'Present', 'English'],
          rows: [
            ['They two (m/f)', 'ذَهَبَا / ذَهَبَتَا', 'يَذْهَبَانِ / تَذْهَبَانِ', 'they two went/go'],
            ['You two (m/f)', 'ذَهَبْتُمَا', 'تَذْهَبَانِ', 'you two went/go'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Dual agreement',
        arabic: 'الطَّالِبَانِ ذَهَبَا إِلَى الْمَكْتَبَةِ',
        transliteration: 'aṭ-ṭālibāni dhahabā ilā al-maktabati',
        translation: 'The two students went to the library',
      },
      {
        type: 'note',
        content: 'Tip: Body parts that come in pairs naturally use dual: يَدَانِ (two hands), عَيْنَانِ (two eyes), أُذُنَانِ (two ears).',
      },
    ],
  },

  // LESSON 20: Object Pronouns
  {
    id: 'grammar-20',
    title: 'Object Pronouns (Attached)',
    titleArabic: 'الضَّمَائِر الْمُتَّصِلَة',
    description: 'Learn "me", "him", "her", "us" attached to verbs',
    level: 'intermediate',
    category: 'pronouns',
    order: 20,
    exercises: ['ex-grammar-20-1', 'ex-grammar-20-2', 'ex-grammar-20-3'],
    content: [
      {
        type: 'text',
        content: 'Object pronouns in Arabic are SUFFIXES attached directly to verbs. They\'re the same as possessive suffixes on nouns!',
      },
      {
        type: 'table',
        content: 'Object Pronoun Suffixes',
        tableData: {
          headers: ['English', 'Suffix', 'Example with رَآ (saw)'],
          rows: [
            ['me', 'ـنِي (-nī)', 'رَآنِي (he saw me)'],
            ['you (m)', 'ـكَ (-ka)', 'رَآكَ (he saw you)'],
            ['you (f)', 'ـكِ (-ki)', 'رَآكِ (he saw you)'],
            ['him', 'ـهُ (-hu)', 'رَآهُ (he saw him)'],
            ['her', 'ـهَا (-hā)', 'رَآهَا (he saw her)'],
            ['us', 'ـنَا (-nā)', 'رَآنَا (he saw us)'],
            ['them (m)', 'ـهُمْ (-hum)', 'رَآهُمْ (he saw them)'],
          ],
        },
      },
      {
        type: 'example',
        content: 'Object pronouns with verbs',
        arabic: 'سَأَلَتْنِي الْمُعَلِّمَةُ',
        transliteration: 'saʾalatni al-muʿallimatu',
        translation: 'The teacher (f) asked me',
      },
      {
        type: 'rule',
        content: 'With present tense verbs ending in ـونَ or ـينَ, the ن drops before the suffix.',
      },
      {
        type: 'example',
        content: 'Present tense with object',
        arabic: 'يُحِبُّونَهَا',
        transliteration: 'yuḥibbūnahā',
        translation: 'They love her',
      },
      {
        type: 'table',
        content: 'More Examples',
        tableData: {
          headers: ['Arabic', 'Transliteration', 'English'],
          rows: [
            ['أَخْبَرَنِي', 'akhbaranī', 'He told me'],
            ['سَاعَدْتُهُ', 'sāʿadtuhu', 'I helped him'],
            ['زَارُونَا', 'zārūnā', 'They visited us'],
            ['أَعْطَيْتُهَا الْكِتَابَ', 'aʿṭaytuhā al-kitāba', 'I gave her the book'],
            ['هَلْ فَهِمْتَنِي؟', 'hal fahimtanī?', 'Did you understand me?'],
          ],
        },
      },
      {
        type: 'note',
        content: 'Tip: When a verb takes two objects, the person comes before the thing: أَعْطَيْتُهُ الْمَالَ (I gave him the money).',
      },
    ],
  },
];

// Helper functions
export const getLessonById = (id: string): GrammarLesson | undefined => {
  return grammarLessons.find(lesson => lesson.id === id);
};

export const getLessonsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): GrammarLesson[] => {
  return grammarLessons.filter(lesson => lesson.level === level).sort((a, b) => a.order - b.order);
};

export const getLessonsByCategory = (category: GrammarLesson['category']): GrammarLesson[] => {
  return grammarLessons.filter(lesson => lesson.category === category).sort((a, b) => a.order - b.order);
};
