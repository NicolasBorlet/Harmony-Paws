import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Accueil', headerShown: false }} />
      <Stack.Screen name="dog/[id]" options={{ title: 'Détails', headerShown: false }} />
      <Stack.Screen name="ride/[id]" options={{ title: 'Détails' }} />
    </Stack>
  );
}
