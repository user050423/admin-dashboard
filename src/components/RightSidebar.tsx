import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { Download, File, FileText } from 'lucide-react'
import { useDashboardStore } from '../store/dashboardStore'

/**
 * RightSidebar Component
 * 
 * Displays announcements, articles, and recent uploads
 */
const RightSidebar: React.FC = () => {
  const { announcements, articles, uploads } = useDashboardStore()

  return (
    <Box
      as="aside"
      w={{ base: '100%', lg: '300px' }}
      bg="white"
      overflowY="auto"
      borderLeft={{ base: 'none', lg: '1px solid' }}
      borderColor="gray.200"
      p={6}
    >
      <VStack spacing={8} align="stretch">
        {/* Announcements Section */}
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Heading as="h3" size="md">
              Announcements
            </Heading>
            <Button variant="ghost" size="sm" colorScheme="brand">
              See all
            </Button>
          </HStack>

          <VStack spacing={3} align="stretch">
            {announcements.map((announcement, idx) => (
              <Box
                key={announcement.id}
                p={4}
                borderRadius="lg"
                bg={announcement.highlight ? 'blue.50' : 'gray.50'}
                border="1px solid"
                borderColor={announcement.highlight ? 'blue.100' : 'gray.200'}
              >
                <HStack spacing={3} align="start">
                  <Box
                    w={8}
                    h={8}
                    borderRadius="md"
                    bg={announcement.highlight ? 'blue.500' : 'gray.300'}
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {idx + 1}
                  </Box>
                  <VStack spacing={1} align="start" flex={1}>
                    <Text fontWeight="600" fontSize="sm" color="gray.800">
                      {announcement.title}
                    </Text>
                    <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                      {announcement.body}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>

        <Divider />

        {/* Articles Section */}
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="md">
            Top Articles for You
          </Heading>

          <VStack spacing={3} align="stretch">
            {articles.map((article) => (
              <Box
                key={article.id}
                p={3}
                borderRadius="lg"
                bg="gray.50"
                cursor="pointer"
                _hover={{
                  bg: 'gray.100',
                }}
                transition="all 0.2s"
              >
                <Text fontWeight="500" fontSize="sm" color="gray.800" mb={2}>
                  {article.title}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {article.readTime} min read
                </Text>
              </Box>
            ))}
          </VStack>
        </VStack>

        <Divider />

        {/* Recent Uploads Section */}
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="md">
            Recent Uploads
          </Heading>

          <VStack spacing={2} align="stretch">
            {uploads.map((upload) => (
              <HStack
                key={upload.id}
                p={3}
                bg="gray.50"
                borderRadius="lg"
                justify="space-between"
                _hover={{
                  bg: 'gray.100',
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <HStack spacing={3} flex={1}>
                  <Box
                    w={8}
                    h={8}
                    borderRadius="md"
                    bg={upload.type === 'pdf' ? 'red.100' : 'blue.100'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={upload.type === 'pdf' ? File : FileText}
                      w={4}
                      h={4}
                      color={upload.type === 'pdf' ? 'red.600' : 'blue.600'}
                    />
                  </Box>
                  <Text fontSize="sm" fontWeight="500" color="gray.800" noOfLines={1}>
                    {upload.name}
                  </Text>
                </HStack>
                <Icon
                  as={Download}
                  w={4}
                  h={4}
                  color="gray.400"
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default RightSidebar
