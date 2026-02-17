import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Modal, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../src/stores/progressStore';
import { ACHIEVEMENTS, Achievement } from '../../src/data/achievements';
import { useOfflineStore } from '../../src/stores/offlineStore';
import { audioCacheService } from '../../src/services/audioCacheService';
import { useNetworkStatus } from '../../src/hooks/useNetworkStatus';
import { useSettingsStore } from '../../src/stores/settingsStore';
import { signOut } from '../../src/services/authService';
import { useRouter, Href } from 'expo-router';
import * as Updates from 'expo-updates';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { language, setLanguage, isAuthenticated } = useSettingsStore();

  const {
    progress,
    showVowels,
    setShowVowels,
    getAlphabetCompletionPercent,
    getVocabularyCompletionPercent,
    getGrammarCompletionPercent,
    getOverallLevel,
    getAccuracy,
    resetProgress,
    unlockedAchievements,
    newAchievement,
    clearNewAchievement,
    getUnlockedAchievements,
  } = useProgressStore();

  const unlockedList = getUnlockedAchievements();
  const lockedList = ACHIEVEMENTS.filter((a) => !unlockedAchievements.includes(a.id));

  // Offline storage
  const { totalCacheSize, downloadedSurahs, clearAllDownloads, updateCacheSize } = useOfflineStore();
  const { isConnected } = useNetworkStatus();
  const [cacheSize, setCacheSize] = useState('0 B');

  // Update diagnostics
  const [updateInfo, setUpdateInfo] = useState<{
    currentId: string | null;
    channel: string | null;
    runtimeVersion: string | null;
    isUpdateAvailable: boolean | null;
    isChecking: boolean;
    lastCheckTime: string | null;
    error: string | null;
  }>({
    currentId: null,
    channel: null,
    runtimeVersion: null,
    isUpdateAvailable: null,
    isChecking: false,
    lastCheckTime: null,
    error: null,
  });

  useEffect(() => {
    updateCacheSize();
    loadUpdateInfo();
  }, []);

  useEffect(() => {
    setCacheSize(audioCacheService.formatBytes(totalCacheSize));
  }, [totalCacheSize]);

  const loadUpdateInfo = async () => {
    try {
      const currentUpdateId = Updates.updateId || 'embedded';
      const channel = Updates.channel || 'none';
      const runtimeVersion = Updates.runtimeVersion || 'unknown';

      setUpdateInfo(prev => ({
        ...prev,
        currentId: currentUpdateId,
        channel: channel,
        runtimeVersion: runtimeVersion,
      }));
    } catch (e) {
      setUpdateInfo(prev => ({
        ...prev,
        error: 'Failed to load update info',
      }));
    }
  };

  const handleCheckForUpdates = async () => {
    setUpdateInfo(prev => ({ ...prev, isChecking: true, error: null }));

    try {
      const update = await Updates.checkForUpdateAsync();
      const now = new Date().toLocaleTimeString();

      setUpdateInfo(prev => ({
        ...prev,
        isUpdateAvailable: update.isAvailable,
        lastCheckTime: now,
        isChecking: false,
      }));

      if (update.isAvailable) {
        Alert.alert(
          'Update Available',
          'An update is available. Would you like to download and install it now?',
          [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Update Now',
              onPress: async () => {
                try {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                } catch (e: any) {
                  Alert.alert('Update Failed', e.message);
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('No Updates', 'You are running the latest version.');
      }
    } catch (e: any) {
      setUpdateInfo(prev => ({
        ...prev,
        isChecking: false,
        error: e.message || 'Unknown error',
        lastCheckTime: new Date().toLocaleTimeString(),
      }));
      Alert.alert('Update Check Failed', e.message || 'Unknown error');
    }
  };

  const handleClearCache = () => {
    Alert.alert(
      t('profile.clearDownloadedTitle'),
      t('profile.clearDownloadedMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.clear'),
          style: 'destructive',
          onPress: async () => {
            await clearAllDownloads();
          },
        },
      ]
    );
  };

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

  const downloadedSurahsCount = Object.keys(downloadedSurahs).length;

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

  const categoryColors: Record<string, string> = {
    learning: '#6366f1',
    streak: '#f59e0b',
    mastery: '#22c55e',
    special: '#D4AF37',
  };

  const levelLabels = {
    beginner: { key: 'profile.beginner', ar: 'الْمُبْتَدِئ' },
    intermediate: { key: 'profile.intermediate', ar: 'الْمُتَوَسِّط' },
    advanced: { key: 'profile.advanced', ar: 'الْمُتَقَدِّم' },
  };

  const currentLevel = getOverallLevel();
  const levelInfo = levelLabels[currentLevel];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{t('profile.title')}</Text>
            <Text style={styles.titleArabic}>الْمَلَفُّ الشَّخْصِي</Text>
          </View>
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.appIcon}
          />
        </View>

        {/* User Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelBadge}>
            <Ionicons name="school" size={32} color="#D4AF37" />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelLabel}>{t('profile.currentLevel')}</Text>
            <Text style={styles.levelValue}>{t(levelInfo.key)}</Text>
            <Text style={styles.levelArabic}>{levelInfo.ar}</Text>
          </View>
          <View style={styles.xpBadge}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.xpText}>{progress.totalXp} XP</Text>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.learningProgress')}</Text>

          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="text" size={20} color="#6366f1" />
                <Text style={styles.progressLabel}>{t('profile.alphabet')}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getAlphabetCompletionPercent()}%`, backgroundColor: '#6366f1' }]} />
                </View>
                <Text style={styles.progressPercent}>{getAlphabetCompletionPercent()}%</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="library" size={20} color="#D4AF37" />
                <Text style={styles.progressLabel}>{t('profile.vocabulary')}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getVocabularyCompletionPercent()}%`, backgroundColor: '#D4AF37' }]} />
                </View>
                <Text style={styles.progressPercent}>{getVocabularyCompletionPercent()}%</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="git-branch" size={20} color="#22c55e" />
                <Text style={styles.progressLabel}>{t('profile.grammar')}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${getGrammarCompletionPercent()}%`, backgroundColor: '#22c55e' }]} />
                </View>
                <Text style={styles.progressPercent}>{getGrammarCompletionPercent()}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.statistics')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={24} color="#f59e0b" />
              <Text style={styles.statValue}>{progress.currentStreak}</Text>
              <Text style={styles.statLabel}>{t('profile.dayStreak')}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#D4AF37" />
              <Text style={styles.statValue}>{progress.longestStreak}</Text>
              <Text style={styles.statLabel}>{t('profile.bestStreak')}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text style={styles.statValue}>{progress.exerciseResults.totalCompleted}</Text>
              <Text style={styles.statLabel}>{t('profile.exercises')}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={24} color="#6366f1" />
              <Text style={styles.statValue}>{getAccuracy()}%</Text>
              <Text style={styles.statLabel}>{t('profile.accuracy')}</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.achievementHeader}>
            <Text style={styles.sectionTitle}>{t('profile.achievements')}</Text>
            <View style={styles.achievementCount}>
              <Ionicons name="trophy" size={14} color="#D4AF37" />
              <Text style={styles.achievementCountText}>
                {unlockedList.length}/{ACHIEVEMENTS.length}
              </Text>
            </View>
          </View>

          {/* Unlocked Achievements */}
          {unlockedList.length > 0 && (
            <View style={styles.achievementsContainer}>
              <Text style={styles.achievementSubtitle}>{t('profile.unlocked')}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.achievementScroll}
              >
                {unlockedList.map((achievement) => (
                  <View
                    key={achievement.id}
                    style={[
                      styles.achievementCard,
                      { borderColor: categoryColors[achievement.category] + '60' }
                    ]}
                  >
                    <View style={[
                      styles.achievementIcon,
                      { backgroundColor: categoryColors[achievement.category] + '20' }
                    ]}>
                      <Ionicons
                        name={achievement.icon as any}
                        size={24}
                        color={categoryColors[achievement.category]}
                      />
                    </View>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementTitleArabic}>{achievement.titleArabic}</Text>
                    <View style={styles.achievementXp}>
                      <Ionicons name="star" size={12} color="#f59e0b" />
                      <Text style={styles.achievementXpText}>+{achievement.xpReward} XP</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Locked Achievements (show next 4) */}
          {lockedList.length > 0 && (
            <View style={styles.achievementsContainer}>
              <Text style={styles.achievementSubtitle}>{t('profile.nextUp')}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.achievementScroll}
              >
                {lockedList.slice(0, 6).map((achievement) => {
                  const progressPercent = getAchievementProgress(achievement);
                  return (
                    <View
                      key={achievement.id}
                      style={[styles.achievementCard, styles.achievementCardLocked]}
                    >
                      <View style={[styles.achievementIcon, styles.achievementIconLocked]}>
                        <Ionicons
                          name={achievement.icon as any}
                          size={24}
                          color="#64748b"
                        />
                      </View>
                      <Text style={[styles.achievementTitle, styles.achievementTitleLocked]}>
                        {achievement.title}
                      </Text>
                      <Text style={styles.achievementDesc} numberOfLines={2}>
                        {achievement.description}
                      </Text>
                      <View style={styles.achievementProgressBar}>
                        <View
                          style={[
                            styles.achievementProgressFill,
                            { width: `${progressPercent}%` }
                          ]}
                        />
                      </View>
                      <Text style={styles.achievementProgressText}>{progressPercent}%</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Offline Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.offlineStorage')}</Text>
          <View style={styles.storageCard}>
            <View style={styles.storageHeader}>
              <View style={styles.storageIcon}>
                <Ionicons name="cloud-download" size={24} color="#6366f1" />
              </View>
              <View style={styles.storageInfo}>
                <Text style={styles.storageTitle}>{t('profile.downloadedContent')}</Text>
                <Text style={styles.storageSize}>{t('profile.used', { size: cacheSize })}</Text>
              </View>
              {!isConnected && (
                <View style={styles.offlineBadge}>
                  <Ionicons name="cloud-offline" size={14} color="#ef4444" />
                  <Text style={styles.offlineBadgeText}>{t('profile.offline')}</Text>
                </View>
              )}
            </View>
            <View style={styles.storageStats}>
              <View style={styles.storageStat}>
                <Text style={styles.storageStatValue}>{downloadedSurahsCount}</Text>
                <Text style={styles.storageStatLabel}>{t('profile.surahsSaved')}</Text>
              </View>
            </View>
            {downloadedSurahsCount > 0 && (
              <Pressable style={styles.clearCacheButton} onPress={handleClearCache}>
                <Ionicons name="trash-outline" size={18} color="#f59e0b" />
                <Text style={styles.clearCacheText}>{t('profile.clearDownloadedAudio')}</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Update Diagnostics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Updates</Text>
          <View style={styles.updateCard}>
            <View style={styles.updateInfoRow}>
              <Text style={styles.updateLabel}>Channel:</Text>
              <Text style={styles.updateValue}>{updateInfo.channel || 'Loading...'}</Text>
            </View>
            <View style={styles.updateInfoRow}>
              <Text style={styles.updateLabel}>Runtime Version:</Text>
              <Text style={styles.updateValue}>{updateInfo.runtimeVersion || 'Loading...'}</Text>
            </View>
            <View style={styles.updateInfoRow}>
              <Text style={styles.updateLabel}>Current Update ID:</Text>
              <Text style={styles.updateValue} numberOfLines={1}>
                {updateInfo.currentId ? updateInfo.currentId.substring(0, 20) + '...' : 'Loading...'}
              </Text>
            </View>
            {updateInfo.lastCheckTime && (
              <View style={styles.updateInfoRow}>
                <Text style={styles.updateLabel}>Last Check:</Text>
                <Text style={styles.updateValue}>{updateInfo.lastCheckTime}</Text>
              </View>
            )}
            {updateInfo.isUpdateAvailable !== null && (
              <View style={styles.updateInfoRow}>
                <Text style={styles.updateLabel}>Update Available:</Text>
                <Text style={[
                  styles.updateValue,
                  { color: updateInfo.isUpdateAvailable ? '#10b981' : '#94a3b8' }
                ]}>
                  {updateInfo.isUpdateAvailable ? 'Yes' : 'No'}
                </Text>
              </View>
            )}
            {updateInfo.error && (
              <View style={styles.updateError}>
                <Ionicons name="warning" size={16} color="#ef4444" />
                <Text style={styles.updateErrorText}>{updateInfo.error}</Text>
              </View>
            )}
            <Pressable
              style={styles.checkUpdateButton}
              onPress={handleCheckForUpdates}
              disabled={updateInfo.isChecking}
            >
              {updateInfo.isChecking ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="refresh" size={18} color="#ffffff" />
                  <Text style={styles.checkUpdateButtonText}>Check for Updates</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
          <View style={styles.settingsCard}>
            {/* Vowel Marks */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="text-outline" size={22} color="#94a3b8" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{t('profile.showVowelMarks')}</Text>
                  <Text style={styles.settingDesc}>{t('profile.showVowelMarksDesc')}</Text>
                </View>
              </View>
              <Switch
                value={showVowels}
                onValueChange={setShowVowels}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={showVowels ? '#ffffff' : '#94a3b8'}
              />
            </View>

            {/* Language Selector */}
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="language-outline" size={22} color="#94a3b8" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{t('profile.language')}</Text>
                  <Text style={styles.settingDesc}>{t('profile.languageDesc')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.languageOptions}>
              <Pressable
                style={[styles.languageOption, language === 'en' && styles.languageOptionActive]}
                onPress={() => handleLanguageChange('en')}
              >
                <Text style={[styles.languageOptionText, language === 'en' && styles.languageOptionTextActive]}>
                  {t('profile.english')}
                </Text>
                {language === 'en' && <Ionicons name="checkmark" size={18} color="#818cf8" />}
              </Pressable>
              <Pressable
                style={[styles.languageOption, language === 'fr' && styles.languageOptionActive]}
                onPress={() => handleLanguageChange('fr')}
              >
                <Text style={[styles.languageOptionText, language === 'fr' && styles.languageOptionTextActive]}>
                  {t('profile.french')}
                </Text>
                {language === 'fr' && <Ionicons name="checkmark" size={18} color="#818cf8" />}
              </Pressable>
            </View>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('legal.legal')}</Text>
          <View style={styles.settingsCard}>
            <Pressable
              style={styles.legalRow}
              onPress={() => router.push('/privacy-policy' as Href)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#94a3b8" />
                <Text style={styles.settingTitle}>{t('legal.privacyPolicy')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </Pressable>
            <View style={styles.settingDivider} />
            <Pressable
              style={styles.legalRow}
              onPress={() => router.push('/terms-of-service' as Href)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="document-text-outline" size={22} color="#94a3b8" />
                <Text style={styles.settingTitle}>{t('legal.termsOfService')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </Pressable>
          </View>
        </View>

        {/* Log Out */}
        {isAuthenticated && (
          <View style={styles.section}>
            <Pressable style={styles.logOutButton} onPress={handleLogOut}>
              <Ionicons name="log-out-outline" size={20} color="#f59e0b" />
              <Text style={styles.logOutButtonText}>{t('profile.logOut')}</Text>
            </Pressable>
          </View>
        )}

        {/* Reset Progress */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable
            style={styles.resetButton}
            onPress={() => {
              resetProgress();
            }}
          >
            <Ionicons name="refresh" size={20} color="#ef4444" />
            <Text style={styles.resetButtonText}>{t('profile.resetAllProgress')}</Text>
          </Pressable>
        </View>
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
            <Text style={styles.popupTitleArabic}>إنجاز جديد!</Text>
            {newAchievement && (
              <>
                <View style={[
                  styles.popupIcon,
                  { backgroundColor: categoryColors[newAchievement.category] + '20' }
                ]}>
                  <Ionicons
                    name={newAchievement.icon as any}
                    size={48}
                    color={categoryColors[newAchievement.category]}
                  />
                </View>
                <Text style={styles.popupAchievementTitle}>{newAchievement.title}</Text>
                <Text style={styles.popupAchievementArabic}>{newAchievement.titleArabic}</Text>
                <Text style={styles.popupDesc}>{newAchievement.description}</Text>
                <View style={styles.popupXpBadge}>
                  <Ionicons name="star" size={18} color="#f59e0b" />
                  <Text style={styles.popupXpText}>+{newAchievement.xpReward} XP</Text>
                </View>
              </>
            )}
            <Pressable style={styles.popupButton} onPress={clearNewAchievement}>
              <Text style={styles.popupButtonText}>{t('common.continue')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  appIcon: {
    width: 68,
    height: 68,
    borderRadius: 16,
    marginTop: -8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 22,
    color: '#D4AF37',
    marginTop: 4,
  },
  levelCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  levelBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 16,
  },
  levelLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  levelValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  levelArabic: {
    fontSize: 16,
    color: '#D4AF37',
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercent: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 12,
    width: 36,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    margin: '1%',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 14,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingLeft: 34,
  },
  languageOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    gap: 6,
  },
  languageOptionActive: {
    backgroundColor: '#818cf820',
    borderWidth: 1,
    borderColor: '#818cf840',
  },
  languageOptionText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  languageOptionTextActive: {
    color: '#818cf8',
    fontWeight: '600',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  logOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b40',
    gap: 8,
  },
  logOutButtonText: {
    color: '#f59e0b',
    fontSize: 15,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ef444440',
  },
  resetButtonText: {
    color: '#ef4444',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
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
    backgroundColor: '#D4AF3720',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  achievementCountText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  achievementsContainer: {
    marginBottom: 16,
  },
  achievementSubtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 8,
  },
  achievementScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
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
    backgroundColor: '#334155',
  },
  achievementTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#94a3b8',
  },
  achievementTitleArabic: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  achievementDesc: {
    color: '#64748b',
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
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  achievementProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  achievementProgressText: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementPopup: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
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
    backgroundColor: '#D4AF37',
    borderRadius: 100,
    opacity: 0.15,
  },
  popupTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  popupTitleArabic: {
    color: '#D4AF37',
    fontSize: 18,
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
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupAchievementArabic: {
    color: '#D4AF37',
    fontSize: 16,
    marginTop: 4,
  },
  popupDesc: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  popupXpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  popupXpText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  popupButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  popupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Storage styles
  storageCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storageIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storageTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  storageSize: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef444420',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  offlineBadgeText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '500',
  },
  storageStats: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  storageStat: {
    flex: 1,
    alignItems: 'center',
  },
  storageStatValue: {
    color: '#6366f1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  storageStatLabel: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  clearCacheButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b20',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  clearCacheText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '600',
  },
  // Update diagnostic styles
  updateCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  updateInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
  updateValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  updateError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef444420',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    gap: 8,
  },
  updateErrorText: {
    color: '#ef4444',
    fontSize: 12,
    flex: 1,
  },
  checkUpdateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  checkUpdateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
