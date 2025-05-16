import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/types/article';
import { Platform } from 'react-native';

// Cross-platform storage implementation that works on both web and native
export const storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting item ${key} in storage:`, error);
    }
  },
  
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error getting item ${key} from storage:`, error);
      return null;
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing item ${key} from storage:`, error);
    }
  },
};

// Bookmarks handling
export const getBookmarkedArticles = async (): Promise<Article[]> => {
  try {
    const bookmarks = await storage.getItem('bookmarkedArticles');
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarked articles:', error);
    return [];
  }
};

export const isArticleBookmarked = async (article: Article): Promise<boolean> => {
  const bookmarks = await getBookmarkedArticles();
  return bookmarks.some(bookmark => bookmark.url === article.url);
};

export const toggleBookmark = async (article: Article): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarkedArticles();
    const isBookmarked = bookmarks.some(bookmark => bookmark.url === article.url);
    
    let updatedBookmarks: Article[];
    
    if (isBookmarked) {
      // Remove from bookmarks
      updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== article.url);
    } else {
      // Add to bookmarks
      updatedBookmarks = [...bookmarks, article];
    }
    
    await storage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
    return !isBookmarked;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return false;
  }
};