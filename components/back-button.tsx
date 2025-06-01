import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackButton } from './ui/button'

export default function Back({
  position,
  left,
  right,
  onPress,
  backgroundColor,
  color,
  top,
  icon,
}: {
  position?: string
  left?: string
  right?: string
  onPress?: () => void
  backgroundColor?: string
  color?: string
  top?: number
  icon?: React.ReactNode
}) {
  const insets = useSafeAreaInsets()

  return (
    <BackButton
      onPress={onPress ? onPress : () => router.back()}
      position={position}
      left={left && !right ? left : !right ? '16px' : undefined}
      right={right && !left ? right : undefined}
      style={{
        marginTop:
          top !== undefined
            ? top
            : position === 'relative'
              ? 0
              : Platform.OS === 'ios'
                ? insets.top
                : 0,
      }}
      backgroundColor={backgroundColor}
    >
      {icon || (
        <Entypo name='chevron-left' size={18} color={color || 'white'} />
      )}
    </BackButton>
  )
}
