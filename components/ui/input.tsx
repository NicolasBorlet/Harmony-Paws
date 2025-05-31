import { Colors } from '@/constants/Colors'
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'

interface InputProps extends TextInputProps {
  isError?: boolean
  isDisabled?: boolean
}

const Input = styled.TextInput<InputProps>`
  background-color: ${props =>
    props.isError || props.isDisabled ? Colors.grey[100] : Colors.white};
  border-radius: 16px;
  padding: 12px 16px;
  font-size: 16px;
  font-family: Montserrat_400Regular;
  color: ${Colors.light.secondary};
  border: 1px solid ${Colors.light.text};
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  border-color: ${props =>
    props.isError || props.isDisabled
      ? Colors.orange[500]
      : Colors.orange[500]};
  color: ${props =>
    props.isError || props.isDisabled ? Colors.black : Colors.light.text};
`

export default Input
