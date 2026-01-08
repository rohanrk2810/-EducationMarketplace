"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { mockInstitutes, categories } from "@/lib/mock-data"
import { filterInstitutes, sortInstitutes } from "@/lib/utils/filters"
import { InstituteCard } from "@/components/institute-card"
import type { CourseCategory } from "@/lib/types"
import Link from "next/link"

export default function InstitutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<CourseCategory[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name" | "newest">("rating")
  const [showFilters, setShowFilters] = useState(true)

  // Get unique cities from institutes
  const cities = useMemo(() => {
    const citySet = new Set(mockInstitutes.map((i) => i.location.city))
    return Array.from(citySet).sort()
  }, [])

  // Apply filters
  const filteredInstitutes = useMemo(() => {
    let result = mockInstitutes

    // Apply search filter
    if (searchQuery) {
      result = filterInstitutes(result, { search: searchQuery })
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((institute) => selectedCategories.some((cat) => institute.categories.includes(cat)))
    }

    // Apply city filter
    if (selectedCities.length > 0) {
      result = result.filter((institute) => selectedCities.includes(institute.location.city))
    }

    // Apply rating filter
    if (minRating > 0) {
      result = filterInstitutes(result, { rating: minRating })
    }

    // Apply verified filter
    if (verifiedOnly) {
      result = filterInstitutes(result, { verified: true })
    }

    // Sort results
    return sortInstitutes(result, sortBy)
  }, [searchQuery, selectedCategories, selectedCities, minRating, verifiedOnly, sortBy])

  const toggleCategory = (category: CourseCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleCity = (city: string) => {
    setSelectedCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedCities([])
    setMinRating(0)
    setVerifiedOnly(false)
  }

  const activeFiltersCount =
    selectedCategories.length + selectedCities.length + (minRating > 0 ? 1 : 0) + (verifiedOnly ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold text-foreground">EduMarket</span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/student/dashboard">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/student/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Institutes</h1>
          <p className="text-muted-foreground mb-6">Discover and compare top coaching institutes across India</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search institutes, courses, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button variant="outline" size="lg" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="lg:w-80 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Filters</CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categories */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Categories</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.name} className="flex items-center gap-2">
                          <Checkbox
                            id={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => toggleCategory(category.name)}
                          />
                          <Label htmlFor={category.name} className="cursor-pointer font-normal flex-1">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cities */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Location</Label>
                    <div className="space-y-2">
                      {cities.map((city) => (
                        <div key={city} className="flex items-center gap-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => toggleCity(city)}
                          />
                          <Label htmlFor={city} className="cursor-pointer font-normal flex-1">
                            {city}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Minimum Rating: {minRating > 0 ? `${minRating}+ ⭐` : "Any"}
                    </Label>
                    <Slider
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      max={5}
                      step={0.5}
                      className="my-4"
                    />
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                    />
                    <Label htmlFor="verified" className="cursor-pointer font-normal">
                      Show verified institutes only
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredInstitutes.length}</span> institutes
                </p>
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {cat}
                    <button onClick={() => toggleCategory(cat)} className="ml-1 hover:bg-background/20 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedCities.map((city) => (
                  <Badge key={city} variant="secondary" className="gap-1">
                    {city}
                    <button onClick={() => toggleCity(city)} className="ml-1 hover:bg-background/20 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {minRating > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {minRating}+ Rating
                    <button onClick={() => setMinRating(0)} className="ml-1 hover:bg-background/20 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {verifiedOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Verified Only
                    <button onClick={() => setVerifiedOnly(false)} className="ml-1 hover:bg-background/20 rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Institute Grid */}
            {filteredInstitutes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInstitutes.map((institute) => (
                  <InstituteCard key={institute.id} institute={institute} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No institutes found matching your criteria</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
