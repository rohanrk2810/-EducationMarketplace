"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BarChart3,
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Edit,
  Eye,
  Bell,
  MessageSquare,
  IndianRupee,
  Calendar,
  Clock,
} from "lucide-react"
import { mockInstitutes, mockCourses, mockReviews } from "@/lib/mock-data"

// Mock institute user data (logged in as TechPro Academy)
const currentInstituteId = "1"
const currentInstitute = mockInstitutes.find((i) => i.id === currentInstituteId)!

// Mock enrollment data
const mockEnrollmentData = [
  { courseId: "c1", studentCount: 22, revenue: 1397000 },
  { courseId: "c2", studentCount: 45, revenue: 9000000 },
]

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)

  const instituteCourses = mockCourses.filter((c) => c.instituteId === currentInstituteId)
  const instituteReviews = mockReviews.filter((r) => r.instituteId === currentInstituteId)

  const totalEnrollments = mockEnrollmentData.reduce((sum, e) => sum + e.studentCount, 0)
  const totalRevenue = mockEnrollmentData.reduce((sum, e) => sum + e.revenue, 0)

  const coursesWithEnrollments = instituteCourses.map((course) => ({
    ...course,
    enrollmentData: mockEnrollmentData.find((e) => e.courseId === course.id),
  }))

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
                <Link href={`/institutes/${currentInstituteId}`}>
                  <Eye className="w-5 h-5" />
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
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 mb-4">
                    <Image
                      src={currentInstitute.logo || "/placeholder.svg?height=80&width=80"}
                      alt={currentInstitute.instituteName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{currentInstitute.instituteName}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {currentInstitute.rating} ({currentInstitute.reviewCount})
                  </div>
                  <Badge variant="secondary">{currentInstitute.status}</Badge>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "courses" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("courses")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Courses
                  </Button>
                  <Button
                    variant={activeTab === "enrollments" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("enrollments")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Enrollments
                  </Button>
                  <Button
                    variant={activeTab === "reviews" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("reviews")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reviews
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/institute/settings">
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
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Enrollments</span>
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{totalEnrollments}</div>
                      <div className="flex items-center gap-1 text-sm text-success">
                        <TrendingUp className="w-3 h-3" />
                        <span>+12% from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active Courses</span>
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{instituteCourses.length}</div>
                      <div className="text-sm text-muted-foreground">
                        Across {currentInstitute.categories.length} categories
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Revenue</span>
                        <IndianRupee className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">₹{(totalRevenue / 100000).toFixed(1)}L</div>
                      <div className="flex items-center gap-1 text-sm text-success">
                        <TrendingUp className="w-3 h-3" />
                        <span>+18% from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Reviews */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Reviews</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("reviews")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {instituteReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <Avatar>
                          <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{review.studentName}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(review.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Course Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coursesWithEnrollments.map((course) => (
                        <div key={course.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{course.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{course.enrollmentData?.studentCount || 0} students</span>
                              <span>₹{((course.enrollmentData?.revenue || 0) / 100000).toFixed(1)}L revenue</span>
                            </div>
                          </div>
                          <Badge variant="secondary">{course.mode}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                        <DialogDescription>Create a new course for your institute</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Course Title</Label>
                          <Input placeholder="e.g., Advanced JavaScript Programming" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {currentInstitute.categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Mode</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="offline">Offline</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea placeholder="Describe your course..." rows={4} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input placeholder="e.g., 6 months" />
                          </div>
                          <div className="space-y-2">
                            <Label>Price (₹)</Label>
                            <Input type="number" placeholder="50000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Capacity</Label>
                            <Input type="number" placeholder="30" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddCourseOpen(false)}>Create Course</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {instituteCourses.map((course) => (
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
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary">{course.category}</Badge>
                                  <Badge variant="outline">{course.mode}</Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-2xl font-bold">
                                  <IndianRupee className="w-5 h-5" />
                                  {course.price.toLocaleString("en-IN")}
                                </div>
                                {course.discount && (
                                  <Badge variant="secondary" className="mt-1">
                                    {course.discount}% OFF
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

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
                              <Button variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "enrollments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Student Enrollments</h2>
                  <Badge variant="secondary">{totalEnrollments} Total</Badge>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {["Priya Kumar", "Amit Sharma", "Sneha Reddy", "Rahul Verma", "Anjali Patel"].map(
                        (name, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Enrolled in {instituteCourses[index % instituteCourses.length]?.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-semibold">
                                  Progress: {Math.floor(Math.random() * 50 + 30)}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Enrolled {Math.floor(Math.random() * 60 + 1)} days ago
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-2xl font-bold">{currentInstitute.rating}</span>
                    <span className="text-muted-foreground">({currentInstitute.reviewCount} reviews)</span>
                  </div>
                </div>

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
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Reply
                              </Button>
                              <span className="text-sm text-muted-foreground">{review.helpful} found helpful</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
