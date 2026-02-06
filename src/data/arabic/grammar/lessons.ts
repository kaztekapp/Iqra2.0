import { GrammarLesson, GrammarContent } from '../../../types/arabic';
import { verbLessons } from '../verbs/verbLessons';

export const grammarLessons: GrammarLesson[] = [
  // LESSON 1: The Arabic Alphabet Overview
  {
    id: 'grammar-1',
    title: 'The Arabic Writing System',
    titleArabic: 'نِظَامُ الْكِتَابَةِ الْعَرَبِيَّة',
    description: 'Discover the beautiful Arabic script - 28 letters, right-to-left flow, and connected writing',
    level: 'beginner',
    category: 'other',
    order: 1,
    exercises: ['ex-grammar-1-1', 'ex-grammar-1-2'],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'Welcome to the Arabic writing system! Arabic is one of the world\'s most beautiful scripts, written from [[right to left]] with [[28 letters]] that flow together like water. Unlike English print, Arabic letters connect to each other, creating elegant, flowing words.',
        arabicDescription: 'مَرْحَباً بِكَ فِي نِظَامِ الْكِتَابَةِ الْعَرَبِيَّة',
        arabicTranslation: 'Welcome to the Arabic writing system',
      },

      // The 28 Letters
      {
        type: 'rule',
        content: 'The Arabic alphabet has exactly [[28 letters]]. All letters are consonants — vowels are shown as small marks above or below letters, or sometimes not written at all!',
        arabicDescription: 'الْأَبْجَدِيَّة الْعَرَبِيَّة فِيهَا ثَمَانِيَة وَعِشْرُون حَرْفاً',
        arabicTranslation: 'The Arabic alphabet has twenty-eight letters',
      },

      // Full Alphabet Grid
      {
        type: 'letters_grid',
        content: 'The 28 Arabic Letters',
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'],
        letterType: 'moon',
      },

      // Right to Left
      {
        type: 'rule',
        content: 'Arabic is written and read from [[right to left]] — the opposite of English! Books open from what English readers would consider the "back." Numbers, however, are written left to right.',
        arabicDescription: 'نَكْتُبُ مِنَ الْيَمِين إِلَى الْيَسَار',
        arabicTranslation: 'We write from right to left',
      },

      // Direction comparison
      {
        type: 'comparison_grid',
        content: 'Reading Direction',
        leftLabel: 'Start Here ←',
        rightLabel: '← End Here',
        comparisons: [
          { left: { arabic: 'مَرْحَبا', label: 'Hello' }, right: { arabic: 'ً', label: '(read right to left)' } },
          { left: { arabic: 'كِتَاب', label: 'Book' }, right: { arabic: 'ً', label: '(read right to left)' } },
        ],
      },

      // Letter Forms
      {
        type: 'rule',
        content: 'Most Arabic letters have [[4 different shapes]] depending on their position in a word: [[isolated]] (alone), [[initial]] (beginning), [[medial]] (middle), and [[final]] (end). Don\'t worry — the changes follow patterns!',
        arabicDescription: 'لِكُلِّ حَرْفٍ أَرْبَعَة أَشْكَال',
        arabicTranslation: 'Each letter has four shapes',
      },

      // Letter Ba example
      {
        type: 'text',
        content: 'Letter Forms: ب (Ba)',
      },
      {
        type: 'examples_grid',
        content: 'The 4 forms of Ba',
        examples: [
          { arabic: 'ب', english: 'Isolated' },
          { arabic: 'بـ', english: 'Initial' },
          { arabic: 'ـبـ', english: 'Medial' },
          { arabic: 'ـب', english: 'Final' },
        ],
      },

      // Letter Seen example
      {
        type: 'text',
        content: 'Letter Forms: س (Seen)',
      },
      {
        type: 'examples_grid',
        content: 'The 4 forms of Seen',
        examples: [
          { arabic: 'س', english: 'Isolated' },
          { arabic: 'سـ', english: 'Initial' },
          { arabic: 'ـسـ', english: 'Medial' },
          { arabic: 'ـس', english: 'Final' },
        ],
      },

      // Letter Meem example
      {
        type: 'text',
        content: 'Letter Forms: م (Meem)',
      },
      {
        type: 'examples_grid',
        content: 'The 4 forms of Meem',
        examples: [
          { arabic: 'م', english: 'Isolated' },
          { arabic: 'مـ', english: 'Initial' },
          { arabic: 'ـمـ', english: 'Medial' },
          { arabic: 'ـم', english: 'Final' },
        ],
      },

      // Non-connector letters
      {
        type: 'rule',
        content: 'Six special letters [[NEVER connect]] to the letter after them. They only have 2 forms (isolated and final). These are called [[non-connectors]] — they always "lift the pen."',
        arabicDescription: 'سِتَّة حُرُوف لَا تَتَّصِل بِمَا بَعْدَهَا',
        arabicTranslation: 'Six letters do not connect to what follows them',
      },

      // Non-connector grid
      {
        type: 'letters_grid',
        content: 'The 6 Non-Connectors',
        letters: ['ا', 'د', 'ذ', 'ر', 'ز', 'و'],
        letterType: 'sun',
      },

      // Words with non-connectors
      {
        type: 'text',
        content: 'Words with Non-Connectors',
      },
      {
        type: 'examples_grid',
        content: 'Notice how these letters break the connection',
        examples: [
          { arabic: 'دَرَسَ', english: 'he studied' },
          { arabic: 'وَلَد', english: 'boy' },
          { arabic: 'زَهْرَة', english: 'flower' },
          { arabic: 'رَجُل', english: 'man' },
          { arabic: 'ذَهَبَ', english: 'he went' },
          { arabic: 'أَب', english: 'father' },
        ],
      },

      // Connected words examples
      {
        type: 'text',
        content: 'Beautifully Connected Words',
      },
      {
        type: 'examples_grid',
        content: 'See how letters flow together',
        examples: [
          { arabic: 'كِتَاب', english: 'book' },
          { arabic: 'مَكْتَب', english: 'desk/office' },
          { arabic: 'بَيْت', english: 'house' },
          { arabic: 'سَلَام', english: 'peace' },
          { arabic: 'جَمِيل', english: 'beautiful' },
          { arabic: 'مَسْجِد', english: 'mosque' },
          { arabic: 'طَعَام', english: 'food' },
          { arabic: 'قَلَم', english: 'pen' },
        ],
      },

      // Dots distinction
      {
        type: 'rule',
        content: 'Many Arabic letters share the same base shape and are distinguished only by [[dots]]. For example: [[ب]] (ba) has 1 dot below, [[ت]] (ta) has 2 dots above, [[ث]] (tha) has 3 dots above — same base shape!',
        arabicDescription: 'النُّقَط تُمَيِّز الْحُرُوف',
        arabicTranslation: 'Dots distinguish the letters',
      },

      // Dot families
      {
        type: 'text',
        content: 'Letter Families (Same Shape, Different Dots)',
      },
      {
        type: 'examples_grid',
        content: 'ب ت ث Family',
        examples: [
          { arabic: 'ب', english: '1 dot below' },
          { arabic: 'ت', english: '2 dots above' },
          { arabic: 'ث', english: '3 dots above' },
          { arabic: 'ن', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ج ح خ Family',
        examples: [
          { arabic: 'ج', english: '1 dot below' },
          { arabic: 'ح', english: 'no dots' },
          { arabic: 'خ', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'د ذ Family',
        examples: [
          { arabic: 'د', english: 'no dots' },
          { arabic: 'ذ', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ر ز Family',
        examples: [
          { arabic: 'ر', english: 'no dots' },
          { arabic: 'ز', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'س ش Family',
        examples: [
          { arabic: 'س', english: 'no dots' },
          { arabic: 'ش', english: '3 dots above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ص ض Family',
        examples: [
          { arabic: 'ص', english: 'no dots' },
          { arabic: 'ض', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ط ظ Family',
        examples: [
          { arabic: 'ط', english: 'no dots' },
          { arabic: 'ظ', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ع غ Family',
        examples: [
          { arabic: 'ع', english: 'no dots' },
          { arabic: 'غ', english: '1 dot above' },
        ],
      },

      {
        type: 'examples_grid',
        content: 'ف ق Family',
        examples: [
          { arabic: 'ف', english: '1 dot above' },
          { arabic: 'ق', english: '2 dots above' },
        ],
      },

      // Practice reading
      {
        type: 'text',
        content: 'Practice Reading These Words',
      },
      {
        type: 'examples_grid',
        content: 'Common words to practice',
        examples: [
          { arabic: 'مَاء', english: 'water' },
          { arabic: 'سَمَاء', english: 'sky' },
          { arabic: 'شَمْس', english: 'sun' },
          { arabic: 'قَمَر', english: 'moon' },
          { arabic: 'نَجْم', english: 'star' },
          { arabic: 'أَرْض', english: 'earth' },
          { arabic: 'بَحْر', english: 'sea' },
          { arabic: 'جَبَل', english: 'mountain' },
          { arabic: 'شَجَرَة', english: 'tree' },
          { arabic: 'وَرْدَة', english: 'rose' },
        ],
      },

      // Final tip
      {
        type: 'note',
        content: 'Practice Tip: Think of Arabic like cursive handwriting — letters flow together naturally. Start by recognizing letter shapes, then practice connecting them. The more you read, the faster you\'ll recognize words!',
        arabicDescription: 'كُلَّمَا قَرَأْتَ أَكْثَر، تَعَلَّمْتَ أَسْرَع',
        arabicTranslation: 'The more you read, the faster you learn',
      },
    ],
  },

  // LESSON 2: Vowels and Diacritics
  {
    id: 'grammar-2',
    title: 'Arabic Vowels (Harakat)',
    titleArabic: 'الْحَرَكَات',
    description: 'Master the short vowels, long vowels, sukun, shadda, and tanween',
    level: 'beginner',
    category: 'other',
    order: 2,
    exercises: ['ex-grammar-2-1', 'ex-grammar-2-2', 'ex-grammar-2-3'],
    content: [
      // Introduction
      {
        type: 'description',
        content: 'Arabic vowels are the soul of pronunciation! Unlike English where vowels are letters, Arabic uses [[small marks]] called [[حَرَكَات]] (harakat) placed above or below consonants. These marks tell you exactly how to pronounce each letter. In everyday writing, these marks are often omitted — but in the Quran and learning materials, they\'re always shown.',
        arabicDescription: 'الْحَرَكَات هِيَ رُوحُ النُّطْق',
        arabicTranslation: 'The vowel marks are the soul of pronunciation',
      },

      // Short Vowels Introduction
      {
        type: 'rule',
        content: 'Arabic has [[3 short vowels]] — tiny marks that create the sounds "a", "i", and "u". They are called [[فَتْحَة]] (fatha), [[كَسْرَة]] (kasra), and [[ضَمَّة]] (damma). Master these three and you can read any Arabic word!',
        arabicDescription: 'ثَلَاث حَرَكَات قَصِيرَة',
        arabicTranslation: 'Three short vowels',
      },

      // FATHA Section
      {
        type: 'text',
        content: 'فَتْحَة (Fatha) — The "A" Sound',
      },
      {
        type: 'rule',
        content: '[[Fatha]] is a small diagonal line [[ـَ]] placed ABOVE the letter. It makes the "a" sound as in "cat" or "father". The name [[فَتْحَة]] means "opening" because you open your mouth to say it!',
        arabicDescription: 'الْفَتْحَة فَوْقَ الْحَرْف',
        arabicTranslation: 'Fatha is above the letter',
      },
      {
        type: 'examples_grid',
        content: 'Letters with Fatha',
        examples: [
          { arabic: 'بَ', english: 'ba' },
          { arabic: 'تَ', english: 'ta' },
          { arabic: 'سَ', english: 'sa' },
          { arabic: 'مَ', english: 'ma' },
          { arabic: 'نَ', english: 'na' },
          { arabic: 'كَ', english: 'ka' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Fatha',
        examples: [
          { arabic: 'كَتَبَ', english: 'he wrote' },
          { arabic: 'ذَهَبَ', english: 'he went' },
          { arabic: 'فَتَحَ', english: 'he opened' },
          { arabic: 'جَلَسَ', english: 'he sat' },
          { arabic: 'سَمَك', english: 'fish' },
          { arabic: 'وَلَد', english: 'boy' },
        ],
      },

      // KASRA Section
      {
        type: 'text',
        content: 'كَسْرَة (Kasra) — The "I" Sound',
      },
      {
        type: 'rule',
        content: '[[Kasra]] is a small diagonal line [[ـِ]] placed BELOW the letter. It makes the "i" sound as in "sit" or "bit". The name [[كَسْرَة]] means "breaking" — think of it as breaking downward!',
        arabicDescription: 'الْكَسْرَة تَحْتَ الْحَرْف',
        arabicTranslation: 'Kasra is below the letter',
      },
      {
        type: 'examples_grid',
        content: 'Letters with Kasra',
        examples: [
          { arabic: 'بِ', english: 'bi' },
          { arabic: 'تِ', english: 'ti' },
          { arabic: 'سِ', english: 'si' },
          { arabic: 'مِ', english: 'mi' },
          { arabic: 'نِ', english: 'ni' },
          { arabic: 'كِ', english: 'ki' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Kasra',
        examples: [
          { arabic: 'كِتَاب', english: 'book' },
          { arabic: 'بِنْت', english: 'girl' },
          { arabic: 'مِفْتَاح', english: 'key' },
          { arabic: 'سِرّ', english: 'secret' },
          { arabic: 'فِيل', english: 'elephant' },
          { arabic: 'إِبْرَة', english: 'needle' },
        ],
      },

      // DAMMA Section
      {
        type: 'text',
        content: 'ضَمَّة (Damma) — The "U" Sound',
      },
      {
        type: 'rule',
        content: '[[Damma]] looks like a tiny [[و]] (waw) [[ـُ]] placed ABOVE the letter. It makes the "u" sound as in "put" or "book". The name [[ضَمَّة]] means "joining" — your lips come together!',
        arabicDescription: 'الضَّمَّة فَوْقَ الْحَرْف',
        arabicTranslation: 'Damma is above the letter',
      },
      {
        type: 'examples_grid',
        content: 'Letters with Damma',
        examples: [
          { arabic: 'بُ', english: 'bu' },
          { arabic: 'تُ', english: 'tu' },
          { arabic: 'سُ', english: 'su' },
          { arabic: 'مُ', english: 'mu' },
          { arabic: 'نُ', english: 'nu' },
          { arabic: 'كُ', english: 'ku' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Damma',
        examples: [
          { arabic: 'كُتُب', english: 'books' },
          { arabic: 'رُجُل', english: 'man' },
          { arabic: 'سُكَّر', english: 'sugar' },
          { arabic: 'قُلْب', english: 'heart' },
          { arabic: 'حُبّ', english: 'love' },
          { arabic: 'نُور', english: 'light' },
        ],
      },

      // Short Vowels Comparison
      {
        type: 'text',
        content: 'Compare All Three Short Vowels',
      },
      {
        type: 'comparison_grid',
        content: 'Same letter, different vowels',
        leftLabel: 'Letter',
        rightLabel: 'Three Sounds',
        comparisons: [
          { left: { arabic: 'ب', label: 'Ba' }, right: { arabic: 'بَ  بِ  بُ', label: 'ba - bi - bu' } },
          { left: { arabic: 'ك', label: 'Kaf' }, right: { arabic: 'كَ  كِ  كُ', label: 'ka - ki - ku' } },
          { left: { arabic: 'م', label: 'Meem' }, right: { arabic: 'مَ  مِ  مُ', label: 'ma - mi - mu' } },
        ],
      },

      // LONG VOWELS Section
      {
        type: 'rule',
        content: 'Arabic also has [[3 long vowels]] — they\'re like short vowels but held for twice as long! Long vowels are formed by adding a [[letter]] after a short vowel: [[ا]] (alif) for "aa", [[ي]] (ya) for "ee", [[و]] (waw) for "oo".',
        arabicDescription: 'ثَلَاث حَرَكَات طَوِيلَة',
        arabicTranslation: 'Three long vowels',
      },

      // Long A (Alif)
      {
        type: 'text',
        content: 'Long "AA" — Fatha + Alif (ـَا)',
      },
      {
        type: 'rule',
        content: 'When [[فَتْحَة]] is followed by [[ا]] (alif), the "a" sound is stretched long: "aa" as in "father". This combination [[ـَا]] creates the long "aa" sound.',
        arabicDescription: 'فَتْحَة + أَلِف = آ طَوِيلَة',
        arabicTranslation: 'Fatha + Alif = long AA',
      },
      {
        type: 'examples_grid',
        content: 'Words with Long AA',
        examples: [
          { arabic: 'بَاب', english: 'door' },
          { arabic: 'كِتَاب', english: 'book' },
          { arabic: 'سَلَام', english: 'peace' },
          { arabic: 'مَاء', english: 'water' },
          { arabic: 'سَمَاء', english: 'sky' },
          { arabic: 'نَار', english: 'fire' },
          { arabic: 'دَار', english: 'house' },
          { arabic: 'جَار', english: 'neighbor' },
        ],
      },

      // Long I (Ya)
      {
        type: 'text',
        content: 'Long "EE" — Kasra + Ya (ـِي)',
      },
      {
        type: 'rule',
        content: 'When [[كَسْرَة]] is followed by [[ي]] (ya), the "i" sound is stretched long: "ee" as in "see". This combination [[ـِي]] creates the long "ee" sound.',
        arabicDescription: 'كَسْرَة + يَاء = إِي طَوِيلَة',
        arabicTranslation: 'Kasra + Ya = long EE',
      },
      {
        type: 'examples_grid',
        content: 'Words with Long EE',
        examples: [
          { arabic: 'كَبِير', english: 'big' },
          { arabic: 'صَغِير', english: 'small' },
          { arabic: 'جَمِيل', english: 'beautiful' },
          { arabic: 'طَرِيق', english: 'road' },
          { arabic: 'صَدِيق', english: 'friend' },
          { arabic: 'عَظِيم', english: 'great' },
          { arabic: 'قَدِيم', english: 'old/ancient' },
          { arabic: 'جَدِيد', english: 'new' },
        ],
      },

      // Long U (Waw)
      {
        type: 'text',
        content: 'Long "OO" — Damma + Waw (ـُو)',
      },
      {
        type: 'rule',
        content: 'When [[ضَمَّة]] is followed by [[و]] (waw), the "u" sound is stretched long: "oo" as in "moon". This combination [[ـُو]] creates the long "oo" sound.',
        arabicDescription: 'ضَمَّة + وَاو = أُو طَوِيلَة',
        arabicTranslation: 'Damma + Waw = long OO',
      },
      {
        type: 'examples_grid',
        content: 'Words with Long OO',
        examples: [
          { arabic: 'نُور', english: 'light' },
          { arabic: 'سُور', english: 'wall/fence' },
          { arabic: 'طُور', english: 'mountain' },
          { arabic: 'حُور', english: 'companions' },
          { arabic: 'يَوْم', english: 'day' },
          { arabic: 'قُول', english: 'saying' },
          { arabic: 'رَسُول', english: 'messenger' },
          { arabic: 'بُيُوت', english: 'houses' },
        ],
      },

      // Short vs Long Comparison
      {
        type: 'comparison_grid',
        content: 'Short vs Long Vowels',
        leftLabel: 'Short',
        rightLabel: 'Long',
        comparisons: [
          { left: { arabic: 'كَتَبَ', label: 'kataba (he wrote)' }, right: { arabic: 'كِتَاب', label: 'kitaab (book)' } },
          { left: { arabic: 'بِنْت', label: 'bint (girl)' }, right: { arabic: 'بَنِين', label: 'baneen (sons)' } },
          { left: { arabic: 'كُتُب', label: 'kutub (books)' }, right: { arabic: 'مَكْتُوب', label: 'maktoob (written)' } },
        ],
      },

      // SUKUN Section
      {
        type: 'text',
        content: 'سُكُون (Sukun) — The Silent Mark',
      },
      {
        type: 'rule',
        content: '[[Sukun]] is a small circle [[ـْ]] placed ABOVE a letter. It means "silence" — the letter has [[NO vowel]] and stops abruptly. The name [[سُكُون]] means "stillness" or "rest".',
        arabicDescription: 'السُّكُون يَعْنِي لَا حَرَكَة',
        arabicTranslation: 'Sukun means no vowel',
      },
      {
        type: 'examples_grid',
        content: 'Letters with Sukun',
        examples: [
          { arabic: 'بْ', english: 'b (stop)' },
          { arabic: 'تْ', english: 't (stop)' },
          { arabic: 'سْ', english: 's (stop)' },
          { arabic: 'مْ', english: 'm (stop)' },
          { arabic: 'نْ', english: 'n (stop)' },
          { arabic: 'كْ', english: 'k (stop)' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Sukun',
        examples: [
          { arabic: 'قَلْب', english: 'heart (qalb)' },
          { arabic: 'بَحْر', english: 'sea (bahr)' },
          { arabic: 'شَمْس', english: 'sun (shams)' },
          { arabic: 'أَرْض', english: 'earth (ard)' },
          { arabic: 'عَيْن', english: 'eye (ayn)' },
          { arabic: 'بَيْت', english: 'house (bayt)' },
          { arabic: 'خُبْز', english: 'bread (khubz)' },
          { arabic: 'مِلْح', english: 'salt (milh)' },
        ],
      },

      // SHADDA Section
      {
        type: 'text',
        content: 'شَدَّة (Shadda) — The Doubling Mark',
      },
      {
        type: 'rule',
        content: '[[Shadda]] looks like a tiny "w" [[ـّ]] placed ABOVE a letter. It means the letter is [[DOUBLED]] — pronounced twice but written once! The name [[شَدَّة]] means "strength" or "emphasis".',
        arabicDescription: 'الشَّدَّة تُضَاعِف الْحَرْف',
        arabicTranslation: 'Shadda doubles the letter',
      },
      {
        type: 'examples_grid',
        content: 'Letters with Shadda',
        examples: [
          { arabic: 'بّ', english: 'bb' },
          { arabic: 'تّ', english: 'tt' },
          { arabic: 'سّ', english: 'ss' },
          { arabic: 'مّ', english: 'mm' },
          { arabic: 'نّ', english: 'nn' },
          { arabic: 'لّ', english: 'll' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Shadda',
        examples: [
          { arabic: 'مُحَمَّد', english: 'Muhammad' },
          { arabic: 'عَلَّمَ', english: 'he taught' },
          { arabic: 'سَلَّمَ', english: 'he greeted' },
          { arabic: 'حَقّ', english: 'truth/right' },
          { arabic: 'رَبّ', english: 'Lord' },
          { arabic: 'أُمّ', english: 'mother' },
          { arabic: 'جَنَّة', english: 'paradise' },
          { arabic: 'نَبِيّ', english: 'prophet' },
        ],
      },
      {
        type: 'note',
        content: 'Shadda combines with vowels! The vowel mark sits on top of (or below) the shadda: [[ـَّ]] (shadda + fatha = "bba"), [[ـِّ]] (shadda + kasra = "bbi"), [[ـُّ]] (shadda + damma = "bbu"). Look for these combinations in words!',
        arabicDescription: 'الشَّدَّة تَجْتَمِع مَعَ الْحَرَكَات',
        arabicTranslation: 'Shadda combines with vowels',
      },
      {
        type: 'examples_grid',
        content: 'Shadda + Vowel Combinations',
        examples: [
          { arabic: 'رَبَّنَا', english: 'Rabbana (Our Lord) - شَدَّة + فَتْحَة' },
          { arabic: 'رَبِّي', english: 'Rabbi (My Lord) - شَدَّة + كَسْرَة' },
          { arabic: 'أُمِّي', english: 'Ummi (My mother) - شَدَّة + كَسْرَة' },
          { arabic: 'مُحَمَّدٌ', english: 'Muhammad - شَدَّة + فَتْحَة' },
          { arabic: 'عَلَّمَ', english: '\'Allama (He taught) - شَدَّة + فَتْحَة' },
          { arabic: 'يُسَبِّحُ', english: 'Yusabbihu (He glorifies) - شَدَّة + كَسْرَة' },
        ],
      },

      // TANWEEN Section
      {
        type: 'text',
        content: 'تَنْوِين (Tanween) — The "N" Ending',
      },
      {
        type: 'rule',
        content: '[[Tanween]] adds an "n" sound to the end of a word. It\'s shown by [[doubling the vowel mark]]: [[ـً]] (an), [[ـٍ]] (in), [[ـٌ]] (un). Tanween indicates an indefinite noun — like "a/an" in English!',
        arabicDescription: 'التَّنْوِين يُضِيف صَوْت النُّون',
        arabicTranslation: 'Tanween adds the "N" sound',
      },
      {
        type: 'examples_grid',
        content: 'The Three Tanween',
        examples: [
          { arabic: 'ـًا', english: 'an - فَتْحَتَان (fathatan)' },
          { arabic: 'ـٍ', english: 'in - كَسْرَتَان (kasratan)' },
          { arabic: 'ـٌ', english: 'un - ضَمَّتَان (dammatan)' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Words with Tanween',
        examples: [
          { arabic: 'كِتَابًا', english: 'Kitaaban (a book) - فَتْحَتَان' },
          { arabic: 'بَيْتًا', english: 'Baytan (a house) - فَتْحَتَان' },
          { arabic: 'قَلَمًا', english: 'Qalaman (a pen) - فَتْحَتَان' },
          { arabic: 'وَقْتٍ', english: 'Waqtin (a time) - كَسْرَتَان' },
          { arabic: 'بَيْتٍ', english: 'Baytin (a house) - كَسْرَتَان' },
          { arabic: 'رَجُلٍ', english: 'Rajulin (a man) - كَسْرَتَان' },
          { arabic: 'كِتَابٌ', english: 'Kitaabun (a book) - ضَمَّتَان' },
          { arabic: 'رَجُلٌ', english: 'Rajulun (a man) - ضَمَّتَان' },
        ],
      },
      {
        type: 'note',
        content: 'Fathatan [[ـً]] usually requires an extra [[ا]] (alif) at the end: [[ـًا]]. Exception: words ending in [[ة]] (ta marbuta) or [[ء]] (hamza).',
        arabicDescription: 'الْفَتْحَتَان تَحْتَاج أَلِفًا',
        arabicTranslation: 'Fathatan needs an Alif',
      },
      {
        type: 'examples_grid',
        content: 'Fathatan Examples',
        examples: [
          { arabic: 'كِتَابًا', english: 'Kitaaban (a book) - with alif' },
          { arabic: 'بَيْتًا', english: 'Baytan (a house) - with alif' },
          { arabic: 'قَلَمًا', english: 'Qalaman (a pen) - with alif' },
          { arabic: 'جَمِيلَةً', english: 'Jamilatan (beautiful) - ة exception' },
          { arabic: 'مَدْرَسَةً', english: 'Madrasatan (a school) - ة exception' },
          { arabic: 'سَمَاءً', english: "Samaa'an (a sky) - ء exception" },
        ],
      },

      // Complete Vowel Chart with Examples
      {
        type: 'text',
        content: 'Complete Vowel Reference with Examples',
      },
      {
        type: 'examples_grid',
        content: 'Short Vowels',
        examples: [
          { arabic: 'كَتَبَ', english: 'Fatha - [[a]]' },
          { arabic: 'كِتَاب', english: 'Kasra - [[i]]' },
          { arabic: 'كُتُب', english: 'Damma - [[u]]' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Long Vowels',
        examples: [
          { arabic: 'بَاب', english: 'Long - [[aa]]' },
          { arabic: 'كَبِير', english: 'Long - [[ee]]' },
          { arabic: 'نُور', english: 'Long - [[oo]]' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Special Marks',
        examples: [
          { arabic: 'قَلْب', english: 'Sukun - [[silent]]' },
          { arabic: 'مُحَمَّد', english: 'Shadda - [[mm]]' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Tanween (Nunation)',
        examples: [
          { arabic: 'كِتَابًا', english: 'Fathatan - [[an]]' },
          { arabic: 'وَقْتٍ', english: 'Kasratan - [[in]]' },
          { arabic: 'كِتَابٌ', english: 'Dammatan - [[un]]' },
        ],
      },

      // Practice Reading
      {
        type: 'text',
        content: 'Practice Reading — Full Words',
      },
      {
        type: 'examples_grid',
        content: 'Read these words with all vowel marks',
        examples: [
          { arabic: 'بِسْمِ اللهِ', english: 'In the name of Allah' },
          { arabic: 'الْحَمْدُ لِلَّهِ', english: 'Praise be to Allah' },
          { arabic: 'السَّلَامُ عَلَيْكُم', english: 'Peace be upon you' },
          { arabic: 'إِنْ شَاءَ اللهُ', english: 'God willing' },
          { arabic: 'مَا شَاءَ اللهُ', english: 'As Allah willed' },
          { arabic: 'جَزَاكَ اللهُ خَيْرًا', english: 'May Allah reward you' },
        ],
      },

      // Final tip
      {
        type: 'note',
        content: 'Reading Tip: In most Arabic texts (newspapers, books, signs), vowel marks are [[NOT written]] — only consonants appear! Readers use context and knowledge to pronounce words correctly. The Quran, children\'s books, and learning materials always include full vowel marks.',
        arabicDescription: 'الْقُرْآن دَائِمًا مُشَكَّل بِالْكَامِل',
        arabicTranslation: 'The Quran is always fully vowelized',
      },
    ],
  },

  // LESSON 3: The Definite Article
  {
    id: 'grammar-3',
    title: 'The Definite Article (ال)',
    titleArabic: 'أَدَاةُ التَّعْرِيف',
    description: 'Master the Arabic word for "the" and discover the beautiful system of Sun and Moon letters',
    level: 'beginner',
    category: 'articles',
    order: 3,
    exercises: ['ex-grammar-3-1', 'ex-grammar-3-2', 'ex-grammar-3-3'],
    content: [
      // Introduction with bilingual description
      {
        type: 'description',
        content: 'In Arabic, there is only ONE word for "the" — it\'s [[أَلْ]] and it attaches directly to the beginning of nouns. The beautiful part? Arabic has NO word for "a" or "an" — to say "a book," you simply say the word without [[أَلْ]]!',
        arabicDescription: 'أَلْ هِيَ أَدَاةُ التَّعْرِيف فِي اللُّغَةِ الْعَرَبِيَّة',
        arabicTranslation: 'Al is the definite article in the Arabic language',
      },

      // Comparison examples showing indefinite vs definite
      {
        type: 'comparison_grid',
        content: 'Making Words Definite',
        leftLabel: 'Indefinite',
        rightLabel: 'Definite',
        comparisons: [
          { left: { arabic: 'كِتَاب', label: 'a book' }, right: { arabic: 'الْكِتَاب', label: 'the book' } },
          { left: { arabic: 'بَيْت', label: 'a house' }, right: { arabic: 'الْبَيْت', label: 'the house' } },
          { left: { arabic: 'قَلَم', label: 'a pen' }, right: { arabic: 'الْقَلَم', label: 'the pen' } },
          { left: { arabic: 'بَاب', label: 'a door' }, right: { arabic: 'الْبَاب', label: 'the door' } },
          { left: { arabic: 'وَلَد', label: 'a boy' }, right: { arabic: 'الْوَلَد', label: 'the boy' } },
          { left: { arabic: 'بِنْت', label: 'a girl' }, right: { arabic: 'الْبِنْت', label: 'the girl' } },
        ],
      },

      // Sun Letters Rule
      {
        type: 'rule',
        content: 'The 14 Sun Letters are special — when [[أَلْ]] comes before them, the [[ل]] becomes silent and the letter is pronounced twice (doubled). This is shown with a [[شَدَّة]] (ـّ) mark.',
        arabicDescription: 'الْحُرُوف الشَّمْسِيَّة: يُدْغَمُ فِيهَا اللَّام',
        arabicTranslation: 'Sun letters: the Lam assimilates into them',
      },

      // Sun Letters Grid
      {
        type: 'letters_grid',
        content: 'Sun Letters ☀️',
        letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ن', 'ل'],
        letterType: 'sun',
      },

      // Sun Letter Examples
      {
        type: 'text',
        content: 'Sun Letter Examples',
      },
      {
        type: 'examples_grid',
        content: 'Examples with Sun Letters',
        examples: [
          { arabic: 'الشَّمْس', english: 'the sun' },
          { arabic: 'السَّلَام', english: 'the peace' },
          { arabic: 'النُّور', english: 'the light' },
          { arabic: 'الرَّجُل', english: 'the man' },
          { arabic: 'الدَّرْس', english: 'the lesson' },
          { arabic: 'التُّفَّاحَة', english: 'the apple' },
          { arabic: 'الطَّعَام', english: 'the food' },
          { arabic: 'الزَّهْرَة', english: 'the flower' },
          { arabic: 'الصَّبَاح', english: 'the morning' },
          { arabic: 'الثَّوْب', english: 'the garment' },
        ],
      },

      // Moon Letters Rule
      {
        type: 'rule',
        content: 'The 14 Moon Letters keep the [[ل]] sound clear and unchanged. You pronounce the full [[أَلْ]] before these letters. The [[ل]] shows a [[سُكُون]] (ـْ) mark.',
        arabicDescription: 'الْحُرُوف الْقَمَرِيَّة: يُظْهَرُ فِيهَا اللَّام',
        arabicTranslation: 'Moon letters: the Lam is pronounced clearly',
      },

      // Moon Letters Grid
      {
        type: 'letters_grid',
        content: 'Moon Letters 🌙',
        letters: ['ا', 'ب', 'ج', 'ح', 'خ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'هـ', 'و', 'ي'],
        letterType: 'moon',
      },

      // Moon Letter Examples
      {
        type: 'text',
        content: 'Moon Letter Examples',
      },
      {
        type: 'examples_grid',
        content: 'Examples with Moon Letters',
        examples: [
          { arabic: 'الْقَمَر', english: 'the moon' },
          { arabic: 'الْكِتَاب', english: 'the book' },
          { arabic: 'الْبَيْت', english: 'the house' },
          { arabic: 'الْمَاء', english: 'the water' },
          { arabic: 'الْوَلَد', english: 'the boy' },
          { arabic: 'الْجَبَل', english: 'the mountain' },
          { arabic: 'الْحَدِيقَة', english: 'the garden' },
          { arabic: 'الْفِيل', english: 'the elephant' },
          { arabic: 'الْعَيْن', english: 'the eye' },
          { arabic: 'الْيَوْم', english: 'the day' },
        ],
      },

      // Memory tip
      {
        type: 'note',
        content: 'Memory Tip: The word [[الشَّمْس]] (the sun) starts with a sun letter, and [[الْقَمَر]] (the moon) starts with a moon letter! That\'s how these letter groups got their names.',
        arabicDescription: 'نُسَمِّيهَا شَمْسِيَّة وَقَمَرِيَّة نِسْبَةً إِلَى الشَّمْس وَالْقَمَر',
        arabicTranslation: 'We call them sun and moon letters in reference to the sun and moon',
      },

      // Practical examples in sentences
      {
        type: 'text',
        content: 'Used in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Practical Sentences',
        examples: [
          { arabic: 'الْكِتَابُ عَلَى الطَّاوِلَة', english: 'The book is on the table' },
          { arabic: 'الشَّمْسُ جَمِيلَة', english: 'The sun is beautiful' },
          { arabic: 'الْوَلَدُ فِي الْبَيْت', english: 'The boy is in the house' },
          { arabic: 'الْمَاءُ بَارِد', english: 'The water is cold' },
        ],
      },
    ],
  },

  // LESSON: Indefinite Articles & Tanween
  {
    id: 'grammar-indefinite',
    title: 'Indefinite Articles & Tanween',
    titleArabic: 'النَّكِرَة وَالتَّنْوِين',
    description: 'Learn how Arabic expresses "a/an" through the absence of ال and the beautiful system of Tanween',
    level: 'beginner',
    category: 'articles',
    order: 3.5,
    exercises: ['ex-grammar-indef-1', 'ex-grammar-indef-2', 'ex-grammar-indef-3'],
    content: [
      // Introduction with bilingual description
      {
        type: 'description',
        content: 'Unlike English, Arabic has [[NO separate word]] for "a" or "an"! Instead, a noun is indefinite simply by [[not having]] [[أَلْ]] (the). To emphasize indefiniteness, Arabic uses [[Tanween]] — a special "n" sound added to the end of words.',
        arabicDescription: 'النَّكِرَة هِيَ الاسْم بِدُون أَلْ',
        arabicTranslation: 'Indefinite is a noun without Al',
      },

      // Basic concept
      {
        type: 'rule',
        content: 'Simple rule: [[Without أَلْ]] = indefinite (a/an). [[With أَلْ]] = definite (the). When you see a bare noun without أَلْ, it means "a" or "an" in English!',
        arabicDescription: 'بِدُون أَلْ = نَكِرَة، مَعَ أَلْ = مَعْرِفَة',
        arabicTranslation: 'Without Al = indefinite, With Al = definite',
      },

      // Comparison examples showing indefinite vs definite
      {
        type: 'comparison_grid',
        content: 'Indefinite vs Definite',
        leftLabel: 'Indefinite (a/an)',
        rightLabel: 'Definite (the)',
        comparisons: [
          { left: { arabic: 'كِتَاب', label: 'a book' }, right: { arabic: 'الْكِتَاب', label: 'the book' } },
          { left: { arabic: 'بَيْت', label: 'a house' }, right: { arabic: 'الْبَيْت', label: 'the house' } },
          { left: { arabic: 'وَلَد', label: 'a boy' }, right: { arabic: 'الْوَلَد', label: 'the boy' } },
          { left: { arabic: 'بِنْت', label: 'a girl' }, right: { arabic: 'الْبِنْت', label: 'the girl' } },
          { left: { arabic: 'سَيَّارَة', label: 'a car' }, right: { arabic: 'السَّيَّارَة', label: 'the car' } },
          { left: { arabic: 'مَدْرَسَة', label: 'a school' }, right: { arabic: 'الْمَدْرَسَة', label: 'the school' } },
        ],
      },

      // Tanween Introduction
      {
        type: 'text',
        content: 'What is Tanween?',
      },
      {
        type: 'description',
        content: '[[Tanween]] (تَنْوِين) means "nunation" — adding an "n" sound to the end of a word. It\'s written by [[doubling]] the short vowel mark. Tanween is a clear marker that a noun is [[indefinite]].',
        arabicDescription: 'التَّنْوِين هُوَ نُون سَاكِنَة تُضَاف آخِر الاسْم',
        arabicTranslation: 'Tanween is a silent noon added to the end of a noun',
      },

      // Three Types of Tanween
      {
        type: 'rule',
        content: 'There are [[THREE]] types of Tanween, each with a different sound: [[ـً]] (an), [[ـٍ]] (in), and [[ـٌ]] (un). Which one you use depends on the [[grammatical case]] of the noun.',
        arabicDescription: 'ثَلَاثَة أَنْوَاع: فَتْحَتَان، كَسْرَتَان، ضَمَّتَان',
        arabicTranslation: 'Three types: Fathatan, Kasratan, Dammatan',
      },

      // Tanween Chart
      {
        type: 'table',
        content: 'Tanween Types',
        tableData: {
          headers: ['Tanween', 'Sound', 'Written', 'Case'],
          rows: [
            ['فَتْحَتَان', '-an', 'ـًا / ـً', 'Accusative (Object)'],
            ['كَسْرَتَان', '-in', 'ـٍ', 'Genitive (After preposition)'],
            ['ضَمَّتَان', '-un', 'ـٌ', 'Nominative (Subject)'],
          ],
        },
      },

      // Reassuring note about grammatical cases
      {
        type: 'note',
        content: "Don't worry if \"Nominative\", \"Accusative\", and \"Genitive\" sound confusing right now! These are grammatical cases that will be explained in detail later in the course (Lessons 31-33). For now, just focus on [[recognizing]] the three Tanween sounds and knowing they mark indefinite nouns.",
        arabicDescription: 'لَا تَقْلَق! سَتَتَعَلَّم الإِعْرَاب لَاحِقًا',
        arabicTranslation: "Don't worry! You will learn grammatical cases later",
      },

      // Dammatan - Subject case
      {
        type: 'text',
        content: 'Dammatan (ـٌ) — Subject Case',
      },
      {
        type: 'note',
        content: 'Use [[Dammatan]] ([[ـٌ]] = "un") when the indefinite noun is the [[subject]] of the sentence — the one doing the action.',
        arabicDescription: 'الضَّمَّتَان لِلْفَاعِل وَالْمُبْتَدَأ',
        arabicTranslation: 'Dammatan for the doer and subject',
      },
      {
        type: 'examples_grid',
        content: 'Dammatan Examples',
        examples: [
          { arabic: 'وَلَدٌ', english: 'a boy (subject)' },
          { arabic: 'كِتَابٌ', english: 'a book (subject)' },
          { arabic: 'بَيْتٌ', english: 'a house (subject)' },
          { arabic: 'سَيَّارَةٌ', english: 'a car (subject)' },
        ],
      },

      // Fathatan - Object case
      {
        type: 'text',
        content: 'Fathatan (ـًا) — Object Case',
      },
      {
        type: 'note',
        content: 'Use [[Fathatan]] ([[ـً]] = "an") when the indefinite noun is the [[object]] — receiving the action. Note: Fathatan usually needs an extra [[ا]] (alif) unless the word ends in [[ة]] or [[ء]].',
        arabicDescription: 'الْفَتْحَتَان لِلْمَفْعُول بِه',
        arabicTranslation: 'Fathatan for the object',
      },
      {
        type: 'examples_grid',
        content: 'Fathatan Examples',
        examples: [
          { arabic: 'كِتَابًا', english: 'a book (object)' },
          { arabic: 'بَيْتًا', english: 'a house (object)' },
          { arabic: 'قَلَمًا', english: 'a pen (object)' },
          { arabic: 'سَيَّارَةً', english: 'a car (object) - no alif with ة' },
        ],
      },

      // Kasratan - After prepositions
      {
        type: 'text',
        content: 'Kasratan (ـٍ) — Genitive Case',
      },
      {
        type: 'note',
        content: 'Use [[Kasratan]] ([[ـٍ]] = "in") when the indefinite noun comes [[after a preposition]] (في، مِن، إلى، على، etc.) or is the second part of an [[Idafa]] (possession).',
        arabicDescription: 'الْكَسْرَتَان لِلاسْم الْمَجْرُور',
        arabicTranslation: 'Kasratan for nouns after prepositions',
      },
      {
        type: 'examples_grid',
        content: 'Kasratan Examples',
        examples: [
          { arabic: 'فِي بَيْتٍ', english: 'in a house' },
          { arabic: 'مِنْ كِتَابٍ', english: 'from a book' },
          { arabic: 'إِلَى مَدْرَسَةٍ', english: 'to a school' },
          { arabic: 'عَلَى طَاوِلَةٍ', english: 'on a table' },
        ],
      },

      // Comparison of all three
      {
        type: 'text',
        content: 'Same Word, Different Tanween',
      },
      {
        type: 'description',
        content: 'Watch how the SAME word changes its Tanween based on its role in the sentence:',
      },
      {
        type: 'examples_grid',
        content: 'Tanween in Action',
        examples: [
          { arabic: 'وَلَدٌ جَاءَ', english: 'A boy came (subject = ـٌ)' },
          { arabic: 'رَأَيْتُ وَلَدًا', english: 'I saw a boy (object = ـًا)' },
          { arabic: 'سَلَّمْتُ عَلَى وَلَدٍ', english: 'I greeted a boy (after prep = ـٍ)' },
        ],
      },

      // Practical sentences
      {
        type: 'text',
        content: 'Indefinite Nouns in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Practical Sentences',
        examples: [
          { arabic: 'هَذَا كِتَابٌ', english: 'This is a book' },
          { arabic: 'قَرَأْتُ كِتَابًا', english: 'I read a book' },
          { arabic: 'أَنَا فِي غُرْفَةٍ', english: 'I am in a room' },
          { arabic: 'عِنْدِي سُؤَالٌ', english: 'I have a question' },
          { arabic: 'رَأَيْتُ رَجُلًا', english: 'I saw a man' },
          { arabic: 'ذَهَبْتُ إِلَى سُوقٍ', english: 'I went to a market' },
        ],
      },

      // Memory tip
      {
        type: 'note',
        content: 'Memory Tip: Think of Tanween as saying the word with an "n" at the end — [[كِتَابٌ]] sounds like "kitaab-UN", [[كِتَابًا]] like "kitaab-AN", and [[كِتَابٍ]] like "kitaab-IN". The doubled marks show this "n" sound!',
        arabicDescription: 'التَّنْوِين صَوْت النُّون فِي آخِر الْكَلِمَة',
        arabicTranslation: 'Tanween is the sound of Noon at the end of the word',
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
        type: 'description',
        content: 'Arabic pronouns are fascinating! Unlike English, they distinguish between [[masculine]] and [[feminine]], and have special forms for [[singular]], [[dual]] (exactly two), and [[plural]]. Mastering pronouns is your key to building sentences!',
        arabicDescription: 'الضَّمَائِر أَسَاس بِنَاء الْجُمَل',
        arabicTranslation: 'Pronouns are the foundation of building sentences',
      },
      {
        type: 'rule',
        content: 'The pronoun [[أَنَا]] (I) is gender-neutral — the same for men and women. But "you" and "they" have [[separate masculine and feminine]] forms!',
        arabicDescription: 'أَنَا لِلْمُذَكَّر وَالْمُؤَنَّث',
        arabicTranslation: '"I" is for both masculine and feminine',
      },

      {
        type: 'text',
        content: 'First Person — I & We',
      },
      {
        type: 'examples_grid',
        content: 'Talking about yourself',
        examples: [
          { arabic: 'أَنَا', english: 'I' },
          { arabic: 'نَحْنُ', english: 'We' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with I & We',
        examples: [
          { arabic: 'أَنَا سَعِيدٌ', english: 'I am happy (m)' },
          { arabic: 'أَنَا سَعِيدَةٌ', english: 'I am happy (f)' },
          { arabic: 'نَحْنُ هُنَا', english: 'We are here' },
          { arabic: 'نَحْنُ مُسْلِمُونَ', english: 'We are Muslims' },
        ],
      },

      {
        type: 'text',
        content: 'Second Person — You (Singular)',
      },
      {
        type: 'examples_grid',
        content: 'Talking to one person',
        examples: [
          { arabic: 'أَنْتَ', english: 'You (to a man)' },
          { arabic: 'أَنْتِ', english: 'You (to a woman)' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with You (singular)',
        examples: [
          { arabic: 'أَنْتَ طَالِبٌ', english: 'You are a student (m)' },
          { arabic: 'أَنْتِ طَالِبَةٌ', english: 'You are a student (f)' },
          { arabic: 'أَنْتَ مِنْ أَيْنَ؟', english: 'Where are you from? (m)' },
          { arabic: 'أَنْتِ جَمِيلَةٌ', english: 'You are beautiful (f)' },
        ],
      },

      {
        type: 'text',
        content: 'Second Person — You (Plural)',
      },
      {
        type: 'examples_grid',
        content: 'Talking to a group',
        examples: [
          { arabic: 'أَنْتُمْ', english: 'You all (to men/mixed)' },
          { arabic: 'أَنْتُنَّ', english: 'You all (to women only)' },
          { arabic: 'أَنْتُمَا', english: 'You two (dual)' },
        ],
      },

      {
        type: 'text',
        content: 'Third Person — He & She',
      },
      {
        type: 'examples_grid',
        content: 'Talking about someone',
        examples: [
          { arabic: 'هُوَ', english: 'He' },
          { arabic: 'هِيَ', english: 'She' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with He & She',
        examples: [
          { arabic: 'هُوَ طَبِيبٌ', english: 'He is a doctor' },
          { arabic: 'هِيَ طَبِيبَةٌ', english: 'She is a doctor' },
          { arabic: 'هُوَ مِنْ مِصْرَ', english: 'He is from Egypt' },
          { arabic: 'هِيَ فِي الْبَيْتِ', english: 'She is at home' },
        ],
      },

      {
        type: 'text',
        content: 'Third Person — They',
      },
      {
        type: 'examples_grid',
        content: 'Talking about a group',
        examples: [
          { arabic: 'هُمْ', english: 'They (men/mixed)' },
          { arabic: 'هُنَّ', english: 'They (women only)' },
          { arabic: 'هُمَا', english: 'They two (dual)' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with They',
        examples: [
          { arabic: 'هُمْ أَصْدِقَائِي', english: 'They are my friends' },
          { arabic: 'هُمْ فِي الْمَدْرَسَةِ', english: 'They are at school' },
          { arabic: 'هُنَّ مُعَلِّمَاتٌ', english: 'They (f) are teachers' },
          { arabic: 'هُمَا أَخَوَانِ', english: 'They two are brothers' },
        ],
      },

      {
        type: 'note',
        content: 'In everyday spoken Arabic, [[أَنْتُنَّ]] (you all - fem) and [[هُنَّ]] (they - fem) are rarely used. Most people use [[أَنْتُمْ]] and [[هُمْ]] for everyone!',
        arabicDescription: 'فِي الْعَامِّيَّة نَسْتَخْدِم أَنْتُمْ وَهُمْ لِلْجَمِيع',
        arabicTranslation: 'In colloquial Arabic, we use antum and hum for everyone',
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
        type: 'description',
        content: 'In Arabic, every noun has a gender — either [[masculine]] (مُذَكَّر) or [[feminine]] (مُؤَنَّث). This is crucial because adjectives, verbs, and pronouns must all match the gender of the noun!',
        arabicDescription: 'كُلّ اسْم إِمَّا مُذَكَّر أَوْ مُؤَنَّث',
        arabicTranslation: 'Every noun is either masculine or feminine',
      },
      {
        type: 'rule',
        content: 'The magic letter [[ة]] (Ta Marbuta) is the key sign of feminine nouns! Most feminine words end with this special letter. It sounds like "a" at the end of a word, or "at" when followed by another word.',
        arabicDescription: 'التَّاء الْمَرْبُوطَة عَلَامَة التَّأْنِيث',
        arabicTranslation: 'Ta Marbuta is the sign of femininity',
      },

      {
        type: 'text',
        content: 'People — Masculine vs Feminine',
      },
      {
        type: 'comparison_grid',
        content: 'Add ة to make feminine',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine',
        comparisons: [
          { left: { arabic: 'مُعَلِّم', label: 'teacher (m)' }, right: { arabic: 'مُعَلِّمَة', label: 'teacher (f)' } },
          { left: { arabic: 'طَالِب', label: 'student (m)' }, right: { arabic: 'طَالِبَة', label: 'student (f)' } },
          { left: { arabic: 'طَبِيب', label: 'doctor (m)' }, right: { arabic: 'طَبِيبَة', label: 'doctor (f)' } },
          { left: { arabic: 'صَدِيق', label: 'friend (m)' }, right: { arabic: 'صَدِيقَة', label: 'friend (f)' } },
        ],
      },

      {
        type: 'text',
        content: 'Adjectives — Must Match Gender!',
      },
      {
        type: 'comparison_grid',
        content: 'Adjectives change with gender',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine',
        comparisons: [
          { left: { arabic: 'كَبِير', label: 'big (m)' }, right: { arabic: 'كَبِيرَة', label: 'big (f)' } },
          { left: { arabic: 'صَغِير', label: 'small (m)' }, right: { arabic: 'صَغِيرَة', label: 'small (f)' } },
          { left: { arabic: 'جَمِيل', label: 'beautiful (m)' }, right: { arabic: 'جَمِيلَة', label: 'beautiful (f)' } },
          { left: { arabic: 'سَعِيد', label: 'happy (m)' }, right: { arabic: 'سَعِيدَة', label: 'happy (f)' } },
        ],
      },

      {
        type: 'text',
        content: 'Examples in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Masculine sentences',
        examples: [
          { arabic: 'هُوَ طَالِبٌ جَدِيدٌ', english: 'He is a new student' },
          { arabic: 'الْوَلَدُ كَبِيرٌ', english: 'The boy is big' },
          { arabic: 'الْكِتَابُ جَمِيلٌ', english: 'The book is beautiful' },
          { arabic: 'أَخِي طَبِيبٌ', english: 'My brother is a doctor' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Feminine sentences',
        examples: [
          { arabic: 'هِيَ طَالِبَةٌ جَدِيدَةٌ', english: 'She is a new student' },
          { arabic: 'الْبِنْتُ كَبِيرَةٌ', english: 'The girl is big' },
          { arabic: 'الْمَدْرَسَةُ جَمِيلَةٌ', english: 'The school is beautiful' },
          { arabic: 'أُخْتِي طَبِيبَةٌ', english: 'My sister is a doctor' },
        ],
      },

      {
        type: 'rule',
        content: 'Some nouns are [[naturally feminine]] without [[ة]]: body parts in pairs ([[يَد]] hand, [[عَيْن]] eye, [[أُذُن]] ear), and special words like [[شَمْس]] (sun), [[أَرْض]] (earth), [[نَار]] (fire).',
        arabicDescription: 'بَعْض الْأَسْمَاء مُؤَنَّثَة بِلَا تَاء',
        arabicTranslation: 'Some nouns are feminine without Ta Marbuta',
      },

      {
        type: 'text',
        content: 'Naturally Feminine Words',
      },
      {
        type: 'examples_grid',
        content: 'No ة but still feminine!',
        examples: [
          { arabic: 'الشَّمْسُ سَاطِعَةٌ', english: 'The sun is bright' },
          { arabic: 'الْأَرْضُ كَبِيرَةٌ', english: 'The earth is big' },
          { arabic: 'النَّارُ حَارَّةٌ', english: 'The fire is hot' },
          { arabic: 'الْيَدُ نَظِيفَةٌ', english: 'The hand is clean' },
          { arabic: 'الْعَيْنُ جَمِيلَةٌ', english: 'The eye is beautiful' },
          { arabic: 'الرِّيحُ قَوِيَّةٌ', english: 'The wind is strong' },
        ],
      },

      {
        type: 'note',
        content: 'Remember: When describing a feminine noun, the adjective MUST also be feminine! [[وَلَدٌ كَبِيرٌ]] (big boy) but [[بِنْتٌ كَبِيرَةٌ]] (big girl).',
        arabicDescription: 'الصِّفَة تَتْبَع الْمَوْصُوف فِي التَّذْكِير وَالتَّأْنِيث',
        arabicTranslation: 'The adjective follows the noun in gender',
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
        type: 'description',
        content: 'Great news for beginners! Arabic has [[nominal sentences]] that don\'t need the verb "to be"! In English you say "I am a student" — in Arabic you simply say [[أَنَا طَالِبٌ]] (I student). No "am" needed!',
        arabicDescription: 'الْجُمْلَة الاِسْمِيَّة لَا تَحْتَاج فِعْلًا',
        arabicTranslation: 'The nominal sentence does not need a verb',
      },
      {
        type: 'rule',
        content: 'A nominal sentence has two parts: [[المُبْتَدَأ]] (subject - what you\'re talking about) + [[الخَبَر]] (predicate - what you\'re saying about it). Together they make a complete sentence!',
        arabicDescription: 'مُبْتَدَأ + خَبَر = جُمْلَة كَامِلَة',
        arabicTranslation: 'Subject + predicate = complete sentence',
      },

      {
        type: 'text',
        content: 'Pronoun + Noun (I am a...)',
      },
      {
        type: 'examples_grid',
        content: 'Introducing yourself',
        examples: [
          { arabic: 'أَنَا طَالِبٌ', english: 'I am a student (m)' },
          { arabic: 'أَنَا طَالِبَةٌ', english: 'I am a student (f)' },
          { arabic: 'أَنَا مُعَلِّمٌ', english: 'I am a teacher (m)' },
          { arabic: 'أَنَا طَبِيبَةٌ', english: 'I am a doctor (f)' },
          { arabic: 'أَنَا مِنْ مِصْرَ', english: 'I am from Egypt' },
          { arabic: 'أَنَا عَرَبِيٌّ', english: 'I am Arab' },
        ],
      },

      {
        type: 'text',
        content: 'Pronoun + Adjective (I am...)',
      },
      {
        type: 'examples_grid',
        content: 'Describing yourself',
        examples: [
          { arabic: 'أَنَا سَعِيدٌ', english: 'I am happy (m)' },
          { arabic: 'أَنَا سَعِيدَةٌ', english: 'I am happy (f)' },
          { arabic: 'أَنَا جَائِعٌ', english: 'I am hungry (m)' },
          { arabic: 'أَنَا تَعْبَانَةٌ', english: 'I am tired (f)' },
          { arabic: 'أَنَا مَشْغُولٌ', english: 'I am busy (m)' },
          { arabic: 'أَنَا بِخَيْرٍ', english: 'I am fine' },
        ],
      },

      {
        type: 'text',
        content: 'He/She is...',
      },
      {
        type: 'examples_grid',
        content: 'Talking about others',
        examples: [
          { arabic: 'هُوَ مُعَلِّمٌ', english: 'He is a teacher' },
          { arabic: 'هِيَ طَبِيبَةٌ', english: 'She is a doctor' },
          { arabic: 'هُوَ طَوِيلٌ', english: 'He is tall' },
          { arabic: 'هِيَ ذَكِيَّةٌ', english: 'She is smart' },
          { arabic: 'هُوَ مِنَ الْمَغْرِبِ', english: 'He is from Morocco' },
          { arabic: 'هِيَ فِي الْبَيْتِ', english: 'She is at home' },
        ],
      },

      {
        type: 'text',
        content: 'Noun + Adjective (The... is...)',
      },
      {
        type: 'examples_grid',
        content: 'Describing things',
        examples: [
          { arabic: 'الْبَيْتُ كَبِيرٌ', english: 'The house is big' },
          { arabic: 'الْكِتَابُ جَدِيدٌ', english: 'The book is new' },
          { arabic: 'الطَّقْسُ جَمِيلٌ', english: 'The weather is beautiful' },
          { arabic: 'الْقَهْوَةُ سَاخِنَةٌ', english: 'The coffee is hot' },
          { arabic: 'الْمَاءُ بَارِدٌ', english: 'The water is cold' },
          { arabic: 'السَّيَّارَةُ سَرِيعَةٌ', english: 'The car is fast' },
        ],
      },

      {
        type: 'text',
        content: 'Noun + Location (The... is in/on/at...)',
      },
      {
        type: 'examples_grid',
        content: 'Saying where things are',
        examples: [
          { arabic: 'الْكِتَابُ عَلَى الطَّاوِلَةِ', english: 'The book is on the table' },
          { arabic: 'الْقَلَمُ فِي الْحَقِيبَةِ', english: 'The pen is in the bag' },
          { arabic: 'الْوَلَدُ فِي الْمَدْرَسَةِ', english: 'The boy is at school' },
          { arabic: 'الْأُمُّ فِي الْمَطْبَخِ', english: 'The mother is in the kitchen' },
          { arabic: 'السَّيَّارَةُ أَمَامَ الْبَيْتِ', english: 'The car is in front of the house' },
          { arabic: 'الْمَسْجِدُ قَرِيبٌ', english: 'The mosque is nearby' },
        ],
      },

      {
        type: 'note',
        content: 'Notice there\'s [[no verb "is"]] in any of these sentences! Arabic nominal sentences are simpler than English. Just put two words together and you have a sentence: [[الْبَيْتُ كَبِيرٌ]] = The-house big = The house is big!',
        arabicDescription: 'لَا نَحْتَاج فِعْل "يَكُون" فِي الْجُمْلَة الاِسْمِيَّة',
        arabicTranslation: 'We do not need the verb "to be" in nominal sentences',
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
        type: 'description',
        content: 'Asking questions is essential for conversations! Arabic question words come at the [[beginning]] of the sentence, just like English. Master these words and you can ask about anything!',
        arabicDescription: 'أَدَوَات الاِسْتِفْهَام تَأْتِي فِي بِدَايَة الْجُمْلَة',
        arabicTranslation: 'Question words come at the beginning of the sentence',
      },

      {
        type: 'text',
        content: 'The Essential Question Words',
      },
      {
        type: 'examples_grid',
        content: 'Memorize these!',
        examples: [
          { arabic: 'مَا / مَاذَا', english: 'What?' },
          { arabic: 'مَنْ', english: 'Who?' },
          { arabic: 'أَيْنَ', english: 'Where?' },
          { arabic: 'مَتَى', english: 'When?' },
          { arabic: 'لِمَاذَا', english: 'Why?' },
          { arabic: 'كَيْفَ', english: 'How?' },
          { arabic: 'كَمْ', english: 'How many/much?' },
          { arabic: 'أَيّ', english: 'Which?' },
          { arabic: 'هَلْ', english: 'Is/Are? (yes/no)' },
        ],
      },

      {
        type: 'rule',
        content: '[[مَا]] and [[مَاذَا]] both mean "what" — [[مَا]] is shorter and more common in questions like "What is...?" while [[مَاذَا]] is used with verbs "What did you...?"',
        arabicDescription: 'مَا وَمَاذَا كِلَاهُمَا بِمَعْنَى what',
        arabicTranslation: 'Ma and Madha both mean "what"',
      },

      {
        type: 'text',
        content: 'مَا / مَاذَا — What?',
      },
      {
        type: 'examples_grid',
        content: 'Asking "What?"',
        examples: [
          { arabic: 'مَا اسْمُكَ؟', english: 'What is your name?' },
          { arabic: 'مَا هَذَا؟', english: 'What is this?' },
          { arabic: 'مَاذَا تُرِيدُ؟', english: 'What do you want?' },
          { arabic: 'مَاذَا تَفْعَلُ؟', english: 'What are you doing?' },
        ],
      },

      {
        type: 'text',
        content: 'مَنْ — Who?',
      },
      {
        type: 'examples_grid',
        content: 'Asking "Who?"',
        examples: [
          { arabic: 'مَنْ هَذَا؟', english: 'Who is this?' },
          { arabic: 'مَنْ أَنْتَ؟', english: 'Who are you?' },
          { arabic: 'مَنْ مَعَكَ؟', english: 'Who is with you?' },
          { arabic: 'مَنْ يَعْرِفُ؟', english: 'Who knows?' },
        ],
      },

      {
        type: 'text',
        content: 'أَيْنَ — Where?',
      },
      {
        type: 'examples_grid',
        content: 'Asking "Where?"',
        examples: [
          { arabic: 'أَيْنَ أَنْتَ؟', english: 'Where are you?' },
          { arabic: 'أَيْنَ الْمَسْجِدُ؟', english: 'Where is the mosque?' },
          { arabic: 'أَيْنَ تَسْكُنُ؟', english: 'Where do you live?' },
          { arabic: 'مِنْ أَيْنَ أَنْتَ؟', english: 'Where are you from?' },
        ],
      },

      {
        type: 'text',
        content: 'كَيْفَ — How?',
      },
      {
        type: 'examples_grid',
        content: 'Asking "How?"',
        examples: [
          { arabic: 'كَيْفَ حَالُكَ؟', english: 'How are you?' },
          { arabic: 'كَيْفَ الْحَالُ؟', english: 'How is it going?' },
          { arabic: 'كَيْفَ تَفْعَلُ ذَلِكَ؟', english: 'How do you do that?' },
          { arabic: 'كَيْفَ الطَّقْسُ؟', english: 'How is the weather?' },
        ],
      },

      {
        type: 'text',
        content: 'مَتَى — When? / لِمَاذَا — Why?',
      },
      {
        type: 'examples_grid',
        content: 'Time and reason questions',
        examples: [
          { arabic: 'مَتَى السَّفَرُ؟', english: 'When is the trip?' },
          { arabic: 'مَتَى تَأْتِي؟', english: 'When are you coming?' },
          { arabic: 'لِمَاذَا أَنْتَ هُنَا؟', english: 'Why are you here?' },
          { arabic: 'لِمَاذَا تَبْكِي؟', english: 'Why are you crying?' },
        ],
      },

      {
        type: 'text',
        content: 'هَلْ — Yes/No Questions',
      },
      {
        type: 'rule',
        content: '[[هَلْ]] turns any statement into a yes/no question! Just add it at the beginning. Statement: أَنْتَ طَالِبٌ (You are a student) → Question: [[هَلْ]] أَنْتَ طَالِبٌ؟ (Are you a student?)',
        arabicDescription: 'هَلْ تُحَوِّل الْجُمْلَة إِلَى سُؤَال',
        arabicTranslation: 'Hal transforms the sentence into a question',
      },
      {
        type: 'examples_grid',
        content: 'Yes/No questions with هَلْ',
        examples: [
          { arabic: 'هَلْ أَنْتَ مُسْلِمٌ؟', english: 'Are you Muslim?' },
          { arabic: 'هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟', english: 'Do you speak Arabic?' },
          { arabic: 'هَلْ هَذَا صَحِيحٌ؟', english: 'Is this correct?' },
          { arabic: 'هَلْ فَهِمْتَ؟', english: 'Did you understand?' },
        ],
      },

      {
        type: 'text',
        content: 'كَمْ — How many/much?',
      },
      {
        type: 'examples_grid',
        content: 'Asking about quantity',
        examples: [
          { arabic: 'كَمْ عُمْرُكَ؟', english: 'How old are you?' },
          { arabic: 'كَمِ السَّاعَةُ؟', english: 'What time is it?' },
          { arabic: 'بِكَمْ هَذَا؟', english: 'How much is this?' },
          { arabic: 'كَمْ وَلَدًا عِنْدَكَ؟', english: 'How many children do you have?' },
        ],
      },

      {
        type: 'note',
        content: 'To answer yes/no questions: [[نَعَمْ]] = Yes, [[لَا]] = No. For "How are you?" reply with [[بِخَيْرٍ الْحَمْدُ لِلَّهِ]] (Fine, praise be to God)!',
        arabicDescription: 'نَعَمْ = Yes ، لَا = No',
        arabicTranslation: 'Naam = Yes, La = No',
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
        type: 'description',
        content: 'Pointing words like "this" and "that" are called [[demonstrative pronouns]]. In Arabic, they must match the [[gender]] of the noun — masculine or feminine. Let\'s learn to point like an Arab!',
        arabicDescription: 'أَسْمَاء الْإِشَارَة تُطَابِق الاِسْم',
        arabicTranslation: 'Demonstrative pronouns match the noun',
      },

      {
        type: 'text',
        content: 'This (Near) — هَذَا / هَذِهِ',
      },
      {
        type: 'comparison_grid',
        content: 'This for near objects',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine',
        comparisons: [
          { left: { arabic: 'هَذَا', label: 'this (m)' }, right: { arabic: 'هَذِهِ', label: 'this (f)' } },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with "this"',
        examples: [
          { arabic: 'هَذَا كِتَابٌ', english: 'This is a book' },
          { arabic: 'هَذِهِ سَيَّارَةٌ', english: 'This is a car' },
          { arabic: 'هَذَا بَيْتِي', english: 'This is my house' },
          { arabic: 'هَذِهِ أُخْتِي', english: 'This is my sister' },
          { arabic: 'هَذَا جَمِيلٌ', english: 'This is beautiful (m)' },
          { arabic: 'هَذِهِ لَذِيذَةٌ', english: 'This is delicious (f)' },
        ],
      },

      {
        type: 'text',
        content: 'That (Far) — ذَلِكَ / تِلْكَ',
      },
      {
        type: 'comparison_grid',
        content: 'That for far objects',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine',
        comparisons: [
          { left: { arabic: 'ذَلِكَ', label: 'that (m)' }, right: { arabic: 'تِلْكَ', label: 'that (f)' } },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with "that"',
        examples: [
          { arabic: 'ذَلِكَ الرَّجُلُ', english: 'That man' },
          { arabic: 'تِلْكَ الْمَرْأَةُ', english: 'That woman' },
          { arabic: 'ذَلِكَ الْمَسْجِدُ', english: 'That mosque' },
          { arabic: 'تِلْكَ الْمَدْرَسَةُ', english: 'That school' },
          { arabic: 'ذَلِكَ صَحِيحٌ', english: 'That is correct' },
          { arabic: 'تِلْكَ فِكْرَةٌ جَيِّدَةٌ', english: 'That is a good idea' },
        ],
      },

      {
        type: 'text',
        content: 'These & Those (Plural)',
      },
      {
        type: 'examples_grid',
        content: 'Plural demonstratives',
        examples: [
          { arabic: 'هَؤُلَاءِ', english: 'These (people)' },
          { arabic: 'أُولَئِكَ', english: 'Those (people)' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with plural',
        examples: [
          { arabic: 'هَؤُلَاءِ طُلَّابٌ', english: 'These are students' },
          { arabic: 'هَؤُلَاءِ أَصْدِقَائِي', english: 'These are my friends' },
          { arabic: 'أُولَئِكَ مُعَلِّمُونَ', english: 'Those are teachers' },
          { arabic: 'أُولَئِكَ النَّاسُ', english: 'Those people' },
        ],
      },

      {
        type: 'rule',
        content: 'When pointing to a definite noun (with [[ال]]), the demonstrative comes [[BEFORE]] the noun: [[هَذَا الْكِتَابُ]] (this book), [[تِلْكَ السَّيَّارَةُ]] (that car).',
        arabicDescription: 'اسْم الْإِشَارَة يَأْتِي قَبْل الاِسْم الْمُعَرَّف',
        arabicTranslation: 'The demonstrative comes before the definite noun',
      },

      {
        type: 'examples_grid',
        content: 'Demonstrative + Definite Noun',
        examples: [
          { arabic: 'هَذَا الْوَلَدُ', english: 'This boy' },
          { arabic: 'هَذِهِ الْبِنْتُ', english: 'This girl' },
          { arabic: 'ذَلِكَ الْكِتَابُ', english: 'That book' },
          { arabic: 'تِلْكَ الْغُرْفَةُ', english: 'That room' },
        ],
      },

      {
        type: 'note',
        content: 'Remember: [[هَذَا/ذَلِكَ]] for masculine nouns, [[هَذِهِ/تِلْكَ]] for feminine nouns. The plural forms [[هَؤُلَاءِ/أُولَئِكَ]] are used for people only!',
        arabicDescription: 'هَؤُلَاءِ وَأُولَئِكَ لِلْعُقَلَاء فَقَط',
        arabicTranslation: 'Ha\'ulai and Ulaika are for people only',
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
        type: 'description',
        content: 'In Arabic, possessive pronouns are [[suffixes]] — they attach to the end of nouns! Instead of saying "my book", you say [[كِتَابِي]] (book-my). This is one of Arabic\'s elegant features!',
        arabicDescription: 'ضَمَائِر الْمِلْكِيَّة تَتَّصِل بِآخِر الاِسْم',
        arabicTranslation: 'Possessive pronouns attach to the end of nouns',
      },

      {
        type: 'rule',
        content: 'When adding a possessive suffix, you [[remove]] the [[ال]] if present. So [[الْكِتَابُ]] (the book) becomes [[كِتَابِي]] (my book), NOT الْكِتَابِي.',
        arabicDescription: 'نَحْذِف ال عِنْد إِضَافَة ضَمِير الْمِلْكِيَّة',
        arabicTranslation: 'We remove Al when adding a possessive pronoun',
      },

      {
        type: 'text',
        content: 'My — ـِي',
      },
      {
        type: 'examples_grid',
        content: 'Examples with "my"',
        examples: [
          { arabic: 'كِتَابِي', english: 'my book' },
          { arabic: 'بَيْتِي', english: 'my house' },
          { arabic: 'اسْمِي', english: 'my name' },
          { arabic: 'أُمِّي', english: 'my mother' },
          { arabic: 'أَبِي', english: 'my father' },
          { arabic: 'صَدِيقِي', english: 'my friend' },
        ],
      },

      {
        type: 'text',
        content: 'Your — ـكَ (m) / ـكِ (f)',
      },
      {
        type: 'examples_grid',
        content: 'Examples with "your"',
        examples: [
          { arabic: 'كِتَابُكَ', english: 'your book (to m)' },
          { arabic: 'كِتَابُكِ', english: 'your book (to f)' },
          { arabic: 'اسْمُكَ', english: 'your name (to m)' },
          { arabic: 'اسْمُكِ', english: 'your name (to f)' },
          { arabic: 'بَيْتُكَ', english: 'your house (to m)' },
          { arabic: 'سَيَّارَتُكِ', english: 'your car (to f)' },
        ],
      },

      {
        type: 'text',
        content: 'His — ـهُ / Her — ـهَا',
      },
      {
        type: 'examples_grid',
        content: 'Examples with "his/her"',
        examples: [
          { arabic: 'كِتَابُهُ', english: 'his book' },
          { arabic: 'كِتَابُهَا', english: 'her book' },
          { arabic: 'اسْمُهُ أَحْمَدُ', english: 'His name is Ahmad' },
          { arabic: 'اسْمُهَا فَاطِمَةُ', english: 'Her name is Fatima' },
          { arabic: 'سَيَّارَتُهُ جَدِيدَةٌ', english: 'His car is new' },
          { arabic: 'بَيْتُهَا كَبِيرٌ', english: 'Her house is big' },
        ],
      },

      {
        type: 'text',
        content: 'Our — ـنَا / Their — ـهُمْ',
      },
      {
        type: 'examples_grid',
        content: 'Examples with "our/their"',
        examples: [
          { arabic: 'بَيْتُنَا', english: 'our house' },
          { arabic: 'مَدْرَسَتُنَا', english: 'our school' },
          { arabic: 'بَلَدُنَا', english: 'our country' },
          { arabic: 'كِتَابُهُمْ', english: 'their book' },
          { arabic: 'سَيَّارَتُهُمْ', english: 'their car' },
          { arabic: 'أَوْلَادُهُمْ', english: 'their children' },
        ],
      },

      {
        type: 'text',
        content: 'Family Members with Possessives',
      },
      {
        type: 'examples_grid',
        content: 'Common family expressions',
        examples: [
          { arabic: 'أَبِي وَأُمِّي', english: 'my father and mother' },
          { arabic: 'أَخِي الْكَبِيرُ', english: 'my older brother' },
          { arabic: 'أُخْتِي الصَّغِيرَةُ', english: 'my younger sister' },
          { arabic: 'جَدِّي وَجَدَّتِي', english: 'my grandfather and grandmother' },
          { arabic: 'عَمِّي', english: 'my paternal uncle' },
          { arabic: 'خَالَتِي', english: 'my maternal aunt' },
        ],
      },

      {
        type: 'note',
        content: 'All possessive suffixes summary: [[ـِي]] (my), [[ـكَ]] (your-m), [[ـكِ]] (your-f), [[ـهُ]] (his), [[ـهَا]] (her), [[ـنَا]] (our), [[ـكُمْ]] (your-pl), [[ـهُمْ]] (their).',
        arabicDescription: 'ي - كَ - كِ - هُ - هَا - نَا - كُمْ - هُمْ',
        arabicTranslation: 'My - Your(m) - Your(f) - His - Her - Our - Your(pl) - Their',
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
        type: 'description',
        content: 'Prepositions are essential connecting words! They tell us [[where]], [[when]], and [[how]] things relate to each other. In Arabic, they\'re called [[حُرُوف الْجَرّ]] (particles of pulling) because they "pull" the noun into the genitive case.',
        arabicDescription: 'حُرُوف الْجَرّ تَرْبِط الْكَلِمَات',
        arabicTranslation: 'Prepositions connect words',
      },

      {
        type: 'text',
        content: 'Essential Prepositions',
      },
      {
        type: 'examples_grid',
        content: 'The most common ones',
        examples: [
          { arabic: 'فِي', english: 'in' },
          { arabic: 'عَلَى', english: 'on' },
          { arabic: 'مِنْ', english: 'from' },
          { arabic: 'إِلَى', english: 'to' },
          { arabic: 'مَعَ', english: 'with' },
          { arabic: 'عِنْدَ', english: 'at/have' },
          { arabic: 'بِـ', english: 'with/by' },
          { arabic: 'لِـ', english: 'for/to' },
          { arabic: 'عَنْ', english: 'about' },
        ],
      },

      {
        type: 'text',
        content: 'فِي — In',
      },
      {
        type: 'examples_grid',
        content: 'Examples with فِي',
        examples: [
          { arabic: 'أَنَا فِي الْبَيْتِ', english: 'I am in the house' },
          { arabic: 'الْكِتَابُ فِي الْحَقِيبَةِ', english: 'The book is in the bag' },
          { arabic: 'هُوَ فِي الْمَدْرَسَةِ', english: 'He is in school' },
          { arabic: 'نَحْنُ فِي السَّيَّارَةِ', english: 'We are in the car' },
        ],
      },

      {
        type: 'text',
        content: 'عَلَى — On',
      },
      {
        type: 'examples_grid',
        content: 'Examples with عَلَى',
        examples: [
          { arabic: 'الْكِتَابُ عَلَى الطَّاوِلَةِ', english: 'The book is on the table' },
          { arabic: 'الصُّورَةُ عَلَى الْحَائِطِ', english: 'The picture is on the wall' },
          { arabic: 'الْقَلَمُ عَلَى الْمَكْتَبِ', english: 'The pen is on the desk' },
          { arabic: 'السَّلَامُ عَلَيْكُمْ', english: 'Peace be upon you' },
        ],
      },

      {
        type: 'text',
        content: 'مِنْ — From / إِلَى — To',
      },
      {
        type: 'examples_grid',
        content: 'Movement and origin',
        examples: [
          { arabic: 'أَنَا مِنْ مِصْرَ', english: 'I am from Egypt' },
          { arabic: 'ذَهَبْتُ إِلَى الْمَدْرَسَةِ', english: 'I went to school' },
          { arabic: 'مِنَ الصَّبَاحِ إِلَى الْمَسَاءِ', english: 'From morning to evening' },
          { arabic: 'سَافَرْتُ مِنْ مَكَّةَ إِلَى الْمَدِينَةِ', english: 'I traveled from Mecca to Medina' },
        ],
      },

      {
        type: 'text',
        content: 'Position Words',
      },
      {
        type: 'examples_grid',
        content: 'Location prepositions',
        examples: [
          { arabic: 'تَحْتَ', english: 'under' },
          { arabic: 'فَوْقَ', english: 'above' },
          { arabic: 'أَمَامَ', english: 'in front of' },
          { arabic: 'وَرَاءَ', english: 'behind' },
          { arabic: 'بَيْنَ', english: 'between' },
          { arabic: 'بِجَانِبِ', english: 'beside' },
        ],
      },
      {
        type: 'examples_grid',
        content: 'Examples with position words',
        examples: [
          { arabic: 'الْقِطَّةُ تَحْتَ السَّرِيرِ', english: 'The cat is under the bed' },
          { arabic: 'الطَّائِرَةُ فَوْقَ السَّحَابِ', english: 'The plane is above the clouds' },
          { arabic: 'الْمَسْجِدُ أَمَامَ الْبَيْتِ', english: 'The mosque is in front of the house' },
          { arabic: 'الْحَدِيقَةُ وَرَاءَ الْمَدْرَسَةِ', english: 'The garden is behind the school' },
        ],
      },

      {
        type: 'text',
        content: 'عِنْدَ — At/Have (Possession)',
      },
      {
        type: 'rule',
        content: '[[عِنْدَ]] is special — it means "at" but is also used for [[possession]]: عِنْدِي = "at me" = "I have". This is how you say "I have" in Arabic!',
        arabicDescription: 'عِنْدِي تَعْنِي "أَمْلِكُ"',
        arabicTranslation: '"I have" means "I possess"',
      },
      {
        type: 'examples_grid',
        content: 'Expressing possession with عِنْدَ',
        examples: [
          { arabic: 'عِنْدِي كِتَابٌ', english: 'I have a book' },
          { arabic: 'عِنْدَكَ سُؤَالٌ؟', english: 'Do you have a question?' },
          { arabic: 'عِنْدَهُ سَيَّارَةٌ', english: 'He has a car' },
          { arabic: 'عِنْدَهَا ثَلَاثَةُ أَوْلَادٍ', english: 'She has three children' },
          { arabic: 'عِنْدَنَا وَقْتٌ', english: 'We have time' },
          { arabic: 'عِنْدَهُمْ بَيْتٌ كَبِيرٌ', english: 'They have a big house' },
        ],
      },

      {
        type: 'note',
        content: 'The attached prepositions [[بِـ]] (with/by) and [[لِـ]] (for/to) connect directly to the next word: [[بِسْمِ اللهِ]] (in the name of Allah), [[لِلَّهِ]] (for/to Allah).',
        arabicDescription: 'بِـ وَلِـ تَتَّصِل بِالْكَلِمَة',
        arabicTranslation: 'Bi and Li attach to the word',
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
        type: 'description',
        content: 'Arabic adjectives are loyal followers — they [[match]] their nouns in everything! Gender, definiteness, number, and case. The adjective always comes [[AFTER]] the noun it describes.',
        arabicDescription: 'الصِّفَة تَتْبَع الْمَوْصُوف',
        arabicTranslation: 'The adjective follows the described noun',
      },

      {
        type: 'rule',
        content: 'Two main rules: 1) If noun is [[feminine]], adjective gets [[ة]]. 2) If noun has [[ال]], adjective gets [[ال]] too!',
        arabicDescription: 'الصِّفَة تُطَابِق الْمَوْصُوف فِي التَّذْكِير وَالتَّعْرِيف',
        arabicTranslation: 'The adjective matches the noun in gender and definiteness',
      },

      {
        type: 'text',
        content: 'Common Adjectives — Masculine & Feminine',
      },
      {
        type: 'comparison_grid',
        content: 'Add ة for feminine',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine',
        comparisons: [
          { left: { arabic: 'كَبِير', label: 'big' }, right: { arabic: 'كَبِيرَة', label: 'big' } },
          { left: { arabic: 'صَغِير', label: 'small' }, right: { arabic: 'صَغِيرَة', label: 'small' } },
          { left: { arabic: 'جَمِيل', label: 'beautiful' }, right: { arabic: 'جَمِيلَة', label: 'beautiful' } },
          { left: { arabic: 'جَدِيد', label: 'new' }, right: { arabic: 'جَدِيدَة', label: 'new' } },
        ],
      },

      {
        type: 'examples_grid',
        content: 'More adjective pairs',
        examples: [
          { arabic: 'طَوِيل / طَوِيلَة', english: 'tall/long' },
          { arabic: 'قَصِير / قَصِيرَة', english: 'short' },
          { arabic: 'سَهْل / سَهْلَة', english: 'easy' },
          { arabic: 'صَعْب / صَعْبَة', english: 'difficult' },
          { arabic: 'سَرِيع / سَرِيعَة', english: 'fast' },
          { arabic: 'بَطِيء / بَطِيئَة', english: 'slow' },
          { arabic: 'حَارّ / حَارَّة', english: 'hot' },
          { arabic: 'بَارِد / بَارِدَة', english: 'cold' },
        ],
      },

      {
        type: 'text',
        content: 'Indefinite (without ال)',
      },
      {
        type: 'examples_grid',
        content: 'A big house, a new car...',
        examples: [
          { arabic: 'بَيْتٌ كَبِيرٌ', english: 'a big house' },
          { arabic: 'سَيَّارَةٌ جَدِيدَةٌ', english: 'a new car' },
          { arabic: 'كِتَابٌ جَمِيلٌ', english: 'a beautiful book' },
          { arabic: 'مَدْرَسَةٌ كَبِيرَةٌ', english: 'a big school' },
          { arabic: 'وَلَدٌ طَوِيلٌ', english: 'a tall boy' },
          { arabic: 'بِنْتٌ ذَكِيَّةٌ', english: 'a smart girl' },
        ],
      },

      {
        type: 'text',
        content: 'Definite (with ال on BOTH)',
      },
      {
        type: 'examples_grid',
        content: 'The big house, the new car...',
        examples: [
          { arabic: 'الْبَيْتُ الْكَبِيرُ', english: 'the big house' },
          { arabic: 'السَّيَّارَةُ الْجَدِيدَةُ', english: 'the new car' },
          { arabic: 'الْكِتَابُ الْجَمِيلُ', english: 'the beautiful book' },
          { arabic: 'الْمَدْرَسَةُ الْكَبِيرَةُ', english: 'the big school' },
          { arabic: 'الْوَلَدُ الطَّوِيلُ', english: 'the tall boy' },
          { arabic: 'الْبِنْتُ الذَّكِيَّةُ', english: 'the smart girl' },
        ],
      },

      {
        type: 'text',
        content: 'Multiple Adjectives',
      },
      {
        type: 'examples_grid',
        content: 'You can stack adjectives!',
        examples: [
          { arabic: 'بَيْتٌ كَبِيرٌ جَمِيلٌ', english: 'a big beautiful house' },
          { arabic: 'سَيَّارَةٌ جَدِيدَةٌ سَرِيعَةٌ', english: 'a new fast car' },
          { arabic: 'الْوَلَدُ الطَّوِيلُ الذَّكِيُّ', english: 'the tall smart boy' },
          { arabic: 'الْبِنْتُ الصَّغِيرَةُ الْجَمِيلَةُ', english: 'the small beautiful girl' },
        ],
      },

      {
        type: 'note',
        content: 'Warning: If only the noun has [[ال]] but not the adjective, it becomes a [[sentence]]! [[الْبَيْتُ كَبِيرٌ]] = The house IS big (a sentence). [[الْبَيْتُ الْكَبِيرُ]] = The big house (a phrase).',
        arabicDescription: 'إِذَا كَانَ الْمَوْصُوف مُعَرَّفًا وَالصِّفَة نَكِرَة = جُمْلَة',
        arabicTranslation: 'If the noun is definite and the adjective is indefinite = a sentence',
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
        type: 'description',
        content: 'Counting in Arabic has unique rules that might seem strange at first! The noun form changes based on the number, and sometimes the number\'s gender is [[opposite]] to the noun. Let\'s master the basics!',
        arabicDescription: 'الْأَعْدَاد لَهَا قَوَاعِد خَاصَّة',
        arabicTranslation: 'Numbers have special rules',
      },

      {
        type: 'text',
        content: 'Numbers 1-10',
      },
      {
        type: 'examples_grid',
        content: 'Basic numbers',
        examples: [
          { arabic: 'وَاحِد', english: '1 - one' },
          { arabic: 'اِثْنَان', english: '2 - two' },
          { arabic: 'ثَلَاثَة', english: '3 - three' },
          { arabic: 'أَرْبَعَة', english: '4 - four' },
          { arabic: 'خَمْسَة', english: '5 - five' },
          { arabic: 'سِتَّة', english: '6 - six' },
          { arabic: 'سَبْعَة', english: '7 - seven' },
          { arabic: 'ثَمَانِيَة', english: '8 - eight' },
          { arabic: 'تِسْعَة', english: '9 - nine' },
          { arabic: 'عَشَرَة', english: '10 - ten' },
        ],
      },

      {
        type: 'rule',
        content: 'Numbers [[1-2]]: Come AFTER the noun and match its gender. [[كِتَابٌ وَاحِدٌ]] (one book - masc.), [[سَيَّارَةٌ وَاحِدَةٌ]] (one car - fem.).',
        arabicDescription: 'وَاحِد وَاثْنَان يَتْبَعَان الاِسْم',
        arabicTranslation: 'One and two follow the noun',
      },
      {
        type: 'examples_grid',
        content: 'One and Two',
        examples: [
          { arabic: 'كِتَابٌ وَاحِدٌ', english: 'one book' },
          { arabic: 'سَيَّارَةٌ وَاحِدَةٌ', english: 'one car' },
          { arabic: 'كِتَابَانِ اثْنَانِ', english: 'two books' },
          { arabic: 'سَيَّارَتَانِ اثْنَتَانِ', english: 'two cars' },
        ],
      },

      {
        type: 'rule',
        content: 'Numbers [[3-10]]: The number has [[OPPOSITE gender]] from the noun, and the noun is [[PLURAL]]! This is the famous "reverse gender" rule.',
        arabicDescription: 'الْأَعْدَاد ٣-١٠ تُخَالِف الْمَعْدُود',
        arabicTranslation: 'Numbers 3-10 have opposite gender from the counted noun',
      },
      {
        type: 'examples_grid',
        content: 'Three to Ten (opposite gender rule)',
        examples: [
          { arabic: 'ثَلَاثَةُ كُتُبٍ', english: '3 books (fem. number + masc. noun)' },
          { arabic: 'ثَلَاثُ سَيَّارَاتٍ', english: '3 cars (masc. number + fem. noun)' },
          { arabic: 'خَمْسَةُ طُلَّابٍ', english: '5 students (m)' },
          { arabic: 'خَمْسُ طَالِبَاتٍ', english: '5 students (f)' },
          { arabic: 'سَبْعَةُ أَيَّامٍ', english: '7 days' },
          { arabic: 'عَشْرُ سَنَوَاتٍ', english: '10 years' },
        ],
      },

      {
        type: 'rule',
        content: 'Numbers [[11-99]]: The noun is [[SINGULAR]]! This is easier. [[عِشْرُونَ كِتَابًا]] (20 books), [[خَمْسَةَ عَشَرَ طَالِبًا]] (15 students).',
        arabicDescription: 'مِنْ ١١ وَمَا فَوْق الْمَعْدُود مُفْرَد',
        arabicTranslation: 'From 11 and above, the counted noun is singular',
      },
      {
        type: 'examples_grid',
        content: 'Eleven and above',
        examples: [
          { arabic: 'أَحَدَ عَشَرَ كِتَابًا', english: '11 books' },
          { arabic: 'اِثْنَا عَشَرَ طَالِبًا', english: '12 students' },
          { arabic: 'عِشْرُونَ سَنَةً', english: '20 years' },
          { arabic: 'مِئَةُ كِتَابٍ', english: '100 books' },
        ],
      },

      {
        type: 'note',
        content: 'Quick tip: For everyday use, just remember [[3-10 use plural noun]], and [[11+ use singular noun]]. The gender rules take practice!',
        arabicDescription: 'الْمُمَارَسَة تُسَهِّل التَّعَلُّم',
        arabicTranslation: 'Practice makes learning easier',
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
        type: 'description',
        content: 'Arabic has two sentence types! You already know [[nominal sentences]] (starts with noun). Now meet [[verbal sentences]] — they start with a [[VERB]] and are super common in storytelling and action descriptions!',
        arabicDescription: 'الْجُمْلَة الْفِعْلِيَّة تَبْدَأُ بِفِعْل',
        arabicTranslation: 'The verbal sentence starts with a verb',
      },
      {
        type: 'rule',
        content: 'The magic formula: [[فِعْل]] (Verb) + [[فَاعِل]] (Subject) + [[مَفْعُول]] (Object). The verb comes [[FIRST]], then who did it, then what they did it to!',
        arabicDescription: 'فِعْل + فَاعِل + مَفْعُول بِهِ',
        arabicTranslation: 'Verb + Subject + Object',
      },

      {
        type: 'text',
        content: 'Basic Verbal Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Simple action sentences',
        examples: [
          { arabic: 'ذَهَبَ الْوَلَدُ', english: 'The boy went' },
          { arabic: 'جَاءَتِ الْبِنْتُ', english: 'The girl came' },
          { arabic: 'نَامَ الطِّفْلُ', english: 'The child slept' },
          { arabic: 'خَرَجَ الْأَبُ', english: 'The father went out' },
          { arabic: 'دَخَلَتِ الْأُمُّ', english: 'The mother entered' },
          { arabic: 'رَجَعَ الطَّالِبُ', english: 'The student returned' },
        ],
      },

      {
        type: 'text',
        content: 'With Objects (Verb + Subject + Object)',
      },
      {
        type: 'examples_grid',
        content: 'Full sentences with objects',
        examples: [
          { arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ', english: 'The student wrote the lesson' },
          { arabic: 'قَرَأَ الْمُعَلِّمُ الْكِتَابَ', english: 'The teacher read the book' },
          { arabic: 'أَكَلَ الْوَلَدُ التُّفَّاحَةَ', english: 'The boy ate the apple' },
          { arabic: 'شَرِبَ الرَّجُلُ الْقَهْوَةَ', english: 'The man drank the coffee' },
          { arabic: 'فَتَحَتِ الْبِنْتُ الْبَابَ', english: 'The girl opened the door' },
          { arabic: 'أَغْلَقَ الْأَبُ النَّافِذَةَ', english: 'The father closed the window' },
        ],
      },

      {
        type: 'text',
        content: 'Verbal vs Nominal — What\'s the Difference?',
      },
      {
        type: 'comparison_grid',
        content: 'Same meaning, different emphasis',
        leftLabel: 'Verbal (Action focus)',
        rightLabel: 'Nominal (Topic focus)',
        comparisons: [
          { left: { arabic: 'ذَهَبَ الْوَلَدُ', label: 'The boy went' }, right: { arabic: 'الْوَلَدُ ذَهَبَ', label: 'The boy, he went' } },
          { left: { arabic: 'أَكَلَتِ الْبِنْتُ', label: 'The girl ate' }, right: { arabic: 'الْبِنْتُ أَكَلَتْ', label: 'The girl, she ate' } },
          { left: { arabic: 'نَامَ الطِّفْلُ', label: 'The child slept' }, right: { arabic: 'الطِّفْلُ نَامَ', label: 'The child, he slept' } },
          { left: { arabic: 'جَاءَ الضَّيْفُ', label: 'The guest came' }, right: { arabic: 'الضَّيْفُ جَاءَ', label: 'The guest, he came' } },
        ],
      },

      {
        type: 'rule',
        content: 'Special rule: In verbal sentences, the verb only matches [[gender]], not number! [[جَاءَ الطُّلَّابُ]] uses singular verb even though "students" is plural. In nominal sentences, both gender AND number must match.',
        arabicDescription: 'الْفِعْل يُطَابِق الْفَاعِل فِي الْجِنْس فَقَط',
        arabicTranslation: 'The verb matches the subject in gender only',
      },

      {
        type: 'text',
        content: 'Everyday Actions',
      },
      {
        type: 'examples_grid',
        content: 'Common daily activities',
        examples: [
          { arabic: 'اِسْتَيْقَظَ الْوَلَدُ مُبَكِّرًا', english: 'The boy woke up early' },
          { arabic: 'غَسَلَتِ الْأُمُّ الثِّيَابَ', english: 'The mother washed the clothes' },
          { arabic: 'طَبَخَتِ الْجَدَّةُ الطَّعَامَ', english: 'The grandmother cooked the food' },
          { arabic: 'لَعِبَ الْأَطْفَالُ فِي الْحَدِيقَةِ', english: 'The children played in the garden' },
          { arabic: 'شَاهَدَ الْأَبُ التِّلْفَازَ', english: 'The father watched TV' },
          { arabic: 'نَظَّفَ الطَّالِبُ غُرْفَتَهُ', english: 'The student cleaned his room' },
        ],
      },

      {
        type: 'text',
        content: 'Travel & Movement',
      },
      {
        type: 'examples_grid',
        content: 'Going places',
        examples: [
          { arabic: 'سَافَرَ أَحْمَدُ إِلَى مِصْرَ', english: 'Ahmed traveled to Egypt' },
          { arabic: 'وَصَلَ الطَّائِرَةُ', english: 'The plane arrived' },
          { arabic: 'رَكِبَ الْمُسَافِرُ الْقِطَارَ', english: 'The traveler boarded the train' },
          { arabic: 'مَشَى الرَّجُلُ إِلَى الْمَسْجِدِ', english: 'The man walked to the mosque' },
        ],
      },

      {
        type: 'note',
        content: 'Use [[verbal sentences]] when emphasizing the action: "Wrote the student..." Use [[nominal sentences]] when emphasizing the doer: "The student, he wrote..."',
        arabicDescription: 'الْجُمْلَة الْفِعْلِيَّة تُرَكِّز عَلَى الْفِعْل',
        arabicTranslation: 'The verbal sentence focuses on the action',
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
        type: 'description',
        content: 'The past tense [[الْمَاضِي]] tells stories! It describes actions that are [[done and completed]]. Arabic verbs are built from a [[3-letter root]], and the past tense is the simplest form to learn.',
        arabicDescription: 'الْمَاضِي يَدُلُّ عَلَى حَدَثٍ انْتَهَى',
        arabicTranslation: 'The past tense indicates a completed event',
      },
      {
        type: 'rule',
        content: 'The [[هُوَ]] (he) form is the dictionary form! All conjugations are built by changing the [[ending]] of this base form. The root stays the same, only suffixes change.',
        arabicDescription: 'صِيغَة "هُوَ" هِيَ الْأَصْل',
        arabicTranslation: 'The "he" form is the base form',
      },

      {
        type: 'text',
        content: 'Common Past Tense Verbs',
      },
      {
        type: 'examples_grid',
        content: 'Basic verbs in "he" form',
        examples: [
          { arabic: 'كَتَبَ', english: 'he wrote' },
          { arabic: 'ذَهَبَ', english: 'he went' },
          { arabic: 'أَكَلَ', english: 'he ate' },
          { arabic: 'شَرِبَ', english: 'he drank' },
          { arabic: 'قَرَأَ', english: 'he read' },
          { arabic: 'سَمِعَ', english: 'he heard' },
          { arabic: 'فَهِمَ', english: 'he understood' },
          { arabic: 'عَمِلَ', english: 'he worked' },
          { arabic: 'جَلَسَ', english: 'he sat' },
          { arabic: 'خَرَجَ', english: 'he went out' },
          { arabic: 'دَخَلَ', english: 'he entered' },
          { arabic: 'رَجَعَ', english: 'he returned' },
        ],
      },

      {
        type: 'text',
        content: 'I / We Forms (Speaker)',
      },
      {
        type: 'examples_grid',
        content: 'Talking about yourself',
        examples: [
          { arabic: 'كَتَبْتُ', english: 'I wrote' },
          { arabic: 'ذَهَبْتُ', english: 'I went' },
          { arabic: 'أَكَلْتُ', english: 'I ate' },
          { arabic: 'شَرِبْتُ', english: 'I drank' },
          { arabic: 'كَتَبْنَا', english: 'we wrote' },
          { arabic: 'ذَهَبْنَا', english: 'we went' },
        ],
      },

      {
        type: 'text',
        content: 'You Forms (Addressing Someone)',
      },
      {
        type: 'examples_grid',
        content: 'Talking to others',
        examples: [
          { arabic: 'كَتَبْتَ', english: 'you wrote (m)' },
          { arabic: 'كَتَبْتِ', english: 'you wrote (f)' },
          { arabic: 'ذَهَبْتَ', english: 'you went (m)' },
          { arabic: 'ذَهَبْتِ', english: 'you went (f)' },
          { arabic: 'كَتَبْتُمْ', english: 'you all wrote' },
          { arabic: 'ذَهَبْتُمْ', english: 'you all went' },
        ],
      },

      {
        type: 'text',
        content: 'He / She / They Forms',
      },
      {
        type: 'examples_grid',
        content: 'Talking about others',
        examples: [
          { arabic: 'كَتَبَ', english: 'he wrote' },
          { arabic: 'كَتَبَتْ', english: 'she wrote' },
          { arabic: 'ذَهَبَ', english: 'he went' },
          { arabic: 'ذَهَبَتْ', english: 'she went' },
          { arabic: 'كَتَبُوا', english: 'they wrote (m)' },
          { arabic: 'كَتَبْنَ', english: 'they wrote (f)' },
        ],
      },

      {
        type: 'rule',
        content: 'Pattern: [[ـتُ]] = I, [[ـتَ]] = you (m), [[ـتِ]] = you (f), [[ـنَا]] = we, [[ـتْ]] = she, [[ـوا]] = they. The vowel on ت tells you who!',
        arabicDescription: 'الضَّمَّة لِلْمُتَكَلِّم وَالْفَتْحَة لِلْمُخَاطَب',
        arabicTranslation: 'Damma for the speaker and Fatha for the addressee',
      },

      {
        type: 'text',
        content: 'Past Tense in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Complete sentences',
        examples: [
          { arabic: 'ذَهَبْتُ إِلَى الْمَدْرَسَةِ', english: 'I went to school' },
          { arabic: 'أَكَلْنَا الْغَدَاءَ', english: 'We ate lunch' },
          { arabic: 'قَرَأَتْ كِتَابًا', english: 'She read a book' },
          { arabic: 'سَمِعُوا الْخَبَرَ', english: 'They heard the news' },
          { arabic: 'شَرِبْتَ الْقَهْوَةَ؟', english: 'Did you drink coffee?' },
          { arabic: 'فَهِمْتُ الدَّرْسَ', english: 'I understood the lesson' },
        ],
      },

      {
        type: 'text',
        content: 'Yesterday\'s Activities',
      },
      {
        type: 'examples_grid',
        content: 'Telling what happened',
        examples: [
          { arabic: 'أَمْسِ ذَهَبْتُ إِلَى السُّوقِ', english: 'Yesterday I went to the market' },
          { arabic: 'اِسْتَيْقَظْتُ مُبَكِّرًا', english: 'I woke up early' },
          { arabic: 'شَاهَدْنَا فِيلْمًا', english: 'We watched a movie' },
          { arabic: 'زَارَنَا صَدِيقٌ', english: 'A friend visited us' },
        ],
      },

      {
        type: 'note',
        content: 'No pronoun needed! The ending tells you who did it. [[كَتَبْتُ]] alone means "I wrote" — no need to add [[أَنَا]].',
        arabicDescription: 'الضَّمِير مَفْهُوم مِنَ الْفِعْل',
        arabicTranslation: 'The pronoun is understood from the verb',
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
        type: 'description',
        content: 'The present tense [[الْمُضَارِع]] describes what\'s happening [[now]] or what you [[usually do]]! Unlike past tense (endings only), present tense uses [[prefixes]] at the beginning of the verb.',
        arabicDescription: 'الْمُضَارِع يَدُلُّ عَلَى الْحَاضِر أَوِ الْمُسْتَقْبَل',
        arabicTranslation: 'The present tense indicates present or future',
      },
      {
        type: 'rule',
        content: 'Magic prefixes: [[أَ]] = I, [[تَ]] = you/she, [[يَ]] = he/they, [[نَ]] = we. Remember: "[[أَتَيْنَ]]" — I, you, he, we!',
        arabicDescription: 'حُرُوف الْمُضَارَعَة: أ ت ي ن',
        arabicTranslation: 'Present tense prefixes: A, T, Y, N',
      },

      {
        type: 'text',
        content: 'Common Present Tense Verbs (He form)',
      },
      {
        type: 'examples_grid',
        content: 'Basic verbs',
        examples: [
          { arabic: 'يَكْتُبُ', english: 'he writes' },
          { arabic: 'يَذْهَبُ', english: 'he goes' },
          { arabic: 'يَأْكُلُ', english: 'he eats' },
          { arabic: 'يَشْرَبُ', english: 'he drinks' },
          { arabic: 'يَقْرَأُ', english: 'he reads' },
          { arabic: 'يَسْمَعُ', english: 'he hears' },
          { arabic: 'يَفْهَمُ', english: 'he understands' },
          { arabic: 'يَعْمَلُ', english: 'he works' },
          { arabic: 'يَجْلِسُ', english: 'he sits' },
          { arabic: 'يَخْرُجُ', english: 'he goes out' },
          { arabic: 'يَدْخُلُ', english: 'he enters' },
          { arabic: 'يَرْجِعُ', english: 'he returns' },
        ],
      },

      {
        type: 'text',
        content: 'I / We Forms (Speaker)',
      },
      {
        type: 'examples_grid',
        content: 'Talking about yourself',
        examples: [
          { arabic: 'أَكْتُبُ', english: 'I write' },
          { arabic: 'أَذْهَبُ', english: 'I go' },
          { arabic: 'آكُلُ', english: 'I eat' },
          { arabic: 'أَشْرَبُ', english: 'I drink' },
          { arabic: 'نَكْتُبُ', english: 'we write' },
          { arabic: 'نَذْهَبُ', english: 'we go' },
        ],
      },

      {
        type: 'text',
        content: 'You Forms (Addressing Someone)',
      },
      {
        type: 'examples_grid',
        content: 'Talking to others',
        examples: [
          { arabic: 'تَكْتُبُ', english: 'you write (m)' },
          { arabic: 'تَكْتُبِينَ', english: 'you write (f)' },
          { arabic: 'تَذْهَبُ', english: 'you go (m)' },
          { arabic: 'تَذْهَبِينَ', english: 'you go (f)' },
          { arabic: 'تَكْتُبُونَ', english: 'you all write' },
          { arabic: 'تَذْهَبُونَ', english: 'you all go' },
        ],
      },

      {
        type: 'text',
        content: 'He / She / They Forms',
      },
      {
        type: 'examples_grid',
        content: 'Talking about others',
        examples: [
          { arabic: 'يَكْتُبُ', english: 'he writes' },
          { arabic: 'تَكْتُبُ', english: 'she writes' },
          { arabic: 'يَذْهَبُ', english: 'he goes' },
          { arabic: 'تَذْهَبُ', english: 'she goes' },
          { arabic: 'يَكْتُبُونَ', english: 'they write (m)' },
          { arabic: 'يَكْتُبْنَ', english: 'they write (f)' },
        ],
      },

      {
        type: 'rule',
        content: 'Notice: [[تَكْتُبُ]] means both "you write (m)" AND "she writes"! Context tells you which. The feminine "you" adds [[ـينَ]]: [[تَكْتُبِينَ]].',
        arabicDescription: 'تَكْتُبُ لِلْمُخَاطَب وَلِلْغَائِبَة',
        arabicTranslation: 'Taktub is for "you (m)" and "she"',
      },

      {
        type: 'text',
        content: 'Daily Habits',
      },
      {
        type: 'examples_grid',
        content: 'What you do regularly',
        examples: [
          { arabic: 'أَدْرُسُ الْعَرَبِيَّةَ كُلَّ يَوْمٍ', english: 'I study Arabic every day' },
          { arabic: 'أَذْهَبُ إِلَى الْعَمَلِ صَبَاحًا', english: 'I go to work in the morning' },
          { arabic: 'نَأْكُلُ مَعًا', english: 'We eat together' },
          { arabic: 'يُصَلِّي خَمْسَ مَرَّاتٍ', english: 'He prays five times' },
        ],
      },

      {
        type: 'text',
        content: 'Right Now',
      },
      {
        type: 'examples_grid',
        content: 'Current actions',
        examples: [
          { arabic: 'مَاذَا تَفْعَلُ الْآنَ؟', english: 'What are you doing now?' },
          { arabic: 'أَقْرَأُ كِتَابًا', english: 'I am reading a book' },
          { arabic: 'يَلْعَبُ الْأَطْفَالُ', english: 'The children are playing' },
          { arabic: 'تَطْبُخُ أُمِّي', english: 'My mother is cooking' },
        ],
      },

      {
        type: 'note',
        content: 'The present tense can also express [[future]]! [[سَأَذْهَبُ غَدًا]] (I will go tomorrow) — just add [[سَـ]] or [[سَوْفَ]] before the verb.',
        arabicDescription: 'الْمُضَارِع قَدْ يَدُلُّ عَلَى الْمُسْتَقْبَل',
        arabicTranslation: 'The present tense can also indicate the future',
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
        type: 'description',
        content: 'Saying "no" and "not" is essential! Arabic uses different negation words depending on [[when]] the action happens. Three main words: [[لَا]] for present, [[مَا]] for past, and [[لَيْسَ]] for "is not".',
        arabicDescription: 'أَدَوَات النَّفْي: لَا، مَا، لَيْسَ',
        arabicTranslation: 'Negation words: La, Ma, Laysa',
      },

      {
        type: 'text',
        content: 'لَا — Present Tense & Commands',
      },
      {
        type: 'rule',
        content: '[[لَا]] is the most common! Use it for "don\'t" (present actions) and "Don\'t!" (commands). Just put [[لَا]] before the verb.',
        arabicDescription: 'لَا تَنْفِي الْمُضَارِعَ وَالْأَمْر',
        arabicTranslation: 'La negates the present tense and commands',
      },
      {
        type: 'examples_grid',
        content: 'Present tense negation',
        examples: [
          { arabic: 'لَا أَفْهَمُ', english: 'I don\'t understand' },
          { arabic: 'لَا أَعْرِفُ', english: 'I don\'t know' },
          { arabic: 'لَا يَذْهَبُ', english: 'He doesn\'t go' },
          { arabic: 'لَا نُرِيدُ', english: 'We don\'t want' },
          { arabic: 'لَا أُحِبُّ الْقَهْوَةَ', english: 'I don\'t like coffee' },
          { arabic: 'لَا تَتَكَلَّمُ الْعَرَبِيَّةَ', english: 'She doesn\'t speak Arabic' },
        ],
      },

      {
        type: 'text',
        content: 'Commands: Don\'t...!',
      },
      {
        type: 'examples_grid',
        content: 'Negative commands',
        examples: [
          { arabic: 'لَا تَذْهَبْ', english: 'Don\'t go!' },
          { arabic: 'لَا تَأْكُلْ', english: 'Don\'t eat!' },
          { arabic: 'لَا تَنْسَ', english: 'Don\'t forget!' },
          { arabic: 'لَا تَقْلَقْ', english: 'Don\'t worry!' },
          { arabic: 'لَا تَتَأَخَّرْ', english: 'Don\'t be late!' },
          { arabic: 'لَا تَتَكَلَّمْ', english: 'Don\'t speak!' },
        ],
      },

      {
        type: 'text',
        content: 'مَا — Past Tense',
      },
      {
        type: 'rule',
        content: '[[مَا]] negates the past — "didn\'t." Put [[مَا]] before the past tense verb.',
        arabicDescription: 'مَا تَنْفِي الْمَاضِي',
        arabicTranslation: 'Ma negates the past',
      },
      {
        type: 'examples_grid',
        content: 'Past tense negation',
        examples: [
          { arabic: 'مَا ذَهَبْتُ', english: 'I didn\'t go' },
          { arabic: 'مَا فَهِمْتُ', english: 'I didn\'t understand' },
          { arabic: 'مَا أَكَلْنَا', english: 'We didn\'t eat' },
          { arabic: 'مَا سَمِعَ', english: 'He didn\'t hear' },
          { arabic: 'مَا رَأَيْتُهُ', english: 'I didn\'t see him' },
          { arabic: 'مَا قَالَتْ شَيْئًا', english: 'She didn\'t say anything' },
        ],
      },

      {
        type: 'text',
        content: 'لَيْسَ — "Is Not" (Nominal Sentences)',
      },
      {
        type: 'rule',
        content: '[[لَيْسَ]] is special! It negates sentences with NO verb (nominal sentences). It [[conjugates]] to match the subject, like a verb!',
        arabicDescription: 'لَيْسَ تَنْفِي الْجُمْلَة الاِسْمِيَّة',
        arabicTranslation: 'Laysa negates the nominal sentence',
      },
      {
        type: 'examples_grid',
        content: 'لَيْسَ conjugations',
        examples: [
          { arabic: 'لَسْتُ', english: 'I am not' },
          { arabic: 'لَسْتَ', english: 'you are not (m)' },
          { arabic: 'لَسْتِ', english: 'you are not (f)' },
          { arabic: 'لَيْسَ', english: 'he is not' },
          { arabic: 'لَيْسَتْ', english: 'she is not' },
          { arabic: 'لَسْنَا', english: 'we are not' },
          { arabic: 'لَسْتُمْ', english: 'you all are not' },
          { arabic: 'لَيْسُوا', english: 'they are not' },
        ],
      },

      {
        type: 'text',
        content: 'Using لَيْسَ in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Negating "to be"',
        examples: [
          { arabic: 'لَسْتُ طَالِبًا', english: 'I am not a student' },
          { arabic: 'لَيْسَ هُنَا', english: 'He is not here' },
          { arabic: 'لَيْسَتْ مُعَلِّمَةً', english: 'She is not a teacher' },
          { arabic: 'لَسْنَا جَائِعِينَ', english: 'We are not hungry' },
          { arabic: 'لَيْسَ الْجَوُّ بَارِدًا', english: 'The weather is not cold' },
          { arabic: 'لَسْتُ مَشْغُولًا', english: 'I am not busy' },
        ],
      },

      {
        type: 'text',
        content: 'Quick Reference',
      },
      {
        type: 'comparison_grid',
        content: 'Which negation to use?',
        leftLabel: 'Situation',
        rightLabel: 'Use This',
        comparisons: [
          { left: { arabic: 'أَفْهَمُ', label: 'I understand' }, right: { arabic: 'لَا أَفْهَمُ', label: 'I don\'t understand' } },
          { left: { arabic: 'ذَهَبْتُ', label: 'I went' }, right: { arabic: 'مَا ذَهَبْتُ', label: 'I didn\'t go' } },
          { left: { arabic: 'أَنَا طَالِبٌ', label: 'I am a student' }, right: { arabic: 'لَسْتُ طَالِبًا', label: 'I am not a student' } },
        ],
      },

      {
        type: 'note',
        content: 'Memory trick: [[لَا]] for NOW (present), [[مَا]] for THEN (past), [[لَيْسَ]] for "IS NOT" (no verb).',
        arabicDescription: 'لَا لِلْحَاضِر، مَا لِلْمَاضِي، لَيْسَ لِلْجُمْلَة الاِسْمِيَّة',
        arabicTranslation: 'La for present, Ma for past, Laysa for nominal sentences',
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
        type: 'description',
        content: 'How do you say "the student\'s book" in Arabic? You use [[الْإِضَافَة]] (Idafa)! It\'s elegant: just put two nouns [[side by side]] — no "of" needed! [[كِتَابُ الطَّالِبِ]] = book (of) the-student.',
        arabicDescription: 'الْإِضَافَة: نِسْبَة اسْم إِلَى آخَر',
        arabicTranslation: 'Idafa: attributing one noun to another',
      },
      {
        type: 'rule',
        content: 'Golden rule: The [[first noun]] NEVER takes [[ال]]! The second noun determines if the phrase is definite. [[كِتَابُ الطَّالِبِ]] = THE book (definite because الطالب has ال).',
        arabicDescription: 'الْمُضَاف لَا يَقْبَل أَل',
        arabicTranslation: 'The first noun does not take Al',
      },

      {
        type: 'text',
        content: 'Basic Idafa Phrases',
      },
      {
        type: 'examples_grid',
        content: 'X of Y / X\'s Y',
        examples: [
          { arabic: 'بَابُ الْبَيْتِ', english: 'the door of the house' },
          { arabic: 'كِتَابُ الطَّالِبِ', english: 'the student\'s book' },
          { arabic: 'سَيَّارَةُ الْأُسْتَاذِ', english: 'the teacher\'s car' },
          { arabic: 'مِفْتَاحُ الْغُرْفَةِ', english: 'the room key' },
          { arabic: 'اسْمُ الْوَلَدِ', english: 'the boy\'s name' },
          { arabic: 'لَوْنُ السَّمَاءِ', english: 'the color of the sky' },
        ],
      },

      {
        type: 'text',
        content: 'Places & Buildings',
      },
      {
        type: 'examples_grid',
        content: 'Location-related Idafa',
        examples: [
          { arabic: 'مُدِيرُ الْمَدْرَسَةِ', english: 'the school principal' },
          { arabic: 'بَابُ الْمَسْجِدِ', english: 'the mosque door' },
          { arabic: 'شَارِعُ الْمَدِينَةِ', english: 'the city street' },
          { arabic: 'سُوقُ الْخُضَارِ', english: 'the vegetable market' },
          { arabic: 'مَكْتَبَةُ الْجَامِعَةِ', english: 'the university library' },
          { arabic: 'مَطْبَخُ الْبَيْتِ', english: 'the house kitchen' },
        ],
      },

      {
        type: 'text',
        content: 'Definite vs Indefinite Idafa',
      },
      {
        type: 'comparison_grid',
        content: 'ال on second noun makes it definite',
        leftLabel: 'Indefinite (a...)',
        rightLabel: 'Definite (the...)',
        comparisons: [
          { left: { arabic: 'بَابُ بَيْتٍ', label: 'a door of a house' }, right: { arabic: 'بَابُ الْبَيْتِ', label: 'the door of the house' } },
          { left: { arabic: 'كِتَابُ طَالِبٍ', label: 'a student\'s book' }, right: { arabic: 'كِتَابُ الطَّالِبِ', label: 'the student\'s book' } },
          { left: { arabic: 'قَلَمُ مُعَلِّمٍ', label: 'a teacher\'s pen' }, right: { arabic: 'قَلَمُ الْمُعَلِّمِ', label: 'the teacher\'s pen' } },
        ],
      },

      {
        type: 'text',
        content: 'Common Expressions with Idafa',
      },
      {
        type: 'examples_grid',
        content: 'Everyday phrases',
        examples: [
          { arabic: 'صَبَاحُ الْخَيْرِ', english: 'good morning (morning of goodness)' },
          { arabic: 'مَسَاءُ النُّورِ', english: 'good evening (evening of light)' },
          { arabic: 'غُرْفَةُ النَّوْمِ', english: 'bedroom (room of sleep)' },
          { arabic: 'غُرْفَةُ الْجُلُوسِ', english: 'living room (sitting room)' },
          { arabic: 'رَقْمُ الْهَاتِفِ', english: 'phone number' },
          { arabic: 'بِطَاقَةُ الْهَوِيَّةِ', english: 'identity card' },
        ],
      },

      {
        type: 'text',
        content: 'Body & Family',
      },
      {
        type: 'examples_grid',
        content: 'People and parts',
        examples: [
          { arabic: 'أَبُ الْوَلَدِ', english: 'the boy\'s father' },
          { arabic: 'أُمُّ الْبِنْتِ', english: 'the girl\'s mother' },
          { arabic: 'يَدُ الطِّفْلِ', english: 'the child\'s hand' },
          { arabic: 'عَيْنُ الْقِطَّةِ', english: 'the cat\'s eye' },
        ],
      },

      {
        type: 'text',
        content: 'Chain Idafa (3+ Nouns)',
      },
      {
        type: 'examples_grid',
        content: 'Complex possession chains',
        examples: [
          { arabic: 'مُدِيرُ مَكْتَبِ الشَّرِكَةِ', english: 'the company office manager' },
          { arabic: 'بَابُ غُرْفَةِ الْجُلُوسِ', english: 'the living room door' },
          { arabic: 'كِتَابُ مُعَلِّمِ الْمَدْرَسَةِ', english: 'the school teacher\'s book' },
          { arabic: 'سَيَّارَةُ صَدِيقِ أَخِي', english: 'my brother\'s friend\'s car' },
        ],
      },

      {
        type: 'note',
        content: 'Idafa is everywhere in Arabic! Once you master it, you\'ll understand compound words, titles, and everyday expressions. Remember: [[First noun = no ال]], second noun = add ال for "the".',
        arabicDescription: 'الْإِضَافَة أَسَاسِيَّة جِدًّا فِي الْعَرَبِيَّة',
        arabicTranslation: 'Idafa is very fundamental in Arabic',
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
        type: 'description',
        content: 'Arabic plurals are unique! There are [[sound plurals]] (add endings like English -s) and [[broken plurals]] (internal pattern changes). Broken plurals are more common and give Arabic its distinctive sound!',
        arabicDescription: 'الْجَمْع السَّالِم وَجَمْع التَّكْسِير',
        arabicTranslation: 'Sound plurals and broken plurals',
      },

      {
        type: 'text',
        content: 'Sound Masculine Plural (ـونَ / ـينَ)',
      },
      {
        type: 'rule',
        content: 'For [[male humans]]: add [[ـونَ]] (nominative) or [[ـينَ]] (accusative/genitive). Simple and predictable!',
        arabicDescription: 'جَمْع الْمُذَكَّر السَّالِم لِلْعَاقِل',
        arabicTranslation: 'Sound masculine plural for rational beings',
      },
      {
        type: 'comparison_grid',
        content: 'Singular → Plural',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'مُعَلِّم', label: 'teacher (m)' }, right: { arabic: 'مُعَلِّمُونَ', label: 'teachers' } },
          { left: { arabic: 'مُهَنْدِس', label: 'engineer' }, right: { arabic: 'مُهَنْدِسُونَ', label: 'engineers' } },
          { left: { arabic: 'مُسْلِم', label: 'Muslim (m)' }, right: { arabic: 'مُسْلِمُونَ', label: 'Muslims' } },
          { left: { arabic: 'عَامِل', label: 'worker' }, right: { arabic: 'عَامِلُونَ', label: 'workers' } },
          { left: { arabic: 'طَالِب', label: 'student (m)' }, right: { arabic: 'طَالِبُونَ', label: 'students' } },
        ],
      },

      {
        type: 'text',
        content: 'Sound Feminine Plural (ـات)',
      },
      {
        type: 'rule',
        content: 'For [[feminine nouns]] (especially ending in [[ة]]): remove ة and add [[ـات]]. Also works for foreign words!',
        arabicDescription: 'جَمْع الْمُؤَنَّث السَّالِم',
        arabicTranslation: 'Sound feminine plural',
      },
      {
        type: 'comparison_grid',
        content: 'ة → ات',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'مُعَلِّمَة', label: 'teacher (f)' }, right: { arabic: 'مُعَلِّمَات', label: 'teachers' } },
          { left: { arabic: 'سَيَّارَة', label: 'car' }, right: { arabic: 'سَيَّارَات', label: 'cars' } },
          { left: { arabic: 'طَائِرَة', label: 'airplane' }, right: { arabic: 'طَائِرَات', label: 'airplanes' } },
          { left: { arabic: 'جَامِعَة', label: 'university' }, right: { arabic: 'جَامِعَات', label: 'universities' } },
          { left: { arabic: 'كَلِمَة', label: 'word' }, right: { arabic: 'كَلِمَات', label: 'words' } },
        ],
      },

      {
        type: 'text',
        content: 'Broken Plurals — Pattern Changes',
      },
      {
        type: 'rule',
        content: 'Broken plurals change the [[internal vowels]] of the word! They follow patterns. The most common: [[فُعُول]], [[أَفْعَال]], [[فِعَال]].',
        arabicDescription: 'جَمْع التَّكْسِير يُغَيِّر بِنَاء الْكَلِمَة',
        arabicTranslation: 'Broken plural changes the word structure',
      },

      {
        type: 'text',
        content: 'Pattern: فُعُول',
      },
      {
        type: 'comparison_grid',
        content: 'CuCūC pattern',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'بَيْت', label: 'house' }, right: { arabic: 'بُيُوت', label: 'houses' } },
          { left: { arabic: 'قَلْب', label: 'heart' }, right: { arabic: 'قُلُوب', label: 'hearts' } },
          { left: { arabic: 'عَيْن', label: 'eye' }, right: { arabic: 'عُيُون', label: 'eyes' } },
          { left: { arabic: 'شَيْخ', label: 'sheikh' }, right: { arabic: 'شُيُوخ', label: 'sheikhs' } },
        ],
      },

      {
        type: 'text',
        content: 'Pattern: أَفْعَال',
      },
      {
        type: 'comparison_grid',
        content: 'aCCāC pattern',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'قَلَم', label: 'pen' }, right: { arabic: 'أَقْلَام', label: 'pens' } },
          { left: { arabic: 'وَلَد', label: 'boy' }, right: { arabic: 'أَوْلَاد', label: 'boys' } },
          { left: { arabic: 'يَوْم', label: 'day' }, right: { arabic: 'أَيَّام', label: 'days' } },
          { left: { arabic: 'شَهْر', label: 'month' }, right: { arabic: 'أَشْهُر', label: 'months' } },
        ],
      },

      {
        type: 'text',
        content: 'Pattern: فِعَال / فُعَّال',
      },
      {
        type: 'comparison_grid',
        content: 'CiCāC pattern',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'رَجُل', label: 'man' }, right: { arabic: 'رِجَال', label: 'men' } },
          { left: { arabic: 'جَبَل', label: 'mountain' }, right: { arabic: 'جِبَال', label: 'mountains' } },
          { left: { arabic: 'كِتَاب', label: 'book' }, right: { arabic: 'كُتُب', label: 'books' } },
          { left: { arabic: 'طَالِب', label: 'student' }, right: { arabic: 'طُلَّاب', label: 'students' } },
        ],
      },

      {
        type: 'text',
        content: 'More Common Broken Plurals',
      },
      {
        type: 'examples_grid',
        content: 'Memorize these!',
        examples: [
          { arabic: 'صَدِيق ← أَصْدِقَاء', english: 'friend → friends' },
          { arabic: 'طَرِيق ← طُرُق', english: 'road → roads' },
          { arabic: 'مَدِينَة ← مُدُن', english: 'city → cities' },
          { arabic: 'دَوْلَة ← دُوَل', english: 'country → countries' },
          { arabic: 'لُغَة ← لُغَات', english: 'language → languages' },
          { arabic: 'أُسْتَاذ ← أَسَاتِذَة', english: 'professor → professors' },
        ],
      },

      {
        type: 'rule',
        content: 'Important: [[Non-human plurals]] are treated as [[feminine singular]] for adjective agreement! [[الْكُتُبُ الْجَدِيدَةُ]] (the new books) NOT الجديدون.',
        arabicDescription: 'جَمْع غَيْر الْعَاقِل يُعَامَل مُعَامَلَة الْمُفْرَد الْمُؤَنَّث',
        arabicTranslation: 'Non-human plurals are treated as feminine singular',
      },

      {
        type: 'examples_grid',
        content: 'Non-human plurals with adjectives',
        examples: [
          { arabic: 'الْكُتُبُ الْجَدِيدَةُ', english: 'the new books' },
          { arabic: 'السَّيَّارَاتُ الْكَبِيرَةُ', english: 'the big cars' },
          { arabic: 'الْبُيُوتُ الْجَمِيلَةُ', english: 'the beautiful houses' },
          { arabic: 'الْأَيَّامُ الْمَاضِيَةُ', english: 'the past days' },
        ],
      },

      {
        type: 'note',
        content: 'Broken plurals need memorization, but patterns help! When you learn a new noun, learn its plural too. Soon you\'ll start recognizing patterns automatically!',
        arabicDescription: 'تَعَلَّم الْجَمْع مَعَ الْمُفْرَد',
        arabicTranslation: 'Learn the plural with the singular',
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
        type: 'description',
        content: 'Arabic has something special that English doesn\'t: the [[dual]] form! When you have [[exactly two]] of something, you use a special ending instead of the plural. It\'s used for nouns, verbs, pronouns, and adjectives!',
        arabicDescription: 'الْمُثَنَّى لِلتَّعْبِير عَنْ اثْنَيْنِ',
        arabicTranslation: 'The dual is for expressing two',
      },
      {
        type: 'rule',
        content: 'Add [[ـانِ]] to the singular noun. For words ending in [[ة]], first change ة to ت, then add انِ: [[طَالِبَة]] → [[طَالِبَتَانِ]].',
        arabicDescription: 'أَضِف ـانِ لِلْمَرْفُوع وَـيْنِ لِلْمَنْصُوب وَالْمَجْرُور',
        arabicTranslation: 'Add -aan for nominative and -ayn for accusative and genitive',
      },

      {
        type: 'text',
        content: 'Nouns in Dual Form',
      },
      {
        type: 'comparison_grid',
        content: 'Singular → Dual',
        leftLabel: 'Singular (One)',
        rightLabel: 'Dual (Two)',
        comparisons: [
          { left: { arabic: 'كِتَاب', label: 'book' }, right: { arabic: 'كِتَابَانِ', label: 'two books' } },
          { left: { arabic: 'طَالِب', label: 'student (m)' }, right: { arabic: 'طَالِبَانِ', label: 'two students' } },
          { left: { arabic: 'طَالِبَة', label: 'student (f)' }, right: { arabic: 'طَالِبَتَانِ', label: 'two students' } },
          { left: { arabic: 'بَيْت', label: 'house' }, right: { arabic: 'بَيْتَانِ', label: 'two houses' } },
          { left: { arabic: 'يَوْم', label: 'day' }, right: { arabic: 'يَوْمَانِ', label: 'two days' } },
          { left: { arabic: 'سَاعَة', label: 'hour' }, right: { arabic: 'سَاعَتَانِ', label: 'two hours' } },
        ],
      },

      {
        type: 'text',
        content: 'Body Parts (Natural Pairs)',
      },
      {
        type: 'examples_grid',
        content: 'Parts that come in twos',
        examples: [
          { arabic: 'يَدَانِ', english: 'two hands' },
          { arabic: 'عَيْنَانِ', english: 'two eyes' },
          { arabic: 'أُذُنَانِ', english: 'two ears' },
          { arabic: 'رِجْلَانِ', english: 'two legs' },
          { arabic: 'قَدَمَانِ', english: 'two feet' },
          { arabic: 'جَنَاحَانِ', english: 'two wings' },
        ],
      },

      {
        type: 'text',
        content: 'Dual Pronouns',
      },
      {
        type: 'rule',
        content: 'Two special pronouns: [[هُمَا]] (they two) and [[أَنْتُمَا]] (you two). Both work for masculine AND feminine!',
        arabicDescription: 'هُمَا وَأَنْتُمَا لِلْمُذَكَّر وَالْمُؤَنَّث',
        arabicTranslation: 'Huma and Antuma are for both masculine and feminine',
      },
      {
        type: 'examples_grid',
        content: 'Using dual pronouns',
        examples: [
          { arabic: 'هُمَا طَالِبَانِ', english: 'They two are students (m)' },
          { arabic: 'هُمَا طَالِبَتَانِ', english: 'They two are students (f)' },
          { arabic: 'أَنْتُمَا صَدِيقَانِ', english: 'You two are friends' },
          { arabic: 'هُمَا فِي الْبَيْتِ', english: 'They two are at home' },
        ],
      },

      {
        type: 'text',
        content: 'Dual Verbs — Past Tense',
      },
      {
        type: 'examples_grid',
        content: 'Two people did something',
        examples: [
          { arabic: 'ذَهَبَا', english: 'they two went (m)' },
          { arabic: 'ذَهَبَتَا', english: 'they two went (f)' },
          { arabic: 'كَتَبَا الدَّرْسَ', english: 'they two wrote the lesson' },
          { arabic: 'أَكَلَتَا الطَّعَامَ', english: 'they two ate the food (f)' },
        ],
      },

      {
        type: 'text',
        content: 'Dual Verbs — Present Tense',
      },
      {
        type: 'examples_grid',
        content: 'Two people do something',
        examples: [
          { arabic: 'يَذْهَبَانِ', english: 'they two go (m)' },
          { arabic: 'تَذْهَبَانِ', english: 'they two go (f) / you two go' },
          { arabic: 'يَكْتُبَانِ', english: 'they two write (m)' },
          { arabic: 'تَقْرَآنِ', english: 'they two read (f)' },
        ],
      },

      {
        type: 'text',
        content: 'Dual in Complete Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Practical examples',
        examples: [
          { arabic: 'عِنْدِي كِتَابَانِ', english: 'I have two books' },
          { arabic: 'الطَّالِبَانِ ذَهَبَا إِلَى الْمَكْتَبَةِ', english: 'The two students went to the library' },
          { arabic: 'الْبِنْتَانِ تَلْعَبَانِ', english: 'The two girls are playing' },
          { arabic: 'اِشْتَرَيْتُ قَمِيصَيْنِ', english: 'I bought two shirts' },
          { arabic: 'فِي الْغُرْفَةِ نَافِذَتَانِ', english: 'There are two windows in the room' },
          { arabic: 'الْأُسْبُوعُ سَبْعَةُ أَيَّامٍ وَيَوْمَانِ لِلْعُطْلَةِ', english: 'A week has seven days and two days are weekend' },
        ],
      },

      {
        type: 'note',
        content: 'The dual is elegant! Instead of saying [[كِتَابَانِ اثْنَانِ]] (two books - redundant), just say [[كِتَابَانِ]]. The ending already tells you it\'s two!',
        arabicDescription: 'الْمُثَنَّى يُغْنِي عَنْ ذِكْر الْعَدَد',
        arabicTranslation: 'The dual makes mentioning the number unnecessary',
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
        type: 'description',
        content: 'How do you say "he saw [[me]]" or "I love [[her]]"? In Arabic, object pronouns are [[attached directly]] to the verb as suffixes! No separate word needed — they become part of the verb!',
        arabicDescription: 'الضَّمَائِر الْمُتَّصِلَة تُضَاف إِلَى آخِر الْفِعْل',
        arabicTranslation: 'Attached pronouns are added to the end of the verb',
      },
      {
        type: 'rule',
        content: 'These suffixes are the [[same]] as possessive suffixes on nouns! [[كِتَابِي]] (my book) uses the same [[ـي]] as [[رَآنِي]] (he saw me).',
        arabicDescription: 'نَفْس ضَمَائِر الْمِلْكِيَّة',
        arabicTranslation: 'Same as possessive pronouns',
      },

      {
        type: 'text',
        content: 'Object Pronoun Suffixes',
      },
      {
        type: 'examples_grid',
        content: 'All the suffixes',
        examples: [
          { arabic: 'ـنِي', english: 'me' },
          { arabic: 'ـكَ', english: 'you (m)' },
          { arabic: 'ـكِ', english: 'you (f)' },
          { arabic: 'ـهُ', english: 'him / it (m)' },
          { arabic: 'ـهَا', english: 'her / it (f)' },
          { arabic: 'ـنَا', english: 'us' },
          { arabic: 'ـكُمْ', english: 'you all' },
          { arabic: 'ـهُمْ', english: 'them (m)' },
          { arabic: 'ـهُنَّ', english: 'them (f)' },
        ],
      },

      {
        type: 'text',
        content: 'Me & Us (First Person)',
      },
      {
        type: 'examples_grid',
        content: 'Someone did something to me/us',
        examples: [
          { arabic: 'رَآنِي', english: 'he saw me' },
          { arabic: 'سَمِعَنِي', english: 'he heard me' },
          { arabic: 'سَأَلَنِي', english: 'he asked me' },
          { arabic: 'أَخْبَرَنِي', english: 'he told me' },
          { arabic: 'زَارَنَا', english: 'he visited us' },
          { arabic: 'سَاعَدَنَا', english: 'he helped us' },
        ],
      },

      {
        type: 'text',
        content: 'Him & Her (Third Person)',
      },
      {
        type: 'examples_grid',
        content: 'I/someone did something to him/her',
        examples: [
          { arabic: 'رَأَيْتُهُ', english: 'I saw him' },
          { arabic: 'رَأَيْتُهَا', english: 'I saw her' },
          { arabic: 'سَاعَدْتُهُ', english: 'I helped him' },
          { arabic: 'سَأَلْتُهَا', english: 'I asked her' },
          { arabic: 'أَحَبَّتْهُ', english: 'she loved him' },
          { arabic: 'عَرَفَتْهَا', english: 'she knew her' },
        ],
      },

      {
        type: 'text',
        content: 'You (Second Person)',
      },
      {
        type: 'examples_grid',
        content: 'I did something to you',
        examples: [
          { arabic: 'رَأَيْتُكَ', english: 'I saw you (m)' },
          { arabic: 'رَأَيْتُكِ', english: 'I saw you (f)' },
          { arabic: 'سَمِعْتُكَ', english: 'I heard you (m)' },
          { arabic: 'فَهِمْتُكِ', english: 'I understood you (f)' },
          { arabic: 'أُحِبُّكَ', english: 'I love you (m)' },
          { arabic: 'أُحِبُّكِ', english: 'I love you (f)' },
        ],
      },

      {
        type: 'text',
        content: 'Them (Third Person Plural)',
      },
      {
        type: 'examples_grid',
        content: 'Someone did something to them',
        examples: [
          { arabic: 'رَأَيْتُهُمْ', english: 'I saw them' },
          { arabic: 'سَأَلْنَاهُمْ', english: 'we asked them' },
          { arabic: 'زَارَهُمْ', english: 'he visited them' },
          { arabic: 'عَلَّمَهُمْ', english: 'he taught them' },
        ],
      },

      {
        type: 'text',
        content: 'Present Tense + Object Pronouns',
      },
      {
        type: 'examples_grid',
        content: 'Current actions with objects',
        examples: [
          { arabic: 'يَرَانِي', english: 'he sees me' },
          { arabic: 'أَرَاهَا', english: 'I see her' },
          { arabic: 'يُحِبُّهَا', english: 'he loves her' },
          { arabic: 'تَسْأَلُنِي', english: 'she asks me' },
          { arabic: 'يُعَلِّمُنَا', english: 'he teaches us' },
          { arabic: 'نَفْهَمُهُ', english: 'we understand him' },
        ],
      },

      {
        type: 'text',
        content: 'In Complete Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Natural conversation',
        examples: [
          { arabic: 'هَلْ فَهِمْتَنِي؟', english: 'Did you understand me?' },
          { arabic: 'الْمُعَلِّمَةُ سَأَلَتْنِي', english: 'The teacher asked me' },
          { arabic: 'أَعْطَيْتُهُ الْكِتَابَ', english: 'I gave him the book' },
          { arabic: 'زَارُونَا أَمْسِ', english: 'They visited us yesterday' },
          { arabic: 'سَأَرَاكَ غَدًا', english: 'I will see you tomorrow' },
          { arabic: 'أَحَبَّهَا كَثِيرًا', english: 'He loved her very much' },
        ],
      },

      {
        type: 'rule',
        content: 'With two objects (give, show, teach), [[person comes first]], then thing: [[أَعْطَيْتُهُ الْمَالَ]] (I gave [[him]] the-money) — not the other way around!',
        arabicDescription: 'الْمَفْعُول الْأَوَّل لِلشَّخْص وَالثَّانِي لِلشَّيْء',
        arabicTranslation: 'First object for the person, second for the thing',
      },

      {
        type: 'examples_grid',
        content: 'Double object verbs',
        examples: [
          { arabic: 'أَعْطَيْتُهُ الْكِتَابَ', english: 'I gave him the book' },
          { arabic: 'أَرَيْتُهَا الصُّوَرَ', english: 'I showed her the photos' },
          { arabic: 'عَلَّمَنَا الْعَرَبِيَّةَ', english: 'He taught us Arabic' },
          { arabic: 'أَرْسَلْتُ لَهُ رِسَالَةً', english: 'I sent him a message' },
        ],
      },

      {
        type: 'note',
        content: 'Object pronouns make Arabic flow beautifully! Instead of "I saw him yesterday" (3 words), Arabic says [[رَأَيْتُهُ أَمْسِ]] — the verb and object become one smooth word!',
        arabicDescription: 'الضَّمِير الْمُتَّصِل يَجْعَل الْكَلَام أَكْثَر سَلَاسَة',
        arabicTranslation: 'The attached pronoun makes speech smoother',
      },
    ],
  },

  // LESSON 21: Future Tense
  {
    id: 'grammar-21',
    title: 'The Future Tense',
    titleArabic: 'الْمُسْتَقْبَل',
    description: 'Express future plans and predictions with سَـ and سَوْفَ',
    level: 'intermediate',
    category: 'verbs',
    order: 21,
    exercises: ['ex-grammar-21-1', 'ex-grammar-21-2'],
    content: [
      {
        type: 'description',
        content: 'Great news! Arabic future tense is incredibly simple. Just add [[سَـ]] (sa) or [[سَوْفَ]] (sawfa) before any present tense verb, and you\'re talking about the future! No conjugation changes needed.',
        arabicDescription: 'لِلتَّعْبِير عَنِ الْمُسْتَقْبَل نُضِيف سَـ أَوْ سَوْفَ',
        arabicTranslation: 'To express the future, we add Sa or Sawfa',
      },
      {
        type: 'rule',
        content: '[[سَـ]] (sa) is a prefix attached directly to the verb for [[near future]]. [[سَوْفَ]] (sawfa) is a separate word for [[distant future]] or more formal contexts. Both work the same way!',
        arabicDescription: 'سَـ لِلْمُسْتَقْبَل الْقَرِيب، سَوْفَ لِلْمُسْتَقْبَل الْبَعِيد',
        arabicTranslation: 'Sa for near future, Sawfa for distant future',
      },
      {
        type: 'text',
        content: 'Near Future with سَـ',
      },
      {
        type: 'examples_grid',
        content: 'Quick, informal future',
        examples: [
          { arabic: 'سَأَذْهَبُ', english: 'I will go (soon)' },
          { arabic: 'سَتَكْتُبُ', english: 'You will write' },
          { arabic: 'سَيَدْرُسُ', english: 'He will study' },
          { arabic: 'سَتَقْرَأُ', english: 'She will read' },
          { arabic: 'سَنَأْكُلُ', english: 'We will eat' },
          { arabic: 'سَيَعْمَلُونَ', english: 'They will work' },
        ],
      },
      {
        type: 'text',
        content: 'Distant Future with سَوْفَ',
      },
      {
        type: 'examples_grid',
        content: 'Formal or distant future',
        examples: [
          { arabic: 'سَوْفَ أَذْهَبُ', english: 'I will go (eventually)' },
          { arabic: 'سَوْفَ تَكْتُبُ', english: 'You will write' },
          { arabic: 'سَوْفَ يَدْرُسُ', english: 'He will study' },
          { arabic: 'سَوْفَ نَسَافِرُ', english: 'We will travel' },
          { arabic: 'سَوْفَ تَنْجَحُ', english: 'She will succeed' },
          { arabic: 'سَوْفَ يَفْهَمُونَ', english: 'They will understand' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Present vs Future',
        leftLabel: 'Present',
        rightLabel: 'Future',
        comparisons: [
          { left: { arabic: 'أَذْهَبُ', label: 'I go' }, right: { arabic: 'سَأَذْهَبُ', label: 'I will go' } },
          { left: { arabic: 'يَكْتُبُ', label: 'He writes' }, right: { arabic: 'سَيَكْتُبُ', label: 'He will write' } },
          { left: { arabic: 'نَدْرُسُ', label: 'We study' }, right: { arabic: 'سَنَدْرُسُ', label: 'We will study' } },
        ],
      },
      {
        type: 'text',
        content: 'In Everyday Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Natural future expressions',
        examples: [
          { arabic: 'سَأَتَّصِلُ بِكَ غَدًا', english: 'I will call you tomorrow' },
          { arabic: 'سَوْفَ أَزُورُكَ قَرِيبًا', english: 'I will visit you soon' },
          { arabic: 'سَيَصِلُ الْقِطَارُ بَعْدَ سَاعَة', english: 'The train will arrive in an hour' },
          { arabic: 'سَنَلْتَقِي فِي الْمَطْعَم', english: 'We will meet at the restaurant' },
        ],
      },
      {
        type: 'note',
        content: 'In spoken Arabic, [[سَـ]] is much more common. Use [[سَوْفَ]] for emphasis, promises, or formal writing. Both are correct!',
        arabicDescription: 'سَـ أَكْثَر شُيُوعًا فِي الْكَلَام الْيَوْمِي',
        arabicTranslation: 'Sa is more common in everyday speech',
      },
    ],
  },

  // LESSON 22: Imperative (Commands)
  {
    id: 'grammar-22',
    title: 'Commands (Imperative)',
    titleArabic: 'فِعْلُ الْأَمْر',
    description: 'Give commands and make requests in Arabic',
    level: 'intermediate',
    category: 'verbs',
    order: 22,
    exercises: ['ex-grammar-22-1', 'ex-grammar-22-2'],
    content: [
      {
        type: 'description',
        content: 'Want to tell someone what to do? Arabic commands are formed from the present tense with some modifications. Commands exist for [[you (masculine)]], [[you (feminine)]], and [[you (plural)]].',
        arabicDescription: 'نَسْتَخْدِم فِعْل الْأَمْر لِلطَّلَب وَالتَّوْجِيه',
        arabicTranslation: 'We use the imperative verb for requests and directions',
      },
      {
        type: 'rule',
        content: 'To form a command: Take the present tense "you" form, [[remove the prefix]] (تَـ or يَـ), and [[adjust the beginning]] if needed. If the result starts with a consonant cluster, add [[اِ]] (i) at the start.',
        arabicDescription: 'نَحْذِف حَرْف الْمُضَارَعَة وَنُضِيف هَمْزَة إِذَا لَزِم',
        arabicTranslation: 'We remove the present tense prefix and add hamza if needed',
      },
      {
        type: 'text',
        content: 'Commands to One Male (أَنْتَ)',
      },
      {
        type: 'examples_grid',
        content: 'Masculine singular commands',
        examples: [
          { arabic: 'اُكْتُبْ!', english: 'Write!' },
          { arabic: 'اِقْرَأْ!', english: 'Read!' },
          { arabic: 'اِذْهَبْ!', english: 'Go!' },
          { arabic: 'اُدْرُسْ!', english: 'Study!' },
          { arabic: 'تَعَالَ!', english: 'Come!' },
          { arabic: 'اِجْلِسْ!', english: 'Sit!' },
        ],
      },
      {
        type: 'text',
        content: 'Commands to One Female (أَنْتِ)',
      },
      {
        type: 'examples_grid',
        content: 'Feminine singular commands',
        examples: [
          { arabic: 'اُكْتُبِي!', english: 'Write! (f)' },
          { arabic: 'اِقْرَئِي!', english: 'Read! (f)' },
          { arabic: 'اِذْهَبِي!', english: 'Go! (f)' },
          { arabic: 'اُدْرُسِي!', english: 'Study! (f)' },
          { arabic: 'تَعَالَيْ!', english: 'Come! (f)' },
          { arabic: 'اِجْلِسِي!', english: 'Sit! (f)' },
        ],
      },
      {
        type: 'text',
        content: 'Commands to a Group (أَنْتُم)',
      },
      {
        type: 'examples_grid',
        content: 'Plural commands',
        examples: [
          { arabic: 'اُكْتُبُوا!', english: 'Write! (pl)' },
          { arabic: 'اِقْرَؤُوا!', english: 'Read! (pl)' },
          { arabic: 'اِذْهَبُوا!', english: 'Go! (pl)' },
          { arabic: 'اُدْرُسُوا!', english: 'Study! (pl)' },
          { arabic: 'تَعَالَوْا!', english: 'Come! (pl)' },
          { arabic: 'اِجْلِسُوا!', english: 'Sit! (pl)' },
        ],
      },
      {
        type: 'text',
        content: 'Polite Requests',
      },
      {
        type: 'examples_grid',
        content: 'Soften commands with من فضلك',
        examples: [
          { arabic: 'مِنْ فَضْلِكَ اِجْلِسْ', english: 'Please sit down' },
          { arabic: 'لَوْ سَمَحْتَ اُكْتُبْ', english: 'If you please, write' },
          { arabic: 'أَرْجُوكَ اِنْتَظِرْ', english: 'Please wait' },
          { arabic: 'مِنْ فَضْلِكِ سَاعِدِينِي', english: 'Please help me (f)' },
        ],
      },
      {
        type: 'note',
        content: 'Commands can sound harsh! Always add [[مِنْ فَضْلِكَ]] (please) or [[لَوْ سَمَحْتَ]] (if you permit) to be polite in formal situations.',
        arabicDescription: 'أَضِفْ مِنْ فَضْلِكَ لِتَكُون مُهَذَّبًا',
        arabicTranslation: 'Add "please" to be polite',
      },
    ],
  },

  // LESSON 23: Relative Pronouns
  {
    id: 'grammar-23',
    title: 'Relative Pronouns',
    titleArabic: 'الْأَسْمَاء الْمَوْصُولَة',
    description: 'Connect sentences with who, which, and that',
    level: 'intermediate',
    category: 'pronouns',
    order: 23,
    exercises: ['ex-grammar-23-1', 'ex-grammar-23-2'],
    content: [
      {
        type: 'description',
        content: 'Relative pronouns connect two ideas: "The man [[who]] came" or "The book [[that]] I read." Arabic has different relative pronouns depending on [[gender]] and [[number]] of what you\'re referring to.',
        arabicDescription: 'الْأَسْمَاء الْمَوْصُولَة تَرْبِط بَيْنَ جُمْلَتَيْن',
        arabicTranslation: 'Relative pronouns connect two sentences',
      },
      {
        type: 'rule',
        content: 'The main relative pronoun is [[الَّذِي]] (who/which/that) for masculine singular. It changes based on gender and number: [[الَّتِي]] (feminine), [[الَّذِينَ]] (masculine plural), [[اللَّوَاتِي/اللَّائِي]] (feminine plural).',
        arabicDescription: 'الَّذِي لِلْمُذَكَّر، الَّتِي لِلْمُؤَنَّث',
        arabicTranslation: 'Alladhi for masculine, Allati for feminine',
      },
      {
        type: 'text',
        content: 'Relative Pronouns Chart',
      },
      {
        type: 'examples_grid',
        content: 'All forms',
        examples: [
          { arabic: 'الَّذِي', english: 'who/which/that (m. sing.)' },
          { arabic: 'الَّتِي', english: 'who/which/that (f. sing.)' },
          { arabic: 'الَّذِينَ', english: 'who/which/that (m. pl.)' },
          { arabic: 'اللَّوَاتِي', english: 'who/which/that (f. pl.)' },
          { arabic: 'اللَّذَانِ', english: 'who/which (m. dual)' },
          { arabic: 'اللَّتَانِ', english: 'who/which (f. dual)' },
        ],
      },
      {
        type: 'text',
        content: 'Masculine Singular الَّذِي',
      },
      {
        type: 'examples_grid',
        content: 'For one male or masculine noun',
        examples: [
          { arabic: 'الرَّجُلُ الَّذِي جَاءَ', english: 'The man who came' },
          { arabic: 'الْكِتَابُ الَّذِي قَرَأْتُهُ', english: 'The book that I read' },
          { arabic: 'الْبَيْتُ الَّذِي اِشْتَرَيْتُهُ', english: 'The house that I bought' },
          { arabic: 'الْوَلَدُ الَّذِي يَلْعَبُ', english: 'The boy who is playing' },
        ],
      },
      {
        type: 'text',
        content: 'Feminine Singular الَّتِي',
      },
      {
        type: 'examples_grid',
        content: 'For one female or feminine noun',
        examples: [
          { arabic: 'الْمَرْأَةُ الَّتِي جَاءَتْ', english: 'The woman who came' },
          { arabic: 'السَّيَّارَةُ الَّتِي اِشْتَرَيْتُهَا', english: 'The car that I bought' },
          { arabic: 'الْمَدْرَسَةُ الَّتِي أَدْرُسُ فِيهَا', english: 'The school that I study in' },
          { arabic: 'الْبِنْتُ الَّتِي تَكْتُبُ', english: 'The girl who is writing' },
        ],
      },
      {
        type: 'text',
        content: 'Plural Forms',
      },
      {
        type: 'examples_grid',
        content: 'For groups',
        examples: [
          { arabic: 'الرِّجَالُ الَّذِينَ جَاؤُوا', english: 'The men who came' },
          { arabic: 'النِّسَاءُ اللَّوَاتِي ذَهَبْنَ', english: 'The women who went' },
          { arabic: 'الطُّلَّابُ الَّذِينَ نَجَحُوا', english: 'The students who passed' },
          { arabic: 'الْمُعَلِّمَاتُ اللَّوَاتِي يُدَرِّسْنَ', english: 'The teachers (f) who teach' },
        ],
      },
      {
        type: 'note',
        content: 'Important! When the relative pronoun is the object of the relative clause, you need a [[resumptive pronoun]]: الْكِتَابُ الَّذِي قَرَأْتُ[[هُ]] — "the book that I read [[it]]".',
        arabicDescription: 'نُضِيف ضَمِيرًا عَائِدًا إِذَا كَانَ الاِسْم مَفْعُولًا بِهِ',
        arabicTranslation: 'We add a resumptive pronoun if the noun is an object',
      },
    ],
  },

  // LESSON 24: Conjunctions
  {
    id: 'grammar-24',
    title: 'Conjunctions',
    titleArabic: 'حُرُوف الْعَطْف',
    description: 'Connect words and sentences with and, or, but, then',
    level: 'intermediate',
    category: 'other',
    order: 24,
    exercises: ['ex-grammar-24-1', 'ex-grammar-24-2'],
    content: [
      {
        type: 'description',
        content: 'Conjunctions are the glue that holds sentences together! Arabic has several conjunctions to express different relationships: [[وَ]] (and), [[أَوْ]] (or), [[لَكِنْ]] (but), [[ثُمَّ]] (then), and more.',
        arabicDescription: 'حُرُوف الْعَطْف تَرْبِط بَيْنَ الْكَلِمَات وَالْجُمَل',
        arabicTranslation: 'Conjunctions connect words and sentences',
      },
      {
        type: 'text',
        content: 'وَ (and) - The Most Common',
      },
      {
        type: 'rule',
        content: '[[وَ]] (wa) means "and" and is [[attached]] directly to the next word. It\'s the most common Arabic conjunction, used constantly to connect words, phrases, and sentences.',
        arabicDescription: 'وَ تَعْنِي "and" وَتَتَّصِل بِالْكَلِمَة الَّتِي بَعْدَهَا',
        arabicTranslation: 'Wa means "and" and attaches to the following word',
      },
      {
        type: 'examples_grid',
        content: 'Using وَ (and)',
        examples: [
          { arabic: 'أَحْمَدُ وَمُحَمَّد', english: 'Ahmad and Muhammad' },
          { arabic: 'قَهْوَة وَشَاي', english: 'Coffee and tea' },
          { arabic: 'جَاءَ وَجَلَسَ', english: 'He came and sat' },
          { arabic: 'أَكَلْتُ وَشَرِبْتُ', english: 'I ate and drank' },
        ],
      },
      {
        type: 'text',
        content: 'أَوْ (or)',
      },
      {
        type: 'examples_grid',
        content: 'Giving options',
        examples: [
          { arabic: 'قَهْوَة أَوْ شَاي؟', english: 'Coffee or tea?' },
          { arabic: 'الْيَوْم أَوْ غَدًا', english: 'Today or tomorrow' },
          { arabic: 'هَلْ تُرِيدُ هَذَا أَوْ ذَاكَ؟', english: 'Do you want this or that?' },
          { arabic: 'اِقْرَأْ أَوْ اُكْتُبْ', english: 'Read or write' },
        ],
      },
      {
        type: 'text',
        content: 'لَكِنْ / لَكِنَّ (but)',
      },
      {
        type: 'examples_grid',
        content: 'Showing contrast',
        examples: [
          { arabic: 'صَغِير لَكِنْ ذَكِي', english: 'Small but smart' },
          { arabic: 'أُحِبُّهُ لَكِنَّهُ بَعِيد', english: 'I love him but he\'s far' },
          { arabic: 'حَاوَلْتُ لَكِنْ فَشِلْتُ', english: 'I tried but failed' },
          { arabic: 'غَنِيٌّ لَكِنَّهُ بَخِيل', english: 'Rich but stingy' },
        ],
      },
      {
        type: 'text',
        content: 'ثُمَّ / فَـ (then)',
      },
      {
        type: 'examples_grid',
        content: 'Sequence of events',
        examples: [
          { arabic: 'جَاءَ ثُمَّ جَلَسَ', english: 'He came, then sat' },
          { arabic: 'أَكَلْتُ ثُمَّ نِمْتُ', english: 'I ate, then slept' },
          { arabic: 'اِسْتَيْقَظْتُ فَذَهَبْتُ', english: 'I woke up and (so) went' },
          { arabic: 'دَرَسَ فَنَجَحَ', english: 'He studied and (so) passed' },
        ],
      },
      {
        type: 'text',
        content: 'More Conjunctions',
      },
      {
        type: 'examples_grid',
        content: 'Additional connectors',
        examples: [
          { arabic: 'بَلْ', english: 'Rather, but rather' },
          { arabic: 'أَمْ', english: 'Or (in questions)' },
          { arabic: 'حَتَّى', english: 'Until, even' },
          { arabic: 'لَا...وَلَا', english: 'Neither...nor' },
        ],
      },
      {
        type: 'note',
        content: '[[فَـ]] (fa) implies [[immediate sequence]] or [[cause and effect]], while [[ثُمَّ]] (thumma) implies a [[delay]] between actions. Choose wisely!',
        arabicDescription: 'فَـ لِلتَّرْتِيب الْفَوْرِي، ثُمَّ لِلتَّرْتِيب مَعَ تَرَاخٍ',
        arabicTranslation: 'Fa for immediate sequence, Thumma for delayed sequence',
      },
    ],
  },

  // LESSON 25: Comparative & Superlative
  {
    id: 'grammar-25',
    title: 'Comparative & Superlative',
    titleArabic: 'أَفْعَل التَّفْضِيل',
    description: 'Express bigger, smaller, best, and most in Arabic',
    level: 'intermediate',
    category: 'adjectives',
    order: 25,
    exercises: ['ex-grammar-25-1', 'ex-grammar-25-2'],
    content: [
      {
        type: 'description',
        content: 'How do you say "bigger," "more beautiful," or "the best" in Arabic? Use the special [[أَفْعَل]] pattern! This single form works for both comparative (bigger) and superlative (biggest).',
        arabicDescription: 'نَسْتَخْدِم وَزْن أَفْعَل لِلْمُقَارَنَة وَالتَّفْضِيل',
        arabicTranslation: 'We use the Af\'al pattern for comparison and preference',
      },
      {
        type: 'rule',
        content: 'The comparative/superlative pattern is [[أَفْعَل]] (af\'al). Take the 3 root letters and put them in this pattern. For comparative, add [[مِنْ]] (than). For superlative, add [[ال]] or use with a noun.',
        arabicDescription: 'أَفْعَل + مِنْ = أَكْبَر مِنْ (bigger than)',
        arabicTranslation: 'Af\'al + Min = Akbar min (bigger than)',
      },
      {
        type: 'text',
        content: 'Common Comparatives',
      },
      {
        type: 'examples_grid',
        content: 'Building the أَفْعَل pattern',
        examples: [
          { arabic: 'كَبِير ← أَكْبَر', english: 'big → bigger/biggest' },
          { arabic: 'صَغِير ← أَصْغَر', english: 'small → smaller/smallest' },
          { arabic: 'جَمِيل ← أَجْمَل', english: 'beautiful → more beautiful' },
          { arabic: 'سَرِيع ← أَسْرَع', english: 'fast → faster/fastest' },
          { arabic: 'طَوِيل ← أَطْوَل', english: 'tall → taller/tallest' },
          { arabic: 'قَصِير ← أَقْصَر', english: 'short → shorter/shortest' },
        ],
      },
      {
        type: 'text',
        content: 'Comparative with مِنْ (than)',
      },
      {
        type: 'examples_grid',
        content: 'Comparing two things',
        examples: [
          { arabic: 'أَحْمَدُ أَكْبَرُ مِنْ عَلِي', english: 'Ahmad is bigger than Ali' },
          { arabic: 'هِيَ أَجْمَلُ مِنْهَا', english: 'She is more beautiful than her' },
          { arabic: 'السَّيَّارَةُ أَسْرَعُ مِنَ الْحِصَان', english: 'The car is faster than the horse' },
          { arabic: 'الْفِيلُ أَكْبَرُ مِنَ الْأَسَد', english: 'The elephant is bigger than the lion' },
        ],
      },
      {
        type: 'text',
        content: 'Superlative (The Best)',
      },
      {
        type: 'examples_grid',
        content: 'Using ال for superlative',
        examples: [
          { arabic: 'الْأَكْبَر', english: 'The biggest' },
          { arabic: 'الْأَفْضَل', english: 'The best' },
          { arabic: 'الْأَجْمَل', english: 'The most beautiful' },
          { arabic: 'الْأَسْرَع', english: 'The fastest' },
          { arabic: 'هُوَ الْأَفْضَل', english: 'He is the best' },
          { arabic: 'هَذَا أَكْبَر بَيْت', english: 'This is the biggest house' },
        ],
      },
      {
        type: 'text',
        content: 'More Useful Comparatives',
      },
      {
        type: 'examples_grid',
        content: 'Expand your vocabulary',
        examples: [
          { arabic: 'أَحْسَن', english: 'better/best' },
          { arabic: 'أَسْوَأ', english: 'worse/worst' },
          { arabic: 'أَكْثَر', english: 'more/most' },
          { arabic: 'أَقَلّ', english: 'less/least' },
          { arabic: 'أَهَمّ', english: 'more important' },
          { arabic: 'أَسْهَل', english: 'easier/easiest' },
        ],
      },
      {
        type: 'note',
        content: 'The أَفْعَل form is [[invariable]] for gender and number in comparative use. [[أَكْبَر]] stays the same whether talking about a man, woman, or group!',
        arabicDescription: 'أَفْعَل التَّفْضِيل لَا يَتَغَيَّر لِلْمُذَكَّر وَالْمُؤَنَّث',
        arabicTranslation: 'The comparative form does not change for masculine and feminine',
      },
    ],
  },

  // LESSON 26: Active Participles
  {
    id: 'grammar-26',
    title: 'Active Participles',
    titleArabic: 'اِسْم الْفَاعِل',
    description: 'The doer form: writer, teacher, student',
    level: 'intermediate',
    category: 'nouns',
    order: 26,
    exercises: ['ex-grammar-26-1', 'ex-grammar-26-2'],
    content: [
      {
        type: 'description',
        content: 'The Active Participle ([[اِسْم الْفَاعِل]]) describes the [[doer]] of an action. From "to write" you get "writer"; from "to teach" you get "teacher". Arabic has a pattern for this: [[فَاعِل]]!',
        arabicDescription: 'اِسْم الْفَاعِل يَدُلّ عَلَى مَنْ يَقُوم بِالْفِعْل',
        arabicTranslation: 'The active participle indicates the one who does the action',
      },
      {
        type: 'rule',
        content: 'For Form I verbs (basic 3-letter verbs), the active participle follows the pattern [[فَاعِل]] (faa\'il). Take the root letters and apply the pattern. This works for most basic verbs!',
        arabicDescription: 'وَزْن فَاعِل لِلْفِعْل الثُّلَاثِي الْمُجَرَّد',
        arabicTranslation: 'The Faa\'il pattern for the basic triliteral verb',
      },
      {
        type: 'text',
        content: 'Basic Active Participles',
      },
      {
        type: 'examples_grid',
        content: 'Following the فَاعِل pattern',
        examples: [
          { arabic: 'كَتَبَ ← كَاتِب', english: 'he wrote → writer' },
          { arabic: 'دَرَسَ ← دَارِس', english: 'he studied → student' },
          { arabic: 'عَمِلَ ← عَامِل', english: 'he worked → worker' },
          { arabic: 'سَافَرَ ← مُسَافِر', english: 'he traveled → traveler' },
          { arabic: 'لَعِبَ ← لَاعِب', english: 'he played → player' },
          { arabic: 'قَرَأَ ← قَارِئ', english: 'he read → reader' },
        ],
      },
      {
        type: 'text',
        content: 'Common Professions & Roles',
      },
      {
        type: 'examples_grid',
        content: 'Active participles as job titles',
        examples: [
          { arabic: 'مُعَلِّم', english: 'teacher (m)' },
          { arabic: 'مُعَلِّمَة', english: 'teacher (f)' },
          { arabic: 'طَالِب', english: 'student (m)' },
          { arabic: 'طَالِبَة', english: 'student (f)' },
          { arabic: 'سَائِق', english: 'driver' },
          { arabic: 'طَبَّاخ', english: 'cook' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Masculine vs Feminine',
        leftLabel: 'Masculine',
        rightLabel: 'Feminine (add ة)',
        comparisons: [
          { left: { arabic: 'كَاتِب', label: 'writer (m)' }, right: { arabic: 'كَاتِبَة', label: 'writer (f)' } },
          { left: { arabic: 'عَامِل', label: 'worker (m)' }, right: { arabic: 'عَامِلَة', label: 'worker (f)' } },
          { left: { arabic: 'قَارِئ', label: 'reader (m)' }, right: { arabic: 'قَارِئَة', label: 'reader (f)' } },
        ],
      },
      {
        type: 'text',
        content: 'Used as Adjectives',
      },
      {
        type: 'examples_grid',
        content: 'Describing ongoing states',
        examples: [
          { arabic: 'رَجُل نَائِم', english: 'A sleeping man' },
          { arabic: 'طِفْل بَاكٍ', english: 'A crying child' },
          { arabic: 'مَاء جَارٍ', english: 'Running water' },
          { arabic: 'شَمْس سَاطِعَة', english: 'Shining sun' },
        ],
      },
      {
        type: 'note',
        content: 'Active participles can function as [[nouns]] (a writer) or [[adjectives]] (a writing person). Context tells you which! Add [[ة]] for feminine.',
        arabicDescription: 'اِسْم الْفَاعِل يَعْمَل كَاسْم أَوْ صِفَة',
        arabicTranslation: 'The active participle works as a noun or adjective',
      },
    ],
  },

  // LESSON 27: Passive Participles
  {
    id: 'grammar-27',
    title: 'Passive Participles',
    titleArabic: 'اِسْم الْمَفْعُول',
    description: 'The receiver form: written, known, loved',
    level: 'intermediate',
    category: 'nouns',
    order: 27,
    exercises: ['ex-grammar-27-1', 'ex-grammar-27-2'],
    content: [
      {
        type: 'description',
        content: 'While the Active Participle is the doer, the Passive Participle ([[اِسْم الْمَفْعُول]]) is the [[receiver]] of the action. From "to write" you get "written"; from "to know" you get "known".',
        arabicDescription: 'اِسْم الْمَفْعُول يَدُلّ عَلَى مَنْ وَقَعَ عَلَيْهِ الْفِعْل',
        arabicTranslation: 'The passive participle indicates the one upon whom the action fell',
      },
      {
        type: 'rule',
        content: 'For Form I verbs, the passive participle follows the pattern [[مَفْعُول]] (maf\'ool). The [[مَـ]] prefix is the key marker! This pattern produces words like "known," "beloved," "written."',
        arabicDescription: 'وَزْن مَفْعُول لِلْفِعْل الثُّلَاثِي الْمُجَرَّد',
        arabicTranslation: 'The Maf\'ool pattern for the basic triliteral verb',
      },
      {
        type: 'text',
        content: 'Basic Passive Participles',
      },
      {
        type: 'examples_grid',
        content: 'Following the مَفْعُول pattern',
        examples: [
          { arabic: 'كَتَبَ ← مَكْتُوب', english: 'wrote → written' },
          { arabic: 'عَرَفَ ← مَعْرُوف', english: 'knew → known' },
          { arabic: 'فَهِمَ ← مَفْهُوم', english: 'understood → understood' },
          { arabic: 'سَمِعَ ← مَسْمُوع', english: 'heard → heard' },
          { arabic: 'فَتَحَ ← مَفْتُوح', english: 'opened → open/opened' },
          { arabic: 'كَسَرَ ← مَكْسُور', english: 'broke → broken' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Active vs Passive Participles',
        leftLabel: 'Active (doer)',
        rightLabel: 'Passive (receiver)',
        comparisons: [
          { left: { arabic: 'كَاتِب', label: 'writer' }, right: { arabic: 'مَكْتُوب', label: 'written' } },
          { left: { arabic: 'فَاهِم', label: 'understander' }, right: { arabic: 'مَفْهُوم', label: 'understood' } },
          { left: { arabic: 'فَاتِح', label: 'opener' }, right: { arabic: 'مَفْتُوح', label: 'opened' } },
        ],
      },
      {
        type: 'text',
        content: 'Common Passive Participles',
      },
      {
        type: 'examples_grid',
        content: 'Useful vocabulary',
        examples: [
          { arabic: 'مَشْهُور', english: 'famous (known widely)' },
          { arabic: 'مَحْبُوب', english: 'beloved' },
          { arabic: 'مَطْلُوب', english: 'wanted/required' },
          { arabic: 'مَشْغُول', english: 'busy (occupied)' },
          { arabic: 'مَمْنُوع', english: 'forbidden' },
          { arabic: 'مَسْمُوح', english: 'allowed' },
        ],
      },
      {
        type: 'text',
        content: 'In Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Using passive participles',
        examples: [
          { arabic: 'الْبَاب مَفْتُوح', english: 'The door is open' },
          { arabic: 'الْكِتَاب مَكْتُوب بِالْعَرَبِيَّة', english: 'The book is written in Arabic' },
          { arabic: 'هُوَ مَشْهُور جِدًّا', english: 'He is very famous' },
          { arabic: 'التَّدْخِين مَمْنُوع هُنَا', english: 'Smoking is forbidden here' },
        ],
      },
      {
        type: 'note',
        content: 'Passive participles often become [[adjectives]] or [[nouns]] on their own. [[مَشْغُول]] (busy) and [[مَمْنُوع]] (forbidden) are used constantly in everyday Arabic!',
        arabicDescription: 'كَثِير مِنْ أَسْمَاء الْمَفْعُول تُسْتَخْدَم كَصِفَات',
        arabicTranslation: 'Many passive participles are used as adjectives',
      },
    ],
  },

  // LESSON 28: The Verbal Noun (Masdar)
  {
    id: 'grammar-28',
    title: 'The Verbal Noun (Masdar)',
    titleArabic: 'الْمَصْدَر',
    description: 'Turn verbs into nouns: writing, reading, studying',
    level: 'intermediate',
    category: 'nouns',
    order: 28,
    exercises: ['ex-grammar-28-1', 'ex-grammar-28-2'],
    content: [
      {
        type: 'description',
        content: 'The [[مَصْدَر]] (Masdar) is the verbal noun — it turns an action into a concept. From "to write" you get "writing" (the act of writing). English uses "-ing" or "-tion"; Arabic has various patterns.',
        arabicDescription: 'الْمَصْدَر هُوَ اسْم الْفِعْل الَّذِي يَدُلّ عَلَى الْحَدَث',
        arabicTranslation: 'The masdar is the noun of the verb that indicates the event',
      },
      {
        type: 'rule',
        content: 'Unlike active/passive participles, Form I masdars have [[multiple patterns]] and must often be memorized. Common patterns include [[فَعْل]], [[فِعَالَة]], [[فُعُول]], and many more.',
        arabicDescription: 'لِلْفِعْل الثُّلَاثِي أَوْزَان مُتَعَدِّدَة لِلْمَصْدَر',
        arabicTranslation: 'The triliteral verb has multiple patterns for the masdar',
      },
      {
        type: 'text',
        content: 'Common Masdar Patterns',
      },
      {
        type: 'examples_grid',
        content: 'Various verbal noun forms',
        examples: [
          { arabic: 'كَتَبَ ← كِتَابَة', english: 'wrote → writing' },
          { arabic: 'قَرَأَ ← قِرَاءَة', english: 'read → reading' },
          { arabic: 'دَرَسَ ← دِرَاسَة', english: 'studied → studying' },
          { arabic: 'عَمِلَ ← عَمَل', english: 'worked → work' },
          { arabic: 'فَهِمَ ← فَهْم', english: 'understood → understanding' },
          { arabic: 'ذَهَبَ ← ذَهَاب', english: 'went → going' },
        ],
      },
      {
        type: 'text',
        content: 'Derived Form Masdars (Predictable!)',
      },
      {
        type: 'rule',
        content: 'Good news! Derived verb forms (II-X) have [[predictable masdar patterns]]. Form II: [[تَفْعِيل]], Form III: [[مُفَاعَلَة]], Form V: [[تَفَعُّل]], and so on.',
        arabicDescription: 'مَصَادِر الْأَفْعَال الْمَزِيدَة قِيَاسِيَّة',
        arabicTranslation: 'The masdars of derived verbs are regular',
      },
      {
        type: 'examples_grid',
        content: 'Predictable patterns',
        examples: [
          { arabic: 'عَلَّمَ ← تَعْلِيم', english: 'taught → teaching (Form II)' },
          { arabic: 'سَافَرَ ← مُسَافَرَة', english: 'traveled → traveling (Form III)' },
          { arabic: 'تَكَلَّمَ ← تَكَلُّم', english: 'spoke → speaking (Form V)' },
          { arabic: 'اِسْتَعْمَلَ ← اِسْتِعْمَال', english: 'used → usage (Form X)' },
        ],
      },
      {
        type: 'text',
        content: 'Using Masdars in Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Verbal nouns as subjects and objects',
        examples: [
          { arabic: 'الْقِرَاءَةُ مُفِيدَة', english: 'Reading is useful' },
          { arabic: 'أُحِبُّ السِّبَاحَة', english: 'I love swimming' },
          { arabic: 'التَّعْلِيم مُهِمّ', english: 'Education is important' },
          { arabic: 'شُكْرًا عَلَى الْمُسَاعَدَة', english: 'Thanks for the help' },
        ],
      },
      {
        type: 'note',
        content: 'Masdars are essential for abstract concepts and are used as [[subjects]], [[objects]], and after [[prepositions]]. They\'re everywhere in formal Arabic!',
        arabicDescription: 'الْمَصْدَر يُسْتَخْدَم كَفَاعِل وَمَفْعُول وَبَعْدَ حُرُوف الْجَرّ',
        arabicTranslation: 'The masdar is used as subject, object, and after prepositions',
      },
    ],
  },

  // LESSON 29: Introduction to Verb Patterns
  {
    id: 'grammar-29',
    title: 'Introduction to Verb Patterns',
    titleArabic: 'مُقَدِّمَة فِي الْأَوْزَان',
    description: 'Discover the 10 Arabic verb forms and their meanings',
    level: 'intermediate',
    category: 'verbs',
    order: 29,
    exercises: ['ex-grammar-29-1', 'ex-grammar-29-2'],
    content: [
      {
        type: 'description',
        content: 'Arabic has a brilliant system: from one 3-letter root, you can create up to [[10 different verb forms]], each with predictable meaning changes! This is the key to unlocking thousands of words.',
        arabicDescription: 'الْأَوْزَان الْعَشَرَة تُنْتِج مَعَانِيَ مُخْتَلِفَة مِنْ جَذْر وَاحِد',
        arabicTranslation: 'The ten patterns produce different meanings from one root',
      },
      {
        type: 'rule',
        content: 'Arabic verbs are organized into [[10 forms]] (أَوْزَان). Form I is the basic 3-letter verb ([[فَعَلَ]]). Forms II-X add letters or modify the root to change meaning in predictable ways.',
        arabicDescription: 'الْفِعْل الْعَرَبِي لَهُ عَشَرَة أَوْزَان',
        arabicTranslation: 'The Arabic verb has ten patterns',
      },
      {
        type: 'text',
        content: 'The 10 Verb Forms Overview',
      },
      {
        type: 'examples_grid',
        content: 'Pattern and meaning',
        examples: [
          { arabic: 'فَعَلَ (I)', english: 'Basic verb (to do)' },
          { arabic: 'فَعَّلَ (II)', english: 'Intensive/Causative' },
          { arabic: 'فَاعَلَ (III)', english: 'Mutual action' },
          { arabic: 'أَفْعَلَ (IV)', english: 'Causative' },
          { arabic: 'تَفَعَّلَ (V)', english: 'Reflexive of II' },
          { arabic: 'تَفَاعَلَ (VI)', english: 'Reciprocal' },
          { arabic: 'اِنْفَعَلَ (VII)', english: 'Passive-like' },
          { arabic: 'اِفْتَعَلَ (VIII)', english: 'Reflexive' },
          { arabic: 'اِفْعَلَّ (IX)', english: 'Colors/Defects' },
          { arabic: 'اِسْتَفْعَلَ (X)', english: 'Seeking/Asking' },
        ],
      },
      {
        type: 'text',
        content: 'Example: Root ع-ل-م (knowledge)',
      },
      {
        type: 'examples_grid',
        content: 'Different forms, related meanings',
        examples: [
          { arabic: 'عَلِمَ', english: 'I: he knew' },
          { arabic: 'عَلَّمَ', english: 'II: he taught (made know)' },
          { arabic: 'تَعَلَّمَ', english: 'V: he learned (taught himself)' },
          { arabic: 'أَعْلَمَ', english: 'IV: he informed' },
          { arabic: 'اِسْتَعْلَمَ', english: 'X: he inquired' },
        ],
      },
      {
        type: 'text',
        content: 'Example: Root ك-ت-ب (writing)',
      },
      {
        type: 'examples_grid',
        content: 'From one root, many verbs',
        examples: [
          { arabic: 'كَتَبَ', english: 'I: he wrote' },
          { arabic: 'كَاتَبَ', english: 'III: he corresponded with' },
          { arabic: 'أَكْتَبَ', english: 'IV: he dictated' },
          { arabic: 'تَكَاتَبَ', english: 'VI: they wrote to each other' },
          { arabic: 'اِكْتَتَبَ', english: 'VIII: he subscribed' },
          { arabic: 'اِسْتَكْتَبَ', english: 'X: he asked to write' },
        ],
      },
      {
        type: 'note',
        content: 'You don\'t need to memorize all 10 forms now! Start with [[Form I]] (basic), [[Form II]] (intensive), and [[Form V]] (reflexive). These are the most common!',
        arabicDescription: 'اِبْدَأْ بِالْأَوْزَان الْأَكْثَر شُيُوعًا: I, II, V',
        arabicTranslation: 'Start with the most common patterns: I, II, V',
      },
    ],
  },

  // LESSON 30: Conditional Sentences
  {
    id: 'grammar-30',
    title: 'Conditional Sentences',
    titleArabic: 'الْجُمْلَة الشَّرْطِيَّة',
    description: 'Express if-then relationships in Arabic',
    level: 'intermediate',
    category: 'sentences',
    order: 30,
    exercises: ['ex-grammar-30-1', 'ex-grammar-30-2'],
    content: [
      {
        type: 'description',
        content: '"If you study, you will pass." Arabic conditional sentences use particles like [[إِذَا]] (if - likely) and [[لَوْ]] (if - unlikely/hypothetical) to express conditions and results.',
        arabicDescription: 'الْجُمْلَة الشَّرْطِيَّة تُعَبِّر عَنْ عَلَاقَة الشَّرْط وَالْجَوَاب',
        arabicTranslation: 'The conditional sentence expresses the relationship of condition and answer',
      },
      {
        type: 'rule',
        content: '[[إِذَا]] is used for [[likely or real]] conditions (If you come...). [[لَوْ]] is used for [[unlikely or hypothetical]] conditions (If I were rich...). [[إِنْ]] is also used for general conditions.',
        arabicDescription: 'إِذَا لِلشَّرْط الْمُحْتَمَل، لَوْ لِلشَّرْط غَيْر الْمُحْتَمَل',
        arabicTranslation: 'Idha for likely conditions, Law for unlikely conditions',
      },
      {
        type: 'text',
        content: 'إِذَا (If - Likely)',
      },
      {
        type: 'examples_grid',
        content: 'Real, possible conditions',
        examples: [
          { arabic: 'إِذَا دَرَسْتَ نَجَحْتَ', english: 'If you study, you will pass' },
          { arabic: 'إِذَا جَاءَ سَأُخْبِرُهُ', english: 'If he comes, I will tell him' },
          { arabic: 'إِذَا أَكَلْتَ شَبِعْتَ', english: 'If you eat, you will be full' },
          { arabic: 'إِذَا سَأَلْتَ أَجَبْتُكَ', english: 'If you ask, I will answer you' },
        ],
      },
      {
        type: 'text',
        content: 'لَوْ (If - Hypothetical)',
      },
      {
        type: 'examples_grid',
        content: 'Unreal or impossible conditions',
        examples: [
          { arabic: 'لَوْ كُنْتُ غَنِيًّا لَاشْتَرَيْتُ بَيْتًا', english: 'If I were rich, I would buy a house' },
          { arabic: 'لَوْ عَرَفْتُ لَأَخْبَرْتُكَ', english: 'If I had known, I would have told you' },
          { arabic: 'لَوْ كَانَ هُنَا لَسَاعَدَنَا', english: 'If he were here, he would help us' },
          { arabic: 'لَوْ أَمْكَنَنِي لَفَعَلْتُ', english: 'If I could, I would do it' },
        ],
      },
      {
        type: 'text',
        content: 'إِنْ (If - General)',
      },
      {
        type: 'examples_grid',
        content: 'General conditional',
        examples: [
          { arabic: 'إِنْ تَدْرُسْ تَنْجَحْ', english: 'If you study, you pass' },
          { arabic: 'إِنْ شَاءَ اللَّه', english: 'If God wills (God willing)' },
          { arabic: 'إِنْ أَرَدْتَ فَاذْهَبْ', english: 'If you want, then go' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'إِذَا vs لَوْ',
        leftLabel: 'إِذَا (Likely)',
        rightLabel: 'لَوْ (Hypothetical)',
        comparisons: [
          { left: { arabic: 'إِذَا رَأَيْتُهُ', label: 'If I see him' }, right: { arabic: 'لَوْ رَأَيْتُهُ', label: 'If I saw/had seen him' } },
          { left: { arabic: 'إِذَا جَاءَ', label: 'If he comes' }, right: { arabic: 'لَوْ جَاءَ', label: 'If he came/had come' } },
        ],
      },
      {
        type: 'note',
        content: 'The result clause after [[لَوْ]] often uses [[لَـ]] before the verb: لَوْ دَرَسْتُ [[لَـ]]نَجَحْتُ (If I had studied, I [[would have]] passed).',
        arabicDescription: 'جَوَاب لَوْ غَالِبًا يَبْدَأ بِـ لَـ',
        arabicTranslation: 'The answer to Law usually starts with La',
      },
    ],
  },

  // ============================================
  // ADVANCED LESSONS (31-40)
  // ============================================

  // LESSON 31: Case Endings - Nominative
  {
    id: 'grammar-31',
    title: 'Case Endings: Nominative',
    titleArabic: 'الرَّفْع',
    description: 'Master the nominative case for subjects and predicates',
    level: 'advanced',
    category: 'nouns',
    order: 31,
    exercises: ['ex-grammar-31-1', 'ex-grammar-31-2'],
    content: [
      {
        type: 'description',
        content: 'Arabic nouns change their endings based on their role in the sentence. The [[nominative case]] (الرَّفْع) marks [[subjects]] and [[predicates]]. This is the "default" case for main sentence elements.',
        arabicDescription: 'الرَّفْع هُوَ حَالَة الْفَاعِل وَالْمُبْتَدَأ وَالْخَبَر',
        arabicTranslation: 'Nominative is the case of the subject and predicate',
      },
      {
        type: 'rule',
        content: 'Nominative endings: singular nouns add [[ـُ]] (damma) or [[ـٌ]] (tanwin). Dual nouns end in [[ـَانِ]]. Sound masculine plurals end in [[ـُونَ]]. Sound feminine plurals end in [[ـَاتٌ]].',
        arabicDescription: 'عَلَامَات الرَّفْع: الضَّمَّة، الْأَلِف وَالنُّون، الْوَاو وَالنُّون',
        arabicTranslation: 'Signs of nominative: damma, alif and nun, waw and nun',
      },
      {
        type: 'text',
        content: 'Singular Nominative',
      },
      {
        type: 'examples_grid',
        content: 'Subjects with damma',
        examples: [
          { arabic: 'جَاءَ الْوَلَدُ', english: 'The boy came' },
          { arabic: 'الْبَيْتُ كَبِيرٌ', english: 'The house is big' },
          { arabic: 'هَذَا كِتَابٌ', english: 'This is a book' },
          { arabic: 'الْمُعَلِّمُ ذَكِيٌّ', english: 'The teacher is smart' },
        ],
      },
      {
        type: 'text',
        content: 'Dual Nominative (-āni)',
      },
      {
        type: 'examples_grid',
        content: 'Two of something as subject',
        examples: [
          { arabic: 'جَاءَ الْوَلَدَانِ', english: 'The two boys came' },
          { arabic: 'الْكِتَابَانِ جَدِيدَانِ', english: 'The two books are new' },
          { arabic: 'الطَّالِبَتَانِ مُجْتَهِدَتَانِ', english: 'The two (f) students are hardworking' },
        ],
      },
      {
        type: 'text',
        content: 'Plural Nominative',
      },
      {
        type: 'examples_grid',
        content: 'Plurals as subjects',
        examples: [
          { arabic: 'جَاءَ الْمُعَلِّمُونَ', english: 'The (male) teachers came' },
          { arabic: 'الْمُسْلِمُونَ يُصَلُّونَ', english: 'The Muslims pray' },
          { arabic: 'الطَّالِبَاتُ مُجْتَهِدَاتٌ', english: 'The (female) students are hardworking' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Nominative Endings Summary',
        leftLabel: 'Definite',
        rightLabel: 'Indefinite',
        comparisons: [
          { left: { arabic: 'الْكِتَابُ', label: 'the book' }, right: { arabic: 'كِتَابٌ', label: 'a book' } },
          { left: { arabic: 'الْوَلَدَانِ', label: 'the two boys' }, right: { arabic: 'وَلَدَانِ', label: 'two boys' } },
          { left: { arabic: 'الْمُعَلِّمُونَ', label: 'the teachers' }, right: { arabic: 'مُعَلِّمُونَ', label: 'teachers' } },
        ],
      },
      {
        type: 'note',
        content: 'The nominative is used for: [[subjects of verbal sentences]], [[subjects (مُبْتَدَأ) of nominal sentences]], [[predicates (خَبَر)]], and [[names of إِنَّ after its predicate]].',
        arabicDescription: 'الرَّفْع لِلْفَاعِل وَالْمُبْتَدَأ وَالْخَبَر',
        arabicTranslation: 'Nominative is for the subject and predicate',
      },
    ],
  },

  // LESSON 32: Case Endings - Accusative
  {
    id: 'grammar-32',
    title: 'Case Endings: Accusative',
    titleArabic: 'النَّصْب',
    description: 'Learn the accusative case for objects and adverbs',
    level: 'advanced',
    category: 'nouns',
    order: 32,
    exercises: ['ex-grammar-32-1', 'ex-grammar-32-2'],
    content: [
      {
        type: 'description',
        content: 'The [[accusative case]] (النَّصْب) marks [[direct objects]], words after certain particles, and various adverbial expressions. It\'s essential for expressing "what" or "whom" receives the action.',
        arabicDescription: 'النَّصْب هُوَ حَالَة الْمَفْعُول بِهِ وَالظَّرْف وَاسْم إِنَّ',
        arabicTranslation: 'Accusative is the case of the object, adverb, and subject of Inna',
      },
      {
        type: 'rule',
        content: 'Accusative endings: singular nouns add [[ـَ]] (fatha) or [[ـً]] (tanwin fatha, written ـًا). Dual nouns end in [[ـَيْنِ]]. Sound masculine plurals end in [[ـِينَ]]. Sound feminine plurals end in [[ـَاتٍ]].',
        arabicDescription: 'عَلَامَات النَّصْب: الْفَتْحَة، الْيَاء وَالنُّون، الْكَسْرَة',
        arabicTranslation: 'Signs of accusative: fatha, ya and nun, kasra',
      },
      {
        type: 'text',
        content: 'Direct Objects',
      },
      {
        type: 'examples_grid',
        content: 'What receives the action',
        examples: [
          { arabic: 'قَرَأْتُ الْكِتَابَ', english: 'I read the book' },
          { arabic: 'رَأَيْتُ وَلَدًا', english: 'I saw a boy' },
          { arabic: 'أَكَلْتُ تُفَّاحَةً', english: 'I ate an apple' },
          { arabic: 'زُرْتُ الْمَدِينَةَ', english: 'I visited the city' },
        ],
      },
      {
        type: 'text',
        content: 'After إِنَّ and its Sisters',
      },
      {
        type: 'examples_grid',
        content: 'Subject takes accusative after إِنَّ',
        examples: [
          { arabic: 'إِنَّ الْعِلْمَ نُورٌ', english: 'Indeed, knowledge is light' },
          { arabic: 'لَكِنَّ الْحَيَاةَ صَعْبَةٌ', english: 'But life is difficult' },
          { arabic: 'لَعَلَّ الْجَوَّ جَمِيلٌ', english: 'Perhaps the weather is nice' },
          { arabic: 'كَأَنَّ الْبَيْتَ قَصْرٌ', english: 'As if the house is a palace' },
        ],
      },
      {
        type: 'text',
        content: 'Time & Place Adverbs (ظَرْف)',
      },
      {
        type: 'examples_grid',
        content: 'Adverbial accusative',
        examples: [
          { arabic: 'سَافَرْتُ يَوْمًا', english: 'I traveled for a day' },
          { arabic: 'جَلَسْتُ أَمَامَ الْبَابِ', english: 'I sat in front of the door' },
          { arabic: 'دَرَسْتُ سَاعَةً', english: 'I studied for an hour' },
          { arabic: 'مَشَيْتُ كَثِيرًا', english: 'I walked a lot' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Accusative Endings Summary',
        leftLabel: 'Singular',
        rightLabel: 'Plural',
        comparisons: [
          { left: { arabic: 'الْكِتَابَ', label: 'the book (obj)' }, right: { arabic: 'الْكُتُبَ', label: 'the books (obj)' } },
          { left: { arabic: 'مُعَلِّمًا', label: 'a teacher (obj)' }, right: { arabic: 'مُعَلِّمِينَ', label: 'teachers (obj)' } },
        ],
      },
      {
        type: 'note',
        content: 'Remember: [[إِنَّ، أَنَّ، لَكِنَّ، كَأَنَّ، لَيْتَ، لَعَلَّ]] all put their subject in the accusative! These are called "إِنَّ and her sisters" (إِنَّ وَأَخَوَاتُهَا).',
        arabicDescription: 'إِنَّ وَأَخَوَاتُهَا تَنْصِب الْمُبْتَدَأ',
        arabicTranslation: 'Inna and its sisters put the subject in accusative',
      },
    ],
  },

  // LESSON 33: Case Endings - Genitive
  {
    id: 'grammar-33',
    title: 'Case Endings: Genitive',
    titleArabic: 'الْجَرّ',
    description: 'Understand the genitive case after prepositions',
    level: 'advanced',
    category: 'nouns',
    order: 33,
    exercises: ['ex-grammar-33-1', 'ex-grammar-33-2'],
    content: [
      {
        type: 'description',
        content: 'The [[genitive case]] (الْجَرّ) appears after [[prepositions]] and in [[possessive constructions]] (إضافة). It indicates relationships like location, direction, possession, and more.',
        arabicDescription: 'الْجَرّ يَأْتِي بَعْدَ حُرُوف الْجَرّ وَفِي الْإِضَافَة',
        arabicTranslation: 'Genitive comes after prepositions and in possessive constructions',
      },
      {
        type: 'rule',
        content: 'Genitive endings: singular nouns add [[ـِ]] (kasra) or [[ـٍ]] (tanwin kasra). Dual nouns end in [[ـَيْنِ]] (same as accusative). Sound masculine plurals end in [[ـِينَ]]. Sound feminine plurals end in [[ـَاتٍ]].',
        arabicDescription: 'عَلَامَات الْجَرّ: الْكَسْرَة، الْيَاء وَالنُّون',
        arabicTranslation: 'Signs of genitive: kasra, ya and nun',
      },
      {
        type: 'text',
        content: 'After Prepositions',
      },
      {
        type: 'examples_grid',
        content: 'Common prepositions with genitive',
        examples: [
          { arabic: 'فِي الْبَيْتِ', english: 'in the house' },
          { arabic: 'مِنَ الْمَدْرَسَةِ', english: 'from the school' },
          { arabic: 'إِلَى السُّوقِ', english: 'to the market' },
          { arabic: 'عَلَى الطَّاوِلَةِ', english: 'on the table' },
          { arabic: 'بِالْقَلَمِ', english: 'with the pen' },
          { arabic: 'لِلطَّالِبِ', english: 'for the student' },
        ],
      },
      {
        type: 'text',
        content: 'In Possessive (إِضَافَة)',
      },
      {
        type: 'examples_grid',
        content: 'Second noun is always genitive',
        examples: [
          { arabic: 'كِتَابُ الطَّالِبِ', english: 'the student\'s book' },
          { arabic: 'بَابُ الْمَدْرَسَةِ', english: 'the school\'s door' },
          { arabic: 'مُعَلِّمُ اللُّغَةِ', english: 'the language teacher' },
          { arabic: 'سَيَّارَةُ أَبِي', english: 'my father\'s car' },
        ],
      },
      {
        type: 'text',
        content: 'Common Prepositions',
      },
      {
        type: 'examples_grid',
        content: 'Essential prepositions',
        examples: [
          { arabic: 'فِي', english: 'in, at' },
          { arabic: 'مِنْ', english: 'from' },
          { arabic: 'إِلَى', english: 'to, toward' },
          { arabic: 'عَلَى', english: 'on, upon' },
          { arabic: 'عَنْ', english: 'about, from' },
          { arabic: 'بِـ', english: 'with, by' },
          { arabic: 'لِـ', english: 'for, to' },
          { arabic: 'كَـ', english: 'like, as' },
        ],
      },
      {
        type: 'comparison_grid',
        content: 'Three Cases Summary',
        leftLabel: 'Case',
        rightLabel: 'الْكِتَاب',
        comparisons: [
          { left: { arabic: 'الرَّفْع', label: 'Nominative' }, right: { arabic: 'الْكِتَابُ', label: 'the book (subj)' } },
          { left: { arabic: 'النَّصْب', label: 'Accusative' }, right: { arabic: 'الْكِتَابَ', label: 'the book (obj)' } },
          { left: { arabic: 'الْجَرّ', label: 'Genitive' }, right: { arabic: 'الْكِتَابِ', label: 'the book (after prep)' } },
        ],
      },
      {
        type: 'note',
        content: 'Diptotes (الْمَمْنُوع مِنَ الصَّرْف) like أَحْمَد، مَكَّة، صَحْرَاء take [[فَتْحَة]] instead of [[كَسْرَة]] in genitive when indefinite: فِي صَحْرَاءَ (in a desert).',
        arabicDescription: 'الْمَمْنُوع مِنَ الصَّرْف يُجَرّ بِالْفَتْحَة',
        arabicTranslation: 'Diptotes take fatha in genitive',
      },
    ],
  },

  // LESSON 34: The Passive Voice
  {
    id: 'grammar-34',
    title: 'The Passive Voice',
    titleArabic: 'الْمَبْنِيّ لِلْمَجْهُول',
    description: 'Express actions without naming the doer',
    level: 'advanced',
    category: 'verbs',
    order: 34,
    exercises: ['ex-grammar-34-1', 'ex-grammar-34-2'],
    content: [
      {
        type: 'description',
        content: 'The [[passive voice]] shifts focus from who did the action to what was done. "The book was written" emphasizes the book, not the writer. Arabic has a built-in passive pattern!',
        arabicDescription: 'الْمَبْنِيّ لِلْمَجْهُول يُرَكِّز عَلَى الْفِعْل لَا الْفَاعِل',
        arabicTranslation: 'The passive voice focuses on the action not the doer',
      },
      {
        type: 'rule',
        content: 'Past passive: change vowels to [[ُـِـ]] pattern. [[كَتَبَ]] (wrote) → [[كُتِبَ]] (was written). Present passive: change to [[ُـْـَـ]] pattern. [[يَكْتُبُ]] → [[يُكْتَبُ]] (is written).',
        arabicDescription: 'الْمَاضِي: ضَمَّة ثُمَّ كَسْرَة. الْمُضَارِع: ضَمَّة ثُمَّ فَتْحَة',
        arabicTranslation: 'Past: damma then kasra. Present: damma then fatha',
      },
      {
        type: 'text',
        content: 'Past Tense Passive',
      },
      {
        type: 'comparison_grid',
        content: 'Active to Passive',
        leftLabel: 'Active (مَعْلُوم)',
        rightLabel: 'Passive (مَجْهُول)',
        comparisons: [
          { left: { arabic: 'كَتَبَ', label: 'he wrote' }, right: { arabic: 'كُتِبَ', label: 'it was written' } },
          { left: { arabic: 'فَتَحَ', label: 'he opened' }, right: { arabic: 'فُتِحَ', label: 'it was opened' } },
          { left: { arabic: 'سَمِعَ', label: 'he heard' }, right: { arabic: 'سُمِعَ', label: 'it was heard' } },
          { left: { arabic: 'عَلِمَ', label: 'he knew' }, right: { arabic: 'عُلِمَ', label: 'it was known' } },
        ],
      },
      {
        type: 'text',
        content: 'Present Tense Passive',
      },
      {
        type: 'comparison_grid',
        content: 'Active to Passive',
        leftLabel: 'Active',
        rightLabel: 'Passive',
        comparisons: [
          { left: { arabic: 'يَكْتُبُ', label: 'he writes' }, right: { arabic: 'يُكْتَبُ', label: 'it is written' } },
          { left: { arabic: 'يَفْتَحُ', label: 'he opens' }, right: { arabic: 'يُفْتَحُ', label: 'it is opened' } },
          { left: { arabic: 'يَسْمَعُ', label: 'he hears' }, right: { arabic: 'يُسْمَعُ', label: 'it is heard' } },
        ],
      },
      {
        type: 'text',
        content: 'Full Sentences',
      },
      {
        type: 'examples_grid',
        content: 'Passive in context',
        examples: [
          { arabic: 'كُتِبَ الْكِتَابُ', english: 'The book was written' },
          { arabic: 'فُتِحَ الْبَابُ', english: 'The door was opened' },
          { arabic: 'يُدَرَّسُ الدَّرْسُ', english: 'The lesson is being taught' },
          { arabic: 'أُكِلَ الطَّعَامُ', english: 'The food was eaten' },
          { arabic: 'بُنِيَ الْمَسْجِدُ', english: 'The mosque was built' },
          { arabic: 'قِيلَ إِنَّ...', english: 'It was said that...' },
        ],
      },
      {
        type: 'note',
        content: 'The original object becomes the [[نَائِب الْفَاعِل]] (deputy subject) and takes [[nominative case]]: كَتَبَ الرَّجُلُ [[الْكِتَابَ]] → كُتِبَ [[الْكِتَابُ]]',
        arabicDescription: 'الْمَفْعُول بِهِ يُصْبِح نَائِب فَاعِل مَرْفُوع',
        arabicTranslation: 'The object becomes deputy subject in nominative',
      },
    ],
  },

  // LESSON 35: Verb Forms II-IV
  {
    id: 'grammar-35',
    title: 'Verb Forms II, III, IV',
    titleArabic: 'الْأَوْزَان II-III-IV',
    description: 'Intensify, interact, and cause with verb forms',
    level: 'advanced',
    category: 'verbs',
    order: 35,
    exercises: ['ex-grammar-35-1', 'ex-grammar-35-2'],
    content: [
      {
        type: 'description',
        content: 'These three forms transform basic verbs into more complex meanings. [[Form II]] intensifies or makes causative, [[Form III]] indicates interaction with someone, and [[Form IV]] is causative.',
        arabicDescription: 'الْوَزْن الثَّانِي لِلتَّكْثِير، الثَّالِث لِلْمُشَارَكَة، الرَّابِع لِلتَّعْدِيَة',
        arabicTranslation: 'Form II for intensifying, Form III for reciprocal, Form IV for causative',
      },
      {
        type: 'text',
        content: 'Form II: فَعَّلَ (Double Middle)',
      },
      {
        type: 'rule',
        content: 'Form II doubles the middle letter: [[فَعَّلَ]]. It often means: 1) [[Intensive]] - doing something a lot, 2) [[Causative]] - making someone do something, 3) [[Denominative]] - making a verb from a noun.',
        arabicDescription: 'فَعَّلَ: تَشْدِيد الْعَيْن لِلتَّكْثِير وَالتَّعْدِيَة',
        arabicTranslation: 'Fa33ala: doubling the middle letter for intensifying and causative',
      },
      {
        type: 'examples_grid',
        content: 'Form II Examples',
        examples: [
          { arabic: 'عَلِمَ ← عَلَّمَ', english: 'knew → taught (made know)' },
          { arabic: 'كَسَرَ ← كَسَّرَ', english: 'broke → smashed (broke into pieces)' },
          { arabic: 'فَرِحَ ← فَرَّحَ', english: 'was happy → made happy' },
          { arabic: 'نَظُفَ ← نَظَّفَ', english: 'was clean → cleaned' },
          { arabic: 'صَوَّرَ', english: 'photographed (from صُورَة)' },
        ],
      },
      {
        type: 'text',
        content: 'Form III: فَاعَلَ (Add Alif)',
      },
      {
        type: 'rule',
        content: 'Form III adds alif after first letter: [[فَاعَلَ]]. It usually means [[doing something with/to someone]] - reciprocal or attempted action toward another person.',
        arabicDescription: 'فَاعَلَ: إِضَافَة أَلِف لِلْمُشَارَكَة',
        arabicTranslation: 'Faa3ala: adding alif for reciprocal action',
      },
      {
        type: 'examples_grid',
        content: 'Form III Examples',
        examples: [
          { arabic: 'كَتَبَ ← كَاتَبَ', english: 'wrote → corresponded with' },
          { arabic: 'قَتَلَ ← قَاتَلَ', english: 'killed → fought with' },
          { arabic: 'سَافَرَ', english: 'traveled (went far)' },
          { arabic: 'سَاعَدَ', english: 'helped' },
          { arabic: 'حَاوَلَ', english: 'tried, attempted' },
        ],
      },
      {
        type: 'text',
        content: 'Form IV: أَفْعَلَ (Add Hamza)',
      },
      {
        type: 'rule',
        content: 'Form IV adds hamza at the start: [[أَفْعَلَ]]. It\'s primarily [[causative]] - making someone/something do the action of Form I.',
        arabicDescription: 'أَفْعَلَ: إِضَافَة هَمْزَة لِلتَّعْدِيَة',
        arabicTranslation: 'Af3ala: adding hamza for causative',
      },
      {
        type: 'examples_grid',
        content: 'Form IV Examples',
        examples: [
          { arabic: 'خَرَجَ ← أَخْرَجَ', english: 'went out → took out' },
          { arabic: 'جَلَسَ ← أَجْلَسَ', english: 'sat → seated (made sit)' },
          { arabic: 'سْلَمَ ← أَسْلَمَ', english: 'was safe → submitted (to Islam)' },
          { arabic: 'أَرْسَلَ', english: 'sent' },
          { arabic: 'أَعْطَى', english: 'gave' },
        ],
      },
      {
        type: 'note',
        content: 'Form II and IV are both causative but differ: Form II often implies repetition or intensity, while Form IV is simpler causation. عَلَّمَ (II) = taught repeatedly; أَعْلَمَ (IV) = informed.',
        arabicDescription: 'فَعَّلَ لِلتَّكْثِير، أَفْعَلَ لِلتَّعْدِيَة الْبَسِيطَة',
        arabicTranslation: 'Fa33ala for intensifying, Af3ala for simple causative',
      },
    ],
  },

  // LESSON 36: Verb Forms V-VII
  {
    id: 'grammar-36',
    title: 'Verb Forms V, VI, VII',
    titleArabic: 'الْأَوْزَان V-VI-VII',
    description: 'Reflexive, reciprocal, and passive-like forms',
    level: 'advanced',
    category: 'verbs',
    order: 36,
    exercises: ['ex-grammar-36-1', 'ex-grammar-36-2'],
    content: [
      {
        type: 'description',
        content: 'These forms add [[تَـ]] or [[اِنْـ]] prefixes. [[Form V]] is reflexive of II, [[Form VI]] is reciprocal, and [[Form VII]] has a passive-like meaning. The action "happens to" the subject.',
        arabicDescription: 'تَفَعَّلَ وَتَفَاعَلَ وَاِنْفَعَلَ: الْفِعْل يَقَع عَلَى الْفَاعِل',
        arabicTranslation: 'Tafa33ala, Tafaa3ala, Infa3ala: the action falls on the subject',
      },
      {
        type: 'text',
        content: 'Form V: تَفَعَّلَ (Reflexive of II)',
      },
      {
        type: 'rule',
        content: 'Form V = تَـ + Form II: [[تَفَعَّلَ]]. It\'s the [[reflexive]] of Form II - you do the action to yourself. If عَلَّمَ means "taught," then تَعَلَّمَ means "learned (taught oneself)."',
        arabicDescription: 'تَفَعَّلَ: مُطَاوِع فَعَّلَ، الْفِعْل يَرْجِع إِلَى الْفَاعِل',
        arabicTranslation: 'Tafa33ala: reflexive of Fa33ala, the action returns to the subject',
      },
      {
        type: 'examples_grid',
        content: 'Form V Examples',
        examples: [
          { arabic: 'عَلَّمَ ← تَعَلَّمَ', english: 'taught → learned' },
          { arabic: 'كَلَّمَ ← تَكَلَّمَ', english: 'spoke to → spoke, talked' },
          { arabic: 'ذَكَّرَ ← تَذَكَّرَ', english: 'reminded → remembered' },
          { arabic: 'تَوَقَّعَ', english: 'expected' },
          { arabic: 'تَصَرَّفَ', english: 'behaved, acted' },
        ],
      },
      {
        type: 'text',
        content: 'Form VI: تَفَاعَلَ (Reciprocal)',
      },
      {
        type: 'rule',
        content: 'Form VI = تَـ + Form III: [[تَفَاعَلَ]]. It means [[doing something with each other]] or [[pretending]] to do something.',
        arabicDescription: 'تَفَاعَلَ: لِلْمُشَارَكَة الْمُتَبَادَلَة أَوْ التَّظَاهُر',
        arabicTranslation: 'Tafaa3ala: for mutual action or pretending',
      },
      {
        type: 'examples_grid',
        content: 'Form VI Examples',
        examples: [
          { arabic: 'قَاتَلَ ← تَقَاتَلَ', english: 'fought → fought each other' },
          { arabic: 'كَاتَبَ ← تَكَاتَبَ', english: 'wrote to → wrote to each other' },
          { arabic: 'تَعَاوَنَ', english: 'cooperated' },
          { arabic: 'تَبَادَلَ', english: 'exchanged' },
          { arabic: 'تَظَاهَرَ', english: 'pretended' },
        ],
      },
      {
        type: 'text',
        content: 'Form VII: اِنْفَعَلَ (Passive-like)',
      },
      {
        type: 'rule',
        content: 'Form VII adds اِنْـ: [[اِنْفَعَلَ]]. It has a [[passive or resultative]] meaning - the action happens to the subject. Often used for physical changes.',
        arabicDescription: 'اِنْفَعَلَ: لِلْمُطَاوَعَة، الْفِعْل يَحْدُث لِلْفَاعِل',
        arabicTranslation: 'Infa3ala: for passive-like meaning, the action happens to the subject',
      },
      {
        type: 'examples_grid',
        content: 'Form VII Examples',
        examples: [
          { arabic: 'كَسَرَ ← اِنْكَسَرَ', english: 'broke → got broken' },
          { arabic: 'فَتَحَ ← اِنْفَتَحَ', english: 'opened → got opened' },
          { arabic: 'قَطَعَ ← اِنْقَطَعَ', english: 'cut → got cut off' },
          { arabic: 'اِنْطَلَقَ', english: 'set off, departed' },
          { arabic: 'اِنْتَشَرَ', english: 'spread' },
        ],
      },
      {
        type: 'note',
        content: 'Form VII cannot take a direct object! كَسَرْتُ الزُّجَاجَ (I broke the glass) but اِنْكَسَرَ الزُّجَاجُ (The glass broke). The subject "receives" the action.',
        arabicDescription: 'اِنْفَعَلَ لَا يَتَعَدَّى إِلَى مَفْعُول بِهِ',
        arabicTranslation: 'Infa3ala does not take a direct object',
      },
    ],
  },

  // LESSON 37: Verb Forms VIII-X
  {
    id: 'grammar-37',
    title: 'Verb Forms VIII, IX, X',
    titleArabic: 'الْأَوْزَان VIII-IX-X',
    description: 'Reflexive, colors, and seeking with advanced forms',
    level: 'advanced',
    category: 'verbs',
    order: 37,
    exercises: ['ex-grammar-37-1', 'ex-grammar-37-2'],
    content: [
      {
        type: 'description',
        content: '[[Form VIII]] is reflexive with infixed ت, [[Form IX]] is rare and used for colors/defects, and [[Form X]] means "to seek, consider, or ask for" something.',
        arabicDescription: 'اِفْتَعَلَ لِلاِكْتِسَاب، اِفْعَلَّ لِلْأَلْوَان، اِسْتَفْعَلَ لِلطَّلَب',
        arabicTranslation: 'Ifta3ala for acquiring, If3alla for colors, Istaf3ala for seeking',
      },
      {
        type: 'text',
        content: 'Form VIII: اِفْتَعَلَ (Reflexive)',
      },
      {
        type: 'rule',
        content: 'Form VIII infixes ت after first radical: [[اِفْتَعَلَ]]. It often means [[doing something for oneself]], [[acquiring]], or has [[reflexive/middle]] sense.',
        arabicDescription: 'اِفْتَعَلَ: إِضَافَة تَاء بَعْد الْفَاء لِلاِكْتِسَاب',
        arabicTranslation: 'Ifta3ala: adding ta after the first letter for acquiring',
      },
      {
        type: 'examples_grid',
        content: 'Form VIII Examples',
        examples: [
          { arabic: 'جَمَعَ ← اِجْتَمَعَ', english: 'gathered → met, assembled' },
          { arabic: 'قَرَبَ ← اِقْتَرَبَ', english: 'was near → approached' },
          { arabic: 'اِخْتَارَ', english: 'chose (for oneself)' },
          { arabic: 'اِشْتَرَى', english: 'bought' },
          { arabic: 'اِكْتَشَفَ', english: 'discovered' },
          { arabic: 'اِحْتَرَمَ', english: 'respected' },
        ],
      },
      {
        type: 'text',
        content: 'Form IX: اِفْعَلَّ (Colors & Defects)',
      },
      {
        type: 'rule',
        content: 'Form IX doubles the final letter: [[اِفْعَلَّ]]. It\'s rare and only used for [[colors]] and [[physical defects]]. Very predictable!',
        arabicDescription: 'اِفْعَلَّ: تَشْدِيد اللَّام لِلْأَلْوَان وَالْعُيُوب',
        arabicTranslation: 'If3alla: doubling the last letter for colors and defects',
      },
      {
        type: 'examples_grid',
        content: 'Form IX Examples',
        examples: [
          { arabic: 'اِحْمَرَّ', english: 'became red, blushed' },
          { arabic: 'اِصْفَرَّ', english: 'became yellow' },
          { arabic: 'اِسْوَدَّ', english: 'became black' },
          { arabic: 'اِبْيَضَّ', english: 'became white' },
          { arabic: 'اِعْوَرَّ', english: 'became one-eyed' },
        ],
      },
      {
        type: 'text',
        content: 'Form X: اِسْتَفْعَلَ (Seeking)',
      },
      {
        type: 'rule',
        content: 'Form X adds اِسْتَـ: [[اِسْتَفْعَلَ]]. It primarily means [[seeking]], [[asking for]], or [[considering something to be]]. Very productive form!',
        arabicDescription: 'اِسْتَفْعَلَ: إِضَافَة سِين وَتَاء لِلطَّلَب وَالاِعْتِبَار',
        arabicTranslation: 'Istaf3ala: adding sin and ta for seeking and considering',
      },
      {
        type: 'examples_grid',
        content: 'Form X Examples',
        examples: [
          { arabic: 'غَفَرَ ← اِسْتَغْفَرَ', english: 'forgave → sought forgiveness' },
          { arabic: 'عَمَلَ ← اِسْتَعْمَلَ', english: 'worked → used, employed' },
          { arabic: 'خْرَجَ ← اِسْتَخْرَجَ', english: 'went out → extracted' },
          { arabic: 'اِسْتَطَاعَ', english: 'was able, could' },
          { arabic: 'اِسْتَمَعَ', english: 'listened (sought to hear)' },
          { arabic: 'اِسْتَحْسَنَ', english: 'approved, found good' },
        ],
      },
      {
        type: 'note',
        content: 'Form X has three main meanings: 1) [[To seek]]: اِسْتَغْفَرَ (seek forgiveness), 2) [[To consider as]]: اِسْتَحْسَنَ (consider good), 3) [[To ask for]]: اِسْتَأْذَنَ (ask permission).',
        arabicDescription: 'اِسْتَفْعَلَ: لِلطَّلَب، الاِعْتِبَار، وَالسُّؤَال',
        arabicTranslation: 'Istaf3ala: for seeking, considering, and asking',
      },
    ],
  },

  // LESSON 38: Adverbs & Adverbial Expressions
  {
    id: 'grammar-38',
    title: 'Adverbs & Adverbial Expressions',
    titleArabic: 'الظُّرُوف وَالْأَحْوَال',
    description: 'Modify verbs with time, place, and manner',
    level: 'advanced',
    category: 'sentences',
    order: 38,
    exercises: ['ex-grammar-38-1', 'ex-grammar-38-2'],
    content: [
      {
        type: 'description',
        content: 'Arabic modifies verbs using [[adverbs of time]] (ظَرْف الزَّمَان), [[adverbs of place]] (ظَرْف الْمَكَان), and [[حَال]] (the state/manner of the subject). These add rich detail to sentences.',
        arabicDescription: 'الظُّرُوف تُضِيف مَعْلُومَات عَنِ الزَّمَان وَالْمَكَان وَالْحَال',
        arabicTranslation: 'Adverbs add information about time, place, and state',
      },
      {
        type: 'text',
        content: 'Time Adverbs (ظَرْف الزَّمَان)',
      },
      {
        type: 'examples_grid',
        content: 'When things happen',
        examples: [
          { arabic: 'الْيَوْمَ', english: 'today' },
          { arabic: 'غَدًا', english: 'tomorrow' },
          { arabic: 'أَمْسِ', english: 'yesterday' },
          { arabic: 'الْآنَ', english: 'now' },
          { arabic: 'دَائِمًا', english: 'always' },
          { arabic: 'أَبَدًا', english: 'never, ever' },
          { arabic: 'أَحْيَانًا', english: 'sometimes' },
          { arabic: 'قَرِيبًا', english: 'soon' },
        ],
      },
      {
        type: 'text',
        content: 'Place Adverbs (ظَرْف الْمَكَان)',
      },
      {
        type: 'examples_grid',
        content: 'Where things happen',
        examples: [
          { arabic: 'هُنَا', english: 'here' },
          { arabic: 'هُنَاكَ', english: 'there' },
          { arabic: 'فَوْقَ', english: 'above' },
          { arabic: 'تَحْتَ', english: 'below, under' },
          { arabic: 'أَمَامَ', english: 'in front of' },
          { arabic: 'خَلْفَ', english: 'behind' },
          { arabic: 'بَيْنَ', english: 'between' },
          { arabic: 'حَوْلَ', english: 'around' },
        ],
      },
      {
        type: 'text',
        content: 'Manner Adverbs (using الْحَال)',
      },
      {
        type: 'rule',
        content: 'The [[حَال]] describes [[how]] the subject does the action. It\'s an [[indefinite accusative]] adjective: جَاءَ [[مُبْتَسِمًا]] (He came [[smiling]]). The حَال agrees with what it describes.',
        arabicDescription: 'الْحَال وَصْف لِلْفَاعِل فِي حَالَة الْفِعْل، مَنْصُوب وَنَكِرَة',
        arabicTranslation: 'Hal describes the subject during the action, accusative and indefinite',
      },
      {
        type: 'examples_grid',
        content: 'حَال Examples',
        examples: [
          { arabic: 'جَاءَ مُسْرِعًا', english: 'He came quickly' },
          { arabic: 'رَجَعَتْ سَعِيدَةً', english: 'She returned happy' },
          { arabic: 'قَرَأْتُ الْكِتَابَ جَالِسًا', english: 'I read the book sitting' },
          { arabic: 'دَخَلُوا صَامِتِينَ', english: 'They entered silently' },
        ],
      },
      {
        type: 'text',
        content: 'Common Manner Expressions',
      },
      {
        type: 'examples_grid',
        content: 'Useful adverbial phrases',
        examples: [
          { arabic: 'بِسُرْعَة', english: 'quickly' },
          { arabic: 'بِبُطْء', english: 'slowly' },
          { arabic: 'جِدًّا', english: 'very' },
          { arabic: 'فَقَط', english: 'only' },
          { arabic: 'أَيْضًا', english: 'also' },
          { arabic: 'تَقْرِيبًا', english: 'approximately' },
        ],
      },
      {
        type: 'note',
        content: 'Time and place adverbs take the [[accusative case]] because they answer "when?" and "where?" implicitly: سَافَرْتُ [[يَوْمًا]] (I traveled [[for a day]]). They function as hidden objects.',
        arabicDescription: 'ظَرْف الزَّمَان وَالْمَكَان مَنْصُوبَان دَائِمًا',
        arabicTranslation: 'Time and place adverbs are always accusative',
      },
    ],
  },

  // LESSON 39: Exception (الاِسْتِثْنَاء)
  {
    id: 'grammar-39',
    title: 'Exception',
    titleArabic: 'الاِسْتِثْنَاء',
    description: 'Express "except," "but," and "only" in Arabic',
    level: 'advanced',
    category: 'sentences',
    order: 39,
    exercises: ['ex-grammar-39-1', 'ex-grammar-39-2'],
    content: [
      {
        type: 'description',
        content: 'Exception (الاِسْتِثْنَاء) excludes something from a general statement: "Everyone came [[except]] Ali." Arabic uses words like [[إِلَّا]], [[غَيْر]], [[سِوَى]] for this.',
        arabicDescription: 'الاِسْتِثْنَاء يُخْرِج شَيْئًا مِنَ الْحُكْم الْعَامّ',
        arabicTranslation: 'Exception excludes something from the general rule',
      },
      {
        type: 'rule',
        content: '[[إِلَّا]] is the main exception particle. In a complete affirmative sentence, the excepted noun (الْمُسْتَثْنَى) takes the [[accusative]]: حَضَرَ الطُّلَّابُ [[إِلَّا]] عَلِيًّا.',
        arabicDescription: 'الْمُسْتَثْنَى بِإِلَّا مَنْصُوب فِي الْجُمْلَة التَّامَّة الْمُوجَبَة',
        arabicTranslation: 'The excepted noun with illa is accusative in complete affirmative sentences',
      },
      {
        type: 'text',
        content: 'Complete Affirmative (تَامّ مُوجَب)',
      },
      {
        type: 'examples_grid',
        content: 'Accusative after إِلَّا',
        examples: [
          { arabic: 'جَاءَ الطُّلَّابُ إِلَّا مُحَمَّدًا', english: 'The students came except Muhammad' },
          { arabic: 'قَرَأْتُ الْكُتُبَ إِلَّا كِتَابًا', english: 'I read the books except one book' },
          { arabic: 'أَكَلْتُ كُلَّ شَيْءٍ إِلَّا اللَّحْمَ', english: 'I ate everything except the meat' },
        ],
      },
      {
        type: 'text',
        content: 'Negative Sentence (تَامّ مَنْفِيّ)',
      },
      {
        type: 'rule',
        content: 'In negative sentences, the excepted noun can follow the case of what it refers to ([[بَدَل]]) OR be accusative: مَا جَاءَ أَحَدٌ إِلَّا عَلِيٌّ/عَلِيًّا.',
        arabicDescription: 'فِي الْمَنْفِيّ: يَجُوز الْبَدَل أَوْ النَّصْب',
        arabicTranslation: 'In negative sentences: substitution or accusative is allowed',
      },
      {
        type: 'examples_grid',
        content: 'Exception in negative',
        examples: [
          { arabic: 'مَا حَضَرَ أَحَدٌ إِلَّا زَيْدٌ', english: 'No one came except Zaid (nominative)' },
          { arabic: 'لَمْ أَرَ أَحَدًا إِلَّا أَخَاكَ', english: 'I didn\'t see anyone except your brother' },
        ],
      },
      {
        type: 'text',
        content: 'Using غَيْر and سِوَى',
      },
      {
        type: 'examples_grid',
        content: 'Alternative exception words',
        examples: [
          { arabic: 'جَاءَ الطُّلَّابُ غَيْرَ مُحَمَّدٍ', english: 'The students came except Muhammad' },
          { arabic: 'لَيْسَ لِي صَدِيقٌ سِوَاكَ', english: 'I have no friend but you' },
          { arabic: 'لَا أُحِبُّ غَيْرَكَ', english: 'I love no one but you' },
        ],
      },
      {
        type: 'text',
        content: 'Common Expressions',
      },
      {
        type: 'examples_grid',
        content: 'Useful exception phrases',
        examples: [
          { arabic: 'لَا إِلَهَ إِلَّا اللَّه', english: 'There is no god but God' },
          { arabic: 'لَيْسَ إِلَّا', english: 'nothing but, only' },
          { arabic: 'مَا هُوَ إِلَّا...', english: 'It is nothing but...' },
          { arabic: 'فَقَط/فَحَسْب', english: 'only (also used)' },
        ],
      },
      {
        type: 'note',
        content: '[[غَيْر]] acts like a noun and takes the case required by its position. The word after غَيْر is always [[genitive]]: غَيْرِ مُحَمَّدٍ.',
        arabicDescription: 'غَيْر تُعْرَب حَسَب مَوْقِعِهَا، وَمَا بَعْدَهَا مَجْرُور',
        arabicTranslation: 'Ghayr takes case based on its position, and what follows is genitive',
      },
    ],
  },

  // LESSON 40: Complex Sentences & Emphasis
  {
    id: 'grammar-40',
    title: 'Complex Sentences & Emphasis',
    titleArabic: 'الْجُمَل الْمُرَكَّبَة وَالتَّوْكِيد',
    description: 'Build sophisticated sentences with emphasis particles',
    level: 'advanced',
    category: 'sentences',
    order: 40,
    exercises: ['ex-grammar-40-1', 'ex-grammar-40-2'],
    content: [
      {
        type: 'description',
        content: 'Master Arabic rhetoric with [[emphasis particles]], [[oath formulas]], and complex sentence structures. These tools make your Arabic more expressive, persuasive, and elegant.',
        arabicDescription: 'أَدَوَات التَّوْكِيد وَالْقَسَم تُعَزِّز الْمَعْنَى وَتُضِيف قُوَّة',
        arabicTranslation: 'Emphasis and oath tools strengthen meaning and add power',
      },
      {
        type: 'text',
        content: 'Emphasis with إِنَّ and لَـ',
      },
      {
        type: 'rule',
        content: '[[إِنَّ]] emphasizes a statement: "Indeed, verily." Adding [[لَـ]] to the predicate doubles the emphasis: إِنَّ الْعِلْمَ [[لَـ]]نُورٌ (Indeed, knowledge IS light!).',
        arabicDescription: 'إِنَّ لِلتَّوْكِيد، وَلَام الاِبْتِدَاء تَزِيد التَّوْكِيد',
        arabicTranslation: 'Inna for emphasis, and lam al-ibtida increases emphasis',
      },
      {
        type: 'examples_grid',
        content: 'إِنَّ with emphasis',
        examples: [
          { arabic: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ', english: 'Indeed, God is Forgiving, Merciful' },
          { arabic: 'إِنَّ الصَّبْرَ لَجَمِيلٌ', english: 'Indeed, patience IS beautiful' },
          { arabic: 'إِنَّكَ لَعَلَى خُلُقٍ عَظِيم', english: 'Indeed, you ARE of great character' },
        ],
      },
      {
        type: 'text',
        content: 'Emphasis with قَدْ',
      },
      {
        type: 'rule',
        content: '[[قَدْ]] + past verb = "certainly, indeed" (emphasis). [[قَدْ]] + present verb = "may, might" (possibility). Context determines meaning.',
        arabicDescription: 'قَدْ مَعَ الْمَاضِي لِلتَّحْقِيق، وَمَعَ الْمُضَارِع لِلاِحْتِمَال',
        arabicTranslation: 'Qad with past for certainty, with present for possibility',
      },
      {
        type: 'examples_grid',
        content: 'قَدْ usage',
        examples: [
          { arabic: 'قَدْ نَجَحَ', english: 'He has certainly succeeded' },
          { arabic: 'قَدْ فَهِمْتُ', english: 'I have (indeed) understood' },
          { arabic: 'قَدْ يَأْتِي', english: 'He may come' },
          { arabic: 'قَدْ أُسَافِرُ', english: 'I might travel' },
        ],
      },
      {
        type: 'text',
        content: 'Oaths (الْقَسَم)',
      },
      {
        type: 'examples_grid',
        content: 'Swearing formulas',
        examples: [
          { arabic: 'وَاللَّهِ', english: 'By God (I swear)' },
          { arabic: 'بِاللَّهِ', english: 'By God' },
          { arabic: 'تَاللَّهِ', english: 'By God (emphatic)' },
          { arabic: 'وَاللَّهِ لَأَفْعَلَنَّ', english: 'By God, I will certainly do it!' },
        ],
      },
      {
        type: 'text',
        content: 'Intensified Verbs (نُون التَّوْكِيد)',
      },
      {
        type: 'rule',
        content: 'Add [[ـَنَّ]] or [[ـَنْ]] to present verbs for strong emphasis, especially after oaths: لَأَذْهَبَ[[نَّ]] (I will DEFINITELY go!). The verb loses its final vowel.',
        arabicDescription: 'نُون التَّوْكِيد الثَّقِيلَة وَالْخَفِيفَة تُؤَكِّد الْفِعْل',
        arabicTranslation: 'Heavy and light emphatic nun emphasize the verb',
      },
      {
        type: 'examples_grid',
        content: 'Emphatic nun',
        examples: [
          { arabic: 'لَأَكْتُبَنَّ', english: 'I will definitely write!' },
          { arabic: 'لَتَعْرِفَنَّ الْحَقِيقَةَ', english: 'You will surely know the truth!' },
          { arabic: 'لَيُعَذِّبَنَّهُم', english: 'He will certainly punish them!' },
        ],
      },
      {
        type: 'text',
        content: 'Other Emphasis Tools',
      },
      {
        type: 'examples_grid',
        content: 'Additional emphatic particles',
        examples: [
          { arabic: 'نَفْس / عَيْن', english: 'self, very (الرَّجُلُ نَفْسُهُ - the man himself)' },
          { arabic: 'كُلّ / جَمِيع', english: 'all, every (كُلُّهُم - all of them)' },
          { arabic: 'لَا... إِلَّا', english: 'only, nothing but (restriction)' },
          { arabic: 'إِنَّمَا', english: 'only, nothing but (restriction)' },
        ],
      },
      {
        type: 'note',
        content: 'Combining tools creates powerful rhetoric: [[وَاللَّهِ إِنَّ الصَّبْرَ لَمِفْتَاحُ الْفَرَج]] (By God, indeed patience IS the key to relief!). Arabic loves layered emphasis!',
        arabicDescription: 'الْجَمْع بَيْن أَدَوَات التَّوْكِيد يُقَوِّي الْمَعْنَى',
        arabicTranslation: 'Combining emphasis tools strengthens the meaning',
      },
    ],
  },
];

// Helper functions
export const getLessonById = (id: string): GrammarLesson | undefined => {
  return grammarLessons.find(lesson => lesson.id === id) || verbLessons.find(lesson => lesson.id === id);
};

export const getLessonsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): GrammarLesson[] => {
  return grammarLessons.filter(lesson => lesson.level === level).sort((a, b) => a.order - b.order);
};

export const getLessonsByCategory = (category: GrammarLesson['category']): GrammarLesson[] => {
  return grammarLessons.filter(lesson => lesson.category === category).sort((a, b) => a.order - b.order);
};

// Re-export verbLessons for easy access
export { verbLessons };
