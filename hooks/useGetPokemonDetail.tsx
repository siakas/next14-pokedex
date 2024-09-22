import { useQuery } from "@tanstack/react-query";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import {
  getAbilityJaName,
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getSpeciesByPokemonId,
} from "@/utils/pokemon";
import { getWeaknesses } from "@/utils/weaknesses";

export const useGetPokemonDetail = (id: number) => {
  const { setPokemonData } = usePokemonDetailStore((state) => ({
    setPokemonData: state.actions.setPokemonData,
  }));

  return useQuery({
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
};
