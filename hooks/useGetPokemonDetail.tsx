import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import {
  getAbilityJaName,
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";
import { getWeaknesses } from "@/utils/weaknesses";
import { useQuery } from "@tanstack/react-query";

/**
 * ポケモン詳細情報を取得するカスタムフック
 * @param id ポケモンID
 * @returns ポケモン詳細情報のクエリ結果
 */
export const useGetPokemonDetail = (id: number) => {
  const setPokemonData = usePokemonDetailStore(
    (state) => state.actions.setPokemonData,
  );

  return useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: async () => {
      // ポケモン基本情報と種族情報を並行で取得
      const [pokemon, species] = await Promise.all([
        getPokemonByPokemonId(id),
        getSpeciesByPokemonId(id),
      ]);

      // ポケモンまたは種族情報が見つからない場合はエラーをスロー
      if (!pokemon || !species) {
        throw new Error(`ポケモンが見つかりません (ID: ${id})`);
      }

      // 日本語名と分類を取得
      const pokemonJaName = getJaNameBySpecies(species) ?? "";
      const pokemonJaGenus = getJaGenusBySpecies(species) ?? "";

      // タイプ相性による弱点を計算
      const weaknesses = await getWeaknesses(pokemon.types);

      // 特性の日本語名を取得
      const abilities = await Promise.all(
        pokemon.abilities.map(async (ability) => ({
          ...ability,
          jaName: (await getAbilityJaName(ability.ability.url)) ?? "",
        })),
      );

      // 取得したデータを整理
      const results = {
        pokemon,
        species,
        pokemonJaName,
        pokemonJaGenus,
        weaknesses,
        abilities,
      };

      // すべてのデータをストアに保存
      setPokemonData(results);

      // ここで返却したデータを data として取得できる
      return results;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
