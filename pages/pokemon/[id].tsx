import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetail } from "@/components/feature/pokemon-detail/PokemonDetail";
import { Controller } from "@/components/layout/Controller";
import Layout from "@/components/layout/Layout";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import {
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";

const PokemonDetailPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);

  const { setPokemonData } = usePokemonDetailStore((state) => ({
    setPokemonData: state.actions.setPokemonData,
  }));

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const [pokemon, species] = await Promise.all([
        getPokemonByPokemonId(id),
        getSpeciesByPokemonId(id),
      ]);
      const pokemonJaName = species ? getJaNameBySpecies(species) : "";
      const pokemonJaGenus = species ? getJaGenusBySpecies(species) : "";

      setPokemonData({ pokemon, species, pokemonJaName, pokemonJaGenus });

      // data として返すデータ
      return { pokemon, species, pokemonJaName, pokemonJaGenus };
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // ページ遷移で id が変わるたびに再取得する
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading || isError) return null;

  return (
    <Layout>
      <Controller isShowList={false} />

      <PokemonDetail />
    </Layout>
  );
};

export default PokemonDetailPage;
