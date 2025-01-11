import Block from "../grid/Block"
import { RoundedImage } from "../ui/image"
import { SmallBold } from "../ui/text"

export interface ParticipantItemProps {
  id: number
  name: string
  image: string
  ownerName: string
  ownerImage: string
  ownerSex: number
}

export default function ParticipantItem({ participant }: { participant: ParticipantItemProps }) {
  return (
    <Block key={participant.id} row align="center" gap={26}>
      <Block flex={0} row>
        <RoundedImage
          source={{ uri: participant.ownerImage }} 
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
        <RoundedImage source={{ uri: participant.image }} />
      </Block>
      <Block>
        <SmallBold color="#000">{participant.name} et {participant.ownerSex === 0 ? "son maitre" : "sa maitresse"}, {participant.ownerName}</SmallBold>
      </Block>
    </Block>
  )
}