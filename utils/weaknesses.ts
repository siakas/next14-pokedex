import { flow, fromPairs, reduce } from "lodash-es";
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
  return reduce(
    damageRelation,
    (acc, { name }) => ({
      ...acc,
      [name]: acc[name as keyof MultipliersObject] * multiplier,
    }),
    multipliers,
  );
};

export const getWeaknesses = async (
  types: PokemonType[],
): Promise<MultipliersObject> => {
  try {
    const multipliers = fromPairs(
      allTypes.map((type) => [type, 1]),
    ) as MultipliersObject;

    const typeDetails = await Promise.all(
      types.map(({ type }) => getTypeDetailByTypeName(type.name)),
    );

    return reduce(
      typeDetails,
      (acc, typeData) => {
        const applyDamageRelations = flow(
          (m: MultipliersObject) =>
            applyDamageRelation(
              m,
              typeData.damage_relations.double_damage_from,
              2,
            ),
          (m: MultipliersObject) =>
            applyDamageRelation(
              m,
              typeData.damage_relations.half_damage_from,
              0.5,
            ),
          (m: MultipliersObject) =>
            applyDamageRelation(m, typeData.damage_relations.no_damage_from, 0),
        );

        return applyDamageRelations(acc);
      },
      multipliers,
    );
  } catch (error) {
    console.error("Error calculating weaknesses:", error);
    throw error;
  }
};
