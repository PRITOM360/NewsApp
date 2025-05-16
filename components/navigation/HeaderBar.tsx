import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

interface HeaderBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const { theme } = useTheme();

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[
        styles.header, 
        { 
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        }
      ]}
    >
      <View style={styles.leftContainer}>
        {leftIcon && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onLeftPress}
            disabled={!onLeftPress}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onRightPress}
            disabled={!onRightPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
});

export default HeaderBar;