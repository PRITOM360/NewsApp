import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface ArticleCardSkeletonProps {
  style?: ViewStyle;
  fullScreen?: boolean;
}

const ArticleCardSkeleton: React.FC<ArticleCardSkeletonProps> = ({ style, fullScreen = false }) => {
  const { theme } = useTheme();
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0.0, 0.2, 1) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const shimmerStyle = {
    backgroundColor: theme.isDark ? '#333' : '#E0E0E0',
  };

  if (fullScreen) {
    return (
      <View style={[styles.fullContainer, { backgroundColor: theme.colors.background }]}>
        <Animated.View style={[styles.fullImage, shimmerStyle, animatedStyle]} />
        <View style={styles.fullContent}>
          <Animated.View style={[styles.fullTitle, shimmerStyle, animatedStyle]} />
          <Animated.View style={[styles.fullTitle, shimmerStyle, animatedStyle, { width: '80%' }]} />
          
          <View style={styles.metaContainer}>
            <Animated.View style={[styles.source, shimmerStyle, animatedStyle]} />
            <Animated.View style={[styles.date, shimmerStyle, animatedStyle]} />
          </View>
          
          <Animated.View style={[styles.author, shimmerStyle, animatedStyle]} />
          
          <Animated.View style={[styles.paragraph, shimmerStyle, animatedStyle]} />
          <Animated.View style={[styles.paragraph, shimmerStyle, animatedStyle, { width: '90%' }]} />
          <Animated.View style={[styles.paragraph, shimmerStyle, animatedStyle, { width: '95%' }]} />
          <Animated.View style={[styles.paragraph, shimmerStyle, animatedStyle, { width: '85%' }]} />
          <Animated.View style={[styles.paragraph, shimmerStyle, animatedStyle, { width: '80%' }]} />
        </View>
      </View>
    );
  }

  return (
    <View 
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
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.image, shimmerStyle, animatedStyle]} />
        
        <View style={styles.textContainer}>
          <Animated.View style={[styles.title, shimmerStyle, animatedStyle]} />
          <Animated.View style={[styles.title, shimmerStyle, animatedStyle, { width: '70%' }]} />
          
          <Animated.View style={[styles.description, shimmerStyle, animatedStyle]} />
          <Animated.View style={[styles.description, shimmerStyle, animatedStyle, { width: '80%' }]} />
          
          <View style={styles.metaContainer}>
            <Animated.View style={[styles.source, shimmerStyle, animatedStyle]} />
            <Animated.View style={[styles.date, shimmerStyle, animatedStyle]} />
          </View>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, shimmerStyle, animatedStyle]} />
        <Animated.View style={[styles.actionButton, shimmerStyle, animatedStyle]} />
      </View>
    </View>
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
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  description: {
    height: 14,
    marginBottom: 8,
    borderRadius: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  source: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
  date: {
    width: 60,
    height: 12,
    borderRadius: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  // Full screen styles
  fullContainer: {
    flex: 1,
  },
  fullImage: {
    width: '100%',
    height: 250,
  },
  fullContent: {
    padding: 16,
  },
  fullTitle: {
    height: 24,
    marginBottom: 8,
    borderRadius: 4,
  },
  author: {
    width: 150,
    height: 14,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 24,
  },
  paragraph: {
    height: 18,
    borderRadius: 4,
    marginBottom: 12,
  },
});

export default ArticleCardSkeleton;