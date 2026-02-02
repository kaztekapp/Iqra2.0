import { Stack } from 'expo-router';

export default function SurahLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', // Instant transition - no animation delay
      }}
    />
  );
}
