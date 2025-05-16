import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '@/utils/storage';

interface UserPreferences {
  textSize: 'small' | 'medium' | 'large';
  region: string;
  notifications: boolean;
  categories: string[];
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  textSize: 'medium',
  region: 'us',
  notifications: true,
  categories: ['general', 'technology', 'business'],
};

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  preferences: defaultPreferences,
  updatePreferences: () => {},
});

export const useUserPreferences = () => useContext(UserPreferencesContext);

interface UserPreferencesProviderProps {
  children: React.ReactNode;
}

export const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  
  // Load preferences from storage when the app starts
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await storage.getItem('userPreferences');
        
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        } else {
          // Save default preferences if none exist
          await storage.setItem('userPreferences', JSON.stringify(defaultPreferences));
        }
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }
    };
    
    loadPreferences();
  }, []);
  
  // Update preferences
  const updatePreferences = async (newPrefs: Partial<UserPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPrefs };
    setPreferences(updatedPreferences);
    
    try {
      await storage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  };
  
  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};