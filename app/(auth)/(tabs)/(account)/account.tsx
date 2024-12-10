import { useSession } from '@/app/ctx'
import AccountHeading from '@/components/account/account-heading'
import BodyTitle from '@/components/bodyTitle/body-title'
import Block from '@/components/grid/Block'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { RoundedImage } from '@/components/ui/image'
import { Body, BodyBold, Small } from '@/components/ui/text'
import { GridItemBackground } from '@/components/ui/view'
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
  const { session } = useSession()
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
                <Small color='#F7A400'>
                  Modifier mon profil
                </Small>
              </StandardButton>
            </View>
            <View style={{ flex: 1 }}>
              <StandardButton outlined>
                <Small color='#F7A400'>
                  Partager mon profil
                </Small>
              </StandardButton>
            </View>
          </View>
        </View>

        <View style={{
          gap: 24
        }}>
          <BodyTitle title='Mes chiens' />
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
                  backgroundColor: '#663399',
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
              <BodyBold color='#663399'>
                Ami(e)s
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399'>
                Favoris
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Les balades crées
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Les formations passées
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Les activités réalisées
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Rencontres
              </BodyBold>
            </GridItemBackground>
          </Block>
          <Block row gap={24}>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Mes os
              </BodyBold>
            </GridItemBackground>
            <GridItemBackground>
              <BodyBold color='#663399' style={{
                textAlign: 'center',
              }}>
                Mes os
              </BodyBold>
            </GridItemBackground>
          </Block>
        </View>

        <StandardButton onPress={() => supabase.auth.signOut()} color='#FF0000'>
          <Body color='white'>
            Se déconnecter
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
  },
  scrollView: {
    paddingHorizontal: 16,
    gap: 32,
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
