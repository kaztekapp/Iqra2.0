import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { QUIZ_CATEGORIES } from '../../../src/data/arabic/quran/quizzes';
import { QuizCategoryInfo } from '../../../src/types/quran';

interface CategoryCardProps {
  category: QuizCategoryInfo;
  onPress: () => void;
}

function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable style={styles.categoryCard} onPress={onPress}>
      <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
        <Ionicons name={category.icon as any} size={28} color={category.color} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{category.nameEnglish}</Text>
        <Text style={styles.categoryNameArabic}>{category.nameArabic}</Text>
        <Text style={styles.categoryDesc}>{category.description}</Text>
        <View style={styles.questionCount}>
          <Ionicons name="help-circle-outline" size={14} color="#64748b" />
          <Text style={styles.questionCountText}>{category.questionCount} questions</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748b" />
    </Pressable>
  );
}

export default function QuizCategoriesScreen() {
  const handleCategoryPress = (categoryId: string) => {
    // Juz category has its own dedicated learning screen with Learn/Quiz tabs
    if (categoryId === 'juz') {
      router.push('/quran/juz' as any);
      return;
    }
    // Surah Structure category has its own dedicated learning screen with Learn/Quiz tabs
    if (categoryId === 'surah_structure') {
      router.push('/quran/surah-learn' as any);
      return;
    }
    // Tajweed category has its own dedicated learning screen with Learn/Quiz tabs
    if (categoryId === 'tajweed') {
      router.push('/quran/tajweed-learn' as any);
      return;
    }
    router.push(`/quran/quiz/${categoryId}` as any);
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
            <Text style={styles.title}>Quran Quizzes</Text>
            <Text style={styles.titleArabic}>اختبارات القرآن</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Intro Card */}
        <View style={styles.introCard}>
          <Ionicons name="trophy" size={32} color="#f59e0b" />
          <Text style={styles.introTitle}>Test Your Knowledge</Text>
          <Text style={styles.introDesc}>
            Challenge yourself with quizzes about Surahs, Ayahs, Tajweed, and more!
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Category</Text>
          {QUIZ_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#f59e0b',
    marginTop: 2,
  },
  introCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  introDesc: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 14,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryNameArabic: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  categoryDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  questionCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  questionCountText: {
    fontSize: 12,
    color: '#64748b',
  },
});
