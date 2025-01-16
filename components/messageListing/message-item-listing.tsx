import { View } from "react-native";
import { ExtraSmall, MessageListingAuthor } from "../ui/text";

export default function MessageItemListing({ conversation }: { conversation: any }) {
  const timeSince = new Date(conversation.date).getTime() - new Date().getTime();
  const timeSinceText = timeSince < 60000 ? '<1min' : `${Math.floor(timeSince / 60000)}min`;

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    }}>
      {/* <Image source={{ uri: messageData.avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} /> */}
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <MessageListingAuthor>{conversation.title}</MessageListingAuthor>
        <ExtraSmall color="#979898">{conversation.last_message[0].content}</ExtraSmall>
      </View>
      <View style={{
        flex: 1,
        alignItems: 'flex-end'
      }}>
        {/* <ExtraSmall color="#696969">{timeSinceText}</ExtraSmall> */}
      </View>
    </View>
  )
}
