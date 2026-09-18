import { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, StyleSheet, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../stores/settingsStore';
import {
  remindersSupported,
  reminderPermission,
  askReminderPermission,
  openNotificationSettings,
  reconcileReminders,
  PermissionState,
} from '../services/reminders';
import { ReminderSettings } from '../services/reminders/plan';
import { color, radius } from '../theme/tokens';
import { withAlpha } from './ui/Primitives';

/**
 * The Reminders card on the Profile screen: one master switch, the study
 * time, and the three optional reminders. Every change re-plans the OS
 * schedule at once, so what the card shows is what will fire.
 */

const TIMES: { hour: number; minute: number }[] = [
  { hour: 6, minute: 0 },
  { hour: 8, minute: 0 },
  { hour: 12, minute: 30 },
  { hour: 18, minute: 0 },
  { hour: 20, minute: 0 },
  { hour: 21, minute: 0 },
];

function clock(hour: number, minute: number, lang: string): string {
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function RemindersCard() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const reminders = useSettingsStore((s) => s.reminders);
  const setReminders = useSettingsStore((s) => s.setReminders);
  const [permission, setPermission] = useState<PermissionState>(remindersSupported() ? 'undetermined' : 'unsupported');

  const refresh = useCallback(() => {
    reminderPermission().then(setPermission).catch(() => {});
  }, []);

  // The user may come back from the phone's settings with a changed answer.
  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  const update = (patch: Partial<ReminderSettings>) => {
    setReminders(patch);
    reconcileReminders();
  };

  const turnOn = async (on: boolean) => {
    update({ enabled: on });
    if (!on) return;
    const state = await askReminderPermission();
    setPermission(state);
    if (state === 'granted') reconcileReminders();
  };

  const supported = permission !== 'unsupported';
  const active = reminders.enabled && permission === 'granted';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="notifications-outline" size={22} color={color.textMuted} />
          <View style={styles.text}>
            <Text style={styles.title}>{t('reminders.title')}</Text>
            <Text style={styles.desc}>{supported ? t('reminders.desc') : t('reminders.needsUpdate')}</Text>
          </View>
        </View>
        <Switch
          value={reminders.enabled && supported}
          onValueChange={turnOn}
          disabled={!supported}
          trackColor={{ false: color.border, true: color.progress }}
          thumbColor={color.surface}
          accessibilityLabel={t('reminders.title')}
        />
      </View>

      {reminders.enabled && supported && permission === 'denied' && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{t('reminders.permissionDenied')}</Text>
          <Pressable
            onPress={openNotificationSettings}
            accessibilityRole="button"
            accessibilityLabel={t('reminders.openSettings')}
            style={styles.noticeButton}
          >
            <Text style={styles.noticeButtonText}>{t('reminders.openSettings')}</Text>
          </Pressable>
        </View>
      )}

      {reminders.enabled && supported && permission === 'undetermined' && (
        <Pressable
          onPress={() => turnOn(true)}
          accessibilityRole="button"
          accessibilityLabel={t('reminders.allow')}
          style={[styles.noticeButton, styles.allowButton]}
        >
          <Text style={styles.noticeButtonText}>{t('reminders.allow')}</Text>
        </Pressable>
      )}

      {active && (
        <>
          <View style={styles.divider} />
          <Text style={styles.label}>{t('reminders.time')}</Text>
          <View style={styles.times}>
            {TIMES.map((tm) => {
              const selected = tm.hour === reminders.hour && tm.minute === reminders.minute;
              return (
                <Pressable
                  key={`${tm.hour}:${tm.minute}`}
                  onPress={() => update({ hour: tm.hour, minute: tm.minute })}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={clock(tm.hour, tm.minute, language)}
                  style={[styles.time, selected && styles.timeActive]}
                >
                  <Text style={[styles.timeText, selected && styles.timeTextActive]}>
                    {clock(tm.hour, tm.minute, language)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.divider} />
          <ToggleRow
            title={t('reminders.streakGuard')}
            desc={t('reminders.streakGuardDesc')}
            value={reminders.streakGuard}
            onChange={(v) => update({ streakGuard: v })}
          />
          <View style={styles.divider} />
          <ToggleRow
            title={t('reminders.reviewsToggle')}
            desc={t('reminders.reviewsDesc')}
            value={reminders.reviews}
            onChange={(v) => update({ reviews: v })}
          />
          <View style={styles.divider} />
          <ToggleRow
            title={t('reminders.kahfToggle')}
            desc={t('reminders.kahfDesc')}
            value={reminders.fridayKahf}
            onChange={(v) => update({ fridayKahf: v })}
          />
        </>
      )}
    </View>
  );
}

function ToggleRow({
  title,
  desc,
  value,
  onChange,
}: {
  title: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.text, styles.textIndent]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: color.border, true: color.progress }}
        thumbColor={color.surface}
        accessibilityLabel={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  textIndent: {
    marginLeft: 34,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  desc: {
    fontSize: 12,
    color: color.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: color.border,
    marginVertical: 14,
  },
  label: {
    fontSize: 12,
    color: color.textMuted,
    marginLeft: 34,
    marginBottom: 8,
  },
  times: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingLeft: 34,
  },
  time: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    backgroundColor: color.surfaceSunken,
  },
  timeActive: {
    backgroundColor: withAlpha(color.accent, 0.13),
    borderWidth: 1,
    borderColor: withAlpha(color.accent, 0.25),
  },
  timeText: {
    color: color.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  timeTextActive: {
    color: color.accent,
    fontWeight: '600',
  },
  notice: {
    marginTop: 12,
    marginLeft: 34,
  },
  noticeText: {
    fontSize: 13,
    color: color.textMuted,
    lineHeight: 18,
  },
  noticeButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
    backgroundColor: withAlpha(color.accent, 0.13),
  },
  allowButton: {
    marginLeft: 34,
    marginTop: 12,
  },
  noticeButtonText: {
    color: color.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
