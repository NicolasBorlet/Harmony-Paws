import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase"
import { getFormationImageUrl } from "../utils/get-image-url"
import { FormationInterface } from "./types/interfaces"

export const getFormations = async () => {
  const { data, error } = await supabase.from('formations').select('*')
  if (error) throw error
  return data
}

export const getPaginatedFormations = async (
  page: number = 0,
  pageSize: number = 10,
) => {
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('formations')
    .select('id, animator_name, name, created_at, updated_at', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) throw error

  const formationsWithImages = await Promise.all(
    data?.map(async formation => ({
      ...formation,
      image: (await getFormationImageUrl(formation.id.toString())) || '',
      created_at: formation.created_at ? new Date(formation.created_at) : new Date(),
      updated_at: formation.updated_at ? new Date(formation.updated_at) : new Date(),
    })) || [],
  )

  return {
    formations: formationsWithImages as FormationInterface[],
    totalCount: count || 0,
    hasMore: (count || 0) > to + 1,
  }
}

export const usePaginatedFormations = (pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['formations', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getPaginatedFormations(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
  })
}

export const getFormationById = async (id: number) => {
  const { data, error } = await supabase.from('formations').select('*').eq('id', id).single()
  if (error) throw error

  return {
    ...data,
    image: await getFormationImageUrl(data.id.toString()),
    created_at: data.created_at ? new Date(data.created_at) : new Date(),
    updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
  }
}

export const useFormationById = (id: number) => {
  return useQuery({
    queryKey: ['formation', id],
    queryFn: () => getFormationById(id),
  })
}
