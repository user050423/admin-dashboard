import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
  Grid,
} from '@chakra-ui/react'
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useDashboardStore } from '../store/dashboardStore'

/**
 * Profile Page Component
 * Displays user profile information
 */
const ProfilePage: React.FC = () => {
  const { currentUser } = useDashboardStore()

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Profile"
          description="Manage your account and personal information"
        />

        {/* Profile Header Card */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              {/* User Info */}
              <HStack spacing={6}>
                <Avatar
                  size="2xl"
                  name={currentUser.name}
                  bg="brand.500"
                  color="white"
                  fontSize="2xl"
                />
                <VStack spacing={2} align="start" flex={1}>
                  <HStack justify="space-between" w="100%">
                    <VStack spacing={1} align="start">
                      <Heading size="lg">{currentUser.name}</Heading>
                      <Text color="gray.600">{currentUser.role}</Text>
                    </VStack>
                    <Button
                      leftIcon={<Icon as={Edit} />}
                      colorScheme="brand"
                      size="sm"
                    >
                      Edit Profile
                    </Button>
                  </HStack>
                </VStack>
              </HStack>

              {/* Contact Information */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <HStack spacing={3}>
                  <Icon as={Mail} w={5} h={5} color="brand.500" />
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      Email
                    </Text>
                    <Text fontWeight="500">{currentUser.email || 'miranda@example.com'}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={Phone} w={5} h={5} color="brand.500" />
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      Phone
                    </Text>
                    <Text fontWeight="500">+1 (555) 123-4567</Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={MapPin} w={5} h={5} color="brand.500" />
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      Location
                    </Text>
                    <Text fontWeight="500">San Francisco, CA</Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={Briefcase} w={5} h={5} color="brand.500" />
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      Department
                    </Text>
                    <Text fontWeight="500">Design & Innovation</Text>
                  </VStack>
                </HStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <VStack spacing={4} align="stretch">
          <Heading size="md">Recent Activity</Heading>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
            {[
              { title: 'Projects Created', value: '12', color: 'blue' },
              { title: 'Tasks Completed', value: '89', color: 'green' },
              { title: 'Team Members', value: '24', color: 'purple' },
              { title: 'Files Uploaded', value: '156', color: 'orange' },
            ].map((stat, idx) => (
              <Card key={idx} bg="white" boxShadow="sm">
                <CardBody>
                  <VStack spacing={2}>
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      {stat.title}
                    </Text>
                    <Heading size="lg" color={`${stat.color}.500`}>
                      {stat.value}
                    </Heading>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </VStack>
      </VStack>
    </Box>
  )
}

export default ProfilePage
