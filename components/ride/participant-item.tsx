import { User } from "@/lib/api/types"
import Block from "../grid/Block"
import { RoundedImage } from "../ui/image"
import { SmallBold } from "../ui/text"

export default function ParticipantItem({ participant }: { participant: User }) {
  // Placeholder image en attendant l'implémentation des images utilisateur
  const placeholderImage = "https://picsum.photos/300"

  return (
    <Block key={participant.id} row align="center" gap={26}>
      <Block flex={0} row>
        <RoundedImage
          source={{ uri: participant.image || placeholderImage }} 
          width={35}
          height={35}
          border="1.5px solid #F7A400"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: -14,
            right: -14,
          }}
        />
        <RoundedImage source={{ uri: placeholderImage }} />
      </Block>
      <Block>
        <SmallBold color="#000">
          {participant.first_name} {participant.last_name}
        </SmallBold>
      </Block>
    </Block>
  )
}