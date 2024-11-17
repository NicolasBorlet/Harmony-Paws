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

const MapButton = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  paddingVertical: 10px;
  paddingHorizontal: 16px;
  background-color: #663399;
  border-radius: 30px;
  z-index: 100;
  width: 100px;
  height: 40px;
  gap: 6px;
  align-self: center;
  position: absolute;
  bottom: 100px;
  margin-left: auto;
  margin-right: auto;
`;

export { BackButton, MapButton, StyledButton };

