import pokeApi from '@/api/pokeApi'
import { Pokedex, Pokemon, PokemonList, Species, Type } from '@/types'

// すべてのポケモン一覧を取得
export const getAllPokemons = async () => {
  try {
    const res = await pokeApi.get<Pokedex>('/pokedex/1')
    return res.data.pokemon_entries
  } catch (error) {
    throw error
  }
}

// 任意の件数ずつのポケモン一覧を取得
export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0,
) => {
  console.log(`/pokemon?limit=${limit}&offset=${offset}`)
  try {
    const res = await pokeApi.get<PokemonList>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    )
    return res.data
  } catch (error) {
    throw error
  }
}

// ポケモン名からポケモンデータ（特性、タイプ、技、画像等）を取得
export const getPokemonByPokemonName = async (name: string) => {
  try {
    const res = await pokeApi.get<Pokemon>(`/pokemon/${name}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// ポケモン名からポケモン種族情報（言語ごとの名称、フレーバーテキスト等）を取得
export const getSpeciesByPokemonName = async (name: string) => {
  try {
    const res = await pokeApi.get<Species>(`/pokemon-species/${name}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// タイプ名からタイプ詳細情報を取得
export const getDetailByTypeName = async (type: string) => {
  try {
    const res = await pokeApi.get<Type>(`/type/${type}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// 種族情報からポケモン日本語名を取得（例：リザードン）
export const getJaNameBySpecies = (species: Species): string => {
  const jaName = species.names.find((name) => name.language.name === 'ja-Hrkt')
  return jaName?.name ?? ''
}

// 種族情報からポケモン日本語分類名を取得（例：かえんポケモン）
export const getJaGenusBySpecies = (species: Species): string => {
  const jaGenus = species.genera.find(
    (genus) => genus.language.name === 'ja-Hrkt',
  )
  return jaGenus?.genus ?? ''
}
