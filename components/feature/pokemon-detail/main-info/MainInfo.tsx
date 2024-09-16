import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'
import { DividerVertical } from '@/components/feature/pokemon-detail/main-info/DividerVertical'
import { MainInfoHeight } from '@/components/feature/pokemon-detail/main-info/MainInfoHeight'
import { MainInfoName } from '@/components/feature/pokemon-detail/main-info/MainInfoName'
import { MainInfoTypes } from '@/components/feature/pokemon-detail/main-info/MainInfoTypes'
import { MainInfoWeight } from '@/components/feature/pokemon-detail/main-info/MainInfoWeight'
import type { Pokemon, Species } from '@/types'

type Props = {
  pokemon: Pokemon
  species: Species
  pokemonJaName: string
  pokemonJaGenus: string
}

export const MainInfo = ({
  pokemon,
  species,
  pokemonJaName,
  pokemonJaGenus,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="m-auto w-fit items-center justify-center">
      {/* オフィシャル画像 */}
      <div className="relative max-w-fit">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
          alt={pokemon.name}
          width={440}
          height={440}
          loading="lazy"
          className={clsx(
            'absolute z-10 w-[280px] transition-opacity duration-300 sm:w-[440px]',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoadingComplete={() => setImageLoaded(true)}
          style={{ maxWidth: 'none', transform: 'translate(-6%, -10%)' }}
        />
      </div>

      <div className="rounded-lg dark:bg-transparent">
        <div className="relative flex h-[30rem] w-64 flex-col overflow-hidden rounded-xl border-4 border-gray-400 bg-transparent py-4 text-foreground sm:h-[37rem] sm:w-96">
          {/* 名前 */}
          <MainInfoName genus={pokemonJaGenus} name={pokemonJaName} />

          <div className="flex h-auto w-full items-center justify-center overflow-hidden p-3">
            <div className="flex flex-row">
              {/* たかさ */}
              <MainInfoHeight height={pokemon.height} />

              <DividerVertical />

              {/* タイプ */}
              <MainInfoTypes types={pokemon.types} />

              <DividerVertical />

              {/* おもさ */}
              <MainInfoWeight weight={pokemon.weight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
