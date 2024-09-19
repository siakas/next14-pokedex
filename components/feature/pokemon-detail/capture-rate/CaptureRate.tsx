import { CaptureRateProgress } from '@/components/feature/pokemon-detail/capture-rate/CaptureRateProgress'
import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { Heading } from '@/components/feature/pokemon-detail/Heading'
import type { Pokemon, Species } from '@/types'

type Props = {
  pokemon: Pokemon
  species: Species
}

export const CaptureRate = ({ pokemon, species }: Props) => {
  return (
    <div className="w-full lg:w-2/6">
      <Heading>捕獲成功率</Heading>
      <DataCard>
        <CaptureRateProgress
          captureRate={species.capture_rate}
          pokemonHP={pokemon.stats[0].base_stat}
        />
      </DataCard>
    </div>
  )
}
