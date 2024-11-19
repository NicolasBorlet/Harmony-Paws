import Back from "@/components/back-button";
import Divider from "@/components/ui/divider";
import { NavigationTitle } from "@/components/ui/text";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// He is 3 type of notifications
// 1. New friend request
// 2. New ride published by a friend
// 3. New ride request

const notificationsData = [
  {
    id: 1,
    type: 'new_friend_request',
    title: 'New friend request',
    description: 'John Doe sent you a friend request',
  },
  {
    id: 2,
    type: 'new_friend_ride',
    title: 'New friend ride',
    description: 'John Doe published a new ride',
  },
  {
    id: 3,
    type: 'new_friend_ride',
    title: 'New friend ride',
    description: 'John Doe sent you a ride request',
  },
  {
    id: 4,
    type: 'new_ride_request',
    title: 'New ride request',
    description: 'John Doe sent you a ride request',
  },
]

export default function Notifications() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Back position="relative" left="0" />
          <NavigationTitle color="#000">Notifications</NavigationTitle>
        </View>
        <Divider />
      </View>
    </View>
  );
}
