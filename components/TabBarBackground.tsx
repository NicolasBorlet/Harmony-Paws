import { StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
  return (
    <View 
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }
      ]} 
    />
  );
}

export function useBottomTabOverflow() {
  return 49; // Standard Android tab bar height
}