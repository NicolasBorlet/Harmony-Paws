import Back from "@/components/back-button";
import NotificationItem from "@/components/notification/notification-item";
import Divider from "@/components/ui/divider";
import { NavigationTitle } from "@/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const notificationsData = [
  {
    id: 1,
    type: 'new_friend_request',
    title: 'New friend request',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },
    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 2,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 3,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 4,
    type: 'new_ride_request',
    title: 'New ride request',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
]

export default function Notifications() {
  const insets = useSafeAreaInsets();

  return (
      <View style={{ flex: 1, paddingTop: insets.top, }}>
        <View
          style={{
            flex: 1,
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
          <FlashList
            data={notificationsData}
            renderItem={({ item, index }) => (
              <NotificationItem notificationData={item} />
            )}
            estimatedItemSize={10}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
  );
}
