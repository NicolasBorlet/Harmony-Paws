import { i18n } from '@/app/_layout'
import { useSession } from '@/app/ctx'
import Paw from '@/assets/svg/tabbar/paw/paw'
import PawFocused from '@/assets/svg/tabbar/paw/paw-focused'
import { TabBar } from '@/components/tabbar/tabbar'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Redirect, Tabs } from 'expo-router'
import { GestureResponderEvent, Pressable, Text } from 'react-native'

type TabBarIconProps = {
  focused: boolean
  color: string
  size: number
}

export default function TabLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Redirect href='/login' />
  }

  const handleTabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    await new Promise(resolve => setTimeout(resolve, 150))
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarButton: (props: any) => {
          const { style, ...otherProps } = props
          return (
            <Pressable
              {...otherProps}
              style={style}
              onPress={(e: GestureResponderEvent) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                props.onPress?.(e)
              }}
              onLongPress={(e: GestureResponderEvent) => {
                handleTabPress()
                props.onLongPress?.(e)
              }}
            />
          )
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: `${i18n.t('home')}`,
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <PawFocused /> : <Paw />,
        }}
      />
      <Tabs.Screen
        name='(formation)'
        options={{
          title: 'Formation',
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Ionicons
              name='information-circle-outline'
              size={24}
              color='black'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(medical)'
        options={{
          title: 'Medical',
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <FontAwesome5 name='clinic-medical' size={24} color='black' />
          ),
        }}
      />
      <Tabs.Screen
        name='(account)'
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <AntDesign name='user' size={24} color='black' />
          ),
        }}
      />
    </Tabs>
  )
}
