import { useTranslation } from 'react-i18next';
import { LegalScreen } from '../src/components/legal/LegalScreen';
import { TERMS_OF_SERVICE_SECTIONS } from '../src/data/legal';

export default function TermsOfServiceScreen() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'fr' ? 'fr' : 'en') as 'en' | 'fr';

  return (
    <LegalScreen
      title={t('legal.termsOfService')}
      sections={TERMS_OF_SERVICE_SECTIONS[lang]}
    />
  );
}
