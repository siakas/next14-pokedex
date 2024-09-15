import { Loader } from 'lucide-react'
import { Card } from '@/components/feature/pokemon-index/Card'
import { PageNavigation } from '@/components/feature/pokemon-index/PageNavigation'
import Layout from '@/components/layout/Layout'
import { useGetPokemonList } from '@/hooks/useGetPokemonList'

export default function Home() {
  const { data: pokemonList, isLoading: isPokemonListLoading } =
    useGetPokemonList()

  return (
    <Layout>
      <PageNavigation />

      {isPokemonListLoading ? (
        <div className="flex h-screen justify-center pt-40">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <ul>
          {pokemonList?.results?.map((pokemon) => (
            <li key={pokemon.id} className="mb-4">
              <Card pokemonId={pokemon.id} />
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
