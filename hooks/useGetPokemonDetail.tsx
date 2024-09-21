import { useQuery } from "@tanstack/react-query";
import {
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";

export const useGetPokemonDetail = (pokemonId: number) => {
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
  const pokemonJaName = species ? getJaNameBySpecies(species) : undefined;

  /** ポケモンの日本語分類名 */
  const pokemonJaGenus = species ? getJaGenusBySpecies(species) : undefined;

  return {
    pokemon,
    species,
    pokemonJaName,
    pokemonJaGenus,
    isLoading,
  };
};
