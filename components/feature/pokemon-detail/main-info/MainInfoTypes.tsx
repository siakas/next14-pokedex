import { Chip } from "@/components/feature/pokemon-detail/main-info/Chip";
import { cn } from "@/lib/utils";
import type { PokemonType } from "@/types";
import { typesMapping } from "@/utils/translator";

type Props = {
  types: PokemonType[];
};

export const MainInfoTypes = ({ types }: Props) => {
  return (
    <div className="flex flex-col-reverse items-center">
      <Chip>タイプ</Chip>
      <div className="mb-1 flex flex-col gap-1 sm:flex-row">
        {types.map((type) => (
          <span
            className={cn(
              "text-shadow mb-1 block w-[4.2rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white",
              `bg-${type.type.name}`,
            )}
            key={type.slot}
          >
            {typesMapping[type.type.name]}
          </span>
        ))}
      </div>
    </div>
  );
};
