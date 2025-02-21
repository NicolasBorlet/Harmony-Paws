import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function AgeCheckbox() {
  const [selectedAge, setSelectedAge] = useState<number | null>(null)

  // Création d'un tableau d'âges de 1 à 15
  const ages = Array.from({ length: 15 }, (_, index) => index + 1)

  const renderAgeItem = ({ item }: { item: number }) => (
    <StandardCheckbox
      label={item.toString()}
      checked={selectedAge === item}
      onPress={() => setSelectedAge(item)}
      inactiveColor='#979898'
      opacity={1}
      hasIcon={false}
      height={50}
      width={50}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={ages}
        renderItem={renderAgeItem}
        keyExtractor={item => item.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listContainer: {
    gap: 14,
    marginLeft: 16,
  },
})
