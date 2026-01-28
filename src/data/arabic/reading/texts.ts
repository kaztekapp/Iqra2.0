import { ReadingText } from '../../../types/arabic';

export const readingTexts: ReadingText[] = [
  // TEXT 1: Self Introduction
  {
    id: 'reading-1',
    title: 'Introducing Myself',
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
    vocabulary: ['greeting-1', 'greeting-17', 'family-1', 'family-2', 'family-3', 'family-4', 'number-20'],
    comprehensionQuestions: [
      {
        id: 'q1-1',
        questionArabic: 'مَا اسْمُ الشَّخْص؟',
        questionEnglish: 'What is the person\'s name?',
        options: [
          { arabic: 'أَحْمَد', english: 'Ahmad', isCorrect: true },
          { arabic: 'مُحَمَّد', english: 'Muhammad', isCorrect: false },
          { arabic: 'عَلِي', english: 'Ali', isCorrect: false },
          { arabic: 'خَالِد', english: 'Khalid', isCorrect: false },
        ],
      },
      {
        id: 'q1-2',
        questionArabic: 'مِنْ أَيْنَ هُوَ؟',
        questionEnglish: 'Where is he from?',
        options: [
          { arabic: 'مِصْر', english: 'Egypt', isCorrect: true },
          { arabic: 'الأُرْدُن', english: 'Jordan', isCorrect: false },
          { arabic: 'لُبْنَان', english: 'Lebanon', isCorrect: false },
          { arabic: 'الْمَغْرِب', english: 'Morocco', isCorrect: false },
        ],
      },
      {
        id: 'q1-3',
        questionArabic: 'مَاذَا يَدْرُسُ؟',
        questionEnglish: 'What does he study?',
        options: [
          { arabic: 'اللُّغَةَ الْعَرَبِيَّة', english: 'Arabic language', isCorrect: true },
          { arabic: 'الرِّيَاضِيَّات', english: 'Mathematics', isCorrect: false },
          { arabic: 'الطِّبّ', english: 'Medicine', isCorrect: false },
          { arabic: 'الْهَنْدَسَة', english: 'Engineering', isCorrect: false },
        ],
      },
      {
        id: 'q1-4',
        questionArabic: 'مَا مِهْنَةُ أُمِّهِ؟',
        questionEnglish: 'What is his mother\'s profession?',
        options: [
          { arabic: 'طَبِيبَة', english: 'Doctor', isCorrect: true },
          { arabic: 'مُعَلِّمَة', english: 'Teacher', isCorrect: false },
          { arabic: 'مُهَنْدِسَة', english: 'Engineer', isCorrect: false },
          { arabic: 'مُمَرِّضَة', english: 'Nurse', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 2: My Family
  {
    id: 'reading-2',
    title: 'My Family',
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
    vocabulary: ['family-1', 'family-2', 'family-3', 'family-4', 'number-10', 'number-5'],
    comprehensionQuestions: [
      {
        id: 'q2-1',
        questionArabic: 'مَا اسْمُ الْأَب؟',
        questionEnglish: 'What is the father\'s name?',
        options: [
          { arabic: 'مُحَمَّد', english: 'Muhammad', isCorrect: true },
          { arabic: 'أَحْمَد', english: 'Ahmad', isCorrect: false },
          { arabic: 'عُمَر', english: 'Omar', isCorrect: false },
          { arabic: 'خَالِد', english: 'Khalid', isCorrect: false },
        ],
      },
      {
        id: 'q2-2',
        questionArabic: 'كَمْ عُمْرُ الْأَخ؟',
        questionEnglish: 'How old is the brother?',
        options: [
          { arabic: 'خَمْسٌ وَعِشْرُونَ سَنَة', english: '25 years', isCorrect: true },
          { arabic: 'عِشْرُونَ سَنَة', english: '20 years', isCorrect: false },
          { arabic: 'عَشْرُ سَنَوَات', english: '10 years', isCorrect: false },
          { arabic: 'ثَلَاثُونَ سَنَة', english: '30 years', isCorrect: false },
        ],
      },
      {
        id: 'q2-3',
        questionArabic: 'مَا اسْمُ الْقِطَّة؟',
        questionEnglish: 'What is the cat\'s name?',
        options: [
          { arabic: 'لُولُو', english: 'Lulu', isCorrect: true },
          { arabic: 'مِيمِي', english: 'Mimi', isCorrect: false },
          { arabic: 'بَسْبَس', english: 'Basbas', isCorrect: false },
          { arabic: 'قِطْقُوط', english: 'Qitqut', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 3: My Day
  {
    id: 'reading-3',
    title: 'My Day',
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
    vocabulary: ['food-8', 'food-11', 'number-6', 'number-7', 'number-9', 'number-2'],
    comprehensionQuestions: [
      {
        id: 'q3-1',
        questionArabic: 'مَتَى يَسْتَيْقِظُ؟',
        questionEnglish: 'When does he wake up?',
        options: [
          { arabic: 'السَّاعَة السَّادِسَة', english: '6 o\'clock', isCorrect: true },
          { arabic: 'السَّاعَة السَّابِعَة', english: '7 o\'clock', isCorrect: false },
          { arabic: 'السَّاعَة الْخَامِسَة', english: '5 o\'clock', isCorrect: false },
          { arabic: 'السَّاعَة الثَّامِنَة', english: '8 o\'clock', isCorrect: false },
        ],
      },
      {
        id: 'q3-2',
        questionArabic: 'مَاذَا يَشْرَبُ فِي الْفُطُور؟',
        questionEnglish: 'What does he drink for breakfast?',
        options: [
          { arabic: 'الْحَلِيب', english: 'Milk', isCorrect: true },
          { arabic: 'الْقَهْوَة', english: 'Coffee', isCorrect: false },
          { arabic: 'الشَّاي', english: 'Tea', isCorrect: false },
          { arabic: 'الْعَصِير', english: 'Juice', isCorrect: false },
        ],
      },
      {
        id: 'q3-3',
        questionArabic: 'مَتَى يَنَامُ؟',
        questionEnglish: 'When does he sleep?',
        options: [
          { arabic: 'السَّاعَة التَّاسِعَة مَسَاءً', english: '9 PM', isCorrect: true },
          { arabic: 'السَّاعَة الْعَاشِرَة', english: '10 o\'clock', isCorrect: false },
          { arabic: 'السَّاعَة الثَّامِنَة', english: '8 o\'clock', isCorrect: false },
          { arabic: 'السَّاعَة الْحَادِيَة عَشْرَة', english: '11 o\'clock', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 4: At the Restaurant
  {
    id: 'reading-4',
    title: 'At the Restaurant',
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
    vocabulary: ['food-1', 'food-2', 'food-5', 'food-9', 'greeting-11', 'greeting-12'],
    comprehensionQuestions: [
      {
        id: 'q4-1',
        questionArabic: 'مَعَ مَنْ ذَهَبَ إِلَى الْمَطْعَم؟',
        questionEnglish: 'With whom did he go to the restaurant?',
        options: [
          { arabic: 'صَدِيقُهُ', english: 'His friend', isCorrect: true },
          { arabic: 'أَخُوهُ', english: 'His brother', isCorrect: false },
          { arabic: 'أُمُّهُ', english: 'His mother', isCorrect: false },
          { arabic: 'أَبُوهُ', english: 'His father', isCorrect: false },
        ],
      },
      {
        id: 'q4-2',
        questionArabic: 'مَاذَا أَكَلَ الْمُتَكَلِّم؟',
        questionEnglish: 'What did the speaker eat?',
        options: [
          { arabic: 'دَجَاجًا مَشْوِيًّا مَعَ الْأَرُزّ', english: 'Grilled chicken with rice', isCorrect: true },
          { arabic: 'سَمَكًا مَعَ الْخُضَار', english: 'Fish with vegetables', isCorrect: false },
          { arabic: 'لَحْمًا مَعَ الْأَرُزّ', english: 'Meat with rice', isCorrect: false },
          { arabic: 'بِيتْزَا', english: 'Pizza', isCorrect: false },
        ],
      },
      {
        id: 'q4-3',
        questionArabic: 'كَيْفَ كَانَ الطَّعَام؟',
        questionEnglish: 'How was the food?',
        options: [
          { arabic: 'لَذِيذًا جِدًّا', english: 'Very delicious', isCorrect: true },
          { arabic: 'سَيِّئًا', english: 'Bad', isCorrect: false },
          { arabic: 'عَادِيًّا', english: 'Normal', isCorrect: false },
          { arabic: 'بَارِدًا', english: 'Cold', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 5: The Weather
  {
    id: 'reading-5',
    title: 'The Weather',
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
    vocabulary: ['color-2', 'color-1'],
    comprehensionQuestions: [
      {
        id: 'q5-1',
        questionArabic: 'كَيْفَ الطَّقْسُ فِي الصَّيْف؟',
        questionEnglish: 'How is the weather in summer?',
        options: [
          { arabic: 'حَارٌّ جِدًّا', english: 'Very hot', isCorrect: true },
          { arabic: 'بَارِد', english: 'Cold', isCorrect: false },
          { arabic: 'مُعْتَدِل', english: 'Moderate', isCorrect: false },
          { arabic: 'مُمْطِر', english: 'Rainy', isCorrect: false },
        ],
      },
      {
        id: 'q5-2',
        questionArabic: 'مَاذَا يُحِبُّ فِي الصَّيْف؟',
        questionEnglish: 'What does he like in summer?',
        options: [
          { arabic: 'السِّبَاحَة', english: 'Swimming', isCorrect: true },
          { arabic: 'الْقِرَاءَة', english: 'Reading', isCorrect: false },
          { arabic: 'النَّوْم', english: 'Sleeping', isCorrect: false },
          { arabic: 'الطَّبْخ', english: 'Cooking', isCorrect: false },
        ],
      },
      {
        id: 'q5-3',
        questionArabic: 'مَا لَوْنُ السَّمَاء؟',
        questionEnglish: 'What color is the sky?',
        options: [
          { arabic: 'زَرْقَاء', english: 'Blue', isCorrect: true },
          { arabic: 'حَمْرَاء', english: 'Red', isCorrect: false },
          { arabic: 'خَضْرَاء', english: 'Green', isCorrect: false },
          { arabic: 'صَفْرَاء', english: 'Yellow', isCorrect: false },
        ],
      },
    ],
  },

  // TEXT 6: Shopping
  {
    id: 'reading-6',
    title: 'Shopping',
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
    vocabulary: ['food-3', 'food-4', 'color-1', 'color-3', 'color-4', 'number-7', 'number-8', 'number-10'],
    comprehensionQuestions: [
      {
        id: 'q6-1',
        questionArabic: 'أَيْنَ ذَهَبَ؟',
        questionEnglish: 'Where did he go?',
        options: [
          { arabic: 'السُّوق', english: 'The market', isCorrect: true },
          { arabic: 'الْمَدْرَسَة', english: 'The school', isCorrect: false },
          { arabic: 'الْمَطْعَم', english: 'The restaurant', isCorrect: false },
          { arabic: 'الْبَيْت', english: 'The house', isCorrect: false },
        ],
      },
      {
        id: 'q6-2',
        questionArabic: 'مَا لَوْنُ التُّفَّاح؟',
        questionEnglish: 'What color are the apples?',
        options: [
          { arabic: 'أَحْمَر', english: 'Red', isCorrect: true },
          { arabic: 'أَخْضَر', english: 'Green', isCorrect: false },
          { arabic: 'أَصْفَر', english: 'Yellow', isCorrect: false },
          { arabic: 'بُرْتُقَالِي', english: 'Orange', isCorrect: false },
        ],
      },
      {
        id: 'q6-3',
        questionArabic: 'كَمْ دَفَعَ فِي النِّهَايَة؟',
        questionEnglish: 'How much did he pay in the end?',
        options: [
          { arabic: 'ثَمَانِيَة دَرَاهِم', english: 'Eight dirhams', isCorrect: true },
          { arabic: 'عَشَرَة دَرَاهِم', english: 'Ten dirhams', isCorrect: false },
          { arabic: 'سَبْعَة دَرَاهِم', english: 'Seven dirhams', isCorrect: false },
          { arabic: 'خَمْسَة دَرَاهِم', english: 'Five dirhams', isCorrect: false },
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
