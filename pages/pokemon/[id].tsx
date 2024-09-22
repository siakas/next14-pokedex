import { useRouter } from "next/router";
import { useEffect } from "react";
import { PokemonDetail } from "@/components/feature/pokemon-detail/PokemonDetail";
import { Controller } from "@/components/layout/Controller";
import Layout from "@/components/layout/Layout";
import { useGetPokemonDetail } from "@/hooks/useGetPokemonDetail";

const PokemonDetailPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);

  const { data, isLoading, isError, refetch } = useGetPokemonDetail(id);

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
