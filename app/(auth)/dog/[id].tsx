import React, { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import MasterDogCardComponent from '@/components/dog/master-dog-card'
import Block from '@/components/grid/Block'
import ParallaxScrollView from '@/components/parallax-scrollview'
import { DogDetailsSkeleton } from '@/components/skeletons/dog-details-skeleton'
import { StandardButton } from '@/components/ui/button'
import { ContextMenu } from '@/components/ui/context-menu'
import Divider from '@/components/ui/divider'
import {
  Body,
  BodyBold,
  BodyMedium,
  CardTitle,
  ExtraSmallMedium,
} from '@/components/ui/text'
import { GridItem, GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { useDogDetails } from '@/lib/api/dog'
import { user$ } from '@/lib/observables/session-observable'
import { Entypo } from '@expo/vector-icons'
import * as Burnt from 'burnt'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function DogDetails() {
  const { id } = useLocalSearchParams()
  const { data, isLoading } = useDogDetails(id as string)
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  const user = user$.get()
  const insets = useSafeAreaInsets()

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    buttonAnimation()
  }, [])

  const buttonAnimation = () => {
    bottomPosition.value = withSpring(insets.bottom + 16, {
      damping: 20,
      stiffness: 90,
    })

    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    })
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
      opacity: opacity.value,
    }
  })

  const handleContextMenuPress = () => {
    console.log('handleContextMenuPress')
    setContextMenuPosition({
      x: SCREEN_WIDTH - 220,
      y: Platform.OS === 'ios' ? insets.top + 25 : 74,
    })
    setIsContextMenuVisible(true)
  }

  const contextMenuItems = [
    {
      label: i18n.t('dog.edit'),
      onPress: () => router.push(`/dog/${id}/edit`),
      icon: <Entypo name='edit' size={16} color={Colors.light.text} />,
    },
    {
      label: i18n.t('dog.delete'),
      onPress: () => {
        Burnt.toast({
          title: i18n.t('dog.deleteConfirmation'),
          preset: 'error',
          message: i18n.t('dog.deleteConfirmationMessage'),
          haptic: 'error',
        })
      },
      icon: <Entypo name='trash' size={16} color={Colors.light.text} />,
    },
  ]

  if (isLoading || !data) {
    return <DogDetailsSkeleton />
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Back top={Platform.OS === 'ios' ? insets.top : 24} />
      <Back
        icon={
          <Entypo name='dots-three-vertical' size={16} color={Colors.white} />
        }
        onPress={handleContextMenuPress}
        backgroundColor={Colors.purple[500]}
        top={Platform.OS === 'ios' ? insets.top : 24}
        right='16px'
      />
      <ContextMenu
        isVisible={isContextMenuVisible}
        onClose={() => setIsContextMenuVisible(false)}
        items={contextMenuItems}
        position={contextMenuPosition}
      />
      <ParallaxScrollView headerImage={data?.image || ''}>
        <View
          style={[
            styles.container,
            {
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 72,
            },
          ]}
        >
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>
              {data.name}, {data.age} ans
            </CardTitle>
          </View>
          <View>
            <Block
              row
              wrap='nowrap'
              style={{
                gap: 8,
              }}
            >
              <GridItemBackground height={60}>
                <BodyBold color={Colors.light.secondary}>
                  {data.breed.name}
                </BodyBold>
              </GridItemBackground>
              <GridItemBackground height={60}>
                <BodyBold color={Colors.light.secondary}>{data.sex}</BodyBold>
              </GridItemBackground>
              {data.dominance && (
                <GridItemBackground height={60}>
                  <BodyBold color={Colors.light.secondary}>
                    {data.dominance}
                  </BodyBold>
                </GridItemBackground>
              )}
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={`${i18n.t('dog.aboutOf')} ${data.name}`} />
            <Body>
              {data.description || i18n.t('global.weDontKnowMoreAbout')}{' '}
              {data.name}.
            </Body>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('dog.behavior')} />
            <Block
              flex={0}
              row
              wrap='wrap'
              style={{ gap: 12 }}
              justifyContent='space-between'
            >
              {data.behaviors.length > 0 ? (
                data.behaviors.map(behavior => (
                  <GridItem key={behavior.id}>
                    <ExtraSmallMedium color='#F49819'>
                      {behavior.name}
                    </ExtraSmallMedium>
                  </GridItem>
                ))
              ) : (
                <Body>{i18n.t('dog.noBehavior')}</Body>
              )}
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('dog.myMaster')} />
            <Pressable
              onPress={() => {
                console.log('user?.id', user?.id)
                console.log('data.owner.id', data.owner.id)
                if (user?.id === data.owner.id) {
                  Burnt.toast({
                    title: 'Vous êtes le maître de ce chien',
                    preset: 'error',
                    message:
                      'Vous ne pouvez pas vous ajouter vous-même comme ami',
                    haptic: 'error',
                  })
                  return
                } else {
                  router.push({
                    pathname: '/user/[id]',
                    params: { id: data.owner.id },
                  })
                }
              }}
            >
              <MasterDogCardComponent
                masterData={{
                  first_name: data.owner.first_name,
                  last_name: data.owner.last_name,
                  id: data.owner.id,
                }}
              />
            </Pressable>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('dog.nextRide')} />
            <Body>{i18n.t('dog.noNextRide')}</Body>
            {/* <RideItemListing rideCardData={data.nextRide} /> */}
          </View>
        </View>
      </ParallaxScrollView>
      {data.owner.id !== user?.id && (
        <Animated.View style={[styles.buttonContainer, animatedStyles]}>
          <StandardButton onPress={() => router.push('/dog/invitation')}>
            <BodyMedium color='#fff'>{i18n.t('dog.rideInvitation')}</BodyMedium>
          </StandardButton>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  ownerContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerDetails: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
})
