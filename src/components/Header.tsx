import React from 'react'
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Icon,
  Button,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Bell, Search, User, Settings } from 'lucide-react'
import { useDashboardStore } from '../store/dashboardStore'

/**
 * Header Component
 * 
 * Top navigation bar with search functionality and action buttons
 */
const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    notificationCount,
    markNotificationsRead,
    notifications,
    notificationPanelOpen,
    toggleNotificationPanel,
    closeNotificationPanel,
    notificationModalOpen,
    selectedNotification,
    openNotificationModal,
    closeNotificationModal,
    setActivePage,
  } = useDashboardStore()

  const searchTags: Array<'All' | 'Projects' | 'People'> = ['All', 'Projects', 'People']

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={8}
      py={4}
      position="sticky"
      top={0}
      zIndex={5}
      boxShadow="sm"
    >
      <HStack justify="space-between" spacing={8}>
        {/* Search Bar */}
        <HStack flex={1} spacing={4}>
          <InputGroup flex={1} maxW="400px">
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search projects, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                borderColor: 'brand.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
              }}
            />
          </InputGroup>

          {/* Search Tags */}
          <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
            {searchTags.map((tag) => {
              const isActive = searchCategory === tag
              return (
                <Button
                  key={tag}
                  size="sm"
                  variant={isActive ? 'solid' : 'ghost'}
                  colorScheme={isActive ? 'brand' : 'gray'}
                  fontSize="sm"
                  onClick={() => setSearchCategory(tag)}
                >
                  {tag}
                </Button>
              )
            })}
          </HStack>
        </HStack>

        {/* Action Buttons */}
        <HStack spacing={4}>
          <Popover
            isOpen={notificationPanelOpen}
            onClose={closeNotificationPanel}
            placement="bottom-end"
          >
            <PopoverTrigger>
              <Box
                position="relative"
                cursor="pointer"
                onClick={() => {
                  toggleNotificationPanel()
                  if (notificationCount > 0) {
                    markNotificationsRead()
                  }
                }}
                _hover={{ opacity: 0.7 }}
              >
                <Icon as={Bell} w={5} h={5} color="gray.700" />
                {notificationCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    borderRadius="full"
                    w={2}
                    h={2}
                  />
                )}
              </Box>
            </PopoverTrigger>
            <PopoverContent width="380px" boxShadow="lg">
              <PopoverBody p={0}>
                <VStack spacing={0} align="stretch">
                  {/* Header */}
                  <Box bg="brand.500" color="white" p={4}>
                    <Heading size="sm">Notifications</Heading>
                  </Box>
                  
                  {/* Notification List */}
                  <VStack spacing={0} align="stretch" maxH="400px" overflowY="auto">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Box
                          key={notification.id}
                          p={4}
                          borderBottom="1px solid"
                          borderColor="gray.200"
                          _hover={{ bg: 'gray.50' }}
                          cursor="pointer"
                          transition="all 0.2s"
                          bg={notification.highlight ? 'blue.50' : 'white'}
                          onClick={() => {
                            openNotificationModal(notification)
                            closeNotificationPanel()
                          }}
                        >
                          <Text fontWeight="600" fontSize="sm" mb={1}>
                            {notification.title}
                          </Text>
                          <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                            {notification.body}
                          </Text>
                        </Box>
                      ))
                    ) : (
                      <Box p={4} textAlign="center">
                        <Text color="gray.500" fontSize="sm">
                          No notifications
                        </Text>
                      </Box>
                    )}
                  </VStack>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="lg"
            _hover={{ bg: 'gray.100' }}
            onClick={() => setActivePage('profile')}
          >
            <Icon as={User} w={5} h={5} color="gray.700" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            _hover={{ bg: 'gray.100' }}
            onClick={() => setActivePage('settings')}
          >
            <Icon as={Settings} w={5} h={5} color="gray.700" />
          </Button>
        </HStack>
      </HStack>

      {/* Notification Modal */}
      <Modal isOpen={notificationModalOpen} onClose={closeNotificationModal} size="md" isCentered>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader bg="brand.500" color="white">
            <HStack spacing={2} justify="space-between" w="full" pr={10}>
              <Text fontWeight="700">Notification Details</Text>
              {selectedNotification?.highlight && (
                <Badge bg="yellow.400" color="black" fontSize="xs">
                  Highlighted
                </Badge>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {selectedNotification && (
              <VStack align="start" spacing={4}>
                <Box w="full">
                  <Text fontSize="lg" fontWeight="700" mb={2}>
                    {selectedNotification.title}
                  </Text>
                  <Text fontSize="md" color="gray.700" lineHeight="1.6">
                    {selectedNotification.body}
                  </Text>
                </Box>
                <Box w="full" pt={4} borderTop="1px solid" borderColor="gray.200">
                  <Text fontSize="xs" color="gray.500">
                    Notification ID: {selectedNotification.id}
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Header

