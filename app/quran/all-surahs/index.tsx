import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SURAHS } from '../../../src/data/arabic/quran/surahs';

export default function AllSurahsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = SURAHS.filter((surah) => {
    return (
      searchQuery === '' ||
      surah.nameArabic.includes(searchQuery) ||
      surah.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.surahNumber.toString().includes(searchQuery)
    );
  });

  const handleSurahPress = (surahId: string) => {
    router.push(`/quran/surah/${surahId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>All Surahs</Text>
          <Text style={styles.titleArabic}>جَمِيع السُّوَر</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>114</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, number, or meaning..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </Pressable>
          )}
        </View>
      </View>


      {/* Surah List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredSurahs.map((surah) => (
          <Pressable
            key={surah.id}
            style={styles.surahCard}
            onPress={() => handleSurahPress(surah.id)}
          >
            <View style={styles.surahNumber}>
              <Text style={styles.surahNumberText}>{surah.surahNumber}</Text>
            </View>
            <View style={styles.surahInfo}>
              <View style={styles.surahHeader}>
                <Text style={styles.surahNameArabic}>{surah.nameArabic}</Text>
                <Text style={styles.surahNameEnglish}>{surah.nameEnglish}</Text>
              </View>
              <Text style={styles.surahMeaning}>{surah.meaning}</Text>
              <View style={styles.surahMeta}>
                <View style={[
                  styles.typeBadge,
                  { backgroundColor: surah.revelationType === 'Meccan' ? '#10b98120' : '#3b82f620' }
                ]}>
                  <Text style={[
                    styles.typeBadgeText,
                    { color: surah.revelationType === 'Meccan' ? '#10b981' : '#3b82f6' }
                  ]}>
                    {surah.revelationType === 'Meccan' ? 'Meccan' : 'Medinan'}
                  </Text>
                </View>
                <Text style={styles.surahMetaText}>
                  {surah.ayahCount} verses
                </Text>
                <Text style={styles.surahMetaText}>
                  Juz {surah.juz}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </Pressable>
        ))}
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  titleArabic: {
    fontSize: 16,
    color: '#10b981',
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  surahCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  surahNumber: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#10b98120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahNumberText: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
    marginLeft: 14,
  },
  surahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  surahNameArabic: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  surahNameEnglish: {
    color: '#10b981',
    fontSize: 14,
  },
  surahMeaning: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
  surahMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  surahMetaText: {
    color: '#64748b',
    fontSize: 11,
  },
});
