import Back from '@/components/back-button'
import InformationCard from '@/components/medical/information-card'
import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const vaccines = [
  {
    icon: (
      <MaterialIcons name='vaccines' size={24} color={Colors.purple[500]} />
    ),
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    icon: (
      <MaterialIcons name='vaccines' size={24} color={Colors.purple[500]} />
    ),
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    icon: (
      <MaterialIcons name='vaccines' size={24} color={Colors.purple[500]} />
    ),
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
]

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
      <View style={{ gap: 16 }}>
        <InformationCard
          cardTitle='Vaccines'
          cardIcon={
            <MaterialIcons
              name='vaccines'
              size={24}
              color={Colors.purple[500]}
            />
          }
          data={vaccines}
        />
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
