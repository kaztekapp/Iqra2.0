import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { arabicLetters } from '../../src/data/arabic/alphabet/letters';
import { useProgressStore } from '../../src/stores/progressStore';
import { useArabicSpeech } from '../../src/hooks/useArabicSpeech';

export default function AlphabetScreen() {
  const { progress, getAlphabetCompletionPercent } = useProgressStore();
  const { speak, isSpeaking } = useArabicSpeech();
  const learnedLetters = progress.alphabetProgress.lettersLearned;
  const masteredLetters = progress.alphabetProgress.masteredLetters;

  const getLetterStatus = (letterId: string) => {
    if (masteredLetters.includes(letterId)) return 'mastered';
    if (learnedLetters.includes(letterId)) return 'learned';
    return 'new';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return '#22c55e';
      case 'learned':
        return '#D4AF37';
      default:
        return '#6366f1';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>Arabic Alphabet</Text>
            <Text style={styles.titleArabic}>الْحُرُوفُ الْعَرَبِيَّة</Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Your Progress</Text>
            <Text style={styles.progressValue}>
              {learnedLetters.length}/28 letters learned
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${getAlphabetCompletionPercent()}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>
              {getAlphabetCompletionPercent()}%
            </Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#6366f1' }]} />
            <Text style={styles.legendText}>New</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#D4AF37' }]} />
            <Text style={styles.legendText}>Learned</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
            <Text style={styles.legendText}>Mastered</Text>
          </View>
        </View>

        {/* Sun & Moon Letters Card */}
        <View style={styles.specialSection}>
          <Pressable
            style={styles.sunMoonCard}
            onPress={() => router.push('/alphabet/sun-moon-letters' as any)}
          >
            <View style={styles.sunMoonIcons}>
              <View style={styles.sunIcon}>
                <Ionicons name="sunny" size={24} color="#f59e0b" />
              </View>
              <View style={styles.moonIcon}>
                <Ionicons name="moon" size={24} color="#a5b4fc" />
              </View>
            </View>
            <View style={styles.sunMoonContent}>
              <Text style={styles.sunMoonTitle}>Sun & Moon Letters</Text>
              <Text style={styles.sunMoonTitleAr}>الْحُرُوفُ الشَّمْسِيَّة وَالْقَمَرِيَّة</Text>
              <Text style={styles.sunMoonDesc}>Learn how "ال" pronunciation changes</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </Pressable>
        </View>

        {/* Writing Practice Section */}
        <View style={styles.writingSection}>
          <Text style={styles.writingSectionTitle}>Writing Practice</Text>

          {/* Handwriting Practice */}
          <Pressable
            style={styles.writingCard}
            onPress={() => router.push('/alphabet/writing-practice' as any)}
          >
            <View style={styles.writingIcon}>
              <Ionicons name="pencil" size={28} color="#ec4899" />
            </View>
            <View style={styles.writingContent}>
              <Text style={styles.writingTitle}>Handwriting Practice</Text>
              <Text style={styles.writingTitleAr}>الْخَطُّ الْيَدَوِي</Text>
              <Text style={styles.writingDesc}>Draw Arabic letters by hand</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </Pressable>

          {/* Keyboard Typing Practice */}
          <Pressable
            style={[styles.writingCard, { marginTop: 12, borderColor: '#14b8a640' }]}
            onPress={() => router.push('/exercise/typing-practice' as any)}
          >
            <View style={[styles.writingIcon, { backgroundColor: '#14b8a620' }]}>
              <Ionicons name="keypad" size={28} color="#14b8a6" />
            </View>
            <View style={styles.writingContent}>
              <Text style={styles.writingTitle}>Keyboard Typing</Text>
              <Text style={styles.writingTitleAr}>الْكِتَابَةُ بِالْمِفْتَاح</Text>
              <Text style={styles.writingDesc}>Type Arabic words using keyboard</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#64748b" />
          </Pressable>
        </View>

        {/* Letter Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>28 Letters</Text>
          <View style={styles.letterGrid}>
            {arabicLetters.map((letter) => {
              const status = getLetterStatus(letter.id);
              const statusColor = getStatusColor(status);
              return (
                <Pressable
                  key={letter.id}
                  style={[styles.letterCard, { borderColor: statusColor }]}
                  onPress={() => router.push(`/alphabet/${letter.id}` as any)}
                >
                  <Text style={styles.letterArabic}>{letter.letter}</Text>
                  <Text style={styles.letterName}>{letter.name}</Text>
                  <Text style={styles.letterTranslit}>{letter.transliteration}</Text>
                  <Pressable
                    style={styles.letterAudioBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      speak(letter.letter);
                    }}
                  >
                    <Ionicons name="volume-medium" size={14} color="#D4AF37" />
                  </Pressable>
                  {status !== 'new' && (
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                      <Ionicons
                        name={status === 'mastered' ? 'star' : 'checkmark'}
                        size={10}
                        color="white"
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Study Tips */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Study Tips</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={24} color="#D4AF37" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Letter Forms</Text>
              <Text style={styles.tipText}>
                Each Arabic letter has up to 4 forms depending on its position in a
                word: isolated, initial, medial, and final. Tap any letter to see
                all its forms!
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 18,
    color: '#D4AF37',
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  progressValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressPercent: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 12,
    width: 36,
    textAlign: 'right',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  letterGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  letterCard: {
    width: '23%',
    aspectRatio: 0.85,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 8,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  letterArabic: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 4,
  },
  letterName: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
  },
  letterTranslit: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
  letterAudioBtn: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF3720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  specialSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sunMoonCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f140',
    overflow: 'hidden',
  },
  sunMoonIcons: {
    flexDirection: 'row',
    marginRight: 14,
  },
  sunIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f59e0b20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -10,
    zIndex: 1,
  },
  moonIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunMoonContent: {
    flex: 1,
  },
  sunMoonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sunMoonTitleAr: {
    color: '#D4AF37',
    fontSize: 13,
    marginTop: 2,
  },
  sunMoonDesc: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  writingSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  writingSectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  writingCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ec489940',
  },
  writingIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#ec489920',
    alignItems: 'center',
    justifyContent: 'center',
  },
  writingContent: {
    flex: 1,
    marginLeft: 16,
  },
  writingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  writingTitleAr: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 2,
  },
  writingDesc: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
  },
});
