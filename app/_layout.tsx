import "../global.css";
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Add Amiri fonts here when available
    // 'Amiri': require('../assets/fonts/Amiri-Regular.ttf'),
    // 'Amiri-Bold': require('../assets/fonts/Amiri-Bold.ttf'),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0f172a' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="alphabet/index" />
        <Stack.Screen name="alphabet/[letterId]" />
        <Stack.Screen name="alphabet/writing-practice" />
        <Stack.Screen name="vocabulary/index" />
        <Stack.Screen name="vocabulary/[themeId]" />
        <Stack.Screen name="vocabulary/flashcards" />
        <Stack.Screen name="grammar/index" />
        <Stack.Screen name="grammar/[lessonId]" />
        <Stack.Screen name="reading/index" />
        <Stack.Screen name="reading/[textId]" />
        <Stack.Screen name="exercise/[exerciseId]" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
        <Stack.Screen name="exercise/typing-practice" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
