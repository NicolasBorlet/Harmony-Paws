import { i18n } from '@/app/_layout'
import AccountHeader from '@/components/account/account-header'
import AccountHeading from '@/components/account/account-heading'
import BodyTitle from '@/components/bodyTitle/body-title'
import Block from '@/components/grid/Block'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { RoundedImage } from '@/components/ui/image'
import { Body, BodyBold, Small } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { useDogsFromUserId } from '@/lib/api/dog'
import { useActivityStatus } from '@/lib/context/ActivityStatusContext'
import { session$, user$ } from '@/lib/observables/session-observable'
import { supabase } from '@/lib/supabase'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Initialize MMKV
export const storage = new MMKV()

export default function AccountScreen() {
  const insets = useSafeAreaInsets()
  const activityStatus = useActivityStatus()
  const isActivityActive = activityStatus.get().isActivityActive

  const scrollY = useSharedValue(0)

  const user = user$.get()
  const { data: dogs } = useDogsFromUserId(user?.id)

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + (isActivityActive ? 96 : 0) },
      ]}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <AccountHeader scrollY={scrollY} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={event => {
          scrollY.value = event.nativeEvent.contentOffset.y
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            gap: 24,
          }}
        >
          <AccountHeading />
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color={Colors.light.primary}>
                  {i18n.t('account.editProfile')}
                </Small>
              </StandardButton>
            </View>
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color={Colors.light.primary}>
                  {i18n.t('account.shareProfile')}
                </Small>
              </StandardButton>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: 24,
          }}
        >
          <BodyTitle title={i18n.t('account.myDogs')} />
          <FlashList
            data={dogs}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(`/dog/${item.id}`)}
              >
                <RoundedImage src={item.image} />
              </Pressable>
            )}
            ListFooterComponent={() => (
              <Pressable
                style={{
                  marginLeft: 12,
                }}
                onPress={() => router.push('/dog/creation')}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 999,
                    backgroundColor: Colors.light.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AntDesign name='plus' size={24} color='white' />
                </View>
              </Pressable>
            )}
          />
        </View>

        <Divider />

        <View
          style={{
            gap: 12,
          }}
        >
          <Block row gap={12}>
            <GridItemBackground height={60}>
              <BodyBold color={Colors.light.secondary}>
                {i18n.t('account.friends')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground height={60}>
              <BodyBold color={Colors.light.secondary}>
                {i18n.t('account.favorites')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={12}>
            <GridItemBackground height={60}>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.createdRides')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground height={60}>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.completedFormations')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={12}>
            <GridItemBackground height={60}>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.completedActivities')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground height={60}>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.meetings')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={12}>
            <GridItemBackground height={60}>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.myBones')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold
                color={Colors.light.secondary}
                style={{
                  textAlign: 'center',
                }}
              >
                {i18n.t('account.myBones')}
              </BodyBold>
            </GridItemBackground>
          </Block>
        </View>

        <StandardButton
          onPress={() => {
            supabase.auth.signOut()
            session$.set({
              id: '',
              email: '',
              created_at: '',
              last_sign_in_at: '',
              access_token: '',
            })
          }}
          color='#FF0000'
        >
          <Body color='white'>{i18n.t('global.disconected')}</Body>
        </StandardButton>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 16,
    gap: 32,
    paddingBottom: 24,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
