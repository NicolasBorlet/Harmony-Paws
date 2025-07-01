import { i18n } from '@/lib/i18n'
import Back from '@/components/back-button'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import Loader from '@/components/ui/loader'
import { Body, BodyBold, BodySemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useWeightMeasurementsByDogId } from '@/lib/api/measurement'
import { dogMedical$ } from '@/lib/observables/dog-medical-observable'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { AntDesign } from '@expo/vector-icons'
import { useObservable } from '@legendapp/state/react'
import { Circle, useFont } from '@shopify/react-native-skia'
import { useLocalSearchParams } from 'expo-router'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import type { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CartesianChart, Line, useChartPressState } from 'victory-native'

interface WeightMeasurement {
  id: number
  weight: number | null
  date: string
}

type YearKey = 'y1' | 'y2' | 'y3' | 'y4'

const yearColors: Record<YearKey, string> = {
  y1: Colors.purple[500],
  y2: Colors.orange[500],
  y3: Colors.pink[500],
  y4: Colors.green[500],
}

const YearSelector = memo(
  ({
    year,
    isSelected,
    onSelect,
  }: {
    year: number
    isSelected: boolean
    onSelect: (year: number) => void
  }) => (
    <Pressable
      onPress={() => onSelect(year)}
      style={[
        styles.yearSelector,
        {
          backgroundColor: isSelected ? Colors.pink[500] : Colors.white,
          borderWidth: 1,
          borderColor: Colors.pink[500],
        },
      ]}
    >
      <BodyBold
        style={{
          color: isSelected ? Colors.white : Colors.pink[500],
        }}
      >
        {year}
      </BodyBold>
    </Pressable>
  ),
)

export default function Weight() {
  const selectedDogId = useObservable(dogMedical$.selectedDogId)
  const { id } = useLocalSearchParams()
  const insets = useSafeAreaInsets()
  const font = useFont(Montserrat_400Regular, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })

  const {
    data: weightMeasurements,
    isLoading,
    error,
  } = useWeightMeasurementsByDogId(selectedDogId.get() || id?.toString() || '')

  const YEAR = useMemo(() => {
    if (!weightMeasurements?.length) return [new Date().getFullYear()]
    const years = [
      ...new Set(
        weightMeasurements.map(item => new Date(item.date).getFullYear()),
      ),
    ]
    return years.sort((a, b) => a - b)
  }, [weightMeasurements])

  const formattedData = useMemo(() => {
    if (!weightMeasurements?.length) return []
    return weightMeasurements.map(item => ({
      x: new Date(item.date).getTime(),
      y1: item.weight,
    }))
  }, [weightMeasurements])

  const [selectedYears, setSelectedYears] = React.useState<number[]>([])

  useEffect(() => {
    if (YEAR.length > 0 && selectedYears.length === 0) {
      setSelectedYears([YEAR[0]])
    }
  }, [YEAR])

  const handleYearSelect = useCallback((year: number) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.length > 1
          ? prev.filter(y => y !== year)
          : prev
        : [...prev, year],
    )
  }, [])

  const yKeysToUse = useMemo(() => {
    return selectedYears.map((_, index) => `y${index + 1}` as const)
  }, [selectedYears])

  if (error) {
    return (
      <View style={styles.container}>
        <BodyBold style={{ textAlign: 'center' }}>
          {i18n.t('global.error')}
        </BodyBold>
      </View>
    )
  }

  if (isLoading) return <Loader />

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <Back position='relative' top={insets.top} left='16' />
        <BodyBold
          style={{
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {i18n.t('weight.weightTracking')}
        </BodyBold>
        <Divider spacing={32} />
        {!isLoading && weightMeasurements && weightMeasurements.length > 0 && (
          <View
            style={{
              backgroundColor: '#F0EBF5',
              padding: 12,
              borderRadius: 8,
              height: 300,
              marginHorizontal: 16,
            }}
          >
            <CartesianChart
              data={formattedData}
              xKey='x'
              yKeys={['y1']}
              axisOptions={{
                font: font,
                formatXLabel: value => {
                  const date = new Date(value)
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
                    const yKey = 'y1' as const
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
                    <ToolTip
                      x={state.x.position}
                      y={state.y.highTmp.position}
                    />
                  )}
                </>
              )}
            </CartesianChart>
          </View>
        )}
        <Divider spacing={32} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 16,
          }}
        >
          <BodySemiBold color={Colors.purple[500]}>
            {i18n.t('global.history')}
          </BodySemiBold>
          <FullRoundedButton height={48} width={48}>
            <AntDesign name='plus' size={20} color='white' />
          </FullRoundedButton>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 24,
            paddingHorizontal: 16,
          }}
        >
          {YEAR.map(year => (
            <YearSelector
              key={year}
              year={year}
              isSelected={selectedYears.includes(year)}
              onSelect={handleYearSelect}
            />
          ))}
        </View>
        <FlatList
          data={weightMeasurements}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
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
              <BodyBold>{item.weight} kg</BodyBold>
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
