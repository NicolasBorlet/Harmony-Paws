import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'

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
      activeColor='white'
      opacity={opacity}
    />
  )
}
