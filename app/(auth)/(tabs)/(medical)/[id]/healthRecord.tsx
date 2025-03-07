import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import HealthRecordHeader from '@/components/medical/health-record-header'
import InformationCard from '@/components/medical/information-card'
import { BodyBold, ExtraSmallSemiBold } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { useDogMeasurements } from '@/lib/api/dog'
import { useDogVaccinations } from '@/lib/api/vaccination'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { usePathname } from 'expo-router'
import { useEffect } from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const vaccines = [
  {
    title: 'La toux des chenils',
    date: '12 février 2025 (première injection)',
  },
  {
    title: 'La rage',
    date: '22 janvier 2025',
  },
  {
    title: 'La leptospirose',
    date: '11 janvier 2025',
  },
]

const documents = [
  {
    title: 'Ordonnance',
    date: '20 février 2025',
  },
  {
    title: 'Facture',
    date: '20 février 2025',
  },
  {
    title: 'Remboursement',
    date: '20 février 2025',
  },
]

const size = 60
const weight = 40

export default function HealthRecord() {
  const pathname = usePathname()
  const dogId = pathname[1]

  const { data: vaccinations } = useDogVaccinations(dogId, 3)
  const { data: measurements } = useDogMeasurements(dogId, 1)

  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)

  useEffect(() => {
    // console.log('dogId', dogId)

    console.log('vaccinations', vaccinations)
    console.log('measurements', measurements)
  }, [dogId, vaccinations, measurements])

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='16' />
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <HealthRecordHeader scrollY={scrollY} />
      </View>
      <ScrollView
        onScroll={event => {
          scrollY.value = event.nativeEvent.contentOffset.y
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 32,
          paddingHorizontal: 16,
        }}
      >
        <View>
          <Block gap={32}>
            <Block
              row
              wrap='nowrap'
              style={{
                gap: 8,
              }}
            >
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('dog.breed')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>Chien</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('dog.sex')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>Mâle</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('global.birthday')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>15/02/2022</BodyBold>
              </GridItemBackground>
            </Block>
            <Block row gap={32}>
              <InformationCard
                type='item'
                cardTitle='Taille'
                cardIcon={
                  <MaterialIcons
                    name='height'
                    size={24}
                    color={Colors.purple[500]}
                  />
                }
                data={measurements?.[0]?.height}
              />
              <InformationCard
                type='item'
                cardTitle='Poids'
                cardIcon={
                  <FontAwesome6
                    name='weight-hanging'
                    size={24}
                    color={Colors.purple[500]}
                  />
                }
                data={measurements?.[0]?.weight}
              />
            </Block>
            <InformationCard
              type='list'
              cardTitle='Vaccines'
              cardIcon={
                <MaterialIcons
                  name='vaccines'
                  size={24}
                  color={Colors.purple[500]}
                />
              }
              data={vaccines}
            />
            <InformationCard
              type='list'
              cardTitle='Documents'
              cardIcon={
                <MaterialIcons
                  name='file-present'
                  size={24}
                  color={Colors.purple[500]}
                />
              }
              data={documents}
            />
            <InformationCard
              type='list'
              cardTitle='Documents'
              cardIcon={
                <MaterialIcons
                  name='file-present'
                  size={24}
                  color={Colors.purple[500]}
                />
              }
              data={documents}
            />
          </Block>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})
