import { View } from "react-native";
import { Image } from "expo-image";
import { SmallMedium, SmallSemiBold, Small } from "../ui/text";
import { SmallButton, SmallButtonOutlined } from "../ui/button";
import React from "react";

export default function NotificationItem({notificationData}: {notificationData: any}) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Image source={{ uri: notificationData.user.profilePicture }} style={{
                width: 60,
                height: 60,
                borderRadius: 1000,
                objectFit: 'cover'
            }} />
            <View style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <SmallSemiBold color="#000">{notificationData.user.name}</SmallSemiBold>
                <SmallMedium color="#979898">
                    {notificationData.type === 'new_friend_request' && 'souhaite être amie avec vous.'}
                    {notificationData.type === 'new_friend_ride' && 'a créé une nouvelle balade.'}
                    {notificationData.type === 'new_ride_request' && 'souhaite faire une balade avec vous.'}
                </SmallMedium>
            </View>
            {notificationData.type === 'new_friend_request' && (
                <View style={{ display: 'flex', width: 100, flexDirection: 'column', gap: 5 }}>
                    <SmallButton
                        onPress={() => console.log(`accept ${notificationData.id}`)}
                    >
                        <Small color='#fff'>Accepter</Small>
                    </SmallButton>
                    <SmallButtonOutlined
                        onPress={() => console.log(`refuse ${notificationData.id}`)}
                    >
                        <Small color='#F7A400'>Refuser</Small>
                    </SmallButtonOutlined>
                </View>
            )}
            {notificationData.type === 'new_ride_request' && (
                <View style={{ width: 100 }}>
                    <SmallButton
                        onPress={() => console.log(`accept ${notificationData.id}`)}
                        style={{ backgroundColor: '#F49819', borderRadius: 10, padding: 14, width: '100%', alignItems: 'center' }}
                    >
                        <Small color='#fff'>Accepter</Small>
                    </SmallButton>
                </View>
            )}
        </View>
    )
}