import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '@/utils/pokemon'

export const useGetPokemonList = () => {
  const [offset, setOffset] = useState(0)
  const limit = 30 // 表示件数（TODO: Zustand で共通化したい）

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (offset === 0) return
    setOffset((prev) => prev - limit)
  }

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    setOffset((prev) => prev + limit)
  }

  // ポケモン一覧をオフセットごとに取得する useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => getPokemonList(offset),
  })

  return {
    data,
    isLoading,
    handlePrevButton,
    handleNextButton,
  }
}
