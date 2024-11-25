import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function FilterComponent() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
  
    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'center',
    },
});
