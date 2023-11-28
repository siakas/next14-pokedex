import PageNav from '@/components/elements/pokemon-list/PageNav'
import PokemonList from '@/components/elements/pokemon-list/PokemonList'
import { getPokemonList } from '@/utils/getData'
import { notFound } from 'next/navigation'

const PageDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const pageId: number = Number(id)

  // offset の値をページ番号から取得
  const offset: number = (pageId - 1) * 30

  // ポケモン一覧を取得。取得できない場合は Not Found へ飛ばす
  const { results } = await getPokemonList(offset)
  if (!results.length) return notFound()

  // 取得したポケモン一覧にそれぞれ id を設定した新たな配列を作成
  const pokemonList = results.map((pokemon) => {
    return {
      ...pokemon,
      id: parseInt(pokemon.url.split('/').slice(-2)[0]), // pokemonId に渡せる number 型に変換
    }
  })

  return (
    <>
      <PageNav page={pageId} />
      <PokemonList pokemonList={pokemonList} />
    </>
  )
}

export default PageDetail
