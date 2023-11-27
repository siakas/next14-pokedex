import { getPokemonByPokemonId, getSpeciesByPokemonId } from '@/utils/getData'
import { typesMapping } from '@/utils/translator'
import { Image } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'

const Card = async ({ pokemonId }: { pokemonId: number }) => {
  const [species, pokemon] = await Promise.all([
    getSpeciesByPokemonId(pokemonId),
    getPokemonByPokemonId(pokemonId),
  ])

  // ポケモンの日本語名を取得
  const jaName = species.names.find((name) => name.language.name === 'ja-Hrkt')

  return (
    <li className="text-center">
      <Link
        className="flex aspect-square w-full flex-col items-center justify-center rounded-lg bg-gray-700 text-inherit"
        href={`/pokemon/${pokemon.id}`}
      >
        <Image
          alt=""
          height={90}
          loading="lazy"
          src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
          width={90}
        />
        <p className="mt-3 text-sm font-semibold">{jaName?.name}</p>
        <div className="mt-2 flex flex-col gap-1 sm:flex-row">
          {pokemon.types.map((type) => (
            <span
              className={clsx(
                'text-shadow mb-1 block w-[4.6rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white',
                `bg-${type.type.name}`,
              )}
              key={type.slot}
            >
              {typesMapping[type.type.name]}
            </span>
          ))}
        </div>
      </Link>
    </li>
  )
}

export default Card
