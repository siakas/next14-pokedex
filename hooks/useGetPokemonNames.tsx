import { useQuery } from "@tanstack/react-query";
import {
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";

export const useGetPokemonNames = (pokemonId: number) => {
  // ポケモン詳細情報を取得する useQuery
  const { data: pokemon, isLoading: isPokemonLoading } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonByPokemonId(pokemonId),
  });

  // ポケモン種族情報を取得する useQuery
  const { data: species, isLoading: isSpeciesLoading } = useQuery({
    queryKey: ["species", pokemonId],
    queryFn: () => getSpeciesByPokemonId(pokemonId),
  });

  /** すべてのデータが取得されたかどうか */
  const isLoading = isPokemonLoading || isSpeciesLoading;

  /** ポケモンの日本語名 */
  const pokemonJaName = species ? getJaNameBySpecies(species) : "";

  return {
    pokemon,
    species,
    pokemonJaName,
    isLoading,
  };
};
