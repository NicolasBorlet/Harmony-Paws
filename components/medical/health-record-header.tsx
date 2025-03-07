import { Colors } from '@/constants/Colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AnimatedHeader from '../header/animated-header'
import RoundedIconLink from '../rounded-icon-link'

export default function HealthRecordHeader({
  scrollY,
  dogName,
}: {
  scrollY: any
  dogName: string
}) {
  return (
    <AnimatedHeader
      scrollY={scrollY}
      icons={
        <>
          <RoundedIconLink
            icon={<Ionicons name='notifications' size={20} color='white' />}
            onPress={() => router.push('/notifications')}
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
