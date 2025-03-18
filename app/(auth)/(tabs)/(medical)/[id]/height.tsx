import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { BodyBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { useFont } from '@shopify/react-native-skia'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CartesianChart, Line } from 'victory-native'

const DATA = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 7 },
  { x: 5, y: 11 },
  { x: 6, y: 13 },
]

export default function Height() {
  const insets = useSafeAreaInsets()
  const font = useFont(Montserrat_400Regular, 12)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
      <BodyBold
        style={{
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        {i18n.t('height.heightTracking')}
      </BodyBold>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#F0EBF5',
            padding: 12,
            borderRadius: 8,
            height: 300,
          }}
        >
          <CartesianChart
            data={DATA}
            xKey='x'
            yKeys={['y']}
            axisOptions={{
              font: font,
            }}
          >
            {({ points }) => (
              //👇 pass a PointsArray to the Line component, as well as options.
              <Line
                points={points.y}
                color={Colors.purple[500]}
                strokeWidth={2}
                animate={{ type: 'timing', duration: 300 }}
                curveType='natural'
              />
            )}
          </CartesianChart>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
}
