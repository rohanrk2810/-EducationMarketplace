// Core data types for the education marketplace

export type UserRole = "student" | "institute" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface Student extends User {
  role: "student"
  phone?: string
  wishlist: string[] // Institute IDs
  enrolledCourses: string[] // Course IDs
}

export interface Institute extends User {
  role: "institute"
  instituteName: string
  description: string
  logo?: string
  coverImage?: string
  location: {
    city: string
    state: string
    address: string
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  categories: CourseCategory[]
  rating: number
  reviewCount: number
  establishedYear: number
  verified: boolean
  featured: boolean
  facilities: string[]
  gallery: string[]
  status: "pending" | "approved" | "rejected"
}

export type CourseCategory = "IT" | "JEE" | "NEET" | "Foundation" | "Banking" | "SSC" | "UPSC"

export interface Course {
  id: string
  instituteId: string
  title: string
  category: CourseCategory
  description: string
  duration: string
  mode: "online" | "offline" | "hybrid"
  price: number
  discount?: number
  features: string[]
  curriculum: string[]
  startDate: Date
  capacity: number
  enrolled: number
  thumbnail?: string
}

export interface Review {
  id: string
  instituteId: string
  studentId: string
  studentName: string
  rating: number
  comment: string
  createdAt: Date
  helpful: number
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  instituteId: string
  status: "pending" | "active" | "completed" | "cancelled"
  enrolledAt: Date
  completedAt?: Date
  progress: number
}
