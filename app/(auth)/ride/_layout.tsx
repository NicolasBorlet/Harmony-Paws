import { Stack } from 'expo-router'

export default function RideLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='join'
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  )
}
