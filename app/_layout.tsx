import "../global.css";
import '../src/i18n';
import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { quranAudioService } from '../src/services/quranAudioService';
import { useSettingsStore } from '../src/stores/settingsStore';
import { supabase, isSupabaseConfigured } from '../src/lib/supabase';
import { MiniAudioPlayer } from '../src/components/quran/MiniAudioPlayer';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const segments = useSegments();

  const language = useSettingsStore((s) => s.language);
  const hasCompletedOnboarding = useSettingsStore((s) => s.hasCompletedOnboarding);
  const isAuthenticated = useSettingsStore((s) => s.isAuthenticated);
  const setSession = useSettingsStore((s) => s.setSession);

  const [authReady, setAuthReady] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    // Add Amiri fonts here when available
    // 'Amiri': require('../assets/fonts/Amiri-Regular.ttf'),
    // 'Amiri-Bold': require('../assets/fonts/Amiri-Bold.ttf'),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Force check for OTA updates on launch — keep splash visible until done
  useEffect(() => {
    async function checkForUpdates() {
      if (__DEV__) {
        setUpdateComplete(true);
        return;
      }

      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          // reloadAsync restarts the app, so we won't reach here
        }
      } catch (e: any) {
        console.error('[UPDATE] Error checking for updates:', e.message || e);
      } finally {
        setUpdateComplete(true);
      }
    }
    checkForUpdates();
  }, []);

  // Set Android navigation bar color to match tab bar
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#1e293b');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  // Sync persisted language with i18next
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // Listen to Supabase auth state changes
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Supabase not configured - skip auth, allow app to work without it
      setAuthReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Route protection
  useEffect(() => {
    if (!authReady || !fontsLoaded) return;

    const inOnboarding = segments[0] === '(onboarding)';
    const inAuth = segments[0] === 'auth';
    const inTabs = segments[0] === '(tabs)';
    const seg = segments[0] as string;
    const inLegal = seg === 'privacy-policy' || seg === 'terms-of-service';

    if (!hasCompletedOnboarding && !inOnboarding) {
      router.replace('/(onboarding)/language');
    } else if (hasCompletedOnboarding && !isAuthenticated && !inAuth && !inLegal) {
      router.replace('/auth');
    }
  }, [authReady, fontsLoaded, hasCompletedOnboarding, isAuthenticated, segments]);

  useEffect(() => {
    if (fontsLoaded && authReady && updateComplete) {
      SplashScreen.hideAsync();
      quranAudioService.warmUp();
    }
  }, [fontsLoaded, authReady, updateComplete]);

  if (!fontsLoaded || !authReady || !updateComplete) {
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
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="auth" />
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
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="terms-of-service" />
      </Stack>
      <MiniAudioPlayer />
    </GestureHandlerRootView>
  );
}
