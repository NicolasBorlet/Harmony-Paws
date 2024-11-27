import styled from 'styled-components/native';
import { Platform } from 'react-native';

const StyledButton = styled.Pressable`
  paddingTop: 14px;
  flex: 1;
  background-color: ${props => (props.onPress ? '#F49819' : '#F49819')};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const BackButton = styled.Pressable<{ position?: string, left?: string }>`
  position: ${props => props.position || 'absolute'};
  left: ${props => props.left || '25px'};
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
  bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const StandardButton = styled.Pressable`
  background-color: #F49819;
  border-radius: 10px;
  padding: 14px;
  width: 100%;
  align-items: center;
  justify-content: center;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 5;
    `
  })}
`;

const SmallButton = styled.Pressable`
  background-color: #F49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SmallButtonOutlined = styled.Pressable`
  background-color: none;
  border: 1px solid #F49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const UnderlinedButton = styled.Pressable`
  text-decoration: underline;
`;

export { BackButton, MapButton, StandardButton, StyledButton, UnderlinedButton, SmallButton, SmallButtonOutlined };
