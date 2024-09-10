import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import { getAllPokemon } from '@/utils/pokemon'

export default function Home() {
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [offset, setOffset] = useState(0)

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (offset === 0) return
    setOffset((prev) => prev - 20)
  }

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    setOffset((prev) => prev + 20)
  }

  // ポケモン一覧を取得する useQuery
  const { data: pokemonList, isLoading: isPokemonListLoading } = useQuery({
    queryKey: ['pokemonList', initialUrl, offset],
    queryFn: () => getAllPokemon(initialUrl, offset),
  })

  return (
    <Layout>
      <main className="p-8">
        <h1 className="mb-4 text-2xl font-bold">ポケモン一覧</h1>
        {isPokemonListLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {pokemonList?.results.map((pokemon) => (
              <li key={pokemon.name} className="mb-2 rounded border p-3">
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  )
}
