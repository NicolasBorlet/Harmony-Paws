import { Stack } from "expo-router";

export default function DogLayout() {
  return (
    <Stack>
      <Stack.Screen name="invitation" options={{ headerShown: false }}/>
      <Stack.Screen name="[id]" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
