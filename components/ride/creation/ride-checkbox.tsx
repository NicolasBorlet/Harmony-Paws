import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function RideCheckbox() {
  const [selectedAge, setSelectedAge] = useState<number | null>(null)

  // Création d'un tableau d'âges de 1 à 5
  const ages = Array.from({ length: 5 }, (_, index) => index + 1)

  const handleAgeChange = (age: number) => {
    setSelectedAge(age)
  }

  const renderRideDifficultyItem = ({ item }: { item: number }) => (
    <StandardCheckbox
      label={item.toString()}
      checked={selectedAge === item}
      onPress={() => handleAgeChange(item)}
      activeColor={Colors.orange[500]}
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
        scrollEnabled={false}
        data={ages}
        renderItem={renderRideDifficultyItem}
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
  },
})
