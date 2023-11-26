import { PokemonType } from '@/types'
import { getDetailByTypeName } from '@/utils/getData'
import { fromPairs } from 'lodash-es'

// すべてのタイプを定義
const allTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

export type MultipliersObject = {
  [K in (typeof allTypes)[number]]: number
}

// タイプから弱点相性を取得
export const getWeaknesses = async (
  types: PokemonType[],
): Promise<MultipliersObject> => {
  // タイプ相性による弱点を取得するオブジェクトを初期化
  const initialMultipliers = fromPairs(
    allTypes.map((type) => [type, 1]),
  ) as MultipliersObject

  // ダメージ計算をおこなう関数を定義
  const applyDamage = (
    damageType: { name: string; url: string }[],
    multiplier: number,
  ) => {
    damageType.forEach(({ name }) => {
      initialMultipliers[name] *= multiplier
    })
  }

  // 弱点相性の計算処理（タイプ詳細の配列を作成）
  const typeDetails =
    types.length > 1
      ? await Promise.all(
          types.map(({ type }) => getDetailByTypeName(type.name)),
        )
      : [await getDetailByTypeName(types[0].type.name)]

  typeDetails.forEach((typeData) => {
    applyDamage(typeData.damage_relations.double_damage_from, 2)
    applyDamage(typeData.damage_relations.half_damage_from, 0.5)
    applyDamage(typeData.damage_relations.no_damage_from, 0)
  })

  return initialMultipliers
}
