import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import { describe, expect, it } from "vitest";
import { pokemonById } from "../../fixtures/pokeapi";

describe("usePokemonDetailStore", () => {
  it("初期値は、データがなく、名前と分類が空", () => {
    const { actions: _actions, ...state } = usePokemonDetailStore.getState();

    expect(state).toEqual({
      pokemon: null,
      species: null,
      pokemonJaName: "",
      pokemonJaGenus: "",
      weaknesses: null,
      abilities: [],
    });
  });

  it("setPokemonData で、渡した項目だけを変える", () => {
    const pokemon = pokemonById[6];

    usePokemonDetailStore
      .getState()
      .actions.setPokemonData({ pokemon, pokemonJaName: "リザードン" });

    const { actions: _actions, ...state } = usePokemonDetailStore.getState();
    expect(state).toEqual({
      pokemon,
      species: null,
      pokemonJaName: "リザードン",
      pokemonJaGenus: "",
      weaknesses: null,
      abilities: [],
    });
  });
});
