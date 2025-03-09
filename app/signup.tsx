import ParallaxScrollView from '@/components/parallax-scrollview'
import { StandardButton } from '@/components/ui/button'
import { BodyMedium, Small, SpecialTitle } from '@/components/ui/text'
import { CustomTextInput } from '@/components/ui/text-input'
import { Colors } from '@/constants/Colors'
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

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useSession()

  async function handleSignUp() {
    setLoading(true)
    try {
      await signUp(email, password)
    } catch (error: any) {
      Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ParallaxScrollView backgroundColor={Colors.light.secondary}>
        <View style={styles.container}>
          <SpecialTitle
            style={{ alignSelf: 'center' }}
            color={Colors.light.primary}
          >
            {i18n.t('auth.signUp')}
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
              placeholderTextColor='#696969'
            />
            <CustomTextInput
              placeholder={i18n.t('auth.password')}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor='#696969'
              secureTextEntry
            />
            <Pressable onPress={() => {}} style={styles.forgotPassword}>
              <Small color='#000' style={{ textDecorationLine: 'underline' }}>
                {i18n.t('auth.forgotPassword')}
              </Small>
            </Pressable>
          </View>
          <StandardButton onPress={handleSignUp}>
            <BodyMedium color='#fff'>{i18n.t('auth.signUp')}</BodyMedium>
          </StandardButton>
          <BodyMedium style={{ textAlign: 'center' }}>
            {i18n.t('auth.alreadyAccount')}{' '}
            <Link
              style={{
                fontFamily: 'Montserrat_800ExtraBold',
                color: Colors.light.secondary,
                textDecorationLine: 'underline',
              }}
              href='/login'
            >
              {i18n.t('auth.signInLink')}
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
