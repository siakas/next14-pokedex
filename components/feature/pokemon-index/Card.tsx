import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { SkeletonCard } from "@/components/feature/pokemon-index/SkeletonCard";
import { useGetPokemonDetail } from "@/hooks/useGetPokemonDetail";
import { typesMapping } from "@/utils/translator";

type Props = {
  pokemonId: number;
};

export const Card = ({ pokemonId }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { pokemon, pokemonJaName, isLoading } = useGetPokemonDetail(pokemonId);

  return (
    <div className="text-center">
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <Link
          href={`/pokemon/${pokemon?.id}`}
          className="relative flex aspect-square w-full flex-col items-center justify-center rounded-lg bg-gray-200 text-inherit transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <h1 className="absolute right-1 top-1 text-xs font-semibold text-gray-400">
            #{pokemon?.id.toString().padStart(4, "0")}
          </h1>
          <Image
            src={pokemon?.sprites.other["official-artwork"].front_default ?? ""}
            width={90}
            height={90}
            alt=""
            loading="lazy"
            onLoadingComplete={() => setImageLoaded(true)}
            className={clsx(
              "transition-opacity duration-150",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
          />
          <p className="mt-3 text-sm font-bold">{pokemonJaName}</p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row">
            {pokemon?.types.map((type) => (
              <span
                key={type.slot}
                className={clsx(
                  "text-shadow mb-1 block w-[4.6rem] rounded py-1 text-center text-xs font-bold leading-normal text-white",
                  `bg-${type.type.name}`,
                )}
              >
                {typesMapping[type.type.name]}
              </span>
            ))}
          </div>
        </Link>
      )}
    </div>
  );
};
