import { Button } from "@/components/ui/button";
import { usePokemonListStore } from "@/store/pokemonListStore";
import Link from "next/link";

export const BackToList = () => {
  const { currentPage } = usePokemonListStore((state) => ({
    currentPage: state.currentPage,
  }));

  return (
    <Button
      asChild
      className="bg-blue-500 text-white hover:bg-blue-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      <Link href={`/?page=${currentPage}`}>一覧へ戻る</Link>
    </Button>
  );
};
