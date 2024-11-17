import { useSession } from "@/app/ctx";
import { Tabs } from "@/components/bottom-tabs";
import { Redirect, usePathname } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const pathname = usePathname();
  const isMessages = pathname.includes('messages');

  useEffect(() => {
    console.log(isMessages);
  }, [isMessages]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: () => ({ sfSymbol: "house" }),
          title: "Accueil",
          headerShown: false,
          tabBarStyle: { display: isMessages ? 'none' : 'flex' }
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