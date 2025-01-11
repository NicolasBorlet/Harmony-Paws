import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import AnimatedHeader from "../header/animated-header";
import RoundedIconLink from "../rounded-icon-link";

export default function AccountHeader({ scrollY }: { scrollY: any }) {
  return (
    <AnimatedHeader
      scrollY={scrollY} 
      icons={
        <>
          <RoundedIconLink
            icon={<FontAwesome name='gear' size={20} color='white' />}
            onPress={() => router.push('/settings')}
          />
        </>
      }
      title='account'
    />
  )
}
