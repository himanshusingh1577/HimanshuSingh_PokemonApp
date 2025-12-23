// Pokemon API utility functions

const BASE_URL = "https://pokeapi.co/api/v2"

export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  height: number
  weight: number
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonListItem[]
}

// Fetch list of Pokemon
export async function getPokemonList(limit = 150): Promise<PokemonListItem[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list")
  }
  const data: PokemonListResponse = await response.json()
  return data.results
}

// Extract Pokemon ID from URL
export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean)
  return Number.parseInt(parts[parts.length - 1])
}

// Fetch detailed Pokemon data
export async function getPokemonDetails(idOrName: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${idOrName}`)
  }
  return response.json()
}

// Get Pokemon type colors
export function getPokemonTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  }
  return typeColors[type.toLowerCase()] || "#777"
}

// Format Pokemon stat name
export function formatStatName(statName: string): string {
  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  }
  return statNames[statName] || statName
}
