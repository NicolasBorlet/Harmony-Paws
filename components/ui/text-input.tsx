import { Colors } from '@/constants/Colors'
import styled from 'styled-components/native'

const CustomTextInput = styled.TextInput`
  border-radius: 10px;
  background-color: #f5f5f5;
  padding-vertical: 16px;
  padding-horizontal: 20px;
  font-size: 16px;
  font-family: Montserrat_500Medium;
  color: ${Colors.grey[900]};
`

export { CustomTextInput }
