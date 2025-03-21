import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import Color from 'color'
import { StyleSheet } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

const ACTIVE_COLOR = Colors.light.active
const INACTIVE_COLOR = Colors.light.inactive

type CheckboxProps = {
  label: string
  checked: boolean
  onPress: () => void
  activeColor?: string
  labelColor?: string
  inactiveColor?: string
  opacity?: number
  hasIcon?: boolean
  icon?: React.ReactNode
}

const TimingConfig = {
  duration: 150,
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
  activeColor = ACTIVE_COLOR,
  inactiveColor = INACTIVE_COLOR,
  opacity = 0.1,
  hasIcon = true,
  labelColor = '#fff',
  icon,
}) => {
  const fadedActiveColor = Color(activeColor).alpha(opacity).toString()

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? fadedActiveColor : 'transparent',
        TimingConfig,
      ),
      borderColor: withTiming(
        checked ? activeColor : inactiveColor,
        TimingConfig,
      ),
      paddingLeft: 20,
      paddingRight: !checked ? 20 : 14,
    }
  }, [checked])

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? labelColor : inactiveColor, TimingConfig),
    }
  }, [checked])

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {checked && hasIcon && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut.duration(150)}
          style={{
            marginLeft: 8,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
            width: 20,
          }}
        >
          {icon || <AntDesign name='check' size={16} color='#fff' />}
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: '#fff',
  },
})
