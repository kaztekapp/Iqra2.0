import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0f172a' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="language" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="features" />
      <Stack.Screen name="goals" />
    </Stack>
  );
}
