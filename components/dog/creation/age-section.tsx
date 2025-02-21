import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import AgeCheckbox from './age-checkbox'

export default function DogAgeSection() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body color='black'>{i18n.t('dogAge')}</Body>
      </View>
      <AgeCheckbox />
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
})
