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
      <ModuleProgress progress={70} />
      <ModuleCard module={module} />
    </View>
  )
}
