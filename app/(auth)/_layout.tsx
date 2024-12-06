import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='dog' />
      <Stack.Screen name='ride' />
      <Stack.Screen name='messages' />
      <Stack.Screen name='notifications' />
      <Stack.Screen name='completion' options={{ presentation: 'modal' }} />
      <Stack.Screen name='onboarding' />
      <Stack.Screen name='account-created' />
    </Stack>
  )
}
