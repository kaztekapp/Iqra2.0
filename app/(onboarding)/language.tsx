import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../src/stores/settingsStore';

const LANGUAGES = [
  {
    code: 'en' as const,
    label: 'English',
    native: 'English',
    flag: '🇬🇧',
    greeting: 'Hello!',
  },
  {
    code: 'fr' as const,
    label: 'Français',
    native: 'French',
    flag: '🇫🇷',
    greeting: 'Bonjour !',
  },
];

export default function LanguageScreen() {
  const { i18n } = useTranslation();
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const handleSelect = (code: 'en' | 'fr') => {
    setLanguage(code);
    i18n.changeLanguage(code);
    router.push('/(onboarding)/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header — shown in both languages */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="language" size={32} color="#D4AF37" />
          </View>
          <Text style={styles.title}>Choose your language</Text>
          <Text style={styles.titleFr}>Choisissez votre langue</Text>
          <Text style={styles.titleAr}>اختر لغتك</Text>
        </View>

        {/* Language cards */}
        <View style={styles.cards}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleSelect(lang.code)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <View style={styles.cardTextSection}>
                <Text style={styles.cardLabel}>{lang.label}</Text>
                <Text style={styles.cardGreeting}>{lang.greeting}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  titleFr: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 6,
  },
  titleAr: {
    color: '#D4AF37',
    fontSize: 18,
    marginTop: 4,
  },
  cards: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  cardTextSection: {
    flex: 1,
  },
  cardLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardGreeting: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 2,
  },
});
