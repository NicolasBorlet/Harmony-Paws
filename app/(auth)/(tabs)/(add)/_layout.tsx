import { Stack } from 'expo-router'

export default function FormationListing() {
  return (
    <Stack>
      <Stack.Screen
        name='add'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
