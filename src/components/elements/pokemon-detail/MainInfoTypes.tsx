import { PokemonType } from '@/types'
import { typesMapping } from '@/utils/translator'
import { Chip } from '@nextui-org/react'
import clsx from 'clsx'

interface Props {
  types: PokemonType[]
}

const MainInfoTypes = ({ types }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 flex flex-col gap-1 sm:flex-row">
        {types.map((type) => (
          <span
            className={clsx(
              'text-shadow mb-1 block w-[4.2rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white',
              `bg-${type.type.name}`,
            )}
            key={type.slot}
          >
            {typesMapping[type.type.name]}
          </span>
        ))}
      </div>
      <Chip className="mt-auto bg-gray-700 text-white">
        <span className="font-semibold">タイプ</span>
      </Chip>
    </div>
  )
}

export default MainInfoTypes
