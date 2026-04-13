import React from 'react'
import { Box, HStack } from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import PageRouter from './components/PageRouter'
import RightSidebar from './components/RightSidebar'

/**
 * App Component
 * 
 * Root component that orchestrates the main layout and structure
 * Uses Chakra UI for styling and Zustand for state management
 * Displays different pages based on navigation selection
 */
const App: React.FC = () => {
  return (
    <HStack spacing={0} h="100vh" bg="gray.50" align="stretch">
      {/* Sidebar Navigation */}
      <Box display={{ base: 'none', md: 'block' }} overflowY="auto">
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column" overflowY="hidden">
        {/* Header */}
        <Header />

        {/* Content Grid */}
        <HStack spacing={0} flex={1} align="stretch" overflowY="hidden">
          {/* Page Router - Displays different pages */}
          <Box flex={1} overflowY="auto">
            <PageRouter />
          </Box>

          {/* Right Sidebar */}
          <Box
            w={{ base: '100%', lg: '300px' }}
            display={{ base: 'none', lg: 'block' }}
            overflowY="auto"
            borderLeft="1px solid"
            borderColor="gray.200"
          >
            <RightSidebar />
          </Box>
        </HStack>
      </Box>
    </HStack>
  )
}

export default App
