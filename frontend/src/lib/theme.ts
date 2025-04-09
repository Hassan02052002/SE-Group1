// lib/theme.ts
// Centralized theme configuration for the Nomad application

/**
 * Primary color palette
 */
export const colors = {
    primary: {
      main: 'emerald', // Key color name (used in tailwind classes like bg-emerald-600)
      gradient: {
        from: 'emerald-600',
        to: 'teal-700',
        hover: {
          from: 'emerald-700',
          to: 'teal-800'
        }
      }
    },
    secondary: {
      main: 'gray',
      light: 'gray-700',
      dark: 'gray-800',
      darker: 'gray-900'
    },
    text: {
      primary: 'white',
      secondary: 'gray-300',
      tertiary: 'gray-400',
      accent: 'emerald-400'
    },
    background: {
      main: 'gray-950',
      secondary: 'gray-900',
      card: 'gray-900/50',
      overlay: 'gray-950/90'
    },
    border: {
      main: 'gray-800',
      light: 'gray-800/50',
      focus: 'emerald-800/50'
    }
  };
  
  /**
   * Typography configuration
   */
  export const typography = {
    fontFamily: {
      heading: 'font-heading', // Space Grotesk
      body: 'font-sans'        // Outfit
    },
    fontSize: {
      display: 'text-5xl',
      heading1: 'text-4xl',
      heading2: 'text-3xl',
      heading3: 'text-2xl',
      heading4: 'text-xl',
      bodyLarge: 'text-lg',
      body: 'text-base',
      bodySmall: 'text-sm',
      caption: 'text-xs'
    }
  };
  
  /**
   * Element styling
   */
  export const elements = {
    // Button variants
    button: {
      primary: `bg-gradient-to-r from-${colors.primary.gradient.from} to-${colors.primary.gradient.to} 
                hover:from-${colors.primary.gradient.hover.from} hover:to-${colors.primary.gradient.hover.to} 
                text-white font-medium rounded-xl shadow-md transition-all duration-300`,
      secondary: `bg-${colors.secondary.dark} hover:bg-${colors.secondary.light} 
                  text-white font-medium rounded-xl transition-all duration-300`,
      outline: `border border-${colors.border.main} bg-transparent hover:bg-${colors.secondary.dark} 
                text-white font-medium rounded-xl transition-all duration-300`
    },
    // Input styling
    input: {
      default: `bg-${colors.background.secondary}/70 border border-${colors.border.main} 
                focus:ring-1 focus:ring-${colors.border.focus} rounded-lg px-4 py-2 
                text-white w-full outline-none transition-colors duration-300`
    },
    // Card styling
    card: {
      default: `bg-${colors.background.card} backdrop-blur-sm border border-${colors.border.main} 
                rounded-xl shadow-md`,
      hover: `hover:border-${colors.border.focus} hover:shadow-lg transition-all duration-300`
    }
  };
  
  /**
   * Effects and animations
   */
  export const effects = {
    glow: {
      primary: `bg-${colors.primary.main}-500/10 rounded-full blur-3xl`,
      secondary: `bg-teal-500/10 rounded-full blur-3xl`
    },
    backdrop: {
      blur: 'backdrop-blur-md'
    }
  };
  
  /**
   * Helper function to generate gradient text style
   * @returns CSS class string for gradient text
   */
  export const gradientText = () => 
    `bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent`;
  
  /**
   * Helper function to generate primary button style
   * @param additionalClasses - Any additional classes to add
   * @returns CSS class string for primary button
   */
  export const primaryButton = (additionalClasses = '') => 
    `${elements.button.primary} ${additionalClasses}`;
  
  /**
   * Helper function to generate secondary button style
   * @param additionalClasses - Any additional classes to add
   * @returns CSS class string for secondary button
   */
  export const secondaryButton = (additionalClasses = '') => 
    `${elements.button.secondary} ${additionalClasses}`;
  
  /**
   * Helper function to generate outline button style
   * @param additionalClasses - Any additional classes to add
   * @returns CSS class string for outline button
   */
  export const outlineButton = (additionalClasses = '') => 
    `${elements.button.outline} ${additionalClasses}`;
  
  /**
   * Helper function to generate default input style
   * @param additionalClasses - Any additional classes to add
   * @returns CSS class string for input
   */
  export const inputStyle = (additionalClasses = '') => 
    `${elements.input.default} ${additionalClasses}`;
  
  /**
   * Helper function to generate card style
   * @param additionalClasses - Any additional classes to add
   * @returns CSS class string for card
   */
  export const cardStyle = (additionalClasses = '', hoverable = false) => 
    `${elements.card.default} ${hoverable ? elements.card.hover : ''} ${additionalClasses}`;