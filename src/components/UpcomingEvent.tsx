import React from 'react'
import {
  HStack,
  VStack,
  Box,
  Text,
  Badge,
} from '@chakra-ui/react'
import { UpcomingEvent as UpcomingEventType } from '../types'

/**
 * Props for UpcomingEvent component
 */
interface UpcomingEventProps {
  event: UpcomingEventType
}

/**
 * UpcomingEvent Component
 * 
 * Displays event details including date, time, and project information
 */
const UpcomingEvent: React.FC<UpcomingEventProps> = ({ event }) => {
  return (
    <HStack
      bg="white"
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      justify="space-between"
      _hover={{
        boxShadow: 'md',
        borderColor: 'brand.300',
      }}
      transition="all 0.2s"
      cursor="pointer"
    >
      {/* Date Section */}
      <Box
        bg="gray.100"
        p={3}
        borderRadius="md"
        minW="70px"
        textAlign="center"
      >
        <Text fontSize="xs" fontWeight="600" color="gray.600" textTransform="uppercase">
          {event.date}
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          {event.date === 'Mon' ? '14' : '15'}
        </Text>
      </Box>

      {/* Event Info */}
      <VStack spacing={1} align="start" flex={1}>
        <Text fontWeight="600" color="gray.800">
          {event.title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {event.project} • {event.time}
        </Text>
      </VStack>

      {/* Category Badge */}
      <Badge colorScheme="blue" variant="subtle">
        {event.category}
      </Badge>
    </HStack>
  )
}

export default UpcomingEvent
