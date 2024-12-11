import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import MasterDogCardComponent from '@/components/dog/master-dog-card'
import Block from '@/components/grid/Block'
import ParallaxScrollView from '@/components/parallax-scrollview'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import {
  Body,
  BodyBold,
  BodyMedium,
  CardTitle,
  ExtraSmallMedium
} from '@/components/ui/text'
import { GridItem, GridItemBackground } from '@/components/ui/view'
import { useDogDetails } from '@/lib/api/dog'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import LoaderComponent from '@/components/loader'

export default function DogDetails() {
  const { id } = useLocalSearchParams()
  const { data, isLoading } = useDogDetails(id)

  const insets = useSafeAreaInsets()

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    buttonAnimation()
  }, [])

  useEffect(() => {
    // if (data) {
    console.log(data)
    // }
  }, [data])

  const buttonAnimation = () => {
    // Animate the button to slide up
    bottomPosition.value = withSpring(insets.bottom + 16, {
      damping: 20,
      stiffness: 90,
    })

    // Animate the button opacity
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

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={data?.image || ''}>
        <View style={styles.container}>
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
              <GridItemBackground>
                <BodyBold color='#663399'>{data.breed.name}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <BodyBold color='#663399'>{data.sex}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <BodyBold color='#663399'>{data.dominance}</BodyBold>
              </GridItemBackground>
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={`${i18n.t('aboutOf')} ${data.name}`} />
            <Body>{data.description || ''}</Body>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('behavior')} />
            <Block
              flex={0}
              row
              wrap='wrap'
              style={{ gap: 12 }}
              justifyContent='space-between'
            >
              {data?.behaviors.map(behavor => (
                <GridItem key={behavor.id}>
                  <ExtraSmallMedium color='#F49819'>
                    {behavor.name}
                  </ExtraSmallMedium>
                </GridItem>
              ))}
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('myMaster')} />
            <Pressable onPress={() => router.push(`/user/${data.owner_id}`)}>
              <MasterDogCardComponent masterData={{ name: data.owner.first_name, age: data.owner.last_name, image: data.owner.image }} />
            </Pressable>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('nextRide')} />
            {/* <RideItemListing rideCardData={data.nextRide} /> */}
          </View>
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={() => router.push('/dog/invitation')}>
          <BodyMedium color='#fff'>{i18n.t('rideInvitation')}</BodyMedium>
        </StandardButton>
      </Animated.View>
    </>
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
