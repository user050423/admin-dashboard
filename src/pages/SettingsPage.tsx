import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Button,
  Icon,
} from '@chakra-ui/react'
import { Settings, Bell, Lock, Palette } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Settings Page Component
 * User preferences and application settings
 */
const SettingsPage: React.FC = () => {
  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Settings"
          description="Manage your account and application preferences"
        />

        {/* General Settings */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Icon as={Settings} w={6} h={6} color="blue.500" />
                <Heading size="md">General</Heading>
              </HStack>

              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0" flex={1}>
                    <Text fontWeight="500">Auto-save drafts</Text>
                  </FormLabel>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    <Text fontWeight="500">Language</Text>
                  </FormLabel>
                  <Select defaultValue="en" borderColor="gray.200">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>
                    <Text fontWeight="500">Timezone</Text>
                  </FormLabel>
                  <Select defaultValue="pst" borderColor="gray.200">
                    <option value="pst">Pacific Time (PST)</option>
                    <option value="est">Eastern Time (EST)</option>
                    <option value="cst">Central Time (CST)</option>
                    <option value="utc">UTC</option>
                  </Select>
                </FormControl>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Appearance Settings */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Icon as={Palette} w={6} h={6} color="purple.500" />
                <Heading size="md">Appearance</Heading>
              </HStack>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0" flex={1}>
                  <Text fontWeight="500">Light Mode</Text>
                </FormLabel>
                <Switch defaultChecked colorScheme="brand" />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0" flex={1}>
                  <Text fontWeight="500">Compact View</Text>
                </FormLabel>
                <Switch colorScheme="brand" />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Icon as={Bell} w={6} h={6} color="orange.500" />
                <Heading size="md">Notifications</Heading>
              </HStack>

              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0" flex={1}>
                    <VStack spacing={0} align="start">
                      <Text fontWeight="500">Email Notifications</Text>
                      <Text fontSize="xs" color="gray.600">
                        Receive updates via email
                      </Text>
                    </VStack>
                  </FormLabel>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0" flex={1}>
                    <VStack spacing={0} align="start">
                      <Text fontWeight="500">Desktop Notifications</Text>
                      <Text fontSize="xs" color="gray.600">
                        Receive browser notifications
                      </Text>
                    </VStack>
                  </FormLabel>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0" flex={1}>
                    <VStack spacing={0} align="start">
                      <Text fontWeight="500">Project Updates</Text>
                      <Text fontSize="xs" color="gray.600">
                        Notify on project changes
                      </Text>
                    </VStack>
                  </FormLabel>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Privacy Settings */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <HStack spacing={3}>
                <Icon as={Lock} w={6} h={6} color="green.500" />
                <Heading size="md">Privacy & Security</Heading>
              </HStack>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0" flex={1}>
                  <VStack spacing={0} align="start">
                    <Text fontWeight="500">Two-Factor Authentication</Text>
                    <Text fontSize="xs" color="gray.600">
                      Enable 2FA for account security
                    </Text>
                  </VStack>
                </FormLabel>
                <Switch colorScheme="brand" />
              </FormControl>

              <Button variant="outline" colorScheme="red" w="fit-content">
                Reset Password
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default SettingsPage
