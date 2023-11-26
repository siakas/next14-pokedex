import CaptureRateProgress from '@/components/elements/pokemon-detail/CaptureRateProgress'
import Heading from '@/components/elements/pokemon-detail/Heading'
import { Pokemon, Species } from '@/types'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '@nextui-org/react'

interface Props {
  pokemon: Pokemon
  species: Species
}

const CaptureRate = ({ pokemon, species }: Props) => {
  return (
    <div className="rounded-lg dark:bg-transparent">
      <div className="mx-auto flex flex-row items-center justify-start gap-x-2">
        <Heading>捕獲成功率</Heading>
        <Tooltip content="ポケモンの体力が最大の状態でポケモンボールを使用して捕獲する確率">
          <QuestionMarkCircleIcon className="mb-2 h-6 w-6 cursor-pointer" />
        </Tooltip>
      </div>
      <CaptureRateProgress
        captureRate={species.capture_rate}
        pokemonHP={pokemon.stats[0].base_stat}
      />
    </div>
  )
}

export default CaptureRate
