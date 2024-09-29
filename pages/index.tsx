import { PokemonList } from "@/components/feature/pokemon-index/PokemonList";
import { Controller } from "@/components/layout/Controller";
import Layout from "@/components/layout/Layout";
import { useGetPokemonList } from "@/hooks/useGetPokemonList";
import { Loader } from "lucide-react";

export default function Home() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonList();

  return (
    <Layout>
      <Controller />

      {isPokemonListLoading ? (
        <div className="flex h-screen justify-center pt-40">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>{pokemonList && <PokemonList pokemonList={pokemonList.results} />}</>
      )}
    </Layout>
  );
}
