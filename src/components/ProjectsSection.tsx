import React, { useState } from 'react'
import {
  Box,
  VStack,
  Grid,
  Heading,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useDashboardStore } from '../store/dashboardStore'
import ProjectCard from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'

/**
 * ProjectsSection Component
 *
 * Displays a grid of project cards with ability to view details
 */
const ProjectsSection: React.FC = () => {
  const { projects } = useDashboardStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  /**
   * Handle project card click to open details
   */
  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId)
    onOpen()
  }

  return (
    <>
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
            <Box
              key={project.id}
              cursor="pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <ProjectCard project={project} />
            </Box>
          ))}
        </Grid>
      </VStack>

      {/* Project Detail Modal */}
      {selectedProjectId && (
        <ProjectDetailModal
          projectId={selectedProjectId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default ProjectsSection
