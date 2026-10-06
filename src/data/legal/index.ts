export const LEGAL_CONSTANTS = {
  appName: 'Iqra: Learn Arabic & Quran',
  shortName: 'Iqra',
  company: 'KazTek LLC',
  email: 'support@mkaztek.com',
  jurisdiction: 'Indiana, United States',
  effectiveDate: '2026-10-06',
};

export interface LegalSection {
  title: string;
  content: string[];
}

const { appName, shortName, company, email, jurisdiction } = LEGAL_CONSTANTS;

export const PRIVACY_POLICY_SECTIONS: Record<'en' | 'fr', LegalSection[]> = {
  en: [
    {
      title: 'Introduction',
      content: [
        `${company} ("we", "us", or "our") operates the ${appName} mobile application ("${shortName}" or the "App"). This Privacy Policy explains what information the App collects, why, who it is shared with, and the choices you have.`,
        'The App contains no advertising, no in-app purchases, and no artificial-intelligence features. We do not sell your personal information.',
      ],
    },
    {
      title: 'Your Account',
      content: [
        'You need an account to use the App. It saves your learning progress, experience points and streaks, so they follow you to another device and are not lost if you change or reset your phone. Your preferences and the recitations you have played are kept on your device.',
      ],
    },
    {
      title: 'Information You Give Us',
      content: [
        '• Account: your email address, a password (stored only as a secure hash by our authentication provider, Supabase), and the display name you choose.',
        '• Learning progress: your progress (letters, vocabulary, lessons), daily activity, experience points and streaks are saved to our servers so they can follow you to another device.',
        '• Community content: messages, photos and voice messages you send in study groups, reactions, polls, discussion threads and replies, study groups you create or join, study-partner connections, challenges, and shared lessons or quizzes.',
        '• Reports and blocks: if you report content, we store the report, the reason, any details you add, and a copy of the reported content. If you block someone, we store that you blocked them.',
      ],
    },
    {
      title: 'What Other Users Can See',
      content: [
        'Community features are social. Your display name, and content you post, are visible to other users:',
        '• Messages, photos and voice messages in a study group are visible to members of that group.',
        '• Discussion threads and replies are visible to everyone who uses the App.',
        '• Your display name, experience points and streak may appear on the leaderboard, in group activity and in partner suggestions.',
        'Photos and voice messages are stored in our cloud storage and are reachable by anyone who has their link. Do not share anything private in the community.',
      ],
    },
    {
      title: 'Information Collected Automatically',
      content: [
        '• Crash and error reports: we use Sentry to receive reports when the App crashes or an error occurs. A report contains technical details such as the device model, operating system, app version and what the App was doing. If you are signed in, the report carries your account ID so we can tell repeated crashes apart; we have configured Sentry not to attach other personal information such as your IP address or email.',
        '• Notifications: if you allow notifications, we store your device\'s push token and app language so we can tell you about new messages in your groups. Learning reminders are scheduled on your device and do not go through our servers.',
        '• App updates: Expo Updates checks for new versions of the App, which sends basic technical information such as platform and app version.',
      ],
    },
    {
      title: 'Microphone and Speech Recognition',
      content: [
        'The microphone is used only when you choose to:',
        '• Pronunciation practice: your speech is turned into text by your device\'s speech-recognition service (Apple on iOS, Google on Android). Depending on your device, this may happen on the device or on Apple\'s or Google\'s servers, under their privacy policies. We do not record or keep this audio.',
        '• Voice messages: when you record a voice message in a study group, the recording is uploaded and shared with that group.',
        'You can use the rest of the App without granting microphone access.',
      ],
    },
    {
      title: 'Third-Party Services',
      content: [
        'We rely on these providers to run the App:',
        '• Supabase: accounts, database and file storage for synced progress and community content.',
        '• Sentry: crash and error reports.',
        '• Expo (EAS Update and Expo push service): app updates and delivering notifications.',
        '• Microsoft (Edge text-to-speech) and Google (Translate text-to-speech): read Arabic, English and French text aloud. Only the text being read is sent, never your account information.',
        '• Quran.com API, Islamic Network CDN and EveryAyah.com: Quran text, translations and recitation audio. No personal information is sent.',
        '• Apple and Google: the app stores, notifications and, on your device, speech recognition.',
      ],
    },
    {
      title: 'How We Use Information',
      content: [
        '• To provide the App: your account, syncing your progress, and running the community.',
        '• To keep the community safe: reviewing reports, removing content and suspending accounts that break our Terms.',
        '• To send notifications you have turned on.',
        '• To find and fix crashes and errors.',
        'We do not use your information for advertising or profiling, and we do not sell, rent or trade it.',
      ],
    },
    {
      title: 'Community Safety',
      content: [
        'Offensive words are automatically masked in community content. You can report any message, thread, reply or user, and block users so you no longer see their content. We review reports within 24 hours and may remove content or suspend accounts that break our Terms of Service.',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'Data is encrypted in transit, and access to your account data is restricted by database rules so that other users can only see what is described above. No method of storage or transmission is perfectly secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      title: 'Children',
      content: [
        'The App is not directed at children under 13, and community features require an account. We do not knowingly collect personal information from children under 13 (or the minimum age in your country) without verifiable parental consent. If you believe a child has given us personal information, contact us and we will delete it.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'Depending on where you live (including under the GDPR in the European Union), you may have the right to:',
        '• Access the personal information we hold about you and receive a copy of it',
        '• Correct inaccurate information',
        '• Delete your account and personal information',
        '• Object to or restrict certain processing, and withdraw consent',
        '• Lodge a complaint with your data-protection authority',
        `You can delete your account at any time in the App under Profile. For any other request, email ${email}; we answer within 30 days.`,
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We keep your account data while your account exists. When you delete your account, your profile, progress and community data are deleted from our database, and remaining copies (such as uploaded files and backups) are removed within 30 days. Reports about abuse may be kept longer when needed to protect the community or meet legal obligations.',
        'Data stored only on your device (offline audio and preferences) is removed when you uninstall the App.',
      ],
    },
    {
      title: 'International Transfers',
      content: [
        `${company} is based in the United States, and our providers may process data in the United States and other countries. Where required, transfers rely on appropriate safeguards such as the European Commission's standard contractual clauses.`,
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy. We will post the new version in the App and on our website and change the effective date above. For significant changes we will let you know in the App.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about this Privacy Policy or your data, contact us:',
        `${company}`,
        `Email: ${email}`,
      ],
    },
  ],
  fr: [
    {
      title: 'Introduction',
      content: [
        `${company} (« nous » ou « notre ») exploite l'application mobile ${appName} (« ${shortName} » ou l'« Application »). Cette Politique de confidentialité explique quelles informations l'Application collecte, pourquoi, avec qui elles sont partagées et quels choix vous avez.`,
        'L\'Application ne contient ni publicité, ni achat intégré, ni fonctionnalité d\'intelligence artificielle. Nous ne vendons pas vos informations personnelles.',
      ],
    },
    {
      title: 'Votre compte',
      content: [
        'Un compte est nécessaire pour utiliser l\'Application. Il enregistre votre progression, vos points d\'expérience et vos séries, pour qu\'ils vous suivent sur un autre appareil et ne soient pas perdus si vous changez ou réinitialisez votre téléphone. Vos préférences et les récitations que vous avez écoutées sont conservées sur votre appareil.',
      ],
    },
    {
      title: 'Informations que vous nous fournissez',
      content: [
        '• Compte : votre adresse e-mail, un mot de passe (conservé uniquement sous forme de hachage sécurisé par notre fournisseur d\'authentification, Supabase) et le nom d\'affichage que vous choisissez.',
        '• Progression : votre progression (lettres, vocabulaire, leçons), votre activité quotidienne, vos points d\'expérience et vos séries sont enregistrés sur nos serveurs afin de vous suivre sur un autre appareil.',
        '• Contenu communautaire : messages, photos et messages vocaux envoyés dans les groupes d\'étude, réactions, sondages, discussions et réponses, groupes d\'étude que vous créez ou rejoignez, partenaires d\'étude, défis, et leçons ou quiz partagés.',
        '• Signalements et blocages : si vous signalez un contenu, nous conservons le signalement, le motif, les détails éventuels et une copie du contenu signalé. Si vous bloquez quelqu\'un, nous conservons ce blocage.',
      ],
    },
    {
      title: 'Ce que les autres utilisateurs peuvent voir',
      content: [
        'Les fonctionnalités communautaires sont sociales. Votre nom d\'affichage et le contenu que vous publiez sont visibles par d\'autres utilisateurs :',
        '• Les messages, photos et messages vocaux d\'un groupe d\'étude sont visibles par les membres de ce groupe.',
        '• Les discussions et réponses sont visibles par tous les utilisateurs de l\'Application.',
        '• Votre nom d\'affichage, vos points d\'expérience et votre série peuvent apparaître dans le classement, l\'activité des groupes et les suggestions de partenaires.',
        'Les photos et messages vocaux sont conservés dans notre stockage en ligne et accessibles à toute personne disposant de leur lien. Ne partagez rien de privé dans la communauté.',
      ],
    },
    {
      title: 'Informations collectées automatiquement',
      content: [
        '• Rapports de plantage et d\'erreur : nous utilisons Sentry pour recevoir un rapport lorsque l\'Application plante ou qu\'une erreur survient. Un rapport contient des détails techniques comme le modèle de l\'appareil, le système d\'exploitation, la version de l\'Application et ce qu\'elle faisait. Si vous êtes connecté, le rapport contient l\'identifiant de votre compte, pour distinguer les plantages répétés ; Sentry est configuré pour ne joindre aucune autre information personnelle, comme votre adresse IP ou votre e-mail.',
        '• Notifications : si vous les autorisez, nous conservons le jeton de notification de votre appareil et la langue de l\'Application afin de vous prévenir des nouveaux messages dans vos groupes. Les rappels d\'apprentissage sont programmés sur votre appareil et ne passent pas par nos serveurs.',
        '• Mises à jour : Expo Updates vérifie les nouvelles versions de l\'Application, ce qui transmet des informations techniques de base comme la plateforme et la version.',
      ],
    },
    {
      title: 'Microphone et reconnaissance vocale',
      content: [
        'Le microphone n\'est utilisé que lorsque vous le choisissez :',
        '• Entraînement à la prononciation : votre voix est transcrite par le service de reconnaissance vocale de votre appareil (Apple sur iOS, Google sur Android). Selon l\'appareil, cela peut se faire sur l\'appareil ou sur les serveurs d\'Apple ou de Google, selon leurs politiques de confidentialité. Nous n\'enregistrons ni ne conservons cet audio.',
        '• Messages vocaux : lorsque vous enregistrez un message vocal dans un groupe d\'étude, l\'enregistrement est envoyé et partagé avec ce groupe.',
        'Vous pouvez utiliser le reste de l\'Application sans autoriser l\'accès au microphone.',
      ],
    },
    {
      title: 'Services tiers',
      content: [
        'Nous faisons appel à ces prestataires pour faire fonctionner l\'Application :',
        '• Supabase : comptes, base de données et stockage de fichiers pour la progression synchronisée et le contenu communautaire.',
        '• Sentry : rapports de plantage et d\'erreur.',
        '• Expo (EAS Update et service de notifications Expo) : mises à jour et envoi des notifications.',
        '• Microsoft (synthèse vocale Edge) et Google (synthèse vocale de Google Traduction) : lecture à voix haute de textes en arabe, anglais et français. Seul le texte lu est envoyé, jamais vos informations de compte.',
        '• API Quran.com, CDN Islamic Network et EveryAyah.com : texte du Coran, traductions et récitations audio. Aucune information personnelle n\'est envoyée.',
        '• Apple et Google : les boutiques d\'applications, les notifications et, sur votre appareil, la reconnaissance vocale.',
      ],
    },
    {
      title: 'Comment nous utilisons les informations',
      content: [
        '• Pour fournir l\'Application : votre compte, la synchronisation de votre progression et le fonctionnement de la communauté.',
        '• Pour protéger la communauté : examiner les signalements, supprimer des contenus et suspendre les comptes qui enfreignent nos Conditions.',
        '• Pour envoyer les notifications que vous avez activées.',
        '• Pour détecter et corriger les plantages et les erreurs.',
        'Nous n\'utilisons pas vos informations à des fins publicitaires ou de profilage, et nous ne les vendons, louons ni échangeons.',
      ],
    },
    {
      title: 'Sécurité de la communauté',
      content: [
        'Les mots offensants sont automatiquement masqués dans le contenu communautaire. Vous pouvez signaler tout message, discussion, réponse ou utilisateur, et bloquer des utilisateurs pour ne plus voir leur contenu. Nous examinons les signalements sous 24 heures et pouvons supprimer des contenus ou suspendre des comptes qui enfreignent nos Conditions d\'utilisation.',
      ],
    },
    {
      title: 'Sécurité des données',
      content: [
        'Les données sont chiffrées pendant leur transmission, et l\'accès aux données de votre compte est limité par des règles de base de données afin que les autres utilisateurs ne voient que ce qui est décrit ci-dessus. Aucune méthode de stockage ou de transmission n\'étant parfaitement sûre, nous ne pouvons garantir une sécurité absolue.',
      ],
    },
    {
      title: 'Enfants',
      content: [
        'L\'Application ne s\'adresse pas aux enfants de moins de 13 ans, et les fonctionnalités communautaires nécessitent un compte. Nous ne collectons pas sciemment d\'informations personnelles auprès d\'enfants de moins de 13 ans (ou de l\'âge minimum applicable dans votre pays) sans consentement parental vérifiable. Si vous pensez qu\'un enfant nous a fourni des informations personnelles, contactez-nous et nous les supprimerons.',
      ],
    },
    {
      title: 'Vos droits',
      content: [
        'Selon votre lieu de résidence (notamment en vertu du RGPD dans l\'Union européenne), vous pouvez avoir le droit de :',
        '• Accéder aux informations personnelles que nous détenons sur vous et en recevoir une copie',
        '• Rectifier des informations inexactes',
        '• Supprimer votre compte et vos informations personnelles',
        '• Vous opposer à certains traitements ou les limiter, et retirer votre consentement',
        '• Introduire une réclamation auprès de votre autorité de protection des données (en France, la CNIL)',
        `Vous pouvez supprimer votre compte à tout moment dans l'Application, dans Profil. Pour toute autre demande, écrivez à ${email} ; nous répondons sous 30 jours.`,
      ],
    },
    {
      title: 'Conservation des données',
      content: [
        'Nous conservons les données de votre compte tant qu\'il existe. Lorsque vous supprimez votre compte, votre profil, votre progression et vos données communautaires sont supprimés de notre base de données, et les copies restantes (comme les fichiers envoyés et les sauvegardes) sont supprimées sous 30 jours. Les signalements d\'abus peuvent être conservés plus longtemps lorsque c\'est nécessaire pour protéger la communauté ou respecter nos obligations légales.',
        'Les données conservées uniquement sur votre appareil (audio hors ligne et préférences) sont supprimées lorsque vous désinstallez l\'Application.',
      ],
    },
    {
      title: 'Transferts internationaux',
      content: [
        `${company} est établie aux États-Unis, et nos prestataires peuvent traiter des données aux États-Unis et dans d'autres pays. Lorsque c'est requis, ces transferts reposent sur des garanties appropriées, comme les clauses contractuelles types de la Commission européenne.`,
      ],
    },
    {
      title: 'Modifications de cette politique',
      content: [
        'Nous pouvons mettre à jour cette Politique de confidentialité. Nous publierons la nouvelle version dans l\'Application et sur notre site et modifierons la date d\'entrée en vigueur ci-dessus. En cas de changement important, nous vous en informerons dans l\'Application.',
      ],
    },
    {
      title: 'Nous contacter',
      content: [
        'Pour toute question sur cette Politique de confidentialité ou sur vos données, contactez-nous :',
        `${company}`,
        `E-mail : ${email}`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE_SECTIONS: Record<'en' | 'fr', LegalSection[]> = {
  en: [
    {
      title: 'Acceptance of Terms',
      content: [
        `By downloading, installing or using ${appName} (the "App"), operated by ${company}, you agree to these Terms of Service ("Terms") and to our Privacy Policy. If you do not agree, do not use the App.`,
      ],
    },
    {
      title: 'Description of Service',
      content: [
        `${shortName} is an educational app for learning Arabic and studying the Quran. It offers the Arabic alphabet and writing styles, vocabulary, grammar, numbers, Quran reading with audio recitations, stories of the prophets and from the Quran, quizzes, reminders, and community features such as study groups and discussions.`,
        'The App is free. It contains no advertising and no in-app purchases.',
      ],
    },
    {
      title: 'User Accounts',
      content: [
        'Some features, including syncing progress and all community features, require an account. You must be at least 13 years old (or the minimum age in your country) to create one.',
        'You are responsible for keeping your login details secure and for everything done with your account. Choose a display name that is not offensive and does not impersonate anyone.',
        'You can delete your account at any time in the App under Profile.',
      ],
    },
    {
      title: 'Community Guidelines',
      content: [
        'We have zero tolerance for objectionable content or abusive users. When you post messages, photos, voice messages, threads or replies, you must not:',
        '• Harass, bully, threaten or intimidate anyone',
        '• Post hateful content, or content that attacks people for their religion, school of thought, ethnicity, nationality, gender or any other characteristic',
        '• Post sexual, violent or graphic content',
        '• Post spam, scams, advertising or links to harmful sites',
        '• Impersonate others or share other people\'s private information',
        '• Post anything illegal or that infringes someone else\'s rights',
        'Discussions about faith should be respectful. Disagreement is fine; insults are not.',
      ],
    },
    {
      title: 'Reporting, Blocking and Enforcement',
      content: [
        'You can report any message, thread, reply or user from within the App, and block users so you no longer see their content. Offensive words are masked automatically.',
        'We review reports within 24 hours. We may remove any content that breaks these Terms and may warn, suspend or permanently ban the user who posted it, without notice. Serious cases may be reported to the authorities.',
      ],
    },
    {
      title: 'Your Content',
      content: [
        'You keep ownership of the content you post. By posting it, you give us a worldwide, non-exclusive, royalty-free licence to store, display and deliver it to the people you share it with, only for the purpose of running the App. This licence ends when your content is deleted, except for copies kept in reports as described in our Privacy Policy.',
        'You are responsible for what you post and confirm that you have the right to share it.',
      ],
    },
    {
      title: 'Acceptable Use',
      content: [
        'You agree not to:',
        '• Use the App for any unlawful purpose',
        '• Attempt to access other users\' accounts or data, or our systems, without authorisation',
        '• Interfere with or disrupt the App or its servers, or send automated traffic',
        '• Copy, modify, reverse-engineer or redistribute the App, except where the law allows it',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        `The App's design, code, lessons and original content belong to ${company} and are protected by copyright and other laws. The Quran text, translations and recitations come from their respective sources and remain subject to their own terms.`,
      ],
    },
    {
      title: 'Religious Content Disclaimer',
      content: [
        'We take great care over the Quran text, translations, hadith and stories in the App. Stories are drawn only from the Quran and authentic hadith. Translations and explanations are aids to understanding and do not replace the original Arabic text or guidance from qualified scholars.',
        `If you find a mistake, please tell us at ${email} so we can correct it.`,
      ],
    },
    {
      title: 'Service Availability',
      content: [
        'We may change, suspend or discontinue any part of the App at any time. Some features require an internet connection. We do not guarantee that the App will always be available or free of errors.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        `The App is provided "as is" and "as available". To the fullest extent permitted by law, ${company} is not liable for any indirect, incidental, special or consequential damages, or for content posted by other users. Nothing in these Terms limits rights you have as a consumer under the law of your country.`,
      ],
    },
    {
      title: 'Termination',
      content: [
        'You can stop using the App and delete your account at any time. We may suspend or end your access if you break these Terms.',
      ],
    },
    {
      title: 'Changes to These Terms',
      content: [
        'We may update these Terms. We will post the new version in the App and change the effective date above. Continuing to use the App after a change means you accept the updated Terms.',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        `These Terms are governed by the laws of ${jurisdiction}, without regard to conflict-of-law rules, except where the law of your country of residence gives you mandatory protections.`,
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about these Terms, or want to report a problem, contact us:',
        `${company}`,
        `Email: ${email}`,
      ],
    },
  ],
  fr: [
    {
      title: 'Acceptation des conditions',
      content: [
        `En téléchargeant, installant ou utilisant ${appName} (l'« Application »), exploitée par ${company}, vous acceptez les présentes Conditions d'utilisation (les « Conditions ») et notre Politique de confidentialité. Si vous ne les acceptez pas, n'utilisez pas l'Application.`,
      ],
    },
    {
      title: 'Description du service',
      content: [
        `${shortName} est une application éducative pour apprendre l'arabe et étudier le Coran. Elle propose l'alphabet arabe et ses styles d'écriture, le vocabulaire, la grammaire, les nombres, la lecture du Coran avec récitations audio, les récits des prophètes et du Coran, des quiz, des rappels, ainsi que des fonctionnalités communautaires comme les groupes d'étude et les discussions.`,
        'L\'Application est gratuite. Elle ne contient ni publicité ni achat intégré.',
      ],
    },
    {
      title: 'Comptes utilisateurs',
      content: [
        'Certaines fonctionnalités, dont la synchronisation de la progression et toutes les fonctionnalités communautaires, nécessitent un compte. Vous devez avoir au moins 13 ans (ou l\'âge minimum applicable dans votre pays) pour en créer un.',
        'Vous êtes responsable de la sécurité de vos identifiants et de tout ce qui est fait avec votre compte. Choisissez un nom d\'affichage qui n\'est pas offensant et n\'usurpe l\'identité de personne.',
        'Vous pouvez supprimer votre compte à tout moment dans l\'Application, dans Profil.',
      ],
    },
    {
      title: 'Règles de la communauté',
      content: [
        'Nous appliquons une tolérance zéro envers les contenus répréhensibles et les utilisateurs abusifs. Lorsque vous publiez des messages, photos, messages vocaux, discussions ou réponses, vous ne devez pas :',
        '• Harceler, intimider ou menacer qui que ce soit',
        '• Publier des contenus haineux, ou qui attaquent des personnes en raison de leur religion, de leur école de pensée, de leur origine, de leur nationalité, de leur sexe ou de toute autre caractéristique',
        '• Publier des contenus sexuels, violents ou choquants',
        '• Publier du spam, des arnaques, de la publicité ou des liens vers des sites malveillants',
        '• Usurper l\'identité d\'autrui ou partager les informations privées d\'autres personnes',
        '• Publier quoi que ce soit d\'illégal ou qui porte atteinte aux droits d\'autrui',
        'Les échanges sur la foi doivent rester respectueux. Le désaccord est permis ; les insultes ne le sont pas.',
      ],
    },
    {
      title: 'Signalement, blocage et sanctions',
      content: [
        'Vous pouvez signaler tout message, discussion, réponse ou utilisateur depuis l\'Application, et bloquer des utilisateurs pour ne plus voir leur contenu. Les mots offensants sont masqués automatiquement.',
        'Nous examinons les signalements sous 24 heures. Nous pouvons supprimer tout contenu qui enfreint ces Conditions et avertir, suspendre ou exclure définitivement l\'utilisateur qui l\'a publié, sans préavis. Les cas graves peuvent être signalés aux autorités.',
      ],
    },
    {
      title: 'Votre contenu',
      content: [
        'Vous restez propriétaire du contenu que vous publiez. En le publiant, vous nous accordez une licence mondiale, non exclusive et gratuite pour le conserver, l\'afficher et le transmettre aux personnes avec qui vous le partagez, uniquement pour faire fonctionner l\'Application. Cette licence prend fin à la suppression de votre contenu, sauf pour les copies conservées dans les signalements comme décrit dans notre Politique de confidentialité.',
        'Vous êtes responsable de ce que vous publiez et confirmez avoir le droit de le partager.',
      ],
    },
    {
      title: 'Utilisation acceptable',
      content: [
        'Vous vous engagez à ne pas :',
        '• Utiliser l\'Application à des fins illégales',
        '• Tenter d\'accéder sans autorisation aux comptes ou données d\'autres utilisateurs, ou à nos systèmes',
        '• Perturber l\'Application ou ses serveurs, ou envoyer du trafic automatisé',
        '• Copier, modifier, décompiler ou redistribuer l\'Application, sauf dans la mesure permise par la loi',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      content: [
        `Le design, le code, les leçons et le contenu original de l'Application appartiennent à ${company} et sont protégés par le droit d'auteur et d'autres lois. Le texte du Coran, les traductions et les récitations proviennent de leurs sources respectives et restent soumis à leurs propres conditions.`,
      ],
    },
    {
      title: 'Avertissement sur le contenu religieux',
      content: [
        'Nous apportons le plus grand soin au texte du Coran, aux traductions, aux hadiths et aux récits de l\'Application. Les récits sont tirés uniquement du Coran et de hadiths authentiques. Les traductions et explications sont des aides à la compréhension et ne remplacent ni le texte arabe original ni les conseils de savants qualifiés.',
        `Si vous trouvez une erreur, écrivez-nous à ${email} afin que nous la corrigions.`,
      ],
    },
    {
      title: 'Disponibilité du service',
      content: [
        'Nous pouvons modifier, suspendre ou arrêter toute partie de l\'Application à tout moment. Certaines fonctionnalités nécessitent une connexion internet. Nous ne garantissons pas que l\'Application sera toujours disponible ou exempte d\'erreurs.',
      ],
    },
    {
      title: 'Limitation de responsabilité',
      content: [
        `L'Application est fournie « en l'état » et « selon disponibilité ». Dans toute la mesure permise par la loi, ${company} n'est pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs, ni du contenu publié par d'autres utilisateurs. Rien dans ces Conditions ne limite les droits dont vous disposez en tant que consommateur en vertu de la loi de votre pays.`,
      ],
    },
    {
      title: 'Résiliation',
      content: [
        'Vous pouvez cesser d\'utiliser l\'Application et supprimer votre compte à tout moment. Nous pouvons suspendre ou mettre fin à votre accès si vous enfreignez ces Conditions.',
      ],
    },
    {
      title: 'Modifications de ces conditions',
      content: [
        'Nous pouvons mettre à jour ces Conditions. Nous publierons la nouvelle version dans l\'Application et modifierons la date d\'entrée en vigueur ci-dessus. Continuer à utiliser l\'Application après une modification vaut acceptation des Conditions mises à jour.',
      ],
    },
    {
      title: 'Loi applicable',
      content: [
        `Ces Conditions sont régies par les lois de l'État de l'Indiana (États-Unis), sans égard aux règles de conflit de lois, sauf lorsque la loi de votre pays de résidence vous accorde des protections impératives.`,
      ],
    },
    {
      title: 'Nous contacter',
      content: [
        'Pour toute question sur ces Conditions, ou pour signaler un problème, contactez-nous :',
        `${company}`,
        `E-mail : ${email}`,
      ],
    },
  ],
};
