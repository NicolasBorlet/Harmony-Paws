import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import InformationCard from '@/components/medical/information-card'
import { BodyBold, ExtraSmallSemiBold } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const vaccines = [
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
  },
  {
    title: 'Vaccines',
    date: '12 février 2025 (première injection)',
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
  const { id } = useLocalSearchParams()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    console.log('id', id)
    console.log('pathname', pathname)
  }, [id])

  return (
    <ScrollView style={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
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
            data={size}
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
            data={weight}
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
      </Block>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
})
