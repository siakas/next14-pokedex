import { DamageData } from '@/components/feature/pokemon-detail/damage-data/DamageData'
import { DexNumber } from '@/components/feature/pokemon-detail/DexNumber'
import { MainInfo } from '@/components/feature/pokemon-detail/main-info/MainInfo'
import { StatData } from '@/components/feature/pokemon-detail/stat-data/StatData'
import type { Pokemon } from '@/types/pokemon'
import type { Species } from '@/types/species'

type Props = {
  pokemon: Pokemon
  species: Species
  pokemonJaName: string
  pokemonJaGenus: string
}

export const PokemonDetail = ({
  pokemon,
  species,
  pokemonJaName,
  pokemonJaGenus,
}: Props) => {
  /** 図鑑番号 */
  const dexNumber = `#${pokemon.id.toString().padStart(4, '0')}`

  return (
    <div className="w-full rounded-lg border bg-slate-50 px-2 py-8 dark:border-black-900 dark:bg-black-900 sm:px-7 md:px-14">
      {/* 図鑑番号 */}
      <DexNumber dexNumber={dexNumber} />

      <div className="my-8 flex h-full w-auto flex-col justify-start sm:gap-y-4 md:items-start md:justify-center xl:flex-row xl:gap-x-10">
        {/* 基本情報 */}
        <MainInfo
          pokemon={pokemon}
          species={species}
          pokemonJaName={pokemonJaName}
          pokemonJaGenus={pokemonJaGenus}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row lg:items-start">
        {/* 種族値 */}
        <StatData pokemon={pokemon} />

        {/* タイプ相性による弱点 */}
        <DamageData pokemon={pokemon} />
      </div>
    </div>
  )
}