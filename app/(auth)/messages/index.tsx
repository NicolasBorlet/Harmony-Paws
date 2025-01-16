import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import MessageItemListing from '@/components/messageListing/message-item-listing'
import RoundedIconLink from '@/components/rounded-icon-link'
import { ExtraSmall, NavigationTitle, SmallMedium } from '@/components/ui/text'
import { useUserConversations } from '@/lib/api/message'
import { user$ } from '@/lib/observables/session-observable'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Messages() {
  const insets = useSafeAreaInsets()
  const userData = user$.get();
  const { data: conversations, isLoading, error } = useUserConversations(userData.id);

  const searchHeight = useSharedValue(50) // Hauteur initiale
  const searchOpacity = useSharedValue(1) // Opacité initiale

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y
    if (scrollY > 10) {
      searchHeight.value = withTiming(0, { duration: 300 })
      searchOpacity.value = withTiming(0, { duration: 150 })
    } else {
      searchHeight.value = withTiming(50, { duration: 300 })
      searchOpacity.value = withTiming(1, { duration: 150 })
    }
  }

  // Style animé pour la barre de recherche
  const animatedStyle = useAnimatedStyle(() => ({
    height: searchHeight.value,
    opacity: searchOpacity.value, // Ajoute l'opacité
    overflow: 'hidden', // Assure que le contenu est masqué
  }))


  useEffect(() => {
    console.log(userData.id);
    console.log(conversations);
  }, [conversations]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
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
            <NavigationTitle color='#000'>{i18n.t('messages')}</NavigationTitle>
          </View>
          <RoundedIconLink
            icon={<AntDesign name='plus' size={20} color='white' />}
            onPress={() => router.push('/messages/new')}
          />
        </View>
        {/* Barre de recherche */}
        {conversations && conversations.length > 0 && (
          <Animated.View style={[animatedStyle]}>
            <TextInput
              placeholder='Search'
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#B9B9B9',
                color: '#B9B9B9',
              }}
            />
          </Animated.View>
        )}
      </View>
      <FlashList
        data={conversations}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <Pressable
            onPress={() => {
              router.push(`/messages/${item.id}`)
            }}
          >
            <MessageItemListing conversation={item} />
          </Pressable>
        )}
        estimatedItemSize={10}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: '#C5C3C3',
              width: '100%',
              marginVertical: 20,
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={() => <View style={{ height: 32 }} />}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SmallMedium color='#000'>{i18n.t('noMessages')}</SmallMedium>
            <ExtraSmall color='#979898'>
              {i18n.t('sendMessageToStart')}
            </ExtraSmall>
          </View>
        )}
      />
    </View>
  )
}
