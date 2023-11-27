import { getPokemonList } from '@/utils/getData'
import { Image } from '@nextui-org/react'
import Link from 'next/link'

interface Data {
  id: number
  image: string
  name: string
  url: string
}

interface Props {
  limit: number
  offset: number
}

const PokemonList = async ({ limit = 20, offset = 0 }) => {
  const { results } = await getPokemonList(limit, offset)
  const pokemonList: Data[] = results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + offset + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + offset + 1
      }.png`,
    }
  })

  return (
    <div className="mt-10 w-full rounded-lg border border-black-900 px-2 py-8 dark:bg-black-900 sm:px-7 md:px-14">
      <ul className="grid grid-cols-5 gap-5">
        {pokemonList.map((pokemon) => (
          <li className="text-center" key={pokemon.id}>
            <Link
              className="flex aspect-square w-full flex-col items-center justify-center rounded-lg bg-gray-700 text-inherit"
              href={`/pokemon/${pokemon.name}`}
            >
              <Image
                alt=""
                height={120}
                loading="lazy"
                src={pokemon.image}
                width={120}
              />
              <p className="mt-2 text-lg font-semibold">{pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
