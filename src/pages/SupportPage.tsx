import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { Headphones, Mail, Phone, MessageSquare } from 'lucide-react'
import PageHeader from '../components/PageHeader'

/**
 * Support Page Component
 * Help center and customer support information
 */
const SupportPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.',
    },
    {
      question: 'How do I export my project data?',
      answer:
        'Navigate to your project settings and look for the "Export Data" option. You can export to CSV, PDF, or JSON formats.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes! We use industry-standard encryption (SSL/TLS) and keep your data safe with regular security audits and compliance with international standards.',
    },
    {
      question: 'Can I collaborate with my team in real-time?',
      answer:
        'Absolutely! Our platform supports real-time collaboration. You can invite team members, assign tasks, and work together on projects simultaneously.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, wire transfers, and ACH payments. Contact our sales team for enterprise options.',
    },
  ]

  return (
    <Box as="main" flex={1} overflowY="auto">
      <VStack spacing={8} align="stretch" p={8}>
        <PageHeader
          title="Support"
          description="Get help and find answers to your questions"
        />

        {/* Contact Options */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <Card bg="white" boxShadow="sm" cursor="pointer" _hover={{ boxShadow: 'lg' }}>
            <CardBody>
              <VStack spacing={3}>
                <Icon as={Headphones} w={8} h={8} color="blue.500" />
                <Heading size="sm">Live Chat</Heading>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Chat with our support team
                </Text>
                <Button size="sm" colorScheme="brand" w="100%">
                  Start Chat
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg="white" boxShadow="sm" cursor="pointer" _hover={{ boxShadow: 'lg' }}>
            <CardBody>
              <VStack spacing={3}>
                <Icon as={Mail} w={8} h={8} color="green.500" />
                <Heading size="sm">Email Support</Heading>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  support@example.com
                </Text>
                <Button size="sm" colorScheme="brand" w="100%">
                  Send Email
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg="white" boxShadow="sm" cursor="pointer" _hover={{ boxShadow: 'lg' }}>
            <CardBody>
              <VStack spacing={3}>
                <Icon as={Phone} w={8} h={8} color="purple.500" />
                <Heading size="sm">Phone Support</Heading>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  +1 (555) 123-4567
                </Text>
                <Button size="sm" colorScheme="brand" w="100%">
                  Call Now
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card bg="white" boxShadow="sm" cursor="pointer" _hover={{ boxShadow: 'lg' }}>
            <CardBody>
              <VStack spacing={3}>
                <Icon as={MessageSquare} w={8} h={8} color="orange.500" />
                <Heading size="sm">Community</Heading>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Join our community forum
                </Text>
                <Button size="sm" colorScheme="brand" w="100%">
                  Visit Forum
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* FAQ Section */}
        <Card bg="white" boxShadow="sm">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Frequently Asked Questions</Heading>
              <Accordion allowToggle>
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} border="1px solid" borderColor="gray.200">
                    <AccordionButton _hover={{ bg: 'gray.50' }}>
                      <Box as="span" flex={1} textAlign="left" fontWeight="500">
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} color="gray.600">
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default SupportPage
