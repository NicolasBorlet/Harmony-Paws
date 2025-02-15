import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import SexCheckbox from './sex-checkbox'

export default function SexSection() {
  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('yourDogIs')}</Body>
      <SexCheckbox />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
})
