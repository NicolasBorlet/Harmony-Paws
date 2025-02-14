import { Colors } from '@/constants/Colors'
import { Platform, PressableProps } from 'react-native'
import styled from 'styled-components/native'

interface ButtonProps extends PressableProps {
  onPress?: () => void
  position?: string
  left?: string
  outlined?: boolean
  shadow?: boolean
  disabled?: boolean
  color?: string
  backgroundColor?: string
}

const StyledButton = styled.Pressable<ButtonProps>`
  paddingtop: 14px;
  flex: 1;
  background-color: ${(props: ButtonProps) =>
    props.onPress ? '#F49819' : '#F49819'};
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`

const BackButton = styled.Pressable<ButtonProps>`
  position: ${(props: ButtonProps) => props.position || 'absolute'};
  left: ${(props: ButtonProps) => props.left || '16px'};
  background-color: ${(props: ButtonProps) =>
    props.backgroundColor || '#F7A400'};
  border-radius: 1000px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const MapButton = styled.Pressable<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  paddingvertical: 10px;
  paddinghorizontal: 16px;
  background-color: ${Colors.light.secondary};
  border-radius: 30px;
  width: 100px;
  height: 40px;
  gap: 6px;
  align-self: center;
  position: absolute;
  bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`

const StandardButton = styled.Pressable<ButtonProps>`
  background-color: ${(props: ButtonProps) =>
    props.outlined
      ? 'transparent'
      : props.disabled
        ? '#F0B461'
        : props.color || '#F49819'};
  border: ${(props: ButtonProps) =>
    props.outlined ? '1px solid #F49819' : 'none'};
  border-radius: 10px;
  padding: 14px;
  width: 100%;
  align-items: center;
  justify-content: center;
  ${(props: ButtonProps) => {
    if (props.outlined || !props.shadow) return ''
    return Platform.OS === 'ios'
      ? `
        shadow-color: #000;
        shadow-offset: 0px 2px;
        shadow-opacity: 0.25;
        shadow-radius: 3.84px;
      `
      : `
        elevation: 5;
      `
  }}
`

const SmallButton = styled.Pressable<ButtonProps>`
  background-color: #f49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const SmallButtonOutlined = styled.Pressable<ButtonProps>`
  background-color: none;
  border: 1px solid #f49819;
  border-radius: 5px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const UnderlinedButton = styled.Pressable<ButtonProps>`
  text-decoration: underline;
`

export {
  BackButton,
  MapButton,
  SmallButton,
  SmallButtonOutlined,
  StandardButton,
  StyledButton,
  UnderlinedButton,
}
