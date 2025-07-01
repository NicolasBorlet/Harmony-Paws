import { i18n } from '@/lib/i18n'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import AgeCheckbox from './age-checkbox'

interface Props {
  initialAge?: number
  onAgeChange?: (age: number) => void
  isModifying?: boolean
}

export default function DogAgeSection({
  initialAge,
  onAgeChange,
  isModifying = false,
}: Props) {
  return (
    <View style={[styles.container, isModifying && { paddingHorizontal: 0 }]}>
      <View style={{ paddingLeft: isModifying ? 0 : 16 }}>
        <Body color='black'>{i18n.t('dogCreation.dogAgeQuestion')}</Body>
      </View>
      <AgeCheckbox
        initialAge={initialAge}
        onAgeChange={onAgeChange}
        isModifying={isModifying}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
})
