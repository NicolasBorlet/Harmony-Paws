import { Purple } from '@/constants/Colors'
import styled from 'styled-components/native'

const SpecialTitle = styled.Text<{ color?: string }>`
  font-size: 24px;
  color: ${props => props.color || Purple};
  font-family: RoundsBlack;
`

const OnBoardingTitle = styled.Text<{ color?: string }>`
  font-size: 22px;
  color: ${props => props.color || Purple};
  font-family: Montserrat_700Bold;
`

const ModulePrice = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#fff'};
  font-family: RoundsBlack;
`

const CardTitle = styled.Text<{ color?: string }>`
  font-size: 28px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`

const MessageListingAuthor = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#F7A400'};
  font-family: Montserrat_700Bold;
`

const Body = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_400Regular;
`

const BodyExtraBold = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_800ExtraBold;
`

const BodyBold = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_600SemiBold;
`

const BodySemiBold = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_600SemiBold;
`

const BodyMedium = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_500Medium;
`

const NavigationTitle = styled.Text<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`

const NavigationTitleExtraBold = styled.Text<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_800ExtraBold;
`

const Large = styled.Text<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`

const Small = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_400Regular;
`

const SmallSemiBold = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_600SemiBold;
`

const SmallMedium = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_500Medium;
`

const SmallBold = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`

const ExtraSmall = styled.Text<{ color?: string }>`
  font-size: 12px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_400Regular;
`

const ExtraSmallSemiBold = styled.Text<{ color?: string }>`
  font-size: 12px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_600SemiBold;
`

const ExtraSmallMedium = styled.Text<{ color?: string }>`
  font-size: 12px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_500Medium;
`

const ExtraSmallBold = styled.Text<{ color?: string }>`
  font-size: 12px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`

export {
  Body,
  BodyBold,
  BodyExtraBold,
  BodyMedium,
  BodySemiBold,
  CardTitle,
  ExtraSmall,
  ExtraSmallBold,
  ExtraSmallMedium,
  ExtraSmallSemiBold,
  Large,
  MessageListingAuthor,
  ModulePrice,
  NavigationTitle,
  NavigationTitleExtraBold,
  OnBoardingTitle,
  Small,
  SmallBold,
  SmallMedium,
  SmallSemiBold,
  SpecialTitle,
}
