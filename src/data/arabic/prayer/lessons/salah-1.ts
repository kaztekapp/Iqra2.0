// Lesson 1: The Importance of Salah
// أهمية الصلاة

import { PrayerContent } from '../../../../types/prayer';

export const salah1Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'The Pillar of Islam',
    titleArabic: 'عمود الإسلام',
    content: 'Salah (prayer) is the second pillar of Islam and the most important act of worship after the declaration of faith (Shahada). It is the direct connection between the servant and Allah.',
    arabic: 'الصَّلَاةُ عِمَادُ الدِّينِ',
  },
  {
    type: 'rule',
    title: 'Obligation',
    content: 'Salah is obligatory (Fard) upon every sane, adult Muslim. It was prescribed during the night journey (Al-Isra wal-Mi\'raj) and is the first thing a person will be asked about on the Day of Judgment.',
    icon: 'alert-circle',
  },
  {
    type: 'examples_grid',
    title: 'Quranic Verses on Salah',
    titleArabic: 'آيات قرآنية عن الصلاة',
    examples: [
      {
        arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
        transliteration: 'Wa aqimus-salata wa atuz-zakata',
        translation: 'And establish prayer and give zakah (Al-Baqarah 2:43)',
      },
      {
        arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
        transliteration: 'Innas-salata kanat \'alal-mu\'mineena kitabam mawquta',
        translation: 'Indeed, prayer has been decreed upon the believers at specified times (An-Nisa 4:103)',
      },
      {
        arabic: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
        transliteration: 'Innas-salata tanha \'anil-fahsha\'i wal-munkar',
        translation: 'Indeed, prayer prohibits immorality and wrongdoing (Al-Ankabut 29:45)',
      },
      {
        arabic: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
        transliteration: 'Qad aflaha al-mu\'minoon, alladhina hum fi salatihim khashi\'oon',
        translation: 'Successful indeed are the believers, those who are humble in their prayers (Al-Mu\'minun 23:1-2)',
      },
    ],
  },
  {
    type: 'prayer_times_table',
    title: 'The Five Daily Prayers',
    titleArabic: 'الصلوات الخمس',
    rows: [
      {
        name: 'Fajr',
        nameArabic: 'الفجر',
        rakaat: 2,
        time: 'Dawn to sunrise',
        recitation: 'Aloud',
        sunnahBefore: 2,
      },
      {
        name: 'Dhuhr',
        nameArabic: 'الظهر',
        rakaat: 4,
        time: 'After midday',
        recitation: 'Silent',
        sunnahBefore: 4,
        sunnahAfter: 2,
      },
      {
        name: 'Asr',
        nameArabic: 'العصر',
        rakaat: 4,
        time: 'Afternoon',
        recitation: 'Silent',
      },
      {
        name: 'Maghrib',
        nameArabic: 'المغرب',
        rakaat: 3,
        time: 'After sunset',
        recitation: 'First 2 aloud',
        sunnahAfter: 2,
      },
      {
        name: 'Isha',
        nameArabic: 'العشاء',
        rakaat: 4,
        time: 'Night',
        recitation: 'First 2 aloud',
        sunnahAfter: 2,
      },
    ],
  },
  {
    type: 'note',
    title: 'Hadith on the Importance of Salah',
    content: 'The Prophet (peace be upon him) said: "The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is bad, then the rest of his deeds will be bad." (At-Tabarani)',
  },
  {
    type: 'text',
    title: 'Benefits of Salah',
    content: 'Prayer purifies the soul, brings peace to the heart, strengthens the connection with Allah, teaches discipline and time management, and builds community bonds when prayed in congregation. It is a shield against sin and a source of guidance and comfort in times of difficulty.',
  },
  {
    type: 'description',
    title: 'The Prophet\'s Advice',
    titleArabic: 'وصية النبي ﷺ',
    content: 'The last words of the Prophet Muhammad (peace be upon him) before his passing included: "The prayer, the prayer! And fear Allah regarding those whom your right hands possess."',
    arabic: 'الصَّلَاةَ الصَّلَاةَ وَمَا مَلَكَتْ أَيْمَانُكُمْ',
  },
];
