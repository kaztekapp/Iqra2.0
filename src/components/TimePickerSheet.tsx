import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { color, radius, space, gutter } from '../theme/tokens';

/**
 * Choose a time of day: the hour and the minutes (in fives) on steppers, and
 * AM / PM in English (French reads the 24-hour clock). Built in the app rather
 * than with the phone's own picker, which would need a new store build.
 */
export function clockLabel(hour: number, minute: number, lang: string): string {
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

type Props = {
  visible: boolean;
  title: string;
  hour: number;
  minute: number;
  onSave: (hour: number, minute: number) => void;
  onClose: () => void;
};

export function TimePickerSheet({ visible, title, hour, minute, onSave, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const twelve = i18n.language !== 'fr';
  const [h, setH] = useState(hour);
  const [m, setM] = useState(minute);

  // Each opening starts from the time saved.
  useEffect(() => {
    if (visible) {
      setH(hour);
      setM(minute - (minute % 5));
    }
  }, [visible, hour, minute]);

  const stepHour = (d: number) => setH((x) => (x + d + 24) % 24);
  const stepMinute = (d: number) => setM((x) => (x + d + 60) % 60);
  const pm = h >= 12;
  const setPm = (next: boolean) => {
    if (next !== pm) setH((x) => (x + 12) % 24);
  };
  const hourShown = twelve ? String(h % 12 === 0 ? 12 : h % 12) : String(h).padStart(2, '0');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={t('common.cancel')} />
        <View style={styles.sheet}>
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.dial} accessible accessibilityLabel={clockLabel(h, m, i18n.language)}>
              <Stepper value={hourShown} onUp={() => stepHour(1)} onDown={() => stepHour(-1)} label={t('reminders.hour')} />
              <Text style={styles.colon}>:</Text>
              <Stepper value={String(m).padStart(2, '0')} onUp={() => stepMinute(5)} onDown={() => stepMinute(-5)} label={t('reminders.minutes')} />
              {twelve && (
                <View style={styles.meridiem}>
                  {[false, true].map((isPm) => (
                    <Pressable
                      key={String(isPm)}
                      onPress={() => setPm(isPm)}
                      style={[styles.meridiemOption, pm === isPm && styles.meridiemOn]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: pm === isPm }}
                    >
                      <Text style={[styles.meridiemText, pm === isPm && styles.meridiemTextOn]}>{isPm ? 'PM' : 'AM'}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <Pressable
              style={styles.save}
              onPress={() => {
                onSave(h, m);
                onClose();
              }}
              accessibilityRole="button"
              accessibilityLabel={t('reminders.saveTime')}
            >
              <Text style={styles.saveText}>{t('reminders.saveTime')}</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

function Stepper({ value, onUp, onDown, label }: { value: string; onUp: () => void; onDown: () => void; label: string }) {
  return (
    <View style={styles.stepper}>
      <Pressable onPress={onUp} style={styles.stepButton} hitSlop={6} accessibilityRole="button" accessibilityLabel={`${label} +`}>
        <Ionicons name="chevron-up" size={24} color={color.accentStrong} />
      </Pressable>
      <Text style={styles.value} allowFontScaling={false}>{value}</Text>
      <Pressable onPress={onDown} style={styles.stepButton} hitSlop={6} accessibilityRole="button" accessibilityLabel={`${label} −`}>
        <Ionicons name="chevron-down" size={24} color={color.accentStrong} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(20, 38, 28, 0.28)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: color.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  safe: {
    paddingHorizontal: gutter,
    paddingBottom: space.lg,
  },
  handleRow: {
    alignItems: 'center',
    paddingVertical: space.sm,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: color.border,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: color.text,
    textAlign: 'center',
    marginTop: space.xs,
  },
  dial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.md,
    paddingVertical: space.xl,
  },
  stepper: {
    alignItems: 'center',
    gap: space.xs,
  },
  stepButton: {
    width: 56,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 44,
    fontWeight: '700',
    color: color.text,
    fontVariant: ['tabular-nums'],
    minWidth: 72,
    textAlign: 'center',
  },
  colon: {
    fontSize: 40,
    fontWeight: '700',
    color: color.textFaint,
    marginBottom: 4,
  },
  meridiem: {
    gap: space.sm,
    marginLeft: space.sm,
  },
  meridiemOption: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },
  meridiemOn: {
    backgroundColor: color.accent,
  },
  meridiemText: {
    fontSize: 15,
    fontWeight: '600',
    color: color.textMuted,
  },
  meridiemTextOn: {
    color: color.textOnAccent,
  },
  save: {
    backgroundColor: color.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: color.textOnAccent,
    fontSize: 16,
    fontWeight: '700',
  },
});
