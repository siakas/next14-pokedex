import { usePokemonListStore } from "@/store/pokemonListStore";
import { getPokemonList } from "@/utils/pokemon";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

/**
 * カスタムフック：ポケモンリストの取得と管理を行う
 * URLのクエリパラメータとストアの状態を同期させ、ページネーションを制御する
 */
export const useGetPokemonList = () => {
  const router = useRouter();
  const { currentPage, limit, setCurrentPage } = usePokemonListStore(
    (state) => ({
      currentPage: state.currentPage,
      limit: state.limit,
      setCurrentPage: state.actions.setCurrentPage,
    }),
  );

  // URL のクエリパラメータとストアの状態を同期
  useEffect(() => {
    const page = Number(router.query.page) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [router.query.page, currentPage, setCurrentPage]);

  // 現在のページに基づいてオフセットを計算
  const offset = (currentPage - 1) * limit;

  /**
   * ページ変更時の処理
   * @param newPage 新しいページ番号
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      router.push(`/?page=${newPage}`, undefined, { shallow: true });
    },
    [setCurrentPage, router],
  );

  /** 前のページへ移動 */
  const handlePrevButton = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  /** 次のページへ移動 */
  const handleNextButton = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  // ポケモン一覧をオフセットごとに取得する useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: () => getPokemonList(offset, limit),
    staleTime: 5 * 60 * 1000, // 5 分間はデータを fresh とみなす
  });

  return {
    data,
    isLoading,
    handlePrevButton,
    handleNextButton,
  };
};
