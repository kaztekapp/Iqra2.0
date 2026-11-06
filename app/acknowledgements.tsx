import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ACKNOWLEDGEMENTS } from '../src/data/legal/acknowledgements';
import { color, font, radius } from '../src/theme/tokens';
import { quietly } from '../src/lib/report';

/**
 * The app's sources, credited as their terms ask: each one named, what it is
 * used for, and a link to it. Laid out like the privacy and terms screens.
 */
export default function AcknowledgementsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { intro, groups } = ACKNOWLEDGEMENTS[i18n.language === 'fr' ? 'fr' : 'en'];

  const open = (url: string) => {
    Linking.openURL(url).catch((e) => quietly(e, 'acknowledgements.open'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('a11y.back')} style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={color.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('legal.acknowledgements')}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.arabic} allowFontScaling={false}>شُكْرٌ وَتَقْدِير</Text>
        <Text style={styles.intro}>{intro}</Text>

        {groups.map((group) => (
          <View key={group.title} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            {group.credits.map((credit, i) => (
              <View key={credit.name} style={[styles.credit, i > 0 && styles.creditDivided]}>
                <Text style={styles.creditName}>{credit.name}</Text>
                <Text style={styles.creditDetail}>{credit.detail}</Text>
                <Pressable
                  onPress={() => open(credit.url)}
                  accessibilityRole="link"
                  accessibilityLabel={`${credit.name}, ${credit.link}`}
                  hitSlop={8}
                  style={styles.linkRow}
                >
                  <Ionicons name="open-outline" size={14} color={color.progress} />
                  <Text style={styles.link}>{credit.link}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: color.text,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  arabic: {
    fontFamily: font.quran,
    fontSize: 28,
    lineHeight: 56,
    color: color.sacred,
    textAlign: 'center',
  },
  intro: {
    fontSize: 14,
    color: color.textMuted,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: color.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text,
    marginBottom: 4,
  },
  credit: {
    paddingVertical: 10,
    gap: 4,
  },
  creditDivided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.border,
  },
  creditName: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  creditDetail: {
    fontSize: 14,
    color: color.textMuted,
    lineHeight: 21,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: color.progress,
  },
});
