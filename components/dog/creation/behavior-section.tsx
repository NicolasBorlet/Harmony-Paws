import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { FlatList, StyleSheet, View } from 'react-native'
import DogBehaviorCheckbox from './behavior-checkbox'

const behaviorOptions = [
  {
    label: 'Joueur',
    checked: false,
  },
  {
    label: 'Joueur',
    checked: false,
  },
  {
    label: 'Joueur',
    checked: false,
  },
]

export default function DogBehaviorSection() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body>{i18n.t('dogBehavior')}</Body>
      </View>
      <FlatList
        data={behaviorOptions}
        renderItem={({ item }) => (
          <DogBehaviorCheckbox
            label={item.label}
            checked={item.checked}
            inactiveColor='#979898'
            opacity={1}
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
