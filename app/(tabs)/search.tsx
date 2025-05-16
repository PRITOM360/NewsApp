import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import HeaderBar from '@/components/navigation/HeaderBar';
import { useTheme } from '@/context/ThemeContext';
import ArticleCard from '@/components/articles/ArticleCard';
import { Article } from '@/types/article';
import SearchBar from '@/components/search/SearchBar';
import { searchNews } from '@/api/newsApi';
import SearchFilters from '@/components/search/SearchFilters';
import { SearchParams } from '@/types/searchParams';
import { Search as SearchIcon } from 'lucide-react-native';
import EmptyState from '@/components/common/EmptyState';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<SearchParams>({
    q: '',
    sortBy: 'publishedAt',
    language: 'en',
  });

  const handleSearch = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      setLoading(true);
      setSearched(true);
      const searchParams: SearchParams = {
        ...filters,
        q: text,
      };
      
      const results = await searchNews(searchParams);
      setArticles(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<SearchParams>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Re-run search with new filters if there's a query
    if (searchText.trim()) {
      handleSearch(searchText);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Search News" />
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={() => handleSearch(searchText)}
        />
        
        <SearchFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          {!searched ? (
            <EmptyState
              icon={<SearchIcon size={48} color={theme.colors.primary} />}
              title="Search for news"
              message="Enter keywords to find news articles from around the world"
            />
          ) : articles.length === 0 ? (
            <EmptyState
              icon={<SearchIcon size={48} color={theme.colors.primary} />}
              title="No results found"
              message="Try different keywords or adjust your filters"
            />
          ) : (
            <FlatList
              data={articles}
              keyExtractor={(item) => item.url}
              renderItem={({ item, index }) => (
                <ArticleCard 
                  article={item} 
                  style={{ marginBottom: index === articles.length - 1 ? 100 : 16 }}
                />
              )}
              contentContainerStyle={styles.listContent}
              ListHeaderComponent={() => (
                <Text style={[styles.resultsText, { color: theme.colors.text }]}>
                  {articles.length} result{articles.length !== 1 ? 's' : ''} for "{searchText}"
                </Text>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
});