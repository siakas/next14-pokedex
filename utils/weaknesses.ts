import type { PokemonType } from "@/types";
import { getTypeDetailByTypeName } from "@/utils/pokemon";

/** すべてのポケモンタイプ */
const allTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type MultipliersObject = {
  [K in (typeof allTypes)[number]]: number;
};

const applyDamageRelation = (
  multipliers: MultipliersObject,
  damageRelation: { name: string; url: string }[],
  multiplier: number,
): MultipliersObject => {
  const result = { ...multipliers };
  for (const { name } of damageRelation) {
    result[name as keyof MultipliersObject] *= multiplier;
  }
  return result;
};

export const getWeaknesses = async (
  types: PokemonType[],
): Promise<MultipliersObject> => {
  try {
    const multipliers = Object.fromEntries(
      allTypes.map((type) => [type, 1]),
    ) as MultipliersObject;

    const typeDetails = await Promise.all(
      types.map(({ type }) => getTypeDetailByTypeName(type.name)),
    );

    return typeDetails.reduce((acc, typeData) => {
      const { double_damage_from, half_damage_from, no_damage_from } =
        typeData.damage_relations;
      const afterDouble = applyDamageRelation(acc, double_damage_from, 2);
      const afterHalf = applyDamageRelation(afterDouble, half_damage_from, 0.5);
      return applyDamageRelation(afterHalf, no_damage_from, 0);
    }, multipliers);
  } catch (error) {
    console.error("Error calculating weaknesses:", error);
    throw error;
  }
};
