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

type CheckboxProps = {
  label: string
  checked: boolean
  onPress: () => void
}

const TimingConfig = {
  duration: 150,
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  const fadedActiveColor = Color(Colors.light.active).alpha(0.1).toString()

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? fadedActiveColor : 'transparent',
        TimingConfig,
      ),
      borderColor: withTiming(
        checked ? Colors.light.active : Colors.light.inactive,
        TimingConfig,
      ),
      paddingLeft: 20,
      paddingRight: !checked ? 20 : 14,
    }
  }, [checked])

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        checked ? Colors.light.active : Colors.light.inactive,
        TimingConfig,
      ),
    }
  }, [checked])

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
          style={styles.iconContainer}
        >
          <AntDesign name='checkcircle' size={20} color={Colors.light.active} />
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
  },
})
