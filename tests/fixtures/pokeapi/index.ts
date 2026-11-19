import type { Pokemon, Species, Type } from "@/types";
import type { Ability } from "@/types/ability";
import ability26 from "./ability/26.json";
import ability34 from "./ability/34.json";
import ability65 from "./ability/65.json";
import ability66 from "./ability/66.json";
import ability94 from "./ability/94.json";
import species1 from "./pokemon-species/1.json";
import species6 from "./pokemon-species/6.json";
import species92 from "./pokemon-species/92.json";
import pokemon1 from "./pokemon/1.json";
import pokemon6 from "./pokemon/6.json";
import pokemon92 from "./pokemon/92.json";
import fireType from "./type/fire.json";
import flyingType from "./type/flying.json";
import ghostType from "./type/ghost.json";
import grassType from "./type/grass.json";
import poisonType from "./type/poison.json";

/**
 * JSON のフィクスチャを検査するための型
 *
 * JSON を import すると文字列は string に、配列は通常の配列になるため、
 * 文字列リテラルの union を string に、tuple を配列に広げた型で検査する。
 * キーの欠けや構造の違いは検出できるが、値の誤り（タイプ名など）は検出できない。
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

/**
 * 実際の PokeAPI のレスポンスで null になるが、types/ の型が null を許さない項目を補う
 * （食い違いの詳細は README.md を参照）
 */
type SpeciesFixture = Widen<Omit<Species, "evolves_from_species">> & {
  evolves_from_species: Widen<Species["evolves_from_species"]> | null;
};

/**
 * types/ の型と実際の PokeAPI のレスポンスが食い違い、アプリも使っていない項目を補う
 * - past_abilities[].abilities[].ability：実際は null になる
 * - sprites.versions：実際はキーの名前と構成が型と違う（例：omega-ruby-alpha-sapphire）
 */
type PokemonFixture = Widen<Omit<Pokemon, "past_abilities" | "sprites">> & {
  past_abilities: {
    abilities: (Omit<
      Widen<Pokemon["past_abilities"][number]["abilities"][number]>,
      "ability"
    > & {
      ability: Widen<
        Pokemon["past_abilities"][number]["abilities"][number]["ability"]
      > | null;
    })[];
    generation: Widen<Pokemon["past_abilities"][number]["generation"]>;
  }[];
  sprites: Widen<Omit<Pokemon["sprites"], "versions">> & { versions: unknown };
};

const checkPokemon = (json: PokemonFixture) => json as Pokemon;
const checkSpecies = (json: SpeciesFixture) => json as Species;
const checkType = (json: Widen<Type>) => json as Type;
const checkAbility = (json: Widen<Ability>) => json as Ability;

/** ID ごとのポケモン（1 フシギダネ・6 リザードン・92 ゴース） */
export const pokemonById: Readonly<Record<number, Pokemon>> = {
  1: checkPokemon(pokemon1),
  6: checkPokemon(pokemon6),
  92: checkPokemon(pokemon92),
};

/** ID ごとのポケモン種族 */
export const speciesById: Readonly<Record<number, Species>> = {
  1: checkSpecies(species1),
  6: checkSpecies(species6),
  92: checkSpecies(species92),
};

/** タイプ名ごとのタイプ */
export const typeByName: Readonly<Record<string, Type>> = {
  fire: checkType(fireType),
  flying: checkType(flyingType),
  ghost: checkType(ghostType),
  grass: checkType(grassType),
  poison: checkType(poisonType),
};

/** 特性（ID で引く。PokeAPI は特性の URL を ID で返す） */
export const abilities: readonly Ability[] = [
  checkAbility(ability26),
  checkAbility(ability34),
  checkAbility(ability65),
  checkAbility(ability66),
  checkAbility(ability94),
];
