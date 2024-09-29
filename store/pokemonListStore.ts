import type { LIMIT_OPTIONS } from "@/consts/limit";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

/** 表示件数の種類 */
export type Limit = (typeof LIMIT_OPTIONS)[number];

/** ポケモン一覧取得に関する設定を管理するストア */
type PokemonListStore = {
  /** 現在のページ番号 */
  currentPage: number;
  /** 一度に取得する件数 */
  limit: Limit;

  actions: {
    setCurrentPage: (page: number) => void;
    setLimit: (limit: Limit) => void;
  };
};

export const usePokemonListStore = create<PokemonListStore>()(
  devtools(
    persist(
      (set) => ({
        currentPage: 1,
        limit: 30,
        actions: {
          setCurrentPage: (page) =>
            set({ currentPage: page }, false, "PokemonList/setCurrentPage"),
          setLimit: (limit) => set({ limit }, false, "PokemonList/setLimit"),
        },
      }),
      {
        name: "PokemonListStore",
        storage: createJSONStorage(() => sessionStorage),

        // currentPage と limit のみを永続化し、actions を除外する
        // これにより、以下の問題を回避:
        // 1. リロード後の actions の機能喪失を防ぐ
        // 2. JSON シリアライズ不可能な関数オブジェクトの永続化を避ける
        // 3. ストアの初期化時に常に新しい actions が作成されることを保証
        partialize: (state) => ({
          currentPage: state.currentPage,
          limit: state.limit,
        }),
      },
    ),
  ),
);
