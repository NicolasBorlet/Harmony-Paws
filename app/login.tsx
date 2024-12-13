import ParallaxScrollView from '@/components/parallax-scrollview'
import { StandardButton } from '@/components/ui/button'
import { BodyMedium, Small, SpecialTitle } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  AppState,
  Pressable,
  StyleSheet,
  View
} from 'react-native'
import { supabase } from '../lib/supabase'
import { i18n } from './_layout'
import { useSession } from './ctx'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useSession()

  async function handleSignIn() {
    setLoading(true)
    const error = await signIn(email, password)
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  // async function signUpWithEmail() {
  //   setLoading(true)
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   })

  //   if (error) Alert.alert(error.message)
  //   if (!session) Alert.alert('Please check your inbox for email verification!')
  //   setLoading(false)
  // }

  return (
    <ParallaxScrollView headerImage={''}>
      <View style={styles.container}>
        <SpecialTitle style={{ alignSelf: 'center' }}>
          {i18n.t('signIn')}
        </SpecialTitle>
        <View style={{
          gap: 12,
        }}>
          <CustomTextInput
            placeholder={i18n.t('email')}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder={i18n.t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable onPress={() => { }} style={styles.forgotPassword}>
            <Small color='#000' style={{ textDecorationLine: 'underline' }}>{i18n.t('forgotPassword')}</Small>
          </Pressable>
        </View>
        <StandardButton onPress={handleSignIn}>
          <BodyMedium color='#fff'>{i18n.t('signIn')}</BodyMedium>
        </StandardButton>
        <BodyMedium style={{ textAlign: 'center' }}>{i18n.t('noAccount')} <Link style={{
          fontFamily: 'Montserrat_800ExtraBold',
          color: '#F49819',
        }} href='/signup'>{i18n.t('signUpLink')}</Link></BodyMedium>
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
})
