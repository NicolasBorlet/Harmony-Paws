import { i18n } from '@/lib/i18n'
import DogIcon from '@/assets/svg/dog-icon'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

type Tab = {
  id: 'dog' | 'ride'
  icon: React.ReactNode
  label: string
}

type Props = {
  selectedTab: 'dog' | 'ride'
  onTabChange: (tab: 'dog' | 'ride') => void
  language: 'en' | 'fr'
}

export default function TabSwitcher({
  selectedTab,
  onTabChange,
  language,
}: Props) {
  const TABS: Tab[] = [
    {
      id: 'dog',
      icon: (
        <DogIcon
          color={selectedTab === 'dog' ? Colors.white : Colors.orange[500]}
        />
      ),
      label: i18n.t('global.dogs'),
    },
    {
      id: 'ride',
      icon: (
        <Ionicons
          name='paw'
          size={24}
          color={selectedTab === 'ride' ? Colors.white : Colors.orange[500]}
        />
      ),
      label: i18n.t('global.rides'),
    },
  ]

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(selectedTab === 'dog' ? 0 : 96.5),
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.selector, animatedStyle]} />
      {TABS.map(tab => (
        <Pressable
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <Text
            style={[
              styles.label,
              { color: selectedTab === tab.id ? '#fff' : '#F7A400' },
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 48,
    width: 193,
    backgroundColor: '#FDE6D7',
    borderRadius: 35,
    position: 'relative',
    marginBottom: 20,
  },
  selector: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#F7A400',
    borderRadius: 35,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
