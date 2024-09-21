import { useQueries } from "@tanstack/react-query";
import { pokeApi } from "@/pages/api/pokeApi";
import type { PokemonAbility } from "@/types";
import type { Ability } from "@/types/ability";

/** 特性の日本語表記を取得する非同期関数
 * @param url - 特性データを取得するための URL
 * @returns 特性の日本語表記（見つからない場合は undefined）
 */
const getAbilityJaName = async (url: string): Promise<string | undefined> => {
  try {
    const { data } = await pokeApi.get<Ability>(url);
    // 日本語表記を検索して返す
    return data.names.find((name) => name.language.name === "ja-Hrkt")?.name;
  } catch (error) {
    throw error;
  }
};

/** ポケモンの特性情報を取得し、日本語表記を追加して返すカスタムフック
 * @param abilities - 取得したい特性の配列
 * @returns 日本語表記が追加された特性情報、ローディング状態、エラー情報を含むオブジェクト
 */
export const useGetAbilities = (abilities: PokemonAbility[]) => {
  // 各特性に対して並行してクエリを実行
  // useQueries は複数のデータフェッチング操作を並行して行うためのフック
  const abilityQueries = useQueries({
    queries: abilities.map((i) => ({
      queryKey: ["ability", i.ability.url], // クエリのキーはクエリごとに一意であるように指定する
      queryFn: () => getAbilityJaName(i.ability.url),
    })),
  });

  // クエリの状態を確認
  const isLoading = abilityQueries.some((query) => query.isLoading);
  const isError = abilityQueries.some((query) => query.isError);
  const error = abilityQueries.find((query) => query.isError)?.error;

  // 日本語表記を追加したデータに加工する
  const data =
    !isLoading && !isError
      ? abilities.map((i, index) => ({
          ...i,
          jaName: abilityQueries[index].data,
        }))
      : undefined;

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
