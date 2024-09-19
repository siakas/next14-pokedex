import { Card } from '@/components/feature/pokemon-index/Card'
import type { PokemonListResult } from '@/types/pokemon'

type Props = {
  pokemonList: PokemonListResult[]
}

export const PokemonList = ({ pokemonList }: Props) => {
  return (
    <div className="w-full rounded-lg border bg-slate-50 px-2 py-8 dark:border-black-900 dark:bg-black-900 sm:px-7 md:px-14">
      <div className="grid grid-cols-5 gap-3">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.id} pokemonId={pokemon.id} />
        ))}
      </div>
    </div>
  )
}
