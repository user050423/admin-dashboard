import React from 'react'
import { VStack, Heading, Text } from '@chakra-ui/react'

/**
 * Props for PageHeader component
 */
interface PageHeaderProps {
  title: string
  description?: string
}

/**
 * PageHeader Component
 * 
 * Reusable page header with title and description
 * Maintains consistent styling across all pages
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <VStack spacing={2} align="start" w="100%">
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      {description && (
        <Text color="gray.600" fontSize="md">
          {description}
        </Text>
      )}
    </VStack>
  )
}

export default PageHeader
