import PageNav from '@/components/elements/pokemon-list/PageNav'
import PokemonList from '@/components/elements/pokemon-list/PokemonList'
import { getPokemonList } from '@/utils/getData'

const Home = async () => {
  const { results } = await getPokemonList()

  // 取得したポケモン一覧にそれぞれポケモンの id を設定した新たな配列を作成
  const pokemonList = results.map((pokemon) => {
    return {
      ...pokemon,
      id: parseInt(pokemon.url.split('/').slice(-2)[0]), // pokemonId に渡せる number 型に変換
    }
  })

  return (
    <>
      <PageNav page={1} />
      <PokemonList pokemonList={pokemonList} />
    </>
  )
}

export default Home
