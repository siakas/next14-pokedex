type Props = {
  genus: string
  name: string
}

export const MainInfoName = ({ genus, name }: Props) => {
  return (
    <div className="relative flex h-auto w-full flex-auto flex-col items-center justify-end overflow-visible px-3 py-4">
      <h3 className="text-center text-3xl font-bold">{name}</h3>
      <div className="my-2 h-[3px] w-3/5 shrink-0 rounded-md bg-gray-400"></div>
      <h4 className="font-bold">{genus}</h4>
    </div>
  )
}
