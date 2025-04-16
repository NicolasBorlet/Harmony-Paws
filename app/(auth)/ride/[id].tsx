import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import MasterDogCardComponent from '@/components/dog/master-dog-card'
import Block from '@/components/grid/Block'
import ParallaxScrollView from '@/components/parallax-scrollview'
import ParticipantListing from '@/components/ride/participant-listing'
import RouteListing from '@/components/ride/route-listing'
import { RideDetailsSkeleton } from '@/components/skeletons/ride-details-skeleton'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import {
  BodyBold,
  BodyMedium,
  CardTitle,
  ExtraSmallSemiBold,
} from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { useActivityById } from '@/lib/api/ride'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RideDetails() {
  const insets = useSafeAreaInsets()
  const id = parseInt(useLocalSearchParams().id as string)
  const { data: activityData, isLoading, error } = useActivityById(id)
  const activity = activityData?.data

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    buttonAnimation()
  }, [])

  const estimatedStartHour = activity?.date
    ? new Date(activity.date).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '--'

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

  if (isLoading) return <RideDetailsSkeleton />
  if (error || !activity) return <BodyMedium>Error</BodyMedium>

  return (
    <>
      <Back top={Platform.OS === 'ios' ? insets.top : 24} />
      <ParallaxScrollView headerImage={activity.image || ''}>
        <View
          style={[
            styles.container,
            {
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 72,
            },
          ]}
        >
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>{activity.place}</CardTitle>
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
                  {i18n.t('ride.start')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>
                  {estimatedStartHour}
                </BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('ride.duration')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>
                  {activity.duration}
                </BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('ride.activities')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>
                  {activity.type}
                </BodyBold>
              </GridItemBackground>
            </Block>
          </View>
          <Divider />
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('ride.rideCreator')} />
            {activity.creator_id && (
              <Pressable
                onPress={() => router.push(`/user/${activity.creator_id}`)}
              >
                <MasterDogCardComponent masterData={activity.creator} />
              </Pressable>
            )}
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('ride.route')} />
            <RouteListing steps={activity.steps} />
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title={i18n.t('ride.participants')} />
            <ParticipantListing participants={activity.participants} />
          </View>
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={() => router.push('/ride/join')}>
          <BodyMedium color='#fff'>{i18n.t('ride.joinTheRide')}</BodyMedium>
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
    paddingHorizontal: 16,
  },
})
