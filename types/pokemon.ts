export type PokemonList = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResult[]
}

export type PokemonListResult = {
  id: number
  name: string
  url: string
}

export type Pokemon = {
  abilities: PokemonAbility[]
  base_experience: number
  forms: {
    name: string
    url: string
  }[]
  game_indices: {
    game_index: number
    version: {
      name: string
      url: string
    }
  }[]
  height: number
  held_items: {
    item: {
      name: string
      url: string
    }
    version_details: {
      rarity: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: {
    move: {
      name: string
      url: string
    }
    version_group_details: {
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      version_group: {
        name: string
        url: string
      }
    }[]
  }[]
  name: string
  order: number
  past_abilities: {
    abilities: {
      ability: {
        name: string
        url: string
      }
      is_hidden: boolean
      slot: number
    }[]
    generation: {
      name: string
      url: string
    }
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  past_types: any[]
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
    other: {
      dream_world: {
        front_default: string | null
        front_female: string | null
      }
      home: {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      }
      'official-artwork': {
        front_default: string | null
        front_shiny: string | null
      }
    }
    versions: {
      'generation-i': {
        'red-blue': {
          back_default: string | null
          back_gray: string | null
          back_transparent: string | null
          front_default: string | null
          front_gray: string | null
          front_transparent: string | null
        }
        yellow: {
          back_default: string | null
          back_gray: string | null
          back_transparent: string | null
          front_default: string | null
          front_gray: string | null
          front_transparent: string | null
        }
      }
      'generation-ii': {
        crystal: {
          back_default: string | null
          back_shiny: string | null
          back_shiny_transparent: string | null
          back_transparent: string | null
          front_default: string | null
          front_shiny: string | null
          front_shiny_transparent: string | null
          front_transparent: string | null
        }
        gold: {
          back_default: string | null
          back_shiny: string | null
          front_default: string | null
          front_shiny: string | null
          front_transparent: string | null
        }
        silver: {
          back_default: string | null
          back_shiny: string | null
          front_default: string | null
          front_shiny: string | null
          front_transparent: string | null
        }
      }
      'generation-iii': {
        emerald: {
          front_default: string | null
          front_shiny: string | null
        }
        'firered-leafgreen': {
          back_default: string | null
          back_shiny: string | null
          front_default: string | null
          front_shiny: string | null
        }
        'ruby-sapphire': {
          back_default: string | null
          back_shiny: string | null
          front_default: string | null
          front_shiny: string | null
        }
      }
      'generation-iv': {
        'diamond-pearl': {
          back_default: string | null
          back_female: string | null
          back_shiny: string | null
          back_shiny_female: string | null
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
        'heartgold-soulsilver': {
          back_default: string | null
          back_female: string | null
          back_shiny: string | null
          back_shiny_female: string | null
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
        platinum: {
          back_default: string | null
          back_female: string | null
          back_shiny: string | null
          back_shiny_female: string | null
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
      }
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string | null
            back_female: string | null
            back_shiny: string | null
            back_shiny_female: string | null
            front_default: string | null
            front_female: string | null
            front_shiny: string | null
            front_shiny_female: string | null
          }
          back_default: string | null
          back_female: string | null
          back_shiny: string | null
          back_shiny_female: string | null
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
      }
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
        'x-y': {
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
      }
      'generation-vii': {
        icons: {
          front_default: string | null
          front_female: string | null
        }
        'ultra-sun-ultra-moon': {
          front_default: string | null
          front_female: string | null
          front_shiny: string | null
          front_shiny_female: string | null
        }
      }
      'generation-viii': {
        icons: {
          front_default: string | null
          front_female: string | null
        }
      }
    }
  }
  stats: {
    base_stat: number
    effort: number
    stat: {
      name:
        | 'attack'
        | 'defense'
        | 'hp'
        | 'special-attack'
        | 'special-defense'
        | 'speed'
      url: string
    }
  }[]
  types: PokemonType[]
  weight: number
}

export type PokemonAbility = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  jaName?: string
  slot: number
}

export type PokemonType = {
  slot: number
  type: {
    name:
      | 'bug'
      | 'dark'
      | 'dragon'
      | 'electric'
      | 'fairy'
      | 'fighting'
      | 'fire'
      | 'flying'
      | 'ghost'
      | 'grass'
      | 'ground'
      | 'ice'
      | 'normal'
      | 'poison'
      | 'psychic'
      | 'rock'
      | 'steel'
      | 'water'
    url: string
  }
}
