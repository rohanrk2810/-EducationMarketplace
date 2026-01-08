import type { Institute, Course, CourseCategory } from "../types"

export interface FilterOptions {
  category?: CourseCategory
  city?: string
  mode?: "online" | "offline" | "hybrid"
  priceRange?: { min: number; max: number }
  rating?: number
  verified?: boolean
  featured?: boolean
  search?: string
}

export function filterInstitutes(institutes: Institute[], filters: FilterOptions): Institute[] {
  return institutes.filter((institute) => {
    if (filters.category && !institute.categories.includes(filters.category)) {
      return false
    }
    if (filters.city && institute.location.city !== filters.city) {
      return false
    }
    if (filters.rating && institute.rating < filters.rating) {
      return false
    }
    if (filters.verified !== undefined && institute.verified !== filters.verified) {
      return false
    }
    if (filters.featured !== undefined && institute.featured !== filters.featured) {
      return false
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        institute.instituteName.toLowerCase().includes(searchLower) ||
        institute.description.toLowerCase().includes(searchLower) ||
        institute.location.city.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }
    return true
  })
}

export function filterCourses(courses: Course[], filters: FilterOptions): Course[] {
  return courses.filter((course) => {
    if (filters.category && course.category !== filters.category) {
      return false
    }
    if (filters.mode && course.mode !== filters.mode) {
      return false
    }
    if (filters.priceRange) {
      const price = course.discount ? course.price * (1 - course.discount / 100) : course.price
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false
      }
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        course.title.toLowerCase().includes(searchLower) || course.description.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }
    return true
  })
}

export function sortInstitutes(institutes: Institute[], sortBy: "rating" | "reviews" | "name" | "newest"): Institute[] {
  const sorted = [...institutes]
  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "reviews":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case "name":
      return sorted.sort((a, b) => a.instituteName.localeCompare(b.instituteName))
    case "newest":
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    default:
      return sorted
  }
}
