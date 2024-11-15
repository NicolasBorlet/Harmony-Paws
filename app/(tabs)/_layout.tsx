import { Tabs } from "@/components/bottom-tabs";

export default function TabLayout() {
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