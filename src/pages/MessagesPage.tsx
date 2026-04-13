import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Avatar,
  Badge,
  Icon,
} from '@chakra-ui/react'
import { Search } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Mock messages data
 */
const mockMessages = [
  {
    id: '1',
    from: 'Sarah Johnson',
    avatar: 'SJ',
    subject: 'Project Update - Admin Dashboard',
    preview: 'Hi, I wanted to discuss the new design mockups for the dashboard...',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    from: 'Mike Chen',
    avatar: 'MC',
    subject: 'Re: Q3 Campaign Strategy',
    preview: 'Great ideas! I think we should focus on the social media angle...',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '3',
    from: 'Emily Rodriguez',
    avatar: 'ER',
    subject: 'Team Meeting - Tuesday at 2PM',
    preview: 'Don\'t forget about our weekly sync tomorrow!',
    timestamp: '1 day ago',
    read: true,
  },
]

/**
 * Messages Page Component
 * Displays user messages and communications
 */
const MessagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMessages = mockMessages.filter(
    (msg) =>
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Messages"
          description="Stay connected with your team"
        />

        {/* Search Bar */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Search} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            border="1px solid"
            borderColor="gray.200"
            _focus={{
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            }}
          />
        </InputGroup>

        {/* Messages List */}
        <VStack spacing={3} align="stretch">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <Card
                key={message.id}
                bg={message.read ? 'white' : 'gray.50'}
                boxShadow="sm"
                cursor="pointer"
                border="1px solid"
                borderColor={message.read ? 'gray.200' : 'brand.200'}
                _hover={{ boxShadow: 'md' }}
                transition="all 0.2s"
              >
                <CardBody>
                  <HStack spacing={4} justify="space-between">
                    <HStack spacing={4} flex={1}>
                      <Avatar
                        size="md"
                        name={message.from}
                        bg="brand.500"
                        color="white"
                      />
                      <VStack spacing={1} align="start" flex={1}>
                        <HStack justify="space-between" w="100%">
                          <Heading size="sm">{message.from}</Heading>
                          <Text fontSize="xs" color="gray.500">
                            {message.timestamp}
                          </Text>
                        </HStack>
                        <Text fontWeight="600" fontSize="sm">
                          {message.subject}
                        </Text>
                        <Text fontSize="sm" color="gray.600" noOfLines={1}>
                          {message.preview}
                        </Text>
                      </VStack>
                    </HStack>
                    {!message.read && (
                      <Badge colorScheme="brand" ml={2}>
                        New
                      </Badge>
                    )}
                  </HStack>
                </CardBody>
              </Card>
            ))
          ) : (
            <Card bg="gray.50" boxShadow="sm">
              <CardBody>
                <Text textAlign="center" color="gray.600">
                  No messages found
                </Text>
              </CardBody>
            </Card>
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default MessagesPage
