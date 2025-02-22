import { Purple } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

export default function ImageSelector({
  image,
  onPress,
}: {
  image: string
  onPress: () => void
}) {
  return (
    <View
      style={{
        marginTop: -80,
        alignItems: 'center',
      }}
    >
      <Pressable style={{ alignItems: 'center' }} onPress={onPress}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: 120,
            height: 120,
            borderRadius: 20,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6.3,
            elevation: 10,
          }}
        />
        <View
          style={{
            backgroundColor: Purple,
            width: 37,
            height: 37,
            borderRadius: 25,
            marginTop: -18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AntDesign name='plus' size={16} color='#FFFFFF' />
        </View>
      </Pressable>
    </View>
  )
}
