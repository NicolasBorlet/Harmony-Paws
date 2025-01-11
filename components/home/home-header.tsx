import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AnimatedHeader from "../header/animated-header";
import RoundedIconLink from "../rounded-icon-link";

export default function HomeHeader({ scrollY }: { scrollY: any }) {
  return (
    <AnimatedHeader
      scrollY={scrollY} 
      icons={
        <>
          <RoundedIconLink
            icon={<Ionicons name='notifications' size={20} color='white' />}
            onPress={() => router.push('/notifications')}
          />
            <RoundedIconLink
              icon={<Ionicons name='chatbubble' size={20} color='white' />}
              onPress={() => router.push('/messages')}
            />
        </>
      }
      title='welcome'
      dogName='Taico'
      subtitle='timeToRide'
    />
  )
}
