import { Stack } from 'expo-router'

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='ride-onboarding' />
      <Stack.Screen name='formation-onboarding' />
      <Stack.Screen name='medical-onboarding' />
    </Stack>
  )
}
