import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
}) => {
  const { theme } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.cardBackground,
          borderColor: theme.colors.border,
        }
      ]}
    >
      <Search size={20} color={theme.colors.textSecondary} />
      
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Search for news..."
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value.length > 0 && Platform.OS !== 'ios' && (
        <TouchableOpacity 
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <X size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;