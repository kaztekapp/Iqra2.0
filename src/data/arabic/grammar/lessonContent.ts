/**
 * Legacy lesson content for backwards compatibility
 * Used for old lesson IDs like 'definite-article', 'gender', etc.
 * New lessons use the grammarLessons data structure instead.
 */

export interface LessonSection {
  title: string;
  titleFr?: string;
  content: string;
  contentFr?: string;
  examples?: { arabic: string; transliteration: string; english: string; french?: string }[];
}

export interface LegacyLesson {
  title: string;
  titleFr?: string;
  titleArabic: string;
  sections: LessonSection[];
}

export const lessonContent: Record<string, LegacyLesson> = {
  'definite-article': {
    title: 'The Definite Article',
    titleFr: 'L\'article defini',
    titleArabic: 'أَلْ التَّعْرِيف',
    sections: [
      {
        title: 'What is the Definite Article?',
        titleFr: 'Qu\'est-ce que l\'article defini ?',
        content: 'In Arabic, the definite article "the" is expressed by adding أَلْ (al-) to the beginning of a noun. This is equivalent to "the" in English. Arabic has NO word for "a/an" - just leave it off!',
        contentFr: 'En arabe, l\'article defini "le/la/les" s\'exprime en ajoutant أَلْ (al-) au debut d\'un nom. C\'est l\'equivalent de "le/la/les" en francais. L\'arabe n\'a PAS de mot pour "un/une" - il suffit de ne rien mettre !',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book', french: 'un livre' },
          { arabic: 'الْكِتَاب', transliteration: 'al-kitāb', english: 'the book', french: 'le livre' },
          { arabic: 'بَيْت', transliteration: 'bayt', english: 'a house', french: 'une maison' },
          { arabic: 'الْبَيْت', transliteration: 'al-bayt', english: 'the house', french: 'la maison' },
          { arabic: 'قَلَم', transliteration: 'qalam', english: 'a pen', french: 'un stylo' },
          { arabic: 'الْقَلَم', transliteration: 'al-qalam', english: 'the pen', french: 'le stylo' },
          { arabic: 'بَاب', transliteration: 'bāb', english: 'a door', french: 'une porte' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door', french: 'la porte' },
        ],
      },
      {
        title: 'Sun Letters (الْحُرُوفُ الشَّمْسِيَّة)',
        titleFr: 'Les lettres solaires (الْحُرُوفُ الشَّمْسِيَّة)',
        content: 'When أَلْ comes before certain letters called "sun letters", the ل sound assimilates to that letter and doubles it. Sun letters are: ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ن، ل',
        contentFr: 'Quand أَلْ precede certaines lettres appelees "lettres solaires", le son ل s\'assimile a cette lettre et la double. Les lettres solaires sont : ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ن، ل',
        examples: [
          { arabic: 'الشَّمْس', transliteration: 'ash-shams', english: 'the sun', french: 'le soleil' },
          { arabic: 'النُّور', transliteration: 'an-nūr', english: 'the light', french: 'la lumiere' },
          { arabic: 'السَّلَام', transliteration: 'as-salām', english: 'the peace', french: 'la paix' },
          { arabic: 'الرَّجُل', transliteration: 'ar-rajul', english: 'the man', french: 'l\'homme' },
          { arabic: 'الدَّرْس', transliteration: 'ad-dars', english: 'the lesson', french: 'la lecon' },
          { arabic: 'التُّفَّاحَة', transliteration: 'at-tuffāḥa', english: 'the apple', french: 'la pomme' },
          { arabic: 'الطَّعَام', transliteration: 'aṭ-ṭaʿām', english: 'the food', french: 'la nourriture' },
          { arabic: 'الزَّهْرَة', transliteration: 'az-zahra', english: 'the flower', french: 'la fleur' },
        ],
      },
      {
        title: 'Moon Letters (الْحُرُوفُ الْقَمَرِيَّة)',
        titleFr: 'Les lettres lunaires (الْحُرُوفُ الْقَمَرِيَّة)',
        content: 'With "moon letters", the ل is pronounced normally. Moon letters are: أ، ب، ج، ح، خ، ع، غ، ف، ق، ك، م، ه، و، ي',
        contentFr: 'Avec les "lettres lunaires", le ل se prononce normalement. Les lettres lunaires sont : أ، ب، ج، ح، خ، ع، غ، ف، ق، ك، م، ه، و، ي',
        examples: [
          { arabic: 'الْقَمَر', transliteration: 'al-qamar', english: 'the moon', french: 'la lune' },
          { arabic: 'الْبَاب', transliteration: 'al-bāb', english: 'the door', french: 'la porte' },
          { arabic: 'الْكَلْب', transliteration: 'al-kalb', english: 'the dog', french: 'le chien' },
          { arabic: 'الْمَاء', transliteration: 'al-māʾ', english: 'the water', french: 'l\'eau' },
          { arabic: 'الْوَلَد', transliteration: 'al-walad', english: 'the boy', french: 'le garcon' },
          { arabic: 'الْجَبَل', transliteration: 'al-jabal', english: 'the mountain', french: 'la montagne' },
          { arabic: 'الْحَدِيقَة', transliteration: 'al-ḥadīqa', english: 'the garden', french: 'le jardin' },
          { arabic: 'الْفِيل', transliteration: 'al-fīl', english: 'the elephant', french: 'l\'elephant' },
        ],
      },
    ],
  },
  'gender': {
    title: 'Gender in Arabic',
    titleFr: 'Le genre en arabe',
    titleArabic: 'الْمُذَكَّرُ وَالْمُؤَنَّث',
    sections: [
      {
        title: 'Two Genders',
        titleFr: 'Deux genres',
        content: 'Arabic has two grammatical genders: masculine (مُذَكَّر) and feminine (مُؤَنَّث). Unlike English, ALL nouns in Arabic have a gender. This affects adjectives, verbs, and pronouns.',
        contentFr: 'L\'arabe a deux genres grammaticaux : masculin (مُذَكَّر) et feminin (مُؤَنَّث). Contrairement au francais, TOUS les noms en arabe ont un genre. Cela affecte les adjectifs, les verbes et les pronoms.',
        examples: [
          { arabic: 'وَلَد', transliteration: 'walad', english: 'boy (masculine)', french: 'garcon (masculin)' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl (feminine)', french: 'fille (feminin)' },
          { arabic: 'رَجُل', transliteration: 'rajul', english: 'man (masculine)', french: 'homme (masculin)' },
          { arabic: 'اِمْرَأَة', transliteration: 'imraʾa', english: 'woman (feminine)', french: 'femme (feminin)' },
        ],
      },
      {
        title: 'The Taa Marbuta (ة)',
        titleFr: 'Le Ta Marbuta (ة)',
        content: 'Most feminine nouns end in ة (taa marbuta). This letter is pronounced as "a" at the end of sentences, or "at" when the word continues. To make many masculine words feminine, simply add ة.',
        contentFr: 'La plupart des noms feminins se terminent par ة (ta marbuta). Cette lettre se prononce "a" en fin de phrase, ou "at" quand le mot continue. Pour rendre beaucoup de mots masculins feminins, ajoutez simplement ة.',
        examples: [
          { arabic: 'مُدَرِّس', transliteration: 'mudarris', english: 'teacher (m)', french: 'enseignant (m)' },
          { arabic: 'مُدَرِّسَة', transliteration: 'mudarrisa', english: 'teacher (f)', french: 'enseignante (f)' },
          { arabic: 'طَالِب', transliteration: 'ṭālib', english: 'student (m)', french: 'etudiant (m)' },
          { arabic: 'طَالِبَة', transliteration: 'ṭāliba', english: 'student (f)', french: 'etudiante (f)' },
          { arabic: 'طَبِيب', transliteration: 'ṭabīb', english: 'doctor (m)', french: 'medecin (m)' },
          { arabic: 'طَبِيبَة', transliteration: 'ṭabība', english: 'doctor (f)', french: 'medecin (f)' },
          { arabic: 'كَاتِب', transliteration: 'kātib', english: 'writer (m)', french: 'ecrivain (m)' },
          { arabic: 'كَاتِبَة', transliteration: 'kātiba', english: 'writer (f)', french: 'ecrivaine (f)' },
          { arabic: 'صَدِيق', transliteration: 'ṣadīq', english: 'friend (m)', french: 'ami (m)' },
          { arabic: 'صَدِيقَة', transliteration: 'ṣadīqa', english: 'friend (f)', french: 'amie (f)' },
        ],
      },
      {
        title: 'Naturally Feminine Words',
        titleFr: 'Mots naturellement feminins',
        content: 'Some words referring to females are feminine even without ة. Body parts that come in pairs are also usually feminine.',
        contentFr: 'Certains mots designant des femmes sont feminins meme sans ة. Les parties du corps qui viennent par paires sont aussi generalement feminines.',
        examples: [
          { arabic: 'أُمّ', transliteration: 'umm', english: 'mother', french: 'mere' },
          { arabic: 'بِنْت', transliteration: 'bint', english: 'girl/daughter', french: 'fille' },
          { arabic: 'أُخْت', transliteration: 'ukht', english: 'sister', french: 'soeur' },
          { arabic: 'يَد', transliteration: 'yad', english: 'hand', french: 'main' },
          { arabic: 'عَيْن', transliteration: 'ʿayn', english: 'eye', french: 'oeil' },
          { arabic: 'أُذُن', transliteration: 'udhun', english: 'ear', french: 'oreille' },
          { arabic: 'رِجْل', transliteration: 'rijl', english: 'leg/foot', french: 'jambe/pied' },
          { arabic: 'شَمْس', transliteration: 'shams', english: 'sun', french: 'soleil' },
          { arabic: 'أَرْض', transliteration: 'arḍ', english: 'earth/land', french: 'terre' },
          { arabic: 'نَار', transliteration: 'nār', english: 'fire', french: 'feu' },
        ],
      },
    ],
  },
  'personal-pronouns': {
    title: 'Personal Pronouns',
    titleFr: 'Les pronoms personnels',
    titleArabic: 'الضَّمَائِر الشَّخْصِيَّة',
    sections: [
      {
        title: 'Subject Pronouns (Singular)',
        titleFr: 'Pronoms sujets (singulier)',
        content: 'Arabic pronouns distinguish between masculine/feminine. Here are the singular pronouns you\'ll use most often.',
        contentFr: 'Les pronoms arabes distinguent le masculin du feminin. Voici les pronoms singuliers que vous utiliserez le plus souvent.',
        examples: [
          { arabic: 'أَنَا', transliteration: 'anā', english: 'I', french: 'je' },
          { arabic: 'أَنْتَ', transliteration: 'anta', english: 'you (masculine singular)', french: 'tu/vous (masculin singulier)' },
          { arabic: 'أَنْتِ', transliteration: 'anti', english: 'you (feminine singular)', french: 'tu/vous (feminin singulier)' },
          { arabic: 'هُوَ', transliteration: 'huwa', english: 'he', french: 'il' },
          { arabic: 'هِيَ', transliteration: 'hiya', english: 'she', french: 'elle' },
        ],
      },
      {
        title: 'Subject Pronouns (Plural)',
        titleFr: 'Pronoms sujets (pluriel)',
        content: 'Plural pronouns in Arabic. Note that "we" is the same for both genders.',
        contentFr: 'Les pronoms pluriels en arabe. Notez que "nous" est le meme pour les deux genres.',
        examples: [
          { arabic: 'نَحْنُ', transliteration: 'naḥnu', english: 'we', french: 'nous' },
          { arabic: 'أَنْتُمْ', transliteration: 'antum', english: 'you (masculine plural)', french: 'vous (masculin pluriel)' },
          { arabic: 'أَنْتُنَّ', transliteration: 'antunna', english: 'you (feminine plural)', french: 'vous (feminin pluriel)' },
          { arabic: 'هُمْ', transliteration: 'hum', english: 'they (masculine)', french: 'ils (masculin)' },
          { arabic: 'هُنَّ', transliteration: 'hunna', english: 'they (feminine)', french: 'elles (feminin)' },
        ],
      },
      {
        title: 'Using Pronouns in Sentences',
        titleFr: 'Utiliser les pronoms dans des phrases',
        content: 'In Arabic, you don\'t need "is/am/are" with pronouns. Just pronoun + noun/adjective!',
        contentFr: 'En arabe, vous n\'avez pas besoin de "etre" avec les pronoms. Juste pronom + nom/adjectif !',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student (m)', french: 'Je suis etudiant (m)' },
          { arabic: 'أَنَا طَالِبَة', transliteration: 'anā ṭāliba', english: 'I am a student (f)', french: 'Je suis etudiante (f)' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher', french: 'Il est enseignant' },
          { arabic: 'هِيَ طَبِيبَة', transliteration: 'hiya ṭabība', english: 'She is a doctor', french: 'Elle est medecin' },
          { arabic: 'نَحْنُ طُلَّاب', transliteration: 'naḥnu ṭullāb', english: 'We are students', french: 'Nous sommes etudiants' },
          { arabic: 'هُمْ مِنْ مِصْر', transliteration: 'hum min Miṣr', english: 'They are from Egypt', french: 'Ils sont d\'Egypte' },
          { arabic: 'أَنْتَ كَبِير', transliteration: 'anta kabīr', english: 'You are big (m)', french: 'Tu es grand (m)' },
          { arabic: 'أَنْتِ جَمِيلَة', transliteration: 'anti jamīla', english: 'You are beautiful (f)', french: 'Tu es belle (f)' },
        ],
      },
    ],
  },
  'possessive': {
    title: 'Possessive Pronouns',
    titleFr: 'Les pronoms possessifs',
    titleArabic: 'ضَمَائِر الْمِلْكِيَّة',
    sections: [
      {
        title: 'How Possession Works in Arabic',
        titleFr: 'Comment fonctionne la possession en arabe',
        content: 'Unlike English where possessives come BEFORE nouns ("my book"), Arabic uses SUFFIXES that attach to the END of nouns ("book-my" = كِتَابِي). This is a fundamental difference.',
        contentFr: 'Contrairement au francais ou les possessifs precedent les noms ("mon livre"), l\'arabe utilise des SUFFIXES attaches a la FIN des noms ("livre-mon" = كِتَابِي). C\'est une difference fondamentale.',
        examples: [
          { arabic: 'كِتَاب', transliteration: 'kitāb', english: 'a book (without suffix)', french: 'un livre (sans suffixe)' },
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (with ـِي suffix)', french: 'mon livre (avec suffixe ـِي)' },
          { arabic: 'بَيْتُهُ', transliteration: 'baytuhu', english: 'his house (with ـهُ suffix)', french: 'sa maison (avec suffixe ـهُ)' },
          { arabic: 'سَيَّارَتُهَا', transliteration: 'sayyāratuhā', english: 'her car (with ـهَا suffix)', french: 'sa voiture (avec suffixe ـهَا)' },
        ],
      },
      {
        title: 'Singular Possessive Suffixes',
        titleFr: 'Suffixes possessifs singuliers',
        content: 'Here are the possessive suffixes for "my", "your" (singular), "his", and "her".',
        contentFr: 'Voici les suffixes possessifs pour "mon", "ton" (singulier), "son" (masculin) et "son" (feminin).',
        examples: [
          { arabic: 'كِتَابِي', transliteration: 'kitābī', english: 'my book (ـِي = my)', french: 'mon livre (ـِي = mon)' },
          { arabic: 'كِتَابُكَ', transliteration: 'kitābuka', english: 'your book (m) (ـكَ = your m.)', french: 'ton livre (m) (ـكَ = ton m.)' },
          { arabic: 'كِتَابُكِ', transliteration: 'kitābuki', english: 'your book (f) (ـكِ = your f.)', french: 'ton livre (f) (ـكِ = ton f.)' },
          { arabic: 'كِتَابُهُ', transliteration: 'kitābuhu', english: 'his book (ـهُ = his)', french: 'son livre (a lui) (ـهُ = son)' },
          { arabic: 'كِتَابُهَا', transliteration: 'kitābuhā', english: 'her book (ـهَا = her)', french: 'son livre (a elle) (ـهَا = son)' },
        ],
      },
      {
        title: 'Plural Possessive Suffixes',
        titleFr: 'Suffixes possessifs pluriels',
        content: 'Here are the possessive suffixes for "our", "your" (plural), and "their".',
        contentFr: 'Voici les suffixes possessifs pour "notre", "votre" (pluriel) et "leur".',
        examples: [
          { arabic: 'كِتَابُنَا', transliteration: 'kitābunā', english: 'our book (ـنَا = our)', french: 'notre livre (ـنَا = notre)' },
          { arabic: 'كِتَابُكُمْ', transliteration: 'kitābukum', english: 'your book (pl.) (ـكُمْ = your pl.)', french: 'votre livre (pl.) (ـكُمْ = votre pl.)' },
          { arabic: 'كِتَابُهُمْ', transliteration: 'kitābuhum', english: 'their book (ـهُمْ = their)', french: 'leur livre (ـهُمْ = leur)' },
        ],
      },
      {
        title: 'Family Members with Possessives',
        titleFr: 'Membres de la famille avec les possessifs',
        content: 'Family terms are very commonly used with possessive suffixes.',
        contentFr: 'Les termes familiaux sont tres couramment utilises avec les suffixes possessifs.',
        examples: [
          { arabic: 'أُمِّي', transliteration: 'ummī', english: 'my mother', french: 'ma mere' },
          { arabic: 'أَبِي', transliteration: 'abī', english: 'my father', french: 'mon pere' },
          { arabic: 'أُخْتِي', transliteration: 'ukhtī', english: 'my sister', french: 'ma soeur' },
          { arabic: 'أَخِي', transliteration: 'akhī', english: 'my brother', french: 'mon frere' },
        ],
      },
    ],
  },
  'adjectives': {
    title: 'Adjectives',
    titleFr: 'Les adjectifs',
    titleArabic: 'الصِّفَات',
    sections: [
      {
        title: 'Introduction to Arabic Adjectives',
        titleFr: 'Introduction aux adjectifs arabes',
        content: 'Adjectives in Arabic come AFTER the noun they describe. This is different from English where adjectives come BEFORE the noun.',
        contentFr: 'Les adjectifs en arabe viennent APRES le nom qu\'ils decrivent. C\'est different du francais ou les adjectifs viennent souvent AVANT le nom.',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (lit: house big)', french: 'une grande maison (lit: maison grande)' },
          { arabic: 'كِتَاب جَدِيد', transliteration: 'kitāb jadīd', english: 'a new book (lit: book new)', french: 'un nouveau livre (lit: livre nouveau)' },
          { arabic: 'سَيَّارَة سَرِيعَة', transliteration: 'sayyāra sarīʿa', english: 'a fast car (lit: car fast)', french: 'une voiture rapide (lit: voiture rapide)' },
        ],
      },
      {
        title: 'Rule 1: Gender Agreement',
        titleFr: 'Regle 1 : Accord en genre',
        content: 'Adjectives MUST match the gender of the noun. If the noun is masculine, use the masculine adjective. If the noun is feminine, add ة.',
        contentFr: 'Les adjectifs DOIVENT s\'accorder en genre avec le nom. Si le nom est masculin, utilisez l\'adjectif masculin. Si le nom est feminin, ajoutez ة.',
        examples: [
          { arabic: 'وَلَد طَوِيل', transliteration: 'walad ṭawīl', english: 'a tall boy', french: 'un garcon grand' },
          { arabic: 'بِنْت طَوِيلَة', transliteration: 'bint ṭawīla', english: 'a tall girl', french: 'une fille grande' },
        ],
      },
      {
        title: 'Rule 2: Definiteness Agreement',
        titleFr: 'Regle 2 : Accord en determination',
        content: 'Adjectives must also match the definiteness of the noun. If the noun has ال, the adjective must ALSO have ال.',
        contentFr: 'Les adjectifs doivent aussi s\'accorder en determination avec le nom. Si le nom a ال, l\'adjectif DOIT aussi avoir ال.',
        examples: [
          { arabic: 'بَيْت كَبِير', transliteration: 'bayt kabīr', english: 'a big house (both indefinite)', french: 'une grande maison (les deux indefinis)' },
          { arabic: 'الْبَيْت الْكَبِير', transliteration: 'al-bayt al-kabīr', english: 'the big house (both definite)', french: 'la grande maison (les deux definis)' },
        ],
      },
      {
        title: 'Common Adjectives',
        titleFr: 'Adjectifs courants',
        content: 'Here are essential adjectives for describing size and quality.',
        contentFr: 'Voici des adjectifs essentiels pour decrire la taille et la qualite.',
        examples: [
          { arabic: 'كَبِير / كَبِيرَة', transliteration: 'kabīr / kabīra', english: 'big, large', french: 'grand, gros' },
          { arabic: 'صَغِير / صَغِيرَة', transliteration: 'ṣaghīr / ṣaghīra', english: 'small, little', french: 'petit' },
          { arabic: 'جَدِيد / جَدِيدَة', transliteration: 'jadīd / jadīda', english: 'new', french: 'nouveau' },
          { arabic: 'قَدِيم / قَدِيمَة', transliteration: 'qadīm / qadīma', english: 'old', french: 'ancien, vieux' },
          { arabic: 'جَمِيل / جَمِيلَة', transliteration: 'jamīl / jamīla', english: 'beautiful', french: 'beau, belle' },
        ],
      },
    ],
  },
  'prepositions': {
    title: 'Prepositions',
    titleFr: 'Les prepositions',
    titleArabic: 'حُرُوف الْجَرّ',
    sections: [
      {
        title: 'What are Prepositions?',
        titleFr: 'Que sont les prepositions ?',
        content: 'Prepositions show the relationship between nouns. They answer questions like "where?", "when?", "how?", and "with whom?".',
        contentFr: 'Les prepositions montrent la relation entre les noms. Elles repondent aux questions comme "ou ?", "quand ?", "comment ?" et "avec qui ?".',
        examples: [
          { arabic: 'الْكِتَاب عَلَى الطَّاوِلَة', transliteration: 'al-kitāb ʿalā aṭ-ṭāwila', english: 'The book is on the table', french: 'Le livre est sur la table' },
          { arabic: 'أَنَا مِنْ مِصْر', transliteration: 'anā min Miṣr', english: 'I am from Egypt', french: 'Je suis d\'Egypte' },
        ],
      },
      {
        title: 'Essential Prepositions',
        titleFr: 'Prepositions essentielles',
        content: 'These four prepositions are the most common in Arabic: فِي (in), عَلَى (on), مِنْ (from), إِلَى (to).',
        contentFr: 'Ces quatre prepositions sont les plus courantes en arabe : فِي (dans), عَلَى (sur), مِنْ (de), إِلَى (vers/a).',
        examples: [
          { arabic: 'أَنَا فِي الْبَيْت', transliteration: 'anā fī al-bayt', english: 'I am in the house', french: 'Je suis dans la maison' },
          { arabic: 'الْقَلَم عَلَى الْمَكْتَب', transliteration: 'al-qalam ʿalā al-maktab', english: 'The pen is on the desk', french: 'Le stylo est sur le bureau' },
          { arabic: 'هُوَ مِنْ لُبْنَان', transliteration: 'huwa min Lubnān', english: 'He is from Lebanon', french: 'Il est du Liban' },
          { arabic: 'ذَهَبْتُ إِلَى السُّوق', transliteration: 'dhahabtu ilā as-sūq', english: 'I went to the market', french: 'Je suis alle au marche' },
        ],
      },
      {
        title: 'Preposition عِنْدَ (to have)',
        titleFr: 'La preposition عِنْدَ (avoir)',
        content: 'عِنْدَ is commonly used to express possession in Arabic (instead of "have").',
        contentFr: 'عِنْدَ est couramment utilise pour exprimer la possession en arabe (au lieu du verbe "avoir").',
        examples: [
          { arabic: 'عِنْدِي كِتَاب', transliteration: 'ʿindī kitāb', english: 'I have a book', french: 'J\'ai un livre' },
          { arabic: 'عِنْدَكَ سَيَّارَة؟', transliteration: 'ʿindaka sayyāra?', english: 'Do you have a car?', french: 'As-tu une voiture ?' },
          { arabic: 'عِنْدَهُ مَال', transliteration: 'ʿindahu māl', english: 'He has money', french: 'Il a de l\'argent' },
        ],
      },
    ],
  },
  'nominal-sentence': {
    title: 'Nominal Sentences',
    titleFr: 'Les phrases nominales',
    titleArabic: 'الْجُمْلَة الاِسْمِيَّة',
    sections: [
      {
        title: 'What is a Nominal Sentence?',
        titleFr: 'Qu\'est-ce qu\'une phrase nominale ?',
        content: 'A nominal sentence starts with a NOUN or PRONOUN, not a verb. Arabic does NOT use "is/am/are" in the present tense!',
        contentFr: 'Une phrase nominale commence par un NOM ou un PRONOM, pas un verbe. L\'arabe N\'utilise PAS "etre" au present !',
        examples: [
          { arabic: 'أَنَا طَالِب', transliteration: 'anā ṭālib', english: 'I am a student', french: 'Je suis etudiant' },
          { arabic: 'هُوَ مُعَلِّم', transliteration: 'huwa muʿallim', english: 'He is a teacher', french: 'Il est enseignant' },
          { arabic: 'الْجَوّ حَارّ', transliteration: 'al-jaww ḥārr', english: 'The weather is hot', french: 'Le temps est chaud' },
        ],
      },
      {
        title: 'The Two Parts',
        titleFr: 'Les deux parties',
        content: 'Every nominal sentence has: الْمُبْتَدَأ (subject) and الْخَبَر (predicate).',
        contentFr: 'Chaque phrase nominale a : الْمُبْتَدَأ (sujet) et الْخَبَر (predicat).',
        examples: [
          { arabic: 'الْبَيْتُ كَبِيرٌ', transliteration: 'al-baytu kabīrun', english: 'The house is big', french: 'La maison est grande' },
          { arabic: 'الطَّالِبَةُ ذَكِيَّةٌ', transliteration: 'aṭ-ṭālibatu dhakiyyatun', english: 'The student (f) is smart', french: 'L\'etudiante est intelligente' },
        ],
      },
      {
        title: 'Questions',
        titleFr: 'Les questions',
        content: 'To ask yes/no questions, add هَلْ at the beginning.',
        contentFr: 'Pour poser des questions oui/non, ajoutez هَلْ au debut.',
        examples: [
          { arabic: 'هَلْ أَنْتَ طَالِب؟', transliteration: 'hal anta ṭālib?', english: 'Are you a student?', french: 'Es-tu etudiant ?' },
          { arabic: 'مَا اسْمُكَ؟', transliteration: 'mā ismuka?', english: 'What is your name?', french: 'Quel est ton nom ?' },
          { arabic: 'أَيْنَ الْمَطْعَم؟', transliteration: 'ayna al-maṭʿam?', english: 'Where is the restaurant?', french: 'Ou est le restaurant ?' },
        ],
      },
    ],
  },
  'numbers': {
    title: 'Numbers & Counting',
    titleFr: 'Les nombres et le comptage',
    titleArabic: 'الأَعْدَاد',
    sections: [
      {
        title: 'Numbers 1-10',
        titleFr: 'Les nombres de 1 a 10',
        content: 'The cardinal numbers from one to ten.',
        contentFr: 'Les nombres cardinaux de un a dix.',
        examples: [
          { arabic: 'وَاحِد', transliteration: 'wāḥid', english: '1 - one', french: '1 - un' },
          { arabic: 'اِثْنَان', transliteration: 'ithnān', english: '2 - two', french: '2 - deux' },
          { arabic: 'ثَلَاثَة', transliteration: 'thalātha', english: '3 - three', french: '3 - trois' },
          { arabic: 'أَرْبَعَة', transliteration: 'arbaʿa', english: '4 - four', french: '4 - quatre' },
          { arabic: 'خَمْسَة', transliteration: 'khamsa', english: '5 - five', french: '5 - cinq' },
          { arabic: 'سِتَّة', transliteration: 'sitta', english: '6 - six', french: '6 - six' },
          { arabic: 'سَبْعَة', transliteration: 'sabʿa', english: '7 - seven', french: '7 - sept' },
          { arabic: 'ثَمَانِيَة', transliteration: 'thamāniya', english: '8 - eight', french: '8 - huit' },
          { arabic: 'تِسْعَة', transliteration: 'tisʿa', english: '9 - nine', french: '9 - neuf' },
          { arabic: 'عَشَرَة', transliteration: 'ʿashara', english: '10 - ten', french: '10 - dix' },
        ],
      },
      {
        title: 'Tens (20, 30, 40...)',
        titleFr: 'Les dizaines (20, 30, 40...)',
        content: 'The tens from 20 to 90.',
        contentFr: 'Les dizaines de 20 a 90.',
        examples: [
          { arabic: 'عِشْرُون', transliteration: 'ʿishrūn', english: '20 - twenty', french: '20 - vingt' },
          { arabic: 'ثَلَاثُون', transliteration: 'thalāthūn', english: '30 - thirty', french: '30 - trente' },
          { arabic: 'أَرْبَعُون', transliteration: 'arbaʿūn', english: '40 - forty', french: '40 - quarante' },
          { arabic: 'خَمْسُون', transliteration: 'khamsūn', english: '50 - fifty', french: '50 - cinquante' },
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
