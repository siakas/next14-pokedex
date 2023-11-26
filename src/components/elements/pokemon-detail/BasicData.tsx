import BasicDataTable from '@/components/elements/pokemon-detail/BasicDataTable'
import Heading from '@/components/elements/pokemon-detail/Heading'
import { Pokemon, Species } from '@/types'
import { getAbilities } from '@/utils/getAbilities'

interface Props {
  pokemon: Pokemon
  species: Species
}

const BasicData = async ({ pokemon, species }: Props) => {
  // 日本語名付きの特性を取得
  const abilities = await getAbilities(pokemon.abilities)

  return (
    <div className="rounded-lg dark:bg-transparent">
      <Heading>基礎データ</Heading>
      <BasicDataTable
        abilities={abilities}
        pokemon={pokemon}
        species={species}
      />
    </div>
  )
}

export default BasicData
