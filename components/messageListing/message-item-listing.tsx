import { Image } from "expo-image";
import { View } from "react-native";
import { ExtraSmall, MessageListingAuthor } from "../ui/text";

export default function MessageItemListing({ messageData }: { messageData: any }) {
  const timeSince = new Date(messageData.date).getTime() - new Date().getTime();
  const timeSinceText = timeSince < 60000 ? '<1min' : `${Math.floor(timeSince / 60000)}min`;

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    }}>
      <Image source={{ uri: messageData.avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <MessageListingAuthor>{messageData.name}</MessageListingAuthor>
        <ExtraSmall color="#979898">{messageData.message}</ExtraSmall>
      </View>
      <View style={{
        flex: 1,
        alignItems: 'flex-end'
      }}>
        <ExtraSmall color="#696969">{timeSinceText}</ExtraSmall>
      </View>
    </View>
  )
}
