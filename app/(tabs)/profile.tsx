import { View, Text, ScrollView, Pressable, StyleSheet, Modal, Alert, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { clipStoreSize } from '../../src/services/speech/arabicVoiceCache';
import { audioCacheService } from '../../src/services/audioCacheService';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../src/stores/progressStore';
import { ACHIEVEMENTS, Achievement } from '../../src/data/achievements';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { signOut, deleteAccount } from '../../src/services/authService';
import { getProfile, upsertProfile } from '../../src/services/profileService';
import { useRouter, Href, useFocusEffect } from 'expo-router';
import { useAdStore } from '../../src/stores/adStore';
import { iapService } from '../../src/services/iapService';
import { ENABLE_ADS } from '../../src/services/adService';
import { COMMUNITY_ENABLED } from '../../src/config/features';
import { markProgressReset } from '../../src/services/progressSync';
import { useCommunityStore } from '../../src/stores/communityStore';
import * as communityService from '../../src/services/communityService';
import { Txt, Arabic, IlluminatedRule, MastheadWash, withAlpha } from '../../src/components/ui/Primitives';
import { color, space, gutter, font, radius } from '../../src/theme/tokens';
import type { IoniconName } from '../../src/theme/icons';
import { errorMessage } from '../../src/lib/report';
import Constants from 'expo-constants';
import { useQuranStore } from '../../src/stores/quranStore';
import { useProphetStoriesStore } from '../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../src/stores/quranStoriesStore';
import { clockLabel } from '../../src/components/TimePickerSheet';
import { ArText } from '../../src/components/arabic/ArText';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const isAuthenticated = useSettingsStore((s) => s.isAuthenticated);

  const progress = useProgressStore((s) => s.progress);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const unlockedAchievements = useProgressStore((s) => s.unlockedAchievements);
  const newAchievement = useProgressStore((s) => s.newAchievement);
  const clearNewAchievement = useProgressStore((s) => s.clearNewAchievement);
  const getUnlockedAchievements = useProgressStore((s) => s.getUnlockedAchievements);

  const unlockedList = getUnlockedAchievements();
  const lockedList = ACHIEVEMENTS.filter((a) => !unlockedAchievements.includes(a.id));

  // What the reader has done in the Quran, for the stats under their name.
  const surahsMemorized = useQuranStore(
    (s) => Object.values(s.progress.surahProgress).filter((p) => p?.status === 'completed').length
  );
  const storiesFinished =
    useProphetStoriesStore((s) => s.getTotalStoriesCompleted()) + useQuranStoriesStore((s) => s.getTotalStoriesCompleted());

  // The Reminders row says when they come, in a few words.
  const reminders = useSettingsStore((s) => s.reminders);
  const reminderDays = reminders.days?.length ?? 7;
  const reminderTime = clockLabel(reminders.hour, reminders.minute, language);
  const reminderSummary = !reminders.enabled
    ? t('reminders.summaryOff')
    : reminderDays === 7
      ? t('reminders.summaryOn', { time: reminderTime })
      : t('reminders.summaryDays', { time: reminderTime, count: reminderDays });

  // ── Gamification data ──────────────────────────────────────────
  const [refreshing, setRefreshing] = useState(false);

  // What is kept for offline listening, for the Storage row. Measured each
  // time Profile comes into view, after it is up: the Storage page can clear
  // it, and listing the files must not slow the tab down.
  const [keptBytes, setKeptBytes] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const id = setTimeout(() => {
        const quran = audioCacheService.reciterUsage().reduce((n, r) => n + r.bytes, 0);
        setKeptBytes(quran + clipStoreSize());
      }, 300);
      return () => clearTimeout(id);
    }, [])
  );

  const userId = useSettingsStore((s) => s.user?.id);

  const dailyChallenge = useCommunityStore((s) => s.dailyChallenge);
  const initializeChallenges = useCommunityStore((s) => s.initializeChallenges);

  useEffect(() => {
    initializeChallenges();
    if (userId && progress.totalXp > 0) {
      communityService.syncProgress(userId, progress.totalXp, progress.currentStreak, progress.longestStreak);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    initializeChallenges();
    setRefreshing(false);
  }, [initializeChallenges]);

  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLogOut = () => {
    Alert.alert(
      t('profile.logOutConfirmTitle'),
      t('profile.logOutConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.logOut'),
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to permanently delete your profile and all associated data? This action cannot be undone.',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: 'Delete Profile',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'This will permanently delete your profile, progress, and all data. Are you absolutely sure?',
              [
                { text: t('common.cancel'), style: 'cancel' },
                {
                  text: 'Delete Forever',
                  style: 'destructive',
                  onPress: async () => {
                    setIsDeletingAccount(true);
                    try {
                      await deleteAccount();
                    } catch (e) {
                      Alert.alert(t('common.error') || 'Error', errorMessage(e) || 'Could not delete account. Please try again.');
                      setIsDeletingAccount(false);
                      return;
                    }
                    try {
                      resetProgress();
                    } finally {
                      setIsDeletingAccount(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  // Remove Ads / Premium
  const isPremium = useAdStore((s) => s.isPremium);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [removeAdsPrice, setRemoveAdsPrice] = useState<string | null>(null);

  useEffect(() => {
    if (ENABLE_ADS && !isPremium) {
      let isMounted = true;
      iapService.getRemoveAdsProduct().then((product) => {
        if (isMounted && product) setRemoveAdsPrice(product.displayPrice);
      }).catch(() => {});
      return () => { isMounted = false; };
    }
  }, [isPremium]);

  const handlePurchaseRemoveAds = async () => {
    setIsPurchasing(true);
    try {
      await iapService.purchaseRemoveAds();
    } catch (e) {
      Alert.alert(t('ads.purchaseError'), errorMessage(e) || t('ads.purchaseErrorDesc'));
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    setIsRestoring(true);
    try {
      const restored = await iapService.restorePurchases();
      if (restored) {
        Alert.alert(t('ads.restoreSuccess'), t('ads.restoreSuccessDesc'));
      } else {
        Alert.alert(t('ads.restoreNone'), t('ads.restoreNoneDesc'));
      }
    } catch (e) {
      Alert.alert(t('ads.restoreError'), errorMessage(e) || t('ads.restoreErrorDesc'));
    } finally {
      setIsRestoring(false);
    }
  };

  // Profile info
  const user = useSettingsStore((s) => s.user);
  const [displayName, setDisplayName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const nameInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (user?.id) {
      let isMounted = true;
      getProfile(user.id)
        .then((profile) => {
          if (isMounted && profile?.display_name) setDisplayName(profile.display_name);
        })
        .catch(() => {});
      return () => { isMounted = false; };
    }
  }, [user?.id]);

  const handleEditName = () => {
    setEditNameValue(displayName);
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const handleSaveName = async () => {
    const trimmed = editNameValue.trim();
    if (!trimmed || !user?.id) {
      setIsEditingName(false);
      return;
    }
    setIsSavingName(true);
    try {
      await upsertProfile(user.id, { display_name: trimmed });
      setDisplayName(trimmed);
      setIsEditingName(false);
    } catch {
      Alert.alert(t('common.error') || 'Error', t('profile.saveNameError') || 'Could not save name. Please try again.');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setEditNameValue('');
  };


  const getAchievementProgress = (achievement: Achievement): number => {
    const { type, value } = achievement.condition;
    let current = 0;

    switch (type) {
      case 'letters_learned':
        current = progress.alphabetProgress.lettersLearned.length;
        break;
      case 'words_learned':
        current = progress.vocabularyProgress.wordsLearned.length;
        break;
      case 'lessons_completed':
        current = progress.grammarProgress.lessonsCompleted.length;
        break;
      case 'streak_days':
        current = Math.max(progress.currentStreak, progress.longestStreak);
        break;
      case 'total_xp':
        current = progress.totalXp;
        break;
      case 'exercises_completed':
        current = progress.exerciseResults.totalCompleted;
        break;
      case 'accuracy':
        current = progress.exerciseResults.totalCompleted > 0
          ? Math.round((progress.exerciseResults.totalCorrect / progress.exerciseResults.totalCompleted) * 100)
          : 0;
        break;
      case 'verbs_learned':
        current = progress.verbProgress.verbsLearned.length;
        break;
      default:
        current = 0;
    }

    return Math.min(Math.round((current / value) * 100), 100);
  };

  const shownName = displayName || user?.email?.split('@')[0] || t('profile.learner');
  const initial = (shownName.trim()[0] ?? '?').toUpperCase();

  const categoryColors: Record<string, string> = {
    learning: color.accentStrong,
    streak: color.warning,
    mastery: color.progress,
    special: color.sacred,
  };

  return (
    <SafeAreaView style={styles.container}>
      <MastheadWash />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={color.accent}
            colors={[color.accent]}
          />
        }
      >
        {/* Masthead: Arabic leads, the English name beneath in sentence case. */}
        <View style={styles.header}>
          <Arabic size="title" align="left">الْمَلَفُّ الشَّخْصِي</Arabic>
          <Txt variant="body" tone="muted" style={styles.headerLatin}>
            {t('profile.title')}
          </Txt>
          <IlluminatedRule style={styles.headerRule} />
        </View>

        {/* Who you are, and how far you have come */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            {/* A monogram in gold: the reader's own initial, not a stock figure. */}
            <View style={styles.monogram} accessibilityElementsHidden importantForAccessibility="no">
              <Text style={styles.monogramText} allowFontScaling={false}>{initial}</Text>
            </View>
            <View style={styles.heroInfo}>
              {isEditingName ? (
                <View style={styles.editNameRow}>
                  <TextInput
                    ref={nameInputRef}
                    style={styles.editNameInput}
                    value={editNameValue}
                    onChangeText={setEditNameValue}
                    placeholder={t('profile.enterName') || 'Enter your name'}
                    placeholderTextColor={color.textFaint}
                    maxLength={50}
                    autoCapitalize="words"
                    returnKeyType="done"
                    onSubmitEditing={handleSaveName}
                  />
                  <View style={styles.editNameActions}>
                    {isSavingName ? (
                      <ActivityIndicator size="small" color={color.progress} />
                    ) : (
                      <>
                        <Pressable onPress={handleSaveName} style={styles.editNameBtn} accessibilityRole="button" accessibilityLabel="Save">
                          <Ionicons name="checkmark" size={20} color={color.progress} />
                        </Pressable>
                        <Pressable onPress={handleCancelEditName} style={styles.editNameBtn} accessibilityRole="button" accessibilityLabel="Cancel">
                          <Ionicons name="close" size={20} color={color.danger} />
                        </Pressable>
                      </>
                    )}
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.nameRow}>
                    <Text style={styles.profileName} numberOfLines={1}>
                      {shownName}
                    </Text>
                    <Pressable onPress={handleEditName} style={styles.editNameBtn} accessibilityRole="button" accessibilityLabel={t('profile.editName') || 'Edit name'}>
                      <Ionicons name="pencil" size={15} color={color.textFaint} />
                    </Pressable>
                  </View>
                  {!!user?.email && (
                    <Text style={styles.heroEmail} numberOfLines={1}>{user.email}</Text>
                  )}
                  <View style={styles.xpPill}>
                    <Ionicons name="star" size={13} color={color.textOnAccent} />
                    <Text style={styles.xpPillText}>{progress.totalXp.toLocaleString()} XP</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.statsGrid}>
            <Stat icon="flame" tint={color.warning} value={progress.currentStreak} label={t('profile.dayStreak')} />
            <Stat icon="trophy" tint={color.sacred} value={progress.longestStreak} label={t('profile.bestStreak')} />
            <Stat icon="book" tint={color.accent} value={surahsMemorized} label={t('profile.surahsMemorized')} />
            <Stat icon="library" tint={color.accentStrong} value={storiesFinished} label={t('profile.storiesFinished')} />
          </View>
        </View>

        {/* Challenges */}
        {COMMUNITY_ENABLED && (
          <Pressable
            style={styles.challengeCard}
            onPress={() => router.push('/community/challenges' as Href)}
            accessibilityRole="button"
            accessibilityLabel={t('community.challenges')}
          >
            <View style={styles.challengeIcon}>
              <Ionicons name="flag" size={22} color={color.accent} />
            </View>
            <View style={styles.challengeText}>
              <Text style={styles.challengeTitle}>{t('community.challenges')}</Text>
              <ArText style={styles.challengeArabic}>التحديات</ArText>
            </View>
            {dailyChallenge && (
              <View style={styles.challengeProgressPill}>
                <Text style={styles.challengeProgressText}>
                  {dailyChallenge.currentValue}/{dailyChallenge.targetValue}
                </Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={20} color={color.textFaint} />
          </Pressable>
        )}


        {/* Achievements: earned first, then the next ones with how close they are */}
        <View style={styles.section}>
          <View style={styles.achievementHeader}>
            <Text style={styles.sectionTitle}>{t('profile.achievements')}</Text>
            <View style={styles.achievementCount}>
              <Ionicons name="trophy" size={14} color={color.sacred} />
              <Text style={styles.achievementCountText}>
                {unlockedList.length}/{ACHIEVEMENTS.length}
              </Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementScroll} contentContainerStyle={styles.achievementStrip}>
            {unlockedList.map((achievement) => (
              <View key={achievement.id} style={[styles.achievementCard, { borderColor: withAlpha(categoryColors[achievement.category], 0.35) }]}>
                <View style={[styles.achievementIcon, { backgroundColor: withAlpha(categoryColors[achievement.category], 0.12) }]}>
                  <Ionicons name={achievement.icon as IoniconName} size={22} color={categoryColors[achievement.category]} />
                </View>
                <Text style={styles.achievementTitle} numberOfLines={2}>{achievement.title}</Text>
                <ArText style={styles.achievementTitleArabic} numberOfLines={1}>{achievement.titleArabic}</ArText>
                <View style={styles.achievementXp}>
                  <Ionicons name="star" size={12} color={color.sacred} />
                  <Text style={styles.achievementXpText}>+{achievement.xpReward} XP</Text>
                </View>
              </View>
            ))}
            {lockedList.slice(0, 6).map((achievement) => {
              const progressPercent = getAchievementProgress(achievement);
              return (
                <View key={achievement.id} style={[styles.achievementCard, styles.achievementCardLocked]}>
                  <View style={[styles.achievementIcon, styles.achievementIconLocked]}>
                    <Ionicons name={achievement.icon as IoniconName} size={22} color={color.textFaint} />
                  </View>
                  <Text style={[styles.achievementTitle, styles.achievementTitleLocked]} numberOfLines={2}>{achievement.title}</Text>
                  <Text style={styles.achievementDesc} numberOfLines={2}>{achievement.description}</Text>
                  <View style={styles.achievementProgressBar}>
                    <View style={[styles.achievementProgressFill, { width: `${progressPercent}%` }]} />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Settings: one list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
          <View style={styles.group}>
            <View style={styles.groupRow}>
              <Ionicons name="language-outline" size={21} color={color.textMuted} />
              <Text style={styles.groupTitle}>{t('profile.language')}</Text>
              <View style={styles.segment} accessibilityRole="radiogroup">
                {(['en', 'fr'] as const).map((lang) => (
                  <Pressable
                    key={lang}
                    onPress={() => handleLanguageChange(lang)}
                    style={[styles.segmentOption, language === lang && styles.segmentOptionOn]}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: language === lang }}
                    accessibilityLabel={lang === 'en' ? t('profile.english') : t('profile.french')}
                  >
                    <Text style={[styles.segmentText, language === lang && styles.segmentTextOn]}>{lang === 'en' ? 'English' : 'Français'}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.groupDivider} />
            <NavRow
              icon="notifications-outline"
              title={t('reminders.title')}
              detail={reminderSummary}
              onPress={() => router.push('/reminders' as Href)}
            />
            <View style={styles.groupDivider} />
            <NavRow
              icon="cloud-offline-outline"
              title={t('storage.title')}
              detail={keptBytes > 0 ? t('storage.row', { size: t('storage.mb', { n: Math.round(keptBytes / (1024 * 1024)) }) }) : t('storage.rowEmpty')}
              onPress={() => router.push('/storage' as Href)}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('legal.legal')}</Text>
          <View style={styles.group}>
            <NavRow icon="shield-checkmark-outline" title={t('legal.privacyPolicy')} onPress={() => router.push('/privacy-policy' as Href)} />
            <View style={styles.groupDivider} />
            <NavRow icon="heart-outline" title={t('legal.acknowledgements')} onPress={() => router.push('/acknowledgements' as Href)} />
            <View style={styles.groupDivider} />
            <NavRow icon="document-text-outline" title={t('legal.termsOfService')} onPress={() => router.push('/terms-of-service' as Href)} />
            {COMMUNITY_ENABLED && isAuthenticated && (
              <>
                <View style={styles.groupDivider} />
                <NavRow icon="ban-outline" title={t('moderation.blockedUsers')} onPress={() => router.push('/community/blocked' as Href)} />
              </>
            )}
          </View>
        </View>

        {/* Remove Ads */}
        {ENABLE_ADS && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('ads.removeAds')}</Text>
            <View style={styles.storageCard}>
              {isPremium ? (
                <View style={styles.premiumBadgeRow}>
                  <View style={styles.premiumBadgeIcon}>
                    <Ionicons name="checkmark-circle" size={28} color={color.progress} />
                  </View>
                  <View style={styles.premiumBadgeInfo}>
                    <Text style={styles.premiumBadgeTitle}>{t('ads.premiumActive')}</Text>
                    <Text style={styles.premiumBadgeDesc}>{t('ads.premiumActiveDesc')}</Text>
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.removeAdsHeader}>
                    <View style={styles.removeAdsIcon}>
                      <Ionicons name="shield-checkmark" size={24} color={color.warning} />
                    </View>
                    <View style={styles.removeAdsInfo}>
                      <Text style={styles.storageTitle}>{t('ads.removeAdsTitle')}</Text>
                      <Text style={styles.storageSize}>{t('ads.removeAdsDesc')}</Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.purchaseButton}
                    onPress={handlePurchaseRemoveAds}
                    disabled={isPurchasing}
                    accessibilityRole="button"
                    accessibilityLabel={t('ads.removeAds')}
                  >
                    {isPurchasing ? (
                      <ActivityIndicator size="small" color={color.text} />
                    ) : (
                      <>
                        <Ionicons name="cart" size={18} color={color.text} />
                        <Text style={styles.purchaseButtonText}>
                          {removeAdsPrice ? t('ads.purchaseFor', { price: removeAdsPrice }) : t('ads.removeAds')}
                        </Text>
                      </>
                    )}
                  </Pressable>
                  <Pressable
                    style={styles.restoreButton}
                    onPress={handleRestorePurchases}
                    disabled={isRestoring}
                    accessibilityRole="button"
                    accessibilityLabel={t('ads.restorePurchases')}
                  >
                    {isRestoring ? (
                      <ActivityIndicator size="small" color={color.textMuted} />
                    ) : (
                      <Text style={styles.restoreButtonText}>{t('ads.restorePurchases')}</Text>
                    )}
                  </Pressable>
                </>
              )}
            </View>
          </View>
        )}

        {/* Account: quiet rows; only the two that erase things are red */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.account')}</Text>
          <View style={styles.group}>
            {isAuthenticated && (
              <>
                <ActionRow icon="log-out-outline" title={t('profile.logOut')} onPress={handleLogOut} />
                <View style={styles.groupDivider} />
              </>
            )}
            <ActionRow
              icon="refresh"
              title={t('profile.resetAllProgress')}
              danger
              onPress={() => {
                Alert.alert(t('profile.resetAllProgress'), t('profile.resetConfirmMessage'), [
                  { text: t('common.cancel'), style: 'cancel' },
                  { text: t('profile.resetAllProgress'), style: 'destructive', onPress: () => { resetProgress(); markProgressReset(); } },
                ]);
              }}
            />
            {isAuthenticated && (
              <>
                <View style={styles.groupDivider} />
                <ActionRow
                  icon="trash-outline"
                  title={t('profile.deleteProfile')}
                  danger
                  busy={isDeletingAccount}
                  onPress={handleDeleteAccount}
                />
              </>
            )}
          </View>
          <Text style={styles.version}>Mudarris {Constants.expoConfig?.version ?? ''}</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Achievement Popup Modal */}
      <Modal
        visible={newAchievement !== null}
        transparent
        animationType="fade"
        onRequestClose={clearNewAchievement}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.achievementPopup}>
            <View style={styles.popupGlow} />
            <Text style={styles.popupTitle}>{t('profile.achievementUnlocked')}</Text>
            <ArText style={styles.popupTitleArabic}>إنجاز جديد!</ArText>
            {newAchievement && (
              <>
                <View style={[
                  styles.popupIcon,
                  { backgroundColor: categoryColors[newAchievement.category] + '20' }
                ]}>
                  <Ionicons
                    name={newAchievement.icon as IoniconName}
                    size={48}
                    color={categoryColors[newAchievement.category]}
                  />
                </View>
                <Text style={styles.popupAchievementTitle}>{newAchievement.title}</Text>
                <ArText style={styles.popupAchievementArabic}>{newAchievement.titleArabic}</ArText>
                <Text style={styles.popupDesc}>{newAchievement.description}</Text>
                <View style={styles.popupXpBadge}>
                  <Ionicons name="star" size={18} color={color.warning} />
                  <Text style={styles.popupXpText}>+{newAchievement.xpReward} XP</Text>
                </View>
              </>
            )}
            <Pressable style={styles.popupButton} onPress={clearNewAchievement} accessibilityRole="button" accessibilityLabel={t('common.continue')}>
              <Text style={styles.popupButtonText}>{t('common.continue')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Stat({ icon, tint, value, label }: { icon: IoniconName; tint: string; value: number; label: string }) {
  return (
    <View style={styles.statTile} accessible accessibilityLabel={`${value} ${label}`}>
      <Ionicons name={icon} size={19} color={tint} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={2}>{label}</Text>
    </View>
  );
}

/** A row that opens another screen: icon, title, an optional detail, chevron. */
function NavRow({ icon, title, detail, onPress }: { icon: IoniconName; title: string; detail?: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.groupRow} accessibilityRole="button" accessibilityLabel={detail ? `${title}, ${detail}` : title}>
      <Ionicons name={icon} size={21} color={color.textMuted} />
      <View style={styles.groupText}>
        <Text style={styles.groupTitle}>{title}</Text>
        {detail ? <Text style={styles.groupDetail} numberOfLines={1}>{detail}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={color.textFaint} />
    </Pressable>
  );
}

/** An account action: quiet, red only when it erases something. */
function ActionRow({ icon, title, onPress, danger, busy }: { icon: IoniconName; title: string; onPress: () => void; danger?: boolean; busy?: boolean }) {
  const tint = danger ? color.danger : color.text;
  return (
    <Pressable onPress={onPress} disabled={busy} style={styles.groupRow} accessibilityRole="button" accessibilityLabel={title}>
      {busy ? <ActivityIndicator size="small" color={tint} /> : <Ionicons name={icon} size={21} color={danger ? color.danger : color.textMuted} />}
      <Text style={[styles.groupTitle, { color: tint }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space['2xl'],
  },
  headerLatin: {
    marginTop: 2,
  },
  headerRule: {
    marginTop: space.xl,
  },
  monogram: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.sacredSoft,
    borderWidth: 1.5,
    borderColor: withAlpha(color.sacred, 0.45),
  },
  monogramText: {
    fontSize: 28,
    fontWeight: '700',
    color: color.sacred,
  },
  achievementStrip: {
    paddingRight: 20,
    gap: 12,
  },
  group: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 16,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 56,
    paddingVertical: 12,
  },
  groupText: {
    flex: 1,
    minWidth: 0,
  },
  groupTitle: {
    flex: 1,
    fontSize: 16,
    color: color.text,
  },
  groupDetail: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 2,
  },
  groupDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.border,
    marginLeft: 35,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: color.surfaceSunken,
    borderRadius: radius.full,
    padding: 3,
  },
  segmentOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
  },
  segmentOptionOn: {
    backgroundColor: color.surface,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: color.textMuted,
  },
  segmentTextOn: {
    color: color.accentStrong,
  },
  version: {
    fontSize: 12,
    color: color.textFaint,
    textAlign: 'center',
    marginTop: 16,
  },
  heroCard: {
    backgroundColor: color.surface,
    marginHorizontal: 20,
    borderRadius: radius.xl,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: color.border,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: color.text,
    flexShrink: 1,
  },
  heroEmail: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 2,
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: color.sacred,
    borderRadius: radius.xl,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  xpPillText: {
    color: color.text,
    fontSize: 13,
    fontWeight: '700',
  },
  editNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editNameInput: {
    flex: 1,
    backgroundColor: color.surfaceSunken,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: color.text,
    fontSize: 15,
  },
  editNameActions: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 4,
  },
  editNameBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: color.surfaceRaised,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: color.text,
  },
  statLabel: {
    fontSize: 11,
    color: color.textFaint,
    textAlign: 'center',
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: color.border,
  },
  challengeIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(249, 115, 22, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: color.text,
  },
  challengeArabic: {
    fontFamily: font.arabic,
    lineHeight: 28,
    fontSize: 16,
    color: color.sacred,
    marginTop: 1,
  },
  challengeProgressPill: {
    backgroundColor: color.surfaceSunken,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: color.border,
  },
  challengeProgressText: {
    color: color.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.text,
    marginBottom: 12,
  },
  // Achievement styles
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withAlpha(color.sacred, 0.13),
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  achievementCountText: {
    color: color.sacred,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  achievementScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: 16,
    width: 140,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  achievementCardLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementIconLocked: {
    backgroundColor: color.border,
  },
  achievementTitle: {
    color: color.text,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: color.textMuted,
  },
  achievementTitleArabic: {
    fontFamily: font.arabic,
    lineHeight: 26,
    color: color.sacred,
    fontSize: 16,
    marginTop: 2,
    textAlign: 'center',
  },
  achievementDesc: {
    color: color.textFaint,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },
  achievementXp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  achievementXpText: {
    color: color.warning,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  achievementProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: color.border,
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: color.accentStrong,
    borderRadius: 2,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementPopup: {
    backgroundColor: color.surface,
    borderRadius: radius.xl,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    maxWidth: 320,
    position: 'relative',
    overflow: 'hidden',
  },
  popupGlow: {
    position: 'absolute',
    top: -50,
    width: 200,
    height: 200,
    backgroundColor: color.sacred,
    borderRadius: 100,
    opacity: 0.15,
  },
  popupTitle: {
    color: color.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  popupTitleArabic: {
    fontFamily: font.arabic,
    lineHeight: 38,
    color: color.sacred,
    fontSize: 22,
    marginTop: 4,
    marginBottom: 20,
  },
  popupIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  popupAchievementTitle: {
    color: color.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupAchievementArabic: {
    fontFamily: font.arabic,
    lineHeight: 34,
    color: color.sacred,
    fontSize: 20,
    marginTop: 4,
  },
  popupDesc: {
    color: color.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  popupXpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withAlpha(color.warning, 0.13),
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.xl,
    marginTop: 16,
  },
  popupXpText: {
    color: color.warning,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  popupButton: {
    backgroundColor: color.accentStrong,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: radius.md,
    marginTop: 24,
  },
  popupButtonText: {
    color: color.text,
    fontSize: 16,
    fontWeight: '600',
  },
  // ── Community gamification sections ──────────────────────────────
  // Storage styles
  storageCard: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: 16,
  },
  storageTitle: {
    color: color.text,
    fontSize: 15,
    fontWeight: '600',
  },
  storageSize: {
    color: color.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  // Remove Ads styles
  premiumBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadgeIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: withAlpha(color.progress, 0.13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadgeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  premiumBadgeTitle: {
    color: color.progress,
    fontSize: 16,
    fontWeight: '700',
  },
  premiumBadgeDesc: {
    color: color.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  removeAdsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeAdsIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: withAlpha(color.warning, 0.13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeAdsInfo: {
    flex: 1,
    marginLeft: 12,
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.warning,
    paddingVertical: 14,
    borderRadius: radius.md,
    marginTop: 16,
    gap: 8,
  },
  purchaseButtonText: {
    color: color.text,
    fontSize: 15,
    fontWeight: '700',
  },
  restoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  restoreButtonText: {
    color: color.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
});
