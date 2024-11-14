import styled from 'styled-components/native';

const StyledButton = styled.Pressable`
  paddingTop: 14px;
  flex: 1;
  background-color: ${props => (props.onPress ? '#F49819' : '#F49819')};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export default StyledButton;