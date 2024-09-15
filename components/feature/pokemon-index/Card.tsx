import clsx from 'clsx'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPokemonDetail } from '@/hooks/useGetPokemonDetail'
import { typesMapping } from '@/utils/translator'

type Props = {
  pokemonId: number
}

export const Card = ({ pokemonId }: Props) => {
  const {
    pokemon,
    species,
    pokemonJaName,
    isPokemonLoading,
    isSpeciesLoading,
  } = useGetPokemonDetail(pokemonId)

  return (
    <div className="w-full max-w-sm rounded-md border p-4 shadow">
      {isPokemonLoading || isSpeciesLoading ? (
        <div className="animate-pulse space-y-1">
          <Skeleton className="h-6 bg-slate-800" />
          <Skeleton className="h-6 bg-slate-800" />
          <Skeleton className="size-[90px] bg-slate-800" />
          <Skeleton className="h-6 bg-slate-800" />
        </div>
      ) : (
        <>
          <p>ID：{pokemonId}</p>
          <p>名前：{pokemonJaName}</p>
          <img
            src={pokemon?.sprites.other['official-artwork'].front_default ?? ''}
            alt=""
            loading="lazy"
            className="size-[90px]"
            width={90}
            height={90}
          />
          <div className="mt-2 flex flex-col gap-1 sm:flex-row">
            {pokemon?.types.map((type) => (
              <span
                key={type.slot}
                className={clsx(
                  'text-shadow mb-1 block w-[4.6rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white',
                  `bg-${type.type.name}`,
                )}
              >
                {typesMapping[type.type.name]}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
