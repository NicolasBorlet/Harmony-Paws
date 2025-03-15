import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

interface RideCheckboxProps {
  values: number[]
  onChange: (value: number) => void
  activeColor?: string
  inactiveColor?: string
  numberOfItems?: number
}

export default function RideCheckbox({
  values,
  onChange,
  activeColor = Colors.orange[500],
  inactiveColor = '#979898',
  numberOfItems,
}: RideCheckboxProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const handleValueChange = (value: number) => {
    setSelectedValue(value)
    onChange(value)
  }

  const renderRideDifficultyItem = ({ item }: { item: number }) => (
    <StandardCheckbox
      label={item.toString()}
      checked={selectedValue === item}
      onPress={() => handleValueChange(item)}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      opacity={1}
      hasIcon={false}
      height={50}
      width={50}
    />
  )

  const data = numberOfItems ? values.slice(0, numberOfItems) : values

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={data}
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
