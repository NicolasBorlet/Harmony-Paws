import { Purple } from '@/constants/Colors';
import styled from 'styled-components/native';

const SpecialTitle = styled.Text`
  font-size: 24px;
  color: ${Purple};
  font-family: RoundsBlack;
`;

const CardTitle = styled.Text<{ color?: string }>`
  font-size: 28px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`;

const MessageListingAuthor = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#F7A400'};
  font-family: Montserrat_700Bold;
`;

const Body = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${props => props.color || '#000'};
  font-family: Montserrat_400Regular;
`;

const NavigationTitle = styled.Text<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`;

const Large = styled.Text<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_700Bold;
`;

const Small = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_400Regular;
`;

const ExtraSmall = styled.Text<{ color?: string }>`
  font-size: 12px;
  color: ${props => props.color || '#fff'};
  font-family: Montserrat_400Regular;
`;

export { Body, CardTitle, ExtraSmall, Large, MessageListingAuthor, NavigationTitle, Small, SpecialTitle };

