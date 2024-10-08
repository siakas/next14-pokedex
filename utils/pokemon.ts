import { pokeApi } from "@/pages/api/pokeApi";
import type { Pokemon, PokemonList, Species, Type } from "@/types";
import type { Ability } from "@/types/ability";

/**
 * 任意の件数ごとのポケモン一覧を取得
 * @param offset 取得開始位置
 * @param limit 取得件数
 * @returns ポケモン一覧
 */
export const getPokemonList = async (offset = 0, limit = 30) => {
  try {
    const res = await pokeApi.get<PokemonList>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );

    // 取得したポケモン一覧にそれぞれのポケモンの id を設定した新たな配列を作成
    const _res = {
      ...res.data,
      results: res.data.results.map((pokemon) => {
        return {
          ...pokemon,
          id: Number.parseInt(pokemon.url.split("/").slice(-2)[0]),
        };
      }),
    };

    return _res;
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
};

/**
 * ポケモン ID からポケモン詳細情報を取得（特性、タイプ、技、画像等）を取得
 * @param id ポケモン ID
 * @returns ポケモン詳細情報
 */
export const getPokemonByPokemonId = async (id: number) => {
  try {
    const res = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
    return res.data;
  } catch {
    // データ取得がエラーの場合は null を返す
    return null;
  }
};

/**
 * ポケモン ID からポケモン種族情報（言語ごとの名称、フレーバーテキスト等）を取得
 * @param id ポケモン ID
 * @returns ポケモン種族情報
 */
export const getSpeciesByPokemonId = async (id: number) => {
  try {
    const res = await pokeApi.get<Species>(`/pokemon-species/${id}`);
    return res.data;
  } catch {
    // データ取得がエラーの場合は null を返す
    return null;
  }
};

/**
 * ポケモンのタイプ名からタイプ詳細情報を取得
 */
export const getTypeDetailByTypeName = async (type: string) => {
  try {
    const res = await pokeApi.get<Type>(`/type/${type}`);
    return res.data;
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
};

/**
 * 種族情報からポケモン日本語名を取得（例：リザードン）
 * @param species ポケモン種族情報
 * @returns ポケモン日本語名
 */
export const getJaNameBySpecies = (species: Species): string => {
  const jaName = species.names.find((name) => name.language.name === "ja-Hrkt");
  return jaName?.name ?? "";
};

/**
 * 種族情報からポケモン日本語分類名を取得（例：かえんポケモン）
 */
export const getJaGenusBySpecies = (species: Species): string => {
  const jaGenus = species.genera.find(
    (genus) => genus.language.name === "ja-Hrkt",
  );
  return jaGenus?.genus ?? "";
};

/**
 * 特性の日本語表記を取得
 * @param url 特性データを取得するための URL
 * @returns 特性の日本語表記（見つからない場合は undefined）
 */
export const getAbilityJaName = async (
  url: string,
): Promise<string | undefined> => {
  try {
    const { data } = await pokeApi.get<Ability>(url);
    // 日本語表記を検索して返す
    return data.names.find((name) => name.language.name === "ja-Hrkt")?.name;
  } catch (error) {
    console.error("Error fetching ability:", error);
    return undefined;
  }
};
