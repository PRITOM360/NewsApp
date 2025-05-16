import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserPreferencesProvider } from '@/context/UserPreferencesContext';
import { useFonts } from 'expo-font';
import { 
  Inter_400Regular, 
  Inter_500Medium,
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { 
  Merriweather_400Regular,
  Merriweather_700Bold
} from '@expo-google-fonts/merriweather';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
    'Merriweather-Regular': Merriweather_400Regular,
    'Merriweather-Bold': Merriweather_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserPreferencesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </UserPreferencesProvider>
      </ThemeProvider>
    </Provider>
  );
}