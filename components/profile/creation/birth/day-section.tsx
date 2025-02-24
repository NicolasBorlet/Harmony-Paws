import { i18n } from '@/app/_layout'
import { ExtraSmall } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function ProfileBirthDaySection() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ExtraSmall color='black'>{i18n.t('day')}</ExtraSmall>
      </View>
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
