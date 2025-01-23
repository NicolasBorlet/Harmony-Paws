import { Conversation } from "@/types/message";
import { View } from "react-native";
import { ExtraSmall, MessageListingAuthor } from "../ui/text";

export default function MessageItemListing({ conversation }: { conversation: Conversation }) {
  const lastMessage = conversation.last_message;
  const messageContent = lastMessage?.content || "Pas de message";

  const timeSince = new Date(conversation.created_at).getTime() - new Date().getTime();
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
        <ExtraSmall color="#979898">{messageContent}</ExtraSmall>
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
