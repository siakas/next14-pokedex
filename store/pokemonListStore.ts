import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

/** ポケモン一覧取得に関する設定を管理するストア */
type usePokemonListStore = {
  /** 一覧の取得位置 */
  offset: number;
  /** 一度に取得する件数 */
  limit: number;

  actions: {
    setOffset: (offset: number) => void;
    setLimit: (limit: number) => void;
  };
};

export const usePokemonListStore = create<usePokemonListStore>()(
  devtools(
    persist(
      (set) => ({
        offset: 0,
        limit: 30,
        actions: {
          setOffset: (offset) => set({ offset }),
          setLimit: (limit) => set({ limit }),
        },
      }),
      {
        name: "pokemonListStore",
        storage: createJSONStorage(() => sessionStorage),

        // offset と limit のみを永続化し、actions を除外する
        // これにより、以下の問題を回避:
        // 1. リロード後の actions の機能喪失を防ぐ
        // 2. JSON シリアライズ不可能な関数オブジェクトの永続化を避ける
        // 3. ストアの初期化時に常に新しい actions が作成されることを保証
        partialize: (state) => ({ offset: state.offset, limit: state.limit }),
      },
    ),
  ),
);
