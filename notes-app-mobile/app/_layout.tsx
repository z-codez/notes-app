import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { initDb } from '@/services/local-storage/sql-lite/initDb';


export default function RootLayout() {

  // Initialize local sqlLite database.
  useEffect(() => {
    initDb();
  }, []);
  
  const colorScheme = useColorScheme();

  return (
    // Note: Adding backgroundColor to the top-most wrapper fixes the transition between screens.
    <SafeAreaProvider style={{backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background}}>
      <ThemeProvider  value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* animation controls the transitions between screen. Forward and back */}
        <Stack screenOptions={{ animation: 'slide_from_right' }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="new" options={{
             title: '',
             headerStyle: {
              backgroundColor: 
                colorScheme === 'dark' 
                ? DarkTheme.colors.background 
                : DefaultTheme.colors.background,
             }, }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
