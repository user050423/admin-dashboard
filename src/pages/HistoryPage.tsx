import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import {
  CheckCircle,
  Clipboard,
  Edit,
  FileText,
  FolderOpen,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Mock history data
 */
const mockHistory = [
  {
    id: '1',
    action: 'Project Created',
    description: 'Admin Dashboard Redesign project was created',
    timestamp: '2024-03-15 10:30 AM',
    icon: Clipboard,
    color: 'blue',
  },
  {
    id: '2',
    action: 'Document Updated',
    description: 'Design system documentation was updated',
    timestamp: '2024-03-14 2:15 PM',
    icon: Edit,
    color: 'purple',
  },
  {
    id: '3',
    action: 'File Uploaded',
    description: 'Wireframes_v2.pdf was uploaded',
    timestamp: '2024-03-13 11:45 AM',
    icon: FileText,
    color: 'red',
  },
  {
    id: '4',
    action: 'Project Completed',
    description: 'Q3 Campaign project marked as complete',
    timestamp: '2024-03-12 4:20 PM',
    icon: CheckCircle,
    color: 'green',
  },
  {
    id: '5',
    action: 'Folder Created',
    description: 'New folder "Assets" created in shared drive',
    timestamp: '2024-03-11 9:00 AM',
    icon: FolderOpen,
    color: 'orange',
  },
]

/**
 * History Page Component
 * Displays activity history and timeline
 */
const HistoryPage: React.FC = () => {
  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="History"
          description="View your activity timeline and project history"
        />

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {[
            { label: 'Projects', value: '12', color: 'blue' },
            { label: 'Documents', value: '47', color: 'purple' },
            { label: 'Uploads', value: '156', color: 'orange' },
            { label: 'Actions', value: '523', color: 'green' },
          ].map((stat, idx) => (
            <Card key={idx} bg="white" boxShadow="sm">
              <CardBody>
                <VStack spacing={2}>
                  <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                    {stat.label}
                  </Text>
                  <Heading size="lg" color={`${stat.color}.500`}>
                    {stat.value}
                  </Heading>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Activity Timeline */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <Heading size="md" mb={8}>
              Recent Activity
            </Heading>
            <VStack spacing={8} align="stretch">
              {mockHistory.map((item, idx) => (
                <VStack key={item.id} spacing={0} align="start" position="relative">
                  {/* Timeline dot and line */}
                  <Box position="absolute" left="14px" top="12px" bottom={idx < mockHistory.length - 1 ? '-32px' : 'auto'} w="2px" bg="gray.200" />
                  
                  {/* Timeline item */}
                  <Box position="relative" zIndex={1}>
                    <Box
                      w={8}
                      h={8}
                      borderRadius="full"
                      bg={`${item.color}.50`}
                      border="2px solid"
                      borderColor={`${item.color}.500`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={item.icon}
                        w={4}
                        h={4}
                        color={`${item.color}.500`}
                      />
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box ml={16} mt={-8}>
                    <Heading size="sm">{item.action}</Heading>
                    <Text color="gray.600" fontSize="sm" mt={1}>
                      {item.description}
                    </Text>
                    <Text color="gray.500" fontSize="xs" mt={2}>
                      {item.timestamp}
                    </Text>
                  </Box>
                </VStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default HistoryPage
