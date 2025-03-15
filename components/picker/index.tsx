// index.tsx
import React from 'react'
import PickerContent from './picker-content'
import PickerOverlay from './picker-overlay'
import { CustomPickerProps } from './types'

const CustomPicker: React.FC<CustomPickerProps> = ({
  isVisible,
  onClose,
  onConfirm,
  type,
  initialValue,
  minDate,
  maxDate,
  columns,
  containerStyle,
  headerStyle,
  itemStyle,
  confirmButtonStyle,
  confirmTextStyle,
  cancelButtonStyle,
  cancelTextStyle,
  overlayStyle,
  headerComponent,
  footerComponent,
  confirmText,
  cancelText,
}) => {
  const handleConfirm = (values: any[]) => {
    onConfirm(values)
    onClose()
  }

  return (
    <PickerOverlay
      isVisible={isVisible}
      onClose={onClose}
      overlayStyle={overlayStyle}
    >
      <PickerContent
        type={type}
        initialValue={initialValue}
        minDate={minDate}
        maxDate={maxDate}
        columns={columns}
        onConfirm={handleConfirm}
        onCancel={onClose}
        headerComponent={headerComponent}
        footerComponent={footerComponent}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmButtonStyle={confirmButtonStyle}
        confirmTextStyle={confirmTextStyle}
        cancelButtonStyle={cancelButtonStyle}
        cancelTextStyle={cancelTextStyle}
        itemStyle={itemStyle}
        containerStyle={containerStyle}
        headerStyle={headerStyle}
      />
    </PickerOverlay>
  )
}

export default CustomPicker
export * from './types'
