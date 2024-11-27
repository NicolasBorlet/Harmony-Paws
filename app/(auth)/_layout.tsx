import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="dog" />
      <Stack.Screen name="ride">
        {/* This is a directory with nested routes */}
      </Stack.Screen>
      <Stack.Screen name="messages" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="completion" options={{ presentation: 'modal' }} />
    </Stack>
  )
}
