import pokeApi from '@/api/pokeApi'
import { Ability, PokemonAbility } from '@/types'

// 特性の詳細情報と日本語名を取得する非同期関数
const getJaAbilityName = async (url: string): Promise<string | undefined> => {
  try {
    const { data } = await pokeApi.get<Ability>(url)
    const jaName = data.names.find((name) => name.language.name === 'ja-Hrkt')
      ?.name
    return jaName
  } catch (error) {
    throw error
  }
}

// 日本語の特性名を追加した特性の詳細情報を取得
export const getAbilities = async (
  abilities: PokemonAbility[],
): Promise<PokemonAbility[]> => {
  return Promise.all(
    abilities.map(async (ability) => ({
      ...ability,
      jaName: await getJaAbilityName(ability.ability.url),
    })),
  )
}
