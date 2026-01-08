"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BarChart3,
  Users,
  Building,
  BookOpen,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Bell,
  CheckCircle2,
  XCircle,
  Eye,
  Shield,
  IndianRupee,
  Activity,
  AlertCircle,
} from "lucide-react"
import { mockInstitutes, mockCourses } from "@/lib/mock-data"

// Mock platform stats
const platformStats = {
  totalUsers: 52340,
  totalInstitutes: 524,
  totalCourses: 1847,
  totalRevenue: 45600000,
  pendingApprovals: 12,
  activeEnrollments: 8965,
  newUsersThisMonth: 1234,
  revenueThisMonth: 3800000,
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedInstitute, setSelectedInstitute] = useState<(typeof mockInstitutes)[0] | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)

  const pendingInstitutes = mockInstitutes.filter((i) => i.status === "pending")
  const approvedInstitutes = mockInstitutes.filter((i) => i.status === "approved")

  const handleApproval = (instituteId: string, action: "approve" | "reject") => {
    console.log(`${action} institute:`, instituteId)
    setShowApprovalDialog(false)
    setSelectedInstitute(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold text-foreground">EduMarket Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback>
                  <Shield className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
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
                    variant={activeTab === "institutes" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("institutes")}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Institutes
                    {pendingInstitutes.length > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {pendingInstitutes.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === "users" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("users")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Users
                  </Button>
                  <Button
                    variant={activeTab === "courses" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("courses")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Courses
                  </Button>
                  <Button
                    variant={activeTab === "reports" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("reports")}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
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
                <div>
                  <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
                  <p className="text-muted-foreground">Monitor and manage the EduMarket platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Users</span>
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{platformStats.totalUsers.toLocaleString()}</div>
                      <div className="flex items-center gap-1 text-sm text-success">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{platformStats.newUsersThisMonth} this month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Institutes</span>
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{platformStats.totalInstitutes}</div>
                      <div className="text-sm text-muted-foreground">{pendingInstitutes.length} pending approval</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Courses</span>
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{platformStats.totalCourses.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {platformStats.activeEnrollments.toLocaleString()} enrollments
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Platform Revenue</span>
                        <IndianRupee className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-1">
                        ₹{(platformStats.totalRevenue / 10000000).toFixed(1)}Cr
                      </div>
                      <div className="flex items-center gap-1 text-sm text-success">
                        <TrendingUp className="w-3 h-3" />
                        <span>₹{(platformStats.revenueThisMonth / 100000).toFixed(1)}L this month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pending Approvals Alert */}
                {pendingInstitutes.length > 0 && (
                  <Card className="border-primary/50 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Pending Institute Approvals</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {pendingInstitutes.length} institutes waiting for approval
                          </p>
                          <Button onClick={() => setActiveTab("institutes")}>Review Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "New institute registered",
                          details: "CodeMaster Institute - Pune",
                          time: "2 hours ago",
                          icon: Building,
                        },
                        {
                          action: "Course published",
                          details: "React Native Development by TechPro Academy",
                          time: "5 hours ago",
                          icon: BookOpen,
                        },
                        {
                          action: "New user signup",
                          details: "1,234 new students this month",
                          time: "1 day ago",
                          icon: Users,
                        },
                        {
                          action: "Review reported",
                          details: "Inappropriate content flagged on Allen Career Institute",
                          time: "2 days ago",
                          icon: AlertCircle,
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <activity.icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{activity.action}</h4>
                            <p className="text-sm text-muted-foreground">{activity.details}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Institutes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Institutes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvedInstitutes
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5)
                        .map((institute, index) => (
                          <div
                            key={institute.id}
                            className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-muted-foreground w-8">#{index + 1}</span>
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={institute.logo || "/placeholder.svg?height=48&width=48"}
                                  alt={institute.instituteName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">{institute.instituteName}</h4>
                                <p className="text-sm text-muted-foreground">{institute.location.city}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold">{institute.rating} ⭐</p>
                                <p className="text-sm text-muted-foreground">{institute.reviewCount} reviews</p>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/institutes/${institute.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "institutes" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Institute Management</h2>
                    <p className="text-muted-foreground">Review and manage registered institutes</p>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-12" />
                </div>

                {/* Pending Approvals */}
                {pendingInstitutes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Pending Approvals
                        <Badge variant="destructive">{pendingInstitutes.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingInstitutes.map((institute) => (
                          <div key={institute.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={institute.logo || "/placeholder.svg?height=64&width=64"}
                                alt={institute.instituteName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold mb-1">{institute.instituteName}</h3>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{institute.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{institute.location.city}</Badge>
                                {institute.categories.map((cat) => (
                                  <Badge key={cat} variant="outline">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedInstitute(institute)
                                    setShowApprovalDialog(true)
                                  }}
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApproval(institute.id, "reject")}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                                <Button size="sm" variant="ghost" asChild>
                                  <Link href={`/institutes/${institute.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* All Institutes */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Institutes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Institute</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Categories</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedInstitutes.slice(0, 10).map((institute) => (
                          <TableRow key={institute.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={institute.logo || "/placeholder.svg?height=40&width=40"}
                                    alt={institute.instituteName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold">{institute.instituteName}</p>
                                  <p className="text-sm text-muted-foreground">Est. {institute.establishedYear}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{institute.location.city}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {institute.categories.slice(0, 2).map((cat) => (
                                  <Badge key={cat} variant="secondary" className="text-xs">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">{institute.rating}</span>
                                <span className="text-sm text-muted-foreground">({institute.reviewCount})</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={institute.verified ? "default" : "secondary"}>
                                {institute.verified ? "Verified" : "Unverified"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/institutes/${institute.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">User Management</h2>
                    <p className="text-muted-foreground">View and manage platform users</p>
                  </div>
                  <Badge variant="secondary">{platformStats.totalUsers.toLocaleString()} Total Users</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">{(platformStats.totalUsers * 0.85).toFixed(0)}</div>
                        <p className="text-sm text-muted-foreground">Students</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">{platformStats.totalInstitutes}</div>
                        <p className="text-sm text-muted-foreground">Institutes</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">{platformStats.newUsersThisMonth}</div>
                        <p className="text-sm text-muted-foreground">New This Month</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">User management table would appear here</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Course Management</h2>
                    <p className="text-muted-foreground">Monitor all courses on the platform</p>
                  </div>
                  <Badge variant="secondary">{platformStats.totalCourses.toLocaleString()} Total Courses</Badge>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mockCourses.slice(0, 8).map((course) => {
                        const institute = mockInstitutes.find((i) => i.id === course.instituteId)
                        return (
                          <div
                            key={course.id}
                            className="flex items-center justify-between pb-4 border-b last:border-0"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{course.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{institute?.instituteName}</span>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  {course.category}
                                </Badge>
                                <span>•</span>
                                <span>
                                  {course.enrolled}/{course.capacity} enrolled
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold">₹{course.price.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{course.mode}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Reports & Analytics</h2>
                  <p className="text-muted-foreground">View reported content and analytics</p>
                </div>

                <Card>
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">No Active Reports</h3>
                    <p className="text-muted-foreground">All reported content has been reviewed</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Institute</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedInstitute?.instituteName}? This will make the institute visible
              on the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedInstitute && handleApproval(selectedInstitute.id, "approve")}>
              Approve Institute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
