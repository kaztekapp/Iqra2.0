import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { getTajweedRuleById } from '../../../src/data/arabic/quran/tajweed/rules';
import { useQuranStore } from '../../../src/stores/quranStore';
import { TajweedRuleId } from '../../../src/types/quran';

export default function TajweedRuleDetailScreen() {
  const { ruleId } = useLocalSearchParams<{ ruleId: string }>();

  const rule = getTajweedRuleById(ruleId as TajweedRuleId);
  const {
    markTajweedRuleLearned,
    markTajweedRuleMastered,
    isTajweedRuleLearned,
    isTajweedRuleMastered,
  } = useQuranStore();

  if (!rule) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Rule not found</Text>
      </SafeAreaView>
    );
  }

  const isLearned = isTajweedRuleLearned(rule.id);
  const isMastered = isTajweedRuleMastered(rule.id);

  const playExample = (text: string) => {
    Speech.speak(text, {
      language: 'ar',
      rate: 0.7,
    });
  };

  const handleMarkLearned = () => {
    markTajweedRuleLearned(rule.id);
  };

  const handleMarkMastered = () => {
    markTajweedRuleMastered(rule.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.ruleName}>{rule.nameEnglish}</Text>
            <Text style={[styles.ruleArabic, { color: rule.colorCode }]}>
              {rule.nameArabic}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {isMastered && <Ionicons name="star" size={24} color="#f59e0b" />}
            {isLearned && !isMastered && (
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            )}
          </View>
        </View>

        {/* Color Indicator */}
        <View style={styles.colorCard}>
          <View style={[styles.colorSwatch, { backgroundColor: rule.colorCode }]} />
          <View style={styles.colorInfo}>
            <Text style={styles.colorLabel}>Tajweed Color</Text>
            <Text style={styles.colorHex}>{rule.colorCode}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.descriptionCard}>
            <Text style={styles.description}>{rule.description}</Text>
            {rule.descriptionArabic && (
              <Text style={styles.descriptionArabic}>{rule.descriptionArabic}</Text>
            )}
          </View>
        </View>

        {/* Letters */}
        {rule.letters && rule.letters.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Letters Involved</Text>
            <View style={styles.lettersContainer}>
              {rule.letters.map((letter, index) => (
                <Pressable
                  key={index}
                  style={styles.letterButton}
                  onPress={() => playExample(letter)}
                >
                  <Text style={styles.letterText}>{letter}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Duration */}
        {rule.duration && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Duration</Text>
            <View style={styles.durationCard}>
              <Ionicons name="time-outline" size={24} color="#10b981" />
              <Text style={styles.durationText}>{rule.duration} Harakat</Text>
            </View>
          </View>
        )}

        {/* Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examples</Text>
          {rule.examples.map((example, index) => (
            <View key={index} style={styles.exampleCard}>
              <Pressable
                style={styles.exampleHeader}
                onPress={() => playExample(example.text)}
              >
                <Text style={styles.exampleArabic}>{example.text}</Text>
                <View style={styles.playIcon}>
                  <Ionicons name="volume-high" size={20} color="#10b981" />
                </View>
              </Pressable>
              <Text style={styles.exampleTranslit}>{example.transliteration}</Text>
              <View style={styles.exampleSource}>
                <Ionicons name="book-outline" size={14} color="#64748b" />
                <Text style={styles.exampleSourceText}>
                  {example.surahName} : {example.ayahNumber}
                </Text>
              </View>
              {example.explanation && (
                <Text style={styles.exampleExplanation}>{example.explanation}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionsContainer, { marginBottom: 100 }]}>
          {!isLearned && (
            <Pressable style={styles.primaryButton} onPress={handleMarkLearned}>
              <Ionicons name="checkmark" size={20} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Mark as Learned</Text>
            </Pressable>
          )}
          {isLearned && !isMastered && (
            <Pressable style={styles.masterButton} onPress={handleMarkMastered}>
              <Ionicons name="star" size={20} color="#ffffff" />
              <Text style={styles.masterButtonText}>Mark as Mastered</Text>
            </Pressable>
          )}
          {isMastered && (
            <View style={styles.masteredBadge}>
              <Ionicons name="star" size={24} color="#f59e0b" />
              <Text style={styles.masteredText}>You've mastered this rule!</Text>
            </View>
          )}
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
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  ruleName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ruleArabic: {
    fontSize: 18,
    marginTop: 4,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  colorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  colorInfo: {
    marginLeft: 16,
  },
  colorLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  colorHex: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 24,
  },
  descriptionArabic: {
    color: '#10b981',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'right',
    lineHeight: 28,
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  letterButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    color: '#ffffff',
    fontSize: 24,
  },
  durationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  exampleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  exampleArabic: {
    color: '#ffffff',
    fontSize: 26,
    flex: 1,
    textAlign: 'right',
  },
  playIcon: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: '#10b98120',
    borderRadius: 20,
  },
  exampleTranslit: {
    color: '#94a3b8',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  exampleSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exampleSourceText: {
    color: '#64748b',
    fontSize: 12,
  },
  exampleExplanation: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionsContainer: {
    paddingHorizontal: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  masterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  masterButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  masteredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b20',
    borderRadius: 16,
    paddingVertical: 20,
    gap: 10,
  },
  masteredText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '600',
  },
});
