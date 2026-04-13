import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Grid,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useDashboardStore } from '../store/dashboardStore'
import ProjectCard from '../components/ProjectCard'
import UpcomingEvent from '../components/UpcomingEvent'

/**
 * Home Page Component
 * Main dashboard view with projects and upcoming events
 */
const HomePage: React.FC = () => {
  const { projects, upcomingEvents } = useDashboardStore()

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        {/* Greeting Section */}
        <VStack spacing={2} align="start">
          <Heading as="h1" size="2xl">
            Hello <span style={{ fontStyle: 'italic', color: '#667eea' }}>Koko</span>
            <span style={{ marginLeft: '0.5rem' }}>✨</span>
          </Heading>
          <Text color="gray.600" fontSize="md">
            Here's what's happening across your workspace today
          </Text>
        </VStack>

        {/* Projects Section */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading as="h2" size="lg">
              Projects
            </Heading>
            <Button variant="ghost" colorScheme="brand" size="sm">
              Show all →
            </Button>
          </HStack>

          <Grid
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={6}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Grid>
        </VStack>

        {/* Upcoming Events Section */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading as="h2" size="lg">
              Upcoming
            </Heading>
            <Button variant="ghost" colorScheme="brand" size="sm">
              Show all →
            </Button>
          </HStack>

          <VStack spacing={3} align="stretch">
            {upcomingEvents.map((event) => (
              <UpcomingEvent key={event.id} event={event} />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default HomePage
