
// Mock StyleSheet.create to return the styles object as-is
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return {
    ...RN,
    StyleSheet: {
      ...RN.StyleSheet,
      create: (styles) => styles,
    },
  };
}); 