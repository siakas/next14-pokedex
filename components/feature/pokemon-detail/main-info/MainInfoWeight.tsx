import { Chip } from '@/components/feature/pokemon-detail/main-info/Chip'

type Props = {
  weight: number
}

export const MainInfoWeight = ({ weight }: Props) => {
  return (
    <div className="flex flex-col-reverse items-center">
      <Chip>おもさ</Chip>
      <p className="font-bold">
        {(weight * 0.1).toFixed(1)} <span className="text-sm">kg</span>
      </p>
    </div>
  )
}
