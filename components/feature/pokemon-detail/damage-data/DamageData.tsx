import { DamageDataList } from '@/components/feature/pokemon-detail/damage-data/DamageDataList'
import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { Heading } from '@/components/feature/pokemon-detail/Heading'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetWeaknesses } from '@/hooks/useGetWeaknesses'
import type { Pokemon } from '@/types'

type Props = {
  pokemon: Pokemon
}

export const DamageData = ({ pokemon }: Props) => {
  const { data: weaknesses, isLoading } = useGetWeaknesses(pokemon.types)

  if (!weaknesses) return null

  return (
    <div className="w-fit items-center justify-center lg:w-2/6 xl:w-2/6">
      <Heading>タイプ相性による弱点</Heading>
      <DataCard>
        {isLoading ? (
          <Skeleton className="h-12 w-full bg-gray-600" />
        ) : (
          <DamageDataList weaknesses={weaknesses} />
        )}
      </DataCard>
    </div>
  )
}
