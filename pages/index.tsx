import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { getPokemonList } from '@/utils/pokemon'

export default function Home() {
  const router = useRouter()
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)

  /**
   * 前のページへ移動
   */
  const handlePrevButton = () => {
    if (offset === 0) return
    setOffset((prev) => prev - 30)
    setPage((prev) => prev - 1)
    router.push(`/?page=${page - 1}`)
  }

  /**
   * 次のページへ移動
   */
  const handleNextButton = () => {
    setOffset((prev) => prev + 30)
    setPage((prev) => prev + 1)
    router.push(`/?page=${page + 1}`)
  }

  // ポケモン一覧を取得する useQuery
  const { data: pokemonList, isLoading: isPokemonListLoading } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => getPokemonList(offset),
  })

  // // ポケモン一覧を取得する useQuery
  // const { data: pokemonList, isLoading: isPokemonListLoading } = useQuery({
  //   queryKey: ['pokemonList', initialUrl, offset],
  //   queryFn: () => getAllPokemon(initialUrl, offset),
  // })

  // // ポケモンの詳細情報を一覧からまとめて取得するラッパー関数
  // const loadPokemon = async (data: Pokemon[]) => {
  //   const _pokemonData = await Promise.all(
  //     data.map((pokemon) => {
  //       const pokemonRecord = getPokemon(pokemon.url)
  //       return pokemonRecord
  //     }),
  //   )
  //   return _pokemonData
  // }

  // // ポケモンの詳細情報を取得する useQuery
  // const { data: pokemonData, isLoading: isPokemonDataLoading } = useQuery({
  //   queryKey: ['pokemonData', pokemonList, pokemonList?.results],
  //   queryFn: () => loadPokemon(pokemonList?.results ?? []),
  //   enabled: !!pokemonList,
  // })

  return (
    <Layout>
      <main className="p-8">
        <h1 className="mb-4 text-2xl font-bold">ポケモン一覧</h1>
        {isPokemonListLoading ? (
          <p>Loading...</p>
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
                <li key={pokemon.id}>
                  <p>
                    {pokemon.id}: {pokemon.name}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </Layout>
  )
}
