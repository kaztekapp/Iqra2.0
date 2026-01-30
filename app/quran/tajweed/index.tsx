import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TAJWEED_RULES, getAllTajweedCategories, getTajweedRulesByCategory } from '../../../src/data/arabic/quran/tajweed/rules';
import { TAJWEED_CATEGORY_COLORS } from '../../../src/data/arabic/quran/tajweed/colors';
import { useQuranStore } from '../../../src/stores/quranStore';
import { TajweedRuleId } from '../../../src/types/quran';

const CATEGORY_NAMES: Record<string, { english: string; arabic: string }> = {
  noon_sakinah: { english: 'Noon Sakinah & Tanween', arabic: 'النون الساكنة والتنوين' },
  meem_sakinah: { english: 'Meem Sakinah', arabic: 'الميم الساكنة' },
  madd: { english: 'Madd (Elongation)', arabic: 'المد' },
  qalqalah: { english: 'Qalqalah (Echo)', arabic: 'القلقلة' },
  ghunnah: { english: 'Ghunnah (Nasal)', arabic: 'الغنة' },
  lam_shamsiyyah: { english: 'Lam Rules', arabic: 'اللام' },
  recitation_styles: { english: 'Recitation Styles', arabic: 'أساليب التلاوة' },
  other: { english: 'Other Rules', arabic: 'قواعد أخرى' },
};

export default function TajweedRulesScreen() {
  const { isTajweedRuleLearned, isTajweedRuleMastered, progress } = useQuranStore();

  const categories = getAllTajweedCategories();

  const handleRulePress = (ruleId: TajweedRuleId) => {
    router.push(`/quran/tajweed/${ruleId}` as any);
  };

  const getTotalProgress = () => {
    const total = TAJWEED_RULES.length;
    const learned = progress.tajweedProgress.rulesLearned.length;
    return Math.round((learned / total) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Tajweed Rules</Text>
            <Text style={styles.titleArabic}>أحكام التجويد</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>{getTotalProgress()}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getTotalProgress()}%` }]} />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>
                {progress.tajweedProgress.rulesLearned.length}
              </Text>
              <Text style={styles.progressStatLabel}>Learned</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={[styles.progressStatValue, { color: '#f59e0b' }]}>
                {progress.tajweedProgress.rulesMastered.length}
              </Text>
              <Text style={styles.progressStatLabel}>Mastered</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={[styles.progressStatValue, { color: '#8b5cf6' }]}>
                {TAJWEED_RULES.length}
              </Text>
              <Text style={styles.progressStatLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={[styles.categoriesContainer, { marginBottom: 100 }]}>
          {categories.map((category) => {
            const rules = getTajweedRulesByCategory(category);
            const categoryInfo = CATEGORY_NAMES[category] || { english: category, arabic: '' };
            const categoryColor = TAJWEED_CATEGORY_COLORS[category as keyof typeof TAJWEED_CATEGORY_COLORS] || '#64748b';

            return (
              <View key={category} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIcon, { backgroundColor: categoryColor + '20' }]}>
                    <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
                  </View>
                  <View style={styles.categoryTitles}>
                    <Text style={styles.categoryTitle}>{categoryInfo.english}</Text>
                    <Text style={[styles.categoryArabic, { color: categoryColor }]}>
                      {categoryInfo.arabic}
                    </Text>
                  </View>
                </View>

                {/* Rules in Category */}
                {rules.map((rule) => {
                  const isLearned = isTajweedRuleLearned(rule.id);
                  const isMastered = isTajweedRuleMastered(rule.id);

                  return (
                    <Pressable
                      key={rule.id}
                      style={[styles.ruleCard, isLearned && styles.ruleCardLearned]}
                      onPress={() => handleRulePress(rule.id)}
                    >
                      <View style={[styles.ruleColor, { backgroundColor: rule.colorCode }]} />
                      <View style={styles.ruleContent}>
                        <View style={styles.ruleHeader}>
                          <Text style={styles.ruleName}>{rule.nameEnglish}</Text>
                          <Text style={styles.ruleArabic}>{rule.nameArabic}</Text>
                        </View>
                        <Text style={styles.ruleDesc} numberOfLines={2}>
                          {rule.description}
                        </Text>
                      </View>
                      <View style={styles.ruleStatus}>
                        {isMastered ? (
                          <Ionicons name="star" size={20} color="#f59e0b" />
                        ) : isLearned ? (
                          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                        ) : (
                          <Ionicons name="chevron-forward" size={20} color="#64748b" />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleArabic: {
    color: '#10b981',
    fontSize: 16,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  progressPercent: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatValue: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressStatLabel: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryTitles: {
    marginLeft: 12,
  },
  categoryTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryArabic: {
    fontSize: 14,
    marginTop: 2,
  },
  ruleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleCardLearned: {
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  ruleColor: {
    width: 6,
    height: 40,
    borderRadius: 3,
    marginRight: 12,
  },
  ruleContent: {
    flex: 1,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  ruleArabic: {
    color: '#10b981',
    fontSize: 14,
  },
  ruleDesc: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  ruleStatus: {
    marginLeft: 8,
  },
});
