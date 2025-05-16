import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import HeaderBar from '@/components/navigation/HeaderBar';
import { useTheme } from '@/context/ThemeContext';
import CategoryCard from '@/components/categories/CategoryCard';
import { categoryList } from '@/constants/categories';
import { CategoryType } from '@/types/category';

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const [categories] = useState<CategoryType[]>(categoryList);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="News Categories" />
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard category={item} />
        )}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={() => (
          <Text style={[styles.headerText, { color: theme.colors.text }]}>
            Select a category to browse
          </Text>
        )}
      />
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
    paddingHorizontal: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});