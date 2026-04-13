/**
 * Navigation item interface
 */
export interface NavItem {
  id: string
  label: string
  icon: string
  href?: string
}

/**
 * Navigation group interface
 */
export interface NavGroup {
  title: string
  items: NavItem[]
}

/**
 * Project card interface
 */
export interface Project {
  id: string
  title: string
  description: string
  category: string
  status: 'in-progress' | 'review' | 'done'
  avatars: string[]
  color: 'pink' | 'green' | 'blue' | 'yellow'
}

/**
 * Upcoming event interface
 */
export interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  project: string
  category: string
}

/**
 * Announcement interface
 */
export interface Announcement {
  id: string
  title: string
  body: string
  highlight?: boolean
}

/**
 * Article interface
 */
export interface Article {
  id: string
  title: string
  readTime: number
  thumbnail?: string
}

/**
 * Upload item interface
 */
export interface UploadItem {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'image'
}

/**
 * User profile interface
 */
export interface UserProfile {
  id: string
  name: string
  role: string
  avatar: string
  email?: string
}
