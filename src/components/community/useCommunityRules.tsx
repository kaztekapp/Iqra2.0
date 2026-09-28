import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { color, radius, space, type, weight, pressedOpacity } from '../../theme/tokens';
import { useSettingsStore } from '../../stores/settingsStore';

/**
 * The community rules, agreed once before the first post. App review asks
 * for users to accept terms with zero tolerance for objectionable content
 * before they can publish anything others will see.
 *
 *   const rules = useCommunityRules();
 *   rules.gate(() => send());   // runs now if accepted, after "I agree" otherwise
 *   {rules.element}
 */
export function useCommunityRules() {
  const { t } = useTranslation();
  const accepted = useSettingsStore((s) => s.communityRulesAccepted);
  const accept = useSettingsStore((s) => s.acceptCommunityRules);
  const [visible, setVisible] = useState(false);
  const pending = useRef<(() => void) | null>(null);

  const gate = useCallback((action: () => void) => {
    if (useSettingsStore.getState().communityRulesAccepted) {
      action();
      return;
    }
    pending.current = action;
    setVisible(true);
  }, []);

  const onAccept = () => {
    accept();
    setVisible(false);
    const action = pending.current;
    pending.current = null;
    action?.();
  };

  const onDecline = () => {
    pending.current = null;
    setVisible(false);
  };

  const openTerms = () => {
    setVisible(false);
    pending.current = null;
    router.push('/terms-of-service' as Href);
  };

  const rules = [t('moderation.rule1'), t('moderation.rule2'), t('moderation.rule3')];

  const element = (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDecline}>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityViewIsModal>
          <ScrollView contentContainerStyle={styles.content} bounces={false}>
            <View style={styles.icon}>
              <Ionicons name="people-outline" size={26} color={color.accent} />
            </View>
            <Text style={styles.title} accessibilityRole="header">{t('moderation.rulesTitle')}</Text>
            <Text style={styles.intro}>{t('moderation.rulesIntro')}</Text>
            <View style={styles.rules}>
              {rules.map((rule) => (
                <View key={rule} style={styles.ruleRow}>
                  <Ionicons name="checkmark-circle" size={18} color={color.accent} style={styles.ruleIcon} />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.zeroTolerance}>{t('moderation.rulesZeroTolerance')}</Text>
            <Pressable accessibilityRole="link" onPress={openTerms} hitSlop={8}>
              <Text style={styles.link}>{t('moderation.rulesReadTerms')}</Text>
            </Pressable>
          </ScrollView>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.primary, pressed && { opacity: pressedOpacity }]}
            onPress={onAccept}
          >
            <Text style={styles.primaryText}>{t('moderation.rulesAccept')}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={onDecline}>
            <Text style={styles.secondaryText}>{t('moderation.rulesDecline')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return { accepted, gate, element };
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,38,28,0.45)', justifyContent: 'center', padding: space.xl },
  card: { backgroundColor: color.surface, borderRadius: radius.xl, padding: space.xl, maxHeight: '88%' },
  content: { paddingBottom: space.sm },
  icon: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: color.accentSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: space.md,
  },
  title: { ...type.title, fontWeight: weight.bold, color: color.text },
  intro: { ...type.body, color: color.textMuted, marginTop: space.xs },
  rules: { marginTop: space.lg, gap: space.md },
  ruleRow: { flexDirection: 'row', gap: space.sm },
  ruleIcon: { marginTop: 2 },
  ruleText: { ...type.body, color: color.text, flex: 1 },
  zeroTolerance: {
    ...type.caption, color: color.text, marginTop: space.lg, padding: space.md,
    borderRadius: radius.md, backgroundColor: color.surfaceSunken,
  },
  link: { ...type.body, color: color.accent, fontWeight: weight.semibold, marginTop: space.md },
  primary: {
    marginTop: space.lg, minHeight: 50, borderRadius: radius.md, backgroundColor: color.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryText: { ...type.bodyLarge, color: color.textOnAccent, fontWeight: weight.semibold },
  secondary: { paddingTop: space.md, alignItems: 'center' },
  secondaryText: { ...type.body, color: color.textMuted, fontWeight: weight.semibold },
});
