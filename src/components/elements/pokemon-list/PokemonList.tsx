import Card from '@/components/elements/pokemon-list/Card'
import { PokemonListResult } from '@/types'

interface Props {
  pokemonList: PokemonListResult[]
}

const PokemonList = async ({ pokemonList }: Props) => {
  return (
    <div className="mt-4 w-full rounded-lg border border-black-900 px-2 py-8 dark:bg-black-900 sm:px-7 md:px-14">
      <ul className="grid grid-cols-5 gap-3">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemonId={pokemon.id} />
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
