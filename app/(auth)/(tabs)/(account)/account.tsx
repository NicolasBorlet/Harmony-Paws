import { useSession } from '@/app/ctx'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

// Initialize MMKV
export const storage = new MMKV()

export default function AccountScreen() {
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    console.log('Onboarding', storage.getBoolean('onBoarding'))
  }, [])

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput value={session?.user?.email} />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          value={username || ''}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          value={website || ''}
          onChangeText={text => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title='Sign Out' onPress={() => supabase.auth.signOut()} />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title='Remove onBoarding'
          onPress={() => storage.set('onBoarding', false)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
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
