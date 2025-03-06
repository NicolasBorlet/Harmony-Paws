import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import InformationCard from '@/components/medical/information-card'
import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const vaccines = [
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
]

const documents = [
  {
    title: 'Ordonnance',
    date: '20 février 2025',
  },
  {
    title: 'Facture',
    date: '20 février 2025',
  },
  {
    title: 'Remboursement',
    date: '20 février 2025',
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
    <ScrollView style={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
      <Block gap={32}>
        <InformationCard
          type='list'
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
        <InformationCard
          type='list'
          cardTitle='Documents'
          cardIcon={
            <MaterialIcons
              name='file-present'
              size={24}
              color={Colors.purple[500]}
            />
          }
          data={documents}
        />
      </Block>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
})
