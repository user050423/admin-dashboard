import React from 'react'
import {
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react'
import {
  Home,
  User,
  Mail,
  Clock,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Lock,
} from 'lucide-react'
import { useDashboardStore } from '../store/dashboardStore'

/**
 * Props for NavItem component
 */
interface NavItemProps {
  icon: string
  label: string
  itemId: string
}

/**
 * Icon mapping
 */
const iconMap: { [key: string]: React.ComponentType<any> } = {
  home: Home,
  user: User,
  message: Mail,
  history: Clock,
  calendar: Calendar,
  people: Users,
  settings: Settings,
  help: HelpCircle,
  lock: Lock,
}

/**
 * NavItem Component
 * 
 * Reusable navigation menu item with icon, label, and active state
 */
const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  itemId,
}) => {
  const { activePage, setActivePage } = useDashboardStore()
  const isActive = activePage === itemId
  const IconComponent = iconMap[icon]

  return (
    <HStack
      px={4}
      py={3}
      cursor="pointer"
      borderRadius="md"
      transition="all 0.2s"
      bg={isActive ? 'brand.500' : 'transparent'}
      color={isActive ? 'white' : 'inherit'}
      _hover={{
        bg: isActive ? 'brand.600' : 'gray.800',
      }}
      onClick={() => setActivePage(itemId)}
      w="100%"
    >
      {IconComponent && (
        <Icon as={IconComponent} w={4} h={4} flexShrink={0} />
      )}
      <Text fontSize="sm" fontWeight="500">
        {label}
      </Text>
    </HStack>
  )
}

export default NavItem
