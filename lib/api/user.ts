import { supabase } from '../supabase'

export async function createUserInDB(uuid: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        role_id: 1,
        onBoarding: false,
        uid: uuid,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function verifyUserInDB(uuid: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uuid)
    .single()

  if (error) throw error
  return data
}
