import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Share, TouchableOpacity, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { formatDate } from '@/utils/dateFormatter';
import { Article } from '@/types/article';
import { getArticleById } from '@/api/newsApi';
import { ArrowLeft, Bookmark, Share2 as ShareIcon } from 'lucide-react-native';
import { toggleBookmark, isArticleBookmarked } from '@/utils/storage';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import ArticleCardSkeleton from '@/components/articles/ArticleCardSkeleton';

export default function ArticleDetailScreen() {
  const { theme } = useTheme();
  const { preferences } = useUserPreferences();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id } = params;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate text size based on user preference
  const getTextSize = () => {
    switch (preferences.textSize) {
      case 'small': return 16;
      case 'large': return 20;
      default: return 18;
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) return;
        setLoading(true);
        
        const data = await getArticleById(id as string);
        setArticle(data);
        
        // Check if article is bookmarked
        const bookmarked = await isArticleBookmarked(data);
        setIsBookmarked(bookmarked);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleBookmark = async () => {
    if (!article) return;
    
    const newBookmarkState = await toggleBookmark(article);
    setIsBookmarked(newBookmarkState);
  };

  const handleShare = async () => {
    if (!article) return;
    
    try {
      await Share.share({
        message: Platform.OS === 'ios' ? article.title : `${article.title}\n\n${article.url}`,
        url: article.url,
        title: 'Share this article',
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
          }}
        />
        <ArticleCardSkeleton fullScreen />
      </View>
    );
  }

  if (error || !article) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error || 'Article not found'}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleBookmark}
          >
            <Bookmark 
              size={24} 
              color={isBookmarked ? theme.colors.primary : theme.colors.text}
              fill={isBookmarked ? theme.colors.primary : 'transparent'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleShare}
          >
            <ShareIcon size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {article.urlToImage && (
          <Image 
            source={{ uri: article.urlToImage }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {article.title}
          </Text>
          
          <View style={styles.metaContainer}>
            <Text style={[styles.source, { color: theme.colors.primary }]}>
              {article.source.name}
            </Text>
            <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
              {formatDate(article.publishedAt)}
            </Text>
          </View>
          
          {article.author && (
            <Text style={[styles.author, { color: theme.colors.textSecondary }]}>
              By {article.author}
            </Text>
          )}
          
          <Text style={[
            styles.content, 
            { 
              color: theme.colors.text,
              fontSize: getTextSize(),
              lineHeight: getTextSize() * 1.5,
            }
          ]}>
            {article.content || article.description}
          </Text>
          
          {article.url && (
            <TouchableOpacity
              style={[styles.readMoreButton, { borderColor: theme.colors.primary }]}
              onPress={() => {
                // Open URL in browser
              }}
            >
              <Text style={[styles.readMoreText, { color: theme.colors.primary }]}>
                Read Full Article
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  source: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  author: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 24,
  },
  body: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  readMoreButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  readMoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
});