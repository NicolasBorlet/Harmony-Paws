import Back from "@/components/back-button";
import NotificationItem from "@/components/notification/notification-item";
import Divider from "@/components/ui/divider";
import { NavigationTitle, SmallBold, SmallMedium } from "@/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { i18n } from "../_layout";

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
    date: new Date(),
  },
  {
    id: 2,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date(),
  },
  {
    id: 3,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date(),
  },
  {
    id: 4,
    type: 'new_ride_request',
    title: 'New ride request',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date(),
  },
  {
    id: 5,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 6,
    type: 'new_friend_ride',
    title: 'New friend ride',
    user: {
      id: 1,
      name: 'John Doe',
      profilePicture: 'https://picsum.photos/200',
    },    date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  },
]

export default function Notifications() {
  const insets = useSafeAreaInsets();

  // Split notifications into two arrays based on date
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentNotifications = notificationsData.filter(notification => 
    new Date(notification.date) >= sevenDaysAgo
  );
  const olderNotifications = notificationsData.filter(notification => 
    new Date(notification.date) < sevenDaysAgo
  );

  const renderSectionHeader = (title: string) => (
    <SmallBold color="#000" style={{ marginTop: 10 }}>{title}</SmallBold>
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8 }}>
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
          <NavigationTitle color="#000">{i18n.t('notifications')}</NavigationTitle>
        </View>
        <Divider />
        <FlashList
          data={[
            { type: 'header', title: `7 ${i18n.t('lastDays')}` },
            ...recentNotifications,
            { type: 'header', title: `30 ${i18n.t('lastDays')}` },
            ...olderNotifications,
          ]}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return renderSectionHeader(item.title);
            }
            return <NotificationItem notificationData={item} />;
          }}
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <SmallMedium color="#000">{i18n.t('noNotifications')}</SmallMedium>
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: 32 }} />}
        />
      </View>
    </View>
  );
}
