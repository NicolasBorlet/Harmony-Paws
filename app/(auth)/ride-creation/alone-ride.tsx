import { i18n } from '@/app/_layout'
import AloneRideIcon from '@/assets/svg/ride/alone-ride'
import PawPath from '@/assets/svg/ride/creation/path'
import Back from '@/components/back-button'
import CustomPicker from '@/components/picker'
import { DurationValue } from '@/components/picker/types'
import RideCheckbox from '@/components/ride/creation/ride-checkbox'
import { StandardButton } from '@/components/ui/button'
import { BodyMedium, ParagraphSemiBold } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Colors } from '@/constants/Colors'
import { useCreateActivity } from '@/lib/api/ride'
import { user$ } from '@/lib/observables/session-observable'
import { Entypo } from '@expo/vector-icons'
import * as Burnt from 'burnt'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const customColumns = [
  {
    items: [
      { label: 'Petit', value: 'small' },
      { label: 'Moyen', value: 'medium' },
      { label: 'Grand', value: 'large' },
    ],
  },
]

// Créer un composant animé personnalisé basé sur Pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

// Définir la couleur active
const ACTIVE_COLOR = '#F7A400'

export default function AloneRide() {
  const createActivity = useCreateActivity()
  const [isSubmitting, setIsSubmitting] = useState(false)

  enum ActivityType {
    PARK = 'park',
    FOREST = 'forest',
    CITY = 'city',
    BEACH = 'beach',
  }

  const insets = useSafeAreaInsets()
  const user = user$.get()

  const [location, setLocation] = useState<string>('')
  const [type, setType] = useState<ActivityType>(ActivityType.PARK)
  const [isDurationPickerVisible, setDurationPickerVisible] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState<DurationValue>({
    hours: 1,
    minutes: 30,
    totalMinutes: 90,
  })

  // Créer des objets pour les valeurs d'animation de chaque type d'activité
  const animationValues = {
    [ActivityType.PARK]: useSharedValue(1),
    [ActivityType.FOREST]: useSharedValue(0),
    [ActivityType.CITY]: useSharedValue(0),
    [ActivityType.BEACH]: useSharedValue(0),
  }
  const [duration, setDuration] = useState<string>('1h00')

  // Mettre à jour les animations lorsque le type change
  useEffect(() => {
    // Réinitialiser toutes les animations
    Object.values(ActivityType).forEach(activityType => {
      animationValues[activityType].value = withTiming(
        activityType === type ? 1 : 0,
        {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
      )
    })
  }, [type])

  const getAnimatedStyle = (activityType: ActivityType) => {
    return useAnimatedStyle(() => {
      const fillProgress = animationValues[activityType].value

      // Utilisation de interpolateColor pour une transition fluide entre blanc et la couleur active
      const backgroundColor = interpolateColor(
        fillProgress,
        [0, 1],
        ['white', ACTIVE_COLOR],
      )

      return {
        backgroundColor,
        borderWidth: 1,
        borderColor: ACTIVE_COLOR,
        borderRadius: 999,
        paddingHorizontal: 20,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }
    })
  }

  // Fonction pour créer un style de texte animé pour chaque bouton
  const getAnimatedTextStyle = (activityType: ActivityType) => {
    return useAnimatedStyle(() => {
      const fillProgress = animationValues[activityType].value

      // Utilisation de interpolateColor pour une transition fluide de la couleur du texte
      const textColor = interpolateColor(
        fillProgress,
        [0, 1],
        [ACTIVE_COLOR, 'white'],
      )

      return {
        color: textColor,
      }
    })
  }

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

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

  useEffect(() => {
    buttonAnimation()
  }, [])

  const handleCreateActivity = async () => {
    if (!location || !type || !duration || !user?.id) return

    setIsSubmitting(true)
    try {
      // Convert the activity type to match the database enum
      const activityType = type.toLowerCase() as 'forest' | 'city' | 'plage'

      // Create the activity object
      const activityData = {
        place: location,
        date: new Date().toISOString(), // You might want to add a date picker later
        duration: duration,
        visibility: 'public' as const,
        type: activityType,
        creator_id: user.id,
      }

      console.log('Activity data:', activityData)

      await createActivity.mutateAsync(activityData)
      Burnt.toast({
        title: i18n.t('global.success'),
        preset: 'done',
        message: i18n.t('rideCreation.rideCreationSuccess'),
        haptic: 'success',
      })
      router.replace('/(auth)/(tabs)/(home)')
    } catch (error) {
      console.error('Error creating activity:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
        ]}
        contentInset={{
          bottom: Platform.OS === 'ios' ? insets.bottom + 32 : 48,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Back position='relative' />
        <View
          style={{
            position: 'absolute',
            top: -132,
            left: 0,
            right: 0,
          }}
        >
          <PawPath />
        </View>
        <View style={styles.rideTypeContainer}>
          <View style={styles.rideType}>
            <AloneRideIcon />
            <ParagraphSemiBold
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.aloneRide')}
            </ParagraphSemiBold>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <BodyMedium color={Colors.black}>
              {i18n.t('rideCreation.rideLocation')}
            </BodyMedium>
            <CustomTextInput
              placeholder={i18n.t('rideCreation.rideLocationPlaceholder')}
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={Colors.grey[500]}
            />
          </View>
          <View style={styles.inputContainer}>
            <BodyMedium color={Colors.black}>
              {i18n.t('rideCreation.rideType')}
            </BodyMedium>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {Object.values(ActivityType).map(activityType => (
                <View key={activityType}>
                  <AnimatedPressable
                    onPress={() => setType(activityType)}
                    style={getAnimatedStyle(activityType)}
                  >
                    <Animated.Text
                      style={[
                        { fontFamily: 'Montserrat_500Medium', fontSize: 14 },
                        getAnimatedTextStyle(activityType),
                      ]}
                    >
                      {i18n.t(`rideCreation.${activityType}`)}
                    </Animated.Text>
                  </AnimatedPressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <BodyMedium color={Colors.black}>
              {i18n.t('rideCreation.rideDifficulty')}
            </BodyMedium>
            <RideCheckbox
              values={[1, 2, 3, 4, 5]}
              onChange={() => {}}
              activeColor={Colors.orange[500]}
              inactiveColor={Colors.grey[500]}
            />
          </View>
          <View style={styles.inputContainer}>
            <BodyMedium color={Colors.black}>
              {i18n.t('rideCreation.rideDuration')}
            </BodyMedium>
            <Pressable
              onPress={() => setDurationPickerVisible(true)}
              style={{
                borderRadius: 10,
                backgroundColor: '#f5f5f5',
                paddingVertical: 16,
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <BodyMedium>{duration}</BodyMedium>

              <View style={{ gap: 4 }}>
                <Entypo name='chevron-up' size={8} color={Colors.grey[500]} />
                <Entypo name='chevron-down' size={8} color={Colors.grey[500]} />
              </View>
            </Pressable>

            {/* Duration Picker */}
            <CustomPicker
              isVisible={isDurationPickerVisible}
              onClose={() => setDurationPickerVisible(false)}
              onConfirm={(durationValue: DurationValue) => {
                // Mettre à jour selectedDuration avec la nouvelle valeur
                setSelectedDuration(durationValue)
                // Formatage de la durée en chaîne de caractères
                const formattedDuration = `${durationValue.hours}h${durationValue.minutes.toString().padStart(2, '0')}`
                setDuration(formattedDuration)
              }}
              type='duration'
              initialValue={selectedDuration}
              confirmText='OK'
              cancelText='Annuler'
              columns={customColumns}
            />
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton
          onPress={handleCreateActivity}
          disabled={isSubmitting || !location || !type || !duration}
        >
          <BodyMedium color='#fff'>
            {isSubmitting
              ? i18n.t('global.loading')
              : i18n.t('global.validate')}
          </BodyMedium>
        </StandardButton>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rideType: {
    backgroundColor: '#F0EBF5',
    width: 175,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  rideTypeContainer: {
    marginTop: 20,
    marginBottom: 48,
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
    paddingBottom: 100,
  },
  inputContainer: {
    gap: 12,
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
})
