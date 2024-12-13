import { i18n } from '@/app/_layout'
import AccountHeading from '@/components/account/account-heading'
import BodyTitle from '@/components/bodyTitle/body-title'
import Block from '@/components/grid/Block'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { RoundedImage } from '@/components/ui/image'
import { Body, BodyBold, Small } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Initialize MMKV
export const storage = new MMKV()

const dogs = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300',
  },
]

export default function AccountScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{
          gap: 24
        }}>
          <AccountHeading />
          <View style={{
            flexDirection: 'row',
            gap: 12,
          }}>
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color={Colors.light.primary}>
                  {i18n.t('editProfile')}
                </Small>
              </StandardButton>
            </View>
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color={Colors.light.primary}>
                  {i18n.t('shareProfile')}
                </Small>
              </StandardButton>
            </View>
          </View>
        </View>

        <View style={{
          gap: 24
        }}>
          <BodyTitle title={i18n.t('myDogs')} />
          <FlashList
            data={dogs}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <View key={item.id}>
                <RoundedImage src={item.image} />
              </View>
            )}
            ListFooterComponent={() => (
              <Pressable style={{
                marginLeft: 12,
              }}
                onPress={() => router.push('/dog/creation/first-step')}
              >
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 999,
                  backgroundColor: Colors.light.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <AntDesign name="plus" size={24} color="white" />
                </View>
              </Pressable>
            )}
          />
        </View>

        <Divider />

        <View style={{
          gap: 24,
        }}>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary}>
                {i18n.t('friends')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary}>
                {i18n.t('favorites')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('createdRides')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('completedFormations')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('completedActivities')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('meetings')}
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('myBones')}
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color={Colors.light.secondary} style={{
                textAlign: 'center',
              }}>
                {i18n.t('myBones')}
              </BodyBold>
            </GridItemBackground>
          </Block>
        </View>

        <StandardButton onPress={() => supabase.auth.signOut()} color='#FF0000'>
          <Body color='white'>
            {i18n.t('disconected')}
          </Body>
        </StandardButton>

        {/* <View style={styles.verticallySpaced}>
          <Button
            title='Remove onBoarding'
            onPress={() => storage.set('onBoarding', false)}
          />
        </View> */}
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
    paddingBottom: 24
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
