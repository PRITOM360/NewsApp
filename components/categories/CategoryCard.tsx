import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CategoryType } from '@/types/category';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/categories/${category.id}`);
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(500).delay(category.id.length * 50)}
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.cardBackground,
          shadowColor: theme.colors.shadow,
          borderColor: theme.colors.border,
        }
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <ImageBackground
          source={{ uri: category.imageUrl }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <Text style={styles.title}>{category.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 4,
    maxWidth: '48%',
  },
  touchable: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default CategoryCard;