import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Pressable, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CurriculumItem } from '../../../data/arabic/curriculumSource';
import { color, radius } from '../../../theme/tokens';

/**
 * Pick one of the app's own lessons to put on the board as a course.
 *
 * This replaces the AI drafting modal. It keeps that modal's lesson list,
 * search and row styling exactly, and drops the custom-topic tab, the refine
 * step and the credits, none of which apply when the course comes straight
 * from the curriculum.
 */
interface Props {
  visible: boolean;
  groupColor: string;
  curriculum: CurriculumItem[];
  onPick: (id: string) => void;
  onClose: () => void;
}

export function CoursePickerModal({ visible, groupColor, curriculum, onPick, onClose }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [lessonId, setLessonId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? curriculum.filter((c) => c.title.toLowerCase().includes(q)) : curriculum;
  }, [curriculum, search]);

  const confirm = () => {
    if (lessonId) onPick(lessonId);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: `${groupColor}22` }]}>
              <Ionicons name="library" size={16} color={groupColor} />
            </View>
            <Text style={styles.title}>{t('community.fromAppLesson')}</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={22} color={color.textMuted} />
            </Pressable>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={15} color={color.textFaint} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder={t('community.searchLessons')}
              placeholderTextColor={color.textFaint}
            />
          </View>

          <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
            {filtered.map((c) => {
              const selected = lessonId === c.id;
              return (
                <Pressable
                  key={c.id}
                  style={[styles.lessonRow, selected && { backgroundColor: `${groupColor}18`, borderColor: groupColor }]}
                  onPress={() => setLessonId(c.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Ionicons name={c.kind === 'grammar' ? 'book' : 'language'} size={16} color={selected ? groupColor : color.textFaint} />
                  <Text style={styles.lessonTitle} numberOfLines={1}>{c.title}</Text>
                  <Text style={styles.lessonLevel}>{c.level}</Text>
                </Pressable>
              );
            })}
            {filtered.length === 0 && <Text style={styles.empty}>{t('community.noLessonsMatch')}</Text>}
          </ScrollView>

          <Pressable
            style={[styles.addBtn, { backgroundColor: groupColor }, !lessonId && { opacity: 0.5 }]}
            onPress={confirm}
            disabled={!lessonId}
            accessibilityRole="button"
          >
            <Ionicons name="add" size={18} color={color.text} />
            <Text style={styles.addText}>{t('community.addCourse')}</Text>
          </Pressable>
          <Text style={styles.hint}>{t('community.fromCurriculumHint')}</Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', paddingHorizontal: 20 },
  card: { backgroundColor: color.surface, borderRadius: radius.xl, padding: 18, borderWidth: 1, borderColor: color.border },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  badge: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: 17, fontWeight: '700', color: color.text },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: color.bg, borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: color.border, marginBottom: 8 },
  searchInput: { flex: 1, fontSize: 14, color: color.text },
  list: { maxHeight: 300 },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 11, borderRadius: radius.sm, borderWidth: 1.5, borderColor: 'transparent', backgroundColor: color.bg, marginBottom: 6 },
  lessonTitle: { flex: 1, fontSize: 14, color: color.text, fontWeight: '500' },
  lessonLevel: { fontSize: 11, color: color.textFaint, textTransform: 'capitalize' },
  empty: { fontSize: 13, color: color.textFaint, textAlign: 'center', paddingVertical: 16 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 13, borderRadius: radius.md, marginTop: 16 },
  addText: { color: color.text, fontWeight: '700', fontSize: 15 },
  hint: { fontSize: 11, color: color.textFaint, textAlign: 'center', marginTop: 10 },
});

export default CoursePickerModal;
