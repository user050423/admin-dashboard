import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react'
import { Project } from '../types'

/**
 * Props for ProjectCard component
 */
interface ProjectCardProps {
  project: Project
}

/**
 * Color mapping for project cards
 */
const colorScheme: { [key: string]: { bg: string; badge: string } } = {
  pink: { bg: 'pink.100', badge: 'pink' },
  green: { bg: 'green.100', badge: 'green' },
  blue: { bg: 'blue.100', badge: 'blue' },
  yellow: { bg: 'yellow.100', badge: 'yellow' },
}

/**
 * Status badge color mapping
 */
const statusColorMap: { [key: string]: string } = {
  'in-progress': 'orange',
  review: 'purple',
  done: 'green',
}

/**
 * ProjectCard Component
 * 
 * Displays individual project information with status and team avatars
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const scheme = colorScheme[project.color] || colorScheme.pink
  const statusColor = statusColorMap[project.status] || 'gray'

  return (
    <Box
      bg={scheme.bg}
      borderRadius="lg"
      p={6}
      h="full"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
      cursor="pointer"
    >
      <VStack spacing={4} align="stretch" h="full">
        {/* Top Section - Tags */}
        <HStack justify="space-between">
          <Badge colorScheme={scheme.badge} variant="solid">
            {project.category}
          </Badge>
          <Badge colorScheme={statusColor} variant="subtle">
            {project.status === 'in-progress'
              ? 'In Progress'
              : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </HStack>

        {/* Title and Description */}
        <VStack spacing={1} align="start" flex={1}>
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            {project.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {project.description}
          </Text>
        </VStack>

        {/* Footer - Avatars */}
        <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.300">
          <AvatarGroup size="sm" max={3}>
            {project.avatars.map((avatar, idx) => (
              <Avatar
                key={idx}
                name={avatar}
                bg="brand.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
              />
            ))}
          </AvatarGroup>
          <Text fontSize="xs" color="gray.500">
            {new Date().toLocaleDateString()}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ProjectCard
