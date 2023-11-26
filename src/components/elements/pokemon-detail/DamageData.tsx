import DamageDataList from '@/components/elements/pokemon-detail/DamageDataList'
import Heading from '@/components/elements/pokemon-detail/Heading'
import { Pokemon } from '@/types'
import { getWeaknesses } from '@/utils/getWeaknesses'

interface Props {
  pokemon: Pokemon
}

const DamageData = async ({ pokemon }: Props) => {
  const weaknesses = await getWeaknesses(pokemon.types)

  return (
    <div className="w-fit items-center justify-center lg:w-2/6 xl:w-2/6">
      <div className="rounded-lg dark:bg-transparent">
        <Heading>タイプ相性による弱点</Heading>
        <DamageDataList weaknesses={weaknesses} />
      </div>
    </div>
  )
}

export default DamageData
