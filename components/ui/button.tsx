import styled from 'styled-components/native';

const StyledButton = styled.Pressable`
  paddingTop: 14px;
  flex: 1;
  background-color: ${props => (props.onPress ? '#F49819' : '#F49819')};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const BackButton = styled.Pressable`
  paddingVertical: 10px;
  paddingHorizontal: 12px;
  position: absolute;
  left: 25px;
  background-color: #F7A400;
  border-radius: 1000px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export { BackButton, StyledButton };
