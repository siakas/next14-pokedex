import { Loader } from 'lucide-react'
import { Card } from '@/components/feature/pokemon-index/Card'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { useGetPokemonList } from '@/hooks/useGetPokemonList'

export default function Home() {
  const {
    data: pokemonList,
    isLoading: isPokemonListLoading,
    handlePrevButton,
    handleNextButton,
  } = useGetPokemonList()

  return (
    <Layout>
      <main className="p-8">
        <h1 className="mb-4 text-2xl font-bold">ポケモン一覧</h1>
        {isPokemonListLoading ? (
          <div>
            <Loader className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-2 flex gap-2">
              <Button
                onClick={handlePrevButton}
                className="bg-blue-500 hover:bg-blue-700"
              >
                前へ
              </Button>
              <Button
                onClick={handleNextButton}
                className="bg-blue-500 hover:bg-blue-700"
              >
                次へ
              </Button>
            </div>
            <ul>
              {pokemonList?.results?.map((pokemon) => (
                <li key={pokemon.id} className="mb-4">
                  <Card pokemonId={pokemon.id} />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </Layout>
  )
}
