import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

interface TabButtonProps {
  route: any
  isFocused: boolean
  descriptors: any
  navigation: any
  buildHref: any
  colors: any
  options: any
  isFirst?: boolean
  isLast?: boolean
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme()
  const { buildHref } = useLinkBuilder()

  return (
    <View style={styles.tabbar}>
      {/* Premier groupe (2 premiers tabs) */}
      <View style={styles.tabGroup}>
        {state.routes.slice(0, 2).map((route, index) => (
          <TabButton
            key={route.key}
            route={route}
            isFocused={state.index === index}
            descriptors={descriptors}
            navigation={navigation}
            buildHref={buildHref}
            colors={colors}
            options={descriptors[route.key].options}
            isFirst={index === 0}
          />
        ))}
      </View>

      <PlatformPressable
        onPress={() => router.push('/ride/creation')}
        style={[
          {
            backgroundColor: Colors.light.primary,
            shadowColor: Colors.light.primary,
          },
          styles.plusButton,
        ]}
      >
        <AntDesign name='plus' size={24} color='white' />
      </PlatformPressable>

      {/* Deuxième groupe (2 derniers tabs) */}
      <View style={styles.tabGroup}>
        {state.routes.slice(2, 4).map((route, index) => (
          <TabButton
            key={route.key}
            route={route}
            isFocused={state.index === index + 2}
            descriptors={descriptors}
            navigation={navigation}
            buildHref={buildHref}
            colors={colors}
            options={descriptors[route.key].options}
            isLast={index === 1}
          />
        ))}
      </View>
    </View>
  )
}

// Composant helper pour les boutons de tab
function TabButton({
  route,
  isFocused,
  descriptors,
  navigation,
  buildHref,
  colors,
  options,
  isFirst,
  isLast,
}: TabButtonProps) {
  const { options: routeOptions } = descriptors[route.key]

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params)
    }
  }

  const renderIcon = () => {
    if (routeOptions.tabBarIcon) {
      return routeOptions.tabBarIcon({
        focused: isFocused,
        color: Colors.light.secondary,
        size: 24,
      })
    }
    return null
  }

  return (
    <PlatformPressable
      href={buildHref(route.name, route.params)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={routeOptions.tabBarAccessibilityLabel}
      testID={routeOptions.tabBarTestID}
      onPress={onPress}
      style={[styles.tab, isFirst && styles.firstTab, isLast && styles.lastTab]}
    >
      {renderIcon()}
      {routeOptions.title && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Montserrat_500Medium',
            color: isFocused ? Colors.light.secondary : Colors.zinc[400],
            marginTop: 4,
          }}
        >
          {routeOptions.title}
        </Text>
      )}
    </PlatformPressable>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 0,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  firstTab: {
    paddingLeft: 0,
  },
  lastTab: {
    paddingRight: 0,
  },
  plusButton: {
    position: 'absolute',
    top: -10,
    left: '50%',
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow color rgb
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: Colors.light.primary,
  },
})
