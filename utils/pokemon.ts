import { pokeApi } from '@/pages/api/pokeApi'
import type { PokemonList } from '@/types/pokemon'

/**
 * 任意の件数ごとのポケモン一覧を取得
 */
export const getPokemonList = async (offset: number = 0) => {
  const limit = 30 // 表示件数

  try {
    const res = await pokeApi.get<PokemonList>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    )

    // 取得したポケモン一覧にそれぞれのポケモンの id を設定した新たな配列を作成
    const _res = {
      ...res.data,
      results: res.data.results.map((pokemon) => {
        return {
          ...pokemon,
          id: parseInt(pokemon.url.split('/').slice(-2)[0]),
        }
      }),
    }

    return _res
  } catch (error) {
    throw error
  }
}

/**
 * ポケモン一覧の取得
 */
export const getAllPokemon = async (url: string, offset: number = 0) => {
  try {
    const res = await fetch(`${url}?offset=${offset}&limit=30`)
    const data: PokemonList = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * ポケモンの詳細情報の取得
 */
export const getPokemon = async (url: string) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
