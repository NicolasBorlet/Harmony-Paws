import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import Color from 'color'
import { StyleSheet } from 'react-native'
import Animated, {
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
  height?: number
  width?: number
}

const TimingConfig = {
  duration: 150,
}

export const StandardCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
  activeColor = ACTIVE_COLOR,
  inactiveColor = INACTIVE_COLOR,
  opacity = 0.1,
  hasIcon = true,
  labelColor = '#fff',
  icon,
  height = 'auto',
  width = 'auto',
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
      paddingLeft: 16,
      paddingRight: 16,
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
      style={[
        styles.container,
        rContainerStyle,
        {
          height: typeof height === 'number' ? height : 'auto',
          width: typeof width === 'number' ? width : 'auto',
        },
      ]}
      onTouchEnd={onPress}
    >
      {hasIcon &&
        (icon || (
          <AntDesign
            name='check'
            size={16}
            color={checked ? 'white' : inactiveColor}
          />
        ))}
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#fff',
  },
})
