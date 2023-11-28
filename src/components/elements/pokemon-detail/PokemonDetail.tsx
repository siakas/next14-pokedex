import BasicData from '@/components/elements/pokemon-detail/BasicData'
import CaptureRate from '@/components/elements/pokemon-detail/CaptureRate'
import DamageData from '@/components/elements/pokemon-detail/DamageData'
import DexNumber from '@/components/elements/pokemon-detail/DexNumber'
import HatchData from '@/components/elements/pokemon-detail/HatchData'
import MainInfo from '@/components/elements/pokemon-detail/MainInfo'
import OtherData from '@/components/elements/pokemon-detail/OtherData'
import PageBack from '@/components/elements/pokemon-detail/PageBack'
import StatData from '@/components/elements/pokemon-detail/StatData'
import { Pokemon, Species } from '@/types'

interface Props {
  pokemon: Pokemon
  species: Species
}

const PokemonDetail = ({ pokemon, species }: Props) => {
  // 図鑑番号の設定
  const dexNumber = `#${pokemon.id.toString().padStart(4, '0')}`

  return (
    <div className="mt-10 w-full rounded-lg border border-black-900 px-2 py-8 dark:bg-black-900 sm:px-7 md:px-14">
      {/* 図鑑番号 */}
      <DexNumber dexNumber={dexNumber} />

      <div className="mb-2 flex h-full w-auto flex-col justify-start sm:gap-y-4 md:items-start md:justify-center xl:flex-row xl:gap-x-10">
        {/* 基本情報 */}
        <MainInfo pokemon={pokemon} species={species} />

        <div className="mt-4 grid w-full grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 sm:items-start md:w-full">
          {/* 基礎データ */}
          <BasicData pokemon={pokemon} species={species} />

          {/* 捕獲成功率 */}
          <CaptureRate pokemon={pokemon} species={species} />

          {/* タマゴと性別 */}
          <HatchData species={species} />

          {/* その他 */}
          <OtherData species={species} />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row lg:items-start">
        {/* 種族値 */}
        <StatData pokemon={pokemon} />

        {/* タイプ相性による弱点 */}
        <DamageData pokemon={pokemon} />
      </div>

      {/* 戻るボタン */}
      <PageBack />
    </div>
  )
}

export default PokemonDetail
