import { i18n } from '@/app/_layout'
import { Colors } from '@/constants/Colors'
import * as Burnt from 'burnt'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { FC, PropsWithChildren } from 'react'
import { Platform, PressableProps } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { BodyMedium } from './text'

interface ButtonProps extends PressableProps {
  onPress?: () => void
  position?: string
  left?: string
  right?: string
  outlined?: boolean
  shadow?: boolean
  disabled?: boolean
  color?: string
  backgroundColor?: string
  width?: string
}

interface StandardButtonProps extends ButtonProps, PropsWithChildren {
  onPress?: () => void
  disabledText?: string
  pressedColor?: string
}

const StyledButton = styled.Pressable<ButtonProps>`
  paddingtop: 14px;
  flex: 1;
  background-color: ${(props: ButtonProps) =>
    props.onPress ? '#F49819' : '#F49819'};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`

const BackButton = styled.Pressable<ButtonProps>`
  position: ${(props: ButtonProps) => props.position || 'absolute'};
  left: ${(props: ButtonProps) => props.left || 'auto'};
  right: ${(props: ButtonProps) => props.right || 'auto'};
  background-color: ${(props: ButtonProps) =>
    props.backgroundColor || '#F7A400'};
  border-radius: 1000px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const MapButton = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  paddingvertical: 10px;
  paddinghorizontal: 16px;
  background-color: ${Colors.light.secondary};
  border-radius: 30px;
  width: 100px;
  height: 40px;
  gap: 6px;
  align-self: center;
  position: absolute;
  bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`

const AnimatedPressable = Animated.createAnimatedComponent(styled.Pressable``)

const StandardButton: FC<StandardButtonProps> = ({
  children,
  onPress,
  outlined,
  disabled,
  color = Colors.orange[500],
  pressedColor = '#F5B265',
  disabledText = "Cette action n'est pas disponible",
  ...props
}) => {
  const pressed = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [
        outlined ? 'transparent' : disabled ? '#F0B461' : color,
        outlined
          ? 'rgba(244, 152, 25, 0.1)'
          : disabled
            ? '#F0B461'
            : pressedColor,
      ],
    )

    return {
      backgroundColor,
      transform: [
        {
          scale: withSpring(pressed.value ? 0.98 : 1, {
            mass: 0.5,
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
    }
  })

  const handlePress = () => {
    if (disabled) {
      Burnt.toast({
        title: disabledText,
        preset: 'error',
      })
    }
    onPress?.()
  }

  return (
    <AnimatedPressable
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        pressed.value = 1
      }}
      onPressOut={() => {
        pressed.value = 0
      }}
      onPress={handlePress}
      {...props}
      style={[
        {
          width: props.width || '100%',
          backgroundColor: outlined ? 'transparent' : color,
          borderRadius: 10,
          padding: 14,
          alignItems: 'center',
          justifyContent: 'center',
          border: outlined ? '1px solid #F49819' : 'none',
          ...(!outlined && props.shadow && Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }
            : {}),
          ...(!outlined && props.shadow && Platform.OS === 'android'
            ? {
                elevation: 5,
              }
            : {}),
        },
        animatedStyle,
      ]}
    >
      {children}
    </AnimatedPressable>
  )
}

const AnimatedStandardButton = ({
  route,
  trad,
}: {
  route: string
  trad: string
}) => {
  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          paddingHorizontal: 16,
        },
        animatedStyles,
      ]}
    >
      <StandardButton onPress={() => router.push(route)}>
        <BodyMedium color='#fff'>{i18n.t(trad)}</BodyMedium>
      </StandardButton>
    </Animated.View>
  )
}

const SmallButton = styled.Pressable<ButtonProps>`
  background-color: #f49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const SmallButtonOutlined = styled.Pressable<ButtonProps>`
  background-color: none;
  border: 1px solid #f49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const UnderlinedButton = styled.Pressable<ButtonProps>`
  text-decoration: underline;
`

const FullRoundedButton = styled.Pressable<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.backgroundColor || Colors.orange[500]};
  border-radius: 1000px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export {
  AnimatedStandardButton,
  BackButton,
  FullRoundedButton,
  MapButton,
  SmallButton,
  SmallButtonOutlined,
  StandardButton,
  StyledButton,
  UnderlinedButton,
}
