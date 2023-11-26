export type Pokedex = {
  descriptions: {
    description: string
    language: {
      name: string
      url: string
    }
  }[]
  id: number
  is_main_series: boolean
  name: string
  names: {
    language: {
      name: string
      url: string
    }
    name: string
  }[]
  pokemon_entries: {
    entry_number: number
    pokemon_species: {
      name: string
      url: string
    }
  }[]
  region: {
    name: string
    url: string
  } | null
  version_groups: {
    name: string
    url: string
  }[]
}
