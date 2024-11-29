import { Stack } from "expo-router";

export default function FormationLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
    );
}