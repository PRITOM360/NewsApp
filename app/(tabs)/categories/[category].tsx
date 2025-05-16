import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ArticleCard from '@/components/articles/ArticleCard';
import { useTheme } from '@/context/ThemeContext';
import { fetchTopHeadlines } from '@/api/newsApi';
import { Article } from '@/types/article';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import ArticleCardSkeleton from '@/components/articles/ArticleCardSkeleton';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import HeaderBar from '@/components/navigation/HeaderBar';
import { ArrowLeft } from 'lucide-react-native';
import { categoryList } from '@/constants/categories';

export default function CategoryScreen() {
  const { theme } = useTheme();
  const { preferences } = useUserPreferences();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { category } = params;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const categoryInfo = categoryList.find(c => c.id === category);
  const categoryName = categoryInfo ? categoryInfo.name : (category as string || 'News');
  
  const fetchCategoryArticles = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTopHeadlines({
        country: preferences.region || 'us',
        category: category as string
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
    fetchCategoryArticles();
  }, [category, preferences.region]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategoryArticles();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar 
        title={categoryName} 
        leftIcon={<ArrowLeft size={24} color={theme.colors.text} />}
        onLeftPress={() => router.back()}
      />
      
      {error ? (
        <ErrorDisplay 
          message={error} 
          onRetry={fetchCategoryArticles} 
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