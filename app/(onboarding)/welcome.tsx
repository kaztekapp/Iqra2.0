import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoArabic}>اقْرَأ</Text>
        </View>
        <Text style={styles.appName}>Iqra 2.0</Text>
        <Text style={styles.tagline}>{t('onboarding.welcomeTagline')}</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push('/(onboarding)/features')}
        >
          <Text style={styles.buttonText}>{t('common.getStarted')}</Text>
          <View style={styles.buttonIcon}>
            <Ionicons name="arrow-forward" size={18} color="#D4AF37" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoArabic: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  appName: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  tagline: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  buttonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0f172a20',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
