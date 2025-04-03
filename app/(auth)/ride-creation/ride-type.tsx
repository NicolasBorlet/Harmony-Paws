import { i18n } from '@/app/_layout'
import AloneRide from '@/assets/svg/ride/alone-ride'
import PawPath from '@/assets/svg/ride/creation/path'
import GroupRide from '@/assets/svg/ride/group-ride'
import Back from '@/components/back-button'
import { ParagraphSemiBold, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
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
      <Back
        position='relative'
        icon={<Entypo name='cross' size={18} color={Colors.white} />}
      />
      <View style={{ alignSelf: 'center' }}>
        <SpecialTitle
          style={{ textAlign: 'center', paddingHorizontal: 20, maxWidth: 300 }}
        >
          {i18n.t('rideCreation.newRide')}
        </SpecialTitle>
      </View>
      <View style={styles.content}>
        <View style={styles.rideTypeContainer}>
          <TouchableOpacity
            style={styles.rideType}
            onPress={() => router.push('/ride-creation/alone-ride')}
          >
            <AloneRide />
            <ParagraphSemiBold
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.aloneRide')}
            </ParagraphSemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rideType}
            onPress={() => router.push('/ride-creation/group-ride')}
          >
            <GroupRide />
            <ParagraphSemiBold
              color={Colors.purple[500]}
              style={{ textAlign: 'center' }}
            >
              {i18n.t('rideCreation.groupRide')}
            </ParagraphSemiBold>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: -32,
          left: 0,
          right: 0,
        }}
      >
        <PawPath />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{ scaleX: -1 }],
        }}
      >
        <PawPath />
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
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -60 }],
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rideTypeContainer: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
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
})
