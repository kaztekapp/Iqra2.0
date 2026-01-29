import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { JUZ_INTRO_LESSONS, JuzIntroLesson } from '../../../../src/data/arabic/quran/lessons/juzLessons';

// Content Block Component
function ContentBlock({ item }: { item: { type: string; text: string; icon?: string } }) {
  const getBlockStyle = () => {
    switch (item.type) {
      case 'fact':
        return {
          bg: '#3b82f615',
          border: '#3b82f630',
          iconBg: '#3b82f620',
          iconColor: '#3b82f6',
        };
      case 'tip':
        return {
          bg: '#22c55e15',
          border: '#22c55e30',
          iconBg: '#22c55e20',
          iconColor: '#22c55e',
        };
      case 'example':
        return {
          bg: '#f59e0b15',
          border: '#f59e0b30',
          iconBg: '#f59e0b20',
          iconColor: '#f59e0b',
        };
      default:
        return null;
    }
  };

  const style = getBlockStyle();

  if (!style) {
    // Regular text block
    return (
      <View style={styles.textBlock}>
        <Text style={styles.textContent}>{item.text}</Text>
      </View>
    );
  }

  // Styled block (fact, tip, example)
  return (
    <View
      style={[
        styles.styledBlock,
        { backgroundColor: style.bg, borderColor: style.border },
      ]}
    >
      <View style={[styles.blockIconContainer, { backgroundColor: style.iconBg }]}>
        <Ionicons
          name={item.icon as any || 'information-circle'}
          size={20}
          color={style.iconColor}
        />
      </View>
      <View style={styles.blockContent}>
        <Text style={styles.blockLabel}>
          {item.type === 'fact' ? 'Did you know?' : item.type === 'tip' ? 'Tip' : 'Example'}
        </Text>
        <Text style={styles.blockText}>{item.text}</Text>
      </View>
    </View>
  );
}

export default function IntroLessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  const lesson = JUZ_INTRO_LESSONS.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found</Text>
          <Pressable style={styles.backButtonError} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Find current and next lesson
  const currentIndex = JUZ_INTRO_LESSONS.findIndex((l) => l.id === lessonId);
  const nextLesson = JUZ_INTRO_LESSONS[currentIndex + 1];
  const prevLesson = JUZ_INTRO_LESSONS[currentIndex - 1];

  const handleNext = () => {
    if (nextLesson) {
      router.replace(`/quran/juz/intro/${nextLesson.id}` as any);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      router.replace(`/quran/juz/intro/${prevLesson.id}` as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerProgress}>
          <Text style={styles.headerProgressText}>
            {currentIndex + 1} / {JUZ_INTRO_LESSONS.length}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Card */}
        <View style={styles.titleCard}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.titleGradient}
          >
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonTitleArabic}>{lesson.titleArabic}</Text>
            <View style={styles.divider} />
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          </LinearGradient>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {lesson.content.map((item, index) => (
            <ContentBlock key={index} item={item} />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {prevLesson ? (
            <Pressable style={styles.navButtonPrev} onPress={handlePrev}>
              <Ionicons name="arrow-back" size={20} color="#3b82f6" />
              <View style={styles.navButtonContent}>
                <Text style={styles.navButtonLabel}>Previous</Text>
                <Text style={styles.navButtonTitle} numberOfLines={1}>
                  {prevLesson.title}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View style={styles.navButtonPlaceholder} />
          )}

          {nextLesson ? (
            <Pressable style={styles.navButtonNext} onPress={handleNext}>
              <View style={styles.navButtonContent}>
                <Text style={[styles.navButtonLabel, { textAlign: 'right' }]}>Next</Text>
                <Text style={[styles.navButtonTitle, { textAlign: 'right' }]} numberOfLines={1}>
                  {nextLesson.title}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </Pressable>
          ) : (
            <Pressable
              style={styles.navButtonComplete}
              onPress={() => router.back()}
            >
              <Text style={styles.navButtonCompleteText}>Complete</Text>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            </Pressable>
          )}
        </View>

        <View style={{ height: 100 }} />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerProgress: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  headerProgressText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  titleCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  titleGradient: {
    padding: 24,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  lessonTitleArabic: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontWeight: '600',
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginVertical: 16,
  },
  lessonDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  textBlock: {
    marginBottom: 20,
  },
  textContent: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 26,
  },
  styledBlock: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  blockIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockContent: {
    flex: 1,
    marginLeft: 12,
  },
  blockLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  blockText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 32,
    gap: 12,
  },
  navButtonPrev: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  navButtonNext: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  navButtonPlaceholder: {
    flex: 1,
  },
  navButtonContent: {
    flex: 1,
  },
  navButtonLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  navButtonTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 2,
  },
  navButtonComplete: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  navButtonCompleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 20,
  },
  backButtonError: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
