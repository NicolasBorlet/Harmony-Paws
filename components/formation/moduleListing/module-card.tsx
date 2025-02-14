import { i18n } from '@/app/_layout'
import { BodyBold, ExtraSmallBold } from '@/components/ui/text'
import { ModuleInterface } from '@/lib/api/types/interfaces'
import { Image } from 'expo-image'
import { View } from 'react-native'

interface ModuleCardProps {
  module: ModuleInterface
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        gap: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#D9D9D9',
      }}
    >
      <View
        style={{
          borderRadius: 80,
          overflow: 'hidden',
          height: 70,
          width: 70,
        }}
      >
        <Image
          source={{ uri: module.image }}
          style={{ width: 70, height: 70 }}
          contentFit='cover'
        />
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <ExtraSmallBold color='#979898'>{i18n.t('training')}</ExtraSmallBold>
          <BodyBold>{module.name}</BodyBold>
        </View>
      </View>
    </View>
  )
}
