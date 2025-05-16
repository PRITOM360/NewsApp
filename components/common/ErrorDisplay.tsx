import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CircleAlert as AlertCircle } from 'lucide-react-native';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color={theme.colors.error} />
      
      <Text style={[styles.message, { color: theme.colors.text }]}>
        {message}
      </Text>
      
      {onRetry && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
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

export default ErrorDisplay;