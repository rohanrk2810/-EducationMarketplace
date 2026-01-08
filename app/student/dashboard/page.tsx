"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Heart,
  Award,
  TrendingUp,
  Clock,
  GraduationCap,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Calendar,
  Star,
  MapPin,
} from "lucide-react"
import { mockInstitutes, mockCourses } from "@/lib/mock-data"

// Mock student data
const mockStudent = {
  id: "s1",
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  avatar: "",
  enrolledCourses: ["c1", "c2"],
  wishlist: ["2", "4", "5"],
  completedCourses: 2,
  totalHours: 145,
}

// Mock enrollments
const mockEnrollments = [
  {
    id: "e1",
    courseId: "c1",
    progress: 65,
    enrolledAt: new Date("2024-11-01"),
    status: "active" as const,
    lastAccessed: new Date("2025-01-05"),
  },
  {
    id: "e2",
    courseId: "c2",
    progress: 30,
    enrolledAt: new Date("2024-12-15"),
    status: "active" as const,
    lastAccessed: new Date("2025-01-06"),
  },
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("courses")

  const enrolledCourses = mockCourses.filter((c) => mockStudent.enrolledCourses.includes(c.id))
  const enrollmentsWithCourses = mockEnrollments.map((enrollment) => ({
    ...enrollment,
    course: mockCourses.find((c) => c.id === enrollment.courseId)!,
    institute: mockInstitutes.find((i) => i.id === mockCourses.find((c) => c.id === enrollment.courseId)?.instituteId)!,
  }))

  const wishlistInstitutes = mockInstitutes.filter((i) => mockStudent.wishlist.includes(i.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold text-foreground">EduMarket</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/student/profile">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarFallback className="text-2xl">{mockStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{mockStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{mockStudent.email}</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "courses" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("courses")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Courses
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "achievements" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("achievements")}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Achievements
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/student/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>

                <Button variant="outline" className="w-full mt-6 bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Courses Completed</span>
                    <span className="font-bold">{mockStudent.completedCourses}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Hours</span>
                    <span className="font-bold">{mockStudent.totalHours}h</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Active Courses</span>
                    <span className="font-bold">{enrolledCourses.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Banner */}
            <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent border-none">
              <CardContent className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {mockStudent.name.split(" ")[0]}!</h1>
                <p className="text-muted-foreground mb-4">Continue your learning journey and achieve your goals.</p>
                <Button asChild>
                  <Link href="/institutes">
                    <Search className="w-4 h-4 mr-2" />
                    Explore More Courses
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <Badge variant="secondary">{enrolledCourses.length} Active</Badge>
                </div>

                {/* Course Progress Cards */}
                <div className="space-y-4">
                  {enrollmentsWithCourses.map((enrollment) => (
                    <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                            <Image
                              src={enrollment.course.thumbnail || "/placeholder.svg?height=128&width=192"}
                              alt={enrollment.course.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <Link href={`/institutes/${enrollment.institute.id}`}>
                                  <h3 className="text-xl font-bold mb-1 hover:text-primary">
                                    {enrollment.course.title}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <span>{enrollment.institute.instituteName}</span>
                                  <span>•</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {enrollment.course.category}
                                  </Badge>
                                </div>
                              </div>
                              <Badge
                                variant={enrollment.status === "active" ? "default" : "secondary"}
                                className="flex-shrink-0"
                              >
                                {enrollment.status}
                              </Badge>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Progress</span>
                                <span className="text-sm font-semibold">{enrollment.progress}%</span>
                              </div>
                              <Progress value={enrollment.progress} className="h-2" />
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Last accessed {new Date(enrollment.lastAccessed).toLocaleDateString("en-IN")}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString("en-IN")}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button className="flex-1">Continue Learning</Button>
                              <Button variant="outline">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {enrolledCourses.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No courses yet</h3>
                      <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
                      <Button asChild>
                        <Link href="/institutes">Browse Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Wishlist</h2>
                  <Badge variant="secondary">{wishlistInstitutes.length} Saved</Badge>
                </div>

                {wishlistInstitutes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistInstitutes.map((institute) => (
                      <Card key={institute.id} className="hover:shadow-xl transition-shadow">
                        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent overflow-hidden">
                          <Image
                            src={institute.coverImage || "/placeholder.svg?height=160&width=400"}
                            alt={institute.instituteName}
                            fill
                            className="object-cover"
                          />
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-3 right-3 rounded-full w-9 h-9"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0 bg-card">
                              <Image
                                src={institute.logo || "/placeholder.svg?height=48&width=48"}
                                alt={institute.instituteName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link href={`/institutes/${institute.id}`}>
                                <h3 className="font-bold mb-1 hover:text-primary truncate">
                                  {institute.instituteName}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {institute.location.city}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {institute.categories.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-1 mb-4">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold">{institute.rating}</span>
                            <span className="text-sm text-muted-foreground">({institute.reviewCount})</span>
                          </div>

                          <Button className="w-full" asChild>
                            <Link href={`/institutes/${institute.id}`}>View Institute</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Save institutes you're interested in to easily find them later
                      </p>
                      <Button asChild>
                        <Link href="/institutes">Explore Institutes</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Achievements</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-bold mb-1">Course Completer</h3>
                      <p className="text-sm text-muted-foreground">Completed {mockStudent.completedCourses} courses</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-success" />
                      </div>
                      <h3 className="font-bold mb-1">Learning Streak</h3>
                      <p className="text-sm text-muted-foreground">7 days in a row</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center opacity-50">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-bold mb-1">Expert Learner</h3>
                      <p className="text-sm text-muted-foreground">Complete 10 courses</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
