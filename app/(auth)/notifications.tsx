import Back from '@/components/back-button'
import NotificationItem from '@/components/notification/notification-item'
import Divider from '@/components/ui/divider'
import { NavigationTitle, SmallBold, SmallMedium } from '@/components/ui/text'
// import { useFriendRequests } from '@/lib/api/user'
import { useFriendRequests } from '@/lib/api/friendRequests'
import { user$ } from '@/lib/observables/session-observable'
import { FlashList } from '@shopify/flash-list'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { i18n } from '../_layout'

export default function Notifications() {
  const insets = useSafeAreaInsets()
  const userData = user$.get()
  
  const { data: friendRequests } = useFriendRequests(userData.id)

  // Split notifications into two arrays based on date
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Utiliser les vraies données de friendRequests et les trier par date
  const recentNotifications = friendRequests?.filter(
    request => new Date(request.created_at) >= sevenDaysAgo,
  ) || []

  const olderNotifications = friendRequests?.filter(
    request => new Date(request.created_at) < sevenDaysAgo,
  ) || []

  const renderSectionHeader = (title: string) => (
    <SmallBold color='#000' style={{ marginTop: 10 }}>
      {title}
    </SmallBold>
  )

  useEffect(() => {
    console.log(friendRequests)
  }, [friendRequests])

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8 }}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Back position='relative' left='0' />
          <NavigationTitle color='#000'>
            {i18n.t('notifications')}
          </NavigationTitle>
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
              return renderSectionHeader(item.title)
            }
            return <NotificationItem notificationData={item} />
          }}
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SmallMedium color='#000'>
                {i18n.t('noNotifications')}
              </SmallMedium>
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: 32 }} />}
        />
      </View>
    </View>
  )
}
