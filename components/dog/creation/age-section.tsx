import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import AgeCheckbox from './age-checkbox'

export default function DogAgeSection() {
  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogAge')}</Body>
      <AgeCheckbox />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    color: '#696969',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
})
