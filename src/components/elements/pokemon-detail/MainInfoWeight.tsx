import { Chip } from '@nextui-org/react'

const MainInfoWeight = ({ weight }: { weight: number }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-semibold">{(weight * 0.1).toFixed(1)} kg</h3>
      <Chip className="mt-auto bg-gray-700 text-white">
        <span className="font-semibold">おもさ</span>
      </Chip>
    </div>
  )
}

export default MainInfoWeight
