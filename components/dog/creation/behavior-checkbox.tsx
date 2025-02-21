import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'

export default function DogBehaviorCheckbox({
  label,
  checked,
  inactiveColor,
  opacity,
}: {
  label: string
  checked: boolean
  inactiveColor: string
  opacity: number
}) {
  return (
    <StandardCheckbox
      label={label}
      checked={checked}
      onPress={() => {}}
      inactiveColor={inactiveColor}
      opacity={opacity}
    />
  )
}
