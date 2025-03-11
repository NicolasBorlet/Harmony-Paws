import { Stack } from 'expo-router'

export default function RideCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='ride-type'
        options={{
          presentation: 'containedModal',
        }}
      />
    </Stack>
  )
}
