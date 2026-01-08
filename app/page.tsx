import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, MapPin, Award, TrendingUp, Users, BookOpen, CheckCircle2 } from "lucide-react"
import { categories, mockInstitutes } from "@/lib/mock-data"
import Image from "next/image"

export default function HomePage() {
  const featuredInstitutes = mockInstitutes.filter((i) => i.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold text-foreground">EduMarket</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/institutes" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Browse Institutes
              </Link>
              <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Categories
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </Link>
            </div>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-1.5" variant="secondary">
              <TrendingUp className="w-3 h-3 mr-1" />
              India's Trusted Education Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Discover Your Perfect Learning Path
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl mx-auto">
              Compare and choose from top coaching institutes across IT, JEE, NEET, and more. Find the best fit for your
              educational journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for courses, institutes, or locations..."
                    className="pl-12 h-14 text-base bg-card shadow-lg border-2"
                  />
                </div>
                <Button size="lg" className="h-14 px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Verified Institutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Courses Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect coaching institute for your educational goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/institutes?category=${category.name}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Institutes */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Award className="w-3 h-3 mr-1" />
              Featured Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Institutes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium institutes with proven track records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInstitutes.map((institute) => (
              <Link key={institute.id} href={`/institutes/${institute.id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
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
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors truncate">
                          {institute.instituteName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {institute.location.city}, {institute.location.state}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {institute.description}
                    </p>

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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/institutes">
                View All Institutes
                <BookOpen className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg mb-8 opacity-90 text-balance leading-relaxed">
              Join thousands of students who found their perfect institute through EduMarket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/student/dashboard">Sign Up as Student</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/institute/register">Register Your Institute</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                  E
                </div>
                <span className="text-xl font-bold">EduMarket</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                India's trusted education marketplace connecting students with top coaching institutes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/institutes" className="hover:text-foreground">
                    Browse Institutes
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-foreground">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/student/dashboard" className="hover:text-foreground">
                    My Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Institutes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/institute/register" className="hover:text-foreground">
                    Register Institute
                  </Link>
                </li>
                <li>
                  <Link href="/institute/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EduMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
