import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import LoaderComponent from '@/components/loader'
import MessageItemListing from '@/components/messageListing/message-item-listing'
import RoundedIconLink from '@/components/rounded-icon-link'
import { ExtraSmall, NavigationTitle, SmallMedium } from '@/components/ui/text'
import { useUserConversations } from '@/lib/api/message'
import { user$ } from '@/lib/observables/session-observable'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
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
  const { 
    data, 
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage 
  } = useUserConversations(userData.id);

  const allConversations = data?.pages.flatMap(page => page.conversations) || [];

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const searchHeight = useSharedValue(50)
  const searchOpacity = useSharedValue(1)

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

  const animatedStyle = useAnimatedStyle(() => ({
    height: searchHeight.value,
    opacity: searchOpacity.value,
    overflow: 'hidden',
  }))

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
        {allConversations && allConversations.length > 0 && (
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
      {isLoading && !allConversations.length ? (
        <LoaderComponent />
      ) : (
        <FlashList
          data={allConversations}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: `/messages/${item.id}`,
                  params: { title: item.title }
                })
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <View style={{ height: isFetchingNextPage ? 50 : 32 }}>
              {isFetchingNextPage && <LoaderComponent />}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <SmallMedium color='#000'>{i18n.t('noMessages')}</SmallMedium>
              <ExtraSmall color='#979898'>
                {i18n.t('sendMessageToStart')}
              </ExtraSmall>
            </View>
          )}
        />
      )}
    </View>
  )
}

