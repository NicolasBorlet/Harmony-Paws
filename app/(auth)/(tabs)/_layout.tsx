import { useSession } from "@/app/ctx";
import { Tabs } from "@/components/bottom-tabs";
import { Redirect } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ tabBarIcon: () => ({ sfSymbol: "house" }), title: 'Accueil', headerShown: false }} />
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