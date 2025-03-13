import { i18n } from '@/app/_layout'
import AloneRideIcon from '@/assets/svg/ride/alone-ride'
import Back from '@/components/back-button'
import RideCheckbox from '@/components/ride/creation/ride-checkbox'
import { BodyMedium, ParagraphMedium } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

  // Créer des objets pour les valeurs d'animation de chaque type d'activité
  const animationValues = {
    [ActivityType.PARK]: useSharedValue(1),
    [ActivityType.FOREST]: useSharedValue(0),
    [ActivityType.CITY]: useSharedValue(0),
    [ActivityType.BEACH]: useSharedValue(0),
  }

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

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
      ]}
    >
      <Back position='relative' />
      <View style={styles.rideTypeContainer}>
        <View style={styles.rideType}>
          <AloneRideIcon />
          <ParagraphMedium
            color={Colors.purple[500]}
            style={{ textAlign: 'center' }}
          >
            {i18n.t('rideCreation.aloneRide')}
          </ParagraphMedium>
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
          <RideCheckbox />
        </View>
        <View style={styles.inputContainer}>
          <BodyMedium color={Colors.black}>
            {i18n.t('rideCreation.rideDuration')}
          </BodyMedium>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rideType: {
    backgroundColor: `${Colors.purple[500]}1A`,
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
  },
  inputContainer: {
    gap: 12,
  },
})
