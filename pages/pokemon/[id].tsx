import { useRouter } from 'next/router'
import { PokemonDetail } from '@/components/feature/pokemon-detail/PokemonDetail'
import { Controller } from '@/components/layout/Controller'
import Layout from '@/components/layout/Layout'
import { useGetPokemonDetail } from '@/hooks/useGetPokemonDetail'

const PokemonDetailPage = () => {
  const router = useRouter()
  const pokemonId = parseInt(router.query.id as string)

  const { pokemon, species, pokemonJaName, pokemonJaGenus, isLoading } =
    useGetPokemonDetail(pokemonId)

  return (
    <Layout>
      <Controller isShowList={false} />

      {!isLoading && pokemon && species && pokemonJaName && pokemonJaGenus && (
        <PokemonDetail
          pokemon={pokemon}
          species={species}
          pokemonJaName={pokemonJaName}
          pokemonJaGenus={pokemonJaGenus}
        />
      )}
    </Layout>
  )
}

export default PokemonDetailPage
