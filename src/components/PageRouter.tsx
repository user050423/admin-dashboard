import React, { lazy, Suspense } from 'react'
import { Spinner, Center } from '@chakra-ui/react'
import { useDashboardStore } from '../store/dashboardStore'

// Lazy load all page components for better performance
const HomePage = lazy(() => import('../pages/HomePage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const MessagesPage = lazy(() => import('../pages/MessagesPage'))
const HistoryPage = lazy(() => import('../pages/HistoryPage'))
const SchedulePage = lazy(() => import('../pages/SchedulePage'))
const CommunitiesPage = lazy(() => import('../pages/CommunitiesPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const SupportPage = lazy(() => import('../pages/SupportPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))

/**
 * Page Router Component
 * 
 * Routes to the appropriate page component based on activePage state
 * Handles lazy loading with suspense fallback
 */
const PageRouter: React.FC = () => {
  const { activePage } = useDashboardStore()

  // Map page IDs to components
  const pageMap: { [key: string]: React.ComponentType } = {
    home: HomePage,
    profile: ProfilePage,
    messages: MessagesPage,
    history: HistoryPage,
    schedule: SchedulePage,
    communities: CommunitiesPage,
    settings: SettingsPage,
    support: SupportPage,
    privacy: PrivacyPage,
  }

  const PageComponent = pageMap[activePage] || HomePage

  return (
    <Suspense
      fallback={
        <Center h="100%" w="100%">
          <Spinner size="lg" color="brand.500" />
        </Center>
      }
    >
      <PageComponent />
    </Suspense>
  )
}

export default PageRouter
