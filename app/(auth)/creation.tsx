import AloneRide from '@/assets/svg/ride/alone-ride'
import GroupRide from '@/assets/svg/ride/group-ride'
import Back from '@/components/back-button'
import { ParagraphMedium, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { i18n } from '../_layout'

export default function RideCreation() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 32 },
      ]}
    >
      <Back position='relative' />
      <View style={styles.content}>
        <SpecialTitle style={{ textAlign: 'center' }}>
          {i18n.t('rideCreation.newRide')}
        </SpecialTitle>
        <View style={styles.rideTypeContainer}>
          <TouchableOpacity style={styles.rideType}>
            <AloneRide />
            <ParagraphMedium
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.aloneRide')}
            </ParagraphMedium>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rideType}>
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
    paddingHorizontal: 20,
    alignItems: 'center',
    maxWidth: 300,
    marginHorizontal: 'auto',
  },
  rideTypeContainer: {
    flexDirection: 'column',
    gap: 20,
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
