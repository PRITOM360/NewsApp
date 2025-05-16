import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({
  title,
  children,
}) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        {title}
      </Text>
      
      <View style={[styles.content, { backgroundColor: theme.colors.cardBackground }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  content: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default SettingSection;