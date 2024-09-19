import { useQuery } from '@tanstack/react-query'
import type { PokemonType } from '@/types'
import { getWeaknesses } from '@/utils/weaknesses'

export const useGetWeaknesses = (types: PokemonType[]) => {
  // 弱点情報を取得する useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['weaknesses', types],
    queryFn: () => getWeaknesses(types),
  })

  return {
    data,
    isLoading,
  }
}
