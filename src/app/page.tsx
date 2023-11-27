import PokemonList from '@/components/elements/pokemon-list/PokemonList'

interface Data {
  id: number
  image: string
  name: string
  url: string
}

const Home = () => {
  return <PokemonList />
}

export default Home
