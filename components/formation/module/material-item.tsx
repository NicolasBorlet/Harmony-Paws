import { ExtraSmallMedium } from '@/components/ui/text'
import { MaterialGridItem } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'

export default function MaterialItem({ title }: { title: string }) {
  return (
    <MaterialGridItem>
      <ExtraSmallMedium color={Colors.orange[500]}>{title}</ExtraSmallMedium>
    </MaterialGridItem>
  )
}
