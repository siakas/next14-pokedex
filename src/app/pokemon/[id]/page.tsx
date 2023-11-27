import PokemonDetail from '@/components/elements/pokemon-detail/PokemonDetail'

const PokemonDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const pageId: number = parseInt(id) // pokemonId に渡せる number 型に変換

  return <PokemonDetail pokemonId={pageId} />
}

export default PokemonDetailPage
