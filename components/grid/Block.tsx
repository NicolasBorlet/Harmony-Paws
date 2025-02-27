import React from 'react'
import { StyleSheet, View } from 'react-native'

const Block = ({
  children,
  style,
  flex = 1,
  row,
  justify,
  justifyContent,
  align,
  alignItems,
  content,
  alignContent,
  wrap,
  gap,
  gapHorizontal,
  gapVertical,
  ...props
}: {
  children?: React.ReactNode
  style?: any
  flex?: number
  row?: boolean
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  content?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
  wrap?: 'wrap' | 'nowrap'
  gap?: number
  gapHorizontal?: number
  gapVertical?: number
}) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    row && { flexDirection: 'row' },
    justify !== undefined && { justifyContent: justify },
    justifyContent !== undefined && { justifyContent },
    align !== undefined && { alignItems: align },
    alignItems !== undefined && { alignItems },
    content !== undefined && { alignContent: content },
    alignContent !== undefined && { alignContent },
    wrap !== undefined && { flexWrap: wrap },
    gap !== undefined && { gap },
    gapHorizontal !== undefined && { columnGap: gapHorizontal },
    gapVertical !== undefined && { rowGap: gapVertical },
    style,
  ])

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  )
}

export default Block
