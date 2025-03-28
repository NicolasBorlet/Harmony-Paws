import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { BodyBold, BodySemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { AntDesign } from '@expo/vector-icons'
import { Circle, useFont } from '@shopify/react-native-skia'
import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CartesianChart, Line, useChartPressState } from 'victory-native'

const DATA = [
  { x: 1, y1: 2, y2: 1, year1: 2019, year2: 2020 },
  { x: 2, y1: 3, y2: 2, year1: 2019, year2: 2020 },
  { x: 3, y1: 5, y2: 7, year1: 2019, year2: 2020 },
  { x: 4, y1: 7, y2: 9, year1: 2019, year2: 2020 },
  { x: 5, y1: 11, y2: 11, year1: 2019, year2: 2020 },
  { x: 6, y1: 13, y2: 13, year1: 2019, year2: 2020 },
  { x: 7, y1: 15, y2: 17, year1: 2019, year2: 2020 },
  { x: 8, y1: 17, y2: 19, year1: 2019, year2: 2020 },
  { x: 9, y1: 21, y2: 21, year1: 2019, year2: 2020 },
  { x: 10, y1: 23, y2: 22, year1: 2019, year2: 2020 },
  { x: 11, y1: 28, y2: 24, year1: 2019, year2: 2020 },
  { x: 12, y1: 31, y2: 27, year1: 2019, year2: 2020 },
]

const YEAR = [2019, 2020]

export default function Height() {
  const insets = useSafeAreaInsets()
  const font = useFont(Montserrat_400Regular, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
  const [selectedYears, setSelectedYears] = React.useState<number[]>([YEAR[0]])

  const handleYearSelect = (year: number) => {
    if (selectedYears.includes(year)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year))
      }
    } else {
      setSelectedYears([...selectedYears, year])
    }
  }

  const yKeysToUse = [] as ('y1' | 'y2')[]
  if (selectedYears.includes(YEAR[0])) yKeysToUse.push('y1')
  if (selectedYears.includes(YEAR[1])) yKeysToUse.push('y2')

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
        <Divider spacing={32} />
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
            yKeys={yKeysToUse}
            axisOptions={{
              font: font,
            }}
          >
            {({ points }) => (
              <>
                {selectedYears.includes(YEAR[0]) && (
                  <Line
                    points={points.y1}
                    color={Colors.purple[500]}
                    strokeWidth={2}
                    animate={{ type: 'timing', duration: 300 }}
                    curveType='natural'
                  />
                )}
                {selectedYears.includes(YEAR[1]) && (
                  <Line
                    points={points.y2}
                    color={Colors.orange[500]}
                    strokeWidth={2}
                    animate={{ type: 'timing', duration: 300 }}
                    curveType='natural'
                  />
                )}
                {isActive && (
                  <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                )}
              </>
            )}
          </CartesianChart>
        </View>
        <Divider spacing={32} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BodySemiBold color={Colors.purple[500]}>
            {i18n.t('global.history')}
          </BodySemiBold>
          <FullRoundedButton>
            <AntDesign name='plus' size={16} color='white' />
          </FullRoundedButton>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {YEAR.map(year => (
            <Pressable
              key={year}
              onPress={() => handleYearSelect(year)}
              style={[
                styles.yearSelector,
                {
                  backgroundColor: selectedYears.includes(year)
                    ? Colors.pink[500]
                    : Colors.white,
                  borderWidth: selectedYears.includes(year) ? 1 : 1,
                  borderColor: Colors.pink[500],
                },
              ]}
            >
              <BodyBold
                style={{
                  color: selectedYears.includes(year)
                    ? Colors.white
                    : Colors.pink[500],
                }}
              >
                {year}
              </BodyBold>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color='black' />
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  yearSelector: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
}
