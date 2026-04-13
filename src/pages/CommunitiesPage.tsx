import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Avatar,
  AvatarGroup,
  Badge,
  Grid,
  Icon,
  Button,
} from '@chakra-ui/react'
import { Users, UserPlus, Link } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Mock communities data
 */
const mockCommunities = [
  {
    id: '1',
    name: 'Design Team',
    description: 'Central hub for all design discussions and resources',
    members: 12,
    memberAvatars: ['SJ', 'MC', 'ER'],
    status: 'Active',
    color: 'purple',
  },
  {
    id: '2',
    name: 'Product Strategy',
    description: 'Product roadmap and strategic planning discussions',
    members: 8,
    memberAvatars: ['AK', 'LD', 'RM'],
    status: 'Active',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Frontend Developers',
    description: 'React, TypeScript, and frontend best practices',
    members: 15,
    memberAvatars: ['JD', 'MA', 'NK', 'PT'],
    status: 'Active',
    color: 'green',
  },
  {
    id: '4',
    name: 'Marketing & Growth',
    description: 'Campaign management and growth initiatives',
    members: 6,
    memberAvatars: ['SL', 'KT'],
    status: 'Active',
    color: 'orange',
  },
]

/**
 * Communities Page Component
 * Displays user communities and team groups
 */
const CommunitiesPage: React.FC = () => {
  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <HStack justify="space-between" align="start">
          <PageHeader
            title="Communities"
            description="Collaborate with teams and communities"
          />
          <Button
            leftIcon={<Icon as={UserPlus} />}
            colorScheme="brand"
            size="lg"
          >
            Join Community
          </Button>
        </HStack>

        {/* Communities Grid */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {mockCommunities.map((community) => (
            <Card key={community.id} bg="white" boxShadow="sm" _hover={{ boxShadow: 'lg' }}>
              <CardBody>
                <VStack spacing={4} align="stretch" h="full">
                  {/* Header */}
                  <HStack justify="space-between">
                    <VStack spacing={1} align="start">
                      <Heading size="sm">{community.name}</Heading>
                      <Badge colorScheme={community.color} variant="subtle">
                        {community.status}
                      </Badge>
                    </VStack>
                    <Icon as={Users} w={6} h={6} color={`${community.color}.500`} />
                  </HStack>

                  {/* Description */}
                  <Text fontSize="sm" color="gray.600">
                    {community.description}
                  </Text>

                  {/* Members */}
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                        Members
                      </Text>
                      <Text fontWeight="600" fontSize="sm">
                        {community.members}
                      </Text>
                    </HStack>
                    <AvatarGroup size="sm" max={3}>
                      {community.memberAvatars.map((avatar, idx) => (
                        <Avatar
                          key={idx}
                          name={avatar}
                          bg={`${community.color}.500`}
                          color="white"
                          fontSize="xs"
                          fontWeight="bold"
                        />
                      ))}
                    </AvatarGroup>
                  </VStack>

                  {/* Action Button */}
                  <Button
                    w="100%"
                    mt="auto"
                    variant="outline"
                    size="sm"
                    colorScheme="brand"
                    rightIcon={<Icon as={Link} />}
                  >
                    Browse
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </VStack>
    </Box>
  )
}

export default CommunitiesPage
