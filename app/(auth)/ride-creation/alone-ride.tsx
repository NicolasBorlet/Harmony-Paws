import { i18n } from '@/app/_layout'
import AloneRideIcon from '@/assets/svg/ride/alone-ride'
import Back from '@/components/back-button'
import { BodyMedium, ParagraphMedium } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {Object.values(ActivityType).map(activityType => (
              <View>
                <Pressable
                  key={activityType}
                  onPress={() => setType(activityType)}
                  style={{
                    backgroundColor:
                      type === activityType ? Colors.orange[500] : 'white',
                    borderWidth: 1,
                    borderColor: Colors.orange[500],
                    borderRadius: 999,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ParagraphMedium
                    color={type === activityType ? 'white' : Colors.orange[500]}
                  >
                    {i18n.t(`rideCreation.${activityType}`)}
                  </ParagraphMedium>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <BodyMedium color={Colors.black}>
            {i18n.t('rideCreation.rideDifficulty')}
          </BodyMedium>
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
