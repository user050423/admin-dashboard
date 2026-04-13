import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Avatar,
  AvatarGroup,
  Button,
  Spinner,
  useToast,
  Alert,
  AlertIcon,
  Divider,
  Icon,
} from '@chakra-ui/react'
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
} from 'lucide-react'
import { ProjectDetail } from '../types/project'
import { generateMockProjectDetail, mockApiCall } from '../services/mockData'
import { USE_MOCK_DATA, MOCK_API_DELAY, LOG_API_REQUESTS, LOG_API_RESPONSES, LOG_API_ERRORS } from '../config/development'

/**
 * Props for ProjectDetailModal component
 */
interface ProjectDetailModalProps {
  projectId: string
  isOpen: boolean
  onClose: () => void
}

/**
 * ProjectDetailModal Component
 *
 * Displays comprehensive project details including:
 * - Overview and description
 * - Team members
 * - Milestones
 * - Activity timeline
 * - Budget information
 * - Attachments
 *
 * Demonstrates realistic request/response patterns with mock data
 */
const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  projectId,
  isOpen,
  onClose,
}) => {
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  /**
   * Fetch project details on modal open
   */
  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetail()
    }
  }, [isOpen, projectId])

  /**
   * Simulate API call to fetch project details
   */
  const fetchProjectDetail = async () => {
    setLoading(true)
    setError(null)

    try {
      if (LOG_API_REQUESTS) {
        console.log(`[API REQUEST] GET /projects/${projectId}`)
      }

      let response

      if (USE_MOCK_DATA) {
        // Use mock data for development
        const mockData = generateMockProjectDetail(projectId)
        response = await mockApiCall({
          success: true,
          data: mockData,
          message: 'Project loaded successfully',
          timestamp: new Date().toISOString(),
          statusCode: 200,
        }, MOCK_API_DELAY)
      } else {
        // Use real API call
        // Uncomment when ready to use real API:
        // const response = await projectService.getProjectDetail(projectId)
        throw new Error('Real API not configured. Set USE_MOCK_DATA=false and configure your API endpoint.')
      }

      if (LOG_API_RESPONSES) {
        console.log('[API RESPONSE]', response)
      }

      setProject(response.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load project'
      setError(errorMessage)
      if (LOG_API_ERRORS) {
        console.error('[API ERROR]', errorMessage)
      }
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * Format file size
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  /**
   * Format date
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  /**
   * Get priority color
   */
  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      critical: 'red',
    }
    return colorMap[priority] || 'gray'
  }

  /**
   * Get milestone status color
   */
  const getMilestoneStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      completed: 'green',
      'in-progress': 'blue',
      pending: 'gray',
    }
    return colorMap[status] || 'gray'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        {/* Header */}
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <Box flex={1}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                  {project?.title || 'Loading...'}
                </Text>
                {project && (
                  <Badge colorScheme={getPriorityColor(project.priority)}>
                    {project.priority.toUpperCase()}
                  </Badge>
                )}
              </Box>
            </HStack>
          </VStack>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {loading && (
            <VStack justify="center" align="center" h="300px" spacing={4}>
              <Spinner size="lg" color="brand.500" />
              <Text color="gray.600">Loading project details...</Text>
            </VStack>
          )}

          {error && (
            <Alert status="error" borderRadius="md" mb={6}>
              <AlertIcon />
              <Text>{error}</Text>
            </Alert>
          )}

          {project && (
            <VStack spacing={6} align="stretch">
              {/* Quick Stats */}
              <Grid gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
                {/* Status */}
                <Box bg="gray.50" p={4} borderRadius="lg">
                  <Text fontSize="xs" color="gray.600" fontWeight="600" mb={2}>
                    STATUS
                  </Text>
                  <Badge
                    colorScheme={
                      project.status === 'in-progress'
                        ? 'orange'
                        : project.status === 'review'
                          ? 'purple'
                          : 'green'
                    }
                  >
                    {project.status === 'in-progress'
                      ? 'In Progress'
                      : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </Box>

                {/* Budget */}
                {project.budget && (
                  <Box bg="gray.50" p={4} borderRadius="lg">
                    <HStack spacing={2} mb={2}>
                      <Icon as={DollarSign} w={3} h={3} color="gray.600" />
                      <Text fontSize="xs" color="gray.600" fontWeight="600">
                        BUDGET
                      </Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="600">
                      ${project.budget.spent.toLocaleString()} / ${project.budget.allocated.toLocaleString()}
                    </Text>
                    <Progress
                      value={(project.budget.spent / project.budget.allocated) * 100}
                      size="sm"
                      colorScheme="brand"
                      mt={2}
                      borderRadius="sm"
                    />
                  </Box>
                )}

                {/* Team Size */}
                <Box bg="gray.50" p={4} borderRadius="lg">
                  <HStack spacing={2} mb={2}>
                    <Icon as={Users} w={3} h={3} color="gray.600" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      TEAM
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="600">
                    {project.stats.teamMembers} members
                  </Text>
                </Box>

                {/* Productivity */}
                <Box bg="gray.50" p={4} borderRadius="lg">
                  <Text fontSize="xs" color="gray.600" fontWeight="600" mb={2}>
                    PRODUCTIVITY
                  </Text>
                  <Text fontSize="sm" fontWeight="600" mb={2}>
                    {project.stats.productivity}%
                  </Text>
                  <Progress
                    value={project.stats.productivity}
                    size="sm"
                    colorScheme="green"
                    borderRadius="sm"
                  />
                </Box>
              </Grid>

              <Divider />

              {/* Overview */}
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="600" color="gray.600">
                  OVERVIEW
                </Text>
                <Text fontSize="sm" color="gray.700" lineHeight="1.6">
                  {project.overview}
                </Text>
              </VStack>

              {/* Key Details */}
              <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                <Box bg="gray.50" p={3} borderRadius="md">
                  <HStack spacing={2} mb={1}>
                    <Icon as={Calendar} w={3} h={3} color="gray.600" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      START DATE
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="500">
                    {formatDate(project.startDate)}
                  </Text>
                </Box>

                <Box bg="gray.50" p={3} borderRadius="md">
                  <HStack spacing={2} mb={1}>
                    <Icon as={Calendar} w={3} h={3} color="gray.600" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      DUE DATE
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="500">
                    {formatDate(project.dueDate)}
                  </Text>
                </Box>
              </Grid>

              {/* Detailed Tabs */}
              <Tabs colorScheme="brand" variant="soft-rounded">
                <TabList>
                  <Tab>Milestones</Tab>
                  <Tab>Team</Tab>
                  <Tab>Activity</Tab>
                  <Tab>Attachments</Tab>
                </TabList>

                <TabPanels>
                  {/* Milestones Tab */}
                  <TabPanel>
                    <VStack spacing={3} align="stretch">
                      {project.milestones.map((milestone) => (
                        <Box key={milestone.id} borderLeft="4px" borderColor={`${getMilestoneStatusColor(milestone.status)}.200`} pl={4} py={2}>
                          <HStack justify="space-between" mb={1}>
                            <Text fontWeight="600" color="gray.800">
                              {milestone.title}
                            </Text>
                            <Badge colorScheme={getMilestoneStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {formatDate(milestone.dueDate)}
                          </Text>
                          {milestone.completedDate && (
                            <Text fontSize="xs" color="green.600">
                              ✓ Completed on {formatDate(milestone.completedDate)}
                            </Text>
                          )}
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Team Tab */}
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <AvatarGroup size="lg" max={8}>
                        {project.teamMembers.map((member) => (
                          <Avatar key={member.id} name={member.name} title={member.email} />
                        ))}
                      </AvatarGroup>

                      <VStack spacing={3} align="stretch">
                        {project.teamMembers.map((member) => (
                          <Box key={member.id} p={3} bg="gray.50" borderRadius="md">
                            <HStack justify="space-between">
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="600" color="gray.800">
                                  {member.name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {member.role}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {member.email}
                                </Text>
                              </VStack>
                              <Badge colorScheme="blue" variant="subtle">
                                {member.role}
                              </Badge>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </VStack>
                  </TabPanel>

                  {/* Activity Tab */}
                  <TabPanel>
                    <VStack spacing={3} align="stretch">
                      {project.activity.map((activity) => (
                        <Box key={activity.id} p={3} bg="gray.50" borderRadius="md">
                          <HStack justify="space-between" mb={1}>
                            <HStack spacing={2}>
                              <Text fontWeight="600" color="gray.800">
                                {activity.userName}
                              </Text>
                              <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                {activity.action}
                              </Badge>
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.700">
                            {activity.description}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Attachments Tab */}
                  <TabPanel>
                    <VStack spacing={3} align="stretch">
                      {project.attachments.length > 0 ? (
                        project.attachments.map((attachment) => (
                          <HStack
                            key={attachment.id}
                            p={3}
                            bg="gray.50"
                            borderRadius="md"
                            justify="space-between"
                            _hover={{ bg: 'gray.100' }}
                            cursor="pointer"
                          >
                            <VStack align="start" spacing={0} flex={1}>
                              <Text fontWeight="500" color="gray.800">
                                {attachment.name}
                              </Text>
                              <Text fontSize="xs" color="gray.600">
                                {formatFileSize(attachment.size)} • {attachment.uploadedBy} •{' '}
                                {formatDate(attachment.uploadedAt)}
                              </Text>
                            </VStack>
                            <Button size="sm" variant="ghost" colorScheme="brand">
                              <Icon as={Download} w={4} h={4} />
                            </Button>
                          </HStack>
                        ))
                      ) : (
                        <Text color="gray.500" textAlign="center" py={6}>
                          No attachments yet
                        </Text>
                      )}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              {/* Task Statistics */}
              <Box bg="brand.50" p={4} borderRadius="lg" borderLeft="4px" borderColor="brand.500">
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={3}>
                  TASK STATISTICS
                </Text>
                <Grid gridTemplateColumns="repeat(2, 1fr)" gap={3}>
                  <HStack spacing={2}>
                    <Icon as={CheckCircle} w={4} h={4} color="green.500" />
                    <VStack spacing={0} align="start">
                      <Text fontSize="xs" color="gray.600">
                        Completed
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        {project.stats.completedTasks}/{project.stats.totalTasks}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={2}>
                    <Icon as={Clock} w={4} h={4} color="blue.500" />
                    <VStack spacing={0} align="start">
                      <Text fontSize="xs" color="gray.600">
                        In Progress
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        {project.stats.inProgressTasks}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={2}>
                    <Icon as={AlertCircle} w={4} h={4} color="red.500" />
                    <VStack spacing={0} align="start">
                      <Text fontSize="xs" color="gray.600">
                        Overdue
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        {project.stats.overdueTasks}
                      </Text>
                    </VStack>
                  </HStack>
                </Grid>
              </Box>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ProjectDetailModal
