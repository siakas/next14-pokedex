import { create } from 'zustand'

/** ポケモン一覧取得に関する設定を管理するストア */
type usePokemonListStore = {
  /** 一覧の取得位置 */
  offset: number
  actions: {
    setOffset: (offset: number) => void
  }
}

export const usePokemonListStore = create<usePokemonListStore>()((set) => ({
  offset: 0,
  actions: {
    setOffset: (offset) => set({ offset }),
  },
}))
