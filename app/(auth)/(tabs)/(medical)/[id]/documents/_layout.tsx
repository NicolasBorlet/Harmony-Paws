import { Stack } from 'expo-router'

export default function HealthRecordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='documents-listing' />
      <Stack.Screen name='[id]' />
    </Stack>
  )
}
