import Card from '@/components/elements/pokemon-list/Card'
import { getPokemonList } from '@/utils/getData'

interface Props {
  limit: number
  offset: number
}

interface ListItem {
  id: number
  name: string
  url: string
}

const PokemonList = async ({ limit = 30, offset = 0 }) => {
  const { results } = await getPokemonList(limit, offset)

  // 取得したポケモン一覧にそれぞれ id を設定した新たな配列を作成
  const pokemonList: ListItem[] = results.map((pokemon) => {
    return {
      ...pokemon,
      id: parseInt(pokemon.url.split('/').slice(-2)[0]), // pokemonId に渡せる number 型に変換
    }
  })

  return (
    <div className="mt-4 w-full rounded-lg border border-black-900 px-2 py-8 dark:bg-black-900 sm:px-7 md:px-14">
      <ul className="grid grid-cols-5 gap-3">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemonId={pokemon.id} />
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
