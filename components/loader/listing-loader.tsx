import { View } from "react-native";
import { ChatItemSkeleton, DogItemSkeleton, FormationItemSkeleton, RideItemSkeleton } from "../skeletons/skeletons";

// enums for type of loader
export enum LoaderType {
  LISTING = 'listing',
  DETAIL = 'detail',
}

// enums for item type
export enum ItemType {
  DOG = 'dog',
  RIDE = 'ride',
  CONVERSATION = 'conversation',
  FORMATION = 'formation',
  MODULE = 'module',
}

interface ListingLoaderProps {
  type: LoaderType
  itemType: ItemType
}

export default function ListingLoader({ type, itemType }: ListingLoaderProps) {
  return (
    <View style={{ flex: 1 }}>
      {/* If item type is dog, render a dog item skeleton */}
      {itemType === ItemType.DOG && (
        <View style={{ flex: 1, padding: 16 }}>
          <DogItemSkeleton />
          <DogItemSkeleton />
          <DogItemSkeleton />
        </View>
      )}
      {/* If item type is ride, render a ride item skeleton */}
      {itemType === ItemType.RIDE && (
        <View style={{ flex: 1, padding: 16 }}>
          <RideItemSkeleton />
          <RideItemSkeleton />
          <RideItemSkeleton />
          <RideItemSkeleton />
        </View>
      )}
      {/* If item type is conversation, render a conversation item skeleton */}
      {itemType === ItemType.CONVERSATION && (
        <View style={{ gap: 20, flex: 1, padding: 16 }}>
          <ChatItemSkeleton />
          <ChatItemSkeleton />
          <ChatItemSkeleton />
        </View>
      )}
      {/* If item type is formation, render a formation item skeleton */}
      {itemType === ItemType.FORMATION && (
        <View style={{ gap: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <FormationItemSkeleton />
          <FormationItemSkeleton />
        </View>
      )}
    </View>
  )
}