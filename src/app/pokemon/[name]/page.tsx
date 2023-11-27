import PokemonDetail from '@/components/elements/pokemon-detail/PokemonDetail'

const PokemonDetailPage = ({ params }: { params: { name: string } }) => {
  const { name } = params

  return <PokemonDetail pokemonName={name} />
}

export default PokemonDetailPage
