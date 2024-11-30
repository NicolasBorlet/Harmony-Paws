import { Stack } from "expo-router";

export default function MedicalLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="(medical)" />
    </Stack>
  )
}