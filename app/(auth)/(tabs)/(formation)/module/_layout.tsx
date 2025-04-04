import { Stack } from 'expo-router'

export default function FormationLayout() {
  return (
    <Stack>
      <Stack.Screen name='lesson' options={{ headerShown: false, presentation: 'card' }} />
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  )
}
