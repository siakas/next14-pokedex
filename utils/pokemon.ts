import type { PokemonListAPIResponse } from '@/types/pokemon'

/**
 * ポケモン一覧の取得
 */
export const getAllPokemon = async (url: string, offset: number = 0) => {
  try {
    const res = await fetch(`${url}?offset=${offset}&limit=20`)
    const data: PokemonListAPIResponse = await res.json()
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
