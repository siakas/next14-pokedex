import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { Heading } from '@/components/feature/pokemon-detail/Heading'

export const DamageData = () => {
  return (
    <div className="w-fit items-center justify-center lg:w-2/6 xl:w-2/6">
      <Heading>タイプ相性による弱点</Heading>
      <DataCard>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          assumenda magnam quasi omnis eos et amet esse debitis doloribus eius
          nulla, laborum sed fugit ab perspiciatis nostrum voluptate tempora
          asperiores.
        </p>
      </DataCard>
    </div>
  )
}
