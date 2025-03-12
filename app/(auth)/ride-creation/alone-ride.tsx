import { i18n } from '@/app/_layout'
import AloneRideIcon from '@/assets/svg/ride/alone-ride'
import Back from '@/components/back-button'
import { ParagraphMedium } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AloneRide() {
  const insets = useSafeAreaInsets()

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
      <View style={styles.content}></View>
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
    backgroundColor: 'red',
  },
})
