// PickerColumn.tsx
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import styles, { ITEM_HEIGHT } from './styles'
import { PickerItemType } from './types'

interface PickerColumnProps {
  items: PickerItemType[]
  selectedIndex: number
  onValueChange: (value: string | number, index: number) => void
  itemStyle?: object
  keyExtractor?: (item: PickerItemType) => string
}

const PickerColumn: React.FC<PickerColumnProps> = ({
  items,
  selectedIndex,
  onValueChange,
  itemStyle,
  keyExtractor = item => item.value.toString(),
}) => {
  const flatListRef = React.useRef<FlatList>(null)
  const scrollY = useSharedValue(0)

  // Initialiser le scroll position selon l'index sélectionné
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: false,
      })
    }
  }, [selectedIndex, items])

  const handleValueChange = (index: number) => {
    if (index >= 0 && index < items.length) {
      onValueChange(items[index].value, index)
    }
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
    onEndDrag: event => {
      const index = Math.round(event.contentOffset.y / ITEM_HEIGHT)
      // S'assurer que l'index est dans les limites
      const normalizedIndex = Math.max(0, Math.min(items.length - 1, index))

      // Aligner parfaitement sur l'élément
      const targetY = normalizedIndex * ITEM_HEIGHT
      scrollY.value = withTiming(targetY, { duration: 150 })

      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: targetY,
          animated: true,
        })
      }

      // Notifier le changement de valeur
      runOnJS(handleValueChange)(normalizedIndex)
    },
  })

  const renderItem = ({
    item,
    index,
  }: {
    item: PickerItemType
    index: number
  }) => {
    const isSelected = index === selectedIndex

    return (
      <View style={[styles.item]}>
        <Text style={[isSelected && styles.selectedItem, itemStyle]}>
          {item.label}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.column}>
      <View style={styles.selectionIndicator} />

      <Animated.FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        ListHeaderComponent={() => <View style={{ height: ITEM_HEIGHT * 2 }} />}
        ListFooterComponent={() => <View style={{ height: ITEM_HEIGHT * 2 }} />}
      />
    </View>
  )
}

export default PickerColumn
