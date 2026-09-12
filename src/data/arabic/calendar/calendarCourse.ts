// The Islamic (Hijri) calendar — a structured course.
// The lunar year, the twelve months and what their names mean, the sacred
// months, the days of the week, reading and writing dates, the year in
// worship, and today's date. Sources are the Quran and authentic hadith,
// each cited where it is used. Bilingual (EN/FR) + Arabic.

export interface CalendarEntry {
  digit?: string;        // position, e.g. ١
  value?: string;        // e.g. "1"
  arabic: string;        // e.g. مُحَرَّم
  translit: string;      // e.g. Muḥarram
  en: string;
  fr: string;
}

export interface CalendarExample {
  arabic: string;
  translit: string;
  en: string;
  fr: string;
}

export type CalendarBlock =
  | { type: 'intro'; text: string; textFr: string }
  | { type: 'entries'; title?: string; titleFr?: string; items: CalendarEntry[] }
  | { type: 'rule'; title: string; titleFr: string; text: string; textFr: string }
  | { type: 'examples'; title?: string; titleFr?: string; items: CalendarExample[] }
  | { type: 'table'; title?: string; titleFr?: string; headers: string[]; headersFr: string[]; rows: string[][]; rowsFr: string[][] }
  | { type: 'tip'; text: string; textFr: string }
  /** A verse or hadith, quoted, with its reference. */
  | { type: 'source'; ref: string; arabic?: string; text: string; textFr: string }
  /** Today's Hijri date and the dates coming up, computed on the phone. */
  | { type: 'today' };

export interface CalendarLesson {
  id: string;
  title: string;
  titleFr: string;
  titleArabic: string;
  subtitle: string;
  subtitleFr: string;
  icon: string;
  color: string;
  blocks: CalendarBlock[];
}

export const CALENDAR_LESSONS: CalendarLesson[] = [
  // ─────────────────────────────────────────────────────────────
  {
    id: 'today',
    title: "Today's Date",
    titleFr: "La date d'aujourd'hui",
    titleArabic: 'تَارِيخُ الْيَوْم',
    subtitle: 'The Hijri date now, and what is coming up',
    subtitleFr: 'La date hégirienne maintenant, et ce qui vient',
    icon: 'today',
    color: '#0ea5e9',
    blocks: [
      { type: 'today' },
      {
        type: 'rule',
        title: 'Why it says "estimate"',
        titleFr: 'Pourquoi il est écrit « estimation »',
        text: 'The Islamic month begins when the new crescent is sighted, not when a table says so. The Prophet ﷺ tied the month to the sighting, and a month is twenty-nine or thirty days depending on it. The date shown here is worked out arithmetically, so your community\'s date may differ from it by one day.',
        textFr: 'Le mois islamique commence quand le nouveau croissant est aperçu, non quand une table le dit. Le Prophète ﷺ a lié le mois à l\'observation, et un mois compte vingt-neuf ou trente jours selon elle. La date affichée ici est calculée, votre communauté peut donc avoir un jour d\'écart.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 1909',
        arabic: 'صُومُوا لِرُؤْيَتِهِ وَأَفْطِرُوا لِرُؤْيَتِهِ، فَإِنْ غُبِّيَ عَلَيْكُمْ فَأَكْمِلُوا عِدَّةَ شَعْبَانَ ثَلَاثِينَ',
        text: 'The Prophet ﷺ said: Fast when you see it, and break your fast when you see it; and if it is obscured from you, then complete the count of Sha\'ban as thirty.',
        textFr: 'Le Prophète ﷺ a dit : Jeûnez à sa vue, et rompez le jeûne à sa vue ; et s\'il vous est caché, complétez le compte de Chaabane à trente.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'hijri-year',
    title: 'The Hijri Year',
    titleFr: "L'année hégirienne",
    titleArabic: 'السَّنَةُ الْهِجْرِيَّة',
    subtitle: 'A lunar year, counted from the Hijrah',
    subtitleFr: 'Une année lunaire, comptée depuis l\'Hégire',
    icon: 'moon',
    color: '#6366f1',
    blocks: [
      {
        type: 'intro',
        text: 'The Islamic calendar is lunar: each month begins with a new crescent, and twelve such months make a year of about 354 days — eleven days shorter than the solar year. That is why Ramadan moves through the seasons, coming about eleven days earlier each year. The years are counted from the Hijrah, the Prophet\'s ﷺ migration to Madinah, and are marked هـ (hijri).',
        textFr: 'Le calendrier islamique est lunaire : chaque mois commence par un nouveau croissant, et douze mois ainsi comptés font une année d\'environ 354 jours — onze de moins que l\'année solaire. C\'est pourquoi le Ramadan traverse les saisons, avançant d\'environ onze jours chaque année. Les années sont comptées depuis l\'Hégire, la migration du Prophète ﷺ à Médine, et marquées هـ (hégirien).',
      },
      {
        type: 'source',
        ref: 'Quran 9:36',
        arabic: 'إِنَّ عِدَّةَ ٱلشُّهُورِ عِندَ ٱللَّهِ ٱثْنَا عَشَرَ شَهْرًا فِى كِتَـٰبِ ٱللَّهِ يَوْمَ خَلَقَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ مِنْهَآ أَرْبَعَةٌ حُرُمٌ',
        text: 'Indeed, the number of months with Allah is twelve months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred.',
        textFr: 'Le nombre de mois, auprès d\'Allah, est de douze mois, dans la prescription d\'Allah, le jour où Il créa les cieux et la terre. Quatre d\'entre eux sont sacrés.',
      },
      {
        type: 'source',
        ref: 'Quran 2:189',
        arabic: 'يَسْـَٔلُونَكَ عَنِ ٱلْأَهِلَّةِ ۖ قُلْ هِىَ مَوَٰقِيتُ لِلنَّاسِ وَٱلْحَجِّ',
        text: 'They ask you about the crescent moons. Say: they are measurements of time for the people and for Hajj.',
        textFr: 'Ils t\'interrogent sur les nouvelles lunes. Dis : elles servent aux gens pour compter le temps, et aussi pour le pèlerinage.',
      },
      {
        type: 'source',
        ref: 'Quran 10:5',
        arabic: 'هُوَ ٱلَّذِى جَعَلَ ٱلشَّمْسَ ضِيَآءً وَٱلْقَمَرَ نُورًا وَقَدَّرَهُۥ مَنَازِلَ لِتَعْلَمُوا۟ عَدَدَ ٱلسِّنِينَ وَٱلْحِسَابَ',
        text: 'It is He who made the sun a shining light and the moon a derived light and determined for it phases, that you may know the number of years and account of time.',
        textFr: 'C\'est Lui qui a fait du soleil une clarté et de la lune une lumière, et Il a déterminé pour celle-ci des phases afin que vous connaissiez le nombre des années et le calcul du temps.',
      },
      {
        type: 'rule',
        title: 'A month is 29 or 30 days',
        titleFr: 'Un mois fait 29 ou 30 jours',
        text: 'A lunar month lasts about 29½ days, so calendar months alternate between 29 and 30, and no Hijri month has 31 days. Which it is depends on when the crescent is seen.',
        textFr: 'Un mois lunaire dure environ 29 jours et demi, les mois du calendrier alternent donc entre 29 et 30, et aucun mois hégirien n\'a 31 jours. Lequel des deux dépend du moment où le croissant est aperçu.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 1913',
        arabic: 'إِنَّا أُمَّةٌ أُمِّيَّةٌ لَا نَكْتُبُ وَلَا نَحْسُبُ، الشَّهْرُ هَكَذَا وَهَكَذَا',
        text: 'The Prophet ﷺ said: We are an unlettered nation; we neither write nor calculate. The month is like this and like this - meaning once twenty-nine and once thirty.',
        textFr: 'Le Prophète ﷺ a dit : Nous sommes une communauté illettrée ; nous n\'écrivons ni ne calculons. Le mois est ainsi et ainsi - c\'est-à-dire tantôt vingt-neuf et tantôt trente.',
      },
      {
        type: 'rule',
        title: 'The day begins at sunset',
        titleFr: 'Le jour commence au coucher du soleil',
        text: 'In the Islamic calendar the night comes before the day: a new date begins at maghrib, not at midnight. So the night of Friday (laylat al-jumu\'ah) is the night that follows Thursday\'s sunset, and the first of Ramadan begins at the sunset after the crescent is seen.',
        textFr: 'Dans le calendrier islamique, la nuit précède le jour : une nouvelle date commence au maghrib, non à minuit. Ainsi la nuit du vendredi (laylat al-joumou\'a) est celle qui suit le coucher du soleil du jeudi, et le premier Ramadan commence au coucher du soleil qui suit l\'observation du croissant.',
      },
      {
        type: 'rule',
        title: 'Year 1: the Hijrah',
        titleFr: 'An 1 : l\'Hégire',
        text: 'The companions chose the Hijrah as the starting point of the count. Sahl ibn Sa\'d said they did not count from the Prophet\'s ﷺ being sent, nor from his death, but from his arrival in Madinah. Year 1 AH corresponds to 622 CE.',
        textFr: 'Les compagnons ont choisi l\'Hégire comme point de départ du compte. Sahl ibn Sa\'d dit qu\'ils ne comptèrent ni depuis l\'envoi du Prophète ﷺ ni depuis sa mort, mais depuis son arrivée à Médine. L\'an 1 de l\'Hégire correspond à 622 de l\'ère chrétienne.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 3934',
        arabic: 'مَا عَدُّوا مِنْ مَبْعَثِ النَّبِيِّ ﷺ وَلَا مِنْ مُتَوَفَّاهُ، مَا عَدُّوا إِلَّا مِنْ مَقْدَمِهِ الْمَدِينَةَ',
        text: 'Sahl ibn Sa\'d said: They did not count from the sending of the Prophet ﷺ, nor from his death; they counted only from his arrival in Madinah.',
        textFr: 'Sahl ibn Sa\'d dit : Ils n\'ont compté ni depuis l\'envoi du Prophète ﷺ ni depuis sa mort ; ils n\'ont compté que depuis son arrivée à Médine.',
      },
      {
        type: 'entries',
        title: 'Words for time',
        titleFr: 'Les mots du temps',
        items: [
          { arabic: 'يَوْم', translit: 'yawm', en: 'day', fr: 'jour' },
          { arabic: 'لَيْلَة', translit: 'layla', en: 'night', fr: 'nuit' },
          { arabic: 'أُسْبُوع', translit: 'usbūʿ', en: 'week', fr: 'semaine' },
          { arabic: 'شَهْر', translit: 'shahr', en: 'month', fr: 'mois' },
          { arabic: 'سَنَة', translit: 'sana', en: 'year', fr: 'année' },
          { arabic: 'عَام', translit: 'ʿām', en: 'year', fr: 'an' },
          { arabic: 'تَقْوِيم', translit: 'taqwīm', en: 'calendar', fr: 'calendrier' },
          { arabic: 'تَارِيخ', translit: 'tārīkh', en: 'date; history', fr: 'date ; histoire' },
          { arabic: 'هِلَال', translit: 'hilāl', en: 'crescent moon', fr: 'croissant de lune' },
          { arabic: 'بَدْر', translit: 'badr', en: 'full moon', fr: 'pleine lune' },
          { arabic: 'هِجْرِيّ', translit: 'hijrī', en: 'Hijri (AH)', fr: 'hégirien' },
          { arabic: 'مِيلَادِيّ', translit: 'mīlādī', en: 'Gregorian (CE)', fr: 'grégorien (ap. J.-C.)' },
        ],
      },
      {
        type: 'tip',
        text: 'Twelve lunar months fall 33 solar years behind every 34 Hijri years, so a Hijri year number is always higher than the same era counted in solar years. That is why 1447 AH falls in 2025-2026 CE, though the Hijrah was 1,404 solar years before 2026.',
        textFr: 'Douze mois lunaires prennent une année de retard tous les 33 ans environ, de sorte que 34 années hégiriennes font 33 années solaires. C\'est pourquoi 1447 de l\'Hégire tombe en 2025-2026, alors que l\'Hégire n\'a eu lieu que 1 404 années solaires avant 2026.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'months',
    title: 'The Twelve Months',
    titleFr: 'Les douze mois',
    titleArabic: 'الشُّهُورُ الْهِجْرِيَّة',
    subtitle: 'Their names, their order, and what the names mean',
    subtitleFr: 'Leurs noms, leur ordre, et le sens des noms',
    icon: 'calendar',
    color: '#22c55e',
    blocks: [
      {
        type: 'intro',
        text: 'The names of the Hijri months are older than Islam: the Arabs named them from the seasons and customs of the year in which they were first fixed. Learn them in order — the order is what the Quran means by "the number of months with Allah is twelve". The meaning given for each name is the one the Arabs themselves gave it.',
        textFr: 'Les noms des mois hégiriens sont plus anciens que l\'islam : les Arabes les ont nommés d\'après les saisons et les usages de l\'année où ils furent fixés. Apprenez-les dans l\'ordre — c\'est cet ordre que vise le Coran par « le nombre des mois auprès d\'Allah est de douze ». Le sens donné pour chaque nom est celui que les Arabes eux-mêmes lui donnaient.',
      },
      {
        type: 'entries',
        title: 'The months in order',
        titleFr: 'Les mois dans l\'ordre',
        items: [
          { digit: '١', value: '1', arabic: 'مُحَرَّم', translit: 'Muḥarram', en: 'the forbidden (sacred) month', fr: 'le mois interdit (sacré)' },
          { digit: '٢', value: '2', arabic: 'صَفَر', translit: 'Ṣafar', en: 'the empty one — houses emptied for travel', fr: 'le vide — les maisons se vidaient pour le voyage' },
          { digit: '٣', value: '3', arabic: 'رَبِيعُ الْأَوَّل', translit: 'Rabīʿ al-Awwal', en: 'the first spring', fr: 'le premier printemps' },
          { digit: '٤', value: '4', arabic: 'رَبِيعُ الثَّانِي', translit: 'Rabīʿ ath-Thānī', en: 'the second spring (also Rabīʿ al-Ākhir)', fr: 'le second printemps (aussi Rabīʿ al-Ākhir)' },
          { digit: '٥', value: '5', arabic: 'جُمَادَى الْأُولَى', translit: 'Jumādā al-Ūlā', en: 'the first of the dry (frozen) months', fr: 'le premier des mois secs (gelés)' },
          { digit: '٦', value: '6', arabic: 'جُمَادَى الْآخِرَة', translit: 'Jumādā al-Ākhira', en: 'the last of the dry months', fr: 'le dernier des mois secs' },
          { digit: '٧', value: '7', arabic: 'رَجَب', translit: 'Rajab', en: 'the revered one — a sacred month', fr: 'le vénéré — un mois sacré' },
          { digit: '٨', value: '8', arabic: 'شَعْبَان', translit: 'Shaʿbān', en: 'the scattering — tribes dispersed for water and raids', fr: 'la dispersion — les tribus se dispersaient pour l\'eau et les razzias' },
          { digit: '٩', value: '9', arabic: 'رَمَضَان', translit: 'Ramaḍān', en: 'the scorching — from the burning heat', fr: 'le brûlant — de la chaleur ardente' },
          { digit: '١٠', value: '10', arabic: 'شَوَّال', translit: 'Shawwāl', en: 'the raising — she-camels raised their tails', fr: 'le relèvement — les chamelles relevaient la queue' },
          { digit: '١١', value: '11', arabic: 'ذُو الْقَعْدَة', translit: 'Dhū al-Qaʿda', en: 'the one of sitting — the Arabs stayed home from war', fr: 'celui de la halte — les Arabes s\'abstenaient de guerre' },
          { digit: '١٢', value: '12', arabic: 'ذُو الْحِجَّة', translit: 'Dhū al-Ḥijja', en: 'the one of the pilgrimage', fr: 'celui du pèlerinage' },
        ],
      },
      {
        type: 'rule',
        title: 'How to say "in the month of"',
        titleFr: 'Comment dire « au mois de »',
        text: 'Use فِي شَهْرِ followed by the month\'s name: فِي شَهْرِ رَمَضَان "in the month of Ramadan". The name alone also works: فِي رَمَضَان. Months with two words keep both: فِي رَبِيعِ الْأَوَّل.',
        textFr: 'Employez فِي شَهْرِ suivi du nom du mois : فِي شَهْرِ رَمَضَان « au mois de Ramadan ». Le nom seul suffit aussi : فِي رَمَضَان. Les mois à deux mots gardent les deux : فِي رَبِيعِ الْأَوَّل.',
      },
      {
        type: 'examples',
        title: 'In sentences',
        titleFr: 'Dans des phrases',
        items: [
          { arabic: 'نَحْنُ فِي شَهْرِ رَمَضَان', translit: 'naḥnu fī shahri Ramaḍān', en: 'We are in the month of Ramadan.', fr: 'Nous sommes au mois de Ramadan.' },
          { arabic: 'الْحَجُّ فِي ذِي الْحِجَّة', translit: 'al-ḥajju fī Dhī l-Ḥijja', en: 'Hajj is in Dhul-Hijjah.', fr: 'Le pèlerinage est en Dhoul-Hijja.' },
          { arabic: 'مُحَرَّمُ أَوَّلُ الشُّهُورِ الْهِجْرِيَّة', translit: 'Muḥarramu awwalu sh-shuhūri l-hijriyya', en: 'Muharram is the first of the Hijri months.', fr: 'Mouharram est le premier des mois hégiriens.' },
          { arabic: 'بَعْدَ شَعْبَانَ يَأْتِي رَمَضَان', translit: 'baʿda Shaʿbāna yaʾtī Ramaḍān', en: 'After Sha\'ban comes Ramadan.', fr: 'Après Chaabane vient le Ramadan.' },
        ],
      },
      {
        type: 'tip',
        text: 'Two pairs are easy to mix up. Rabīʿ al-Awwal and Rabīʿ ath-Thānī are months 3 and 4; Jumādā al-Ūlā and Jumādā al-Ākhira are months 5 and 6. "Awwal/Ūlā" always means the first of the pair.',
        textFr: 'Deux paires se confondent facilement. Rabīʿ al-Awwal et Rabīʿ ath-Thānī sont les mois 3 et 4 ; Jumādā al-Ūlā et Jumādā al-Ākhira sont les mois 5 et 6. « Awwal/Ūlā » désigne toujours le premier de la paire.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'sacred-months',
    title: 'The Sacred Months',
    titleFr: 'Les mois sacrés',
    titleArabic: 'الْأَشْهُرُ الْحُرُم',
    subtitle: 'Four months in which wrongdoing weighs more',
    subtitleFr: 'Quatre mois où le tort pèse davantage',
    icon: 'shield-checkmark',
    color: '#d4af37',
    blocks: [
      {
        type: 'intro',
        text: 'Of the twelve months, the Quran sets four apart as sacred (ḥurum). The Prophet ﷺ named them: three in a row - Dhul-Qa\'dah, Dhul-Hijjah and Muharram - and Rajab, which stands alone between Jumada and Sha\'ban. In them the Quran says: do not wrong yourselves.',
        textFr: 'Parmi les douze mois, le Coran en met quatre à part comme sacrés (ḥurum). Le Prophète ﷺ les a nommés : trois d\'affilée - Dhoul-Qaada, Dhoul-Hijja et Mouharram - et Rajab, seul entre Joumada et Chaabane. En eux, dit le Coran : ne vous faites pas de tort à vous-mêmes.',
      },
      {
        type: 'source',
        ref: 'Quran 9:36',
        arabic: 'مِنْهَآ أَرْبَعَةٌ حُرُمٌ ۚ ذَٰلِكَ ٱلدِّينُ ٱلْقَيِّمُ ۚ فَلَا تَظْلِمُوا۟ فِيهِنَّ أَنفُسَكُمْ',
        text: 'Of these, four are sacred. That is the correct religion, so do not wrong yourselves during them.',
        textFr: 'Quatre d\'entre eux sont sacrés : telle est la religion droite. Ne vous faites donc pas de tort à vous-mêmes durant ces mois.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 3197',
        arabic: 'السَّنَةُ اثْنَا عَشَرَ شَهْرًا، مِنْهَا أَرْبَعَةٌ حُرُمٌ، ثَلَاثٌ مُتَوَالِيَاتٌ: ذُو الْقَعْدَةِ وَذُو الْحِجَّةِ وَالْمُحَرَّمُ، وَرَجَبُ مُضَرَ الَّذِي بَيْنَ جُمَادَى وَشَعْبَانَ',
        text: 'The Prophet ﷺ said: Time has returned to its state on the day Allah created the heavens and the earth. The year is twelve months, of which four are sacred: three consecutive - Dhul-Qa\'dah, Dhul-Hijjah and Muharram - and Rajab of Mudar, which is between Jumada and Sha\'ban.',
        textFr: 'Le Prophète ﷺ a dit : Le temps est revenu à son état du jour où Allah créa les cieux et la terre. L\'année est de douze mois, dont quatre sont sacrés : trois consécutifs - Dhoul-Qaada, Dhoul-Hijja et Mouharram - et Rajab de Moudar, qui se trouve entre Joumada et Chaabane.',
      },
      {
        type: 'entries',
        title: 'The four',
        titleFr: 'Les quatre',
        items: [
          { digit: '١١', value: '11', arabic: 'ذُو الْقَعْدَة', translit: 'Dhū al-Qaʿda', en: 'sacred — before the pilgrimage', fr: 'sacré — avant le pèlerinage' },
          { digit: '١٢', value: '12', arabic: 'ذُو الْحِجَّة', translit: 'Dhū al-Ḥijja', en: 'sacred — the month of Hajj', fr: 'sacré — le mois du Hajj' },
          { digit: '١', value: '1', arabic: 'مُحَرَّم', translit: 'Muḥarram', en: 'sacred — after the pilgrimage', fr: 'sacré — après le pèlerinage' },
          { digit: '٧', value: '7', arabic: 'رَجَب', translit: 'Rajab', en: 'sacred — alone, between Jumada and Sha\'ban', fr: 'sacré — seul, entre Joumada et Chaabane' },
        ],
      },
      {
        type: 'rule',
        title: 'Why three together and one apart',
        titleFr: 'Pourquoi trois ensemble et un à part',
        text: 'The hadith gives the reason in its order: the three consecutive months surround the Hajj, so pilgrims could travel to Makkah and back in safety; Rajab stands alone. The Quran also names the sacred month in the verse on fighting (2:217) and in the verse on Hajj: "Hajj is during known months" (2:197).',
        textFr: 'Le hadith donne la raison par son ordre : les trois mois consécutifs entourent le Hajj, afin que les pèlerins puissent aller à La Mecque et en revenir en sécurité ; Rajab est seul. Le Coran nomme aussi le mois sacré dans le verset sur le combat (2:217) et dans le verset sur le Hajj : « Le pèlerinage a lieu dans des mois connus » (2:197).',
      },
      {
        type: 'tip',
        text: 'Muharram is the only month whose very name is "sacred" (from ḥ-r-m, the same root as ḥarām and the Ḥaram of Makkah). The name is a reminder of the rule.',
        textFr: 'Mouharram est le seul mois dont le nom même signifie « sacré » (racine ḥ-r-m, la même que ḥarām et que le Ḥaram de La Mecque). Le nom rappelle la règle.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'week',
    title: 'The Days of the Week',
    titleFr: 'Les jours de la semaine',
    titleArabic: 'أَيَّامُ الْأُسْبُوع',
    subtitle: 'Seven names, five of them numbers',
    subtitleFr: 'Sept noms, dont cinq sont des nombres',
    icon: 'calendar-number',
    color: '#f97316',
    blocks: [
      {
        type: 'intro',
        text: 'The Arabic week starts on Sunday, and its first five days are simply numbered: the first, the second, the third, the fourth, the fifth. Then comes Friday, the day of gathering, and Saturday, the day of rest. Learn the numbers 1–5 and you already know five days.',
        textFr: 'La semaine arabe commence le dimanche, et ses cinq premiers jours sont simplement numérotés : le premier, le deuxième, le troisième, le quatrième, le cinquième. Puis vient le vendredi, jour du rassemblement, et le samedi, jour du repos. Apprenez les nombres de 1 à 5 et vous connaissez déjà cinq jours.',
      },
      {
        type: 'entries',
        title: 'The seven days',
        titleFr: 'Les sept jours',
        items: [
          { digit: '١', value: 'Sun', arabic: 'الْأَحَد', translit: 'al-Aḥad', en: 'Sunday — "the one", the first', fr: 'dimanche — « l\'un », le premier' },
          { digit: '٢', value: 'Mon', arabic: 'الْاِثْنَيْن', translit: 'al-Ithnayn', en: 'Monday — "the two", the second', fr: 'lundi — « les deux », le deuxième' },
          { digit: '٣', value: 'Tue', arabic: 'الثُّلَاثَاء', translit: 'ath-Thulāthāʾ', en: 'Tuesday — the third', fr: 'mardi — le troisième' },
          { digit: '٤', value: 'Wed', arabic: 'الْأَرْبِعَاء', translit: 'al-Arbiʿāʾ', en: 'Wednesday — the fourth', fr: 'mercredi — le quatrième' },
          { digit: '٥', value: 'Thu', arabic: 'الْخَمِيس', translit: 'al-Khamīs', en: 'Thursday — the fifth', fr: 'jeudi — le cinquième' },
          { digit: '٦', value: 'Fri', arabic: 'الْجُمُعَة', translit: 'al-Jumuʿa', en: 'Friday — the gathering', fr: 'vendredi — le rassemblement' },
          { digit: '٧', value: 'Sat', arabic: 'السَّبْت', translit: 'as-Sabt', en: 'Saturday — the rest, the Sabbath', fr: 'samedi — le repos, le sabbat' },
        ],
      },
      {
        type: 'source',
        ref: 'Quran 62:9',
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ فَٱسْعَوْا۟ إِلَىٰ ذِكْرِ ٱللَّهِ',
        text: 'O you who have believed, when the call is made for prayer on the day of Jumu\'ah, then proceed to the remembrance of Allah.',
        textFr: 'Ô vous qui avez cru ! Quand on appelle à la prière du jour du Vendredi, accourez à l\'invocation d\'Allah.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 854',
        arabic: 'خَيْرُ يَوْمٍ طَلَعَتْ عَلَيْهِ الشَّمْسُ يَوْمُ الْجُمُعَةِ، فِيهِ خُلِقَ آدَمُ، وَفِيهِ أُدْخِلَ الْجَنَّةَ، وَفِيهِ أُخْرِجَ مِنْهَا',
        text: 'The Prophet ﷺ said: The best day on which the sun has risen is Friday: on it Adam was created, on it he was admitted into Paradise, and on it he was expelled from it.',
        textFr: 'Le Prophète ﷺ a dit : Le meilleur jour sur lequel le soleil s\'est levé est le vendredi : ce jour-là Adam fut créé, ce jour-là il fut admis au Paradis, et ce jour-là il en fut fait sortir.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 1162',
        arabic: 'ذَاكَ يَوْمٌ وُلِدْتُ فِيهِ، وَيَوْمٌ بُعِثْتُ أَوْ أُنْزِلَ عَلَيَّ فِيهِ',
        text: 'Asked about fasting on Monday, the Prophet ﷺ said: That is the day I was born, and the day I was sent - or on which revelation came down to me.',
        textFr: 'Interrogé sur le jeûne du lundi, le Prophète ﷺ a dit : C\'est le jour où je suis né, et le jour où j\'ai été envoyé - ou bien où la révélation est descendue sur moi.',
      },
      {
        type: 'rule',
        title: 'Saying "on Monday"',
        titleFr: 'Dire « lundi »',
        text: 'Put يَوْم before the name for "the day of": يَوْمُ الْجُمُعَة "Friday". For "on Friday" use يَوْمَ الْجُمُعَة (accusative) or simply the name. "Every Friday" is كُلَّ جُمُعَة.',
        textFr: 'Mettez يَوْم devant le nom pour « le jour de » : يَوْمُ الْجُمُعَة « le vendredi ». Pour « (le) vendredi » en complément de temps, employez يَوْمَ الْجُمُعَة (accusatif) ou simplement le nom. « Chaque vendredi » se dit كُلَّ جُمُعَة.',
      },
      {
        type: 'examples',
        title: 'In sentences',
        titleFr: 'Dans des phrases',
        items: [
          { arabic: 'الْيَوْمَ الْجُمُعَة', translit: 'al-yawma l-jumuʿa', en: 'Today is Friday.', fr: 'Aujourd\'hui c\'est vendredi.' },
          { arabic: 'أَصُومُ يَوْمَ الْاِثْنَيْنِ وَالْخَمِيس', translit: 'aṣūmu yawma l-ithnayni wa-l-khamīs', en: 'I fast on Monday and Thursday.', fr: 'Je jeûne le lundi et le jeudi.' },
          { arabic: 'الدَّرْسُ يَوْمَ السَّبْت', translit: 'ad-darsu yawma s-sabt', en: 'The lesson is on Saturday.', fr: 'Le cours est le samedi.' },
          { arabic: 'غَدًا الْأَحَد', translit: 'ghadan al-aḥad', en: 'Tomorrow is Sunday.', fr: 'Demain c\'est dimanche.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'dates',
    title: 'Reading and Writing a Date',
    titleFr: 'Lire et écrire une date',
    titleArabic: 'كِتَابَةُ التَّارِيخ',
    subtitle: 'Day, month, year - in both calendars',
    subtitleFr: 'Jour, mois, année - dans les deux calendriers',
    icon: 'create',
    color: '#8b5cf6',
    blocks: [
      {
        type: 'intro',
        text: 'An Arabic date is written day - month - year, with the digits in Arabic-Indic numerals and a marker at the end: هـ for a Hijri year, م for a Gregorian one. The numbers read left to right even inside right-to-left text.',
        textFr: 'Une date en arabe s\'écrit jour - mois - année, avec les chiffres arabo-indiens et une marque à la fin : هـ pour une année hégirienne, م pour une année grégorienne. Les nombres se lisent de gauche à droite même dans un texte de droite à gauche.',
      },
      {
        type: 'examples',
        title: 'Dates as they are written',
        titleFr: 'Des dates telles qu\'on les écrit',
        items: [
          { arabic: '١٠ مُحَرَّم ١٤٤٧ هـ', translit: '10 Muḥarram 1447 h', en: '10 Muharram 1447 AH', fr: '10 Mouharram 1447 H' },
          { arabic: '١ رَمَضَان ١٤٤٧ هـ', translit: '1 Ramaḍān 1447 h', en: '1 Ramadan 1447 AH', fr: '1er Ramadan 1447 H' },
          { arabic: '١٢ سِبْتَمْبِر ٢٠٢٦ م', translit: '12 Sibtambir 2026 m', en: '12 September 2026 CE', fr: '12 septembre 2026' },
          { arabic: 'الْعَاشِرُ مِنْ ذِي الْحِجَّة', translit: 'al-ʿāshiru min Dhī l-Ḥijja', en: 'the tenth of Dhul-Hijjah', fr: 'le dix Dhoul-Hijja' },
        ],
      },
      {
        type: 'rule',
        title: 'Saying the day of the month',
        titleFr: 'Dire le quantième du mois',
        text: 'In speech the day is an ordinal followed by مِنْ and the month: الْأَوَّلُ مِنْ رَمَضَان "the first of Ramadan", الْخَامِسُ مِنْ شَوَّال "the fifth of Shawwal". Ordinals above ten are formed as in the Numbers course: الْحَادِي عَشَرَ "the eleventh", الْعِشْرُونَ "the twentieth".',
        textFr: 'À l\'oral, le jour est un ordinal suivi de مِنْ et du mois : الْأَوَّلُ مِنْ رَمَضَان « le premier Ramadan », الْخَامِسُ مِنْ شَوَّال « le cinq Chawwal ». Les ordinaux au-delà de dix se forment comme dans le cours des nombres : الْحَادِي عَشَرَ « le onzième », الْعِشْرُونَ « le vingtième ».',
      },
      {
        type: 'table',
        title: 'The Gregorian months in Arabic',
        titleFr: 'Les mois grégoriens en arabe',
        headers: ['Month', 'Egypt & Gulf', 'Levant & Iraq'],
        headersFr: ['Mois', 'Égypte & Golfe', 'Levant & Irak'],
        rows: [
          ['January', 'يَنَايِر', 'كَانُون الثَّانِي'],
          ['February', 'فِبْرَايِر', 'شُبَاط'],
          ['March', 'مَارِس', 'آذَار'],
          ['April', 'أَبْرِيل', 'نَيْسَان'],
          ['May', 'مَايُو', 'أَيَّار'],
          ['June', 'يُونْيُو', 'حُزَيْرَان'],
          ['July', 'يُولْيُو', 'تَمُّوز'],
          ['August', 'أَغُسْطُس', 'آب'],
          ['September', 'سِبْتَمْبِر', 'أَيْلُول'],
          ['October', 'أُكْتُوبَر', 'تِشْرِين الْأَوَّل'],
          ['November', 'نُوفَمْبِر', 'تِشْرِين الثَّانِي'],
          ['December', 'دِيسَمْبِر', 'كَانُون الْأَوَّل'],
        ],
        rowsFr: [
          ['janvier', 'يَنَايِر', 'كَانُون الثَّانِي'],
          ['février', 'فِبْرَايِر', 'شُبَاط'],
          ['mars', 'مَارِس', 'آذَار'],
          ['avril', 'أَبْرِيل', 'نَيْسَان'],
          ['mai', 'مَايُو', 'أَيَّار'],
          ['juin', 'يُونْيُو', 'حُزَيْرَان'],
          ['juillet', 'يُولْيُو', 'تَمُّوز'],
          ['août', 'أَغُسْطُس', 'آب'],
          ['septembre', 'سِبْتَمْبِر', 'أَيْلُول'],
          ['octobre', 'أُكْتُوبَر', 'تِشْرِين الْأَوَّل'],
          ['novembre', 'نُوفَمْبِر', 'تِشْرِين الثَّانِي'],
          ['décembre', 'دِيسَمْبِر', 'كَانُون الْأَوَّل'],
        ],
      },
      {
        type: 'rule',
        title: 'Two sets of Gregorian names',
        titleFr: 'Deux séries de noms grégoriens',
        text: 'Egypt, North Africa and the Gulf use names borrowed from European languages (يَنَايِر, فِبْرَايِر…). Syria, Lebanon, Jordan, Palestine and Iraq use the old Semitic names (كَانُون الثَّانِي, شُبَاط…). Newspapers often print both.',
        textFr: 'L\'Égypte, le Maghreb et le Golfe emploient des noms empruntés aux langues européennes (يَنَايِر, فِبْرَايِر…). La Syrie, le Liban, la Jordanie, la Palestine et l\'Irak emploient les anciens noms sémitiques (كَانُون الثَّانِي, شُبَاط…). Les journaux impriment souvent les deux.',
      },
      {
        type: 'entries',
        title: 'Today, tomorrow, next year',
        titleFr: 'Aujourd\'hui, demain, l\'an prochain',
        items: [
          { arabic: 'الْيَوْم', translit: 'al-yawm', en: 'today', fr: 'aujourd\'hui' },
          { arabic: 'غَدًا', translit: 'ghadan', en: 'tomorrow', fr: 'demain' },
          { arabic: 'أَمْسِ', translit: 'amsi', en: 'yesterday', fr: 'hier' },
          { arabic: 'هٰذَا الْأُسْبُوع', translit: 'hādhā l-usbūʿ', en: 'this week', fr: 'cette semaine' },
          { arabic: 'الشَّهْرَ الْقَادِم', translit: 'ash-shahra l-qādim', en: 'next month', fr: 'le mois prochain' },
          { arabic: 'الْعَامَ الْمَاضِي', translit: 'al-ʿāma l-māḍī', en: 'last year', fr: 'l\'année dernière' },
          { arabic: 'أَوَّلُ الشَّهْر', translit: 'awwalu sh-shahr', en: 'the start of the month', fr: 'le début du mois' },
          { arabic: 'آخِرُ الشَّهْر', translit: 'ākhiru sh-shahr', en: 'the end of the month', fr: 'la fin du mois' },
        ],
      },
      {
        type: 'examples',
        title: 'Asking the date',
        titleFr: 'Demander la date',
        items: [
          { arabic: 'مَا تَارِيخُ الْيَوْم؟', translit: 'mā tārīkhu l-yawm?', en: 'What is today\'s date?', fr: 'Quelle est la date d\'aujourd\'hui ?' },
          { arabic: 'كَمِ الشَّهْرُ الْهِجْرِيُّ الْآن؟', translit: 'kami sh-shahru l-hijriyyu l-ān?', en: 'Which Hijri month is it now?', fr: 'Quel est le mois hégirien maintenant ?' },
          { arabic: 'الْيَوْمَ الْخَامِسُ مِنْ شَعْبَان', translit: 'al-yawma l-khāmisu min Shaʿbān', en: 'Today is the fifth of Sha\'ban.', fr: 'Aujourd\'hui c\'est le cinq Chaabane.' },
          { arabic: 'وُلِدْتُ سَنَةَ ١٤١٠ هـ', translit: 'wulidtu sanata 1410 h', en: 'I was born in the year 1410 AH.', fr: 'Je suis né en l\'an 1410 de l\'Hégire.' },
        ],
      },
      {
        type: 'tip',
        text: 'هـ is the letter hāʾ with a small tail, short for هِجْرِيّ; م is mīm, short for مِيلَادِيّ ("of the birth", i.e. the Christian era). You will see both on official documents, one after the other.',
        textFr: 'هـ est la lettre hāʾ avec une petite queue, abréviation de هِجْرِيّ ; م est le mīm, abréviation de مِيلَادِيّ (« de la naissance », l\'ère chrétienne). On voit les deux sur les documents officiels, l\'une après l\'autre.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'year-of-worship',
    title: 'The Year in Worship',
    titleFr: "L'année de l'adoration",
    titleArabic: 'الْعِبَادَاتُ عَلَى مَدَارِ السَّنَة',
    subtitle: 'The dates the Quran and the Sunnah mark out',
    subtitleFr: 'Les dates que marquent le Coran et la Sunna',
    icon: 'star',
    color: '#10b981',
    blocks: [
      {
        type: 'intro',
        text: 'Some days of the Hijri year carry acts of worship that the Quran or the Prophet ﷺ tied to them. Here they are in the order of the year, each with its source. Where a date is widely observed but not given in the Quran or an authentic hadith, that is said too.',
        textFr: 'Certains jours de l\'année hégirienne portent des actes d\'adoration que le Coran ou le Prophète ﷺ leur ont liés. Les voici dans l\'ordre de l\'année, chacun avec sa source. Là où une date est largement observée sans être donnée par le Coran ou un hadith authentique, cela est dit aussi.',
      },
      {
        type: 'rule',
        title: '10 Muharram - Ashura',
        titleFr: '10 Mouharram - Achoura',
        text: 'The Prophet ﷺ fasted the day of Ashura and told the companions to fast it, and said that fasting it expiates the past year. Near the end of his life he said he would fast the ninth as well, if he lived to the next year.',
        textFr: 'Le Prophète ﷺ jeûna le jour d\'Achoura et dit aux compagnons de le jeûner, et dit que ce jeûne expie l\'année écoulée. Vers la fin de sa vie, il dit qu\'il jeûnerait aussi le neuvième, s\'il vivait jusqu\'à l\'année suivante.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 2004',
        text: 'Ibn Abbas said: The Prophet ﷺ came to Madinah and found the Jews fasting on the day of Ashura. He said: What is this? They said: This is a righteous day; it is the day Allah saved the Children of Israel from their enemy, so Musa fasted it. He said: We have more right to Musa than you. So he fasted it and ordered that it be fasted.',
        textFr: 'Ibn Abbas dit : Le Prophète ﷺ arriva à Médine et trouva les Juifs jeûnant le jour d\'Achoura. Il dit : Qu\'est-ce que c\'est ? Ils dirent : C\'est un jour vertueux ; c\'est le jour où Allah sauva les enfants d\'Israël de leur ennemi, alors Moussa le jeûna. Il dit : Nous avons plus de droit sur Moussa que vous. Il le jeûna donc et ordonna de le jeûner.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 1162',
        text: 'The Prophet ﷺ said: Fasting the day of Arafah - I hope from Allah that it expiates the year before it and the year after it. And fasting the day of Ashura - I hope from Allah that it expiates the year before it.',
        textFr: 'Le Prophète ﷺ a dit : Le jeûne du jour d\'Arafat - j\'espère d\'Allah qu\'il expie l\'année qui le précède et l\'année qui le suit. Et le jeûne du jour d\'Achoura - j\'espère d\'Allah qu\'il expie l\'année qui le précède.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 1134',
        text: 'The Prophet ﷺ said: If I remain until next year, I will surely fast the ninth.',
        textFr: 'Le Prophète ﷺ a dit : Si je suis encore en vie l\'an prochain, je jeûnerai certes le neuvième.',
      },
      {
        type: 'rule',
        title: '12 Rabi\' al-Awwal',
        titleFr: '12 Rabi al-Awwal',
        text: 'Many mark this date as the Prophet\'s ﷺ birthday. What the authentic sources give is the day of the week: he was born on a Monday (Sahih Muslim 1162, in the lesson on the days of the week). Neither the Quran nor an authentic hadith gives the date of the month, and the Prophet ﷺ marked his birth by fasting Mondays, not by a yearly day.',
        textFr: 'Beaucoup marquent cette date comme l\'anniversaire du Prophète ﷺ. Ce que donnent les sources authentiques, c\'est le jour de la semaine : il est né un lundi (Sahih Mouslim 1162, dans la leçon sur les jours de la semaine). Ni le Coran ni un hadith authentique ne donnent la date du mois, et le Prophète ﷺ marquait sa naissance en jeûnant le lundi, non par un jour annuel.',
      },
      {
        type: 'rule',
        title: 'Sha\'ban - the month before',
        titleFr: 'Chaabane - le mois d\'avant',
        text: 'Aisha said she never saw the Prophet ﷺ fast a whole month except Ramadan, and never saw him fast more in any month than in Sha\'ban.',
        textFr: 'Aïcha dit qu\'elle ne vit jamais le Prophète ﷺ jeûner un mois entier sauf le Ramadan, et ne le vit jamais jeûner davantage en aucun mois qu\'en Chaabane.',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 1969',
        text: 'Aisha said: I never saw the Messenger of Allah ﷺ complete the fast of a month except Ramadan, and I never saw him fast more in any month than in Sha\'ban.',
        textFr: 'Aïcha dit : Je n\'ai jamais vu le Messager d\'Allah ﷺ compléter le jeûne d\'un mois sauf le Ramadan, et je ne l\'ai jamais vu jeûner davantage en aucun mois qu\'en Chaabane.',
      },
      {
        type: 'rule',
        title: 'Ramadan - the month of the Quran',
        titleFr: 'Ramadan - le mois du Coran',
        text: 'Ramadan is the only month named in the Quran, and it is named as the month in which the Quran was sent down. Fasting it is obligatory for whoever witnesses the month. Laylat al-Qadr, better than a thousand months, is to be sought in the odd nights of its last ten.',
        textFr: 'Ramadan est le seul mois nommé dans le Coran, et il est nommé comme le mois où le Coran fut descendu. Le jeûner est obligatoire pour quiconque est présent durant le mois. Laylat al-Qadr, meilleure que mille mois, est à chercher dans les nuits impaires de ses dix derniers jours.',
      },
      {
        type: 'source',
        ref: 'Quran 2:185',
        arabic: 'شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ هُدًى لِّلنَّاسِ وَبَيِّنَـٰتٍ مِّنَ ٱلْهُدَىٰ وَٱلْفُرْقَانِ ۚ فَمَن شَهِدَ مِنكُمُ ٱلشَّهْرَ فَلْيَصُمْهُ',
        text: 'The month of Ramadan in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion. So whoever sights the month, let him fast it.',
        textFr: 'Le mois de Ramadan au cours duquel le Coran a été descendu comme guide pour les gens, et preuves claires de la bonne direction et du discernement. Donc, quiconque d\'entre vous est présent en ce mois, qu\'il jeûne !',
      },
      {
        type: 'source',
        ref: 'Sahih al-Bukhari 2017',
        text: 'The Prophet ﷺ said: Seek Laylat al-Qadr in the odd nights of the last ten of Ramadan.',
        textFr: 'Le Prophète ﷺ a dit : Cherchez Laylat al-Qadr dans les nuits impaires des dix derniers jours de Ramadan.',
      },
      {
        type: 'rule',
        title: '1 Shawwal - Eid al-Fitr, then six days',
        titleFr: '1 Chawwal - Aïd al-Fitr, puis six jours',
        text: 'The first of Shawwal is Eid al-Fitr, the feast of breaking the fast; fasting is forbidden on it. The Prophet ﷺ said that six days fasted in Shawwal after Ramadan make the fast of a whole year.',
        textFr: 'Le premier Chawwal est l\'Aïd al-Fitr, la fête de la rupture du jeûne ; il est interdit de jeûner ce jour-là. Le Prophète ﷺ a dit que six jours jeûnés en Chawwal après le Ramadan font le jeûne d\'une année entière.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 1164',
        text: 'The Prophet ﷺ said: Whoever fasts Ramadan and then follows it with six days of Shawwal, it is as if he fasted the whole year.',
        textFr: 'Le Prophète ﷺ a dit : Quiconque jeûne le Ramadan puis le fait suivre de six jours de Chawwal, c\'est comme s\'il avait jeûné toute l\'année.',
      },
      {
        type: 'rule',
        title: 'Dhul-Hijjah - Arafah, Eid al-Adha, and the days of Tashriq',
        titleFr: 'Dhoul-Hijja - Arafat, Aïd al-Adha, et les jours de Tachriq',
        text: 'The Hajj falls in Dhul-Hijjah: the pilgrims stand at Arafah on the 9th, and the 10th is Eid al-Adha, the feast of sacrifice. For those not on Hajj, fasting the day of Arafah expiates two years (Sahih Muslim 1162, above). The 11th, 12th and 13th are the days of Tashriq, on which fasting is not done.',
        textFr: 'Le Hajj tombe en Dhoul-Hijja : les pèlerins se tiennent à Arafat le 9, et le 10 est l\'Aïd al-Adha, la fête du sacrifice. Pour ceux qui ne sont pas au Hajj, jeûner le jour d\'Arafat expie deux années (Sahih Mouslim 1162, ci-dessus). Les 11, 12 et 13 sont les jours de Tachriq, où l\'on ne jeûne pas.',
      },
      {
        type: 'source',
        ref: 'Quran 2:197',
        arabic: 'ٱلْحَجُّ أَشْهُرٌ مَّعْلُومَـٰتٌ',
        text: 'Hajj is during well-known months.',
        textFr: 'Le pèlerinage a lieu dans des mois connus.',
      },
      {
        type: 'source',
        ref: 'Sahih Muslim 1141',
        text: 'The Prophet ﷺ said: The days of Tashriq are days of eating and drinking, and of remembrance of Allah.',
        textFr: 'Le Prophète ﷺ a dit : Les jours de Tachriq sont des jours de nourriture et de boisson, et de rappel d\'Allah.',
      },
      {
        type: 'tip',
        text: 'Two days of the year are named for what happened on them: يَوْمُ عَرَفَة "the day of Arafah" and يَوْمُ عَاشُورَاء "the day of Ashura" (from عَشَرَة, ten - the tenth of Muharram).',
        textFr: 'Deux jours de l\'année portent le nom de ce qui s\'y passe : يَوْمُ عَرَفَة « le jour d\'Arafat » et يَوْمُ عَاشُورَاء « le jour d\'Achoura » (de عَشَرَة, dix - le dix Mouharram).',
      },
    ],
  },
];

export function getCalendarLesson(id: string | undefined): CalendarLesson | undefined {
  if (!id) return undefined;
  return CALENDAR_LESSONS.find((l) => l.id === id);
}

/** The dates the "today" block counts down to, as Hijri month/day pairs. */
export const CALENDAR_EVENTS: { month: number; day: number; en: string; fr: string; arabic: string }[] = [
  { month: 1, day: 1, en: 'New Hijri year', fr: 'Nouvel an hégirien', arabic: 'رَأْسُ السَّنَةِ الْهِجْرِيَّة' },
  { month: 1, day: 10, en: 'Day of Ashura', fr: "Jour d'Achoura", arabic: 'يَوْمُ عَاشُورَاء' },
  { month: 9, day: 1, en: 'Ramadan begins', fr: 'Début du Ramadan', arabic: 'أَوَّلُ رَمَضَان' },
  { month: 9, day: 21, en: 'The last ten nights of Ramadan', fr: 'Les dix dernières nuits du Ramadan', arabic: 'الْعَشْرُ الْأَوَاخِرُ مِنْ رَمَضَان' },
  { month: 10, day: 1, en: 'Eid al-Fitr', fr: 'Aïd al-Fitr', arabic: 'عِيدُ الْفِطْر' },
  { month: 12, day: 9, en: 'Day of Arafah', fr: "Jour d'Arafat", arabic: 'يَوْمُ عَرَفَة' },
  { month: 12, day: 10, en: 'Eid al-Adha', fr: 'Aïd al-Adha', arabic: 'عِيدُ الْأَضْحَى' },
];
