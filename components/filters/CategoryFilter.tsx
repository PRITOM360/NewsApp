import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { categoryList } from '@/constants/categories';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            {
              backgroundColor: !selectedCategory 
                ? theme.colors.primary 
                : theme.colors.cardBackground,
              borderColor: theme.colors.border,
            }
          ]}
          onPress={() => onCategoryChange(null)}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color: !selectedCategory 
                  ? 'white' 
                  : theme.colors.text,
              }
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        {categoryList.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              {
                backgroundColor: selectedCategory === category.id 
                  ? theme.colors.primary 
                  : theme.colors.cardBackground,
                borderColor: theme.colors.border,
              }
            ]}
            onPress={() => onCategoryChange(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === category.id 
                    ? 'white' 
                    : theme.colors.text,
                }
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});

export default CategoryFilter;