import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Accueil', headerShown: false }} />
      <Stack.Screen name="map" options={{ headerShown: false, presentation: 'containedModal' }} />
      <Stack.Screen name="dog" options={{ headerShown: false }} />
      <Stack.Screen name="ride/[id]" options={{ title: 'Détails' }} />
    </Stack>
  );
}
