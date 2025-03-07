import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import HealthRecordHeader from '@/components/medical/health-record-header'
import InformationCard from '@/components/medical/information-card'
import Loader from '@/components/ui/loader'
import { BodyBold, ExtraSmallSemiBold } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { useDogHealthData } from '@/lib/api/dog'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HealthRecord() {
  const { id } = useLocalSearchParams()
  const dogId = id as string

  const { data: healthData, isLoading } = useDogHealthData(dogId)

  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)

  useEffect(() => {
    console.log('healthData', healthData)
  }, [healthData])

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='16' />
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <HealthRecordHeader
          scrollY={scrollY}
          dogName={healthData?.dog.name || ''}
        />
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
                <BodyBold color={Colors.light.secondary}>
                  {healthData?.dog.breed?.name || 'Non spécifié'}
                </BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <ExtraSmallSemiBold color='rgba(102, 51, 153, 0.7)'>
                  {i18n.t('dog.sex')}
                </ExtraSmallSemiBold>
                <BodyBold color={Colors.light.secondary}>
                  {healthData?.dog.sex === 'male' ? 'Mâle' : 'Femelle'}
                </BodyBold>
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
                cardTitle={i18n.t('medical.height')}
                cardIcon={
                  <MaterialIcons
                    name='height'
                    size={24}
                    color={Colors.purple[500]}
                  />
                }
                data={healthData?.measurements[0]?.height?.toString() || '0'}
                href='/(auth)/(tabs)/(medical)/[id]/height'
              />
              <InformationCard
                type='item'
                cardTitle={i18n.t('medical.weight')}
                cardIcon={
                  <FontAwesome6
                    name='weight-hanging'
                    size={24}
                    color={Colors.purple[500]}
                  />
                }
                data={healthData?.measurements[0]?.weight?.toString() || '0'}
                href='/(auth)/(tabs)/(medical)/[id]/weight'
              />
            </Block>
            <InformationCard
              type='list'
              cardTitle={i18n.t('medical.vaccines')}
              cardIcon={
                <MaterialIcons
                  name='vaccines'
                  size={24}
                  color={Colors.purple[500]}
                />
              }
              data={healthData?.vaccinations.map(vaccination => ({
                title: vaccination.vaccine_name || 'Vaccin non spécifié',
                date: vaccination.date_administered || 'Date non spécifiée',
              }))}
              href='/(auth)/(tabs)/(medical)/[id]/vaccines'
            />
            <InformationCard
              type='list'
              cardTitle={i18n.t('medical.documents')}
              cardIcon={
                <MaterialIcons
                  name='file-present'
                  size={24}
                  color={Colors.purple[500]}
                />
              }
              data={healthData?.documents.map(document => ({
                title: document.name,
                date: document.created_at,
              }))}
              href='/(auth)/(tabs)/(medical)/[id]/documents'
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
