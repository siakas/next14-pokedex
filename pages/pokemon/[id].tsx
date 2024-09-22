import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetail } from "@/components/feature/pokemon-detail/PokemonDetail";
import { Controller } from "@/components/layout/Controller";
import Layout from "@/components/layout/Layout";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import {
  getAbilityJaName,
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";
import { getWeaknesses } from "@/utils/weaknesses";

const PokemonDetailPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);

  const { setPokemonData } = usePokemonDetailStore((state) => ({
    setPokemonData: state.actions.setPokemonData,
  }));

  // ポケモン詳細情報をまとめて取得
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: async () => {
      const [pokemon, species] = await Promise.all([
        getPokemonByPokemonId(id),
        getSpeciesByPokemonId(id),
      ]);
      const pokemonJaName = species ? getJaNameBySpecies(species) : "";
      const pokemonJaGenus = species ? getJaGenusBySpecies(species) : "";
      const weaknesses = pokemon ? await getWeaknesses(pokemon.types) : null;
      const abilities = pokemon
        ? await Promise.all(
            pokemon.abilities.map(async (ability) => ({
              ...ability,
              jaName: await getAbilityJaName(ability.ability.url),
            })),
          )
        : [];

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

      // data として返すデータ
      return results;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // ページ遷移で id が変わるたびに再取得する
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!data) return null;

  return (
    <Layout title={data?.pokemonJaName}>
      <Controller isShowList={false} />
      <PokemonDetail />
    </Layout>
  );
};

export default PokemonDetailPage;
