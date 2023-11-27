import PageNav from '@/components/elements/pokemon-list/PageNav'
import PokemonList from '@/components/elements/pokemon-list/PokemonList'

const Home = () => {
  return (
    <>
      <PageNav page={1} />
      <PokemonList />
    </>
  )
}

export default Home
