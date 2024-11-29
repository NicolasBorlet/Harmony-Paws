import { ColumnItem } from "@/components/ui/ColumnItem";
import { BodyBold, ExtraSmallMedium } from "@/components/ui/text";
import { Formation } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { ScrollView, View } from "react-native";
import ModuleListingItem from "./module-listing-item";

const modules: Formation[] = [
  {
    id: 1,
    name: "Formation 1",
    subject: "Subject 1",
    image: "https://picsum.photos/300",
    animator_name: "Animator 1",
    price: 100,
    description: "Description 1",
    place: "Place 1",
    date: new Date(),
    participant_limit: 10,
    duration: 1,
    created_at: new Date(),
    updated_at: new Date(),
},
{
    id: 2,
    name: "Formation 2",
    subject: "Subject 2",
    image: "https://picsum.photos/300",
    animator_name: "Animator 2",
    price: 200,
    description: "Description 2",
    place: "Place 2",
    date: new Date(),
    participant_limit: 20,
    duration: 2,
    created_at: new Date(),
    updated_at: new Date(),
},
{
    id: 3,
    name: "Formation 3",
    subject: "Subject 3",
    image: "https://picsum.photos/300",
    animator_name: "Animator 3",
    price: 300,
    description: "Description 3",
    place: "Place 3",
    date: new Date(),
    participant_limit: 30,
    duration: 3,
    created_at: new Date(),
    updated_at: new Date(),
},
]

const numColumns = 2;

export default function ModuleListing () {
  return (
    <View style={{flex: 1}}>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
        gap: 20,
      }}>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            backgroundColor: "rgba(102, 51, 153, 0.1)",
            borderRadius: 10,
            padding:16,
            justifyContent: "center",
          }}
        >
          <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <BodyBold color="#663399">Formation complète</BodyBold>
          </View>
          <View>
            <ExtraSmallMedium color="#616060">
              Lorem ipsum dolor sit amet consectetur. Velit ac vitae phasellus pharetra urna eu est nec fermentum. Ac at tristique etiam neque.
            </ExtraSmallMedium>
          </View>
        </View>
        <FlashList
          data={modules}
          numColumns={numColumns}
          renderItem={({ index, item }) => (
            <ColumnItem index={index} numColumns={numColumns}>
              <ModuleListingItem module={item} />
            </ColumnItem>
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}