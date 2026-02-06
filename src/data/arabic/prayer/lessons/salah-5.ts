// Lesson 5: The Five Prayers in Detail
// الصلوات الخمس بالتفصيل

import { PrayerContent } from '../../../../types/prayer';

export const salah5Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'Detailed Guide to Each Prayer',
    titleArabic: 'تفصيل كل صلاة',
    content: 'Each of the five daily prayers has specific characteristics including the number of rak\'ahs (units), whether recitation is aloud or silent, and recommended Sunnah prayers before or after.',
  },
  {
    type: 'prayer_times_table',
    title: 'Summary of the Five Prayers',
    titleArabic: 'ملخص الصلوات الخمس',
    rows: [
      {
        name: 'Fajr',
        nameArabic: 'الفجر',
        rakaat: 2,
        time: 'Dawn until sunrise',
        recitation: 'Aloud',
        sunnahBefore: 2,
      },
      {
        name: 'Dhuhr',
        nameArabic: 'الظهر',
        rakaat: 4,
        time: 'Sun passes zenith until Asr',
        recitation: 'Silent',
        sunnahBefore: 4,
        sunnahAfter: 2,
      },
      {
        name: 'Asr',
        nameArabic: 'العصر',
        rakaat: 4,
        time: 'Mid-afternoon until sunset',
        recitation: 'Silent',
      },
      {
        name: 'Maghrib',
        nameArabic: 'المغرب',
        rakaat: 3,
        time: 'After sunset until twilight fades',
        recitation: 'First 2 aloud, 3rd silent',
        sunnahAfter: 2,
      },
      {
        name: 'Isha',
        nameArabic: 'العشاء',
        rakaat: 4,
        time: 'After twilight until midnight (or Fajr)',
        recitation: 'First 2 aloud, last 2 silent',
        sunnahAfter: 2,
      },
    ],
  },
  {
    type: 'rule',
    title: 'Fajr Prayer - صلاة الفجر',
    content: '2 rak\'ahs with aloud recitation. It has 2 Sunnah rak\'ahs before it, which the Prophet (peace be upon him) never left, even while traveling. He said: "The two rak\'ahs of Fajr are better than the world and everything in it." (Muslim). Recite Al-Fatihah and a surah in each rak\'ah.',
    icon: 'sunny',
  },
  {
    type: 'rule',
    title: 'Dhuhr Prayer - صلاة الظهر',
    content: '4 rak\'ahs with silent recitation. It has 4 Sunnah rak\'ahs before (2+2) and 2 Sunnah rak\'ahs after. Recite Al-Fatihah and a surah in the first two rak\'ahs. In the 3rd and 4th, recite only Al-Fatihah. Sit for Tashahhud after the 2nd rak\'ah (first Tashahhud) and after the 4th (final Tashahhud).',
    icon: 'partly-sunny',
  },
  {
    type: 'rule',
    title: 'Asr Prayer - صلاة العصر',
    content: '4 rak\'ahs with silent recitation. There are no confirmed Sunnah prayers before or after, though praying 4 rak\'ahs before Asr is encouraged. The Prophet (peace be upon him) warned: "Whoever misses the Asr prayer, it is as if he has lost his family and his wealth." (Bukhari)',
    icon: 'cloud',
  },
  {
    type: 'rule',
    title: 'Maghrib Prayer - صلاة المغرب',
    content: '3 rak\'ahs. The first two are aloud and the third is silent. Sit for Tashahhud after the 2nd rak\'ah, then stand for the 3rd rak\'ah where only Al-Fatihah is recited silently. Sit for the final Tashahhud after the 3rd rak\'ah. There are 2 Sunnah rak\'ahs after.',
    icon: 'moon',
  },
  {
    type: 'rule',
    title: 'Isha Prayer - صلاة العشاء',
    content: '4 rak\'ahs. The first two are aloud and the last two are silent. Structure is like Dhuhr but with aloud recitation in the first two rak\'ahs. It has 2 Sunnah rak\'ahs after, followed by Witr prayer (1 or 3 rak\'ahs) which is strongly recommended.',
    icon: 'cloudy-night',
  },
  {
    type: 'table',
    title: 'Confirmed Sunnah Prayers (Rawatib)',
    titleArabic: 'السنن الرواتب',
    headers: ['Prayer', 'Before', 'After', 'Total Sunnah'],
    rows: [
      ['Fajr', '2', '-', '2'],
      ['Dhuhr', '4 (2+2)', '2', '6'],
      ['Asr', '-', '-', '-'],
      ['Maghrib', '-', '2', '2'],
      ['Isha', '-', '2', '2'],
      ['Total', '6', '6', '12'],
    ],
  },
  {
    type: 'note',
    title: 'The Reward of Sunnah Prayers',
    content: 'The Prophet (peace be upon him) said: "Whoever prays twelve rak\'ahs during the day and night, a house will be built for him in Paradise: four before Dhuhr and two after, two after Maghrib, two after Isha, and two before Fajr." (Tirmidhi)',
  },
  {
    type: 'description',
    title: 'Witr Prayer',
    titleArabic: 'صلاة الوتر',
    content: 'Witr is a highly recommended prayer performed after Isha. It can be 1, 3, 5, 7, 9, or 11 rak\'ahs. The minimum is one rak\'ah. In the last rak\'ah of Witr, it is Sunnah to recite Qunut (a special supplication) after rising from Ruku.',
    arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ',
  },
  {
    type: 'examples_grid',
    title: 'Short Surahs for Prayer',
    titleArabic: 'سور قصيرة للصلاة',
    examples: [
      {
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa Allahu ahad...',
        translation: 'Surah Al-Ikhlas (112) - 4 verses',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Qul a\'udhu bi rabbil-falaq...',
        translation: 'Surah Al-Falaq (113) - 5 verses',
      },
      {
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul a\'udhu bi rabbin-nas...',
        translation: 'Surah An-Nas (114) - 6 verses',
      },
      {
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        transliteration: 'Inna a\'taynaka al-kawthar...',
        translation: 'Surah Al-Kawthar (108) - 3 verses',
      },
    ],
  },
];
