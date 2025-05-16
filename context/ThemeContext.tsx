import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { lightTheme, darkTheme, Theme } from '@/theme';
import { storage } from '@/utils/storage';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'system'>('system');
  const [theme, setThemeState] = useState<Theme>(lightTheme);
  const [isDark, setIsDark] = useState(false);
  
  // Function to determine and set the active theme
  const applyTheme = (scheme: 'light' | 'dark' | 'system') => {
    let activeTheme: Theme;
    let darkMode = false;
    
    if (scheme === 'system') {
      const systemColorScheme = Appearance.getColorScheme();
      activeTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
      darkMode = systemColorScheme === 'dark';
    } else {
      activeTheme = scheme === 'dark' ? darkTheme : lightTheme;
      darkMode = scheme === 'dark';
    }
    
    setThemeState(activeTheme);
    setIsDark(darkMode);
  };
  
  // Load the saved color scheme preference from storage
  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const savedScheme = await storage.getItem('colorScheme');
        if (savedScheme) {
          setColorScheme(savedScheme as 'light' | 'dark' | 'system');
          applyTheme(savedScheme as 'light' | 'dark' | 'system');
        } else {
          // Default to system if no preference is saved
          setColorScheme('system');
          applyTheme('system');
        }
      } catch (error) {
        console.error('Failed to load color scheme preference:', error);
      }
    };
    
    loadColorScheme();
  }, []);
  
  // Listen for system appearance changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      if (colorScheme === 'system') {
        applyTheme('system');
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, [colorScheme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newScheme = isDark ? 'light' : 'dark';
    setTheme(newScheme);
  };
  
  // Set the theme to a specific scheme
  const setTheme = async (scheme: 'light' | 'dark' | 'system') => {
    setColorScheme(scheme);
    applyTheme(scheme);
    
    try {
      await storage.setItem('colorScheme', scheme);
    } catch (error) {
      console.error('Failed to save color scheme preference:', error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};