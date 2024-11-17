import { useSession } from "@/app/ctx";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { Redirect, Tabs, usePathname } from "expo-router";
import { useEffect } from "react";
import { GestureResponderEvent, Pressable, Text } from "react-native";

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

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
    <Tabs
      screenOptions={{
        tabBarStyle: { display: isMessages ? 'none' : 'flex' },
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Montserrat_400Regular', color: '#663399' },
        tabBarButton: (props: any) => {
          const { style, ...otherProps } = props;
          return (
            <Pressable
              {...otherProps}
              style={style}
              onPress={(e: GestureResponderEvent) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                props.onPress?.(e);
              }}
              onLongPress={(e: GestureResponderEvent) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.onLongPress?.(e);
              }}
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            focused ? <Ionicons name="paw" size={24} color="#663399" /> : <Ionicons name="paw-outline" size={24} color="#663399" />
          ),
          title: "Accueil",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <FontAwesome5 name="internet-explorer" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}