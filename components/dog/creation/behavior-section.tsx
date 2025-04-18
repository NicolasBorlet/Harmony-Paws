import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { Database } from '@/database.types'
import { storage } from '@/lib/utils/storage'
import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import DogBehaviorCheckbox from './behavior-checkbox'

type Behavior = Database['public']['Tables']['behavior']['Row']

interface Props {
  behaviors: Behavior[] | undefined
}

export default function DogBehaviorSection({ behaviors }: Props) {
  const [selectedBehaviors, setSelectedBehaviors] = useState<number[]>([])

  const handleBehaviorToggle = useCallback(
    (behaviorId: number) => {
      setSelectedBehaviors(prev => {
        const newSelected = prev.includes(behaviorId)
          ? prev.filter(id => id !== behaviorId)
          : [...prev, behaviorId]

        const existingData = storage.getString('dog')
        const dogData = existingData ? JSON.parse(existingData) : {}

        storage.set(
          'dog',
          JSON.stringify({
            ...dogData,
            behavior_ids: newSelected,
          }),
        )

        return newSelected
      })
    },
    [selectedBehaviors],
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body>{i18n.t('dogCreation.dogBehaviorQuestion')}</Body>
      </View>
      <FlatList
        data={behaviors}
        renderItem={({ item }) => (
          <DogBehaviorCheckbox
            label={item.name}
            checked={selectedBehaviors.includes(item.id)}
            inactiveColor='#979898'
            opacity={1}
            onPress={() => handleBehaviorToggle(item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titleContainer: {
    paddingLeft: 16,
  },
  flatList: {
    marginLeft: 16,
    gap: 16,
  },
})
