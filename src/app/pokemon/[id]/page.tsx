import PokemonDetail from '@/components/elements/pokemon-detail/PokemonDetail'
import { getPokemonByPokemonId, getSpeciesByPokemonId } from '@/utils/getData'
import { notFound } from 'next/navigation'

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const pageId: number = parseInt(id) // pokemonId に渡せる number 型に変換

  // params.id からポケモン情報と種族情報を取得
  const [pokemon, species] = await Promise.all([
    getPokemonByPokemonId(pageId),
    getSpeciesByPokemonId(pageId),
  ])

  // データを取得できなければ Not Found を表示
  if (pokemon === null || species === null) return notFound()

  return <PokemonDetail pokemon={pokemon} species={species} />
}

export default PokemonDetailPage
