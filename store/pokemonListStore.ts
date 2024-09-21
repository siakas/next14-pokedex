import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

/** ポケモン一覧取得に関する設定を管理するストア */
type usePokemonListStore = {
  /** 現在のページ番号 */
  currentPage: number;
  /** 一度に取得する件数 */
  limit: number;

  actions: {
    setCurrentPage: (page: number) => void;
    setLimit: (limit: number) => void;
  };
};

export const usePokemonListStore = create<usePokemonListStore>()(
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
