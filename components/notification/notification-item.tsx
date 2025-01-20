import { i18n } from "@/app/_layout";
import { acceptFriendRequest, rejectFriendRequest } from "@/lib/api/friendRequests";
import { user$ } from "@/lib/observables/session-observable";
import * as Burnt from "burnt";
import React from "react";
import { View } from "react-native";
import { SmallButton, SmallButtonOutlined } from "../ui/button";
import { Small, SmallMedium, SmallSemiBold } from "../ui/text";

export default function NotificationItem({notificationData}: {notificationData: any}) {
    const userData = user$.get()

    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequest(notificationData.sender_id, userData.id)
        Burnt.toast({
            title: "Demande acceptée",
            preset: "done",
            message: "Vous êtes maintenant amis",
            haptic: "success",
        })
    }

    const handleRejectFriendRequest = async () => {
        await rejectFriendRequest(notificationData.sender_id, userData.id)
        Burnt.toast({
            title: "Demande refusée",
            preset: "error",
            message: "Vous n'êtes plus amis",
            haptic: "error",
        })
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            {/* <Image source={{ uri: notificationData.user.profilePicture }} style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                objectFit: 'cover'
            }} /> */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <SmallSemiBold color="#000">{notificationData.sender.first_name}</SmallSemiBold>
                <SmallMedium color="#979898">
                    {notificationData.type === 'new_friend_request' && `${i18n.t('friendRequest')}`}
                    {notificationData.type === 'new_friend_ride' && `${i18n.t('rideCreation')}`}
                    {notificationData.type === 'new_ride_request' && `${i18n.t('rideRequest')}`}
                </SmallMedium>
            </View>
            {notificationData.type === 'new_friend_request' && (
                <View style={{ display: 'flex', width: 100, flexDirection: 'column', gap: 5 }}>
                    <SmallButton
                        onPress={handleAcceptFriendRequest}
                    >
                        <Small color='#fff'>{i18n.t('accept')}</Small>
                    </SmallButton>
                    <SmallButtonOutlined
                        onPress={handleRejectFriendRequest}
                    >
                        <Small color='#F7A400'>{i18n.t('refuse')}</Small>
                    </SmallButtonOutlined>
                </View>
            )}
            {notificationData.type === 'new_ride_request' && (
                <View style={{ width: 100 }}>
                    <SmallButton
                        onPress={() => console.log(`accept ${notificationData.id}`)}
                        style={{ backgroundColor: '#F49819', borderRadius: 10, padding: 14, width: '100%', alignItems: 'center' }}
                    >
                        <Small color='#fff'>{i18n.t('accept')}</Small>
                    </SmallButton>
                </View>
            )}
        </View>
    )
}