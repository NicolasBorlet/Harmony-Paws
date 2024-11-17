import { Pressable } from "react-native";

export default function RoundedIconLink({
  icon,
  onPress,
  color = '#663399',
  roundedValue = 100
}: {
  icon: React.ReactNode;
  onPress?: () => void;
  color?: string;
  roundedValue?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 48,
        width: 48,
        backgroundColor: color,
        borderRadius: roundedValue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {icon}
    </Pressable>
  )
}
