import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase"

export const getBreeds = async () => {
  const { data, error } = await supabase.from('breeds').select('*')
  if (error) throw error
  return data
}

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: getBreeds,
  })
}

export const getBreedById = async (id: number) => {
  const { data, error } = await supabase.from('breeds').select('*').eq('id', id)
  if (error) throw error
  return data
}

export const useBreedById = (id: number) => {
  return useQuery({
    queryKey: ['breed', id],
    queryFn: () => getBreedById(id),
  })
}