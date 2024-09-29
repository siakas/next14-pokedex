import { DexNumber } from "@/components/feature/pokemon-detail/DexNumber";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const commonButtonStyle =
  "bg-blue-500 text-white hover:bg-blue-700 dark:bg-neutral-800 dark:hover:bg-neutral-700";

export const PokemonDetailHeader = () => {
  const { pokemon } = usePokemonDetailStore((state) => ({
    pokemon: state.pokemon,
  }));

  const dexNumber = `#${pokemon?.id.toString().padStart(4, "0")}`;

  const id = pokemon?.id ?? 1;

  const prevId = Math.max(1, id - 1);
  const nextId = id + 1;

  return (
    <div className="flex justify-between">
      <Button
        asChild
        size="icon"
        className={cn(
          commonButtonStyle,
          id === 1 && "pointer-events-none opacity-0 invisible",
        )}
      >
        <Link href={`/pokemon/${prevId}`}>
          <ChevronLeft className="size-6" />
        </Link>
      </Button>

      {/* 図鑑番号 */}
      <DexNumber dexNumber={dexNumber} />

      <Button asChild size="icon" className={cn(commonButtonStyle)}>
        <Link href={`/pokemon/${nextId}`}>
          <ChevronRight className="size-6" />
        </Link>
      </Button>
    </div>
  );
};
