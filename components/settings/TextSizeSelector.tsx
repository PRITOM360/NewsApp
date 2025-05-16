import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Check } from 'lucide-react-native';

interface TextSizeSelectorProps {
  visible: boolean;
  onClose: () => void;
  currentSize: string;
  onSelectSize: (size: 'small' | 'medium' | 'large') => void;
}

const TextSizeSelector: React.FC<TextSizeSelectorProps> = ({
  visible,
  onClose,
  currentSize,
  onSelectSize,
}) => {
  const { theme } = useTheme();
  
  const textSizes = [
    { label: 'Small', value: 'small', fontSize: 14 },
    { label: 'Medium', value: 'medium', fontSize: 16 },
    { label: 'Large', value: 'large', fontSize: 18 },
  ];
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View 
          style={[
            styles.modalContent, 
            { 
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
            }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Text Size
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.modalClose, { color: theme.colors.primary }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          
          {textSizes.map((size) => (
            <TouchableOpacity
              key={size.value}
              style={[
                styles.sizeOption,
                { borderBottomColor: theme.colors.border }
              ]}
              onPress={() => onSelectSize(size.value as 'small' | 'medium' | 'large')}
            >
              <Text 
                style={[
                  styles.sizeLabel, 
                  { 
                    color: theme.colors.text,
                    fontSize: size.fontSize,
                  }
                ]}
              >
                {size.label}
              </Text>
              
              {currentSize === size.value && (
                <Check size={24} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  modalClose: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  sizeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  sizeLabel: {
    fontFamily: 'Inter-Medium',
  },
});

export default TextSizeSelector;