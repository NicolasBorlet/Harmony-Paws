import React, { useEffect, useState } from "react";
import { Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { router } from 'expo-router';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signOut: () => Promise<void>;
  session: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => null,
  signOut: async () => {},
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log('SessionProvider');
    console.log(session);
  }, [session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = {
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) {
        router.replace('/(auth)/(tabs)/(home)');
      }
      return error;
    },
    signOut: async () => {
      await supabase.auth.signOut();
      setSession(null);
      router.replace('/login');
    },
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}