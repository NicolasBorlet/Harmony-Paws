import { Href, Link } from "expo-router";
import { View } from "react-native";

export default function RoundedIconLink({
  icon,
  href
}: {
  icon: React.ReactNode;
  href: Href;
}) {
  return (
    <Link href={href}>
      <View style={{ height: 48, width: 48, backgroundColor: '#663399', borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </View>
    </Link>
  )
}
