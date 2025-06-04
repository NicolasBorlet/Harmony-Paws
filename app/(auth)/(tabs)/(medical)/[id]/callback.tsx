import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import DateItem from '@/components/medical/date-item'
import { FullRoundedButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { Body, BodyBold, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { memo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const fakeDates = [
  {
    date: '2025-06-01',
    callbacks: [],
  },
  {
    date: '2025-06-02',
    callbacks: [],
  },
  {
    date: '2025-06-03',
    callbacks: [],
  },
  {
    date: '2025-06-04',
    callbacks: [
      {
        id: '1',
        name: 'Rappel 1',
        description: 'Rappel 1',
        hour: '10:00',
      },
      {
        id: '2',
        name: 'Rappel 2',
        description: 'Rappel 2',
        hour: '11:00',
      },
    ],
  },
  {
    date: '2025-06-05',
    callbacks: [
      {
        id: '3',
        name: 'Rappel 3',
        description: 'Rappel 3',
        hour: '12:00',
      },
    ],
  },
  {
    date: '2025-06-06',
    callbacks: [],
  },
  {
    date: '2025-06-07',
    callbacks: [],
  },
]

const MemoizedDateItem = memo(DateItem)

export default function Callback() {
  const insets = useSafeAreaInsets()
  const [selectedDate, setSelectedDate] = useState(fakeDates[0].date)

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
        renderItem={({ item, index }) => {
          return (
            <MemoizedDateItem
              itemDate={item.date}
              isFirst={index === 0}
              isLast={index === fakeDates.length - 1}
              onPress={() => {
                setSelectedDate(item.date)
              }}
              isSelected={selectedDate === item.date}
            />
          )
        }}
        style={styles.dateList}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
      <Block
        style={{
          marginTop: 32,
          paddingHorizontal: 16,
        }}
      >
        <FlashList
          data={fakeDates.find(date => date.date === selectedDate)?.callbacks}
          estimatedItemSize={3}
          renderItem={({ item }) => {
            return (
              <Block
                row
                justify='space-between'
                alignItems='center'
                wrap='nowrap'
                style={{
                  padding: 16,
                  backgroundColor: Colors.purple[500],
                  borderRadius: 12,
                }}
              >
                <Block gap={8}>
                  <BodyBold color={Colors.white}>{item.name}</BodyBold>
                  <Block row alignItems='center' gap={8}>
                    <AntDesign
                      name='clockcircleo'
                      size={16}
                      color={Colors.white}
                    />
                    <Body color={Colors.white}>{item.hour}</Body>
                  </Block>
                </Block>
                <Pressable
                  onPress={() => {
                    console.log('pressed')
                  }}
                >
                  <Ionicons
                    name='notifications-outline'
                    size={24}
                    color='white'
                  />
                </Pressable>
              </Block>
            )
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </Block>
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
    marginBottom: 32,
  },
})
