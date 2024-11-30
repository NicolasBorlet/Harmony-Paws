import { i18n } from "@/app/_layout";
import { useSession } from "@/app/ctx";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { Image } from "expo-image";
import { Redirect, Tabs } from "expo-router";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  const handleTabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    await new Promise(resolve => setTimeout(resolve, 150));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Montserrat_400Regular', color: '#663399' },
        tabBarButton: (props: any) => {
          const { style, ...otherProps } = props;
          return (
            <Pressable
              {...otherProps}
              style={style}
              onPress={(e: GestureResponderEvent) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                props.onPress?.(e);
              }}
              onLongPress={(e: GestureResponderEvent) => {
                handleTabPress();
                props.onLongPress?.(e);
              }}
            />
          );
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: `${i18n.t('home')}`,
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            focused ? <Ionicons name="paw" size={24} color="#663399" /> : <Ionicons name="paw-outline" size={24} color="#663399" />
          ),
        }}
      />
      <Tabs.Screen
        name="(formation)"
        options={{
          title: "Formation",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Ionicons name="information-circle-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="(add)"
        options={{
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <View>
              <Image 
                style={{
                  position: 'absolute',
                  top: -8,
                  left: -10,
                  width: 72,
                  height: 66,
                  // zIndex: -1,
                  backgroundColor: 'white',
                  borderRadius: 999,
                }}
              />
              <View style={{
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 999,
                backgroundColor: '#F7A400',
                boxShadow: '0 4px 12px rgba(247, 164, 0, 0.5)',
              }}>
                <AntDesign name="plus" size={24} color="white" />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="(medical)"
        options={{
          title: "Medical",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <FontAwesome5
             name="clinic-medical" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}