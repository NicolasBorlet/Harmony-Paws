import LoginHP from '@/assets/svg/login-hp'
import ParallaxScrollView from '@/components/parallax-scrollview'
import { StandardButton } from '@/components/ui/button'
import { BodyMedium, Small, SpecialTitle } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  AppState,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
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
    try {
      await signIn(email, password)
    } catch (error: any) {
      Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const backgroundContainer = (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View
        style={{
          width: 155,
          height: 155,
          backgroundColor: '#FDE6D7',
          borderRadius: 999,
          overflow: 'hidden',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/images/dog-login.png')}
          style={{
            width: 133,
            height: 141,
          }}
        />
      </View>
      <LoginHP />
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ParallaxScrollView
        backgroundColor='#F49819'
        backgroundContainer={backgroundContainer}
      >
        <View style={styles.container}>
          <SpecialTitle style={{ alignSelf: 'center' }}>
            {i18n.t('auth.signIn')}
          </SpecialTitle>
          <View
            style={{
              gap: 12,
            }}
          >
            <CustomTextInput
              placeholder={i18n.t('auth.email')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              placeholderTextColor='#696969'
            />
            <CustomTextInput
              placeholder={i18n.t('auth.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              clearTextOnFocus={false}
              placeholderTextColor='#696969'
            />
            <Pressable onPress={() => {}} style={styles.forgotPassword}>
              <Small color='#000' style={{ textDecorationLine: 'underline' }}>
                {i18n.t('auth.forgotPassword')}
              </Small>
            </Pressable>
          </View>
          <StandardButton onPress={handleSignIn} color='#572B84'>
            <BodyMedium color='#fff'>{i18n.t('auth.signIn')}</BodyMedium>
          </StandardButton>
          <BodyMedium style={{ textAlign: 'center' }}>
            {i18n.t('auth.noAccount')}{' '}
            <Link
              style={{
                fontFamily: 'Montserrat_800ExtraBold',
                color: '#F49819',
                textDecorationLine: 'underline',
              }}
              href='/signup'
            >
              {i18n.t('auth.signUpLink')}
            </Link>
          </BodyMedium>
        </View>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
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
