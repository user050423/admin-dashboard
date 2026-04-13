import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Badge,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { CalendarCheck, Clock, CheckCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useDashboardStore } from '../store/dashboardStore'

/**
 * Schedule Page Component
 * Displays calendar and scheduled events
 */
const SchedulePage: React.FC = () => {
  const { upcomingEvents } = useDashboardStore()

  // Group events by date
  const eventsByDate = upcomingEvents.reduce((acc, event) => {
    const key = event.date
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(event)
    return acc
  }, {} as Record<string, typeof upcomingEvents>)

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Schedule"
          description="Manage your calendar and upcoming events"
        />

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Card bg="white" boxShadow="sm">
            <CardBody>
              <HStack spacing={4}>
                <Icon
                  as={CalendarCheck}
                  w={8}
                  h={8}
                  color="blue.500"
                />
                <VStack spacing={0} align="start">
                  <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                    Scheduled
                  </Text>
                  <Heading size="md">{upcomingEvents.length}</Heading>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          <Card bg="white" boxShadow="sm">
            <CardBody>
              <HStack spacing={4}>
                <Icon
                  as={Clock}
                  w={8}
                  h={8}
                  color="orange.500"
                />
                <VStack spacing={0} align="start">
                  <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                    This Week
                  </Text>
                  <Heading size="md">{Object.keys(eventsByDate).length}</Heading>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          <Card bg="white" boxShadow="sm">
            <CardBody>
              <HStack spacing={4}>
                <Icon
                  as={CheckCircle}
                  w={8}
                  h={8}
                  color="green.500"
                />
                <VStack spacing={0} align="start">
                  <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                    Completed
                  </Text>
                  <Heading size="md">18</Heading>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Events by Date */}
        <VStack spacing={6} align="stretch">
          {Object.entries(eventsByDate).map(([date, events]) => (
            <Card key={date} bg="white" boxShadow="sm">
              <CardBody>
                <Heading size="sm" mb={4}>
                  {date}
                </Heading>
                <VStack spacing={3} align="stretch">
                  {events.map((event) => (
                    <HStack
                      key={event.id}
                      p={3}
                      bg="gray.50"
                      borderRadius="md"
                      justify="space-between"
                    >
                      <VStack spacing={1} align="start" flex={1}>
                        <Text fontWeight="600">{event.title}</Text>
                        <HStack spacing={2}>
                          <Text fontSize="sm" color="gray.600">
                            {event.time}
                          </Text>
                          <Text fontSize="sm" color="gray.600">•</Text>
                          <Text fontSize="sm" color="gray.600">
                            {event.project}
                          </Text>
                        </HStack>
                      </VStack>
                      <Badge colorScheme="blue">{event.category}</Badge>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}

export default SchedulePage
