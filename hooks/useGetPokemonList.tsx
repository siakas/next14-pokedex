import { useQuery } from "@tanstack/react-query";
import { usePokemonListStore } from "@/store/pokemonListStore";
import { getPokemonList } from "@/utils/pokemon";

export const useGetPokemonList = () => {
  const { offset, limit, setOffset } = usePokemonListStore((state) => ({
    offset: state.offset,
    limit: state.limit,
    setOffset: state.setOffset,
  }));

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (offset === 0) return;
    setOffset(offset - limit);
  };

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    setOffset(offset + limit);
  };

  // ポケモン一覧をオフセットごとに取得する useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: () => getPokemonList(offset, limit),
  });

  return {
    data,
    isLoading,
    handlePrevButton,
    handleNextButton,
    offset,
    limit,
  };
};
