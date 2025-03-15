import { i18n } from '@/app/_layout'
import { acceptActivityInvitation } from '@/lib/api/activty_invitations'
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '@/lib/api/friendRequests'
import { user$ } from '@/lib/observables/session-observable'
import { useQueryClient } from '@tanstack/react-query'
import * as Burnt from 'burnt'
import React from 'react'
import { View } from 'react-native'
import { SmallButton, SmallButtonOutlined } from '../ui/button'
import { Small, SmallMedium, SmallSemiBold } from '../ui/text'

interface NotificationItemProps {
  notificationData: {
    itemType: 'notification' | 'invitation'
    type: string
    id: number
    activity_id?: number
    sender: {
      first_name: string
      id: string
    }
    sender_id: string
  }
}

export default function NotificationItem({
  notificationData,
}: NotificationItemProps) {
  const userData = user$.get()
  const queryClient = useQueryClient()

  const handleAcceptFriendRequest = async () => {
    await acceptFriendRequest(notificationData.sender_id, userData.id)
    Burnt.toast({
      title: i18n.t('request_accepted'),
      preset: 'done',
      message: i18n.t('you_are_now_friends'),
      haptic: 'success',
    })
  }

  const handleAcceptRideRequest = async () => {
    try {
      await acceptActivityInvitation(notificationData.id)
      queryClient.invalidateQueries(['userInvitations', userData.id])

      Burnt.toast({
        title: i18n.t('notification.ride_request_accepted'),
        preset: 'done',
        message: i18n.t('notification.ride_request_accepted_message'),
        haptic: 'success',
      })
    } catch (error) {
      console.error('Error accepting ride request:', error)
      Burnt.toast({
        title: i18n.t('global.error'),
        preset: 'error',
        message: i18n.t('notification.error_accepting_ride'),
        haptic: 'error',
      })
    }
  }

  const handleRejectFriendRequest = async () => {
    await rejectFriendRequest(notificationData.sender_id, userData.id)
    Burnt.toast({
      title: i18n.t('notification.request_rejected'),
      preset: 'error',
      haptic: 'error',
    })
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      {/* <Image source={{ uri: notificationData.user.profilePicture }} style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                objectFit: 'cover'
            }} /> */}
      <View
        style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}
      >
        <SmallSemiBold color='#000'>
          {notificationData.sender.first_name}
        </SmallSemiBold>
        <SmallMedium color='#979898'>
          <>
            {notificationData.type === 'friend_request' &&
              `${i18n.t('notification.friendRequest')}`}
            {notificationData.type === 'new_friend_ride' &&
              `${i18n.t('notification.rideCreation')}`}
            {notificationData.type === 'new_ride_request' &&
              `${i18n.t('notification.rideRequest')}`}
          </>
        </SmallMedium>
      </View>

      {notificationData.type === 'friend_request' && (
        <View
          style={{
            display: 'flex',
            width: 100,
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <SmallButton onPress={handleAcceptFriendRequest}>
            <Small color='#fff'>{i18n.t('global.accept')}</Small>
          </SmallButton>
          <SmallButtonOutlined onPress={handleRejectFriendRequest}>
            <Small color='#F7A400'>{i18n.t('global.refuse')}</Small>
          </SmallButtonOutlined>
        </View>
      )}

      {notificationData.type === 'new_ride_request' && (
        <View style={{ width: 100 }}>
          <SmallButton onPress={handleAcceptRideRequest}>
            <Small color='#fff'>{i18n.t('notification.accept')}</Small>
          </SmallButton>
        </View>
      )}
    </View>
  )
}
