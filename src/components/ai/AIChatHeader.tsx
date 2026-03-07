import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { AIModuleContext, AIModelChoice } from '../../types/aiChat';

interface Props {
  module: AIModuleContext;
  model: AIModelChoice;
  onModelSwitch: () => void;
  onClear: () => void;
  onClose: () => void;
}

const MODULE_LABELS: Record<AIModuleContext, string> = {
  alphabet: 'الحروف',
  vocabulary: 'المفردات',
  grammar: 'النحو',
  verbs: 'الأفعال',
  reading: 'القراءة',
  practice: 'تمارين',
  general: 'عام',
};

export function AIChatHeader({ module, model, onModelSwitch, onClear, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Drag handle */}
      <View style={styles.dragHandle} />

      <View style={styles.headerRow}>
        {/* Teacher info */}
        <View style={styles.teacherInfo}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>أ</Text>
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{t('ai.teacherName')}</Text>
              <Text style={styles.arabicName}>أستاذ</Text>
            </View>
            <View style={styles.badgeRow}>
              <View style={styles.moduleBadge}>
                <Text style={styles.moduleBadgeText}>{MODULE_LABELS[module]}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {/* Model switcher pill */}
          <Pressable onPress={onModelSwitch} style={styles.modelPill}>
            <Ionicons
              name={model === 'sonnet' ? 'diamond' : 'flash'}
              size={12}
              color={model === 'sonnet' ? '#D4AF37' : '#10b981'}
            />
            <Text style={[styles.modelText, model === 'sonnet' && styles.modelTextPremium]}>
              {model === 'sonnet' ? t('ai.modelSonnet') : t('ai.modelHaiku')}
            </Text>
          </Pressable>

          {/* Clear conversation */}
          <Pressable onPress={onClear} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="trash-outline" size={18} color="#64748b" />
          </Pressable>

          {/* Close */}
          <Pressable onPress={onClose} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="close" size={22} color="#94a3b8" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#475569',
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
  },
  arabicName: {
    color: '#D4AF37',
    fontSize: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  moduleBadge: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  moduleBadgeText: {
    color: '#94a3b8',
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modelText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '600',
  },
  modelTextPremium: {
    color: '#D4AF37',
  },
  iconBtn: {
    padding: 4,
  },
});
