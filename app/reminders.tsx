import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Switch, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../src/stores/settingsStore';
import {
  remindersSupported,
  reminderPermission,
  askReminderPermission,
  openNotificationSettings,
  reconcileReminders,
  PermissionState,
} from '../src/services/reminders';
import { EVERY_DAY, ReminderSettings } from '../src/services/reminders/plan';
import { TimePickerSheet, clockLabel } from '../src/components/TimePickerSheet';
import { withAlpha } from '../src/components/ui/Primitives';
import { color, font, radius } from '../src/theme/tokens';
import { ArText } from '../src/components/arabic/ArText';

type TimeField = 'study' | 'streak' | 'review' | 'kahf';
const FIELDS: Record<TimeField, [keyof ReminderSettings, keyof ReminderSettings]> = {
  study: ['hour', 'minute'],
  streak: ['streakHour', 'streakMinute'],
  review: ['reviewHour', 'reviewMinute'],
  kahf: ['kahfHour', 'kahfMinute'],
};

/** Weekday initials in the reader's language, in the order their calendar starts. */
function weekdays(lang: string): { day: number; short: string; long: string }[] {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  // 2026-11-08 was a Sunday.
  const all = EVERY_DAY.map((day) => {
    const d = new Date(2026, 10, 8 + day);
    return {
      day,
      short: d.toLocaleDateString(locale, { weekday: 'narrow' }),
      long: d.toLocaleDateString(locale, { weekday: 'long' }),
    };
  });
  return lang === 'fr' ? [...all.slice(1), all[0]] : all;
}

/**
 * Every reminder the app can send, each one adjustable: when the daily study
 * reminder comes and on which days, and the time of the streak warning, the
 * reviews note and Friday's al-Kahf. Each change re-plans the phone's
 * schedule at once, so what this screen shows is what will arrive.
 */
export default function RemindersScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reminders = useSettingsStore((s) => s.reminders);
  const setReminders = useSettingsStore((s) => s.setReminders);
  const [permission, setPermission] = useState<PermissionState>(remindersSupported() ? 'undetermined' : 'unsupported');
  const [editing, setEditing] = useState<TimeField | null>(null);

  const refresh = useCallback(() => {
    reminderPermission().then(setPermission).catch(() => {});
  }, []);
  // The reader may come back from the phone's settings with a changed answer.
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
  const time = (f: TimeField) => {
    const [h, m] = FIELDS[f];
    return clockLabel(reminders[h] as number, reminders[m] as number, lang);
  };
  const days = reminders.days?.length ? reminders.days : EVERY_DAY;
  const toggleDay = (day: number) => {
    const next = days.includes(day) ? days.filter((d) => d !== day) : [...days, day].sort();
    // At least one day: a study reminder on no day is reminders turned off.
    if (next.length) update({ days: next });
  };

  const titles: Record<TimeField, string> = {
    study: t('reminders.studyReminder'),
    streak: t('reminders.streakGuard'),
    review: t('reminders.reviewsToggle'),
    kahf: t('reminders.kahfToggle'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('a11y.back')} style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={color.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('reminders.title')}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ArText style={styles.arabic} allowFontScaling={false}>التَّذْكِيرُ</ArText>

        {/* On or off, and what the phone allows */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t('reminders.title')}</Text>
              <Text style={styles.rowDesc}>{supported ? t('reminders.desc') : t('reminders.needsUpdate')}</Text>
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
              <Pressable onPress={openNotificationSettings} accessibilityRole="button" style={styles.noticeButton}>
                <Text style={styles.noticeButtonText}>{t('reminders.openSettings')}</Text>
              </Pressable>
            </View>
          )}
          {reminders.enabled && supported && permission === 'undetermined' && (
            <Pressable onPress={() => turnOn(true)} accessibilityRole="button" style={[styles.noticeButton, styles.allow]}>
              <Text style={styles.noticeButtonText}>{t('reminders.allow')}</Text>
            </Pressable>
          )}
        </View>

        {active && (
          <>
            {/* The daily study reminder: when, and on which days */}
            <Text style={styles.sectionTitle}>{t('reminders.studyReminder')}</Text>
            <View style={styles.card}>
              <Text style={styles.cardNote}>{t('reminders.studyNote')}</Text>
              <TimeRow label={t('reminders.time')} value={time('study')} onPress={() => setEditing('study')} />
              <View style={styles.divider} />
              <Text style={styles.daysLabel}>{t('reminders.days')}</Text>
              <View style={styles.days}>
                {weekdays(lang).map((d) => {
                  const on = days.includes(d.day);
                  return (
                    <Pressable
                      key={d.day}
                      onPress={() => toggleDay(d.day)}
                      style={[styles.day, on && styles.dayOn]}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: on }}
                      accessibilityLabel={d.long}
                    >
                      <Text style={[styles.dayText, on && styles.dayTextOn]}>{d.short}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* The three others, each on its own switch and at its own time */}
            <Text style={styles.sectionTitle}>{t('reminders.more')}</Text>
            <View style={styles.card}>
              <Toggle
                title={t('reminders.streakGuard')}
                desc={t('reminders.streakGuardDesc')}
                value={reminders.streakGuard}
                onChange={(v) => update({ streakGuard: v })}
              />
              {reminders.streakGuard && <TimeRow label={t('reminders.time')} value={time('streak')} onPress={() => setEditing('streak')} indent />}
              <View style={styles.divider} />
              <Toggle
                title={t('reminders.reviewsToggle')}
                desc={t('reminders.reviewsDesc')}
                value={reminders.reviews}
                onChange={(v) => update({ reviews: v })}
              />
              {reminders.reviews && <TimeRow label={t('reminders.time')} value={time('review')} onPress={() => setEditing('review')} indent />}
              <View style={styles.divider} />
              <Toggle
                title={t('reminders.kahfToggle')}
                desc={t('reminders.kahfDesc')}
                value={reminders.fridayKahf}
                onChange={(v) => update({ fridayKahf: v })}
              />
              {reminders.fridayKahf && <TimeRow label={t('reminders.time')} value={time('kahf')} onPress={() => setEditing('kahf')} indent />}
            </View>
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <TimePickerSheet
        visible={editing !== null}
        title={editing ? titles[editing] : ''}
        hour={editing ? (reminders[FIELDS[editing][0]] as number) : 0}
        minute={editing ? (reminders[FIELDS[editing][1]] as number) : 0}
        onSave={(h, m) => editing && update({ [FIELDS[editing][0]]: h, [FIELDS[editing][1]]: m } as Partial<ReminderSettings>)}
        onClose={() => setEditing(null)}
      />
    </SafeAreaView>
  );
}

function Toggle({ title, desc, value, onChange }: { title: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDesc}>{desc}</Text>
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

/** A time that opens the picker: the label, the time in emerald, a chevron. */
function TimeRow({ label, value, onPress, indent }: { label: string; value: string; onPress: () => void; indent?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.timeRow, indent && styles.timeRowIndent]}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${value}`}
    >
      <Text style={styles.timeLabel}>{label}</Text>
      <Text style={styles.timeValue}>{value}</Text>
      <Ionicons name="chevron-forward" size={16} color={color.textFaint} />
    </Pressable>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  arabic: {
    fontFamily: font.quran,
    fontSize: 26,
    lineHeight: 52,
    color: color.sacred,
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    padding: 16,
  },
  cardNote: {
    fontSize: 13,
    color: color.textMuted,
    lineHeight: 19,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  rowDesc: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 2,
    lineHeight: 18,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.border,
    marginVertical: 14,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  timeRowIndent: {
    marginTop: 4,
  },
  timeLabel: {
    flex: 1,
    fontSize: 15,
    color: color.text,
  },
  timeValue: {
    fontSize: 15,
    fontWeight: '700',
    color: color.accentStrong,
    fontVariant: ['tabular-nums'],
  },
  daysLabel: {
    fontSize: 15,
    color: color.text,
    marginBottom: 10,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.surfaceSunken,
  },
  dayOn: {
    backgroundColor: color.accent,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.textMuted,
  },
  dayTextOn: {
    color: color.textOnAccent,
  },
  notice: {
    marginTop: 12,
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
  allow: {
    marginTop: 12,
  },
  noticeButtonText: {
    color: color.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
