import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { LEARNING_GOALS, LearningGoalId } from '../../src/types/onboarding';
import { useSettingsStore } from '../../src/stores/settingsStore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = 12;
const HORIZONTAL_PADDING = 20;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

export default function GoalsScreen() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<LearningGoalId[]>([]);
  const { setLearningGoals, completeOnboarding } = useSettingsStore();

  const toggleGoal = (id: LearningGoalId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      Alert.alert('', t('common.selectAtLeastOne'));
      return;
    }
    setLearningGoals(selected);
    completeOnboarding();
    router.replace('/auth');
  };

  const hasSelection = selected.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{t('onboarding.selectGoals')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.selectGoalsSubtitle')}</Text>
        </View>

        {/* Goal grid */}
        <View style={styles.grid}>
          {LEARNING_GOALS.map((goal) => {
            const isSelected = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  isSelected && {
                    borderColor: goal.color,
                    backgroundColor: goal.color + '15',
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => toggleGoal(goal.id)}
              >
                <View
                  style={[
                    styles.goalIcon,
                    { backgroundColor: goal.color + '20' },
                  ]}
                >
                  <Ionicons name={goal.icon as any} size={24} color={goal.color} />
                </View>
                <Text style={[styles.goalLabel, isSelected && { color: '#ffffff' }]}>
                  {t(goal.labelKey)}
                </Text>
                <Text style={[styles.goalArabic, isSelected && { opacity: 1 }]}>
                  {goal.arabic}
                </Text>
                {isSelected && (
                  <View style={[styles.checkmark, { backgroundColor: goal.color }]}>
                    <Ionicons name="checkmark" size={12} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        {hasSelection && (
          <Text style={styles.selectionText}>
            {selected.length} {selected.length === 1 ? 'goal' : 'goals'} selected
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            !hasSelection && styles.continueButtonDisabled,
          ]}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text style={[styles.continueText, !hasSelection && { opacity: 0.4 }]}>
            {t('common.continue')}
          </Text>
          <View style={[styles.continueIcon, !hasSelection && { opacity: 0.4 }]}>
            <Ionicons name="arrow-forward" size={18} color="#10b981" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
    marginBottom: CARD_GAP,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  goalLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  goalArabic: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
    alignItems: 'center',
  },
  selectionText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  continueButtonDisabled: {
    backgroundColor: '#1e293b',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  continueIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff20',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
