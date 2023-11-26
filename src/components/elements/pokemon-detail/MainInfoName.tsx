import { CardBody, Divider } from '@nextui-org/react'

interface Props {
  genus: string
  name: string
}

const MainInfoName = ({ genus, name }: Props) => {
  return (
    <CardBody className="items-center justify-end overflow-visible py-4">
      <h3 className="text-center text-3xl font-semibold">{name}</h3>
      <Divider className="my-2 h-1 w-[60%] rounded-sm bg-gray-300" />
      <h3 className="font-semibold">{genus}</h3>
    </CardBody>
  )
}

export default MainInfoName
