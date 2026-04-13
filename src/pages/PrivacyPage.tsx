import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { Shield, Eye, UserCheck, Lock } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Privacy Page Component
 * Privacy policy and data protection information
 */
const PrivacyPage: React.FC = () => {
  const privacySections = [
    {
      icon: Shield,
      title: 'Data Protection',
      description:
        'Your data is protected with industry-leading security measures. We use encryption, secure servers, and regular security audits.',
      color: 'blue',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description:
        'We are transparent about how we collect, use, and store your data. You always have control over your information.',
      color: 'green',
    },
    {
      icon: UserCheck,
      title: 'Privacy First',
      description:
        'Your privacy is our priority. We never share your personal data with third parties without your explicit consent.',
      color: 'purple',
    },
    {
      icon: Lock,
      title: 'Compliance',
      description:
        'We comply with GDPR, CCPA, and other international privacy regulations to ensure your rights are protected.',
      color: 'orange',
    },
  ]

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Privacy Policy"
          description="Learn how we protect and handle your data"
        />

        {/* Privacy Principles */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {privacySections.map((section, idx) => (
            <Card key={idx} bg="white" boxShadow="sm">
              <CardBody>
                <VStack spacing={4}>
                  <Icon
                    as={section.icon}
                    w={10}
                    h={10}
                    color={`${section.color}.500`}
                  />
                  <VStack spacing={2} align="start">
                    <Heading size="sm">{section.title}</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {section.description}
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Privacy Details */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Information We Collect</Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading size="sm" mb={2}>
                    Account Information
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    When you create an account, we collect your name, email address, and profile information.
                  </Text>
                </Box>
                <Box>
                  <Heading size="sm" mb={2}>
                    Usage Data
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    We collect information about how you use our platform to improve our services and user experience.
                  </Text>
                </Box>
                <Box>
                  <Heading size="sm" mb={2}>
                    Cookies
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    We use cookies to enhance your experience. You can control cookie settings in your browser.
                  </Text>
                </Box>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* User Rights */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Your Rights</Heading>
              <VStack spacing={3} align="stretch">
                <Text>✓ Right to access your personal data</Text>
                <Text>✓ Right to correct inaccurate data</Text>
                <Text>✓ Right to delete your account and data</Text>
                <Text>✓ Right to export your data</Text>
                <Text>✓ Right to opt-out of marketing communications</Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default PrivacyPage
