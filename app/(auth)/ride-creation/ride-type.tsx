import { i18n } from '@/app/_layout'
import AloneRide from '@/assets/svg/ride/alone-ride'
import GroupRide from '@/assets/svg/ride/group-ride'
import Back from '@/components/back-button'
import { ParagraphMedium, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RideCreation() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
      ]}
    >
      <Back position='relative' />
      <SpecialTitle style={{ textAlign: 'center', paddingHorizontal: 20 }}>
        {i18n.t('rideCreation.newRide')}
      </SpecialTitle>
      <View style={styles.content}>
        <View style={styles.rideTypeContainer}>
          <TouchableOpacity
            style={styles.rideType}
            onPress={() => router.push('/ride-creation/alone-ride')}
          >
            <AloneRide />
            <ParagraphMedium
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.aloneRide')}
            </ParagraphMedium>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rideType}
            onPress={() => router.push('/ride-creation/group-ride')}
          >
            <GroupRide />
            <ParagraphMedium
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.groupRide')}
            </ParagraphMedium>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 48,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -120 }],
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rideTypeContainer: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
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
})
