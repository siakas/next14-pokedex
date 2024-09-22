import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Pokemon, Species } from "@/types";

/** ポケモン詳細で参照するデータを管理するストア */
type PokemonDetailStore = {
  /** ポケモン ID */
  pokemonId: number;
  /** ポケモン情報 */
  pokemon: Pokemon | null;
  /** ポケモン種族情報 */
  species: Species | null;
  /** ポケモン日本語名 */
  pokemonJaName: string | null;
  /** ポケモン日本語分類名 */
  pokemonJaGenus: string | null;

  actions: {
    setPokemonId: (id: number) => void;
    setPokemonData: (data: Partial<PokemonDetailStore>) => void;
  };
};

export const usePokemonDetailStore = create<PokemonDetailStore>()(
  devtools((set) => ({
    pokemonId: 0,
    pokemon: null,
    species: null,
    pokemonJaName: null,
    pokemonJaGenus: null,
    actions: {
      setPokemonId: (id) =>
        set({ pokemonId: id }, false, "PokemonDetail/setPokemonId"),
      setPokemonData: (data) =>
        set(data, false, "PokemonDetail/setPokemonData"),
    },
  })),
);
