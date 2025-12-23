"use client"

import { useEffect, useState } from "react"
import { PokemonCard } from "@/components/pokemon-card"
import { SearchBar } from "@/components/search-bar"
import { getPokemonList, getPokemonDetails, getPokemonIdFromUrl, type Pokemon } from "@/lib/pokemon-api"
import { Loader2 } from "lucide-react"

interface PokemonWithId extends Pokemon {
  id: number
}

export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState<PokemonWithId[]>([])
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonWithId[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pokemonPerPage = 20

  useEffect(() => {
    async function loadPokemon() {
      try {
        const pokemonList = await getPokemonList(150)

        // Fetch details for all Pokemon
        const detailsPromises = pokemonList.map(async (item) => {
          const id = getPokemonIdFromUrl(item.url)
          const details = await getPokemonDetails(id)
          return { ...details, id }
        })

        const pokemonWithDetails = await Promise.all(detailsPromises)
        setAllPokemon(pokemonWithDetails)
        setFilteredPokemon(pokemonWithDetails)
      } catch (error) {
        console.error("[v0] Error loading Pokemon:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPokemon()
  }, [])

  useEffect(() => {
    const filtered = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredPokemon(filtered)
    setCurrentPage(1)
  }, [searchQuery, allPokemon])

  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage)
  const startIndex = (currentPage - 1) * pokemonPerPage
  const endIndex = startIndex + pokemonPerPage
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Pokédex
          </h1>
          <div className="flex justify-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search Pokémon by name..." />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground text-lg">Loading Pokémon...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground text-center">
                Showing {currentPokemon.length} of {filteredPokemon.length} Pokémon
              </p>
            </div>

            {/* Pokemon Grid */}
            {filteredPokemon.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {currentPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                    types={pokemon.types.map((t) => t.type.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No Pokémon found matching "{searchQuery}"</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2 px-4">
                  <span className="text-foreground font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Data provided by{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              PokéAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
