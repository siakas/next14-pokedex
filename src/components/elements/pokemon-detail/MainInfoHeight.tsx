import { Chip } from '@nextui-org/react'

const MainInfoHeight = ({ height }: { height: number }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-semibold">{(height * 0.1).toFixed(1)} m</h3>
      <Chip className="mt-auto bg-gray-700 text-white">
        <span className="font-semibold">たかさ</span>
      </Chip>
    </div>
  )
}

export default MainInfoHeight
