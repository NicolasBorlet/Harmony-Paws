import { Stack } from 'expo-router'

export default function HealthRecordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='health-record' />
    </Stack>
  )
}
