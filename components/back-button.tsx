import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackButton } from './ui/button'

export default function Back({
  position,
  left,
  onPress,
  backgroundColor,
  color,
}: {
  position?: string
  left?: string
  onPress?: () => void
  backgroundColor?: string
  color?: string
}) {
  const { top } = useSafeAreaInsets()

  return (
    <BackButton
      onPress={onPress ? onPress : () => router.back()}
      position={position}
      left={left}
      style={{ marginTop: position === 'relative' ? 0 : top }}
      backgroundColor={backgroundColor}
    >
      <Entypo name='chevron-left' size={18} color={color || 'white'} />
    </BackButton>
  )
}
