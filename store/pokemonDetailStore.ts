import type { Pokemon, PokemonAbility, Species } from "@/types";
import type { MultipliersObject } from "@/utils/weaknesses";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/** ポケモン詳細で参照するデータを管理するストア */
type PokemonDetailStore = {
  pokemon: Pokemon | null;
  species: Species | null;
  pokemonJaName: string;
  pokemonJaGenus: string;
  weaknesses: MultipliersObject | null;
  abilities: PokemonAbility[];

  actions: {
    setPokemonData: (data: Partial<PokemonDetailStore>) => void;
  };
};

export const usePokemonDetailStore = create<PokemonDetailStore>()(
  devtools((set) => ({
    pokemon: null,
    species: null,
    pokemonJaName: "",
    pokemonJaGenus: "",
    weaknesses: null,
    abilities: [],
    actions: {
      setPokemonData: (data) =>
        set(data, false, "PokemonDetail/setPokemonData"),
    },
  })),
);
