import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Colors } from '@/constants/Colors'

interface Props {
  label: string
  checked: boolean
  inactiveColor: string
  opacity: number
  onPress: () => void
}

export default function DogBehaviorCheckbox({
  label,
  checked,
  inactiveColor,
  opacity,
  onPress,
}: Props) {
  return (
    <StandardCheckbox
      label={label}
      checked={checked}
      onPress={onPress}
      inactiveColor={inactiveColor}
      activeColor={Colors.light.secondary}
      opacity={opacity}
    />
  )
}
