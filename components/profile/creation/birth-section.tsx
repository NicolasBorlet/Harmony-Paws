import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import ProfileBirthDaySection from './birth/day-section'

export default function ProfileBirthSection() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body color='black'>{i18n.t('WhatIsYourBirthDate')}</Body>
      </View>
      {/** Day section */}
      <ProfileBirthDaySection />
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
