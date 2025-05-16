import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { formatDate } from '@/utils/dateFormatter';
import { Article } from '@/types/article';
import { useRouter } from 'expo-router';
import { Bookmark, Share2, Trash2 } from 'lucide-react-native';
import { toggleBookmark, isArticleBookmarked } from '@/utils/storage';
import { Share } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ArticleCardProps {
  article: Article;
  style?: ViewStyle;
  showBookmarkButton?: boolean;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  style,
  showBookmarkButton = true,
  showRemoveButton = false,
  onRemove,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  // Encode the article URL to use as a route param
  const encodedId = encodeURIComponent(article.url);

  React.useEffect(() => {
    const checkBookmarkStatus = async () => {
      const bookmarked = await isArticleBookmarked(article);
      setIsBookmarked(bookmarked);
    };

    checkBookmarkStatus();
  }, [article]);

  const handleBookmark = async () => {
    const newBookmarkState = await toggleBookmark(article);
    setIsBookmarked(newBookmarkState);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        url: article.url,
        title: 'Share this article',
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const handleCardPress = () => {
    router.push(`/article/${encodedId}`);
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(500)}
      style={[
        styles.card, 
        { 
          backgroundColor: theme.colors.cardBackground,
          shadowColor: theme.colors.shadow,
          borderColor: theme.colors.border,
        },
        style
      ]}
    >
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.touchable}
        onPress={handleCardPress}
      >
        <View style={styles.contentContainer}>
          {article.urlToImage ? (
            <Image 
              source={{ uri: article.urlToImage }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View 
              style={[
                styles.imagePlaceholder, 
                { backgroundColor: theme.colors.border }
              ]}
            />
          )}
          
          <View style={styles.textContainer}>
            <Text 
              style={[styles.title, { color: theme.colors.text }]}
              numberOfLines={3}
            >
              {article.title}
            </Text>
            
            <Text 
              style={[styles.description, { color: theme.colors.textSecondary }]}
              numberOfLines={2}
            >
              {article.description}
            </Text>
            
            <View style={styles.metaContainer}>
              <Text style={[styles.source, { color: theme.colors.primary }]}>
                {article.source.name}
              </Text>
              
              <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
                {formatDate(article.publishedAt)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.actionsContainer}>
        {showBookmarkButton && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleBookmark}
          >
            <Bookmark 
              size={20} 
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
              fill={isBookmarked ? theme.colors.primary : 'transparent'} 
            />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleShare}
        >
          <Share2 size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        
        {showRemoveButton && onRemove && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onRemove}
          >
            <Trash2 size={20} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  touchable: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default ArticleCard;