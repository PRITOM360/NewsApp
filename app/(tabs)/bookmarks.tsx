import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import HeaderBar from '@/components/navigation/HeaderBar';
import { useTheme } from '@/context/ThemeContext';
import ArticleCard from '@/components/articles/ArticleCard';
import { Article } from '@/types/article';
import { getBookmarkedArticles } from '@/utils/storage';
import EmptyState from '@/components/common/EmptyState';
import { Bookmark } from 'lucide-react-native';

export default function BookmarksScreen() {
  const { theme } = useTheme();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoading(true);
      const bookmarks = await getBookmarkedArticles();
      setBookmarkedArticles(bookmarks);
      setLoading(false);
    };

    loadBookmarks();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Your Bookmarks" />
      
      {bookmarkedArticles.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={48} color={theme.colors.primary} />}
          title="No bookmarks yet"
          message="Articles you bookmark will appear here for offline reading"
          buttonText="Browse Articles"
          buttonLink="/"
        />
      ) : (
        <FlatList
          data={bookmarkedArticles}
          keyExtractor={(item) => item.url}
          renderItem={({ item, index }) => (
            <ArticleCard 
              article={item} 
              style={{ marginBottom: index === bookmarkedArticles.length - 1 ? 100 : 16 }} 
              showBookmarkButton={false}
              showRemoveButton
              onRemove={() => {
                setBookmarkedArticles(bookmarkedArticles.filter(
                  article => article.url !== item.url
                ));
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <Text style={[styles.headerText, { color: theme.colors.text }]}>
              {bookmarkedArticles.length} saved article{bookmarkedArticles.length !== 1 ? 's' : ''}
            </Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
});