import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
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
  const flatListRef = useRef<FlatList>(null)
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(selectedIndex)

  // Synchroniser l'index interne avec l'index fourni en prop
  useEffect(() => {
    setInternalSelectedIndex(selectedIndex)
  }, [selectedIndex])

  // Positionner la liste lors du chargement initial et des changements d'items
  useEffect(() => {
    if (selectedIndex >= 0 && flatListRef.current) {
      // Utilisation d'un timeout léger pour s'assurer que le composant est prêt
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: selectedIndex * ITEM_HEIGHT,
            animated: false,
          })
        }
      }, 10)
    }
  }, [selectedIndex, items])

  // Gestion du scroll terminé (soit par drag ou par momentum)
  const handleScrollEnd = event => {
    const offsetY = event.nativeEvent.contentOffset.y

    // Le calcul de l'index est crucial pour éviter le décalage
    // Diviser exactement par ITEM_HEIGHT et arrondir au plus proche
    const index = Math.round(offsetY / ITEM_HEIGHT)

    // Assurons-nous que l'index est dans les limites
    const normalizedIndex = Math.max(0, Math.min(items.length - 1, index))

    if (normalizedIndex !== internalSelectedIndex) {
      // Mettre à jour l'état interne
      setInternalSelectedIndex(normalizedIndex)

      // Informer le parent du changement
      if (items[normalizedIndex]) {
        onValueChange(items[normalizedIndex].value, normalizedIndex)
      }
    }

    // Assurer un alignement parfait
    const targetOffset = normalizedIndex * ITEM_HEIGHT
    if (Math.abs(targetOffset - offsetY) > 1) {
      // Seulement si nécessaire
      flatListRef.current?.scrollToOffset({
        offset: targetOffset,
        animated: true,
      })
    }
  }

  // Rendu de chaque item
  const renderItem = ({ item, index }) => {
    const isSelected = index === internalSelectedIndex

    return (
      <View style={styles.item}>
        <Text style={[isSelected && styles.selectedItem, itemStyle]}>
          {item.label}
        </Text>
      </View>
    )
  }

  // Espacement supérieur et inférieur pour centrer l'élément sélectionné
  // Important: ajuster la taille des composants d'espacement pour corriger le décalage
  const HeaderComponent = () => <View style={{ height: ITEM_HEIGHT * 2 }} />
  const FooterComponent = () => <View style={{ height: ITEM_HEIGHT * 2 }} />

  return (
    <View style={styles.column}>
      {/* Indicateur de sélection centré verticalement */}
      <View
        style={[
          styles.selectionIndicator,
          { top: '50%', marginTop: -ITEM_HEIGHT / 2 },
        ]}
      />

      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
      />
    </View>
  )
}

export default PickerColumn
