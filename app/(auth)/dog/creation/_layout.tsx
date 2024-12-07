import { Stack } from "expo-router";

export default function DogCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="first-step" />
    </Stack>
  );
}
