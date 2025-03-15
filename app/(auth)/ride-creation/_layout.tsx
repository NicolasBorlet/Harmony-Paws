import { Stack } from 'expo-router'

export default function RideCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ride-type' />
      <Stack.Screen name='alone-ride' />
      <Stack.Screen name='group-ride' />
    </Stack>
  )
}
