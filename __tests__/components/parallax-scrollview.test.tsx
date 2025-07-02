import { render } from '@testing-library/react-native'
import React from 'react'
import { Text, View } from 'react-native'
import ParallaxScrollView from '../../components/parallax-scrollview'

// Mock des dépendances
jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock')
  return {
    ...Reanimated,
    useAnimatedRef: () => ({ current: {} }),
    useScrollViewOffset: () => ({ value: 0 }),
    interpolate: jest.fn((value, inputRange, outputRange) => outputRange[1]),
    useAnimatedStyle: jest.fn(() => ({})),
  }
})

jest.mock('expo-image', () => ({
  Image: 'Image',
}))

jest.mock('../../components/ui/TabBarBackground', () => ({
  useBottomTabOverflow: () => 0,
}))

jest.mock('../../components/ui/text', () => ({
  NavigationTitleExtraBold: 'NavigationTitleExtraBold',
}))

describe('ParallaxScrollView', () => {
  it('renders correctly with minimal props', () => {
    const { toJSON } = render(
      <ParallaxScrollView>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    expect(toJSON()).toBeTruthy()
  })

  it('renders with headerImage when provided', () => {
    const { UNSAFE_queryByProps } = render(
      <ParallaxScrollView headerImage='https://example.com/image.jpg'>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    // Vérifier que l'image est présente
    const image = UNSAFE_queryByProps({
      source: 'https://example.com/image.jpg',
    })
    expect(image).toBeTruthy()
  })

  it('renders with backgroundContainer when provided', () => {
    const BackgroundComponent = <View testID='custom-background' />

    const { getByTestId } = render(
      <ParallaxScrollView backgroundContainer={BackgroundComponent}>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    expect(getByTestId('custom-background')).toBeTruthy()
  })

  it('renders with title when provided', () => {
    const testTitle = 'Test Title'

    const { UNSAFE_queryByProps } = render(
      <ParallaxScrollView title={testTitle}>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    const titleComponent = UNSAFE_queryByProps({ children: testTitle })
    expect(titleComponent).toBeTruthy()
  })

  it('applies custom backgroundColor when provided', () => {
    const customColor = '#FF0000'

    const { UNSAFE_getByProps } = render(
      <ParallaxScrollView backgroundColor={customColor}>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    // Vérifier que la couleur d'arrière-plan est appliquée
    const header = UNSAFE_getByProps({ backgroundColor: customColor })
    expect(header).toBeTruthy()
  })

  it('applies custom paddingHorizontal to content when provided', () => {
    const customPadding = 24

    const { UNSAFE_getAllByProps } = render(
      <ParallaxScrollView paddingHorizontal={customPadding}>
        <Text>Child Content</Text>
      </ParallaxScrollView>,
    )

    // Vérifier que le padding horizontal est appliqué
    const content = UNSAFE_getAllByProps({ paddingHorizontal: customPadding })
    expect(content.length).toBeGreaterThan(0)
  })
})
