import { DamageDataList } from "@/components/feature/pokemon-detail/damage-data/DamageDataList";
import { DataCard } from "@/components/feature/pokemon-detail/DataCard";
import { Heading } from "@/components/feature/pokemon-detail/Heading";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";

export const DamageData = () => {
  const { weaknesses } = usePokemonDetailStore((state) => ({
    weaknesses: state.weaknesses,
  }));

  if (!weaknesses) return null;

  return (
    <div className="w-fit items-center justify-center lg:w-2/6 xl:w-2/6">
      <Heading>タイプ相性による弱点</Heading>
      <DataCard>
        <DamageDataList weaknesses={weaknesses} />
      </DataCard>
    </div>
  );
};
