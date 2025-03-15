import { i18n } from '@/app/_layout'
import AloneRideIcon from '@/assets/svg/ride/alone-ride'
import PawPath from '@/assets/svg/ride/creation/path'
import Back from '@/components/back-button'
import CustomPicker from '@/components/picker'
import RideCheckbox from '@/components/ride/creation/ride-checkbox'
import { StandardButton } from '@/components/ui/button'
import { BodyMedium, ParagraphSemiBold } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
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
  enum ActivityType {
    PARK = 'park',
    FOREST = 'forest',
    CITY = 'city',
    BEACH = 'beach',
  }

  const insets = useSafeAreaInsets()

  const [location, setLocation] = useState<string>('')
  const [type, setType] = useState<ActivityType>(ActivityType.PARK)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isTimePickerVisible, setTimePickerVisible] = useState(false)
  const [isCustomPickerVisible, setCustomPickerVisible] = useState(false)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(new Date())
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])

  // Créer des objets pour les valeurs d'animation de chaque type d'activité
  const animationValues = {
    [ActivityType.PARK]: useSharedValue(1),
    [ActivityType.FOREST]: useSharedValue(0),
    [ActivityType.CITY]: useSharedValue(0),
    [ActivityType.BEACH]: useSharedValue(0),
  }
  const [duration, setDuration] = useState<string>('1h00')
  const [showPicker, setShowPicker] = useState(false)

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

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
        ]}
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
              onPress={() => setTimePickerVisible(true)}
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

            {/* Time Picker */}
            <CustomPicker
              isVisible={isTimePickerVisible}
              onClose={() => setTimePickerVisible(false)}
              onConfirm={time => setSelectedTime(time)}
              type='time'
              initialValue={selectedTime}
              // Personnalisation de l'apparence
              confirmText='OK'
              cancelText='Annuler'
              confirmButtonStyle={{ backgroundColor: '#4CAF50' }}
            />
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton>
          <BodyMedium color='#fff'>{i18n.t('global.validate')}</BodyMedium>
        </StandardButton>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
