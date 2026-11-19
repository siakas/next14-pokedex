import { usePokemonListStore } from "@/store/pokemonListStore";
import { describe, expect, it } from "vitest";

const STORAGE_KEY = "PokemonListStore";

/** sessionStorage に保存された状態を読む */
const readPersistedState = (): unknown => {
  const value = sessionStorage.getItem(STORAGE_KEY);
  return value === null ? null : JSON.parse(value).state;
};

describe("usePokemonListStore", () => {
  it("初期値は 1 ページ目・30 件", () => {
    const { currentPage, limit } = usePokemonListStore.getState();
    expect({ currentPage, limit }).toEqual({ currentPage: 1, limit: 30 });
  });

  it("setCurrentPage でページ番号を変える", () => {
    usePokemonListStore.getState().actions.setCurrentPage(3);
    expect(usePokemonListStore.getState().currentPage).toBe(3);
  });

  it("setLimit で表示件数を変える", () => {
    usePokemonListStore.getState().actions.setLimit(50);
    expect(usePokemonListStore.getState().limit).toBe(50);
  });

  it("sessionStorage には currentPage と limit だけを保存する", () => {
    const { actions } = usePokemonListStore.getState();

    actions.setCurrentPage(2);
    actions.setLimit(100);

    expect(readPersistedState()).toEqual({ currentPage: 2, limit: 100 });
  });
});
