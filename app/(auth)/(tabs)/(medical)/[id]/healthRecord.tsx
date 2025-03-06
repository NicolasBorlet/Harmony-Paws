import Back from '@/components/back-button'
import { ExtraSmallBold, ExtraSmallMedium } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HealthRecord() {
  const { id } = useLocalSearchParams()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    console.log('id', id)
    console.log('pathname', pathname)
  }, [id])

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
      <View
        style={{
          boxShadow: '0px 0px 13px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <MaterialIcons
              name='vaccines'
              size={24}
              color={Colors.purple[500]}
            />
            <ExtraSmallBold color={Colors.purple[500]}>Vaccines</ExtraSmallBold>
          </View>
          <AntDesign name='right' size={12} color={Colors.purple[500]} />
        </View>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <ExtraSmallBold color={Colors.pink[500]}>
              La toux des chenils
            </ExtraSmallBold>
            <ExtraSmallMedium color={Colors.purple[500]}>-</ExtraSmallMedium>
            <ExtraSmallMedium color={Colors.purple[500]}>
              12 février 2025 (première injection)
            </ExtraSmallMedium>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
})
