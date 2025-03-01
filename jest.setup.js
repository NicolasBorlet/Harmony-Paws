// Mock StyleSheet.create to return the styles object as-is
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  return {
    ...RN,
    StyleSheet: {
      ...RN.StyleSheet,
      create: styles => styles,
    },
    Animated: {
      ...RN.Animated,
      Value: jest.fn(() => ({
        interpolate: jest.fn(() => ({})),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(cb => cb && cb()),
      })),
    },
  }
})

// Mock pour expo-modules-core
jest.mock('expo-modules-core', () => ({
  EventEmitter: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
    removeSubscription: jest.fn(),
  })),
  NativeModulesProxy: {
    NativeUnimoduleProxy: {},
    ExponentDevice: {},
  },
  Platform: {
    OS: 'ios',
  },
}))

// Mock pour expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve('test')),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}))

// Mock pour react-native-get-random-values
jest.mock('react-native-get-random-values', () => ({}))

// Mock pour react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: class MMKV {
    set() {}
    getString() {}
    getNumber() {}
    getBoolean() {}
    contains() {
      return false
    }
    delete() {}
  },
}))

// Mock pour uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))

// Mock pour color
jest.mock('color', () => {
  return function () {
    return {
      darken: () => ({ hex: () => '#000000' }),
      lighten: () => ({ hex: () => '#FFFFFF' }),
      alpha: () => ({ rgb: () => ({ string: () => 'rgba(0,0,0,0.5)' }) }),
      rgb: () => ({ string: () => 'rgb(0,0,0)' }),
      hex: () => '#000000',
    }
  }
})

// Mock pour expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}))

// Mock pour expo-router
jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => ''),
  Stack: {
    Screen: 'Screen',
  },
}))

// Mock pour expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Medium: 'medium' },
}))

// Mock pour burnt
jest.mock('burnt', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    message: jest.fn(),
  },
}))

// Mock for react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // Additional mocks
  Reanimated.useSharedValue = jest.fn(initial => ({ value: initial }))
  Reanimated.useAnimatedStyle = jest.fn(() => ({}))
  Reanimated.withTiming = jest.fn(value => value)
  Reanimated.withSpring = jest.fn(value => value)
  Reanimated.interpolateColor = jest.fn(() => '#000000')
  Reanimated.LinearTransition = { duration: jest.fn() }

  return Reanimated
})
