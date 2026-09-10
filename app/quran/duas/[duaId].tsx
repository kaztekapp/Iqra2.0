import { useEffect, useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../../src/hooks/useLocalizedContent';
import { getDuaById, getAllDuas } from '../../../src/data/arabic/duas';
import { useDuasStore } from '../../../src/stores/duasStore';
import { useArabicSpeech } from '../../../src/hooks/useArabicSpeech';
import { ArabicVoiceSheet } from '../../../src/components/duas/ArabicVoiceSheet';
import type { ArabicDeviceVoice } from '../../../src/services/speech/arabicTTS';
import { ShareToGroupModal } from '../../../src/components/community/ShareToGroupModal';
import type { SharedContent } from '../../../src/data/community/socialData';
import {
  DUA_CATEGORY_LABELS,
  HADITH_COLLECTION_NAMES,
} from '../../../src/types/duas';
import { font, color, radius } from '../../../src/theme/tokens';
import { withAlpha } from '../../../src/components/ui/Primitives';

export default function DuaDetailScreen() {
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();
  const { duaId } = useLocalSearchParams<{ duaId: string }>();

  const {
    isFavorite,
    isMemorized,
    toggleFavorite,
    toggleMemorized,
    setLastViewed,
  } = useDuasStore();

  // Audio/Speech functionality
  const { speak, stop, isSpeaking, voiceSource, deviceVoiceId, setArabicVoice, listDeviceVoices } = useArabicSpeech();
  const [voiceSheetOpen, setVoiceSheetOpen] = useState(false);
  const [deviceVoices, setDeviceVoices] = useState<ArabicDeviceVoice[] | null>(null);
  const [shareContent, setShareContent] = useState<SharedContent | null>(null);

  // Get dua data
  const dua = duaId ? getDuaById(duaId) : undefined;
  const allDuas = getAllDuas();
  const currentIndex = dua ? allDuas.findIndex(d => d.id === dua.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allDuas.length - 1;

  // Track view
  useEffect(() => {
    if (duaId && dua) {
      setLastViewed(duaId);
    }
  }, [duaId, dua, setLastViewed]);

  const handleToggleFavorite = useCallback(() => {
    if (duaId) {
      toggleFavorite(duaId);
    }
  }, [duaId, toggleFavorite]);

  const handleToggleMemorized = useCallback(() => {
    if (duaId) {
      toggleMemorized(duaId);
    }
  }, [duaId, toggleMemorized]);

  // Handle playing the Arabic text
  const handlePlayDua = useCallback(async () => {
    if (!dua) return;

    if (isSpeaking) {
      await stop();
    } else {
      await speak(dua.arabicText);
    }
  }, [dua, isSpeaking, speak, stop]);

  // The voice picker. The phone's voice list is asked for the first time the
  // sheet opens, then kept: it does not change while the app is running.
  const openVoiceSheet = useCallback(() => {
    setVoiceSheetOpen(true);
    if (deviceVoices === null) {
      listDeviceVoices().then(setDeviceVoices).catch(() => setDeviceVoices([]));
    }
  }, [deviceVoices, listDeviceVoices]);

  const handlePickVoice = useCallback(
    (source: 'online' | 'device', voiceId: string | null) => {
      setArabicVoice(source, voiceId);
      setVoiceSheetOpen(false);
    },
    [setArabicVoice]
  );

  const showDownloadHelp = useCallback(() => {
    Alert.alert(
      t('duasFeature.downloadMoreVoices'),
      t('duasFeature.downloadVoicesInstructions'),
      [{ text: t('duasFeature.ok') }]
    );
  }, [t]);

  // What the voice button says: the chosen device voice by name, or "Online".
  const voiceLabel =
    voiceSource === 'device'
      ? deviceVoices?.find((v) => v.identifier === deviceVoiceId)?.name || t('duasFeature.arabicVoice')
      : t('duasFeature.onlineVoice');

  // Stop speech when leaving screen
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Navigation handlers
  const handlePrevious = useCallback(async () => {
    if (hasPrevious) {
      await stop();
      const prevDua = allDuas[currentIndex - 1];
      router.replace(`/quran/duas/${prevDua.id}` as any);
    }
  }, [hasPrevious, currentIndex, allDuas, stop]);

  const handleNext = useCallback(async () => {
    if (hasNext) {
      await stop();
      const nextDua = allDuas[currentIndex + 1];
      router.replace(`/quran/duas/${nextDua.id}` as any);
    }
  }, [hasNext, currentIndex, allDuas, stop]);

  if (!dua) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={color.warning} />
          <Text style={styles.loadingText}>{t('duasFeature.loadingDua')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = duaId ? isFavorite(duaId) : false;
  const memorized = duaId ? isMemorized(duaId) : false;
  const categoryLabel = DUA_CATEGORY_LABELS[dua.category];
  const collectionName = HADITH_COLLECTION_NAMES[dua.source.collection];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={color.text} />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.duaNameArabic}>{dua.titleArabic}</Text>
          <Text style={styles.duaNameEnglish}>{lc(dua.titleEnglish, dua.titleFrench)}</Text>
        </View>
        <Pressable
          style={styles.backButton}
          onPress={() => setShareContent({
            kind: 'dua',
            arabic: dua.arabicText,
            translit: dua.transliteration,
            translation: lc(dua.translation, dua.translationFr),
            audioText: dua.arabicText,
            ref: dua.titleArabic,
            route: `/quran/duas/${dua.id}`,
          })}
          accessibilityLabel={t('community.shareToGroup', { defaultValue: 'Share to group' })}
        >
          <Ionicons name="paper-plane-outline" size={22} color={color.accent} />
        </Pressable>
      </View>

      {/* Category Badge + Navigation */}
      <View style={styles.subHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{lc(categoryLabel.english, categoryLabel.french)}</Text>
          <Text style={styles.categoryTextArabic}>{categoryLabel.arabic}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.headerNav}>
          <Pressable
            style={[styles.navButton, !hasPrevious && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={!hasPrevious}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={hasPrevious ? color.sacred : color.borderStrong}
            />
          </Pressable>
          <Text style={styles.duaNumber}>{dua.order}/{allDuas.length}</Text>
          <Pressable
            style={[styles.navButton, !hasNext && styles.navButtonDisabled]}
            onPress={handleNext}
            disabled={!hasNext}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={hasNext ? color.sacred : color.borderStrong}
            />
          </Pressable>
        </View>
        </View>

      {/* Content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Arabic Text */}
        <View style={styles.arabicCard}>
          <Text style={styles.arabicText}>{dua.arabicText}</Text>

          {/* Audio Controls */}
          <View style={styles.audioControls}>
            <Pressable style={styles.voiceButton} onPress={openVoiceSheet} accessibilityRole="button" accessibilityLabel={t('duasFeature.chooseVoice')}>
              <Ionicons name={voiceSource === 'device' ? 'phone-portrait-outline' : 'cloud-outline'} size={18} color={color.accent} />
              <Text style={[styles.voiceText, styles.voiceTextFemale]} numberOfLines={1}>{voiceLabel}</Text>
              <Ionicons name="chevron-down" size={14} color={color.textFaint} />
            </Pressable>


            <Pressable
              style={[styles.playButton, isSpeaking && styles.playButtonActive]}
              onPress={handlePlayDua}
            >
              <Ionicons
                name={isSpeaking ? 'stop' : 'play'}
                size={24}
                color={color.text}
              />
              <Text style={styles.playButtonText}>
                {isSpeaking ? t('duasFeature.stop') : t('duasFeature.listen')}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Transliteration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('duasFeature.transliteration')}</Text>
          <Text style={styles.transliterationText}>{dua.transliteration}</Text>
        </View>

        {/* Translation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('duasFeature.translation')}</Text>
          <Text style={styles.translationText}>{lc(dua.translation, dua.translationFr)}</Text>
        </View>

        {/* Source Card */}
        <View style={styles.sourceCard}>
          <View style={styles.sourceHeader}>
            <Ionicons name="book" size={18} color={color.accent} />
            <Text style={styles.sourceTitle}>{t('duasFeature.source')}</Text>
          </View>
          <Text style={styles.sourceCollection}>{collectionName}</Text>
          <Text style={styles.sourceHadith}>{t('duasFeature.hadithNumber', { number: dua.source.hadithNumber })}</Text>
          {dua.source.narrator && (
            <Text style={styles.sourceNarrator}>
              {t('duasFeature.narratedBy')} {dua.source.narrator}
            </Text>
          )}
        </View>

        {/* Occasion */}
        {dua.occasion && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={18} color={color.warning} />
              <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>
                {t('duasFeature.whenToRecite')}
              </Text>
            </View>
            <Text style={styles.occasionText}>{lc(dua.occasion, dua.occasionFr)}</Text>
          </View>
        )}

        {/* Virtues */}
        {dua.virtues && (
          <View style={styles.virtuesCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="star" size={18} color={color.progress} />
              <Text style={[styles.sectionTitle, { color: color.progress, marginLeft: 8, marginBottom: 0 }]}>
                {t('duasFeature.virtuesRewards')}
              </Text>
            </View>
            <Text style={styles.virtuesText}>{lc(dua.virtues, dua.virtuesFr)}</Text>
          </View>
        )}

        {/* Story */}
        {dua.story && (
          <View style={styles.storyCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={18} color={color.accent} />
              <Text style={[styles.sectionTitle, { color: color.accent, marginLeft: 8, marginBottom: 0 }]}>
                {t('duasFeature.backgroundStory')}
              </Text>
            </View>
            <Text style={styles.storyText}>{lc(dua.story, dua.storyFr)}</Text>
          </View>
        )}

        {/* Memorized Toggle */}
        <Pressable
          style={[
            styles.memorizedButton,
            memorized && styles.memorizedButtonActive,
          ]}
          onPress={handleToggleMemorized}
        >
          <Ionicons
            name={memorized ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={22}
            color={memorized ? color.progress : color.textFaint}
          />
          <Text
            style={[
              styles.memorizedButtonText,
              memorized && styles.memorizedButtonTextActive,
            ]}
          >
            {memorized ? t('duasFeature.memorized') : t('duasFeature.markMemorized')}
          </Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ShareToGroupModal
        visible={!!shareContent}
        content={shareContent}
        onClose={() => setShareContent(null)}
      />

      <ArabicVoiceSheet
        visible={voiceSheetOpen}
        source={voiceSource}
        deviceVoiceId={deviceVoiceId}
        voices={deviceVoices || []}
        loading={deviceVoices === null}
        onPick={handlePickVoice}
        onDownloadHelp={showDownloadHelp}
        onClose={() => setVoiceSheetOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: color.textMuted,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
  },
  duaNameArabic: {
    fontFamily: font.arabic,
    lineHeight: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: color.text,
  },
  duaNameEnglish: {
    fontSize: 14,
    color: color.textMuted,
    marginTop: 2,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: radius.lg,
    backgroundColor: color.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  duaNumber: {
    color: color.textFaint,
    fontSize: 13,
    minWidth: 44,
    textAlign: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.borderSubtle,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: withAlpha(color.warning, 0.13),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  categoryText: {
    color: color.warning,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTextArabic: {
    fontFamily: font.arabic,
    lineHeight: 26,
    color: color.warning,
    fontSize: 16,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: color.surface,
    borderRadius: radius.sm,
  },
  contentContainer: {
    flex: 1,
  },
  arabicCard: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: 24,
    margin: 16,
    borderWidth: 1,
    borderColor: withAlpha(color.warning, 0.19),
  },
  arabicText: {
    fontFamily: font.arabic,
    fontSize: 32,
    lineHeight: 60,
    color: color.text,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.surfaceRaised,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.sm,
    gap: 6,
  },
  voiceText: {
    fontSize: 13,
    fontWeight: '600',
  },
  voiceTextFemale: {
    color: color.accent,
  },
  voiceTextMale: {
    color: color.accent,
  },
  voiceButtonDisabled: {
    borderWidth: 1,
    borderColor: withAlpha(color.warning, 0.25),
  },
  voiceTextWarning: {
    color: color.warning,
    fontSize: 13,
    fontWeight: '600',
  },
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.surfaceRaised,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.sm,
    gap: 6,
  },
  speedText: {
    color: color.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  speedTextActive: {
    color: color.warning,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.warning,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.sm,
    gap: 8,
  },
  playButtonActive: {
    backgroundColor: color.danger,
  },
  playButtonText: {
    color: color.text,
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: color.warning,
    marginBottom: 10,
  },
  transliterationText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: color.textMuted,
    lineHeight: 24,
  },
  translationText: {
    fontSize: 15,
    color: color.textMuted,
    lineHeight: 24,
  },
  sourceCard: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: color.accent,
  },
  sourceCollection: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  sourceHadith: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 4,
  },
  sourceNarrator: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 4,
    fontStyle: 'italic',
  },
  occasionText: {
    fontSize: 14,
    color: color.text,
    lineHeight: 22,
    marginTop: 8,
  },
  virtuesCard: {
    backgroundColor: withAlpha(color.progress, 0.06),
    borderRadius: radius.md,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: withAlpha(color.progress, 0.19),
  },
  virtuesText: {
    fontSize: 14,
    color: color.text,
    lineHeight: 22,
    marginTop: 8,
  },
  storyCard: {
    backgroundColor: withAlpha(color.accent, 0.06),
    borderRadius: radius.md,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: withAlpha(color.accent, 0.19),
  },
  storyText: {
    fontSize: 14,
    color: color.text,
    lineHeight: 22,
    marginTop: 8,
  },
  memorizedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.surface,
    borderRadius: radius.md,
    paddingVertical: 16,
    marginHorizontal: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: color.border,
  },
  memorizedButtonActive: {
    backgroundColor: withAlpha(color.progress, 0.13),
    borderColor: withAlpha(color.progress, 0.25),
  },
  memorizedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: color.textMuted,
  },
  memorizedButtonTextActive: {
    color: color.progress,
  },
});
