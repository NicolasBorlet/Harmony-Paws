import { Colors } from '@/constants/Colors';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Tabbar({ state, descriptors, navigation }: {
  state: any;
  descriptors: any;
  navigation: any;
}) {

  return (
    <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Svg width={SCREEN_WIDTH} height="89" viewBox="0 0 393 89" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M150.727 26C157.222 26 162.623 21.3022 166.212 15.8884C172.526 6.36294 183.952 0 197 0C210.048 0 221.474 6.36294 227.788 15.8884C231.377 21.3022 236.778 26 243.273 26H387C390.314 26 393 28.6863 393 32V75C393 89.3594 381.359 101 367 101H26C11.6406 101 0 89.3594 0 75V32C0 28.6863 2.68629 26 6 26H150.727Z" fill="white" />
      </Svg>
      <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-around', width: '100%', top: 10 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              {options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? Colors.light.secondary : 'black',
                size: 24,
              })}
              {options.tabBarLabel && (
                <Text style={{ color: isFocused ? Colors.light.secondary : 'black', fontSize: 12 }}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}