import React from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Check } from 'lucide-react-native';

interface RegionSelectorProps {
  visible: boolean;
  onClose: () => void;
  currentRegion: string;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  visible,
  onClose,
  currentRegion,
  onSelectRegion,
}) => {
  const { theme } = useTheme();
  
  const regions = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'jp', name: 'Japan' },
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
              Select Region
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.modalClose, { color: theme.colors.primary }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={regions}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.regionOption,
                  { borderBottomColor: theme.colors.border }
                ]}
                onPress={() => onSelectRegion(item.code)}
              >
                <Text style={[styles.regionName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                
                {currentRegion === item.code && (
                  <Check size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
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
    maxHeight: '70%',
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
  regionOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  regionName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});

export default RegionSelector;