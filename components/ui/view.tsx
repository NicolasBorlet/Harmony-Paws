import { Colors } from '@/constants/Colors'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

const GridItem = styled.View`
  padding-vertical: 6px;
  padding-horizontal: 14px;
  border-radius: 20px;
  border: 1px solid #f49819;
`

const GridItemBackground = styled.View<{
  selected?: boolean
  height?: number
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-vertical: 10px;
  padding-horizontal: 12px;
  border-radius: 10px;
  height: ${({ height }: { height?: number }) => height || 'auto'};
  background-color: ${({ selected }: { selected?: boolean }) =>
    selected ? '#FDE6D7' : 'rgba(102, 51, 153, 0.1)'};
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 3px;
      shadow-opacity: 0.15;
      shadow-radius: 6.3px;
    `,
  })}
`
const RouteItemView = styled.View<{ even?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ even }) =>
    even ? '#FDE6D7' : 'rgba(102, 51, 153, 0.1)'};
  border-radius: 10px;
  height: 100%;
  padding-horizontal: 20px;
  justify-content: center;
`

const MaterialGridItem = styled.View`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-vertical: 6px;
  padding-horizontal: 20px;
  border-radius: 999px;
  border-color: ${Colors.orange[500]};
  border-width: 1px;
`

export { GridItem, GridItemBackground, MaterialGridItem, RouteItemView }
