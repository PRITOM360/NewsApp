import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Animated.View 
      entering={FadeIn.duration(500)}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
      
      {buttonText && buttonLink && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.navigate(buttonLink)}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
});

export default EmptyState;