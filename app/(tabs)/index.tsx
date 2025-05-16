import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import ArticleCard from '@/components/articles/ArticleCard';
import HeaderBar from '@/components/navigation/HeaderBar';
import { useTheme } from '@/context/ThemeContext';
import { fetchTopHeadlines } from '@/api/newsApi';
import { Article } from '@/types/article';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import ArticleCardSkeleton from '@/components/articles/ArticleCardSkeleton';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import CategoryFilter from '@/components/filters/CategoryFilter';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { preferences } = useUserPreferences();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const fetchArticles = async (category?: string) => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTopHeadlines({
        country: preferences.region || 'us',
        category: category || undefined
      });
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(selectedCategory || undefined);
  }, [preferences.region, selectedCategory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchArticles(selectedCategory || undefined);
    setRefreshing(false);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Today's Headlines" />
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      {error ? (
        <ErrorDisplay 
          message={error} 
          onRetry={() => fetchArticles(selectedCategory || undefined)} 
        />
      ) : (
        <FlatList
          data={loading ? Array(6).fill({}) : articles}
          keyExtractor={(item, index) => (loading ? `skeleton-${index}` : item.url)}
          renderItem={({ item, index }) => 
            loading ? (
              <ArticleCardSkeleton 
                style={{ marginBottom: index === 5 ? 100 : 16 }} 
              />
            ) : (
              <ArticleCard 
                article={item} 
                style={{ marginBottom: index === articles.length - 1 ? 100 : 16 }} 
              />
            )
          }
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
});