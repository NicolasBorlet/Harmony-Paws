import { i18n } from '@/lib/i18n'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import { StandardButton } from '@/components/ui/button'
import { RoundedImage } from '@/components/ui/image'
import { CardTitle, Small, SmallMedium } from '@/components/ui/text'
import { useDogsFromUserId } from '@/lib/api/dog'
import { sendFriendRequest } from '@/lib/api/friendRequests'
import { useUser } from '@/lib/api/user'
import { user$ } from '@/lib/observables/session-observable'
import { FontAwesome } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import * as Burnt from 'burnt'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function UserScreen() {
  const { id } = useLocalSearchParams()
  const userData = user$.get()
  const { data: user, isLoading } = useUser(id.toString())
  const { data: dogs } = useDogsFromUserId(id.toString())

  const handleAddFriend = async () => {
    try {
      console.log('userData', userData)
      await sendFriendRequest(userData?.id, Number(id))
      Burnt.toast({
        title: "Demande d'ami envoyée",
        preset: 'done',
        message: "Votre demande d'ami a été envoyée",
        haptic: 'success',
      })
    } catch (error: any) {
      // If error message {message: 'Sender and receiver cannot be the same'}
      if (error.message === 'Sender and receiver cannot be the same') {
        Burnt.toast({
          title: 'Erreur',
          preset: 'error',
          message: 'Vous ne pouvez pas ajouter vous-même comme ami',
          haptic: 'error',
        })
      }
    }
  }

  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Small>Chargement...</Small>
      </View>
    )
  }

  return (
    <View
      style={{
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          gap: 24,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: 32,
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
        </View>
        <View style={{ alignItems: 'center' }}>
          <RoundedImage
            height={150}
            width={150}
            src='https://picsum.photos/300'
          />
          <FontAwesome
            name='paw'
            size={42}
            color='#DE6E48'
            style={{
              position: 'absolute',
              top: 0,
              right: '30%',
              transform: [{ rotate: '-16deg' }],
            }}
          />
        </View>
        <View style={styles.container}>
          <CardTitle color='#000' style={{ textAlign: 'center' }}>
            {user.first_name}, {user.age} ans
          </CardTitle>
          <SmallMedium color='#000'>
            {user.description
              ? user.description
              : i18n.t('global.noDescriptionFor') + ' ' + user.first_name}
          </SmallMedium>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <StandardButton onPress={handleAddFriend}>
                <Small color='#fff'>{i18n.t('profile.addFriend')}</Small>
              </StandardButton>
            </View>
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color='#F7A400'>{i18n.t('profile.write')}</Small>
              </StandardButton>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <BodyTitle title={i18n.t('profile.hisDogs')} />
          <View style={{ height: 60 }}>
            <FlashList
              data={dogs}
              horizontal
              estimatedItemSize={3}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <View key={item.id}>
                  <RoundedImage src={item.image} />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
})
