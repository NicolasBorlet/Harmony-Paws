import { Dimensions, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default function TabBarForm() {
  const screenWidth = Dimensions.get('window').width

  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 0,
        width: screenWidth,
        marginTop: -25,
      }}
    >
      <Svg
        width={screenWidth}
        height='107'
        viewBox='0 0 393 107'
        preserveAspectRatio='xMinYMin slice'
      >
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M154.686 32C158.861 32 162.371 29.0519 164.232 25.3141C169.905 13.9193 182.444 6 197 6C211.556 6 224.095 13.9193 229.768 25.3141C231.629 29.0519 235.139 32 239.314 32H387C390.314 32 393 34.6863 393 38V86C393 97.598 383.598 107 372 107H21C9.40201 107 0 97.598 0 86V38C0 34.6863 2.68629 32 6 32H154.686Z'
          fill='white'
        />
      </Svg>
    </View>
  )
}
