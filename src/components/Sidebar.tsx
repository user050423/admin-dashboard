import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
} from '@chakra-ui/react'
import { useDashboardStore } from '../store/dashboardStore'
import NavItem from './NavItem'

/**
 * Sidebar Component
 * 
 * Displays navigation menu with grouped items and user profile section
 */
const Sidebar: React.FC = () => {
  const { navGroups, currentUser } = useDashboardStore()

  return (
    <Box
      as="aside"
      w={{ base: '100%', md: '260px' }}
      bg="gray.900"
      color="white"
      p={6}
      minH="100vh"
      position={{ base: 'absolute', md: 'sticky' }}
      top={0}
      zIndex={{ base: 10, md: 'auto' }}
      overflowY="auto"
      boxShadow={{ md: 'lg' }}
    >
      {/* Logo */}
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">
          Koko
        </Text>
      </Box>

      {/* Navigation Groups */}
      <VStack spacing={8} align="stretch" flex={1} mb={8}>
        {navGroups.map((group) => (
          <VStack key={group.title} spacing={2} align="stretch">
            {/* Group Title */}
            <Text
              fontSize="xs"
              fontWeight="600"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={2}
            >
              {group.title}
            </Text>

            {/* Group Items */}
            <VStack spacing={0} align="stretch">
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  itemId={item.id}
                />
              ))}
            </VStack>
          </VStack>
        ))}
      </VStack>

      {/* User Profile Section */}
      <Box
        pt={6}
        borderTop="1px solid"
        borderColor="gray.700"
        mt="auto"
      >
        <HStack spacing={3} cursor="pointer" _hover={{ opacity: 0.8 }}>
          <Avatar
            size="md"
            name={currentUser.name}
            bg="brand.500"
            color="white"
          />
          <VStack spacing={0} align="start" flex={1}>
            <Text fontSize="sm" fontWeight="600">
              {currentUser.name}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {currentUser.role}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  )
}

export default Sidebar
