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

export { CardTitle, SpecialTitle, StyledText };
