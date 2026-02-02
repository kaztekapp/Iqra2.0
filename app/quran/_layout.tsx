import { Stack } from 'expo-router';

export default function QuranLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', // Instant transitions for all quran screens
      }}
    />
  );
}
