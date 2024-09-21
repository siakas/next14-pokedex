import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPokemonList } from "@/hooks/useGetPokemonList";
import { cn } from "@/lib/utils";
import { usePokemonListStore } from "@/store/pokemonListStore";

export const PageNavigation = () => {
  const { handlePrevButton, handleNextButton } = useGetPokemonList();
  const { currentPage, limit } = usePokemonListStore((state) => ({
    currentPage: state.currentPage,
    limit: state.limit,
  }));

  const commonButtonStyle =
    "bg-blue-500 text-white hover:bg-blue-700 dark:bg-neutral-800 dark:hover:bg-neutral-700";

  return (
    <div className="flex gap-3">
      <Button
        onClick={handlePrevButton}
        className={cn(commonButtonStyle, currentPage === 1 && "hidden")}
      >
        <ChevronLeft className="mr-2 size-5" />
        前の{limit}件
      </Button>
      <Button onClick={handleNextButton} className={cn(commonButtonStyle)}>
        次の{limit}件
        <ChevronRight className="ml-2 size-5" />
      </Button>
    </div>
  );
};
