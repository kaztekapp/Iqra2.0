/**
 * Who the app's material comes from, as their terms ask to be credited.
 *
 * Every entry names the work, says what the app uses it for, and links to its
 * source; the fonts also name their licence. Checked against each source's
 * published terms on 2026-11-06 (Quran Foundation developer terms, Tanzil,
 * everyayah, SIL Open Font License).
 */

export interface Credit {
  name: string;
  detail: string;
  url: string;
  /** What the link shows: the host, so the reader knows where it goes. */
  link: string;
}

export interface CreditGroup {
  title: string;
  credits: Credit[];
}

const RECITERS =
  'Mishary Rashid Alafasy, Abdul Basit Abdul Samad, Mahmoud Khalil Al-Husary, Mohamed Siddiq Al-Minshawi, Abdul Rahman Al-Sudais, Saad Al-Ghamdi, Hani Ar-Rifai';

const OFL = { url: 'https://openfontlicense.org', link: 'openfontlicense.org' };

export const ACKNOWLEDGEMENTS: Record<'en' | 'fr', { intro: string; groups: CreditGroup[] }> = {
  en: {
    intro: 'Mudarris is built on the work of others. These are its sources, credited as their terms ask.',
    groups: [
      {
        title: 'The Quran',
        credits: [
          { name: 'Quran.com, Quran Foundation', detail: 'The Quran text in Uthmani script and the word-by-word meanings.', url: 'https://quran.com', link: 'quran.com' },
          { name: 'Saheeh International', detail: 'The English translation of the meanings.', url: 'https://quran.com', link: 'quran.com' },
          { name: 'Muhammad Hamidullah', detail: 'The French translation of the meanings, in the edition revised by the King Fahd Glorious Quran Printing Complex.', url: 'https://qurancomplex.gov.sa', link: 'qurancomplex.gov.sa' },
        ],
      },
      {
        title: 'Recitations',
        credits: [
          { name: 'EveryAyah', detail: `Verse-by-verse recitations by ${RECITERS}.`, url: 'https://everyayah.com', link: 'everyayah.com' },
          { name: 'Islamic Network', detail: 'Recitations served for the reader and the memorization player.', url: 'https://alquran.cloud', link: 'alquran.cloud' },
        ],
      },
      {
        title: 'Voices',
        credits: [
          { name: 'Microsoft Azure AI Speech', detail: 'The learning voices that read the Arabic, the stories and the lessons.', url: 'https://azure.microsoft.com/products/ai-services/text-to-speech', link: 'azure.microsoft.com' },
        ],
      },
      {
        title: 'Fonts',
        credits: [
          { name: 'Amiri and Amiri Quran', detail: 'By Khaled Hosny. SIL Open Font License 1.1.', url: 'https://github.com/aliftype/amiri', link: 'github.com/aliftype/amiri' },
          { name: 'Aref Ruqaa', detail: 'By Abdullah Aref and Khaled Hosny. SIL Open Font License 1.1.', url: 'https://github.com/aliftype/aref-ruqaa', link: 'github.com/aliftype/aref-ruqaa' },
          { name: 'Noto Nastaliq Urdu', detail: 'By Google. SIL Open Font License 1.1.', url: 'https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu', link: 'fonts.google.com' },
          { name: 'Space Mono', detail: 'By Colophon Foundry. SIL Open Font License 1.1.', url: 'https://fonts.google.com/specimen/Space+Mono', link: 'fonts.google.com' },
          { name: 'SIL Open Font License 1.1', detail: 'The licence the fonts above are used under.', ...OFL },
        ],
      },
      {
        title: 'Icons',
        credits: [
          { name: 'Ionicons', detail: 'By Ionic. MIT License.', url: 'https://ionic.io/ionicons', link: 'ionic.io/ionicons' },
          { name: 'Font Awesome Free', detail: 'By Fonticons. Icons under CC BY 4.0.', url: 'https://fontawesome.com/license/free', link: 'fontawesome.com' },
        ],
      },
      {
        title: 'Hadith',
        credits: [
          { name: 'The collections of hadith', detail: 'Each hadith names its collection and number. Their English and French renderings are the app’s own.', url: 'https://sunnah.com', link: 'sunnah.com' },
        ],
      },
    ],
  },
  fr: {
    intro: 'Mudarris repose sur le travail d’autres. Voici ses sources, citées comme leurs conditions le demandent.',
    groups: [
      {
        title: 'Le Coran',
        credits: [
          { name: 'Quran.com, Quran Foundation', detail: 'Le texte du Coran en écriture uthmanie et le sens mot à mot.', url: 'https://quran.com', link: 'quran.com' },
          { name: 'Saheeh International', detail: 'La traduction anglaise du sens.', url: 'https://quran.com', link: 'quran.com' },
          { name: 'Muhammad Hamidullah', detail: 'La traduction française du sens, dans l’édition révisée par le Complexe du Roi Fahd pour l’impression du Noble Coran.', url: 'https://qurancomplex.gov.sa', link: 'qurancomplex.gov.sa' },
        ],
      },
      {
        title: 'Récitations',
        credits: [
          { name: 'EveryAyah', detail: `Récitations verset par verset de ${RECITERS}.`, url: 'https://everyayah.com', link: 'everyayah.com' },
          { name: 'Islamic Network', detail: 'Récitations pour la lecture et la mémorisation.', url: 'https://alquran.cloud', link: 'alquran.cloud' },
        ],
      },
      {
        title: 'Voix',
        credits: [
          { name: 'Microsoft Azure AI Speech', detail: 'Les voix d’apprentissage qui lisent l’arabe, les histoires et les leçons.', url: 'https://azure.microsoft.com/products/ai-services/text-to-speech', link: 'azure.microsoft.com' },
        ],
      },
      {
        title: 'Polices',
        credits: [
          { name: 'Amiri et Amiri Quran', detail: 'De Khaled Hosny. SIL Open Font License 1.1.', url: 'https://github.com/aliftype/amiri', link: 'github.com/aliftype/amiri' },
          { name: 'Aref Ruqaa', detail: 'De Abdullah Aref et Khaled Hosny. SIL Open Font License 1.1.', url: 'https://github.com/aliftype/aref-ruqaa', link: 'github.com/aliftype/aref-ruqaa' },
          { name: 'Noto Nastaliq Urdu', detail: 'De Google. SIL Open Font License 1.1.', url: 'https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu', link: 'fonts.google.com' },
          { name: 'Space Mono', detail: 'De Colophon Foundry. SIL Open Font License 1.1.', url: 'https://fonts.google.com/specimen/Space+Mono', link: 'fonts.google.com' },
          { name: 'SIL Open Font License 1.1', detail: 'La licence sous laquelle ces polices sont utilisées.', ...OFL },
        ],
      },
      {
        title: 'Icônes',
        credits: [
          { name: 'Ionicons', detail: 'D’Ionic. Licence MIT.', url: 'https://ionic.io/ionicons', link: 'ionic.io/ionicons' },
          { name: 'Font Awesome Free', detail: 'De Fonticons. Icônes sous CC BY 4.0.', url: 'https://fontawesome.com/license/free', link: 'fontawesome.com' },
        ],
      },
      {
        title: 'Hadith',
        credits: [
          { name: 'Les recueils de hadith', detail: 'Chaque hadith cite son recueil et son numéro. Leurs versions anglaise et française sont celles de l’application.', url: 'https://sunnah.com', link: 'sunnah.com' },
        ],
      },
    ],
  },
};
