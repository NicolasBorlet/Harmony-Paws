import { i18n } from '@/lib/i18n'
import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { BodySemiBold } from '../ui/text'

type Props = {
  selectedTab: 'about' | 'advice'
  onTabChange: (tab: 'about' | 'advice') => void
  language: 'en' | 'fr'
}

export default function SegmentedControl({
  selectedTab,
  onTabChange,
  language,
}: Props) {
  const leftValue = useSharedValue(0)

  useEffect(() => {
    leftValue.value = selectedTab === 'about' ? '0%' : '100%'
  }, [selectedTab])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(leftValue.value),
        },
      ],
    }
  })

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 16,
      }}
    >
      <Pressable
        onPress={() => onTabChange('about')}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BodySemiBold color={selectedTab === 'about' ? '#F7A400' : '#000'}>
          {i18n.t('global.about')}
        </BodySemiBold>
      </Pressable>
      <Pressable
        onPress={() => onTabChange('advice')}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BodySemiBold color={selectedTab === 'advice' ? '#F7A400' : '#000'}>
          {i18n.t('advice')}
        </BodySemiBold>
      </Pressable>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '50%',
            height: 2,
            backgroundColor: '#F7A400',
          },
          animatedStyle,
        ]}
      />
    </View>
  )
}
