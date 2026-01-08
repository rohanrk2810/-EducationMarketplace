import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users, CheckCircle2, Heart } from "lucide-react"
import type { Institute } from "@/lib/types"

interface InstituteCardProps {
  institute: Institute
}

export function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent overflow-hidden">
        <Image
          src={institute.coverImage || "/placeholder.svg?height=200&width=400"}
          alt={institute.instituteName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {institute.verified && (
            <Badge className="bg-success text-success-foreground">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {institute.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4 rounded-full w-9 h-9 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-border flex-shrink-0 bg-card">
            <Image
              src={institute.logo || "/placeholder.svg?height=64&width=64"}
              alt={`${institute.instituteName} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/institutes/${institute.id}`}>
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors truncate">
                {institute.instituteName}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {institute.location.city}, {institute.location.state}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{institute.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {institute.categories.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-bold text-lg">{institute.rating}</span>
            <span className="text-sm text-muted-foreground">({institute.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            Est. {institute.establishedYear}
          </div>
        </div>

        <Button className="w-full mt-4" asChild>
          <Link href={`/institutes/${institute.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
