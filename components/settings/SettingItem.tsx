import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ChevronRight } from 'lucide-react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  value,
  right,
  onPress,
}) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          borderBottomColor: theme.colors.border,
        }
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
        
        {value && (
          <Text style={[styles.value, { color: theme.colors.textSecondary }]}>
            {value}
          </Text>
        )}
      </View>
      
      <View style={styles.right}>
        {right ? (
          right
        ) : onPress ? (
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  value: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 4,
  },
  right: {
    marginLeft: 8,
  },
});

export default SettingItem;