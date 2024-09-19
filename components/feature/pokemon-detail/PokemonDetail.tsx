import { BasicData } from '@/components/feature/pokemon-detail/basic-data/BasicData'
import { DamageData } from '@/components/feature/pokemon-detail/damage-data/DamageData'
import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { DexNumber } from '@/components/feature/pokemon-detail/DexNumber'
import { HatchData } from '@/components/feature/pokemon-detail/hatch-data/HatchData'
import { Heading } from '@/components/feature/pokemon-detail/Heading'
import { MainInfo } from '@/components/feature/pokemon-detail/main-info/MainInfo'
import { OtherLang } from '@/components/feature/pokemon-detail/other-lang/OtherLang'
import { StatData } from '@/components/feature/pokemon-detail/stat-data/StatData'
import type { Pokemon } from '@/types/pokemon'
import type { Species } from '@/types/species'

type Props = {
  pokemon: Pokemon
  species: Species
  pokemonJaName: string
  pokemonJaGenus: string
}

export const PokemonDetail = ({
  pokemon,
  species,
  pokemonJaName,
  pokemonJaGenus,
}: Props) => {
  /** 図鑑番号 */
  const dexNumber = `#${pokemon.id.toString().padStart(4, '0')}`

  return (
    <div className="w-full rounded-lg border bg-slate-50 px-2 py-8 dark:border-black-900 dark:bg-black-900 sm:px-7 md:px-14">
      {/* 図鑑番号 */}
      <DexNumber dexNumber={dexNumber} />

      <div className="my-8 flex h-full w-auto flex-col justify-start sm:gap-y-4 md:items-start md:justify-center xl:flex-row xl:gap-x-10">
        {/* 基本情報 */}
        <MainInfo
          pokemon={pokemon}
          species={species}
          pokemonJaName={pokemonJaName}
          pokemonJaGenus={pokemonJaGenus}
        />

        <div className="flex w-full flex-col gap-10">
          <div className="flex size-full flex-col xl:flex-row xl:gap-x-6">
            {/* 基礎データ */}
            <BasicData pokemon={pokemon} species={species} />

            {/* 捕獲成功率 */}
            <div className="w-full lg:w-2/6">
              <Heading>捕獲成功率</Heading>
              <DataCard>
                <div className="flex h-full items-center justify-center">
                  <div className="relative size-[163px]">
                    <svg
                      className="absolute left-0 top-0 size-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#343337"
                        strokeWidth="6"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#progress-gradient)"
                        strokeWidth="6"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 * (1 - 0.75)}
                      />
                      <defs>
                        <linearGradient
                          id="progress-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute left-0 top-0 grid size-full place-items-center text-3xl font-bold">
                      <span>
                        55.9
                        <span className="text-xl">%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </DataCard>
            </div>
          </div>

          <div className="flex size-full flex-col xl:flex-row xl:gap-x-6">
            {/* タマゴと性別 */}
            <HatchData species={species} />

            {/* 言語別の名称 */}
            <OtherLang species={species} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row lg:items-start">
        {/* 種族値 */}
        <StatData pokemon={pokemon} />

        {/* タイプ相性による弱点 */}
        <DamageData pokemon={pokemon} />
      </div>
    </div>
  )
}
