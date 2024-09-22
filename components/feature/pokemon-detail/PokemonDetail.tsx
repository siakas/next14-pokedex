import { BasicData } from "@/components/feature/pokemon-detail/basic-data/BasicData";
import { CaptureRate } from "@/components/feature/pokemon-detail/capture-rate/CaptureRate";
import { DamageData } from "@/components/feature/pokemon-detail/damage-data/DamageData";
import { HatchData } from "@/components/feature/pokemon-detail/hatch-data/HatchData";
import { MainInfo } from "@/components/feature/pokemon-detail/main-info/MainInfo";
import { OtherLang } from "@/components/feature/pokemon-detail/other-lang/OtherLang";
import { PokemonDetailHeader } from "@/components/feature/pokemon-detail/PokemonDetailHeader";
import { StatData } from "@/components/feature/pokemon-detail/stat-data/StatData";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";

export const PokemonDetail = () => {
  const { pokemon, species, pokemonJaName, pokemonJaGenus } =
    usePokemonDetailStore((state) => ({
      pokemon: state.pokemon,
      species: state.species,
      pokemonJaName: state.pokemonJaName,
      pokemonJaGenus: state.pokemonJaGenus,
    }));

  if (!pokemon || !species || !pokemonJaName || !pokemonJaGenus) return null;

  return (
    <div className="w-full rounded-lg border bg-slate-50 px-2 py-8 dark:border-black-900 dark:bg-black-900 sm:px-7 md:px-14">
      <PokemonDetailHeader />

      <div className="my-8 flex h-full w-auto flex-col justify-start sm:gap-y-4 md:items-start md:justify-center xl:flex-row xl:gap-x-10">
        {/* 基本情報 */}
        <MainInfo />

        <div className="flex w-full flex-col gap-10">
          <div className="flex size-full flex-col xl:flex-row xl:gap-x-6">
            {/* 基礎データ */}
            <BasicData pokemon={pokemon} species={species} />

            {/* 捕獲成功率 */}
            <CaptureRate />
          </div>

          <div className="flex size-full flex-col xl:flex-row xl:gap-x-6">
            {/* タマゴと性別 */}
            <HatchData />

            {/* 言語別の名称 */}
            <OtherLang />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row lg:items-start">
        {/* 種族値 */}
        <StatData />

        {/* タイプ相性による弱点 */}
        <DamageData pokemon={pokemon} />
      </div>
    </div>
  );
};
