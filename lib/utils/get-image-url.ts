import { supabase } from '../supabase'

export const getImageUrl = async (dogId: string) => {
  const { data } = await supabase.storage
    .from('dogs')
    .list(dogId)

  if (!data?.length) return null

  const { data: { publicUrl } } = supabase.storage
    .from('dogs')
    .getPublicUrl(`${dogId}/${data[0].name}`)

  return publicUrl
}
