export type Pokemon = {
  name: string
  url: string
}

export type PokemonListAPIResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}
