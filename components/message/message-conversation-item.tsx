import { Text, View } from "react-native";

type MessageConversationItemProps = {
  message: string;
  isCurrentUser: boolean;
  date: number;
};

export default function MessageConversationItem({ message, isCurrentUser, date }: MessageConversationItemProps) {
  return (
    <View style={{
      alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
      marginVertical: 4,
    }}>
      <View style={{
        backgroundColor: isCurrentUser ? '#F7A400' : '#F1F1F1',
        padding: 12,
        borderRadius: 16,
        maxWidth: '80%',
        borderWidth: 1,
        borderColor: isCurrentUser ? '#F7A400' : '#663399',
        borderBottomRightRadius: isCurrentUser ? 4 : 16,
        borderBottomLeftRadius: isCurrentUser ? 16 : 4,
      }}>
        <Text style={{
          color: isCurrentUser ? '#FFF' : '#663399',
        }}>
          {message}
        </Text>
      </View>
    </View>
  );
}