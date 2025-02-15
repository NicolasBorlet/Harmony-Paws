import { ModulePrice } from '@/components/ui/text'
import { ModuleInterface } from '@/lib/api/types/interfaces'
import { View } from 'react-native'
import ModuleCard from './module-card'
import ModuleProgress from './module-progress'

interface ModuleListingItemProps {
  module: ModuleInterface
}

export default function ModuleListingItem({ module }: ModuleListingItemProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
      }}
    >
      {module.isPurchased && <ModuleProgress progress={module.progress} />}
      <ModuleCard module={module} />
      {!module.isPurchased && (
        <ModulePrice color='#F7A400'>{module.price}€</ModulePrice>
      )}
    </View>
  )
}
