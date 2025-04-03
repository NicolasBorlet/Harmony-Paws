import { Colors } from '@/constants/Colors'
import { Text, View } from 'react-native'

type MessageConversationItemProps = {
  message: string
  isCurrentUser: boolean
  date: number
}

export default function MessageConversationItem({
  message,
  isCurrentUser,
  date,
}: MessageConversationItemProps) {
  return (
    <View
      style={{
        alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
        marginVertical: 4,
      }}
    >
      <View
        style={{
          backgroundColor: isCurrentUser ? Colors.light.primary : '#F1F1F1',
          padding: 12,
          borderRadius: 16,
          maxWidth: '80%',
          borderWidth: 1,
          borderColor: isCurrentUser
            ? Colors.light.primary
            : Colors.light.secondary,
          borderBottomRightRadius: isCurrentUser ? 4 : 16,
          borderBottomLeftRadius: isCurrentUser ? 16 : 4,
        }}
      >
        <Text
          style={{
            color: isCurrentUser ? 'white' : Colors.light.secondary,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  )
}
