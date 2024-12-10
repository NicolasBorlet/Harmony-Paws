import { useSession } from '@/app/ctx'
import AccountHeading from '@/components/account/account-heading'
import BodyTitle from '@/components/bodyTitle/body-title'
import { StandardButton } from '@/components/ui/button'
import { RoundedImage } from '@/components/ui/image'
import { Small } from '@/components/ui/text'
import { supabase } from '@/lib/supabase'
import { AntDesign } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { SafeAreaView } from 'react-native-safe-area-context'

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

  return (
    <SafeAreaView style={styles.container}>
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

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TextInput value={session?.user?.email} />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title='Sign Out' onPress={() => supabase.auth.signOut()} />
        </View>

        {/* <View style={styles.verticallySpaced}>
          <Button
            title='Remove onBoarding'
            onPress={() => storage.set('onBoarding', false)}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
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
