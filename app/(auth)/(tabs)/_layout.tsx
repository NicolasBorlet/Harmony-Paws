import { i18n } from '@/app/_layout'
import { useSession } from '@/app/ctx'
import Bone from '@/assets/svg/tabbar/bone/bone'
import BoneFocused from '@/assets/svg/tabbar/bone/bone-focused'
import Formation from '@/assets/svg/tabbar/formation/formation'
import FormationFocused from '@/assets/svg/tabbar/formation/formation-focused'
import Paw from '@/assets/svg/tabbar/paw/paw'
import PawFocused from '@/assets/svg/tabbar/paw/paw-focused'
import { TabBar } from '@/components/tabbar/tabbar'
import { Colors } from '@/constants/Colors'
import { Feather } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Redirect, Tabs } from 'expo-router'
import { GestureResponderEvent, Pressable, Text, View } from 'react-native'

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
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <FormationFocused /> : <Formation />,
        }}
      />
      <Tabs.Screen
        name='(medical)'
        options={{
          title: 'Medical',
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <BoneFocused /> : <Bone />,
        }}
      />
      <Tabs.Screen
        name='(account)'
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.light.primary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.zinc[400],
                  width: 21,
                  height: 21,
                }}
              >
                <Feather name='user' size={16} color={Colors.light.primary} />
              </View>
            ) : (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.light.primary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.zinc[300],
                  width: 22,
                  height: 22,
                }}
              >
                <Feather name='user' size={14} color='white' />
              </View>
            ),
        }}
      />
    </Tabs>
  )
}
