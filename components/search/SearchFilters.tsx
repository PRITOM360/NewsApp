import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SearchParams } from '@/types/searchParams';
import { ChevronDown, Filter } from 'lucide-react-native';

interface SearchFiltersProps {
  filters: SearchParams;
  onFilterChange: (newFilters: Partial<SearchParams>) => void;
}

interface FilterOption {
  label: string;
  value: string;
}

const sortByOptions: FilterOption[] = [
  { label: 'Newest First', value: 'publishedAt' },
  { label: 'Most Relevant', value: 'relevancy' },
  { label: 'Most Popular', value: 'popularity' },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const [showSortModal, setShowSortModal] = useState(false);
  
  const getSortByLabel = () => {
    const option = sortByOptions.find(opt => opt.value === filters.sortBy);
    return option ? option.label : 'Sort By';
  };
  
  const handleSortChange = (value: string) => {
    onFilterChange({ sortBy: value });
    setShowSortModal(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[
            styles.filterButton, 
            { 
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.cardBackground, 
            }
          ]}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={[styles.filterText, { color: theme.colors.text }]}>
            {getSortByLabel()}
          </Text>
          <ChevronDown size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {/* Sort by modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
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
                Sort By
              </Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Text style={[styles.modalClose, { color: theme.colors.primary }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={sortByOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    filters.sortBy === item.value && {
                      backgroundColor: theme.colors.primaryLight,
                    }
                  ]}
                  onPress={() => handleSortChange(item.value)}
                >
                  <Text 
                    style={[
                      styles.optionText, 
                      { 
                        color: filters.sortBy === item.value 
                          ? theme.colors.primary 
                          : theme.colors.text 
                      }
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    paddingBottom: 20,
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
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});

export default SearchFilters;