import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function VoiceScreen() {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.5);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      false
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Voice AI</Text>
          <Text style={styles.headerArabic}>الذَّكَاءُ الصَّوْتِي</Text>
          <Text style={styles.headerSubtitle}>Coming Soon</Text>
        </View>

        {/* Center Mic Button with Pulse */}
        <View style={styles.micContainer}>
          <Animated.View style={[styles.pulse, pulseStyle]} />
          <View style={styles.micButton}>
            <Ionicons name="mic" size={56} color="white" />
          </View>
        </View>

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descTitle}>Practice Speaking Arabic</Text>
          <Text style={styles.descText}>
            Soon you'll be able to practice your Arabic pronunciation with our
            AI-powered voice assistant. Get real-time feedback on your accent
            and fluency.
          </Text>
        </View>

        {/* Features Coming */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#D4AF37" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Conversational Practice</Text>
              <Text style={styles.featureDesc}>Have real conversations in Arabic</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="analytics" size={20} color="#D4AF37" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Pronunciation Feedback</Text>
              <Text style={styles.featureDesc}>Get instant feedback on your accent</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="flash" size={20} color="#D4AF37" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>AI-Powered Tutoring</Text>
              <Text style={styles.featureDesc}>Personalized learning experience</Text>
            </View>
          </View>
        </View>

        {/* Notify Button */}
        <Pressable style={styles.notifyButton}>
          <Text style={styles.notifyButtonText}>Notify Me When Ready</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerArabic: {
    fontSize: 20,
    color: '#D4AF37',
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pulse: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#6366f1',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  description: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  descTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  descText: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  featureDesc: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  notifyButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
  },
  notifyButtonText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
