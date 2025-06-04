import { Colors } from '@/constants/Colors'
import { memo, useMemo } from 'react'
import { Pressable } from 'react-native'
import { Body, SpecialTitle } from '../ui/text'

function DateItem({
  itemDate,
  isFirst,
  isLast,
  onPress,
  isSelected,
}: {
  itemDate: string
  isFirst?: boolean
  isLast?: boolean
  onPress?: () => void
  isSelected: boolean
}) {
  const { dayOfWeek, dayOfMonth } = useMemo(() => {
    const date = new Date(itemDate)
    return {
      dayOfWeek: date
        .toLocaleDateString('fr-FR', {
          weekday: 'long',
        })
        .slice(0, 3),
      dayOfMonth: date.getDate(),
    }
  }, [itemDate])

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        borderWidth: 1,
        borderColor: Colors.purple[500],
        backgroundColor: isSelected ? Colors.purple[500] : Colors.white,
        borderRadius: 12,
        width: 55,
        marginLeft: isFirst ? 16 : 0,
        marginRight: isLast ? 16 : 0,
      }}
    >
      <SpecialTitle
        style={{
          color: isSelected ? Colors.white : Colors.black,
          textAlign: 'center',
        }}
      >
        {dayOfMonth}
      </SpecialTitle>
      <Body
        style={{
          color: isSelected ? Colors.white : Colors.black,
          textAlign: 'center',
        }}
      >
        {dayOfWeek}
      </Body>
    </Pressable>
  )
}

export default memo(DateItem, (prevProps, nextProps) => {
  return (
    prevProps.itemDate === nextProps.itemDate &&
    prevProps.isFirst === nextProps.isFirst &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.isSelected === nextProps.isSelected
  )
})
