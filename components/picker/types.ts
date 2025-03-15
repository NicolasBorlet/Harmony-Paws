// types.ts
import { ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

export type PickerItemType = {
  label: string
  value: string | number
}

export type PickerColumnType = {
  items: PickerItemType[]
  keyExtractor?: (item: PickerItemType) => string
}

export type PickerType = 'date' | 'time' | 'datetime' | 'birthday' | 'custom'

export interface CustomPickerProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: (selectedValues: any[]) => void
  type: PickerType
  // Pour les types prédéfinis
  initialValue?: Date | string | number
  minDate?: Date // Pour les types date/datetime/birthday
  maxDate?: Date // Pour les types date/datetime/birthday
  // Pour le type custom
  columns?: PickerColumnType[]
  // Styles
  containerStyle?: ViewStyle
  headerStyle?: ViewStyle
  itemStyle?: TextStyle
  confirmButtonStyle?: ViewStyle
  confirmTextStyle?: TextStyle
  cancelButtonStyle?: ViewStyle
  cancelTextStyle?: TextStyle
  overlayStyle?: ViewStyle
  // Personnalisation
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  confirmText?: string
  cancelText?: string
}
