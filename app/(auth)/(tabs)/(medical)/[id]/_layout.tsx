import { Stack } from 'expo-router'

export default function HealthRecordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='healthRecord' />
      <Stack.Screen name='height' />
    </Stack>
  )
}
