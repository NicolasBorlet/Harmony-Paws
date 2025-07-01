import { i18n } from '@/lib/i18n'
import Back from '@/components/back-button'
import PropositionItemListing from '@/components/messageListing/proposition-item-listing'
import RoundedIconLink from '@/components/rounded-icon-link'
import {
  ExtraSmallSemiBold,
  NavigationTitle,
  SmallSemiBold,
} from '@/components/ui/text'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const propositionData = [
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'Jane Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
  {
    name: 'John Doe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://picsum.photos/300',
  },
]

export default function NewMessage() {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, paddingTop: 32, flex: 1 }}>
      <View
        style={{ gap: 24, display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Back position='relative' left='0' />
          <NavigationTitle color='#000'>
            {i18n.t('discussion.newMessage')}
          </NavigationTitle>
        </View>
        <View style={{ height: 48 }}>
          <TextInput
            placeholder={i18n.t('global.search')}
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#B9B9B9',
              color: '#696969',
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <RoundedIconLink
            color='#FDE6D7'
            icon={<AntDesign name='addusergroup' size={24} color='#F7A400' />}
          />
          <ExtraSmallSemiBold color='#000'>
            {i18n.t('discussion.createGroupDiscussion')}
          </ExtraSmallSemiBold>
        </View>
        <View
          style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}
        >
          <SmallSemiBold color='#000'>
            {i18n.t('discussion.sugest')}
          </SmallSemiBold>
          <View style={{ height: '100%' }}>
            <FlashList
              data={propositionData}
              renderItem={({ item, index }: { item: any; index: number }) => (
                <PropositionItemListing key={index} propositionData={item} />
              )}
              estimatedItemSize={10}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              ListFooterComponent={() => <View style={{ height: 32 }} />}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
