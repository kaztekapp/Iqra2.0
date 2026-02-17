import "../global.css";
import '../src/i18n';
import { useCallback, useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { quranAudioService } from '../src/services/quranAudioService';
import { useSettingsStore } from '../src/stores/settingsStore';
import { supabase, isSupabaseConfigured, safeGetSession } from '../src/lib/supabase';
import { MiniAudioPlayer } from '../src/components/quran/MiniAudioPlayer';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(() => {});

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

  // Hard fallback: force app ready after 5s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => {
      setAuthReady(true);
      setUpdateComplete(true);
    }, 5000);
    return () => clearTimeout(fallback);
  }, []);

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
      NavigationBar.setBackgroundColorAsync('#1e293b').catch(() => {});
      NavigationBar.setButtonStyleAsync('light').catch(() => {});
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
      setAuthReady(true);
      return;
    }

    // Timeout: if auth check hangs, proceed anyway after 3s
    const timeout = setTimeout(() => setAuthReady(true), 3000);

    safeGetSession().then((session) => {
      clearTimeout(timeout);
      setSession(session);
      setAuthReady(true);
      // Start auto-refresh only after initial session is validated
      if (session) {
        supabase!.auth.startAutoRefresh();
      }
    }).catch(() => {
      clearTimeout(timeout);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  // Route protection
  useEffect(() => {
    if (!authReady) return;

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
  }, [authReady, hasCompletedOnboarding, isAuthenticated, segments]);

  const appReady = authReady && updateComplete;

  const onLayoutRootView = useCallback(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch(() => {});
      quranAudioService.warmUp();
    }
  }, [appReady]);

  if (!appReady) {
    return <View style={{ flex: 1, backgroundColor: '#0f172a' }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0f172a' }} onLayout={onLayoutRootView}>
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
