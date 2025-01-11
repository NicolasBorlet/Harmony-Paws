import { Stack } from 'expo-router'

export default function DogLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='invitation'
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name='creation' />
      <Stack.Screen name='[id]' />
    </Stack>
  )
}
