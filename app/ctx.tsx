import { createUserInDB, verifyUserInDB } from '@/lib/api/user'
import { Session } from '@supabase/supabase-js'
import * as Burnt from 'burnt'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'
import { session$, user$ } from '../lib/observables/session-observable'
import { supabase } from '../lib/supabase'
import { i18n } from './_layout'

// Initialize MMKV
export const storage = new MMKV()

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  session: Session | null
  isLoading: boolean
}>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  session: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    console.log('SessionProvider')
    console.log(session)
    if (
      session &&
      session.user.email &&
      session.user.id &&
      session.user.last_sign_in_at
    ) {
      // Update session observable when session changes
      session$.set({
        id: session.user.id,
        email: session.user.email,
        created_at: session.user.created_at,
        last_sign_in_at: session.user.last_sign_in_at,
        access_token: session.access_token,
      })
    } else {
      // Clear session when logged out
      session$.set({
        id: '',
        email: '',
        created_at: '',
        last_sign_in_at: '',
        access_token: '',
      })
    }
  }, [session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        const hasCompletedOnboarding = storage.getBoolean('onBoarding') || false
        if (!hasCompletedOnboarding) {
          router.replace('/(auth)/onboarding/ride-onboarding')
        }
      }
      setIsLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        const hasCompletedOnboarding = storage.getBoolean('onBoarding') || false
        if (!hasCompletedOnboarding) {
          router.replace('/(auth)/onboarding')
        }
      }
    })
  }, [])

  const handleOnboarding = useCallback(() => {
    const hasCompletedOnboarding = storage.getBoolean('onBoarding') || false
    if (hasCompletedOnboarding) {
      router.replace('/(auth)/(tabs)/(home)')
    } else {
      router.replace('/(auth)/onboarding')
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Verify user exists in DB
      const userData = await verifyUserInDB(data.session.user.id)

      // Update user$ observable
      user$.set(userData)

      setSession(data.session)

      handleOnboarding()
    } catch (error: any) {
      Burnt.toast({
        title: i18n.t('global.error'),
        preset: 'error',
        message: error.message,
        haptic: 'error',
      })
      // Make sure session is null if verification fails
      setSession(null)
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const {
        data: { session, user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (user) {
        // Create user in DB
        await createUserInDB(user.id)
      }

      if (!session) {
        Burnt.toast({
          title: i18n.t('auth.verifyEmail'),
          preset: 'done',
          message: i18n.t('auth.checkInbox'),
          haptic: 'success',
        })
      } else {
        // If email verification is not required, we can set the session
        setSession(session)
        handleOnboarding()
      }
    } catch (error: any) {
      Burnt.toast({
        title: i18n.t('global.error'),
        preset: 'error',
        message: error.message,
        haptic: 'error',
      })
      setSession(null)
    }
  }, [])

  const value = {
    signIn,
    signOut: async () => {
      await supabase.auth.signOut()
      setSession(null)
      router.replace('/login')
    },
    session,
    isLoading,
    signUp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
