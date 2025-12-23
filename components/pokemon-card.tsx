import Link from "next/link"
import Image from "next/image"
import { getPokemonTypeColor } from "@/lib/pokemon-api"

interface PokemonCardProps {
  id: number
  name: string
  image: string
  types: string[]
}

export function PokemonCard({ id, name, image, types }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50">
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-muted-foreground">
          #{String(id).padStart(3, "0")}
        </div>

        <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/10 p-6 flex items-center justify-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            priority={id <= 20}
          />
        </div>

        <div className="p-4 bg-card">
          <h3 className="text-lg font-bold capitalize text-foreground mb-2 text-pretty">{name}</h3>
          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize"
                style={{ backgroundColor: getPokemonTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
