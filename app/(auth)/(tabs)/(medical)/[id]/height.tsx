import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import Loader from '@/components/ui/loader'
import { Body, BodyBold, BodySemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useMeasurementsByDogId } from '@/lib/api/measurement'
import { transformDataForGraph } from '@/lib/utils/graphData'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { AntDesign } from '@expo/vector-icons'
import { Circle, useFont } from '@shopify/react-native-skia'
import { useLocalSearchParams, usePathname } from 'expo-router'
import React, { useEffect, useMemo } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import type { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CartesianChart, Line, useChartPressState } from 'victory-native'

// Définir le type pour les couleurs d'année
type YearKey = 'y1' | 'y2' | 'y3'

export default function Height() {
  const { id } = useLocalSearchParams()
  const path = usePathname()
  const insets = useSafeAreaInsets()
  const font = useFont(Montserrat_400Regular, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })

  console.log('path and id', path, id)

  const { data: heightMeasurements, isLoading } = useMeasurementsByDogId('3')

  const YEAR = useMemo(() => {
    if (!heightMeasurements?.length) return [new Date().getFullYear()]
    const years = [
      ...new Set(
        heightMeasurements.map(item => new Date(item.date).getFullYear()),
      ),
    ]
    return years.sort((a, b) => a - b)
  }, [heightMeasurements])

  const formattedData = useMemo(() => {
    if (!heightMeasurements?.length) return []
    return transformDataForGraph(heightMeasurements)
  }, [heightMeasurements])

  const [selectedYears, setSelectedYears] = React.useState<number[]>([])

  // Initialize selected years when YEAR changes
  useEffect(() => {
    if (YEAR.length > 0 && selectedYears.length === 0) {
      setSelectedYears([YEAR[0]])
    }
  }, [YEAR])

  const handleYearSelect = (year: number) => {
    if (selectedYears.includes(year)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year))
      }
    } else {
      setSelectedYears([...selectedYears, year])
    }
  }

  const yKeysToUse = useMemo(() => {
    return selectedYears.map((_, index) => `y${index + 1}` as const)
  }, [selectedYears])

  const yearColors: Record<YearKey, string> = useMemo(
    () => ({
      y1: Colors.purple[500],
      y2: Colors.orange[500],
      y3: Colors.pink[500],
    }),
    [],
  )

  useEffect(() => {
    console.log('heightMeasurements', heightMeasurements)
    console.log(
      'transformDataForGraph',
      transformDataForGraph(heightMeasurements),
    )
  }, [heightMeasurements])

  if (isLoading) return <Loader />

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
            data={formattedData}
            xKey='x'
            yKeys={yKeysToUse}
            axisOptions={{
              font: font,
              formatXLabel: value => {
                const date = new Date(value)
                // Format court : "mai 2024"
                return date.toLocaleDateString('fr-FR', {
                  month: 'short',
                  year: 'numeric',
                })
              },
            }}
          >
            {({ points }) => (
              <>
                {selectedYears.map((year, index) => {
                  const yKey = `y${index + 1}` as YearKey
                  return (
                    <Line
                      key={year}
                      points={points[yKey]}
                      color={yearColors[yKey]}
                      strokeWidth={2}
                      animate={{ type: 'timing', duration: 300 }}
                      curveType='natural'
                    />
                  )
                })}
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
            marginBottom: 24,
          }}
        >
          <BodySemiBold color={Colors.purple[500]}>
            {i18n.t('global.history')}
          </BodySemiBold>
          <FullRoundedButton height={48} width={48}>
            <AntDesign name='plus' size={20} color='white' />
          </FullRoundedButton>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
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
        <FlatList
          data={heightMeasurements}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                padding: 8,
                backgroundColor: `${Colors.pink[500]}3A`,
                borderRadius: 8,
                justifyContent: 'space-between',
              }}
            >
              <Body>
                {new Date(item.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Body>
              <BodyBold>{item.height} cm</BodyBold>
            </View>
          )}
          keyExtractor={item => item.date}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
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
