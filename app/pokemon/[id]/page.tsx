import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPokemonDetails, getPokemonTypeColor, formatStatName } from "@/lib/pokemon-api"
import { StatBar } from "@/components/stat-bar"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params

  let pokemon
  try {
    pokemon = await getPokemonDetails(id)
  } catch (error) {
    console.error("[v0] Error fetching Pokemon:", error)
    notFound()
  }

  const primaryType = pokemon.types[0].type.name
  const typeColor = getPokemonTypeColor(primaryType)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Pokédex</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div
            className="rounded-2xl p-8 mb-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${typeColor}20 0%, ${typeColor}10 100%)`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Pokemon Image */}
              <div className="relative aspect-square bg-background/40 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                <Image
                  src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Pokemon Info */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    #{String(pokemon.id).padStart(3, "0")}
                  </div>
                  <h1 className="text-5xl font-bold capitalize text-foreground mb-4 text-balance">{pokemon.name}</h1>

                  {/* Types */}
                  <div className="flex gap-3 flex-wrap">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white capitalize shadow-lg"
                        style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Physical Attributes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Height</div>
                    <div className="text-2xl font-bold text-foreground">{(pokemon.height / 10).toFixed(1)} m</div>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Weight</div>
                    <div className="text-2xl font-bold text-foreground">{(pokemon.weight / 10).toFixed(1)} kg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Base Stats</h2>
            <div className="space-y-4">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  label={formatStatName(stat.stat.name)}
                  value={stat.base_stat}
                  maxValue={255}
                  color={typeColor}
                />
              ))}
            </div>

            {/* Total Stats */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
