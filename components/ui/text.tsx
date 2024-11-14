import { Purple } from '@/constants/Colors';
import styled from 'styled-components/native';

const SpecialTitle = styled.Text`
  font-size: 24px;
  color: ${Purple};
  font-family: RoundsBlack;
`;

const CardTitle = styled.Text`
  font-size: 28px;
  color: #fff;
  font-family: Montserrat_700Bold;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  font-family: Montserrat_400Regular;
`;

const Body = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: Montserrat_400Regular;
`;

const Large = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: Montserrat_700Bold;
`;

const Small = styled.Text`
  font-size: 14px;
  color: #fff;
  font-family: Montserrat_400Regular;
`;

const ExtraSmall = styled.Text`
  font-size: 12px;
  color: #fff;
  font-family: Montserrat_400Regular;
`;

export { Body, CardTitle, ExtraSmall, Large, Small, SpecialTitle, StyledText };

