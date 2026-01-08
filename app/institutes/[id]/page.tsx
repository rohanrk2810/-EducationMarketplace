import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  IndianRupee,
  Heart,
  Share2,
  Award,
  Building,
} from "lucide-react"
import { mockInstitutes, mockCourses, mockReviews } from "@/lib/mock-data"

export default function InstitutePage({ params }: { params: { id: string } }) {
  const institute = mockInstitutes.find((i) => i.id === params.id)

  if (!institute) {
    notFound()
  }

  const instituteCourses = mockCourses.filter((c) => c.instituteId === institute.id)
  const instituteReviews = mockReviews.filter((r) => r.instituteId === institute.id)

  const averageRating = institute.rating
  const ratingDistribution = [
    { stars: 5, count: Math.floor(institute.reviewCount * 0.6) },
    { stars: 4, count: Math.floor(institute.reviewCount * 0.25) },
    { stars: 3, count: Math.floor(institute.reviewCount * 0.1) },
    { stars: 2, count: Math.floor(institute.reviewCount * 0.03) },
    { stars: 1, count: Math.floor(institute.reviewCount * 0.02) },
  ]

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

      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-primary/10 to-accent overflow-hidden">
        <Image
          src={institute.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt={institute.instituteName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Institute Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 pb-6">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-card shadow-2xl flex-shrink-0 bg-card">
              <Image
                src={institute.logo || "/placeholder.svg?height=128&width=128"}
                alt={`${institute.instituteName} logo`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 pt-16 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{institute.instituteName}</h1>
                    {institute.verified && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {institute.featured && <Badge className="bg-primary">Featured</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {institute.location.city}, {institute.location.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {institute.establishedYear}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-6 h-6 fill-primary text-primary" />
                      <span className="text-2xl font-bold">{averageRating}</span>
                      <span className="text-muted-foreground">({institute.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {institute.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="lg" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Institute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{institute.description}</p>
                  </CardContent>
                </Card>

                {/* Facilities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Facilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {institute.facilities.map((facility) => (
                        <div key={facility} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{institute.location.address}</p>
                    <p className="text-muted-foreground">
                      {institute.location.city}, {institute.location.state}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                {instituteCourses.length > 0 ? (
                  instituteCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                            <Image
                              src={course.thumbnail || "/placeholder.svg?height=128&width=192"}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                            <Badge className="absolute top-2 right-2">{course.mode}</Badge>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                                <Badge variant="secondary">{course.category}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-2xl font-bold">
                                  <IndianRupee className="w-5 h-5" />
                                  {course.discount
                                    ? (course.price * (1 - course.discount / 100)).toLocaleString("en-IN")
                                    : course.price.toLocaleString("en-IN")}
                                </div>
                                {course.discount && (
                                  <div className="text-sm text-muted-foreground line-through">
                                    ₹{course.price.toLocaleString("en-IN")}
                                  </div>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{course.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.enrolled}/{course.capacity} enrolled
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Starts {new Date(course.startDate).toLocaleDateString("en-IN")}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button className="flex-1">Enroll Now</Button>
                              <Button variant="outline">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No courses available at the moment</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2">{averageRating}</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${star <= averageRating ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{institute.reviewCount} reviews</p>
                      </div>

                      <div className="space-y-2">
                        {ratingDistribution.map((dist) => (
                          <div key={dist.stars} className="flex items-center gap-3">
                            <span className="text-sm w-8">{dist.stars} ⭐</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${(dist.count / institute.reviewCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">{dist.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {instituteReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h4 className="font-semibold">{review.studentName}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString("en-IN")}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating ? "fill-primary text-primary" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                            <Button variant="ghost" size="sm">
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Load More Reviews
                </Button>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {institute.gallery.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{institute.contact.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{institute.contact.email}</p>
                  </div>
                </div>
                {institute.contact.website && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={institute.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </>
                )}
                <Button className="w-full mt-4">Request Information</Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Institute Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {institute.rating}/5
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Reviews</span>
                  <span className="font-semibold">{institute.reviewCount}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Courses Offered</span>
                  <span className="font-semibold">{instituteCourses.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Categories</span>
                  <span className="font-semibold">{institute.categories.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Institutes */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Institutes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInstitutes
                  .filter(
                    (i) => i.id !== institute.id && i.categories.some((cat) => institute.categories.includes(cat)),
                  )
                  .slice(0, 3)
                  .map((similar) => (
                    <Link key={similar.id} href={`/institutes/${similar.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <Image
                            src={similar.logo || "/placeholder.svg?height=48&width=48"}
                            alt={similar.instituteName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate text-sm">{similar.instituteName}</h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            {similar.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
