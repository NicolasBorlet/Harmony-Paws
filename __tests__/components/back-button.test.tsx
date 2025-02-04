import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';
import BackButton from '../../components/back-button';

// Update the mocks at the top of the file
jest.mock('react-native', () => ({
  Pressable: 'Pressable',
}));

jest.mock('@expo/vector-icons', () => ({
  Entypo: () => 'Entypo',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0 }),
  SafeAreaProvider: 'SafeAreaProvider',
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByRole } = render(<BackButton />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('calls router.back when pressed without onPress prop', () => {
    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');
    
    fireEvent.press(button);
    
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('calls custom onPress when provided', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(<BackButton onPress={onPressMock} />);
    const button = getByRole('button');
    
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
    expect(router.back).not.toHaveBeenCalled();
  });

  it('applies correct positioning styles', () => {
    const { getByRole } = render(<BackButton position="relative" left="10px" />);
    const button = getByRole('button');
    
    expect(button.props.style).toEqual(expect.objectContaining({
      marginTop: 0,
    }));
  });
});