import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

/** ポケモン一覧取得に関する設定を管理するストア */
type usePokemonListStore = {
  /** 一覧の取得位置 */
  offset: number;
  /** 一度に取得する件数 */
  limit: number;

  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
};

export const usePokemonListStore = create<usePokemonListStore>()(
  devtools(
    persist(
      (set) => ({
        offset: 0,
        limit: 30,
        setOffset: (offset) => set({ offset }),
        setLimit: (limit) => set({ limit }),
      }),
      {
        name: "pokemonListStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
