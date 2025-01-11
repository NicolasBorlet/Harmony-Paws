import { Stack } from 'expo-router'

export default function FormationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='formation' />
      <Stack.Screen
        name='module'
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name='[id]' />
    </Stack>
  )
}
