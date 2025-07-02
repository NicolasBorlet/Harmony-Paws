import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import RoundedIconLink from '../../components/rounded-icon-link'
import { Colors } from '../../constants/Colors'

// Mock des dépendances
jest.mock('react-native', () => ({
  Pressable: ({
    children,
    style,
    onPress,
  }: {
    children: React.ReactNode
    style: React.CSSProperties
    onPress: () => void
  }) => (
    <div accessibilityRole='button' style={style} onPress={onPress}>
      {children}
    </div>
  ),
}))

describe('RoundedIconLink', () => {
  it('renders correctly with default props', () => {
    const mockIcon = <div>Icon</div>
    const { UNSAFE_getByProps } = render(<RoundedIconLink icon={mockIcon} />)

    const button = UNSAFE_getByProps({ accessibilityRole: 'button' })
    expect(button).toBeTruthy()

    // Vérification des styles par défaut
    expect(button.props.style).toEqual({
      height: 48,
      width: 48,
      backgroundColor: Colors.light.secondary,
      borderRadius: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    })

    // Vérification que l'icône est rendue
    expect(button.props.children).toEqual(mockIcon)
  })

  it('applies custom color and borderRadius when provided', () => {
    const mockIcon = <div>Icon</div>
    const customColor = '#FF0000'
    const customRadius = 50

    const { UNSAFE_getByProps } = render(
      <RoundedIconLink
        icon={mockIcon}
        color={customColor}
        roundedValue={customRadius}
      />,
    )

    const button = UNSAFE_getByProps({ accessibilityRole: 'button' })

    // Vérification des styles personnalisés
    expect(button.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: customColor,
        borderRadius: customRadius,
      }),
    )
  })

  it('calls onPress handler when pressed', () => {
    const mockIcon = <div>Icon</div>
    const onPressMock = jest.fn()

    const { UNSAFE_getByProps } = render(
      <RoundedIconLink icon={mockIcon} onPress={onPressMock} />,
    )

    const button = UNSAFE_getByProps({ accessibilityRole: 'button' })
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
