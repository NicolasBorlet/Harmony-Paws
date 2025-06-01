import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'
import SexCheckbox from './sex-checkbox'

interface Props {
  initialSex?: 'male' | 'female'
  onSexChange?: (sex: 'male' | 'female') => void
  isModifying?: boolean
}

export default function SexSection({
  initialSex,
  onSexChange,
  isModifying = false,
}: Props) {
  return (
    <View style={[styles.container, isModifying && { paddingHorizontal: 0 }]}>
      <View style={{ paddingLeft: isModifying ? 0 : 16 }}>
        <Body color='black'>{i18n.t('dogCreation.dogSexQuestion')}</Body>
      </View>
      <View style={{ paddingHorizontal: isModifying ? 0 : 16 }}>
        <SexCheckbox
          initialSex={initialSex}
          onSexChange={onSexChange}
          isModifying={isModifying}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
})
