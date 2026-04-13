import { create } from 'zustand'
import { 
  NavGroup, 
  Project, 
  UpcomingEvent, 
  Announcement, 
  Article, 
  UploadItem,
  UserProfile 
} from '../types'

/**
 * Dashboard Store State Interface
 */
interface DashboardState {
  // Navigation
  navGroups: NavGroup[]
  activePage: string
  
  // Data
  projects: Project[]
  upcomingEvents: UpcomingEvent[]
  announcements: Announcement[]
  articles: Article[]
  uploads: UploadItem[]
  notifications: Announcement[]
  
  // User
  currentUser: UserProfile
  
  // UI State
  sidebarOpen: boolean
  searchQuery: string
  searchCategory: 'All' | 'Projects' | 'People'
  notificationCount: number
  notificationPanelOpen: boolean
  notificationModalOpen: boolean
  selectedNotification: Announcement | null
  
  // Actions
  setActivePage: (page: string) => void
  setSidebarOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setSearchCategory: (category: 'All' | 'Projects' | 'People') => void
  markNotificationsRead: () => void
  toggleNotificationPanel: () => void
  closeNotificationPanel: () => void
  openNotificationModal: (notification: Announcement) => void
  closeNotificationModal: () => void
}

/**
 * Initialize navigation groups
 */
const initializeNavGroups = (): NavGroup[] => [
  {
    title: 'General',
    items: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'profile', label: 'Profile', icon: 'user' },
      { id: 'messages', label: 'Messages', icon: 'message' },
      { id: 'history', label: 'History', icon: 'history' },
      { id: 'schedule', label: 'Schedule', icon: 'calendar' },
      { id: 'communities', label: 'Communities', icon: 'people' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
      { id: 'support', label: 'Support', icon: 'help' },
      { id: 'privacy', label: 'Privacy', icon: 'lock' },
    ],
  },
]

/**
 * Initialize sample projects
 */
const initializeProjects = (): Project[] => [
  {
    id: '1',
    title: 'Admin Dashboard',
    description: 'UI & Responsiveness',
    category: 'UI Design',
    status: 'in-progress',
    avatars: ['A', 'B', 'C'],
    color: 'pink',
  },
  {
    id: '2',
    title: 'Q3 Campaign',
    description: 'Marketing Outreach',
    category: 'Marketing',
    status: 'review',
    avatars: ['M', 'J'],
    color: 'green',
  },
  {
    id: '3',
    title: 'App Launch',
    description: 'Mobile release v2.0',
    category: 'Mobile',
    status: 'done',
    avatars: ['K', 'L', 'P'],
    color: 'blue',
  },
  {
    id: '4',
    title: 'Analytics Dashboard',
    description: 'Data Reporting & KPIs',
    category: 'Analytics',
    status: 'in-progress',
    avatars: ['R'],
    color: 'yellow',
  },
]

/**
 * Initialize upcoming events
 */
const initializeUpcomingEvents = (): UpcomingEvent[] => [
  {
    id: '1',
    title: 'Admin Dashboard Review',
    date: 'Mon',
    time: '10:00 AM',
    project: 'Admin Dashboard',
    category: 'Design',
  },
  {
    id: '2',
    title: 'Project Meeting',
    date: 'Mon',
    time: '1:00 AM',
    project: 'Library Project',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Team Standup',
    date: 'Mon',
    time: '4:00 AM',
    project: 'Learn Factor Functions',
    category: 'Design',
  },
]

/**
 * Initialize announcements
 */
const initializeAnnouncements = (): Announcement[] => [
  {
    id: '1',
    title: 'Platform v2.0 is live!',
    body: 'New calendar sync and dark mode now available. Check settings to enable.',
    highlight: true,
  },
  {
    id: '2',
    title: 'Scheduled Maintenance',
    body: 'Sunday, April 6 2:00-4:00AM. Expect brief downtime.',
  },
  {
    id: '3',
    title: 'Admin Dashboard Due',
    body: 'Submit today via Teams section.',
  },
]

/**
 * Initialize articles
 */
const initializeArticles = (): Article[] => [
  {
    id: '1',
    title: 'Best Practices for Web Design',
    readTime: 8,
  },
  {
    id: '2',
    title: 'How to think like a programmer',
    readTime: 5,
  },
  {
    id: '3',
    title: 'Modern CSS Techniques',
    readTime: 4,
  },
]

/**
 * Initialize uploads
 */
const initializeUploads = (): UploadItem[] => [
  {
    id: '1',
    name: 'Brand Guidelines',
    type: 'pdf',
  },
  {
    id: '2',
    name: 'Design System Documentation',
    type: 'doc',
  },
]

/**
 * Initialize notifications
 */
const initializeNotifications = (): Announcement[] => [
  {
    id: '1',
    title: 'Project Review Complete',
    body: 'Your admin dashboard project has passed design review. Next phase starts Monday.',
    highlight: true,
  },
  {
    id: '2',
    title: 'Team Member Added',
    body: 'Sarah Johnson has been added to the Admin Dashboard project.',
  },
  {
    id: '3',
    title: 'Milestone Updated',
    body: 'Design phase milestone has been updated to 85% complete.',
  },
  {
    id: '4',
    title: 'New Comment on Project',
    body: 'Mike Chen commented on the project specifications document.',
  },
]

/**
 * Zustand store for dashboard state management
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  navGroups: initializeNavGroups(),
  activePage: 'home',
  projects: initializeProjects(),
  upcomingEvents: initializeUpcomingEvents(),
  announcements: initializeAnnouncements(),
  articles: initializeArticles(),
  uploads: initializeUploads(),
  notifications: initializeNotifications(),
  currentUser: {
    id: 'user_1',
    name: 'Miranda',
    role: 'Product Designer',
    avatar: 'M',
    email: 'miranda@example.com',
  },
  sidebarOpen: true,
  searchQuery: '',
  searchCategory: 'All',
  notificationCount: 4,
  notificationPanelOpen: false,
  notificationModalOpen: false,
  selectedNotification: null,

  // Actions
  setActivePage: (page: string) => set({ activePage: page }),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSearchCategory: (category: 'All' | 'Projects' | 'People') => set({ searchCategory: category }),
  markNotificationsRead: () => set({ notificationCount: 0 }),
  toggleNotificationPanel: () => set((state) => ({ notificationPanelOpen: !state.notificationPanelOpen })),
  closeNotificationPanel: () => set({ notificationPanelOpen: false }),
  openNotificationModal: (notification: Announcement) => set({ notificationModalOpen: true, selectedNotification: notification }),
  closeNotificationModal: () => set({ notificationModalOpen: false, selectedNotification: null }),
}))
