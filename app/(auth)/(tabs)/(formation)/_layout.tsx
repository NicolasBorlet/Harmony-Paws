import { Stack } from "expo-router";

export default function FormationLayout() {
    return (
        <Stack>
            <Stack.Screen name="formation" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}