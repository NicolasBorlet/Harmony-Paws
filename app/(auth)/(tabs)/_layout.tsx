import { useSession } from "@/app/ctx";
import { Tabs } from "@/components/bottom-tabs";
import { Redirect, usePathname } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        display: usePathname() === "/messages" ? "none" : "flex",
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