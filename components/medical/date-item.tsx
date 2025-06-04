import { Colors } from '@/constants/Colors'
import Block from '../grid/Block'
import { Body, SpecialTitle } from '../ui/text'

export default function DateItem({
  itemDate,
  date,
  isFirst,
  isLast,
}: {
  itemDate: string
  date: string
  isFirst?: boolean
  isLast?: boolean
}) {
  const isSelected = itemDate === date
  // Jour de la semaine à partir de itemDate
  const dayOfWeek = new Date(itemDate)
    .toLocaleDateString('fr-FR', {
      weekday: 'long',
    })
    .slice(0, 3)

  // Jour du mois à partir de itemDate
  const dayOfMonth = new Date(itemDate).getDate()

  return (
    <Block
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.purple[500],
        backgroundColor: isSelected ? Colors.purple[500] : Colors.white,
        borderRadius: 12,
        width: 55,
        marginLeft: isFirst ? 16 : 0,
        marginRight: isLast ? 16 : 0,
      }}
      gap={12}
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
    </Block>
  )
}
