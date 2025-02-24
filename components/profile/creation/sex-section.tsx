import { i18n } from '@/app/_layout'
import SexCheckbox from '@/components/profile/creation/sex-checkbox'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function ProfileSexSection() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body color='black'>{i18n.t('youAre')}</Body>
      </View>
      <SexCheckbox />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
})
