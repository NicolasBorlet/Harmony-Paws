import { Colors } from '@/constants/Colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AnimatedHeader from '../header/animated-header'
import RoundedIconLink from '../rounded-icon-link'

export default function HealthRecordHeader({
  scrollY,
  dogName,
  dogId,
}: {
  scrollY: any
  dogName: string
  dogId: string
}) {
  return (
    <AnimatedHeader
      scrollY={scrollY}
      icons={
        <>
          <RoundedIconLink
            icon={<Ionicons name='notifications' size={20} color='white' />}
            onPress={() =>
              router.push(`/(auth)/(tabs)/(medical)/${dogId}/callback`)
            }
            color={Colors.pink[500]}
          />
          <RoundedIconLink
            icon={<AntDesign name='calendar' size={20} color='white' />}
            onPress={() => router.push('/messages')}
            color={Colors.pink[500]}
          />
          <RoundedIconLink
            icon={<AntDesign name='plus' size={20} color='white' />}
            onPress={() => router.push('/messages')}
            color={Colors.orange[500]}
          />
        </>
      }
      title={dogName}
    />
  )
}
