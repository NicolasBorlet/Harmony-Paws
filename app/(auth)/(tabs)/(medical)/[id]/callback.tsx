import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import DateItem from '@/components/medical/date-item'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { BodyBold, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const fakeDates = [
  '2025-03-01',
  '2025-03-02',
  '2025-03-03',
  '2025-03-04',
  '2025-03-05',
  '2025-03-06',
  '2025-03-07',
  '2025-03-08',
  '2025-03-09',
  '2025-03-10',
]

export default function Callback() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <Back position='relative' top={insets.top} left='16' />
      <View style={styles.header}>
        <BodyBold style={{ textAlign: 'center' }}>Mes rappels</BodyBold>
        <Divider spacing={32} />
      </View>
      <Block
        row
        justify='space-between'
        alignItems='center'
        style={{ paddingHorizontal: 16, marginBottom: 32 }}
      >
        <Block row wrap='nowrap' style={{ gap: 8 }} alignItems='center'>
          <SpecialTitle>Mars 2025</SpecialTitle>
          <Entypo name='chevron-down' size={24} color={Colors.purple[500]} />
        </Block>
        <FullRoundedButton style={{ width: 40, height: 40 }}>
          <Entypo name='plus' size={24} color={Colors.white} />
        </FullRoundedButton>
      </Block>
      <FlashList
        data={fakeDates}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <DateItem
            itemDate={item}
            date={item}
            isFirst={index === 0}
            isLast={index === fakeDates.length - 1}
          />
        )}
        style={styles.dateList}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dateList: {
    backgroundColor: 'rgba(102, 51, 153, 0.1)',
    paddingVertical: 16,
    height: 70,
  },
})
