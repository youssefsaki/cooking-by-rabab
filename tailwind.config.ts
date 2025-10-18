import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',      // Orange-500 as main brand color
        secondary: 'oklch(82.8% 0.189 84.429)',     // Accent color
        white: '#FFF',
        // Color variations for hover states and different contexts
        'primary-dark': '#ea580c',  // Orange-600
        'primary-light': '#fb923c', // Orange-400
        'secondary-dark': 'oklch(70% 0.189 84.429)',
        'secondary-light': 'oklch(90% 0.189 84.429)',
        // Text colors for contrast
        'text-primary': 'oklch(20% 0.05 47.604)',
        'text-secondary': 'oklch(30% 0.05 84.429)',
        // Orange colors for hover effects
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        // Legacy charcoal colors for text (keeping for compatibility)
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        }
      },
    fontFamily: {
      sans: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
    },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-tablet': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'subheading': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
        'subheading-mobile': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
