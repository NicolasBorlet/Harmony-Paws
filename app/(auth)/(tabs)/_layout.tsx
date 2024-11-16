import { useSession } from "@/app/ctx";
import { Tabs } from "@/components/bottom-tabs";
import { Redirect, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function TabLayout() {
  const segments = useSegments();
  const { session, isLoading } = useSession();

  // Vérifie si on est dans la route messages
  const isInMessages = segments.includes("messages");

  useEffect(() => {
    console.log(segments);
    console.log(isInMessages);
  }, [isInMessages, segments]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        display: isInMessages ? 'none' : 'flex'
      }
    }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: () => ({ sfSymbol: "house" }),
          title: "Accueil",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: () => ({ sfSymbol: "person" }),
        }}
      />
    </Tabs>
  );
}