import { useTranslation } from 'react-i18next';
import { LegalScreen } from '../src/components/legal/LegalScreen';
import { PRIVACY_POLICY_SECTIONS } from '../src/data/legal';

export default function PrivacyPolicyScreen() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'fr' ? 'fr' : 'en') as 'en' | 'fr';

  return (
    <LegalScreen
      title={t('legal.privacyPolicy')}
      sections={PRIVACY_POLICY_SECTIONS[lang]}
    />
  );
}
