import { i18n } from '@/lib/i18n'
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
import { Tabs } from 'expo-router'
import { GestureResponderEvent, Pressable, View } from 'react-native'

type TabBarIconProps = {
  focused: boolean
  color: string
  size: number
}

export default function TabLayout() {
  // const { session, isLoading } = useSession()
  // const user = user$.get()
  // const { data: userPicture } = useUserPicture(user?.id ?? '')

  // if (isLoading) {
  //   return <Text>Loading...</Text>
  // }

  // if (!session) {
  //   return <Redirect href='/login' />
  // }

  const handleTabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    await new Promise(resolve => setTimeout(resolve, 150))
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  // useEffect(() => {
  //   console.log('userPicture', userPicture)
  // }, [userPicture])

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
          title: `${i18n.t('tabbar.home')}`,
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <PawFocused /> : <Paw />,
        }}
      />
      <Tabs.Screen
        name='(formation)'
        options={{
          title: `${i18n.t('tabbar.formation')}`,
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <FormationFocused /> : <Formation />,
        }}
      />
      <Tabs.Screen
        name='(medical)'
        options={{
          title: `${i18n.t('tabbar.medical')}`,
          tabBarIcon: ({ focused }: TabBarIconProps) =>
            focused ? <BoneFocused /> : <Bone />,
        }}
      />
      <Tabs.Screen
        name='(account)'
        options={{
          title: `${i18n.t('tabbar.profile')}`,
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
                  width: 24,
                  height: 24,
                }}
              >
                {/* {userPicture ? (
                  <Image
                    source={{ uri: userPicture }}
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                  />
                ) : ( */}
                <Feather name='user' size={24} color={Colors.light.primary} />
                {/* )} */}
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
                  width: 24,
                  height: 24,
                }}
              >
                {/* {userPicture ? (
                  <Image
                    source={{ uri: userPicture.url }}
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                  />
                ) : ( */}
                <Feather name='user' size={16} color={Colors.light.primary} />
                {/* )} */}
              </View>
            ),
        }}
      />
    </Tabs>
  )
}
