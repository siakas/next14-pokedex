import MainInfoHeight from '@/components/elements/pokemon-detail/MainInfoHeight'
import MainInfoName from '@/components/elements/pokemon-detail/MainInfoName'
import MainInfoTypes from '@/components/elements/pokemon-detail/MainInfoTypes'
import MainInfoWeight from '@/components/elements/pokemon-detail/MainInfoWeight'
import { Pokemon, Species } from '@/types'
import { getJaGenusBySpecies, getJaNameBySpecies } from '@/utils/getData'
import { Card, CardFooter, Divider, Image } from '@nextui-org/react'

interface Props {
  pokemon: Pokemon
  species: Species
}

const MainInfo = ({ pokemon, species }: Props) => {
  // 名前
  const jaName = getJaNameBySpecies(species)
  const jaGenus = getJaGenusBySpecies(species)

  return (
    <div className="m-auto w-fit items-center justify-center">
      {/* オフィシャル画像 */}
      <Image
        alt={pokemon.name}
        className="absolute z-10 w-[280px] sm:w-[380px]"
        isBlurred={true}
        loading="lazy"
        src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
        style={{ maxWidth: 'none', transform: 'translate(-6%, -10%)' }}
      />

      <div className="rounded-lg dark:bg-transparent">
        <Card className="border-gray-300 h-[30rem] w-[16rem] border-4 bg-transparent py-4 sm:h-[34rem] sm:w-[21rem]">
          {/* 名前 */}
          <MainInfoName genus={jaGenus} name={jaName} />

          {/*  */}
          <CardFooter className="justify-center">
            <div className="flex flex-row">
              {/* たかさ */}
              <MainInfoHeight height={pokemon.height} />

              <Divider
                className="mx-2 h-auto bg-gray-600"
                orientation="vertical"
              />

              {/* タイプ */}
              <MainInfoTypes types={pokemon.types} />

              <Divider
                className="mx-2 h-auto bg-gray-600"
                orientation="vertical"
              />

              {/* おもさ */}
              <MainInfoWeight weight={pokemon.weight} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default MainInfo
