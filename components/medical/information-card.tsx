import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import Block from '../grid/Block'
import { ExtraSmallBold, ExtraSmallMedium, SpecialTitle } from '../ui/text'

type ListItem = {
  title: string
  date: string
}

type InformationCardProps = {
  type: 'list' | 'item' | 'graph'
  cardTitle: string
  cardIcon: React.ReactNode
  data: string | ListItem[] | undefined
}

export default function InformationCard({
  type,
  cardTitle,
  cardIcon,
  data,
}: InformationCardProps) {
  return (
    <Block
      style={{
        boxShadow: '0px 0px 13px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 16,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          {cardIcon}
          <ExtraSmallBold color={Colors.purple[500]}>
            {cardTitle}
          </ExtraSmallBold>
        </View>
        <AntDesign name='right' size={12} color={Colors.purple[500]} />
      </View>
      {type === 'list' && Array.isArray(data) && (
        <>
          {data.map((item, index) => (
            <View style={{ gap: 8 }} key={index}>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <ExtraSmallBold color={Colors.pink[500]}>
                  {item.title}
                </ExtraSmallBold>
                <ExtraSmallMedium color={Colors.purple[500]}>
                  -
                </ExtraSmallMedium>
                <ExtraSmallMedium color={Colors.purple[500]}>
                  {item.date}
                </ExtraSmallMedium>
              </View>
            </View>
          ))}
        </>
      )}
      {type === 'item' && (
        <View>
          <SpecialTitle color={Colors.pink[500]}>{data as string}</SpecialTitle>
        </View>
      )}
    </Block>
  )
}
