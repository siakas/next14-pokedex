import { useQuery } from '@tanstack/react-query'
import { usePokemonListStore } from '@/store/pokemonListStore'
import { getPokemonList } from '@/utils/pokemon'

export const useGetPokemonList = () => {
  const { offset, setOffset } = usePokemonListStore((state) => ({
    offset: state.offset,
    setOffset: state.actions.setOffset,
  }))
  const limit = 30 // 表示件数（TODO: Zustand で共通化したい）

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (offset === 0) return
    setOffset(offset - limit)
  }

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    setOffset(offset + limit)
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
    offset,
  }
}
