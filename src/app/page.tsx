import { getAllPokemons } from '@/utils/getData'
import { Image, Link } from '@nextui-org/react'

interface Data {
  entry_number: number
  id: number
  image: string
  pokemon_species: {
    name: string
    url: string
  }
}

const Home = async () => {
  const data = await getAllPokemons()
  const pokemonList: Data[] = data.map((pokemon, index) => {
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
      Home
      <ul className="grid grid-cols-5 gap-5">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.pokemon_species.name}
            <br />
            <Link href={`/pokemon/${pokemon.pokemon_species.name}`}>
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
