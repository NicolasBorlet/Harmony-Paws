import { View } from 'react-native'

interface DividerProps {
  spacing?: number
  color?: string
}

const Divider = ({ color = '#C5C3C3', spacing = 0 }: DividerProps) => {
  return (
    <View
      style={{ height: 1, backgroundColor: color, marginVertical: spacing }}
    />
  )
}

export default Divider
