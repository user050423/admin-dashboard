import { extendTheme } from '@chakra-ui/react'

/**
 * Custom Chakra UI Theme Configuration
 * 
 * Extends the default Chakra theme with custom colors, fonts, and components
 */
const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0e7ff',
      100: '#d9c3ff',
      200: '#c29eff',
      300: '#ab7aff',
      400: '#9456ff',
      500: '#7d31ff', // Primary brand color
      600: '#6b2bdb',
      700: '#5922b7',
      800: '#471a93',
      900: '#35106f',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
      },
      variants: {
        solid: {
          _hover: {
            opacity: 0.8,
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
})

export default theme
