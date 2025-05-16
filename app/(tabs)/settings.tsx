import React from 'react';
import { View, StyleSheet, ScrollView, Text, Switch, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import HeaderBar from '@/components/navigation/HeaderBar';
import { useTheme } from '@/context/ThemeContext';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { Globe, ChevronRight, Moon, Sun, Type, Bell, Languages, Heart, CircleAlert as AlertCircle, Shield } from 'lucide-react-native';
import SettingItem from '@/components/settings/SettingItem';
import SettingSection from '@/components/settings/SettingSection';
import TextSizeSelector from '@/components/settings/TextSizeSelector';
import RegionSelector from '@/components/settings/RegionSelector';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();
  const [showTextSizeSelector, setShowTextSizeSelector] = React.useState(false);
  const [showRegionSelector, setShowRegionSelector] = React.useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Settings" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SettingSection title="Appearance">
          <SettingItem
            icon={isDark ? <Moon color={theme.colors.primary} /> : <Sun color={theme.colors.primary} />}
            title="Dark Mode"
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: theme.colors.primaryLight }}
                thumbColor={isDark ? theme.colors.primary : '#f4f3f4'}
              />
            }
          />
          
          <SettingItem
            icon={<Type color={theme.colors.primary} />}
            title="Text Size"
            value={preferences.textSize === 'small' ? 'Small' : 
                  preferences.textSize === 'medium' ? 'Medium' : 'Large'}
            onPress={() => setShowTextSizeSelector(true)}
          />
        </SettingSection>
        
        <SettingSection title="Personalization">
          <SettingItem
            icon={<Globe color={theme.colors.primary} />}
            title="News Region"
            value={preferences.region?.toUpperCase() || 'US'}
            onPress={() => setShowRegionSelector(true)}
          />
          
          <SettingItem
            icon={<Bell color={theme.colors.primary} />}
            title="Notifications"
            right={
              <Switch
                value={preferences.notifications}
                onValueChange={(value) => updatePreferences({ notifications: value })}
                trackColor={{ false: '#767577', true: theme.colors.primaryLight }}
                thumbColor={preferences.notifications ? theme.colors.primary : '#f4f3f4'}
              />
            }
          />
          
          <SettingItem
            icon={<Languages color={theme.colors.primary} />}
            title="Language"
            value="English"
          />
        </SettingSection>
        
        <SettingSection title="About">
          <SettingItem
            icon={<Shield color={theme.colors.primary} />}
            title="Privacy Policy"
          />
          
          <SettingItem
            icon={<AlertCircle color={theme.colors.primary} />}
            title="Terms of Service"
          />
          
          <SettingItem
            icon={<Heart color={theme.colors.primary} />}
            title="About NewsApp"
            value="Version 1.0.0"
          />
        </SettingSection>
      </ScrollView>
      
      {showTextSizeSelector && (
        <TextSizeSelector
          visible={showTextSizeSelector}
          onClose={() => setShowTextSizeSelector(false)}
          currentSize={preferences.textSize || 'medium'}
          onSelectSize={(size) => {
            updatePreferences({ textSize: size });
            setShowTextSizeSelector(false);
          }}
        />
      )}
      
      {showRegionSelector && (
        <RegionSelector
          visible={showRegionSelector}
          onClose={() => setShowRegionSelector(false)}
          currentRegion={preferences.region || 'us'}
          onSelectRegion={(region) => {
            updatePreferences({ region });
            setShowRegionSelector(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  }
});