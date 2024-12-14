import { AuthError, Session } from '@supabase/supabase-js'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'
import { session$ } from '../lib/observables/session-observable'
import { supabase } from '../lib/supabase'

// Initialize MMKV
export const storage = new MMKV()

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signOut: () => Promise<void>
  session: Session | null
  isLoading: boolean
}>({
  signIn: async () => null,
  signOut: async () => { },
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

export function SessionProvider(props: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    console.log('SessionProvider')
    console.log(session)
    if (session && session.user.email && session.user.id && session.user.last_sign_in_at) {
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
          router.replace('/(auth)/onboarding')
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

  const value = {
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (!error) {
        const hasCompletedOnboarding = storage.getBoolean('onBoarding') || false

        console.log('hasCompletedOnboarding', hasCompletedOnboarding)

        if (hasCompletedOnboarding) {
          router.replace('/(auth)/(tabs)/(home)')
        } else {
          router.replace('/(auth)/onboarding')
        }
      }
      return error
    },
    signOut: async () => {
      await supabase.auth.signOut()
      setSession(null)
      router.replace('/login')
    },
    session,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
