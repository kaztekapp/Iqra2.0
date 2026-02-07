import { ReadingText } from '../../../types/arabic';

export const readingTexts: ReadingText[] = [
  // TEXT 1: Self Introduction
  {
    id: 'reading-1',
    title: 'Introducing Myself',
    titleFr: 'Me Présenter',
    titleArabic: 'أُقَدِّمُ نَفْسِي',
    level: 'beginner',
    order: 1,
    textWithVowels: `مَرْحَبًا! اِسْمِي أَحْمَد.
أَنَا مِنْ مِصْر.
أَنَا طَالِبٌ فِي الْجَامِعَة.
أَدْرُسُ اللُّغَةَ الْعَرَبِيَّة.
أُحِبُّ الْقِرَاءَة وَالْكِتَابَة.
عُمْرِي عِشْرُونَ سَنَة.
أَسْكُنُ فِي الْقَاهِرَة.
لِي أَخٌ وَأُخْتٌ.
أَبِي مُعَلِّمٌ وَأُمِّي طَبِيبَة.
تَشَرَّفْتُ بِمَعْرِفَتِكُمْ!`,
    textWithoutVowels: `مرحبا! اسمي أحمد.
أنا من مصر.
أنا طالب في الجامعة.
أدرس اللغة العربية.
أحب القراءة والكتابة.
عمري عشرون سنة.
أسكن في القاهرة.
لي أخ وأخت.
أبي معلم وأمي طبيبة.
تشرفت بمعرفتكم!`,
    transliteration: `Marḥaban! Ismī Aḥmad.
Anā min Miṣr.
Anā ṭālibun fī al-jāmiʿa.
Adrusu al-lughata al-ʿarabiyya.
Uḥibbu al-qirāʾa wa-al-kitāba.
ʿUmrī ʿishrūna sana.
Askunu fī al-Qāhira.
Lī akhun wa ukhtun.
Abī muʿallimun wa ummī ṭabība.
Tasharraftu bi-maʿrifatikum!`,
    translation: `Hello! My name is Ahmad.
I am from Egypt.
I am a student at the university.
I study the Arabic language.
I love reading and writing.
I am twenty years old.
I live in Cairo.
I have a brother and a sister.
My father is a teacher and my mother is a doctor.
Pleased to meet you!`,
    translationFr: `Bonjour ! Je m'appelle Ahmad.
Je suis d'Égypte.
Je suis étudiant à l'université.
J'étudie la langue arabe.
J'aime la lecture et l'écriture.
J'ai vingt ans.
J'habite au Caire.
J'ai un frère et une sœur.
Mon père est enseignant et ma mère est médecin.
Enchanté de vous connaître !`,
    vocabulary: ['greeting-1', 'greeting-17', 'family-1', 'family-2', 'family-3', 'family-4', 'number-20'],
    comprehensionQuestions: [
      {
        id: 'q1-1',
        questionArabic: 'مَا اسْمُ الشَّخْص؟',
        questionEnglish: 'What is the person\'s name?',
        questionFrench: 'Quel est le nom de la personne ?',
        options: [
          { arabic: 'أَحْمَد', english: 'Ahmad', french: 'Ahmad', isCorrect: true },
          { arabic: 'مُحَمَّد', english: 'Muhammad', french: 'Muhammad', isCorrect: false },
          { arabic: 'عَلِي', english: 'Ali', french: 'Ali', isCorrect: false },
          { arabic: 'خَالِد', english: 'Khalid', french: 'Khalid', isCorrect: false },
        ],
      },
      {
        id: 'q1-2',
        questionArabic: 'مِنْ أَيْنَ هُوَ؟',
        questionEnglish: 'Where is he from?',
        questionFrench: 'D\'où vient-il ?',
        options: [
          { arabic: 'مِصْر', english: 'Egypt', french: 'Égypte', isCorrect: true },
          { arabic: 'الأُرْدُن', english: 'Jordan', french: 'Jordanie', isCorrect: false },
          { arabic: 'لُبْنَان', english: 'Lebanon', french: 'Liban', isCorrect: false },
          { arabic: 'الْمَغْرِب', english: 'Morocco', french: 'Maroc', isCorrect: false },
        ],
      },
      {
        id: 'q1-3',
        questionArabic: 'مَاذَا يَدْرُسُ؟',
        questionEnglish: 'What does he study?',
        questionFrench: 'Qu\'étudie-t-il ?',
        options: [
          { arabic: 'اللُّغَةَ الْعَرَبِيَّة', english: 'Arabic language', french: 'La langue arabe', isCorrect: true },
          { arabic: 'الرِّيَاضِيَّات', english: 'Mathematics', french: 'Les mathématiques', isCorrect: false },
          { arabic: 'الطِّبّ', english: 'Medicine', french: 'La médecine', isCorrect: false },
          { arabic: 'الْهَنْدَسَة', english: 'Engineering', french: 'L\'ingénierie', isCorrect: false },
        ],
      },
      {
        id: 'q1-4',
        questionArabic: 'مَا مِهْنَةُ أُمِّهِ؟',
        questionEnglish: 'What is his mother\'s profession?',
        questionFrench: 'Quelle est la profession de sa mère ?',
        options: [
          { arabic: 'طَبِيبَة', english: 'Doctor', french: 'Médecin', isCorrect: true },
          { arabic: 'مُعَلِّمَة', english: 'Teacher', french: 'Enseignante', isCorrect: false },
          { arabic: 'مُهَنْدِسَة', english: 'Engineer', french: 'Ingénieure', isCorrect: false },
          { arabic: 'مُمَرِّضَة', english: 'Nurse', french: 'Infirmière', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 2: My Family
  {
    id: 'reading-2',
    title: 'My Family',
    titleFr: 'Ma Famille',
    titleArabic: 'عَائِلَتِي',
    level: 'beginner',
    order: 2,
    textWithVowels: `هَذِهِ عَائِلَتِي.
أَبِي اِسْمُهُ مُحَمَّد. هُوَ طَوِيلٌ وَلَطِيف.
أُمِّي اِسْمُهَا فَاطِمَة. هِيَ جَمِيلَةٌ وَطَيِّبَة.
لِي أَخٌ كَبِيرٌ اِسْمُهُ عُمَر. عُمْرُهُ خَمْسٌ وَعِشْرُونَ سَنَة.
لِي أُخْتٌ صَغِيرَةٌ اِسْمُهَا مَرْيَم. عُمْرُهَا عَشْرُ سَنَوَات.
عِنْدَنَا قِطَّةٌ اِسْمُهَا لُولُو.
نَحْنُ عَائِلَةٌ سَعِيدَة.
نَأْكُلُ مَعًا كُلَّ يَوْم.
أُحِبُّ عَائِلَتِي كَثِيرًا.`,
    textWithoutVowels: `هذه عائلتي.
أبي اسمه محمد. هو طويل ولطيف.
أمي اسمها فاطمة. هي جميلة وطيبة.
لي أخ كبير اسمه عمر. عمره خمس وعشرون سنة.
لي أخت صغيرة اسمها مريم. عمرها عشر سنوات.
عندنا قطة اسمها لولو.
نحن عائلة سعيدة.
نأكل معا كل يوم.
أحب عائلتي كثيرا.`,
    transliteration: `Hādhihi ʿāʾilatī.
Abī ismuhu Muḥammad. Huwa ṭawīlun wa laṭīf.
Ummī ismuhā Fāṭima. Hiya jamīlatun wa ṭayyiba.
Lī akhun kabīrun ismuhu ʿUmar. ʿUmruhu khamsun wa ʿishrūna sana.
Lī ukhtun ṣaghīratun ismuhā Maryam. ʿUmruhā ʿashru sanawāt.
ʿIndanā qiṭṭatun ismuhā Lūlū.
Naḥnu ʿāʾilatun saʿīda.
Naʾkulu maʿan kulla yawm.
Uḥibbu ʿāʾilatī kathīran.`,
    translation: `This is my family.
My father's name is Muhammad. He is tall and kind.
My mother's name is Fatima. She is beautiful and good-hearted.
I have an older brother named Omar. He is twenty-five years old.
I have a younger sister named Maryam. She is ten years old.
We have a cat named Lulu.
We are a happy family.
We eat together every day.
I love my family very much.`,
    translationFr: `Voici ma famille.
Mon père s'appelle Muhammad. Il est grand et gentil.
Ma mère s'appelle Fatima. Elle est belle et bienveillante.
J'ai un grand frère qui s'appelle Omar. Il a vingt-cinq ans.
J'ai une petite sœur qui s'appelle Maryam. Elle a dix ans.
Nous avons une chatte qui s'appelle Loulou.
Nous sommes une famille heureuse.
Nous mangeons ensemble chaque jour.
J'aime beaucoup ma famille.`,
    vocabulary: ['family-1', 'family-2', 'family-3', 'family-4', 'number-10', 'number-5'],
    comprehensionQuestions: [
      {
        id: 'q2-1',
        questionArabic: 'مَا اسْمُ الْأَب؟',
        questionEnglish: 'What is the father\'s name?',
        questionFrench: 'Quel est le nom du père ?',
        options: [
          { arabic: 'مُحَمَّد', english: 'Muhammad', french: 'Muhammad', isCorrect: true },
          { arabic: 'أَحْمَد', english: 'Ahmad', french: 'Ahmad', isCorrect: false },
          { arabic: 'عُمَر', english: 'Omar', french: 'Omar', isCorrect: false },
          { arabic: 'خَالِد', english: 'Khalid', french: 'Khalid', isCorrect: false },
        ],
      },
      {
        id: 'q2-2',
        questionArabic: 'كَمْ عُمْرُ الْأَخ؟',
        questionEnglish: 'How old is the brother?',
        questionFrench: 'Quel âge a le frère ?',
        options: [
          { arabic: 'خَمْسٌ وَعِشْرُونَ سَنَة', english: '25 years', french: '25 ans', isCorrect: true },
          { arabic: 'عِشْرُونَ سَنَة', english: '20 years', french: '20 ans', isCorrect: false },
          { arabic: 'عَشْرُ سَنَوَات', english: '10 years', french: '10 ans', isCorrect: false },
          { arabic: 'ثَلَاثُونَ سَنَة', english: '30 years', french: '30 ans', isCorrect: false },
        ],
      },
      {
        id: 'q2-3',
        questionArabic: 'مَا اسْمُ الْقِطَّة؟',
        questionEnglish: 'What is the cat\'s name?',
        questionFrench: 'Quel est le nom du chat ?',
        options: [
          { arabic: 'لُولُو', english: 'Lulu', french: 'Loulou', isCorrect: true },
          { arabic: 'مِيمِي', english: 'Mimi', french: 'Mimi', isCorrect: false },
          { arabic: 'بَسْبَس', english: 'Basbas', french: 'Basbas', isCorrect: false },
          { arabic: 'قِطْقُوط', english: 'Qitqut', french: 'Qitqout', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 3: My Day
  {
    id: 'reading-3',
    title: 'My Day',
    titleFr: 'Ma Journée',
    titleArabic: 'يَوْمِي',
    level: 'beginner',
    order: 3,
    textWithVowels: `أَسْتَيْقِظُ فِي السَّاعَةِ السَّادِسَة صَبَاحًا.
أَغْسِلُ وَجْهِي وَأَتَنَاوَلُ الْفُطُور.
آكُلُ الْخُبْزَ وَالْجُبْنَ وَأَشْرَبُ الْحَلِيب.
أَذْهَبُ إِلَى الْمَدْرَسَة فِي السَّاعَةِ السَّابِعَة.
أَدْرُسُ الْعَرَبِيَّة وَالرِّيَاضِيَّات وَالْعُلُوم.
أَرْجِعُ إِلَى الْبَيْتِ فِي السَّاعَةِ الثَّانِيَة.
أَتَغَدَّى مَعَ عَائِلَتِي.
بَعْدَ الظُّهْرِ، أَقْرَأُ كِتَابًا أَوْ أَلْعَبُ.
أَنَامُ فِي السَّاعَةِ التَّاسِعَة مَسَاءً.`,
    textWithoutVowels: `أستيقظ في الساعة السادسة صباحا.
أغسل وجهي وأتناول الفطور.
آكل الخبز والجبن وأشرب الحليب.
أذهب إلى المدرسة في الساعة السابعة.
أدرس العربية والرياضيات والعلوم.
أرجع إلى البيت في الساعة الثانية.
أتغدى مع عائلتي.
بعد الظهر، أقرأ كتابا أو ألعب.
أنام في الساعة التاسعة مساء.`,
    transliteration: `Astayqiẓu fī as-sāʿati as-sādisa ṣabāḥan.
Aghsilu wajhī wa atanāwalu al-fuṭūr.
Ākulu al-khubza wa al-jubna wa ashrabu al-ḥalīb.
Adhhabu ilā al-madrasa fī as-sāʿati as-sābiʿa.
Adrusu al-ʿarabiyya wa ar-riyāḍiyyāt wa al-ʿulūm.
Arjiʿu ilā al-bayt fī as-sāʿati ath-thāniya.
Ataghaddā maʿa ʿāʾilatī.
Baʿda aẓ-ẓuhr, aqraʾu kitāban aw alʿab.
Anāmu fī as-sāʿati at-tāsiʿa masāʾan.`,
    translation: `I wake up at 6 o'clock in the morning.
I wash my face and have breakfast.
I eat bread and cheese and drink milk.
I go to school at 7 o'clock.
I study Arabic, mathematics, and science.
I return home at 2 o'clock.
I have lunch with my family.
In the afternoon, I read a book or play.
I sleep at 9 o'clock in the evening.`,
    translationFr: `Je me réveille à 6 heures du matin.
Je me lave le visage et je prends le petit-déjeuner.
Je mange du pain et du fromage et je bois du lait.
Je vais à l'école à 7 heures.
J'étudie l'arabe, les mathématiques et les sciences.
Je rentre à la maison à 2 heures.
Je déjeune avec ma famille.
L'après-midi, je lis un livre ou je joue.
Je dors à 9 heures du soir.`,
    vocabulary: ['food-8', 'food-11', 'number-6', 'number-7', 'number-9', 'number-2'],
    comprehensionQuestions: [
      {
        id: 'q3-1',
        questionArabic: 'مَتَى يَسْتَيْقِظُ؟',
        questionEnglish: 'When does he wake up?',
        questionFrench: 'Quand se réveille-t-il ?',
        options: [
          { arabic: 'السَّاعَة السَّادِسَة', english: '6 o\'clock', french: '6 heures', isCorrect: true },
          { arabic: 'السَّاعَة السَّابِعَة', english: '7 o\'clock', french: '7 heures', isCorrect: false },
          { arabic: 'السَّاعَة الْخَامِسَة', english: '5 o\'clock', french: '5 heures', isCorrect: false },
          { arabic: 'السَّاعَة الثَّامِنَة', english: '8 o\'clock', french: '8 heures', isCorrect: false },
        ],
      },
      {
        id: 'q3-2',
        questionArabic: 'مَاذَا يَشْرَبُ فِي الْفُطُور؟',
        questionEnglish: 'What does he drink for breakfast?',
        questionFrench: 'Que boit-il au petit-déjeuner ?',
        options: [
          { arabic: 'الْحَلِيب', english: 'Milk', french: 'Lait', isCorrect: true },
          { arabic: 'الْقَهْوَة', english: 'Coffee', french: 'Café', isCorrect: false },
          { arabic: 'الشَّاي', english: 'Tea', french: 'Thé', isCorrect: false },
          { arabic: 'الْعَصِير', english: 'Juice', french: 'Jus', isCorrect: false },
        ],
      },
      {
        id: 'q3-3',
        questionArabic: 'مَتَى يَنَامُ؟',
        questionEnglish: 'When does he sleep?',
        questionFrench: 'Quand dort-il ?',
        options: [
          { arabic: 'السَّاعَة التَّاسِعَة مَسَاءً', english: '9 PM', french: '21h', isCorrect: true },
          { arabic: 'السَّاعَة الْعَاشِرَة', english: '10 o\'clock', french: '10 heures', isCorrect: false },
          { arabic: 'السَّاعَة الثَّامِنَة', english: '8 o\'clock', french: '8 heures', isCorrect: false },
          { arabic: 'السَّاعَة الْحَادِيَة عَشْرَة', english: '11 o\'clock', french: '11 heures', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 4: At the Restaurant
  {
    id: 'reading-4',
    title: 'At the Restaurant',
    titleFr: 'Au Restaurant',
    titleArabic: 'فِي الْمَطْعَم',
    level: 'beginner',
    order: 4,
    textWithVowels: `ذَهَبْتُ إِلَى الْمَطْعَمِ مَعَ صَدِيقِي.
جَلَسْنَا عَلَى طَاوِلَةٍ قُرْبَ النَّافِذَة.
جَاءَ النَّادِلُ وَسَأَلَ: "مَاذَا تُرِيدُونَ؟"
قُلْتُ: "أُرِيدُ دَجَاجًا مَشْوِيًّا مَعَ الْأَرُزّ."
قَالَ صَدِيقِي: "أُرِيدُ سَمَكًا مَعَ الْخُضَار."
شَرِبْتُ عَصِيرَ بُرْتُقَال وَشَرِبَ صَدِيقِي الشَّاي.
الطَّعَامُ كَانَ لَذِيذًا جِدًّا!
دَفَعْتُ الْحِسَاب وَقُلْتُ: "شُكْرًا!"
قَالَ النَّادِل: "عَفْوًا، تَفَضَّلُوا مَرَّةً أُخْرَى!"`,
    textWithoutVowels: `ذهبت إلى المطعم مع صديقي.
جلسنا على طاولة قرب النافذة.
جاء النادل وسأل: "ماذا تريدون؟"
قلت: "أريد دجاجا مشويا مع الأرز."
قال صديقي: "أريد سمكا مع الخضار."
شربت عصير برتقال وشرب صديقي الشاي.
الطعام كان لذيذا جدا!
دفعت الحساب وقلت: "شكرا!"
قال النادل: "عفوا، تفضلوا مرة أخرى!"`,
    transliteration: `Dhahabtu ilā al-maṭʿam maʿa ṣadīqī.
Jalasnā ʿalā ṭāwilatin qurba an-nāfidha.
Jāʾa an-nādil wa saʾal: "Mādhā turīdūn?"
Qultu: "Urīdu dajājan mashwiyyan maʿa al-aruzz."
Qāla ṣadīqī: "Urīdu samakan maʿa al-khuḍār."
Sharibtu ʿaṣīra burtuqāl wa shariba ṣadīqī ash-shāy.
Aṭ-ṭaʿāmu kāna ladhīdhan jiddan!
Dafaʿtu al-ḥisāb wa qultu: "Shukran!"
Qāla an-nādil: "ʿAfwan, tafaḍḍalū marratan ukhrā!"`,
    translation: `I went to the restaurant with my friend.
We sat at a table near the window.
The waiter came and asked: "What would you like?"
I said: "I want grilled chicken with rice."
My friend said: "I want fish with vegetables."
I drank orange juice and my friend drank tea.
The food was very delicious!
I paid the bill and said: "Thank you!"
The waiter said: "You're welcome, come again!"`,
    translationFr: `Je suis allé au restaurant avec mon ami.
Nous nous sommes assis à une table près de la fenêtre.
Le serveur est venu et a demandé : "Que désirez-vous ?"
J'ai dit : "Je veux du poulet grillé avec du riz."
Mon ami a dit : "Je veux du poisson avec des légumes."
J'ai bu du jus d'orange et mon ami a bu du thé.
La nourriture était très délicieuse !
J'ai payé l'addition et j'ai dit : "Merci !"
Le serveur a dit : "De rien, revenez une autre fois !"`,
    vocabulary: ['food-1', 'food-2', 'food-5', 'food-9', 'greeting-11', 'greeting-12'],
    comprehensionQuestions: [
      {
        id: 'q4-1',
        questionArabic: 'مَعَ مَنْ ذَهَبَ إِلَى الْمَطْعَم؟',
        questionEnglish: 'With whom did he go to the restaurant?',
        questionFrench: 'Avec qui est-il allé au restaurant ?',
        options: [
          { arabic: 'صَدِيقُهُ', english: 'His friend', french: 'Son ami', isCorrect: true },
          { arabic: 'أَخُوهُ', english: 'His brother', french: 'Son frère', isCorrect: false },
          { arabic: 'أُمُّهُ', english: 'His mother', french: 'Sa mère', isCorrect: false },
          { arabic: 'أَبُوهُ', english: 'His father', french: 'Son père', isCorrect: false },
        ],
      },
      {
        id: 'q4-2',
        questionArabic: 'مَاذَا أَكَلَ الْمُتَكَلِّم؟',
        questionEnglish: 'What did the speaker eat?',
        questionFrench: 'Qu\'a mangé le locuteur ?',
        options: [
          { arabic: 'دَجَاجًا مَشْوِيًّا مَعَ الْأَرُزّ', english: 'Grilled chicken with rice', french: 'Poulet grillé avec du riz', isCorrect: true },
          { arabic: 'سَمَكًا مَعَ الْخُضَار', english: 'Fish with vegetables', french: 'Poisson avec des légumes', isCorrect: false },
          { arabic: 'لَحْمًا مَعَ الْأَرُزّ', english: 'Meat with rice', french: 'Viande avec du riz', isCorrect: false },
          { arabic: 'بِيتْزَا', english: 'Pizza', french: 'Pizza', isCorrect: false },
        ],
      },
      {
        id: 'q4-3',
        questionArabic: 'كَيْفَ كَانَ الطَّعَام؟',
        questionEnglish: 'How was the food?',
        questionFrench: 'Comment était la nourriture ?',
        options: [
          { arabic: 'لَذِيذًا جِدًّا', english: 'Very delicious', french: 'Très délicieux', isCorrect: true },
          { arabic: 'سَيِّئًا', english: 'Bad', french: 'Mauvais', isCorrect: false },
          { arabic: 'عَادِيًّا', english: 'Normal', french: 'Normal', isCorrect: false },
          { arabic: 'بَارِدًا', english: 'Cold', french: 'Froid', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 5: The Weather
  {
    id: 'reading-5',
    title: 'The Weather',
    titleFr: 'La Météo',
    titleArabic: 'الطَّقْس',
    level: 'beginner',
    order: 5,
    textWithVowels: `الْيَوْمُ يَوْمٌ جَمِيل!
الشَّمْسُ سَاطِعَة وَالسَّمَاءُ زَرْقَاء.
الطَّقْسُ دَافِئٌ فِي الرَّبِيع.
فِي الصَّيْفِ، الطَّقْسُ حَارٌّ جِدًّا.
أُحِبُّ السِّبَاحَة فِي الصَّيْف.
فِي الْخَرِيفِ، الْأَوْرَاقُ تَسْقُطُ مِنَ الشَّجَر.
الطَّقْسُ بَارِدٌ فِي الشِّتَاء.
أَحْيَانًا يَنْزِلُ الْمَطَر.
أَلْبَسُ مِعْطَفًا ثَقِيلًا فِي الشِّتَاء.
مَا هُوَ فَصْلُكَ الْمُفَضَّل؟`,
    textWithoutVowels: `اليوم يوم جميل!
الشمس ساطعة والسماء زرقاء.
الطقس دافئ في الربيع.
في الصيف، الطقس حار جدا.
أحب السباحة في الصيف.
في الخريف، الأوراق تسقط من الشجر.
الطقس بارد في الشتاء.
أحيانا ينزل المطر.
ألبس معطفا ثقيلا في الشتاء.
ما هو فصلك المفضل؟`,
    transliteration: `Al-yawmu yawmun jamīl!
Ash-shamsu sāṭiʿa wa as-samāʾu zarqāʾ.
Aṭ-ṭaqsu dāfiʾun fī ar-rabīʿ.
Fī aṣ-ṣayf, aṭ-ṭaqsu ḥārrun jiddan.
Uḥibbu as-sibāḥa fī aṣ-ṣayf.
Fī al-kharīf, al-awrāqu tasquṭu min ash-shajar.
Aṭ-ṭaqsu bāridun fī ash-shitāʾ.
Aḥyānan yanzilu al-maṭar.
Albasu miʿṭafan thaqīlan fī ash-shitāʾ.
Mā huwa faṣluka al-mufaḍḍal?`,
    translation: `Today is a beautiful day!
The sun is shining and the sky is blue.
The weather is warm in spring.
In summer, the weather is very hot.
I love swimming in summer.
In autumn, the leaves fall from the trees.
The weather is cold in winter.
Sometimes it rains.
I wear a heavy coat in winter.
What is your favorite season?`,
    translationFr: `Aujourd'hui est une belle journée !
Le soleil brille et le ciel est bleu.
Le temps est doux au printemps.
En été, le temps est très chaud.
J'aime nager en été.
En automne, les feuilles tombent des arbres.
Le temps est froid en hiver.
Parfois il pleut.
Je porte un manteau lourd en hiver.
Quelle est ta saison préférée ?`,
    vocabulary: ['color-2', 'color-1'],
    comprehensionQuestions: [
      {
        id: 'q5-1',
        questionArabic: 'كَيْفَ الطَّقْسُ فِي الصَّيْف؟',
        questionEnglish: 'How is the weather in summer?',
        questionFrench: 'Comment est le temps en été ?',
        options: [
          { arabic: 'حَارٌّ جِدًّا', english: 'Very hot', french: 'Très chaud', isCorrect: true },
          { arabic: 'بَارِد', english: 'Cold', french: 'Froid', isCorrect: false },
          { arabic: 'مُعْتَدِل', english: 'Moderate', french: 'Modéré', isCorrect: false },
          { arabic: 'مُمْطِر', english: 'Rainy', french: 'Pluvieux', isCorrect: false },
        ],
      },
      {
        id: 'q5-2',
        questionArabic: 'مَاذَا يُحِبُّ فِي الصَّيْف؟',
        questionEnglish: 'What does he like in summer?',
        questionFrench: 'Qu\'aime-t-il en été ?',
        options: [
          { arabic: 'السِّبَاحَة', english: 'Swimming', french: 'La natation', isCorrect: true },
          { arabic: 'الْقِرَاءَة', english: 'Reading', french: 'La lecture', isCorrect: false },
          { arabic: 'النَّوْم', english: 'Sleeping', french: 'Le sommeil', isCorrect: false },
          { arabic: 'الطَّبْخ', english: 'Cooking', french: 'La cuisine', isCorrect: false },
        ],
      },
      {
        id: 'q5-3',
        questionArabic: 'مَا لَوْنُ السَّمَاء؟',
        questionEnglish: 'What color is the sky?',
        questionFrench: 'Quelle est la couleur du ciel ?',
        options: [
          { arabic: 'زَرْقَاء', english: 'Blue', french: 'Bleu', isCorrect: true },
          { arabic: 'حَمْرَاء', english: 'Red', french: 'Rouge', isCorrect: false },
          { arabic: 'خَضْرَاء', english: 'Green', french: 'Vert', isCorrect: false },
          { arabic: 'صَفْرَاء', english: 'Yellow', french: 'Jaune', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 6: Shopping
  {
    id: 'reading-6',
    title: 'Shopping',
    titleFr: 'Les Courses',
    titleArabic: 'التَّسَوُّق',
    level: 'beginner',
    order: 6,
    textWithVowels: `ذَهَبْتُ إِلَى السُّوقِ الْيَوْم.
أَرَدْتُ شِرَاءَ خُضَارٍ وَفَوَاكِه.
اِشْتَرَيْتُ طَمَاطِمَ حَمْرَاء.
اِشْتَرَيْتُ خِيَارًا أَخْضَر.
اِشْتَرَيْتُ تُفَّاحًا أَحْمَرَ وَمَوْزًا أَصْفَر.
سَأَلْتُ الْبَائِعَ: "كَمِ الثَّمَن؟"
قَالَ: "عَشَرَةُ دَرَاهِم."
قُلْتُ: "هَذَا غَالٍ! سَبْعَةُ دَرَاهِم؟"
قَالَ: "حَسَنًا، ثَمَانِيَة."
دَفَعْتُ وَشَكَرْتُهُ.`,
    textWithoutVowels: `ذهبت إلى السوق اليوم.
أردت شراء خضار وفواكه.
اشتريت طماطم حمراء.
اشتريت خيارا أخضر.
اشتريت تفاحا أحمر وموزا أصفر.
سألت البائع: "كم الثمن؟"
قال: "عشرة دراهم."
قلت: "هذا غال! سبعة دراهم؟"
قال: "حسنا، ثمانية."
دفعت وشكرته.`,
    transliteration: `Dhahabtu ilā as-sūqi al-yawm.
Aradtu shirāʾa khuḍārin wa fawākih.
Ishtaraytu ṭamāṭima ḥamrāʾ.
Ishtaraytu khiyāran akhḍar.
Ishtaraytu tuffāḥan aḥmar wa mawzan aṣfar.
Saʾaltu al-bāʾiʿ: "Kami ath-thaman?"
Qāla: "ʿAsharatu darāhim."
Qultu: "Hādhā ghālin! Sabʿatu darāhim?"
Qāla: "Ḥasanan, thamāniya."
Dafaʿtu wa shakartuh.`,
    translation: `I went to the market today.
I wanted to buy vegetables and fruits.
I bought red tomatoes.
I bought green cucumbers.
I bought red apples and yellow bananas.
I asked the seller: "How much?"
He said: "Ten dirhams."
I said: "That's expensive! Seven dirhams?"
He said: "Okay, eight."
I paid and thanked him.`,
    translationFr: `Je suis allé au marché aujourd'hui.
Je voulais acheter des légumes et des fruits.
J'ai acheté des tomates rouges.
J'ai acheté des concombres verts.
J'ai acheté des pommes rouges et des bananes jaunes.
J'ai demandé au vendeur : "Combien ?"
Il a dit : "Dix dirhams."
J'ai dit : "C'est cher ! Sept dirhams ?"
Il a dit : "D'accord, huit."
J'ai payé et je l'ai remercié.`,
    vocabulary: ['food-3', 'food-4', 'color-1', 'color-3', 'color-4', 'number-7', 'number-8', 'number-10'],
    comprehensionQuestions: [
      {
        id: 'q6-1',
        questionArabic: 'أَيْنَ ذَهَبَ؟',
        questionEnglish: 'Where did he go?',
        questionFrench: 'Où est-il allé ?',
        options: [
          { arabic: 'السُّوق', english: 'The market', french: 'Le marché', isCorrect: true },
          { arabic: 'الْمَدْرَسَة', english: 'The school', french: 'L\'école', isCorrect: false },
          { arabic: 'الْمَطْعَم', english: 'The restaurant', french: 'Le restaurant', isCorrect: false },
          { arabic: 'الْبَيْت', english: 'The house', french: 'La maison', isCorrect: false },
        ],
      },
      {
        id: 'q6-2',
        questionArabic: 'مَا لَوْنُ التُّفَّاح؟',
        questionEnglish: 'What color are the apples?',
        questionFrench: 'De quelle couleur sont les pommes ?',
        options: [
          { arabic: 'أَحْمَر', english: 'Red', french: 'Rouge', isCorrect: true },
          { arabic: 'أَخْضَر', english: 'Green', french: 'Vert', isCorrect: false },
          { arabic: 'أَصْفَر', english: 'Yellow', french: 'Jaune', isCorrect: false },
          { arabic: 'بُرْتُقَالِي', english: 'Orange', french: 'Orange', isCorrect: false },
        ],
      },
      {
        id: 'q6-3',
        questionArabic: 'كَمْ دَفَعَ فِي النِّهَايَة؟',
        questionEnglish: 'How much did he pay in the end?',
        questionFrench: 'Combien a-t-il payé à la fin ?',
        options: [
          { arabic: 'ثَمَانِيَة دَرَاهِم', english: 'Eight dirhams', french: 'Huit dirhams', isCorrect: true },
          { arabic: 'عَشَرَة دَرَاهِم', english: 'Ten dirhams', french: 'Dix dirhams', isCorrect: false },
          { arabic: 'سَبْعَة دَرَاهِم', english: 'Seven dirhams', french: 'Sept dirhams', isCorrect: false },
          { arabic: 'خَمْسَة دَرَاهِم', english: 'Five dirhams', french: 'Cinq dirhams', isCorrect: false },
        ],
      },
    ],
  },
];

// Helper functions
export const getTextById = (id: string): ReadingText | undefined => {
  return readingTexts.find(text => text.id === id);
};

export const getTextsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): ReadingText[] => {
  return readingTexts.filter(text => text.level === level).sort((a, b) => a.order - b.order);
};
