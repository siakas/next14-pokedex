import Card from '@/components/elements/pokemon-list/Card'
import { getPokemonList } from '@/utils/getData'

interface Props {
  limit: number
  offset: number
}

const PokemonList = async ({ limit = 30, offset = 0 }) => {
  const { results } = await getPokemonList(limit, offset)

  return (
    <div className="mt-4 w-full rounded-lg border border-black-900 px-2 py-8 dark:bg-black-900 sm:px-7 md:px-14">
      <ul className="grid grid-cols-5 gap-3">
        {results.map((pokemon) => (
          <Card key={pokemon.name} pokemonName={pokemon.name} />
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
