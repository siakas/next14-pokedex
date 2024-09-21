import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePokemonListStore } from "@/store/pokemonListStore";
import { getPokemonList } from "@/utils/pokemon";

export const useGetPokemonList = () => {
  const router = useRouter();
  const { currentPage, limit, setCurrentPage } = usePokemonListStore(
    (state) => ({
      currentPage: state.currentPage,
      limit: state.limit,
      setCurrentPage: state.actions.setCurrentPage,
    }),
  );

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [router.query.page, currentPage, setCurrentPage]);

  const offset = (currentPage - 1) * limit;

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      router.push(`/?page=${newPage}`, undefined, { shallow: true });
    }
  };

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    router.push(`/?page=${newPage}`, undefined, { shallow: true });
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
  };
};
