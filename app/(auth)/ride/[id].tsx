import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import BodyTitle from '@/components/body-title/body-title'
import MasterDogCardComponent from '@/components/dog/master-dog-card'
import Block from '@/components/grid/Block'
import ParallaxScrollView from '@/components/parallax-scrollview'
import ParticipantListing from '@/components/ride/participant-listing'
import RouteListing from '@/components/ride/route-listing'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import {
  BodyBold,
  BodyMedium,
  CardTitle,
  ExtraSmallSemiBold
} from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ride = {
  place: 'Champagnier',
  image: 'https://picsum.photos/300',
  date: new Date(),
  duration: '2h',
  activityType: 'forest',
  creator: {
    name: 'Emma Swane',
    image: 'https://picsum.photos/300',
  },
  steps: [
    {
      activity_id: 1,
      place: 'Place du Laca',
      estimated_hour: new Date(),
    },
    {
      activity_id: 2,
      place: 'Tour Ertzienne',
      estimated_hour: new Date(),
    },
    {
      activity_id: 3,
      place: 'Place du Laca',
      estimated_hour: new Date(),
    },
  ],
  participants: [
    {
      name: 'Max',
      image: 'https://picsum.photos/300',
      owerName: 'Lucie',
    },
    {
      name: 'Taico',
      image: 'https://picsum.photos/300',
      owerName: 'Emma',
    },
    {
      name: 'Astro',
      image: 'https://picsum.photos/300',
      owerName: 'Aymeric',
    },
  ],
}

export default function RideDetails() {
  const insets = useSafeAreaInsets()

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    buttonAnimation()
  }, [])

  // Avoir une variable pour estimer l'heure de départ en se bsant sur la ride.date et en récupérant uniquement l'heure
  const estimatedStartHour = new Date(ride.date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

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

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={ride.image}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>{ride.place}</CardTitle>
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
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('start')}
                </ExtraSmallSemiBold>
                <BodyBold color='#663399'>{estimatedStartHour}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('duration')}
                </ExtraSmallSemiBold>
                <BodyBold color='#663399'>{ride.duration}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('activities')}
                </ExtraSmallSemiBold>
                <BodyBold color='#663399'>{ride.activityType}</BodyBold>
              </GridItemBackground>
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('rideCreator')} />
            <MasterDogCardComponent />
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('route')} />
            <RouteListing />
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('participants')} />
            <ParticipantListing />
          </View>
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={() => router.push('/ride/join')}>
          <BodyMedium color='#fff'>{i18n.t('joinTheRide')}</BodyMedium>
        </StandardButton>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
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
