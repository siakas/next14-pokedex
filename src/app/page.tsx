import { getPokemonList } from '@/utils/getData'
import { Image, Link } from '@nextui-org/react'

interface Data {
  id: number
  image: string
  name: string
  url: string
}

const Home = async () => {
  const { results } = await getPokemonList()
  const pokemonList: Data[] = results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`,
    }
  })

  return (
    <div>
      <ul className="grid grid-cols-5 gap-5">
        {pokemonList.map((pokemon) => (
          <li className="text-center" key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <Image
                alt=""
                height={100}
                loading="lazy"
                src={pokemon.image}
                width={100}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
