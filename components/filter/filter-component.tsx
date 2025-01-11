import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { Body } from '../ui/text';

export default function FilterComponent({bottomSheetModalRef, handleSheetChanges}: {bottomSheetModalRef: React.RefObject<BottomSheetModal>, handleSheetChanges: (index: number) => void}) {

  const snapPoints = useMemo(() => ['40%'], []);

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
			/>
		),
		[]
	);
  
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        index={1}
        backdropComponent={renderBackdrop}
        enableDynamicSizing
        snapPoints={snapPoints}
      >
        <BottomSheetView style={{
          flex: 1,
          alignItems: 'center',
        }}>
          <Body>Awesome 🎉</Body>
        </BottomSheetView>
    </BottomSheetModal>
    )
}