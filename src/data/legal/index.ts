export const LEGAL_CONSTANTS = {
  appName: 'IQra2.0',
  company: 'KazTek LLC',
  email: 'support@mkaztek.com',
  jurisdiction: 'Indiana, United States',
  effectiveDate: '2026-02-16',
};

export interface LegalSection {
  title: string;
  content: string[];
}

export const PRIVACY_POLICY_SECTIONS: Record<'en' | 'fr', LegalSection[]> = {
  en: [
    {
      title: 'Introduction',
      content: [
        `${LEGAL_CONSTANTS.company} ("we", "us", or "our") operates the ${LEGAL_CONSTANTS.appName} mobile application (the "App"). This Privacy Policy explains how we collect, use, and protect your information when you use our App.`,
        'By using the App, you agree to the collection and use of information in accordance with this policy.',
      ],
    },
    {
      title: 'Data We Collect',
      content: [
        'Account Information: When you create an account, we collect your email address and display name through our authentication provider (Supabase).',
        'We do not collect any other personal information beyond what is needed for account creation and authentication.',
      ],
    },
    {
      title: 'Data Stored Locally on Your Device',
      content: [
        'The following data is stored only on your device and is never transmitted to our servers:',
        '- Learning progress (letters learned, vocabulary mastered, lessons completed)',
        '- App preferences (language, vowel mark settings)',
        '- Downloaded audio files for offline use',
        '- Voice recordings made during pronunciation practice (processed on-device only and never uploaded)',
      ],
    },
    {
      title: 'Third-Party Services',
      content: [
        'The App uses the following third-party services:',
        '- Supabase: For user authentication and account management. See their privacy policy at supabase.com/privacy.',
        '- Quran.com API: To fetch Quran text and translations. No personal data is sent.',
        '- EveryAyah.com: To stream Quran audio recitations. No personal data is sent.',
        '- Expo Updates: To deliver over-the-air app updates. Device metadata (platform, app version) may be collected.',
      ],
    },
    {
      title: 'Microphone and Speech Recognition',
      content: [
        'The App offers optional pronunciation practice features that use your device\'s microphone and speech recognition capabilities.',
        'Voice data is processed entirely on your device using the operating system\'s built-in speech recognition. We do not record, store, or transmit any voice data to our servers.',
        'You can use the App without granting microphone permissions. Pronunciation practice is entirely optional.',
      ],
    },
    {
      title: 'How We Use Your Data',
      content: [
        'We use the limited data we collect to:',
        '- Provide and maintain your account',
        '- Enable you to sync your learning progress across devices (future feature)',
        '- Send important service-related notifications',
        'We do not sell, trade, or rent your personal information to third parties. We do not display advertisements in the App.',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We take reasonable measures to protect your information. Account data is secured through Supabase\'s enterprise-grade security infrastructure, including encryption at rest and in transit.',
        'However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'The App is rated 4+ and is suitable for all ages. We do not knowingly collect personal information from children under 13 without parental consent.',
        'The App\'s educational content is designed to be family-friendly. If you are a parent or guardian and believe your child has provided personal information, please contact us.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'You have the right to:',
        '- Access the personal data we hold about you',
        '- Request deletion of your account and associated data',
        '- Export your data',
        '- Opt out of non-essential communications',
        'To exercise these rights, contact us at the email provided below.',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your account data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days.',
        'Locally stored data (learning progress, preferences) can be cleared at any time through the App\'s settings.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy within the App and updating the effective date.',
        'Your continued use of the App after changes constitutes acceptance of the updated policy.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        `If you have questions about this Privacy Policy, please contact us at:`,
        `${LEGAL_CONSTANTS.company}`,
        `Email: ${LEGAL_CONSTANTS.email}`,
      ],
    },
  ],
  fr: [
    {
      title: 'Introduction',
      content: [
        `${LEGAL_CONSTANTS.company} ("nous" ou "notre") exploite l'application mobile ${LEGAL_CONSTANTS.appName} (l'"Application"). Cette Politique de Confidentialit\u00e9 explique comment nous collectons, utilisons et prot\u00e9geons vos informations lorsque vous utilisez notre Application.`,
        'En utilisant l\'Application, vous acceptez la collecte et l\'utilisation des informations conform\u00e9ment \u00e0 cette politique.',
      ],
    },
    {
      title: 'Donn\u00e9es que nous collectons',
      content: [
        'Informations de compte : Lorsque vous cr\u00e9ez un compte, nous collectons votre adresse e-mail et votre nom d\'affichage via notre fournisseur d\'authentification (Supabase).',
        'Nous ne collectons aucune autre information personnelle au-del\u00e0 de ce qui est n\u00e9cessaire \u00e0 la cr\u00e9ation et l\'authentification du compte.',
      ],
    },
    {
      title: 'Donn\u00e9es stock\u00e9es localement sur votre appareil',
      content: [
        'Les donn\u00e9es suivantes sont stock\u00e9es uniquement sur votre appareil et ne sont jamais transmises \u00e0 nos serveurs :',
        '- Progression d\'apprentissage (lettres apprises, vocabulaire ma\u00eetris\u00e9, le\u00e7ons termin\u00e9es)',
        '- Pr\u00e9f\u00e9rences de l\'application (langue, param\u00e8tres des voyelles)',
        '- Fichiers audio t\u00e9l\u00e9charg\u00e9s pour une utilisation hors ligne',
        '- Enregistrements vocaux r\u00e9alis\u00e9s lors de la pratique de prononciation (trait\u00e9s uniquement sur l\'appareil et jamais t\u00e9l\u00e9vers\u00e9s)',
      ],
    },
    {
      title: 'Services tiers',
      content: [
        'L\'Application utilise les services tiers suivants :',
        '- Supabase : Pour l\'authentification et la gestion des comptes. Voir leur politique de confidentialit\u00e9 sur supabase.com/privacy.',
        '- API Quran.com : Pour r\u00e9cup\u00e9rer le texte et les traductions du Coran. Aucune donn\u00e9e personnelle n\'est envoy\u00e9e.',
        '- EveryAyah.com : Pour diffuser les r\u00e9citations audio du Coran. Aucune donn\u00e9e personnelle n\'est envoy\u00e9e.',
        '- Expo Updates : Pour livrer les mises \u00e0 jour de l\'application. Des m\u00e9tadonn\u00e9es de l\'appareil (plateforme, version) peuvent \u00eatre collect\u00e9es.',
      ],
    },
    {
      title: 'Microphone et reconnaissance vocale',
      content: [
        'L\'Application offre des fonctionnalit\u00e9s optionnelles de pratique de prononciation qui utilisent le microphone et les capacit\u00e9s de reconnaissance vocale de votre appareil.',
        'Les donn\u00e9es vocales sont trait\u00e9es enti\u00e8rement sur votre appareil en utilisant la reconnaissance vocale int\u00e9gr\u00e9e du syst\u00e8me d\'exploitation. Nous n\'enregistrons, ne stockons ni ne transmettons aucune donn\u00e9e vocale \u00e0 nos serveurs.',
        'Vous pouvez utiliser l\'Application sans accorder les autorisations du microphone. La pratique de prononciation est enti\u00e8rement facultative.',
      ],
    },
    {
      title: 'Comment nous utilisons vos donn\u00e9es',
      content: [
        'Nous utilisons les donn\u00e9es limit\u00e9es que nous collectons pour :',
        '- Fournir et maintenir votre compte',
        '- Vous permettre de synchroniser votre progression d\'apprentissage entre appareils (fonctionnalit\u00e9 future)',
        '- Envoyer des notifications importantes li\u00e9es au service',
        'Nous ne vendons, n\'\u00e9changeons ni ne louons vos informations personnelles \u00e0 des tiers. Nous n\'affichons pas de publicit\u00e9s dans l\'Application.',
      ],
    },
    {
      title: 'S\u00e9curit\u00e9 des donn\u00e9es',
      content: [
        'Nous prenons des mesures raisonnables pour prot\u00e9ger vos informations. Les donn\u00e9es de compte sont s\u00e9curis\u00e9es par l\'infrastructure de s\u00e9curit\u00e9 de niveau entreprise de Supabase, incluant le chiffrement au repos et en transit.',
        'Cependant, aucune m\u00e9thode de stockage \u00e9lectronique n\'est s\u00fbre \u00e0 100%, et nous ne pouvons garantir une s\u00e9curit\u00e9 absolue.',
      ],
    },
    {
      title: 'Confidentialit\u00e9 des enfants',
      content: [
        'L\'Application est class\u00e9e 4+ et convient \u00e0 tous les \u00e2ges. Nous ne collectons pas sciemment d\'informations personnelles d\'enfants de moins de 13 ans sans le consentement parental.',
        'Le contenu \u00e9ducatif de l\'Application est con\u00e7u pour \u00eatre adapt\u00e9 aux familles. Si vous \u00eates parent ou tuteur et pensez que votre enfant a fourni des informations personnelles, veuillez nous contacter.',
      ],
    },
    {
      title: 'Vos droits',
      content: [
        'Vous avez le droit de :',
        '- Acc\u00e9der aux donn\u00e9es personnelles que nous d\u00e9tenons \u00e0 votre sujet',
        '- Demander la suppression de votre compte et des donn\u00e9es associ\u00e9es',
        '- Exporter vos donn\u00e9es',
        '- Vous d\u00e9sinscrire des communications non essentielles',
        'Pour exercer ces droits, contactez-nous \u00e0 l\'adresse e-mail fournie ci-dessous.',
      ],
    },
    {
      title: 'Conservation des donn\u00e9es',
      content: [
        'Nous conservons les donn\u00e9es de votre compte tant que celui-ci est actif. Si vous supprimez votre compte, nous supprimerons vos donn\u00e9es personnelles dans les 30 jours.',
        'Les donn\u00e9es stock\u00e9es localement (progression, pr\u00e9f\u00e9rences) peuvent \u00eatre effac\u00e9es \u00e0 tout moment via les param\u00e8tres de l\'Application.',
      ],
    },
    {
      title: 'Modifications de cette politique',
      content: [
        'Nous pouvons mettre \u00e0 jour cette Politique de Confidentialit\u00e9 de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique dans l\'Application et en mettant \u00e0 jour la date d\'entr\u00e9e en vigueur.',
        'Votre utilisation continue de l\'Application apr\u00e8s les modifications constitue une acceptation de la politique mise \u00e0 jour.',
      ],
    },
    {
      title: 'Nous contacter',
      content: [
        'Si vous avez des questions concernant cette Politique de Confidentialit\u00e9, veuillez nous contacter \u00e0 :',
        `${LEGAL_CONSTANTS.company}`,
        `E-mail : ${LEGAL_CONSTANTS.email}`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE_SECTIONS: Record<'en' | 'fr', LegalSection[]> = {
  en: [
    {
      title: 'Acceptance of Terms',
      content: [
        `By downloading, installing, or using the ${LEGAL_CONSTANTS.appName} application (the "App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.`,
      ],
    },
    {
      title: 'Description of Service',
      content: [
        `${LEGAL_CONSTANTS.appName} is an educational mobile application designed to help users learn Arabic, study the Quran, and practice Islamic knowledge. The App provides lessons, quizzes, audio recitations, and interactive learning tools.`,
      ],
    },
    {
      title: 'User Accounts',
      content: [
        'You may create an account to access additional features. You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate information when creating your account and to update it as needed.',
        'We reserve the right to suspend or terminate accounts that violate these Terms.',
      ],
    },
    {
      title: 'Acceptable Use',
      content: [
        'You agree to use the App only for lawful, personal, and educational purposes. You may not:',
        '- Reverse engineer, decompile, or disassemble the App',
        '- Use the App to distribute malware or harmful content',
        '- Attempt to gain unauthorized access to our systems',
        '- Use the App in any way that could damage or impair its functionality',
        '- Reproduce or redistribute the App\'s content without permission',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        `The App, including its design, code, graphics, and original educational content, is owned by ${LEGAL_CONSTANTS.company} and is protected by copyright and intellectual property laws.`,
        'You are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial purposes.',
      ],
    },
    {
      title: 'Quran Content Disclaimer',
      content: [
        'Quran text, translations, and audio recitations are sourced from third-party providers (Quran.com API and EveryAyah.com). While we strive for accuracy, we recommend verifying Quranic content with a qualified scholar.',
        `${LEGAL_CONSTANTS.company} is not responsible for any errors or inaccuracies in third-party Quran content.`,
      ],
    },
    {
      title: 'Future Subscriptions',
      content: [
        'The App is currently free to use. We may introduce premium features or subscription plans in the future. Any such changes will be clearly communicated, and core educational content will remain accessible.',
      ],
    },
    {
      title: 'Service Availability',
      content: [
        'We strive to keep the App available at all times but do not guarantee uninterrupted access. The App may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.',
        'Certain features require an internet connection. Offline functionality is limited to downloaded content.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        `To the fullest extent permitted by law, ${LEGAL_CONSTANTS.company} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App.`,
        'The App is provided "as is" and "as available" without warranties of any kind, either express or implied.',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        `These Terms are governed by and construed in accordance with the laws of the State of Indiana, United States, without regard to its conflict of law provisions.`,
        'Any disputes arising from these Terms shall be resolved in the courts of Indiana.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about these Terms, please contact us at:',
        `${LEGAL_CONSTANTS.company}`,
        `Email: ${LEGAL_CONSTANTS.email}`,
      ],
    },
  ],
  fr: [
    {
      title: 'Acceptation des conditions',
      content: [
        `En t\u00e9l\u00e9chargeant, installant ou utilisant l'application ${LEGAL_CONSTANTS.appName} (l'"Application"), vous acceptez d'\u00eatre li\u00e9 par ces Conditions d'Utilisation ("Conditions"). Si vous n'acceptez pas ces Conditions, n'utilisez pas l'Application.`,
      ],
    },
    {
      title: 'Description du service',
      content: [
        `${LEGAL_CONSTANTS.appName} est une application mobile \u00e9ducative con\u00e7ue pour aider les utilisateurs \u00e0 apprendre l'arabe, \u00e9tudier le Coran et pratiquer les connaissances islamiques. L'Application fournit des le\u00e7ons, des quiz, des r\u00e9citations audio et des outils d'apprentissage interactifs.`,
      ],
    },
    {
      title: 'Comptes utilisateurs',
      content: [
        'Vous pouvez cr\u00e9er un compte pour acc\u00e9der \u00e0 des fonctionnalit\u00e9s suppl\u00e9mentaires. Vous \u00eates responsable du maintien de la confidentialit\u00e9 de vos identifiants de compte.',
        'Vous acceptez de fournir des informations exactes lors de la cr\u00e9ation de votre compte et de les mettre \u00e0 jour si n\u00e9cessaire.',
        'Nous nous r\u00e9servons le droit de suspendre ou de supprimer les comptes qui enfreignent ces Conditions.',
      ],
    },
    {
      title: 'Utilisation acceptable',
      content: [
        'Vous acceptez d\'utiliser l\'Application uniquement \u00e0 des fins l\u00e9gales, personnelles et \u00e9ducatives. Vous ne pouvez pas :',
        '- R\u00e9tro-concevoir, d\u00e9compiler ou d\u00e9sassembler l\'Application',
        '- Utiliser l\'Application pour distribuer des logiciels malveillants',
        '- Tenter d\'acc\u00e9der sans autorisation \u00e0 nos syst\u00e8mes',
        '- Utiliser l\'Application d\'une mani\u00e8re qui pourrait endommager ou alt\u00e9rer son fonctionnement',
        '- Reproduire ou redistribuer le contenu de l\'Application sans permission',
      ],
    },
    {
      title: 'Propri\u00e9t\u00e9 intellectuelle',
      content: [
        `L'Application, y compris sa conception, son code, ses graphiques et son contenu \u00e9ducatif original, est la propri\u00e9t\u00e9 de ${LEGAL_CONSTANTS.company} et est prot\u00e9g\u00e9e par les lois sur le droit d'auteur et la propri\u00e9t\u00e9 intellectuelle.`,
        'Vous b\u00e9n\u00e9ficiez d\'une licence limit\u00e9e, non exclusive et non transf\u00e9rable pour utiliser l\'Application \u00e0 des fins personnelles et non commerciales.',
      ],
    },
    {
      title: 'Avertissement sur le contenu coranique',
      content: [
        'Le texte du Coran, les traductions et les r\u00e9citations audio proviennent de fournisseurs tiers (API Quran.com et EveryAyah.com). Bien que nous nous efforcions d\'\u00eatre pr\u00e9cis, nous recommandons de v\u00e9rifier le contenu coranique aupr\u00e8s d\'un \u00e9rudit qualifi\u00e9.',
        `${LEGAL_CONSTANTS.company} n'est pas responsable des erreurs ou inexactitudes dans le contenu coranique tiers.`,
      ],
    },
    {
      title: 'Abonnements futurs',
      content: [
        'L\'Application est actuellement gratuite. Nous pourrions introduire des fonctionnalit\u00e9s premium ou des plans d\'abonnement \u00e0 l\'avenir. Tout changement sera clairement communiqu\u00e9, et le contenu \u00e9ducatif de base restera accessible.',
      ],
    },
    {
      title: 'Disponibilit\u00e9 du service',
      content: [
        'Nous nous effor\u00e7ons de maintenir l\'Application disponible en tout temps mais ne garantissons pas un acc\u00e8s ininterrompu. L\'Application peut \u00eatre temporairement indisponible en raison de maintenance, de mises \u00e0 jour ou de circonstances ind\u00e9pendantes de notre volont\u00e9.',
        'Certaines fonctionnalit\u00e9s n\u00e9cessitent une connexion internet. La fonctionnalit\u00e9 hors ligne est limit\u00e9e au contenu t\u00e9l\u00e9charg\u00e9.',
      ],
    },
    {
      title: 'Limitation de responsabilit\u00e9',
      content: [
        `Dans toute la mesure permise par la loi, ${LEGAL_CONSTANTS.company} ne sera pas responsable de tout dommage indirect, accessoire, sp\u00e9cial, cons\u00e9cutif ou punitif r\u00e9sultant de votre utilisation de l'Application.`,
        'L\'Application est fournie "en l\'\u00e9tat" et "selon disponibilit\u00e9" sans garantie d\'aucune sorte, expresse ou implicite.',
      ],
    },
    {
      title: 'Loi applicable',
      content: [
        'Ces Conditions sont r\u00e9gies et interpr\u00e9t\u00e9es conform\u00e9ment aux lois de l\'\u00c9tat de l\'Indiana, \u00c9tats-Unis, sans \u00e9gard \u00e0 ses dispositions en mati\u00e8re de conflit de lois.',
        'Tout litige d\u00e9coulant de ces Conditions sera r\u00e9solu devant les tribunaux de l\'Indiana.',
      ],
    },
    {
      title: 'Nous contacter',
      content: [
        'Si vous avez des questions concernant ces Conditions, veuillez nous contacter \u00e0 :',
        `${LEGAL_CONSTANTS.company}`,
        `E-mail : ${LEGAL_CONSTANTS.email}`,
      ],
    },
  ],
};
