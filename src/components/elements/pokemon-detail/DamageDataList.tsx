import { MultipliersObject } from '@/utils/getWeaknesses'
import { typesMapping } from '@/utils/translator'
import clsx from 'clsx'

interface Props {
  weaknesses: MultipliersObject
}

const DamageDataList = ({ weaknesses }: Props) => {
  return (
    <div className="gap-x-4 rounded-lg bg-white py-5 shadow-2xl dark:bg-[#18181B]">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {Object.entries(weaknesses).map(([key, value]) => (
          <li
            className={clsx('flex w-32 gap-1', value === 1 && 'opacity-20')}
            key={key}
          >
            <span
              className={clsx(
                'text-shadow block w-[4.8rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white',
                `bg-${key}`,
              )}
            >
              {typesMapping[key]}
            </span>
            <span
              className={clsx(
                'text-shadow block w-12 rounded py-1 text-center text-xs font-semibold leading-normal text-white',
                value === 1 && 'bg-gray-700',
                value === 4 && 'bg-red-500',
                value === 2 && 'bg-red-500',
                value === 0.5 && 'bg-blue-500',
                value === 0.25 && 'bg-blue-500',
                value === 0 && 'bg-blue-500',
              )}
            >
              x {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DamageDataList
