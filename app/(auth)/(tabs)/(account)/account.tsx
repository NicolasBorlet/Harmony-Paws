import { useSession } from '@/app/ctx'
import AccountHeading from '@/components/account/account-heading'
import { supabase } from '@/lib/supabase'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { SafeAreaView } from 'react-native-safe-area-context'

// Initialize MMKV
export const storage = new MMKV()

export default function AccountScreen() {
  const { session } = useSession()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AccountHeading />
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
