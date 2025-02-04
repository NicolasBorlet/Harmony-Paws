import { Formation } from "@/lib/api/types";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";
import Block from "../grid/Block";
import { BodyBold, SmallMedium } from "../ui/text";

export default function FormationListingItem({ formation }: { formation: Formation }) {
  return (
    <Pressable
      onPress={()=>{
        router.push(`/(formation)/${formation.id}`);
      }}
    >
      <Block gap={8}>
        <Block style={{
          width: '100%',
          height: 150,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          <Image source={{ uri: formation.image }} style={{
            height: '100%',
            width: '100%',
          }} />
        </Block>
        <BodyBold color="#F7A400">{formation.name}</BodyBold>
        <SmallMedium color="#979898">{formation.animator_name}</SmallMedium>
      </Block>
    </Pressable>
  );
}